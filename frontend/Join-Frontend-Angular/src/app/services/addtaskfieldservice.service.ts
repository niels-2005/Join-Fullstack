import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AddtaskfieldserviceService {

  constructor() { }

  openTaskField(id1: string, id2: string) {
    document.getElementById(id1)?.classList.add('show-task-field');
    document.getElementById(id2)?.classList.add('give-opacity');
    document.getElementById('sitebar')?.classList.add('give-opacity');
    document.getElementById('kanban-header')?.classList.add('give-opacity');
    document.getElementById('groundbar')?.classList.add('give-opacity');
  }

  closeTaskField(id1: string, id2: string) {
    document.getElementById(id1)?.classList.remove('show-task-field');
    document.getElementById(id2)?.classList.remove('give-opacity');
    document.getElementById('sitebar')?.classList.remove('give-opacity');
    document.getElementById('kanban-header')?.classList.remove('give-opacity');
    document.getElementById('groundbar')?.classList.remove('give-opacity');
  }

  addOpacity(){
    document.getElementById('board-container')?.classList.add('give-opacity');
    document.getElementById('sitebar')?.classList.add('give-opacity');
    document.getElementById('kanban-header')?.classList.add('give-opacity');
  }

  removeOpacity(){
    document.getElementById('board-container')?.classList.remove('give-opacity');
    document.getElementById('sitebar')?.classList.remove('give-opacity');
    document.getElementById('groundbar')?.classList.remove('give-opacity');
    document.getElementById('kanban-header')?.classList.remove('give-opacity');
  }
}
