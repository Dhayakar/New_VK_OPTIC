import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CommonService } from '../../shared/common.service';
import { CancelPORegView } from '../../Models/ViewModels/cancel-poreg-view.model';
import Swal from 'sweetalert2';
import { MatTableDataSource, MatSort, DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import html2canvas from 'html2canvas'

import * as XLSX from 'xlsx';

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
  selector: 'app-pocanncelledregister',
  templateUrl: './pocanncelledregister.component.html',
  styleUrls: ['./pocanncelledregister.component.less'],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },

  ]
})
export class PocanncelledregisterComponent implements OnInit {

  @ViewChild('C_Po_OrdForm') Form: NgForm
  MFromDate;
  MToDate;
  cancelblock;
  backdrop;
  C_POLable: boolean = false;
  CancelledPoOrderTable: boolean = false;
  Export_Cancelled_PO_Det: boolean = false;

  minToDate = new Date();
  //'Dlvry_Name', 'Dlvry_Addrss', 'Location',
  displayedColumns: string[] = ['S_no', 'PoNo', 'PoDate', 'Parent_No', 'Parent_Date', 'VendorName', 'Gross_Prod_val', 'Tot_Dis_val', 'Tot_Tax_val', 'Tot_Po_val'];
  dataSource = new MatTableDataSource();

  maxDate(): string {
    return new Date().toISOString().split('T')[0]
  }

  CheckToDate() {
    debugger;
    this.minToDate = this.MFromDate;
  }

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


    this.backdrop = 'none';
    this.cancelblock = 'none';
    this.C_POLable = false;
    this.CancelledPoOrderTable = false;
    this.Export_Cancelled_PO_Det = false;

  }
  getTotGrossProdValue() {
    var TotProdValue = this.commonService.data.getC_PO_Reg.map(t => t.Gross_Prod_val).reduce((acc, value) => acc + value, 0);
    TotProdValue = parseFloat(TotProdValue.toFixed(2));
    return TotProdValue;
  }
  getTotDisValue() {
    var TotDisValue = this.commonService.data.getC_PO_Reg.map(t => t.Tot_Dis_val).reduce((acc, value) => acc + value, 0);
    TotDisValue = parseFloat(TotDisValue.toFixed(2));
    return TotDisValue;
  }
  getTotTaxValue() {
    var TotTaxValue = this.commonService.data.getC_PO_Reg.map(t => t.Tot_Tax_val).reduce((acc, value) => acc + value, 0);
    TotTaxValue = parseFloat(TotTaxValue.toFixed(2));
    return TotTaxValue;
  }
  getTotPOValue() {
    debugger;
    var TotPOValue = this.commonService.data.getC_PO_Reg.map(t => t.Tot_Po_val).reduce((acc, value) => acc + value, 0);
    TotPOValue = parseFloat(TotPOValue.toFixed(2));
    return TotPOValue;
  }

  TransactionId;
  constructor(public commonService: CommonService<CancelPORegView>) { }

  @ViewChild(MatSort) sort: MatSort;
  ngOnInit() {
    this.commonService.getListOfData('User/GetModuletransactiondetails/' + localStorage.getItem('MenuDescription') + '/' + localStorage.getItem('CompanyID'))
      .subscribe(data => {
        debugger;
        this.TransactionId = data.transactionid;

      });
  }

  M_FromDate;
  M_ToDate;
  onSubmit(form: NgForm) {

    debugger;
    if (form.valid) {
      debugger;

      this.M_FromDate = this.MFromDate.toISOString();
      this.M_ToDate = this.MToDate.toISOString();

      this.commonService.getListOfData('CancelPOReg/getC_PO_Reg/' + this.M_FromDate + '/' + this.M_ToDate + '/' + this.TransactionId + '/' + parseInt(localStorage.getItem("CompanyID")))
        .subscribe(data => {
          debugger;
          if (data.getC_PO_Reg.length > 0) {
            // this.commonService.data = data;
            // this.dataSource.data = data.getC_PO_Reg;
            // this.dataSource.sort = this.sort;

            this.commonService.data.getC_PO_Reg = data.getC_PO_Reg;
            this.dataSource.data = this.commonService.data.getC_PO_Reg;
            this.dataSource.sort = this.sort;
            this.C_POLable = true;
            this.CancelledPoOrderTable = true;
            this.Export_Cancelled_PO_Det = true;
          }
          else {

            Swal.fire({
              type: 'warning',
              title: 'No Data Found',
            })

            this.C_POLable = false;
            this.CancelledPoOrderTable = false;
            this.Export_Cancelled_PO_Det = false;
          }

        });
    }


  }

  @ViewChild('CPOTable') CPOTable: ElementRef;
  @ViewChild('table') table: ElementRef;

  getPdf() {
    debugger;
    var data = document.getElementById('CPOTable');
    html2canvas(data).then(canvas => {
      var imgWidth = 215;
      var pageHeight = 55;
      //var imgHeight = canvas.height * imgWidth / canvas.width;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      var heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL('image/PDF')
      //let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF  
      var position = 5;
      //pdf.addImage(contentDataURL, 'PDF', -2, position, imgWidth, imgHeight)
      //pdf.save('CancelledPODetails.pdf'); // Generated PDF   
    });


  }
  getExcel() {

    debugger;
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.table.nativeElement);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    XLSX.writeFile(wb, 'CanncelledPODetails.xlsx');
  }



}

