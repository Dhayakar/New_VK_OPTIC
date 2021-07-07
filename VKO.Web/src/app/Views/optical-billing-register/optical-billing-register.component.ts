import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS, MatTableDataSource } from '@angular/material';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import Swal from 'sweetalert2';
import { CommonService } from '../../shared/common.service';
import { OpticalBillRegisterViewmodel } from '../../Models/ViewModels/opticalbillregisterViewmodel';
import { FormControl, NgForm } from '@angular/forms';
import * as XLSX from 'xlsx';
import * as _ from 'lodash';
import { Router } from '@angular/router';
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
  selector: 'app-optical-billing-register',
  templateUrl: './optical-billing-register.component.html',
  styleUrls: ['./optical-billing-register.component.less'],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ]
})
export class OpticalBillingRegisterComponent implements OnInit {

  date = new FormControl(new Date());
  serializedDate = new FormControl((new Date()).toISOString());

  constructor(public commonService: CommonService<OpticalBillRegisterViewmodel>, private router: Router) { }

  M_FromDate;
  M_ToDate;
  M_TodayDate;
  resultTable: boolean = false;
  ItemDetails;
  Country1;
  Country2;
  Country3;
  accessdata;
  disSubmit;
  disprint;
  ngOnInit() {
    debugger;
    this.M_FromDate = this.date.value;
    this.M_TodayDate = this.date.value;
    
    var Pathname = "Opticalslazy/Opbillreg";
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
          if (this.accessdata.find(x => x.Print == true)) {
            this.disprint = false;
          } else {
            this.disprint = true;
          }
        });
        this.commonService.getListOfData('Common/GetCurrencyvalues/' + localStorage.getItem('CompanyID')).subscribe(data => {
          debugger;
          this.Country1 = data;
          this.Country2 = this.Country1[0].Text;
          this.Country3 = this.Country1[0].Value;
        });
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
        this.commonService.getListOfData('Common/Getlogdetails/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem("Doctorname") + '/' + "OpticalBillingRegister").subscribe(data => {
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
          if (this.accessdata.find(x => x.Print == true)) {
            this.disprint = false;
          } else {
            this.disprint = true;
          }
        });



        this.commonService.getListOfData('Common/GetCurrencyvalues/' + localStorage.getItem('CompanyID')).subscribe(data => {
          debugger;
          this.Country1 = data;
          this.Country2 = this.Country1[0].Text;
          this.Country3 = this.Country1[0].Value;
        });
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
        this.commonService.getListOfData('Common/Getlogdetailsstring/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem("Doctorname") + '/' + Pathname).subscribe(data => {
          this.router.navigate(['dash']);
        });


      }
    }
    this.M_TodayDate = this.date.value;
  }


  displayedColumns: string[] = ['BillNo', 'BillDate', 'PatientName', 'Description', 'Brand', 'UOM', 'Qty', 'Amount', 'Disc', 'DiscAmount', 'GrossAmt', 'TaxDesc', 'TacPerc', 'TaxAmount', 'NetAmount'];
  // displayedColumns: string[] = ['BillNo', 'BillDate', 'PatientName', 'DrugDescription', 'Qty'];
  dataSource = new MatTableDataSource();
  SourceData;
  TotalsumNetAmount;
  TotalsumGrossAmount;
  TotalsumDiscountAmount;
  TotalsumAmount;
  M_CompanyName;
  M_CAddress1;
  getOpticalBillRegTaxsummary;
  TAXTotalProductValue;
  TAXCESSAmount;
  TAXAddCESSAmount;
  TAXTaxPayable;
  TAXGSTTaxValue;
  TAXTaxableTurnover;
  TTAXAMOUNT;
  onSubmit() {
    debugger
    try {
      let Fromdate = this.M_FromDate.toISOString();
      let Todate = this.M_ToDate.toISOString();

    this.commonService.getListOfData("OpticalBillRegister/getOpticalBillDet/" + Fromdate + '/' + Todate + '/' + parseInt(localStorage.getItem("CompanyID")))
      .subscribe(data => {
        debugger
        if (data.getOpticalBillRegisterDetail.length > 0) {
          debugger
          data.getOpticalBillRegisterDetail.forEach((x: any) => {
            this.M_CompanyName = x.CompanyName;
            this.M_CAddress1 = x.CAddress1;
          });
          this.resultTable = true;
          this.TTAXAMOUNT = data.TTAXAMOUNT;
          this.TotalsumAmount = data.TotalsumAmount;
          this.TotalsumDiscountAmount = data.TotalsumDiscountAmount;
          this.TotalsumGrossAmount = data.TotalsumGrossAmount;
          this.TotalsumNetAmount = data.TotalsumNetAmount;
          //this.dataSource.data = originalData;
          this.TAXTotalProductValue = data.TAXTotalProductValue;
          this.TAXCESSAmount = data.TAXCESSAmount;
          this.TAXAddCESSAmount = data.TAXAddCESSAmount;
          this.TAXTaxPayable = data.TAXTaxPayable;
          this.TAXGSTTaxValue = data.TAXGSTTaxValue;
          this.TAXTaxableTurnover = data.TAXTaxableTurnover;
          this.getOpticalBillRegTaxsummary = data.getOpticalBillRegTaxsummary;
          this.SourceData = data.getOpticalBillRegisterDetail;
          this.dataSource.data = this.SourceData;
          this.dataSource._updateChangeSubscription();

            this.cacheSpan("BillNos", d => d.BillNo, 'BillNo');
            this.cacheSpan("BillDates", d => d.BillDate, 'BillDate');
            this.cacheSpan("PatientNames", d => d.PatientName, 'PatientName');
            this.cacheSpan("NetAmounts", d => d.NetAmount, 'BillNo');

            //this.ItemDetails = data.data;


          }
          else {
            this.resultTable = false;
            Swal.fire({
              type: 'warning',
              title: 'warning',
              text: 'Data Not Found',
              position: 'top-end',
              showConfirmButton: false,
              timer: 2500,
              customClass: {
                popup: 'alert-warp',
                container: 'alert-container'
              },
            })
          }
        });
    }
    catch (Error) {
      this.commonService.getListOfData('Common/ErrorList/' + Error.message + '/' + "Optical Billing Register" + '/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem('userroleID') + '/')
        .subscribe(data => { });
    }
  }



  spans = [];

  tempRowId = null;
  tempRowCount = null;

  cacheSpan(key, accessor, Property: string) {
    debugger;
    for (let i = 0; i < this.SourceData.length;) {
      let currentValue = accessor(this.SourceData[i]);
      let count = 1;
      // Iterate through the remaining rows to see how many match
      // the current value as retrieved through the accessor.
      if (Property == 'PatientName') {
        for (let j = i + 1; j < this.SourceData.length; j++) {
          let res = this.SourceData[i].BillNo == this.SourceData[j].BillNo;
          if (res) {
            if (currentValue == accessor(this.SourceData[j])) {
              count++;
            }
          }
          else {
            break;
          }
        }
      }
      else if (Property == 'BillDate') {
        for (let j = i + 1; j < this.SourceData.length; j++) {
          let res = this.SourceData[i].BillNo == this.SourceData[j].BillNo;
          if (res) {
            if (currentValue == accessor(this.SourceData[j])) {
              count++;
            }
          }
          else {
            break;
          }
        }
      }
      else {
        for (let j = i + 1; j < this.SourceData.length; j++) {
          if (currentValue != accessor(this.SourceData[j])) {
            break;
          }

          count++;
        }
      }

      if (!this.spans[i]) {
        this.spans[i] = {};
      }
      // Store the number of similar values that were found (the span)
      // and skip i to the next unique row.
      this.spans[i][key] = count;
      i += count;
    }
  }


  getRowSpan(col, index) {
    return this.spans[index] && this.spans[index][col];
  }



  getTotalAmount() {
    var total = 0;
    _.chain(this.SourceData).groupBy("BillNo").map(function (arr, i) {
      total = total + arr.map(t => t.NetAmount)[0];
    }).value();
    return total;
  }


  Cancel() {
    this.SourceData = [];
    this.dataSource.data = [];
    this.M_FromDate = this.date.value;
    this.M_TodayDate = this.date.value;
    this.resultTable = false;
  }
  @ViewChild('table') table: ElementRef;
  fireEvent() {
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.table.nativeElement);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'Opticalbillingreg.xlsx');
  }

  modalSuccesPrintOk() {

    let printContents, popupWin;
    printContents = document.getElementById('section').innerHTML;
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

    this.router.navigateByUrl('/dash', { skipLocationChange: true }).then(() => {
      this.router.navigate(['Opticalslazy/Opbillreg']);
    });

  }
  backdrop;
  accesspopup;
  //////////////////////////////////////////////////////////////////////////////////////////////
  Getformaccess() {
    debugger;
    var Pathname = "Opticalslazy/Opbillreg";
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
