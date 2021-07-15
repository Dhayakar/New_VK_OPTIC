import { Component, OnInit, ElementRef, ViewChild, Inject } from '@angular/core';
import { AppComponent } from '../../app.component';
import { DatePipe } from '@angular/common';
import { CommonService } from '../../shared/common.service';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { NgForm, FormGroup, FormBuilder } from '@angular/forms';

import { MatTableDataSource, MatSort, MatPaginator, DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { PurchaseOrder } from 'src/app/Models/PurchaseOrder.model';
import { PurchaseOrderTrans } from '../../Models/PurchaseOrderTrans.model';
import { purchaseorderview } from '../../Models/ViewModels/purchaseorderview.model';
import Swal from 'sweetalert2';
import * as _l from 'lodash';
import { map, startWith } from 'rxjs/operators';
import { Purchaseordercancellation } from '../../Models/ViewModels/Purchaseordercancellation.model';
import { forEach } from '@angular/router/src/utils/collection';
import { Router } from '@angular/router';
import * as _ from 'lodash';


declare var $: any;


export const MY_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD-MMM-YYYY HH:mm',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'DD-MM-YYYY',
    monthYearA11yLabel: 'MMMM YYYY',
  },
}


@Component({
  selector: 'app-pocancellation',
  templateUrl: './pocancellation.component.html',
  styleUrls: ['./pocancellation.component.less'],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class POCANCELLATIONComponent implements OnInit {

  displayedColumns: string[] = ['DrugName', 'PurchaseUOM', 'Quantity', 'UnitPrice', 'Amount', 'Discount', 'DiscountAmount', 'GrossAmount', 'TaxDescription', 'GST', 'GSTValue', 'TotalAmount'];
  dataSource = new MatTableDataSource();

  displayedColumnsprint: string[] = ['DrugNameprint', 'PurchaseUOMprint', 'Quantityprint', 'recdQuantityprint', 'UnitPriceprint', 'Amountprint', 'Discountprint', 'DiscountAmountprint', 'GrossAmountprint', 'TaxDescriptionprint', 'GSTprint', 'GSTValueprint', 'TotalAmountprint'];
  dataSourceprint = new MatTableDataSource();

  PurchaseDate;
  Quotationno;
  Purchaseno;
  Quotationdate;
  Supplier;
  Address1;
  Location;
  PhoneNo;
  GSTNo;
  DeliveryName;
  DAddress1;
  DAddress2;
  DAddress3;
  Locations;
  Instructions;
  Validity;
  Delivery;
  PaymentandTerms;
  State;
  LLLID;
  PGrossss;
  PDiscounttt;
  PTotalaxxx;
  PTotalpooo;
  VVID;
  LLID;
  Statess;
  GetCESSAmountttt;
  GetAdditionalCESSAmountttt;
  Getoveralpoamount;
  Gettotalamount;
  doctorname;
  docotorid;
  Getloctime;
  TransactionId;
  Country1;
  Country2;
  cmpid;
  accessdata;
  disSubmit: boolean = true;
  cancelsubmit: boolean = false;




  constructor(public commonService: CommonService<Purchaseordercancellation>,
    public datepipe: DatePipe, public el: ElementRef,
    public appComponent: AppComponent,
    private formBuilder: FormBuilder, private router: Router,) {
  }

  ngOnInit() {
    this.commonService.data = new Purchaseordercancellation();

    var Pathname = "Inventorylazy/POCANCEllation";
    var Objdata = JSON.parse(localStorage.getItem("AllCollectionData"));

    var n = Pathname;
    var sstring = n.includes("/");
    let res = Objdata.find(x => x.Parentmoduledescription == Pathname);
    this.TransactionId = res.TransactionID;
    this.Getloctime = localStorage.getItem('GMTTIME');
    this.doctorname = localStorage.getItem('Doctorname');
    this.docotorid = localStorage.getItem('userroleID');
    this.cmpid = parseInt(localStorage.getItem("CompanyID"));

    if (this.TransactionId == null) {
      Swal.fire({
        type: 'warning',
        title: 'warning',
        text: "Number control needs to be created for PO Cancellation",
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          popup: 'alert-warp',
          container: 'alert-container',
        },
      });

    }

    if (sstring == false) {
      if (Objdata.find(el => el.Parentmoduledescription === Pathname)) {
        this.commonService.getListOfData('Common/GetAccessdetails/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem("userroleID") + '/' + Pathname).subscribe(data => {

          this.accessdata = data.GetAvccessDetails;
          if (this.accessdata.find(x => x.Add == true)) {
            this.disSubmit = false;
          } else {
            this.disSubmit = true;
          }
        });
        this.commonService.getListOfData('Common/GetCurrencyvalues/' + this.cmpid).subscribe(data => {
          this.Country1 = data[0].Value;
          this.Country2 = data[0].Text;
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
    }

    else if (sstring == true) {
      if (Objdata.find(el => el.Parentmoduledescription === Pathname)) {
        this.commonService.getListOfData('Common/GetAccessdetailsstring/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem("userroleID") + '/' + Pathname).subscribe(data => {
          this.accessdata = data.GetAvccessDetails;
          if (this.accessdata.find(x => x.Add == true)) {
            this.disSubmit = false;
          } else {
            this.disSubmit = true;
          }
        });
        this.commonService.getListOfData('Common/GetCurrencyvalues/' + this.cmpid).subscribe(data => {
          this.Country1 = data[0].Value;
          this.Country2 = data[0].Text;
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



  modalpreview;
  backdrop;
  Item
  Purchaseorderhistory() {
    this.modalpreview = 'block';
    this.backdrop = 'block';

    $(document).ready(function () {
      $("#myInputgrn").on("keyup", function () {
        var value = $(this).val().toLowerCase();
        $("#myTablegrn tr").filter(function () {
          $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
      });
    });

    this.commonService.getListOfData('Purchaseordercancellation/purchaseordercancel/' + this.cmpid + '/' + this.TransactionId + '/' + this.Getloctime).subscribe(data => {
      debugger;
      if (data.Getpurchaseordercan.length > 0 || data.Getpurchaseordercancel.length > 0) {
        debugger;
        data.Getpurchaseordercancel.forEach((z: any) => {
          data.Getpurchaseordercan = data.Getpurchaseordercan.filter(function (item) {
            return item.PONumber !== z.ParentPONumber;
          });
        });

        let arr = data.Getpurchaseordercan;

        if (arr.length > 0) {
          this.Item = _.orderBy(arr, ['PONumber'], ['desc']);
        }
        else {
          this.Item = _.orderBy(arr, ['PONumber'], ['desc']);
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


  modalpreviewcancel;
  Itemcancel;
  Purchaseorderhistorycancellation() {
    this.modalpreviewcancel = 'block';
    this.backdrop = 'block';

    $(document).ready(function () {
      $("#myInputgrncancel").on("keyup", function () {
        var value = $(this).val().toLowerCase();
        $("#myTablegrncancel tr").filter(function () {
          $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
      });
    });

    this.commonService.getListOfData('Purchaseordercancellation/purchaseordercancellation/' + this.cmpid + '/' + this.TransactionId + '/' + this.Getloctime).subscribe(data => {
      debugger;
      if (data.Getpurchaseordercancelled.length > 0) {
        let arr = data.Getpurchaseordercancelled;
        this.Itemcancel = _.orderBy(arr, ['PONumber'], ['desc']);
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
  modalSuccesspreviewcancel() {
    this.modalpreviewcancel = 'none';
    this.backdrop = 'none';

  }



  cancelpurchase(item) {
    debugger;
    if (item.IsCancelled == "Cancelled") {
      this.cancelsubmit = true;
    }

    this.commonService.getListOfData('Purchaseordercancellation/Getpurchasecal/' + item.RandomUniqueID + '/' + this.Getloctime)
      .subscribe((data: any) => {
        debugger;
        this.PurchaseDate = data.PooDatee;
        this.Purchaseno = data.PooNumberr;
        this.Quotationno = data.QoNoo;
        this.Quotationdate = data.QoDatee;
        this.Supplier = data.VNamee;
        this.Address1 = data.VAddresss1 + " " + data.VAddresss2 != " " ? data.VAddresss1 + " " + data.VAddresss2 : " ";
        this.PhoneNo = data.VPhonenoo;
        this.GSTNo = data.VGstnoo;

        if (data.VLocationn != null && data.Vcity != null) {
          this.Location = data.VLocationn + " " + "/" + " " + data.Vcity;
        }
        if (data.VLocationn == null && data.Vcity != null) {
          this.Location = data.Vcity
        }
        if (data.VLocationn == null && data.Vcity == null) {
          this.Location = "";
        }
        if (data.Vstate == null && data.Vcountry == null) {
          this.Statess = "";
        }
        if (data.Vstate != null && data.Vcountry != null) {
          this.Statess = data.Vstate + " " + "/" + " " + data.Vcountry;
        }
        this.DeliveryName = data.PDeliveryy;
        this.DAddress1 = data.PDeliveryaddd1 + " " + data.PDeliveryaddd2 != " " ? data.PDeliveryaddd1 + " " + data.PDeliveryaddd2 : " ";
        this.DAddress3 = data.PDeliveryaddd1;
        this.DAddress2 = data.PDeliveryaddd2;
        if (data.PLocationn != null && data.PLocationncity != null) {
          this.Locations = data.PLocationn + " " + "/" + " " + data.PLocationncity;
        }
        if (data.PLocationn == null && data.PLocationncity != null) {
          this.Locations = data.PLocationncity
        }
        if (data.PLocationn == null && data.PLocationncity == null) {
          this.Locations = "";
        }
        if (data.PLocationnstate == null && data.PLocationncountry == null) {
          this.State = "";
        }
        if (data.PLocationnstate != null && data.PLocationncountry != null) {
          this.State = data.PLocationnstate + " " + "/" + " " + data.PLocationncountry;
        }
        this.Gettotalamount = data.Gettotalamount;
        this.PGrossss = data.PGrosss;
        this.PDiscounttt = data.PDiscountt;
        this.PTotalaxxx = data.PTotalaxx;
        this.GetCESSAmountttt = data.GetCESSAmountt;
        this.GetAdditionalCESSAmountttt = data.GetAdditionalCESSAmountt;
        this.PTotalpooo = data.PTotalpoo;
        this.Getoveralpoamount = data.PTotalaxx + data.GetCESSAmountt + data.GetAdditionalCESSAmountt;
        this.Instructions = data.Termm;
        this.Validity = data.Validd;
        this.Delivery = data.Deliverr;
        this.PaymentandTerms = data.paymentts;
        this.VVID = data.VIDD;
        this.LLID = data.LID;
        this.LLLID = data.LLID;
        this.commonService.data.PurchaseOrderTransdetailscancel = data.Potransdetailss;
        this.dataSource.data = this.commonService.data.PurchaseOrderTransdetailscancel;
        this.dataSource._updateChangeSubscription();
        this.modalSuccesspreview();
        this.modalSuccesspreviewcancel();
      });
  }


  ParentPOnumber;
  ParentPODate;
  Pnumber;
  PDate;
  QNo;
  QDate;
  VNamee;
  VAddresss1;
  DAddresss1;
  VLocationn;
  VStatess;
  VPhonenoo;
  VGstnoo;
  PDeliveryy;
  PDeliveryaddd1;
  PLocationn;
  PState;
  Pamount;
  PGrosss;
  PDiscountt;
  PTotalaxx;
  PTotalpoo;
  Potransdetailss;
  CAddress;
  CPhone;
  CWebb;
  Termc;
  Vaaalid;
  Deeliver;
  Paayment;
  ccompany;


  resetform() {
    this.PurchaseDate = undefined;
    this.Quotationno = undefined;
    this.Purchaseno = undefined;
    this.Quotationdate = undefined;
    this.Supplier = undefined;
    this.Address1 = undefined;
    this.Location = undefined;
    this.PhoneNo = undefined;
    this.GSTNo = undefined;
    this.DeliveryName = undefined;
    this.DAddress1 = undefined;
    this.DAddress2 = undefined;
    this.DAddress3 = undefined;
    this.Locations = undefined;
    this.Instructions = undefined;
    this.Validity = undefined;
    this.Delivery = undefined;
    this.PaymentandTerms = undefined;
    this.State = undefined;
    this.LLLID = undefined;
    this.PGrossss = undefined;
    this.PDiscounttt = undefined;
    this.PTotalaxxx = undefined;
    this.PTotalpooo = undefined;
    this.VVID = undefined;
    this.LLID = undefined;
    this.Statess = undefined;
    this.GetCESSAmountttt = undefined;
    this.GetAdditionalCESSAmountttt = undefined;
    this.Getoveralpoamount = undefined;
    this.Gettotalamount = undefined;
    this.cancelsubmit = false;
  }
  ptotalwords;
  onSubmit() {

    debugger;

    if (this.commonService.data.PurchaseOrderTransdetailscancel == undefined) {

      Swal.fire({
        type: 'warning',
        title: 'warning',
        text: 'Check the item details',
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

    if (this.commonService.data.PurchaseOrderTransdetailscancel.length < 1) {

      Swal.fire({
        type: 'warning',
        title: 'warning',
        text: 'Check the item details',
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

    this.commonService.data.PurchaseOrdercancel = new PurchaseOrder();

    this.commonService.data.PurchaseOrdercancel.QuotationNumber = this.Quotationno;
    this.commonService.data.PurchaseOrdercancel.QuotationDate = this.Quotationdate;
    this.commonService.data.PurchaseOrdercancel.VendorID = this.VVID;
    this.commonService.data.PurchaseOrdercancel.DeliveryName = this.DeliveryName;
    this.commonService.data.PurchaseOrdercancel.DeliveryAddress1 = this.DAddress3;
    this.commonService.data.PurchaseOrdercancel.DeliveryAddress2 = this.DAddress2;

    if (this.LLID != null) {
      if (this.LLID != "") {
        if (this.LLID != undefined) {
          let lc = parseInt(this.LLID);
          this.commonService.data.PurchaseOrdercancel.DeliveryLocationID = lc;
        }
      }
    }
    else {
      if (this.LLLID != null) {
        if (this.LLLID != "") {
          if (this.LLLID != undefined) {
            let l = parseInt(this.LLLID);
            this.commonService.data.PurchaseOrdercancel.DeliveryLocationID = l;
          }
        }
      }
    }

    this.commonService.data.PurchaseOrdercancel.GrossProductValue = this.PGrossss;
    this.commonService.data.PurchaseOrdercancel.TotalDiscountValue = this.PDiscounttt;
    this.commonService.data.PurchaseOrdercancel.TotalTaxValue = this.PTotalaxxx;
    this.commonService.data.PurchaseOrdercancel.TotalPOValue = this.PTotalpooo;
    this.commonService.data.PurchaseOrdercancel.CESSAmount = this.GetCESSAmountttt;
    this.commonService.data.PurchaseOrdercancel.AdditionalCESSAmount = this.GetAdditionalCESSAmountttt;
    this.commonService.data.PurchaseOrdercancel.TermsConditions = this.Instructions;
    this.commonService.data.PurchaseOrdercancel.Validity = this.Validity;
    this.commonService.data.PurchaseOrdercancel.Delivery = this.Delivery;
    this.commonService.data.PurchaseOrdercancel.PaymentandTerms = this.PaymentandTerms;
    this.commonService.data.PurchaseOrdercancel.CMPID = this.cmpid;
    this.commonService.data.PurchaseOrdercancel.CreatedBy = this.docotorid;
    this.commonService.data.PurchaseOrdercancel.TransactionID = this.TransactionId;

    console.log(this.commonService.data)


    this.commonService.postData('Purchaseordercancellation/Insertpurchaseordercancel/' + this.cmpid + '/' + this.TransactionId + '/' + this.Getloctime, this.commonService.data)
      .subscribe(data => {
        debugger;
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

          if (data.Status == 'Cancel') {

            this.Order = false;
            this.Cancel = true;
          }


          this.commonService.getListOfData('Purchaseordercancellation/Getpurchaseprintt/' + data.RandomUniqueID + '/' + this.cmpid + '/' + this.Getloctime).subscribe((data: any) => {
            debugger;
            this.ParentPOnumber = data.ParentPONumber;
            this.ParentPODate = data.ParentPODate;
            this.Pnumber = data.PooNumber;
            this.PDate = data.PooDate;
            this.Pnumber = data.PooNumber;
            this.PDate = data.PooDate;
            this.QNo = data.QoNo;
            this.QDate = data.QoDate;
            this.VNamee = data.VName;
            this.VAddresss1 = data.VAddress1 + " " + data.VAddress2 != " " ? data.VAddress1 + " " + data.VAddress2 : " ";
            this.DAddresss1 = data.PDeliveryadd1 + " " + data.PDeliveryadd2 != " " ? data.PDeliveryadd1 + " " + data.PDeliveryadd2 : " ";
            this.VPhonenoo = data.VPhoneno;
            this.VGstnoo = data.VGstno;

            if (data.VLocation != null && data.Vcity != null) {
              this.VLocationn = data.VLocation + " " + "/" + " " + data.Vcity;
            }
            if (data.VLocation == null && data.Vcity != null) {
              this.VLocationn = data.Vcity
            }
            if (data.VLocation == null && data.Vcity == null) {
              this.VLocationn = "";
            }
            if (data.Vstate == null && data.Vcountry == null) {
              this.VStatess = "";
            }
            if (data.Vstate != null && data.Vcountry != null) {
              this.VStatess = data.Vstate + " " + "/" + " " + data.Vcountry;
            }

            this.PDeliveryy = data.PDelivery;
            this.PDeliveryaddd1 = data.PDeliveryadd1 + " " + data.PDeliveryadd2 != " " ? data.PDeliveryadd1 + " " + data.PDeliveryadd2 : " ";

            if (data.PLocation != null && data.PLocationncity != null) {
              this.PLocationn = data.PLocation + " " + "/" + " " + data.PLocationncity;
            }
            if (data.PLocation == null && data.PLocationncity != null) {
              this.PLocationn = data.PLocationncity
            }
            if (data.PLocation == null && data.PLocationncity == null) {
              this.PLocationn = "";
            }
            if (data.PLocationnstate == null && data.PLocationncountry == null) {
              this.PState = "";
            }
            if (data.PLocationnstate != null && data.PLocationncountry != null) {
              this.PState = data.PLocationnstate + " " + "/" + " " + data.PLocationncountry;
            }
            this.Pamount = data.Gettotalamount;
            this.PGrosss = data.PGross;
            this.PDiscountt = data.PDiscount;
            this.PTotalaxx = data.PTotalax + data.PGetCESSAmountt + data.PGetAdditionalCESSAmountt;
            this.PTotalpoo = data.PTotalpo;

            let ptotalwords = Math.trunc(data.PTotalpo);
            this.ptotalwords = ptotalwords;

            this.CAddress = data.Addresss + " " + data.Addresss1 + " " + data.Addresss2;
            this.CPhone = data.Phonee;
            this.CWebb = data.Webb;
            this.Termc = data.Term;
            this.Vaaalid = data.Vallid;
            this.Deeliver = data.DDevlier;
            this.Paayment = data.PPPayment;
            this.ccompany = data.company;
            this.dataSourceprint.data = data.Potransdetails;
            this.dataSource._updateChangeSubscription();
          });
          this.backdrop = 'block';
          this.purchaseprint = 'block';
          this.dataSource.data = [];
          this.commonService.data.PurchaseOrderTransdetailscancel = [];
          this.resetform();
        }
        else if (data.Success == false) {
          if (data.Message == "Running Number Does'nt Exist") {
            Swal.fire({
              type: 'warning',
              title: 'warning',
              text: 'Number control needs to be created for PO Cancellation',
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

          else if (data.Message.includes('Violation of PRIMARY KEY')) {
            Swal.fire({
              type: 'warning',
              title: 'warning',
              text: `${(data.purchase)} already exists`,
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

          }
        }


      });
  }
  cancelblock;
  CancelClk() {
    debugger;
    if (this.PurchaseDate != null || this.Quotationno != null || this.Quotationdate != null || this.Supplier != null || this.Address1 != null || this.Location != null || this.PhoneNo != null || this.GSTNo != null || this.DeliveryName != null || this.DAddress1 != null || this.DAddress3 != null) {
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
    this.resetform();
    this.commonService.data.PurchaseOrderTransdetailscancel = [];
    this.dataSource.data = [];
    this.backdrop = 'none';
    this.cancelblock = 'none';

  }

  purchaseprint;
  printclose(): void {
    this.backdrop = 'none';
    this.purchaseprint = 'none';

  }
  printsss() {

    let printContents, popupWin;
    printContents = document.getElementById('printss').innerHTML;
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
    this.purchaseprint = 'none';
  }

  Order = false;
  Cancel = false;
  print(item) {

    debugger;

    if (item.IsCancelled == 'Open') {
      this.Order = true;
      this.Cancel = false;
    }
    else if (item.IsCancelled == 'Cancelled') {
      this.Order = false;
      this.Cancel = true;
    }
    else {

    }

    this.commonService.getListOfData('Purchaseordercancellation/Getpurchaseprintt/' + item.RandomUniqueID + '/' + this.cmpid + '/' + this.Getloctime).subscribe((data: any) => {
      debugger;
      this.ParentPOnumber = data.ParentPONumber;
      this.ParentPODate = data.ParentPODate;
      this.Pnumber = data.PooNumber;
      this.PDate = data.PooDate;
      this.QNo = data.QoNo;
      this.QDate = data.QoDate;
      this.VNamee = data.VName;
      this.VAddresss1 = data.VAddress1 + " " + data.VAddress2 != " " ? data.VAddress1 + " " + data.VAddress2 : " ";
      this.DAddresss1 = data.PDeliveryadd1 + " " + data.PDeliveryadd2 != " " ? data.PDeliveryadd1 + " " + data.PDeliveryadd2 : " ";
      this.VPhonenoo = data.VPhoneno;
      this.VGstnoo = data.VGstno;

      if (data.VLocation != null && data.Vcity != null) {
        this.VLocationn = data.VLocation + " " + "/" + " " + data.Vcity;
      }
      if (data.VLocation == null && data.Vcity != null) {
        this.VLocationn = data.Vcity
      }
      if (data.VLocation == null && data.Vcity == null) {
        this.VLocationn = "";
      }
      if (data.Vstate == null && data.Vcountry == null) {
        this.VStatess = "";
      }
      if (data.Vstate != null && data.Vcountry != null) {
        this.VStatess = data.Vstate + " " + "/" + " " + data.Vcountry;
      }

      this.PDeliveryy = data.PDelivery;
      this.PDeliveryaddd1 = data.PDeliveryadd1 + " " + data.PDeliveryadd2 != " " ? data.PDeliveryadd1 + " " + data.PDeliveryadd2 : " ";

      if (data.PLocation != null && data.PLocationncity != null) {
        this.PLocationn = data.PLocation + " " + "/" + " " + data.PLocationncity;
      }
      if (data.PLocation == null && data.PLocationncity != null) {
        this.PLocationn = data.PLocationncity
      }
      if (data.PLocation == null && data.PLocationncity == null) {
        this.PLocationn = "";
      }
      if (data.PLocationnstate == null && data.PLocationncountry == null) {
        this.PState = "";
      }
      if (data.PLocationnstate != null && data.PLocationncountry != null) {
        this.PState = data.PLocationnstate + " " + "/" + " " + data.PLocationncountry;
      }
      this.Pamount = data.Gettotalamount;
      this.PGrosss = data.PGross;
      this.PDiscountt = data.PDiscount;
      this.PTotalaxx = data.PTotalax + data.PGetCESSAmountt + data.PGetAdditionalCESSAmountt;
      this.PTotalpoo = data.PTotalpo;

      let ptotalwords = Math.trunc(data.PTotalpo);
      this.ptotalwords = ptotalwords;
      this.CAddress = data.Addresss + " " + data.Addresss1 + " " + data.Addresss2;
      this.CPhone = data.Phonee;
      this.CWebb = data.Webb;
      this.Termc = data.Term;
      this.Vaaalid = data.Vallid;
      this.Deeliver = data.DDevlier;
      this.Paayment = data.PPPayment;
      this.ccompany = data.company;
      this.dataSourceprint.data = data.Potransdetails;
      this.dataSource._updateChangeSubscription();
      this.modalSuccesspreview();
      this.modalSuccesspreviewcancel();
    });
    this.backdrop = 'block';
    this.purchaseprint = 'block';

  }



  accesspopup;
  modalcloseAccessOk() {
    this.backdrop = 'none';
    this.accesspopup = 'none';
  }
  Getformaccess() {
    debugger;
    var Pathname = "Inventorylazy/POCANCEllation";
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




  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}

