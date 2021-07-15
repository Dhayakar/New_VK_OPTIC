import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { CommonService } from '../../shared/common.service';
import { BillingPharmacy } from '../../Models/ViewModels/BillingPharmacy_master.model';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';

import html2canvas from 'html2canvas';
import { MatTableDataSource, MAT_DATE_FORMATS, DateAdapter, MAT_DATE_LOCALE } from '@angular/material';
import { MatSort } from '@angular/material/sort';
import { element } from '@angular/core/src/render3';
import { MomentDateAdapter } from '@angular/material-moment-adapter';



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
  selector: 'app-medicalbillregistersummary',
  templateUrl: './medicalbillregistersummary.component.html',
  styleUrls: ['./medicalbillregistersummary.component.less'],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },

  ]
})
export class MedicalbillregistersummaryComponent implements OnInit {
  MFromDate;
  @ViewChild('MedForm') Form: NgForm



  maxDate(): string {
    return new Date().toISOString().split('T')[0]
  }

  //maxDate2(): string {
  //  return new Date().toISOString().split('T')[0]
  //}

  constructor(public commonService: CommonService<BillingPharmacy>) { }

  MedicalBillRegisterTable: boolean = false;
  MedicalBillSummaryTable: boolean = false;



  MBS_label: boolean = false;


  date = new FormControl(new Date());


  ngOnInit() {


  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  applyFilter1(filterValue: string) {
    this.dataSource1.filter = filterValue.trim().toLowerCase();
  }


  displayedColumn: string[] = ['BillNo', 'BillDate', 'PatientName', 'item', 'UOM', 'Quantity', 'Rate', 'ProductValue', 'Discount', 'DiscountAmount', 'TaxDescription','GST', 'GSTValue', 'TotalCost'];
  dataSource = new MatTableDataSource();

  displayedColumnsummary: string[] = ['Item', 'Uom', 'Quan', 'Irate', 'Tvalue', 'IDis', 'Damt', 'IGst', 'Gamt', 'TotalCost1'];
  dataSource1 = new MatTableDataSource();

  @ViewChild(MatSort) sort: MatSort;
  minToDate = new Date();
  CheckToDate() {
    debugger;
    this.minToDate = this.MFromDate;
  }


  MToDate;
  M_FromDat;
  M_ToDat;

  changeValueTotal(id, element, property: string) {
    var resTotal = (element.Quantity * element.Rate) + element.GSTValue - element.DiscountAmount;
    resTotal = parseFloat(resTotal.toFixed(2));
    element.TotalCost = resTotal;
  }

  getTotalProdVal() {

    var totProdVal = this.commonService.data.getRegisterDetail.map(t => t.ProductValue).reduce((acc, value) => acc + value, 0);
    totProdVal = parseFloat(totProdVal.toFixed(2));
    return totProdVal;
  }

  getDiscountAmount() {
    var totDiscntAmt = this.commonService.data.getRegisterDetail.map(t => t.DiscountAmount).reduce((acc, value) => acc + value, 0);
    totDiscntAmt = parseFloat(totDiscntAmt.toFixed(2));
    return totDiscntAmt;
  }

  getGSTAmount() {
    var totGSTAmt = this.commonService.data.getRegisterDetail.map(t => t.GSTValue).reduce((acc, value) => acc + value, 0);
    totGSTAmt = parseFloat(totGSTAmt.toFixed(2));
    return totGSTAmt;
  }
  getTotalCostamount() {
    var totCstAmt = this.commonService.data.getRegisterDetail.map(t => t.TotalCost).reduce((acc, value) => acc + value, 0);
    totCstAmt = parseFloat(totCstAmt.toFixed(2));
    return totCstAmt;
  }
  getTotalCostamount1() {
    var totCstAmt1 = this.commonService.data.getSummaryDet.map(t => t.TotalCost1).reduce((acc, value) => acc + value, 0);
    totCstAmt1 = parseFloat(totCstAmt1.toFixed(2));
    return totCstAmt1;
  }
  getTotalProdVal1() {

    var totProdVal1 = this.commonService.data.getSummaryDet.map(t => t.Tvalue).reduce((acc, value) => acc + value, 0);
    totProdVal1 = parseFloat(totProdVal1.toFixed(2));
    return totProdVal1;
  }
  getDiscountAmount1() {
    var totDiscntAmt1 = this.commonService.data.getSummaryDet.map(t => t.Damt).reduce((acc, value) => acc + value, 0);
    totDiscntAmt1 = parseFloat(totDiscntAmt1.toFixed(2));
    return totDiscntAmt1;
  }

  getGSTAmount1() {
    var totGSTAmt1 = this.commonService.data.getSummaryDet.map(t => t.Gamt).reduce((acc, value) => acc + value, 0);
    totGSTAmt1 = parseFloat(totGSTAmt1.toFixed(2));
    return totGSTAmt1;
  }


  @ViewChild('RegTable') RegTable: ElementRef;
  @ViewChild('SummaryTable') SummaryTable: ElementRef;

  @ViewChild('table') table: ElementRef;
  @ViewChild('table1') table1: ElementRef;

  fireEvent() {
    debugger;


    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.table.nativeElement);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    XLSX.writeFile(wb, 'Medical_Bill_Register.xlsx');
  }


  captureScreen() {
    var data = document.getElementById('RegTable');
    html2canvas(data).then(canvas => {
      var imgWidth = 239;
      var pageHeight = 55;
      //var width = data.internal.pageSize.getWidth();
      //var height = data.internal.pageSize.getHeight();
      var imgHeight = canvas.height * imgWidth / canvas.width;
      var heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL('image/PDF')
      //let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF  
      var position = 5;
      //pdf.addImage(contentDataURL, 'PDF', 0, position, imgWidth, imgHeight)
      //pdf.save('Medical_Bill_Register.pdf'); // Generated PDF   
    });
    //const tabletojson = require('tabletojson');
    //var table = tabletojson($('#table-id').get(0));
    //var doc = new jspdf('l', 'pt', 'letter', true);


    //$.each(table, function (i, row) {
    //  $.each(row, function (j, cell) {
    //    if (j == "email" | j == 1) {
    //      doc.cell(1, 10, 190, 20, cell, i);
    //    }
    //    else {
    //      doc.cell(1, 10, 90, 20, cell, i);
    //    }

    //  });
    //});

    //doc.save('Safaa.pdf');

    //var doc = new jspdf();

    //var specialElementHandlers = {
    //  '#hidediv': function (element, render) { return true; }
    //};

    //doc.fromHTML($('#RegTable').get(0), 20, 20, {
    //  'width': 500,
    //  'elementHandlers': specialElementHandlers
    //});

    //doc.save('Test.pdf');



  }
  captureScreen1() {
    var data = document.getElementById('SummaryTable');
    html2canvas(data).then(canvas => {
      var imgWidth = 239;
      var pageHeight = 55;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      var heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL('image/PDF')
      //let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF  
      var position = 5;
      //pdf.addImage(contentDataURL, 'PDF', 1, position, imgWidth, imgHeight)
      //pdf.save('Medical_Bill_Summary.pdf'); // Generated PDF   
    });
  }

  fireEvent1() {
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.table1.nativeElement);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    XLSX.writeFile(wb, 'Medical_Bill_Summary.xlsx');

  }
  backdrop;
  cancelblock;

  Cancel() {
    debugger;

    if (this.MFromDate != null || this.MToDate != null) {

      this.backdrop = 'block';
      this.cancelblock = 'block';


    }
    else {
      this.Form.onReset();

    }

  }

  modalClose() {

    this.backdrop = 'none';
    this.cancelblock = 'none';
  }

  CancelNo() {
    this.backdrop = 'none';
    this.cancelblock = 'none';
  }

  CancelYes() {
    debugger;
    this.backdrop = 'none';
    this.cancelblock = 'none';
    //this.MFromDate = '';
    //this.MToDate = '';
    this.MedicalBillRegisterTable = false;
    this.MedicalBillSummaryTable = false;
    this.MBS_label = false;

  }

  onSubmit(form: NgForm) {
    debugger;


    if (form.valid) {
      this.M_FromDat = this.MFromDate.toISOString();
      this.M_ToDat = this.MToDate.toISOString();

      this.commonService.getListOfData("MedicalBillRegister/getMedBillDet/" + this.M_FromDat + '/' + this.M_ToDat + '/' + parseInt(localStorage.getItem("CompanyID")))
        .subscribe(data => {
          debugger;
          if (data.getRegisterDetail != null && data.getRegisterDetail.length != 0) {
            debugger;



            if (data.getRegisterDetail != null) {
              for (var i = 0; i < data.getRegisterDetail.length; i++) {
                debugger;
                var res = ((data.getRegisterDetail[i].Quantity * data.getRegisterDetail[i].Rate) + data.getRegisterDetail[i].GSTValue) - data.getRegisterDetail[i].DiscountAmount;
                data.getRegisterDetail[i].TotalCost = res;
              }
              console.log(data.getRegisterDetail);

            }
            if (data.getSummaryDet != null) {
              for (var i = 0; i < data.getSummaryDet.length; i++) {
                debugger;
                var rslt = ((data.getSummaryDet[i].Quan * data.getSummaryDet[i].Irate) + data.getSummaryDet[i].Gamt) - data.getSummaryDet[i].Damt;
                data.getSummaryDet[i].TotalCost1 = rslt;
              }
              console.log(data.getRegisterDetail1);

            }


            this.commonService.data = data;
            this.dataSource.data = data.getRegisterDetail;
            this.dataSource1.data = data.getSummaryDet;
            debugger;
            this.dataSource.sort = this.sort;
            this.dataSource1.sort = this.sort;


            this.MedicalBillRegisterTable = true;
            this.MedicalBillSummaryTable = true;
            this.MBS_label = true;


          }
          else {
            debugger;
            this.MedicalBillRegisterTable = false;
            this.MedicalBillSummaryTable = false;
            this.MBS_label = false;

            Swal.fire({
              type: 'warning',
              title: 'No Data Found',
            })
          }

        });

    }

  }
}


