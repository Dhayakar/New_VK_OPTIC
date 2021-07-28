import { Component, OnInit, ElementRef, ViewChild, Inject, ViewEncapsulation } from '@angular/core';
import { AppComponent } from '../../app.component';
import { DatePipe } from '@angular/common';
import { CommonService } from '../../shared/common.service';
import { NgForm, FormGroup, FormBuilder } from '@angular/forms';
import * as _moment from 'moment';
import * as _rollupMoment from 'moment';
const moment = _rollupMoment || _moment;
import { FormControl } from '@angular/forms';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { optimizeGroupPlayer } from '@angular/animations/browser/src/render/shared';
import * as _l from 'lodash';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';

import { MatTableDataSource, MatSort, MatDialogRef } from '@angular/material';
import { ErrorLogviewmodel } from '../../Models/ViewModels/ErrorLogviewmodel';


export const MY_FORMATSS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD-MMM-YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'DD-MM-YYYY',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};


@Component({
  selector: 'app-errorlog',
  templateUrl: './errorlog.component.html',
  styleUrls: ['./errorlog.component.less'],
  providers: [

    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATSS },
  ],
})
export class ErrorlogComponent implements OnInit {

  M_FromDate;
  M_ToDate;
  FromDate = new Date();
  ToDate = new Date();
  mintoDate = new Date();
  todatedisabled = true;
  @ViewChild('Errorlog') Form: NgForm


  displayedColumnssq = ['SNo', 'Description'];
  dataSourcesq = new MatTableDataSource();

  date = new FormControl(new Date());
  serializedDate = new FormControl((new Date()).toISOString());

  constructor(public commonService: CommonService<ErrorLogviewmodel>,
    public datepipe: DatePipe, public el: ElementRef,
    public appComponent: AppComponent,
    private formBuilder: FormBuilder,
    private router: Router,) {
  }
  Getloctime;
  ngOnInit() {
    localStorage.getItem("CompanyID");
    this.Getloctime = localStorage.getItem('GMTTIME');
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourcesq.filter = filterValue.trim().toLowerCase();
  }
  currentPeriodClicked() {

  }
  Search() {
    debugger;
    let Fromdate = this.M_FromDate.toISOString();
    let Todate = this.M_ToDate.toISOString();
    this.commonService.getListOfData("Errorlog/Geterrorlogfile/" + Fromdate + '/' + Todate + '/' + this.Getloctime).subscribe(data => {
      if (data.Totalerrorlog != null) {
        debugger;
        data.Totalerrorlog = data.Totalerrorlog.filter(function (item) {
          return item.totallines !== "";
        });
        this.dataSourcesq.data = data.Totalerrorlog;
      } else {
        Swal.fire({
          type: 'warning',
          title: 'Data Not Found',
          heightAuto: true,
          width: 'auto'
        });
      }
    });


  }

  FromDateclick() {
    debugger;
    this.todatedisabled = false;
    this.mintoDate = this.M_FromDate;
  }


  toggleopen() {
    this.todatedisabled = true;
    this.M_ToDate = '';
  }

}
