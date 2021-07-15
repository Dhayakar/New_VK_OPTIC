import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS, MatDatepicker, MatTableDataSource, MatSort } from '@angular/material';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import * as _moment from 'moment';
import { FormControl, NgForm } from '@angular/forms';
import { CommonService } from '../../shared/common.service';
import { BsDatepickerConfig, BsDatepickerViewMode } from 'ngx-bootstrap/datepicker';
import { TaxSummaryView } from '../../Models/ViewModels/taxsummaryview.model';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { Router } from '@angular/router';
import { CurrencyPipe, DatePipe } from '@angular/common';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

const moment = _moment;
declare var jQuery: any;
export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MMM-YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
}

@Component({
  selector: 'app-tax-summary',
  templateUrl: './tax-summary.component.html',
  styleUrls: ['./tax-summary.component.less'],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },

  ],
})
export class TaxSummaryComponent implements OnInit {
  date = new FormControl(new Date());
  bsValue: Date = new Date();
  minMode: BsDatepickerViewMode = 'month';
  bsConfig: Partial<BsDatepickerConfig>;


  constructor(public commonService: CommonService<TaxSummaryView>, public datepipe: DatePipe, private renderer: Renderer2, private router: Router, private cp: CurrencyPipe,) { }
  Country2;
  Country1;
  accessdata;
  M_TodayDate;
  DisableonSubmit;
  DisableUpdate;
  ngOnInit() {

    this.M_FromDate = this.date.value;
    this.M_ToDate = this.date.value;
    this.M_TodayDate = this.date.value;


    var Pathname = "Inventorylazy/TAXSummary";
    var n = Pathname;
    var sstring = n.includes("/");
    var Objdata = JSON.parse(localStorage.getItem("AllCollectionData"));
    if (sstring == false) {
      if (Objdata.find(el => el.Parentmoduledescription === Pathname)) {

        //////////////////////////////////////////////////////////////////////////////
        this.commonService.getListOfData('Common/GetAccessdetails/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem("userroleID") + '/' + Pathname).subscribe(data => {
          this.commonService.data = data;
          debugger;
          this.accessdata = data.GetAvccessDetails;
          if (this.accessdata.find(x => x.Add == true)) {
            this.DisableonSubmit = false;

          } else {
            this.DisableonSubmit = true;

          }
          if (this.accessdata.find(x => x.Edit == true)) {
            this.DisableUpdate = false;


          } else {
            this.DisableUpdate = true;


          }
          if (this.accessdata.find(x => x.Print == true)) {

          } else {

          }
          //if (this.accessdata.find(x => x.Delete == true)) {
          //  this.DisableDelete = false;
          //} else {
          //  this.DisableDelete = true;
          //}
        });

        //////////////////////////////////////////////////////////////////////////////



      }
      else {

        Swal.fire({
          text: "Un-Authorized Access, Please contact Administrator",
          type: 'warning',
        });
        this.commonService.getListOfData('Common/Getlogdetails/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem("Doctorname") + '/' + "NumberControl").subscribe(data => {
          this.router.navigate(['dash']);
        });
      }
    }

    else if (sstring == true) {
      if (Objdata.find(el => el.Parentmoduledescription === Pathname)) {
        //////////////////////////////////////////////////////////////////////////////
        this.commonService.getListOfData('Common/GetAccessdetailsstring/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem("userroleID") + '/' + Pathname).subscribe(data => {
          this.commonService.data = data;
          debugger;
          this.accessdata = data.GetAvccessDetails;
          if (this.accessdata.find(x => x.Add == true)) {
            this.DisableonSubmit = false;

          } else {
            this.DisableonSubmit = true;

          }
          if (this.accessdata.find(x => x.Edit == true)) {
            this.DisableUpdate = false;

          } else {
            this.DisableUpdate = true;

          }
          //if (this.accessdata.find(x => x.Delete == true)) {
          //  this.DisableDelete = false;
          //} else {
          //  this.DisableDelete = true;
          //}
        });

        //////////////////////////////////////////////////////////////////////////////

      }
      else {

        Swal.fire({
          text: "Un-Authorized Access, Please contact Administrator",
          type: 'warning',
        });
        this.commonService.getListOfData('Common/Getlogdetails/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem("Doctorname") + '/' + "NumberControl").subscribe(data => {
          this.router.navigate(['dash']);
        });
      }
    }

    this.bsConfig = Object.assign({}, {
      dateInputFormat: 'MMM-YYYY',
      minMode: this.minMode,
      isAnimated: true
    });
    this.commonService.getListOfData('Common/GetCurrencyvalues/' + localStorage.getItem('CompanyID')).subscribe(data => {
      debugger;
      this.Country1 = data;
      this.Country2 = this.Country1[0].Text;
    });

  }

  @ViewChild('TaxsummaryForm') Form: NgForm


  displayedColumns: string[] = ['TaxDescription', 'GrossAmount', 'TaxValue', 'CESSValue', 'AddlCESSValue', 'TaxPayable'];
  dataSource = new MatTableDataSource();

  displayedColumnsP: string[] = ['TaxDescriptionP', 'GrossAmountP', 'TaxValueP', 'CESSValueP', 'AddlCESSValueP', 'TaxPayableP'];
  dataSourceP = new MatTableDataSource();

  displayedColumnsR: string[] = ['TaxDescriptionR', 'GrossAmountR', 'TaxValueR', 'CESSValueR', 'AddlCESSValueR', 'TaxPayableR'];
  dataSourceR = new MatTableDataSource();
  M_FromDate;
  M_ToDate;
  SourceData;
  TTaxValue;
  TTax1Value;
  TTax2Value;
  TCESSValue;
  TAddlCESSValue;
  TTaxValueR;
  TTax1ValueR;
  TTax2ValueR;
  TCESSValueR;
  TAddlCESSValueR;
  SourceData1;
  TTaxPayable;
  TGrossAmount;
  TTaxPayableR;
  TGrossAmountR;
  M_CompanyName;
  TaxTablehidden: boolean = true;
  ThePeriodhidden = true;
  onSubmit() {
    debugger
    try {
      let Fromdate = this.datepipe.transform(this.M_FromDate, "dd-MMM-yyyy");
      let Todate = this.datepipe.transform(this.M_ToDate, "dd-MMM-yyyy");  
      if (Fromdate == Todate) { this.ThePeriodhidden = true; }
      else { this.ThePeriodhidden = false; }
      this.commonService.getListOfData("TaxSummary/getTaxSummaryDet/" + Fromdate + '/' + Todate + '/' + parseInt(localStorage.getItem("CompanyID")))
        .subscribe(data => {
          debugger;
          data.getTaxSummaryDet.forEach((x: any) => {
            this.M_CompanyName = x.CompanyName;
          });
          this.TTaxValue = data.TTaxValue;
          this.TTax1Value = data.TTax1Value;
          this.TTax2Value = data.TTax2Value;
          this.TCESSValue = data.TCESSValue;
          this.TAddlCESSValue = data.TAddlCESSValue;
          this.TTaxPayable = data.TTaxPayable;
          this.TGrossAmount = data.TGrossAmount;

          this.SourceData = data.getTaxSummaryDet;
          this.dataSourceP.data = this.SourceData;
          this.dataSource.data = this.SourceData;
          this.dataSource._updateChangeSubscription();

          this.TTaxValueR = data.TTaxValueR;
          this.TTax1ValueR = data.TTax1ValueR;
          this.TTax2ValueR = data.TTax2ValueR;
          this.TCESSValueR = data.TCESSValueR;
          this.TAddlCESSValueR = data.TAddlCESSValueR;
          this.TTaxPayableR = data.TTaxPayableR;
          this.TGrossAmountR = data.TGrossAmountR;

          this.SourceData1 = data.getTaxSummaryDet1;
          this.dataSourceR.data = this.SourceData1;
          this.dataSourceR._updateChangeSubscription();
          this.TaxTablehidden = false;

        });


    }

    catch (Error) {
      this.commonService.getListOfData('Common/ErrorList/' + Error.message + '/' + "Tax Summary" + '/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem('userroleID') + '/')
        .subscribe(data => { });
    }


  }
  Cancel1() {
    this.TaxTablehidden = true;
  }



  //modalSuccesPrintOk() {
  //  let printContents, popupWin;
  //  printContents = document.getElementById('section').innerHTML;
  //  popupWin = window.open('', '_blank', 'top=0,left=0,height=auto,width=100%');
  //  popupWin.document.open();
  //  popupWin.document.write(`
  //           <html>
  //           <head>
  //            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">
  //          <title></title>
  //          <style> 
  //          //........Customized style.......
  //          </style>
  //        </head>
  //    <body onload="window.print();window.close()">${printContents}</body>
  //      </html>`);
  //  popupWin.document.close();

  //}




  //Taxsummarypdf()
  //{
  //  var companyname = localStorage.getItem("Companyname");
  //  var Stringfydfata = JSON.stringify(this.SourceData);
  //  var objdata = JSON.parse(Stringfydfata);
  //  var TaxDescription = jQuery.map(objdata, function (n, i) { return n.TaxDescription; });
  //  var TransactionDate = jQuery.map(objdata, function (n, i) { return n.TransactionDate; });
  //  var GrossAmount = jQuery.map(objdata, function (n, i) { return n.GrossAmount; });
  //  var TaxValue = jQuery.map(objdata, function (n, i) { return n.TaxValue; });
  //  var Tax1Value = jQuery.map(objdata, function (n, i) { return n.Tax1Value; });
  //  var Tax2Value = jQuery.map(objdata, function (n, i) { return n.Tax2Value; });
  //  var TaxPayable = jQuery.map(objdata, function (n, i) { return n.TaxPayable; });


  //  var documentDefinition = {
  //    info: {
  //      title: 'TaxSummary Details',
  //    },
  //    pageSize: {
  //      width: 1250,
  //      height: 1300
  //    },
  //    pageOrientation: 'landscape',
  //    pageMargins: [10, 10, 10, 10],
  //    content: [
  //      { text: 'Organization : ' + companyname, fontSize: 18, background: 'lightgray', color: 'blue', decoration: 'underline' },
  //      {
  //        style: 'tableExample',
  //        table: {
  //          headerRows: 1,
  //          widths: [200, 200, 100, 100, 100, 100, 100,],
  //          body: [
  //            [{ text: 'Tax Description', style: 'tableHeader' },
  //            { text: 'Date', style: 'tableHeader' },
  //            { text: 'Gross Amount', style: 'tableHeader' },
  //            { text: 'Tax Value', style: 'tableHeader' },
  //            { text: 'Tax1 Value', style: 'tableHeader' },
  //            { text: 'Tax2 Value', style: 'tableHeader' },
  //            { text: 'Tax Payable', style: 'tableHeader' }],
  //            [TaxDescription,
  //              TransactionDate,
  //              GrossAmount,
  //              TaxValue,
  //              Tax1Value,
  //              Tax2Value,
  //              TaxPayable,
  //            ]
  //          ],
  //          footer: [
  //            //headerRows: 2,
  //            [{ text: 'Tax Description', style: 'tablefooter' }],
  //            [TaxDescription,]
  //            //columns: [
  //            //  '',
  //            //  {
  //            //    alignment: 'right',
  //            //    text: 'Footer text'
  //            //  }
  //            //],
  //            //margin: [10, 0]

  //          ],


  //        },
  //        layout: {
  //          hLineWidth: function (i, node) {
  //            return (i === 0 || i === node.table.body.length) ? 2 : 1;
  //          },
  //          vLineWidth: function (i, node) {
  //            return (i === 0 || i === node.table.widths.length) ? 2 : 1;
  //          },
  //          hLineColor: function (i, node) {
  //            return (i === 0 || i === node.table.body.length) ? 'black' : 'gray';
  //          },
  //          vLineColor: function (i, node) {
  //            return (i === 0 || i === node.table.widths.length) ? 'black' : 'gray';
  //          },
  //          fillColor: function (rowIndex, node, columnIndex) {
  //            return (rowIndex % 2 === 0) ? '#CCCCCC' : null;
  //          }
  //        }
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
  //  pdfMake.createPdf(documentDefinition).download('TaxSummary Details.pdf');
  //}






  backdrop;
  accesspopup;
  //////////////////////////////////////////////////////////////////////////////////////////////
  Getformaccess() {
    debugger;
    var Pathname = "Inventorylazy/TAXSummary";
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
    jQuery(cloneTable).find('.remove-this').remove();

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
    XLSX.writeFile(wb, "Tax Summary.xlsx");
  }


  CurrentDate = new Date();
  ConvertPDF() {
    debugger;
    var companyname = localStorage.getItem("Companyname");
    var Stringfydfata = JSON.stringify(this.dataSource.data);
    var objdata = JSON.parse(Stringfydfata);

    var TaxDescription = jQuery.map(objdata, function (n, i) { return n.TaxDescription; });
    var GrossAmount = jQuery.map(objdata, function (n, i) { return n.GrossAmount; });
    var TaxValue = jQuery.map(objdata, function (n, i) { return n.TaxValue; });
    var CESSValue = jQuery.map(objdata, function (n, i) { return n.CESSValue; });
    var AddlCESSValue = jQuery.map(objdata, function (n, i) { return n.AddlCESSValue; });
    var TaxPayable = jQuery.map(objdata, function (n, i) { return n.TaxPayable; });
    var FromDate = this.datepipe.transform(this.M_FromDate, "dd-MMM-yyyy");
    var ToDate = this.datepipe.transform(this.M_ToDate, "dd-MMM-yyyy");
    var RepDate = this.datepipe.transform(this.CurrentDate, "dd-MMM-yyyy hh:mm");

    var footnewtotalGrossAmount = this.cp.transform(this.TGrossAmount, this.Country2, true, '1.0-0');
    var footnewtotalTaxValue = this.cp.transform(this.TTaxValue, this.Country2, true, '1.0-0');
    var footnewtotalCESSValue = this.cp.transform(this.TCESSValue, this.Country2, true, '1.0-0');
    var footnewtotalAddlCESSValue = this.cp.transform(this.TAddlCESSValue, this.Country2, true, '1.0-0');
    var footnewtotalTaxPayable = this.cp.transform(this.TTaxPayable, this.Country2, true, '1.0-0');


    var documentDefinition = {
      info: {
        title: 'Tax Summary Details',
      },
      pageSize: {
        width: 1350,
        height: 1300
      },
      pageOrientation: 'landscape',

      content: [
        { text: companyname + '                                              Tax Summary Details', fontSize: 14, background: 'white', color: 'black' },
        { text: `Period: ${FromDate} to ${ToDate}                                                                                               Report Date & Time : ${RepDate}       `, fontSize: 14, background: 'white', color: 'black' },
        {
          style: 'tableExample',
          table: {
            headerRows: 1,
            widths: [200, 200, 200, 200, 200, 200],
            body: [
              [{ text: 'Tax Description', style: 'tableHeader' },
              { text: 'Gross Amount', style: 'tableHeader' },
              { text: 'Tax Value', style: 'tableHeader' },
              { text: 'CESS Value', style: 'tableHeader' },
              { text: 'Addl CESS Value', style: 'tableHeader' },
              { text: 'Tax Payable', style: 'tableHeader' }],
              [TaxDescription,
                GrossAmount,
                TaxValue,
                CESSValue,
                AddlCESSValue,
                TaxPayable,
              ],
              [{ text: 'Total', style: 'tableHeader', alignment: 'center' },
                footnewtotalGrossAmount,
                footnewtotalTaxValue,
                footnewtotalCESSValue,
                footnewtotalAddlCESSValue,
                footnewtotalTaxPayable,
              ]
            ]

          },
        }
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 0, 0, 10]
        },
        subheader: {
          fontSize: 16,
          bold: true,
          margin: [0, 10, 0, 5]
        },
        tableExample: {
          margin: [0, 5, 0, 15]
        },
        tableOpacityExample: {
          margin: [0, 5, 0, 15],
          fillColor: 'blue',
          fillOpacity: 0.3
        },
        tableHeader: {
          bold: true,
          fontSize: 13,
          color: 'black'
        }
      },
    };
    pdfMake.createPdf(documentDefinition).download('Tax Summary Details.pdf');
  }




}
