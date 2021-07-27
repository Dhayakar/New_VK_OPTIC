import { Component, OnInit, ElementRef, Inject, ViewChild } from '@angular/core';
import { CommonService } from '../../shared/common.service';
import { AppComponent } from '../../app.component';
import { DatePipe } from '@angular/common';
import { FormControl, Validators, FormBuilder, FormGroupDirective, NgForm } from '@angular/forms';
import { MatTableDataSource, MatSort, ErrorStateMatcher } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { UsersVsRole, } from 'src/app/Models/ViewModels/UsersVsRole';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { MatCheckboxChange } from '@angular/material';
import Swal from 'sweetalert2';
import { ChangeDetectionStrategy,  ViewEncapsulation } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { MatSlideToggleChange } from '@angular/material';
import { MatPasswordStrengthComponent } from '@angular-material-extensions/password-strength';
import { Router } from '@angular/router';


declare var $: any;
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.less'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersComponent implements OnInit {

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  matcher = new MyErrorStateMatcher();
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns: string[] = ['checked', 'DoctorID', 'DoctorName', 'RegistrationNumber'];
  dataSource = new MatTableDataSource();
  displayedColumns1: string[] = ['checked', 'EmployeeID', 'EmployeeName', 'DOJ'];
  dataSource1 = new MatTableDataSource();
  Checked: any = false;
  myCheckbox: any;

  constructor(public commonService: CommonService<UsersVsRole>,
    public datepipe: DatePipe, public el: ElementRef,
    public appComponent: AppComponent,
    private formBuilder: FormBuilder,
    private router: Router,
    public dialog: MatDialog, ) {

  }
  inputType: true;
  roles;
  Externalroles;
  isHidden;
  isHidden1;
  USERSELECTION_M;
  rolesfulldata;
  Hideinternaldata: boolean = false;
  externaldata: boolean = false;
  Hiderole: boolean = false;
  ngOnInit() {
    this.getalldropdowns();
    this.Hideinternaldata = false;
    this.Hiderole = false;
    this.externaldata = false;
  }
  m_confirm;
  onBlurMethod(Confdata,passdata) {
    
    if (Confdata != passdata) {
      this.m_confirm = '';
      Swal.fire({
        position: 'center',
        type: 'warning',
        title: 'Passwords Doesn`t Match',
        showConfirmButton: false,
        timer: 2000
      });

    } else {

    }

  }

  showDetails: boolean;
  onStrengthChanged(strength: number) {
    console.log('password strength = ', strength);
  }
  accessdata;
  accesspopup;
  backdrop;
  Getformaccess() {
    
    this.commonService.getListOfData('Common/GetAccessdetailsstring/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem("userroleID") + '/' + "Administrationlazy/users").subscribe(data => {
      
      this.accessdata = data.GetAvccessDetails;
      this.backdrop = 'block';
      this.accesspopup = 'block';
    });
  }

  modalcloseAccessOk() {
    this.backdrop = 'none';
    this.accesspopup = 'none';
  }
  getalldropdowns() {
    this.commonService.getListOfData('Common/getrolevaluesexceptadmin').subscribe(data => { this.roles = data; });
    this.commonService.getListOfData('Common/getrolevaluesexceptadmin').subscribe(data => { this.Externalroles = data; });
  }

  userselectionChange() {
    if (this.USERSELECTION_M == "Internal") {
      this.Hideinternaldata = true;
      this.Hiderole = false;
      this.externaldata = false;
    } else {
      this.Hideinternaldata = false;
      this.Hiderole = false;
      this.externaldata = true;
      
    }
  }
  GetrolevaluesChange(roledata) {
    
    var roletext = roledata.Text;
    this.commonService.getListOfData('User/GetRoledetails/' + roletext + '/' + localStorage.getItem("CompanyID")).subscribe(data => {
      
      this.commonService.data = data;
      this.Hiderole = true;
      this.rolesfulldata = data.AccessNames;
    });


  }

  onBlurExternalMethod(Exterpass, externalConfirm) {
    
    if (Exterpass != externalConfirm) {
      this.m_confirm = '';
      Swal.fire({
        position: 'center',
        type: 'warning',
        title: 'Passwords Doesn`t Match',
      });

    } 
  }


  onSubmitExternalRole(Role,ExternalEmailId, ExtrenalConfirmpassword) {
    
    this.commonService.data = new UsersVsRole();
    this.commonService.data.ExternalUserDetails.Userrole = Role.Text;
    this.commonService.data.ExternalUserDetails.Emaildid = ExternalEmailId;
    this.commonService.data.ExternalUserDetails.password = ExtrenalConfirmpassword;
    this.commonService.data.ExternalUserDetails.companyid = localStorage.getItem("CompanyID");
    this.commonService.postData('User/PostExternaluserdetails', this.commonService.data).subscribe(data => {
      
      this.commonService.data = data;

      if (data.Success == true) {
        Swal.fire({
          position: 'center',
          type: 'success',
          title: 'User Saved Successfully',
        });
        this.router.navigateByUrl('/dash', { skipLocationChange: true }).then(() => {
          this.router.navigate(['Administrationlazy/users']);
        });
      } else {
        Swal.fire({
          position: 'center',
          type: 'warning',
          title: 'Something went Wrong',
        });
      }

    });
  }


  onSubmit(BASEROLE, USERROLE, PASS, CONFIRMPASS, AccessRole) {
    
    this.commonService.data = new UsersVsRole();
    this.commonService.data.Inetrnaluserdetails.Baserole = BASEROLE.Text;
    this.commonService.data.Inetrnaluserdetails.Userrole = USERROLE;
    this.commonService.data.Inetrnaluserdetails.password = PASS;
    this.commonService.data.Inetrnaluserdetails.Confirmpassword = CONFIRMPASS;

    if (AccessRole == "NormalUser") {
      this.commonService.data.Inetrnaluserdetails.AccessRole = "N";
    } else {
      this.commonService.data.Inetrnaluserdetails.AccessRole = "A";
    }

    
    this.commonService.data.Inetrnaluserdetails.companyid = localStorage.getItem("CompanyID");
    this.commonService.data.Inetrnaluserdetails.Userid = localStorage.getItem("userroleID");
    this.commonService.postData('User/Postinternaluserdetails', this.commonService.data).subscribe(data => {
      
      this.commonService.data = data;

      if (data.Check != "No Mail ID") {

        if (data.Success == true) {
          Swal.fire({
            position: 'center',
            type: 'success',
            title: 'User Saved Successfully',
          });
          this.router.navigateByUrl('/dash', { skipLocationChange: true }).then(() => {
            this.router.navigate(['Administrationlazy/users']);
          });
        } else {
          Swal.fire({
            position: 'center',
            type: 'warning',
            title: 'Something went Wrong',
          });
        }
      } else {
        Swal.fire({
          position: 'center',
          type: 'warning',
          title: 'Please Update E-Mail ID for this User',
        });
      }
 

    });

  }

  Cancel() {
       this.router.navigateByUrl('/dash', { skipLocationChange: true }).then(() => {
        this.router.navigate(['Administrationlazy/users']);
      });
  }



/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  }

