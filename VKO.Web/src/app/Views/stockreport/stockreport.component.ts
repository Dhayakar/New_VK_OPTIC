import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator, DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { NgForm, FormControl } from '@angular/forms';
import { CommonService } from 'src/app/shared/common.service';
import { StockViewmodel } from 'src/app/Models/ViewModels/StockView';
import Swal from 'sweetalert2';

import * as XLSX from 'xlsx';
import html2canvas from 'html2canvas';

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
  selector: 'app-stockreport',
  templateUrl: './stockreport.component.html',
  styleUrls: ['./stockreport.component.less'],
  providers: [

    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class StockreportComponent implements OnInit {

  @ViewChild('sortCol1') sortCol1: MatSort;
  @ViewChild('sortCol2') sortCol2: MatSort;

  constructor(public commonService: CommonService<StockViewmodel>) { }

  StockTable: boolean = false;
  StockTable1: boolean = false;
  hide1: boolean = false;
  hide2: boolean = false;
  hide3: boolean = false;

  M_Date = new Date();
  ngOnInit() {
    localStorage.getItem("CompanyID");
    this.docotorid = localStorage.getItem('userDoctorID');
  }
  @ViewChild('stock_table2') stock_table2: ElementRef;
  @ViewChild('table2') table2: ElementRef;
  @ViewChild('stock_table3') stock_table3: ElementRef;
  @ViewChild('table3') table3: ElementRef;

  maxDate(): string {
    return new Date().toISOString().split('T')[0]
  }
  displayedColumns = ['tapp', 'Brand Name', 'UOM', 'Physical Stock', 'Consumable Stock', 'Expired Stock']
  dataSource = new MatTableDataSource();
  displayedColumns1 = ['Batch Number', 'Batch Qty', 'Batch IssuedQty', 'Batch BalanceQty', 'Batch Expiry']
  dataSource1 = new MatTableDataSource();

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getPdf2() {
    var data = document.getElementById('stock_table2');
    html2canvas(data).then(canvas => {
      var imgWidth = 208;
      var pageHeight = 295;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      var heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL('image/PDF')
      //let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF  
      var position = 0;
      //pdf.addImage(contentDataURL, 'PDF', 1, position, imgWidth, imgHeight)
      //pdf.save('Stock Details.pdf'); // Generated PDF   
    });

  }


  StockDetails;
  docotorid;

  getExcel2() {
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.table2.nativeElement);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    XLSX.writeFile(wb, 'Stock Details.xlsx');
  }


  getPdf3() {
    var data = document.getElementById('stock_table3');
    html2canvas(data).then(canvas => {
      var imgWidth = 208;
      var pageHeight = 295;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      var heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL('image/PDF')
      //let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF  
      var position = 0;
      //pdf.addImage(contentDataURL, 'PDF', 1, position, imgWidth, imgHeight)
      //pdf.save('ItemBatch Details.pdf'); // Generated PDF   
    });

  }
  getExcel3() {

    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.table3.nativeElement);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');


    XLSX.writeFile(wb, 'ItemBatch Details.xlsx');
  }

  Date;
  backdrop;
  cancelblock;
  Filter;
  modalcloseOk() {
    this.backdrop = 'none';
    this.cancelblock = 'none';
  }
  modalSuccessClose() {
    this.backdrop = 'none';
    this.cancelblock = 'none';
  }
  modalSuccessOk() {
    this.backdrop = 'none';
    this.cancelblock = 'none';
    this.StockTable = false;
    this.StockTable1 = false;
    this.Filter = '';

    this.applyFilter("");


  }



  onSubmit(form: NgForm) {
    debugger
    if (form.valid) {
      this.Date = this.M_Date.toISOString();
      this.commonService.getListOfData("Stock/Search/" + this.Date + '/' + parseInt(localStorage.getItem("CompanyID")) + '/')
        .subscribe(data => {
          debugger;
          if (data.StockDetails1.length > 0) {
            this.dataSource.data = data.StockDetails1;
            this.dataSource.sort = this.sortCol1;
            this.StockTable = true;
            this.StockTable1 = false;

          }
          else {
            this.StockTable = false;
            this.StockTable1 = false;
            Swal.fire({
              type: 'warning',
              title: 'No Data Found',
            })
          }

        });

    }

  }
  date;
  M_facture;
  brand;

  selecttype2(item) {
    debugger;
    this.Date = this.M_Date.toISOString();
    // this.StockTable1 = false


    this.commonService.getListOfData("Stock/GetStockDetails4/" + item.BrandName + '/' + this.Date + '/')
      .subscribe(data => {
        debugger;
        if (data.StockDetails2.length > 0) {
          this.dataSource1.data = data.StockDetails2;
          this.M_facture = data.Manufacturer;
          this.brand = data.BrandName;
          this.StockTable1 = true;
          this.hide1 = false;
          this.hide2 = false;
          this.hide3 = true;
          Swal.fire({
            type: 'warning',
            title: 'Expired Stock Details'

          })
        }
        else {
          this.StockTable = false;
          this.StockTable1 = false;
          Swal.fire({
            type: 'warning',
            title: 'No Data Found',
          })
        }


      });

  }

  selecttype1(item) {
    this.Date = this.M_Date.toISOString();
    this.StockTable1 = false
    this.commonService.getListOfData("Stock/GetStockDetails3/" + item.BrandName + '/' + this.Date + '/')
      .subscribe(data => {
        if (data.StockDetails2.length > 0) {
          this.dataSource1.data = data.StockDetails2;
          this.M_facture = data.Manufacturer;
          this.brand = data.BrandName;
          this.StockTable1 = true;
          this.hide1 = false;
          this.hide3 = false;
          this.hide2 = true;
          Swal.fire({
            type: 'warning',
            title: 'Consumable Stock Details'

          })
        }


        else {
          this.StockTable = false;
          this.StockTable1 = false;
          Swal.fire({
            type: 'warning',
            title: 'No Data Found',
          })
        }


      });

  }

  selecttype(item) {
    debugger;
    this.Date = this.M_Date.toISOString();

    this.commonService.getListOfData("Stock/GetStockDetails2/" + item.BrandName + '/' + this.Date + '/')
      .subscribe(data => {
        debugger;
        if (data.StockDetails2.length > 0) {

          this.dataSource1.data = data.StockDetails2;
          this.M_facture = data.Manufacturer;
          this.brand = data.BrandName;
          this.StockTable1 = true;
          this.hide2 = false;
          this.hide3 = false;
          this.hide1 = true;
          //  this.commonService.data.StockDetails2 = [];
          Swal.fire({
            type: 'warning',
            title: 'Physical Stock Details'

          })
        }
        else {
          this.StockTable = false;
          this.StockTable1 = false;
          Swal.fire({
            type: 'warning',
            title: 'No Data Found',
          })


        }

      });

  }

  CancelClk() {
    if (this.StockTable1 == true) {
      this.backdrop = 'block';
      this.cancelblock = 'block';
    }

    if (this.StockTable == true) {
      this.backdrop = 'block';
      this.cancelblock = 'block';
    }

  }

}

