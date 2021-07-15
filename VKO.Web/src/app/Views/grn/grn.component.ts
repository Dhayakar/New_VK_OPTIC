import { Component, OnInit, ViewChild, ElementRef, Inject, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material';
import { CommonService } from '../../shared/common.service';
import { AppComponent } from '../../app.component';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import * as _moment from 'moment';
import * as _rollupMoment from 'moment';
import { GRN, BatchDetails, SerialArray, STableArray, ItembalanceArry } from '../../Models/ViewModels/GRNSupplier.model';
import { FormControl, NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { BehaviorSubject } from 'rxjs';
import { DatePipe } from '@angular/common';
import { forEach } from '@angular/router/src/utils/collection';
import { string } from '@amcharts/amcharts4/core';
import { relative } from 'path';
import { Router } from '@angular/router';
//import { totalmem } from 'os';//
const moment = _rollupMoment || _moment;

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
  selector: 'app-grn',
  templateUrl: './grn.component.html',
  styleUrls: ['./grn.component.less'],
  providers: [

    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },

    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATSS },
  ],
  encapsulation: ViewEncapsulation.None,
})
export class GRNComponent implements OnInit {

  public person = {
    Grossproductamount: 0,
    Totaldiscountamount: 0,
    Totalgstamount: 0,
    Totalpoamount: 0,
    Totalamount: 0,
    Totaldisamt: 0,
    Totalcessamount: 0,
    TotalAdditionalcessamount: 0,
    TotalTaxAmount:0
  };



  sriteria;
  Disableprint: boolean;



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









  displayedColumns = ['checked', 'PONumber', 'PODate', 'QuotationNumber', 'QuotationDate', 'SupplierName', 'Address1', 'Location', 'DeliveryName', 'DeliveryAddress1', 'DeliveryLocation'];
  dataSource = new MatTableDataSource();

  displayedColumnss = ['DrugName', 'GenericName', 'PurchaseUOM', 'Quantity', 'ReceivedQuantity', 'ActualQuantity', 'Rate', 'Value', 'Discount(%)','DiscountValue', 'Totalamount', 'AddBatch'];
  dataSources = new MatTableDataSource();


  //////////print//////////////////////////////////////
  displayedColumnss1 = ['DrugName1', 'GenericName1', 'PurchaseUOM1', 'DrugType1', 'Quantity1', 'ReceivedQuantity1', 'ActualQuantity1', 'ClosingBalance1', 'Rate1', 'Value1', 'Discount(%)1', 'DiscountValue1', 'Totalamount1'];
  dataSources1 = new MatTableDataSource();

  displayedColumnsPOVIEW: string[] = ['DrugName', 'PurchaseUOM', 'Quantity', 'recevicedQuantity', 'UnitPrice', 'Amount', 'Discount', 'DiscountAmount', 'GrossAmount', 'TaxDescription', 'GST', 'GSTValue', 'TotalAmount',];
  dataSourcePOVIEW = new MatTableDataSource();

  displayedColumnsm = ['DrugNamee', 'BatchQuantity', 'BatchNo', 'ExpiryDate', 'Delete'];
  dataSourcem = new MatTableDataSource();

  displayedColumnsgr = ['checkedgr', 'GRNNumber', 'GRNDate', 'PONumber', 'store', 'vendor', ];
  dataSourcegr = new MatTableDataSource();

  displayedColumnsss = ['DrugName', 'DrgQuan', 'Uom', 'rate', 'value', 'Discount(%)1', 'DiscountValue1','Totalamount1','ViewBatch', ];
  dataSourcesgr = new MatTableDataSource();

  displayedColumnSerial = ['SNO', 'MS_DrugName', 'MS_UOM', 'SerialNumber', 'ExpiryDate1'];
  dataSourcSerial = new MatTableDataSource();

  isHidden: boolean = true;
  isHiddenba: boolean = false;
  //isHiddengrb: boolean = false;
  disableBa: boolean = false;
  isHiddengr: boolean = false;

  isDisabled: boolean = true;
  /////////////////////////////////////////////////
  SerialNoTable: boolean = false;
  MS_HideCloseButton: boolean = false;
  MS_ActualQty;
  MSmodelmade;
  minDate = this.datepipe.transform(new Date(), "yyyy-MM-dd");
  today = new Date();

  @ViewChild(MatSort) sort: MatSort;

  date = new FormControl(moment());

  constructor(public commonService: CommonService<GRN>, public datepipe: DatePipe, public appComponent: AppComponent, private router: Router) { }
  hiddenpaymenttable: boolean = false;
  PaymentMode;
  docotorid;
  //tranid;
  pdetails = [];
  gdetails = [];
  Country1;
  Country2;
  Country3;
  resultss1;
  Getloctime;
  accessdata;
  disableSearch = true;
  disableSearch1 = true;
  TranTypeID;
  CompanyID;

  PurchaseDate;
  Quotationno;
  Quotationdate;
  Address1POV;
  LocationPOV;
  Statesuplier;
  LocationPOV1;
  Statesuplier1;
  PhoneNoPOV;
  GSTNoPOV;
  DeliveryName;
  DAddress1POV;
  DAddress2POV;
  Validity;
  Delivery;
  PaymentandTerms;
  InstructionsPOV;
  purchaseorderarray;
  overallamount;
  modalPOVIEW;




  Supplier1;
  ngOnInit() {
    debugger;
    this.CompanyID = localStorage.getItem("CompanyID");
    this.docotorid = localStorage.getItem('userroleID');
    this.Getloctime = localStorage.getItem('GMTTIME');
    //////////////////////////////////////////////////////////////////////////////////
    var Pathname = "Inventorylazy/Goodsreceivenote";

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
            //this.isDisabled = false;
            this.disableSearch = false;
          } else {
            // this.isDisabled = true;
            this.disableSearch1 = true;
          }
          if (this.accessdata.find(x => x.Edit == true)) {
            this.disableSearch1 = false;

          } else {
            this.disableSearch1 = true;
          }
          //if (this.accessdata.find(x => x.Print == true)) {
          //  this.disablePrint = false;
          //  //this.DisableReprint = false;
          //} else {
          //  this.disablePrint = true;
          //  //this.DisableReprint = true;
          //}
          //if (this.accessdata.find(x => x.Delete == true)) {
          //  this.disableDelete = false;
          //} else {
          //  this.disableDelete = true;
          //}
        });
        //////////////////////////////////////////////////////////////////////////////
        this.Getloctime = localStorage.getItem('GMTTIME');
        this.resultss1 = 0;
        this.cmpid = parseInt(localStorage.getItem("CompanyID"));
        this.commonService.getListOfData('Common/GetCurrencyvalues/' + localStorage.getItem('CompanyID')).subscribe(data => {
          debugger;
          this.Country1 = data;
          this.Country2 = this.Country1[0].Text;
          this.Country3 = this.Country1[0].Value;
        });
        this.getAllDropdowns();
        this.gndt = new Date();
        //this.commonService.getListOfData('User/GetModuletransactiondetails/' + localStorage.getItem('MenuDescription') + '/' + localStorage.getItem('CompanyID'))
        //  .subscribe(data => {
        //    this.tranid = data.transactionid;
        //    localStorage.setItem("TransactionTypeid", this.tranid);
        //  });

        let res = Objdata.find(x => x.Parentmoduledescription == Pathname);
        this.TranTypeID = res.TransactionID;
        setTimeout(() => {
          let res = Objdata.find(x => x.Parentmoduledescription == Pathname);
          this.TranTypeID = res.TransactionID;
          if (this.TranTypeID == null || this.TranTypeID == undefined) {
            this.disableSearch = true;
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
          if (this.TranTypeID != null || this.TranTypeID != undefined) {
            this.commonService.getListOfData('Common/GettingRunningNo/' + localStorage.getItem('CompanyID') + '/' + this.TranTypeID).subscribe(data => {
              debugger
              if (data.RunningNo == "Running Number Does'nt Exist") {
                this.disableSearch = true;
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
        this.commonService.getListOfData('Grn/GetPoDetails/' + parseInt(localStorage.getItem("CompanyID"))).subscribe(data => {
          debugger;
          if (data.PurchaseDetails != null) {
            this.commonService.data.PurchaseDetails = data.PurchaseDetails;
            this.pdetails = data.PurchaseDetails;
            this.dataSource.data = data.PurchaseDetails;
          }
        });
        localStorage.getItem("CompanyID");
        this.docotorid = localStorage.getItem('userDoctorID');
      }
      else {

        Swal.fire({
          text: "Un-Authorized Access, Please contact Administrator",
          type: 'warning',
        });
        this.commonService.getListOfData('Common/Getlogdetails/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem("Doctorname") + '/' + "Goodsreceivenote").subscribe(data => {
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
            //this.isDisabled = false;
            this.disableSearch = false;
          } else {
            // this.isDisabled = true;
            this.disableSearch1 = true;
          }
          if (this.accessdata.find(x => x.Edit == true)) {
            this.disableSearch1 = false;

          } else {
            this.disableSearch1 = true;
          }
          //if (this.accessdata.find(x => x.Print == true)) {
          //  this.disablePrint = false;
          //  //this.DisableReprint = false;
          //} else {
          //  this.disablePrint = true;
          //  //this.DisableReprint = true;
          //}
          //if (this.accessdata.find(x => x.Delete == true)) {
          //  this.disableDelete = false;
          //} else {
          //  this.disableDelete = true;
          //}
        });
        //////////////////////////////////////////////////////////////////////////////
        this.Getloctime = localStorage.getItem('GMTTIME');
        this.resultss1 = 0;
        this.cmpid = parseInt(localStorage.getItem("CompanyID"));
        this.commonService.getListOfData('Common/GetCurrencyvalues/' + localStorage.getItem('CompanyID')).subscribe(data => {
          debugger;
          this.Country1 = data;
          this.Country2 = this.Country1[0].Text;
          this.Country3 = this.Country1[0].Value;
        });
        this.getAllDropdowns();
        this.gndt = new Date();
        //this.commonService.getListOfData('User/GetModuletransactiondetails/' + localStorage.getItem('MenuDescription') + '/' + localStorage.getItem('CompanyID'))
        //  .subscribe(data => {
        //    this.tranid = data.transactionid;
        //    localStorage.setItem("TransactionTypeid", this.tranid);
        //  });

        let res = Objdata.find(x => x.Parentmoduledescription == Pathname);
        this.TranTypeID = res.TransactionID;
        setTimeout(() => {
          let res = Objdata.find(x => x.Parentmoduledescription == Pathname);
          this.TranTypeID = res.TransactionID;
          if (this.TranTypeID == null || this.TranTypeID == undefined) {
            this.disableSearch = true;
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
          if (this.TranTypeID != null || this.TranTypeID != undefined) {
            this.commonService.getListOfData('Common/GettingRunningNo/' + localStorage.getItem('CompanyID') + '/' + this.TranTypeID).subscribe(data => {
              debugger
              if (data.RunningNo == "Running Number Does'nt Exist") {
                this.disableSearch = true;
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
        this.commonService.getListOfData('Grn/GetPoDetails/' + parseInt(localStorage.getItem("CompanyID"))).subscribe(data => {
          debugger;
          if (data.PurchaseDetails != null) {
            this.commonService.data.PurchaseDetails = data.PurchaseDetails;
            this.pdetails = data.PurchaseDetails;
            this.dataSource.data = data.PurchaseDetails;
          }
        });
        localStorage.getItem("CompanyID");
        this.docotorid = localStorage.getItem('userDoctorID');
      }
      else {

        Swal.fire({
          text: "Un-Authorized Access, Please contact Administrator",
          type: 'warning',
        });
        this.commonService.getListOfData('Common/Getlogdetails/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem("Doctorname") + '/' + "Goodsreceivenote").subscribe(data => {
          this.router.navigate(['dash']);
        });
      }
    }
    /////////////////////////////////////////////////////////////////////////////////////

    
  }
  StoreName;


  getAllDropdowns()
  {
    this.commonService.data = new GRN();
    this.commonService.getListOfData('Common/GetstoreDropdownvalues/' + parseInt(localStorage.getItem("CompanyID"))).subscribe(data => { this.StoreName = data; });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  applyFilters(filterValue: string) {
    this.dataSourcegr.filter = filterValue.trim().toLowerCase();
  }

  modalpo;
  backdrop;

  ClickPo() {
    debugger;
    if (this.storename != null)
    {
      if (this.pdetails.length != 0)
      {
        this.modalpo = 'block';
        this.backdrop = 'block';
      }
      else {
        Swal.fire({
          position: 'center',
          type: 'warning',
          title: 'No Data Found',
          showConfirmButton: false,
          timer: 2000
        });
      }
    }
    else
    {
      Swal.fire({
        position: 'center',
        type: 'warning',
        title: 'Please select the Store',
        showConfirmButton: false,
        timer: 2000
      });
    }
  }

  modalSuccesspo() {

    this.modalpo = 'none';
    this.backdrop = 'none';
    this.applyFilter("");
    this.scriteria = '';
  }

  modalgr;
  Clicksch() {
    debugger;
    this.commonService.getListOfData('Grn/GetGrnDetails/' + parseInt(localStorage.getItem("CompanyID")) + '/' + this.TranTypeID + '/' + this.Getloctime).subscribe((data: any) => {
      debugger;
      if (data.GrnDetails != null) {

       
        this.dataSourcegr.data = [];

        this.dataSourcegr.data = data.GrnDetails;
        this.gdetails = data.GrnDetails;    
      }
      if (this.gdetails.length != 0)
      {
        this.modalgr = 'block';
        this.backdrop = 'block';
      }

      else
      {
        Swal.fire({
          position: 'center',
          type: 'warning',
          title: 'No Data Found',
          showConfirmButton: false,
          timer: 2000
        });
      }
    });
   

  }

  modalSuccessgr() {

    debugger;
    this.modalgr = 'none';
    this.backdrop = 'none';
    this.applyFilters("");
    this.Criteria = '';
  }

  quno;
  qudt;
  pono;
  podt;
  Supplier;
  Address1;
  Address2;
  Location;
  PhoneNo;
  GSTNo;
  deliveryname;
  DAddress1;
  DAddress2;
  DAddress3;
  Locations;
  pid;
  vid;

  clear() {

    this.quno = '';
    this.qudt = '';
    this.pono = '';
    this.podt = '';
    this.gnno = '';
    this.gndt = '';
    this.Supplier = '';
    this.Address1 = '';
    this.Address2 = '';
    this.Location = '';
    this.PhoneNo = '';
    this.GSTNo = '';
    this.deliveryname = '';
    this.DAddress1 = '';
    this.DAddress2 = '';
    this.DAddress3 = '';
    this.Locations = '';
    //this.storename = '';
    this.Instructions = '';

  }
  LocationsCity;
  State;
  Country;
  SCityID;
  SState;
  SCountry;
  scity;
  Supplierloccity;
  Supplierstatecoun;
  Dloccity;
  Dstatecon;
  storeID;
  selecttypes(item) {
    debugger; 
    this.storeID = this.storename.Value;
    this.clear();
    this.gndt = new Date();
    this.pid = item.POId;
    this.quno = item.QuotationNumber;
    this.qudt = item.QuotationDate;
    this.pono = item.PONumber;
    this.podt = item.PODate;
    this.vid = item.VendorId;
    this.Supplier = item.SupplierName;
    this.Address1 = item.Address1;
    this.Address2 = item.Address2;
    this.Location = item.Location;
    this.PhoneNo = item.Phone;
    this.GSTNo = item.GST;
    this.deliveryname = item.DeliveryName;
    this.DAddress1 = item.DeliveryAddress1;
    this.DAddress2 = item.DeliveryAddress2;
    this.DAddress3 = item.DeliveryAddress3;
    //this.Locations = item.DeliveryLocation;
    this.SCityID = item.SCityID,
    this.scity = item.scity,
      this.commonService.getListOfData('RegistrationMaster/GetlocationDetails/' + this.SCityID + '/')
      .subscribe((data: any) => {
        debugger;
        this.SState = data.ParentDescriptionstate;
        this.SCountry = data.ParentDescriptioncountry;
      });

    this.commonService.getListOfData('Grn/GetItemDetails/' + item.PONumber + '/' + this.storeID + '/' + parseInt(localStorage.getItem("CompanyID")) ).subscribe(data => {
      debugger;
      if (data.ItemDetails != null) {
        debugger;
        this.isHidden = true;
        this.commonService.data.ItemDetails = data.ItemDetails;
        this.dataSources.data = this.commonService.data.ItemDetails;

        this.commonService.getListOfData('Purchaseordercancellation/Getpurchasecal/' + item.POId + '/')
          .subscribe((data: any) => {
            debugger;
            this.Locations = data.PLocationn;
            this.LocationsCity = data.PLocationncity;
            this.State = data.PLocationnstate;
            this.Country = data.PLocationncountry;

            this.Supplierloccity = this.Location + " " + "/" + " " + this.scity;
            this.Supplierstatecoun = this.SState + " " + "/" + " " + this.SCountry;
            this.Dloccity = this.Locations + " " + "/" + " " + this.LocationsCity;
            this.Dstatecon = this.State + " " + "/" + " " + this.Country;

          });
  

      }
      else {
        Swal.fire({
          position: 'center',
          type: 'warning',
          title: 'No Data Found',
          showConfirmButton: false,
          timer: 2000
        });
      }

    });

    this.isHiddengr = false;
    this.isDisabled = false;
    this.batchorder = [];
    this.commonService.data.BatchDetails = [];
    this.modalpo = 'none';
    this.backdrop = 'none';
    this.applyFilter("");
    this.scriteria = '';

   ///////////////////////////////////////////po-view/////////////////////////////////////////////////////////////

    this.commonService.getListOfData('purchaseorder/Getpurchaseprint/' + item.RandomUniqueID + '/' + parseInt(localStorage.getItem("CompanyID")) + '/' + this.Getloctime + '/' + "Open" + '/' + item.PONumber).subscribe((data: any) => {
        debugger;
        this.PurchaseDate = data.PooDate;
        this.Quotationno = data.QoNo;
        this.Quotationdate = data.QoDate;
        this.Supplier1 = data.VName;
        
     
        this.Address1POV = data.VAddress1 + " " + data.VAddress2 == " " ? " " : data.VAddress1 + " " + data.VAddress2;

      if (data.VLocation != null && data.VParentDescriptioncity != null) {
        this.LocationPOV = data.VLocation + " " + "/" + " " + data.VParentDescriptioncity;
        }

        if (data.VLocation == null && data.VParentDescriptioncity != null) {
          this.LocationPOV = data.VParentDescriptioncity
        }

        if (data.VLocation == null && data.VParentDescriptioncity == null) {
          this.LocationPOV = "";
        }

        if (data.VParentDescriptionstate == null && data.VParentDescriptioncountry == null) {
          this.Statesuplier = "";
        }

        if (data.VParentDescriptionstate != null && data.VParentDescriptioncountry != null) {
          this.Statesuplier = data.VParentDescriptionstate + " " + "/" + " " + data.VParentDescriptioncountry;
      }

      this.PhoneNoPOV = data.VPhoneno;
      this.GSTNoPOV = data.VGstno;
      this.DeliveryName = data.PDelivery;
      this.DAddress1POV = data.PDeliveryadd1;
      this.DAddress2POV = data.PDeliveryadd2;

      

      if (data.PLocation != null && data.PDeliveryParentDescriptioncity != null) {
        this.LocationPOV1 = data.PLocation + " " + "/" + " " + data.PDeliveryParentDescriptioncity;
      }

      if (data.PLocation == null && data.PDeliveryParentDescriptioncity != null) {
        this.LocationPOV1 = data.PDeliveryParentDescriptioncity
      }

      if (data.PLocation == null && data.PDeliveryParentDescriptioncity == null) {
        this.LocationPOV1 = "";
      }

      if (data.PDeliveryParentDescriptionstate == null && data.PDeliveryParentDescriptioncountry == null) {
        this.Statesuplier1 = "";
      }

      if (data.PDeliveryParentDescriptionstate != null && data.PDeliveryParentDescriptioncountry != null) {
        this.Statesuplier1 = data.PDeliveryParentDescriptionstate + " " + "/" + " " + data.PDeliveryParentDescriptioncountry;
      }
        this.Validity = data.Validy;
        this.Delivery = data.Deliverr;
        this.PaymentandTerms = data.payments;
        this.InstructionsPOV = data.Term;
        this.purchaseorderarray = data.Potransdetails;
      this.commonService.data.purchasedetailsPOV = this.purchaseorderarray;
      this.dataSourcePOVIEW.data = this.commonService.data.purchasedetailsPOV;
      this.dataSourcePOVIEW._updateChangeSubscription();
      for (var i = 0; i < this.commonService.data.purchasedetailsPOV.length; i++) {
        this.overallamount = this.overallamount + this.commonService.data.purchasedetailsPOV[i].ItemValue;
        }

     
      });

 
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
  }

  scriteria;
  gnno;
  gbatch = [];
  
  SCityID1;
 
  DeliveryCityID;
  Totalvalue;
  TotalDiscountValue;
  TotalTotalCost;
  selecttypegr(item) {
    debugger;

    this.clear();
    this.quno = item.qnum;
    this.qudt = item.qudt;
    this.pono = item.poid;
    this.podt = item.podt;
    this.gnno = item.GrNo;
    this.gndt = item.GrDt;
    this.Supplier = item.vendor;
    this.Address1 = item.Address11;
    this.Address2 = item.Address22;
    this.Location = item.Locationn;
    this.PhoneNo = item.Phonee;
    this.GSTNo = item.GSTt;
    this.deliveryname = item.DeliveryNamee;
    this.DAddress1 = item.DeliveryAddress11;
    this.DAddress2 = item.DeliveryAddress22;
    this.DAddress3 = item.DeliveryAddress33;
    this.Locations = item.DeliveryLocationn;
    //this.storename = item.store;
    this.scity = item.Scity1;
    this.SCityID1 = item.SCityID1;
    this.LocationsCity = item.Deliverycity;
    this.DeliveryCityID = item.DeliveryCityID;
    //this.M_SOR = this.StoreName.find(x => x.Text == item.store)
    this.Supplierloccity = this.Location + " " + "/" + " " + this.scity;
    this.Supplierstatecoun=this.SState + " " + "/" + " " + this.SCountry;
    this.Dloccity =this.Locations + " " + "/" + " " + this.LocationsCity;
    this.Dstatecon=this.State + " " + "/" + " " + this.Country;


    this.commonService.getListOfData('RegistrationMaster/GetlocationDetails/' + this.SCityID1 + '/')
      .subscribe((data: any) => {
        debugger;

        this.SState = data.ParentDescriptionstate;
        this.SCountry = data.ParentDescriptioncountry;
      });
    this.commonService.getListOfData('RegistrationMaster/GetlocationDetails/' + this.DeliveryCityID + '/')
      .subscribe((data: any) => {
        debugger;
        this.State = data.ParentDescriptionstate;
        this.Country = data.ParentDescriptioncountry;
      });

    if (item.store != null) {
      let store = this.StoreName.find(x => x.Text == item.store)
      this.storename = store.Text
    }

    this.Instructions = item.Terms;

    this.commonService.getListOfData('Grn/GetGrnItemDetails/' + item.GrNo + '/' + this.cmpid).subscribe(data => {
      debugger;
      if (data.GrnitemDetails != null) {
        debugger;
        this.isHiddengr = true;
        this.commonService.data = data;
        this.dataSourcesgr.data = data.GrnitemDetails;
        this.Totalvalue = data.Totalvalue;
        this.TotalDiscountValue = data.TotalDiscountValue;
        this.TotalTotalCost = data.TotalTotalCost;



        for (var i = 0; i < data.GrnitemDetails.length; i++)
        {
          debugger;

          var res = ((data.GrnitemDetails[i].DrgQuan * data.GrnitemDetails[i].rate) + data.GrnitemDetails[i].GSTValue) - data.GrnitemDetails[i].DiscountValue;
          data.GrnitemDetails[i].TotalCostt = res;

        }
      }
    });

    this.isDisabled = true;
    this.isHidden = false;
    this.modalgr = 'none';
    this.backdrop = 'none';
    this.applyFilters("");
    this.Criteria = '';
  }
  modalviewBatchDetailspopup;
  gserial;
  gbatchtable = false;
  gserialtable = false;
  ViewBatch(item)
  {
    debugger;
    this.commonService.getListOfData('GrnWoPo/GetGrnnbatchDetails/' + item.SMID + '/').subscribe(data => {
      debugger;
      if (data.GrnnbatchDetails.length > 0) {
        this.gbatch = data.GrnnbatchDetails;
        this.gbatchtable = true;
      }     
    });
    this.commonService.getListOfData('Grn/GetGrnSerialDetails/' + this.gnno + '/').subscribe(data => {
      debugger;
      if (data.GetGrnSerialDetails.length > 0) {
        this.gserial = data.GetGrnSerialDetails;
        this.gserialtable = true;
      }
    });
    this.modalviewBatchDetailspopup = 'block';
    this.backdrop = 'block';
  }
  ModalViewBatchPopupclose() {
    this.gbatch = [];
    this.gserial = [];
    this.modalviewBatchDetailspopup = 'none';
    this.backdrop = 'none';

  }
  Criteria;
  modalSuccessbq;
  //resultss = 0;
  /////////ItemBalance
  TempBal = [];
  //AddBal(id: number, element, event: any) {
  //  debugger;
  //  if (element.Type == "ImplantDrug" && element.ActualQuantity != 0) {
  //    var res = new ItembalanceArry();
  //    res.ActualQty = element.ActualQuantity;
  //    res.UOM = element.PurchaseUOM;
  //    res.DrugName = element.DrugName;
  //    res.DrugID = element.DrgId;
  //    res.UOMID = element.uom; 
  //    this.TempBal.push(res);
  //    this.commonService.data.ItembalanceArry = this.TempBal;
  //  }
  //  else {
  //    var res = new ItembalanceArry();
  //    res.ActualQty = element.ActualQuantity;
  //    res.UOM = element.PurchaseUOM;
  //    res.DrugName = element.DrugName;
  //    this.TempBal.push(res);
  //    this.commonService.data.ItembalanceArry = this.TempBal;
  //  }
  //}




  //onSave() {
  //  debugger;
  //  let resultss = 0;

  //  for (let i = 0; i < this.commonService.data.BatchDetails.length; i++) {
  //    if (this.GetDrug == this.commonService.data.BatchDetails[i].DrugName) {
  //      resultss += Number(this.commonService.data.BatchDetails[i].BatchQuantity);

  //    }
  //    else {

  //    }

  //  }

  //  if (this.results != 0 && this.results != "" && this.results != undefined && this.quant == resultss) {

  //    for (let i = 0; i < this.commonService.data.BatchDetails.length; i++) {
  //      if (this.GetDrug == this.commonService.data.BatchDetails[i].DrugName) {
  //        if (this.commonService.data.BatchDetails[i].ExpiryDate != null) {

  //          this.modalmed = 'none';
  //          this.backdrop = 'none';

  //        }

  //        else {

  //          Swal.fire({
  //            position: 'center',
  //            type: 'warning',
  //            title: 'Select Expiry Date',
  //            showConfirmButton: false,
  //            timer: 2000
  //          });
  //        }

  //      }
  //    }
  //    //this.modalmed = 'none';
  //    //this.backdrop = 'none';
  //    //this.disableBa = false;
  //  }
  //  else {
  //    this.modalSuccessbq = 'block';
  //    this.backdrop = 'block';
  //  }
  //}
  onSave()
  {

    debugger;
    if (this.commonService.data.BatchDetails.some(Med => Med.BatchQuantity === 0 )) {
      Swal.fire({
        type: 'warning',
        title: 'Enter Quantity',
      })
      return;
    }

    if (this.commonService.data.BatchDetails.some(Med => Med.BatchNo === "")) {
      Swal.fire({
        type: 'warning',
        title: 'Enter BatchNo',
      })
      return;
    }

    if (this.commonService.data.BatchDetails.some(Med => Med.ExpiryDate == null)) {
      Swal.fire({
        type: 'warning',
        title: 'Choose Expirydate',
      })
      return;
    }
   
      this.modalmed = 'none';
      this.backdrop = 'none';
    


  }

  modalSuccessClosebq() {

    this.modalSuccessbq = 'none';
    this.backdrop = 'none';

  }

  closebq() {

    this.modalSuccessbq = 'none';
    this.backdrop = 'none';
  }
  numberOnly(event): boolean {
    var charCode = event.charCode || event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    else { return true; }
  }
  drgid;
  modalmed;
  GetDrug;
  um;
  quant;
  modalSuccessb;
  MS_DrugName;

  changeValuea(id, property: string, event: any) {
    debugger;

    let result: number = Number(event.target.textContent);
    this.dataSourcSerial.filteredData[id][property] = result;
    this.dataSourcSerial._updateChangeSubscription();

  }
  changeValueb(id, property: string, event: any) {
    debugger;
    let result: number = (event.target.value);
    this.dataSourcSerial.filteredData[id][property] = result;
    this.dataSourcSerial._updateChangeSubscription();
  }
  TempArray1 = [];
  TempArray3 = [];
 // TempArray = [];
  TempArray4 = [];
  Newdrg;
  ////Batch Click
  changeBatch(id: number, element, event: any) {
    debugger;
    if (element.DrugTracker == "SerialNumberBased" && element.ActualQuantity != 0) {
      if (this.commonService.data.SerialArray.some(Med => Med.DrugName === element.DrugName && Med.SerialNumber != 0)) {
        Swal.fire({
          type: 'warning',
          title: 'Already you gave  Serial Number for this drug...!',
        })
        this.MSmodelmade = 'block'
        this.backdrop = 'block'
      }
      else {
        this.MSmodelmade = 'block'
        this.backdrop = 'block'
        this.SerialNoTable = true;
        var rows = element.ActualQuantity;
        var Kk = 0;

        var serialdrugid = element.DrgId;
        this.commonService.data.SerialArray = this.commonService.data.SerialArray.filter(function (item) {
          return item.druggid !== serialdrugid;
        });

        for (var j = 0; j < rows; j++) {
          this.MS_DrugName = element.DrugName;
          this.MS_ActualQty = element.ActualQuantity;
          var Res = new SerialArray();
          Res.GRNNumber = this.pono;
          Res.DrugName = element.DrugName;
          Res.SerialNumber = 0;
          Res.druggid = element.DrgId;
          Res.UOM = element.PurchaseUOM;
          Res.TC = this.TranTypeID;
          Res.Store;
          Res.CreatedBy = this.docotorid;
          Res.ExpiryDate1;
          if (Kk == 0) {
            Kk = Kk + 1;
            Res.ID = Kk;
          }
          else {
            Kk = Kk + 1;
            Res.ID = Kk;
          }
          this.commonService.data.SerialArray.push(Res);
        }

        this.dataSourcSerial.data = this.commonService.data.SerialArray;
        //this.commonService.data.SerialArray = this.TempArray;
      }
    }

    else if (element.DrugTracker == "BatchNumberBased" && element.ActualQuantity != 0) {
      this.GetDrug = element.DrugName;
      this.quant = element.ActualQuantity;
      this.drgid = element.DrgId;
      this.um = element.uom;
      this.modalmed = 'block';
      this.backdrop = 'block';
    }
    else {
      //this.modalSuccessb = 'block';
      //this.backdrop = 'block';
      Swal.fire({
        type: 'warning',
        title: 'warning',
        text: 'Enter Quantity',
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

  ////Save
  Save() {
    debugger;
    this.commonService.data.SerialArray;
    if (this.commonService.data.SerialArray.some(Med => Med.SerialNumber == 0)) {
      Swal.fire({
        type: 'warning',
        title: 'Please Enter Serial Number...!',
      })
    }
    else if (this.commonService.data.SerialArray.some(Med => Med.ExpiryDate1 == null)) {
      Swal.fire({
        type: 'warning',
        title: 'Please Select Expiry Date...!',
      })
    }
    else if (this.dataSourcSerial.data.length > 0) {
      this.TempArray1 = this.dataSourcSerial.data;
      this.commonService.data.STableArray = this.TempArray1
      this.MSmodelmade = 'none'
      this.backdrop = 'none'
    }
  }

  /////
  filterd = [];
  PopCancel() {
    debugger;
    this.commonService.data.SerialArray = [];
    this.dataSourcSerial.data = [];
    this.MSmodelmade = 'none'
    this.backdrop = 'none'
  }

  TempArray2 = [];

  sum;
  cmpid;
  printpopup1;
  isInvalid = false;
  PAddress;
  PAddress2;
  Pphone;
  Pweb;
  GRNNO;
  PCompnayname;
  onSubmit(form: NgForm) {
    debugger;
    try {
      if (form.valid) {
        this.isInvalid = false;
        let ActualQuantity = 0;
        let BatchQtyandSerial = 0;
        let ActualQtySerial = 0;
        let ActualQty = 0;

        for (let i = 0; i < this.dataSources.data.length; i++) {
          ActualQuantity += Number(this.commonService.data.ItemDetails[i].ActualQuantity);
        }
        for (let i = 0; i < this.dataSources.data.length; i++) {
          if (this.commonService.data.ItemDetails[i].Type == "ImplantDrug") {
            ActualQtySerial += Number(this.commonService.data.ItemDetails[i].ActualQuantity);
          }
          if (this.commonService.data.ItemDetails[i].Type == "Others") {
            ActualQty += Number(this.commonService.data.ItemDetails[i].ActualQuantity);
          }
        }
        for (let i = 0; i < this.commonService.data.BatchDetails.length; i++) {
          BatchQtyandSerial += Number(this.commonService.data.BatchDetails[i].BatchQuantity);
        }

        if ((this.commonService.data.BatchDetails.length != 0 || this.commonService.data.STableArray.length != 0 ||
          this.commonService.data.ItemDetails.length != 0) && ActualQuantity == BatchQtyandSerial + ActualQtySerial + ActualQty) {

          this.commonService.data.StockMaster.POID = this.pid;
          this.commonService.data.StockMaster.DocumentDate = this.gndt;
          this.commonService.data.StockMaster.VendorID = this.vid;
          this.commonService.data.StockMaster.GrossProductValue = this.person.Grossproductamount;
          this.commonService.data.StockMaster.TotalDiscountValue = this.person.Totaldiscountamount;
          this.commonService.data.StockMaster.TotalTaxValue = this.person.Totalgstamount;
          this.commonService.data.StockMaster.TotalCESSValue = this.person.Totalcessamount;
          this.commonService.data.StockMaster.TotalAdditionalCESSValue = this.person.TotalAdditionalcessamount;
          this.commonService.data.StockMaster.TotalPOValue = this.person.Totalpoamount;
          this.commonService.data.StockMaster.TermsConditions = this.Instructions;
          this.commonService.data.StockMaster.StoreID = this.storename.Value;
          this.commonService.data.StockMaster.CMPID = parseInt(localStorage.getItem("CompanyID"));
          this.commonService.data.StockMaster.CreatedBy = this.docotorid;
          this.commonService.data.StockMaster.TransactionID = this.TranTypeID;
          this.commonService.data.Companyname = localStorage.getItem("Companyname");
          console.log(this.commonService.data);
          this.dataSources1.data = this.dataSources.data;
          this.commonService.postData('Grn/UpdateGRN/' + this.storename.Value + '/' + this.cmpid + '/' + this.TranTypeID + '/', this.commonService.data)
            .subscribe(data => {
              debugger;
              if (data.Success == true) {
                debugger;

                Swal.fire({
                  position: 'center',
                  type: 'success',
                  title: 'Saved Successfully',
                  showConfirmButton: false,
                  timer: 2000
                });
                this.PAddress = data.PAddress;
                this.PAddress2 = data.PAddress2;
                this.Pphone = data.Pphone;
                this.Pweb = data.Pweb;
                this.PCompnayname = data.PCompnayname;
                this.GRNNO = data.GRNNO

                this.backdrop = 'block';
                this.printpopup1 = 'block';
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
              else if (data.Success == false) {

                if (data.Message == "Running Number Does'nt Exist") {
                  Swal.fire({
                    position: 'center',
                    type: 'warning',
                    title: 'Number control needs to be created for GRN',
                    showConfirmButton: false,
                    timer: 2000
                  });
                }

                else
                  Swal.fire({
                    position: 'center',
                    type: 'warning',
                    title: 'Some data Missing',
                    showConfirmButton: false,
                    timer: 2000
                  });
              }


            });
        }
        else {
          this.modalSuccessba = 'block';
          this.backdrop = 'block';

        }

      }
    }
    catch (Error) {
      alert(Error.message);

      this.commonService.getListOfData('Common/ErrorList/' + Error.message + '/' + "grn Submit" + '/' + this.CompanyID + '/' + this.docotorid + '/')
        .subscribe(data => {
          debugger;

        });
    }
  }
  MSmodalSuccessmed() {
    debugger;
    //this.commonService.data.SerialArray = [];
    //this.dataSourcSerial.data = [];
    this.MSmodelmade = 'none';
    this.backdrop = 'none';
  }

  //modalSuccessCloseb() {
  //  this.modalSuccessb = 'none';
  //  this.backdrop = 'none';

  //}
  //closeb() {
  //  this.modalSuccessb = 'none';
  //  this.backdrop = 'none';
  //}

  removePatient(id) {
    debugger;
    Swal.fire({
      title: 'Are you sure?',
      text: "Want to remove",
      type: 'warning',
      showCancelButton: true,
      cancelButtonColor: '#d33',
      cancelButtonText: 'No, cancel!',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Yes, remove it!',
      reverseButtons: true
    }).then((result) => {
      debugger;
      if (result.value) {
        if (id !== -1) {
          this.dataSourcem.data.splice(id, 1);
          this.dataSourcem._updateChangeSubscription();
          this.disableBa = false;
          Swal.fire({
            type: 'warning',
            title: 'Deleted Successfully',
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
          title: 'Item Details has not been deleted',
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
  removePo(id) {
    debugger;
    Swal.fire({
      title: 'Are you sure?',
      text: "Want to remove",
      type: 'warning',
      showCancelButton: true,
      cancelButtonColor: '#d33',
      cancelButtonText: 'No, cancel!',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Yes, remove it!',
      reverseButtons: true
    }).then((result) => {
      debugger;
      if (result.value) {
        if (id !== -1) {
          this.dataSources.data.splice(id, 1);
          this.dataSources._updateChangeSubscription();
          Swal.fire({
            type: 'warning',
            title: 'Deleted Successfully',
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
          title: 'Item Details has not been deleted',
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
  modalSuccessmed() {
    debugger;
    //this.dataSourcem.data = null;
    //this.commonService.data.BatchDetails = [];
   // this.dataSourcem.data = [];
    //this.batchorder = [];
    this.modalmed = 'none';
    this.backdrop = 'none';
    this.disableBa = false;
  
  }
  RestrictNegativeValues(id, event: any): boolean {
   
    if (!(event.keyCode >= 48 && event.keyCode <= 57)) {
      return false;
    }
  }

  RestrictValues(id, event: any): boolean {
    
    let result: number = Number(event.target.innerText);
    if (result > (this.commonService.data.ItemDetails[id].Quantity - this.commonService.data.ItemDetails[id].ReceivedQuantity)) {
      return false;
    }

  }



  changeValue(id, property: string, event: any) {
    debugger;
    let result: number = Number(event.target.value);

    if (result > (this.commonService.data.ItemDetails[id].Quantity - this.commonService.data.ItemDetails[id].ReceivedQuantity)) {

      event.target.textContent = '';
      this.commonService.data.ItemDetails[id].ActualQuantity = 0;
      Swal.fire({
        type: 'warning',
        title: 'warning',
        text: 'Enter Valid Quantity',
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          popup: 'alert-warp',
          container: 'alert-container'
        },
      });
   
      return false;
    }
    else {
      this.dataSources.filteredData[id][property] = result;
      this.dataSources._updateChangeSubscription();
      this.disableBa = false;
    }



  }

  changeValueAmount(id, element, property: string) {
    debugger;
    element.Value = element.ActualQuantity * element.Rate;
  }
  changeValueGrossAmount(id, element, property: string) {
    debugger;
    var num = (element.Value) - (element.Value) * element.Discount / 100;
    //var num = (element.Amount);
    num = parseFloat(num.toFixed(2));
    element.GrossAmount = num;
  }


  //changeValueRate(id, element, property: string) {
  //  debugger;
  //  var num = (element.Rate) - (element.Rate) * element.Discount / 100;
  //  num = parseFloat(num.toFixed(2));
  //  element.Rate = num;
  //}


  changeValueTotal(id, element, property: string) {
    debugger;

    if (element.Value != 0) {
      var resTotal = element.Value - element.DiscountValue;
      resTotal = parseFloat(resTotal.toFixed(2));
      element.TotalCost = resTotal;
    } else {
      element.TotalCost = 0;
    }
  }

 

  changeValueDiscountAmount(id, element, property: string) {

    var resDisAmount = (element.ActualQuantity * element.Rate) * element.Discount / 100;
    resDisAmount = parseFloat(resDisAmount.toFixed(2));
    element.DiscountValue = resDisAmount;
  }

  changeGStAmount(id, element, property: string) {
    debugger;
    var resTotal = element.GrossAmount * (element.GST / 100);
    resTotal = parseFloat(resTotal.toFixed(2));
    element.GSTValue = resTotal;
  }

  changeCESSAmount(id, element, property: string) {
    debugger;
    var resTotal = element.GrossAmount * (element.CESS / 100);
    resTotal = parseFloat(resTotal.toFixed(2));
    element.CESSAmount = resTotal;
  }

  changeAdditionalCESSAmount(id, element, property: string) {
    var resTotal = element.GrossAmount * (element.AdditionalCESS / 100);
    resTotal = parseFloat(resTotal.toFixed(2));
    element.AdditionalCESSAmount = resTotal;
  }



  GetCESSAmount() {

    var restotalcost = this.commonService.data.ItemDetails.map(t => t.CESSAmount).reduce((acc, value) => acc + value, 0);
    restotalcost = parseFloat(restotalcost.toFixed(2));
    this.person.Totalcessamount = restotalcost;
    return restotalcost;
  }
  GetAdditionalCESSAmount() {

    var restotalcost = this.commonService.data.ItemDetails.map(t => t.AdditionalCESSAmount).reduce((acc, value) => acc + value, 0);
    restotalcost = parseFloat(restotalcost.toFixed(2));
    this.person.TotalAdditionalcessamount = restotalcost;
    return restotalcost;
  }


  GetTotalcost() {

    var restotalcost = this.commonService.data.ItemDetails.map(t => t.Value).reduce((acc, value) => acc + value, 0);
    restotalcost = parseFloat(restotalcost.toFixed(2));
    this.person.Totalamount = restotalcost;
    //this.paymentDetails.totalCost = restotalcost;
    return restotalcost;
  }

  //GetTotalAmount() {

  //  var restotalcost = this.commonService.data.ItemDetails.map(t => t.TotalCost).reduce((acc, value) => acc + value, 0);
  //  restotalcost = parseFloat(restotalcost.toFixed(2));
  //  this.person.Totalpoamount = restotalcost;
  //  return restotalcost;
  //}

  GetDiscountAmount() {

    var restotalcost = this.commonService.data.ItemDetails.map(t => t.DiscountValue).reduce((acc, value) => acc + value, 0);
    restotalcost = parseFloat(restotalcost.toFixed(2));
    this.person.Totaldiscountamount = restotalcost;
    return restotalcost;
  }

  GetGrossAmount() {

    var restotalcost = this.commonService.data.ItemDetails.map(t => t.GrossAmount).reduce((acc, value) => acc + value, 0);
    restotalcost = parseFloat(restotalcost.toFixed(2));
    this.person.Grossproductamount = restotalcost;
    return restotalcost;
  }

  GetGSTAmount() {

    var restotalcost = this.commonService.data.ItemDetails.map(t => t.GSTValue).reduce((acc, value) => acc + value, 0);
    restotalcost = parseFloat(restotalcost.toFixed(2));
    this.person.Totalgstamount = restotalcost;
    return restotalcost;
  }
  GetTaxAmount() {

    var restotalcost = this.GetGSTAmount() + this.GetCESSAmount() + this.GetAdditionalCESSAmount();
    restotalcost = parseFloat(restotalcost.toFixed(2));
    this.person.TotalTaxAmount = restotalcost;
    return restotalcost;
  }
  GetValueAmount()
  {
    var restotalcost = this.commonService.data.ItemDetails.map(t => t.Value).reduce((acc, value) => acc + value, 0);
    restotalcost = parseFloat(restotalcost.toFixed(2));
    this.person.Totalamount = restotalcost;
    //this.paymentDetails.totalCost = restotalcost;
    return restotalcost;
  }

  ///////////////////////////////////////////////////////////////////////
  GetTtlamt() {
    var restotalcost = this.commonService.data.ItemDetails.map(t => t.Value).reduce((acc, value) => acc + value, 0);
    restotalcost = parseFloat(restotalcost.toFixed(2));
    this.person.Totalamount = restotalcost;
    return restotalcost;
  }


  GetDisTtlamt() {
    var restotalcost = this.commonService.data.ItemDetails.map(t => t.DiscountValue).reduce((acc, value) => acc + value, 0);
    restotalcost = parseFloat(restotalcost.toFixed(2));
    this.person.Totaldisamt = restotalcost;
    return restotalcost;
  }

  GetTotalAmount() {
    var restotalcost = this.commonService.data.ItemDetails.map(t => t.TotalCost).reduce((acc, value) => acc + value, 0);
    restotalcost = parseFloat(restotalcost.toFixed(2));
    this.person.Totalpoamount = restotalcost;
    return restotalcost;
  }

  batchorder = []
  BalanceTotal;
  
  total;
  ar = [];

  Addbatch() {
    debugger;

    if (this.commonService.data.BatchDetails.length != 0) {

      if (this.commonService.data.BatchDetails.some(Med => Med.BatchQuantity === 0)) {
        Swal.fire({
          type: 'warning',
          title: 'Enter Quantity',
        })
        return;
      }

      if (this.commonService.data.BatchDetails.some(Med => Med.BatchNo === "")) {
        Swal.fire({
          type: 'warning',
          title: 'Enter BatchNo',
        })
        return;
      }

      if (this.commonService.data.BatchDetails.some(Med => Med.ExpiryDate == null)) {
        Swal.fire({
          type: 'warning',
          title: 'Choose Expirydate',
        })
        return;
      }

      this.ar = this.commonService.data.ItemDetails;
      var Dgid = this.drgid;
      this.ar = this.ar.filter(function (item) {
        return item.DrgId == Dgid;
      });
      let results = 0;
      for (let i = 0; i < this.ar.length; i++) {
        results = this.ar[i].ActualQuantity;
      }
      this.total = results;
      this.Totalquantitycheck();
      if (this.total == this.Totalqty) {
        Swal.fire({
          type: 'warning',
          title: 'Select another row item',
        });
        return;
      }
    }
    var batch = new BatchDetails();
    batch.DrugName = this.GetDrug;
    batch.druggid = this.drgid;
    batch.uomm = this.um;
    batch.BatchQuantity;
    batch.BatchNo;
    batch.ExpiryDate = null;
    this.commonService.data.BatchDetails.push(batch);
    this.dataSourcem.data = this.commonService.data.BatchDetails;
    this.dataSourcem._updateChangeSubscription();
    this.Totalquantity();
    this.BalanceTotal = this.quant - this.PTotalAmount;

  }



  aray = [];
  Totalqty;
  Totalquantitycheck() {
    debugger;
    this.aray = this.commonService.data.BatchDetails;
    var a = this.drgid;
    this.aray = this.aray.filter(function (item) {
      return item.druggid == a;
    });

    let result = 0;
    for (let i = 0; i < this.aray.length; i++) {
      result += Number(this.aray[i].BatchQuantity);
    }
    this.Totalqty = result;
  }



  PTotalAmount;
  array = [];
  Totalquantity() {
    debugger;
    this.array = this.commonService.data.BatchDetails;
    var arr = this.drgid;
    this.array = this.array.filter(function (item) {
      return item.druggid == arr;
    });

    let resultss1 = 0;
    for (let i = 0; i < this.array.length; i++) {
      resultss1 += Number(this.array[i].BatchQuantity);
    }
    this.PTotalAmount = resultss1;
  }

  rest = 0;
  results;
  rest1;


  changeValues(id,property: string, event: any) {
    debugger;
    if (event.target.textContent != "") {
      if (event.target.textContent <= this.BalanceTotal) {
        debugger;
        let result: number = event.target.textContent;
        this.dataSourcem.filteredData[id][property] = result;
        this.dataSourcem._updateChangeSubscription();
      }
      else {
        event.target.textContent = "";
        Swal.fire({
          type: 'warning',
          title: 'Invalid Quantity',
        });
      }

    }
    if (event.target.textContent == "")
    {
      this.dataSourcem.filteredData[id][property] = 0;
      this.dataSourcem._updateChangeSubscription();
    }

  }


  chc = [];
  addEvents(id, property: string, event: any) {
    debugger;

    let result: number = event.target.textContent;
    this.dataSourcem.filteredData[id][property] = result;
    this.dataSourcem._updateChangeSubscription();

  }

  addEvent(id, property: string, event) {
    debugger;
    let res = event.target.value;
    this.dataSourcem.filteredData[id][property] = res;
    this.dataSourcem._updateChangeSubscription();
  }

  dcno;
  dcdt;
  reset() {
    debugger;
    this.gnno = '';
    this.gndt = new Date();
    this.quno = '';
    this.qudt = '';
    this.dcno = '';
    this.dcdt = '';
    this.pono = '';
    this.podt = '';
    this.Supplier = '';
    this.Address1 = '';
    this.Address2 = '';
    this.Location = '';
    this.PhoneNo = '';
    this.GSTNo = '';
    this.deliveryname = '';
    this.DAddress1 = '';
    this.DAddress2 = '';
    this.DAddress3 = '';
    this.Locations = '';
    this.Instructions = '';
    this.GetDrug = '';
    this.scity = '';
    this.State = '';
    this.SState = '';
    this.SCountry = '';
    this.Country = '';
    this.commonService.data.ItemDetails = [];
    this.commonService.data.BatchDetails = [];
    //this.commonService.data.GrnitemDetails = [];
    this.isHidden = false;
    this.isHiddengr = false;
    this.isHiddenba = false;
    this.disableBa = false;
    this.isDisabled = true;
    this.batchorder = [];
    this.Instructions = '';
    //this.isHiddengrb = false;
    this.gbatch = [];
   // this.TempArray = [];
    this.TempArray1 = [];
    this.TempArray2 = [];
    this.commonService.data.SerialArray = [];
    this.commonService.data.STableArray = [];
    //this.commonService.data.ItembalanceArry = [];
    this.TempBal = [];
  }

  oncancel() {
    debugger;
    this.reset();
    //this.TempArray = [];
    this.TempArray1 = [];
    this.TempArray2 = [];

    this.commonService.data.SerialArray = [];
    this.commonService.data.STableArray = [];

  }


  gndt;
  Instructions;
  storename;
  modalSuccessba;

  modalSuccessCloseba() {

    this.modalSuccessba = 'none';
    this.backdrop = 'none';
  }

  closeba() {

    this.modalSuccessba = 'none';
    this.backdrop = 'none';

  }
  accesspopup;

  Getformaccess() {
    debugger;
    var Pathname = "Inventorylazy/Goodsreceivenote";
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



  //print() {
  //  debugger;
    
  //  this.Print();   
  //  this.backdrop = 'none';
  //  this.printpopup1 = 'none';
  //}
  printclose() {
    this.backdrop = 'none';
    this.printpopup1 = 'none';
    this.reset();
    this.ngOnInit();
  }



  print() {
    debugger;
    
    let printContents, popupWin;
    printContents = document.getElementById('section').innerHTML;
    popupWin = window.open('','_blank','top=0,left=0,height=auto,width=100%');
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
    this.ngOnInit();
    this.reset();
    this.backdrop = 'none';
    this.printpopup1 = 'none';
  }

  ClickPoView()
  {
    this.backdrop = 'block';
    this.modalPOVIEW = 'block';
  }

  modalSuccesspoView()
  {
    this.backdrop = 'none';
    this.modalPOVIEW = 'none';
  }

  GetTotalcostPO() {
    var restotalcost = this.commonService.data.purchasedetailsPOV.map(t => t.ItemValue).reduce((acc, value) => acc + value, 0);
    this.person.Totalamount = restotalcost;
    return restotalcost;
  }

  GetGrossAmountPO() {
    var restotalcost = this.commonService.data.purchasedetailsPOV.map(t => t.GrossAmount).reduce((acc, value) => acc + value, 0);
    restotalcost = parseFloat(restotalcost.toFixed(2));
    this.person.Grossproductamount = restotalcost;
    return restotalcost;
  }

  GetDiscountAmountPO() {
    var restotalcost = this.commonService.data.purchasedetailsPOV.map(t => t.DiscountAmount).reduce((acc, value) => acc + value, 0);
    this.person.Totaldiscountamount = restotalcost;
    return restotalcost;
  }

  GetTotalAmountPO() {
    var restotalcost = this.commonService.data.purchasedetailsPOV.map(t => t.TotalAmount).reduce((acc, value) => acc + value, 0);
    this.person.Totalpoamount = restotalcost;
    return restotalcost;
  }

  GetGSTAmountPO() {
    var restotalcost = this.commonService.data.purchasedetailsPOV.map(t => t.GSTTaxValue).reduce((acc, value) => acc + value, 0);
    this.person.Totalgstamount = restotalcost;
    return restotalcost;
  }

  GetCESSAmountPO() {
    var restotalcost = this.commonService.data.purchasedetailsPOV.map(t => t.CESSAmount).reduce((acc, value) => acc + value, 0);
    this.person.Totalcessamount = restotalcost;
    return restotalcost;
  }

  GetAdditionalCESSAmountPO() {
    var restotalcost = this.commonService.data.purchasedetailsPOV.map(t => t.AddCESSAmount).reduce((acc, value) => acc + value, 0);
    this.person.TotalAdditionalcessamount = restotalcost;
    return restotalcost;
  }

  TaxtotalamountPO() {
    return this.GetGSTAmountPO() + this.GetCESSAmountPO() + this.GetAdditionalCESSAmountPO();
  }
}


