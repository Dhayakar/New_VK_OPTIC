import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatTableDataSource, MatSort } from '@angular/material';
import { VendorMasters, Opticamreturnsubmitdetails } from 'src/app/Models/ViewModels/VendorMasterWebModel';
import { CommonService } from 'src/app/shared/common.service';
import { NgForm } from '@angular/forms';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import Swal from 'sweetalert2';
import { DatePipe, CurrencyPipe } from '@angular/common';
import { ExpenseViewModel, Expesneitemdata } from 'src/app/Models/ViewModels/ExpenseViewModel';
import { Payment_Master } from 'src/app/Models/PaymentWebModel ';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import * as XLSX from 'xlsx';
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

@Component({
  selector: 'app-expensestatement',
  templateUrl: './expensestatement.component.html',
  styleUrls: ['./expensestatement.component.less'],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class ExpensestatementComponent implements OnInit {

  constructor(public el: ElementRef,
    public commonService: CommonService<ExpenseViewModel>,
    private router: Router,
    public dialog: MatDialog, public Datepipe: DatePipe, private cp: CurrencyPipe,) { }
  fromMAXop = new Date();
  toMAXop = new Date();
  FROM_DAte;
  TO_DAte;
  Country1;
  Country2;
  hidestatustable: boolean = false;
  ngOnInit() {
    this.hidestatustable = false;
    this.commonService.getListOfData('Common/GetCurrencyvalues/' + localStorage.getItem('CompanyID')).subscribe(data => {
      this.Country1 = data;
      this.Country2 = this.Country1[0].Text;
    });
  }
  DateChange() {
    debugger;
    var d1 = this.Datepipe.transform(new Date(this.FROM_DAte), "yyyy-MM-dd");
    var d2 = this.Datepipe.transform(new Date(this.TO_DAte), "yyyy-MM-dd");
    if (d2 >= d1) {

    } else {    
      Swal.fire({
        type: 'warning',
        title: 'To date should not greater than From date',
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          popup: 'alert-warp',
          container: 'alert-container',
        },
      });
      this.router.navigateByUrl('/dash', { skipLocationChange: true }).then(() => {
        this.router.navigate(['ExpenseModule/Expstatement']);
      });
    }


  }
  Cancel() {
    this.router.navigateByUrl('/dash', { skipLocationChange: true }).then(() => {
      this.router.navigate(['ExpenseModule/Expstatement']);
    });
  }
 
  TotalAmt;
  displayedColumns = ['Sno', 'Description', 'Expdate','Amount','Remarks'];
  dataSource = new MatTableDataSource();
  companyname;
  Fdate;
  Tdate;
  comadd1;
  comadd2;
  comphone;
  Submitdata() {
    debugger;
    let fromdate = this.Datepipe.transform(this.FROM_DAte, "dd-MMM-yyyy");
    let todate = this.Datepipe.transform(this.TO_DAte, "dd-MMM-yyyy");
    this.commonService.getListOfData('Expense/Getexpensestatement/' + localStorage.getItem("CompanyID") + '/' + fromdate + '/' + todate).subscribe(data => {
      debugger;
      if (data.Expensestatementdata.length != 0) {
        this.hidestatustable = true;
        this.Fdate = fromdate;
        this.Tdate = todate;
        this.dataSource.data = data.Expensestatementdata;
        this.TotalAmt = data.orderedamount;
        this.companyname = localStorage.getItem("Companyname");
        this.comadd1 = data.Comapnyaddress;
        this.comadd2 = data.Comapnyaddress2;
        this.comphone = data.ComapnyPhone;
      } else {
        Swal.fire({
          type: 'warning',
          title: 'No Expense details found',
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
  ConvertPDF() {
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
    //var companyname = localStorage.getItem("Companyname");
    //var Stringfydfata = JSON.stringify(this.dataSource.data);
    //var objdata = JSON.parse(Stringfydfata);
    //var Description = jQuery.map(objdata, function (n, i) { return n.ExpenseDescription; });
    //var Date = jQuery.map(objdata, function (n, i) { return n.Date; });
    //var Amount = objdata.map((todo, i) => {
    //  var testdata = objdata[i].TotalAmount;
    //  return this.cp.transform(testdata, this.Country2, true, '1.0-0');
    //});
    //var Remarks = jQuery.map(objdata, function (n, i) { return n.Remarks; });
    //var documentDefinition = {
    //  info: {
    //    title: 'Expense Statement',
    //  },
    //  pageSize: {
    //    width: 620,
    //    height: 1300
    //  },
    //  pageOrientation: 'landscape',
    //  pageMargins: [10, 10, 10, 10],

    //  content: [
    //    { text: 'Organization : ' + companyname, fontSize: 18, background: 'lightgray', color: 'blue', decoration: 'underline' },
    //    {
    //      style: 'tableExample',
    //      table: {
    //        headerRows: 1,
    //        widths: [200, 100, 100, 200],
    //        body: [
    //          [{ text: 'Expense Description', style: 'tableHeader' },
    //          { text: 'Date', style: 'tableHeader' },
    //          { text: 'Amount', style: 'tableHeader' },
    //          { text: 'Remarks', style: 'tableHeader' }],          
    //            [Description, Date, Amount, Remarks]
    //        ],
           
    //      },
    //      layout: {
    //        hLineWidth: function (i, node) {
    //          return (i === 0 || i === node.table.body.length) ? 2 : 1;
    //        },
    //        vLineWidth: function (i, node) {
    //          return (i === 0 || i === node.table.widths.length) ? 2 : 1;
    //        },
    //        hLineColor: function (i, node) {
    //          return (i === 0 || i === node.table.body.length) ? 'black' : 'gray';
    //        },
    //        vLineColor: function (i, node) {
    //          return (i === 0 || i === node.table.widths.length) ? 'black' : 'gray';
    //        },
    //        fillColor: function (rowIndex, node, columnIndex) {
    //          return (rowIndex % 2 === 0) ? '#CCCCCC' : null;
    //        }
    //      }
    //    }
    //  ],
    //  footer: function (currentPage, pageCount) {
    //    return {
    //      table: {
    //        widths: ['auto', "*", "auto"],
    //        body: [
    //          [
    //            { text: 'Confidential', alignment: 'left' },
    //            { text: 'Page ' + pageCount, alignment: 'center' },
    //            { text: 'Page ' + pageCount, alignment: 'right' }
    //          ]
    //        ]
    //      },
    //    };
    //  },
    //  styles: {
    //    header: {
    //      fontSize: 18,
    //      bold: true,
    //      margin: [0, 0, 0, 10]
    //    },
    //    subheader: {
    //      fontSize: 16,
    //      bold: true,
    //      margin: [0, 10, 0, 5]
    //    },
    //    tableExample: {
    //      margin: [0, 5, 0, 15]
    //    },
    //    tableOpacityExample: {
    //      margin: [0, 5, 0, 15],
    //      fillColor: 'blue',
    //      fillOpacity: 0.3
    //    },
    //    tableHeader: {
    //      bold: true,
    //      fontSize: 13,
    //      color: 'black'
    //    }
    //  },
    //};
    //pdfMake.createPdf(documentDefinition).download('Expense Statement.pdf');
  }

  ConvertEXCEL() {
    let element = document.getElementById('section');
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
    XLSX.utils.book_append_sheet(wb, ws, 'Expense Statement');
    XLSX.writeFile(wb, "Expense Statement.xlsx");
  }
////////////////////////////////////////////////////////////////THE END/////////////////////////////////////////////////////////
}
