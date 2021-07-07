import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';
import { MatTableDataSource, DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material';
import { CommonService } from '../../shared/common.service';
import { CustomerOrderViewModel } from '../../Models/ViewModels/CustomerOrderViewModel';
import Swal from 'sweetalert2';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { array } from '@amcharts/amcharts4/core';
import { Payment_Master } from '../../Models/PaymentWebModel ';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

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
  selector: 'app-customer-order-cancellation',
  templateUrl: './customer-order-cancellation.component.html',
  styleUrls: ['./customer-order-cancellation.component.less'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },

  ],
})
export class CustomerOrderCancellationComponent implements OnInit {

  constructor(public commonService: CommonService<CustomerOrderViewModel>, public el: ElementRef, private router: Router) { }
  @ViewChild('CustomerOrderCancel') Form: NgForm;

  date = new Date();

  Paymentsmodes;
  paymentCash: boolean = true;
  paymentChequeDd: boolean = true;
  paymentDebitCredit: boolean = false;

  Prints: boolean = false;

  OrderedListModel;
  backdrop;
  Submitprint;

  M_CancelNo;
  M_CancelDate;
  M_OrderNo;
  M_OrderDate;
  M_CustomerID;
  M_CustomerName;
  M_Address;
  M_MobileNo;
  M_Refdate;
  M_RefNo;

  M_CancelReason;

  M_paymode;
  M_InstrumentNumber;
  M_InstrumentDate;
  M_BankName;
  M_Branch;
  M_ExpiryDate;
  M_Amount;


  CompanyName;
  CompanyAddress1;
  CompanyAddress2;
  CompanyAddress3;
  CompanyWebsite;
  CompanyPhone1;

  Tc;
  ContraTc;
  PreviousAdvancePayment= new Array();
  GivenAdvanceTotal;
  Country1;
  Country2;
  Country3;
  Getloctime;

  isNextButton = true;
  isNextupdate = true;
  isNextDelete = true;
  isNextPrint = true;

  ngOnInit() {
    debugger
    var Pathname = "Opticalslazy/CustomerOrderCancellation";
    var n = Pathname;
    var sstring = n.includes("/");
    var Objdata = JSON.parse(localStorage.getItem("AllCollectionData"));
    this.commonService.data = new CustomerOrderViewModel();
    if (sstring == false) {
      if (Objdata.find(el => el.Parentmoduledescription === Pathname)) {
        this.Getloctime = localStorage.getItem('GMTTIME');
        this.commonService.getListOfData('Common/GetCurrencyvalues/' + localStorage.getItem('CompanyID')).subscribe(data => {
          debugger;
          this.Country1 = data;
          this.Country2 = this.Country1[0].Text;
          this.Country3 = this.Country1[0].Value;
        });
        this.commonService.getListOfData('Common/Getpaymentvalues').subscribe(data => { this.Paymentsmodes = data; });
        this.commonService.data.CustomerItemOrders = [];
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
          if (this.Tc != null || this.Tc != undefined) {
            this.commonService.getListOfData('Common/GettingRunningNo/' + localStorage.getItem('CompanyID') + '/' + this.Tc ).subscribe(data => {
              if (data.RunningNo == "Running Number Does'nt Exist") {
                this.isNextButton = true;
                Swal.fire({
                  type: 'warning',
                  title: `Running Number Does'nt Exist`,
                  position: 'top-end',
                  showConfirmButton: false,
                  timer: 1500,
                  customClass: {
                    popup: 'alert-warp',
                    container: 'alert-container',
                  },
                });
              }
              if (data.ReceiptRunningNo == "Running Number Does'nt Exist") {
                this.isNextButton = true;
                Swal.fire({
                  type: 'warning',
                  title: `Receipt Number Does'nt Exist`,
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
        }, 1000)
        setTimeout(() => {
          if (this.Tc != null || this.Tc != undefined) {
            this.commonService.getListOfData('InterDepartmentReceive/GetInterDepartmentTransferNo/' + this.Tc)
              .subscribe((data: any) => {
                this.ContraTc = data.TransValue;
                if (this.ContraTc == null || this.ContraTc == undefined) {
                  this.isNextButton = true;
                  Swal.fire({
                    type: 'warning',
                    title: 'Contra Transaction Id Undefined',
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
        }, 1200)
      }
      else {
        Swal.fire({
          type: 'warning',
          title: "Un-Authorized Access, Please contact Administrator",
          position: 'top-end',
          showConfirmButton: false,
          timer: 1500,
          customClass: {
            popup: 'alert-warp',
            container: 'alert-container',
          },
        });
        this.commonService.getListOfData('Common/Getlogdetails/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem("Doctorname") + '/' + "CustomerOrderCancellation").subscribe(data => {
          this.router.navigate(['dash']);
        });
      }
    }
    else if (sstring == true) {
      if (Objdata.find(el => el.Parentmoduledescription === Pathname)) {

        this.Getloctime = localStorage.getItem('GMTTIME');
        this.commonService.getListOfData('Common/GetCurrencyvalues/' + localStorage.getItem('CompanyID')).subscribe(data => {
          debugger;
          this.Country1 = data;
          this.Country2 = this.Country1[0].Text;
          this.Country3 = this.Country1[0].Value;
        });
        this.commonService.getListOfData('Common/Getpaymentvalues').subscribe(data => { this.Paymentsmodes = data; });
        this.commonService.data.CustomerItemOrders = [];
        this.commonService.data.paymenttran = [];
        this.commonService.getListOfData('Common/GetAccessdetailsstring/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem("userroleID") + '/' + Pathname).subscribe(data => {
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
          if (this.Tc != null || this.Tc != undefined) {
            this.commonService.getListOfData('Common/GettingRunningNo/' + localStorage.getItem('CompanyID') + '/' + this.Tc).subscribe(data => {
              debugger
              if (data.RunningNo == "Running Number Does'nt Exist") {
                this.isNextButton = true;
                Swal.fire({
                  type: 'warning',
                  title: `Running Number Does'nt Exist`,
                  position: 'top-end',
                  showConfirmButton: false,
                  timer: 1500,
                  customClass: {
                    popup: 'alert-warp',
                    container: 'alert-container',
                  },
                });
              }
              if (data.ReceiptRunningNo == "Running Number Does'nt Exist" || data.ReceiptRunningNo == null) {
                this.isNextButton = true;
                Swal.fire({
                  type: 'warning',
                  title: `Receipt Number Does'nt Exist`,
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
        }, 1000)
        setTimeout(() => {
          if (this.Tc != null || this.Tc != undefined) {
            this.commonService.getListOfData('InterDepartmentReceive/GetInterDepartmentTransferNo/' + this.Tc)
              .subscribe((data: any) => {
                this.ContraTc = data.TransValue;
                if (this.ContraTc == null || this.ContraTc == undefined) {
                  this.isNextButton = true;
                  Swal.fire({
                    type: 'warning',
                    title: 'Contra Transaction Id Undefined',
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
        }, 1200)
      }
      else {
        Swal.fire({
          type: 'warning',
          title: "Un-Authorized Access, Please contact Administrator",
          position: 'top-end',
          showConfirmButton: false,
          timer: 1500,
          customClass: {
            popup: 'alert-warp',
            container: 'alert-container',
          },
        });

        this.commonService.getListOfData('Common/Getlogdetails/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem("Doctorname") + '/' + "CustomerOrderCancellation").subscribe(data => {
          this.router.navigate(['dash']);
        });
      }
    }
  }

 


  PrintdisplayedColumns = ['SNo', 'Type', 'Brand', 'Model', 'LensOption', 'Index', 'Color', 'UOM', 'QTY', 'Price', 'Amount', 'Discount%', 'DiscountAmount', 'GrossAmount','GSTDesc', 'GST%', 'GSTValue', 'NetAmount']
  PrintdataSource = new MatTableDataSource();

  displayedColumns3: string[] = ['PaymentMode', 'InstrumentNumber', 'InstrumentDate', 'BankName', 'Branch', 'ExpiryDate', 'Amount'];
  dataSource3 = new MatTableDataSource();

  displayedColumns5: string[] = ['PaymentMode', 'InstrumentNumber', 'InstrumentDate', 'BankName', 'Branch', 'ExpiryDate', 'Amount','Action'];
  dataSource5 = new MatTableDataSource();

  displayedColumns4: string[] = ['Action', 'OrderNo', 'OrderDate', 'CustomerName', 'OrderStatus']
  dataSource4 = new MatTableDataSource();

  displayedColumns6: string[] = ['Action', 'CancelOrderNo', 'CancelOrderDate', 'CustomerName', 'OrderStatus']
  dataSource6 = new MatTableDataSource();

  /* Number Validation */
  Number(e): boolean {
    debugger;
    if (!(e.keyCode >= 48 && e.keyCode <= 57)) {
      return false;
    }
  }
  onlyAlpha(e): boolean {
    debugger;
    const charCode = (e.which) ? e.which : e.keyCode;
    if ((charCode >= 65 && charCode <= 90) || (charCode >= 97 && charCode <= 122)) {
      return true;
    }
    return false;
  }


  RestrictNegativeValues(e): boolean {
    if (!(e.keyCode >= 48 && e.keyCode <= 57 || e.keyCode == 46)) {
      return false;
    }
  }


  /* Placed Ordered List */
  PlacedOrderedList() {
    debugger
    try {
      this.backdrop = 'block';
      this.OrderedListModel = 'block';
      if (this.ContraTc == null || this.ContraTc == undefined) {
        Swal.fire({
          type: 'warning',
          title: 'Contra Transaction Id Undefined',
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
      this.commonService.getListOfData('CustomerOrder/GetCustomerOrderedList/' + parseInt(localStorage.getItem("CompanyID")) + '/' + this.ContraTc).subscribe(data => {
        debugger
        if (data.Success == true) {
          debugger
          if (data.CustomerOrderList.length > 0) {
            debugger
            this.dataSource4.data = data.CustomerOrderList;
            this.dataSource4._updateChangeSubscription();
          }
          else {
            Swal.fire({
              type: 'warning',
              title: 'No Orders Details Found',
              position: 'top-end',
              showConfirmButton: false,
              timer: 1500,
              customClass: {
                popup: 'alert-warp',
                container: 'alert-container',
              },
            });
            this.dataSource4.data = [];
            this.dataSource4._updateChangeSubscription();
          }
        }
        else {
          Swal.fire({
            type: 'warning',
            title: 'Invalid Input,Please Contact Administrator',
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
    catch (Error) {
      this.commonService.getListOfData('Common/ErrorList/' + Error.message + '/' + "Customer Order Cancellation" + '/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem('userroleID') + '/')
        .subscribe(data => { });
    }
  }

  NoPayment: boolean = false;

  SelectOrderNo(element) {
    try {
      this.commonService.getListOfData('CustomerOrder/GetOrderNoDetails/' + parseInt(localStorage.getItem("CompanyID")) + '/' + element.OrderNo).subscribe(data => {
        debugger
        if (data.Success == true) {
          debugger
          (<HTMLElement>document.querySelector('.ItemDetailsTab')).click();
          this.M_OrderNo = data.CustomerOrderedList.OrderNo;



          let LocTime = this.Getloctime.split(":");
          let Hours = LocTime[0];
          let Minutes = LocTime[1];

          this.M_OrderDate = new Date(data.CustomerOrderedList.OrderDate);
          this.M_OrderDate.setHours(this.M_OrderDate.getHours() + parseInt(Hours));
          this.M_OrderDate.setMinutes(this.M_OrderDate.getMinutes() + parseInt(Minutes));


          this.M_RefNo = data.CustomerOrderedList.RefNo;
          this.M_Refdate = data.CustomerOrderedList.RefDate;

          this.M_CustomerName = data.CustomerOrderedList.CustomerName;
          this.M_Address = data.CustomerOrderedList.CustomerAddress1.concat(' ', data.CustomerOrderedList.CustomerAddress2 != null ? data.CustomerOrderedList.CustomerAddress2 : '', ' ', data.CustomerOrderedList.CustomerAddress3 != null ? data.CustomerOrderedList.CustomerAddress3 : '');
          this.M_MobileNo = data.CustomerOrderedList.CustomerMobileNo;

          this.displayedColumns3 = ['PaymentMode', 'InstrumentNumber', 'InstrumentDate', 'BankName', 'Branch', 'ExpiryDate', 'Amount'];
          this.PreviousAdvancePayment = data.CustomerOrderedList.paymenttran;
          this.dataSource3.data = this.PreviousAdvancePayment;
          this.dataSource3._updateChangeSubscription();

          if (data.CustomerOrderedList.paymenttran.length == 0) {
            this.NoPayment = true
          } else {
            this.NoPayment = false
          }

          this.M_AdvanceAmount = this.getPaymentTotalCost();

          this.commonService.data.CustomerItemOrders = data.CustomerOrderedList.CustomerItemOrders;

          for (var i = 0; i < this.commonService.data.CustomerItemOrders.length; i++) {
            this.commonService.data.CustomerItemOrders[i].GivenQtyPrice = this.commonService.data.CustomerItemOrders[i].UnitPrice * this.commonService.data.CustomerItemOrders[i].Quantity;
            this.commonService.data.CustomerItemOrders[i].GSTValue = this.commonService.data.CustomerItemOrders[i].GrossAmount * ((this.commonService.data.CustomerItemOrders[i].CGST + this.commonService.data.CustomerItemOrders[i].SGST) / 100)
          }


          this.PrintdataSource.data = this.commonService.data.CustomerItemOrders;
          this.PrintdataSource._updateChangeSubscription();

          this.backdrop = 'none';
          this.OrderedListModel = 'none';
        }
        else {
          Swal.fire({
            type: 'warning',
            title: 'Invalid Input,Please Contact Administrator',
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
    catch (Error)
    {
      this.commonService.getListOfData('Common/ErrorList/' + Error.message + '/' + "Customer Order Cancellation" + '/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem('userroleID') + '/')
        .subscribe(data => { });
    }
   

  }


  OrderedListModelClose() {
    this.backdrop = 'none';
    this.OrderedListModel = 'none';
  }


  getPaymentTotalCost() {
    if (this.PreviousAdvancePayment.length >= 1) {
      var restotalcost = this.PreviousAdvancePayment.map(t => t.Amount).reduce((acc, value) => acc + value, 0);
      restotalcost = parseFloat(restotalcost.toFixed(2));
      return restotalcost;
    }
  }

  getPaymentTotalCost1() {
    if (this.commonService.data.paymenttran.length >= 1) {
      var restotalcost = this.commonService.data.paymenttran.map(t => t.Amount).reduce((acc, value) => acc + value, 0);
      restotalcost = parseFloat(restotalcost.toFixed(2));
      return restotalcost;
    }
  }

  getTotalAmount() {
    if (this.commonService.data.CustomerItemOrders.length >= 1) {
      var restotalcost = this.commonService.data.CustomerItemOrders.map(t => t.Amount).reduce((acc, value) => acc + value, 0);
      return restotalcost;
    }
  }

  applyFilter2(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource4.filter = filterValue.trim().toLowerCase();
  }

  applyFilter3(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource6.filter = filterValue.trim().toLowerCase();
  }

  isInvalid: boolean = false;

  M_ReceiptNo;
  M_ReceiptNoDate;

  /* Submit */
  Submit(Form: NgForm) {
    debugger
    try {
      if (this.M_OrderNo == '' || this.M_OrderNo == undefined || this.M_OrderNo == null) {
        Swal.fire({
          type: 'warning',
          title: 'Select Order Details',
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

      if (this.getPaymentTotalCost1() != this.getPaymentTotalCost()) {
        Swal.fire({
          type: 'warning',
          title: 'Advance Details And Refund Details Mismatch',
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

      if (this.commonService.data.paymenttran.length >= 1) {
        if (this.commonService.data.paymenttran.some(x => x.PaymentMode === "" || x.PaymentMode === null)) {
          Swal.fire({
            type: 'warning',
            title: 'Check the payment details',
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

      if (Form.valid) {
        this.isInvalid = false;

        this.commonService.data.OrderNo = this.M_OrderNo;
        this.commonService.data.OrderDate = this.M_CancelDate;
        this.commonService.data.CancelledReasons = this.M_CancelReason;
        this.commonService.data.Tc = this.Tc;
        this.commonService.data.Cmpid = parseInt(localStorage.getItem("CompanyID"));
        this.commonService.data.CreatedBy = parseInt(localStorage.getItem("userroleID"));

        this.commonService.postData('CustomerOrder/SubmitCustomerOrderCancel/' + this.M_CancelDate.toISOString(), this.commonService.data)
          .subscribe(data => {
            debugger
            if (data.Success == true) {
              Swal.fire({
                type: 'success',
                title: 'success',
                text: 'Data Saved successfully',
                position: 'top-end',
                showConfirmButton: false,
                timer: 1500,
                customClass: {
                  popup: 'alert-warp',
                  container: 'alert-container',
                },
              });
              this.M_CancelNo = data.CancelOrderNo;

              let LocTime = this.Getloctime.split(":");
              let Hours = LocTime[0];
              let Minutes = LocTime[1];

              this.M_CancelDate = new Date(data.CancelOrderDate);
              this.M_CancelDate.setHours(this.M_CancelDate.getHours() + parseInt(Hours));
              this.M_CancelDate.setMinutes(this.M_CancelDate.getMinutes() + parseInt(Minutes));

              this.M_ReceiptNo = data.ReceiptNumber;

              let RecDate = new Date(data.ReceiptDate);
              this.M_ReceiptNoDate = RecDate.setHours(RecDate.getHours());


              let CompanyDetails = data.CompanyDetails;
              this.CompanyName = CompanyDetails.CompanyName;
              this.CompanyAddress1 = CompanyDetails.Address1;
              this.CompanyAddress2 = CompanyDetails.Address2;
              this.CompanyAddress3 = CompanyDetails.Address3;
              this.CompanyWebsite = CompanyDetails.Website;
              this.CompanyPhone1 = CompanyDetails.Phone1;
              this.displayedColumns5 = ['PaymentMode', 'InstrumentNumber', 'InstrumentDate', 'BankName', 'Branch', 'ExpiryDate', 'Amount'];

              this.backdrop = 'block';
              this.Submitprint = 'block';
            }
            else if (data.Message == "Running Number Does'nt Exist" || data.Message == "Receipt Running Number Does'nt Exist" || data.Message == "Receipt Running Number Does'nt Mapped in Transaction Table") {
              Swal.fire({
                type: 'warning',
                title: data.Message,
                position: 'top-end',
                showConfirmButton: false,
                timer: 1500,
                customClass: {
                  popup: 'alert-warp',
                  container: 'alert-container',
                },
              });
            }
            else if (data.Message.includes('Violation of PRIMARY KEY')) {
              Swal.fire({
                type: 'warning',
                title: `${(data.grn)} already exists`,
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
                title: data.Message,
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
      else {
        this.isInvalid = true;
        let target = this.el.nativeElement.querySelector('.required.ng-invalid')
        setTimeout(function () {
          $('html,body').animate({ scrollTop: $(target).offset().top }, 'slow');
          target.focus();
        }, 500);
      }
    }
    catch (Error) {
      this.commonService.getListOfData('Common/ErrorList/' + Error.message + '/' + "Customer Order Cancellation" + '/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem('userroleID') + '/')
        .subscribe(data => { });
    }
  }


  /*Print*/
  Print() {
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
  }


  printclose() {
    this.backdrop = 'none';
    this.Submitprint = 'none';

    this.M_CancelNo = '';
    this.M_CancelDate = '';
    this.M_CancelReason = '';
    this.M_OrderNo = '';
    this.M_OrderDate = '';
    this.M_RefNo = '';
    this.M_Refdate = '';
    this.M_CustomerName = '';
    this.M_Address = '';
    this.M_MobileNo = '';
    this.M_ReceiptNo = '';
    this.M_ReceiptNoDate = '';
    this.commonService.data.CustomerItemOrders = [];
    this.commonService.data.paymenttran = [];
    this.PreviousAdvancePayment = [];
    this.PrintdataSource.data = [];
    this.dataSource5.data = [];
    this.dataSource3.data = [];

    this.PrintdataSource._updateChangeSubscription();
    this.dataSource5._updateChangeSubscription();
    this.dataSource3._updateChangeSubscription();

    this.displayedColumns5 = ['PaymentMode', 'InstrumentNumber', 'InstrumentDate', 'BankName', 'Branch', 'ExpiryDate', 'Amount'];
  }

  CancelOrderListModel;

/*Cancel Order list*/
  CancelOrderedList() {
    debugger
    try {
      this.CancelOrderListModel = 'block';
      this.backdrop = 'block';
      if (this.Tc == null || this.Tc == undefined) {
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
        return
      }
      this.commonService.getListOfData('CustomerOrder/GetCustomerCancelOrderedList/' + parseInt(localStorage.getItem("CompanyID")) + '/' + this.Tc).subscribe(data => {
        debugger
        if (data.Success == true) {
          debugger
          if (data.CustomerCancelOrderList.length > 0) {
            this.dataSource6.data = data.CustomerCancelOrderList;
            this.dataSource6._updateChangeSubscription();
          }
          else {
            Swal.fire({
              type: 'warning',
              title: 'No Cancelled Orders Details Found',
              position: 'top-end',
              showConfirmButton: false,
              timer: 1500,
              customClass: {
                popup: 'alert-warp',
                container: 'alert-container',
              },
            });
            this.dataSource6.data = [];
            this.dataSource6._updateChangeSubscription();
          }
        }
        else {
          Swal.fire({
            type: 'warning',
            title: 'Invalid Input,Please Contact Administrator',
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
    catch (Error) {
      this.commonService.getListOfData('Common/ErrorList/' + Error.message + '/' + "Customer Order Cancellation" + '/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem('userroleID') + '/')
        .subscribe(data => { });
    }
  }

  CancelOrderModelClose() {
    this.CancelOrderListModel = 'none';
    this.backdrop = 'none';
  }

  SelectCancelOrder(element) {
    try {
      this.commonService.getListOfData('CustomerOrder/GetCancelOrderNoDetails/' + parseInt(localStorage.getItem("CompanyID")) + '/' + element.OrderNo).subscribe(data => {
        debugger
        if (data.Success == true) {
          debugger
          (<HTMLElement>document.querySelector('.ItemDetailsTab')).click();
          this.Prints = true;

          let CompanyDetails = data.CompanyDetails;
          this.CompanyName = CompanyDetails.CompanyName;
          this.CompanyAddress1 = CompanyDetails.Address1;
          this.CompanyAddress2 = CompanyDetails.Address2;
          this.CompanyAddress3 = CompanyDetails.Address3;
          this.CompanyWebsite = CompanyDetails.Website;
          this.CompanyPhone1 = CompanyDetails.Phone1;

          this.M_CancelNo = data.CancelOrderNo;

          let LocTime = this.Getloctime.split(":");
          let Hours = LocTime[0];
          let Minutes = LocTime[1];

          this.M_CancelDate = new Date(data.CancelDate);
          this.M_CancelDate.setHours(this.M_CancelDate.getHours() + parseInt(Hours));
          this.M_CancelDate.setMinutes(this.M_CancelDate.getMinutes() + parseInt(Minutes));


          this.M_CancelReason = data.CancelReason;

          this.M_OrderNo = data.CustomerOrderedList.OrderNo;

          this.M_OrderDate = new Date(data.CustomerOrderedList.OrderDate);
          this.M_OrderDate.setHours(this.M_OrderDate.getHours() + parseInt(Hours));
          this.M_OrderDate.setMinutes(this.M_OrderDate.getMinutes() + parseInt(Minutes));



          this.M_ReceiptNo = data.CustomerOrderedList.ReceiptNumber;

          this.M_ReceiptNoDate = new Date(data.CustomerOrderedList.M_ReceiptNoDate);
          this.M_ReceiptNoDate.setHours(this.M_ReceiptNoDate.getHours() + parseInt(Hours));
          this.M_ReceiptNoDate.setMinutes(this.M_ReceiptNoDate.getMinutes() + parseInt(Minutes));

          this.M_RefNo = data.CustomerOrderedList.RefNo;
          this.M_Refdate = data.CustomerOrderedList.RefDate;

          this.M_CustomerName = data.CustomerOrderedList.CustomerName;
          this.M_Address = data.CustomerOrderedList.CustomerAddress1.concat(' ', data.CustomerOrderedList.CustomerAddress2 != null ? data.CustomerOrderedList.CustomerAddress2 : '', ' ', data.CustomerOrderedList.CustomerAddress3 != null ? data.CustomerOrderedList.CustomerAddress3 : '');
          this.M_MobileNo = data.CustomerOrderedList.CustomerMobileNo;


          this.PreviousAdvancePayment = data.CustomerOrderedList.paymenttran;
          this.dataSource3.data = this.PreviousAdvancePayment;
          this.dataSource3._updateChangeSubscription();

          if (data.CustomerOrderedList.paymenttran.length == 0) {
            this.NoPayment = true
          } else {
            this.NoPayment = false
          }

          this.commonService.data.CustomerItemOrders = data.CustomerOrderedList.CustomerItemOrders;

          for (var i = 0; i < this.commonService.data.CustomerItemOrders.length; i++) {
            this.commonService.data.CustomerItemOrders[i].GivenQtyPrice = this.commonService.data.CustomerItemOrders[i].UnitPrice * this.commonService.data.CustomerItemOrders[i].Quantity;
            this.commonService.data.CustomerItemOrders[i].GSTValue = this.commonService.data.CustomerItemOrders[i].GrossAmount * ((this.commonService.data.CustomerItemOrders[i].CGST + this.commonService.data.CustomerItemOrders[i].SGST) / 100)
          }


          this.PrintdataSource.data = this.commonService.data.CustomerItemOrders;
          this.PrintdataSource._updateChangeSubscription();

          this.displayedColumns5 = ['PaymentMode', 'InstrumentNumber', 'InstrumentDate', 'BankName', 'Branch', 'ExpiryDate', 'Amount'];

          this.commonService.data.paymenttran = data.CustomerOrderedList.RefundDetails;
          this.dataSource5.data = this.commonService.data.paymenttran;
          this.dataSource5._updateChangeSubscription();

          this.CancelOrderListModel = 'none';
          this.backdrop = 'none';
        }
        else {
          Swal.fire({
            type: 'warning',
            title: 'Invalid Input,Please Contact Administrator',
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
    catch (Error) {
      this.commonService.getListOfData('Common/ErrorList/' + Error.message + '/' + "Customer Order Cancellation" + '/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem('userroleID') + '/')
        .subscribe(data => { });
    }
  }

  clear() {
    this.Prints = false;

    this.M_CancelNo = '';
    this.M_CancelDate = '';
    this.M_CancelReason = '';
    this.M_OrderNo = '';
    this.M_OrderDate = '';
    this.M_RefNo = '';
    this.M_Refdate = '';
    this.M_CustomerName = '';
    this.M_Address = '';
    this.M_MobileNo = '';
    this.M_ReceiptNo = '';
    this.M_ReceiptNoDate = '';
    this.commonService.data.CustomerItemOrders = [];
    this.commonService.data.paymenttran = [];
    this.PreviousAdvancePayment = [];
    this.PrintdataSource.data = [];
    this.dataSource5.data = [];
    this.dataSource3.data = [];

    this.PrintdataSource._updateChangeSubscription();
    this.dataSource5._updateChangeSubscription();
    this.dataSource3._updateChangeSubscription();

    this.displayedColumns5 = ['PaymentMode', 'InstrumentNumber', 'InstrumentDate', 'BankName', 'Branch', 'ExpiryDate', 'Amount'];
    (<HTMLElement>document.querySelector('.ItemDetailsTab')).click();
  }



  accesspopup;
  accessdata;
  Getformaccess() {
    debugger;
    var Pathname = "Opticalslazy/CustomerOrderCancellation";
    var n = Pathname;
    var sstring = n.includes("/");
    if (sstring == false) {
      this.commonService.getListOfData('Common/GetAccessdetails/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem("userroleID") + '/' + Pathname).subscribe(data => {
        debugger;
        this.accessdata = data.GetAvccessDetails;
        this.backdrop = 'block';
        this.accesspopup = 'block';
      });
    }
    else if (sstring == true) {
      this.commonService.getListOfData('Common/GetAccessdetailsstring/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem("userroleID") + '/' + Pathname).subscribe(data => {
        debugger;
        this.accessdata = data.GetAvccessDetails;
        this.backdrop = 'block';
        this.accesspopup = 'block';
      });
    }
  }
  modalcloseAccessOk() {
    this.backdrop = 'none';
    this.accesspopup = 'none';
  }


  M_AdvanceAmount;
  PTotalAmount;
  /////////////////////////////////////////payment grid////////////////////////////////////////////////
  paydel1 = [];
  paydel2 = [];
  gridamount;
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
      paydetails.Amount = this.M_AdvanceAmount;
      this.commonService.data.paymenttran.push(paydetails);
      this.dataSource5.data = this.commonService.data.paymenttran;
      this.dataSource5._updateChangeSubscription();
      return;
    }



    if (paydel.some(x => x.PaymentMode == null || x.PaymentMode == undefined || x.PaymentMode == "")) {
      Swal.fire({
        type: 'warning',
        title: 'Check The Payment Details',
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

    if (paydel.some(x => x.PaymentMode == "Cash")) {
      if (paydel.some(x => x.Amount == null || x.Amount == 0)) {
        Swal.fire({
          type: 'warning',
          title: 'Check The Payment Details',
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
    if (paydel.some(x => x.PaymentMode == 'Cheque' || x.PaymentMode == 'Demand Draft')) {

      for (var j = 0; j < paydel.length; j++) {
        if (paydel[j].PaymentMode === 'Cheque' || paydel[j].PaymentMode === 'Demand Draft') {
          this.paydel1.push(paydel[j]);
        }
      }

      if ((this.paydel1.some(x => x.Amount == null || x.InstrumentNumber == null || x.Instrumentdate == null ||
        x.BankName == null || x.BankBranch == null)) || (this.paydel1.some(Y => Y.Amount == undefined ||
          Y.InstrumentNumber == undefined || Y.Instrumentdate == undefined ||
          Y.BankName == undefined || Y.BankBranch == undefined)) || (this.paydel1.some(v => v.Amount == 0 ||
            v.InstrumentNumber == "" || v.BankName == "" || v.BankBranch == ""))) {
        Swal.fire({
          type: 'warning',
          title: 'Check The Payment Details',
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
    if (paydel.some(x => x.PaymentMode == 'Debit card' || x.PaymentMode == 'Credit Card')) {


      for (var j = 0; j < paydel.length; j++) {
        if (paydel[j].PaymentMode === 'Debit card' || paydel[j].PaymentMode === 'Credit Card') {
          this.paydel2.push(paydel[j]);
        }
      }



      if ((this.paydel2.some(x => x.Amount == null || x.InstrumentNumber == null || x.Expirydate == null ||
        x.BankName == null)) || (this.paydel2.some(Y => Y.Amount == undefined ||
          Y.InstrumentNumber == undefined || Y.Expirydate == undefined ||
          Y.BankName == undefined)) || (this.paydel2.some(v => v.Amount == 0 ||
            v.InstrumentNumber == "" || v.BankName == ""))) {
        Swal.fire({
          type: 'warning',
          title: 'Check The Payment Details',
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


    if (this.PTotalAmount < this.M_AdvanceAmount) {
      var paydetails = new Payment_Master();
      paydetails.PaymentMode = "";
      paydetails.InstrumentNumber = "";
      paydetails.Instrumentdate = null;
      paydetails.BankName = "";
      paydetails.BankBranch = "";
      paydetails.Expirydate = null;
      paydetails.Amount = this.M_AdvanceAmount - this.PTotalAmount;
      this.commonService.data.paymenttran.push(paydetails);
      this.dataSource5.data = this.commonService.data.paymenttran;
      this.dataSource5._updateChangeSubscription();
      this.PTotalAmount += paydetails.Amount;
    }
    else {
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
    }

  }
  PaymentChange(id, event, element) {
    debugger;
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
      this.dataSource5.data.splice(id, 1)
      this.dataSource5._updateChangeSubscription();
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
  disableRow = true;
  Amount(id, property: string, event: any, data) {
    debugger;

    let result: number = Number(event.target.textContent);
    this.dataSource5.filteredData[id][property] = result;
    this.dataSource5._updateChangeSubscription();

    this.PTotalAmount1();

    if (this.PTotalAmount > this.M_AdvanceAmount) {
      event.target.innerText = 0;
      event.target.innerHTML = 0;
      this.dataSource5.filteredData[id][property] = 0;
      this.dataSource5._updateChangeSubscription();
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
  PTotalAmount1() {
    var restotalcost = this.commonService.data.paymenttran.map(t => t.Amount).reduce((acc, value) => acc + value, 0);
    restotalcost = parseFloat(restotalcost.toFixed(2));
    this.PTotalAmount = restotalcost;
    return restotalcost;
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
          this.dataSource5.data.splice(i, 1);
          this.dataSource5._updateChangeSubscription();
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

  getGrossAmount() {
    var restotalcost = this.commonService.data.CustomerItemOrders.map(t => t.GrossAmount).reduce((acc, value) => acc + value, 0);
    return restotalcost;
  }


  getGstTotalAmount() {
    var restotalcost = this.commonService.data.CustomerItemOrders.map(t => t.GSTValue + t.CESSValue + t.AddCessValue).reduce((acc, value) => acc + value, 0);
    return restotalcost;
  }

  getItemAmount() {
    var restotalcost = this.commonService.data.CustomerItemOrders.map(t => t.GivenQtyPrice).reduce((acc, value) => acc + value, 0);
    return restotalcost;
  }

  getDiscountAmount() {
    var restotalcost = this.commonService.data.CustomerItemOrders.map(t => t.DiscountAmount).reduce((acc, value) => acc + value, 0);
    return restotalcost;
  }


  a = [
    '',
    'One ',
    'Two ',
    'Three ',
    'Four ',
    'Five ',
    'Six ',
    'Seven ',
    'Eight ',
    'Nine ',
    'Ten ',
    'Eleven ',
    'Twelve ',
    'Thirteen ',
    'Fourteen ',
    'Fifteen ',
    'Sixteen ',
    'Seventeen ',
    'Eighteen ',
    'Nineteen '];

  b = [
    '',
    '',
    'Twenty',
    'Thirty',
    'Forty',
    'Fifty',
    'Sixty',
    'Seventy',
    'Eighty',
    'Ninety'];

  transformValue(value: any, args?: any): any {
    if (value) {
      let num: any = Number(value);
      if (num) {
        if ((num = num.toString()).length > 9) { return 'We are not the Iron Bank, you can lower down the stakes :)'; }
        const n = ('000000000' + num).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
        if (!n) { return ''; }
        let str = '';
        str += (Number(n[1]) !== 0) ? (this.a[Number(n[1])] || this.b[n[1][0]] + ' ' + this.a[n[1][1]]) + 'crore ' : '';
        str += (Number(n[2]) !== 0) ? (this.a[Number(n[2])] || this.b[n[2][0]] + ' ' + this.a[n[2][1]]) + 'lakh ' : '';
        str += (Number(n[3]) !== 0) ? (this.a[Number(n[3])] || this.b[n[3][0]] + ' ' + this.a[n[3][1]]) + 'thousand ' : '';
        str += (Number(n[4]) !== 0) ? (this.a[Number(n[4])] || this.b[n[4][0]] + ' ' + this.a[n[4][1]]) + 'hundred ' : '';
        str += (Number(n[5]) !== 0) ? ((str !== '') ? 'and ' : '') +
          (this.a[Number(n[5])] || this.b[n[5][0]] + ' ' +
            this.a[n[5][1]]) + 'rupee' : '';
        return str;
      } else {
        return '';
      }
    } else {
      return '';
    }
  }

//////////////////////////////////////////////////////////////////////////
}
