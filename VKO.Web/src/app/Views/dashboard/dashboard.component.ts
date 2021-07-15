import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.less']
})
export class DashboardComponent implements OnInit {
  Hidepatientdashboard: boolean = false;
  HideManagementdashboard: boolean = false;
  HideCampdashboard: boolean = false;
  HideOpticaldashboard: boolean = false;
  constructor() { }

  ngOnInit() {
    debugger;

  }

  Getdashboard() {
    debugger;


  }

}
