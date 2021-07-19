import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatTableDataSource, MatSort } from '@angular/material';
import { VendorMasters, Opticamreturnsubmitdetails } from 'src/app/Models/ViewModels/VendorMasterWebModel';
import { CommonService } from 'src/app/shared/common.service';
import { NgForm } from '@angular/forms';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';
import { ExpenseViewModel, Expesneitemdata } from 'src/app/Models/ViewModels/ExpenseViewModel';
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
  // myEventsQ = [];
  ngOnInit() {
    // this.myEventsQ.push = function () { Array.prototype.push.apply(this, arguments); this.processQ(); };
    this.TotalAmt = 0;
    this.M_DAte = new Date();
    var Pathname = "ExpenseModule/ExpTran";
    var n = Pathname;
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
    this.commonService.getListOfData('Common/Getpaymentvalues').subscribe(data => { this.Paymentsmodes = data; });
    this.commonService.getListOfData('Common/GetCurrencyvalues/' + localStorage.getItem('CompanyID')).subscribe(data => {
      this.Country1 = data;
      this.Country2 = this.Country1[0].Text;
    });
    this.commonService.getListOfData('Expense/GetactiveExpenseMaster/' + localStorage.getItem("CompanyID"))
      .subscribe(data => {
        if (data.length != 0) {
          this.expensearry = data;
          //this.DummyHistorydata = data;          
        }
      });
  }

  RestrictNegativeValues(e): boolean {
    if (!(e.keyCode >= 48 && e.keyCode <= 57 || e.keyCode == 46)) {
      return false;
    }
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

  numberOnlypdno(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      if ((charCode > 34 && charCode < 41) || charCode == 46) {
        return true;
      }
      return false;
    }
    return true;
  }
  Amount(id, property: string, event: any, data) {
    debugger;

    let result: number = Number(event.target.textContent);
    this.dataSource3.filteredData[id][property] = result;
    this.dataSource3._updateChangeSubscription();
    this.PTotalAmount1();
    if (this.PTotalAmount > this.TotalAmt) {
      event.target.innerText = 0;
      event.target.innerHTML = 0;
      this.dataSource3.filteredData[id][property] = 0;
      this.dataSource3._updateChangeSubscription();
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
      return
    }
  }
  AddPaymentDetailsNewgrid() {
    debugger;
    this.paydel1 = [];
    this.paydel2 = [];
    var paydel = this.TotalAmt;
    if (paydel > 0) {
      var paydetails = new Payment_Master();
      paydetails.PaymentMode = "";
      paydetails.InstrumentNumber = "";
      paydetails.Instrumentdate = null;
      paydetails.BankName = "";
      paydetails.BankBranch = "";
      paydetails.Expirydate = null;

      var restotalcost = this.commonService.data.paymenttran.map(t => t.Amount).reduce((acc, value) => acc + value, 0);
      restotalcost = parseFloat(restotalcost.toFixed(2));
      this.PTotalAmount = restotalcost;

      if (this.PTotalAmount == 0) {
        paydetails.Amount = 0;
      } else if (this.PTotalAmount != 0) {
        paydetails.Amount = this.TotalAmt - this.PTotalAmount;
      }

      this.commonService.data.paymenttran.push(paydetails);
      this.dataSource3.data = this.commonService.data.paymenttran;
      this.dataSource3._updateChangeSubscription();
      this.disableRow = false;
      return;
    }
  }
  private newAttribute: any = {};
  @ViewChild('name') colName;
  ngAfterViewInit() {
    debugger;
    setTimeout(() => {
      this.colName.nativeElement.focus()
    }, 50);
  }

  AddExpenseNewgrid() {
    debugger;
    if (this.commonService.data.Expesneitemdata.length != 0) {
      const lengthdifference = this.commonService.data.Expesneitemdata.some(g => g.Expensedescription == "" && g.Amount == 0)
      if (lengthdifference == false) {
        var paydetails = new Expesneitemdata();
        paydetails.ID = null;
        paydetails.Expensedescription = "";
        paydetails.Remarks = "";
        paydetails.Amount = 0;
        this.commonService.data.Expesneitemdata.unshift(paydetails);
        //this.commonService.data.Expesneitemdata.push(paydetails);
        this.dataSource.data = this.commonService.data.Expesneitemdata;
        this.dataSource._updateChangeSubscription();
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
      this.commonService.data.Expesneitemdata.unshift(paydetails);
     // this.commonService.data.Expesneitemdata.push(paydetails);
      this.dataSource.data = this.commonService.data.Expesneitemdata;
      this.dataSource._updateChangeSubscription();
      return;
    }

  }
  removePaytype(i) {
    debugger;
    this.paydel1 = [];
    this.paydel2 = [];
    Swal.fire({
      title: 'Are you sure?',
      text: "Want To Drop This Payment Type",
      type: 'warning',
      showCancelButton: true,
      cancelButtonColor: '#d33',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Yes',
      reverseButtons: true,
    }).then((result) => {
      if (result.value) {
        if (i !== -1) {
          this.dataSource3.data.splice(i, 1);
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
    })

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

    let result: number = Number(event.target.textContent);
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
        } else {
          this.commonService.data.Expesneitemdata.splice(id, 1);
          this.dataSource._updateChangeSubscription();
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
              this.dataSource.data.splice(id, 1);
              this.commonService.data.Expesneitemdata.splice(id, 1);
              this.dataSource._updateChangeSubscription();
              this.TotalAmt = this.commonService.data.Expesneitemdata.map(t => t.Amount).reduce((acc, value) => acc + value, 0);
              this.commonService.data.paymenttran = [];
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

  /////////////////////////////////////////////////////////The End////////////////////////////////////////////////////
}
