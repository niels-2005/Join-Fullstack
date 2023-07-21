import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HostListener } from '@angular/core';


@Component({
  selector: 'app-kanbanprojecttoolheader',
  templateUrl: './kanbanprojecttoolheader.component.html',
  styleUrls: ['./kanbanprojecttoolheader.component.scss']
})
export class KanbanprojecttoolheaderComponent implements OnInit {

  constructor(private router: Router) {}

  async logoutUser() {
    const requestOptions = {
      method: 'POST',
    };

    const url = 'https://scholzniels.pythonanywhere.com/api/logout/';


      const resp = await fetch(url, requestOptions);
      const json = await resp.json();

      if (resp.ok) {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        this.router.navigate(['/login']);
      } else {
        console.log('User logout failed:', json);
      }
}

  toggleLogout(){
    document.getElementById('logout-span')?.classList.toggle('d-none');
    document.getElementById('legal-notice-mobile')?.classList.toggle('d-none');
  }

  isViewSmallEnough: boolean = false

  ngOnInit() {
    this.checkScreenSize();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkScreenSize();
  }

  checkScreenSize() {
    this.isViewSmallEnough = window.innerWidth < 1001;
  }
}
