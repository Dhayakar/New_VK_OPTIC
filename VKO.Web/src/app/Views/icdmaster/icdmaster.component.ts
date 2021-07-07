import { Component, OnInit, ViewChild, Inject, Input, ElementRef } from '@angular/core';
import { CommonService } from '../../shared/common.service';
import { AppComponent } from '../../app.component';
import { ICDExtenstionDOC, IcdMaster } from 'src/app/Models/ViewModels/IcdMasterViewModel';
import { NgForm } from '@angular/forms';
import { MatTableDataSource, MatSort } from '@angular/material';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import Swal from 'sweetalert2'
import * as XLSX from 'xlsx';

import html2canvas from 'html2canvas';
import { SearchComponent } from '../search/search.component';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import { number } from '@amcharts/amcharts4/core';

declare var $: any;

@Component({
  selector: 'app-icdmaster',
  templateUrl: './icdmaster.component.html',
  styleUrls: ['./icdmaster.component.less']
})
export class IcdmasterComponent implements OnInit {

  constructor(private router: Router,public commonService: CommonService<IcdMaster>, public appComponent: AppComponent, public dialog: MatDialog, public el: ElementRef) { }

  openDialog(icdgroup) {
    debugger
    if (icdgroup == null || icdgroup == '' || icdgroup == undefined) {
      debugger
      Swal.fire({
        type: 'warning',
        title: 'Select ICD Group',
      })
      return;
    }

    localStorage.setItem('helpname', 'icdmaster');
    const dialogRef = this.dialog.open(SearchComponent, {
      height: '80%',
      width: '95%',
      disableClose: true,
      data: {
        dataKey: Number(icdgroup.Value)
      }
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result.success) {
        let item = result.data;
        this.icdcode = item.Code;
        this.icddescription = item.description;
        if (item.speciality != null) {
          let tempspecial = this.specials.find(x => x.Text == item.speciality)
          this.special = tempspecial.Value
        }
        else {
          this.special = '';
        }
        if (item.icdgroup != null) {
          let tempicdgroup = this.ICD.find(x => x.Text == item.icdgroup)
          this.icdgroup.Value = tempicdgroup.Value
        }
        else {
          this.icdgroup.Value = '';
        }
        this.M_icdcode = item.Code;
        this.M_IsIOLReqd = item.IsIOLReqd.toString();
        if (item.roomtype != null)
        {
          var RoomT = this.Rooms.find(x => x.Text == item.roomtype)
        }
  
        

        this.commonService.getListOfData('IcdMaster/getSurgeryCostDetail/' + item.Code + '/' + parseInt(localStorage.getItem("CompanyID")) + '/' + RoomT.Value).subscribe(data => {
          debugger
          if (data.Success) {
            debugger
            let item = data.SurgeryCostDetail;
            if (item.roomtype != null) {
              let roo = this.Rooms.find(x => x.Text == item.roomtype)
              this.roomtype = roo.Value
            }
            else {
              this.roomtype = '';
            }
            this.surgerycost = item.surgerycost
            this.packagerate = item.packagerate
            this.dressingcharges = item.dressingcharge
            this.medicinecharges = item.medicinecharge
            this.surgeoncharges = item.surgeoncharge
            this.M_SurgeryCostDetailid = item.id

          }
          else {
            this.roomtype = '';
            this.surgerycost = '';
            this.packagerate = '';
            this.dressingcharges = '';
            this.medicinecharges = '';
            this.surgeoncharges = '';
            this.M_SurgeryCostDetailid = 0;
          }


        });

  
      
      }



      if (!result.success) {

      }
    });
  }

  RestrictSymbol(e): boolean {
    debugger
    if (!(e.keyCode >= 48 && e.keyCode <= 57 || (e.keyCode > 64 && e.keyCode < 91) || (e.keyCode > 96 && e.keyCode < 123) || e.keyCode == 32 || e.keyCode == 9 || (e.keyCode > 34 && e.keyCode < 41) || e.keyCode == 8)) {
      return false;
    }
  }


  // fileNameDialogRef: MatDialogRef<DialogDataExampleDialog1>;


  displayedColumns: string[] = ['checked', 'SerialNo', 'IcdCode', 'ICDdesc', 'speciality', 'icdgroup', 'roomtype', 'surgerycost', 'packagerate', 'dressingcharge', 'medicinecharge', 'surgeoncharge', 'Drop'];
  dataSource = new MatTableDataSource();


  @ViewChild('ICDForm') Form: NgForm


  icdcode;
  icddescription;
  speciality;
  icdtype;
  icdgroup;
  location;
  roomtype;
  surgerycost;
  packagerate;
  dressingcharges;
  medicinecharges;
  surgeoncharges;
  //M_IsActive;
  Rooms;
  M_IsIOLReqd;
  Doctornames;
  icd;
  special;

  /////////
  specials;
  ICD;
  locations;
  ////////
  Country1;
  Country2;
  Country3;


  isNextButton = true;
  isNextupdate = true;
  isNextDelete = true;

  ngOnInit() {
    debugger
    var Pathname = "Admissionlazy/ICDMaster";
    var n = Pathname;
    var sstring = n.includes("/");

    var Objdata = JSON.parse(localStorage.getItem("AllCollectionData"));

    if (sstring == false) {
      if (Objdata.find(el => el.Parentmoduledescription === Pathname)) {
        this.commonService.getListOfData('Common/GetCurrencyvalues/' + localStorage.getItem('CompanyID')).subscribe(data => {
          this.Country1 = data;
          this.Country2 = this.Country1[0].Text;
          this.Country3 = this.Country1[0].Value;
        });
        this.commonService.data = new IcdMaster();
        this.CheckIcdSpecialityAccess();
        this.getAllDropdowns();
        localStorage.getItem("CompanyID");

        this.commonService.getListOfData('Common/GetAccessdetails/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem("userroleID") + '/' + Pathname).subscribe(data => {
          this.accessdata = data.GetAvccessDetails;

          if (this.accessdata.find(x => x.Add == true)) {
            this.isNextButton = false;
          } else {
            this.isNextButton = true;
          }
          if (this.accessdata.find(x => x.Edit == true)) {
            this.isNextupdate = false;
          } else {
            this.isNextupdate = true;
          }
          if (this.accessdata.find(x => x.Delete == true)) {
            this.isNextDelete = false;
          } else {
            this.isNextDelete = true;
          }
        });
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
        this.commonService.getListOfData('Common/GetCurrencyvalues/' + localStorage.getItem('CompanyID')).subscribe(data => {
          this.Country1 = data;
          this.Country2 = this.Country1[0].Text;
          this.Country3 = this.Country1[0].Value;
        });
        this.commonService.data = new IcdMaster();
        this.CheckIcdSpecialityAccess();
        this.getAllDropdowns();
        localStorage.getItem("CompanyID");

        this.commonService.getListOfData('Common/GetAccessdetailsstring/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem("userroleID") + '/' + Pathname).subscribe(data => {
          this.accessdata = data.GetAvccessDetails;

          if (this.accessdata.find(x => x.Add == true)) {
            this.isNextButton = false;
          } else {
            this.isNextButton = true;
          }
          if (this.accessdata.find(x => x.Edit == true)) {
            this.isNextupdate = false;
          } else {
            this.isNextupdate = true;
          }
          if (this.accessdata.find(x => x.Delete == true)) {
            this.isNextDelete = false;
          } else {
            this.isNextDelete = true;
          }
        });
       
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


  }

  modalcloseAccessOk() {
    this.backdrop = 'none';
    this.accesspopup = 'none';
  }

  accesspopup;
  accessdata;
  Getformaccess() {
    debugger;
    var Pathname = "Admissionlazy/ICDMaster";
    var n = Pathname;
    var sstring = n.includes("/");
    if (sstring == false) {
      this.commonService.getListOfData('Common/GetAccessdetails/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem("userroleID") + '/' + Pathname).subscribe(data => {
        this.accessdata = data.GetAvccessDetails;
        this.backdrop = 'block';
        this.accesspopup = 'block';
      });
    }
    else if (sstring == true) {
      this.commonService.getListOfData('Common/GetAccessdetailsstring/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem("userroleID") + '/' + Pathname).subscribe(data => {
        this.accessdata = data.GetAvccessDetails;
        this.backdrop = 'block';
        this.accesspopup = 'block';
      });
    }
  }

  getAllDropdowns() {
    this.commonService.getListOfData('Common/GetICDSpecialityCode').subscribe(data => { this.specials = data; });
    this.commonService.getListOfData('Common/GetICDDropdownvalues').subscribe(data => { this.ICD = data; });
    this.commonService.getListOfData('Common/GetlocDropdownvalues').subscribe(data => { this.locations = data; });
    this.commonService.getListOfData('Common/GetRooms').subscribe(data => { this.Rooms = data; });
    this.commonService.getListOfData('Common/Getdoctornamedetails/' + localStorage.getItem("CompanyID"))
      .subscribe(data => {
        debugger;   
        this.Doctornames = data;
      });
    this.commonService.getListOfData('Common/GetDoctorSpecialitydetails/' + localStorage.getItem("CompanyID"))
      .subscribe(data => {
        debugger;
        this.Doctornames = data;
      });
  }

  displayedColumnIcdEx: string[] = ['Doctorname', 'DoctorSpeciality', 'SurgeonCharges', 'Action'];
  
  displayedColumnIcdEx1: string[] = ['Doctorname', 'DoctorSpeciality', 'ConsultationCharges', 'Action'];
  displayedColumnIcdEx2: string[] = ['Doctorname', 'DoctorSpeciality', 'SurgeonCharges', 'Action'];
  dataSourceIcdEx = new MatTableDataSource();

  IcdGroupPathSubmit:boolean=false;
  IcdSpecPathSubmit:boolean=false;

  CheckIcdSpecialityAccess()
  {
    this.commonService.getListOfData('Common/GetAccessdetailsolm/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem("userroleID") + '/' + 'Icd Group Speciality' + '/' + 'Admissionlazy'
    ).subscribe(data => {
      debugger
      if (data.GetAvccessDetails.find(x => x.Add == true)) {
        debugger
        this.IcdSpecPathSubmit = false;
      } else {
        debugger
        this.IcdSpecPathSubmit = true;
      }
    });


    this.commonService.getListOfData('Common/GetAccessdetailsolm/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem("userroleID") + '/' + 'ICD Group' + '/' + 'Admissionlazy'
    ).subscribe(data => {
      debugger
      if (data.GetAvccessDetails.find(x => x.Add == true)) {
        debugger
        this.IcdGroupPathSubmit = false;
      } else {
        debugger
        this.IcdGroupPathSubmit = true;
      }
    });


  }


  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      if ((charCode > 34 && charCode < 41) || charCode == 46) {
        return true;
      }
      return false;
    }

    return true;
  }

  nameField(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if ((charCode > 64 && charCode < 91) || (charCode > 96 && charCode < 123) || charCode == 32 || charCode == 46 || charCode == 9 || (charCode > 34 && charCode < 41) || charCode == 8) {
      return true;
    }
    return false;
  }
  //////////////
  backdrop;
  specialityAdd;
  spec;
  icds;
  loc;
  modalHelp1;
  icdSearch;
  isHidden


  ClickSpec() {
    try {
      const dialogRef = this.dialog.open(IcdSpeciality, {
        height: '50%',
        width: '35%',
        position: { top: '50px', right: '420px', },

        disableClose: true
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result.success) {
          this.commonService.getListOfData('Common/GetICDSpecialityCode').subscribe(data => { this.specials = data; });
        }
        if (!result.success) {
          this.commonService.getListOfData('Common/GetICDSpecialityCode').subscribe(data => { this.specials = data; });
        }
      });
    }
    catch (Error) {
      this.commonService.getListOfData('Common/ErrorList/' + Error.message + '/' + "ICD MASTER" + '/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem('userroleID') + '/')
        .subscribe(data => { });
    }
  }

  Clickicdgroup() {
    try {
      const dialogRef = this.dialog.open(IcdGroup, {
        height: '50%',
        width: '35%',
        position: { top: '50px', right: '420px', },

        disableClose: true
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result.success) {
          this.commonService.getListOfData('Common/GetICDDropdownvalues').subscribe(data => { this.ICD = data; });
        }
        if (!result.success) {
          this.commonService.getListOfData('Common/GetICDDropdownvalues').subscribe(data => { this.ICD = data; });
        }
      });
    }
    catch (Error) {
      this.commonService.getListOfData('Common/ErrorList/' + Error.message + '/' + "ICD MASTER" + '/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem('userroleID') + '/')
        .subscribe(data => { });
    }
  }






  isInvalid: boolean = false;
  hiddenicdspy = true;
  ////////////////////////////////////////////////////////////////////////
  /*Submit*/
  form;
  onSubmit(form: NgForm) {
    debugger;
    try {
      if (form.valid) {
        this.isInvalid = false;
        
        this.commonService.data = new IcdMaster();
        this.commonService.data.icdcodemasters.ICDCODE = this.icdcode;
        this.commonService.data.icdcodemasters.ICDDESCRIPTION = this.icddescription;
        this.commonService.data.icdcodemasters.ICDGROUP = this.icdgroup.Value;
        this.commonService.data.icdcodemasters.IsIOLReqd = this.M_IsIOLReqd;
        this.commonService.data.icdcodemasters.SpecialityCode = Number(this.special);
        this.commonService.data.SurgeryCostDetails.Roomtype = this.roomtype;
        this.commonService.data.SurgeryCostDetails.CMPID = parseInt(localStorage.getItem("CompanyID"));
        this.commonService.data.SurgeryCostDetails.SurgeryCost = this.surgerycost;
        this.commonService.data.SurgeryCostDetails.PACKAGERATE = this.packagerate;
        this.commonService.data.SurgeryCostDetails.DressingCharge = this.dressingcharges;
        this.commonService.data.SurgeryCostDetails.MedicationCharge = this.medicinecharges;
        this.commonService.data.SurgeryCostDetails.SURGEONCHARGE = this.surgeoncharges;
        this.commonService.data.icdcodemasters.CreatedBy = parseInt(localStorage.getItem("userroleID"));

        if (this.ICDExtenstiondata != undefined) {
          for (var i = 0; i < this.ICDExtenstiondata.length; i++) {
            var ICDdetails = new ICDExtenstionDOC();
            ICDdetails.Doctorname = this.ICDExtenstiondata[i].Doctorname;;
            ICDdetails.SurgeonCharges = this.ICDExtenstiondata[i].SurgeonCharges;;
            this.commonService.data.ICDExtenstionDOC.push(ICDdetails);
          }
        }
        else
        {
          this.commonService.data.ICDExtenstionDOC = [];
        }
      


        this.commonService.postData('IcdMaster/AddIcd', this.commonService.data)
          .subscribe(data => {

            if (data.Success == true) {

              Swal.fire({
                type: 'success',
                title: 'success',
                text: 'Data Saved successfully',
                position: 'top-end',
                showConfirmButton: false,
                timer: 1500,
                customClass: {
                  popup: 'alert-warp',
                  container: 'alert-container',
                },
              });
              this.Form.onReset();
              this.commonService.data.ICDExtenstionDOC = [];
              this.dataSourceIcdEx.data = [];
            }
            else if (data.Success == false && data.Message == "ICD Code already Exists") {
              //this.ngOnInit();
              Swal.fire({
                type: 'warning',
                title: 'ICD CODE Already Exits',
                position: 'top-end',
                showConfirmButton: false,
                timer: 1500,
                customClass: {
                  popup: 'alert-warp',
                  container: 'alert-container',
                },
              });
            }
            else {
              Swal.fire({
                type: 'warning',
                title: 'Invalid Input,Please Contact Administrator',
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
      else {
        this.isInvalid = true;
        let target = this.el.nativeElement.querySelector('.required.ng-invalid')
        setTimeout(function () {
          $('html,body').animate({ scrollTop: $(target).offset().top }, 'slow');
          target.focus();
        }, 500);
      }
    }
    catch (Error) {
      this.commonService.getListOfData('Common/ErrorList/' + Error.message + '/' + "ICD MASTER" + '/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem('userroleID') + '/')
        .subscribe(data => { });
    }
  }



  onSurgeryCostDetailSubmit(form: NgForm) {
    debugger
    try {
      if (form.valid) {

        this.commonService.data.icdcodemasters.ICDCODE = this.icdcode;
        this.commonService.data.icdcodemasters.ICDDESCRIPTION = this.icddescription;
        this.commonService.data.icdcodemasters.ICDGROUP = this.icdgroup.Value;
        this.commonService.data.icdcodemasters.IsIOLReqd = this.M_IsIOLReqd;
        this.commonService.data.icdcodemasters.SpecialityCode = Number(this.special);
        this.commonService.data.SurgeryCostDetails.Roomtype = this.roomtype;
        this.commonService.data.SurgeryCostDetails.CMPID = parseInt(localStorage.getItem("CompanyID"));
        this.commonService.data.SurgeryCostDetails.SurgeryCost = this.surgerycost;
        this.commonService.data.SurgeryCostDetails.PACKAGERATE = this.packagerate;
        this.commonService.data.SurgeryCostDetails.DressingCharge = this.dressingcharges;
        this.commonService.data.SurgeryCostDetails.MedicationCharge = this.medicinecharges;
        this.commonService.data.SurgeryCostDetails.SURGEONCHARGE = this.surgeoncharges;
        this.commonService.data.icdcodemasters.CreatedBy = parseInt(localStorage.getItem("userroleID"));

        this.commonService.postData('IcdMaster/SurgeryCostDetailSubmit', this.commonService.data)
          .subscribe(data => {

            if (data.Success == true) {
              Swal.fire({
                type: 'success',
                title: 'success',
                text: 'Data Saved successfully',
                position: 'top-end',
                showConfirmButton: false,
                timer: 1500,
                customClass: {
                  popup: 'alert-warp',
                  container: 'alert-container',
                },
              });
              this.Form.onReset();
            }
            else {
              Swal.fire({
                type: 'warning',
                title: 'Invalid Input,Please Contact Administrator',
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
      else {
        this.isInvalid = true;
        let target = this.el.nativeElement.querySelector('.required.ng-invalid')
        setTimeout(function () {
          $('html,body').animate({ scrollTop: $(target).offset().top }, 'slow');
          target.focus();
        }, 500);
      }
    }
    catch (Error) {
      this.commonService.getListOfData('Common/ErrorList/' + Error.message + '/' + "ICD MASTER" + '/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem('userroleID') + '/')
        .subscribe(data => { });
    }
  }

  /*Update*/

  Updateclk(form: NgForm, M_icdcode, M_SurgeryCostDetailid) {
    debugger
    try {
      if (form.valid) {
        this.isInvalid = false;
        this.commonService.data = new IcdMaster();

        this.commonService.data.icdcodemasters.ICDCODE = this.icdcode;
        this.commonService.data.icdcodemasters.ICDDESCRIPTION = this.icddescription;
        this.commonService.data.icdcodemasters.ICDGROUP = this.icdgroup.Value;
        this.commonService.data.icdcodemasters.IsIOLReqd = this.M_IsIOLReqd;
        this.commonService.data.icdcodemasters.SpecialityCode = Number(this.special);
        //  this.commonService.data.icdcodemasters.IsActive = this.M_IsActive;
        this.commonService.data.SurgeryCostDetails.Roomtype = this.roomtype == "" ? null : this.roomtype;
        this.commonService.data.SurgeryCostDetails.SurgeryCost = this.surgerycost;
        this.commonService.data.SurgeryCostDetails.PACKAGERATE = this.packagerate;
        this.commonService.data.SurgeryCostDetails.DressingCharge = this.dressingcharges;
        this.commonService.data.SurgeryCostDetails.MedicationCharge = this.medicinecharges;
        this.commonService.data.SurgeryCostDetails.SURGEONCHARGE = this.surgeoncharges;
        this.commonService.data.icdcodemasters.UpdatedBy = parseInt(localStorage.getItem("userroleID"));
        this.commonService.data.SurgeryCostDetails.CMPID = parseInt(localStorage.getItem("CompanyID"));
        this.commonService.postData("IcdMaster/UpdateIcd/" + M_icdcode + "/" + M_SurgeryCostDetailid, this.commonService.data)
          .subscribe(data => {
            if (data.Success == true) {
              Swal.fire({
                type: 'success',
                title: 'success',
                text: 'Data Saved successfully',
                position: 'top-end',
                showConfirmButton: false,
                timer: 1500,
                customClass: {
                  popup: 'alert-warp',
                  container: 'alert-container',
                },
              });
              this.Form.onReset();
            }
            else {
              Swal.fire({
                type: 'warning',
                title: 'Invalid Input,Please Contact Administrator',
                position: 'top-end',
                showConfirmButton: false,
                timer: 1500,
                customClass: {
                  popup: 'alert-warp',
                  container: 'alert-container',
                },
              });
            }
            this.Form.onReset();
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
    catch (Error) {
      this.commonService.getListOfData('Common/ErrorList/' + Error.message + '/' + "ICD MASTER" + '/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem('userroleID') + '/')
        .subscribe(data => { });
    }
  }

  specs;

  Deleteclk(Code) {
    debugger;
    try {
      Swal.fire({
        title: 'Are you sure?',
        text: "Want to delete ICD Record",
        type: 'warning',
        showCancelButton: true,
        cancelButtonColor: '#d33',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Yes',
        reverseButtons: true,
        focusCancel: true,
      }).then((result) => {
        if (result.value) {
          this.commonService.postData("IcdMaster/DeleteICD/" + Code, this.commonService.data)
            .subscribe(data => {
              if (data.Success == true) {
                Swal.fire({
                  type: 'success',
                  title: 'success',
                  text: 'Deleted successfully',
                  position: 'top-end',
                  showConfirmButton: false,
                  timer: 1500,
                  customClass: {
                    popup: 'alert-warp',
                    container: 'alert-container',
                  },
                });
              }
              else {
                Swal.fire({
                  type: 'warning',
                  title: 'Invalid Input,Please Contact Administrator',
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
        this.Form.onReset();
      })
    }
    catch (Error) {
      this.commonService.getListOfData('Common/ErrorList/' + Error.message + '/' + "ICD MASTER" + '/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem('userroleID') + '/')
        .subscribe(data => { });
    }
  }





  DoctorSpeciality;
  M_icdcode;
  M_SurgeryCostDetailid;


  ViewCod1() {
    try {
      this.commonService.data = new IcdMaster();
      this.commonService.getListOfData('Help/getCode1/').subscribe(data => {
        if (data.IcdDetail != null) {
          this.isHidden = true;
          this.commonService.data = data;
          this.dataSource.data = data.IcdDetail;
        }
      });
    }
    catch (Error) {
      this.commonService.getListOfData('Common/ErrorList/' + Error.message + '/' + "ICD MASTER" + '/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem('userroleID') + '/')
        .subscribe(data => { });
    }
  }

  cancelblock;

  cancel() {

    if (this.icdcode != null || this.commonService.data.ICDExtenstionDOC.length != 0 || this.icddescription != null || this.special != null || this.icdgroup.Value != null || this.roomtype != null || this.surgerycost != null || this.packagerate != null || this.dressingcharges != null || this.medicinecharges != null || this.surgeoncharges != null) {
      this.backdrop = 'block';
      this.cancelblock = 'block';
    }
    else {
      this.Form.onReset();
      this.commonService.data.ICDExtenstionDOC = [];
      this.dataSourceIcdEx.data = [];
    }
  }


  modalcloseOk() {
    this.backdrop = 'none';
    this.cancelblock = 'none';
  }
  modalSuccesssOk() {
    this.cancelblock = 'none';
    this.Form.onReset();
    this.commonService.data.ICDExtenstionDOC = [];
    this.dataSourceIcdEx.data = [];
  }



  AccessDenied() {
    Swal.fire({
      position: 'center',
      type: 'warning',
      title: 'Access Denied',
      showConfirmButton: false,
      timer: 2000
    });
    return
  }
  icdgroupChange()
  {
    debugger;
    if (this.icdgroup.Text == "General")
    {
      this.hiddenicdspy = false;
      this.displayedColumnIcdEx = this.displayedColumnIcdEx1;

    }
    else
    {
      this.hiddenicdspy = true;
      this.displayedColumnIcdEx = this.displayedColumnIcdEx2;
    }
  }
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  ////////////////////////
  ICDExtenstiondata;
  DoctornamesChange(id, event, element)
  {
    debugger;
    element.Doctorname = event.value;
    this.commonService.data.ICDExtenstionDOC[id].Doctorname = event.value;
    this.ICDExtenstiondata[id].Doctorname = event.value;

    this.commonService.getListOfData('IcdMaster/GetDoctorSpecialitydetails/' + event.value + '/' + localStorage.getItem("CompanyID"))
      .subscribe(data => {
        debugger;
        this.DoctorSpeciality = data;

        var result = _.chain(this.DoctorSpeciality.DoctorSpecialitydetails).groupBy("DID").map(function (v, i) {
          debugger;
          return {
            ParentDescription: _.map(v, 'ParentDescription'),
          }
        }).value();
        debugger;
        element.DoctorSpeciality = result[0].ParentDescription;

      });


    if (this.commonService.data.ICDExtenstionDOC.length > 1)
    {
      var arraydata = this.commonService.data.ICDExtenstionDOC.filter(t => t.Doctorname == event.value).length;
      if (arraydata == 2) {

        Swal.fire({
          type: 'warning',
          title: 'warning',
          text: 'Data already exists',
          position: 'top-end',
          showConfirmButton: false,
          timer: 1500,
          customClass: {
            popup: 'alert-warp',
            container: 'alert-container',
          },
        });
        this.commonService.data.ICDExtenstionDOC.splice(id, 1);
        this.dataSourceIcdEx.data.splice(id, 1)
        this.dataSourceIcdEx._updateChangeSubscription();
      }
    }

    //var arraydata = this.commonService.data.ICDExtenstionDOC.filter(t => t.Doctorname == event.value).length;


  }
  SurgeonAmount(id, property: string, event: any, data)
  {
    debugger;
    let result: number = Number(event.target.textContent);
    this.commonService.data.ICDExtenstionDOC[id].SurgeonCharges = result;
    this.ICDExtenstiondata[id].SurgeonCharges = result;
    this.dataSourceIcdEx.filteredData[id][property] = result;
    this.dataSourceIcdEx._updateChangeSubscription();
  }
  AddIcdmappingNewgrid() {
    debugger;

    var paydel = this.commonService.data.ICDExtenstionDOC;
    if (this.commonService.data.ICDExtenstionDOC.length == 0) {
      var paydetails = new ICDExtenstionDOC();
     paydetails.Doctorname = "";
     paydetails.SurgeonCharges=0 ;
      this.commonService.data.ICDExtenstionDOC.push(paydetails);
      this.dataSourceIcdEx.data = this.commonService.data.ICDExtenstionDOC;
      this.dataSourceIcdEx._updateChangeSubscription();
      this.ICDExtenstiondata = this.commonService.data.ICDExtenstionDOC;
      return;

    }


    if (paydel.some(x => x.Doctorname == null || x.Doctorname == undefined || x.Doctorname == "")) {

      Swal.fire({
        type: 'warning',
        title: 'Registration',
        text: 'Check The Doctor Name',
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          popup: 'alert-warp',
          container: 'alert-container'
        },
      });
      return;
    }
    if (paydel.some(x => x.SurgeonCharges == 0 || x.Doctorname == null || x.Doctorname == undefined)) {

      Swal.fire({
        type: 'warning',
        title: 'Registration',
        text: 'Check The Surgeon Charges',
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          popup: 'alert-warp',
          container: 'alert-container'
        },
      });
      return;
    }

    var paydetails = new ICDExtenstionDOC();
    paydetails.Doctorname = "";
    paydetails.SurgeonCharges;
    this.commonService.data.ICDExtenstionDOC.push(paydetails);
    this.dataSourceIcdEx.data = this.commonService.data.ICDExtenstionDOC;
    this.dataSourceIcdEx._updateChangeSubscription();
    this.ICDExtenstiondata = this.commonService.data.ICDExtenstionDOC;

    //this.commonService.getListOfData('Common/Getdoctornamedetails/' + localStorage.getItem("CompanyID")).subscribe(data => {
    //  debugger;
    //  let dm = data;
    //  var H = this.commonService.data.ICDExtenstion;
    //  var b = dm.filter((c) => H.every((balanceCode) => balanceCode.Doctorname !== c.Value));
    //  this.Doctornames = b;
    //});
  }

  removePaytype(i) {
    debugger;
    Swal.fire({
      title: 'Are you sure?',
      text: "Want To Drop This Row",
      type: 'warning',
      showCancelButton: true,
      cancelButtonColor: '#d33',
      allowOutsideClick: false,
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Yes',
      reverseButtons: true,
    }).then((result) => {
      if (result.value) {
        if (i !== -1) {
          this.dataSourceIcdEx.data.splice(i, 1);
          this.dataSourceIcdEx._updateChangeSubscription();
        }
        Swal.fire(
          'Deleted!',
        )
      }
    })
  }

}
/////////////



@Component({
  selector: 'dialog-data-Speciality-dialog',
  templateUrl: 'dialog-data-Speciality-dialog.html',
  styleUrls: ['dialog-data-Speciality-dialog.less']
})


export class IcdSpeciality implements OnInit {
  el: any;


  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: any, public commonService: CommonService<IcdMaster>,
    public dialogRef: MatDialogRef<IcdSpeciality>,
  ) { }

  ngOnInit() {

  }

  @ViewChild('SpecialityForm') Form: NgForm

  /*Adding Speciality*/

  specs;
  isInvalid: boolean = false;

  AddSpecial(form: NgForm) {
    try {
      if (form.valid) {
        this.isInvalid = false;
        this.commonService.data = new IcdMaster();

        this.commonService.data.onelinemaster.ParentDescription = this.specs;
        this.commonService.data.onelinemaster.CreatedBy = parseInt(localStorage.getItem("userroleID"));
        this.commonService.postData('IcdMaster/AddSpecial', this.commonService.data)
          .subscribe(data => {

            if (data.Success == true) {
              this.ngOnInit();
              Swal.fire({
                type: 'success',
                title: 'success',
                text: 'Data Saved successfully',
                position: 'top-end',
                showConfirmButton: false,
                timer: 1500,
                customClass: {
                  popup: 'alert-warp',
                  container: 'alert-container',
                },
              });
              this.specs = '';
              this.dialogRef.close({ success: true });
            }

            else {
              Swal.fire({
                type: 'warning',
                title: 'Invalid Input,Please Contact Administrator',
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
      else {
        this.isInvalid = true;
        let target = this.el.nativeElement.querySelector('.required.ng-invalid')
        setTimeout(function () {
          $('html,body').animate({ scrollTop: $(target).offset().top }, 'slow');
          target.focus();
        }, 500);
      }
    }
    catch (Error) {
      this.commonService.getListOfData('Common/ErrorList/' + Error.message + '/' + "ICD MASTER" + '/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem('userroleID') + '/')
        .subscribe(data => { });
    }
  }
  Dialogclose() {

    this.dialogRef.close({ success: false });
  }

  ////////////////////////
}


///IcdGroup Dialog///

@Component({
  selector: 'dialog-data-icdgroup-dialog',
  templateUrl: 'dialog-data-icdgroup-dialog.html',
  styleUrls: ['dialog-data-Speciality-dialog.less']
})


export class IcdGroup implements OnInit {
  el: any;


  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: any, public commonService: CommonService<IcdMaster>,
    public dialogRef: MatDialogRef<IcdGroup>,
  ) { }

  ngOnInit() {

  }

  @ViewChild('Icd') Form: NgForm


  /*Adding Speciality*/

  icds;
  isInvalid: boolean = false;

  Addicds(form: NgForm) {

    try {
      if (form.valid) {
        this.isInvalid = false;
        this.commonService.data = new IcdMaster();

        this.commonService.data.onelinemaster.ParentDescription = this.icds;

        this.commonService.postData('IcdMaster/AddIcdgroup', this.commonService.data)
          .subscribe(data => {

            if (data.Success == true) {

              Swal.fire({
                type: 'success',
                title: 'success',
                text: 'Data Saved successfully',
                position: 'top-end',
                showConfirmButton: false,
                timer: 1500,
                customClass: {
                  popup: 'alert-warp',
                  container: 'alert-container',
                },
              });
            }


            else {
              Swal.fire({
                type: 'warning',
                title: 'Invalid Input,Please Contact Administrator',
                position: 'top-end',
                showConfirmButton: false,
                timer: 1500,
                customClass: {
                  popup: 'alert-warp',
                  container: 'alert-container',
                },
              });
            }
            this.icds = "";
            this.dialogRef.close({ success: true });
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
    catch (Error) {
      this.commonService.getListOfData('Common/ErrorList/' + Error.message + '/' + "ICD MASTER" + '/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem('userroleID') + '/')
        .subscribe(data => { });
    }


 

  }
  Dialogclose() {

    this.dialogRef.close({ success: false });
  }







}
