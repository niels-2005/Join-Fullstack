import { Component, Input } from '@angular/core';
import { AddtaskfieldserviceService } from 'src/app/services/addtaskfieldservice.service';
import { ContactserviceService } from 'src/app/services/contactservice.service';

@Component({
  selector: 'app-editcontactpopup',
  templateUrl: './editcontactpopup.component.html',
  styleUrls: ['./editcontactpopup.component.scss']
})
export class EditcontactpopupComponent {


  @Input() selectedContact: any = {};


  constructor(private popupService: AddtaskfieldserviceService, private contactService: ContactserviceService) {}

  closeContactField(id1: string, id2: string, id3: string){
    this.popupService.closeTaskField(id1, id2, id3, '');
  }

  async deleteContact() {
    const token = localStorage.getItem('token');
    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Token " + token);
    myHeaders.append("Content-Type", "application/json");

    const requestOptions: RequestInit = {
        method: 'DELETE',
        headers: myHeaders
    };

    const url = `https://scholzniels.pythonanywhere.com/api/join/contacts/${this.selectedContact.id}/`;

    try {
        const resp = await fetch(url, requestOptions);

        if (resp.ok) {
            this.closeContactField('edit-contact-field', 'contacts-container', 'add-contact-visible');
            this.contactService.getContacts();
            this.selectedContact = null;
            this.contactService.setSelectedContact(null);
        } else {
            const json = await resp.json();
        }
    } catch (error) {
        console.log('Error during contact deletion:', error);
    }
}

  async saveEditedContact() {
    const token = localStorage.getItem('token');
    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Token " + token);
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      "name": this.selectedContact.name,
      "email": this.selectedContact.email,
      "phone": this.selectedContact.phone
    });

    const requestOptions: RequestInit = {
      method: 'PATCH',
      headers: myHeaders,
      body: raw,
    };

    const url = `https://scholzniels.pythonanywhere.com/api/join/contacts/${this.selectedContact.id}/`;

    try {
      const resp = await fetch(url, requestOptions);
      const json = await resp.json();

      if (resp.ok) {
        this.closeContactField('edit-contact-field', 'contacts-container', 'add-contact-visible');
      } else {
        this.showUpdateErrorMessage(json);
      }
    } catch (error) {
      console.log('Error during contact update:', error);
    }
  }

  showUpdateErrorMessage(json: any) {
    this.showError('email-error-edit', json.email);
    this.showError('username-error-edit', json.name);
    this.showError('phone-error-edit', json.phone);
  }

  showError(elementId: string, error: string[] | undefined) {
    const element = document.getElementById(elementId);
    if (element && error) {
      element.innerHTML = error[0];
    }
  }
}
