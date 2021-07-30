
import { Component, OnInit, ViewChild, ElementRef, Inject, Input, Output, EventEmitter } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { CommonService } from '../../shared/common.service';
import { AppComponent } from '../../app.component';
import { DatePipe } from '@angular/common';
import { DataSource } from '@angular/cdk/collections';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import Swal from 'sweetalert2'
import * as _moment from 'moment';
import * as _rollupMoment from 'moment';
import { OpticalPrescription } from '../../Models/ViewModels/OpticalPrescription.viewmodel';
import { NgForm, FormGroup, FormBuilder } from '@angular/forms';
import { OpticalPrescriptionn } from '../../Models/OpticalPrescriptionn.model';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef, DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material';
import { SearchComponent } from '../search/search.component';
import { Router } from '@angular/router';
const moment = _rollupMoment || _moment;



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
};

@Component({
  selector: 'app-optical',
  templateUrl: './optical.component.html',
  styleUrls: ['./optical.component.less'],
  providers: [

    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },

    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})



export class OpticalComponent implements OnInit {


  isDisabled = true;

  isInvalid = false;


  @ViewChild('OpticalprescriptionForm') Form: NgForm

  constructor(public commonService: CommonService<OpticalPrescription>,
    public datepipe: DatePipe, public el: ElementRef,
    public appComponent: AppComponent,
    private formBuilder: FormBuilder, public dialog: MatDialog, private router: Router,) {
  }

  accessdata;
  Disabled: boolean = true;
  Getloctime;

  ngOnInit() {

    var Pathname = "Opticalslazy/Optical";
    var Objdata = JSON.parse(localStorage.getItem("AllCollectionData"));

    var n = Pathname;
    var sstring = n.includes("/");

    if (sstring == false) {

      if (Objdata.find(el => el.Parentmoduledescription === Pathname)) {

        this.commonService.getListOfData('Common/GetAccessdetails/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem("userroleID") + '/' + Pathname).subscribe(data => {
          this.commonService.data = data;
          debugger;
          this.accessdata = data.GetAvccessDetails;
          if (this.accessdata.find(x => x.Print == true)) {
            this.Disabled = false;
          } else {
            this.Disabled = true;
          }
        });
        this.Getloctime = localStorage.getItem('GMTTIME');
        localStorage.getItem("CompanyID");

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
          if (this.accessdata.find(x => x.Print == true)) {
            this.Disabled = false;
          } else {
            this.Disabled = true;
          }

        });
        this.Getloctime = localStorage.getItem('GMTTIME');
        localStorage.getItem("CompanyID");

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

  uin;
  name;
  age;
  gender;

  Clickopticalprescription() {
    localStorage.setItem('helpname', 'OpticalPrescription');
    const dialogRef = this.dialog.open(SearchComponent, {
      height: '70%',
      width: '85%',
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result.success) {
        debugger;
        let item = result.data;

        this.uin = item.UIN;
        this.name = item.Name;
        this.age = item.DateofBirth;
        this.gender = item.Gender;

        this.commonService.getListOfData('OpticalPrescription/GetopticalDetails/' + item.RegistrationTranID + '/')
          .subscribe((data: any) => {
            debugger;

            this.optical = data.opticprescription;
            this.optical.forEach((x: any) => {
              debugger;
              if (x.Ocular === "OD" && x.TypeDescription === "Distance Vision") {
                this.SPHACC1 = x.DistSph;
                this.CYLACC1 = x.NearCyl;
                this.AXISACC1 = x.PinAxis;
                this.VA = x.Add;
                this.Remarksacc = x.Remarks;
                this.PDD = x.PD;
                this.MPD = x.MPDOD;
                this.MPD1 = x.MPDOS;

              }
              else if (x.Ocular === "OS" && x.TypeDescription === "Distance Vision") {
                this.SPHTAN1 = x.DistSph;
                this.CYLTAN1 = x.NearCyl;
                this.AXISTAN1 = x.PinAxis;
                this.VATANA1 = x.Add;
                this.Remarksacc = x.Remarks;
                this.PDD = x.PD;
                this.MPD = x.MPDOD;
                this.MPD1 = x.MPDOS;
              }
              else if (x.Ocular === "OD" && x.TypeDescription === "Near Vision") {
                this.SPHNV1 = x.DistSph;
                this.VANVV = x.Add;
                this.Remarksacc = x.Remarks;
                this.PDD = x.PD;
                this.MPD = x.MPDOD;
                this.MPD1 = x.MPDOS;
              }
              else if (x.Ocular === "OS" && x.TypeDescription === "Near Vision") {
                this.SPHNVR1 = x.DistSph;
                this.VANVRR = x.Add;
                this.Remarksacc = x.Remarks;
                this.PDD = x.PD;
                this.MPD = x.MPDOD;
                this.MPD1 = x.MPDOS;
              }
              else {

              }
            });
            this.isDisabled = false;

          });
        localStorage.setItem('RID', item.RegistrationTranID);
      }
      if (!result.success) {
        this.Form.onReset();
      }
    });
  }




  optical;
  SPHACC1;
  CYLACC1;
  AXISACC1;
  VA;
  SPHNV1;
  VANVV;
  SPHTAN1;
  CYLTAN1;
  AXISTAN1;
  VATANA1;
  SPHNVR1;
  VANVRR;
  Remarksacc;
  PDD;
  MPD;
  MPD1;
  PMPD;
  PMPD1;
  opticalprint;
  sphod;
  cylod;
  axisod;
  vaod;
  sphos;
  cylos;
  axisos;
  vaos;
  sphodd;
  vaodd;
  sphoss;
  vaoss;
  remarks;
  patientNamee;
  patientagee;
  patientgenderr;
  patientdescc;
  Addressss;
  phonesss;
  webbbb;
  comapnyy;
  doname;
  doregno;
  UINNOO;
  predate;
  alle;
  pd;

  print() {
    debugger;
    this.commonService.getListOfData('OpticalPrescription/Getfinopprint/' + localStorage.getItem('RID') + '/' + localStorage.getItem("CompanyID") + '/' + this.Getloctime).subscribe((data: any) => {
      debugger;
      this.opticalprint = data.opticprescriptiondetails;
      this.patientNamee = data.name;
      this.patientagee = data.age;
      this.patientgenderr = data.gender;
      this.Addressss = data.address + "" + data.address1 + "" + data.address2;
      this.UINNOO = data.uin;
      this.phonesss = data.ph;
      this.webbbb = data.webb;
      this.comapnyy = data.company;
      this.doname = data.Doctorname;
      this.doregno = data.DoctorReg;
      this.predate = data.pdate;
      this.alle = data.patientdesc;
      this.opticalprint.forEach((x: any) => {
        if (x.Ocular === "OD" && x.TypeDescription === "Distance Vision") {
          this.sphod = x.DistSph;
          this.cylod = x.NearCyl;
          this.axisod = x.PinAxis;
          this.vaod = x.Add;
        }
        else if (x.Ocular === "OS" && x.TypeDescription === "Distance Vision") {
          this.sphos = x.DistSph;
          this.cylos = x.NearCyl;
          this.axisos = x.PinAxis;
          this.vaos = x.Add;
        }
        else if (x.Ocular === "OD" && x.TypeDescription === "Near Vision") {
          this.sphodd = x.DistSph;
          this.vaodd = x.Add;
        }
        else if (x.Ocular === "OS" && x.TypeDescription === "Near Vision") {
          this.sphoss = x.DistSph;
          this.vaoss = x.Add;
          this.remarks = x.Remarks;
          this.pd = x.PD;
          this.PMPD = x.MPDOD;
          this.PMPD1 = x.MPDOS;
        }
        else {

        }
      });
      this.opprint = 'block';
    });

  }

  opprint;
  prints() {
    let printContents, popupWin;
    printContents = document.getElementById('demo').innerHTML;
    popupWin = window.open('', '_blank', 'top=0,left=0,height=auto,width=100%');
    popupWin.document.open();
    popupWin.document.write(`
             <html>
             <head>
              <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">
            <title></title>
            <style> 
            //........Customized style.......
            </style>
          </head>
      <body onload="window.print();window.close()">${printContents}</body>
        </html>`);
    popupWin.document.close();
    this.opprint = 'none';
  }

  printclose() {
    debugger;
    this.opprint = 'none';
    this.SPHACC1 = "";
    this.CYLACC1 = "";
    this.AXISACC1 = "";
    this.VA = "";
    this.SPHNV1 = "";
    this.VANVV = "";
    this.SPHTAN1 = "";
    this.CYLTAN1 = "";
    this.AXISTAN1 = "";
    this.VATANA1 = "";
    this.SPHNVR1 = "";
    this.VANVRR = "";
    this.Remarksacc = "";
    this.PDD = "";
    this.MPD = "";
    this.MPD1 = "";
    this.uin = "";
    this.name = "";
    this.age = "";
    this.gender = "";
    this.isDisabled = true;
  }


  accesspopup;
  backdrop;
  modalcloseAccessOk() {
    this.backdrop = 'none';
    this.accesspopup = 'none';
  }
  Getformaccess() {
    debugger;
    var Pathname = "Opticalslazy/Optical";
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









  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}
