import { Component, OnInit, ViewChild } from '@angular/core';
import { UsersVsRole } from 'src/app/Models/ViewModels/UsersVsRole';
import { CommonService } from 'src/app/shared/common.service';
import { MatTableDataSource } from '@angular/material';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-vs-role',
  templateUrl: './user-vs-role.component.html',
  styleUrls: ['./user-vs-role.component.less']
})
export class UserVsRoleComponent implements OnInit {

  @ViewChild('UserVsRole') Form: NgForm

  RoleDescription;
  GetDoctorDetails;
  GetDoctorDetails1;
  GetEmployeeDetails1;
  GetEmployeeDetails;
  M_RoleDescription;
  Dtag;
  Etag;
  backdrop;
  cancelblock;
  constructor(public commonService: CommonService<UsersVsRole>, private router: Router, ) { }
  disableSubmit = true;
  accessdata;
  CompanyID;
  docotorid;
  ngOnInit()
  {
    this.CompanyID = localStorage.getItem("CompanyID");
    this.docotorid = localStorage.getItem('userroleID');
    //////////////////////////////////////////////////////////////////////////////////
    var Pathname = "Administrationlazy/UserVsRole";
    var n = Pathname;
    var sstring = n.includes("/");
    var Objdata = JSON.parse(localStorage.getItem("AllCollectionData"));
    if (sstring == false) {
      if (Objdata.find(el => el.Parentmoduledescription === Pathname)) {
        //////////////////////////////////////////////////////////////////////////////
        this.commonService.getListOfData('Common/GetAccessdetails/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem("userroleID") + '/' + Pathname).subscribe(data => {
          this.commonService.data = data;
          debugger;
          this.accessdata = data.GetAvccessDetails;
          if (this.accessdata.find(x => x.Add == true)) {
            this.disableSubmit = false;
          } else {
            this.disableSubmit = true;
          }
          //if (this.accessdata.find(x => x.Edit == true)) {
          //  this.disableSearch = false;
          //  this.disableUpdate = false;
          //} else {
          //  this.disableSearch = true;
          //  this.disableUpdate = true;
          //}
          //if (this.accessdata.find(x => x.Print == true)) {
          //  this.disablePrint = false;
          //  //this.DisableReprint = false;
          //} else {
          //  this.disablePrint = true;
          //  //this.DisableReprint = true;
          //}
          //if (this.accessdata.find(x => x.Delete == true)) {
          //  this.disableDelete = false;
          //} else {
          //  this.disableDelete = true;
          //}
        });
        //////////////////////////////////////////////////////////////////////////////
        this.commonService.data = new UsersVsRole();
        this.getAllDropdowns();
      }
      else {

        Swal.fire({
          text: "Un-Authorized Access, Please contact Administrator",
          type: 'warning',
        });
        this.commonService.getListOfData('Common/Getlogdetails/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem("Doctorname") + '/' + "UserVsRole").subscribe(data => {
          this.router.navigate(['dash']);
        });
      }
    }
    else if (sstring == true) {
      if (Objdata.find(el => el.Parentmoduledescription === Pathname)) {
        //////////////////////////////////////////////////////////////////////////////
        this.commonService.getListOfData('Common/GetAccessdetailsstring/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem("userroleID") + '/' + Pathname).subscribe(data => {
          this.commonService.data = data;
          debugger;
          this.accessdata = data.GetAvccessDetails;
          if (this.accessdata.find(x => x.Add == true)) {
            this.disableSubmit = false;
          } else {
            this.disableSubmit = true;
          }
          //if (this.accessdata.find(x => x.Edit == true)) {
          //  this.disableSearch = false;
          //  this.disableUpdate = false;
          //} else {
          //  this.disableSearch = true;
          //  this.disableUpdate = true;
          //}
          //if (this.accessdata.find(x => x.Print == true)) {
          //  this.disablePrint = false;
          //  //this.DisableReprint = false;
          //} else {
          //  this.disablePrint = true;
          //  //this.DisableReprint = true;
          //}
          //if (this.accessdata.find(x => x.Delete == true)) {
          //  this.disableDelete = false;
          //} else {
          //  this.disableDelete = true;
          //}
        });
        //////////////////////////////////////////////////////////////////////////////
        this.commonService.data = new UsersVsRole();
        this.getAllDropdowns();
      }
      else {

        Swal.fire({
          text: "Un-Authorized Access, Please contact Administrator",
          type: 'warning',
        });
        this.commonService.getListOfData('Common/Getlogdetails/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem("Doctorname") + '/' + "UserVsRole").subscribe(data => {
          this.router.navigate(['dash']);
        });
      }
    }
    /////////////////////////////////////////////////////////////////////////////////////


  }

  displayedColumns: string[] = ['SNo', 'UserName','PhoneNO','EmailID','select',];
  dataSource = new MatTableDataSource();
  RoleDescriptionEvent()
  {
    debugger;
    this.dataSource.data = [];
    this.commonService.getListOfData('UserVsRole/GetUsersDetails/' + localStorage.getItem('CompanyID') + '/' + this.M_RoleDescription.Value)
      .subscribe((data: any) => {
        debugger;    
        this.GetDoctorDetails1 = data.GetDoctorDetails1;
        this.GetEmployeeDetails1 = data.GetEmployeeDetails1;
        this.GetDoctorDetails = data.GetDoctorDetails;
        this.GetEmployeeDetails = data.GetEmployeeDetails;
        this.commonService.data.GetDoctorDetails1 = this.GetDoctorDetails1;
        this.commonService.data.GetEmployeeDetails1 = this.GetEmployeeDetails1;
      });
  }
  getAllDropdowns() {
    debugger;
    this.commonService.getListOfData('Common/GetRoleDescription').subscribe(data => { this.RoleDescription = data; });
  }

  DoctorDetails()
  {
    debugger;
    this.dataSource.data = [];
    this.dataSource.data = this.GetDoctorDetails; 
    this.GetEmployeeDetails1 = [];
    this.Dtag = "M";
    this.Etag = null;
  }
  EmployeeDetails()
  {
    debugger; 
    this.dataSource.data = [];
    this.dataSource.data = this.GetEmployeeDetails;
    this.GetDoctorDetails1 = [];
    this.Etag = "E";
    this.Dtag = null;
  }



  SelectUserVsRoleValue(item) {
    debugger;

    if (this.Dtag == "M")
    {
      if (this.commonService.data.GetDoctorDetails1.length == 0) {
        this.commonService.data.GetDoctorDetails1.push(item);
      }
      else {
        if (this.commonService.data.GetDoctorDetails1.some(x => x.userId == item.userId)) {
          for (var i = 0; i < this.commonService.data.GetDoctorDetails1.length; i++) {
            if (this.commonService.data.GetDoctorDetails1[i].userId == item.userId) {
              this.commonService.data.GetDoctorDetails1.splice(i, 1);
              break;
            }
          }
        }
        else {
          this.commonService.data.GetDoctorDetails1.push(item);
        }
      }
    }
    else 
    {
      debugger;
      if (this.commonService.data.GetEmployeeDetails1.length == 0) {
        this.commonService.data.GetEmployeeDetails1.push(item);
      }
      else {
        if (this.commonService.data.GetEmployeeDetails1.some(x => x.userId == item.userId)) {
          for (var i = 0; i < this.commonService.data.GetEmployeeDetails1.length; i++) {
            if (this.commonService.data.GetEmployeeDetails1[i].userId == item.userId) {
              this.commonService.data.GetEmployeeDetails1.splice(i, 1);
              break;
            }
          }
        }
        else {
          this.commonService.data.GetEmployeeDetails1.push(item);
        }
      }
    }
  }


  onSubmit(form: NgForm) {
    debugger;
    try {
      if (form.valid) {
        this.commonService.postData('UserVsRole/InsertUserVsRole/' + this.M_RoleDescription.Value + '/' + parseInt(localStorage.getItem('userroleID')) + '/' + localStorage.getItem('CompanyID') + '/' + this.Dtag, this.commonService.data)
          .subscribe(data => {
            if (data.Success == true) {
              this.Form.onReset();
              this.dataSource.data = [];
              //this.checked = false;
              Swal.fire({
                position: 'center',
                type: 'success',
                title: 'Saved Successfully',
                showConfirmButton: false,
                timer: 2000
              });
            }
            else {
              Swal.fire({
                position: 'center',
                type: 'warning',
                title: 'Some Data Missing',
                showConfirmButton: false,
                timer: 2000
              });
            }

          });

      }
    }
    catch (Error) {
      alert(Error.message);

      this.commonService.getListOfData('Common/ErrorList/' + Error.message + '/' + "user-vs-role Submit" + '/' + this.CompanyID + '/' + this.docotorid + '/')
        .subscribe(data => {
          debugger;

        });
    }
  }



  CancelClk()
  {
      this.backdrop = 'block';
      this.cancelblock = 'block';
  }
  cancelClose() {
    this.backdrop = 'none';
    this.cancelblock = 'none';
  }
  CloseNo() {
    this.backdrop = 'none';
    this.cancelblock = 'none';
  }
  CloseYes() {
  this.Form.onReset();
  this.dataSource.data = [];
    this.backdrop = 'none';
    this.cancelblock = 'none';
  }


  ///////////////////////////////////////////////////////////////

  accesspopup;

  Getformaccess() {
    debugger;
    var Pathname = "Administrationlazy/UserVsRole";
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
}
