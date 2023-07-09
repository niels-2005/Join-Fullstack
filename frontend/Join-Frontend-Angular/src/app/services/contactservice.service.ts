import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

export type Contact = {
  id: number;
  name: string;
  initial: string;
  color: string;
  email: string;
  phone: string;
  checked?: boolean;
}

type GroupedContacts = { [key: string]: Contact[] };

@Injectable({
  providedIn: 'root'
})
export class ContactserviceService {
  private contacts = new BehaviorSubject<GroupedContacts>({});
  contacts$ = this.contacts.asObservable();

  private flatContacts = new BehaviorSubject<Contact[]>([]);
  flatContacts$ = this.flatContacts.asObservable();

  private getHeaders(): Headers {
    const token = localStorage.getItem('token');
    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Token " + token);
    return myHeaders;
  }

  private getRequestOptions(): RequestInit {
    return {
      method: 'GET',
      headers: this.getHeaders(),
    };
  }

  async getContacts(): Promise<void> {
    const requestOptions = this.getRequestOptions();

    const response = await fetch("https://scholzniels.pythonanywhere.com/api/join/contacts/", requestOptions);
    const data = await response.json();

    const contacts: Contact[] = data.map((contact: any): Contact => {
      return {
        id: contact.id,
        name: contact.name,
        email: contact.email,
        phone: contact.phone,
        initial: contact.name.charAt(0),
        color: contact.color,
      };
    });

    this.contacts.next(this.groupByInitial(contacts));
    this.flatContacts.next(contacts);
  }

  groupByInitial(contacts: Contact[]): GroupedContacts {
    const groupedContacts: GroupedContacts = {};

    for (const contact of contacts) {
      const initial = contact.initial.toUpperCase();

      if (!groupedContacts[initial]) {
        groupedContacts[initial] = [];
      }

      groupedContacts[initial].push(contact);
    }

    return groupedContacts;
  }

  private selectedContactSubject = new BehaviorSubject<Contact | null>(null);
  selectedContact$ = this.selectedContactSubject.asObservable();

  setSelectedContact(contact: Contact | null): void {
    this.selectedContactSubject.next(contact);
  }
}

