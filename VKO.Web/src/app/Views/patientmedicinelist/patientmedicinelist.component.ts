import { Component, OnInit, ElementRef, ChangeDetectorRef, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormControl, NgForm } from '@angular/forms';
import { MatTableDataSource, MatSort, MatPaginator, DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material';
import Swal from 'sweetalert2';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { CommonService } from 'src/app/shared/common.service';
import { Vmmedicine } from 'src/app/Models/ViewModels/Vmmedicine';
import { AppComponent } from 'src/app/app.component';
import * as XLSX from 'xlsx';
import { Router } from '@angular/router';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
declare var jQuery: any;

//dateformate
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
  selector: 'app-patientmedicinelist',
  templateUrl: './patientmedicinelist.component.html',
  styleUrls: ['./patientmedicinelist.component.less'],

  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class PatientmedicinelistComponent implements OnInit {

  constructor(public commonService: CommonService<Vmmedicine>, public datepipe: DatePipe, private router: Router,
    public appComponent: AppComponent, public el: ElementRef, private cahngeDatectorrefs: ChangeDetectorRef) { }
  date = new FormControl(new Date());

  M_To;
  M_Period;
  ShowItemDetails: boolean = false;
  M_FromDate;
  M_ToDate;
  Default;
  GivenDateSearch;
  Buttons: boolean = false;
  backdrop;
  cancelblock;
  Excel: boolean = false;
  static;
  CompanyID;
  M_sFromDate;
  specificdefault: boolean = false;
  ExportBatchDrugs: boolean = false;
  ExportSerialDrugs: boolean = false;
  M_sToDate;

  isNextButton = true;
  isNextupdate = true;
  isNextDelete = true;
  isNextPrint = true;
  accesspopup1;
  accessdata;

  ngOnInit() {
    var Pathname = "Inventorylazy/Pmedlist";
    var n = Pathname;
    var sstring = n.includes("/");
    this.commonService.data = new Vmmedicine();
    var Objdata = JSON.parse(localStorage.getItem("AllCollectionData"));
    if (sstring == false) {
      if (Objdata.find(el => el.Parentmoduledescription === Pathname)) {
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
          if (this.accessdata.find(x => x.Print == true)) {
            this.isNextPrint = false;
          } else {
            this.isNextPrint = true;
          }
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
        this.commonService.getListOfData('Common/Getlogdetails/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem("Doctorname") + '/' + "Drug Expiry List").subscribe(data => {
          this.router.navigate(['dash']);
        });
      }
    }
    else {
      if (Objdata.find(el => el.Parentmoduledescription === Pathname)) {
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
          if (this.accessdata.find(x => x.Print == true)) {
            this.isNextPrint = false;
          } else {
            this.isNextPrint = true;
          }
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
        this.commonService.getListOfData('Common/Getlogdetails/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem("Doctorname") + '/' + "Drug Expiry List").subscribe(data => {
          this.router.navigate(['dash']);
        });
      }
    }
  }

  displayedColumns: string[] = ['sno','Store','Brand', 'ItemBatchNumber', 'UOM', 'ItemBatchQty', 'ItemBatchBalanceQty', 'ItemBatchExpiry'];
  dataSource = new MatTableDataSource();

  SerialdisplayedColumns: string[] = ['sno', 'Store', 'Brand', 'SerialNo', 'UOM', 'Qty', 'ItemExpiry'];
  SerialdataSource = new MatTableDataSource();


  Getformaccess() {
    var Pathname = "Inventorylazy/Pmedlist";
    var n = Pathname;
    var sstring = n.includes("/");
    if (sstring == false) {
      this.commonService.getListOfData('Common/GetAccessdetails/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem("userroleID") + '/' + Pathname).subscribe(data => {
        this.accessdata = data.GetAvccessDetails;
        this.accesspopup1 = 'block';
      });
    }
    else if (sstring == true) {
      this.commonService.getListOfData('Common/GetAccessdetailsstring/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem("userroleID") + '/' + Pathname).subscribe(data => {
        this.accessdata = data.GetAvccessDetails;
        this.accesspopup1 = 'block';
      });
    }
  }

  modalcloseAccessOk() {
    this.accesspopup1 = 'none';
  }


  PeriodDateChange() {
    if (this.M_Period == 'GivenDate')
    {
      this.M_To = null;
      this.M_ToDate = null;
      this.M_FromDate = null;
      this.Buttons = true;
      this.GivenDateSearch = true;
      this.Default = false;
      this.ShowItemDetails = false;
      this.Excel = false;
      this.specificdefault = false;
    }
    else if (this.M_Period == 'NextMonth')
    {
      this.M_To = null;
      this.M_ToDate = null;
      this.M_FromDate = null;
      this.M_FromDate = this.date.value;
      this.M_ToDate = new Date(this.date.value);
      this.M_ToDate.setMonth(this.M_ToDate.getMonth() + 1);
      this.Default = true;
      this.GivenDateSearch = false;
      this.Buttons = true;
      this.ShowItemDetails = false;
      this.Excel = false;
      this.specificdefault = false;
    }
    else
    {
      this.M_To = null;
      this.M_ToDate = null;
      this.M_FromDate = null;
      this.specificdefault = true;
      this.Default = false;
      this.GivenDateSearch = false;
      this.ShowItemDetails = false;
    }
  }

 /*Submit*/
  Submit() {
    debugger;
    if (this.M_Period == 'GivenDate') {
        this.commonService.data = new Vmmedicine();
        let Todate = this.M_To.toISOString();
      this.commonService.getListOfData('Medicine/ManualSearch/' + Todate + '/' + localStorage.getItem("CompanyID") + '/')
        .subscribe(data => {
          if (data.BatchDrugs.length > 0 || data.SerialDrugs.length > 0) {
            if (data.BatchDrugs.length > 0) {
              this.ExportBatchDrugs = true;
              this.dataSource.data = [];
              this.dataSource.data = data.BatchDrugs;
              this.ShowItemDetails = true;
            }
            else {
              this.ExportBatchDrugs = false;
              this.dataSource.data = [];
            }
            if (data.SerialDrugs.length > 0) {
              this.ExportSerialDrugs = true;
              this.SerialdataSource.data = [];
              this.SerialdataSource.data = data.SerialDrugs;
              this.ShowItemDetails = true;
            }
            else {
              this.ExportSerialDrugs = false;
              this.SerialdataSource.data = [];
            }
          }
          else {
            this.dataSource.data = [];
            this.SerialdataSource.data = [];
            this.ShowItemDetails = false;
            this.ExportSerialDrugs = false;
            this.ExportBatchDrugs = false;
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
    else if (this.M_Period == 'NextMonth' || this.M_Period == 'Specific') {
      this.commonService.data = new Vmmedicine();
      let FromDate = this.M_FromDate.toISOString();
      let ToDate = this.M_ToDate.toISOString();
      this.commonService.getListOfData('Medicine/MonthSearch/' + FromDate + '/' + ToDate + '/' + localStorage.getItem("CompanyID") + '/')
        .subscribe(data => {
          debugger;
          if (data.BatchDrugs.length > 0 || data.SerialDrugs.length > 0) {
            if (data.BatchDrugs.length > 0) {
              this.ExportBatchDrugs = true;
              this.dataSource.data = [];
              this.dataSource.data = data.BatchDrugs;
              this.ShowItemDetails = true;
            }
            else {
              this.dataSource.data = [];
              this.ExportBatchDrugs = false;
            }
            if (data.SerialDrugs.length > 0) {
              this.ExportSerialDrugs = true;
              this.SerialdataSource.data = [];
              this.SerialdataSource.data = data.SerialDrugs;
              this.ShowItemDetails = true;
            }
            else {
              this.SerialdataSource.data = [];
              this.ExportSerialDrugs = false;
            }
          }
          else {
            this.dataSource.data = [];
            this.SerialdataSource.data = [];
            this.ShowItemDetails = false;
            this.ExportSerialDrugs = false;
            this.ExportBatchDrugs = false;
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
  }

 /*Cancel*/
  Cancel() {
    this.dataSource.data = [];
    this.SerialdataSource.data = [];
    this.ShowItemDetails = false;
  }

  @ViewChild('content') content: ElementRef;
  fireEvent() {
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.content.nativeElement);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'Tablets.xlsx');
  }

  ConvertBatchPDF() {
    debugger;
    var companyname = localStorage.getItem("Companyname");
    var Stringfydfata = JSON.stringify(this.dataSource.data);
    var objdata = JSON.parse(Stringfydfata);

    var brands = jQuery.map(objdata, function (n, i) { return n.Brand; });
    var Store = jQuery.map(objdata, function (n, i) { return n.StoreName; });
    var ItemBatchNumbers = jQuery.map(objdata, function (n, i) { return n.ItemBatchNumber; });
    var UOMs = jQuery.map(objdata, function (n, i) { return n.UOM; });
    var ItemBatchQtys = jQuery.map(objdata, function (n, i) { return n.ItemBatchQty; });
    var ItemBatchBalanceQtys = jQuery.map(objdata, function (n, i) { return n.ItemBatchBalanceQty; });
    var ItemBatchExpirys = objdata.map((todo, i) => {
      var testdata = objdata[i].ItemBatchExpiry;
      return this.datepipe.transform(testdata, "dd-MMM-yyyy");
    });


    var documentDefinition = {
      info: {
        title: 'Drug Expiry List',
      },

      pageSize: {
        width: 1350,
        height: 1300
      },
      pageOrientation: 'landscape',
      content: [
        { text: companyname, fontSize: 18, background: 'white', color: 'black', decoration: 'underline' },
        { text: 'Drug Expiry List :- Batch based', fontSize: 18, background: 'white', color: 'black', decoration: 'underline' },
        {
          style: 'tableExample',
          color: '#444',
          table: {
            headerRows: 1,
            widths: [150, 150, 100, 100, 100, 100,100,150],
            body: [
              [{ text: 'Brand', style: 'tableHeader',  alignment: 'center' },
              { text: 'Store', style: 'tableHeader',  alignment: 'center' },
              { text: 'Item Batch No', style: 'tableHeader',  alignment: 'center' },
              { text: 'UOM', style: 'tableHeader', alignment: 'center' },
              { text: 'Item Batch Qty', style: 'tableHeader',  alignment: 'center' },
              { text: 'Item Batch Balance Qty', style: 'tableHeader',  alignment: 'center' },
              { text: 'Expired On', style: 'tableHeader',  alignment: 'center' }],
            
              [brands, Store, ItemBatchNumbers, UOMs, ItemBatchQtys, ItemBatchBalanceQtys, ItemBatchExpirys],
        
            ],

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
    pdfMake.createPdf(documentDefinition).download('Medicine Expiry List.pdf');
  }

  ConvertSerialPDF() {
    debugger;
    var companyname = localStorage.getItem("Companyname");
    var Stringfydfata = JSON.stringify(this.SerialdataSource.data);
    var objdata = JSON.parse(Stringfydfata);

    var brands = jQuery.map(objdata, function (n, i) { return n.Brand; });
    var Store = jQuery.map(objdata, function (n, i) { return n.StoreName; });
    var SerialNo = jQuery.map(objdata, function (n, i) { return n.ItemBatchNumber; });
    var UOMs = jQuery.map(objdata, function (n, i) { return n.UOM; });
    var Qty = jQuery.map(objdata, function (n, i) { return n.ItemBatchBalanceQty; });
    var ItemExpiry = objdata.map((todo, i) => {
      var testdata = objdata[i].ItemBatchExpiry;
      return this.datepipe.transform(testdata, "dd-MMM-yyyy");
    });
    var documentDefinitions = {
      info: {
        title: 'Drug Expiry List',
      },

      pageSize: {
        width: 1350,
        height: 1300
      },
      pageOrientation: 'landscape',
      content: [
        { text: companyname, fontSize: 18, background: 'white', color: 'black', decoration: 'underline' },
        { text: 'Drug Expiry List :- Serial based', fontSize: 18, background: 'white', color: 'black', decoration: 'underline' },
        {
          style: 'tableExample',
          color: '#444',
          table: {
            headerRows: 1,
            widths: [150, 150, 100, 100, 100, 100, 150],
            body: [
              [{ text: 'Brand', style: 'tableHeader', alignment: 'center' },
              { text: 'Store', style: 'tableHeader', alignment: 'center' },
              { text: 'Serial No', style: 'tableHeader', alignment: 'center' },
              { text: 'UOM', style: 'tableHeader', alignment: 'center' },
              { text: 'Qty', style: 'tableHeader', alignment: 'center' },
              { text: 'Expired On', style: 'tableHeader', alignment: 'center' }],
              [brands, Store, SerialNo, UOMs, Qty, ItemExpiry],
            ],
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
    pdfMake.createPdf(documentDefinitions).download('Medicine Expiry List.pdf');
  }


  ConvertBatchEXCEL() {
    let element = document.getElementById('table');
    var cloneTable = element.cloneNode(true);
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(cloneTable);
    var wscols = [
      { wch: 10 },
      { wch: 12 },
      { wch: 30 },
      { wch: 10 }
    ];
    ws['!cols'] = wscols;
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Drug Expiry');
    XLSX.writeFile(wb, "Drug Expiry.xlsx");
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////
}
