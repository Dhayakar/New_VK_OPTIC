import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonService } from 'src/app/shared/common.service';
import { InterDepartmentTransfer, interTransfer } from 'src/app/Models/ViewModels/InterDepartmentTransfer';
import { MatTableDataSource, DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material';
import Swal from 'sweetalert2';
import { parse } from 'cfb/types';
import { number } from '@amcharts/amcharts4/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { MomentDateAdapter } from '@angular/material-moment-adapter';

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
  selector: 'app-inter-department-transfer',
  templateUrl: './inter-department-transfer.component.html',
  styleUrls: ['./inter-department-transfer.component.less'],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class InterDepartmentTransferComponent implements OnInit {

  constructor(private router: Router,public commonService: CommonService<InterDepartmentTransfer>, public el: ElementRef) { }

  Suppliername;
  ReceiverName;
  FSupplier;
  FAddress1;
  FAddress2;
  FLocation;
  FPhoneNo;
  FGSTNo;
  StoreID;
  DrugNameList = [];
  FSupplier1;
  DSupplier1;
  transactionCode;
  DSupplier;
  DAddress1;
  DAddress2;
  DLocation;
  DPhoneNo;
  DGSTNo;
  AddDrugIcon: boolean = false;
  Supplier1: boolean = true;
  GetTable1: boolean = true;
  GetTable2: boolean = false;
  interTransfers = [];
  isInvalid: boolean = false;
  SearchInfo;
  BatchInfo;
  backdrop;
  Trf_No;
  Trf_Date
  Remarks;
  printTable = [];
  druglist;
  modalmed;
  Submitprint;
  Trf_No1;
  Trf_Date1;
  FSupplier11;
  DSupplier11;
  FPhoneNo1;
  DPhoneNo1;
  FAddress11;
  DAddress11;
  printTable1 = [];
  TransactionId;
  CompanyName;
  CompanyAddress1;
  CompanyAddress2;
  CompanyAddress3;
  CompanyWebsite;
  CompanyPhone1;

  BatchModel;
  RowId;
  DrugFilterValues;

  PopBrand;
  PopReqqty;
  PopSelectedQty;

  alertBatchNo;
  AlertCriticalIntervalDays;
  AlertRetestCriticalIntervalDate;
  AlertExpDate;

  date = new Date();

  alertInfo: boolean = false;

  displayedColumns: string[] = ['SerialNo', 'Brand', 'DrugGroup', 'UOM', 'Avlblqty' ,'Quantity', 'Delete'];
  dataSource = new MatTableDataSource();

  displayedColumns1: string[] = ['DrugId', 'itemBatchNo','GoingToIssue','balanceQty', 'ExpiryDate'];
  dataSource1 = new MatTableDataSource();

  displayedColumns2: string[] = ['Action','Date', 'StockTransferNo', 'FromStore', 'ToStore'];
  dataSource2 = new MatTableDataSource();

  displayedColumns3: string[] = ['SerialNo', 'Brand', 'DrugGroup', 'UOM', 'Quantity','Action'];
  dataSource3 = new MatTableDataSource();

  SentBatchdisplayedColumns: string[] = ['Batch', 'qty', 'Expiry'];
  SentBatchdataSource = new MatTableDataSource();

  SerialDetailsdisplayedColumns: string[] = ['Serial'];
  SerialDetailsdataSource = new MatTableDataSource();

  @ViewChild('InterDeptTransfer') Form: NgForm


  BatchDetailsCoulmns: string[] = ['BatchNo', 'TotalQty', 'BalanceQty', 'ExpiryDate', 'ExpireInDays', 'RetestIntervalDate', 'RetestIntervalDays', 'CriticalIntervalDate', 'CriticalIntervalDay', 'QtyTaken']
  BatchDetailsSource = new MatTableDataSource();

  isNextButton = true;
  isNextupdate = true;
  isNextDelete = true;
  isNextPrint = true;

  accesspopup;
  accessdata;

  ngOnInit() {
    var Pathname = "Inventorylazy/InterDepartmentTransfer";
    var sstring = Pathname.includes("/");
    var Objdata = JSON.parse(localStorage.getItem("AllCollectionData"));
    this.commonService.data = new InterDepartmentTransfer();
    if (sstring == false) {
      if (Objdata.find(el => el.Parentmoduledescription === Pathname)) {
        let res = Objdata.find(x => x.Parentmoduledescription == Pathname);
        this.TransactionId = res.TransactionID;
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
        this.commonService.getListOfData('Common/GetstoreDropdownvaluesdesc/' + parseInt(localStorage.getItem("CompanyID")) + '/' + "Stock Department").subscribe((data: any) => { this.Suppliername = data });
        setTimeout(() => {
          let res1 = Objdata.find(x => x.Parentmoduledescription == Pathname);
          this.TransactionId = res1.TransactionID;
          if (this.TransactionId == null || this.TransactionId == undefined) {
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
          if (this.TransactionId != null || this.TransactionId != undefined) {
            this.commonService.getListOfData('Common/GettingRunningNo/' + localStorage.getItem('CompanyID') + '/' + this.TransactionId).subscribe(data => {
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
        }, 1000)
      }
      else {
        Swal.fire({
          text: "Un-Authorized Access, Please contact Administrator",
          type: 'warning',
          position: 'top-end',
          showConfirmButton: false,
          timer: 1500,
          customClass: {
            popup: 'alert-warp',
            container: 'alert-container',
          },
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
        this.commonService.getListOfData('Common/GetstoreDropdownvaluesdesc/' + parseInt(localStorage.getItem("CompanyID")) + '/' + "Stock Department").subscribe((data: any) => {this.Suppliername = data});
        setTimeout(() => {
          let res1 = Objdata.find(x => x.Parentmoduledescription == Pathname);
          this.TransactionId = res1.TransactionID;
          if (this.TransactionId == null || this.TransactionId == undefined) {
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
          if (this.TransactionId != null || this.TransactionId != undefined) {
            this.commonService.getListOfData('Common/GettingRunningNo/' + localStorage.getItem('CompanyID') + '/' + this.TransactionId).subscribe(data => {
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
        }, 1000)
      }
      else {
        Swal.fire({
          text: "Un-Authorized Access, Please contact Administrator",
          type: 'warning',
          position: 'top-end',
          showConfirmButton: false,
          timer: 1500,
          customClass: {
            popup: 'alert-warp',
            container: 'alert-container',
          },
        });
        this.commonService.getListOfData('Common/Getlogdetails/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem("Doctorname") + '/' + Pathname).subscribe(data => {
          this.router.navigate(['dash']);
        });
      }
    }
  }

  Getformaccess() {
    var Pathname = "Inventorylazy/InterDepartmentTransfer";
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

  modalSuccessmed() {
    this.modalmed = 'none';
    this.backdrop = 'none';
  }

  Supplier() {
    debugger
    if (this.FSupplier == undefined) {
      this.FAddress1 = "";
      this.FAddress2= "";
      this.FLocation= "";
      this.FPhoneNo = "";
    }

    this.commonService.getListOfData('InterDepartmentTransfer/GetStoreDetails/' + parseInt(this.FSupplier) + '/')
      .subscribe((data: any) => {
        data.StoreDetails.forEach((x: any) => {
          this.FAddress1 = x.Address1;
          this.FAddress2 = x.Address2;
          this.FLocation = x.Location;
          this.FPhoneNo = x.PhoneNo;
          this.StoreID = x.ID;
        });
        this.commonService.getListOfData('InterDepartmentTransfer/GetDrugvalues/' + this.StoreID + '/' + parseInt(localStorage.getItem("CompanyID"))).subscribe((data: any) => {
          if (data.length >= 1) {
            this.AddDrugIcon = true;
            this.DrugFilterValues = data;
            this.DrugNameList = data;
          }
          else {
            this.AddDrugIcon = false;
            this.DrugNameList = [];
            this.DrugFilterValues = [];
            Swal.fire({
              type: 'warning',
              text: 'Insufficient Stock',
              position: 'top-end',
              showConfirmButton: false,
              timer: 1500,
              customClass: {
                popup: 'alert-warp',
                container: 'alert-container',
              },
            })
          }
        });
        this.Supplier1 = false;
        this.commonService.getListOfData('Common/GetstoreDropdownvalues/' + parseInt(localStorage.getItem("CompanyID")) + '/' + this.StoreID + '/' + "Stock Department").subscribe((data: any) => {
          this.ReceiverName = data;
          this.DAddress1 = "";
          this.DAddress2 = "";
          this.DLocation = "";
          this.DPhoneNo = "";
        });
      });
    this.commonService.data.ExactAlloted = [];
    this.interTransfers = [];
    this.dataSource.data = [];
    this.dataSource._updateChangeSubscription;
  }

  Supplier2() {
    this.commonService.getListOfData('InterDepartmentTransfer/GetStoreDetails/' + parseInt(this.DSupplier))
      .subscribe((data: any) => {
        if (data.StoreDetails.length == 0) {
          this.DAddress1 = "";
          this.DAddress2 = "";
          this.DLocation = "";
          this.DPhoneNo = "";
        }
        data.StoreDetails.forEach((x: any) => {
          this.DAddress1 = x.Address1;
          this.DAddress2 = x.Address2;
          this.DLocation = x.Location;
          this.DPhoneNo = x.PhoneNo;
        });
      });
  }

  AddDrug() {
    debugger
    if (this.DrugNameList.length == 0) {
      Swal.fire({
        type: 'warning',
        text: 'No Drugs Available!',
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
    var interTrans = new interTransfer();
    interTrans.Brand = "";
    interTrans.GenericName = "";
    interTrans.Quantity = 0;
    interTrans.UOM = "";
    this.interTransfers.push(interTrans);
    this.commonService.data.interTransfers = this.interTransfers;
    this.dataSource.data = this.commonService.data.interTransfers;
    this.dataSource._updateChangeSubscription;
  }

  DrugDetailsSearch(event, id) {
    let DrugValue = parseInt(event.value);
    if (this.commonService.data.interTransfers.some(x => x.ID === DrugValue)) {
      Swal.fire({
        type: 'warning',
        title: 'Already Drug Added in list',
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          popup: 'alert-warp',
          container: 'alert-container',
        },
      })
      this.dataSource.data.splice(id, 1);
      this.dataSource._updateChangeSubscription();
      return;
    }
    this.dataSource.data.splice(id, 1);
    this.dataSource._updateChangeSubscription();


    this.commonService.getListOfData('BillingMaster/GetdrugDetails/' + DrugValue + '/' + this.FSupplier + '/' + localStorage.getItem("CompanyID"))
      .subscribe(data => {
        if (data.Message == 'Serial Details Drugs' && data.Success == true) {
          if (data.Message == 'Serial Details Drugs' && data.Success == true && data.Items.AvailQuantity >= 1) {
            var interTrans = new interTransfer();
            interTrans.ID = data.Items.DrugID;
            interTrans.Brand = data.Items.Brand;
            interTrans.GenericName = data.Items.GenericName;
            interTrans.UOM = data.Items.UOM;
            interTrans.AvailQuantity = data.Items.AvailQuantity;
            interTrans.SerialsInfo = data.Items.SerialList;
            interTrans.IsSerial = true;
            interTrans.Quantity = 0;
            this.commonService.data.interTransfers.push(interTrans)
            this.dataSource.data = this.commonService.data.interTransfers;
            this.dataSource._updateChangeSubscription;
          }
          else {
            Swal.fire({
              type: 'warning',
              title: `Out Of Stock`,
              position: 'top-end',
              showConfirmButton: false,
              timer: 1500,
              customClass: {
                popup: 'alert-warp',
                container: 'alert-container',
              },
            })
          }
        }
        else if (data.Message == 'Batch Details Drugs' && data.Success == true) {
          debugger
          var interTrans = new interTransfer();
          interTrans.ID = data.Items.DrugID;
          interTrans.Brand = data.Items.Drug;
          interTrans.GenericName = data.Items.GenericName;
          interTrans.UOM = data.Items.UOM;
          interTrans.AvailQuantity = data.Items.AvailQuantity;
          interTrans.BatchDetail = data.Items.BatchDetail;
          interTrans.Quantity = 0;
          interTrans.IsSerial = false;
       
       //   this.interTransfers.push(interTrans);
       //   this.commonService.data.interTransfers = this.interTransfers;
          this.commonService.data.interTransfers.push(interTrans)
          this.dataSource.data = this.commonService.data.interTransfers;
          this.dataSource._updateChangeSubscription;
        }
        else if (data.Message == 'Other Drug Details Drugs' && data.Success == true && data.AvailableQty >= 1) {
          debugger
          var interTrans = new interTransfer();
          interTrans.ID = data.DrugID;
          interTrans.Brand = data.Brand;
          interTrans.GenericName = data.GenericName;
          interTrans.UOM = data.UOM;
          interTrans.AvailQuantity = data.AvailableQty;
          interTrans.SerialsInfo = data.SerialList;
          interTrans.IsSerial = null;
          interTrans.Quantity = 0;
         // this.interTransfers.push(interTrans);
      //    this.commonService.data.interTransfers = this.interTransfers;
          this.commonService.data.interTransfers.push(interTrans)
          this.dataSource.data = this.commonService.data.interTransfers;
          this.dataSource._updateChangeSubscription;
        }
        else {
          Swal.fire({
            title: 'Out Of Stock',
            type: 'warning',
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

  Filterdatainputdrug(value: string) {
    const DrugValues = this.DrugFilterValues;
    const Value = value.toLowerCase();
    this.DrugNameList = DrugValues.filter(option => option.Text.toLowerCase().includes(Value));
  }

  remove(drugId) {
    this.commonService.data.ExactAlloted.map(x => {
      this.commonService.data.ExactAlloted.filter((y, z) => {
        if (y.DrugId == drugId) {
          this.commonService.data.ExactAlloted.splice(z, 1);
        }
      })
    })
  }

  DropDrug(e, i) {
    let drugId = Number(e.ID);
    let Brand = e.Brand;
    Swal.fire({
      title: 'Are you sure?',
      text: "Want to Drop This Brand!",
      type: 'warning',
      showCancelButton: true,
      cancelButtonColor: '#d33',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Yes',
      reverseButtons: true,
    }).then((result) => {
      if (result.value) {
        if (i !== -1) {
          if (this.commonService.data.ExactAlloted.length >= 1) {
            while (this.commonService.data.ExactAlloted.some(x => x.DrugId == drugId )) {
              this.remove(drugId);
            }
          }
          this.dataSource.data.splice(i, 1);
          this.dataSource._updateChangeSubscription();
        };
        Swal.fire({
          title: 'Deleted',
          type: 'warning',
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

  BatchList(element, id) {
    if (element.Quantity === null || element.Quantity === 0 || element.Quantity === undefined) {
      Swal.fire({
        type: 'warning',
        title: 'Enter Valid Req qty',
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          popup: 'alert-warp',
          container: 'alert-container',
        },
      })
      return;
    }
    this.BatchModel = 'block';
    this.backdrop = 'block';
    this.RowId = id;
    this.PopBrand = element.Brand;
    this.PopReqqty = element.Quantity;
    this.PopSelectedQty = element.SelectedBatchQty;
    this.BatchDetailsSource.data = element.BatchDetail;
    this.BatchDetailsSource._updateChangeSubscription();
  }

  BatchModelClose() {
    Swal.fire({
      title: 'Are you sure?',
      text: "Want to exit",
      type: 'warning',
      showCancelButton: true,
      cancelButtonColor: '#228B22',
      cancelButtonText: 'No',
      confirmButtonColor: '#d33',
      confirmButtonText: 'Yes',
      reverseButtons: true,
      focusCancel: true,
      allowOutsideClick: false,
    }).then((result) => {
      if (result.value) {
        this.BatchModel = 'none';
        this.backdrop = 'none';
      }
    })
  }



  myFunction(e) {
    this.alertInfo = true;
    this.alertBatchNo = e.BatchNo;
    this.AlertCriticalIntervalDays = e.CriticalIntervalDay;
    this.AlertRetestCriticalIntervalDate = e.CriticalIntervalDate;
    this.AlertExpDate = e.ExpiryDate;

  }

  alertHide() {
    this.alertInfo = false;
  }

  RestrictNegativeValues1(e): boolean {
    debugger
    if (!(e.keyCode >= 48 && e.keyCode <= 57 || e.keyCode == 46)) {
      return false;
    }
  }


  changeValue1(id, property: string, event: any, element) {
    let result: number = Number(event.target.textContent);
    if (result == 0) {
      event.target.textContent = '';
      this.BatchDetailsSource.filteredData[id][property] = 0;
      this.BatchDetailsSource._updateChangeSubscription();
      return
    }
    if (result > element.BalanceQty) {
      Swal.fire({
        type: 'warning',
        title: 'Insufficient Qty',
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          popup: 'alert-warp',
          container: 'alert-container',
        },
      })
      event.target.textContent = '';
      this.BatchDetailsSource.filteredData[id][property] = 0;
      this.BatchDetailsSource._updateChangeSubscription();
      return
    }
    if (result > this.PopReqqty) {
      Swal.fire({
        type: 'warning',
        title: 'Cannot Give More than Req Qty',
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          popup: 'alert-warp',
          container: 'alert-container',
        },
      })
      event.target.textContent = '';
      this.BatchDetailsSource.filteredData[id][property] = 0;
      this.BatchDetailsSource._updateChangeSubscription();
      return
    }

    this.BatchDetailsSource.filteredData[id][property] = result;
    this.BatchDetailsSource._updateChangeSubscription();
  }

  checkingTableQty(id, property: string, event: any, element) {
    let total = this.commonService.data.interTransfers[this.RowId].BatchDetail.map(x => x.QtyTaken).reduce((acc, value) => acc + value, 0);
    if (total <= this.PopReqqty) {
      this.commonService.data.interTransfers[this.RowId].SelectedBatchQty = total;
      this.PopSelectedQty = this.commonService.data.interTransfers[this.RowId].SelectedBatchQty;
    }
    if (total > this.PopReqqty) {
      Swal.fire({
        type: 'warning',
        title: 'Cannot Give More than Req Qty',
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          popup: 'alert-warp',
          container: 'alert-container',
        },
      })
      event.target.textContent = '';
      this.BatchDetailsSource.filteredData[id][property] = 0;
      this.BatchDetailsSource._updateChangeSubscription();
      return
    }
  }

  BatchQtyCheck() {
    if (this.PopReqqty != this.PopSelectedQty) {
      Swal.fire({
        type: 'warning',
        title: `Requested qty does not match \n with the selected qty`,
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          popup: 'alert-warp',
          container: 'alert-container',
        },
      })
      return
    } else {
      this.BatchModel = 'none';
      this.backdrop = 'none';
    }
  }

  selectedOptions;
  SerialModels;
  SerialLists;

  SerialList(element, id) {
    debugger
    if (element.Quantity === null || element.Quantity === 0 || element.Quantity === undefined) {
      Swal.fire({
        type: 'warning',
        title: 'Enter Valid Req qty',
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          popup: 'alert-warp',
          container: 'alert-container',
        },
      })
      return;
    }
    this.SerialModels = 'block';
    this.backdrop = 'block';
    this.RowId = id;
    this.SerialLists = element.SerialsInfo;
    this.selectedOptions = this.commonService.data.interTransfers[id].SelectedList;
    this.PopBrand = element.Brand;
    this.PopReqqty = element.Quantity;
    if (element.SelectedList) {
      this.PopSelectedQty = this.commonService.data.interTransfers[id].SelectedList.length;
    } else {
      this.PopSelectedQty = 0;
    }

  }

  SerialLis(event, list) {
    debugger
    let length = list.selectedOptions.selected.length;
    if (length > this.PopReqqty) {
      debugger
      Swal.fire({
        type: 'warning',
        title: 'Cannot Select More than Req Qty',
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          popup: 'alert-warp',
          container: 'alert-container',
        },
      })
    }
    else {
      debugger
      this.commonService.data.interTransfers[this.RowId].SelectedList = event;
      this.PopSelectedQty = list.selectedOptions.selected.length;
    }

  }

  onSelection(event) {
    let length = event.option.selectionList.selectedOptions.selected.length;
    if (length > this.PopReqqty) {
      event.option.selected = false;
    }
  }

  SerialModelClose() {
    Swal.fire({
      title: 'Are you sure?',
      text: "Want to exit",
      type: 'warning',
      showCancelButton: true,
      cancelButtonColor: '#228B22',
      cancelButtonText: 'No',
      confirmButtonColor: '#d33',
      confirmButtonText: 'Yes',
      reverseButtons: true,
      focusCancel: true,
      allowOutsideClick: false,
    }).then((result) => {
      if (result.value) {
        this.SerialModels = 'none';
        this.backdrop = 'none';
      }
    })
  }

  QtyCheck() {
    if (this.PopReqqty != this.PopSelectedQty) {
      Swal.fire({
        type: 'warning',
        title: `Requested qty does not match \n with the selected qty`,
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          popup: 'alert-warp',
          container: 'alert-container',
        },
      })
      return
    } else {
      this.SerialModels = 'none';
      this.backdrop = 'none';
    }
  }

  BatchInfoClose() {
    this.BatchInfo = 'none';
    this.backdrop = 'none';
  }

  SearchInfoClose() {
    this.SearchInfo = 'none';
    this.backdrop = 'none';
  }

  /*  Validation */
  RestrictNegativeValues(e): boolean {
    if (!(e.keyCode >= 48 && e.keyCode <= 57)) {
      return false;
    }
  }

  changeValue(id, property: string, event: any) {
    let result: number = Number(event.target.textContent);
    this.dataSource.filteredData[id][property] = result;
    this.dataSource._updateChangeSubscription();
  }

  /*  Submit */
  onSubmit(Form: NgForm) {
    try {
      let result: boolean = false;
      if (this.commonService.data.interTransfers.length >= 1) {
        this.commonService.data.interTransfers.filter(x => x.IsSerial == true).map(x => {
          if (x.SelectedList) {
            if (x.SelectedList.length != x.Quantity) {
              Swal.fire({
                type: 'warning',
                title: `Qty Mismatch ${x.Brand}`,
                position: 'top-end',
                showConfirmButton: false,
                timer: 1500,
                customClass: {
                  popup: 'alert-warp',
                  container: 'alert-container',
                },
              })
              result = true;
            }
          }
          else {
            Swal.fire({
              type: 'warning',
              title: `Please Select Serial of Drug ${x.Brand}`,
              position: 'top-end',
              showConfirmButton: false,
              timer: 1500,
              customClass: {
                popup: 'alert-warp',
                container: 'alert-container',
              },
            })
            result = true;
          }
        })
        this.commonService.data.interTransfers.filter(x => x.IsSerial == false).map(x => {
          if (x.SelectedBatchQty == undefined) {
            debugger
            Swal.fire({
              type: 'warning',
              title: `Select Batch qty ${x.Brand}`,
              position: 'top-end',
              showConfirmButton: false,
              timer: 1500,
              customClass: {
                popup: 'alert-warp',
                container: 'alert-container',
              },
            })
            result = true;
          }
          if (x.Quantity != x.SelectedBatchQty) {
            debugger
            Swal.fire({
              type: 'warning',
              title: `Qty Mismatch ${x.Brand}`,
              position: 'top-end',
              showConfirmButton: false,
              timer: 1500,
              customClass: {
                popup: 'alert-warp',
                container: 'alert-container',
              },
            })
            result = true;
          }
        })
        this.commonService.data.interTransfers.filter(x => x.IsSerial == null).map(x => {
          if (x.Quantity == undefined || x.Quantity == 0) {
            debugger
            Swal.fire({
              type: 'warning',
              title: `Select  qty ${x.Brand}`,
              position: 'top-end',
              showConfirmButton: false,
              timer: 1500,
              customClass: {
                popup: 'alert-warp',
                container: 'alert-container',
              },
            })
            result = true;
          }
        })
        if (result) {
          return
        }
      }
      if (Form.valid) {
        debugger
        this.isInvalid = false;
        this.commonService.data.SupplierStoreID = parseInt(this.FSupplier);
        this.commonService.data.ReceiverStoreID = parseInt(this.DSupplier);
        this.commonService.data.TransactionId = this.TransactionId;
        this.commonService.data.Cmpid = parseInt(localStorage.getItem("CompanyID"));
        this.commonService.data.CreatedBy = parseInt(localStorage.getItem("userroleID"));

        this.commonService.postData('InterDepartmentTransfer/AddstockDetails', this.commonService.data)
          .subscribe(data => {
            debugger
            if (data.Success == true) {
              debugger
              Swal.fire({
                type: 'success',
                title: 'Saved Successfully',
                position: 'top-end',
                showConfirmButton: false,
                timer: 1500,
                customClass: {
                  popup: 'alert-warp',
                  container: 'alert-container',
                },
              });
              let CompanyDetails = data.CompanyDetails;
              this.CompanyName = CompanyDetails.CompanyName;
              this.CompanyAddress1 = CompanyDetails.Address1;
              this.CompanyAddress2 = CompanyDetails.Address2;
              this.CompanyAddress3 = CompanyDetails.Address3;
              this.CompanyWebsite = CompanyDetails.Website;
              this.CompanyPhone1 = CompanyDetails.Phone1;
              this.Trf_No1 = data.StockTransferNo;
              this.Trf_Date1 = this.date;
              this.FSupplier11 = data.SupplierStoreName;
              this.DSupplier11 = data.ReceiverStoreName;
              this.FPhoneNo1 = this.FPhoneNo;
              this.DPhoneNo1 = this.DPhoneNo;
              this.FAddress11 = this.FAddress1;
              this.DAddress11 = this.DAddress1;
              this.printTable1 = this.commonService.data.interTransfers;

             // this.backdrop = 'block';
              this.Submitprint = 'block';
              //this.Print1();

              //this.printTable1 = [];

             // this.interTransfers = [];
            //  this.commonService.data.interTransfers = [];
            //  this.dataSource.data = [];
          //    this.AddDrugIcon = false;
            //  this.Form.onReset();
            //  this.Cancel();
            }
            else if (data.Message == "Out Of Stock Medicines") {
              this.druglist = data.OutOfStock;
              this.modalmed = 'block';
              this.backdrop = 'block';
            }
            else if (data.Message == "Running Number Does'nt Exist") {
              Swal.fire({
                type: 'warning',
                title: 'Running Number Does\'nt Exist',
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
                title: 'Invalid Input Contact Administrator',
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
      this.commonService.getListOfData('Common/ErrorList/' + Error.message + '/' + "InterDepartment Transfer" + '/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem('userroleID') + '/')
        .subscribe(data => { });
    }
  }

  /*  Transfer Search*/
  TransferSearch() {
    debugger
    try {
      this.SearchInfo = 'block';
      this.backdrop = 'block';

      this.commonService.getListOfData("InterDepartmentTransfer/InterDepartmentTransferDetails/" + this.TransactionId)
        .subscribe(data => {
          if (data.InterDepartmentTransferDetail.length > 0) {
            this.dataSource2.data = data.InterDepartmentTransferDetail;
            this.dataSource2._updateChangeSubscription();
          }
          else {
            this.dataSource2.data = []
            this.dataSource2._updateChangeSubscription();
            Swal.fire({
              type: 'warning',
              title: 'No Data Found',
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
      this.commonService.getListOfData('Common/ErrorList/' + Error.message + '/' + "InterDepartment Transfer" + '/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem('userroleID') + '/')
        .subscribe(data => { });
    }
  }

  /*Cancel*/
  Cancel() {
    this.DAddress1 = "";
    this.DAddress2 = "";
    this.DLocation = "";
    this.DPhoneNo = "";
    this.FAddress1 = "";
    this.FAddress2 = "";
    this.FLocation = "";
    this.FPhoneNo = "";
    this.DrugNameList = undefined;
    this.AddDrugIcon = false;
    this.GetTable1 = true;
    this.GetTable2 = false;
    this.commonService.data.ExactAlloted = [];
    this.DrugFilterValues = [];
    this.dataSource.data = [];
    this.dataSource1.data = [];
    this.dataSource2.data = [];
    this.dataSource3.data = [];
    this.SentBatchdataSource.data = [];
    this.SerialDetailsdataSource.data = [];
    this.interTransfers = [];
    this.commonService.data.interTransfers = [];
    this.dataSource.data = [];
    this.Form.onReset();
  }

  /*Pop Up */
  selecttype(element) {
    try {
      let StockTransferNo = element.stockTransNo;
      this.SearchInfo = 'none';
      this.backdrop = 'none';
      this.GetTable1 = false;
      this.GetTable2 = true;

      this.commonService.getListOfData("InterDepartmentTransfer/StockTransferDetails/" + StockTransferNo + '/' + parseInt(localStorage.getItem("CompanyID")))
        .subscribe(data => {
          debugger
          let CompanyDetails = data.CompanyDetails;
          this.CompanyName = CompanyDetails.CompanyName;
          this.CompanyAddress1 = CompanyDetails.Address1;
          this.CompanyAddress2 = CompanyDetails.Address2;
          this.CompanyAddress3 = CompanyDetails.Address3;
          this.CompanyWebsite = CompanyDetails.Website;
          this.CompanyPhone1 = CompanyDetails.Phone1;

          this.Trf_No = data.StockTransferNo;
          this.Trf_Date = data.StockTransferDate;
          this.printTable = data.DrugDetails;


          this.dataSource3.data = data.DrugDetails;


          data.Receiverdetail.forEach((x: any) => {
            debugger
            this.DSupplier1 = x.ReceiverStore
            this.DAddress1 = x.ReceiverAddress1;
            this.DAddress2 = x.ReceiverAddress2;
            this.DLocation = x.ReceiverLocation;
            this.DPhoneNo = x.ReceiverPhoneNo;
          });
          data.Supplierdetail.forEach((x: any) => {
            this.FSupplier1 = x.SupplierStore;
            this.FAddress1 = x.SupplierAddress1;
            this.FAddress2 = x.SupplierAddress2;
            this.FLocation = x.SupplierLocation;
            this.FPhoneNo = x.SupplierPhoneNo;
          });
        });
    }
    catch (Error) {
      this.commonService.getListOfData('Common/ErrorList/' + Error.message + '/' + "InterDepartment Transfer" + '/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem('userroleID') + '/')
        .subscribe(data => { });
    }
  }

  SentBatchDetails;
  SerialDetails;

  GivenBatchList(element, i)
  {
    debugger
    this.SentBatchDetails = 'block';
    this.backdrop = 'block';
    this.PopBrand = element.Brand;
    this.PopSelectedQty = element.Quantity;
    this.SentBatchdataSource.data = element.BatchDetails;
    this.SentBatchdataSource._updateChangeSubscription();
  }

  SentBatchBatchClose() {
    this.SentBatchDetails = 'none';
    this.backdrop = 'none';
  }

  GivenSerialList(element, i)
  {
    this.SerialDetails = 'block';
    this.backdrop = 'block';
    this.PopBrand = element.Brand;
    this.PopSelectedQty = element.Quantity;
    this.SerialDetailsdataSource.data = element.SerialDetails;
    this.SerialDetailsdataSource._updateChangeSubscription();
  }

  SerialDetailsClose() {
    this.SerialDetails = 'none';
    this.backdrop = 'none';
  }


  printclose() {
    this.Submitprint = "none";
    this.backdrop = "none";
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

  Print1() {
    let printContents, popupWin;
    printContents = document.getElementById('section1').innerHTML;
    popupWin = window.open('', '_blank', 'top=0,left=0,height=auto,width=100%');
    popupWin.document.open();
    popupWin.document.write(`
             <html>
             <head>
              <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">
            <title></title>
            <style> 
             .divTable
              {
                  display:  table;
                  width:auto;
                  background-color:#eee;
                  border-spacing:5px;
              }

              .divRow
              {
                 display:table-row;
                 width:auto;
              }

              .divCell
              {
                  float:left;/*fix for  buggy browsers*/
                  display:table-column;
                  width:200px;
                  background-color:#ccc;
              }
            </style>
          </head>
      <body onload="window.print();window.close()">${printContents}</body>
        </html>`);
    popupWin.document.close();
  }
  ///////////////////////////////////////////////////////////////////////////////
}
