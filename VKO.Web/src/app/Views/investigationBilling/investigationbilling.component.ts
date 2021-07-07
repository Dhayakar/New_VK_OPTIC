import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { CommonService } from '../../shared/common.service';
import { AppComponent } from '../../app.component';
import { RegistrationMaster } from '../../Models/ViewModels/RegistrationMasterWebViewModel ';
import { SurgeryMaster } from '../../Models/ViewModels/surgeryMasterWebViewModel';
import { surgeryadddetails } from 'src/app/Models/surgeryadddetails';
import { InvestigationImage, InvDet } from '../../Models/ViewModels/Investigationimage.model';
import { NgForm, FormGroup, Validators } from '@angular/forms';
import { InvestigationImages } from '../../Models/Investigationimage.model';
import Swal from 'sweetalert2';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

import { Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { InvestigationBilling } from '../../Models/ViewModels/Investigationbilling.model';
import { Payment_Master } from '../../Models/PaymentWebModel ';
import { Router } from '@angular/router';

declare var $: any;


@Component({
  selector: 'app-investigationbilling',
  templateUrl: './investigationbilling.component.html',
  styleUrls: ['./investigationbilling.component.less'],
  encapsulation: ViewEncapsulation.None,
})
export class InvestigationBillingComponent implements OnInit {

  //public person = {
  //  Grossproductamount: 0,
  //  Totaldiscountamount: 0,
  //  Totalgstamount: 0,
  //  Totalpoamount: 0,
  //  Totalamount: 0
  //};
  disSubmit: boolean = false;
  displayedColumns1: string[] = ['SerialNo', 'Investigation', 'Amount', 'Discount', 'DiscountAmount', 'GrossAmount', 'TaxDescription', 'GST', 'GSTValue1', 'TotalCost', 'Delete'];
  dataSource1 = new MatTableDataSource();

  displayedColumnsin = ['Investigation', 'Amount', 'Tax(%)', 'TaxValue', 'Disc(%)', 'DiscValue', 'TotalAmount', 'Delete'];
  dataSourcein = new MatTableDataSource();

  displayedColumnspay: string[] = ['PaymentMode', 'InstrumentNumber', 'InstrumentDate', 'BankName', 'Branch', 'ExpiryDate', 'Amount', 'Action'];
  dataSourcepay = new MatTableDataSource();

  displayedColumns = ['RPrint', 'UIN', 'Name', 'BillNo', 'BillDate'];
  dataSource = new MatTableDataSource();

  displayedColumnssp: string[] = ['Investigation', 'InvestigationCharges', 'Discount(%)', 'DiscountValue', 'TaxDescription', 'GST', 'GSTValue', 'TotalAmount'];
  dataSourcesp = new MatTableDataSource();

  displayedColumnsspp: string[] = ['Investigation', 'InvestigationCharges', 'Discount(%)', 'DiscountValue', 'TaxDescription', 'GST', 'GSTValue', 'TotalAmount'];
  dataSourcespp = new MatTableDataSource();

  displayedColumns3: string[] = ['PaymentMode', 'BankName', 'InstrumentNumber', 'InstrumentDate', 'ExpiryDate', 'Branch', 'Amount', 'Action'];
  dataSource3 = new MatTableDataSource();
  DisableOnSubmit = true;

  @ViewChild(MatSort) sort: MatSort;

  public paymentDetails = {
    totalCost: 0,
    ItemProductValue: 0,
    TotalDiscountValue: 0,
    TotalGSTTaxValue: 0,
    cessamount: 0,
    addcessamount: 0,
    TotalTaxAmount: 0,
  }


  constructor(public commonService: CommonService<InvestigationBilling>, public appComponent: AppComponent, private _sanitizer: DomSanitizer, private router: Router, ) { }

  userid;
  Getuin;
  Getname;
  Getgender;

  Getage;
  SubmitButton: boolean = false;
  docotorid;

  G_Transactiontypeid;
  Country1;
  Country2;
  Country3;
  gstt;
  cesss;
  adcesss;
  accessdata;
  ngOnInit() {
    debugger;
    var Pathname = "ClinicalProcedureslazy/InvestigationBilling";
    var Objdata = JSON.parse(localStorage.getItem("AllCollectionData"));
    if (Objdata.find(el => el.Parentmoduledescription === Pathname)) {
      this.commonService.data = new InvestigationBilling();
      //this.gstt = 0;
      //this.cesss = 0;
      //this.adcesss = 0;
      localStorage.getItem("CompanyID");
      this.userid = localStorage.getItem('userroleID');
      this.Getuin = localStorage.getItem('UIN');
      this.Getname = localStorage.getItem('Name');
      this.Getgender = localStorage.getItem('Gender');
      this.Getage = localStorage.getItem('Age');
      this.docotorid = localStorage.getItem('userDoctorID');

      $(document).ready(function () {
        $("#myInputr").on("keyup", function () {
          var value = $(this).val().toLowerCase();
          $("#myTabler tr").filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
          });
        });
      });

      this.commonService.getListOfData('Common/GetAccessdetailsstring/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem("userroleID") + '/' + 'ClinicalProcedureslazy/InvestigationBilling').subscribe(data => {
        //this.commonService.data = data;
        debugger;
        this.accessdata = data.GetAvccessDetails;
        if (this.accessdata.find(x => x.Add == true)) {
          //this.disSubmit = false;
          //this.disTemp = false;
          //this.disSerdrg = false;
        } else {
          //this.disSubmit = true;
          //this.disTemp = true;
          //this.disSerdrg = true;
        }
        if (this.accessdata.find(x => x.Print == true)) {
          //this.disprint = false;
        } else {
          //this.disprint = true;
        }

      });


      this.commonService.getListOfData('User/GetModuletransactiondetailsstring/' + 'ClinicalProcedureslazy/InvestigationBilling' + '/' + localStorage.getItem('CompanyID'))
        .subscribe(data => {
          this.G_Transactiontypeid = data.transactionid;
          localStorage.setItem("TransactionTypeid", this.G_Transactiontypeid)
        });
      this.tranid = localStorage.getItem('TransactionTypeid');
      //this.getpatientdetails();
      this.getAllDropdowns();
      this.commonService.getListOfData('Common/GetCurrencyvalues/' + localStorage.getItem('CompanyID')).subscribe(data => {
        debugger;
        this.Country1 = data;
        this.Country2 = this.Country1[0].Text;
        this.Country3 = this.Country1[0].Value;
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
  Paymentsmodes = [];
  getAllDropdowns() {
    debugger;

    this.commonService.getListOfData('Common/Getpaymentvalues').subscribe(data => { this.Paymentsmodes = data; });



  }
  accesspopup;
  backdrop;

  Getformaccess() {
    debugger;
    var Pathname = "ClinicalProcedureslazy/InvestigationBilling";
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
  reprint = [];




  bills = [];
  GetRegDetails = [];
  InvIPBillPopUp;
  Clickschinv() {
    debugger;
    this.InvIPBillPopUp = 'block';
    this.backdrop = 'block';
    this.commonService.getListOfData('InvestigationIPBilling/GetRegINVBILLDetails/' + parseInt(localStorage.getItem("CompanyID"))).subscribe(data => {
      debugger;
      if (data.GetRegDetailsop != null) {

        this.GetRegDetails = data.GetRegDetailsop;
        this.InvIPBillPopUp = 'block';
        this.backdrop = 'block';

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
            container: 'alert-container',
          },
        });

      }

    });

  }
  M_UIN;
  M_Name;
  M_MiddleName;
  M_LastName;
  M_Age;
  M_Gender;
  selecttype(item) {
    this.InvIPBillPopUp = 'none';
    this.backdrop = 'none';
    this.M_UIN = item.UIN;
    this.M_Name = item.Name;
    this.M_MiddleName = item.MiddleName;
    this.M_LastName = item.LastName;
    this.M_Age = item.Age;
    this.M_Gender = item.Gender;
    this.getPrescdetails();

  }

  InvIPBillPopUpClose() {

    this.InvIPBillPopUp = 'none';
    this.backdrop = 'none';
  }

  modalop;
  modalSuccessop() {

    this.modalop = 'none';
    this.backdrop = 'none';
  }

  ClickIm() {

    this.commonService.getListOfData('InvestigationBilling/GetReBillingDetails/' + parseInt(localStorage.getItem("CompanyID"))).subscribe(data => {
      debugger;
      if (data.ReBillingDetails != null) {
        this.reprint = data.ReBillingDetails;
        this.modalop = 'block';
        this.backdrop = 'block';
      }

    });

  }

  modalsfi;


  getPrescdetails() {



    this.commonService.getListOfData('InvestigationBilling/GetPatDetails/' + this.M_UIN).subscribe(data => {
      debugger;

      this.bills = data.PatientBillDetails;
      if (this.bills.length != 0) {
        this.modalsfi = 'block';
        this.backdrop = 'block';

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
            container: 'alert-container',
          },
        });

      }
    });

  }

  modalSuccessfi() {

    this.modalsfi = 'none';
    this.backdrop = 'none';

  }

  Prescribedname;
  Prescribeddt;
  isHiddenpb: Boolean = false;
  isHiddenin: Boolean = false;
  isHiddenpay: Boolean = false;
  hiddenPayment: boolean = false;

  M_Amount;


  paymentCash: boolean = true;
  paymentChequeDd: boolean = true;
  paymentDebitCredit: boolean = false;

  M_paymode;
  M_InstrumentNumber;
  M_InstrumentDate;
  M_BankName;
  M_Branch;
  M_ExpiryDate;
  PTotalAmount = 0;
  BalanceTotal;


  Paymentsmode;


  removeDrug(i) {
    Swal.fire({
      title: 'Are you sure?',
      text: "Want to Drop This Investigation!",
      type: 'warning',
      showCancelButton: true,
      cancelButtonColor: '#d33',
      cancelButtonText: 'No',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Yes',
      reverseButtons: true,
      focusCancel: true,
    }).then((result) => {
      if (result.value) {
        if (i !== -1) {
          this.dataSource1.data.splice(i, 1);
          this.dataSource1._updateChangeSubscription();

          this.commonService.data.PaymentMaster = [];
          this.dataSource3.data = this.commonService.data.PaymentMaster;
          this.dataSource3._updateChangeSubscription();
        }
        Swal.fire(
          'Deleted!',
        )
      }
    })
  }




  PaymentTotalAmount() {

    debugger
    var restotalcost = this.commonService.data.PaymentMaster.map(t => t.Amount).reduce((acc, value) => acc + value, 0);
    restotalcost = parseFloat(restotalcost.toFixed(2));
    this.PTotalAmount = restotalcost
  }
  regid;
  IPID;
  selecttyp(item) {
    debugger;
    this.isHiddenpb = true;
    this.DisableOnSubmit = false;
    this.Prescribedname = item.PrescribedBy;
    this.Prescribeddt = item.PrescribedDate;
    this.regid = item.rid;
    this.IPID = item.ipid;
    this.commonService.getListOfData('InvestigationBilling/GetBillingDetails/' + this.IPID + '/' + this.TaxID).subscribe(data => {
      debugger;
      if (data.BillDetails.length != 0) {

        this.getgst();
        this.isHiddenin = true;
        this.commonService.data.BillDetails = data.BillDetails;
        this.dataSource1.data = this.commonService.data.BillDetails;



      }

    });

    this.modalsfi = 'none';
    this.backdrop = 'none';

  }


  getTotalAmount() {
    var restotalcost = this.commonService.data.BillDetails.map(t => t.Amount).reduce((acc, value) => acc + value, 0);
    restotalcost = parseFloat(restotalcost.toFixed(2));
    this.paymentDetails.ItemProductValue = restotalcost;
    return restotalcost;
  }

  getTotalDiscountAmount() {
    var restotalcost = this.commonService.data.BillDetails.map(t => t.DiscountAmount).reduce((acc, value) => acc + value, 0);
    restotalcost = parseFloat(restotalcost.toFixed(2));
    this.paymentDetails.TotalDiscountValue = restotalcost;
    return restotalcost;
  }

  getTotalGrossAmount() {
    var restotalcost = this.commonService.data.BillDetails.map(t => t.GrossAmount).reduce((acc, value) => acc + value, 0);
    restotalcost = parseFloat(restotalcost.toFixed(2));
    return restotalcost;
  }

  getTotalCost() {
    var restotalcost = this.commonService.data.BillDetails.map(t => t.TotalCost).reduce((acc, value) => acc + value, 0);
    restotalcost = parseFloat(restotalcost.toFixed(2));
    this.paymentDetails.totalCost = restotalcost;
    return restotalcost;
  }

  GetGSTAmount() {
    var restotalcost = this.commonService.data.BillDetails.map(t => t.GSTAmount).reduce((acc, value) => acc + value, 0);
    restotalcost = parseFloat(restotalcost.toFixed(2));
    this.paymentDetails.TotalGSTTaxValue = restotalcost;
    return restotalcost;
  }
  GetCESSAmount() {
    var restotalcost = this.commonService.data.BillDetails.map(t => t.CESSAmount).reduce((acc, value) => acc + value, 0);
    restotalcost = parseFloat(restotalcost.toFixed(2));
    this.paymentDetails.cessamount = restotalcost;
    return restotalcost;
  }
  GetAdditionalCESSAmount() {
    var restotalcost = this.commonService.data.BillDetails.map(t => t.AdditionalCESSAmount).reduce((acc, value) => acc + value, 0);
    restotalcost = parseFloat(restotalcost.toFixed(2));
    this.paymentDetails.addcessamount = restotalcost;
    return restotalcost;
  }
  GetTaxAmount() {

    var restotalcost = this.GetGSTAmount() + this.GetCESSAmount() + this.GetAdditionalCESSAmount();
    restotalcost = parseFloat(restotalcost.toFixed(2));
    this.paymentDetails.TotalTaxAmount = restotalcost;
    return restotalcost;
  }









  changeValueDiscountAmount(id, element, property: string) {
    debugger;
    var resDisAmount = (element.Amount) * element.Discount / 100;
    resDisAmount = parseFloat(resDisAmount.toFixed(2));
    element.DiscountAmount = resDisAmount;
  }

  changeValueGrossAmount(id, element, property: string) {
    debugger;
    var num = (element.Amount) - (element.Amount) * element.Discount / 100;
    num = parseFloat(num.toFixed(2));
    element.GrossAmount = num;
  }
  changeGStAmount(id, element, property: string) {
    var resTotal = element.GrossAmount * (element.GST / 100);
    resTotal = parseFloat(resTotal.toFixed(2));
    element.GSTAmount = resTotal;
  }
  changeCESSAmount(id, element, property: string) {
    var resTotal = element.GrossAmount * (element.CESS / 100);
    resTotal = parseFloat(resTotal.toFixed(2));
    element.CESSAmount = resTotal;
  }
  changeAdditionalCESSAmount(id, element, property: string) {
    var resTotal = element.GrossAmount * (element.AdditionalCESS / 100);
    resTotal = parseFloat(resTotal.toFixed(2));
    element.AdditionalCESSAmount = resTotal;
  }






  TaxName;
  getgst() {
    debugger;
    this.commonService.getListOfData('Common/Gettaxvalues').subscribe(data => { this.TaxName = data; });

  }

  RestrictNegativeValues1(e): boolean {

    if (!(e.keyCode >= 48 && e.keyCode <= 57 || e.keyCode == 46)) {
      return false;
    }
  }

  Restrict(event) {
    if (event.target.textContent > 100) {
      Swal.fire({
        type: 'warning',
        title: 'Invalid Discount',
      })
      event.target.textContent = 0;
    }
  }


  changeValue(id, property: string, event: any) {
    debugger;
    let result: number = Number(event.target.textContent);
    this.dataSource1.filteredData[id][property] = result;
    this.dataSource1._updateChangeSubscription();
  }

  changeValues(id, property: string, event: any) {
    debugger;
    let result: number = Number(event.target.textContent);
    this.dataSource1.filteredData[id][property] = result;
    this.dataSource1._updateChangeSubscription();
  }


  isInvalid = false;
  tranid;
  cmpPid;
  bilno;
  optical;
  payment;
  billno;
  billdt;
  provalue;
  disvalue;
  taxvalue;
  totamt;
  payamt;
  uinn;
  name;
  age;
  gender;
  phone;
  invest = [];
  modalpurchase;

  purchaseprint;
  modalSuccessssspurchaseOk() {
    debugger;
    this.backdrop = 'none';
    this.modalpurchase = 'none';
    this.purchaseprint = 'block';

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

  printclose(): void {

    this.backdrop = 'none';
    this.purchaseprint = 'none';

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
    'Fixty',
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
            this.a[n[5][1]]) + 'rupee' : '';
        return str;
      } else {
        return '';
      }
    } else {
      return '';
    }
  }





  cname;
  caddres;
  cph;
  cwe;
  csvvalue;
  acsvvalue;
  //investp
  printTotalAmount() {

    if (this.invest.length > 0) {
      var restotalcost = this.totamt;
      restotalcost = parseFloat(restotalcost.toFixed(2))
      return restotalcost;
    }

  }

  printTotalAmountp() {

    if (this.investp.length > 0) {
      var restotalcost = this.totamtp;
      restotalcost = parseFloat(restotalcost.toFixed(2))
      return restotalcost;
    }

  }

  onSubmit(form: NgForm) {
    debugger;
    if (this.commonService.data.BillDetails.length > 0) {
      if (this.paymentDetails.totalCost == this.PTotalAmount) {
        if (form.valid) {
          this.isInvalid = false;

          this.tranid = localStorage.getItem('TransactionTypeid');
          this.commonService.data.InvestigationBillMaster.UIN = this.M_UIN;
          this.commonService.data.InvestigationBillMaster.CMPID = parseInt(localStorage.getItem("CompanyID"));
          this.commonService.data.InvestigationBillMaster.RegistrationTranID = this.regid;
          this.commonService.data.InvestigationBillMaster.GrossProductValue = this.paymentDetails.ItemProductValue;
          this.commonService.data.InvestigationBillMaster.TotalDiscountValue = this.paymentDetails.TotalDiscountValue;
          this.commonService.data.InvestigationBillMaster.TotalTaxValue = this.paymentDetails.TotalGSTTaxValue;
          this.commonService.data.InvestigationBillMaster.TotalBillValue = this.paymentDetails.totalCost;
          this.commonService.data.InvestigationBillMaster.CESSAmount = this.paymentDetails.cessamount;
          this.commonService.data.InvestigationBillMaster.AdditionalCESSAmount = this.paymentDetails.addcessamount;
          this.commonService.data.InvestigationBillMaster.CreatedBy = this.userid;

          console.log(this.commonService.data);
          this.cmpPid = parseInt(localStorage.getItem("CompanyID"));

          this.commonService.postData('InvestigationBilling/UpdateInvBilling/' + this.cmpPid + '/' + this.tranid + '/', this.commonService.data)
            .subscribe(data => {
              debugger;
              if (data.Success == true) {
                debugger;
                this.bilno = data.bill;

                this.commonService.getListOfData('InvestigationBilling/GetInvesprint/' + data.ibid + ' /' + data.rid + ' /' + parseInt(localStorage.getItem("CompanyID")) + ' /' + this.tranid).subscribe((data: any) => {
                  debugger;
                  this.dataSourcesp.data = data.InvestDetails;
                  this.invest = data.InvestDetails;
                  this.payment = data.PayDetailss;
                  this.billno = data.InvestigationBillMaster.BillNo;
                  this.billdt = data.InvestigationBillMaster.CreatedUTC;
                  this.provalue = data.InvestigationBillMaster.GrossProductValue;
                  this.disvalue = data.InvestigationBillMaster.TotalDiscountValue;
                  this.taxvalue = data.InvestigationBillMaster.TotalTaxValue;
                  this.csvvalue = data.InvestigationBillMaster.CESSAmount;
                  this.acsvvalue = data.InvestigationBillMaster.AdditionalCESSAmount;

                  this.totamt = data.InvestigationBillMaster.TotalBillValue;
                  this.payamt = data.InvestigationBillMaster.TotalBillValue;
                  this.uinn = data.Registration.UIN;
                  this.name = data.Registration.Name + "" + data.Registration.LastName;
                  this.age = data.page;
                  this.gender = data.Registration.Gender;
                  this.phone = data.Registration.Phone;
                  this.cname = data.Cname;
                  this.caddres = data.CAddress;
                  this.cph = data.Cphone;
                  this.cwe = data.Cweb;
                });


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
                this.backdrop = 'block';
                this.modalpurchase = 'block';
                this.reset();
                //this.ngOnInit();

              }
              else if (data.Success == false) {

                if (data.Message == "Running Number Does'nt Exist") {
                  Swal.fire({
                    type: 'warning',
                    title: 'warning',
                    text: 'Number control needs to be created for Investigation Billing',
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 1500,
                    customClass: {
                      popup: 'alert-warp',
                      container: 'alert-container',
                    },
                  });


                }

                else
                  Swal.fire({

                    type: 'warning',
                    title: 'warning',
                    text: 'Some data Missing',
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

      }
      else {
        Swal.fire({

          type: 'warning',
          title: 'warning',
          text: 'Mismatch btn Billing and payment Amount',
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
        text: 'Enter Billing details',
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


  cancelblock;
  modalcloseOk() {

    this.backdrop = 'none';
    this.cancelblock = 'none';

  }

  modalSuccessClosessss() {

    this.backdrop = 'none';
    this.cancelblock = 'none';
  }

  onCancel() {

    //this.ngOnInit();
    this.reset();

    this.backdrop = 'block';
    this.cancelblock = 'block';

  }

  modalSuccesssOk() {

    this.ngOnInit();
    this.reset();

    this.backdrop = 'none';
    this.cancelblock = 'none';

  }

  reset() {

    this.commonService.data.BillDetails = [];
    this.isHiddenin = false;
    this.M_paymode = '';
    this.M_InstrumentNumber = '';
    this.M_InstrumentDate = '';
    this.M_BankName = '';
    this.M_ExpiryDate = '';
    this.M_Branch = '';
    this.M_Amount = '';
    this.commonService.data.PaymentMaster = [];
    this.hiddenPayment = false;
    this.Prescribedname = '';
    this.Prescribeddt = '';
    this.isHiddenpb = false;
    this.DisableOnSubmit = true;
    this.dataSourcepay.data = null;
    this.commonService.data.PaymentMaster = [];
    this.dataSource3.data = this.commonService.data.PaymentMaster;
    this.dataSource3._updateChangeSubscription();

  }
  paymentp;
  billnop;
  billdtp;
  provaluep;
  disvaluep;
  taxvaluep;
  totamtp;
  payamtp;
  uinnp;
  namep;
  agep;
  genderp;
  phonep;
  investp = [];
  cessp;
  acessp;
  cnamep;
  caddresp;
  cphp;
  cwep;

  selecttypes(event, item) {
    debugger;
    this.commonService.getListOfData('InvestigationBilling/Getreprint/' + item.Oid + ' /' + item.ridd + ' /' + parseInt(localStorage.getItem("CompanyID")) + ' /' + this.tranid).subscribe((data: any) => {
      debugger;
      this.dataSourcespp.data = data.InvestDetailsp;
      this.investp = data.InvestDetailsp;
      this.paymentp = data.PayDetailssp;
      this.billnop = data.InvestigationBillMaster.BillNo;
      this.billdtp = data.InvestigationBillMaster.CreatedUTC;
      this.provaluep = data.InvestigationBillMaster.GrossProductValue;
      this.disvaluep = data.InvestigationBillMaster.TotalDiscountValue;
      this.taxvaluep = data.InvestigationBillMaster.TotalTaxValue;
      this.cessp = data.InvestigationBillMaster.CESSAmount;
      this.acessp = data.InvestigationBillMaster.AdditionalCESSAmount;
      this.totamtp = data.InvestigationBillMaster.TotalBillValue;
      this.payamtp = data.InvestigationBillMaster.TotalBillValue;
      this.uinnp = data.Registration.UIN;
      this.namep = data.Registration.Name + "" + data.Registration.LastName;
      this.agep = data.rpage;
      this.genderp = data.Registration.Gender;
      this.phonep = data.Registration.Phone;
      this.cnamep = data.rCname;
      this.caddresp = data.rCAddress;
      this.cphp = data.rCphone;
      this.cwep = data.rCweb;
      this.purchaseprintp = 'block';
      this.backdrop = 'block';
    });

  }
  purchaseprintp;

  printsssp() {
    let printContents, popupWin;
    printContents = document.getElementById('printssp').innerHTML;
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
    this.modalop = 'none';
    this.purchaseprintp = 'none';
    this.backdrop = 'none';
  }

  printclosep() {
    this.purchaseprintp = 'none';
    this.backdrop = 'none';
  }

  InvIPBillPopUpTax;
  GetTaxDetails;
  invname;
  inpresid;


  changeValueTotal(id, element, property: string) {
    debugger;
    var resTotal = element.GrossAmount + (element.GrossAmount) * ((element.GST / 100) + (element.CESS / 100) + (element.AdditionalCESS / 100));
    resTotal = parseFloat(resTotal.toFixed(2));
    element.TotalCost = resTotal;
  }

  gamnt;

  ele;
  ClickschTax(element) {
    debugger;
    this.inpresid = element.iptid;
    this.invname = element.Investigation;
    this.gamnt = element.GrossAmount;
    this.ele = element;

    this.InvIPBillPopUpTax = 'block';
    this.backdrop = 'block';
    this.commonService.getListOfData('InvestigationBilling/GetTaxDetails/').subscribe(data => {
      debugger;
      if (data.GetTaxDetails != null) {

        //this.commonService.data = data;
        this.GetTaxDetails = data.GetTaxDetails;


      }

    });
  }
  InvIPBillPopUpCloseTax() {
    this.InvIPBillPopUpTax = 'none';
    this.backdrop = 'none';
  }
  TaxID;
  selectTax(item) {
    debugger;
    this.TaxID = item.TaxID;
    this.gstt = item.GSTPercentage;
    this.cesss = item.CESSPercentage;
    this.adcesss = item.AdditionalCESSPercentage;

    this.commonService.getListOfData('InvestigationBilling/GetBillingTaxDetails/' + this.IPID + '/' + this.TaxID + '/' + this.inpresid).subscribe(data => {
      debugger;
      if (data.BillDetails.length != 0) {

        //this.getgst();
        this.isHiddenin = true;

        let res = this.commonService.data.BillDetails.some(x => x.Investigation == this.invname);

        let IndexValues = this.commonService.data.BillDetails.findIndex(x => x.Investigation == this.invname);
        let IndexValue = data.BillDetails.findIndex(x => x.Investigation == this.invname);

        this.commonService.data.BillDetails[IndexValues].TaxDescription = data.BillDetails[IndexValue].TaxDescription;
        this.commonService.data.BillDetails[IndexValues].CESSDescription = data.BillDetails[IndexValue].CESSDescription;
        this.commonService.data.BillDetails[IndexValues].AdditionalCESSDescription = data.BillDetails[IndexValue].AdditionalCESSDescription;
        this.commonService.data.BillDetails[IndexValues].GST = data.BillDetails[IndexValue].GST;
        this.commonService.data.BillDetails[IndexValues].CESS = data.BillDetails[IndexValue].CESS;
        this.commonService.data.BillDetails[IndexValues].AdditionalCESS = data.BillDetails[IndexValue].AdditionalCESS;
        this.commonService.data.BillDetails[IndexValues].GSTAmount = data.BillDetails[IndexValue].GSTAmount;
        this.commonService.data.BillDetails[IndexValues].CESSAmount = data.BillDetails[IndexValue].CESSAmount;
        this.commonService.data.BillDetails[IndexValues].AdditionalCESSAmount = data.BillDetails[IndexValue].AdditionalCESSAmount;
        this.commonService.data.BillDetails[IndexValues].TaxID = data.BillDetails[IndexValue].TaxID;


        this.dataSource1.data = this.commonService.data.BillDetails;
        this.dataSource1._updateChangeSubscription();



      }
    });

    this.changeValueTotals(this.ele);



    this.InvIPBillPopUpTax = 'none';
    this.backdrop = 'none';
  }
  // var resTotal = element.GrossAmount + (element.GrossAmount) * ((element.GST / 100) + (element.CESS / 100) + (element.AdditionalCESS / 100));

  changeValueTotals(ele) {

    var resTotals = ele.GrossAmount + (ele.Amount) * ((this.gstt / 100) + (this.cesss / 100) + (this.adcesss / 100));
    resTotals = parseFloat(resTotals.toFixed(2));
    ele.TotalCost = resTotals;

  }


  /////////////////////////////////////////payment grid////////////////////////////////////////////////
  M_AdvanceAmount;
  paydel1 = [];
  paydel2 = [];
  gridamount;
  AddPaymentDetailsNewgrid() {
    debugger;
    if (this.commonService.data.BillDetails.length > 0 && this.paymentDetails.totalCost !=0.00) {
    this.paydel1 = [];
    this.paydel2 = [];
    var paydel = this.commonService.data.PaymentMaster;
    if (this.commonService.data.PaymentMaster.length == 0) {
      var paydetails = new Payment_Master();
      paydetails.PaymentMode = "";
      paydetails.InstrumentNumber = "";
      paydetails.Instrumentdate = null;
      paydetails.BankName = "";
      paydetails.BankBranch = "";
      paydetails.Expirydate = null;
      paydetails.Amount = this.paymentDetails.totalCost;
      this.commonService.data.PaymentMaster.push(paydetails);
      this.dataSource3.data = this.commonService.data.PaymentMaster;
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


    if (this.PTotalAmount < this.paymentDetails.totalCost) {
      var paydetails = new Payment_Master();
      paydetails.PaymentMode = "";
      paydetails.InstrumentNumber = "";
      paydetails.Instrumentdate = null;
      paydetails.BankName = "";
      paydetails.BankBranch = "";
      paydetails.Expirydate = null;
      paydetails.Amount = this.paymentDetails.totalCost - this.PTotalAmount;
      this.commonService.data.PaymentMaster.push(paydetails);
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
    else {
      Swal.fire({
        type: 'warning',
        title: 'No Billing Amount',
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

    this.PTotalAmount1();

    if (this.PTotalAmount > this.paymentDetails.totalCost) {
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
    var restotalcost = this.commonService.data.PaymentMaster.map(t => t.Amount).reduce((acc, value) => acc + value, 0);
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

}








