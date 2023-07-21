import { Component, OnInit } from '@angular/core';
import { TaskserviceService } from 'src/app/services/taskservice.service';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.scss']
})
export class HelpComponent implements OnInit {

  constructor(private tokenService: TaskserviceService) {}

  ngOnInit(): void {
      this.tokenService.checkToken();
  }

}
