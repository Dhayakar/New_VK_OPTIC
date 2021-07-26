import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatTableDataSource, DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material';
import { FormControl, NgForm } from '@angular/forms';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { CommonService } from 'src/app/shared/common.service';
import { OpticalIBT } from 'src/app/Models/ViewModels/OpticalIBT';
import Swal from 'sweetalert2';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { Console } from '@angular/core/src/console';
import { any } from '@amcharts/amcharts4/.internal/core/utils/Array';
import { Payment_Master } from '../../Models/PaymentWebModel ';
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
  selector: 'app-interdepartment',
  templateUrl: './interdepartment.component.html',
  styleUrls: ['./interdepartment.component.less'],
  providers: [

    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },

  ],
  encapsulation: ViewEncapsulation.None,
})
export class InterdepartmentComponent implements OnInit {

  constructor(public commonService: CommonService<OpticalIBT>, private router: Router, ) {

  }

  Country1;
  Country2;
  Country3;
  disableSearch = true;
  disableSubmit = true;
  disableUpdate = true;
  disablePrint = true;
  accessdata;
  TranTypeID;
  CompanyID;
  docotorid;
  Tc;
  orgname;
  ngOnInit() {

    this.commonService.data = new OpticalIBT();
    this.orgname = localStorage.getItem('Companyname');
    this.CompanyID = localStorage.getItem("CompanyID");
    this.docotorid = localStorage.getItem('userroleID');
    //////////////////////////////////////////////////////////////////////////////////
    var Pathname = "Opticalslazy/OpticalInterdepartmentTransfer";
    var n = Pathname;
    var sstring = n.includes("/");
    var Objdata = JSON.parse(localStorage.getItem("AllCollectionData"));
    if (sstring == false) {
      if (Objdata.find(el => el.Parentmoduledescription === Pathname)) {
        //////////////////////////////////////////////////////////////////////////////
        this.commonService.getListOfData('Common/GetAccessdetails/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem("userroleID") + '/' + Pathname).subscribe(data => {
          debugger;
          this.accessdata = data.GetAvccessDetails;
          if (this.accessdata.find(x => x.Add == true)) {
            this.disableSubmit = false;
          } else {
            this.disableSubmit = true;
          }
          if (this.accessdata.find(x => x.Edit == true)) {
            this.disableSearch = false;
            this.disableUpdate = false;
          } else {
            this.disableSearch = true;
            this.disableUpdate = true;
          }
          if (this.accessdata.find(x => x.Print == true)) {
            this.disablePrint = false;
          } else {
            this.disablePrint = true;
          }
          
        });

        //////////////////////////////////////////////////////////////////////////////


        this.commonService.getListOfData('Common/GetCurrencyvalues/' + localStorage.getItem('CompanyID')).subscribe(data => {
          debugger;
          this.Country1 = data[0].Value;
          this.Country2 = data[0].Text;
        });
       

        let res = Objdata.find(x => x.Parentmoduledescription == Pathname);
        this.TranTypeID = res.TransactionID;

       // this.getAllDropdowns();


        setTimeout(() => {
          let res1 = Objdata.find(x => x.Parentmoduledescription == Pathname);
          this.Tc = res1.TransactionID;
          if (this.Tc == null || this.Tc == undefined) {
            this.disableSubmit = true;
            Swal.fire({
              type: 'warning',
              title: 'Transaction Id Undefined',
              position: 'top-end',
              showConfirmButton: false,
              timer: 1500,
              customClass: {
                popup: 'alert-warp',
                container: 'alert-container',
              },
            });
          }
          if (this.Tc != null || this.Tc != undefined) {
            this.commonService.getListOfData('Common/GettingRunningNo/' + localStorage.getItem('CompanyID') + '/' + this.Tc).subscribe(data => {
              debugger
              if (data.RunningNo == "Running Number Does'nt Exist") {
                this.disableSubmit = true;
                Swal.fire({
                  type: 'warning',
                  title: `Running Number Does'nt Exist`,
                  position: 'top-end',
                  showConfirmButton: false,
                  timer: 1500,
                  customClass: {
                    popup: 'alert-warp',
                    container: 'alert-container',
                  },
                });
              }
              if (data.ReceiptRunningNo == "Running Number Does'nt Exist" || data.ReceiptRunningNo == null) {
                this.disableSubmit = true;
                Swal.fire({
                  type: 'warning',
                  title: `Receipt Number Does'nt Exist`,
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
        }, 1000)





      }
      else {
        Swal.fire({
          type: 'warning',
          title: 'warning',
          text: 'Un-Authorized Access, Please contact Administrator',
          position: 'top-end',
          showConfirmButton: false,
          timer: 1500,
          customClass: {
            popup: 'alert-warp',
            container: 'alert-container'
          },
        });
        this.commonService.getListOfData('Common/Getlogdetails/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem("Doctorname") + '/' + "OpticalOrder").subscribe(data => {
          this.router.navigate(['dash']);
        });
      }
    }
    else if (sstring == true) {
      if (Objdata.find(el => el.Parentmoduledescription === Pathname)) {
        //////////////////////////////////////////////////////////////////////////////
        this.commonService.getListOfData('Common/GetAccessdetailsstring/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem("userroleID") + '/' + Pathname).subscribe(data => {
          debugger;
          this.accessdata = data.GetAvccessDetails;
          if (this.accessdata.find(x => x.Add == true)) {
            this.disableSubmit = false;
          } else {
            this.disableSubmit = true;
          }
          if (this.accessdata.find(x => x.Edit == true)) {
            this.disableSearch = false;
            this.disableUpdate = false;
          } else {
            this.disableSearch = true;
            this.disableUpdate = true;
          }
          if (this.accessdata.find(x => x.Print == true)) {
            this.disablePrint = false;
          } else {
            this.disablePrint = true;
          }
          
        });

        //////////////////////////////////////////////////////////////////////////////


        this.commonService.getListOfData('Common/GetCurrencyvalues/' + localStorage.getItem('CompanyID')).subscribe(data => {
          debugger;
          this.Country1 = data[0].Value;
          this.Country2 = data[0].Text;
        });
        
        let res = Objdata.find(x => x.Parentmoduledescription == Pathname);
        this.TranTypeID = res.TransactionID;

        //this.getAllDropdowns();


      }
      else {
        Swal.fire({
          type: 'warning',
          title: 'warning',
          text: 'Un-Authorized Access, Please contact Administrator',
          position: 'top-end',
          showConfirmButton: false,
          timer: 1500,
          customClass: {
            popup: 'alert-warp',
            container: 'alert-container'
          },
        });
        this.commonService.getListOfData('Common/Getlogdetails/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem("Doctorname") + '/' + "OpticalOrder").subscribe(data => {
          this.router.navigate(['dash']);
        });
      }

    }
    /////////////////////////////////////////////////////////////////////////////////////



    $(document).ready(function () {
      $("#myInput").on("keyup", function () {
        var value = $(this).val().toLowerCase();
        $("#myTable tr").filter(function () {
          $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
      });
    });
    $(document).ready(function () {
      $("#myInput1").on("keyup", function () {
        var value = $(this).val().toLowerCase();
        $("#myTable1 tr").filter(function () {
          $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
      });
    });

  }

}
