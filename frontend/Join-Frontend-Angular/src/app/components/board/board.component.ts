import { Component, OnInit } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { AddtaskfieldserviceService } from 'src/app/services/addtaskfieldservice.service';
import { TaskserviceService } from 'src/app/services/taskservice.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit {
  todo: any[] = [];
  inProgress: any[] = [];
  awaitingFeedback: any[] = [];
  done: any[] = [];

  selectedTask: any;

  onTaskClick(task: any) {
    this.popupService.addOpacity();
    this.selectedTask = null;
    setTimeout(() => {
      this.selectedTask = task;
    }, 0);
  }

  constructor(
    private popupService: AddtaskfieldserviceService,
    private taskService: TaskserviceService,
  ) {}

  ngOnInit(): void {
    this.getTasks();
  }

  getTasks() {
    this.taskService.getTasks().subscribe(
      (result) => {
        for (let task of result) {
          switch (task.status) {
            case 'todo':
              this.todo.push(task);
              break;
            case 'inProgress':
              this.inProgress.push(task);
              break;
            case 'awaitingFeedback':
              this.awaitingFeedback.push(task);
              break;
            case 'done':
              this.done.push(task);
              break;
          }
        }
        console.log('Tasks:', result);
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }

  drop(event: CdkDragDrop<any[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );

      const item = event.item.data;
      const previousStatus = this.getStatus(event.previousContainer.id);
      const newStatus = this.getStatus(event.container.id);


      this.taskService.updateStatus(item.id, newStatus).subscribe((result) => {

      });
    }
  }

  openTaskField(id1: string, id2: string) {
    this.popupService.openTaskField(id1, id2);
  }

  getStatus(id: string) {
    switch (id) {
      case 'cdk-drop-list-0':
        return 'todo';
      case 'cdk-drop-list-1':
        return 'inProgress';
      case 'cdk-drop-list-2':
        return 'awaitingFeedback';
      case 'cdk-drop-list-3':
        return 'done';
      default:
        return 'todo';
    }
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

  filterValue: string = '';

  getFilteredTasks(taskArray: any[]): any[] {
    if (this.filterValue) {
      return taskArray.filter(task => task.title.toLowerCase().includes(this.filterValue.toLowerCase()));
    } else {
      return taskArray;
    }
  }
}
