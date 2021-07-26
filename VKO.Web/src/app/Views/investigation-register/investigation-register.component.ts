import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { Search } from '../../Models/ViewModels/search.model';
import { CommonService } from '../../shared/common.service';
import { MatTableDataSource, DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import * as XLSX from 'xlsx';
import * as _ from 'lodash';
import { Router } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { DatePipe } from '@angular/common';
import * as pdfMake from 'pdfmake/build/pdfmake';
declare var jQuery: any;
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

export interface PeriodicElement {
  id: number;
  name: string;
  weight: number;
  descriptions: string[];
}

@Component({
  selector: 'app-investigation-register',
  templateUrl: './investigation-register.component.html',
  styleUrls: ['./investigation-register.component.less'],

  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],

})

export class InvestigationRegisterComponent implements OnInit {


  



  constructor(public commonService: CommonService<Search>, private router: Router, private cp: CurrencyPipe, public datepipe: DatePipe) {
  }
  @ViewChild('InvestigationRegister') Form: NgForm
  Country1;
  Country2;
  maxDate = new Date();
  Country3;
  accessdata;
  M_TodayDate;
  disSubmit;
  disprint;
  ngOnInit()
  {
    debugger;
    this.M_FromDate = this.date.value;
    this.M_ToDate = this.date.value;
    this.M_TodayDate = this.date.value;
    //////////////////////////////////////////////////////////////////////////////////
    var Pathname = "Commonmasterslazy/InvestigationRegister";
    var Objdata = JSON.parse(localStorage.getItem("AllCollectionData"));
    var n = Pathname;
    var sstring = n.includes("/");
    if (sstring == false)
    {
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
        this.commonService.getListOfData('Common/Getlogdetails/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem("Doctorname") + '/' + "InvestigationRegister").subscribe(data => {
          this.router.navigate(['dash']);
        });
      }
    }
  else  if (sstring == true) {
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
        this.commonService.getListOfData('Common/Getlogdetails/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem("Doctorname") + '/' + "InvestigationRegister").subscribe(data => {
          this.router.navigate(['dash']);
        });
      }
    }
	/////////////////////////////////////////////////////////////////////////////////////
    this.M_TodayDate = this.date.value;
  }

  M_FromDate;
  M_ToDate;
  date1 = new Date();
  date = new FormControl(new Date());
  minToDate = new Date();
  hiddentable = false;
  CheckToDate() {
    debugger;
    this.minToDate = this.M_FromDate;
  }
  maxFromDate(): string {
    return new Date().toISOString().split('T')[0]
  }
  displayedColumns: string[] = ['InvoiceNo', 'InvoiceDate', 'PatientName', 'InvDescription', 'Rate', 'Disc', 'DiscAmount', 'GrossAmt', 'TaxDesc', 'TacPerc', 'TaxAmount', 'NetAmount'];
  dataSource = new MatTableDataSource();

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

  }
  //Amountsum;
  DiscountAmtsum;
  GrossAmountsum;
  TotalAmountsum;
  CompanyName;
  CAddress1;
  CAddress2;
  CAddress3;
  CPhone1;
  CWebsite;
  amount1;
  SourceData;
  getInvBillRegTaxsummary;
  TAXTotalProductValue;
  TAXCESSAmount;
  TAXAddCESSAmount;
  TAXTaxPayable ;
  TAXGSTTaxValue;
  TAXTaxableTurnover;
  TRate;
  TTAXAMOUNT;
  onSubmit(form: NgForm) {

    debugger;
    //if (form.valid) {
      debugger;
    let Fromdate = this.datepipe.transform(this.M_FromDate, "dd-MMM-yyyy");
    let Todate = this.datepipe.transform(this.M_ToDate, "dd-MMM-yyyy"); 


      this.commonService.getListOfData('Help/getInvReg/' + Fromdate + '/' + Todate  + '/' + parseInt(localStorage.getItem("CompanyID"))).subscribe(data => {
        if (data.getInvRegdetail.length > 0) {
          debugger;
          //this.commonService.data = data;
          this.dataSource.data = data.getInvRegdetail;

          debugger;
          //this.getOpticalBillRegTaxsummary = data.getInvRegdetail;
          this.SourceData = data.getInvRegdetail;
          this.dataSource.data = this.SourceData;
          this.dataSource._updateChangeSubscription();
          this.getInvBillRegTaxsummary = data.getInvBillRegTaxsummary;
          this.cacheSpan("InvoiceNos", d => d.InvoiceNo, 'InvoiceNo');
          this.cacheSpan("InvoiceDates", d => d.InvoiceDate, 'InvoiceDate');
          this.cacheSpan("PatientNames", d => d.PatientName, 'PatientName');
          this.cacheSpan("NetAmounts", d => d.NetAmount, 'InvoiceNo');
          //for (var i = 0; i < data.getInvRegdetail.length; i++)
          //{
          //  debugger;
          //  this.getInvRegdetail1 = data.getInvRegdetail[i].Amount;
          //}
          this.amount1 = data.getInvRegdetail.Amount,
      
           this.TRate = data.TRate;
           this.TTAXAMOUNT = data.TTAXAMOUNT;
          this.DiscountAmtsum= data.DiscountAmtsum;
          this.GrossAmountsum= data.GrossAmountsum;
          this.TotalAmountsum = data.TotalAmountsum;
          this.CompanyName = data.getInvRegdetail[0].CompanyName;
          this.TAXTotalProductValue = data.TAXTotalProductValue;
          this.TAXCESSAmount = data.TAXCESSAmount;
          this.TAXAddCESSAmount = data.TAXAddCESSAmount;
          this.TAXTaxPayable = data.TAXTaxPayable;
          this.TAXGSTTaxValue = data.TAXGSTTaxValue;
          this.TAXTaxableTurnover = data.TAXTaxableTurnover;
          //this.CAddress1 = data.getInvRegdetail[0].CAddress1;
          //this.CAddress2 = data.getInvRegdetail[0].CAddress2;
          //this.CAddress3 = data.getInvRegdetail[0].CAddress3;
          //this.CPhone1 = data.getInvRegdetail[0].CPhone1;
          //this.CWebsite = data.getInvRegdetail[0].CWebsite;
          this.hiddentable = true;
          //this.dataSourcee.data = data.Regdetail;
         // this.hiddentable = true;
        }

        else {
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
          });
        }
      });
    //}
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
          let res = this.SourceData[i].InvoiceNo == this.SourceData[j].InvoiceNo;
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
      else if (Property == 'InvoiceDate') {
        for (let j = i + 1; j < this.SourceData.length; j++) {
          let res = this.SourceData[i].InvoiceNo == this.SourceData[j].InvoiceNo;
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
    _.chain(this.SourceData).groupBy("InvoiceNo").map(function (arr, i) {
      total = total + arr.map(t => t.NetAmount)[0];
    }).value();
    return total;
  }




  Cancel() {
    this.SourceData = [];
    this.dataSource.data = [];
    this.M_FromDate = this.date.value;
    this.M_ToDate = this.date.value;
    this.hiddentable = false;
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
      this.router.navigate(['Commonmasterslazy/InvestigationRegister']);
    });

  }
  @ViewChild('table') table: ElementRef;
  ////////Excel
  fireEvent() {
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.table.nativeElement);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb,'InvestigationRegister.xlsx');
  }


 

 /////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  accesspopup;
  backdrop;
  Getformaccess() {
    debugger;
    var Pathname = "Commonmasterslazy/InvestigationRegister";
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
  ConvertEXCEL() {
    let element = document.getElementById('tableee');
    var cloneTable = element.cloneNode(true);
   // jQuery(cloneTable).find('.remove-this').remove();

    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(cloneTable);
    var wscols = [
      { wch: 10 },
      { wch: 12 },
      { wch: 30 },
      { wch: 10 }
    ];
    ws['!cols'] = wscols;
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Patient Details');
    XLSX.writeFile(wb, "Patient Details.xlsx");
  }

  //ConvertPDF() {
  //  debugger;
  //  var companyname = localStorage.getItem("Companyname");
  //  var Stringfydfata = JSON.stringify(this.dataSource.data);
  //  var objdata = JSON.parse(Stringfydfata);

  //  var TaxDescription = jQuery.map(objdata, function (n, i) { return n.InvoiceNo; });
  //  var GrossAmount = jQuery.map(objdata, function (n, i) { return n.InvoiceDate; });
  //  var TaxValue = jQuery.map(objdata, function (n, i) { return n.PatName; });
  //  var CESSValue = jQuery.map(objdata, function (n, i) { return n.InvDescription; });
  //  var AddlCESSValue = jQuery.map(objdata, function (n, i) { return n.Amount; });
  //  var TaxPayable = jQuery.map(objdata, function (n, i) { return n.DiscountPercentage; });
  //  var TaxPayable = jQuery.map(objdata, function (n, i) { return n.DiscountAmount; });
  //  var TaxPayable = jQuery.map(objdata, function (n, i) { return n.GrossAmount; });
  //  var TaxPayable = jQuery.map(objdata, function (n, i) { return n.DiscountPercentage; });
  //  var TaxPayable = jQuery.map(objdata, function (n, i) { return n.DiscountPercentage; });
  //  var TaxPayable = jQuery.map(objdata, function (n, i) { return n.DiscountPercentage; });
  //  var TaxPayable = jQuery.map(objdata, function (n, i) { return n.DiscountPercentage; });

  //  var footnewtotalGrossAmount = this.cp.transform(this.TGrossAmount, this.Country2, true, '1.0-0');
  //  var footnewtotalTaxValue = this.cp.transform(this.TTaxValue, this.Country2, true, '1.0-0');
  //  var footnewtotalCESSValue = this.cp.transform(this.TCESSValue, this.Country2, true, '1.0-0');
  //  var footnewtotalAddlCESSValue = this.cp.transform(this.TAddlCESSValue, this.Country2, true, '1.0-0');
  //  var footnewtotalTaxPayable = this.cp.transform(this.TTaxPayable, this.Country2, true, '1.0-0');

  


  //  var documentDefinition = {
  //    info: {
  //      title: 'Investigation Register Details',
  //    },
  //    pageSize: {
  //      width: 1350,
  //      height: 1300
  //    },
  //    pageOrientation: 'landscape',

  //    content: [
  //      { text: 'Organization : ' + companyname, fontSize: 18, background: 'lightgray', color: 'blue', decoration: 'underline' },
  //      {
  //        style: 'tableExample',
  //        table: {
  //          headerRows: 1,
  //          widths: [200, 200, 200, 200, 200, 200],
  //          body: [
  //            [{ text: 'Tax Description', style: 'tableHeader' },
  //            { text: 'Gross Amount', style: 'tableHeader' },
  //            { text: 'Tax Value', style: 'tableHeader' },
  //            { text: 'CESS Value', style: 'tableHeader' },
  //            { text: 'Addl CESS Value', style: 'tableHeader' },
  //            { text: 'Tax Payable', style: 'tableHeader' }],
  //            [TaxDescription,
  //              GrossAmount,
  //              TaxValue,
  //              CESSValue,
  //              AddlCESSValue,
  //              TaxPayable,
  //            ],
  //            [{ text: 'Total', style: 'tableHeader', alignment: 'center' },
  //              footnewtotalGrossAmount,
  //              footnewtotalTaxValue,
  //              footnewtotalCESSValue,
  //              footnewtotalAddlCESSValue,
  //              footnewtotalTaxPayable,
  //            ]
  //          ]

  //        },
  //      }
  //    ],
  //    styles: {
  //      header: {
  //        fontSize: 18,
  //        bold: true,
  //        margin: [0, 0, 0, 10]
  //      },
  //      subheader: {
  //        fontSize: 16,
  //        bold: true,
  //        margin: [0, 10, 0, 5]
  //      },
  //      tableExample: {
  //        margin: [0, 5, 0, 15]
  //      },
  //      tableOpacityExample: {
  //        margin: [0, 5, 0, 15],
  //        fillColor: 'blue',
  //        fillOpacity: 0.3
  //      },
  //      tableHeader: {
  //        bold: true,
  //        fontSize: 13,
  //        color: 'black'
  //      }
  //    },
  //  };
  //  pdfMake.createPdf(documentDefinition).download('Investigation Register Details.pdf');
  //}
}
