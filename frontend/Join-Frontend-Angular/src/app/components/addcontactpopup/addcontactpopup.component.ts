import { Component } from '@angular/core';
import { AddtaskfieldserviceService } from 'src/app/services/addtaskfieldservice.service';
import { ContactserviceService } from 'src/app/services/contactservice.service';

@Component({
  selector: 'app-addcontactpopup',
  templateUrl: './addcontactpopup.component.html',
  styleUrls: ['./addcontactpopup.component.scss']
})
export class AddcontactpopupComponent {

  name: string = '';
  email: string = '';
  phone: string = '';

  constructor(private popupService: AddtaskfieldserviceService, private contactService: ContactserviceService) {}

  closeContactField(id1: string, id2: string, id3: string){
    this.popupService.closeTaskField(id1, id2, id3, '');
  }

  private getHeaders(): Headers {
    const token = localStorage.getItem('token');
    const headers = new Headers();
    headers.append("Authorization", "Token " + token);
    headers.append("Content-Type", "application/json");
    return headers;
  }

  private getRequestOptions(): RequestInit {
    return {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify({
        "created_from": localStorage.getItem('username'),
        "name": this.normalizeName(this.name),
        "email": this.email,
        "phone": this.phone
      }),
    };
  }

  async createContact() {
    const requestOptions = this.getRequestOptions();
    const url = "https://scholzniels.pythonanywhere.com/api/join/contacts/";

      const response = await fetch(url, requestOptions);
      const data = await response.json();

      if (response.ok) {
        this.closeContactField('add-task-field', 'contacts-container', '');
        this.contactService.getContacts();
      } else {
        this.showContactCreationErrorMessage(data);
      }

  }

  normalizeName(name: string): string {
    return name.split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  }

  showContactCreationErrorMessage(data: any) {
    this.showError('email-error', data.email);
    this.showError('username-error', data.name);
    this.showError('phone-error', data.phone);
    console.log('Contact creation failed:', data);
  }

  showError(elementId: string, error: string[] | undefined) {
    const element = document.getElementById(elementId);
    if (element && error) {
      element.innerHTML = error[0];
    }
  }
}
