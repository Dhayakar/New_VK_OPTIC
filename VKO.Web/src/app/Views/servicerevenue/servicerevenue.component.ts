import { CommonService } from 'src/app/shared/common.service';
import { Medservviewmodel } from '../../Models/ViewModels/patientaccountviewmodel';
import { Component, OnInit, ElementRef, ViewChild, EventEmitter, Output } from '@angular/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import Swal from 'sweetalert2';
import { MatTableDataSource, TooltipComponent } from '@angular/material';
import { FormControl, FormGroupDirective, NgForm, Validators, FormBuilder } from '@angular/forms';
import { element } from '@angular/core/src/render3';
import { Title } from '@angular/platform-browser';
import { Services } from '@angular/core/src/view';
import * as XLSX from 'xlsx';

import html2canvas from 'html2canvas';



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
  selector: 'app-servicerevenue',
  templateUrl: './servicerevenue.component.html',
  styleUrls: ['./servicerevenue.component.less'],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },

  ],
})
export class ServicerevenueComponent implements OnInit {

  constructor(public commonservice: CommonService<Medservviewmodel>) { }
  sortData(event) {

  }
  ngOnInit() {
  }
  M_ToDate;
  M_FromDate;
  M_FromDat;
  M_ToDat;
  modalmed;
  backdrop;
  service;
  sheetName = "Service Revenue";
  ExcelName = "Service Revenue.xlsx";
  hiddenSearchBT = false;
  Excelformatprint;
  minToDate = new Date();
  Revenuetable: boolean = false;
  displayedColumn = ['servicess', 'totalamountt'];
  dataSource = new MatTableDataSource();
  displayedColumnss = ['sn', 'servicedess', 'totalamountt'];
  dataSourcee = new MatTableDataSource();
  @ViewChild('contentToConvert') contentToConvert: ElementRef;
  @ViewChild('table') table: ElementRef;
  cancelblock;
  modalSuccessmed() {
    this.modalmed = 'none';
    this.backdrop = 'none';
  }
  @ViewChild('myForm') Form: NgForm
  CheckToDate() {
    debugger;
    this.minToDate = this.M_FromDate;
  }

  getToday(): string {
    return new Date().toISOString().split('T')[0]
  }
  captureScreen() {

    var data = document.getElementById('contentToConvert');
    html2canvas(data).then(canvas => {
      var imgWidth = 200;
      var pageHeight = 55;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      var heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL('image/PDF')
      //let pdf = new jspdf('p', 'mm', 'a4');
      var position = 0;
      ////pdf.addImage(contentDataURL, 'PDF', 16, position, imgWidth, imgHeight)
      //pdf.save('Services Revenue.pdf');

    });

  }

  fireEventt() {
    debugger;
    this.backdrop = 'block';
    this.Excelformatprint = 'block';

  }

  printclose() {
    debugger;
    this.backdrop = 'none';
    this.Excelformatprint = 'none';
  }


  fireEvent() {
    debugger;
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.table.nativeElement);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, this.sheetName);
    XLSX.writeFile(wb, this.ExcelName);
    this.backdrop = 'none';
    this.Excelformatprint = 'none';
  }




  Cancel() {
    if (this.M_FromDate != null || this.M_ToDate != null) {
      this.backdrop = 'block';
      this.cancelblock = 'block';
    }
    else {
      this.Form.onReset();
    }
  }


  modalcloseOk() {
    this.backdrop = 'none';
    this.cancelblock = 'none';
  }
  modalSuccesssOk() {
    this.cancelblock = 'none';
    this.Revenuetable = false;
    this.Form.onReset();
  }
  form;
  Getcmpid;

  Submit(form: NgForm) {
    debugger;
    if (form.valid) {
      debugger;
      this.Getcmpid = localStorage.getItem('CompanyID');
      this.M_FromDat = this.M_FromDate.toISOString();
      this.M_ToDat = this.M_ToDate.toISOString();
      this.commonservice.getListOfData('Medserv/getDetails/' + this.M_FromDat + '/' + this.M_ToDat + '/' + this.Getcmpid).subscribe(data => {
        debugger;
        if (data.getDetail.length > 0) {
          debugger;
          this.commonservice.data = data;
          this.dataSource.data = data.getSummary;
          this.Revenuetable = true;

        }
        else {
          debugger;
          this.Revenuetable = false;
          Swal.fire({
            type: 'warning',
            title: 'No Data Found',

          });
          this.Form.onReset();
        }
      });

    }
  }

  servicess;
  show(element) {
    debugger;
    this.servicess = element.servicess;
    this.commonservice.getListOfData('Medserv/getDetailsIn/' + this.M_FromDat + '/' + this.M_ToDat + '/' + this.servicess).subscribe(data => {
      if (data.getDetailss.length > 0) {
        this.dataSourcee.data = data.getsummaryy;
        this.modalmed = 'block';
        this.backdrop = 'block';
      }
      else {
        this.modalmed = 'none';
        this.backdrop = 'none'
        Swal.fire({
          type: 'warning',
          title: 'No Data Found',

        });

      }
    });
  }
}





