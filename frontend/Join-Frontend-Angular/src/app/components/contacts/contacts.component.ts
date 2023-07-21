import { Component } from '@angular/core';
import { AddtaskfieldserviceService } from 'src/app/services/addtaskfieldservice.service';
import { ContactserviceService } from 'src/app/services/contactservice.service';
import { Contact } from 'src/app/services/contactservice.service';
import { TaskserviceService } from 'src/app/services/taskservice.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent {

  contacts!: { [key: string]: any };
  selectedContact: any;

  constructor(private contactService: ContactserviceService, private popupService: AddtaskfieldserviceService, private tokenService: TaskserviceService) { }

  async ngOnInit(): Promise<void> {
    this.showRightContacts();
    this.subscribeToSelectedContact();
    this.contactService.getContacts();
    this.tokenService.checkToken();
  }

  showRightContacts(){
    const username = localStorage.getItem('username');

    this.contactService.flatContacts$.subscribe(allContacts => {
      const userContacts = allContacts.filter((contact: Contact) => contact.created_from === username);
      this.contacts = this.groupByInitial(userContacts);
    });
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

  openTaskField(id1: string, id2: string, id3: string) {
    this.popupService.openTaskField(id1, id2, id3);
  }

  onContactClick(contact: any) {
    this.selectedContact = contact;

    if (window.innerWidth < 751) {
      document.getElementById('single-contact-details')?.classList.remove('d-none');
      document.getElementById('all-contact-details')?.classList.add('d-none');
    }
  }

  closeContactField(id1: string, id2: string, id3: string, id4: string){
    this.popupService.closeTaskField(id1, id2, id3, id4);
  }
}
