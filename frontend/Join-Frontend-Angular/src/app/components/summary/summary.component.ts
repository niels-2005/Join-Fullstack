import { Component, OnInit } from '@angular/core';
import { TaskserviceService } from 'src/app/services/taskservice.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {

  tasks: any[] = [];

  todoTasks: any[] = [];
  inProgressTasks: any[] = [];
  awaitingFeedbackTasks: any[] = [];
  doneTasks: any[] = [];

  nextDeadlineTask: any;

constructor(private taskService: TaskserviceService) {}

ngOnInit(): void {
  this.getTasks();
  this.setGreetingTime();
  this.greetUser();
}

getTasks(){
  this.taskService.getTasks().subscribe(
    (result) => {
      this.tasks = result;
      this.filterTasksByStatus();
      this.getNextDeadline();
      console.log('Tasks:', this.tasks);
    },
    (error) => {
      console.error('Error:', error);
    }
  );
}

filterTasksByStatus() {
  this.todoTasks = this.taskService.filterTasksByStatus(this.tasks, 'todo');
  this.inProgressTasks = this.taskService.filterTasksByStatus(this.tasks, 'inProgress');
  this.awaitingFeedbackTasks = this.taskService.filterTasksByStatus(this.tasks, 'awaitingFeedback');
  this.doneTasks = this.taskService.filterTasksByStatus(this.tasks, 'done');
}

getNextDeadline() {
  const filteredTasks = this.tasks.filter(task => ['todo', 'inProgress', 'awaitingFeedback', 'done'].includes(task.status));
  if (filteredTasks.length > 0) {
    this.nextDeadlineTask = filteredTasks.reduce((prev, current) => {
      const prevDeadline = new Date(prev.deadline).getTime();
      const currentDeadline = new Date(current.deadline).getTime();
      return (currentDeadline < prevDeadline) ? current : prev;
    });
  } else {
    this.nextDeadlineTask = null;
  }
}


getPriorityText(priority: string): string {
  switch (priority) {
    case 'U':
      return 'Urgent';
    case 'M':
      return 'Medium';
    case 'L':
      return 'Low';
    default:
      return '';
  }
}

formatDate(date: string): string {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(date).toLocaleDateString(undefined, options);
}


setGreetingTime() {
  const greetingTimeElement = document.getElementById('greeting-time');
  if (greetingTimeElement) {
    const greetingTime = this.getGreetingTime();
    greetingTimeElement.innerHTML = greetingTime + ',';
  }
}

getGreetingTime(): string {
  const currentHour = new Date().getHours();

  if (currentHour >= 5 && currentHour < 12) {
    return 'Good Morning';
  } else if (currentHour >= 12 && currentHour < 18) {
    return 'Good Afternoon';
  } else if (currentHour >= 18 && currentHour < 22) {
    return 'Good Evening';
  } else {
    return 'Welcome';
  }
}

greetUser() {
  const username = localStorage.getItem('username');
  const greetUserElement = document.getElementById('greet-user');
  if (username && greetUserElement) {
    greetUserElement.innerHTML = username;
  } else {
    greetUserElement!.innerHTML = 'Guest';
  }
}
}





