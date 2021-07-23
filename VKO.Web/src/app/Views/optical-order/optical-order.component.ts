import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatTableDataSource, DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material';
import { FormControl, NgForm } from '@angular/forms';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { CommonService } from 'src/app/shared/common.service';
import { OpticalOrderView, OPticalDetails } from 'src/app/Models/ViewModels/OpticalOrderView.Model';
import Swal from 'sweetalert2';
import { OpticalOrder } from 'src/app/Models/OpticalOrder.model';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { Console } from '@angular/core/src/console';
import { any } from '@amcharts/amcharts4/.internal/core/utils/Array';
import { Payment_Master } from '../../Models/PaymentWebModel ';
import { Router } from '@angular/router';
import { OneLineMaster } from '../../Models/ViewModels/OneLineMasterWebModel.ts';
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
  selector: 'app-optical-order',
  templateUrl: './optical-order.component.html',
  styleUrls: ['./optical-order.component.less'],
  providers: [


    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },

  ],
  encapsulation: ViewEncapsulation.None,
})



export class OpticalOrderComponent implements OnInit {

  @ViewChild('OpticalOrder') Form: NgForm
  maxToDate = new Date();
  date = new FormControl(new Date());
  serializedDate = new FormControl((new Date()).toISOString());
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
  transform(value: any, args?: any): any {

    if (value) {
      let num: any = Number(value);
      if (num) {
        if ((num = num.toString()).length > 9) { return 'sorry amount cant be print :)'; }
        const n = ('000000000' + num).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
        if (!n) { return ''; }
        let str = '';
        str += (Number(n[1]) !== 0) ? (this.a[Number(n[1])] || this.b[n[1][0]] + ' ' + this.a[n[1][1]]) + 'crore ' : '';
        str += (Number(n[2]) !== 0) ? (this.a[Number(n[2])] || this.b[n[2][0]] + ' ' + this.a[n[2][1]]) + 'lakh ' : '';
        str += (Number(n[3]) !== 0) ? (this.a[Number(n[3])] || this.b[n[3][0]] + ' ' + this.a[n[3][1]]) + 'thousand ' : '';
        str += (Number(n[4]) !== 0) ? (this.a[Number(n[4])] || this.b[n[4][0]] + ' ' + this.a[n[4][1]]) + 'hundred ' : '';
        str += (Number(n[5]) !== 0) ? ((str !== '') ? 'and ' : '') +
          (this.a[Number(n[5])] || this.b[n[5][0]] + ' ' +
            this.a[n[5][1]]) : '';
        return str;
      } else {
        return '';
      }
    } else {
      return '';
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
  maxDate = new Date();
  MINExpiryDate = new Date();
  maxInstrumentDate = new Date();
  M_OrderDate;
  Vendorname;
  M_VendorName;
  M_Address1;
  M_Address2;
  M_location;
  M_PhoneNo;
  M_GSTNo;
  State;
  Country;
  Locationname;
  M_Cityy;
  Cityname;
  M_OPCity;
  OPState;
  OPCountry;
  M_OPlocation;
  OPLocationname;
  OPCityname;
  lensNameList;
  M_VID;
  M_OrderNumber;
  M_ReferenceDate;
  M_ReferenceNumber;
  M_DeliveryName;
  M_DAddress1;
  M_DAddress2;
  M_DAddress3;
  M_DCity;
  M_Dlocation;
  M_DState;
  M_DCountry;
  M_VIDays;
  G_Transactiontypeid;
  M_TermsAndConditions;
  OpticalOrderID;
  DLocationname;
  DCityname;
  M_VName;
  M_VPhoneNo;
  M_VAddress1;
  M_VAddress2;
  M_VGSTNo;
  M_CompanyName;
  M_CAddress1;
  M_CAddress2;
  M_CAddress3;
  M_CPhone1;
  M_CWebsite;
  printMinPopup;
  OpticalordertranPRint;
  Paymentsmodes;
  DisableAddoptical = false;
  isInvalid = false;
  disableupdate = false;
  // DisableBrandSearch = false;
  hiddenUpdate = false;
  hiddenSubmit = true;
  OpticaltrnID;
  cancelblock;


  public person =
    {
      Grossproductamount: 0,
      Totaldiscountamount: 0,
      Totalgstamount: 0,
      Totalpoamount: 0,
      Totalamount: 0,
      TotalIGSTamount: 0,
      TotalCESSamount: 0,
      TotalAdditionalCESSamount: 0,
      TotalTaxAmount: 0,
    };

  constructor(public commonService: CommonService<OpticalOrderView>, public commonServiceIO: CommonService<OneLineMaster>, private router: Router,) {

  }
  Country1;
  Country2;
  Country3;
  disableSearch = true;
  disableSubmit = true;
  disableUpdate = true;
  disablePrint = true;
  accessdata;
  TranTypeID;
  CompanyID;
  docotorid;
  Tc;
  ngOnInit() {

    this.commonService.data = new OpticalOrderView();
    this.CompanyID = localStorage.getItem("CompanyID");
    this.docotorid = localStorage.getItem('userroleID');
    //////////////////////////////////////////////////////////////////////////////////
    var Pathname = "Opticalslazy/OpticalOrder";
    var n = Pathname;
    var sstring = n.includes("/");
    var Objdata = JSON.parse(localStorage.getItem("AllCollectionData"));
    if (sstring == false) {
      if (Objdata.find(el => el.Parentmoduledescription === Pathname)) {
        //////////////////////////////////////////////////////////////////////////////
        this.commonService.getListOfData('Common/GetAccessdetails/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem("userroleID") + '/' + Pathname).subscribe(data => {
          debugger;
          this.accessdata = data.GetAvccessDetails;
          if (this.accessdata.find(x => x.Add == true)) {
            this.disableSubmit = false;
          } else {
            this.disableSubmit = true;
          }
          if (this.accessdata.find(x => x.Edit == true)) {
            this.disableSearch = false;
            this.disableUpdate = false;
          } else {
            this.disableSearch = true;
            this.disableUpdate = true;
          }
          if (this.accessdata.find(x => x.Print == true)) {
            this.disablePrint = false;
            //this.DisableReprint = false;
          } else {
            this.disablePrint = true;
            //this.DisableReprint = true;
          }
          //if (this.accessdata.find(x => x.Delete == true)) {
          //  this.disableDelete = false;
          //} else {
          //  this.disableDelete = true;
          //}
        });

        //////////////////////////////////////////////////////////////////////////////


        this.commonService.getListOfData('Common/GetCurrencyvalues/' + localStorage.getItem('CompanyID')).subscribe(data => {
          debugger;
          this.Country1 = data[0].Value;
          this.Country2 = data[0].Text;
        });
        //this.commonService.getListOfData('User/GetModuletransactiondetails/' + localStorage.getItem('MenuDescription') + '/' + localStorage.getItem('CompanyID'))
        //  .subscribe(data => {
        //    this.G_Transactiontypeid = data.transactionid;
        //    localStorage.setItem("TransactionTypeid", this.G_Transactiontypeid)
        //  });

        let res = Objdata.find(x => x.Parentmoduledescription == Pathname);
        this.TranTypeID = res.TransactionID;

        this.commonService.getListOfData('Common/Getpaymentvalues').subscribe(data => { this.Paymentsmodes = data; });
        this.M_OrderDate = this.date.value;
        this.M_DeliveryDate = this.date.value;
        this.getAllDropdowns();


        setTimeout(() => {
          let res1 = Objdata.find(x => x.Parentmoduledescription == Pathname);
          this.Tc = res1.TransactionID;
          if (this.Tc == null || this.Tc == undefined) {
            this.disableSubmit = true;
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
                this.disableSubmit = true;
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
                this.disableSubmit = true;
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





      }
      else {
        Swal.fire({
          type: 'warning',
          title: 'warning',
          text: 'Un-Authorized Access, Please contact Administrator',
          position: 'top-end',
          showConfirmButton: false,
          timer: 1500,
          customClass: {
            popup: 'alert-warp',
            container: 'alert-container'
          },
        });
        this.commonService.getListOfData('Common/Getlogdetails/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem("Doctorname") + '/' + "OpticalOrder").subscribe(data => {
          this.router.navigate(['dash']);
        });
      }
    }
    else if (sstring == true) {
      if (Objdata.find(el => el.Parentmoduledescription === Pathname)) {
        //////////////////////////////////////////////////////////////////////////////
        this.commonService.getListOfData('Common/GetAccessdetailsstring/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem("userroleID") + '/' + Pathname).subscribe(data => {
          debugger;
          this.accessdata = data.GetAvccessDetails;
          if (this.accessdata.find(x => x.Add == true)) {
            this.disableSubmit = false;
          } else {
            this.disableSubmit = true;
          }
          if (this.accessdata.find(x => x.Edit == true)) {
            this.disableSearch = false;
            this.disableUpdate = false;
          } else {
            this.disableSearch = true;
            this.disableUpdate = true;
          }
          if (this.accessdata.find(x => x.Print == true)) {
            this.disablePrint = false;
            //this.DisableReprint = false;
          } else {
            this.disablePrint = true;
            //this.DisableReprint = true;
          }
          //if (this.accessdata.find(x => x.Delete == true)) {
          //  this.disableDelete = false;
          //} else {
          //  this.disableDelete = true;
          //}
        });

        //////////////////////////////////////////////////////////////////////////////


        this.commonService.getListOfData('Common/GetCurrencyvalues/' + localStorage.getItem('CompanyID')).subscribe(data => {
          debugger;
          this.Country1 = data[0].Value;
          this.Country2 = data[0].Text;
        });
        //this.commonService.getListOfData('User/GetModuletransactiondetails/' + localStorage.getItem('MenuDescription') + '/' + localStorage.getItem('CompanyID'))
        //  .subscribe(data => {
        //    this.G_Transactiontypeid = data.transactionid;
        //    localStorage.setItem("TransactionTypeid", this.G_Transactiontypeid)
        //  });

        let res = Objdata.find(x => x.Parentmoduledescription == Pathname);
        this.TranTypeID = res.TransactionID;

        this.commonService.getListOfData('Common/Getpaymentvalues').subscribe(data => { this.Paymentsmodes = data; });
        this.M_OrderDate = this.date.value;
        this.M_DeliveryDate = this.date.value;
        this.getAllDropdowns();


      }
      else {
        Swal.fire({
          type: 'warning',
          title: 'warning',
          text: 'Un-Authorized Access, Please contact Administrator',
          position: 'top-end',
          showConfirmButton: false,
          timer: 1500,
          customClass: {
            popup: 'alert-warp',
            container: 'alert-container'
          },
        });
        this.commonService.getListOfData('Common/Getlogdetails/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem("Doctorname") + '/' + "OpticalOrder").subscribe(data => {
          this.router.navigate(['dash']);
        });
      }

    }
    /////////////////////////////////////////////////////////////////////////////////////



    $(document).ready(function () {
      $("#myInput").on("keyup", function () {
        var value = $(this).val().toLowerCase();
        $("#myTable tr").filter(function () {
          $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
      });
    });
    $(document).ready(function () {
      $("#myInput1").on("keyup", function () {
        var value = $(this).val().toLowerCase();
        $("#myTable1 tr").filter(function () {
          $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
      });
    });

  }

  //displayedColumns: string[] = ['Type', 'Brand','Description','Sph1', 'Cyl1', 'Axis1', 'Add1', 'UOM', 'Quantity', 'Price', 'Amount', 'Discount', 'DiscountAmount', 'GrossAmount', 'TaxDescription', 'GST', 'GSTValue1', 'TotalAmount', 'Delete',];
  //dataSource = new MatTableDataSource();
  displayedColumns: string[] = ['Brand', 'Type', 'LensPower', 'UOM', 'Quantity', 'Price', 'Amount', 'Discount', 'DiscountAmount', 'GrossAmount', 'TaxDescription', 'GST', 'GSTValue1', 'TotalAmount', 'Delete',];
  dataSource = new MatTableDataSource();

  displayedColumnsReprint: string[] = ['TypeRP', 'BrandRP', 'ModelRP', 'LensNameRP', 'IndexRP', 'ColorRP', 'UOMRP', 'QuantityRP', 'PriceRP', 'AmountRP', 'DiscountRP', 'DiscountAmountRP', 'GrossAmountRP', 'TaxDescriptionRP', 'GSTRP', 'GSTValue1RP', 'TotalAmountRP'];


  dataSourceReprint = new MatTableDataSource();
  displayedColumnsprint: string[] = ['BrandP', 'TypeP', 'LensPowerP', 'UOMP', 'QuantityP', 'PriceP', 'AmountP', 'DiscountP', 'DiscountAmountP', 'GrossAmountP', 'TaxDescriptionP', 'GSTP', 'GSTValue1P', 'TotalAmountP'];
  dataSourceprint = new MatTableDataSource();

  //displayedColumns1 = ['Action', 'Brand', 'Model', 'LensOptions', 'Description', 'Index', 'Color', 'Size', 'Price']
  displayedColumns1 = ['Action', 'Brand', 'Description', 'LensPowers', 'Price']
  dataSource1 = new MatTableDataSource();


  getAllDropdowns() {
    this.commonService.getListOfData('Common/GetVendornamevalues/' + parseInt(localStorage.getItem("CompanyID"))).subscribe((data: any) => {
      debugger;
      this.Vendorname = data;
      this.commonService.getListOfData('Common/Getlocationcityvalues').subscribe(data => { this.Cityname = data; });
      this.commonService.getListOfData('Common/Getlocationcityvalues').subscribe(data => { this.OPCityname = data; });
    });
    this.commonService.getListOfData('Common/Getlensvalues1/' + this.M_VID).subscribe((data: any) => {
      debugger;
      this.lensNameList = data;
    });
    this.commonService.getListOfData('Common/Getlocationcityvalues').subscribe(data => { this.DCityname = data; });
  }

  DCitysumbit() {
    debugger;
    this.commonService.getListOfData('OpticalOrder/GetlocationDetails/' + this.M_DCity + '/')
      .subscribe((data: any) => {
        debugger;
        this.M_DState = data.ParentDescriptionstate;
        this.M_DCountry = data.ParentDescriptioncountry;
      });
    this.commonService.getListOfData('Common/Getlocationvalues/' + this.M_DCity).subscribe(data => {
      debugger;
      this.DLocationname = data;
    });
  }


  //table value binding
  //OpticalOrder = [];
  ///////////////////////////////////////////brand action/////////////////////////////////////////////////////////////////////////////


  //selecttype(element) {
  //  debugger
  //  this.dataSource.data.splice(this.Index, 1);
  //  this.dataSource._updateChangeSubscription();

  //  this.commonService.getListOfData('CustomerOrder/GetOfferDetail/' + parseInt(localStorage.getItem("CompanyID")) + '/' + element.LMID + '/' + element.LTID).subscribe(data => {
  //    debugger
  //      data.DiscountPercent
  //      let OpticalOrder = new OPticalDetails();
  //      OpticalOrder.LMID = element.LMID;
  //      OpticalOrder.LTID = element.LTID;
  //      OpticalOrder.Type = element.Type;
  //      OpticalOrder.Brand = element.Brand;
  //      OpticalOrder.Model = element.Model;
  //      OpticalOrder.LensOptions = element.LensOptions;
  //      OpticalOrder.Index = element.Index;
  //      OpticalOrder.Color = element.Color;
  //      OpticalOrder.HSNNo = element.HSNNo;
  //      OpticalOrder.UOM = element.UOM;
  //      OpticalOrder.uomid = element.uomid;
  //      OpticalOrder.GrossAmount = element.Price;
  //      OpticalOrder.Quantity = 1;
  //      OpticalOrder.UnitPrice = element.Price;
  //      OpticalOrder.GivenQtyPrice = OpticalOrder.Quantity * OpticalOrder.UnitPrice;
  //      OpticalOrder.Discount = 0;
  //      OpticalOrder.DiscountAmount = 0;
  //      OpticalOrder.CGST = element.GST == null ? null : element.GST / 2;
  //      OpticalOrder.SGST = element.GST == null ? null : element.GST / 2;
  //      OpticalOrder.GST = element.GST == null ? null : element.GST;
  //      OpticalOrder.GSTValue = element.GST == null ? null : OpticalOrder.GrossAmount * (OpticalOrder.GST / 100);
  //      OpticalOrder.Amount = Math.floor(element.Price + (element.Price * (element.GST / 100)));
  //      this.commonService.data.OPticalDetails.push(OpticalOrder);
  //      this.dataSource.data = this.commonService.data.OPticalDetails;
  //      this.dataSource._updateChangeSubscription();
  //      this.FrameModel = 'none';
  //      this.backdrop = 'none';




  //  });
  //}


  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //lensView(event, id) {
  selecttype(element) {
    debugger;
    let lensTranID = element.LTID;
    this.commonService.getListOfData('OpticalOrder/GetOpticalDetails/' + lensTranID + '/' + parseInt(localStorage.getItem("CompanyID")))
      .subscribe(data => {
        debugger
        //this.dataSource.data.splice(id, 1);
        this.dataSource.data.splice(this.Index, 1);
        this.dataSource._updateChangeSubscription();
        this.commonService.data.OPticalOrderdetails = data.OpticalOrderdetails;
        if (data.OpticalOrderdetails.length > 0) {
          var OPDetails = new OPticalDetails();

          OPDetails.Description = element.Description;
          OPDetails.Type = element.Type;
          OPDetails.Sph = element.Sph;
          OPDetails.Cyl = element.Cyl;
          OPDetails.Axis = element.Axis;
          OPDetails.Add = element.Add;

          OPDetails.FrameTypeID = element.FrameTypeID;
          OPDetails.FrameWidthID = element.FrameWidthID;
          OPDetails.FrameStyleID = element.FrameStyleID;
          OPDetails.FrameShapeID = element.FrameShapeID;




          OPDetails.Brand = element.Brand;
          OPDetails.Model = element.Model;
          OPDetails.Index = element.Index;
          OPDetails.Color = element.Color;
          OPDetails.LTID = element.LTID;
          OPDetails.LensName = element.LensOptions;
          OPDetails.LMID = this.commonService.data.OPticalOrderdetails[0].LMID;
          OPDetails.UOMDescription = this.commonService.data.OPticalOrderdetails[0].UOMDescription;
          OPDetails.Quantity;
          OPDetails.Prize = this.commonService.data.OPticalOrderdetails[0].Prize;
          OPDetails.Amount;
          OPDetails.Discount;
          OPDetails.DiscountAmount;
          OPDetails.GrossAmount;
          OPDetails.GST = this.commonService.data.OPticalOrderdetails[0].GST;
          OPDetails.CESS = this.commonService.data.OPticalOrderdetails[0].CESS;
          OPDetails.AdditionalCESS = this.commonService.data.OPticalOrderdetails[0].AdditionalCESS;

          OPDetails.CGSTPercentage = this.commonService.data.OPticalOrderdetails[0].CGSTPercentage;
          OPDetails.SGSTPercentage = this.commonService.data.OPticalOrderdetails[0].SGSTPercentage;


          if (this.commonService.data.OPticalOrderdetails[0].TaxDescription == null) {
            OPDetails.TaxDescription = "";
          }
          else {
            OPDetails.TaxDescription = this.commonService.data.OPticalOrderdetails[0].TaxDescription;
          }
          if (this.commonService.data.OPticalOrderdetails[0].CESSDescription == null) {
            OPDetails.CESSDescription = "";
          }
          else {
            OPDetails.CESSDescription = this.commonService.data.OPticalOrderdetails[0].CESSDescription;
          }
          if (this.commonService.data.OPticalOrderdetails[0].AdditionalCESSDescription == null) {
            OPDetails.AdditionalCESSDescription = "";
          }
          else {
            OPDetails.AdditionalCESSDescription = this.commonService.data.OPticalOrderdetails[0].AdditionalCESSDescription;
          }
          OPDetails.GSTAmount;
          OPDetails.TotalAmount;
          this.commonService.data.OPticalDetails.unshift(OPDetails);// = this.OpticalOrder;
          this.dataSource.data = this.commonService.data.OPticalDetails;
          this.dataSource._updateChangeSubscription();
          this.FrameModel = 'none';
          this.backdrop = 'none';
        }

        this.commonService.data.OPticalOrderdetails = [];
      });
    this.DisableAddoptical = false;

  }

  //Add table rows
  AddOptical() {

    debugger;
    if (this.M_VendorName == null || this.M_VendorName == undefined) {
      Swal.fire({
        type: 'warning',
        title: 'warning',
        text: 'Check The Vendor Details',
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          popup: 'alert-warp',
          container: 'alert-container'
        },
      });
      return;
    }
    //if (this.lensNameList.length != 0) {
    this.commonService.getListOfData('Common/Getlensvalues1/' + this.M_VID).subscribe((data: any) => {
      debugger;
      this.M_OrderDate = this.date.value;
      this.M_DeliveryDate = this.date.value;
      let dm = data;
      var H = this.commonService.data.OPticalDetails;
      var b = dm.filter((c) => H.every((balanceCode) => balanceCode.LensName !== c.Text));
      this.lensNameList = b;
    });
    if (this.dataSource.data.length > 0) {
      if (this.commonService.data.OPticalDetails.some(Med => Med.Quantity === 0)) {
        Swal.fire({
          type: 'warning',
          title: 'warning',
          text: 'Select Your Quantity',
          position: 'top-end',
          showConfirmButton: false,
          timer: 1500,
          customClass: {
            popup: 'alert-warp',
            container: 'alert-container'
          },
        });
        return;
      }
    }
    var OPDetails = new OPticalDetails();
    OPDetails.LensName = "";
    OPDetails.UOMDescription = "";
    OPDetails.Quantity;
    OPDetails.Prize;
    OPDetails.Amount;
    OPDetails.Discount;
    OPDetails.DiscountAmount;
    OPDetails.GST;
    OPDetails.GSTAmount;
    OPDetails.IGST;
    OPDetails.IGSTAmount;
    OPDetails.CESS;
    OPDetails.CESSAmount;
    OPDetails.AdditionalCESS;
    OPDetails.AdditionalCESSAmount;
    OPDetails.GrossAmount;
    OPDetails.TotalAmount;
    this.commonService.data.OPticalDetails.unshift(OPDetails);
    this.dataSource.data = this.commonService.data.OPticalDetails;
    this.dataSource._updateChangeSubscription();
    this.DisableAddoptical = true;

  }

  /*  Validation */
  RestrictNegativeValues(e): boolean {

    if (!(e.keyCode >= 48 && e.keyCode <= 57)) {
      return false;
    }
  }

  Restrict(event) {
    debugger;
    if (event.target.value > 100) {
      Swal.fire({
        type: 'warning',
        title: 'warning',
        text: 'Cannot More than 100% Discount',
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          popup: 'alert-warp',
          container: 'alert-container'
        },
      });
      event.target.value = 0;
    }
  }

  changeValue(id, property: string, event: any) {
    debugger;
    let result: number = Number(event.target.value);
    this.dataSource.filteredData[id][property] = result;
    this.dataSource._updateChangeSubscription();
  }

  changeValueAmount(id, element, property: string) {
    element.Amount = element.Quantity * element.Prize;
  }
  changeValueGrossAmount(id, element, property: string) {
    var num = (element.Amount) - (element.Amount) * element.Discount / 100;
    num = parseFloat(num.toFixed(2));
    element.GrossAmount = num;
  }
  changeValueDiscountAmount(id, element, property: string) {
    var resDisAmount = (element.Quantity * element.Prize) * element.Discount / 100;
    resDisAmount = parseFloat(resDisAmount.toFixed(2));
    element.DiscountAmount = resDisAmount;
  }
  changeValueTotal(id, element, property: string) {
    debugger;

    var resTotal = element.GrossAmount + (element.GrossAmount) * ((element.GST / 100) + (element.CESS / 100) + (element.AdditionalCESS / 100));
    resTotal = parseFloat(resTotal.toFixed(2));
    element.TotalAmount = resTotal;
  }
  changeGStAmount(id, element, property: string) {
    var resTotal = element.GrossAmount * (element.GST / 100);
    //var resTotal = element.TotalAmount - element.GrossAmount
    resTotal = parseFloat(resTotal.toFixed(2));
    element.GSTAmount = resTotal;
  }
  changeCESSAmount(id, element, property: string) {
    var resTotal = element.GrossAmount * (element.CESS / 100);
    resTotal = parseFloat(resTotal.toFixed(2));
    element.CESSAmount = resTotal;
  }
  changeAdditionalCESSAmount(id, element, property: string) {
    debugger;
    var resTotal = element.GrossAmount * (element.AdditionalCESS / 100);
    resTotal = parseFloat(resTotal.toFixed(2));
    element.AdditionalCESSAmount = resTotal;
  }
  //GetTotalcost1;
  //GetTotalcost() {
  //  var restotalcost = this.commonService.data.OPticalDetails.map(t => t.Amount).reduce((acc, value) => acc + value, 0);
  //  restotalcost = parseFloat(restotalcost.toFixed(2));
  //  this.person.Totalamount = restotalcost;
  //  //this.GetTotalcost1 = this.person.Totalamount;
  //  return restotalcost;
  //}
  //GetGSTAmount() {
  //  var restotalcost = this.commonService.data.OPticalDetails.map(t => t.GSTAmount).reduce((acc, value) => acc + value, 0);
  //  restotalcost = parseFloat(restotalcost.toFixed(2));
  //  this.person.Totalgstamount = restotalcost;
  //  return restotalcost;
  //}
  ////GetGrossAmount1;
  //GetGrossAmount() {
  //  var restotalcost = this.commonService.data.OPticalDetails.map(t => t.GrossAmount).reduce((acc, value) => acc + value, 0);
  //  restotalcost = parseFloat(restotalcost.toFixed(2));    
  //  this.person.Grossproductamount = restotalcost;
  //  //this.GetGrossAmount1 = this.person.Grossproductamount;
  //  return restotalcost;
  //}
  ////GetDiscountAmount1;
  //GetDiscountAmount() {
  //  var restotalcost = this.commonService.data.OPticalDetails.map(t => t.DiscountAmount).reduce((acc, value) => acc + value, 0);
  //  restotalcost = parseFloat(restotalcost.toFixed(2));
  //  this.person.Totaldiscountamount = restotalcost;
  // // this.GetDiscountAmount1 = this.person.Totaldiscountamount;
  //  return restotalcost;
  //}
  GetTotalAmount1;
  GetTotalAmount() {
    var restotalcost = this.commonService.data.OPticalDetails.map(t => t.TotalAmount).reduce((acc, value) => acc + value, 0);
    restotalcost = Math.floor(restotalcost);
    this.person.Totalpoamount = restotalcost;
    this.GetTotalAmount1 = this.person.Totalpoamount;
    return restotalcost;
  }
  GetTotalPriceAmount() {
    var restotalcost = this.commonService.data.OPticalDetails.map(t => t.Prize).reduce((acc, value) => acc + value, 0);
    restotalcost = Math.floor(restotalcost);
    return restotalcost;
  }
  GetTotalRateAmount() {
    var restotalcost = this.commonService.data.OPticalDetails.map(t => t.Amount).reduce((acc, value) => acc + value, 0);
    restotalcost = Math.floor(restotalcost);
    return restotalcost;
  }
  GetTotalDiscountAmount() {
    var restotalcost = this.commonService.data.OPticalDetails.map(t => t.DiscountAmount).reduce((acc, value) => acc + value, 0);
    restotalcost = Math.floor(restotalcost);
    return restotalcost;
  }
  GetTotalGrossAmount() {
    var restotalcost = this.commonService.data.OPticalDetails.map(t => t.GrossAmount).reduce((acc, value) => acc + value, 0);
    restotalcost = Math.floor(restotalcost);
    return restotalcost;
  }
  GetTotalTaxAmount() {
    var restotalcost = this.commonService.data.OPticalDetails.map(t => t.GSTAmount + t.CESSAmount + t.AdditionalCESSAmount).reduce((acc, value) => acc + value, 0);
    restotalcost = Math.floor(restotalcost);
    return restotalcost;
  }

  //GetCESSAmount() {
  //  var restotalcost = this.commonService.data.OPticalDetails.map(t => t.CESSAmount).reduce((acc, value) => acc + value, 0);
  //  restotalcost = parseFloat(restotalcost.toFixed(2));
  //  this.person.TotalCESSamount = restotalcost;
  //  return restotalcost;
  //}
  //GetAdditionalCESSAmount() {
  //  var restotalcost = this.commonService.data.OPticalDetails.map(t => t.AdditionalCESSAmount).reduce((acc, value) => acc + value, 0);
  //  restotalcost = parseFloat(restotalcost.toFixed(2));
  //  this.person.TotalAdditionalCESSamount = restotalcost;
  //  return restotalcost;
  //}
  ////GetTaxAmount1;
  //GetTaxAmount() {
  //  var restotalcost = this.GetGSTAmount() + this.GetCESSAmount() + this.GetAdditionalCESSAmount();
  //  restotalcost = parseFloat(restotalcost.toFixed(2));
  //  this.person.TotalTaxAmount = restotalcost;
  //  //this.GetTaxAmount1 = this.person.TotalTaxAmount;
  //  return restotalcost;
  //}

  DeleteTB(i, item) {
    debugger;

    Swal.fire({
      title: 'Are you sure?',
      text: "Want to delete",
      type: 'warning',
      showCancelButton: true,
      cancelButtonColor: '#d33',
      cancelButtonText: 'No, cancel!',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        if (i !== -1) {
          this.OpticaltrnID = item.ID
          this.commonService.data.Companyname = localStorage.getItem("Companyname");
          this.commonService.postData('OpticalOrder/DeleteOpticalOrder/' + parseInt(localStorage.getItem("CompanyID")) + '/' + this.TranTypeID + '/' + this.OpticaltrnID, this.commonService.data)
            .subscribe(data => {
              debugger;
              if (data.Success == true) {
                this.dataSource.data.splice(i, 1);
                this.dataSource._updateChangeSubscription();
                Swal.fire(
                  'Deleted!',
                  'Deleted Successfully.',
                  'success'
                )

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
                    container: 'alert-container'
                  },
                });

              }
            });
        }
      }
      else {
        Swal.fire(
          'Cancelled',
          'Optical order has not been deleted'
        )
      }
    })
    this.commonService.getListOfData('Common/Getlensvalues1/' + this.M_VID).subscribe((data: any) => {
      debugger;
      this.lensNameList = data;
    });
    this.commonService.getListOfData('Common/Getlensvalues1/' + this.M_VID).subscribe((data: any) => {
      debugger;
      let dm1 = data;
      var H1 = this.commonService.data.OPticalDetails;
      var b1 = dm1.filter((c1) => H1.every((balanceCode) => balanceCode.LensName !== c1.Text));
      this.lensNameList = b1;
    });
    this.DisableAddoptical = false;
  }
  Submitprint;
  PAddress;
  Pphone;
  Pweb;
  PCompnayname;
  PAddress2;
  PAddress3;
  OrderNumber;
  GetTotalAmount2;
  paymentPrint;
  ReceiptNumber;
  ReceiptDate;
  M_DeliveryDate;
  M_Dinstructions;
  OpticalOrderpaymentA;
  hiddenpaymentinprint: boolean;
  hiddenpaymentreprint: boolean;
  onSubmit(form: NgForm) {
    try {
      if (this.commonService.data.OPticalDetails.length < 1) {
        Swal.fire({
          type: 'warning',
          title: 'warning',
          text: 'Check The Item Details',
          position: 'top-end',
          showConfirmButton: false,
          timer: 1500,
          customClass: {
            popup: 'alert-warp',
            container: 'alert-container'
          },
        });
        return;
      }
      if (this.commonService.data.OPticalDetails.some(Med => Med.LensName === "")) {
        Swal.fire({
          type: 'warning',
          title: 'warning',
          text: 'Select Your LensName',
          position: 'top-end',
          showConfirmButton: false,
          timer: 1500,
          customClass: {
            popup: 'alert-warp',
            container: 'alert-container'
          },
        });
        return;
      }
      if (this.commonService.data.OPticalDetails.some(Med => Med.Quantity === 0)) {
        Swal.fire({
          type: 'warning',
          title: 'warning',
          text: 'Select Your Quantity',
          position: 'top-end',
          showConfirmButton: false,
          timer: 1500,
          customClass: {
            popup: 'alert-warp',
            container: 'alert-container'
          },
        });
        return;
      }
      if (this.commonService.data.paymenttran.length < 1) {
        this.backdrop = 'block';
        this.OpticalOrderpaymentA = 'block';
        return;
      }
      debugger;
      if (form.valid) {
        this.isInvalid = false;
        this.commonService.data.OpticalOrder = new OpticalOrder();
        this.commonService.data.OpticalOrder.CmpID = parseInt(localStorage.getItem("CompanyID"));
        this.commonService.data.OpticalOrder.OrderDate = this.M_OrderDate;
        this.commonService.data.OpticalOrder.RefNo = this.M_ReferenceNumber;
        this.commonService.data.OpticalOrder.RefDate = this.M_ReferenceDate;
        this.commonService.data.OpticalOrder.VendorID = this.vendorID;
        this.commonService.data.OpticalOrder.DeliveryName = this.M_DeliveryName;
        this.commonService.data.OpticalOrder.DeliveryAddress1 = this.M_DAddress1;
        this.commonService.data.OpticalOrder.DeliveryAddress2 = this.M_DAddress2;
        this.commonService.data.OpticalOrder.DeliveryAddress3 = this.M_DAddress3;
        this.commonService.data.OpticalOrder.DeliveryLocationID = this.M_Dlocation;
        this.commonService.data.OpticalOrder.DeliveryDate = this.M_DeliveryDate;
        this.commonService.data.OpticalOrder.Deliveryinstructions = this.M_Dinstructions;
        this.commonService.data.OpticalOrder.Validity = this.M_VIDays;
        this.commonService.data.OpticalOrder.TermsAndConditions = this.M_TermsAndConditions;
        this.commonService.data.OpticalOrder.GrossProductValue = this.person.Totalpoamount;
        this.commonService.data.OpticalOrder.TotalProductValue = this.person.Totalamount;
        this.commonService.data.OpticalOrder.TotalDiscountAmount = this.person.Totaldiscountamount;
        this.commonService.data.OpticalOrder.TotalGSTTaxValue = this.person.Totalgstamount
        this.commonService.data.OpticalOrder.CESSAmount = this.person.TotalCESSamount;
        this.commonService.data.OpticalOrder.AddCESSPerAmt = this.person.TotalAdditionalCESSamount;
        this.commonService.data.OpticalOrder.CreatedBy = localStorage.getItem('userroleID');
        this.commonService.data.Companyname = localStorage.getItem("Companyname");
        //console.log(this.commonService.data);
        this.dataSourceprint.data = this.commonService.data.OPticalDetails;
        this.paymentPrint = this.commonService.data.paymenttran;
        this.commonService.postData('OpticalOrder/InsertOpticalOrder/' + parseInt(localStorage.getItem("CompanyID")) + '/' + this.TranTypeID, this.commonService.data)
          .subscribe(data => {
            debugger;
            if (data.Success == true) {
              this.PAddress = data.PAddress;
              this.Pphone = data.Pphone;
              this.Pweb = data.Pweb;
              this.PCompnayname = data.PCompnayname;
              this.OrderNumber = data.OPticalnum;
              this.PAddress2 = data.PAddress2;
              this.PAddress3 = data.PAddress3;
              this.ReceiptNumber = data.ReceiptNumber;
              this.ReceiptDate = data.ReceiptDate;
              this.GetTotalAmount2 = this.GetTotalAmount1;
              if (this.paymentPrint.length == 0) {
                this.hiddenpaymentinprint = false
              }
              else { this.hiddenpaymentinprint = true }
              //this.getpayment();   
              //this.dataSource.data = [];
              //this.commonService.data.OPticalDetails = [];
              Swal.fire({
                type: 'success',
                title: 'success',
                text: 'Saved Successfully',
                position: 'top-end',
                showConfirmButton: false,
                timer: 1500,
                customClass: {
                  popup: 'alert-warp',
                  container: 'alert-container'
                },
              });
              this.backdrop = 'block';
              this.Submitprint = 'block';
            }
            else if (data.Message.includes('Violation of PRIMARY KEY')) {

              Swal.fire({
                type: 'warning',
                title: 'warning',
                text: `${(data.Bill)} already exists`,
                position: 'top-end',
                showConfirmButton: false,
                timer: 1500,
                customClass: {
                  popup: 'alert-warp',
                  container: 'alert-container'
                },
              });
            }
            else if (data.Message == "Running Number Does'nt Exist") {
              debugger;

              Swal.fire({

                type: 'warning',
                title: 'warning',
                text: 'Number control needs to be created for JOB Order',
                position: 'top-end',
                showConfirmButton: false,
                timer: 1500,
                customClass: {
                  popup: 'alert-warp',
                  container: 'alert-container'
                },
              });

            }
            else if (data.Message == "TransactionTypeid Does'nt Exist") {
              debugger;

              Swal.fire({

                type: 'warning',
                title: 'warning',
                text: 'TransactionID needs to be created for JOB Order',
                position: 'top-end',
                showConfirmButton: false,
                timer: 1500,
                customClass: {
                  popup: 'alert-warp',
                  container: 'alert-container'
                },
              });

            }

            else if (data.Message == "Receipt Number Does'nt Exist") {
              debugger;

              Swal.fire({
                type: 'warning',
                title: 'warning',
                text: 'Number control needs to be created for Receipt',
                position: 'top-end',
                showConfirmButton: false,
                timer: 1500,
                customClass: {
                  popup: 'alert-warp',
                  container: 'alert-container'
                },
              });

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
                  container: 'alert-container'
                },
              });
            }
          });
      }

    }
    catch (Error) {
      alert(Error.message);

      this.commonService.getListOfData('Common/ErrorList/' + Error.message + '/' + "optical-order Submit" + '/' + this.CompanyID + '/' + this.docotorid + '/')
        .subscribe(data => {
          debugger;

        });
    }
  }



  OpticalOrderPClose() {
    this.backdrop = 'none';
    this.OpticalOrderpaymentA = 'none';
  }
  OpticalOrderPYes(form: NgForm) {
    try {
      if (this.commonService.data.OPticalDetails.length < 1) {
        Swal.fire({
          type: 'warning',
          title: 'warning',
          text: 'Check The Item Details',
          position: 'top-end',
          showConfirmButton: false,
          timer: 1500,
          customClass: {
            popup: 'alert-warp',
            container: 'alert-container'
          },
        });
        return;
      }
      if (this.commonService.data.OPticalDetails.some(Med => Med.LensName === "")) {
        Swal.fire({
          type: 'warning',
          title: 'warning',
          text: 'Select Your LensName',
          position: 'top-end',
          showConfirmButton: false,
          timer: 1500,
          customClass: {
            popup: 'alert-warp',
            container: 'alert-container'
          },
        });
        return;
      }
      if (this.commonService.data.OPticalDetails.some(Med => Med.Quantity === 0)) {
        Swal.fire({
          type: 'warning',
          title: 'warning',
          text: 'Select Your Quantity',
          position: 'top-end',
          showConfirmButton: false,
          timer: 1500,
          customClass: {
            popup: 'alert-warp',
            container: 'alert-container'
          },
        });
        return;
      }
      debugger;
      if (form.valid) {
        this.isInvalid = false;
        this.commonService.data.OpticalOrder = new OpticalOrder();
        this.commonService.data.OpticalOrder.CmpID = parseInt(localStorage.getItem("CompanyID"));
        this.commonService.data.OpticalOrder.OrderDate = this.M_OrderDate;
        this.commonService.data.OpticalOrder.RefNo = this.M_ReferenceNumber;
        this.commonService.data.OpticalOrder.RefDate = this.M_ReferenceDate;
        this.commonService.data.OpticalOrder.VendorID = this.vendorID;
        this.commonService.data.OpticalOrder.DeliveryName = this.M_DeliveryName;
        this.commonService.data.OpticalOrder.DeliveryAddress1 = this.M_DAddress1;
        this.commonService.data.OpticalOrder.DeliveryAddress2 = this.M_DAddress2;
        this.commonService.data.OpticalOrder.DeliveryAddress3 = this.M_DAddress3;
        this.commonService.data.OpticalOrder.DeliveryLocationID = this.M_Dlocation;
        this.commonService.data.OpticalOrder.DeliveryDate = this.M_DeliveryDate;
        this.commonService.data.OpticalOrder.Deliveryinstructions = this.M_Dinstructions;
        this.commonService.data.OpticalOrder.Validity = this.M_VIDays;
        this.commonService.data.OpticalOrder.TermsAndConditions = this.M_TermsAndConditions;
        this.commonService.data.OpticalOrder.GrossProductValue = this.person.Totalpoamount;
        this.commonService.data.OpticalOrder.TotalProductValue = this.person.Totalamount;
        this.commonService.data.OpticalOrder.TotalDiscountAmount = this.person.Totaldiscountamount;
        this.commonService.data.OpticalOrder.TotalGSTTaxValue = this.person.Totalgstamount
        this.commonService.data.OpticalOrder.CESSAmount = this.person.TotalCESSamount;
        this.commonService.data.OpticalOrder.AddCESSPerAmt = this.person.TotalAdditionalCESSamount;
        this.commonService.data.OpticalOrder.CreatedBy = localStorage.getItem('userroleID');

        //console.log(this.commonService.data);
        this.dataSourceprint.data = this.commonService.data.OPticalDetails;
        this.paymentPrint = this.commonService.data.paymenttran;
        this.commonService.postData('OpticalOrder/InsertOpticalOrder/' + parseInt(localStorage.getItem("CompanyID")) + '/' + this.TranTypeID, this.commonService.data)
          .subscribe(data => {
            debugger;
            if (data.Success == true) {
              this.PAddress = data.PAddress;
              this.Pphone = data.Pphone;
              this.Pweb = data.Pweb;
              this.PCompnayname = data.PCompnayname;
              this.OrderNumber = data.OPticalnum;
              this.PAddress2 = data.PAddress2;
              this.PAddress3 = data.PAddress3;
              this.ReceiptNumber = data.ReceiptNumber;
              this.ReceiptDate = data.ReceiptDate;
              this.GetTotalAmount2 = this.GetTotalAmount1;
              debugger;

              //this.getpayment();   
              //this.dataSource.data = [];
              //this.commonService.data.OPticalDetails = [];
              Swal.fire({
                type: 'success',
                title: 'success',
                text: 'Saved Successfully',
                position: 'top-end',
                showConfirmButton: false,
                timer: 1500,
                customClass: {
                  popup: 'alert-warp',
                  container: 'alert-container'
                },
              });



              this.backdrop = 'block';
              this.Submitprint = 'block';
            }

            else if (data.Message == "Running Number Does'nt Exist") {
              debugger;

              Swal.fire({

                type: 'warning',
                title: 'warning',
                text: 'Number control needs to be created for JOB Order',
                position: 'top-end',
                showConfirmButton: false,
                timer: 1500,
                customClass: {
                  popup: 'alert-warp',
                  container: 'alert-container'
                },
              });

            }

            else if (data.Message == "Receipt Number Does'nt Exist") {
              debugger;

              Swal.fire({
                type: 'warning',
                title: 'warning',
                text: 'Number control needs to be created for Receipt',
                position: 'top-end',
                showConfirmButton: false,
                timer: 1500,
                customClass: {
                  popup: 'alert-warp',
                  container: 'alert-container'
                },
              });

            }

            else if (data.Message == "TransactionTypeid Does'nt Exist") {
              debugger;
              Swal.fire({
                type: 'warning',
                title: 'warning',
                text: 'TransactionID needs to be created for JOB Order',
                position: 'top-end',
                showConfirmButton: false,
                timer: 1500,
                customClass: {
                  popup: 'alert-warp',
                  container: 'alert-container'
                },
              });

            }
            else if (data.Message.includes('Violation of PRIMARY KEY')) {
              Swal.fire({
                position: 'center',
                type: 'warning',
                title: `${(data.Bill)} already exists`,
                showConfirmButton: false,
                timer: 2000
              });
            }
          });
      }
      this.backdrop = 'none';
      this.OpticalOrderpaymentA = 'none';
    }
    catch (Error) {
      alert(Error.message);

      this.commonService.getListOfData('Common/ErrorList/' + Error.message + '/' + "optical-order Submit" + '/' + this.CompanyID + '/' + this.docotorid + '/')
        .subscribe(data => {
          debugger;

        });
    }

  }
  InsertOpticalOrder
  OPticalOrderDetailsPopUp;
  backdrop;
  dataSourceUpdate
  OOID;
  Clicksch() {
    debugger;
    this.commonService.getListOfData('OpticalOrder/OpticalUpdateDetails/' + parseInt(localStorage.getItem("CompanyID")))
      .subscribe(data => {
        debugger;
        this.dataSourceUpdate = data.OpticalDetailsUpdate.OpticalOrderUpdate;
        this.OOID = data.OOID;
        //this.getpayment();
        this.OPticalOrderDetailsPopUp = 'block';
        this.backdrop = 'block';
        //this.displayedColumns = this.displayedColumnscopy;
      });
  }
  OPticalOrderPopUpClose() {
    this.OPticalOrderDetailsPopUp = 'none';
    this.backdrop = 'none';
  }
  M_VStateCountry;
  DStateCountry;
  Totalpaidadv = 0;
  hideTotalpaidadv = false;
  VLocationn;
  Edit(item) {
    //this.DisableBrandSearch = true;
    this.paydel1 = [];
    this.paydel2 = [];
    this.dataSource3.data = [];
    this.commonService.data.paymenttran = [];
    this.M_AdvanceAmount = 0;
    this.OPticalOrderDetailsPopUp = 'none';
    this.backdrop = 'none';
    this.commonService.data.OPticalDetails = [];
    debugger;
    this.commonService.getListOfData('OpticalOrder/OpticalbindingDetails/' + parseInt(localStorage.getItem("CompanyID")) + '/' + item.ID)
      .subscribe(data => {
        debugger;
        this.commonService.data.OPticalDetails = data.OpticalbindingDet;
        this.dataSource.data = this.commonService.data.OPticalDetails;
      });
    this.commonService.getListOfData('OpticalOrder/getpayment/' + item.OrderNumber + '/' + localStorage.getItem("CompanyID")).subscribe(data => {

      if (data.paymentReMode1.length > 0) {
        debugger;
        //this.paymentREPrint = data.paymentReMode1;
        this.Totalpaidadv = data.TOpayMode1;
        this.hideTotalpaidadv = true;
      }

    });
    this.OpticalOrderID = item.ID,
      this.M_OrderNumber = item.OrderNumber,
      this.M_OrderDate = item.OrderDate,
      this.M_DeliveryDate = item.DeliveryDate,
      this.M_ReferenceNumber = item.RefNo,
      this.M_ReferenceDate = item.RefDate,
      this.M_DeliveryName = item.DeliveryName,
      this.M_DAddress1 = item.DeliveryAddress1,
      this.M_DAddress2 = item.DeliveryAddress2,
      this.M_DAddress3 = item.DeliveryAddress3,
      this.M_VIDays = item.Validity,
      this.M_TermsAndConditions = item.TermsAndConditions,
      this.M_VendorName = item.VendorName,
      //this.Vendorsumbit();
      this.M_DCity = item.Dcity,
      this.M_Dlocation = item.DeliveryLocationName,
      this.commonService.getListOfData('OpticalOrder/GetvenderDetails/' + item.VendorID + '/' + parseInt(localStorage.getItem("CompanyID")))
        .subscribe((data: any) => {
          debugger;
          data.VendorDetails.forEach((x: any) => {
            this.M_Address1 = x.Address1;
            this.M_Address2 = x.Address2;
            this.M_Cityy = x.City;
            this.M_location = x.Location;
            this.VLocationn = this.M_Cityy + " " + "/" + " " + this.M_location;
            this.commonService.getListOfData('OpticalOrder/GetlocationDetails/' + this.M_Cityy + '/')
              .subscribe((data: any) => {
                debugger;
                this.State = data.ParentDescriptionstate;
                this.Country = data.ParentDescriptioncountry;
                this.M_VStateCountry = this.State + " " + "/" + " " + this.Country;
              });

            this.M_PhoneNo = x.PhoneNo;
            this.M_GSTNo = x.GSTNo;
            this.M_VID = x.ID;

          });

        });
    this.M_OrderDate = this.date.value;

    this.commonService.getListOfData('OpticalOrder/GetlocationDetails/' + this.M_DCity + '/')
      .subscribe((data: any) => {
        debugger;
        this.M_DState = data.ParentDescriptionstate;
        this.M_DCountry = data.ParentDescriptioncountry;
        this.DStateCountry = this.M_DState + " " + "/" + " " + this.M_DCountry;
      });
    this.commonService.getListOfData('Common/Getlocationvalues/' + this.M_DCity).subscribe(data => {
      debugger;
      this.DLocationname = data;
      if (item.DeliveryLocationName != null) {
        let LocationID = this.DLocationname.find(x => x.Text == item.DeliveryLocationName)
        this.M_Dlocation = LocationID.Value
      }
      else {
        this.M_Dlocation = '';
      }
    });

    this.disableupdate = true;
    this.hiddenUpdate = true;
    this.hiddenSubmit = false;
  }
  Totalsum;
  Print(item) {
    debugger;
    /////////////////print///////////////////////////
    this.M_VName = item.VendorName
    this.M_VPhoneNo = item.PhoneNo
    this.M_VAddress1 = item.Address1
    this.M_VAddress2 = item.Address2
    this.M_VGSTNo = item.GSTNo
    this.M_OrderNumber = item.OrderNumber,
      this.M_OrderDate = item.OrderDate,
      this.M_ReferenceNumber = item.RefNo,
      this.M_ReferenceDate = item.RefDate,
      this.M_DeliveryName = item.DeliveryName,
      this.M_DAddress1 = item.DeliveryAddress1,
      this.M_DAddress2 = item.DeliveryAddress2,
      this.M_DAddress3 = item.DeliveryAddress3,
      this.M_VIDays = item.Validity,
      this.M_TermsAndConditions = item.TermsAndConditions,
      this.commonService.getListOfData('OpticalOrder/OpticalbindingDetails/' + parseInt(localStorage.getItem("CompanyID")) + '/' + item.ID)
        .subscribe(data => {
          debugger;
          this.commonService.data.OPticalDetails = data.OpticalbindingDet;
          this.dataSourceReprint.data = this.commonService.data.OPticalDetails;
          this.Totalsum = data.Totalsum;
          this.M_CompanyName = this.commonService.data.OPticalDetails[0].CompanyName
          this.M_CAddress1 = this.commonService.data.OPticalDetails[0].CAddress1
          this.M_CAddress2 = this.commonService.data.OPticalDetails[0].CAddress2
          this.M_CAddress3 = this.commonService.data.OPticalDetails[0].CAddress3
          this.M_CPhone1 = this.commonService.data.OPticalDetails[0].CPhone1
          this.M_CWebsite = this.commonService.data.OPticalDetails[0].CWebsite

        });

    this.commonService.getListOfData('OpticalOrder/getpayment/' + this.M_OrderNumber + '/' + localStorage.getItem("CompanyID")).subscribe(data => {

      if (data.paymentReMode1.length == 0) {
        this.hiddenpaymentreprint = false
      }
      else { this.hiddenpaymentreprint = true }
      this.backdrop = 'block';
      this.printMinPopup = 'block';
      if (data.paymentReMode1.length > 0) {
        debugger;
        this.paymentREPrint = data.paymentReMode1;
        this.TotalpayMode = data.TOpayMode1;
        this.backdrop = 'block';
        this.modalSuccess = 'block';
      }

    });
  }
  printMin() {
    debugger;
    this.PrintPopUp();
    this.backdrop = 'none';
    this.printMinPopup = 'none';
  }
  printMinclose() {
    debugger;
    this.backdrop = 'none';
    this.printMinPopup = 'none';
    this.OpticalordertranPRint = [];
    this.commonService.data.OPticalDetails = [];
  }

  Update(form: NgForm) {
    try {
      this.disableupdate = false;
      debugger;
      if (form.valid) {
        this.isInvalid = false;
        this.commonService.data.OpticalOrder = new OpticalOrder();
        this.commonService.data.OpticalOrder.CmpID = parseInt(localStorage.getItem("CompanyID"));
        this.commonService.data.OpticalOrder.OrderNumber = this.M_OrderNumber;
        this.commonService.data.OpticalOrder.OrderDate = this.M_OrderDate;
        this.commonService.data.OpticalOrder.RefNo = this.M_ReferenceNumber;
        this.commonService.data.OpticalOrder.RefDate = this.M_ReferenceDate;
        this.commonService.data.OpticalOrder.VendorID = this.vendorID;
        this.commonService.data.OpticalOrder.DeliveryName = this.M_DeliveryName;
        this.commonService.data.OpticalOrder.DeliveryDate = this.M_DeliveryDate;
        this.commonService.data.OpticalOrder.Deliveryinstructions = this.M_Dinstructions;
        this.commonService.data.OpticalOrder.DeliveryAddress1 = this.M_DAddress1;
        this.commonService.data.OpticalOrder.DeliveryAddress2 = this.M_DAddress2;
        this.commonService.data.OpticalOrder.DeliveryAddress3 = this.M_DAddress3;
        this.commonService.data.OpticalOrder.DeliveryLocationID = this.M_Dlocation;
        this.commonService.data.OpticalOrder.Validity = this.M_VIDays;
        this.commonService.data.OpticalOrder.TermsAndConditions = this.M_TermsAndConditions;
        this.commonService.data.OpticalOrder.GrossProductValue = this.person.Totalpoamount;
        this.commonService.data.OpticalOrder.TotalProductValue = this.person.Totalamount;
        this.commonService.data.OpticalOrder.TotalDiscountAmount = this.person.Totaldiscountamount;
        this.commonService.data.OpticalOrder.TotalGSTTaxValue = this.person.Totalgstamount
        this.commonService.data.OpticalOrder.CESSAmount = this.person.TotalCESSamount;
        this.commonService.data.OpticalOrder.AddCESSPerAmt = this.person.TotalAdditionalCESSamount;
        this.commonService.data.OpticalOrder.UpdateBy = localStorage.getItem('userDoctorID');
        this.commonService.data.Companyname = localStorage.getItem("Companyname");
        this.commonService.postData('OpticalOrder/UpdateOpticalOrder/' + parseInt(localStorage.getItem("CompanyID")) + '/' + this.TranTypeID + '/' + this.OpticalOrderID, this.commonService.data)
          .subscribe(data => {
            debugger;
            if (data.Success == true) {
              this.Form.onReset();
              this.dataSource.data = [];
              this.commonService.data.OPticalDetails = [];
              this.hiddenSubmit = true;
              this.hiddenUpdate = false;
              this.M_OrderDate = this.date.value;
              this.M_DeliveryDate = this.date.value;
              Swal.fire({
                type: 'success',
                title: 'success',
                text: 'Updated Successfully',
                position: 'top-end',
                showConfirmButton: false,
                timer: 1500,
                customClass: {
                  popup: 'alert-warp',
                  container: 'alert-container'
                },
              });
              this.router.navigateByUrl('/dash', { skipLocationChange: true }).then(() => {
                localStorage.removeItem("Gettokenvalue");
                localStorage.removeItem("urls");
                this.router.navigate(['Opticalslazy/OpticalOrder']);
              });
            }
            else if (data.Success == false) {
              debugger;
              if (data.Message == "Receipt Number Does'nt Exist") {
                Swal.fire({



                  type: 'warning',
                  title: 'warning',
                  text: 'Number control needs to be created for Receipt',
                  position: 'top-end',
                  showConfirmButton: false,
                  timer: 1500,
                  customClass: {
                    popup: 'alert-warp',
                    container: 'alert-container'
                  },
                });
              }
            }

            else if (data.Success == false) {
              debugger;
              if (data.Message == "TransactionTypeid Does'nt Exist") {
                Swal.fire({

                  type: 'warning',
                  title: 'warning',
                  text: 'TransactionID needs to be created for JOB Order',
                  position: 'top-end',
                  showConfirmButton: false,
                  timer: 1500,
                  customClass: {
                    popup: 'alert-warp',
                    container: 'alert-container'
                  },
                });
              }
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
                  container: 'alert-container'
                },
              });
            }
          });
      }
      //this.displayedColumns = this.displayedColumnscopy1;
    }
    catch (Error) {
      alert(Error.message);

      this.commonService.getListOfData('Common/ErrorList/' + Error.message + '/' + "optical-order Update" + '/' + this.CompanyID + '/' + this.docotorid + '/')
        .subscribe(data => {
          debugger;

        });
    }
  }

  PrintPopUp() {
    debugger;
    let printContents, popupWin;
    printContents = document.getElementById('print').innerHTML;
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
    this.dataSource.data = [];
    this.commonService.data.OPticalDetails = [];
    this.router.navigateByUrl('/dash', { skipLocationChange: true }).then(() => {
      localStorage.removeItem("Gettokenvalue");
      localStorage.removeItem("urls");
      this.router.navigate(['Opticalslazy/OpticalOrder']);
    });
  }

  CancelClk() {
    if (this.M_ReferenceDate != null || this.M_ReferenceNumber != null || this.M_VendorName != null || this.M_DeliveryName != null || this.M_DAddress1 != null ||
      this.M_DAddress2 != null || this.M_DAddress3 != null || this.M_DCity != null || this.M_Dlocation != null || this.M_VIDays != null || this.M_TermsAndConditions != null) {
      this.M_OrderDate = this.date.value;
      this.M_DeliveryDate = this.date.value;
      this.backdrop = 'block';
      this.cancelblock = 'block';
    }
    //this.displayedColumns = this.displayedColumnscopy1;
  }

  cancelClose() {
    this.backdrop = 'none';
    this.cancelblock = 'none';
  }
  CloseNo() {
    this.backdrop = 'none';
    this.cancelblock = 'none';
  }
  CloseYes() {
    this.Form.onReset();
    this.commonService.data.OPticalDetails = [];
    this.commonService.data.paymenttran = [];
    this.dataSource.data = [];
    this.dataSource3.data = [];
    this.disableupdate = false;
    this.hiddenSubmit = true;
    this.hiddenUpdate = false;
    this.M_OrderDate = this.date.value;
    this.M_DeliveryDate = this.date.value;
    this.backdrop = 'none';
    this.cancelblock = 'none';
    this.router.navigateByUrl('/dash', { skipLocationChange: true }).then(() => {
      localStorage.removeItem("Gettokenvalue");
      localStorage.removeItem("urls");
      this.router.navigate(['Opticalslazy/OpticalOrder']);
    });
  }



  FrameModel;
  Index;

  SearchSelected(index) {
    debugger
    this.FrameModel = 'block';
    this.backdrop = 'block';

    this.Index = index;

    this.commonService.getListOfData('Help/CustomerOrder/' + parseInt(localStorage.getItem("CompanyID"))).subscribe(data => {
      debugger
      if (data.OfferDetails.length >= 1) {
        debugger
        this.dataSource1.data = data.OfferDetails;
        this.dataSource1._updateChangeSubscription();
      }
      else {
        Swal.fire({
          type: 'warning',
          title: 'warning',
          text: 'No Data Found',
          position: 'top-end',
          showConfirmButton: false,
          timer: 1500,
          customClass: {
            popup: 'alert-warp',
            container: 'alert-container'
          },
        });
        this.dataSource1.data = [];
        this.dataSource1._updateChangeSubscription();
      }
    });
  }

  FrameModelClose() {
    this.FrameModel = 'none';
    this.backdrop = 'none';
  }

  ////////////////////////////////////////////Adv///////////////////////////////////////////////////////////////
  //displayedColumns3: string[] = ['PaymentMode', 'InstrumentNumber', 'InstrumentDate', 'BankName', 'Branch', 'ExpiryDate', 'Amount', 'Action'];
  //dataSource3 = new MatTableDataSource();


  displayedColumns3: string[] = ['PaymentMode', 'BankName', 'InstrumentNumber', 'InstrumentDate', 'ExpiryDate', 'Branch', 'Amount', 'Action'];
  dataSource3 = new MatTableDataSource();

  date1 = new Date();

  M_AdvanceAmount: number;
  M_Amount;
  M_paymode;
  M_InstrumentDate;
  M_InstrumentNumber;
  M_BankName;
  M_Branch;
  M_ExpiryDate;
  GivenAdvanceTotal;
  RemainingBalance;
  paymentCash: boolean = true;
  paymentChequeDd: boolean = true;
  paymentDebitCredit: boolean = false;


  RestrictNegativeValues1(e): boolean {
    if (!(e.keyCode >= 48 && e.keyCode <= 57 || e.keyCode == 46)) {
      return false;
    }
  }


  hiddenPayment;
  CheckingAdvanceAmount(event) {
    debugger;
    this.GetTotalAmount();
    this.paydel1 = [];
    this.paydel2 = [];
    this.dataSource3.data = [];
    this.commonService.data.paymenttran = [];

    if (this.commonService.data.OPticalDetails.length < 1) {
      event.target.value = 0;
      //this.M_AdvanceAmount = 0;
      Swal.fire({
        type: 'warning',
        title: 'warning',
        text: 'Add the Product in Item list',
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          popup: 'alert-warp',
          container: 'alert-container'
        },
      });
      return
    }



    if (this.M_AdvanceAmount > this.GetTotalAmount1 - this.Totalpaidadv) {
      event.target.value = 0;
      //this.M_AdvanceAmount = 0;
      Swal.fire({
        type: 'warning',
        title: 'warning',
        text: 'Cannot Enter more than Product Value',
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          popup: 'alert-warp',
          container: 'alert-container'
        },
      });
      return
    }

  }


  printclose() {
    this.backdrop = 'none';
    this.Submitprint = 'none';
    this.M_AdvanceAmount = 0;
    this.Form.onReset();
    this.commonService.data.OPticalDetails = [];
    this.commonService.data.paymenttran = [];
    this.dataSource.data = [];
    this.dataSource3.data = [];
  }


  Print1() {
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
    this.Submitprint = 'none';
    this.backdrop = 'none';
    this.M_AdvanceAmount = 0;
    this.Form.onReset();
    this.commonService.data.OPticalDetails = [];
    this.commonService.data.paymenttran = [];
    this.dataSource.data = [];
    this.dataSource3.data = [];
    this.dataSource._updateChangeSubscription();
    this.dataSource3._updateChangeSubscription();
    this.paymentPrint = [];
    this.router.navigateByUrl('/dash', { skipLocationChange: true }).then(() => {
      localStorage.removeItem("Gettokenvalue");
      localStorage.removeItem("urls");
      this.router.navigate(['Opticalslazy/OpticalOrder']);
    });
  }



  paymentREPrint;
  TotalpayMode;
  modalSuccess;
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  accesspopup;

  Getformaccess() {
    debugger;
    var Pathname = "Opticalslazy/OpticalOrder";
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



  //////////////////////////////////////paymentmodemaster/////////////////////////////////
  displayedColumnsinvdep: string[] = ['Action1', 'Description1',];
  dataSourceinvdep = new MatTableDataSource();
  invdepPopUp;
  onPayMode() {
    this.backdrop = 'block';
    this.invdepPopUp = 'block';
  }
  invdepPopUpClose() {
    this.backdrop = 'none';
    this.invdepPopUp = 'none';
  }

  OLMhidden1: boolean = true;
  MasterName = "Payment";
  dataas;
  Help() {
    debugger;
    this.dataSourceinvdep.filter = null;
    this.OLMhidden1 = false;
    this.commonServiceIO.data = new OneLineMaster();
    this.commonServiceIO.data.MastersName = this.MasterName;
    this.commonServiceIO.getListOfData('OneLineMaster/GetDetails/' + this.MasterName).subscribe(data => {
      if (data != null) {
        debugger;
        this.commonServiceIO.data = data;
        this.dataSourceinvdep.data = data.OLMaster;
        this.dataas = this.dataSourceinvdep.data;
      }
      else {
      }
    });
  }
  M_Slitlamp;
  M_Code;
  onSubmitINV() {
    debugger;
    if (this.M_Slitlamp != null) {
      //this.isInvalid = false;
      this.commonServiceIO.data = new OneLineMaster();
      this.commonServiceIO.data.MastersName = this.MasterName;
      this.commonServiceIO.data.onelinemaster.ParentDescription = this.M_Slitlamp;
      //this.commonServiceIO.data.onelinemaster.Amount = this.M_Amount;
      this.commonServiceIO.postData('OneLineMaster/InsertSlamp/' + parseInt(localStorage.getItem("userroleID")), this.commonServiceIO.data)
        .subscribe(data => {
          if (data.Success == true) {
            debugger;
            //this.appComponent.modalCommonReset();
            this.OLMhidden1 = true;
            Swal.fire({
              type: 'success',
              title: 'success',
              text: 'Saved Successfully',
              position: 'top-end',
              showConfirmButton: false,
              timer: 1500,
              customClass: {
                popup: 'alert-warp',
                container: 'alert-container'
              },
            });
            this.M_Slitlamp = null;
            this.M_Amount = null;
          }
          else {
            Swal.fire({
              type: 'warning',
              title: 'warning',
              text: 'Some Data Is Missing',
              position: 'top-end',
              showConfirmButton: false,
              timer: 1500,
              customClass: {
                popup: 'alert-warp',
                container: 'alert-container'
              },
            });
          }
          this.Form.onReset();
        });

    }
    else {
      Swal.fire({
        type: 'warning',
        title: 'warning',
        text: 'Data Is Missing',
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          popup: 'alert-warp',
          container: 'alert-container'
        },
      });
    }
  }
  M_IsActive;

  hiddenUpdate1 = false;
  hiddenSubmit1 = true;
  hiddenDelete1 = false;
  hiddenisActive = false;
  hiddenOLMID: boolean = false;
  hiddenM_OLMID = true;
  UpdateclkINV() {
    debugger;
    if (this.M_Slitlamp != null) {
      this.isInvalid = false;
      this.commonServiceIO.data = new OneLineMaster();
      this.commonServiceIO.data.MastersName = this.MasterName;
      this.commonServiceIO.data.onelinemaster.ParentDescription = this.M_Slitlamp;
      //this.commonServiceIO.data.onelinemaster.Amount = this.M_Amount;
      this.commonServiceIO.data.onelinemaster.IsActive = this.M_IsActive;
      this.commonServiceIO.postData("OneLineMaster/UdateSlamp/" + this.M_OLMID + '/' + parseInt(localStorage.getItem("userroleID")), this.commonServiceIO.data)
        .subscribe(data => {
          if (data.Success == true) {
            debugger;
            //this.appComponent.modalCommonReset();
            this.M_Slitlamp = null;
            this.M_Amount = null;
            this.hiddenUpdate1 = false;
            this.hiddenSubmit1 = true;
            this.hiddenDelete1 = false;
            this.hiddenisActive = false;
            this.OLMhidden1 = true;
            Swal.fire({
              type: 'success',
              title: 'success',
              text: 'Updated Successfully',
              position: 'top-end',
              showConfirmButton: false,
              timer: 1500,
              customClass: {
                popup: 'alert-warp',
                container: 'alert-container'
              },
            });
          }
          else {
            Swal.fire({
              type: 'warning',
              title: 'warning',
              text: 'Some Data Is Missing',
              position: 'top-end',
              showConfirmButton: false,
              timer: 1500,
              customClass: {
                popup: 'alert-warp',
                container: 'alert-container'
              },
            });
          }
        });

    }
    else {
      Swal.fire({
        type: 'warning',
        title: 'warning',
        text: 'Data Is Missing',
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          popup: 'alert-warp',
          container: 'alert-container'
        },
      });
    }
  }
  //Deleteblock;
  DeleteclkINV() {
    this.commonServiceIO.data = new OneLineMaster();
    this.commonServiceIO.data.MastersName = this.MasterName;
    this.commonServiceIO.data.onelinemaster.ParentDescription = this.M_Slitlamp;
    //this.commonServiceIO.data.onelinemaster.Amount = this.M_Amount;

    debugger;
    Swal.fire({
      title: 'Are you sure?',
      text: "Want to delete",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonText: 'Yes',
      cancelButtonColor: '#d33',
      confirmButtonText: 'No'
    }).then((result) => {
      debugger;
      if (result.value) {
        Swal.fire(
          'Cancelled',
        )
      }
      else {
        this.OLMhidden1 = true;
        this.commonServiceIO.postData("OneLineMaster/DeleteSlamp/" + this.M_OLMID, this.commonServiceIO.data).subscribe(result => { })
        Swal.fire(
          'Deleted!',
          this.MasterName + " " + 'has been deleted.',
          'success'
        )
      }
      this.M_Slitlamp = null;
      this.M_Amount = null;
      this.hiddenUpdate1 = false;
      this.hiddenSubmit1 = true;
      this.hiddenDelete1 = false;
      this.hiddenisActive = false;
    })
  }
  M_OLMID;
  selectTypeOLM(item) {
    debugger;
    this.M_OLMID = item.POLMID
    this.M_Slitlamp = item.PDescription
    this.M_Amount = item.PAmount
    this.M_Code = item.PCode
    this.M_IsActive = item.pIsActive.toString();
    this.OLMhidden1 = true;
    this.hiddenUpdate1 = true;
    this.hiddenSubmit1 = false;
    this.hiddenDelete1 = true;
    this.hiddenisActive = true;
  }
  CancelINV() {
    this.OLMhidden1 = true;
    this.M_Slitlamp = null;
    this.M_Amount = null;
    // if (this.M_Slitlamp != null || this.M_Amount != null)
    //{

    //}
    //else {
    Swal.fire(
      'Cancelled',
    )
    //}
  }
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  minToDate = new Date();






  OrderDate() {
    debugger;
    //var od = new Date(this.M_OrderDate);
    //this.minToDate.setDate(od.getDate() + 1);
    this.minToDate = this.M_OrderDate;
    if (this.M_DeliveryDate > this.M_OrderDate) {
      this.M_OrderDate = null;
    }
  }

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
      this.PTotalAmount1()
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
        title: 'warning',
        text: 'Check The Payment Details',
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          popup: 'alert-warp',
          container: 'alert-container'
        },
      });
      return;
    }

    if (paydel.some(x => x.PaymentMode == "Cash")) {
      if (paydel.some(x => x.Amount == null || x.Amount == 0)) {
        Swal.fire({
          type: 'warning',
          title: 'warning',
          text: 'Check The Payment Details',
          position: 'top-end',
          showConfirmButton: false,
          timer: 1500,
          customClass: {
            popup: 'alert-warp',
            container: 'alert-container'
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
        x.BankName == null)) || (this.paydel1.some(Y => Y.Amount == undefined ||
          Y.InstrumentNumber == undefined || Y.Instrumentdate == undefined ||
          Y.BankName == undefined)) || (this.paydel1.some(v => v.Amount == 0 ||
            v.InstrumentNumber == "" || v.BankName == ""))) {
        Swal.fire({
          type: 'warning',
          title: 'warning',
          text: 'Check The Payment Details',
          position: 'top-end',
          showConfirmButton: false,
          timer: 1500,
          customClass: {
            popup: 'alert-warp',
            container: 'alert-container'
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
          title: 'warning',
          text: 'Check The Payment Details',
          position: 'top-end',
          showConfirmButton: false,
          timer: 1500,
          customClass: {
            popup: 'alert-warp',
            container: 'alert-container'
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
        title: 'warning',
        text: 'Cannot Give More than TotalAmount',
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          popup: 'alert-warp',
          container: 'alert-container'
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
    debugger;
    element.Instrumentdate = event.target.value;
  }
  dateexpiry(event, element) {
    debugger;
    element.Expirydate = event.target.value;
  }
  Branch(event, element) {
    element.BankBranch = event.target.value;
  }
  disableRow = true;
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
        title: 'warning',
        text: 'Cannot Give More than TotalAmount',
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          popup: 'alert-warp',
          container: 'alert-container'
        },
      });
      return
    }
  }
  PTotalAmount1() {
    var restotalcost1 = this.commonService.data.paymenttran.map(t => t.Amount).reduce((acc, value) => acc + value, 0);
    restotalcost1 = parseFloat(restotalcost1.toFixed(2));
    this.PTotalAmount = restotalcost1;
    return restotalcost1;
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
        Swal.fire(
          'Deleted!',
        )
      }
    })

  }


  VendorDetailsPopUp;
  dataSourceVendorDetails;
  schVendor() {
    debugger;
    this.commonService.getListOfData('OpticalOrder/GetvenderDetails/' + this.M_VendorName + '/' + parseInt(localStorage.getItem("CompanyID")))
      .subscribe(data => {
        debugger;
        this.dataSourceVendorDetails = data.VendorDetails1;
        this.VendorDetailsPopUp = 'block';
        this.backdrop = 'block';

      });
  }
  vendorID;
  EditVendor(x) {
    this.commonService.getListOfData('OpticalOrder/GetvenderDetails/' + x.ID + '/' + parseInt(localStorage.getItem("CompanyID")))
      .subscribe((data: any) => {
        debugger;

        data.VendorDetails.forEach((x: any) => {
          this.M_VendorName = x.VendorName;
          this.vendorID = x.ID;
          this.M_Address1 = x.Address1;
          this.M_Address2 = x.Address2;
          this.M_Cityy = x.City;
          this.M_DeliveryName = x.CompanyName;
          this.M_DAddress1 = x.CAddress1;
          this.M_DAddress2 = x.CAddress2;
          this.M_DAddress3 = x.CAddress3;
          this.commonService.getListOfData('OpticalOrder/GetlocationDetails/' + this.M_Cityy + '/')
            .subscribe((data: any) => {
              debugger;

              this.State = data.ParentDescriptionstate;
              this.Country = data.ParentDescriptioncountry;
              this.M_VStateCountry = this.State + "/" + this.Country;
            });
          this.commonService.getListOfData('OpticalOrder/GetlocationDetails/' + x.CCity + '/')
            .subscribe((data: any) => {
              debugger;
              this.M_DState = data.ParentDescriptionstate;
              this.M_DCountry = data.ParentDescriptioncountry;
              this.DStateCountry = this.M_DState + "/" + this.M_DCountry;
            });
          this.M_location = x.Location;
          this.M_PhoneNo = x.PhoneNo;
          this.M_GSTNo = x.GSTNo;
          this.M_VID = x.ID;
          this.M_DCity = x.CCity;
          this.M_Dlocation = x.CLocationID;
        });
      });
    this.M_OrderDate = this.date.value;
    this.M_DeliveryDate = this.date.value;
    this.VendorDetailsPopUp = 'none';
    this.backdrop = 'none';
  }
  VendorPopUpClose() {
    this.VendorDetailsPopUp = 'none';
    this.backdrop = 'none';
  }
}
