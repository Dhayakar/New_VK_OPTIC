import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatTableDataSource, MatSort } from '@angular/material';
import { VendorMasters, Opticamreturnsubmitdetails } from 'src/app/Models/ViewModels/VendorMasterWebModel';
import { CommonService } from 'src/app/shared/common.service';
import { NgForm } from '@angular/forms';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';
import { CustomerOrderViewModel } from 'src/app/Models/ViewModels/CustomerOrderViewModel';
import { Payment_Master } from 'src/app/Models/PaymentWebModel ';
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
  selector: 'app-expense-tran',
  templateUrl: './expense-tran.component.html',
  styleUrls: ['./expense-tran.component.less'],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class ExpenseTranComponent implements OnInit {

  constructor(public el: ElementRef,
    public commonService: CommonService<CustomerOrderViewModel>,
    private router: Router,
    public dialog: MatDialog, public Datepipe: DatePipe) { }

  displayedColumns = ['Sno','Description', 'Amt', 'Actions'];
  dataSource = new MatTableDataSource();
  displayedColumns3: string[] = ['PaymentMode', 'BankName', 'InstrumentNumber', 'InstrumentDate', 'ExpiryDate', 'Branch', 'Amount', 'Action'];
  dataSource3 = new MatTableDataSource();
  @ViewChild('ExpensetranForm') Form: NgForm
  @ViewChild(MatSort) sort: MatSort;
  DLDateMAXop = new Date();
  M_DAte;
  M_Paidto;
  Paymentsmodes;
  Country1;
  Country2;
  isNextButton = true;
  isNextupdate = true;
  isNextDelete = true;
  isNextPrint = true;
  accesspopup1;
  accessdata;
  backdrop;

  ngOnInit() {
    var Pathname = "ExpenseModule/ExpTran";
    var n = Pathname;
    var sstring = n.includes("/");
    this.commonService.data = new CustomerOrderViewModel();
    var Objdata = JSON.parse(localStorage.getItem("AllCollectionData"));
    if (sstring == false) {
      if (Objdata.find(el => el.Parentmoduledescription === Pathname)) {
        this.commonService.data.paymenttran = [];
        this.commonService.getListOfData('Common/GetAccessdetails/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem("userroleID") + '/' + Pathname).subscribe(data => {
          debugger;
          this.accessdata = data.GetAvccessDetails;

          this.commonService.data.CustomerItemOrders = [];
          this.commonService.data.paymenttran = [];
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
    } else {
      if (Objdata.find(el => el.Parentmoduledescription === Pathname)) {
        this.commonService.data.paymenttran = [];
        this.commonService.getListOfData('Common/GetAccessdetailsstring/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem("userroleID") + '/' + Pathname).subscribe(data => {
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
    }

  }
  getalldropdowons() {    
    this.commonService.getListOfData('Common/Getpaymentvalues').subscribe(data => { this.Paymentsmodes = data; });
    this.commonService.getListOfData('Common/GetCurrencyvalues/' + localStorage.getItem('CompanyID')).subscribe(data => {
      this.Country1 = data;
      this.Country2 = this.Country1[0].Text;
    });
  }

  Getformaccess() {
    var Pathname = "ExpenseModule/ExpTran";
    var n = Pathname;
    var sstring = n.includes("/");
    if (sstring == false) {
      this.commonService.getListOfData('Common/GetAccessdetails/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem("userroleID") + '/' + Pathname).subscribe(data => {
        debugger;
        this.accessdata = data.GetAvccessDetails;
        this.backdrop = 'block';
        this.accesspopup1 = 'block';
      });
    }
    else if (sstring == true) {
      this.commonService.getListOfData('Common/GetAccessdetailsstring/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem("userroleID") + '/' + Pathname).subscribe(data => {
        debugger;
        this.accessdata = data.GetAvccessDetails;
        this.backdrop = 'block';
        this.accesspopup1 = 'block';
      });
    }
  }
  modalcloseAccessOk() {
    this.backdrop = 'none';
    this.accesspopup1 = 'none';
  }
  clear() {
    this.Form.reset();

  }
  PaymentChange(id, event, element) {
    var arraydata = this.commonService.data.paymenttran.filter(t => t.PaymentMode == "Cash").length;
    if (arraydata == 1 && event.value == "Cash") {
      Swal.fire({
        type: 'warning',
        title: 'warning',
        text: 'Data already exists',
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          popup: 'alert-warp',
          container: 'alert-container',
        },
      });
      this.commonService.data.paymenttran.splice(id, 1);
      this.dataSource3.data.splice(id, 1)
      this.dataSource3._updateChangeSubscription();
    }
    else {
      element.PaymentMode = event.value;
    }
  }
  BankName(event, element) {
    element.BankName = event.target.value;
  }
  InstrumentNumber(event, element) {
    element.InstrumentNumber = event.target.value;
  }
  dateofinstrument(event, element) {
    element.Instrumentdate = event.target.value;
  }
  dateexpiry(event, element) {
    element.Expirydate = event.target.value;
  }
  Branch(event, element) {
    element.BankBranch = event.target.value;
  }
  paydel1;
  paydel2;
  AddPaymentDetailsNewgrid() {
    debugger;
    this.paydel1 = [];
    this.paydel2 = [];
    var paydel = this.commonService.data.paymenttran;
    if (this.commonService.data.paymenttran.length == 0) {
      var paydetails = new Payment_Master();
      paydetails.PaymentMode = "";
      paydetails.InstrumentNumber = "";
      paydetails.Instrumentdate = null;
      paydetails.BankName = "";
      paydetails.BankBranch = "";
      paydetails.Expirydate = null;
      paydetails.Amount = 0;
      this.commonService.data.paymenttran.push(paydetails);
      this.dataSource3.data = this.commonService.data.paymenttran;
      this.dataSource3._updateChangeSubscription();
      return;
    }
  }

  Submit(Form: NgForm) {
    debugger;
    if (Form.valid) {

    } else {

    }
  }



  /////////////////////////////////////////////////////////The End////////////////////////////////////////////////////
}
