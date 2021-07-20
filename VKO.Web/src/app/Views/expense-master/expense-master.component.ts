import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatTableDataSource, MatSort } from '@angular/material';
import { VendorMasters, Opticamreturnsubmitdetails } from 'src/app/Models/ViewModels/VendorMasterWebModel';
import { CommonService } from 'src/app/shared/common.service';
import { NgForm } from '@angular/forms';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';
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
  selector: 'app-expense-master',
  templateUrl: './expense-master.component.html',
  styleUrls: ['./expense-master.component.less'],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class ExpenseMasterComponent implements OnInit {

  constructor(public el: ElementRef,
    public commonService: CommonService<VendorMasters>,
    private router: Router,
    public dialog: MatDialog, public Datepipe: DatePipe) { }

  displayedColumns = ['Actions', 'Description','Statuss'];
  dataSource = new MatTableDataSource();
  @ViewChild('ExpenseMasterForm') Form: NgForm
  @ViewChild(MatSort) sort: MatSort;
  DLDateMAXop = new Date();
  M_DAte;
  M_Paidto;
  Hideupdatebtn: boolean = false;
  hidestatustable: boolean = false;
  Hidesubmitbtn: boolean = false;
  M_Description;

  ngOnInit() {
    this.Hidesubmitbtn = true;
  }
  Cancelhelp(Form: NgForm) {
    Form.resetForm();
    this.Hideupdatebtn = false;
    this.Hidesubmitbtn = true;
    this.hidestatustable = false;
  }
  Gethelp() {
    debugger;
    this.commonService.getListOfData('Expense/GetExpenseMaster/' + localStorage.getItem("CompanyID"))
      .subscribe(data => {
        if (data.length != 0) {
          this.dataSource.data = data;
          this.hidestatustable = true;
        } else {
          Swal.fire({
            type: 'warning',
            title: 'warning',
            text: 'No Data',
            position: 'top-end',
            showConfirmButton: false,
            timer: 2500,
            customClass: {
              popup: 'alert-warp',
              container: 'alert-container',
            },
          });
        }
      });
  }
  Submitdata(Form: NgForm) {
    if (Form.valid) {
      if (this.M_Description != null && this.M_Description != undefined && this.M_Description != " " && this.M_Description  != "") {
        this.commonService.getListOfData('Expense/InsertExpenseMaster/' + this.M_Description + '/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem("userroleID"))
          .subscribe(data => {
            if (data.Success == true) {
              Swal.fire({
                type: 'success',
                title: 'success',
                text: 'Saved Successfully',
                position: 'top-end',
                showConfirmButton: false,
                timer: 2500,
                customClass: {
                  popup: 'alert-warp',
                  container: 'alert-container',
                },
              });
              Form.resetForm();
              this.Hideupdatebtn = false;
              this.Hidesubmitbtn = true;
              this.hidestatustable = false;
            } else {
              Swal.fire({
                type: 'warning',
                title: 'warning',
                text: 'Invalid Data',
                position: 'top-end',
                showConfirmButton: false,
                timer: 2500,
                customClass: {
                  popup: 'alert-warp',
                  container: 'alert-container',
                },
              });
            }
          });
      } else {
        Swal.fire({
          type: 'warning',
          title: 'warning',
          text: 'Enter Description',
          position: 'top-end',
          showConfirmButton: false,
          timer: 2500,
          customClass: {
            popup: 'alert-warp',
            container: 'alert-container',
          },
        });
      }
    }
  }
  activecol;
  Dataid;
  Datadesc;
  DataStatus;
  selectitem(data) {
    debugger;
    this.hidestatustable = false;
    this.Hidesubmitbtn = false;
    this.Hideupdatebtn = true;
    this.activecol = data.Status;
    this.M_Description = data.Description;
    this.Dataid = data.ID;
    this.Datadesc = data.Description;
    this.DataStatus = data.Status;
  }
  Deletedata(Form: NgForm) {
    debugger;
    if (Form.valid) {
      this.commonService.getListOfData('Expense/DeleteExpenseMaster/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem("userroleID") + '/' + this.Dataid)
        .subscribe(data => {
          if (data.Success == true) {
            Swal.fire({
              type: 'success',
              title: 'success',
              text: 'Deleted Successfully',
              position: 'top-end',
              showConfirmButton: false,
              timer: 2500,
              customClass: {
                popup: 'alert-warp',
                container: 'alert-container',
              },
            });
            Form.resetForm();
            this.Hideupdatebtn = false;
            this.Hidesubmitbtn = true;
            this.hidestatustable = false;
          } else {
            Swal.fire({
              type: 'warning',
              title: 'warning',
              text: 'Invalid Data',
              position: 'top-end',
              showConfirmButton: false,
              timer: 2500,
              customClass: {
                popup: 'alert-warp',
                container: 'alert-container',
              },
            });
          }
        });
    }
  }
  Updatedata(Form: NgForm) {
    debugger;
    if (Form.valid) {
      if (this.Datadesc == this.M_Description && this.DataStatus == this.activecol) {
        Swal.fire({
          type: 'warning',
          title: 'warning',
          text: 'Description Duplicate',
          position: 'top-end',
          showConfirmButton: false,
          timer: 2500,
          customClass: {
            popup: 'alert-warp',
            container: 'alert-container',
          },
        });
      } else {
        this.commonService.getListOfData('Expense/UpdateExpenseMaster/' + this.M_Description + '/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem("userroleID") + '/' + this.Dataid + '/' + this.activecol)
          .subscribe(data => {
            if (data.Success == true) {
              Swal.fire({
                type: 'success',
                title: 'success',
                text: 'Saved Successfully',
                position: 'top-end',
                showConfirmButton: false,
                timer: 2500,
                customClass: {
                  popup: 'alert-warp',
                  container: 'alert-container',
                },
              });
              Form.resetForm();
              this.Hideupdatebtn = false;
              this.Hidesubmitbtn = true;
              this.hidestatustable = false;
            } else {
              Swal.fire({
                type: 'warning',
                title: 'warning',
                text: 'Invalid Data',
                position: 'top-end',
                showConfirmButton: false,
                timer: 2500,
                customClass: {
                  popup: 'alert-warp',
                  container: 'alert-container',
                },
              });
            }
          });
      }
    } else {
      Swal.fire({
        type: 'warning',
        title: 'warning',
        text: 'Check Inputs',
        position: 'top-end',
        showConfirmButton: false,
        timer: 2500,
        customClass: {
          popup: 'alert-warp',
          container: 'alert-container',
        },
      });
    }
  }


  /////////////////////////////////////////////////////////The End////////////////////////////////////////////////////
}
