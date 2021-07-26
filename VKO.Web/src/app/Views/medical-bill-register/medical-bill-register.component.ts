import { Component, OnInit, ViewChild } from '@angular/core';
import { DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS, MatTableDataSource, MatPaginator } from '@angular/material';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import Swal from 'sweetalert2';
import { CommonService } from '../../shared/common.service';
import { MedicalBillRegisterViewmodel } from '../../Models/ViewModels/Medical_bill_register';
import * as _ from 'lodash';
import { groupBy } from 'rxjs/operators';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

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
  selector: 'app-medical-bill-register',
  templateUrl: './medical-bill-register.component.html',
  styleUrls: ['./medical-bill-register.component.less'],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ]
})
export class MedicalBillRegisterComponent implements OnInit {

  constructor(public commonService: CommonService<MedicalBillRegisterViewmodel>, private router: Router, public datepipe: DatePipe) { }

  
  M_FromDate;
  M_ToDate;
  resultTable: boolean = false;

  ItemDetails;
  spans = [];

  today = new Date();
  Datetime = Date.now();
  MedTaxSummary;

  Country2;

 // @ViewChild(MatPaginator) paginator: MatPaginator;
  //@ViewChild('paginator', { static: true } as any) paginator: MatPaginator;

  Country;

  isNextButton = true;
  isNextupdate = true;
  isNextDelete = true;
  isNextPrint  = true;

  accesspopup;
  accessdata;
  backdrop;

  ngOnInit() {
    var Pathname = "Administrationlazy/MedicalBillRegister";
    var n = Pathname;
    var sstring = n.includes("/");
    var Objdata = JSON.parse(localStorage.getItem("AllCollectionData"));
    if (sstring == false) {
      if (Objdata.find(el => el.Parentmoduledescription === Pathname)) {
        this.commonService.getListOfData('Common/GetCurrencyvalues/' + localStorage.getItem('CompanyID')).subscribe(data => {
          this.Country2 = data[0].Text;
        });
        this.commonService.getListOfData('Common/GetAccessdetails/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem("userroleID") + '/' + Pathname).subscribe(data => {
          debugger;
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
          if (this.accessdata.find(x => x.Print == true)) {
            this.isNextPrint = false;
          } else {
            this.isNextPrint = true;
          }
        });

        this.commonService.getListOfData('Common/GetCurrencyvalues/' + localStorage.getItem('CompanyID')).subscribe(data => {
          debugger;
          this.Country = data[0].Text;
        });

      }
      else {
        Swal.fire({
          type: 'warning',
          title: 'Un-Authorized Access, Please contact Administrator',
          position: 'top-end',
          showConfirmButton: false,
          timer: 1500,
          customClass: {
            popup: 'alert-warp',
            container: 'alert-container',
          },
        });
        this.commonService.getListOfData('Common/Getlogdetails/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem("Doctorname") + '/' + "DrugUpload").subscribe(data => {
          this.router.navigate(['dash']);
        });
      }
    }
    else if (sstring == true) {
      if (Objdata.find(el => el.Parentmoduledescription === Pathname)) {
        this.commonService.getListOfData('Common/GetCurrencyvalues/' + localStorage.getItem('CompanyID')).subscribe(data => {
          this.Country2 = data[0].Text;
        });
        this.commonService.getListOfData('Common/GetAccessdetailsstring/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem("userroleID") + '/' + Pathname).subscribe(data => {
          debugger;
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
          if (this.accessdata.find(x => x.Print == true)) {
            this.isNextPrint = false;
          } else {
            this.isNextPrint = true;
          }
        });

        this.commonService.getListOfData('Common/GetCurrencyvalues/' + localStorage.getItem('CompanyID')).subscribe(data => {
          debugger;
          this.Country = data[0].Text;
        });

      }
      else {
        Swal.fire({
          type: 'warning',
          title: 'Un-Authorized Access, Please contact Administrator',
          position: 'top-end',
          showConfirmButton: false,
          timer: 1500,
          customClass: {
            popup: 'alert-warp',
            container: 'alert-container',
          },
        });
        this.commonService.getListOfData('Common/Getlogdetails/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem("Doctorname") + '/' + "DrugUpload").subscribe(data => {
          this.router.navigate(['dash']);
        });
      }
    }
  }

 
  Getformaccess() {
    debugger;

    var Pathname = "Administrationlazy/MedicalBillRegister";
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
  modalcloseAccessOk() {
    this.backdrop = 'none';
    this.accesspopup = 'none';
  }


  displayedColumns: string[] = ['BillNo', 'BillDate', 'PatientName', 'DrugDescription', 'UOM', 'Qty','Amount', 'Disc', 'DiscAmount', 'GrossAmt', 'TaxDesc', 'TacPerc','TaxAmount','NetAmount'  ];
  dataSource = new MatTableDataSource();

  SourceData;


  onSubmit()
  {
    debugger
    try {
      //let Fromdate = this.M_FromDate.toISOString();
      //let Todate = this.M_ToDate.toISOString();

      let Fromdate = this.datepipe.transform(this.M_FromDate, "dd-MMM-yyyy");
      let Todate = this.datepipe.transform(this.M_ToDate, "dd-MMM-yyyy");

      this.commonService.getListOfData("MedicalBillRegister/getMedBillDet/" + Fromdate + '/' + Todate + '/' + parseInt(localStorage.getItem("CompanyID")))
        .subscribe(data => {
          debugger
          if (data.success = true) {
            debugger

            if (data.RegisterDetail.length > 0) {
              debugger
              this.resultTable = true;
              this.SourceData = data.RegisterDetail;
              this.dataSource.data = this.SourceData;
              this.dataSource._updateChangeSubscription();
              this.MedTaxSummary = data.MedTaxSummary;

              this.cacheSpan("BillNos", d => d.BillNo, 'BillNo');
              this.cacheSpan("BillDates", d => d.BillDate, 'BillDate');
              this.cacheSpan("PatientNames", d => d.PatientName, 'PatientName');
              this.cacheSpan("NetAmounts", d => d.NetAmount, 'BillNo');
            } else {
              this.resultTable = false;
              Swal.fire({
                type: 'warning',
                title: 'No Data Found',
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
          else {
            this.resultTable = false;
            this.SourceData = [];
            this.MedTaxSummary = [];
            this.dataSource.data = [];
            Swal.fire({
              type: 'warning',
              title: 'No Data Found',
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
    catch (Error) {
      this.commonService.getListOfData('Common/ErrorList/' + Error.message + '/' + "Medical Bill Register" + '/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem('userroleID') + '/')
        .subscribe(data => { });
    }
  }

  cacheSpan(key, accessor,Property:string) {
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

 

  Cancel() {
    this.SourceData = [];
    this.dataSource.data = [];
    this.MedTaxSummary = [];
    this.M_FromDate = '';
    this.M_ToDate = '';
    this.resultTable = false;
  }


  getAmount() {
    var restotalcost = this.SourceData.map(t => t.Amount).reduce((acc, value) => acc + value, 0);
    restotalcost = parseFloat(restotalcost.toFixed(2));
    return restotalcost;
  }

  getGrossAmount() {
    var restotalcost = this.SourceData.map(t => t.GrossAmount).reduce((acc, value) => acc + value, 0);
    restotalcost = parseFloat(restotalcost.toFixed(2));
    return restotalcost;
  }

  getTotalAmount() {
    var total = 0;
     _.chain(this.SourceData).groupBy("BillNo").map(function (arr, i) {
       total = total + arr.map(t => t.NetAmount)[0];
    }).value();
    return total;
  }

  getTaxAmount() {
    var restotalcost = this.SourceData.map(t => t.TaxValue + t.CessValue + t.AddCessValue).reduce((acc, value) => acc + value, 0);
    restotalcost = parseFloat(restotalcost.toFixed(2));
    return restotalcost;
  }


  getTaxableAmount() {
    var restotalcost = this.MedTaxSummary.map(t => t.TaxableTurnover).reduce((acc, value) => acc + value, 0);
    restotalcost = parseFloat(restotalcost.toFixed(2));
    return restotalcost;
  }

  getTaxAmountSummary() {
    var restotalcost = this.MedTaxSummary.map(t => t.GSTTaxValue).reduce((acc, value) => acc + value, 0);
    restotalcost = parseFloat(restotalcost.toFixed(2));
    return restotalcost;
  }


  getTax1() {
    var restotalcost = this.MedTaxSummary.map(t => t.CESSAmount).reduce((acc, value) => acc + value, 0);
    restotalcost = parseFloat(restotalcost.toFixed(2));
    return restotalcost;
  }

  getTax2() {
    var restotalcost = this.MedTaxSummary.map(t => t.AddCESSAmount).reduce((acc, value) => acc + value, 0);
    restotalcost = parseFloat(restotalcost.toFixed(2));
    return restotalcost;
  }

  getTaxPayable() {
    var restotalcost = this.MedTaxSummary.map(t => t.TaxPayable).reduce((acc, value) => acc + value, 0);
    restotalcost = parseFloat(restotalcost.toFixed(2));
    return restotalcost;
  }

  getTotalItemAmount() {
    var restotalcost = this.MedTaxSummary.map(t => t.TotalProductValue).reduce((acc, value) => acc + value, 0);
    restotalcost = parseFloat(restotalcost.toFixed(2));
    return restotalcost;
  }


  MedicalBillRegisterPrint() {
    let printContents, popupWin;
    printContents = document.getElementById('MedicalBillRegister').innerHTML;
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
  }


  MedicalBillTaxPrint() {
    let printContents, popupWin;
    printContents = document.getElementById('MedicalBillTax').innerHTML;
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
  }
  //////////////////////////////////////////////////////////////////////////////////////////////
}
