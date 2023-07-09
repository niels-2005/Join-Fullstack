import { Component, Input, OnInit } from '@angular/core';
import { AddtaskfieldserviceService } from 'src/app/services/addtaskfieldservice.service';
import { ContactserviceService } from 'src/app/services/contactservice.service';
import { map, tap, first } from 'rxjs/operators';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Location } from '@angular/common';
import { TaskserviceService } from 'src/app/services/taskservice.service';

@Component({
  selector: 'app-singletaskpopup',
  templateUrl: './singletaskpopup.component.html',
  styleUrls: ['./singletaskpopup.component.scss']
})
export class SingletaskpopupComponent implements OnInit {

  @Input() selectedTask: any = null;

  selectedPriority: string = "";

  taskForm!: FormGroup;

  showContacts: boolean = false;

  contacts$ = this.contactService.flatContacts$;

  constructor(private popupService: AddtaskfieldserviceService, private contactService: ContactserviceService, private fb: FormBuilder, private location: Location, private taskService: TaskserviceService) {}

  async ngOnInit(): Promise<void> {
    this.initTaskForm();
    await this.contactService.getContacts();
  }

  getInitials(name: string): string {
    const names = name.split(",");
    const initials = names.map((n) => {
      const parts = n.trim().split(" ");
      return parts
        .map((p) => p.charAt(0))
        .join("");
    });
    return initials.join(", ");
  }

  closePopup(){
    this.popupService.removeOpacity();
    this.selectedTask = null;
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

  changeContainer(id1: string, id2: string){
    document.getElementById(id1)?.classList.add('d-none');
    document.getElementById(id2)?.classList.remove('d-none');
  }

  async editTask(){
    const token = localStorage.getItem('token');
    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Token " + token);
    myHeaders.append("Content-Type", "application/json");

    const task = this.taskForm.value;

    let priority = this.selectedTask.priority;

    if (this.selectedPriority && this.selectedPriority !== this.selectedTask.priority) {
      priority = this.selectedPriority;
    }

    const raw = JSON.stringify({
      "id": this.selectedTask.id,
      "title": this.selectedTask.title,
      "description": this.selectedTask.description,
      "assigned_to_names": task.assignedTo,
      "deadline": this.selectedTask.deadline,
      "priority": priority
    });

    const requestOptions: RequestInit = {
      method: 'PUT',
      headers: myHeaders,
      body: raw,
    };

    const url = `https://scholzniels.pythonanywhere.com/api/join/tasks/${this.selectedTask.id}/`;

    try {
      const resp = await fetch(url, requestOptions);
      const json = await resp.json();

      if (resp.ok) {
        console.log('Task update successful');
        window.location.reload();
      } else {
        console.log('Task update failed:', json);
        this.showUpdateErrorMessage(json);
      }
    } catch (error) {
      console.log('Error during task update:', error);
    }
  }

  showUpdateErrorMessage(json: any) {
    this.showError('title-error', json.title);
    this.showError('description-error', json.description);
    this.showError('assigned_to_names-error', json.assigned_to_names);
    this.showError('deadline-error', json.deadline);
    this.showError('priority-error', json.priority);
  }

  showError(elementId: string, error: string[] | undefined) {
    const element = document.getElementById(elementId);
    if (element && error) {
      element.innerHTML = error[0];
    }
  }

  async deleteTask() {
    const token = localStorage.getItem('token');
    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Token " + token);
    myHeaders.append("Content-Type", "application/json");

    const requestOptions: RequestInit = {
        method: 'DELETE',
        headers: myHeaders
    };

    const url = `https://scholzniels.pythonanywhere.com/api/join/tasks/${this.selectedTask.id}/`;

    try {
        const resp = await fetch(url, requestOptions);

        if (resp.ok) {
            console.log('Contact deletion successful');
            window.location.reload();
        } else {
            const json = await resp.json();
            console.log('Contact deletion failed:', json);
        }
    } catch (error) {
        console.log('Error during contact deletion:', error);
    }
}

}
