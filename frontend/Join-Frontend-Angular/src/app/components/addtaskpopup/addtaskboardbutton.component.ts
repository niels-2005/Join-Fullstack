import { Component, OnInit } from '@angular/core';
import { AddtaskfieldserviceService } from 'src/app/services/addtaskfieldservice.service';
import { map, tap, first } from 'rxjs/operators';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ContactserviceService, Contact } from 'src/app/services/contactservice.service';
import { DatePipe } from '@angular/common';
import { TaskserviceService } from 'src/app/services/taskservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addtaskboardbutton',
  templateUrl: './addtaskboardbutton.component.html',
  styleUrls: ['./addtaskboardbutton.component.scss'],
})
export class AddtaskboardbuttonComponent implements OnInit {


  constructor(private popupSerivce: AddtaskfieldserviceService ,private fb: FormBuilder, private contactService: ContactserviceService, private datePipe: DatePipe, private taskService: TaskserviceService, private router: Router) {}

  taskForm!: FormGroup;
  myControl = new FormControl();

  selectedColor!: string;

  selectedPriority: string = "";

  showContacts: boolean = false;

  contacts$ = this.contactService.flatContacts$;

  closeTaskField(id1: string, id2: string){
    this.popupSerivce.closeTaskField(id1, id2);
  }

  async ngOnInit(): Promise<void> {
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

  setColor(color: string) {
    this.selectedColor = color;
    this.taskForm.patchValue({color: color});
  }

  selectedPrio(id1: string, id2: string, id3: string, classnameToggle: string, removedClassOne: string, removedClassTwo: string, prio: string) {
    setTimeout(() => {
      document.getElementById(id1)!.classList.toggle(classnameToggle);
      document.getElementById(id2)!.classList.remove(removedClassOne);
      document.getElementById(id3)!.classList.remove(removedClassTwo);
      this.selectedPriority = prio;
      console.log(this.selectedPriority);
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
          console.log('Task creation successful');
          this.showTaskAddedToBoard();
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

  showTaskAddedToBoard(){
    this.closeTaskField('add-task-field', 'board-container');
    setTimeout(() => {
      window.location.reload();
    }, 200);
  }

  showAddTaskErrorMessage(data: any) {
    this.showError('title-error', data.title);
    this.showError('description-error', data.description);
    this.showError('category-error', data.category);
    this.showError('assigned-to-error', data.assigned_to_names);
    this.showError('date-error', data.deadline);
    this.showError('priority-error', data.priority);
    console.log('Contact creation failed:', data);
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




}
