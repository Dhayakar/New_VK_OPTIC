import { Component, OnInit, ElementRef, ViewEncapsulation } from '@angular/core';
import { CommonService } from 'src/app/shared/common.service';
import { InterDepartmentReceive, ReceivedOtherDetail } from 'src/app/Models/ViewModels/InterDepartmentReceive';
import { MatTableDataSource, DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
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
  selector: 'app-inter-department-receive',
  templateUrl: './inter-department-receive.component.html',
  styleUrls: ['./inter-department-receive.component.less'],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
  encapsulation: ViewEncapsulation.None,
})
export class InterDepartmentReceiveComponent implements OnInit {

  constructor(private router: Router,public commonService: CommonService<InterDepartmentReceive>, public el: ElementRef) { }

  SentSmid;
  StoreID;
  RowID;
  storeID;
  StoreName;
  backdrop;
  StockDate;
  StockTransferNo;
  TransReceive;
  TransIssue;
  RecBatchInfo;
  PopBrand;
  PopGeneric;
  PopRecQty;
  ViewReceivedInfo;
  selectOtherBatch: ReceivedOtherDetail;
  isNextButton = true;
  isNextupdate = true;
  isNextDelete = true;
  isNextPrint = true;
  isPrint = true;
  accesspopup;
  accessdata;
  M_RecDate;
  M_Name;
  ViewFullDetailsInfo:boolean =false;
  SearchIconVisible:boolean =false;
  ViewRecdDetails: boolean = false;
  CompanyName;
  CompanyAddress1;
  CompanyAddress2;
  CompanyAddress3;
  CompanyWebsite;
  CompanyPhone1;
  printpopup;
  StockReceiptsNo;
  Dates = new Date();

  ngOnInit() {
    var Pathname = "Inventorylazy/InterDepartmentReceive";
    var n = Pathname;
    var sstring = n.includes("/");
    var Objdata = JSON.parse(localStorage.getItem("AllCollectionData"));
    this.commonService.data = new InterDepartmentReceive();
    if (sstring == false) {
      if (Objdata.find(el => el.Parentmoduledescription === Pathname)) {
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
        let res = Objdata.find(x => x.Parentmoduledescription == Pathname);
        this.TransReceive = res.TransactionID;
        this.commonService.getListOfData('InterDepartmentReceive/GetInterDepartmentTransferNo/' + this.TransReceive)
          .subscribe((data: any) => {
            this.TransIssue = data.TransValue;
          });
        this.commonService.getListOfData('InterDepartmentReceive/GetstoreDropdownvalues/' + parseInt(localStorage.getItem("CompanyID")))
          .subscribe((data: any) => {
            if (data.length >= 1) {
              this.StoreID = data;
            } else {
              Swal.fire({
                position: 'top-end',
                type: 'warning',
                title: 'No Transfer Details Found',
                showConfirmButton: false,
                customClass: {
                  popup: 'alert-warp',
                  container: 'alert-container',
                },
                timer: 3000
              });
            }
          });
      }
      else {
        Swal.fire({
          position: 'top-end',
          text: "Un-Authorized Access, Please contact Administrator",
          type: 'warning',
          showConfirmButton: false,
          customClass: {
            popup: 'alert-warp',
            container: 'alert-container',
          },
          timer: 3000
        });
        this.commonService.getListOfData('Common/Getlogdetails/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem("Doctorname") + '/' + Pathname).subscribe(data => {
          this.router.navigate(['dash']);
        });
      }
    }
    else if (sstring == true) {
      if (Objdata.find(el => el.Parentmoduledescription === Pathname)) {
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
        let res = Objdata.find(x => x.Parentmoduledescription == Pathname);
        this.TransReceive = res.TransactionID;
        if (this.TransReceive == null || this.TransReceive == undefined) {
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
        };
        setTimeout(() => {
          if (this.TransReceive != null || this.TransReceive != undefined) {
            this.commonService.getListOfData('Common/GettingRunningNo/' + localStorage.getItem('CompanyID') + '/' + this.TransReceive).subscribe(data => {
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
            });
          }
        }, 1000);
        setTimeout(() => {
          if (this.TransReceive != null || this.TransReceive != undefined) {
            this.commonService.getListOfData('InterDepartmentReceive/GetInterDepartmentTransferNo/' + this.TransReceive)
              .subscribe((data: any) => {
                this.TransIssue = data.TransValue;
                if (this.TransIssue == undefined || this.TransIssue == null) {
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
              });
          }
        },1200)
        this.commonService.getListOfData('InterDepartmentReceive/GetstoreDropdownvalues/' + parseInt(localStorage.getItem("CompanyID")))
          .subscribe((data: any) => {
            if (data.length >= 1) {
              this.StoreID = data;
            } else {
              Swal.fire({
                position: 'center',
                type: 'warning',
                title: 'No Transfer Details Found',
                showConfirmButton: false,
                timer: 3000
              });
            }
          });
      }
      else {
        Swal.fire({
          position: 'top-end',
          text: "Un-Authorized Access, Please contact Administrator",
          type: 'warning',
          showConfirmButton: false,
          customClass: {
            popup: 'alert-warp',
            container: 'alert-container',
          },
          timer: 3000
        });
        this.commonService.getListOfData('Common/Getlogdetails/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem("Doctorname") + '/' + Pathname).subscribe(data => {
          this.router.navigate(['dash']);
        });
      }
    }
  }

  displayedColumns: string[] = ['Date', 'StockTransferNo', 'FromStore', 'StoreKeeper'];
  dataSource = new MatTableDataSource();

  displayedColumns1: string[] = ['Date', 'RecTransferNo', 'RecStore', 'StoreKeeper'];
  dataSource1 = new MatTableDataSource();

  ViewItemDetailsColumns: string[] = ['Sno', 'DrugName', 'GenericName','UOM', 'BatchSerial','BatchExpiry', 'SentQuantity', 'RecQuantity', 'Diff','Reasons'];
  ViewItemDetailsSource = new MatTableDataSource();

  RecdItemDetailsColumns: string[] = ['Sno', 'DrugName', 'GenericName', 'BatchSerial', 'BatchExpiry', 'SentQuantity', 'RecQuantity', 'Reasons'];
  RecdItemDetailsSource = new MatTableDataSource();


  Getformaccess() {
    var Pathname = "Inventorylazy/InterDepartmentReceive";
    var n = Pathname;
    var sstring = n.includes("/");
    if (sstring == false) {
      this.commonService.getListOfData('Common/GetAccessdetails/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem("userroleID") + '/' + Pathname).subscribe(data => {
        this.accessdata = data.GetAvccessDetails;
        this.backdrop = 'block';
        this.accesspopup = 'block';
      });
    }
    else if (sstring == true) {
      this.commonService.getListOfData('Common/GetAccessdetailsstring/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem("userroleID") + '/' + Pathname).subscribe(data => {
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

  StoreIDChange() {
    try {
      this.SearchIconVisible = true;
      this.commonService.getListOfData('InterDepartmentReceive/GetStoreDetails/' + parseInt(this.storeID) + '/' + this.TransIssue + '/' + parseInt(localStorage.getItem("CompanyID")))
        .subscribe((data: any) => {
          this.StoreName = data.StoreName;
          if (data.ReceivedDetail.length > 0) {
            this.dataSource.data = data.ReceivedDetail;
            this.dataSource._updateChangeSubscription;
          }
          else {
            this.dataSource.data = [];
            this.dataSource._updateChangeSubscription;
            Swal.fire({
              position: 'top-end',
              type: 'warning',
              title: 'No Transfer Details Found',
              showConfirmButton: false,
              customClass: {
                popup: 'alert-warp',
                container: 'alert-container',
              },
              timer: 3000
            });
          }
        });
    }
    catch (Error) {
      this.commonService.getListOfData('Common/ErrorList/' + Error.message + '/' + "InterDepartment Receive" + '/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem('userroleID') + '/')
        .subscribe(data => { });
    }
  }

  TranserReceiptslabel = "Stock Transfer No";

  selecttype(element) {
    try {
      this.TranserReceiptslabel = "Stock Transfer No";
      this.ViewFullDetailsInfo = true;
      this.ViewRecdDetails = false;
      this.isPrint = false;
      this.StockDate = element.Date;
      this.StockTransferNo = element.StockTransferNo;
      this.commonService.getListOfData('InterDepartmentReceive/GetStockTransferDetails/' + element.StockTransferNo + '/' + parseInt(localStorage.getItem("CompanyID")))
        .subscribe((data: any) => {
          if (data.fullItemsReceivedDetails.length > 0) {
            debugger
            this.commonService.data.SenderstoreId = data.SenderstoreId;
            this.commonService.data.Senderdatetime = data.Senderdatetime;
            this.commonService.data.SenderUserId = data.SenderUserId;
            this.commonService.data.SentSmid = data.SentSmid;
            this.commonService.data.ItemDetails = data.ItemDetails;
            this.commonService.data.fullItemsReceivedDetails = data.fullItemsReceivedDetails;
            this.ViewItemDetailsSource.data = this.commonService.data.fullItemsReceivedDetails;
            this.ViewItemDetailsSource._updateChangeSubscription;
          }
          else {
            this.ViewItemDetailsSource.data = [];
            this.ViewItemDetailsSource._updateChangeSubscription;
            Swal.fire({
              position: 'top-end',
              type: 'warning',
              title: 'No Data Found',
              showConfirmButton: false,
              customClass: {
                popup: 'alert-warp',
                container: 'alert-container',
              },
              timer: 3000
            });
          }
        });
    }
    catch (Error) {
      this.commonService.getListOfData('Common/ErrorList/' + Error.message + '/' + "InterDepartment Receive" + '/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem('userroleID') + '/')
        .subscribe(data => { });
    }
  }

  Cancel() {
    this.ViewItemDetailsSource.data = [];
    this.RecdItemDetailsSource.data = [];
    this.commonService.data.ItemDetails = [];
    this.commonService.data.fullItemsReceivedDetails = [];
    this.commonService.data.storeId = null;
    this.commonService.data.SenderstoreId = null;
    this.commonService.data.SenderUserId = null;
    this.commonService.data.Senderdatetime = null;
    this.commonService.data.SentSmid = null;
    this.M_RecDate = null;
    this.StockDate = '';
    this.StockTransferNo = '';
    this.StockReceiptsNo = '';
    this.M_Name = '';
    this.ViewFullDetailsInfo = false;
    this.ViewRecdDetails = false;
    this.isPrint = false;
    this.TranserReceiptslabel = "Stock Transfer No";
  }

  RestrictNegativeValues(e): boolean {
    if (!(e.keyCode >= 48 && e.keyCode <= 57)) {
      return false;
    }
  }

  changeRecqty(e, element) {
    if (e.currentTarget.textContent == '') {
      element.RecQuantity = 0;
      e.currentTarget.textContent = '';
      element.Difference = element.SentQuantity;
    } else {
      if (e.currentTarget.textContent > element.SentQuantity) {
        Swal.fire({
          position: 'top-end',
          type: 'warning',
          title: 'Enter Valid Quantity',
          showConfirmButton: false,
          customClass: {
            popup: 'alert-warp',
            container: 'alert-container',
          },
          timer: 3000
        });
        e.currentTarget.textContent = '';
        return
      } else {
        element.RecQuantity = e.currentTarget.textContent;
        element.Difference = element.SentQuantity - element.RecQuantity;
      }
    }
  }

  changeReasons(e, element) {
    let result: string = e.target.textContent;
    element.Reasons = result;
  }

/*  Submit */
  onSubmit() {
    try {
      let result: boolean = false;
      if (this.M_RecDate == null || this.M_RecDate == '' || this.M_RecDate == undefined) {
        Swal.fire({
          position: 'top-end',
          type: 'warning',
          title: `Recd Date Required`,
          showConfirmButton: false,
          customClass: {
            popup: 'alert-warp',
            container: 'alert-container',
          },
          timer: 3000
        })
        return
      }
      if (this.commonService.data.fullItemsReceivedDetails.length == 0) {
        Swal.fire
          ({
            position: 'top-end',
            type: 'warning',
            title: `No Received Items found`,
            showConfirmButton: false,
            customClass: {
              popup: 'alert-warp',
              container: 'alert-container',
            },
            timer: 3000
          })
        return
      }
      this.commonService.data.fullItemsReceivedDetails.map(x => {
        if (x.Difference != 0 && (x.Reasons == "" || x.Reasons == null)) {
          Swal.fire({
            position: 'top-end',
            type: 'warning',
            title: `Enter Reason for ${x.DrugName}`,
            showConfirmButton: false,
            customClass: {
              popup: 'alert-warp',
              container: 'alert-container',
            },
            timer: 3000
          })
          result = true;
        }
      })

      if (result) {
        return
      }

      this.commonService.data.storeId = parseInt(this.storeID);
      this.commonService.data.cmpid = parseInt(localStorage.getItem("CompanyID"));
      this.commonService.data.TransactionID = this.TransReceive;
      this.commonService.data.Recdatetime = this.M_RecDate;
      this.commonService.data.RecName = this.M_Name;
      this.commonService.data.CreatedBy = parseInt(localStorage.getItem("userroleID"));
      this.commonService.postData('InterDepartmentReceive/AddReceivedStockDetails', this.commonService.data)
        .subscribe(data => {
          if (data.Success == true) {
            Swal.fire({
              position: 'top-end',
              type: 'success',
              title: 'Saved Successfully',
              showConfirmButton: false,
              customClass: {
                popup: 'alert-warp',
                container: 'alert-container',
              },
              timer: 3000
            });
            this.ViewFullDetailsInfo = false;
            this.commonService.getListOfData('InterDepartmentReceive/GetStoreDetails/' + parseInt(this.storeID) + '/' + this.TransIssue + '/' + parseInt(localStorage.getItem("CompanyID")))
              .subscribe((data: any) => {
                this.StoreName = data.StoreName;
                if (data.ReceivedDetail.length > 0) {
                  this.dataSource.data = data.ReceivedDetail;
                  this.dataSource._updateChangeSubscription;
                }
                else {
                  this.dataSource.data = [];
                  this.dataSource._updateChangeSubscription;
                }
              });
            debugger
            let CompanyDetails = data.CompanyDetails;
            this.CompanyName = CompanyDetails.CompanyName;
            this.CompanyAddress1 = CompanyDetails.Address1;
            this.CompanyAddress2 = CompanyDetails.Address2;
            this.CompanyAddress3 = CompanyDetails.Address3;
            this.CompanyWebsite = CompanyDetails.Website;
            this.CompanyPhone1 = CompanyDetails.Phone1;
            this.StockReceiptsNo = data.StockReceiptsNo;
            this.Dates = this.Dates;
            this.printpopup = "block";
            //this.Cancel();
          }
          else if (data.Message == "Running Number Does'nt Exist") {
            Swal.fire({
              position: 'top-end',
              type: 'warning',
              title: 'Running Number Does\'nt Exist',
              showConfirmButton: false,
              customClass: {
                popup: 'alert-warp',
                container: 'alert-container',
              },
              timer: 3000
            });
          }
          else {
            Swal.fire({
              position: 'top-end',
              type: 'warning',
              title: 'Invalid Input Contact Administrator',
              showConfirmButton: false,
              customClass: {
                popup: 'alert-warp',
                container: 'alert-container',
              },
              timer: 3000
            });
          }
        });

    }
    catch (Error) {
      this.commonService.getListOfData('Common/ErrorList/' + Error.message + '/' + "InterDepartment Receive" + '/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem('userroleID') + '/')
        .subscribe(data => { });
    }
  }

  StockReceiptsPopup() {
    try {
      this.ViewReceivedInfo = 'block';
      this.backdrop = 'block';
      this.commonService.getListOfData('InterDepartmentReceive/GetRecDetails/' + parseInt(this.storeID) + '/' + this.TransReceive + '/' + parseInt(localStorage.getItem("CompanyID")))
        .subscribe((data: any) => {
          if (data.ReceivedDetail.length > 0) {
            this.dataSource1.data = data.ReceivedDetail;
            this.dataSource1._updateChangeSubscription;
          }
          else {
            this.dataSource1.data = [];
            this.dataSource1._updateChangeSubscription;
            Swal.fire({
              type: 'warning',
              title: 'No Received Details Found',
              showConfirmButton: false,
              position: 'top-end',
              timer: 3000,
              customClass: {
                popup: 'alert-warp',
                container: 'alert-container',
              },
            });
          }
        });
    }
    catch (Error) {
      this.commonService.getListOfData('Common/ErrorList/' + Error.message + '/' + "Inter Department Receive" + '/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem('userroleID') + '/')
        .subscribe(data => { });
    }
  }

  SearchStockReceipts(element) {
    try {
      this.isPrint = true;
      this.TranserReceiptslabel = "Stock Receipt No";
      this.commonService.getListOfData('InterDepartmentReceive/GetRecStockTransferDetails/' + element.StockTransferNo + '/' + parseInt(localStorage.getItem("CompanyID")) + '/' + localStorage.getItem("GMTTIME"))
        .subscribe((data: any) => {
          debugger
          if (data.fullItemsReceivedDetails.length > 0) {
            debugger
            this.ViewRecdDetails = true;
            this.ViewFullDetailsInfo = false;
            let CompanyDetails = data.CompanyDetails;
            this.CompanyName = CompanyDetails.CompanyName;
            this.CompanyAddress1 = CompanyDetails.Address1;
            this.CompanyAddress2 = CompanyDetails.Address2;
            this.CompanyAddress3 = CompanyDetails.Address3;
            this.CompanyWebsite = CompanyDetails.Website;
            this.CompanyPhone1 = CompanyDetails.Phone1;
            this.ViewReceivedInfo = 'none';
            this.backdrop = 'none';
            this.StockDate = data.Recdatetime;
            this.StockTransferNo = data.RunningNoStock;
            this.StockReceiptsNo = data.RunningNoStock;
            this.M_Name = data.RecName;
            this.M_RecDate = data.Recdatetime;
            this.commonService.data.fullItemsReceivedDetails = data.fullItemsReceivedDetails;
            this.RecdItemDetailsSource.data = this.commonService.data.fullItemsReceivedDetails;
            this.ViewItemDetailsSource.data = this.commonService.data.fullItemsReceivedDetails;
          }
          else {
            this.ViewItemDetailsSource.data = [];
            this.RecdItemDetailsSource.data = [];
            Swal.fire({
              position: 'top-end',
              type: 'warning',
              title: 'No Data Found',
              showConfirmButton: false,
              customClass: {
                popup: 'alert-warp',
                container: 'alert-container',
              },
              timer: 3000
            });
          }
        });
    }
    catch (Error) {
      this.commonService.getListOfData('Common/ErrorList/' + Error.message + '/' + "InterDepartment Receive" + '/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem('userroleID') + '/')
        .subscribe(data => { });
    }
  }

  ViewReceivedClose()
  {
    this.ViewReceivedInfo = 'none';
    this.backdrop = 'none';
  }

  printclose() {
    this.printpopup = "none";
    this.Cancel();
  }

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
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
}
