import { Component, OnInit, ViewChild, Input, ElementRef, Output, EventEmitter, Injectable, Inject, ChangeDetectorRef } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { MatTableDataSource, MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { CommonService } from '../../shared/common.service';
import { RegistrationMaster } from '../../Models/ViewModels/RegistrationMasterWebViewModel ';
import { AppComponent } from 'src/app/app.component';
import Swal from 'sweetalert2';
import { DomSanitizer } from '@angular/platform-browser';
// import { TweenMax, Sine } from "gsap";

declare var $: any;



@Component({
  providers: [AppComponent],
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})


@Injectable()
export class LoginComponent implements OnInit {


  constructor(public datepipe: DatePipe, public el: ElementRef,
              public commonService: CommonService<RegistrationMaster>,
              private route: ActivatedRoute,
              private router: Router,
    public dialog: MatDialog,
    public appsComponent: AppComponent,
  ) { }


  email = new FormControl('', [Validators.required, Validators.email]);


  hide = true;

  title = 'WYNKWeb';
  ishideen = true;
  ishiden = true;

  istotalhidden = true;
  isbtnhidden = true;
  isreghiden = true;
  isrefhiden = true;
  isinvhiden = true;
  isdochiden = true;
  isHidden = false;
  isHidden1 = false;
  phhidden = false;
  refhidden = false;
  medicalhidden = false;
  HIdeRoledata = false;
  userDoctorID = 0;

  @Output() setLoggedIn = new EventEmitter<object>();
  @Output() setLoggedInblock = new EventEmitter<object>();

  HIdecompany = false;

  passwordlogin;

  dataSource = new MatTableDataSource();
  dataSource1 = new MatTableDataSource();
  user;
  password;
  roleid;
  namesd;
  useraccess;
  Master;
  ismaster;
  usersCreation;
  isOnelinemaster;
  DrugPropertyMaster;
  isDrugPropertyMaster;
  tokenauthenication;
  SelectCompanyWIse;
  SelectCompany;
  SelectRoles;
  SelectRolesWIse;
  loginblock;
  Branch;
  SelectBranchWIse;
  SubmitTdisabled = false;
  Previoussuccesslogin;
  usernames;
  backdrop;
  passwordblock;
  dataaa;


  getErrorMessage() {
    return this.email.hasError('required') ? 'You must enter a value' :
      this.email.hasError('email') ? 'Not a valid email' :
        '';
  }
  ngOnInit() {
    this.HIdecompany = false;
     }
  loginforgotpasswordClose() {
    this.backdrop = 'none';
    this.passwordlogin = 'none';
  }

  login() {

    debugger;
    if (this.user == null && this.password == null || this.user == '' && this.password == '' || this.user == undefined && this.password == undefined) {
      Swal.fire({
        type: 'warning',
        title: 'warning',
        text: 'Credentials are null',
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          popup: 'alert-warp',
          container: 'alert-container',
        },
      });
    } else {
      if (this.Branch != undefined && this.SelectBranchWIse != undefined) {
        this.commonService.getListOfData('ManagementDashboard/GetUsernamepasswordWITHPARENTIDZERO/' + this.user + '/' + this.password + '/' + this.SelectBranchWIse + '/' + 'NoRole').subscribe(data => {
          debugger;
            this.userDoctorID = data.Userid;
            this.namesd = data.doctorname;
            this.roleid = data.Roleid;
          localStorage.setItem('GMTTIME', data.GMTUTCTime);
          //localStorage.setItem('REGAPPLICABLE', data.regapplicablevalues);
            localStorage.setItem('Countryflagcode', data.Compnayflag);
            localStorage.setItem('Menudoctorname', data.MenuDoctorname);
            localStorage.setItem('Menulogintime', data.Menulogindateandtime);
            localStorage.setItem('MenuBranch', data.MenecompanyBranch);
            localStorage.setItem('userReferrencetag', data.Referrencetag);
            localStorage.setItem('userDoctorID', data.ReferrenceIC);
            localStorage.setItem('userroleID', data.Userid);
            localStorage.setItem('Doctorname', data.doctorname);
            localStorage.setItem('Regnumber', data.Registrationnumber);
            localStorage.setItem('RoleDescription', data.RoleDescription);
            localStorage.setItem('Companyname', data.CompanyName);
            localStorage.setItem('CompanyID', data.CompanyID);
            this.router.navigate(['/dash']);
            this.appsComponent.moveToSelectedTab("Dashboard");
            this.setLoggedIn.emit();
          });
      } else {
        debugger;
        if (this.user != '' && this.password != '') {
          this.commonService.getListOfData('RegistrationMaster/GetUsernamepassword/' + this.user + '/' + this.password).subscribe(data => {
            this.commonService.data = data;

            if (data.doctorname != "No Users are found") {
  
                //this.backdrop = 'block';
                //this.loginblock = 'block';
       
                if (data.UserCompany != null) {
                  this.email.disable();
                  this.SubmitTdisabled = true;
                  this.HIdecompany = true;
                  //localStorage.setItem('userReferrencetag', data.Referrencetag);
                  //localStorage.setItem('userDoctorID', data.ReferrenceIC);
                  //localStorage.setItem('userroleID', data.Userid);
                  //localStorage.setItem('Companyname', data.CompanyName);
                  //localStorage.setItem('RoleDescription', data.RoleDescription);
                  this.SelectCompany = data.UserCompany;
                  this.Branch = data.CompanyName;
                } else {
                  Swal.fire({
                    type: 'warning',
                    title: 'warning',
                    text: 'Contact Admin',
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 1500,
                    customClass: {
                      popup: 'alert-warp',
                      container: 'alert-container',
                    },
                  });
                }

            } else {
              Swal.fire({
                type: 'warning',
                title: 'warning',
                text: 'Incorrect User credentials',
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
        } else {
          Swal.fire({
            type: 'warning',
            title: 'warning',
            text: 'Check Credentials',
            position: 'top-end',
            showConfirmButton: false,
            timer: 1500,
            customClass: {
              popup: 'alert-warp',
              container: 'alert-container',
            },
          });
        }
      }
    }

  }


  loginblockNo() {
    this.backdrop = 'none';
    this.loginblock = 'none';

  }
  loginblockYes(username, password) {




    // localStorage.setItem("Usertokenauthentication","Loggedoutblock")
    // this.setLoggedIn.emit();
    // this.backdrop = 'none';
    // this.loginblock = 'none';

    this.commonService.getListOfData('RegistrationMaster/DeleteTokenbasaedonlink/' + username).subscribe(data => {

      this.backdrop = 'none';
      this.loginblock = 'none';
    });

  }


  PrevioussuccessloginYes() {
    this.backdrop = 'none';
    this.Previoussuccesslogin = 'none';
  }

  Userother() {
    this.backdrop = 'block';
    this.passwordblock = 'block';
    this.usernames = '';
    this.password = '';
  }
  passwordblockClose() {
    this.backdrop = 'none';
    this.passwordblock = 'none';
  }
  Forgotlogin;
  emailf = new FormControl('', [Validators.required, Validators.email]);
  emailid;
  Emaildid;
  getErrorMessagef() {
    return this.emailf.hasError('required') ? 'You must enter a value' :
      this.emailf.hasError('email') ? 'Not a valid email' :
        '';
  }

  forgetpassword() {
    //const dialog = this.dialog.open(LoginDialogbox,
    //  {
    //    width: '40%',
    //  });

    this.backdrop = 'block';
    this.Forgotlogin = 'block';

  }

  ForgotloginOk() {

    this.backdrop = 'none';
    this.Forgotlogin = 'none';
  }

  Forlogtsend(mail) {
    try {
      this.Emaildid = mail;
      if (this.Emaildid != null) {

        Swal.fire({
          position: 'center',
          title: 'Please Wait ..!',
          showConfirmButton: false,
          timer: 2000
        });
        this.commonService.getListOfData('RegistrationMaster/Resetpassword/' + this.Emaildid).subscribe(data => {
          if (data.ResetMessage == 'Yes') {
            Swal.fire({
              position: 'center',
              type: 'success',
              title: 'Your password has been changed and sent to your E-Mail ID',
              showConfirmButton: false,
              timer: 2000
            });
            localStorage.clear();
            this.Emaildid = '';
            this.backdrop = 'none';
            this.Forgotlogin = 'none';
            this.router.navigate(['/login']);
          } else {
            Swal.fire({
              position: 'center',
              type: 'warning',
              title: 'Incorrect E-Mail Id',
              showConfirmButton: false,
              timer: 2000
            });
          }

        });
      } else {
        Swal.fire({
          position: 'center',
          type: 'warning',
          title: 'Please Enter your E-Mail Id to Continue..',
          showConfirmButton: false,
          timer: 2000
        });
      }
    } catch (Error) {
      let CID = localStorage.getItem('CompanyID');
      alert(Error.message);
      this.commonService.getListOfData('Common/ErrorList/' + Error.message + '/' + 'Login Component' + '/' + '1062' + '/' + localStorage.getItem('userroleID') + '/')
        .subscribe(data => {


        });
    }

  }


}
