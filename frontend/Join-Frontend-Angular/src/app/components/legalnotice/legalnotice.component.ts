import { Component, OnInit } from '@angular/core';
import { TaskserviceService } from 'src/app/services/taskservice.service';

@Component({
  selector: 'app-legalnotice',
  templateUrl: './legalnotice.component.html',
  styleUrls: ['./legalnotice.component.scss']
})
export class LegalnoticeComponent implements OnInit {

  constructor(private tokenService: TaskserviceService) {}

  ngOnInit(): void {
      this.tokenService.checkToken();
  }

}
