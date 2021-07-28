import { Component, OnInit, ElementRef, ChangeDetectorRef, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormControl, NgForm, Form } from '@angular/forms';
import { MatTableDataSource, MatSort, MatPaginator, DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material';
import Swal from 'sweetalert2';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { CommonService } from 'src/app/shared/common.service';
import { AppComponent } from 'src/app/app.component';
import { VALID } from '@angular/forms/src/model';
import * as XLSX from 'xlsx';

import html2canvas from "html2canvas";
import * as _ from 'lodash';
import { Router } from '@angular/router';
import { UsersListView } from '../../Models/ViewModels/userslistview';
import { User_Master } from '../../Models/Users';
//import * as fs from 'fs';
import { readFileSync } from 'fs';
import { saveAs } from 'file-saver';
import path = require('path');
declare var $: any;

export const MY_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD-MMM-YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'DD-MM-YYYY',
    monthYearA11yLabel: 'MMMM YYYY',
  },
}
@Component({
  selector: 'app-userslist',
  templateUrl: './userslist.component.html',
  styleUrls: ['./userslist.component.less'],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },

  ],
})
export class UserslistComponent implements OnInit {

  constructor(public commonService: CommonService<UsersListView>, public datepipe: DatePipe,
    public appComponent: AppComponent, public el: ElementRef, private changeDatectorrefs: ChangeDetectorRef,
    private router: Router) { }

  CompanyID;
  accessdata;
  orgname;

  displayedColumns = ['Action', 'UserName', 'Role', 'Status'];
  dataSource = new MatTableDataSource();
  //@ViewChild(MatPaginator) paginator: MatPaginator;

  @ViewChild('usersPaginator', { static: true } as any) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true } as any) sort: MatSort;
  TableData: boolean = false;
  utextbox: boolean = false;
  docotorid;
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  ngOnInit() {

    this.orgname = localStorage.getItem('Companyname');
    this.docotorid = localStorage.getItem('userroleID');
    var Pathname = "Administrationlazy/userslist";
    var Objdata = JSON.parse(localStorage.getItem("AllCollectionData"));


    var n = Pathname;
    var sstring = n.includes("/");

    if (sstring == false) {

      if (Objdata.find(el => el.Parentmoduledescription === Pathname)) {

        this.commonService.getListOfData('Common/GetAccessdetails/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem("userroleID") + '/' + Pathname).subscribe(data => {
          this.commonService.data = data;
          debugger;
          this.accessdata = data.GetAvccessDetails;

          if (this.accessdata.find(x => x.Add == true)) {
            //this.disSubmit = false;
          } else {
            //this.disSubmit = true;
          }

        });

        this.CompanyID = localStorage.getItem("CompanyID");


      }
      else {

        Swal.fire({
          text: "Un-Authorized Access, Please contact Administrator",
          type: 'warning',
        });
        this.commonService.getListOfData('Common/Getlogdetails/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem("Doctorname") + '/' + Pathname).subscribe(data => {
          this.router.navigate(['dash']);
        });


      }
    }

    else if (sstring == true) {

      if (Objdata.find(el => el.Parentmoduledescription === Pathname)) {

        this.commonService.getListOfData('Common/GetAccessdetailsstring/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem("userroleID") + '/' + Pathname).subscribe(data => {
          this.commonService.data = data;
          debugger;
          this.accessdata = data.GetAvccessDetails;

          if (this.accessdata.find(x => x.Add == true)) {
            //this.disSubmit = false;
          } else {
            //this.disSubmit = true;
          }

        });

        this.CompanyID = localStorage.getItem("CompanyID");


      }
      else {

        Swal.fire({
          text: "Un-Authorized Access, Please contact Administrator",
          type: 'warning',
        });
        this.commonService.getListOfData('Common/Getlogdetailsstring/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem("Doctorname") + '/' + Pathname).subscribe(data => {
          this.router.navigate(['dash']);
        });


      }
    }
  }

  backdrop;
  accesspopup;
  urole;
  uname;
  IsActive;
  usidd;
  selecttypei(item) {
    debugger;
    this.usidd = item.usid;
    this.uname = item.username;
    this.IsActive = item.status.toString();
    this.urole = item.role;
    this.utextbox = true;
    this.TableData = false;
    //this.hiddenSubmiti = false;
    //this.hiddenUpdatei = true;
    //this.hiddenDeletei = true;
  }

  Getformaccess() {
    debugger;
    var Pathname = "Administrationlazy/userslist";
    var n = Pathname;
    var sstring = n.includes("/");
    if (sstring == false) {
      this.commonService.getListOfData('Common/GetAccessdetails/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem("userroleID") + '/' + Pathname).subscribe(data => {
        debugger;
        this.accessdata = data.GetAvccessDetails;
        this.backdrop = 'block';
        this.accesspopup = 'block';
      });
    }

    else if (sstring == true) {
      this.commonService.getListOfData('Common/GetAccessdetailsstring/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem("userroleID") + '/' + Pathname).subscribe(data => {
        debugger;
        this.accessdata = data.GetAvccessDetails;
        this.backdrop = 'block';
        this.accesspopup = 'block';
      });
    }
  }
  modalcloseAccessOk() {
    this.backdrop = 'none';
    this.accesspopup = 'none';
  }

  Submit() {
    debugger;

    this.commonService.getListOfData('UserList/GetUsersList/' + this.CompanyID + '/')
      .subscribe(data => {
        debugger;

        if (data.UDetails.length > 0) {
          this.dataSource.data = data.UDetails;
          this.TableData = true;

        }
        else {
          this.TableData = false;
          Swal.fire({
            type: 'warning',
            title: 'warning',
            text: 'Invalid data',
            position: 'top-end',
            showConfirmButton: false,
            timer: 1500,
            customClass: {
              popup: 'alert-warp',
              container: 'alert-container',
            },
          });
        }



      });

  }
  onCancel() {
    this.uname = '';
    this.urole = '';
    this.IsActive = '';
    this.utextbox = false;
    this.TableData = false;
  }
  //private fs = require('fs');

  minToDate = new Date();

  onSubmit(form: NgForm) {
    debugger;
    try {
      this.commonService.data.Users = new User_Master();

      if (this.IsActive == 'Active') {
        this.commonService.data.Users.Isactive = true;
      }

      else {
        this.commonService.data.Users.Isactive = false;
      }

      this.commonService.data.Users.Updatedby = this.docotorid;

      console.log(this.commonService.data);

      this.commonService.postData('UserList/UpdateStatus/' + this.usidd + '/', this.commonService.data)
        .subscribe(data => {
          if (data.Success == true) {
            debugger;
            Swal.fire({
              type: 'success',
              title: 'success',
              text: 'User updated successfully',
              position: 'top-end',
              showConfirmButton: false,
              timer: 1500,
              customClass: {
                popup: 'alert-warp',
                container: 'alert-container',
              },
            });
            this.utextbox = false;
            this.TableData = false;
          }
          else if (data.Success == false) {
            debugger
            Swal.fire({
              type: 'warning',
              title: 'warning',
              text: 'Invalid Data',
              position: 'top-end',
              showConfirmButton: false,
              timer: 1500,
              customClass: {
                popup: 'alert-warp',
                container: 'alert-container',
              },
            });
          }
        });

    }

    catch (Error) {
      alert(Error.message);

      this.commonService.getListOfData('Common/ErrorList/' + Error.message + '/' + "Users List" + '/' + this.CompanyID + '/' + this.docotorid + '/')
        .subscribe(data => {
          debugger;

        });
    }
}


   

}
