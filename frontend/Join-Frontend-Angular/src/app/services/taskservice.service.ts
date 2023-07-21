import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskserviceService {

  constructor(private router: Router) { }

  getTasks(): Observable<any> {
    const myHeaders = new Headers();
    const token = localStorage.getItem('token');
    myHeaders.append("Authorization", `Token ` + token);

    const requestOptions: RequestInit = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    const url = "https://scholzniels.pythonanywhere.com/api/join/tasks/";
    const username = localStorage.getItem('username');

    return new Observable((subscriber) => {
      fetch(url, requestOptions)
        .then(response => response.json())
        .then(result => {
          const filteredTasks = result.filter((task: any) => task.created_from === username);
          subscriber.next(filteredTasks);
          subscriber.complete();
        })
        .catch(error => {
          subscriber.error(error);
        });
    });
  }


  updateStatus(taskId: number, newStatus: string): Observable<any> {
    const myHeaders = new Headers();
    const token = localStorage.getItem('token');
    myHeaders.append("Authorization", `Token ` + token);
    myHeaders.append("Content-Type", "application/json");

    const requestOptions: RequestInit = {
      method: 'PATCH',
      headers: myHeaders,
      body: JSON.stringify({ status: newStatus }),
      redirect: 'follow'
    };

    const url = `https://scholzniels.pythonanywhere.com/api/join/tasks/${taskId}/`;

    return new Observable((subscriber) => {
      fetch(url, requestOptions)
        .then(response => response.json())
        .then(result => {
          subscriber.next(result);
          subscriber.complete();
        })
        .catch(error => {
          subscriber.error(error);
        });
    });
  }

  filterTasksByStatus(tasks: any[], status: string): any[] {
    return tasks.filter((task) => task.status === status);
  }

  checkToken(){
    const token = localStorage.getItem('token');
    if (!token) {
      this.router.navigate(['/login']);
    }
  }

}
