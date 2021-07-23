import { Component, ElementRef, ChangeDetectorRef, ViewChild, HostListener } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { DatePipe } from '@angular/common';
import { CommonService } from './shared/common.service';
import { RegistrationMaster } from './Models/ViewModels/RegistrationMasterWebViewModel ';
import { MatDialog, MatTabGroup, MatTabChangeEvent } from '@angular/material';
import { FormControl, FormGroupDirective, NgForm, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import Swal from 'sweetalert2';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { HttpClient, HttpResponse, HttpEventType } from '@angular/common/http';
import { Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';
import { Keepalive } from '@ng-idle/keepalive';
import { DomSanitizer } from '@angular/platform-browser';
import { Http } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Rx';

declare var $: any;

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control && control.invalid && control.parent.dirty);
    const invalidParent = !!(control && control.parent && control.parent.invalid && control.parent.dirty);
    return (invalidCtrl || invalidParent);
  }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
  styles: [`
    ::ng-deep .specific-class > .mat-expansion-indicator:after {
      color: black;
    }
  `],
  //template: `
	 // <b>Angular 2 HTTP requests using RxJs Observables!</b>
	 // <ul>
	 //   <li *ngFor="let doctor of doctors">{{doctor.name}}</li>
	 // </ul>	  
	 // `
})
export class AppComponent {
  idleState = 'Not started.';
  timedOut = false;
  lastPing?: Date = null;
  @ViewChild('childModal', { read: false }) childModal: ModalDirective;
  private doctors = [];
  constructor
    (public commonService: CommonService<RegistrationMaster>,
    public datepipe: DatePipe, public el: ElementRef,
    private _formBuilder: FormBuilder,
    private router: Router,
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    private idle: Idle, private keepalive: Keepalive,
    private change: ChangeDetectorRef,
    private _sanitizer: DomSanitizer,
    http: Http
  ) {
    //Observable.interval(1000)
    //  .switchMap(() => http.get('http://jsonplaceholder.typicode.com/users/')).map((data) => data.json())
    //  .subscribe((data) => {
    //    this.doctors = data;
    //    console.log(data);
    //  });

    this.myForm = this.formBuilder.group({
      password: ['', [Validators.required]],
      passwordOLD: ['', [Validators.required]],
      confirmPassword: ['']
    }, { validator: this.checkPasswords });

  }
  reset() {
    this.idle.watch();
    //xthis.idleState = 'Started.';
    this.timedOut = false;
  }
  idlechildModal;
  hideChildModal(): void {
    this.backdrop = 'none';
    this.idlechildModal = 'none';
  }
  stay() {
    this.backdrop = 'none';
    this.idlechildModal = 'none';
    this.reset();
  }
  customCollapsedHeight = '10px';
  HideAccessPrivileges = false;
  title = 'WYNKWeb';
  ishideen = true;
  ishiden = true;
  hide = true;
  hide1 = true;
  hide2 = true;
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
  loggedIn = false;
  loggedoutIn = true;
  Totalhidestepper = false;
  encryptText: string;
  encPassword: string;
  decPassword: string;
  conversionEncryptOutput: string;
  conversionDecryptOutput: string;
  isLinear = false;
  //firstFormGroup: FormGroup;
  myForm: FormGroup;
  matcher = new MyErrorStateMatcher();
  confirmpasswword: any;
  uin;
  isloghidden = false;
  Hidegridvalues = false;
  Hidemaindash = true;
  doctorname;
  docotorid;
  todaydate;
  hideph = false;
  hiderefra = false;
  hidefind = false;
  hidempe = false;
  Hideregister = false;
  AdminMaster2 = false;
  AdminMaster3 = false;
  AdminMaster4 = false;
  Totalsearch = true;
  InvestigatiomMaster = true;
  Hidemnagement = true;
  Hidesidemenu: boolean;

  user;
  password;
  loggIn = false;
  useraccess;
  Master;
  HrmsMaster;
  ismaster = false;
  isBilling = false;
  usersCreation;
  isOnelinemaster = false;
  DrugPropertyMaster;
  isDrugPropertyMaster = false;
  Kasihide = false;
  Soundaramhide = false;
  subhahide = false;
  Imagehide = false;
  mainmastername;
  Companyname;
  dashboardname;
  managedash;
  accesname;
  prename;
  postname;
  numbername;
  UtilitiesMenu;
  AdmnissionMenu;
  Adminmenu;
  WorkflowMaster = [];
  Onelinename;
  Reportname;
  Drugpropname;
  Masterinventoty;
  Transactioinventory;
  isReportMaster = false;
  ReportMaster;
  adminimage;
  inventoryTransactions;
  isinventoryTransactions;
  isPurchaseOrder;
  PurchaseOrder;
  rtag;
  doctornames;
  docotorids;
  passwordblock;
  pwds;
  public modalRef: BsModalRef;
  MasterName;

  isInventoryMaster = false;
  isAccessMaster = false;
  Indiaflag;


  profileblock;

  transactionTypeid;
  operationsmenu;
  Counsellinmenusmenu;
  opticalsmenusmenu;
  outpatientssmenusmenu;
  BilliongMaster;
  formsmodules;
  Datamodule;
  hidemaster: boolean;
  menubranch;
  Intramasterss;
  Postmasterss;
  Menudoctor;
  Menulogindateandtime;
  Premastersss;
  Dischargess;
  OpticalReportsss;
  refractionamsters;
  Findmasters;
  PharmacyMenuss;
  OutpatientsReportss;
  InventiryReportss;
  ClinicalProcedureTransactionsss;
  OutpatientsTransactionsss;
  AdmissionRoomInformationss;
  OpticalTranbsctions;
  Errordata;
  AdmnissiontransacvtionsMenu;
  passwordasblock;
  pwdss;
  newpwdss;
  confirmpwdss;
  docotoridsss;

  Regnum;

  backdrop = 'none';
  modalCommon = 'none';
  modalCommonDialogWidth = '300px';
  modalCommonTitle = '';
  modalCommonBody = '';
  showModalCommonYesNo = false;
  showModalCommonOk = false;
  loginYesoutblock;

  loginYesblock;
  // reset() {
  //  this.idle.watch();
  //  this.idleState = 'Started.';
  //  this.timedOut = false;
  // }
  onBeforeUnload() {

    this.loginYes();
  }
  doUnload() {

    this.loginYes();
  }
  ngOnInit() {

    this.commonService.getListOfData('Common/getallroles/').subscribe(data => {
      this.router.navigate(['/login']);
    });

    var $th = $('.tableFixHead').find('thead th')
    $('.tableFixHead').on('scroll', function () {
      $th.css('transform', 'translateY(' + this.scrollTop + 'px)');
    });



    //this.firstFormGroup = this._formBuilder.group({
    //  firstCtrl: ['', Validators.required]
    //});
    this.todaydate = this.datepipe.transform(new Date(), 'DD-MMM-YYYY');
    $('.btn-group, .dropdown').hover(
      function () {
        $('>.dropdown-menu', this).stop(true, true).fadeIn('fast');
        $(this).addClass('open');
      },
      function () {
        $('>.dropdown-menu', this).stop(true, true).fadeOut('fast');
        $(this).removeClass('open');
      });
  }
  imagedata;
  Checkprofile() {
    this.backdrop = 'block';
    this.profileblock = 'block';

    this.commonService.getListOfData('Appointment/GetdoctorImage/' + localStorage.getItem('CompanyID') + '/' + this.docotorid).subscribe(data => {

      this.imagedata = data.ProductImage;
    });

  }

  Refreshdiv() {

    $("#cssmenu").load(" #cssmenu > *");
    $("#fullsidemenu").load(" #fullsidemenu > *");

  }


  selectedFiles: FileList;
  empltydata;
  progressInfos = [];

  selectFiles(event) {


    this.selectedFiles = event.target.files;
    for (let i = 0; i < this.selectedFiles.length; i++) {
      this.getuploadeddata(i, this.selectedFiles[i], i);
    }

  }
  getuploadeddata(idx, file, indexvalue) {

    this.progressInfos[idx] = { value: 100, fileName: file.name, index: indexvalue };
    this.empltydata = '';
  }

  uploadFiles() {

    var fileElement = document.getElementById("Prfofileid");
    var fileExtension = "";
    if ((<HTMLInputElement>fileElement).value.lastIndexOf(".") > 0) {
      fileExtension = (<HTMLInputElement>fileElement).value.substring((<HTMLInputElement>fileElement).value.lastIndexOf(".") + 1, (<HTMLInputElement>fileElement).value.length);
    }
    if (this.selectedFiles.length != 0) {
      for (let i = 0; i < this.selectedFiles.length; i++) {
        this.upload(i, this.selectedFiles[i]);
      }
    } else {
      Swal.fire({
        type: 'warning',
        title: 'warning',
        text: 'Select Image',
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

  upload(idx, file) {

    this.progressInfos[idx] = { value: 0, fileName: file.name };
    this.commonService.uploadProfile(file, this.docotorid, localStorage.getItem('CompanyID')).subscribe(
      event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progressInfos = [];
          Swal.fire({
            type: 'success',
            title: 'success',
            text: 'Uploaded Successfully',
            position: 'top-end',
            showConfirmButton: false,
            timer: 1500,
            customClass: {
              popup: 'alert-warp',
              container: 'alert-container',
            },
          });
          (document.getElementById('Prfofileid') as HTMLInputElement).value = null;
          this.backdrop = 'none';
          this.profileblock = 'none';
        } else if (event instanceof HttpResponse) {

        }
      },
      err => {
        this.progressInfos[idx].value = 0;
        Swal.fire({
          type: 'warning',
          title: 'Could not upload the file:' + file.name,
        });
      });
  }
  profileblockClose() {
    this.backdrop = 'none';
    this.profileblock = 'none';
    (document.getElementById('Prfofileid') as HTMLInputElement).value = null;
  }
  profileblockcancel() {
    this.backdrop = 'none';
    this.profileblock = 'none';
  }

  checkPasswords(group: FormGroup) {
    const pass = group.controls.password.value;
    const confirmPass = group.controls.confirmPassword.value;
    return pass === confirmPass ? null : { notSame: true };
  }
  Dashboard() {
    this.router.navigate(['/dash']);
  }
  setLoggedInblock() {

    this.loggedoutIn = false;
    this.loggedIn = true;
    this.loggIn = true;
    this.router.navigate(['/Logout']);

  }
  companylogo;
  docrole;
  public setLoggedIn() {

    try {
      const CID = localStorage.getItem('CompanyID');
      this.commonService.getListOfData('RegistrationMaster/Getusersaccess/' + localStorage.getItem('userDoctorID') + '/' + localStorage.getItem('RoleDescription') + '/' + CID).subscribe(data => {
        localStorage.setItem('Roletableid', data.RoleRoleid);
        localStorage.setItem('RoleDesc', data.Roleid);
        this.loggIn = true;
        this.loggedIn = true;
        this.loggedoutIn = true;
        this.router.navigate(['/dash']);
        this.outpatientssmenusmenu = data.DataOriginalModule;
        this.outpatientssmenusmenu = this.outpatientssmenusmenu.map(function (el) {
          const obj = Object.assign({}, el);
          if (el.MainDescription == 'Main-Dashboard') { obj.icon = 'fa-tachometer-alt'; } obj;
          if (el.MainDescription == 'Opticals') { obj.icon = 'fa-glasses'; } obj;
          if (el.MainDescription == 'Expense') { obj.icon = 'fa fa-money'; } obj;
          if (el.MainDescription == 'Inventory') { obj.icon = 'fa-warehouse'; } return obj;
        });
        //this.companylogo = data.CompanyImnage;
        localStorage.setItem('Thumburls', data.CompanyImnage);
        this.WorkflowMaster = data.Workflowaccerss;
        localStorage.setItem('Workflowdatamaster', JSON.stringify(data.Workflowaccerss));
        localStorage.setItem('Mixedcompanydata', JSON.stringify(data.Companyarray));
        const concatjsondata = data.FgformsModule.concat(data.Workflowaccerss);
        localStorage.setItem('AllCollectionData', JSON.stringify(concatjsondata));
      });


      this.docrole = localStorage.getItem("RoleDescription");
      this.doctorname = localStorage.getItem('Doctorname');
      this.docotorid = localStorage.getItem('userroleID');
      this.Regnum = localStorage.getItem('Regnumber');
      this.rtag = localStorage.getItem('userReferrencetag');
      this.Indiaflag = 'flag-icon flag-icon-' + localStorage.getItem('Countryflagcode') + ' flag-icon-squared';
      this.Companyname = localStorage.getItem('Companyname');
      this.Menudoctor = localStorage.getItem('Menudoctorname');
      this.Menulogindateandtime = localStorage.getItem('Menulogintime');
      this.menubranch = localStorage.getItem('MenuBranch');

      this.commonService.getListOfData('Common/ErrorList/' + 'Successfully Logged-In' + '/' + 'Login Component' + '/' + CID + '/' + localStorage.getItem('userroleID') + '/')
        .subscribe(data => {

        });
    } catch (Error) {
      const CID = localStorage.getItem('CompanyID');
      alert(Error.message);
      this.commonService.getListOfData('Common/ErrorList/' + Error.message + '/' + 'Login Component' + '/' + CID + '/' + localStorage.getItem('userroleID') + '/')
        .subscribe(data => {

        });
    }
  }
  selectedIndex: number = 0;
  pathss
  transformThumb() {
    this.pathss = localStorage.getItem('Thumburls');
    return this._sanitizer.bypassSecurityTrustResourceUrl('data:image/png;base64,' + this.pathss);
  }
  moveToSelectedTab(tabName: string) {
    for (let i = 0; i < document.querySelectorAll('.mat-tab-label-content').length; i++) {
      if ((<HTMLElement>document.querySelectorAll('.mat-tab-label-content')[i]).innerText == tabName) {
        (<HTMLElement>document.querySelectorAll('.mat-tab-label')[i]).click();
      }
    }
  }

  tabsChanged(workflodata) {

    var objjdata = JSON.parse(localStorage.getItem("Workflowdatamaster"));
    if (workflodata != 'Patient History') {
      const res1 = workflodata.tab.textLabel;
      if (res1 != "Dashboard") {
        var filterdata = objjdata.filter(el => el.formDescription === res1);
        const parentdesc = filterdata[0].Parentmoduledescription;
        this.router.navigate([parentdesc]);
      } else {
        this.router.navigate(["/dash"]);
      }
    } else {
      const res2 = 'Patient History';
      var filterdata = objjdata.filter(el => el.formDescription === res2);
      const parentdesc = filterdata[0].Parentmoduledescription;
      this.router.navigate([parentdesc]);
      this.moveToSelectedTab(res2);
    }
  }

  mangepasswordbtn() {

    //this.pwds = localStorage.getItem('password');
    this.backdrop = 'block';
    this.passwordblock = 'block';
  }
  passwordblockcancel() {

    if (this.pwdss != null && this.newpwdss != null && this.confirmpwdss != null) {
      this.backdrop = 'block';
      this.passwordasblock = 'block';
    }
  }
  passwordblocskClose() {
    this.backdrop = 'none';
    this.passwordasblock = 'none';
  }
  passwordblockscancel() {
    this.backdrop = 'none';
    this.passwordasblock = 'none';
  }
  passwordblocksokay() {

    this.passwordasblock = 'none';
    this.passwordblock = 'none';
    this.pwdss = null;
    this.confirmpwdss = '';
    this.newpwdss = '';


  }

  passwordblockClose() {
    this.backdrop = 'none';
    this.passwordblock = 'none';
  }

  passwordblockOk() {


    //this.pwds = localStorage.getItem('password');
    this.docotoridsss = localStorage.getItem('userroleID');
    this.commonService.data.oldpassword = this.pwdss;
    this.commonService.data.password = this.newpwdss;
    this.commonService.data.confirmpasswword = this.confirmpwdss;
    this.commonService.data.userid = this.docotoridsss;

    this.commonService.postData('RegistrationMaster/Insertnewpass/' + this.docotoridsss, this.commonService.data)
      .subscribe(data => {
        if (data.status != "Password Incorrect") {
          Swal.fire({
            position: 'center',
            type: 'success',
            title: 'Password validated and changed successfully',
            showConfirmButton: false,
            timer: 2000
          });
          this.passwordblock = 'none';
          this.pwdss = null;
          this.confirmpwdss = '';
          this.newpwdss = '';
          this.loginYes();
        } else {
          Swal.fire({
            position: 'center',
            type: 'warning',
            title: 'Old Password is Incorrect , Please try again !',
            showConfirmButton: false,
            timer: 2000
          });
        }




      });


  }
  modalCommonClose() {
    this.backdrop = 'none';
    this.modalCommon = 'none';
  }
  modalCommonYes = function () { };
  modalCommonNo = function () { };
  modalCommonOk = function () { };
  modalCommonReset = function () {

    this.backdrop = 'none';
    this.modalCommon = 'none';
    this.modalCommonDialogWidth = '300px';
    this.modalCommonTitle = '';
    this.modalCommonBody = '';
    this.showModalCommonYesNo = false;
    this.showModalCommonOk = false;
    this.modalCommonYes = function () { };
    this.modalCommonNo = function () { };
    this.modalCommonOk = function () { };

  };
  Hiding() {
    this.istotalhidden = true;
    this.isbtnhidden = true;
    this.isreghiden = false;
    this.router.navigate(['']);
  }

  loginNo() {
    this.backdrop = 'none';
    this.loginYesblock = 'none';
  }
  loginYes() {
    this.backdrop = 'none';
    this.loginYesblock = 'none';
    this.idle.stop();
    this.loggIn = false;
    this.loggedIn = false;
    this.loggedoutIn = false;
    localStorage.clear();
    this.router.navigate(['/login']);
    //this.commonService.getListOfData('RegistrationMaster/DeleteToken/' + localStorage.getItem('userroleID')).subscribe(data => {
    //  if (data.Success == true) {
    //    this.backdrop = 'none';
    //    this.loginYesblock = 'none';
    //    this.idle.stop();
    //    this.loggIn = false;
    //    this.loggedIn = false;
    //    this.loggedoutIn = false;
    //    localStorage.clear();
    //    this.router.navigate(['/login']);
    //  } else {
    //    Swal.fire({
    //      position: 'center',
    //      type: 'warning',
    //      title: 'Please contact admin.',
    //      showConfirmButton: true,
    //    });
    //  }

    //});
  }

  loginYesout() {
    localStorage.clear();
    this.backdrop = 'none';
    this.loginYesoutblock = 'none';
  }

  Logout() {
    this.backdrop = 'block';
    this.loginYesblock = 'block';
  }


  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
}



