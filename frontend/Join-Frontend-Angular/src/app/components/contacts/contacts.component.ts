import { Component } from '@angular/core';
import { AddtaskfieldserviceService } from 'src/app/services/addtaskfieldservice.service';
import { ContactserviceService } from 'src/app/services/contactservice.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent {

  contacts!: { [key: string]: any };
  selectedContact: any;

  constructor(private contactService: ContactserviceService, private popupService: AddtaskfieldserviceService) {
    this.contactService.contacts$.subscribe(groupedContacts => {
      this.contacts = groupedContacts;
    });
  }

  async ngOnInit(): Promise<void> {
    await this.contactService.getContacts();
    this.subscribeToSelectedContact();
  }

  subscribeToSelectedContact(): void {
    this.contactService.selectedContact$.subscribe(
      contact => {
        this.selectedContact = contact;
      }
    );
  }

  groupByInitial(contacts: { name: string, initial: string, color: string, email: string, phone: string }[]) {
    const groupedContacts: { [key: string]: { name: string, initial: string, color: string, email: string, phone: string }[] } = {};

    for (const contact of contacts) {
      if (!groupedContacts[contact.initial]) {
        groupedContacts[contact.initial] = [];
      }
      groupedContacts[contact.initial].push(contact);
    }
    return groupedContacts;
  }

  getInitials(name: string) {
    return name.split(' ').map((n,i,a)=> i === 0 || i+1 === a.length ? n[0] : null).join('').toUpperCase();
  }

  openTaskField(id1: string, id2: string) {
    this.popupService.openTaskField(id1, id2);
  }




  onContactClick(contact: any) {
    this.selectedContact = contact;

    if (window.innerWidth < 751) {
      document.getElementById('single-contact-details')?.classList.remove('d-none');
      document.getElementById('all-contact-details')?.classList.add('d-none');
    }
  }

}
