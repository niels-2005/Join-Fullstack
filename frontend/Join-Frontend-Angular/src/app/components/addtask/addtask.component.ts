import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ContactserviceService } from 'src/app/services/contactservice.service';
import { map, tap, first } from 'rxjs/operators';
import { DatePipe } from '@angular/common';
import { TaskserviceService } from 'src/app/services/taskservice.service';
import { Router } from '@angular/router';
import { ElementRef } from '@angular/core';


@Component({
  selector: 'app-addtask',
  templateUrl: './addtask.component.html',
  styleUrls: ['./addtask.component.scss']
})
export class AddtaskComponent implements OnInit {

  taskForm!: FormGroup;
  myControl = new FormControl();

  selectedColor!: string;

  selectedPriority: string = "";

  showContacts: boolean = false;

  contacts$ = this.contactService.flatContacts$;

setColor(color: string) {
  this.selectedColor = color;
  this.taskForm.patchValue({color: color});
}

  constructor(private fb: FormBuilder, private contactService: ContactserviceService, private datePipe: DatePipe, private taskService: TaskserviceService, private router: Router, private eRef: ElementRef) {}

  async ngOnInit(): Promise<void> {
    this.taskService.checkToken();
    this.initTaskForm();
    await this.contactService.getContacts();
  }


  private initTaskForm(): void {
    this.taskForm = this.fb.group({
      title: [''],
      description: [''],
      category: [''],
      assignedTo: [''],
      dueDate: [''],
      prio: [''],
      subtask: ['']
    });
  }

  clearTaskField(){
    this.taskForm.reset();
    this.selectedColor = '';
    this.contacts$.pipe(first()).subscribe(contacts => {
      for (let contact of contacts) {
        contact.checked = false;
      }
    });
    document.getElementById('prio-urgent')?.classList.remove('bg-urgent-while-clicked');
    document.getElementById('prio-medium')?.classList.remove('bg-medium-while-clicked');
    document.getElementById('prio-low')?.classList.remove('bg-low-while-clicked');
}


  selectedPrio(id1: string, id2: string, id3: string, classnameToggle: string, removedClassOne: string, removedClassTwo: string, prio: string) {
    setTimeout(() => {
      document.getElementById(id1)!.classList.toggle(classnameToggle);
      document.getElementById(id2)!.classList.remove(removedClassOne);
      document.getElementById(id3)!.classList.remove(removedClassTwo);
      this.selectedPriority = prio;
    }, 100);
  }

  addTask() {
    const token = localStorage.getItem('token');
    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Token " + token);
    myHeaders.append("Content-Type", "application/json");

    const taskData = {
      ...this.taskForm.value,
      color: this.selectedColor,
      created_from: localStorage.getItem('username'),
      assigned_to_names: this.taskForm.get('assignedTo')?.value,
      deadline: this.datePipe.transform(this.taskForm.get('dueDate')?.value, 'yyyy-MM-dd'),
      priority: this.selectedPriority,
      status: "todo"
    };

    console.log(taskData);

    const requestOptions: RequestInit = {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify(taskData)
    };

    fetch("https://scholzniels.pythonanywhere.com/api/join/tasks/", requestOptions)
      .then(response => {
        if (response.ok) {
          this.router.navigate(['/board']);
        } else {
          response.json().then(data => {
            this.showAddTaskErrorMessage(data);
          });
        }
      })
      .catch(error => {
        console.log('Error:', error);
      });
  }

  showAddTaskErrorMessage(data: any) {
    this.showError('title-error', data.title);
    this.showError('description-error', data.description);
    this.showError('category-error', data.category);
    this.showError('assigned-to-error', data.assigned_to_names);
    this.showError('date-error', data.deadline);
    this.showError('priority-error', data.priority);
  }

  showError(elementId: string, error: string[] | undefined) {
    const element = document.getElementById(elementId);
    if (element && error) {
      element.innerHTML = error[0];
    }
  }

  get selectedContacts() {
    let selectedContacts: string[] = [];
    this.contacts$.pipe(
      map(contacts => contacts.filter(contact => contact.checked)),
      map(contacts => contacts.map(contact => contact.name))
    ).subscribe(names => selectedContacts = names);
    return selectedContacts;
  }

  toggleContact(contact: any, event: Event) {
    event.preventDefault();
    event.stopPropagation();
    contact.checked = !contact.checked;
    this.updateAssignedTo();
  }


  updateAssignedTo() {
    this.contacts$.pipe(
      first(),
      tap(contacts => {
        let selectedContacts = contacts.filter(contact => contact.checked);
        let assignedToNames = selectedContacts.map(contact => contact.name).join(", ");
        this.taskForm.get('assignedTo')?.setValue(assignedToNames);
      })
    ).subscribe();
  }

  getContactFormControl(contact: any): FormControl {
    return new FormControl(contact.checked || false);
  }

  @ViewChild('dropdown') dropdown!: ElementRef;

@HostListener('document:click', ['$event'])
onDocumentClick(event: MouseEvent): void {
  const clickedInside = this.dropdown.nativeElement.contains(event.target);
  if (!clickedInside) {
    this.showContacts = false;
  }
}

getInitials(name: string): string {
  return name.split(' ').map((n)=>n[0]).join('');
}

getSelectedContactInitials() {
  let selectedContactsInitials: string[] = [];
  this.contacts$.pipe(
    map(contacts => contacts.filter(contact => contact.checked)),
    map(contacts => contacts.map(contact => this.getInitials(contact.name)))
  ).subscribe(initials => selectedContactsInitials = initials);
  return selectedContactsInitials.join(", ");
}

isSelected(contact: any): boolean {
  return contact.checked;
}

}
