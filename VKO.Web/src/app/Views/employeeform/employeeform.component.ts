import { Component, OnInit, ElementRef, ViewChild, Inject, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ErrorStateMatcher, MAT_DATE_LOCALE, MAT_DATE_FORMATS, DateAdapter } from '@angular/material/core';
import { CommonService } from '../../shared/common.service';
import { AppComponent } from '../../app.component';
import { DatePipe } from '@angular/common';
import { Employeemasters, empqua, empqua1 } from '../../Models/ViewModels/EmployeeMaster_ViewModel';
import { MatSort, MatTableDataSource, MatPaginator } from '@angular/material'
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';

import html2canvas from 'html2canvas';
import { SearchComponent } from '../search/search.component';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Subject } from "rxjs";
import { Observable } from 'rxjs';
import { WebcamImage } from 'ngx-webcam';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { Employee_Master } from '../../Models/EmployeeMaster.model';
import { EmployeeStatutory } from '../../Models/EmployeeStatutory.model';
import { EmployeeBank } from '../../Models/EmployeeBank.model';
import { EmployeeCommunication } from '../../Models/EmployeeCommunication.model';
import { EmployeeExperience } from '../../Models/EmployeeExperience';
import { DATE } from 'ngx-bootstrap/chronos/units/constants';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';

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
  selector: 'app-employeeform',
  templateUrl: './employeeform.component.html',
  styleUrls: ['./employeeform.component.less'],
  encapsulation: ViewEncapsulation.None,
  providers: [


    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },

  ],

})
export class EmployeeformComponent implements OnInit {

  maxDate = new Date();
  QFmaxDate = new Date();
  QTmaxDate = new Date();
  EFmaxDate = new Date();
  ETmaxDate = new Date();

  displayedColumns1: string[] = ['Organization', 'FromDate', 'ToDate', 'Designation', 'Delete'];
  dataSource1 = new MatTableDataSource();

  displayedColumns2: string[] = ['Organization', 'FromDate', 'ToDate', 'Designation', 'Delete'];
  dataSource2 = new MatTableDataSource();

  displayedColumns3: string[] = ['AccountHoldername', 'Accountnumber', 'AccountType', 'BankName', 'BankBranch', 'Ifsccode', 'Delete'];
  dataSource3 = new MatTableDataSource();


  displayedColumns4: string[] = ['Qualification', 'Degree', 'Specialization', 'FromDate', 'ToDate', 'University', 'Institution', 'Yearofpassing', 'Percentageofmarks', 'Delete'];
  dataSource4 = new MatTableDataSource();

  displayedColumns5: string[] = ['Qualification', 'Degree', 'Specialization', 'FromDate', 'ToDate', 'University', 'Institution', 'Yearofpassing', 'Percentageofmarks', 'Delete'];
  dataSource5 = new MatTableDataSource();


  email1 = new FormControl('', [Validators.email]);

  getErrorMessage() {
    return this.email1.hasError('email') ? 'Not a valid email' :
      '';
  }


  email2 = new FormControl('', [Validators.email]);

  getErrorMessage1() {
    return this.email2.hasError('email2') ? 'Not a valid email' :
      '';
  }

  M_Employeeid;
  M_title;
  M_firstname;
  M_MiddleName;
  M_LastName;
  M_MaritalStatus;
  M_FatherHusbandName;
  M_PhysicallyChallenged;
  M_PresentAddress1;
  M_PresentAddress2;
  M_PresentAddress3;
  M_PresentLocationID;
  M_PresentLandmark;
  M_PermanentAddress1;
  M_PermanentAddress2;
  M_PermanentAddress3;
  M_PermanentLocationID;
  M_PermanentLandmark;
  M_Phone1;
  M_MobileNo1;
  M_MobileNo2;
  M_EmailID;
  M_AlternativeEmailID;
  M_Designation;
  M_DOJ;
  M_DOR;
  M_EmergencyContactName;
  M_EmergencyContactNo;
  M_BloodGroup;
  M_IsActive;
  M_AadhaarNo;
  M_PANNumber;
  M_Department;
  M_Category;
  M_ReasonofResignation;
  M_empname;
  BloodGroups;
  Titles;
  locations;

  backdrop;
  modalHelp1;

  cmpid;
  Departments;

  Qualificationname;
  Degreename;
  Specializationname;
  GratuityNumberrr: boolean = false;
  Specialization;
  M_QFromDate;
  M_QToDate;
  Dorrr = false;

  M_PFEligibility;
  M_PFNumber;
  M_PFCD;
  M_UAN;
  M_VPFPercentage;
  M_ESIEligibility;
  M_ESINumber;
  M_ESICommencementDate;
  M_PTEligibility;
  M_GratuityNumber;
  Percentage;
  Qualification;

  M_PermanentCity;
  PermanentState;
  PermanentCountry;
  PermanentCity;

  Universityname;
  University;
  yearofpassing;
  Institution;
  M_Bankname;
  M_BankBranch;
  M_AccountHoldersName;
  M_AccountType;
  M_AccountNumber;
  M_IFSCcode;

  M_Organization;
  M_FormDate;
  M_ToDate;
  M_Designationexp;
  Degree;
  VPFPercentagee = false;
  UANN = false;
  PFCDD = false;
  PFNumberr = false;

  ESINumberr = false;
  ESICommencementDatee = false;
  Institutionname;


  isHidden: boolean = false;

  Titleee: boolean = true;
  M_EmployeeNameee: boolean = true;
  M_DateofBirthhh: boolean = true;
  M_Genderrr: boolean = true;


  M_PermanentAddresss1 = false;
  M_PermanentAddresss2 = false;
  M_PermanentLocationIDD = true;
  M_PermanentLandmarkk = false;

  PresentAdd1 = false;
  PresentAdd2 = false;
  Presentcity = false;
  Presentloc = true;
  Presentland = false;

  disableaddItem = true;

  disableupItem = true;

  exptable: boolean = false;
  exptable1: boolean = false;
  expbank: boolean = false;
  expqua: boolean = false;
  expqua1: boolean = false;

  checkIfOthersAreSelected;

  checkIfadd: boolean = true;

  DORR = true;
  DOJJ = false;
  ReasonofResignationn = true;

  add = true;
  addquin = true;
  addup = false;
  addquup = false;

  aacountholdername = false;
  aacountnumber = false;
  aacounttype = false;
  bbankname = false;
  bbankbranch = false;

  public showWebcam = true;

  accessdata;
  accesspopup;
  modalcloseAccessOk() {
    this.backdrop = 'none';
    this.accesspopup = 'none';
  }
  Getformaccess() {
    debugger;
    var Pathname = "Commonmasterslazy/Employeemaster";
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

  displayedColumns: string[] = ['checked', 'Drop', 'EmployeeID', 'EmployeeName', 'PresentAddress1', 'PresentLocationID', 'PresentLandmark', 'PermanentAddress1', 'PermanentLocationID', 'PermanentLandmark', 'Phone1', 'EmailID', 'DOJ', 'DOR', 'Designation', 'EmergencyContactName', 'EmergencyContactNo', 'BloodGroup'];
  dataSource = new MatTableDataSource();

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('EmployeeForm') Form: NgForm

  constructor(public commonService: CommonService<Employeemasters>, public datepipe: DatePipe, public el: ElementRef, public appComponent: AppComponent, private formBuilder: FormBuilder, public dialog: MatDialog, private _sanitizer: DomSanitizer, private router: Router) { }



  cancelblock;


  cancel() {
    if (this.M_title != null || this.M_firstname != null || this.M_PresentAddress1 != null || this.M_PresentAddress2 != null || this.M_Dateofbirth != null || this.M_Gender != null || this.M_IFSCcode != null
      || this.M_PresentLocationID != null || this.M_PresentLandmark != null || this.M_PermanentAddress1 != null || this.M_PermanentAddress2 != null
      || this.M_PermanentLocationID != null || this.M_PermanentLandmark != null || this.M_Phone1 != null
      || this.M_Phone1 != null || this.M_DOJ != null || this.M_DOR != null || this.M_Designation != null || this.M_EmergencyContactName != null
      || this.M_EmergencyContactNo != null || this.M_BloodGroup != null || this.M_PFEligibility != null || this.M_PFNumber != null || this.M_PFCD != null
      || this.M_UAN != null || this.M_AadhaarNo != null || this.M_VPFPercentage != null || this.M_ESIEligibility != null || this.M_ESINumber != null
      || this.M_ESICommencementDate != null || this.M_PTEligibility != null || this.M_PANNumber != null || this.M_GratuityNumber != null
      || this.M_Bankname != null || this.M_BankBranch != null || this.M_AccountHoldersName != null || this.M_AccountType != null || this.M_AccountNumber != null) {
      if (this.M_EmailID != null) {
        this.backdrop = 'block';
        this.cancelblock = 'block';
      }
      else if (this.M_EmailID = '') { }
    }

    else {
      this.webcamImage = null;
      this.Form.onReset();
      this.reset();
    }
  }


  modalcloseOk() {
    this.backdrop = 'none';
    this.cancelblock = 'none';
  }
  modalSuccesssOk() {
    this.cancelblock = 'none';
    this.Form.onReset();
    this.reset();
  }



  reset() {
    this.M_EmailID = "";
    this.M_AlternativeEmailID = "";
    this.PresentAdd1 = false;
    this.PresentAdd2 = false;
    this.Presentcity = false;
    this.Presentloc = true;
    this.Presentland = false;
    this.checkIfadd = true;
    this.exptable1 = false;
    this.exptable = false;
    this.add = true;
    this.addquin = true;
    this.addup = false;
    this.addquup = false;
    this.expbank = false;
    this.expqua = false;
    this.expqua1 = false;

  }
  private trigger: Subject<void> = new Subject<void>();
  hidewebcamtrue: boolean = false;
  hiddenimageurl: boolean = false;
  public webcamImage: WebcamImage = null;

  Cityname;
  PermanentCityname;
  docotorid;

  disSubmit: boolean = true;
  disupdate: boolean = true;
  disdelete: boolean = true;


  ngOnInit() {

    var Pathname = "Commonmasterslazy/Employeemaster";
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
            this.disSubmit = false;
          } else {
            this.disSubmit = true;
          }
          if (this.accessdata.find(x => x.Edit == true)) {
            this.disupdate = false;
          } else {
            this.disupdate = true;
          }

          if (this.accessdata.find(x => x.Delete == true)) {
            this.disdelete = false;
          } else {
            this.disdelete = true;
          }
        });
        this.getAllDropdowns();
        localStorage.getItem("CompanyID");
        this.hidewebcamtrue = true;
        this.hiddenimageurl = false;
        this.M_PhysicallyChallenged = "false";
        this.docotorid = localStorage.getItem('userroleID');
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
            this.disSubmit = false;
          } else {
            this.disSubmit = true;
          }
          if (this.accessdata.find(x => x.Edit == true)) {
            this.disupdate = false;
          } else {
            this.disupdate = true;
          }
          if (this.accessdata.find(x => x.Delete == true)) {
            this.disdelete = false;
          } else {
            this.disdelete = true;
          }
        });
        this.getAllDropdowns();
        localStorage.getItem("CompanyID");
        this.hidewebcamtrue = true;
        this.hiddenimageurl = false;
        this.M_PhysicallyChallenged = "false";
        this.docotorid = localStorage.getItem('userroleID');
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












  State;
  Country;
  Cityy;
  Locationname;
  PermanentLocationname;
  Citysumbit() {
    debugger;
    this.commonService.getListOfData('EmployeeMaster/GetlocationDetails/' + this.Cityy + '/')
      .subscribe((data: any) => {
        debugger;

        this.State = data.ParentDescriptionstatee;
        this.Country = data.ParentDescriptioncountryy;
        if (this.State != null) {
          this.Presentloc = false;
        }
        else {
          this.Presentloc = true;
        }
      });

    this.commonService.getListOfData('Common/Getlocationvalues/' + this.Cityy).subscribe(data => {
      debugger;
      this.Locationname = data;
    });

  }


  PermanentCitysumbit() {
    debugger;
    this.commonService.getListOfData('EmployeeMaster/GetlocationDetails/' + this.M_PermanentCity + '/')
      .subscribe((data: any) => {
        debugger;

        this.PermanentState = data.ParentDescriptionstatee;
        this.PermanentCountry = data.ParentDescriptioncountryy;
        if (this.PermanentState != null) {
          this.M_PermanentLocationIDD = false;
        }
        else {
          this.M_PermanentLocationIDD = true;
        }
      });

    this.commonService.getListOfData('Common/Getlocationvalues/' + this.M_PermanentCity).subscribe(data => {
      debugger;
      this.PermanentLocationname = data;
    });

  }





  roles;

  getAllDropdowns() {

    this.commonService.getListOfData('Common/GetBloodGroups').subscribe(data => { this.BloodGroups = data; });
    this.commonService.getListOfData('Common/GetTitles').subscribe(data => { this.Titles = data; });
    // this.commonService.getListOfData('Common/GetlocDropdownvalues').subscribe(data => { this.locations = data; });
    this.commonService.getListOfData('Common/getrolevalues').subscribe(data => { this.roles = data; });
    this.commonService.getListOfData('Common/GetDepartments').subscribe(data => { this.Departments = data; });
    this.commonService.getListOfData('Common/Getqualification').subscribe(data => { this.Qualificationname = data; });
    this.commonService.getListOfData('Common/Getuniversity').subscribe(data => { this.Universityname = data; });
    this.commonService.getListOfData('Common/Getlocationcityvalues').subscribe(data => { this.Cityname = data; });
    this.commonService.getListOfData('Common/Getlocationcityvalues').subscribe(data => { this.PermanentCityname = data; });
  }


  triggerSnapshot() {

    this.trigger.next();
    this.showWebcam = !this.showWebcam;

  }

  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }


  handleImage(webcamImage: WebcamImage) {
    console.info("received webcam image", webcamImage);
    this.webcamImage = webcamImage;

  }

  /*Keypress Events*/
  nameField(event): boolean {

    const charCode = (event.which) ? event.which : event.keyCode;
    if ((charCode > 64 && charCode < 91) || (charCode > 96 && charCode < 123) || charCode == 32 || charCode == 9 || (charCode > 34 && charCode < 41) || charCode == 8) {
      return true;
    }
    return false;
  }
  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      if ((charCode > 34 && charCode < 41)) {
        return true;
      }
      return false;
    }

    return true;
  }
  nameField1(event): boolean {

    const charCode = (event.which) ? event.which : event.keyCode;
    if (!(charCode == 46)) {
      return true;
    }

    return false;
  }

  M_Role;

  /*Submit*/
  form;
  isInvalid: boolean = false;

  empde
  tabChanged(event) {

    var empd = event.tab.textLabel;
    this.empde = empd

    this.M_firstnamee = this.M_firstname;
    this.Titlee = this.M_title;
    if (this.M_Gender == "0") {
      this.M_Genderr = "Male"
    } else if (this.M_Gender == "1") {
      this.M_Genderr = "Female"
    }
    else if (this.M_Gender == "2") {
      this.M_Genderr == "Transgender"
    } else {

    }
    if (this.M_Dateofbirth != null) {
      this.DateMonthyear();
    }

  }
  minDate = new Date();
  DateMonthyear() {

    var myDate = new Date(this.M_Dateofbirth);
    var dates = myDate.getDate();

    var month = new Array(12);

    month[0] = "jan";
    month[1] = "Feb";
    month[2] = "Mar";
    month[3] = "Apr";
    month[4] = "May";
    month[5] = "Jun";
    month[6] = "Jul";
    month[7] = "Aug";
    month[8] = "Sep";
    month[9] = "Oct";
    month[10] = "Nov";
    month[11] = "Dec";

    var months = month[myDate.getMonth()];
    var years = myDate.getFullYear();
    this.M_DateofBirthh = dates + "-" + months + "-" + years;


    var sec = new Date(this.M_Dateofbirth);
    sec.setMonth(sec.getMonth() + 216);

    var sec1 = new Date(sec.setDate(sec.getDate() - 1));

    this.minDate = sec1;

  }
  changeValue() {

    if (this.M_PresentAddress1 != "" && this.M_PresentLocationID != undefined) {
      this.checkIfadd = false;
    }
    if (this.M_PresentAddress1 == "" && this.M_PresentLocationID == undefined) {
      this.checkIfadd = true;
    }
  }


  Addresschange(checked) {
    debugger;
    if (checked) {

      this.M_PermanentAddress1 = this.M_PresentAddress1;
      this.M_PermanentAddress2 = this.M_PresentAddress2;
      this.M_PermanentLandmark = this.M_PresentLandmark;
      this.M_PermanentCity = this.Cityy;
      this.commonService.getListOfData('Common/Getlocationvalues/' + this.M_PermanentCity).subscribe(data => {
        debugger;
        this.PermanentLocationname = data;
      });
      this.M_PermanentLocationID = this.M_PresentLocationID;
      this.PermanentState = this.State;
      this.PermanentCountry = this.Country;
      this.M_PermanentAddresss1 = true;
      this.M_PermanentAddresss2 = true;
      this.M_PermanentLocationIDD = true;
      this.M_PermanentLandmarkk = true;
      this.PresentAdd1 = true;
      this.PresentAdd2 = true;
      this.Presentloc = true;
      this.Presentland = true;
      this.Presentcity = true;
      this.PermanentCity = true;
    }
    if (!checked) {
      this.M_PermanentAddress1 = "";
      this.M_PermanentAddress2 = "";
      this.M_PermanentLandmark = "";
      this.M_PermanentLocationID = "";
      this.M_PermanentCity = "";
      this.PermanentState = "";
      this.PermanentCountry = "";
      this.M_PermanentAddresss1 = false;
      this.M_PermanentAddresss2 = false;
      this.M_PermanentLocationIDD = false;
      this.M_PermanentLandmarkk = false;
      this.PresentAdd1 = false;
      this.PresentAdd2 = false;
      this.Presentloc = false;
      this.Presentland = false;
      this.Presentcity = false;
      this.PermanentCity = false;
      this.M_PermanentLocationIDD = true;
    }

  }


  Restrict(event) {

    if (event.target.value > 100) {
      Swal.fire({
        type: 'warning',
        title: 'Cannot More than 100%',
      })
      this.M_VPFPercentage = "";
    }
  }
  M_Dateofbirth;
  M_Gender;
  M_firstnamee;
  M_DateofBirthh;
  Titlee;
  M_Genderr;

  image;
  ID;
  file: File = null;
  Empid;

  base64toBlob(dataURI) {

    var byteString = atob(dataURI.replace(/^data:image\/(png|jpeg|jpg);base64,/, ''));
    //var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    var blob = new Blob([ab]);
    return blob;


  }


  onSubmit(form: NgForm) {

    debugger;

    if (this.M_title != undefined && this.M_firstname != undefined && this.M_Dateofbirth != undefined && this.M_Gender != undefined
      && this.M_EmailID != undefined && this.M_PresentAddress1 != undefined && this.M_PresentLocationID != undefined && this.M_DOJ != undefined
      && this.M_MaritalStatus != undefined && this.M_MobileNo1 != undefined && this.M_Department != undefined) {
      if (this.M_PFEligibility == undefined && this.M_ESIEligibility == undefined && this.M_PTEligibility == undefined) {

        Swal.fire({
          type: 'warning',
          title: 'Check The Employee Statutory',
        })
        return;
      }


    }



    if (form.valid) {
      this.isInvalid = false;

      debugger;
      this.commonService.data.employeeMaster = new Employee_Master();
      this.commonService.data.EmployeeStatutory = new EmployeeStatutory();
      this.commonService.data.EmployeeBank = new EmployeeBank();
      this.commonService.data.EmployeeCommunication = new EmployeeCommunication();

      this.commonService.data.employeeMaster.Title = this.M_title;
      this.commonService.data.employeeMaster.FirstName = this.M_firstname;
      if (this.M_MiddleName != null) {
        this.commonService.data.employeeMaster.MiddleName = this.M_MiddleName;
      }
      else {
        this.commonService.data.employeeMaster.MiddleName = undefined;
      }
      if (this.M_LastName != null) {
        this.commonService.data.employeeMaster.LastName = this.M_LastName;
      }
      else {
        this.commonService.data.employeeMaster.LastName = undefined;
      }
      this.commonService.data.employeeMaster.Gender = this.M_Gender;
      this.commonService.data.employeeMaster.Dateofbirth = this.M_Dateofbirth;
      if (this.M_PhysicallyChallenged != null) {
        this.commonService.data.employeeMaster.PhysicallyChallenged = this.M_PhysicallyChallenged;
      }
      else {
        this.commonService.data.employeeMaster.PhysicallyChallenged = undefined;
      }
      this.commonService.data.employeeMaster.MaritalStatus = this.M_MaritalStatus;
      if (this.M_Category != null) {
        this.commonService.data.employeeMaster.Category = this.M_Category;
      }
      else {
        this.commonService.data.employeeMaster.Category = undefined;
      }
      this.commonService.data.employeeMaster.DeptCode = this.M_Department;
      this.commonService.data.employeeMaster.AadhaarNo = this.M_AadhaarNo;
      if (this.M_PANNumber != null) {
        this.commonService.data.employeeMaster.PANNo = this.M_PANNumber;
      }
      else {
        this.commonService.data.employeeMaster.PANNo = undefined;
      }
      if (this.M_FatherHusbandName != null) {
        this.commonService.data.employeeMaster.FatherHusbandName = this.M_FatherHusbandName;
      }
      else {
        this.commonService.data.employeeMaster.FatherHusbandName = undefined;
      }
      this.commonService.data.employeeMaster.DOJ = this.M_DOJ;
      if (this.M_Designation != null) {
        this.commonService.data.employeeMaster.Designation = this.M_Designation;
      }
      else {
        this.commonService.data.employeeMaster.Designation = undefined;
      }
      if (this.M_EmergencyContactName != null) {
        this.commonService.data.employeeMaster.EmergencyContactName = this.M_EmergencyContactName;
      }
      else {
        this.commonService.data.employeeMaster.EmergencyContactName = undefined;
      }
      if (this.M_EmergencyContactNo != null) {
        this.commonService.data.employeeMaster.EmergencyContactNo = this.M_EmergencyContactNo;
      }
      else {
        this.commonService.data.employeeMaster.EmergencyContactNo = undefined;
      }
      if (this.M_BloodGroup != null) {
        this.commonService.data.employeeMaster.BloodGroup = this.M_BloodGroup;
      }
      else {
        this.commonService.data.employeeMaster.BloodGroup = undefined;
      }
      this.commonService.data.employeeMaster.CMPID = parseInt(localStorage.getItem("CompanyID"));
      this.commonService.data.employeeMaster.CreatedBy = this.docotorid;


      this.commonService.data.EmployeeStatutory.IsPFEligible = this.M_PFEligibility;
      if (this.M_PFNumber != null) {
        this.commonService.data.EmployeeStatutory.PFNumber = this.M_PFNumber;
      }
      else {
        this.commonService.data.EmployeeStatutory.PFNumber = undefined;
      }
      if (this.M_PFCD != null) {
        this.commonService.data.EmployeeStatutory.PFCommencementDate = this.M_PFCD;
      }
      else {
        this.commonService.data.EmployeeStatutory.PFCommencementDate = undefined;
      }
      if (this.M_UAN != null) {
        this.commonService.data.EmployeeStatutory.UANNo = this.M_UAN;
      }
      else {
        this.commonService.data.EmployeeStatutory.UANNo = undefined;
      }
      if (this.M_VPFPercentage != null) {
        this.commonService.data.EmployeeStatutory.VPFPercentage = this.M_VPFPercentage;
      }
      else {
        this.commonService.data.EmployeeStatutory.VPFPercentage = undefined;
      }

      this.commonService.data.EmployeeStatutory.IsESIEligible = this.M_ESIEligibility;
      if (this.M_ESINumber != null) {
        this.commonService.data.EmployeeStatutory.ESINumber = this.M_ESINumber;
      }
      else {
        this.commonService.data.EmployeeStatutory.ESINumber = undefined;
      }

      if (this.M_ESICommencementDate != null) {
        this.commonService.data.EmployeeStatutory.ESICommencementDate = this.M_ESICommencementDate;
      }
      else {
        this.commonService.data.EmployeeStatutory.ESICommencementDate = undefined;
      }
      this.commonService.data.EmployeeStatutory.IsProfessionalTaxEligible = this.M_PTEligibility;
      if (this.M_GratuityNumber != null) {
        this.commonService.data.EmployeeStatutory.GratuityNo = this.M_GratuityNumber;
      }
      else {
        this.commonService.data.EmployeeStatutory.GratuityNo = undefined;
      }
      this.commonService.data.EmployeeStatutory.CmpID = parseInt(localStorage.getItem("CompanyID"));


      if (this.M_BankBranch != null) {
        this.commonService.data.EmployeeBank.BankBranch = this.M_BankBranch;
      }
      else {
        this.commonService.data.EmployeeBank.BankBranch = undefined;
      }
      if (this.M_AccountNumber != null) {
        this.commonService.data.EmployeeBank.AccountNo = this.M_AccountNumber;

      }
      else {
        this.commonService.data.EmployeeBank.AccountNo = undefined;
      }
      if (this.M_IFSCcode != null) {
        this.commonService.data.EmployeeBank.IFSCCode = this.M_IFSCcode;
      }
      else {
        this.commonService.data.EmployeeBank.IFSCCode = undefined;
      }

      this.commonService.data.EmployeeBank.AccountHoldersName = this.M_AccountHoldersName;
      this.commonService.data.EmployeeBank.AccountType = this.M_AccountType;
      this.commonService.data.EmployeeBank.BankName = this.M_Bankname;
      this.commonService.data.EmployeeBank.CmpID = parseInt(localStorage.getItem("CompanyID"));



      this.commonService.data.EmployeeCommunication.PresentAddress1 = this.M_PresentAddress1;
      if (this.M_PresentAddress2 != null) {
        this.commonService.data.EmployeeCommunication.PresentAddress2 = this.M_PresentAddress2;
      }
      else {
        this.commonService.data.EmployeeCommunication.PresentAddress2 = undefined;
      }
      this.commonService.data.EmployeeCommunication.PresentLocationID = this.M_PresentLocationID;
      if (this.M_PresentLandmark != null) {
        this.commonService.data.EmployeeCommunication.PresentLandmark = this.M_PresentLandmark;
      }
      else {
        this.commonService.data.EmployeeCommunication.PresentLandmark = undefined;
      }
      if (this.M_PermanentAddress1 != null) {
        this.commonService.data.EmployeeCommunication.PermanentAddress1 = this.M_PermanentAddress1;
      }
      else {
        this.commonService.data.EmployeeCommunication.PermanentAddress1 = undefined;
      }
      if (this.M_PermanentAddress2 != null) {
        this.commonService.data.EmployeeCommunication.PermanentAddress2 = this.M_PermanentAddress2;
      }
      else {
        this.commonService.data.EmployeeCommunication.PermanentAddress2 = undefined;
      }
      if (this.M_PermanentLocationID != null) {
        this.commonService.data.EmployeeCommunication.PermanentLocationID = this.M_PermanentLocationID;
      }
      else {
        this.commonService.data.EmployeeCommunication.PermanentLocationID = undefined;
      }
      if (this.M_PermanentLandmark != null) {
        this.commonService.data.EmployeeCommunication.PermanentLandmark = this.M_PermanentLandmark;
      }
      else {
        this.commonService.data.EmployeeCommunication.PermanentLandmark = undefined;
      }

      if (this.M_Phone1 != null) {
        this.commonService.data.EmployeeCommunication.Phone = this.M_Phone1;
      }
      else {
        this.commonService.data.EmployeeCommunication.Phone = undefined;
      }
      this.commonService.data.EmployeeCommunication.MobileNumber1 = this.M_MobileNo1;
      if (this.M_MobileNo2 != null) {
        this.commonService.data.EmployeeCommunication.MobileNumber2 = this.M_MobileNo2;
      }
      else {
        this.commonService.data.EmployeeCommunication.MobileNumber2 = undefined;
      }

      this.commonService.data.EmployeeCommunication.EmailID = this.M_EmailID;
      if (this.M_AlternativeEmailID != null) {
        this.commonService.data.EmployeeCommunication.AlternateEmailID = this.M_AlternativeEmailID;
      }
      else {
        this.commonService.data.EmployeeCommunication.AlternateEmailID = undefined;
      }
      this.commonService.data.EmployeeCommunication.CmpID = parseInt(localStorage.getItem("CompanyID"));


      console.log(this.commonService.data);



      this.commonService.postData('EmployeeMaster/AddEmployee', this.commonService.data)
        .subscribe(data => {
          debugger;
          if (data.Success == true) {
            this.Empid = data.Empid;
            Swal.fire({
              position: 'center',
              type: 'success',
              title: 'Saved Successfully',
              showConfirmButton: false,
              timer: 3000
            });

            if (this.webcamImage != null) {
              const dataURI = this.webcamImage.imageAsBase64;
              this.image = this.webcamImage.imageAsBase64;
              console.log(dataURI);
              const blob = this.base64toBlob(dataURI);
              console.log(blob);
              if (this.image.length > 0) {
                this.ID = new File([blob], 'imageFileName.png');
              }

              if ($("#EmployeeImages").val() != '' && this.ID != null) {

                this.commonService.postFile('EmployeeMaster/uploadImage/' + this.Empid, this.ID)
                  .subscribe(res => {
                    this.file = null;
                    $("#EmployeeImages").val('');
                  });

              }
            }
            else {

            }

            this.hiddenimageurl = false;
            this.hidewebcamtrue = true;
            this.Form.onReset();
            this.reset();
            this.commonService.data.EmployeeExperience = [];
            this.commonService.data.empqua = [];
            this.commonService.data.empqua1 = [];
            this.item = [];
            this.quaitem = [];
            this.quaitem1 = [];
            this.dataSource1.data = [];
            this.dataSource2.data = [];
            this.dataSource3.data = [];
            this.dataSource4.data = [];
            this.dataSource5.data = [];
            this.M_PhysicallyChallenged = "false";
            //this.router.navigateByUrl('/dash', { skipLocationChange: true }).then(() => {
            //  this.router.navigate(['Employeemaster']);
            //});
          }


          else if (data.Success == false && data.Message == "Aadhar Number already Exists") {
            debugger
            Swal.fire({
              position: 'center',
              type: 'warning',
              title: 'Aadhar Number Already Exits',
              showConfirmButton: false,
              timer: 2000
            });
          }
          else if (data.Success == false && data.Message == "Pan Number already Exists") {
            debugger
            Swal.fire({
              position: 'center',
              type: 'warning',
              title: 'Pan Number already Exists',
              showConfirmButton: false,
              timer: 2000
            });
          }

          else {

          }


        });

    }

    else {
      this.isInvalid = true;
      let target = this.el.nativeElement.querySelector('.required.ng-invalid')
      setTimeout(function () {
        $('html,body').animate({ scrollTop: $(target).offset().top }, 'slow');
        target.focus();
      }, 500);
    }

  }

  /*Update*/

  Updateclk(form: NgForm, Employeeid) {
    debugger;
    if (form.valid) {
      this.isInvalid = false;

      this.commonService.data.employeeMaster = new Employee_Master();
      this.commonService.data.EmployeeStatutory = new EmployeeStatutory();
      this.commonService.data.EmployeeBank = new EmployeeBank();
      this.commonService.data.EmployeeCommunication = new EmployeeCommunication();

      this.commonService.data.employeeMaster.Title = this.M_title;
      this.commonService.data.employeeMaster.FirstName = this.M_firstname;
      this.commonService.data.employeeMaster.MiddleName = this.M_MiddleName;
      this.commonService.data.employeeMaster.LastName = this.M_LastName;
      this.commonService.data.employeeMaster.Gender = this.M_Gender;
      this.commonService.data.employeeMaster.Dateofbirth = this.M_Dateofbirth;
      this.commonService.data.employeeMaster.PhysicallyChallenged = this.M_PhysicallyChallenged;
      this.commonService.data.employeeMaster.MaritalStatus = this.M_MaritalStatus;
      this.commonService.data.employeeMaster.Category = this.M_Category;
      this.commonService.data.employeeMaster.DeptCode = this.M_Department;
      this.commonService.data.employeeMaster.AadhaarNo = this.M_AadhaarNo;
      this.commonService.data.employeeMaster.PANNo = this.M_PANNumber;
      this.commonService.data.employeeMaster.FatherHusbandName = this.M_FatherHusbandName;
      this.commonService.data.employeeMaster.ReasonForResignation = this.M_ReasonofResignation;
      this.commonService.data.employeeMaster.DOR = this.M_DOR;
      this.commonService.data.employeeMaster.Designation = this.M_Designation;
      this.commonService.data.employeeMaster.EmergencyContactName = this.M_EmergencyContactName;
      this.commonService.data.employeeMaster.EmergencyContactNo = this.M_EmergencyContactNo;
      this.commonService.data.employeeMaster.BloodGroup = this.M_BloodGroup;
      this.commonService.data.employeeMaster.IsActive = this.M_IsActive;
      this.commonService.data.employeeMaster.UpdatedBy = this.docotorid;


      this.commonService.data.EmployeeCommunication.PresentAddress1 = this.M_PresentAddress1;
      this.commonService.data.EmployeeCommunication.PresentAddress2 = this.M_PresentAddress2;
      this.commonService.data.EmployeeCommunication.PresentLocationID = this.M_PresentLocationID;
      this.commonService.data.EmployeeCommunication.PresentLandmark = this.M_PresentLandmark;
      this.commonService.data.EmployeeCommunication.PermanentAddress1 = this.M_PermanentAddress1;
      this.commonService.data.EmployeeCommunication.PermanentAddress2 = this.M_PermanentAddress2;
      this.commonService.data.EmployeeCommunication.PermanentLocationID = this.M_PermanentLocationID;
      this.commonService.data.EmployeeCommunication.PermanentLandmark = this.M_PermanentLandmark;
      this.commonService.data.EmployeeCommunication.Phone = this.M_Phone1;
      this.commonService.data.EmployeeCommunication.MobileNumber1 = this.M_MobileNo1;
      this.commonService.data.EmployeeCommunication.MobileNumber2 = this.M_MobileNo2;
      this.commonService.data.EmployeeCommunication.EmailID = this.M_EmailID;
      this.commonService.data.EmployeeCommunication.AlternateEmailID = this.M_AlternativeEmailID;
      this.commonService.data.EmployeeCommunication.CmpID = parseInt(localStorage.getItem("CompanyID"));

      this.commonService.data.EmployeeStatutory.IsPFEligible = this.M_PFEligibility;
      this.commonService.data.EmployeeStatutory.PFNumber = this.M_PFNumber;
      this.commonService.data.EmployeeStatutory.PFCommencementDate = this.M_PFCD;
      this.commonService.data.EmployeeStatutory.UANNo = this.M_UAN;
      this.commonService.data.EmployeeStatutory.VPFPercentage = this.M_VPFPercentage;
      this.commonService.data.EmployeeStatutory.IsESIEligible = this.M_ESIEligibility;
      this.commonService.data.EmployeeStatutory.ESINumber = this.M_ESINumber;
      this.commonService.data.EmployeeStatutory.ESICommencementDate = this.M_ESICommencementDate;
      this.commonService.data.EmployeeStatutory.IsProfessionalTaxEligible = this.M_PTEligibility;
      this.commonService.data.EmployeeStatutory.GratuityNo = this.M_GratuityNumber;
      this.commonService.data.EmployeeStatutory.CmpID = parseInt(localStorage.getItem("CompanyID"));

      this.commonService.data.EmployeeBank.BankName = this.M_Bankname;
      this.commonService.data.EmployeeBank.BankBranch = this.M_BankBranch;
      this.commonService.data.EmployeeBank.AccountHoldersName = this.M_AccountHoldersName;
      this.commonService.data.EmployeeBank.AccountType = this.M_AccountType;
      this.commonService.data.EmployeeBank.AccountNo = this.M_AccountNumber;
      this.commonService.data.EmployeeBank.IFSCCode = this.M_IFSCcode;
      this.commonService.data.EmployeeBank.CmpID = parseInt(localStorage.getItem("CompanyID"));
      this.commonService.data.EmployeeBank.CreatedBy = this.docotorid;

      console.log(this.commonService.data);

      this.commonService.postData("EmployeeMaster/UpdateEmployee/" + Employeeid, this.commonService.data)
        .subscribe(data => {

          if (data.Success == true) {

            Swal.fire({
              position: 'center',
              type: 'success',
              title: 'Update successfully',
              showConfirmButton: false,
              timer: 2000
            });
            this.hiddenimageurl = false;
            this.hidewebcamtrue = true;
            this.Form.onReset();
            this.reset();
            this.commonService.data.EmployeeExperience = [];
            this.commonService.data.empqua = [];
            this.commonService.data.empqua1 = [];
            this.item = [];
            this.quaitem = [];
            this.quaitem1 = [];
            this.dataSource1.data = [];
            this.dataSource2.data = [];
            this.dataSource3.data = [];
            this.dataSource4.data = [];
            this.dataSource5.data = [];


          }

          else if (data.Success == false && data.Message == "Aadhar Number Already Exist") {
            debugger
            Swal.fire({
              position: 'center',
              type: 'warning',
              title: 'Aadhar Number Already Exist',
              showConfirmButton: false,
              timer: 2000
            });
          }
          else if (data.Success == false && data.Message == "Pan Number Already Exist") {
            debugger
            Swal.fire({
              position: 'center',
              type: 'warning',
              title: 'Pan Number Already Exist',
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
    else {
      this.isInvalid = true;
      let target = this.el.nativeElement.querySelector('.required.ng-invalid')
      setTimeout(function () {
        $('html,body').animate({ scrollTop: $(target).offset().top }, 'slow');
        target.focus();
      }, 500);
    }

  }

  /*Data Binding*/
  selecttype(item) {
    debugger;
    this.M_title = item.Title
    this.M_Employeeid = item.EmployeeID
    this.M_firstname = item.EmployeeName
    this.M_PermanentAddress1 = item.PermanentAddress1
    this.M_PermanentAddress2 = item.PermanentAddress2
    this.M_PermanentAddress3 = item.PermanentAddress3

    if (item.PermanentLocationID != null) {
      let PermanentLocationID = this.PermanentLocationname.find(x => x.Text == item.PermanentLocationID)
      this.M_PermanentLocationID = PermanentLocationID.Value
    }
    else {
      this.M_PermanentLocationID = '';
    }

    this.M_PermanentLandmark = item.PermanentLandmark

    this.M_PresentAddress1 = item.PresentAddress1
    this.M_PresentAddress2 = item.PresentAddress2
    this.M_PresentAddress3 = item.PresentAddress3
    this.M_PresentLandmark = item.PresentLandmark

    let PresentLocationID = this.Locationname.find(x => x.Text == item.PresentLocationID)
    this.M_PresentLocationID = PresentLocationID.Value

    this.M_Phone1 = item.Phone1
    this.M_EmailID = item.EmailID
    this.M_Designation = item.Designation
    this.M_DOJ = item.DOJ
    this.M_DOR = item.DOR
    this.M_EmergencyContactName = item.EmergencyContactName
    this.M_EmergencyContactNo = item.EmergencyContactNo

    if (item.BloodGroup != null) {
      this.M_BloodGroup = item.BloodGroup
    }
    else {
      this.M_BloodGroup = '';
    }
    this.M_IsActive = item.Status.toString();
    this.modalHelp1 = 'none';
    this.isHidden = false;
    this.M_empname = '';
  }

  /*Drop Employee*/
  selectEmployeeDrop(EmployeeID, EmployeeName) {



    var ans = confirm("Want to delete Employee: " + EmployeeName);
    if (ans) {
      this.commonService.postData("EmployeeMaster/DeleteEmployee/" + EmployeeID, this.commonService.data).subscribe(data => {
        if (data.Success == true) {

          this.appComponent.modalCommonReset();
          this.appComponent.modalCommonTitle = 'Information!';
          this.appComponent.modalCommonBody = '  Deleted successfully ';
          this.appComponent.showModalCommonOk = true;
          this.appComponent.backdrop = 'block';
          this.appComponent.modalCommon = 'block';

          this.ViewCod1();

        }


        else {


          this.appComponent.modalCommonReset();
          this.appComponent.modalCommonTitle = 'information!';
          this.appComponent.modalCommonBody = ' Delete Cancelled ';
          this.appComponent.showModalCommonOk = true;
          this.appComponent.backdrop = 'block';
          this.appComponent.modalCommon = 'block';

        }


      });

    }


  }

  /*Help*/
  ViewHelp() {

    if (this.M_empname == "" || this.M_empname == undefined) {
      this.ViewCod1();

    }
    else {

      this.ViewHel();
    }

  }

  ViewCod1() {


    this.commonService.data = new Employeemasters();

    this.commonService.getListOfData('Help/getEmployeeAll/').subscribe(data => {

      if (data.EmployeeDetail != null) {

        this.isHidden = true;
        this.commonService.data = data;
        this.dataSource.data = data.EmployeeDetail;
        this.dataSource.sort = this.sort;
        this.M_empname = '';
      }
      else {

      }

    });

  }

  ViewHel() {


    this.commonService.data = new Employeemasters();
    this.commonService.data.employeeMaster.FirstName = this.M_empname;

    this.commonService.getListOfData('Help/getEmployee/' + this.M_empname).subscribe(data => {

      if (data.EmployeeDetail != null) {

        this.isHidden = true;
        this.commonService.data = data;
        this.dataSource.data = data.EmployeeDetail;
        this.dataSource.sort = this.sort;
        this.M_empname = '';
      }
      else {

      }

    });

  }

  isImageLoading
  empID;
  imagePath;
  Getimage() {

    this.commonService.getListOfData('EmployeeMaster/Getemployeeimage/' + this.M_Employeeid).subscribe(res => {

      console.log(res);
      var dats = res.ProductImage;
      localStorage.setItem('urls', res.ProductImage);
    });
    this.hidewebcamtrue = false;
    this.hiddenimageurl = true;
  }


  pathss
  transform() {
    this.pathss = localStorage.getItem('urls');
    return this._sanitizer.bypassSecurityTrustResourceUrl('data:image/png;base64,' + this.pathss);
  }






  minDate1 = new Date();
  EmpSearch() {
    localStorage.setItem('helpname', 'Employeemaster');
    const dialogRef = this.dialog.open(SearchComponent, {
      height: '70%',
      width: '85%',
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result.success) {


        debugger;
        let item = result.data;
        this.M_title = item.Title
        this.M_Employeeid = item.EmployeeID
        this.M_firstname = item.FirstName
        this.M_MiddleName = item.MiddleName
        this.M_LastName = item.LastName
        this.M_Dateofbirth = item.Dateofbirth
        this.M_Gender = item.Gender,
          this.M_PhysicallyChallenged = item.PhysicallyChallenged.toString();
        this.M_MaritalStatus = item.MaritalStatus
        this.M_Category = item.Category
        let DeptID = this.Departments.find(x => x.Text == item.DeptCode)
        this.M_Department = DeptID.Value
        this.M_AadhaarNo = item.AadhaarNo,
          this.M_PANNumber = item.PANNo,
          this.M_FatherHusbandName = item.FatherHusbandName,
          this.M_ReasonofResignation = item.ReasonForResignation,
          this.M_DOJ = item.DOJ
        this.M_DOR = item.DOR
        this.M_EmergencyContactName = item.EmergencyContactName
        this.M_EmergencyContactNo = item.EmergencyContactNo
        this.M_Designation = item.Designation
        if (item.BloodGroup != null) {
          this.M_BloodGroup = item.BloodGroup
        }
        else {
          this.M_BloodGroup = '';
        }
        this.M_IsActive = item.Status.toString();
        this.minDate1 = this.M_DOJ


        this.M_PermanentAddress1 = item.PermanentAddress1
        this.M_PermanentAddress2 = item.PermanentAddress2
        this.M_PermanentLandmark = item.PermanentLandmark
        this.M_PermanentCity = item.PermanentCity
        this.commonService.getListOfData('EmployeeMaster/GetlocationDetails/' + this.M_PermanentCity + '/')
          .subscribe((data: any) => {
            debugger;

            this.PermanentState = data.ParentDescriptionstatee;
            this.PermanentCountry = data.ParentDescriptioncountryy;
            if (this.PermanentState != null) {
              this.M_PermanentLocationIDD = false;
            }
            else {
              this.M_PermanentLocationIDD = true;
            }
          });

        this.commonService.getListOfData('Common/Getlocationvalues/' + this.M_PermanentCity).subscribe(data => {
          debugger;
          this.PermanentLocationname = data;

          if (item.PermanentLocationID != null) {
            let PermanentLocationID = this.PermanentLocationname.find(x => x.Text == item.PermanentLocationID)
            this.M_PermanentLocationID = PermanentLocationID.Value
          }
          else {
            this.M_PermanentLocationID = '';
          }

        });

        this.M_PresentAddress1 = item.PresentAddress1
        this.M_PresentAddress2 = item.PresentAddress2
        this.M_PresentLandmark = item.PresentLandmark
        this.Cityy = item.PresentCity;

        this.commonService.getListOfData('EmployeeMaster/GetlocationDetails/' + this.Cityy + '/')
          .subscribe((data: any) => {
            debugger;

            this.State = data.ParentDescriptionstatee;
            this.Country = data.ParentDescriptioncountryy;
            if (this.State != null) {
              this.Presentloc = false;
            }
            else {
              this.Presentloc = true;
            }
          });

        this.commonService.getListOfData('Common/Getlocationvalues/' + this.Cityy).subscribe(data => {
          debugger;
          this.Locationname = data;

          if (item.PresentLocationID != null) {
            let PresentLocationID = this.Locationname.find(x => x.Text == item.PresentLocationID)
            this.M_PresentLocationID = PresentLocationID.Value
          }
          else {
            this.M_PresentLocationID = '';
          }

        });



        this.M_Phone1 = item.Phone
        this.M_MobileNo1 = item.MobileNumber1
        this.M_MobileNo2 = item.MobileNumber2
        this.M_EmailID = item.EmailID
        this.M_AlternativeEmailID = item.AlternateEmailID
        this.Getimage();

        this.commonService.getListOfData('Help/getEmployee/' + item.EmployeeID).subscribe(data => {


          if (data.Employeestatutory.length > 0 || data.Employeebank.length > 0 || data.Employeeexperience.length > 0 || data.Employeebank1.length > 0 || data.Employeequa.length > 0) {

            this.M_PFEligibility = data.Employeestatutory[0].IsPFEligible.toString();
            this.M_PFNumber = data.Employeestatutory[0].PFNumber;
            this.M_PFCD = data.Employeestatutory[0].PFCommencementDate;
            this.M_UAN = data.Employeestatutory[0].UANNo;
            this.M_VPFPercentage = data.Employeestatutory[0].VPFPercentage;
            this.M_ESIEligibility = data.Employeestatutory[0].IsESIEligible.toString();
            this.M_ESINumber = data.Employeestatutory[0].ESINumber;
            this.M_ESICommencementDate = data.Employeestatutory[0].ESICommencementDate;
            this.M_PTEligibility = data.Employeestatutory[0].IsProfessionalTaxEligible.toString();
            this.M_GratuityNumber = data.Employeestatutory[0].GratuityNo;

            if (data.Employeebank.length > 0) {
              this.M_Bankname = data.Employeebank[0].BankName;
              this.M_BankBranch = data.Employeebank[0].BankBranch;
              this.M_AccountHoldersName = data.Employeebank[0].AccountHoldersName;
              this.M_AccountType = data.Employeebank[0].AccountType;
              this.M_AccountNumber = data.Employeebank[0].AccountNo;
              this.M_IFSCcode = data.Employeebank[0].IFSCCode;
            }


            this.commonService.data.Employeeexperience1 = data.Employeeexperience;
            this.dataSource2.data = this.commonService.data.Employeeexperience1;

            this.commonService.data.Employeebank1 = data.Employeebank1;
            this.dataSource3.data = this.commonService.data.Employeebank1;

            this.commonService.data.empqua1 = data.Employeequa;
            this.dataSource5.data = this.commonService.data.empqua1;

          }
          if (data.Employeeexperience.length > 0) {
            this.exptable1 = true;
          }
          if (data.Employeequa.length > 0) {
            this.expqua1 = true;
          }
          if (data.Employeebank1.length > 0) {
            this.expbank = true;
          }
          this.Dorrr = true;
          this.DORR = false;
          this.add = false;
          this.addquin = false;
          this.addup = true;
          this.addquup = true;



          this.minDate3 = '';
          this.minDate4 = '';
        });


      }



      if (!result.success) {


      }
    });

  }

  //selectpurchase(item) {

  //  this.commonService.getListOfData('purchaseorder/Getpurchase/' + item.POID + '/')
  //    .subscribe((data: any) => {
  //      debugger;



  //    });


  //}

  Deleteclk(EmployeeID) {

    Swal.fire({
      title: 'Are you sure?',
      text: "Want to delete Employee",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {


      if (result.value) {
        this.commonService.postData("EmployeeMaster/DeleteEmployee/" + EmployeeID, this.commonService.data).subscribe(result => { })
        Swal.fire(
          'Deleted!',
          'Employee has been deleted.',
          'success'
        )
      }

      else {
        Swal.fire(
          'Cancelled',
          'Employee has not been deleted'
        )
      }
      this.Form.onReset();
      this.reset();
    })


  }

  pfno = false;
  pfcomdate = false;
  uanno = false;
  Vpfper = false;

  PFEligibility() {


    if (this.M_PFEligibility == "true") {
      this.VPFPercentagee = false;
      this.UANN = false;
      this.PFCDD = false;
      this.PFNumberr = false;
      this.pfno = true;
      this.pfcomdate = true;
      this.uanno = true;
      this.Vpfper = true;

    }
    if (this.M_PFEligibility == "false") {
      this.VPFPercentagee = true;
      this.UANN = true;
      this.PFCDD = true;
      this.PFNumberr = true;
      this.pfno = false;
      this.pfcomdate = false;
      this.uanno = false;
      this.Vpfper = false;

    }
  }

  ESI = false;
  ESICommen = false;

  ESIEligibility() {

    if (this.M_ESIEligibility == "true") {
      this.ESINumberr = false;
      this.ESICommencementDatee = false;
      this.ESI = true;
      this.ESICommen = true;
    }

    if (this.M_ESIEligibility == "false") {
      this.ESINumberr = true;
      this.ESICommencementDatee = true;
      this.ESI = false;
      this.ESICommen = false
    }
  }
  Gratuity = false;
  PTEligibilityy() {

    if (this.M_PTEligibility == "true") {
      this.GratuityNumberrr = false;
      this.Gratuity = true;
    }

    if (this.M_PTEligibility == "false") {
      this.GratuityNumberrr = true;
      this.Gratuity = false;
    }
  }

  Dateresign() {

    this.ReasonofResignationn = false;
  }

  item = [];
  onAddItem() {
    debugger;

    var exp = new EmployeeExperience()

    exp.Organisation = this.M_Organization;
    exp.FromDate = this.M_FormDate;
    exp.ToDate = this.M_ToDate;
    exp.Designation = this.M_Designationexp;
    this.item.push(exp);
    this.commonService.data.EmployeeExperience = this.item;
    this.dataSource1.data = this.commonService.data.EmployeeExperience;
    this.exptable = true;
    this.minDate3 = this.M_ToDate;
    this.M_Organization = '';
    this.M_FormDate = '';
    this.M_ToDate = '';
    this.M_Designationexp = '';
    this.disableaddItem = true;


  }

  onupitem() {


    var expu = new EmployeeExperience()

    expu.Organisation = this.M_Organization;
    expu.FromDate = this.M_FormDate;
    expu.ToDate = this.M_ToDate;
    expu.Designation = this.M_Designationexp;
    expu.EmpID = this.M_Employeeid;
    expu.CreatedBy = this.docotorid;
    this.item.push(expu);
    this.commonService.data.EmployeeExperience = this.item;
    this.dataSource2.data = this.commonService.data.EmployeeExperience;
    this.minDate3 = this.M_ToDate;
    this.M_Organization = '';
    this.M_FormDate = '';
    this.M_ToDate = '';
    this.M_Designationexp = '';
    this.disableupItem = true;
    this.exptable1 = true;
  }

  remove(i) {


    Swal.fire({
      title: 'Are you sure?',
      text: "Want to delete",
      type: 'warning',

      showCancelButton: true,
      cancelButtonColor: '#d33',
      cancelButtonText: 'No, cancel!',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
      reverseButtons: true

    }).then((result) => {


      if (result.value) {
        if (i !== -1) {
          this.dataSource1.data.splice(i, 1);
          this.minDate3 = '';
          this.dataSource1._updateChangeSubscription();
          Swal.fire(
            'Deleted!',
            'Deleted Successfully.',
            'success'
          )



        }

      }

      else {
        Swal.fire(
          'Cancelled',
          'Experience has not been deleted'
        )
      }
    })

  }

  minDate2 = new Date();
  minDate3;
  FormDateexp() {

    this.minDate2 = this.M_FormDate;
    this.disableaddItem = false;
    this.disableupItem = false;
  }

  minDate5 = new Date();
  minDate4;
  FormDateQua() {

    this.minDate5 = this.M_QFromDate;

  }


  removeup(i) {


    Swal.fire({
      title: 'Are you sure?',
      text: "Want to delete",
      type: 'warning',

      showCancelButton: true,
      cancelButtonColor: '#d33',
      cancelButtonText: 'No, cancel!',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
      reverseButtons: true

    }).then((result) => {


      if (result.value) {
        if (i !== -1) {
          this.dataSource2.data.splice(i, 1);
          this.minDate3 = '';
          this.dataSource2._updateChangeSubscription();
          Swal.fire(
            'Deleted!',
            'Deleted Successfully.',
            'success'
          )
        }

      }

      else {
        Swal.fire(
          'Cancelled',
          'Experience has not been deleted'
        )
      }
    })

  }

  removebank() {

    Swal.fire({
      title: 'Are you sure?',
      text: "Want to delete previous account",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {

      if (result.value) {
        this.commonService.postData("EmployeeMaster/DeleteEmployeebank/" + this.M_Employeeid, this.commonService.data).subscribe(result => { })
        Swal.fire(
          'Deleted!',
          'Account has been deleted.',
          'success'
        )
      }

      else {
        Swal.fire(
          'Cancelled',
          'Account has not been deleted'
        )
      }
    })


  }

  qua;

  Qualificationsumbit() {


    this.qua = this.Qualification.Value;

    this.commonService.getListOfData('EmployeeMaster/GetDegree/' + this.qua).subscribe(data => {

      this.commonService.data.qualificationexten = data.qualificationexten;
      this.Degreename = this.commonService.data.qualificationexten;

    });

  }

  qua1;
  Degreesumbit() {

    this.qua1 = this.Degree.QualExtDescription;

    function isBigEnough(element, index, array) {
      return (element >= 10);
    }

    var passed = [12, 5, 8, 130, 44].filter(isBigEnough);
    console.log("Test Value : " + passed);

    this.commonService.getListOfData('EmployeeMaster/GetSpecialization/' + this.qua1).subscribe(data => {

      this.commonService.data.qualificationexten1 = data.qualificationexten1;
      this.Specializationname = this.commonService.data.qualificationexten1;

    });

  }


  uni;
  Universitysumbit() {
    debugger;
    this.uni = this.University.Value;
    this.commonService.getListOfData('Common/Getinstitute/' + this.uni).subscribe(data => {
      this.Institutionname = data;
    });


  }
  quaitem = [];
  AddQualification() {

    var qua = new empqua()
    qua.qualification = this.Qualification.Text;
    qua.Degree = this.Degree.QualExtDescription;
    qua.qid = this.Specialization.QID;
    qua.specialization = this.Specialization.QualExtAnsDescription;
    qua.fromdate = this.M_QFromDate;
    qua.todate = this.M_QToDate;
    qua.university = this.University.Text;
    qua.instition = this.Institution.Text;
    qua.uid = this.Institution.Value;
    qua.yearofpassing = this.yearofpassing;
    qua.percentageofmarks = this.Percentage;
    this.quaitem.push(qua);
    this.commonService.data.empqua = this.quaitem;
    this.dataSource4.data = this.commonService.data.empqua;

    // this.minDate4 = this.M_QToDate;
    this.Qualification = '';
    this.Degree = '';
    this.Specialization = '';
    this.M_QFromDate = '';
    this.M_QToDate = '';
    this.University = '';
    this.Institution = '';
    this.yearofpassing = '';
    this.Percentage = '';
    this.expqua = true;
  }

  removequali(i) {

    Swal.fire({
      title: 'Are you sure?',
      text: "Want to delete",
      type: 'warning',

      showCancelButton: true,
      cancelButtonColor: '#d33',
      cancelButtonText: 'No, cancel!',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
      reverseButtons: true

    }).then((result) => {


      if (result.value) {
        if (i !== -1) {
          this.dataSource4.data.splice(i, 1);
          this.dataSource4._updateChangeSubscription();
          Swal.fire(
            'Deleted!',
            'Deleted Successfully.',
            'success'
          )
        }

      }

      else {
        Swal.fire(
          'Cancelled',
          'Qualification has not been deleted'
        )
      }
    })

  }

  removequaliup(i) {

    Swal.fire({
      title: 'Are you sure?',
      text: "Want to delete",
      type: 'warning',

      showCancelButton: true,
      cancelButtonColor: '#d33',
      cancelButtonText: 'No, cancel!',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
      reverseButtons: true

    }).then((result) => {


      if (result.value) {
        if (i !== -1) {
          this.dataSource5.data.splice(i, 1);
          this.minDate4 = '';
          this.dataSource5._updateChangeSubscription();
          Swal.fire(
            'Deleted!',
            'Deleted Successfully.',
            'success'
          )
        }

      }

      else {
        Swal.fire(
          'Cancelled',
          'Qualification has not been deleted'
        )
      }
    })

  }

  quaitem1 = [];
  upQualification() {

    var quaup = new empqua1()
    quaup.qualification = this.Qualification.Text;
    quaup.Degree = this.Degree.QualExtDescription;
    quaup.qid = this.Specialization.QID;
    quaup.specialization = this.Specialization.QualExtAnsDescription;
    quaup.fromdate = this.M_QFromDate;
    quaup.todate = this.M_QToDate;
    quaup.university = this.University.Text;
    quaup.instition = this.Institution.Text;
    quaup.uid = this.Institution.Value;
    quaup.yearofpassing = this.yearofpassing;
    quaup.percentageofmarks = this.Percentage;
    quaup.createby = this.docotorid;
    this.quaitem1.push(quaup);
    this.commonService.data.empqua1 = this.quaitem1;
    this.dataSource5.data = this.commonService.data.empqua1;
    this.minDate4 = this.M_QToDate;

    this.Qualification = '';
    this.Degree = '';
    this.Specialization = '';
    this.M_QFromDate = '';
    this.M_QToDate = '';
    this.University = '';
    this.Institution = '';
    this.yearofpassing = '';
    this.Percentage = '';
    this.expqua1 = true;

  }

  holdersnamestrict(event) {


    let v = event.target.value;

    if (v != "") {

      this.aacountholdername = true;
      this.aacountnumber = true;
      this.aacounttype = true;
      this.bbankname = true;
      this.bbankbranch = true;

    }
    else if (v == "") {
      this.aacountholdername = false;
      this.aacountnumber = false;
      this.aacounttype = false;
      this.bbankname = false;
      this.bbankbranch = false;
    }
    else {

    }
  }




  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
}



