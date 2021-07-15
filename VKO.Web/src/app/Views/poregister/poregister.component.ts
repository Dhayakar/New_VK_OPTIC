
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatTableDataSource, MatSort, MAT_DATE_FORMATS, DateAdapter, MAT_DATE_LOCALE } from '@angular/material';
import { CommonService } from '../../shared/common.service';
import { PurchaseOrdRegView } from '../../Models/ViewModels/purchase-ord-reg-view.model';
import Swal from 'sweetalert2';
import { Checkbox } from 'primeng/checkbox';
import html2canvas from 'html2canvas'

import * as XLSX from 'xlsx';
import * as _l from 'lodash';
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
  selector: 'app-poregister',
  templateUrl: './poregister.component.html',
  styleUrls: ['./poregister.component.less'],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },

  ]
})
export class PoregisterComponent implements OnInit {

  @ViewChild('P_OrdRegForm') Form: NgForm;
  @ViewChild('sortCol1') sortCol1: MatSort;
  @ViewChild('sortCol2') sortCol2: MatSort;

  MFromDate;
  MToDate;
  cancelblock;
  backdrop;
  position = 'before';



  poRegTableLabel: boolean = false;
  purchaseOrderRegTable: boolean = false;
  INCLUDEpoRegTableLabel: boolean = false;
  INCLUDEpurchaseOrderRegTable: boolean = false;
  //checked: boolean = false;
  show: boolean = false;

  getTotPOValue() {
    var TotPOValue = this.commonService.data.getPO_Reg.map(t => t.Tot_Po_val).reduce((acc, value) => acc + value, 0);
    TotPOValue = parseFloat(TotPOValue.toFixed(2));
    return TotPOValue;
  }

  getTotTaxValue() {
    var TotTaxValue = this.commonService.data.getPO_Reg.map(t => t.Tot_Tax_val).reduce((acc, value) => acc + value, 0);
    TotTaxValue = parseFloat(TotTaxValue.toFixed(2));
    return TotTaxValue;
  }
  getTotDisValue() {
    var TotTDisValue = this.commonService.data.getPO_Reg.map(t => t.Tot_Dis_val).reduce((acc, value) => acc + value, 0);
    TotTDisValue = parseFloat(TotTDisValue.toFixed(2));
    return TotTDisValue;
  }
  getTotGrossProdValue() {
    var TotTGrossProdValue = this.commonService.data.getPO_Reg.map(t => t.Gross_Prod_val).reduce((acc, value) => acc + value, 0);
    TotTGrossProdValue = parseFloat(TotTGrossProdValue.toFixed(2));
    return TotTGrossProdValue;
  }

  getTotGrossProdValue1() {
    var TotTGrossProdValue1 = this.commonService.data.getPO_Reg1.map(t => t.Gross_Prod_val1).reduce((acc, value) => acc + value, 0);
    TotTGrossProdValue1 = parseFloat(TotTGrossProdValue1.toFixed(2));
    return TotTGrossProdValue1;
  }

  getTotDisValue1() {
    var TotTDisValue1 = this.commonService.data.getPO_Reg1.map(t => t.Tot_Dis_val1).reduce((acc, value) => acc + value, 0);
    TotTDisValue1 = parseFloat(TotTDisValue1.toFixed(2));
    return TotTDisValue1;
  }
  getTotTaxValue1() {
    var TotTaxValue1 = this.commonService.data.getPO_Reg1.map(t => t.Tot_Tax_val1).reduce((acc, value) => acc + value, 0);
    TotTaxValue1 = parseFloat(TotTaxValue1.toFixed(2));
    return TotTaxValue1;
  }

  getTotPOValue1() {
    var TotPOValue1 = this.commonService.data.getPO_Reg1.map(t => t.Tot_Po_val1).reduce((acc, value) => acc + value, 0);
    TotPOValue1 = parseFloat(TotPOValue1.toFixed(2));
    return TotPOValue1;
  }
  constructor(public commonService: CommonService<PurchaseOrdRegView>) { }

  minToDate = new Date();

  maxDate(): string {
    return new Date().toISOString().split('T')[0]
  }

  CheckToDate() {
    debugger;
    this.minToDate = this.MFromDate;
  }

  Cancel() {
    if (this.MFromDate != null || this.MToDate != null) {
      this.backdrop = 'block';
      this.cancelblock = 'block';

      //var ischecked = document.getElementById('cbconditioning').checked;
      //document.getElementById('cbconditioning').checked = !ischecked;


    }

    else {
      this.Form.onReset();
      this.poRegTableLabel = false;
      this.purchaseOrderRegTable = false;
      this.INCLUDEpoRegTableLabel = false
      this.INCLUDEpurchaseOrderRegTable = false


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
    this.poRegTableLabel = false;
    this.purchaseOrderRegTable = false;
    this.INCLUDEpoRegTableLabel = false
    this.INCLUDEpurchaseOrderRegTable = false


    // this.checked = false;  
  }



  /*'Dlvry_Name', 'Dlvry_Addrss', 'Location',*/
  displayedColumns: string[] = ['PoNo', 'PoDate', 'Q_No', 'Q_Date', 'VendorName', 'Gross_Prod_val', 'Tot_Dis_val', 'Tot_Tax_val', 'Tot_Po_val', 'PO_status'];
  dataSource = new MatTableDataSource();


  displayedColumns1: string[] = ['PoNo1', 'PoDate1', 'Parent_No1', 'Parent_Date1', 'VendorName1', 'Dlvry_Name1', 'Dlvry_Addrss1', 'Location1', 'Gross_Prod_val1', 'Tot_Dis_val1', 'Tot_Tax_val1', 'Tot_Po_val1', 'PO_status1'];
  dataSource1 = new MatTableDataSource();

  //  @ViewChild(MatSort) sort: MatSort;
  TransactionId;
  ngOnInit() {

    this.commonService.getListOfData('User/GetModuletransactiondetails/' + localStorage.getItem('MenuDescription') + '/' + localStorage.getItem('CompanyID'))
      .subscribe(data => {
        debugger;
        this.TransactionId = data.transactionid;

      });
  }

  M_FromDate;
  M_ToDate;

  checked;
  onSubmit(form: NgForm) {
    if (form.valid) {

      debugger;

      this.M_FromDate = this.MFromDate.toISOString();
      this.M_ToDate = this.MToDate.toISOString();

      this.commonService.getListOfData('PurchaseOrderReg/getPO_Reg/' + this.M_FromDate + '/' + this.M_ToDate + '/' + parseInt(localStorage.getItem("CompanyID")) + '/' + this.TransactionId)
        .subscribe(data => {
          debugger;
          if (data.getPO_Reg.length > 0) {

            // this.dataSource.data = data.getPO_Reg;
            this.commonService.data.getPO_Reg = data.getPO_Reg;
            this.dataSource.data = this.commonService.data.getPO_Reg;
            this.dataSource.sort = this.sortCol1;
            this.poRegTableLabel = true;
            this.purchaseOrderRegTable = true;
            this.checked = false
            this.INCLUDEpoRegTableLabel = false;
            this.INCLUDEpurchaseOrderRegTable = false;




          }
          else {
            this.poRegTableLabel = false;
            this.purchaseOrderRegTable = false;
            this.INCLUDEpoRegTableLabel = false
            this.INCLUDEpurchaseOrderRegTable = false


            Swal.fire({
              type: 'warning',
              title: 'No Data Found',
            })
          }

        });


    }
  }

  Isvisible: boolean = false
  Showdiv;
  ShowHide() {
    this.Isvisible = this.Showdiv

  }


  getcanceldata(form: NgForm) {
    debugger;
    if (form.valid) {
      // this.ModelData.checked = value
      // this.checked = value;
      debugger;
      this.M_FromDate = this.MFromDate.toISOString();
      this.M_ToDate = this.MToDate.toISOString();

      this.commonService.getListOfData('PurchaseOrderReg/getPO_Reg1/' + this.M_FromDate + '/' + this.M_ToDate + '/' + parseInt(localStorage.getItem("CompanyID")) + '/' + this.TransactionId)
        .subscribe(data => {
          debugger;
          if (data.getPO_Reg1.length > 0) {

            this.commonService.data.getPO_Reg1 = data.getPO_Reg1;
            this.commonService.data.getPO_Reg1 = _l.orderBy(this.commonService.data.getPO_Reg1, 'Parent_No1');



            this.dataSource1.data = this.commonService.data.getPO_Reg1;
            debugger;
            this.dataSource1.sort = this.sortCol2;



            if (this.checked == true) {

              this.INCLUDEpoRegTableLabel = true;
              this.INCLUDEpurchaseOrderRegTable = true;
              this.dataSource1.sort = this.sortCol2;
              this.poRegTableLabel = false;
              this.purchaseOrderRegTable = false;
            }
            if (this.checked == false) {

              this.INCLUDEpoRegTableLabel = false;
              this.INCLUDEpurchaseOrderRegTable = false;

              this.poRegTableLabel = true;
              this.purchaseOrderRegTable = true;

            }

          }

          else {
            this.poRegTableLabel = false;
            this.purchaseOrderRegTable = false;
            this.INCLUDEpoRegTableLabel = false
            this.INCLUDEpurchaseOrderRegTable = false

            Swal.fire({
              type: 'warning',
              title: 'No Data Found',
            })
            this.Form.onReset();
          }
        });
    }



  }








  @ViewChild('PORegTable') PORegTable: ElementRef;
  @ViewChild('table') table: ElementRef;
  getPdf() {
    debugger;
    var data = document.getElementById('PORegTable');
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
      //pdf.save('PurchaseOrderRegister.pdf'); // Generated PDF   
    });


  }

  getExcel() {
    debugger;
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.table.nativeElement);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    XLSX.writeFile(wb, 'PurchaseOrderRegister.xlsx');

  }


  @ViewChild('PORegTable1') PORegTable1: ElementRef;
  @ViewChild('table1') table1: ElementRef;

  getPdf1() {
    debugger;
    var data = document.getElementById('PORegTable1');

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
      //pdf.save('IncludeCancelledPORegister.pdf'); // Generated PDF   
    });


  }
  getExcel1() {
    debugger;
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.table1.nativeElement);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    XLSX.writeFile(wb, 'IncludeCancelledPORegister.xlsx');
  }
}
