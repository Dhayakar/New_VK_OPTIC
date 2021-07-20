import { Component, OnInit, ViewChild, ElementRef, Inject, Input, Output, EventEmitter } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material';
import { CommonService } from '../../shared/common.service';
import { AppComponent } from '../../app.component';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import * as _moment from 'moment';
import * as _rollupMoment from 'moment';
import { OpticalBilling } from '../../Models/ViewModels/OpticalBilling.model';
import { FormControl, NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';
import { Payment_Master } from '../../Models/PaymentWebModel ';
import { OpticalInvoiceMaster } from '../../Models/OpticalInvoiceMaster.model';
const moment = _rollupMoment || _moment;
import { Router } from '@angular/router';
declare var $: any;

export const MY_FORMATSS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD-MMM-YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'DD-MM-YYYY',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-optical-billing',
  templateUrl: './optical-billing.component.html',
  styleUrls: ['./optical-billing.component.less'],
  providers: [

    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },

    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATSS },
  ],
})
export class OpticalBillingComponent implements OnInit {
  Getloctime;
  CompanyID;
  docotorid;
  StoreName;
  Paymentsmodes;
  TransactionId;
  searchicon = true;
  searchiconrefresh = true;
  MINExpiryDate;
  tabevent() {

  }



  tabeventPayment() {

  }
  nameField(event) {

  }
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('OpticalBilling') Form: NgForm

  public person =
    {
      Grossproductamount: 0,
      Totaldiscountamount: 0,
      Totalgstamount: 0,
      Totalpoamount: 0,
      Totalamount: 0,
      Totalcessamount: 0,
      TotalAdditionalcessamount: 0,
    };



  isInvalid = false;
  constructor(public commonService: CommonService<OpticalBilling>, public datepipe: DatePipe, public appComponent: AppComponent, private router: Router,) { }


  Country1;
  Country2;
  ngOnInit() {
    debugger;
    this.commonService.data = new OpticalBilling();
    var Pathname = "Opticalslazy/OpticalBilling";
    var Objdata = JSON.parse(localStorage.getItem("AllCollectionData"));
    this.Getloctime = localStorage.getItem('GMTTIME');
    this.docotorid = localStorage.getItem('userroleID');
    this.CompanyID = localStorage.getItem("CompanyID");
    this.commonService.getListOfData('Common/GetstoreDropdownvaluesdesc/' + parseInt(localStorage.getItem("CompanyID")) + '/' + "Stock Department").subscribe(data => { this.StoreName = data; });
    this.commonService.getListOfData('Common/Getpaymentvalues').subscribe(data => { this.Paymentsmodes = data; });
    this.commonService.getListOfData('Common/GetCurrencyvalues/' + localStorage.getItem('CompanyID')).subscribe(data => {
      debugger;
      this.Country1 = data[0].Value;
      this.Country2 = data[0].Text;
    });
    let res = Objdata.find(x => x.Parentmoduledescription == Pathname);
    this.TransactionId = res.TransactionID;

    if (this.TransactionId == null) {
      Swal.fire({
        type: 'warning',
        title: 'warning',
        text: "Number control needs to be created for Optical Billing",
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          popup: 'alert-warp',
          container: 'alert-container',
        },
      });

    }

    var n = Pathname;
    var sstring = n.includes("/");

    if (sstring == false) {

      if (Objdata.find(el => el.Parentmoduledescription === Pathname)) {

        this.commonService.getListOfData('Common/GetAccessdetails/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem("userroleID") + '/' + Pathname).subscribe(data => {
          debugger;
          this.accessdata = data.GetAvccessDetails;
          if (this.accessdata.find(x => x.Add == true)) {
            this.disSubmit = false;
          } else {
            this.disSubmit = true;
          }
        });
      }
      else {
        Swal.fire({
          text: "Un-Authorized Access, Please contact Administrator",
          type: 'warning',
        });
        this.commonService.getListOfData('Common/Getlogdetails/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem("Doctorname") + '/' + Pathname).subscribe(data => {
          this.router.navigate(['dash']);
        });
      }
      $(document).ready(function () {
        $("#myInput").on("keyup", function () {
          var value = $(this).val().toLowerCase();
          $("#myTable tr").filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
          });
        });
      });

    }

    else if (sstring == true) {
      if (Objdata.find(el => el.Parentmoduledescription === Pathname)) {
        this.commonService.getListOfData('Common/GetAccessdetailsstring/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem("userroleID") + '/' + Pathname).subscribe(data => {
          debugger;
          this.accessdata = data.GetAvccessDetails;
          if (this.accessdata.find(x => x.Add == true)) {
            this.disSubmit = false;
          } else {
            this.disSubmit = true;
          }
        });
      }
      else {
        Swal.fire({
          text: "Un-Authorized Access, Please contact Administrator",
          type: 'warning',
        });
        this.commonService.getListOfData('Common/Getlogdetailsstring/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem("Doctorname") + '/' + Pathname).subscribe(data => {
          this.router.navigate(['dash']);
        });
      }
      $(document).ready(function () {
        $("#myInput").on("keyup", function () {
          var value = $(this).val().toLowerCase();
          $("#myTable tr").filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
          });
        });
      });

    }
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
            this.a[n[5][1]]) : '';
        return str;
      } else {
        return '';
      }
    } else {
      return '';
    }
  }


  displayedColumnss: string[] = ['Brand', 'Type', 'LensPower', 'UOM', 'Quantity', 'Rate', 'Value', 'Discount(%)', 'DiscountValue', 'Grossamount', 'CGST', 'CGSTValue', 'SGST','SGSTValue','TotalAmount', 'Delete'];
  dataSources = new MatTableDataSource();


  displayedColumns3: string[] = ['PaymentMode', 'BankName', 'InstrumentNumber', 'InstrumentDate', 'ExpiryDate', 'Branch', 'Amount', 'Action'];
  dataSource3 = new MatTableDataSource();

  displayedColumnssp: string[] = ['Brandp', 'Typep', 'LensPowerp', 'UOMp', 'Quantityp', 'Ratep', 'Valuep', 'Discountp(%)', 'DiscountValuep', 'Grossamountp', 'CGSTp', 'CGSTValuep', 'SGSTp', 'SGSTValuep', 'TotalAmountp'];
  dataSourcesp = new MatTableDataSource();

  modalpreview;
  backdrop
  dataSourcesq;


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

  Getorders() {
    debugger;
    this.commonService.getListOfData('OpticalBilling/Getorders/' + this.CompanyID + '/' + this.Getloctime).subscribe(data => {
      debugger;
      if (data.GetOpticaldetails.length > 0) {
        this.dataSourcesq = data.GetOpticaldetails;
        this.modalpreview = 'block';
        this.backdrop = 'block';
      }
      else {
        Swal.fire({
          type: 'warning',
          title: 'warning',
          text: 'Data not found',
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

  modalSuccesspreview() {
    this.modalpreview = 'none';
    this.backdrop = 'none';

  }

  OrderNumber;
  OrderDate;
  Uin;
  Name;
  Address1;
  Address2;
  Location;
  States;
  PhoneNo;
  storename;
  advamnt;
  M_AdvanceAmount;
  selecttypes(item) {
    debugger;

    this.commonService.getListOfData('OpticalBilling/GetGrntrnsdetails/' + item.RandomUniqueID + '/' + this.storename + '/' + this.CompanyID + '/').subscribe(data => {
      debugger;
      if (data.Success == false && data.Message == "None of the Store") {
        Swal.fire({
          type: 'warning',
          title: 'warning',
          text: 'None of the Store',
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

      else if (data.GetOpticaldetailsfullcheck.length > 0) {
        debugger;
        this.OrderNumber = item.OrderNumber;
        this.OrderDate = item.OrderDate;
        this.Uin = item.UIN;
        this.Name = item.CustomerName + " " + item.CustomermiddleName + " " + item.CustomerlastName;
        this.Address1 = item.Address1;
        this.Address2 = item.Address2;
        this.PhoneNo = item.Mobileno;
        this.Location = item.Location + " " + "/" + " " + item.city == " / " ? " " : item.Location + " " + "/" + " " + item.city;
        this.States = item.State + " " + "/" + " " + item.country == " / " ? " " : item.State + " " + "/" + " " + item.country;
        this.advamnt = data.advance;
        this.commonService.data.GetOpticaldetailsfullcheck = data.GetOpticaldetailsfullcheck;
        this.dataSources.data = this.commonService.data.GetOpticaldetailsfullcheck;
        this.dataSources.sort = this.sort;
        this.M_Amount = this.GetTotalAmount() - this.advamnt;
        this.M_AdvanceAmount = this.GetTotalAmount() - this.advamnt;
        localStorage.setItem('adv', this.advamnt);
        this.advan = localStorage.getItem('adv');
        this.commonService.data.PaymentMaster = new Array<Payment_Master>();
      }
      else {
        Swal.fire({
          type: 'warning',
          title: 'warning',
          text: 'Data not found',
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

    });

    this.modalSuccesspreview();
    localStorage.setItem('LID', item.ID);
    localStorage.setItem('OrderNumber', item.OrderNumber);
    localStorage.setItem('OrderDate', item.OrderDate);
    this.odno = localStorage.getItem('OrderNumber');
    this.oddate = localStorage.getItem('OrderDate');
  }


  GetTotalcost() {
    if (this.commonService.data.GetOpticaldetailsfullcheck != undefined) {
      var restotalcost = this.commonService.data.GetOpticaldetailsfullcheck.map(t => t.Value).reduce((acc, value) => acc + value, 0);
      restotalcost = parseFloat(restotalcost.toFixed(2));
      this.person.Totalamount = restotalcost;
      return restotalcost;
    }

  }

  GetGSTAmount() {

    if (this.commonService.data.GetOpticaldetailsfullcheck != undefined) {
      var restotalcost = this.commonService.data.GetOpticaldetailsfullcheck.map(t => t.GSTTaxValue).reduce((acc, value) => acc + value, 0);
      restotalcost = parseFloat(restotalcost.toFixed(2));
      this.person.Totalgstamount = restotalcost;
      return restotalcost;
    }
  }
  GetGrossAmount() {
    if (this.commonService.data.GetOpticaldetailsfullcheck != undefined) {
      var restotalcost = this.commonService.data.GetOpticaldetailsfullcheck.map(t => t.GrossValue).reduce((acc, value) => acc + value, 0);
      restotalcost = parseFloat(restotalcost.toFixed(2));
      this.person.Grossproductamount = restotalcost;
      return restotalcost;
    }
  }
  GetDiscountAmount() {
    if (this.commonService.data.GetOpticaldetailsfullcheck != undefined) {
      var restotalcost = this.commonService.data.GetOpticaldetailsfullcheck.map(t => t.DiscountAmount).reduce((acc, value) => acc + value, 0);
      restotalcost = parseFloat(restotalcost.toFixed(2));
      this.person.Totaldiscountamount = restotalcost;
      return restotalcost;
    }
  }
  GetTotalAmount() {

    if (this.commonService.data.GetOpticaldetailsfullcheck != undefined) {
      var restotalcost = this.commonService.data.GetOpticaldetailsfullcheck.map(t => t.Totalamount).reduce((acc, value) => acc + value, 0);
      restotalcost = parseFloat(restotalcost.toFixed(2));
      this.person.Totalpoamount = restotalcost;
      return restotalcost;
    }
  }
  GetCGSTAmount() {

    if (this.commonService.data.GetOpticaldetailsfullcheck != undefined) {
      var restotalcost = this.commonService.data.GetOpticaldetailsfullcheck.map(t => t.CGSTTaxValue).reduce((acc, value) => acc + value, 0);
      restotalcost = parseFloat(restotalcost.toFixed(2));
      this.person.Totalpoamount = restotalcost;
      return restotalcost;
    }
  }
  GetSGSTAmount() {

    if (this.commonService.data.GetOpticaldetailsfullcheck != undefined) {
      var restotalcost = this.commonService.data.GetOpticaldetailsfullcheck.map(t => t.SGSTTaxValue).reduce((acc, value) => acc + value, 0);
      restotalcost = parseFloat(restotalcost.toFixed(2));
      this.person.Totalpoamount = restotalcost;
      return restotalcost;
    }
  }
  GetCESSAmount() {
    if (this.commonService.data.GetOpticaldetailsfullcheck != undefined) {
      var restotalcost = this.commonService.data.GetOpticaldetailsfullcheck.map(t => t.CESSAmount).reduce((acc, value) => acc + value, 0);
      restotalcost = parseFloat(restotalcost.toFixed(2));
      this.person.Totalcessamount = restotalcost;
      return restotalcost;
    }

  }
  GetAdditionalCESSAmount() {
    if (this.commonService.data.GetOpticaldetailsfullcheck != undefined) {
      var restotalcost = this.commonService.data.GetOpticaldetailsfullcheck.map(t => t.AddCESSPerAmt).reduce((acc, value) => acc + value, 0);
      restotalcost = parseFloat(restotalcost.toFixed(2));
      this.person.TotalAdditionalcessamount = restotalcost;
      return restotalcost;
    }

  }

  Taxtotalamount() {
    return this.GetGSTAmount() + this.GetCESSAmount() + this.GetAdditionalCESSAmount();
  }

  removeopt(i) {
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
          this.dataSources.data.splice(i, 1);
          this.dataSources._updateChangeSubscription();
          this.M_Amount = this.GetTotalAmount() - this.advamnt;
          this.M_AdvanceAmount = this.GetTotalAmount() - this.advamnt;
          this.commonService.data.PaymentMaster = [];
          this.item = [];
          this.dataSource3.data = [];
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



  myStyles(element) {
    return {
      'border': element.Stockcheck === 'Out of Stock' ? '3px solid red' : ' ',
    };
  }

  modalpreviewstock;
  Closingbalance;
  Storename;
  Type;
  Description;
  Brand;
  uom;
  stockcheck(item) {
    debugger;

    this.commonService.getListOfData('OpticalBilling/stockavailable/' + item.LTID + '/' + this.storename + '/' + this.CompanyID + '/').subscribe(data => {
      debugger;
      if (data.Availablestock.length > 0) {
        debugger;
        data.Availablestock.forEach((z: any) => {
          this.Description = z.Description;
          this.Type = z.Type;
          this.Brand = z.Brand;
          this.Closingbalance = z.Closingbalance;
          this.Storename = z.Storename;
          this.uom = z.uom;
        });
        this.modalpreviewstock = 'block';
        this.backdrop = 'block';
      }
      else {
        Swal.fire({
          type: 'warning',
          title: 'warning',
          text: 'Out of Stock',
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

  modalSuccesspreviewstock() {
    this.modalpreviewstock = 'none';
    this.backdrop = 'none';

  }
  M_Amount;
  pUIN;
  pCustomerName;
  pAddress;
  pMobileno;
  pAddress1;
  pAddress2;
  pLocation;
  pcity;
  pOrderNumber;
  ReceiptNumber;
  pOrderDate;
  ReceiptDate;
  pcompanyAddress;
  pphone;
  pweb;
  pCompnayname;
  pTotalPOValue;
  paymnetbill;
  totalamt;
  advan;
  advanced;
  odno;
  oddate;
  podno;
  poddate;
  pGstNo;
  pGSTIN;


  onSubmit(form: NgForm) {
    debugger;

    if (this.commonService.data.GetOpticaldetailsfullcheck.length < 1) {
      Swal.fire({
        type: 'warning',
        title: 'warning',
        text: 'Check The Item Details',
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

    if (this.commonService.data.GetOpticaldetailsfullcheck.some(Med => Med.Stockcheck == 'Out of Stock')) {
      Swal.fire({
        type: 'warning',
        title: 'warning',
        text: 'Insufficient Stock',
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

    if (this.commonService.data.PaymentMaster.length < 1) {
      Swal.fire({
        type: 'warning',
        title: 'warning',
        text: 'Check The payment Details',
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


    if (this.commonService.data.PaymentMaster.some(Med => Med.PaymentMode == "" || Med.PaymentMode == undefined)) {
      Swal.fire({
        type: 'warning',
        title: 'warning',
        text: 'Check The payment Details',
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

    if (form.valid) {
      this.isInvalid = false;

      this.commonService.postData("OpticalBilling/Beforesubmitcheckstock/" + this.storename + '/' + this.CompanyID, this.commonService.data)
        .subscribe(data => {
          debugger;
          this.dataSources.data = data.GetOpticaldetailsfullbefore;
          this.dataSources.sort = this.sort;
          if (data.GetOpticaldetailsfullbefore.some(Med => Med.Stockcheck == 'Out of Stock')) {
            Swal.fire({
              type: 'warning',
              title: 'warning',
              text: 'Insufficient Stock',
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

          this.commonService.data.OpticalInvoiceMaster = new OpticalInvoiceMaster();

          this.commonService.data.OpticalInvoiceMaster.GrossProductValue = this.person.Grossproductamount;
          this.commonService.data.OpticalInvoiceMaster.TotalDiscountValue = this.person.Totaldiscountamount;
          this.commonService.data.OpticalInvoiceMaster.TotalTaxValue = this.person.Totalgstamount;
          this.commonService.data.OpticalInvoiceMaster.NetAmount = this.person.Totalpoamount;
          this.commonService.data.OpticalInvoiceMaster.CESSAmount = this.person.Totalcessamount;
          this.commonService.data.OpticalInvoiceMaster.AdditionalCESSAmount = this.person.TotalAdditionalcessamount;
          this.commonService.data.OpticalInvoiceMaster.CreatedBy = this.docotorid;

          console.log(this.commonService.data);

          this.commonService.postData('OpticalBilling/InsertOptBilling/' + this.CompanyID + '/' + this.TransactionId + '/' + this.storename + '/', this.commonService.data)
            .subscribe(data => {
              debugger;
              if (data.Success == true) {
                this.commonService.getListOfData('OpticalBilling/Opticalbillingprint/' + data.OpticalID + '/' + this.CompanyID + '/' + this.TransactionId + '/' + this.Getloctime).subscribe((data: any) => {
                  debugger;

                  if (this.advan != "null") {
                    this.advanced = parseInt(this.advan);
                  }
                  else {
                    this.advanced = 0;
                  }

                  this.pUIN = data.pUIN;
                  this.pCustomerName = data.pCustomerName;
                  this.pGSTIN = data.pGSTIN;
                  this.pAddress = data.pAddress;
                  this.pMobileno = data.pMobileno;
                  this.pOrderNumber = data.pOrderNumber;
                  this.pOrderDate = data.pOrderDate;
                  this.pcompanyAddress = data.pcompanyAddress + "" + data.pcompanyAddress1 + "" + data.pcompanyAddress2;
                  this.pphone = data.pphone;
                  this.pweb = data.pweb;
                  this.pGstNo = data.pGstNo;
                  this.pCompnayname = data.pCompnayname;
                  let res = data.optransdetails.map((s) => +s.Totalamount).reduce((sum, c) => sum + c);
                  this.pTotalPOValue = Math.trunc(res);
                  this.totalamt = this.advanced + data.totalamt;
                  this.dataSourcesp.data = data.optransdetails;
                  this.optotal = data.optransdetails;
                  this.paymnetbill = data.paymnetbilling;

                  if (this.advanced != 0) {
                    this.paymnetbill.push({ PaymentMode: 'Advance paid', Amount: this.advanced });
                  }

                  this.ReceiptNumber = data.paymnetbilling[0].Receiptnumber;
                  this.ReceiptDate = data.paymnetbilling[0].Receiptdate;

                  this.podno = this.odno
                  this.poddate = this.oddate
                  this.Form.onReset();
                  this.resetfrom();
                  this.dataSources.data = [];
                  this.commonService.data.GetOpticaldetailsfullcheck = [];
                  this.commonService.data.PaymentMaster = [];
                  this.item = [];
                  this.dataSource3.data = [];
                  this.searchicon = true;
                  this.searchiconrefresh = true;
                  localStorage.removeItem("advamnt");
                  localStorage.removeItem("OrderNumber");
                  localStorage.removeItem("OrderDate");
                });

                this.admissionprint = 'block';
                this.backdrop = 'block';

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


              }
              else if (data.Success == false) {

                if (data.Message == "Running Number Does'nt Exist") {
                  Swal.fire({
                    type: 'warning',
                    title: 'warning',
                    text: 'Number control needs to be created for Optical Billing',
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 1500,
                    customClass: {
                      popup: 'alert-warp',
                      container: 'alert-container',
                    },
                  });
                }

                else if (data.Message == "Financial year doesn't exists") {
                  Swal.fire({
                    type: 'warning',
                    title: 'warning',
                    text: 'Financial year doesnt exists',
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 1500,
                    customClass: {
                      popup: 'alert-warp',
                      container: 'alert-container',
                    },
                  });
                }
                else if (data.Message == "Running Number Does'nt Mapped in Transaction Table") {
                  Swal.fire({
                    type: 'warning',
                    title: 'warning',
                    text: "Running Number Does'nt Mapped in Transaction Table",
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
                    title: 'warning',
                    text: `${(data.Bill)} already exists`,
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

        });
    }
  }

  optotal = [];


  printCGSTAmount() {

    if (this.optotal.length > 0) {
      var restotalcost = this.optotal.map(t => t.CGSTTaxValue).reduce((acc, value) => acc + value, 0);
      restotalcost = parseFloat(restotalcost.toFixed(2));
      return restotalcost;
    }
  }
  printSGSTAmount() {

    if (this.optotal.length > 0) {
      var restotalcost = this.optotal.map(t => t.SGSTTaxValue).reduce((acc, value) => acc + value, 0);
      restotalcost = parseFloat(restotalcost.toFixed(2));
      return restotalcost;
    }
  }



  printTotalAmount() {
    if (this.optotal.length > 0) {
      var restotalcost = this.optotal.map(t => t.Totalamount).reduce((acc, value) => acc + value, 0);
      restotalcost = parseFloat(restotalcost.toFixed(2));
      return restotalcost;
    }
  }



  printAmount() {
    if (this.optotal.length > 0) {
      var restotalcost = this.optotal.map(t => t.Value).reduce((acc, value) => acc + value, 0);
      restotalcost = parseFloat(restotalcost.toFixed(2))
      return restotalcost;
    }
  }

  printDiscountAmount() {
    if (this.optotal.length > 0) {
      var restotalcost = this.optotal.map(t => t.DiscountAmount).reduce((acc, value) => acc + value, 0);
      restotalcost = parseFloat(restotalcost.toFixed(2))
      return restotalcost;
    }
  }

  printGrossAmount() {
    if (this.optotal.length > 0) {
      var restotalcost = this.optotal.map(t => t.GrossValue).reduce((acc, value) => acc + value, 0);
      restotalcost = parseFloat(restotalcost.toFixed(2))
      return restotalcost;
    }
  }

  printGSTAmount() {

    if (this.optotal.length > 0) {
      var restotalcost = this.optotal.map(t => t.GSTTaxValue).reduce((acc, value) => acc + value, 0);
      restotalcost = parseFloat(restotalcost.toFixed(2));
      return restotalcost;
    }
  }

  printCESSAmount() {
    if (this.optotal.length > 0) {
      var restotalcost = this.optotal.map(t => t.CESSAmount).reduce((acc, value) => acc + value, 0);
      restotalcost = parseFloat(restotalcost.toFixed(2));
      return restotalcost;
    }

  }
  printAdditionalCESSAmount() {
    if (this.optotal.length > 0) {
      var restotalcost = this.optotal.map(t => t.AddCESSPerAmt).reduce((acc, value) => acc + value, 0);
      restotalcost = parseFloat(restotalcost.toFixed(2));
      return restotalcost;
    }

  }

  Taxprinttotalamount() {
    return this.printGSTAmount() + this.printCESSAmount() + this.printAdditionalCESSAmount();
  }

  resetfrom() {
    this.OrderNumber = "";
    this.OrderDate = "";
    this.Uin = "";
    this.Name = "";
    this.Address1 = "";
    this.Address2 = "";
    this.Location = "";
    this.States = "";
    this.PhoneNo = "";
    this.storename = "";
    this.advamnt = "";
  }





  cancelblock;
  CancelClk() {
    if (this.storename != null) {
      this.backdrop = 'block';
      this.cancelblock = 'block';
    }
  }

  modalcloseOk() {
    this.backdrop = 'none';
    this.cancelblock = 'none';
  }
  modalSuccessClosessss() {
    debugger;
    this.backdrop = 'none';
    this.cancelblock = 'none';
  }

  modalSuccesssOk() {
    this.Form.onReset();
    this.resetfrom();
    this.dataSources.data = [];
    this.commonService.data.GetOpticaldetailsfullcheck = [];
    this.dataSource3.data = [];
    this.commonService.data.PaymentMaster = [];
    this.item = [];
    this.searchicon = true;
    this.searchiconrefresh = true;
    this.commonService.getListOfData('Common/GetstoreDropdownvaluesdesc/' + parseInt(localStorage.getItem("CompanyID")) + '/' + "Stock Department").subscribe(data => { this.StoreName = data; })
    this.backdrop = 'none';
    this.cancelblock = 'none';
  }



  admissionprint
  printclose(): void {
    this.backdrop = 'none';
    this.admissionprint = 'none';
  }

  printTest() {
    let printContents, popupWin;
    printContents = document.getElementById('Printtt').innerHTML;
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
    this.admissionprint = 'none';
  }


  accessdata;
  disSubmit: boolean = true;
  accesspopup;
  modalcloseAccessOk() {
    this.backdrop = 'none';
    this.accesspopup = 'none';
  }
  Getformaccess() {
    debugger;
    var Pathname = "Opticalslazy/OpticalBilling";
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







  /////////////////////////////////////////payment grid////////////////////////////////////////////////

  paydel1 = [];
  paydel2 = [];
  item = [];
  gridamount;
  AddPaymentDetailsNewgrid() {
    debugger;
    this.paydel1 = [];
    this.paydel2 = [];
    this.commonService.data.PaymentMaster = this.item;
    var paydel = this.commonService.data.PaymentMaster;
    if (this.commonService.data.PaymentMaster.length == 0) {
      var paydetails = new Payment_Master();
      paydetails.PaymentMode = "";
      paydetails.InstrumentNumber = "";
      paydetails.Instrumentdate = null;
      paydetails.BankName = "";
      paydetails.BankBranch = "";
      paydetails.Expirydate = null;
      paydetails.Amount = this.M_Amount;
      this.commonService.data.PaymentMaster.unshift(paydetails);
      this.dataSource3.data = this.commonService.data.PaymentMaster;
      this.PaymentTotalAmount();
      this.M_Amount = this.M_Amount - this.PTotalAmount;
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
    this.M_Amount = this.advamnt + this.PaymentTotalAmount();
    if (this.M_Amount < this.GetTotalAmount()) {
      var paydetails = new Payment_Master();
      paydetails.PaymentMode = "";
      paydetails.InstrumentNumber = "";
      paydetails.Instrumentdate = null;
      paydetails.BankName = "";
      paydetails.BankBranch = "";
      paydetails.Expirydate = null;
      paydetails.Amount = this.GetTotalAmount() - this.M_Amount;
      this.commonService.data.PaymentMaster.unshift(paydetails);
      this.dataSource3.data = this.commonService.data.PaymentMaster;
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
    debugger;
    var arraydata = this.commonService.data.PaymentMaster.filter(t => t.PaymentMode == "Cash").length;
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
      this.item.splice(id, 1);
      this.commonService.data.PaymentMaster.splice(id, 1);
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
  disableRow = true;

  Amount(id, property: string, event: any, data) {
    debugger;

    let result: number = Number(event.target.textContent);
    this.dataSource3.filteredData[id][property] = result;
    this.dataSource3._updateChangeSubscription();
    this.PaymentTotalAmount();
    this.M_Amount = this.advamnt + this.PaymentTotalAmount();
    if (this.M_Amount > this.GetTotalAmount()) {
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

  PTotalAmount;
  PaymentTotalAmount() {
    if (this.commonService.data.PaymentMaster != undefined) {
      var restotalcost = this.commonService.data.PaymentMaster.map(t => t.Amount).reduce((acc, value) => acc + value, 0);
      restotalcost = parseFloat(restotalcost.toFixed(2));
      this.PTotalAmount = restotalcost;
      return restotalcost;
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
      cancelButtonText: 'No',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Yes',
      reverseButtons: true,
    }).then((result) => {
      if (result.value) {
        if (i !== -1) {
          this.dataSource3.data.splice(i, 1);
          this.dataSource3._updateChangeSubscription();
          this.PaymentTotalAmount();
          this.M_Amount = this.M_AdvanceAmount - this.PaymentTotalAmount();
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



  storen() {
    debugger;
    this.commonService.getListOfData('OpticalBilling/GetGrntrnsdetailsstore/' + '/' + this.storename + '/' + this.CompanyID + '/').subscribe(data => {
      debugger;

      if (this.storename != "") {
        if (data.Success == false && data.Message == "None of the Store") {
          Swal.fire({
            type: 'warning',
            title: 'warning',
            text: 'None of the Store',
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
        else if (data.Success == true) {
          this.searchicon = false;
        }
      }


    });

  }

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
}
