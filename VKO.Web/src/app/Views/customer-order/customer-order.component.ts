import { Component, OnInit, ViewEncapsulation, ViewChild, DoCheck, ElementRef } from '@angular/core';
import { MatTableDataSource, DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { SearchComponent } from '../search/search.component';
import { CommonService } from 'src/app/shared/common.service';
import { CustomerOrderViewModel, CustomerItemOrder, OnePlusOfferDetails, OPTICALPRESCRIPTION1 } from 'src/app/Models/ViewModels/CustomerOrderViewModel';
import Swal from 'sweetalert2';
import { toNumber } from '@amcharts/amcharts4/.internal/core/utils/Type';
import { Payment_Master } from 'src/app/Models/PaymentWebModel ';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { Router } from '@angular/router';
import { Gallery, GalleryItem, ImageItem, ThumbnailsPosition, ImageSize } from '@ngx-gallery/core';
import { FINALPRESCRIPTION } from '../../Models/FINALPRESCRIPTION.model';
import { parse } from 'path';

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
  selector: 'app-customer-order',
  templateUrl: './customer-order.component.html',
  styleUrls: ['./customer-order.component.less'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },

  ],
})

export class CustomerOrderComponent implements OnInit, DoCheck {

  constructor(public dialog: MatDialog, public commonService: CommonService<CustomerOrderViewModel>, private router: Router, private gallery: Gallery) { }

  date = new Date();

  Prints: boolean = false;

  M_OrderNo;
  M_OrderDate;
  M_CustomerID;
  M_CustomerName;
  M_Address;
  M_MobileNo;
  M_Location;

  M_Refdate;
  M_RefNo;

  M_AdvanceAmount;

  backdrop;
  FrameModel;
  OfferModel;
  OrderedListModel;

  Brands;
  M_SelectedType;

  Uploadfilesblock;
  urls = [];
  blobss = [];
  blobsize;
  img1;
  disableRow = true;
  M_ReceiptNo;
  M_ReceiptNoDate;

  M_Deliverydate;
  M_Remarks;

  M_paymode;
  M_InstrumentNumber;
  M_InstrumentDate;
  M_BankName;
  M_Branch;
  M_ExpiryDate;
  M_Amount;
  @ViewChild('UploadPres') UploadPres: ElementRef;
  M_PrescriptionDate;
  M_PrescribedDoctor;
  paydel1 = [];
  paydel2 = [];
  gridamount;
  Index;
  PTotalAmount;
  regTranId;
  UIN;

  optical;
  SPHACC1;
  CYLACC1
  AXISACC1
  VA
  SPHTAN1
  CYLTAN1
  AXISTAN1
  VATANA1
  SPHNV1
  VANVV
  SPHNVR1
  VANVRR
  Remarksacc
  PDD
  MPD
  MPD1
  PrescriptionlistModel;
  PrescriptionModel;
  NoPayment: boolean = false;
  hiddenuploadedImage: boolean = false;
  uploadedImages = [];
  PrescriptionColumns: string[] = ['PrescriptionDate', 'CustomerName', 'MobileNo']
  PrescriptionSource = new MatTableDataSource();
  isDisabled = true;

  ViewOpPres = true;
  ViewOpPreslist = false;

  DisabledPrescriptions = false;

  OnePlusOfferDetails: Array<OnePlusOfferDetails> = [];

  OfferCount = 0;

  OfferValue;
  RemainingItems;
  RemainingBalance;

  Paymentsmodes;
  paymentCash: boolean = true;
  paymentChequeDd: boolean = true;
  paymentDebitCredit: boolean = false;

  LoginLocationId;
  M_LocationID

  GivenAdvanceTotal;
  Tc;

  TaxGroup;

  Submitprint;

  CompanyName;
  CompanyAddress1;
  CompanyAddress2;
  CompanyAddress3;
  CompanyWebsite;
  CompanyPhone1;

  opticalPrescriptionpopup;
  opticalPrescriptionblock;

  Getloctime;
  CancelOpticalPrescription() {

  }
  isNextButton = true;
  isNextupdate = true;
  isNextDelete = true;
  isNextPrint = true;
  accesspopup1;
  accessdata;
  @ViewChild('CustomerOrder') Form: NgForm
  Country1;
  Country2;
  ngOnInit() {
    debugger
    var Pathname = "Opticalslazy/CustomerOrder";
    var n = Pathname;
    var sstring = n.includes("/");
    this.commonService.data = new CustomerOrderViewModel();
    var Objdata = JSON.parse(localStorage.getItem("AllCollectionData"));
    if (sstring == false) {
      if (Objdata.find(el => el.Parentmoduledescription === Pathname)) {
        this.Getloctime = localStorage.getItem('GMTTIME');
        this.commonService.getListOfData('Common/GetCurrencyvalues/' + localStorage.getItem('CompanyID')).subscribe(data => {
          debugger;
          this.Country1 = data[0].Value;
          this.Country2 = data[0].Text;
        });
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
        this.M_OrderDate = this.date.getDate() + "-" + this.date.toLocaleString('default', { month: 'long' }) + "-" + this.date.getFullYear();
        this.commonService.getListOfData('Common/Getpaymentvalues').subscribe(data => { this.Paymentsmodes = data; });
        this.commonService.getListOfData('Common/GetLoginLocationId/' + localStorage.getItem("CompanyID")).subscribe(data => { this.LoginLocationId = data.data; });
        this.displayedColumns3 = ['PaymentMode', 'InstrumentNumber', 'InstrumentDate', 'BankName', 'Branch', 'ExpiryDate', 'Amount', 'Action'];
      }
      else {
        Swal.fire({
          type: 'warning',
          title: 'Un-Authorized Access, Please contact Administrator',
          position: 'top-end',
          showConfirmButton: false,
          timer: 1500,
          customClass: {
            popup: 'alert-warp',
            container: 'alert-container',
          },
        });
        this.commonService.getListOfData('Common/Getlogdetails/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem("Doctorname") + '/' + "CustomerOrder").subscribe(data => {
          this.router.navigate(['dash']);
        });
      }
    }
    else if (sstring == true) {
      debugger
      if (Objdata.find(el => el.Parentmoduledescription === Pathname)) {
        this.Getloctime = localStorage.getItem('GMTTIME');
        this.commonService.data.CustomerItemOrders = [];
        this.commonService.data.paymenttran = [];
        this.commonService.getListOfData('Common/GetCurrencyvalues/' + localStorage.getItem('CompanyID')).subscribe(data => {
          this.Country1 = data[0].Value;
          this.Country2 = data[0].Text;
        });
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
        this.M_OrderDate = this.date.getDate() + "-" + this.date.toLocaleString('default', { month: 'long' }) + "-" + this.date.getFullYear();
        this.commonService.getListOfData('Common/Getpaymentvalues').subscribe(data => { this.Paymentsmodes = data; });
        this.commonService.getListOfData('Common/GetLoginLocationId/' + localStorage.getItem("CompanyID")).subscribe(data => { this.LoginLocationId = data.data; });
        this.displayedColumns3 = ['PaymentMode', 'InstrumentNumber', 'InstrumentDate', 'BankName', 'Branch', 'ExpiryDate', 'Amount', 'Action'];
      }
      else {
        Swal.fire({
          type: 'warning',
          title: 'Un-Authorized Access, Please contact Administrator',
          position: 'top-end',
          showConfirmButton: false,
          timer: 1500,
          customClass: {
            popup: 'alert-warp',
            container: 'alert-container',
          },
        });
        this.commonService.getListOfData('Common/Getlogdetails/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem("Doctorname") + '/' + "CustomerOrder").subscribe(data => {
          this.router.navigate(['dash']);
        });
      }
    }
  }

  displayedColumns = ['Type', 'Brand', 'Description', 'UOM', 'QTY', 'Price', 'Amount', 'Discount%', 'DiscountAmount', 'GrossAmount', 'CGST', 'CGSTValue', 'SGST', 'SGSTValue', 'NetAmount', 'Action']
  dataSource = new MatTableDataSource();

  displayedColumnsCombined = ['Types', 'Brands', 'Descriptions', 'UOMs', 'QTYs', 'Prices', 'Amounts', 'header-row-group', 'GrossAmounts', 'CGSTTax', 'SGSTTax', 'NetAmounts', 'Actions']


  displayedColumnsGst = ['Type', 'Brand', 'Description', 'UOM', 'QTY', 'Price', 'Amount', 'Discount%', 'DiscountAmount', 'GrossAmount', 'CGST', 'CGSTValue', 'SGST', 'SGSTValue', 'NetAmount', 'Action']
  displayedColumnsGsts = ['Types', 'Brands', 'Descriptions', 'UOMs', 'QTYs', 'Prices', 'Amounts', 'header-row-group', 'GrossAmounts', 'CGSTTax', 'SGSTTax', 'NetAmounts', 'Actions']

  displayedColumnsIGst = ['Type', 'Brand', 'Description', 'UOM', 'QTY', 'Price', 'Amount', 'Discount%', 'DiscountAmount', 'GrossAmount', 'IGST', 'IGSTValue', 'NetAmount', 'Action']
  displayedColumnsIGsts = ['Types', 'Brands', 'Descriptions', 'UOMs', 'QTYs', 'Prices', 'Amounts', 'header-row-group', 'GrossAmounts', 'IGSTTax', 'NetAmounts', 'Actions']


  displayedColumns1 = ['Action', 'Type', 'Brand', 'Description', 'Price', 'Stockqty']
  dataSource1 = new MatTableDataSource();

  displayedColumns2 = ['Brand', 'Model', 'LensOptions', 'Description', 'Index', 'Color', 'Size', 'Quantity']
  dataSource2 = new MatTableDataSource();

  //displayedColumns3: string[] 
  //dataSource3 = new MatTableDataSource();

  displayedColumns3: string[] = ['PaymentMode', 'BankName', 'InstrumentNumber', 'InstrumentDate', 'ExpiryDate', 'Branch', 'Amount', 'Action'];
  dataSource3 = new MatTableDataSource();

  displayedColumns4: string[] = ['Action', 'OrderNo', 'OrderDate', 'CustomerName', 'OrderStatus']
  dataSource4 = new MatTableDataSource();

  PrintdisplayedColumns = ['Type', 'Brand', 'Description', 'UOM', 'QTY', 'Price', 'Amount', 'Discount%', 'DiscountAmount', 'GrossAmount', 'CGST', 'CGSTValue', 'SGST', 'SGSTValue', 'NetAmount']
  PrintdataSource = new MatTableDataSource();

  PrintdisplayedColumnsCombined = ['Types', 'Brands', 'Descriptions', 'UOMs', 'QTYs', 'Prices', 'Amounts', 'header-row-group', 'GrossAmounts', 'CGSTTax', 'SGSTTax', 'NetAmounts']

  PrintdisplayedColumnsGst = ['Type', 'Brand', 'Description', 'UOM', 'QTY', 'Price', 'Amount', 'Discount%', 'DiscountAmount', 'GrossAmount', 'CGST', 'CGSTValue', 'SGST', 'SGSTValue', 'NetAmount']
  PrintdisplayedColumnsGsts = ['Types', 'Brands', 'Descriptions', 'UOMs', 'QTYs', 'Prices', 'Amounts', 'header-row-group', 'GrossAmounts', 'CGSTTax', 'SGSTTax', 'NetAmounts']

  PrintdisplayedColumnsIGst = ['Type', 'Brand', 'Description', 'UOM', 'QTY', 'Price', 'Amount', 'Discount%', 'DiscountAmount', 'GrossAmount', 'IGST', 'IGSTValue', 'NetAmount']
  PrintdisplayedColumnsIGsts = ['Types', 'Brands', 'Descriptions', 'UOMs', 'QTYs', 'Prices', 'Amounts', 'header-row-group', 'GrossAmounts', 'IGSTTax', 'NetAmounts']



  Getformaccess() {
    var Pathname = "Opticalslazy/CustomerOrder";
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
  optical1;
  /* Registered Customer */
  RegisteredCustomer() {
    debugger;
    localStorage.setItem('helpname', 'Customer Master');
    const dialogRef = this.dialog.open(SearchComponent, {
      height: '70%',
      width: '85%',
      disableClose: true
    });
    this.commonService.getListOfData('Common/GetDVvalues').subscribe(data => {
      this.VAname = data;
    });
    this.commonService.getListOfData('Common/GetNVvalues').subscribe(data => {
      this.VAnamenear1 = data;
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result.success) {
        debugger;
        let item = result.data;
        this.M_CustomerID = item.ID
        this.opticalPrescriptionpopup = 'block';
        this.backdrop = 'block';


        this.DisabledPrescriptions = false;
        this.M_CustomerName = item.Name.concat(' ', item.MidleName != null ? item.MidleName : '', item.LastName != null ? item.LastName : '')
        this.M_Address = item.Address1.concat(' ', item.Address2 != null ? item.Address2 : '', ' ', item.Address3 != null ? item.Address3 : '')
        this.M_MobileNo = item.MobileNo
        this.M_Location = item.LocationName
        this.M_LocationID = item.LocationID

        if (this.M_LocationID == this.LoginLocationId) {
          this.dataSource.data = [];
          this.commonService.data.CustomerItemOrders = [];
          this.TaxGroup = "withinState";
          this.displayedColumns = this.displayedColumnsGst;
          this.displayedColumnsCombined = this.displayedColumnsGsts;

          //this.commonService.getListOfData('Help/CustomerOrder/' + parseInt(localStorage.getItem("CompanyID")) + '/' + this.TaxGroup).subscribe(data => {
          //  if (data.OfferDetails.length >= 1) {
          //    this.dataSource1.data = data.OfferDetails;
          //    this.dataSource1._updateChangeSubscription();
          //  }
          //  else {
          //    Swal.fire({
          //      type: 'warning',
          //      title: 'No Data Found',
          //      position: 'top-end',
          //      showConfirmButton: false,
          //      timer: 1500,
          //      customClass: {
          //        popup: 'alert-warp',
          //        container: 'alert-container',
          //      },
          //    });
          //    this.dataSource1.data = [];
          //    this.dataSource1._updateChangeSubscription();
          //  }
          //});
        }
        else {
          this.dataSource.data = [];
          this.commonService.data.CustomerItemOrders = [];
          this.TaxGroup = "interstate";
          this.displayedColumns = this.displayedColumnsIGst;
          this.displayedColumnsCombined = this.displayedColumnsIGsts;

          //this.commonService.getListOfData('Help/CustomerOrder/' + parseInt(localStorage.getItem("CompanyID")) + '/' + this.TaxGroup).subscribe(data => {
          //  if (data.OfferDetails.length >= 1) {
          //    this.dataSource1.data = data.OfferDetails;
          //    this.dataSource1._updateChangeSubscription();
          //  }
          //  else {
          //    Swal.fire({
          //      type: 'warning',
          //      title: 'No Data Found',
          //      position: 'top-end',
          //      showConfirmButton: false,
          //      timer: 1500,
          //      customClass: {
          //        popup: 'alert-warp',
          //        container: 'alert-container',
          //      },
          //    });
          //    this.dataSource1.data = [];
          //    this.dataSource1._updateChangeSubscription();
          //  }
          //});

        }




      }
    });
  }

  opticalPrescriptionpopupNo() {
    this.opticalPrescriptionpopup = 'none';
    this.backdrop = 'none';
  }
  opticalPrescriptionpopupYes() {
    debugger;
    this.Addfinalprescription();


    this.opticalPrescriptionpopup = 'none';
    this.backdrop = 'none';
    this.opticalPrescriptionblock = 'block';
    this.backdrop = 'block';
  }
  opticalPrescriptionClose() {
    this.FINALPRESCRIPTION = [];
    this.Refraction = [];
    this.arrop = [];
    this.opticalprescriptionlength = [];
    this.opticalPrescriptionblock = 'none';
    this.backdrop = 'none';
  }
  /* Adding Item Popup */
  AddItemDetails() {
    debugger
    if (this.commonService.data.CustomerItemOrders.length >= 1) {
      if (this.commonService.data.CustomerItemOrders.some(x => x.Brand === "")) {
        return;
      }
    }
    let CustomOrder = new CustomerItemOrder();
    CustomOrder.Type = '';
    CustomOrder.Brand = '';
    CustomOrder.Model = '';
    CustomOrder.LensOptions = '';
    CustomOrder.Index = '';
    CustomOrder.Color = '';
    CustomOrder.HSNNo = '';
    CustomOrder.UOM = '';
    CustomOrder.GrossAmount = 0;
    CustomOrder.Quantity = 0;
    CustomOrder.UnitPrice = 0;
    CustomOrder.GivenQtyPrice = 0;
    CustomOrder.Discount = 0;
    CustomOrder.DiscountAmount = 0;
    CustomOrder.CGST = 0;
    CustomOrder.SGST = 0;
    CustomOrder.IGST = 0;
    CustomOrder.GSTValue = 0;
    CustomOrder.Amount = 0;
    CustomOrder.Count = 0;
    this.commonService.data.CustomerItemOrders.unshift(CustomOrder);
    this.dataSource.data = this.commonService.data.CustomerItemOrders;
    this.dataSource._updateChangeSubscription();
  }

  //FrameModelClose() {
  //  this.FrameModel = 'none';
  //  this.backdrop = 'none';
  //}

  SearchSelected(index) {
    debugger
    try {
      if (this.TaxGroup == undefined || this.TaxGroup == null) {
        return
      }


      this.FrameModel = 'block';
      this.backdrop = 'block';

      this.Index = index;
      this.commonService.getListOfData('Help/CustomerOrder/' + parseInt(localStorage.getItem("CompanyID")) + '/' + this.TaxGroup).subscribe(data => {
        if (data.OfferDetails.length >= 1) {
          this.dataSource1.data = data.OfferDetails;
          this.dataSource1._updateChangeSubscription();
        }
        else {
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
          this.dataSource1.data = [];
          this.dataSource1._updateChangeSubscription();
        }
      });
    }
    catch (Error) {
      this.commonService.getListOfData('Common/ErrorList/' + Error.message + '/' + "Customer Order" + '/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem('userroleID') + '/')
        .subscribe(data => {
          debugger;

        });
    }
  }

  FrameModelClose() {
    this.FrameModel = 'none';
    this.backdrop = 'none';
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource1.filter = filterValue.trim().toLowerCase();
  }

  applyFilter1(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource2.filter = filterValue.trim().toLowerCase();
  }

  applyFilter2(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource4.filter = filterValue.trim().toLowerCase();
  }

  selecttype(element) {
    debugger

    try {
      this.dataSource.data.splice(this.Index, 1);
      this.dataSource._updateChangeSubscription();

      this.commonService.getListOfData('CustomerOrder/GetOfferDetail/' + parseInt(localStorage.getItem("CompanyID")) + '/' + element.LMID + '/' + element.LTID).subscribe(data => {
        debugger
        if (data.Success == true) {
          debugger
          if (data.DiscountPercent) {
            debugger
            let CustomOrder = new CustomerItemOrder();
            CustomOrder.Offer = null;
            CustomOrder.OneplusOfferValue = null;
            CustomOrder.LMID = element.LMID;
            CustomOrder.LTID = element.LTID;
            CustomOrder.Type = element.Type;
            CustomOrder.Brand = element.Brand;
            CustomOrder.Model = element.Model;
            CustomOrder.LensOptions = element.LensOptions;
            CustomOrder.Index = element.Index;
            CustomOrder.Color = element.Color;
            CustomOrder.HSNNo = element.HSNNo;
            CustomOrder.UOM = element.UOM;
            CustomOrder.Quantity = 1;
            if (element.Sptaxinclusive) {
              CustomOrder.UnitPrice = Math.ceil(element.Price * 100 / (100 + element.GST))
              CustomOrder.GrossAmount = CustomOrder.UnitPrice - (element.Price * data.DiscountPercent / 100);
            } else {
              CustomOrder.UnitPrice = Math.ceil(element.Price);
              CustomOrder.GrossAmount = element.Price - (element.Price * data.DiscountPercent / 100);
            }
            CustomOrder.GivenQtyPrice = CustomOrder.Quantity * CustomOrder.UnitPrice;
            CustomOrder.Discount = data.DiscountPercent;
            CustomOrder.DiscountAmount = element.Price * data.DiscountPercent / 100;
            CustomOrder.CGST = element.GST == null ? null : element.CGST;
            CustomOrder.SGST = element.GST == null ? null : element.SGST;
            CustomOrder.GST = element.GST == null ? null : element.GST;
            CustomOrder.GSTValue = element.GST == null ? null : CustomOrder.GrossAmount * (CustomOrder.GST / 100);
            CustomOrder.CESSValue = element.CESS == null ? null : CustomOrder.GrossAmount * (element.CESS / 100);
            CustomOrder.AddCessValue = element.AddCess == null ? null : CustomOrder.GrossAmount * (element.AddCess / 100);
            CustomOrder.CGSTValue = element.CGST == null ? null : (CustomOrder.GrossAmount * (element.CGST / 100));
            CustomOrder.SGSTValue = element.SGST == null ? null : (CustomOrder.GrossAmount * (element.SGST / 100));

            CustomOrder.CESS = element.CESS == null ? null : element.CESS;
            CustomOrder.AddCess = element.AddCess == null ? null : element.AddCess;
            CustomOrder.GSTDesc = element.GSTDesc == null ? null : element.GSTDesc;
            CustomOrder.CESSDesc = element.CESSDesc == null ? null : element.CESSDesc;
            CustomOrder.AddCessDesc = element.AddCessDesc == null ? null : element.AddCessDesc;


            CustomOrder.Sph = element.Sph;
            CustomOrder.Cyl = element.Cyl;
            CustomOrder.Axis = element.Axis;
            CustomOrder.Add = element.Add;
            CustomOrder.Description = element.Description;

            CustomOrder.FrameShapeID = element.FrameShapeID;
            CustomOrder.FrameStyleID = element.FrameStyleID;
            CustomOrder.FrameTypeID = element.FrameTypeID;
            CustomOrder.FrameWidthID = element.FrameWidthID;

            CustomOrder.Amount = Math.floor(CustomOrder.GrossAmount + (CustomOrder.GrossAmount * (element.CGST / 100)) + (CustomOrder.GrossAmount * (element.SGST / 100)));
            this.commonService.data.CustomerItemOrders.push(CustomOrder);
            this.dataSource.data = this.commonService.data.CustomerItemOrders;
            this.dataSource._updateChangeSubscription();
            this.FrameModel = 'none';
            this.backdrop = 'none';
          }
          else if (data.OnePlusOfferDetails) {
            debugger
            // this.OnePlusOfferDetails = data.OfferDetails;
            // this.dataSource2.data = this.OnePlusOfferDetails;
            let CustomOrder = new CustomerItemOrder();
            CustomOrder.Offer = data.OfferDetails;
            CustomOrder.OneplusOfferValue = data.OnePlusOfferValue;
            CustomOrder.LMID = element.LMID;
            CustomOrder.LTID = element.LTID;
            CustomOrder.Type = element.Type;
            CustomOrder.Brand = element.Brand;
            CustomOrder.Model = element.Model;
            CustomOrder.LensOptions = element.LensOptions;
            CustomOrder.Index = element.Index;
            CustomOrder.Color = element.Color;
            CustomOrder.HSNNo = element.HSNNo;
            CustomOrder.UOM = element.UOM;
            CustomOrder.Quantity = 1;
            if (element.Sptaxinclusive) {
              CustomOrder.UnitPrice = Math.ceil(element.Price * 100 / (100 + element.GST));
              CustomOrder.GrossAmount = CustomOrder.UnitPrice;
            } else {
              CustomOrder.UnitPrice = Math.ceil(element.Price);
              CustomOrder.GrossAmount = element.Price;
            }
            CustomOrder.GivenQtyPrice = CustomOrder.Quantity * CustomOrder.UnitPrice;
            CustomOrder.Discount = 0;
            CustomOrder.DiscountAmount = 0;
            CustomOrder.CGST = element.CGST == null ? null : element.CGST;
            CustomOrder.SGST = element.SGST == null ? null : element.SGST;
            CustomOrder.GST = element.GST == null ? null : element.GST;
            CustomOrder.GSTValue = element.GST == null ? null : CustomOrder.GrossAmount * (CustomOrder.GST / 100);
            CustomOrder.CESSValue = element.CESS == null ? null : CustomOrder.GrossAmount * (element.CESS / 100);
            CustomOrder.AddCessValue = element.AddCess == null ? null : CustomOrder.GrossAmount * (element.AddCess / 100);
            CustomOrder.CGSTValue = element.CGST == null ? null : (CustomOrder.GrossAmount * (element.CGST / 100));
            CustomOrder.SGSTValue = element.SGST == null ? null : (CustomOrder.GrossAmount * (element.SGST / 100));

            CustomOrder.CESS = element.CESS == null ? null : element.CESS;
            CustomOrder.AddCess = element.AddCess == null ? null : element.AddCess;
            CustomOrder.GSTDesc = element.GSTDesc == null ? null : element.GSTDesc;
            CustomOrder.CESSDesc = element.CESSDesc == null ? null : element.CESSDesc;
            CustomOrder.AddCessDesc = element.AddCessDesc == null ? null : element.AddCessDesc;


            CustomOrder.Sph = element.Sph;
            CustomOrder.Cyl = element.Cyl;
            CustomOrder.Axis = element.Axis;
            CustomOrder.Add = element.Add;
            CustomOrder.Description = element.Description;

            CustomOrder.FrameShapeID = element.FrameShapeID;
            CustomOrder.FrameStyleID = element.FrameStyleID;
            CustomOrder.FrameTypeID = element.FrameTypeID;
            CustomOrder.FrameWidthID = element.FrameWidthID;

            CustomOrder.Amount = Math.floor(CustomOrder.GrossAmount + (CustomOrder.GrossAmount * (element.CGST / 100)) + (CustomOrder.GrossAmount * (element.SGST / 100)));
            CustomOrder.Count = 0;
            CustomOrder.ParentRowId = this.OfferCount + 1;
            this.commonService.data.CustomerItemOrders.push(CustomOrder);
            this.dataSource.data = this.commonService.data.CustomerItemOrders;
            this.dataSource._updateChangeSubscription();
            this.FrameModel = 'none';
            this.backdrop = 'none';

            alert('Offer Available For This Item')

            //this.OfferModel = 'block';
            //this.backdrop = 'block';
            //this.OnePlusOfferDetails = data.OfferDetails;
            //this.OfferValue = data.OnePlusOfferValue;
            //this.dataSource2.data = this.OnePlusOfferDetails;
          }
        }
        else if (data.Success == false && data.Message == 'No Offers Available') {
          debugger
          let CustomOrder = new CustomerItemOrder();
          CustomOrder.Offer = null;
          CustomOrder.OneplusOfferValue = null;
          CustomOrder.LMID = element.LMID;
          CustomOrder.LTID = element.LTID;
          CustomOrder.Type = element.Type;
          CustomOrder.Brand = element.Brand;
          CustomOrder.Model = element.Model;
          CustomOrder.LensOptions = element.LensOptions;
          CustomOrder.Index = element.Index;
          CustomOrder.Color = element.Color;
          CustomOrder.HSNNo = element.HSNNo;
          CustomOrder.UOM = element.UOM;
          CustomOrder.Quantity = 1;
          if (element.Sptaxinclusive) {
            if (this.TaxGroup == "withinState") {
              CustomOrder.UnitPrice = Math.ceil(element.Price * 100 / (100 + element.GST));
              CustomOrder.GrossAmount = CustomOrder.UnitPrice;
              CustomOrder.CGSTValue = element.CGST == null ? null : (element.Price - CustomOrder.GrossAmount) / 2;
              CustomOrder.SGSTValue = element.SGST == null ? null : (element.Price - CustomOrder.GrossAmount) / 2;
              CustomOrder.CGST = element.GST == null ? null : element.CGST;
              CustomOrder.SGST = element.GST == null ? null : element.SGST;
              CustomOrder.GST = element.GST == null ? null : element.GST;
            } else {
              CustomOrder.UnitPrice = Math.ceil(element.Price * 100 / (100 + element.IGST));
              CustomOrder.GrossAmount = CustomOrder.UnitPrice;
              CustomOrder.IGSTValue = element.IGST == null ? null : element.Price - CustomOrder.GrossAmount;
              CustomOrder.IGST = element.IGST == null ? null : element.IGST;
              CustomOrder.GSTValue = element.GST == null ? null : CustomOrder.GrossAmount * (CustomOrder.GST / 100);
              //CustomOrder.CESSValue = element.CESS == null ? null : CustomOrder.GrossAmount * (element.CESS / 100);
              //CustomOrder.AddCessValue = element.AddCess == null ? null : CustomOrder.GrossAmount * (element.AddCess / 100);
            }
          } else {
            CustomOrder.UnitPrice = Math.ceil(element.Price);
            CustomOrder.GrossAmount = element.Price;
            CustomOrder.CGSTValue = element.CGST == null ? null : (CustomOrder.GrossAmount * (element.CGST / 100));
            CustomOrder.SGSTValue = element.SGST == null ? null : (CustomOrder.GrossAmount * (element.SGST / 100));
            CustomOrder.IGSTValue = element.IGST == null ? null : (CustomOrder.GrossAmount * (element.IGST / 100));
          }
          CustomOrder.GivenQtyPrice = CustomOrder.Quantity * CustomOrder.UnitPrice;
          CustomOrder.Discount = 0;
          CustomOrder.DiscountAmount = 0;
          //CustomOrder.CESS = element.CESS == null ? null : element.CESS;
          //CustomOrder.AddCess = element.AddCess == null ? null : element.AddCess;
          //CustomOrder.GSTDesc = element.GSTDesc == null ? null : element.GSTDesc;
          //CustomOrder.CESSDesc = element.CESSDesc == null ? null : element.CESSDesc;
          //CustomOrder.AddCessDesc = element.AddCessDesc == null ? null : element.AddCessDesc;


          CustomOrder.Sph = element.Sph;
          CustomOrder.Cyl = element.Cyl;
          CustomOrder.Axis = element.Axis;
          CustomOrder.Add = element.Add;
          CustomOrder.Description = element.Description;


          CustomOrder.FrameShapeID = element.FrameShapeID;
          CustomOrder.FrameStyleID = element.FrameStyleID;
          CustomOrder.FrameTypeID = element.FrameTypeID;
          CustomOrder.FrameWidthID = element.FrameWidthID;

          CustomOrder.Amount = this.TaxGroup == "withinState" ? Math.floor(CustomOrder.GrossAmount + (CustomOrder.GrossAmount * (element.CGST / 100)) + (CustomOrder.GrossAmount * (element.SGST / 100))) : Math.floor(CustomOrder.GrossAmount + (CustomOrder.GrossAmount * (element.IGST / 100)));
          this.commonService.data.CustomerItemOrders.unshift(CustomOrder);
          this.dataSource.data = this.commonService.data.CustomerItemOrders;
          this.dataSource._updateChangeSubscription();
          this.FrameModel = 'none';
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
      this.commonService.getListOfData('Common/ErrorList/' + Error.message + '/' + "Customer Order" + '/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem('userroleID') + '/')
        .subscribe(data => { });
    }

  }

  OfferModelClose() {
    this.OfferModel = 'none';
    this.backdrop = 'none';
  }

  Relatedoffers(element, index) {
    try {
      // this.OnePlusOfferDetails = this.commonService.data.CustomerItemOrders[index].Offer;

      this.Index = index;

      this.OfferValue = this.commonService.data.CustomerItemOrders[index].OneplusOfferValue;

      this.RemainingItems = this.commonService.data.CustomerItemOrders[index].OneplusOfferValue - this.commonService.data.CustomerItemOrders[index].Count;

      this.commonService.getListOfData('CustomerOrder/GetOfferDetail/' + parseInt(localStorage.getItem("CompanyID")) + '/' + element.LMID + '/' + element.LTID).subscribe(data => {
        if (data.Success == true) {
          if (data.OnePlusOfferDetails) {
            this.OnePlusOfferDetails = data.OfferDetails;
            this.dataSource2.data = this.OnePlusOfferDetails;
            this.OfferModel = 'block';
            this.backdrop = 'block';
          }
        }
      });
    }
    catch (Error) {
      this.commonService.getListOfData('Common/ErrorList/' + Error.message + '/' + "Customer Order" + '/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem('userroleID') + '/')
        .subscribe(data => { });
    }
  }

  changeValue(id, property: string, event: any) {
    debugger
    let result: number = toNumber(event.target.textContent.trim());
    if (result == 0) {
      event.target.textContent = '';
      this.dataSource2.filteredData[id][property] = ' ';
      this.dataSource2._updateChangeSubscription();
      return
    }
    this.dataSource2.filteredData[id][property] = result;
    this.dataSource2._updateChangeSubscription();
  }

  RestrictNegativeValues(e): boolean {
    if (!(e.keyCode >= 48 && e.keyCode <= 57)) {
      return false;
    }
  }

  RestrictSymbols(e): boolean {
    debugger
    if (!(e.keyCode >= 48 && e.keyCode <= 57 || (e.keyCode > 64 && e.keyCode < 91) || (e.keyCode > 96 && e.keyCode < 123) || e.keyCode == 32 || e.keyCode == 9 || (e.keyCode > 34 && e.keyCode < 41) || e.keyCode == 8)) {
      return false;
    }
  }

  OfferValueCheck() {
    debugger
    var TableGivenQty = this.OnePlusOfferDetails.filter(x => {
      if (!x.Quantity) {
        return false
      }
      return true
    }).reduce((summ, v) =>
      summ = summ + v.Quantity, 0)

    if (TableGivenQty > this.RemainingItems) {
      alert('Cannot Give More Than Offer Value')
      return
    }
    else if (TableGivenQty < this.RemainingItems) {
      alert('Cannot Match Offer Value')
      return
    }
    else {
      debugger
      var ParentRowId = this.commonService.data.CustomerItemOrders[this.Index].ParentRowId;
      var QuantityGivenContent = this.OnePlusOfferDetails.filter(x => { if (!x.Quantity) { return false } return true })

      QuantityGivenContent.forEach(value => {
        debugger
        let CustomOrder = new CustomerItemOrder();
        CustomOrder.LMID = value.LMID;
        CustomOrder.LTID = value.LTID;
        CustomOrder.Type = value.Type;
        CustomOrder.Brand = value.Brand;
        CustomOrder.Model = value.Model;
        CustomOrder.LensOptions = value.LensOptions;
        CustomOrder.Index = value.Index;
        CustomOrder.Quantity = value.Quantity;
        CustomOrder.Color = value.Color;
        CustomOrder.HSNNo = value.HSNNo;
        CustomOrder.UOM = value.UOM;
        CustomOrder.GrossAmount = 0;
        CustomOrder.UnitPrice = 0;
        CustomOrder.Discount = 0;
        CustomOrder.DiscountAmount = 0;
        CustomOrder.CGST = value.GST / 2;
        CustomOrder.SGST = value.GST / 2;
        CustomOrder.Amount = 0;
        CustomOrder.ChildRowId = ParentRowId;
        this.commonService.data.CustomerItemOrders.push(CustomOrder);
        this.dataSource._updateChangeSubscription();

        this.commonService.data.CustomerItemOrders[this.Index].Count = this.commonService.data.CustomerItemOrders[this.Index].Count + value.Quantity;
      })
      //this.commonService.data.CustomerItemOrders[this.Index].Offer.forEach((x) => {
      //   debugger
      //   x.Quantity = null;
      //})

      // console.log(this.commonService.data.CustomerItemOrders);
      this.OfferModel = 'none';
      this.backdrop = 'none';
    }
  }

  Drop(element, i) {
    debugger
    try {
      if (element.ChildRowId != null) {
        debugger
        Swal.fire({
          title: 'Are you sure?',
          text: "Want to Drop This Item!",
          type: 'warning',
          showCancelButton: true,
          cancelButtonColor: '#d33',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Yes',
          cancelButtonText: 'No',
          reverseButtons: true,
          focusCancel: true,
          allowOutsideClick: false
        }).then((result) => {
          if (result.value) {
            if (i !== -1) {
              debugger
              let ParentRowId;
              this.commonService.data.CustomerItemOrders.map(() => {
                this.commonService.data.CustomerItemOrders.filter((y, z) => {
                  if (y.ParentRowId == element.ChildRowId) {
                    ParentRowId = z;
                  }
                })
              })
              this.Index = ParentRowId;
              this.commonService.data.CustomerItemOrders[ParentRowId].Count = this.commonService.data.CustomerItemOrders[ParentRowId].Count - element.Quantity;
              this.dataSource.data.splice(i, 1);
              this.dataSource._updateChangeSubscription();
              this.OfferValue = this.commonService.data.CustomerItemOrders[ParentRowId].OneplusOfferValue;
              this.RemainingItems = this.commonService.data.CustomerItemOrders[ParentRowId].OneplusOfferValue - this.commonService.data.CustomerItemOrders[ParentRowId].Count;
              this.OfferModel = 'block';
              this.backdrop = 'block';
              this.commonService.getListOfData('CustomerOrder/GetOfferDetail/' + parseInt(localStorage.getItem("CompanyID")) + '/' + this.commonService.data.CustomerItemOrders[ParentRowId].LMID + '/' + this.commonService.data.CustomerItemOrders[ParentRowId].LTID).subscribe(data => {
                if (data.Success == true) {
                  if (data.OnePlusOfferDetails) {
                    this.OnePlusOfferDetails = data.OfferDetails;
                    this.dataSource2.data = this.OnePlusOfferDetails;
                    this.OfferModel = 'block';
                    this.backdrop = 'block';
                  }
                }
              });
            }
          }
        })
      }
      else {
        Swal.fire({
          title: 'Are you sure?',
          text: "Want to Drop This Item!",
          type: 'warning',
          showCancelButton: true,
          cancelButtonColor: '#d33',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Yes',
          cancelButtonText: 'No',
          reverseButtons: true,
          focusCancel: true,
          allowOutsideClick: false
        }).then((result) => {
          if (result.value) {
            if (i !== -1) {
              debugger
              this.dataSource.data.splice(i, 1);
              this.dataSource._updateChangeSubscription();
            }
            Swal.fire({
              type: 'success',
              title: 'success',
              text: 'Dropped successfully',
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
    }
    catch (Error) {
      this.commonService.getListOfData('Common/ErrorList/' + Error.message + '/' + "Customer Order" + '/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem('userroleID') + '/')
        .subscribe(data => { });
    }
  }

  DropWithOffers(i) {
    Swal.fire({
      title: 'Are you sure?',
      text: "Want to Drop This Item With Offers Also!",
      type: 'warning',
      showCancelButton: true,
      cancelButtonColor: '#d33',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Yes',
      reverseButtons: true,
      focusCancel: true,
    }).then((result) => {
      if (result.value) {
        if (i !== -1) {
          debugger
          let ParentRowId = this.commonService.data.CustomerItemOrders[i].ParentRowId;
          this.commonService.data.CustomerItemOrders.map(() => {
            this.commonService.data.CustomerItemOrders.filter((y, z) => {
              if (y.ChildRowId == ParentRowId) {
                this.commonService.data.CustomerItemOrders.splice(z, 1);
              }
            })
          })
          this.dataSource.data.splice(i, 1);
          this.commonService.data.CustomerItemOrders;
          this.dataSource._updateChangeSubscription();
        }
        Swal.fire({
          type: 'success',
          title: 'success',
          text: 'Dropped successfully',
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

  changeQtyValue(id, property: string, event: any) {
    debugger
    let result: number = Number(event.target.value);
    this.dataSource.filteredData[id][property] = result;
    this.dataSource._updateChangeSubscription();
  }


  changeQtyValue1(id, property: string, event: any) {
    let result: number = Number(event.target.value);
    if (result > 100) {
      Swal.fire({
        type: 'warning',
        title: 'warning',
        text: 'Invalid Discount',
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          popup: 'alert-warp',
          container: 'alert-container',
        },
      });
      event.target.value = 0;
      this.dataSource.filteredData[id][property] = 0;
      this.dataSource._updateChangeSubscription();
      return;
    }
    this.dataSource.filteredData[id][property] = result;
    this.dataSource._updateChangeSubscription();
  }

  changeGivenQtyValue(id, element, property: string) {
    var num = element.Quantity * element.UnitPrice;
    num = parseFloat(num.toFixed(2));
    element.GivenQtyPrice = num;
  }

  changePrice(id, property: string, event: any) {
    debugger
    let result: number = Number(event.target.value);
    this.dataSource.filteredData[id][property] = result;
    this.dataSource._updateChangeSubscription();
  }

  changeValueDiscountAmount(id, element, property: string) {
    var num = (element.Quantity * element.UnitPrice) * element.Discount / 100;
    num = parseFloat(num.toFixed(2));
    element.DiscountAmount = num;
  }

  changeValueGrossAmount(id, element, property: string) {
    var num = (element.Quantity * element.UnitPrice) - element.DiscountAmount;
    num = parseFloat(num.toFixed(2));
    element.GrossAmount = num;
  }

  changeGstValue(id, element) {
    debugger
    if (this.TaxGroup == "withinState") {
      element.CGSTValue = element.GrossAmount * (element.CGST / 100);
      element.SGSTValue = element.GrossAmount * (element.SGST / 100);
    } else {
      element.IGSTValue = element.GrossAmount * (element.IGST / 100);
    }
  }

  changeValueTotal(id, element, property: string) {
    if (this.TaxGroup == "withinState") {
      var Tax = element.CGSTValue + element.SGSTValue;
      element.Amount = element.GrossAmount + Tax
    } else {
      element.Amount = element.GrossAmount + element.IGSTValue
    }
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

  ngDoCheck() {
    if (this.M_AdvanceAmount != null || this.M_AdvanceAmount != '') {
      var restotalcost = this.commonService.data.CustomerItemOrders.map(t => t.Amount).reduce((acc, value) => acc + value, 0);
      restotalcost = Math.floor(restotalcost);
      if (restotalcost < this.M_AdvanceAmount && this.commonService.data.CustomerItemOrders.length >= 1) {
        this.M_AdvanceAmount = '';
        this.M_Amount = '';
        this.commonService.data.paymenttran = [];
        this.dataSource3.data = [];
        Swal.fire({
          type: 'warning',
          title: 'Cannot Enter more than Product Value',
          position: 'top-end',
          showConfirmButton: false,
          timer: 1500,
          customClass: {
            popup: 'alert-warp',
            container: 'alert-container',
          },
        });
      }
      if (this.commonService.data.CustomerItemOrders.length < 1) {
        this.M_AdvanceAmount = '';
        this.M_Amount = '';
        this.commonService.data.paymenttran = [];
        this.dataSource3.data = [];
      }
    }

  }

  getTotalAmount() {
    var restotalcost = this.commonService.data.CustomerItemOrders.map(t => t.Amount).reduce((acc, value) => acc + value, 0);
    return restotalcost;
  }

  GetCGSTAmount() {
    var restotalcost = this.commonService.data.CustomerItemOrders.map(t => t.CGSTValue).reduce((acc, value) => acc + value, 0);
    return restotalcost;
  }

  GetSGSTAmount() {
    var restotalcost = this.commonService.data.CustomerItemOrders.map(t => t.SGSTValue).reduce((acc, value) => acc + value, 0);
    return restotalcost;
  }

  GetIGSTAmount() {
    var restotalcost = this.commonService.data.CustomerItemOrders.map(t => t.IGSTValue).reduce((acc, value) => acc + value, 0);
    return restotalcost;
  }

  CheckingAdvanceAmount(event) {
    if (this.commonService.data.CustomerItemOrders.length < 1) {
      this.M_AdvanceAmount = '';
      Swal.fire({
        type: 'warning',
        title: 'Add the Product in Item list',
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

    if (this.M_AdvanceAmount > this.getTotalAmount()) {
      Swal.fire({
        type: 'warning',
        title: 'Cannot Enter more than Product Value',
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          popup: 'alert-warp',
          container: 'alert-container',
        },
      });
      this.M_AdvanceAmount = "";
      return
    }
    this.GivenAdvanceTotal = this.M_AdvanceAmount
    this.RemainingBalance = this.M_AdvanceAmount
    this.M_Amount = this.M_AdvanceAmount

    if (this.commonService.data.paymenttran.length >= 1) {
      if (this.getPaymentTotalCost() != this.M_AdvanceAmount) {
        this.commonService.data.paymenttran = [];
        this.dataSource3.data = this.commonService.data.paymenttran;
        this.dataSource3._updateChangeSubscription();
      }
    }
  }

  PaymentTotalamount() {
    if (this.GivenAdvanceTotal == undefined) {
      Swal.fire({
        type: 'warning',
        title: 'Enter Advance Amount',
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          popup: 'alert-warp',
          container: 'alert-container',
        },
      });

      this.M_Amount = "";
      return
    }

    if (this.commonService.data.paymenttran.length >= 1) {

      if (this.M_Amount > this.GivenAdvanceTotal) {
        Swal.fire({
          type: 'warning',
          title: 'Cannot Give More Than Advance Amount',
          position: 'top-end',
          showConfirmButton: false,
          timer: 1500,
          customClass: {
            popup: 'alert-warp',
            container: 'alert-container',
          },
        });
        this.M_Amount = "";
        return
      }
      else {
        this.RemainingBalance = this.GivenAdvanceTotal - this.getPaymentTotalCost();
        if (this.M_Amount > this.RemainingBalance) {
          Swal.fire({
            type: 'warning',
            title: `Remaining Amount  ${this.RemainingBalance} `,
            position: 'top-end',
            showConfirmButton: false,
            timer: 1500,
            customClass: {
              popup: 'alert-warp',
              container: 'alert-container',
            },
          })
          this.M_Amount = "";
          return
        }
      }
    }
    else {
      if (this.M_Amount > this.GivenAdvanceTotal) {
        Swal.fire({
          type: 'warning',
          title: 'Cannot Give More Than Advance Amount',
          position: 'top-end',
          showConfirmButton: false,
          timer: 1500,
          customClass: {
            popup: 'alert-warp',
            container: 'alert-container',
          },
        })
        this.M_Amount = "";
        return
      }
    }
  }

  AddPayment() {
    if (this.M_paymode === undefined || this.M_paymode === "") {
      Swal.fire({
        type: 'warning',
        title: 'Select The Payment Mode',
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
    if (this.M_paymode === "Cash") {
      if (this.M_Amount == null || this.M_Amount == undefined || this.M_Amount == "") {
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
        })
        return;
      }
    } else if (this.M_paymode == 'Cheque' || this.M_paymode == 'Demand Draft') {
      if ((this.M_Amount == null || this.M_InstrumentNumber == null || this.M_InstrumentDate == null || this.M_BankName == null || this.M_Branch == null) || (this.M_Amount == undefined || this.M_InstrumentNumber == undefined || this.M_InstrumentDate == undefined || this.M_BankName == undefined || this.M_Branch == undefined) || (this.M_Amount == "" || this.M_InstrumentNumber == "" || this.M_InstrumentDate == "" || this.M_BankName == "" || this.M_Branch == "")) {
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
        })
        return;
      }
    } else if (this.M_paymode == 'Debit card' || this.M_paymode == 'Credit Card') {
      if ((this.M_Amount == null || this.M_ExpiryDate == null || this.M_InstrumentNumber == null || this.M_BankName == null) || (this.M_Amount == undefined || this.M_ExpiryDate == undefined || this.M_InstrumentNumber == undefined || this.M_BankName == undefined) || (this.M_Amount == "" || this.M_ExpiryDate == "" || this.M_InstrumentNumber == "" || this.M_BankName == "")) {
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
        })
        return;
      }
    }
    if (this.commonService.data.paymenttran.length >= 1) {
      if (this.M_paymode == 'Cash') {
        if (this.commonService.data.paymenttran.some(pay => pay.PaymentMode == "Cash")) {
          Swal.fire({
            type: 'warning',
            title: 'Cannot Give Multiple Cash Mode',
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
      }
    }

    var paydetails = new Payment_Master();
    paydetails.PaymentMode = this.M_paymode;
    paydetails.InstrumentNumber = this.M_InstrumentNumber;
    paydetails.Instrumentdate = this.M_InstrumentDate;
    paydetails.BankName = this.M_BankName;
    paydetails.BankBranch = this.M_Branch;
    paydetails.Expirydate = this.M_ExpiryDate;
    paydetails.Amount = this.M_Amount;
    this.commonService.data.paymenttran.push(paydetails);
    this.dataSource3.data = this.commonService.data.paymenttran;
    this.dataSource3._updateChangeSubscription();

    this.M_Amount = undefined;

    this.M_paymode = "";
    this.M_InstrumentDate = "";
    this.M_InstrumentNumber = "";
    this.M_BankName = "";
    this.M_Branch = "";
    this.M_ExpiryDate = "";
  }

  getPaymentTotalCost() {
    if (this.commonService.data.paymenttran.length >= 1) {
      var restotalcost = this.commonService.data.paymenttran.map(t => t.Amount).reduce((acc, value) => acc + value, 0);
      restotalcost = parseFloat(restotalcost.toFixed(2));
      return restotalcost;
    }
    else {
      this.GivenAdvanceTotal = this.GivenAdvanceTotal;
    }
  }

  EditPaytype(i, element) {
    this.M_paymode = element.PaymentMode;
    this.M_InstrumentNumber = element.InstrumentNumber;
    this.M_InstrumentDate = element.Instrumentdate;
    this.M_BankName = element.BankName;
    this.M_Branch = element.BankBranch;
    this.M_ExpiryDate = element.Expirydate;
    this.M_Amount = element.Amount;
    this.dataSource3.data.splice(i, 1);
    this.dataSource3._updateChangeSubscription();
  }

  /* Number Validation */
  Number(e): boolean {
    if (!(e.keyCode >= 48 && e.keyCode <= 57)) {
      return false;
    }
  }

  onlyAlpha(e): boolean {
    const charCode = (e.which) ? e.which : e.keyCode;
    if ((charCode >= 65 && charCode <= 90) || (charCode >= 97 && charCode <= 122)) {
      return true;
    }
    return false;
  }
  /* Placed Ordered List */
  PlacedOrderedList() {
    debugger
    try {
      this.backdrop = 'block';
      this.OrderedListModel = 'block';
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
      this.commonService.getListOfData('CustomerOrder/GetCustomerOrderedList/' + parseInt(localStorage.getItem("CompanyID")) + '/' + this.Tc).subscribe(data => {
        debugger
        if (data.Success == true) {
          if (data.CustomerOrderList.length > 0) {
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
          Swal.fire
            ({
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
    catch (Error) {
      this.commonService.getListOfData('Common/ErrorList/' + Error.message + '/' + "Customer Order" + '/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem('userroleID') + '/')
        .subscribe(data => { });
    }
  }

  SelectOrderNo(element) {
    try {
      this.commonService.getListOfData('CustomerOrder/GetOrderNoDetails/' + parseInt(localStorage.getItem("CompanyID")) + '/' + element.OrderNo).subscribe(data => {
        debugger
        if (data.Success == true) {
          debugger
          (<HTMLElement>document.querySelector('.ItemDetailsTab')).click();
          this.ViewOpPreslist = true;
          this.M_OrderNo = data.CustomerOrderedList.OrderNo;

          let LocTime = this.Getloctime.split(":");
          let Hours = LocTime[0];
          let Minutes = LocTime[1];


          this.M_OrderDate = new Date(data.CustomerOrderedList.OrderDate);
          this.M_OrderDate.setHours(this.M_OrderDate.getHours() + parseInt(Hours));
          this.M_OrderDate.setMinutes(this.M_OrderDate.getMinutes() + parseInt(Minutes));


          if (data.CustomerOrderedList.ReceiptNumber != null) {
            this.M_ReceiptNo = data.CustomerOrderedList.ReceiptNumber;
            this.NoPayment = true;
          }
          else {
            this.M_ReceiptNo = data.CustomerOrderedList.ReceiptNumber;
            this.NoPayment = false;
          }

          this.DisabledPrescriptions = true;

          this.M_ReceiptNoDate = new Date(data.CustomerOrderedList.M_ReceiptNoDate);
          this.M_ReceiptNoDate.setHours(this.M_ReceiptNoDate.getHours() + parseInt(Hours));
          this.M_ReceiptNoDate.setMinutes(this.M_ReceiptNoDate.getMinutes() + parseInt(Minutes));


          this.M_RefNo = data.CustomerOrderedList.RefNo;
          this.M_Refdate = data.CustomerOrderedList.RefDate;
          this.M_Deliverydate = data.CustomerOrderedList.Deliverydate;
          this.M_Remarks = data.CustomerOrderedList.Remarks;

          this.M_CustomerName = data.CustomerOrderedList.CustomerName;
          this.M_Address = data.CustomerOrderedList.CustomerAddress1.concat(' ', data.CustomerOrderedList.CustomerAddress2 != null ? data.CustomerOrderedList.CustomerAddress2 : '', ' ', data.CustomerOrderedList.CustomerAddress3 != null ? data.CustomerOrderedList.CustomerAddress3 : '')
          this.M_MobileNo = data.CustomerOrderedList.CustomerMobileNo;

          this.displayedColumns3 = ['PaymentMode', 'InstrumentNumber', 'InstrumentDate', 'BankName', 'Branch', 'ExpiryDate', 'Amount'];
          this.commonService.data.paymenttran = data.CustomerOrderedList.paymenttran;
          this.dataSource3.data = this.commonService.data.paymenttran;
          this.dataSource3._updateChangeSubscription();

          this.Prints = true;

          this.commonService.data.CustomerItemOrders = data.CustomerOrderedList.CustomerItemOrders;

          if (this.commonService.data.CustomerItemOrders.every(x => x.IGST == null)) {
            this.PrintdisplayedColumns = this.PrintdisplayedColumnsGst;
            this.PrintdisplayedColumnsCombined = this.PrintdisplayedColumnsGsts;
          } else {
            this.PrintdisplayedColumns = this.PrintdisplayedColumnsIGst;
            this.PrintdisplayedColumnsCombined = this.PrintdisplayedColumnsIGsts;
          }



          if (data.CustomerOrderedList.OpticalPrescription.length > 0) {
            this.hiddenuploadedImage = true;
            this.uploadedImages = data.CustomerOrderedList.OpticalPrescription;
            this.uploadedImages = this.uploadedImages.map((item) =>
              new ImageItem({ src: item, thumb: item })
            );
            this.basicLightboxExample1();
          } else {
            this.hiddenuploadedImage = false;
            this.uploadedImages = [];
          }


          for (var i = 0; i < this.commonService.data.CustomerItemOrders.length; i++) {
            this.commonService.data.CustomerItemOrders[i].GivenQtyPrice = this.commonService.data.CustomerItemOrders[i].UnitPrice * this.commonService.data.CustomerItemOrders[i].Quantity;
            this.commonService.data.CustomerItemOrders[i].GSTValue = this.commonService.data.CustomerItemOrders[i].GrossAmount * ((this.commonService.data.CustomerItemOrders[i].CGST + this.commonService.data.CustomerItemOrders[i].SGST) / 100)
          }


          this.PrintdataSource.data = this.commonService.data.CustomerItemOrders;
          this.PrintdataSource._updateChangeSubscription();

          let CompanyDetails = data.CompanyDetails;
          this.CompanyName = CompanyDetails.CompanyName;
          this.CompanyAddress1 = CompanyDetails.Address1;
          this.CompanyAddress2 = CompanyDetails.Address2;
          this.CompanyAddress3 = CompanyDetails.Address3;
          this.CompanyWebsite = CompanyDetails.Website;
          this.CompanyPhone1 = CompanyDetails.Phone1;

          this.backdrop = 'none';
          this.OrderedListModel = 'none';

        }
        else {
          Swal.fire
            ({
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
      this.commonService.getListOfData('Common/ErrorList/' + Error.message + '/' + "Customer Order" + '/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem('userroleID') + '/')
        .subscribe(data => { });
    }
  }

  OrderedListModelClose() {
    this.backdrop = 'none';
    this.OrderedListModel = 'none';
  }

  /* Submit */
  Submit() {
    debugger
    try {
      let result: boolean = false;
      if (this.M_CustomerID == null || this.M_CustomerID == undefined) {
        Swal.fire({
          type: 'warning',
          title: 'Add Customer Details',
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
      if (this.commonService.data.CustomerItemOrders.length >= 1) {
        debugger
        if (this.commonService.data.CustomerItemOrders.some(x => x.Brand === "")) {
          Swal.fire({
            type: 'warning',
            title: 'Check The Item Details',
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
        this.commonService.data.CustomerItemOrders.map(() => {
          this.commonService.data.CustomerItemOrders.filter((y, z) => {
            if (y.OneplusOfferValue > y.Count) {
              Swal.fire({
                type: 'warning',
                title: 'Add free Item Details',
                position: 'top-end',
                showConfirmButton: false,
                timer: 1500,
                customClass: {
                  popup: 'alert-warp',
                  container: 'alert-container',
                },
              });
              result = true;
            }
          })
        })
        if (result) {
          return
        }
        if (this.getTotalAmount() > 99999999) {
          Swal.fire({
            type: 'warning',
            title: 'Cannot Give more than 9.9 crores,Please Split the Order',
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
      else {
        Swal.fire({
          type: 'warning',
          title: 'Add Item Details',
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

      if (this.GivenAdvanceTotal != null || this.GivenAdvanceTotal != undefined || this.GivenAdvanceTotal != "") {
        if (this.GivenAdvanceTotal != this.getPaymentTotalCost()) {
          Swal.fire({
            type: 'warning',
            title: 'Add Payment Details',
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

      if (this.commonService.data.paymenttran.length >= 1) {
        if (this.GivenAdvanceTotal != this.getPaymentTotalCost()) {
          Swal.fire({
            type: 'warning',
            title: 'Check Given Advance Amount,<br> And Added Payment Amount',
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

      this.commonService.data.Tc = this.Tc;
      this.commonService.data.Cmpid = parseInt(localStorage.getItem("CompanyID"));
      this.commonService.data.OrderDate = this.M_OrderDate;
      this.commonService.data.CreatedBy = parseInt(localStorage.getItem("userroleID"));
      this.commonService.data.CustomerId = this.M_CustomerID;
      this.commonService.data.RefDate = this.M_Refdate;
      this.commonService.data.Deliverydate = this.M_Deliverydate;
      this.commonService.data.Remarks = this.M_Remarks;
      this.commonService.data.RefNo = this.M_RefNo;

      this.commonService.data.UIN = this.UIN;
      this.commonService.data.RegTranId = this.regTranId;

      this.commonService.postData('CustomerOrder/SubmitCustomerOrder', this.commonService.data)
        .subscribe(data => {
          debugger
          if (data.Success == true) {
            (<HTMLElement>document.querySelector('.ItemDetailsTab')).click();
            if (this.urls.length > 0) {
              const image = this.urls[0].data;
              let imagArray = [];
              imagArray.push(image.src)
              var bb: any;
              bb = this.base64toBlob1(imagArray);
              this.img1 = bb;
            }
            if (this.img1 != null) {
              for (var i = 0, j = this.img1.length; i < j; i++) {
                var Imageblob = this.img1[i];
                this.blobsize = new File([Imageblob], 'imageFileName.png');
                if (this.blobsize != null) {
                  this.commonService.postFile('CustomerOrder/UploadImage/' + data.OrderNo, this.blobsize)
                    .subscribe(res => {
                      this.img1 = null;
                    });
                }
              }
              this.blobss = [];
              this.urls = [];
              this.UploadPres.nativeElement.value = "";
            }
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
            this.DisabledPrescriptions = false;
            this.M_OrderNo = data.OrderNo;
            let OrderDate = new Date(data.OrderDate);
            this.M_OrderDate = OrderDate.setHours(OrderDate.getHours());
            if (data.ReceiptNumber != null) {
              this.M_ReceiptNo = data.ReceiptNumber;
              this.NoPayment = true;
            }
            else {
              this.M_ReceiptNo = data.ReceiptNumber;
              this.NoPayment = false;
            }
            let RecDate = new Date(data.ReceiptDate);
            this.M_ReceiptNoDate = RecDate.setHours(RecDate.getHours());
            this.ViewOpPres = true;
            let CompanyDetails = data.CompanyDetails;
            this.CompanyName = CompanyDetails.CompanyName;
            this.CompanyAddress1 = CompanyDetails.Address1;
            this.CompanyAddress2 = CompanyDetails.Address2;
            this.CompanyAddress3 = CompanyDetails.Address3;
            this.CompanyWebsite = CompanyDetails.Website;
            this.CompanyPhone1 = CompanyDetails.Phone1;
            this.PrintdataSource.data = this.commonService.data.CustomerItemOrders;
            this.displayedColumns3 = ['PaymentMode', 'InstrumentNumber', 'InstrumentDate', 'BankName', 'Branch', 'ExpiryDate', 'Amount'];
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
      this.commonService.getListOfData('Common/ErrorList/' + Error.message + '/' + "Customer Order" + '/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem('userroleID') + '/')
        .subscribe(data => { });
    }
  }

  /*Cancel*/
  Cancel() {
    this.Form.onReset();
    this.M_OrderDate = this.date.getDate() + "-" + this.date.toLocaleString('default', { month: 'long' }) + "-" + this.date.getFullYear();
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

  clear() {
    (<HTMLElement>document.querySelector('.ItemDetailsTab')).click();
    this.Prints = false;
    this.ViewOpPreslist = false;
    this.M_OrderNo = '';
    this.M_RefNo = '';
    this.M_Refdate = '';
    this.M_CustomerID = null;
    this.M_CustomerName = '';
    this.M_Address = '';
    this.M_MobileNo = '';
    this.M_AdvanceAmount = '';
    this.M_ReceiptNo = '';
    this.M_ReceiptNoDate = '';
    this.M_Deliverydate = '';
    this.M_Remarks = '';

    this.SPHACC1 = '';
    this.CYLACC1 = '';
    this.AXISACC1 = '';
    this.VA = '';
    this.SPHTAN1 = '';
    this.CYLTAN1 = '';
    this.AXISTAN1 = '';
    this.VATANA1 = '';
    this.SPHNV1 = '';
    this.VANVV = '';
    this.SPHNVR1 = '';
    this.VANVRR = '';
    this.Remarksacc = '';
    this.PDD = '';
    this.MPD = '';
    this.MPD1 = '';

    this.M_PrescribedDoctor = '';
    this.M_PrescriptionDate = '';
    this.GivenAdvanceTotal = undefined;

    this.ViewOpPres = true;

    this.hiddenuploadedImage = false;
    this.uploadedImages = [];

    this.DisabledPrescriptions = false;

    this.commonService.data.CustomerItemOrders = [];
    this.commonService.data.paymenttran = [];
    this.dataSource.data = [];
    this.dataSource3.data = [];
    this.PrintdataSource.data = [];
    this.dataSource._updateChangeSubscription();
    this.dataSource3._updateChangeSubscription();
    this.PrintdataSource._updateChangeSubscription();
    this.M_OrderDate = this.date.getDate() + "-" + this.date.toLocaleString('default', { month: 'long' }) + "-" + this.date.getFullYear();
    this.displayedColumns3 = ['PaymentMode', 'BankName', 'InstrumentNumber', 'InstrumentDate', 'ExpiryDate', 'Branch', 'Amount', 'Action'];
    this.displayedColumns = this.displayedColumnsGst;
    this.displayedColumnsCombined = this.displayedColumnsGsts;
  }

  printclose() {
    this.backdrop = 'none';
    this.Submitprint = 'none';

    this.Prints = false;
    this.M_OrderNo = '';
    this.M_RefNo = '';
    this.M_Refdate = '';
    this.M_CustomerID = null;
    this.M_CustomerName = '';
    this.M_Address = '';
    this.M_MobileNo = '';
    this.M_AdvanceAmount = '';
    this.M_ReceiptNo = '';
    this.M_ReceiptNoDate = '';
    this.M_Deliverydate = '';
    this.M_Remarks = '';

    this.SPHACC1 = '';
    this.CYLACC1 = '';
    this.AXISACC1 = '';
    this.VA = '';
    this.SPHTAN1 = '';
    this.CYLTAN1 = '';
    this.AXISTAN1 = '';
    this.VATANA1 = '';
    this.SPHNV1 = '';
    this.VANVV = '';
    this.SPHNVR1 = '';
    this.VANVRR = '';
    this.Remarksacc = '';
    this.PDD = '';
    this.MPD = '';
    this.MPD1 = '';

    this.M_PrescribedDoctor = '';
    this.M_PrescriptionDate = '';
    this.GivenAdvanceTotal = undefined;

    this.ViewOpPres = true;
    this.hiddenuploadedImage = false;
    this.uploadedImages = [];

    this.DisabledPrescriptions = false;

    this.commonService.data.CustomerItemOrders = [];
    this.commonService.data.paymenttran = [];
    this.dataSource.data = [];
    this.dataSource3.data = [];
    this.dataSource._updateChangeSubscription();
    this.dataSource3._updateChangeSubscription();
    this.displayedColumns3 = ['PaymentMode', 'InstrumentNumber', 'InstrumentDate', 'BankName', 'Branch', 'ExpiryDate', 'Amount', 'Action'];
    this.M_OrderDate = this.date.getDate() + "-" + this.date.toLocaleString('default', { month: 'long' }) + "-" + this.date.getFullYear();
  }

  ViewAllPrescription() {
    try {
      this.backdrop = 'block';
      this.PrescriptionlistModel = 'block';

      this.commonService.getListOfData('CustomerOrder/GetfinalopDetails/' + localStorage.getItem("CompanyID"))
        .subscribe(data => {
          debugger;
          if (data.Success == true && data.data.length > 0) {
            this.PrescriptionSource.data = data.data;
            this.PrescriptionSource._updateChangeSubscription();
          }
          else {
            Swal.fire({
              type: 'warning',
              title: 'Data Not Found',
              position: 'top-end',
              showConfirmButton: false,
              timer: 1500,
              customClass: {
                popup: 'alert-warp',
                container: 'alert-container',
              },
            });
            this.PrescriptionSource.data = [];
          }
        });
    }
    catch (Error) {
      this.commonService.getListOfData('Common/ErrorList/' + Error.message + '/' + "Customer Order" + '/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem('userroleID') + '/')
        .subscribe(data => { });
    }
  }

  PrescriptionModelClose() {
    this.backdrop = 'none';
    this.PrescriptionModel = 'none';
  }

  PrescriptionlistModelClose() {
    this.backdrop = 'none';
    this.PrescriptionlistModel = 'none';
  }
  FINALPRESCRIPTION1 = [];
  //UPPdate;
  //CUMID;
  selectPrescription(element) {
    debugger;
    try {
      this.Addfinalprescription();
      this.regTranId = element.RegistrationTranID;
      this.UIN = element.UIN;
      this.M_CustomerID = element.UIN;
      this.M_CustomerName = element.Name;
      this.M_Address = element.Address1;
      this.M_MobileNo = element.MobileNo;

      this.backdrop = 'none';
      this.PrescriptionlistModel = 'none';

      this.ViewOpPres = false;
      this.DisabledPrescriptions = true;

      this.urls = [];

      this.M_PrescribedDoctor = element.Doctorname;
      this.M_PrescriptionDate = element.PrescriptionDate;

      this.commonService.getListOfData('CustomerOrder/GetOpticalPrescription/' + this.regTranId + '/' + this.M_PrescriptionDate + '/' + parseInt(localStorage.getItem('CompanyID')))
        .subscribe((data: any) => {

          this.FINALPRESCRIPTION1 = [];

          this.optical = data.opticprescription1;

          //var pres = new OPTICALPRESCRIPTION1();

          //this.optical.forEach((x: any) => {
          //  if (x.Ocular === "OD" && x.Type === 134) {

          //    pres.DistSph = x.DistSph;
          //    pres.NearCyl = x.NearCyl;
          //    pres.PinAxis = x.PinAxis;
          //    pres.Add = x.Add;
          //  }
          //  else if (x.Ocular === "OS" && x.Type === 134) {

          //    pres.DistSphOS = x.DistSph;
          //    pres.NearCylOS = x.NearCyl;
          //    pres.PinAxisOS = x.PinAxis;
          //    pres.AddOS = x.Add;
          //  }
          //  else if (x.Ocular === "OD" && x.Type === 135) {

          //    pres.DistSphNVOD = x.DistSph;
          //    pres.AddNVOD = x.Add;
          //  }
          //  else if (x.Ocular === "OS" && x.Type === 135) {
          //    pres.DistSphNVOS = x.DistSph;
          //    pres.AddNVOS = x.Add;  
          //  }
          //   else {
          //    this.Remarksacc = x.Remarks;
          //    this.PDD = x.PD;
          //    this.MPD = x.MPDOD;
          //    this.MPD1 = x.MPDOS;
          //  }
          //});
          //this.commonService.data.FINALPRESCRIPTION1.push(pres);

          //this.FINALPRESCRIPTION1 = this.commonService.data.FINALPRESCRIPTION1;
          //this.optical = data.opticprescription;
          this.optical.forEach((x: any) => {
            if (x.Ocular === "OD" && x.TypeDescription === "Distance Vision") {
              this.SPHACC1 = x.DistSph;
              this.CYLACC1 = x.NearCyl;
              this.AXISACC1 = x.PinAxis;
              this.VA = x.Add;

            }
            else if (x.Ocular === "OS" && x.TypeDescription === "Distance Vision") {
              this.SPHTAN1 = x.DistSph;
              this.CYLTAN1 = x.NearCyl;
              this.AXISTAN1 = x.PinAxis;
              this.VATANA1 = x.Add;
            }
            else if (x.Ocular === "OD" && x.TypeDescription === "Near Vision") {
              this.SPHNV1 = x.DistSph;
              this.VANVV = x.Add;
            }
            else if (x.Ocular === "OS" && x.TypeDescription === "Near Vision") {
              this.SPHNVR1 = x.DistSph;
              this.VANVRR = x.Add;
            }
            else {
              this.Remarksacc = x.Remarks;
              this.PDD = x.PD;
              this.MPD = x.MPDOD;
              this.MPD1 = x.MPDOS;
              //this.UPPdate = x.PrescriptionDate;
              //this.CUMID = x.CustomerMasterID;
            }
          });
          this.isDisabled = false;
        });


      //this.commonService.getListOfData('CustomerOrder/IsCustomerFound/' + localStorage.getItem("CompanyID") + '/' + element.UIN)
      //  .subscribe(data => {
      //    debugger;
      //    if (data.Success == true) {
      //      debugger
      //      this.M_CustomerID = data.CusID;
      //      this.M_CustomerName = data.Name;
      //      this.M_Address = data.Address;
      //      this.M_MobileNo = data.MobileNo;
      //    }
      //    else {
      //      debugger
      //      Swal.fire({
      //        type: 'success',
      //        title: 'Customer Details will be added in Customer Master',
      //        position: 'top-end',
      //        showConfirmButton: false,
      //        timer: 1500,
      //        customClass: {
      //          popup: 'alert-warp',
      //          container: 'alert-container',
      //        },
      //      });
      //      let CustomerData = {
      //        UIN: element.UIN,
      //        FirstName: element.FirstName,
      //        Middlename: element.Middlename,
      //        Lastname: element.Lastname,
      //        Address1: element.Address1,
      //        Address2: element.Address2,
      //        Address3: element.Address3,
      //        MobileNo: element.MobileNo,
      //      }
      //      this.commonService.data.CustomerDatas = CustomerData;

      //      this.commonService.postData('CustomerOrder/CustomerDetailsSubmit/' + localStorage.getItem("CompanyID") + '/' + parseInt(localStorage.getItem("userroleID")), this.commonService.data)
      //        .subscribe(data => {
      //          if (data.Success == true) {
      //            debugger
      //            this.M_CustomerID = data.CusID;
      //            this.M_CustomerName = data.Name;
      //            this.M_Address = data.Address;
      //            this.M_MobileNo = data.MobileNo;
      //          }
      //          else {
      //            Swal.fire({
      //              type: 'warning',
      //              title: 'Invalid Input,Please Contact Administrator',
      //              position: 'top-end',
      //              showConfirmButton: false,
      //              timer: 1500,
      //              customClass: {
      //                popup: 'alert-warp',
      //                container: 'alert-container',
      //              },
      //            });
      //          }
      //        });
      //    }
      //  });
    }
    catch (Error) {
      this.commonService.getListOfData('Common/ErrorList/' + Error.message + '/' + "Customer Order" + '/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem('userroleID') + '/')
        .subscribe(data => { });
    }
  }



  EditOP() {
    // this.UPPdate;
    //this.CUMID;
    this.backdrop = 'none';
    this.PrescriptionModel = 'none';

    this.commonService.getListOfData('CustomerOrder/GetOpticalPrescription/' + this.regTranId + '/' + this.M_PrescriptionDate + '/' + parseInt(localStorage.getItem('CompanyID')))
      .subscribe(data => {
        if (data.opticprescription1.length > 0) {
          this.opticalprescription = [];
          var final = new FINALPRESCRIPTION();
          final.Description = 'Final Prescription';
          final.Ocular = 'OD';
          final.DistSph = '';
          final.NearCyl = '';
          final.PinAxis = '';
          final.Add = '';
          final.DistSphNVOD = '';
          final.AddNVOD = '';
          final.OcularOS = 'OS';
          final.DistSphOS = '';
          final.NearCylOS = '';
          final.PinAxisOS = '';
          final.AddOS = '';
          final.DistSphNVOS = '';
          final.AddNVOS = '';
          final.Remarks = '';
          final.CreatedBy = Number(localStorage.getItem('userroleID'));
          final.PD = '',
            final.MPDOD = '',
            final.MPDOS = '',
            final.OD = false,
            final.OS = false,
            this.opticalprescription.push(final);

          this.FINALPRESCRIPTION = data.opticprescription1;
          this.FINALPRESCRIPTION.forEach((x: any) => {
            debugger;
            if (x.Ocular === "OD" && x.TypeDescription === "Distance Vision") {
              this.opticalprescription[0].DistSph = x.DistSph;
              this.opticalprescription[0].NearCyl = x.NearCyl;
              this.opticalprescription[0].PinAxis = x.PinAxis;
              this.opticalprescription[0].Add = x.Add;
              this.opticalprescription[0].Remarks = x.Remarks;
              this.opticalprescription[0].PD = x.PD;
              this.opticalprescription[0].MPDOD = x.MPDOD;
              this.opticalprescription[0].MPDOS = x.MPDOS;

            }
            else if (x.Ocular === "OS" && x.TypeDescription === "Distance Vision") {
              this.opticalprescription[0].DistSphOS = x.DistSph;
              this.opticalprescription[0].NearCylOS = x.NearCyl;
              this.opticalprescription[0].PinAxisOS = x.PinAxis;
              this.opticalprescription[0].AddOS = x.Add;
              this.opticalprescription[0].Remarks = x.Remarks;
              this.opticalprescription[0].PD = x.PD;
              this.opticalprescription[0].MPDOD = x.MPDOD;
              this.opticalprescription[0].MPDOS = x.MPDOS;
            }
            else if (x.Ocular === "OD" && x.TypeDescription === "Near Vision") {
              this.opticalprescription[0].DistSphNVOD = x.DistSph;
              this.opticalprescription[0].AddNVOD = x.Add;
              this.opticalprescription[0].Remarks = x.Remarks;
              this.opticalprescription[0].PD = x.PD;
              this.opticalprescription[0].MPDOD = x.MPDOD;
              this.opticalprescription[0].MPDOS = x.MPDOS;
            }
            else if (x.Ocular === "OS" && x.TypeDescription === "Near Vision") {
              this.opticalprescription[0].DistSphNVOS = x.DistSph;
              this.opticalprescription[0].AddNVOS = x.Add;
              this.opticalprescription[0].Remarks = x.Remarks;
              this.opticalprescription[0].PD = x.PD;
              this.opticalprescription[0].MPDOD = x.MPDOD;
              this.opticalprescription[0].MPDOS = x.MPDOS;
            }
            else {

            }
          });
          this.FINALPRESCRIPTION = [];
          this.FINALPRESCRIPTION = this.opticalprescription;
          this.commonService.data.FINALPRESCRIPTION = this.FINALPRESCRIPTION;
          this.opticalPrescriptionblock = 'block';
          this.backdrop = 'block';
        }
        else {

        }

      });

  }


  ViewPrescriptionDetail() {

    try {
      this.backdrop = 'block';
      this.PrescriptionModel = 'block';

      this.commonService.getListOfData('CustomerOrder/GetOpticalPrescription/' + this.regTranId + '/' + this.M_PrescriptionDate + '/' + parseInt(localStorage.getItem('CompanyID')))
        .subscribe((data: any) => {
          debugger;

          this.optical = data.opticprescription1;
          this.optical.forEach((x: any) => {
            debugger;
            if (x.Ocular === "OD" && x.TypeDescription === "Distance Vision") {
              this.SPHACC1 = x.DistSph;
              this.CYLACC1 = x.NearCyl;
              this.AXISACC1 = x.PinAxis;
              this.VA = x.Add;
              this.Remarksacc = x.Remarks;
              this.PDD = x.PD;
              this.MPD = x.MPDOD;
              this.MPD1 = x.MPDOS;

            }
            else if (x.Ocular === "OS" && x.TypeDescription === "Distance Vision") {
              this.SPHTAN1 = x.DistSph;
              this.CYLTAN1 = x.NearCyl;
              this.AXISTAN1 = x.PinAxis;
              this.VATANA1 = x.Add;
              this.Remarksacc = x.Remarks;
              this.PDD = x.PD;
              this.MPD = x.MPDOD;
              this.MPD1 = x.MPDOS;
            }
            else if (x.Ocular === "OD" && x.TypeDescription === "Near Vision") {
              this.SPHNV1 = x.DistSph;
              this.VANVV = x.Add;
              this.Remarksacc = x.Remarks;
              this.PDD = x.PD;
              this.MPD = x.MPDOD;
              this.MPD1 = x.MPDOS;
            }
            else if (x.Ocular === "OS" && x.TypeDescription === "Near Vision") {
              this.SPHNVR1 = x.DistSph;
              this.VANVRR = x.Add;
              this.Remarksacc = x.Remarks;
              this.PDD = x.PD;
              this.MPD = x.MPDOD;
              this.MPD1 = x.MPDOS;
            }
            else {

            }
          });
          this.isDisabled = false;

        });
    }
    catch (Error) {
      this.commonService.getListOfData('Common/ErrorList/' + Error.message + '/' + "Customer Order" + '/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem('userroleID') + '/')
        .subscribe(data => { });
    }
  }

  /////////////////////////////////////////payment grid////////////////////////////////////////////////

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
      this.dataSource3.data = this.commonService.data.paymenttran;
      this.dataSource3._updateChangeSubscription();
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
      this.dataSource3.data = this.commonService.data.paymenttran;
      this.dataSource3._updateChangeSubscription();
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

  Amount(id, property: string, event: any, data) {
    debugger;

    let result: number = Number(event.target.textContent);
    this.dataSource3.filteredData[id][property] = result;
    this.dataSource3._updateChangeSubscription();

    this.PTotalAmount1();

    if (this.PTotalAmount > this.M_AdvanceAmount) {
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

  PrescriptionFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.PrescriptionSource.filter = filterValue.trim().toLowerCase();
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

  selectuploadnew() {
    this.backdrop = 'block';
    this.Uploadfilesblock = 'block';
  }

  selectFiles(event, files) {
    debugger
    var fileElement = document.getElementById("UploadPres");
    var fileExtension = "";
    if ((<HTMLInputElement>fileElement).value.lastIndexOf(".") > 0) {
      fileExtension = (<HTMLInputElement>fileElement).value.substring((<HTMLInputElement>fileElement).value.lastIndexOf(".") + 1, (<HTMLInputElement>fileElement).value.length);
    }
    if (fileExtension.toLowerCase() == "jpg" || fileExtension.toLowerCase() == "png") {
      let imgname = event.target.files[0].name;
      if (event.target.files && event.target.files[0]) {
        var filesAmount = event.target.files.length;
        for (let i = 0; i < filesAmount; i++) {
          const fileReader: FileReader = new FileReader();
          fileReader.onload = (event) => {
            this.urls = [];
            this.urls.push(fileReader.result);
            this.urls = this.urls.map((item) =>
              new ImageItem({ src: item, thumb: item })
            );
            this.basicLightboxExample();

          }
          fileReader.readAsDataURL(event.target.files[i]);
        }
      }
    }
    else {
      Swal.fire
        ({
          type: 'warning',
          title: 'Invalid file format',
          position: 'top-end',
          showConfirmButton: false,
          timer: 1500,
          customClass: {
            popup: 'alert-warp',
            container: 'alert-container',
          },
        });
      (<HTMLInputElement>document.getElementById("UploadPres")).value = null;
      this.urls = [];
    }
  }

  basicLightboxExample() {
    this.gallery.ref().load(this.urls);
  }

  basicLightboxExample1() {
    this.gallery.ref().load(this.uploadedImages);
  }

  removeUploadImage(i, event) {
    this.urls.splice(i, 1);
    this.UploadPres.nativeElement.value = "";
  }

  UploadfilesblockClosesss() {
    this.backdrop = 'none';
    this.Uploadfilesblock = 'none';
  }

  base64toBlob1(image) {
    for (var i = 0, j = image.length; i < j; i++) {
      var img = document.createElement('img');
      img.src = image[i];
      var byteString = atob(image[i].replace(/^data:image\/(png|jpeg|jpg);base64,/, ''));
      var ab = new ArrayBuffer(byteString.length);
      var ia = new Uint8Array(ab);
      for (var k = 0; k < byteString.length; k++) {
        ia[k] = byteString.charCodeAt(k);
      }
      var cmd = new Blob([ab]);
      this.blobss.push(cmd);
      var blob = this.blobss;

    }
    return blob;
  }
  ////////////////////////////////////////////final prescription ////////////////////////////////////////////////////////
  FINALPRESCRIPTION = [];
  Refraction = [];
  arrop = [];
  opticalprescriptionlength = [];
  opticalprescription = [];
  // opticalprescription1 = [];
  VAname;
  VAnamenear1;
  Addfinalprescription() {
    debugger;
    this.commonService.getListOfData('Common/GetDVvalues').subscribe(data => {
      debugger;
      this.VAname = data;
    });
    this.commonService.getListOfData('Common/GetNVvalues').subscribe(data => {
      debugger;
      this.VAnamenear1 = data;
    });
    var final = new FINALPRESCRIPTION();
    final.Description = 'Final Prescription';
    final.Ocular = 'OD';
    final.DistSph = '';
    final.NearCyl = '';
    final.PinAxis = '';
    final.Add = '';
    final.DistSphNVOD = '';
    final.AddNVOD = '';
    final.OcularOS = 'OS';
    final.DistSphOS = '';
    final.NearCylOS = '';
    final.PinAxisOS = '';
    final.AddOS = '';
    final.DistSphNVOS = '';
    final.AddNVOS = '';
    final.Remarks = '';
    final.CreatedBy = Number(localStorage.getItem('userroleID'));
    final.PD = '',
      final.MPDOD = '',
      final.MPDOS = '',
      final.OD = false,
      final.OS = false,
      this.FINALPRESCRIPTION.push(final);
    let p = this.Refraction.concat(this.FINALPRESCRIPTION);
    this.Refraction = p
    this.commonService.data.Refracion = this.Refraction;
    this.commonService.data.FINALPRESCRIPTION = this.FINALPRESCRIPTION;
    localStorage.setItem("FINALPRESCRIPTION", JSON.stringify(this.FINALPRESCRIPTION));
    this.arrop = JSON.parse(localStorage.getItem("FINALPRESCRIPTION"));
    this.opticalprescriptionlength = this.arrop;
  }
  changeValueDistSphFINAL(i, property: string, event: any) {
    debugger;
    let result = (event.target.value);
    this.FINALPRESCRIPTION[i][property] = result;
  }

  changeValueNearCylFINAL(i, property: string, event: any) {
    debugger;
    let result = (event.target.value);
    this.FINALPRESCRIPTION[i][property] = result;
  }

  changeValuePinAxisFINAL(i, property: string, event: any) {
    debugger;
    let result = (event.target.value);
    this.FINALPRESCRIPTION[i][property] = result;
  }


  changeValueDistSphNVODFINAL(i, property: string, event: any) {
    debugger;
    let result = (event.target.value);
    this.FINALPRESCRIPTION[i][property] = result;
  }


  changeValueDistSphOSFINAL(i, property: string, event: any) {
    debugger;
    let result = (event.target.value);
    this.FINALPRESCRIPTION[i][property] = result;
  }
  changeValueNearCylOSFINAL(i, property: string, event: any) {
    debugger;
    let result = (event.target.value);
    this.FINALPRESCRIPTION[i][property] = result;
  }
  changeValuePinAxisOSFINAL(i, property: string, event: any) {
    debugger;
    let result = (event.target.value);
    this.FINALPRESCRIPTION[i][property] = result;
  }


  changeValuesDistSphNVOSFINAL(i, property: string, event: any) {
    debugger;
    let result = (event.target.value);
    this.FINALPRESCRIPTION[i][property] = result;
  }


  changeValuesRemarksFINAL(i, property: string, event: any) {
    debugger;
    let result = (event.target.value);
    this.FINALPRESCRIPTION[i][property] = result;
  }
  ChangeDistanceaccep(i, event) {
    debugger;
    if (event.value == undefined) {

      this.FINALPRESCRIPTION[i].Add = '';
    }
    else {

      this.FINALPRESCRIPTION[i].Add = event.value;

    }

  }

  ChangeDistanceaccepos(i, event) {
    debugger;
    if (event.value == undefined) {

      this.FINALPRESCRIPTION[i].AddOS = '';
    }
    else {

      this.FINALPRESCRIPTION[i].AddOS = event.value;

    }

  }

  ChangeDistanceacceptance(i, event) {
    debugger;
    if (event.value == undefined) {

      this.FINALPRESCRIPTION[i].AddNVOD = '';
    }
    else {

      this.FINALPRESCRIPTION[i].AddNVOD = event.value;

    }

  }


  ChangeDistanceacceptanceos(i, event) {
    debugger;
    if (event.value == undefined) {

      this.FINALPRESCRIPTION[i].AddNVOD = '';
    }
    else {

      this.FINALPRESCRIPTION[i].AddNVOS = event.value;

    }

  }
  changeValuesPDcommon(i, property: string, event: any) {
    debugger;
    let result = (event.target.value);

    this.FINALPRESCRIPTION[i][property] = result;
  }
  changeValuesMPDODcommon(i, property: string, event: any) {
    debugger;
    let result = (event.target.value);

    this.FINALPRESCRIPTION[i][property] = result;
  }

  changeValuesMPDOScommon(i, property: string, event: any) {
    debugger;
    let result = (event.target.value);

    this.FINALPRESCRIPTION[i][property] = result;
  }


  ChangeDistancefinal(i, event) {
    debugger;
    if (event.value == undefined) {
      this.FINALPRESCRIPTION[i].Add = '';
    }
    else {
      this.FINALPRESCRIPTION[i].Add = event.value;
    }

  }

  ChangeDistancefinalos(i, event) {
    debugger;
    if (event.value == undefined) {
      this.FINALPRESCRIPTION[i].AddOS = '';
    }
    else {
      this.FINALPRESCRIPTION[i].AddOS = event.value;
    }

  }

  ChangeDistancefinalp(i, event) {
    debugger;
    if (event.value == undefined) {
      this.FINALPRESCRIPTION[i].AddNVOD = '';
    }
    else {
      this.FINALPRESCRIPTION[i].AddNVOD = event.value;
    }

  }


  ChangeDistancefinalpos(i, event) {
    debugger;
    if (event.value == undefined) {
      this.FINALPRESCRIPTION[i].AddNVOS = '';
    }
    else {
      this.FINALPRESCRIPTION[i].AddNVOS = event.value;
    }

  }


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
  MPDDD = true;
  numberOnlypd(i, property: string, event: any) {
    debugger;
    if (event.target.value > 99) {
      Swal.fire({
        type: 'warning',
        title: 'warning',
        text: 'Correct pupillary distance',
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          popup: 'alert-warp',
          container: 'alert-container',
        },
      });
      event.target.value = '';
      this.FINALPRESCRIPTION[i][property] = event.target.value;
    } else {

      if (event.target.value == '') {

        this.FINALPRESCRIPTION[i].MPDOD = '';

        this.FINALPRESCRIPTION[i].MPDOS = '';
        this.MPDDD = true;
      } else {

        this.FINALPRESCRIPTION[i][property] = event.target.value;
        this.MPDDD = false;

        if ((this.FINALPRESCRIPTION[i].MPDOD != '' && this.FINALPRESCRIPTION[i].MPDOS != '')) {
          const k = parseInt(event.target.value);
          const k4 = this.FINALPRESCRIPTION[i].MPDOD;
          const k5 = this.FINALPRESCRIPTION[i].MPDOS;
          const k6 = parseInt(k4) + parseInt(k5);
          if (k != k6) {
            this.FINALPRESCRIPTION[i].MPDOD = '';
            this.FINALPRESCRIPTION[i].MPDOS = '';
          }
        }
      }
    }




  }
  MPDOD(i, event) {
    debugger;
    const t = parseInt(event.target.value);
    const ttt = this.FINALPRESCRIPTION[i].PD;

    if (t > parseInt(ttt)) {
      Swal.fire({
        type: 'warning',
        title: 'warning',
        text: 'Correct monocular PD',
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          popup: 'alert-warp',
          container: 'alert-container',
        },
      });
      event.target.value = '';

      this.FINALPRESCRIPTION[i].MPDOS = event.target.value;

      this.FINALPRESCRIPTION[i].MPDOD = event.target.value;
    } else {
      if (event.target.value != '') {

        this.FINALPRESCRIPTION[i].MPDOD = event.target.value;
      } else {
        this.FINALPRESCRIPTION[i].MPDOD = '';
        this.FINALPRESCRIPTION[i].MPDOS = '';
      }

    }

  }
  MPDOS(i, event) {
    const t = parseInt(event.target.value);
    const ttt = this.FINALPRESCRIPTION[i].PD;

    if (t > parseInt(ttt)) {
      Swal.fire({
        type: 'warning',
        title: 'warning',
        text: 'Correct monocular PD',
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          popup: 'alert-warp',
          container: 'alert-container',
        },
      });
      event.target.value = '';

      this.FINALPRESCRIPTION[i].MPDOS = event.target.value;

      this.FINALPRESCRIPTION[i].MPDOD = event.target.value;
    } else {
      if (event.target.value != '') {

        this.FINALPRESCRIPTION[i].MPDOS = event.target.value;
      } else {
        this.FINALPRESCRIPTION[i].MPDOD = '';
        this.FINALPRESCRIPTION[i].MPDOS = '';
      }
    }
  }
  onsubmitOpticalPrescription() {

    this.commonService.postData('CustomerOrder/InsertOpticalPrescription/' + this.M_CustomerID + '/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem("userroleID"), this.commonService.data)
      .subscribe(data => {
        if (data.Success == true) {
          Swal.fire({
            type: 'success',
            title: 'success',
            text: 'Optical Prescription successfully submitted',
            position: 'top-end',
            showConfirmButton: false,
            timer: 1500,
            customClass: {
              popup: 'alert-warp',
              container: 'alert-container'
            },
          });
          this.FINALPRESCRIPTION = [];
          this.Refraction = [];
          this.arrop = [];
          this.opticalprescriptionlength = [];
          this.opticalPrescriptionblock = 'none';
          this.backdrop = 'none';
        }
        else {
          Swal.fire({
            type: 'warning',
            title: 'warning',
            text: 'Invalid Input,Please Contact Administrator',
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
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
}
