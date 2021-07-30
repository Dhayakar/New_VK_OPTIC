import { Component, OnInit, ElementRef, ViewChild, QueryList, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatTableDataSource, MatSort, MatSelect, MatInput } from '@angular/material';
import { VendorMasters, Opticamreturnsubmitdetails } from 'src/app/Models/ViewModels/VendorMasterWebModel';
import { CommonService } from 'src/app/shared/common.service';
import { NgForm } from '@angular/forms';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';
import { ExpenseViewModel, Expesneitemdata } from 'src/app/Models/ViewModels/ExpenseViewModel';
import { Payment_Master } from 'src/app/Models/PaymentWebModel ';
import { any } from '@amcharts/amcharts4/.internal/core/utils/Array';
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
    public commonService: CommonService<ExpenseViewModel>,
    private router: Router,
    public dialog: MatDialog, public Datepipe: DatePipe) { }

  displayedColumns = ['Sno', 'Description', 'Remmrk', 'Amt', 'Actions'];
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
  disableRow = true;
  accesspopup1;
  accessdata;
  backdrop;
  TotalAmt;
  Tc;
  //Master Variables

  Hideupdatebtn: boolean = false;
  hidestatustable: boolean = false;
  Hidesubmitbtn: boolean = false;
  M_Description;
  activecol;
  Dataid;
  Datadesc;
  DataStatus;

  ngOnInit() {

    this.Hidesubmitbtn = true;
    this.TotalAmt = 0;
    this.M_DAte = new Date();
    var Pathname = "ExpenseModule/ExpTran";
    var n = Pathname;
    this.DateChange();
    this.getalldropdowons();
    var sstring = n.includes("/");
    this.commonService.data = new ExpenseViewModel();
    this.commonService.data.paymenttran = [];
    this.commonService.data.Expesneitemdata = [];
    var Objdata = JSON.parse(localStorage.getItem("AllCollectionData"));
    if (sstring == false) {
      if (Objdata.find(el => el.Parentmoduledescription === Pathname)) {
        this.commonService.data.paymenttran = [];
        this.commonService.getListOfData('Common/GetAccessdetails/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem("userroleID") + '/' + Pathname).subscribe(data => {
          debugger;
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
        setTimeout(() => {
          let res1 = Objdata.find(x => x.Parentmoduledescription == Pathname);
          this.Tc = res1.TransactionID;
          if (this.Tc == null || this.Tc == undefined) {
            this.isNextButton = true;
            Swal.fire({
              type: 'warning',
              title: 'Transaction Id Undefined',
              position: 'top-end',
              showConfirmButton: false,
              timer: 1500,
              customClass: {
                popup: 'alert-warp',
                container: 'alert-container',
              },
            });
          }
        }, 1000)

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
        setTimeout(() => {
          let res1 = Objdata.find(x => x.Parentmoduledescription == Pathname);
          this.Tc = res1.TransactionID;
          if (this.Tc == null || this.Tc == undefined) {
            this.isNextButton = true;
            Swal.fire({
              type: 'warning',
              title: 'Transaction Id Undefined',
              position: 'top-end',
              showConfirmButton: false,
              timer: 1500,
              customClass: {
                popup: 'alert-warp',
                container: 'alert-container',
              },
            });
          }
        }, 1000)
      }
    }

  }

  processQ() {


  }
  DummyHistorydata;
  expensearry;
  getalldropdowons() {
    debugger;
    this.commonService.getListOfData('Common/Getpaymentvalues').subscribe(data => {
      this.Paymentsmodes = data;
      localStorage.setItem('paymodedrop', JSON.stringify(this.Paymentsmodes));
      this.Paymentsmodes = JSON.parse(localStorage.getItem('paymodedrop'));
    });
    this.commonService.getListOfData('Common/GetCurrencyvalues/' + localStorage.getItem('CompanyID')).subscribe(data => {
      this.Country1 = data;
      this.Country2 = this.Country1[0].Text;
    });
    this.commonService.getListOfData('Expense/GetactiveExpenseMaster/' + localStorage.getItem("CompanyID"))
      .subscribe(data => {
        if (data.length != 0) {
          this.expensearry = data;
          localStorage.setItem('Expensedrop', JSON.stringify(this.expensearry));
          //this.DummyHistorydata = data;          
        }
      });
  }

  RestrictNegativeValues(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      if ((charCode > 34 && charCode < 41) || charCode == 46) {
        return true;
      }
      return false;
    }
    return true;
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
  clear(Form: NgForm) {
    this.router.navigateByUrl('/dash', { skipLocationChange: true }).then(() => {
      this.router.navigate(['ExpenseModule/ExpTran']);
    });
  }
  @ViewChildren('BankName') BankNamee: QueryList<ElementRef>;
  beforebankname(i, event, element) {
    debugger;
    setTimeout(() => {
      this.BankNamee.toArray()[i].nativeElement.focus();
    });

  }
  @ViewChildren('Amount') PaymentModeleft: QueryList<ElementRef>;
  arrowlefPaymentMode(i, event, element) {
    debugger;
    if (element.PaymentMode == "Cash") {
      setTimeout(() => {
        this.PaymentModeleft.toArray()[i].nativeElement.focus();
      });
    }
    else {
      setTimeout(() => {
        this.PaymentModeleft.toArray()[i].nativeElement.focus();
      });
    }
  }
  DistanceODtablepress(event): boolean {
    debugger;
    const currentChar = parseInt(String.fromCharCode(event.keyCode), 10);
    if (!isNaN(currentChar)) {
      const nextValue = $('#tablepress').val() + currentChar;
      if (parseInt(nextValue, 10) < 0) {
        return true;
      }
    }
    return false;
  }

  @ViewChildren('PaymentModee') PaymentModee: QueryList<MatSelect>;
  enterPaymentMode(i) {
    this.PaymentModee.toArray()[i].open();
  }
  @ViewChildren('BankName') BankNameright: QueryList<ElementRef>;
  arrowrightPaymentMode(i, event, element) {
    debugger;
    if (element.PaymentMode == "Cash") {
      setTimeout(() => {
        this.PaymentModeleft.toArray()[i].nativeElement.focus();
      });
    }
    else {
      setTimeout(() => {
        this.BankNameright.toArray()[i].nativeElement.focus();
      });
    }
  }
  payarray = [];
  @ViewChildren('PaymentMode') PaymentModeDown: QueryList<ElementRef>;
  arrowdownPaymentMode(i, event, element) {
    debugger;
    setTimeout(() => {
      let id = i + 1;
      this.PaymentModeDown.toArray()[id].nativeElement.focus();
    });
  }
  @ViewChildren('PaymentMode') PaymentModeUp: QueryList<ElementRef>;
  arrowupPaymentMode(i, event, element) {
    debugger;
    setTimeout(() => {
      let id = i - 1;
      this.PaymentModeUp.toArray()[id].nativeElement.focus();
    });

  }
  @ViewChild('PaymentModee') PaymentModeeD: MatSelect;
  savePaymentMode(i, event, element) {
    debugger;
    this.PaymentModeeD.valueChange.subscribe(value => {

      var cash = this.payarray.filter(t => t.PaymentMode == "Cash").length;
      if (cash == 1 && event.value == "Cash") {
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
        this.payarray.splice(i, 1);
        this.commonService.data.PaymentMaster.splice(i, 1);
        this.dataSource3.data = this.commonService.data.PaymentMaster;
        this.dataSource3._updateChangeSubscription();
        return;
      }
      this.payarray[i].PaymentMode = value;
      this.commonService.data.PaymentMaster[i].PaymentMode = value;
      this.Paymentsmodes = JSON.parse(localStorage.getItem('paymodedrop'));

      if (element.PaymentMode == "Cash") {
        this.arrowlefPaymentMode(i, event, element);
      } else {
        this.beforebankname(i, event, element);
      }

    });
  }
  @ViewChildren('inputpaymode') inputpaymode: QueryList<ElementRef>;
  @ViewChild('inputpaymode', { read: MatInput }) inputm: MatInput;
  someMethodPaymentMode(i, event, element) {
    debugger;
    this.Paymentsmodes = JSON.parse(localStorage.getItem('paymodedrop'));
    setTimeout(() => {
      this.inputpaymode.toArray()[i].nativeElement.focus();
    });
    this.inputm.value = '';

  }

  @ViewChildren('ExpenseRemarks') ExpenseRemarkse: QueryList<ElementRef>;
  beforeExpensename(i, event, element) {
    debugger;
    setTimeout(() => {
      this.ExpenseRemarkse.toArray()[i].nativeElement.focus();
    });

  }
  DescriptionexpenseName(i) {
    this.ExpensearrowrightBankName(i);
  }
  @ViewChildren('Expenseamt') Expenseamtss: QueryList<ElementRef>;
  ExpensearrowrightBankName(i) {
    debugger;
    setTimeout(() => {
      this.Expenseamtss.toArray()[i].nativeElement.focus();
    });
  }


  PaymentChangee(i, event, element) {

    var cash = this.payarray.filter(t => t.PaymentMode == "Cash").length;
    if (cash == 1 && event.value == "Cash") {

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
      this.payarray.splice(i, 1);
      this.commonService.data.PaymentMaster.splice(i, 1);
      this.dataSource3.data = this.commonService.data.PaymentMaster;
      this.dataSource3._updateChangeSubscription();
      return;
    }
    this.payarray[i].PaymentMode = event.value;
    this.commonService.data.PaymentMaster[i].PaymentMode = event.value;
    this.Paymentsmodes = JSON.parse(localStorage.getItem('paymodedrop'));

    if (element.PaymentMode == "Cash") {
      this.arrowlefPaymentMode(i, event, element);
    } else {
      this.beforebankname(i, event, element);
    }

    if (event.value == "Cash") {
      this.payarray[i].BankName = "";
      this.payarray[i].InstrumentNumber = "";
      this.payarray[i].Instrumentdate = null;
      this.payarray[i].Expirydate = null;
      this.payarray[i].BankBranch = "";
      this.commonService.data.PaymentMaster[i].BankName = "";
      this.commonService.data.PaymentMaster[i].InstrumentNumber = "";
      this.commonService.data.PaymentMaster[i].Instrumentdate = null;
      this.commonService.data.PaymentMaster[i].Expirydate = null;
      this.commonService.data.PaymentMaster[i].BankBranch = "";
    }
    else if (event.value == "Credit Card") {

      this.payarray[i].Instrumentdate = null;
      this.payarray[i].BankBranch = "";
      this.commonService.data.PaymentMaster[i].Instrumentdate = null;
      this.commonService.data.PaymentMaster[i].BankBranch = "";
    }

    else if (event.value == "Debit card") {

      this.payarray[i].Instrumentdate = null;
      this.payarray[i].BankBranch = "";
      this.commonService.data.PaymentMaster[i].Instrumentdate = null;
      this.commonService.data.PaymentMaster[i].BankBranch = "";
    }

  }

  @ViewChildren('PaymentModee') PaymentModeemySelectclose: QueryList<MatSelect>;
  arrowrightPaymentModee(i, event, element) {
    this.PaymentModeemySelectclose.toArray()[i].close();
    this.arrowrightPayment(i);
  }

  @ViewChildren('PaymentMode') PaymentModeright: QueryList<ElementRef>;
  arrowrightPayment(i) {
    debugger;
    setTimeout(() => {
      this.PaymentModeright.toArray()[i].nativeElement.focus();
    });
  }

  FIlterdatapaymode(value: string) {
    debugger;
    const Objdata = JSON.parse(localStorage.getItem('paymodedrop'));
    const filterValue = value.toLowerCase();
    this.Paymentsmodes = Objdata.filter(option => option.Text.toLowerCase().includes(filterValue));
  }

  @ViewChildren('ExpenseMode') ExpenseMode: QueryList<ElementRef>;
  ExpenseModefirst(i) {
    debugger;
    setTimeout(() => {
      this.ExpenseMode.toArray()[i].nativeElement.focus();
    });
  }

  @ViewChildren('inputExpensemode') inputExpensemode: QueryList<ElementRef>;
  @ViewChild('inputExpensemode', { read: MatInput }) inputExpensemodem: MatInput;
  someMethodExpenseMode(i, event, element) {
    debugger;
    this.expensearry = JSON.parse(localStorage.getItem('Expensedrop'));
    setTimeout(() => {
      this.inputExpensemode.toArray()[i].nativeElement.focus();
    });
    this.inputExpensemodem.value = '';

  }

  @ViewChildren('ExpenseModee') ExpenseModee: QueryList<MatSelect>;
  enterexpenseMode(i) {
    this.ExpenseModee.toArray()[i].open();
  }
  //arrowrightexpenseModee(i, event, element) {
  //  this.PaymentModeemySelectclose.toArray()[i].close();
  //  this.arrowrightPayment(i);
  //}
  DescriptionChange(id, event, element) {
    debugger;
    let result = event.value;
    this.commonService.data.Expesneitemdata.map((todo, i) => {
      if (i == id) {
        const lengthdifference = this.commonService.data.Expesneitemdata.some(g => g.ID == result)
        if (lengthdifference == false) {
          this.commonService.data.Expesneitemdata[i].ID = Number(result);
          var deesc = this.expensearry.filter(x => x.ID === Number(result)).map(x => x.Description);
          this.commonService.data.Expesneitemdata[i].Expensedescription = deesc[0];
          var index = this.commonService.data.Expesneitemdata.findIndex(g => g.Expensedescription == deesc[0]);
          this.beforeExpensename(index, event, element);
        } else {
          this.commonService.data.Expesneitemdata.splice(id, 1);
          this.dataSource._updateChangeSubscription();
          var paydetails = new Expesneitemdata();
          paydetails.ID = null;
          paydetails.Expensedescription = "";
          paydetails.Remarks = "";
          paydetails.Amount = 0;
          localStorage.setItem("Expmode", JSON.stringify(this.commonService.data.Expesneitemdata));
          this.Expensearray = JSON.parse(localStorage.getItem("Expmode"));
          this.Expensearray.unshift(paydetails);
          this.commonService.data.Expesneitemdata = this.Expensearray;
          this.dataSource.data = this.commonService.data.Expesneitemdata;
          this.dataSource._updateChangeSubscription();
          let disph = this.commonService.data.Expesneitemdata[0].Expensedescription;
          let index = this.commonService.data.Expesneitemdata.findIndex(x => x.Expensedescription == disph);
          this.ExpenseModefirst(index);
          Swal.fire({
            type: 'warning',
            title: 'warning',
            text: 'Description already exists',
            position: 'top-end',
            showConfirmButton: false,
            timer: 1500,
            customClass: {
              popup: 'alert-warp',
              container: 'alert-container',
            },
          });
        }
      }
    });
  }
Expensearray = [];
  AddExpenseNewgrid() {
    debugger;
    if (this.Expensearray.length != 0) {
      const lengthdifference = this.commonService.data.Expesneitemdata.some(g => g.Expensedescription == "" && g.Amount == 0)
      if (lengthdifference == false) {
        var paydetails = new Expesneitemdata();
        paydetails.ID = null;
        paydetails.Expensedescription = "";
        paydetails.Remarks = "";
        paydetails.Amount = 0;
        localStorage.setItem("Expmode", JSON.stringify(this.commonService.data.Expesneitemdata));
        this.Expensearray = JSON.parse(localStorage.getItem("Expmode"));
        this.Expensearray.unshift(paydetails);
        this.commonService.data.Expesneitemdata = this.Expensearray;       
        this.dataSource.data = this.commonService.data.Expesneitemdata;
        this.dataSource._updateChangeSubscription();
        let disph = this.commonService.data.Expesneitemdata[0].Expensedescription;
        let index = this.commonService.data.Expesneitemdata.findIndex(x => x.Expensedescription == disph);
        this.ExpenseModefirst(index);

        return;
      } else {
        Swal.fire({
          type: 'warning',
          title: 'warning',
          text: 'Enter Values',
          position: 'top-end',
          showConfirmButton: false,
          timer: 1500,
          customClass: {
            popup: 'alert-warp',
            container: 'alert-container',
          },
        });
      }
    } else {
      var paydetails = new Expesneitemdata();
      paydetails.ID = null;
      paydetails.Expensedescription = "";
      paydetails.Remarks = "";
      paydetails.Amount = 0;
      localStorage.setItem("Expmode", JSON.stringify(this.commonService.data.Expesneitemdata));
      this.Expensearray = JSON.parse(localStorage.getItem("Expmode"));
      this.Expensearray.unshift(paydetails);
      this.commonService.data.Expesneitemdata = this.Expensearray;
      this.dataSource.data = this.commonService.data.Expesneitemdata;
      this.dataSource._updateChangeSubscription();
      let disph = this.commonService.data.Expesneitemdata[0].Expensedescription;
      let index = this.commonService.data.Expesneitemdata.findIndex(x => x.Expensedescription == disph);
      this.ExpenseModefirst(index);
      return;
    }

  }


  BankNameenter(id, property: string, event: any) {
    debugger;
    let result = event.target.value;
    this.payarray[id][property] = result;
    this.commonService.data.PaymentMaster[id][property] = result;
    this.dataSource3.filteredData[id][property] = result;
    this.dataSource3._updateChangeSubscription();
  }

  nameField(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if ((charCode > 64 && charCode < 91) || (charCode > 96 && charCode < 123) || charCode == 32 || charCode == 46 || charCode == 9 || (charCode > 34 && charCode < 41) || charCode == 8) {
      return true;
    }
    return false;
  }

  @ViewChildren('PaymentMode') BankNameleft: QueryList<ElementRef>;
  arrowlefBankName(i) {
    debugger;
    setTimeout(() => {
      this.BankNameleft.toArray()[i].nativeElement.focus();
    });
  }

  @ViewChildren('InstrumentNumber') BankNamerightt: QueryList<ElementRef>;
  arrowrightBankName(i) {
    debugger;
    setTimeout(() => {
      this.BankNamerightt.toArray()[i].nativeElement.focus();
    });
  }


  @ViewChildren('BankName') BankNameDown: QueryList<ElementRef>;
  arrowdownBankName(i, event, element) {
    debugger;
    setTimeout(() => {
      let id = i + 1;
      this.BankNameDown.toArray()[id].nativeElement.focus();
    });
  }

  @ViewChildren('BankName') BankNameUp: QueryList<ElementRef>;
  arrowupBankName(i, event, element) {
    debugger;
    setTimeout(() => {
      let id = i - 1;
      this.BankNameUp.toArray()[id].nativeElement.focus();
    });

  }
  DescriptionBankName(i) {
    this.arrowrightBankName(i);
  }
  DescriptionInstrumentNumber(i, event, element) {
    this.arrowrightInstrumentNumber(i, event, element);
  }
  DescriptionInstrumentdate(i, event, element) {
    this.arrowleftBranch(i, event, element);
  }
  DescriptionExpirydate(i, event, element) {
    this.arrowrightInstrumentExpiryDate(i, event, element);
  }

  DescriptionBranch(i) {
    this.arrowrightBranch(i);
  }

  @ViewChildren('Branch') BranchDown: QueryList<ElementRef>;
  arrowdownBranch(i, event, element) {
    debugger;
    setTimeout(() => {
      let id = i + 1;
      this.BranchDown.toArray()[id].nativeElement.focus();
    });
  }

  @ViewChildren('Branch') BranchUp: QueryList<ElementRef>;
  arrowupBranch(i, event, element) {
    debugger;
    setTimeout(() => {
      let id = i - 1;
      this.BranchUp.toArray()[id].nativeElement.focus();
    });

  }

  @ViewChildren('ExpiryDate') Branchleft: QueryList<ElementRef>;
  arrowleftBranch(i, event, element) {
    if (element.PaymentMode == "Demand Draft") {
      setTimeout(() => {
        this.InstrumentNumberright.toArray()[i].nativeElement.focus();
      });
    }
    else {
      setTimeout(() => {
        this.Branchleft.toArray()[i].nativeElement.focus();
      });
    }
  }

  @ViewChildren('Amount') Branchright: QueryList<ElementRef>;
  arrowrightBranch(i) {
    debugger;
    setTimeout(() => {
      this.Branchright.toArray()[i].nativeElement.focus();
    });
  }

  @ViewChildren('Amount') AmountDown: QueryList<ElementRef>;
  arrowdownAmount(i, event, element) {
    debugger;
    setTimeout(() => {
      let id = i + 1;
      this.AmountDown.toArray()[id].nativeElement.focus();
    });
  }

  @ViewChildren('Amount') AmountUp: QueryList<ElementRef>;
  arrowupAmount(i, event, element) {
    debugger;
    setTimeout(() => {
      let id = i - 1;
      this.AmountUp.toArray()[id].nativeElement.focus();
    });

  }

  removePaytype(i) {
    debugger;
    Swal.fire({
      title: 'Are you sure?',
      text: "Want to Delete",
      type: 'warning',
      showCancelButton: true,
      cancelButtonColor: '#d33',
      cancelButtonText: 'No',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Yes',
      allowOutsideClick: false,
      reverseButtons: true,
      focusCancel: true,
    }).then((result) => {
      if (result.value) {
        if (i !== -1) {
          debugger;
          this.payarray.splice(i, 1);
          this.commonService.data.PaymentMaster.splice(i, 1);
          this.dataSource3.data = this.commonService.data.PaymentMaster;
          this.dataSource3._updateChangeSubscription();
        }
    
        Swal.fire({
          type: 'success',
          title: 'success',
          text: 'Deleted successfully',
          position: 'top-end',
          showConfirmButton: false,
          timer: 1500,
          customClass: {
            popup: 'alert-warp',
            container: 'alert-container',
          },
        });
      }

      else {
        Swal.fire({
          type: 'warning',
          title: 'warning',
          text: 'Item Details not deleted',
          position: 'top-end',
          showConfirmButton: false,
          timer: 1500,
          customClass: {
            popup: 'alert-warp',
            container: 'alert-container',
          },
        });
      }
    })

  }

  @ViewChildren('Branch') Amountleft: QueryList<ElementRef>;
  arrowleftAmount(i, event, element) {
    debugger;


    if (element.PaymentMode == "Cash") {
      setTimeout(() => {
        this.Amountright.toArray()[i].nativeElement.focus();
      });
    }
    else if (element.PaymentMode == "Debit card" || element.PaymentMode == "Credit Card") {
      setTimeout(() => {
        this.Branchleft.toArray()[i].nativeElement.focus();
      });
    }
    else {
      setTimeout(() => {
        this.Amountleft.toArray()[i].nativeElement.focus();
      });
    }
  }

  @ViewChildren('PaymentMode') Amountright: QueryList<ElementRef>;
  arrowrightAmount(i) {
    debugger;
    setTimeout(() => {
      this.Amountright.toArray()[i].nativeElement.focus();
    });
  }

  dateofinstrument(id, property: string, event: any) {
    debugger;
    let result = event.target.value;
    this.payarray[id][property] = result;
    this.commonService.data.PaymentMaster[id][property] = result;
    this.dataSource3.filteredData[id][property] = result;
    this.dataSource3._updateChangeSubscription();
  }
  dateExpirydate(id, property: string, event: any) {
    debugger;
    let result = event.target.value;
    this.payarray[id][property] = result;
    this.commonService.data.PaymentMaster[id][property] = result;
    this.dataSource3.filteredData[id][property] = result;
    this.dataSource3._updateChangeSubscription();
  }


  InstrumentNumberenter(id, property: string, event: any) {
    debugger;
    let result = event.target.value;
    this.payarray[id][property] = result;
    this.commonService.data.PaymentMaster[id][property] = result;
    this.dataSource3.filteredData[id][property] = result;
    this.dataSource3._updateChangeSubscription();
  }

  Branchvalue(id, property: string, event: any) {
    debugger;
    let result = event.target.value;
    this.payarray[id][property] = result;
    this.commonService.data.PaymentMaster[id][property] = result;
    this.dataSource3.filteredData[id][property] = result;
    this.dataSource3._updateChangeSubscription();
  }


  @ViewChildren('ExpiryDate') ExpiryDateDown: QueryList<ElementRef>;
  arrowdownInstrumentExpiryDate(i, event, element) {
    debugger;
    setTimeout(() => {
      let id = i + 1;
      this.ExpiryDateDown.toArray()[id].nativeElement.focus();
    });
  }

  @ViewChildren('ExpiryDate') ExpiryDateUp: QueryList<ElementRef>;
  arrowupInstrumentExpiryDate(i, event, element) {
    debugger;
    setTimeout(() => {
      let id = i - 1;
      this.ExpiryDateUp.toArray()[id].nativeElement.focus();
    });

  }

  @ViewChildren('InstrumentDate') ExpiryDateleft: QueryList<ElementRef>;
  arrowlefInstrumentExpiryDate(i, event, element) {
    debugger;

    if (element.PaymentMode == "Debit card" || element.PaymentMode == "Credit Card") {
      setTimeout(() => {
        this.BankNamerightt.toArray()[i].nativeElement.focus();
      });
    }
    else {
      setTimeout(() => {
        this.ExpiryDateleft.toArray()[i].nativeElement.focus();
      });
    }


  }

  @ViewChildren('Branch') ExpiryDateright: QueryList<ElementRef>;
  arrowrightInstrumentExpiryDate(i, event, element) {
    debugger;


    if (element.PaymentMode == "Debit card" || element.PaymentMode == "Credit Card") {
      setTimeout(() => {
        this.PaymentModeleft.toArray()[i].nativeElement.focus();
      });
    }
    else {
      setTimeout(() => {
        this.ExpiryDateright.toArray()[i].nativeElement.focus();
      });
    }

  }



  @ViewChildren('InstrumentDate') InstrumentDateDown: QueryList<ElementRef>;
  arrowdownInstrumentdate(i, event, element) {
    debugger;
    setTimeout(() => {
      let id = i + 1;
      this.InstrumentDateDown.toArray()[id].nativeElement.focus();
    });
  }

  @ViewChildren('InstrumentDate') InstrumentDateUp: QueryList<ElementRef>;
  arrowupInstrumentdate(i, event, element) {
    debugger;
    setTimeout(() => {
      let id = i - 1;
      this.InstrumentDateUp.toArray()[id].nativeElement.focus();
    });

  }

  @ViewChildren('InstrumentNumber') InstrumentDateleft: QueryList<ElementRef>;
  arrowlefInstrumentdate(i, event, element) {
    debugger;
    setTimeout(() => {
      this.InstrumentDateleft.toArray()[i].nativeElement.focus();
    });

  }

  @ViewChildren('ExpiryDate') InstrumentDateright: QueryList<ElementRef>;
  arrowrightInstrumentdate(i, event, element) {
    debugger;

    if (element.PaymentMode == "Demand Draft") {
      setTimeout(() => {
        this.ExpiryDateright.toArray()[i].nativeElement.focus();
      });
    }
    else {
      setTimeout(() => {
        this.InstrumentDateright.toArray()[i].nativeElement.focus();
      });
    }

  }

  @ViewChildren('InstrumentNumber') InstrumentNumberDown: QueryList<ElementRef>;
  arrowdownInstrumentNumber(i, event, element) {
    debugger;
    setTimeout(() => {
      let id = i + 1;
      this.InstrumentNumberDown.toArray()[id].nativeElement.focus();
    });
  }

  @ViewChildren('InstrumentNumber') InstrumentNumberUp: QueryList<ElementRef>;
  arrowupInstrumentNumber(i, event, element) {
    debugger;
    setTimeout(() => {
      let id = i - 1;
      this.InstrumentNumberUp.toArray()[id].nativeElement.focus();
    });

  }

  @ViewChildren('BankName') InstrumentNumberleft: QueryList<ElementRef>;
  arrowlefInstrumentNumber(i) {
    debugger;
    setTimeout(() => {
      this.InstrumentNumberleft.toArray()[i].nativeElement.focus();
    });
  }

  @ViewChildren('InstrumentDate') InstrumentNumberright: QueryList<ElementRef>;
  arrowrightInstrumentNumber(i, event, element) {
    debugger;
    if (element.PaymentMode == "Debit card" || element.PaymentMode == "Credit Card") {
      setTimeout(() => {
        this.InstrumentDateright.toArray()[i].nativeElement.focus();
      });
    }
    else {

      setTimeout(() => {
        this.InstrumentNumberright.toArray()[i].nativeElement.focus();
      });
    }


  }



  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      if ((charCode > 34 && charCode < 41) || charCode == 46) {
        return true;
      }
      return false;
    }
    return true;
  }

  DescriptionAmount(i) {
    this.arrowlefBankName(i);
  }
  PTotalAmount;
  PTotalAmount1() {
    var restotalcost = this.commonService.data.paymenttran.map(t => t.Amount).reduce((acc, value) => acc + value, 0);
    restotalcost = parseFloat(restotalcost.toFixed(2));
    this.PTotalAmount = restotalcost;
    return restotalcost;
  }

  changeQtyValue(id, amt, event: any) {
    debugger;

    let result: number = Number(event.target.value);
    this.commonService.data.Expesneitemdata.map((todo, i) => {
      if (i == id) {
        this.commonService.data.Expesneitemdata[i].Amount = result;
        this.TotalAmt = this.commonService.data.Expesneitemdata.map(t => t.Amount).reduce((acc, value) => acc + value, 0);
        this.dataSource.data = this.commonService.data.Expesneitemdata;
        this.commonService.data.paymenttran = [];
        this.dataSource3.data = null;
        this.dataSource3._updateChangeSubscription();
      }
    });
  }
  Descriptiondisable;
 
  changeRemarks(id, property: string, event: any) {
    debugger;
    let result = (event.target.value);
    this.dataSource.filteredData[id][property] = result;
    this.dataSource._updateChangeSubscription();
    this.commonService.data.Expesneitemdata.map((todo, i) => {
      if (i == id) {
        this.commonService.data.Expesneitemdata[i].Remarks = result;
      }
    });
  }
  Removeitem(id) {
    Swal.fire({
      title: 'Are you sure?',
      text: "Want to Delete",
      type: 'warning',
      showCancelButton: true,
      cancelButtonColor: '#d33',
      cancelButtonText: 'No',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Yes',
      allowOutsideClick: false,
      reverseButtons: true,
      focusCancel: true,
    }).then((result) => {
      if (result.value) {
        debugger;
        if (id !== -1) {
          this.commonService.data.Expesneitemdata.map((todo, i) => {
            if (i == id) {
             // this.dataSource.data.splice(id, 1);
              this.commonService.data.Expesneitemdata.splice(id, 1);
              this.dataSource.data = this.commonService.data.Expesneitemdata;
              this.dataSource._updateChangeSubscription();
              this.TotalAmt = this.commonService.data.Expesneitemdata.map(t => t.Amount).reduce((acc, value) => acc + value, 0);
              this.commonService.data.PaymentMaster = [];
              this.dataSource3.data = null;
              this.dataSource3._updateChangeSubscription();
            }
          });
        }
        Swal.fire({
          type: 'success',
          title: 'success',
          text: 'Deleted Successfully',
          position: 'top-end',
          showConfirmButton: false,
          timer: 1500,
          customClass: {
            popup: 'alert-warp',
            container: 'alert-container',
          },
        });
      }
      else {
        Swal.fire({
          type: 'warning',
          title: 'warning',
          text: 'Item Details not deleted',
          position: 'top-end',
          showConfirmButton: false,
          timer: 1500,
          customClass: {
            popup: 'alert-warp',
            container: 'alert-container',
          },
        });
      }
    })

  }

  PaymentTotalAmount() {
    if (this.commonService.data.PaymentMaster != undefined) {
      return this.commonService.data.PaymentMaster.map(t => t.Amount).reduce((acc, value) => acc + value, 0);
    }
  }
  @ViewChildren('PaymentMode') PaymentMode: QueryList<ElementRef>;
  PaymentModefirst(i) {
    debugger;
    setTimeout(() => {
      this.PaymentMode.toArray()[i].nativeElement.focus();
    });
  }
  Amountcheck(id, property: string, event: any) {
    debugger;
    let result: number = Number(event.target.value);
    let amtresult = parseInt(this.TotalAmt);
    this.commonService.data.PaymentMaster[id][property] = result;
    this.payarray[id][property] = result;

    if (this.PaymentTotalAmount() > amtresult) {
      Swal.fire({
        type: 'warning',
        title: 'Cannot Give More than TotalAmount',
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          popup: 'alert-warp',
          container: 'alert-container',
        },
      });
      event.target.textContent = '';
      this.payarray[id][property] = event.target.textContent;
      this.commonService.data.PaymentMaster[id][property] = event.target.textContent;
      this.dataSource3.filteredData[id][property] = event.target.textContent;
      this.dataSource3._updateChangeSubscription();
      return;
    }
  }
  AddPaymentDetailsNewgrid() {
    debugger;

    if (this.TotalAmt == "") {

      Swal.fire({
        type: 'warning',
        title: 'Enter the amount',
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          popup: 'alert-warp',
          container: 'alert-container',
        },
      });
      return;
    }

    if (this.TotalAmt == undefined) {

      Swal.fire({
        type: 'warning',
        title: 'Enter the amount',
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          popup: 'alert-warp',
          container: 'alert-container',
        },
      });
      return;
    }

    if (this.TotalAmt == null) {

      Swal.fire({
        type: 'warning',
        title: 'Enter the amount',
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          popup: 'alert-warp',
          container: 'alert-container',
        },
      });
      return;
    }

    if (this.TotalAmt == 0) {

      Swal.fire({
        type: 'warning',
        title: 'Enter the amount',
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          popup: 'alert-warp',
          container: 'alert-container',
        },
      });
      return;
    }



    if (this.payarray.length == 0) {
      var paydetails = new Payment_Master();
      paydetails.PaymentMode = "";
      paydetails.InstrumentNumber = "";
      paydetails.Instrumentdate = null;
      paydetails.BankName = "";
      paydetails.BankBranch = "";
      paydetails.Expirydate = null;
      paydetails.Amount = this.TotalAmt;
      this.payarray.unshift(paydetails);
      this.commonService.data.PaymentMaster = this.payarray;
      this.dataSource3.data = this.commonService.data.PaymentMaster;
      let disph = this.commonService.data.PaymentMaster[0].PaymentMode;
      let index = this.commonService.data.PaymentMaster.findIndex(x => x.PaymentMode == disph);
      this.PaymentModefirst(index);
      localStorage.setItem("Paymode", JSON.stringify(this.payarray));
      this.payarray = JSON.parse(localStorage.getItem("Paymode"));
      return;
    }

    if (this.payarray[0].PaymentMode == null || this.payarray[0].PaymentMode == undefined || this.payarray[0].PaymentMode == "") {
      Swal.fire({
        type: 'warning',
        title: 'Select the Payment mode',
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          popup: 'alert-warp',
          container: 'alert-container',
        },
      });
      return;
    }

    if (this.payarray[0].PaymentMode == "Cash") {
      if (this.payarray[0].Amount == null || this.payarray[0].Amount == 0) {
        Swal.fire({
          type: 'warning',
          title: 'Enter the amount',
          position: 'top-end',
          showConfirmButton: false,
          timer: 1500,
          customClass: {
            popup: 'alert-warp',
            container: 'alert-container',
          },
        });
        return;
      }
    }
    if (this.payarray[0].PaymentMode == 'Cheque' || this.payarray[0].PaymentMode == 'Demand Draft') {

      if ((this.payarray[0].Amount == null || this.payarray[0].InstrumentNumber == null || this.payarray[0].Instrumentdate == null ||
        this.payarray[0].BankName == null || this.payarray[0].BankBranch == null) || (this.payarray[0].Amount == undefined ||
          this.payarray[0].InstrumentNumber == undefined || this.payarray[0].Instrumentdate == undefined ||
          this.payarray[0].BankName == undefined || this.payarray[0].BankBranch == undefined) || (this.payarray[0].Amount == 0 ||
            this.payarray[0].InstrumentNumber == "" || this.payarray[0].BankName == "" || this.payarray[0].BankBranch == "")) {

        if ((this.payarray[0].Amount == null || this.payarray[0].Amount == undefined || this.payarray[0].Amount == 0)) {

          Swal.fire({
            type: 'warning',
            title: 'Enter the amount',
            position: 'top-end',
            showConfirmButton: false,
            timer: 1500,
            customClass: {
              popup: 'alert-warp',
              container: 'alert-container',
            },
          });
          return;
        }
        else if ((this.payarray[0].InstrumentNumber == null || this.payarray[0].InstrumentNumber == undefined || this.payarray[0].InstrumentNumber == "")) {

          Swal.fire({
            type: 'warning',
            title: 'Enter the Instrument number',
            position: 'top-end',
            showConfirmButton: false,
            timer: 1500,
            customClass: {
              popup: 'alert-warp',
              container: 'alert-container',
            },
          });
          return;
        }
        else if ((this.payarray[0].BankName == null || this.payarray[0].BankName == undefined || this.payarray[0].BankName == "")) {

          Swal.fire({
            type: 'warning',
            title: 'Enter the Bank name',
            position: 'top-end',
            showConfirmButton: false,
            timer: 1500,
            customClass: {
              popup: 'alert-warp',
              container: 'alert-container',
            },
          });
          return;
        }
        else if ((this.payarray[0].BankBranch == null || this.payarray[0].BankBranch == undefined || this.payarray[0].BankBranch == "")) {

          Swal.fire({
            type: 'warning',
            title: 'Enter the Bank branch',
            position: 'top-end',
            showConfirmButton: false,
            timer: 1500,
            customClass: {
              popup: 'alert-warp',
              container: 'alert-container',
            },
          });
          return;
        }
        else if ((this.payarray[0].Instrumentdate == null || this.payarray[0].Instrumentdate == undefined)) {

          Swal.fire({
            type: 'warning',
            title: 'Select the Instrument date',
            position: 'top-end',
            showConfirmButton: false,
            timer: 1500,
            customClass: {
              popup: 'alert-warp',
              container: 'alert-container',
            },
          });
          return;
        }
        else { }


      }
    }
    if (this.payarray[0].PaymentMode == 'Debit card' || this.payarray[0].PaymentMode == 'Credit Card') {

      if ((this.payarray[0].Amount == null || this.payarray[0].InstrumentNumber == null || this.payarray[0].Expirydate == null ||
        this.payarray[0].BankName == null) || (this.payarray[0].Amount == undefined ||
          this.payarray[0].InstrumentNumber == undefined || this.payarray[0].Expirydate == undefined ||
          this.payarray[0].BankName == undefined) || (this.payarray[0].Amount == 0 ||
            this.payarray[0].InstrumentNumber == "" || this.payarray[0].BankName == "")) {

        if ((this.payarray[0].Amount == null || this.payarray[0].Amount == undefined || this.payarray[0].Amount == 0)) {

          Swal.fire({
            type: 'warning',
            title: 'Enter the amount',
            position: 'top-end',
            showConfirmButton: false,
            timer: 1500,
            customClass: {
              popup: 'alert-warp',
              container: 'alert-container',
            },
          });
          return;
        }
        else if ((this.payarray[0].InstrumentNumber == null || this.payarray[0].InstrumentNumber == undefined || this.payarray[0].InstrumentNumber == "")) {

          Swal.fire({
            type: 'warning',
            title: 'Enter the Instrument number',
            position: 'top-end',
            showConfirmButton: false,
            timer: 1500,
            customClass: {
              popup: 'alert-warp',
              container: 'alert-container',
            },
          });
          return;
        }
        else if ((this.payarray[0].BankName == null || this.payarray[0].BankName == undefined || this.payarray[0].BankName == "")) {

          Swal.fire({
            type: 'warning',
            title: 'Enter the Bank name',
            position: 'top-end',
            showConfirmButton: false,
            timer: 1500,
            customClass: {
              popup: 'alert-warp',
              container: 'alert-container',
            },
          });
          return;
        }
        else if ((this.payarray[0].Expirydate == null || this.payarray[0].Expirydate == undefined)) {

          Swal.fire({
            type: 'warning',
            title: 'Select the expiry date',
            position: 'top-end',
            showConfirmButton: false,
            timer: 1500,
            customClass: {
              popup: 'alert-warp',
              container: 'alert-container',
            },
          });
          return;
        }

      }
    }

    let amtresult = parseInt(this.TotalAmt);
    if (this.PaymentTotalAmount() >= amtresult) {
      Swal.fire({
        type: 'warning',
        title: 'Cannot Give More than TotalAmount',
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          popup: 'alert-warp',
          container: 'alert-container',
        },
      });
      return;
    }
    else {
      var paydetails = new Payment_Master();
      paydetails.PaymentMode = "";
      paydetails.InstrumentNumber = "";
      paydetails.Instrumentdate = null;
      paydetails.BankName = "";
      paydetails.BankBranch = "";
      paydetails.Expirydate = null;
      paydetails.Amount = this.TotalAmt - this.PaymentTotalAmount();
      this.payarray.unshift(paydetails);
      this.commonService.data.PaymentMaster = this.payarray;
      this.dataSource3.data = this.commonService.data.PaymentMaster;
      this.dataSource3._updateChangeSubscription();

      let disph = this.commonService.data.PaymentMaster[0].PaymentMode;
      let index = this.commonService.data.PaymentMaster.findIndex(x => x.PaymentMode == disph);
      this.PaymentModefirst(index);

      localStorage.setItem("Paymode", JSON.stringify(this.payarray));
      this.payarray = JSON.parse(localStorage.getItem("Paymode"));




    }

  }

  Submit(Form: NgForm) {
    debugger;
    if (Form.valid) {
      if (this.TotalAmt != 0 && this.PTotalAmount != 0) {
        this.commonService.data.OrderDate = this.Datepipe.transform(this.M_DAte, "dd-MMM-yyyy");
        this.commonService.data.Cmpid = parseInt(localStorage.getItem("CompanyID"));
        this.commonService.data.paidto = this.M_Paidto;
        this.commonService.data.Paymenttotalamount = this.PTotalAmount;
        this.commonService.data.Userid = parseInt(localStorage.getItem("userroleID"));
        this.commonService.data.TransactionID = parseInt(this.Tc);
       // this.commonService.data.Expesneitemdata = this.dataSource.data;
        this.commonService.postData('Expense/Submitexpensetrandata', this.commonService.data)
          .subscribe(data => {
            if (data.Success == true) {
              Swal.fire({
                type: 'success',
                title: 'success',
                text: 'Saved successfully',
                position: 'top-end',
                showConfirmButton: false,
                timer: 1500,
                customClass: {
                  popup: 'alert-warp',
                  container: 'alert-container',
                },
              });
              this.router.navigateByUrl('/dash', { skipLocationChange: true }).then(() => {
                this.router.navigate(['ExpenseModule/ExpTran']);
              });
            } else {
              Swal.fire({
                type: 'warning',
                title: 'warning',
                text: 'Invalid Data',
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
      } else {
        Swal.fire({
          type: 'warning',
          title: 'warning',
          text: 'Check Payment Details',
          position: 'top-end',
          showConfirmButton: false,
          timer: 1500,
          customClass: {
            popup: 'alert-warp',
            container: 'alert-container',
          },
        });
      }
    } else {

    }
  }

  DateChange() {
    debugger;    
    var date = this.Datepipe.transform(this.M_DAte, "dd-MMM-yyyy");
    this.commonService.getListOfData('Expense/GetdatabasedonDate/' + localStorage.getItem("CompanyID") + '/' + date)
      .subscribe(data => {
        debugger;
        if (data.ExpenseMasterUpdatehelpdata.length != 0) {
          this.dataSource.data = data.ExpenseMasterUpdatehelpdata;
          this.M_Paidto = data.paidto;
          this.TotalAmt = data.orderedamount;
          for (var i = 0; i < data.ExpenseMasterUpdatehelpdata.length; i++) {
            var paydetails = new Expesneitemdata();
            paydetails.ID = data.ExpenseMasterUpdatehelpdata[i].ID;
            paydetails.Expensedescription = data.ExpenseMasterUpdatehelpdata[i].Description;
            paydetails.Remarks = data.ExpenseMasterUpdatehelpdata[i].Remarks;
            paydetails.Amount = data.ExpenseMasterUpdatehelpdata[i].Amount;
            this.commonService.data.Expesneitemdata.push(paydetails);
          }
        } else {
          this.TotalAmt = 0;
          Swal.fire({
            type: 'warning',
            title: 'warning',
            text: 'No Expense details found for selected date',
            position: 'top-end',
            showConfirmButton: false,
            timer: 2500,
            customClass: {
              popup: 'alert-warp',
              container: 'alert-container',
            },
          });
          this.commonService.data.Expesneitemdata = [];
          this.dataSource.data = [];
        }
      });
  }
  Paymentamount;

  totalamounttobepaid() {
    debugger;
    if (this.TotalAmt != 0 && this.TotalAmt != undefined && this.TotalAmt != null) {
      this.Paymentamount = this.TotalAmt;
     // this.PTotalAmount = this.TotalAmt;
    } else {
      Swal.fire({
        type: 'warning',
        title: 'warning',
        text: 'Add Expense details',
        position: 'top-end',
        showConfirmButton: false,
        timer: 2500,
        customClass: {
          popup: 'alert-warp',
          container: 'alert-container',
        },
      });
    }
  }
  Expensemasterpopup;
  Expensemasterpopupclose() {
    this.Expensemasterpopup = 'none';
  }
  AddExpenseMaster() {
    this.Expensemasterpopup = 'block';
    this.Hidesubmitbtn = true;
    this.hidestatustable = false;
    this.Hideupdatebtn = false;
  }
  displayedColumnsMaSTER = ['Actions', 'Description', 'Statuss'];
  dataSourcemaster = new MatTableDataSource();
  @ViewChild('ExpenseMasterForm') Forms: NgForm
  Cancelhelp(Forms: NgForm) {
    Forms.resetForm();
    this.Hideupdatebtn = false;
    this.Hidesubmitbtn = true;
    this.hidestatustable = false;
  }

  Gethelp() {
    debugger;
    this.commonService.getListOfData('Expense/GetExpenseMaster/' + localStorage.getItem("CompanyID"))
      .subscribe(data => {
        if (data.length != 0) {
          this.dataSourcemaster.data = data;
          this.hidestatustable = true;
        } else {
          Swal.fire({
            type: 'warning',
            title: 'warning',
            text: 'No Data',
            position: 'top-end',
            showConfirmButton: false,
            timer: 2500,
            customClass: {
              popup: 'alert-warp',
              container: 'alert-container',
            },
          });
        }
      });
  }
  Submitdata(Forms: NgForm) {
    if (Forms.valid) {
      if (this.M_Description != null && this.M_Description != undefined && this.M_Description != " " && this.M_Description != "") {
        this.commonService.getListOfData('Expense/InsertExpenseMaster/' + this.M_Description + '/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem("userroleID"))
          .subscribe(data => {
            if (data.Success == true) {
              Swal.fire({
                type: 'success',
                title: 'success',
                text: 'Saved Successfully',
                position: 'top-end',
                showConfirmButton: false,
                timer: 2500,
                customClass: {
                  popup: 'alert-warp',
                  container: 'alert-container',
                },
              });
              Forms.resetForm();
              this.Hideupdatebtn = false;
              this.Hidesubmitbtn = true;
              this.hidestatustable = false;
              this.commonService.getListOfData('Expense/GetactiveExpenseMaster/' + localStorage.getItem("CompanyID"))
                .subscribe(data => {
                  if (data.length != 0) {
                    this.expensearry = data;
                    //this.DummyHistorydata = data;          
                  }
                });
            } else {
              Swal.fire({
                type: 'warning',
                title: 'warning',
                text: 'Invalid Data',
                position: 'top-end',
                showConfirmButton: false,
                timer: 2500,
                customClass: {
                  popup: 'alert-warp',
                  container: 'alert-container',
                },
              });
            }
          });
      } else {
        Swal.fire({
          type: 'warning',
          title: 'warning',
          text: 'Enter Description',
          position: 'top-end',
          showConfirmButton: false,
          timer: 2500,
          customClass: {
            popup: 'alert-warp',
            container: 'alert-container',
          },
        });
      }
    }
  }
  selectitem(data) {
    debugger;
    this.hidestatustable = false;
    this.Hidesubmitbtn = false;
    this.Hideupdatebtn = true;
    this.activecol = data.Status;
    this.M_Description = data.Description;
    this.Dataid = data.ID;
    this.Datadesc = data.Description;
    this.DataStatus = data.Status;
  }

  Deletedata(Forms: NgForm) {
    debugger;
    if (Forms.valid) {
      this.commonService.getListOfData('Expense/DeleteExpenseMaster/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem("userroleID") + '/' + this.Dataid)
        .subscribe(data => {
          if (data.Success == true) {
            Swal.fire({
              type: 'success',
              title: 'success',
              text: 'Deleted Successfully',
              position: 'top-end',
              showConfirmButton: false,
              timer: 2500,
              customClass: {
                popup: 'alert-warp',
                container: 'alert-container',
              },
            });
            Forms.resetForm();
            this.Hideupdatebtn = false;
            this.Hidesubmitbtn = true;
            this.hidestatustable = false;
            this.commonService.getListOfData('Expense/GetactiveExpenseMaster/' + localStorage.getItem("CompanyID"))
              .subscribe(data => {
                if (data.length != 0) {
                  this.expensearry = data;
                  //this.DummyHistorydata = data;          
                }
              });
          } else {
            Swal.fire({
              type: 'warning',
              title: 'warning',
              text: 'Invalid Data',
              position: 'top-end',
              showConfirmButton: false,
              timer: 2500,
              customClass: {
                popup: 'alert-warp',
                container: 'alert-container',
              },
            });
          }
        });
    }
  }

  Updatedata(Forms: NgForm) {
    debugger;
    if (Forms.valid) {
      if (this.Datadesc == this.M_Description && this.DataStatus == this.activecol) {
        Swal.fire({
          type: 'warning',
          title: 'warning',
          text: 'Description Duplicate',
          position: 'top-end',
          showConfirmButton: false,
          timer: 2500,
          customClass: {
            popup: 'alert-warp',
            container: 'alert-container',
          },
        });
      } else {
        this.commonService.getListOfData('Expense/UpdateExpenseMaster/' + this.M_Description + '/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem("userroleID") + '/' + this.Dataid + '/' + this.activecol)
          .subscribe(data => {
            if (data.Success == true) {
              Swal.fire({
                type: 'success',
                title: 'success',
                text: 'Saved Successfully',
                position: 'top-end',
                showConfirmButton: false,
                timer: 2500,
                customClass: {
                  popup: 'alert-warp',
                  container: 'alert-container',
                },
              });
              Forms.resetForm();
              this.Hideupdatebtn = false;
              this.Hidesubmitbtn = true;
              this.hidestatustable = false;
              this.commonService.getListOfData('Expense/GetactiveExpenseMaster/' + localStorage.getItem("CompanyID"))
                .subscribe(data => {
                  if (data.length != 0) {
                    this.expensearry = data;
                    //this.DummyHistorydata = data;          
                  }
                });
            } else {
              Swal.fire({
                type: 'warning',
                title: 'warning',
                text: 'Invalid Data',
                position: 'top-end',
                showConfirmButton: false,
                timer: 2500,
                customClass: {
                  popup: 'alert-warp',
                  container: 'alert-container',
                },
              });
            }
          });
      }
    } else {
      Swal.fire({
        type: 'warning',
        title: 'warning',
        text: 'Check Inputs',
        position: 'top-end',
        showConfirmButton: false,
        timer: 2500,
        customClass: {
          popup: 'alert-warp',
          container: 'alert-container',
        },
      });
    }
  }
  /////////////////////////////////////////////////////////The End////////////////////////////////////////////////////
}
