import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material';
import { VendorMasters, Opticamreturnsubmitdetails } from 'src/app/Models/ViewModels/VendorMasterWebModel';
import { CommonService } from 'src/app/shared/common.service';
import { NgForm } from '@angular/forms';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';
import { DATE } from '@amcharts/amcharts4/core';
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
  selector: 'app-materialreturntovendor',
  templateUrl: './materialreturntovendor.component.html',
  styleUrls: ['./materialreturntovendor.component.less'],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class MaterialreturntovendorComponent implements OnInit {

  constructor(public el: ElementRef,
    public commonService: CommonService<VendorMasters>,
    private router: Router,
    public dialog: MatDialog, public Datepipe: DatePipe) { }
  HideItemdropdown: boolean = false;
  HideBarcodedropdown: boolean = false;
  HideRN: boolean = false;
  HideDatepicker: boolean = false;
  hidegrid: boolean = false;
  M_Barcode;
  M_DLNODate2;
  M_Periodsearch;
  //minDate = new Date();
  searchfiletr() {
    var $rows = $('#myTable tr');
    $('#myInput').keyup(function () {
      var val = $.trim($(this).val()).replace(/ +/g, ' ').toLowerCase();

      $rows.show().filter(function () {
        var text = $(this).text().replace(/\s+/g, ' ').toLowerCase();
        return !~text.indexOf(val);
      }).hide();
    });
  }
  G_Transactiontypeid;
  ngOnInit() {
    var $th = $('.tableFixHead').find('thead th')
    $('.tableFixHead').on('scroll', function () {
      $th.css('transform', 'translateY(' + this.scrollTop + 'px)');
    });

    debugger;
    this.commonService.data = new VendorMasters();
    var Pathname = "Opticalslazy/OpticalMaterialReturn";
    var Objdata = JSON.parse(localStorage.getItem("AllCollectionData"));
    var n = Pathname;
    var sstring = n.includes("/");
    let res = Objdata.find(x => x.Parentmoduledescription == Pathname);
    this.G_Transactiontypeid = res.TransactionID;
    if (this.G_Transactiontypeid == null) {
      Swal.fire({
        type: 'warning',
        title: 'warning',
        text: "Number control needs to be created for Optical Grn",
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          popup: 'alert-warp',
          container: 'alert-container',
        },
      });
    }
    this.commonService.getListOfData('Common/GetCurrencyvalues/' + localStorage.getItem('CompanyID')).subscribe(data => {
      debugger;
      this.Country1 = data[0].Value;
      this.Country2 = data[0].Text;
    });

  }
  Country1;
  Country2;
  numberOnly(event): boolean {
    debugger;
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      if ((charCode > 34 && charCode < 41) || charCode == 46) {
        return true;
      }
      return false;
    }
    return true;
  }
  selectsearchcrriteria() {
    if (this.Searchcriter_M == "Item") {
      this.HideItemdropdown = true;
      this.HideBarcodedropdown = false;
      this.HideRN = false;
      this.HideDatepicker = false;
      this.commonService.getListOfData('Help/getopticalMaterialdetails').subscribe(data => {
        this.Itemdata = data;
      });
    } else if (this.Searchcriter_M == "Barcode") {
      this.HideItemdropdown = false;
      this.HideBarcodedropdown = true;
      this.HideDatepicker = false;
      this.HideRN = false;
    } else {
      this.HideItemdropdown = false;
      this.HideBarcodedropdown = false;
      this.HideDatepicker = false;
      this.HideRN = true;
    }
  }

  Datesearch() {
    if (this.M_Periodsearch == "Fromto") {
      this.HideDatepicker = true;
    } else {
      this.HideDatepicker = false;
    }
  }
  M_reasons;
  Helpblock;
  Searchcriter_M;
  M_DLNODate1;
  DLDateMAX1 = new Date();
  DLDateMAX2 = new Date();
  Itemdata;
  @ViewChild('MROHelpForm') HelpForm: NgForm;
  @ViewChild('MROForm') Form: NgForm;
  Clicksch() {
    this.Helpblock = 'block';
  }
  HelpblocksClosessss() {
    this.Helpblock = 'none';
    this.HelpForm.reset();
    this.HideItemdropdown = false;
    this.HideBarcodedropdown = false;
    this.HideRN = false;
    this.HideDatepicker = false;
    this.hidegrid = false;
  }
  Tabledata;
  M_ReceiptnUmber;
  SearchItem_M;
  Searchalldata() {
    debugger;
    if (this.Searchcriter_M != null && this.Searchcriter_M != undefined) {
      if (this.Searchcriter_M == "Item") {
        if (this.M_Periodsearch != null && this.M_Periodsearch != undefined) {
          if (this.M_Periodsearch == "Fromto") {
            if (this.M_DLNODate1 != null && this.M_DLNODate1 != undefined && this.M_DLNODate2 != null && this.M_DLNODate2 != undefined) {
              let fdate = this.Datepipe.transform(this.M_DLNODate1, "dd-MMM-yyyy HH:mm");
              let tdate = this.Datepipe.transform(this.M_DLNODate2, "dd-MMM-yyyy HH:mm");
              this.commonService.getListOfData('Meterialreturn/getallreturndetails/' + fdate + '/' + tdate + '/' + this.SearchItem_M + '/' + localStorage.getItem("CompanyID") + '/' + this.G_Transactiontypeid).subscribe(data => {
                if (data != null) {
                  this.hidegrid = true;
                  this.Tabledata = data;
                } else {
                  this.hidegrid = false;
                  Swal.fire({
                    type: 'warning',
                    title: 'warning',
                    text: 'No Data',
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
            } else {
              Swal.fire({
                type: 'warning',
                title: 'warning',
                text: 'Select From & To Dates',
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
            if (this.M_Periodsearch != null && this.M_Periodsearch != undefined) {
              this.commonService.getListOfData('Meterialreturn/Getperiodmaterialdetails/' + this.M_Periodsearch + '/' + this.SearchItem_M + '/' + localStorage.getItem("CompanyID") + '/' + this.G_Transactiontypeid).subscribe(data => {
                if (data != null) {
                  this.hidegrid = true;
                  this.Tabledata = data;
                } else {
                  this.hidegrid = false;
                  Swal.fire({
                    type: 'warning',
                    title: 'warning',
                    text: 'No Data',
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
            } else {
              Swal.fire({
                type: 'warning',
                title: 'warning',
                text: 'Select Period',
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
        } else {
          Swal.fire({
            type: 'warning',
            title: 'warning',
            text: 'Select Period',
            position: 'top-end',
            showConfirmButton: false,
            timer: 1500,
            customClass: {
              popup: 'alert-warp',
              container: 'alert-container'
            },
          });
        }

        this.commonService.getListOfData('Meterialreturn/getallreturndetails/').subscribe(data => {
          this.Itemdata = data;
        });
      }
      else if (this.Searchcriter_M == "Barcode") {

      } else {
        this.commonService.getListOfData('Meterialreturn/getallreturndetailsbasedonrn/' + this.M_ReceiptnUmber + '/' + localStorage.getItem("CompanyID") + '/' + this.G_Transactiontypeid).subscribe(data => {
          if (data != null) {
            this.hidegrid = true;
            this.Tabledata = data;
          } else {
            this.hidegrid = false;
            Swal.fire({
              type: 'warning',
              title: 'warning',
              text: 'No Data',
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
    } else {
      Swal.fire({
        type: 'warning',
        title: 'warning',
        text: 'Select search criteria',
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

  Lensgriddata;
  storename;
  storeadd;
  storeloca;
  storekeeper;
  vendorname;
  vendoradd;
  vendorloc;
  GRNNUMBER;
  GRNDate;
  Dummyarray = [];

  vendorcity;
  vendorstate;
  vendorcountry;
  vendorgst;
  vendorOpnumber;
  vendoropdate;
  vendoradd2;
  Vendorid;
  storeid;
  selectreceiptnumber(Rn, Rndate) {
    debugger;
    this.Lensgriddata = null;
    this.Dummyarray = [];
    this.Helpblock = 'none';
    this.HelpForm.reset();
    this.HideItemdropdown = false;
    this.HideBarcodedropdown = false;
    this.HideRN = false;
    this.HideDatepicker = false;
    this.hidegrid = false;
    this.commonService.getListOfData('Meterialreturn/getmaterialreturndetailsbasedonGRN/' + Rn).subscribe(data => {
      debugger;
      this.Lensgriddata = data.Opticamreturndetails;
      for (var i = 0; i < data.Opticamreturndetails.length; i++) {
        this.Dummyarray.push({
          "Quantity": data.Opticamreturndetails[i].itemqty,
          "ITEM": data.Opticamreturndetails[i].Item,
        });
      }
      this.storename = data.storename;
      this.storeadd = data.storeAddress;
      this.storeloca = data.storelocation;
      this.storekeeper = data.storekeeper;
      this.vendorname = data.vendorname;
      this.vendoradd = data.vendoradd;
      this.vendoradd2 = data.vendoradd2;
      this.vendorloc = data.vendorlocation;
      this.vendorcity = data.vendorcity;
      this.vendorstate = data.vendorstate;
      this.vendorcountry = data.vendorcountry;
      this.vendorgst = data.vendorgst;
      this.vendorOpnumber = data.opticalGrnnumber;
      this.vendoropdate = data.opticalGrndate;
      this.GRNNUMBER = Rn;
      this.GRNDate = Rndate;
      this.Vendorid = data.vendorID;
      this.storeid = data.Storeid;
    });
  }
  DLDateMAXop = new Date();
  invalid: boolean = false;
  CancelOptical() {
    this.router.navigateByUrl('/dash', { skipLocationChange: true }).then(() => {
      this.router.navigate(['Opticalslazy/OpticalMaterialReturn']);
    });
  }

  Onsubmit(Form: NgForm) {
    debugger;
    if (Form.valid) {
      this.invalid = false;
      if (this.SaveDummyarray.length != 0) {
        for (var i = 0; i < this.SaveDummyarray.length; i++) {
          var Lensdata = new Opticamreturnsubmitdetails();
          Lensdata.Item = this.SaveDummyarray[i].Item;
          Lensdata.type = this.SaveDummyarray[i].type;
          Lensdata.model = this.SaveDummyarray[i].model;
          Lensdata.color = this.SaveDummyarray[i].color;
          Lensdata.ClosingQty = this.SaveDummyarray[i].ClosingQty;
          Lensdata.itemqty = this.SaveDummyarray[i].itemqty;
          Lensdata.itemrate = this.SaveDummyarray[i].itemrate;
          Lensdata.itemvalue = this.SaveDummyarray[i].itemvalue;
          Lensdata.Returnqty = this.SaveDummyarray[i].Returnqty;
          Lensdata.ItemID = this.SaveDummyarray[i].ItemID;
          Lensdata.UOM = this.SaveDummyarray[i].UOM;
          Lensdata.STID = this.SaveDummyarray[i].STID;
          this.commonService.data.Opticamreturnsubmitdetails.push(Lensdata);
        }
        this.commonService.data.CompanyID = localStorage.getItem("CompanyID");
        this.commonService.data.UserID = localStorage.getItem("userroleID");
        this.commonService.data.ponumber = this.vendorOpnumber;
        this.commonService.data.podate = this.vendoropdate;
        this.commonService.data.Remarks = this.M_reasons;
        this.commonService.data.GRN = this.GRNNUMBER;
        this.commonService.data.TransactiomnID = this.G_Transactiontypeid;
        this.commonService.data.Issuedate = this.M_OPDAte;
        this.commonService.data.vendorid = this.Vendorid;
        this.commonService.data.storeiud = this.storeid;
        this.commonService.postData('Meterialreturn/Submitopticaldata', this.commonService.data)
          .subscribe((data: any) => {
            if (data.Success == true) {
              Swal.fire({
                type: 'success',
                title: 'success',
                text: 'Data saved successfully',
                position: 'top-end',
                showConfirmButton: false,
                timer: 1500,
                customClass: {
                  popup: 'alert-warp',
                  container: 'alert-container'
                },
              });
              this.router.navigateByUrl('/dash', { skipLocationChange: true }).then(() => {
                this.router.navigate(['Opticalslazy/OpticalMaterialReturn']);
              });
            } else {
              Swal.fire({
                type: 'warning',
                title: 'warning',
                text: 'Incorrect Data',
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
      } else {
        Swal.fire({
          type: 'warning',
          title: 'warning',
          text: 'No Items to issue',
          position: 'top-end',
          showConfirmButton: false,
          timer: 1500,
          customClass: {
            popup: 'alert-warp',
            container: 'alert-container'
          },
        });
      }

    } else {
      Swal.fire({
        type: 'warning',
        title: 'warning',
        text: 'Check inputs',
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

  RestrictNegativeValues(e): boolean {
    if (!(e.keyCode >= 48 && e.keyCode <= 57)) {
      return false;
    }
  }

  SaveDummyarray = [];
  Orgqty;
  changeqty(data, event) {
    debugger;
    const found = this.Dummyarray;
    let result = Number(event.target.textContent);
    this.Dummyarray.map((todos, index) => {
      if (todos.ITEM == data.Item) {
        if (result > todos.Quantity) {
          Swal.fire({
            type: 'warning',
            title: 'warning',
            text: 'Cannot exceed Quantity, Available Qty : ' + todos.Quantity,
            position: 'top-end',
            showConfirmButton: false,
            timer: 1500,
            customClass: {
              popup: 'alert-warp',
              container: 'alert-container'
            },
          });
          event.target.textContent = 0;
          this.Lensgriddata.map((todo, i) => {
            if (todo.Item == data.Item) {
              // this.Lensgriddata[i].itemqty = todos.Quantity;
              var itemrate = this.Lensgriddata[i].itemrate;
              this.Lensgriddata[i].itemvalue = todos.Quantity * itemrate;
              this.Lensgriddata[i].Returnqty = result;

              if (this.SaveDummyarray.length != 0) {
                const finddata = this.SaveDummyarray.find(item => item.Item == data.Item);
                if (finddata != undefined) {
                  this.SaveDummyarray.map((tosdo, i) => {
                    if (tosdo.Item == data.Item) {
                      this.SaveDummyarray[i].itemvalue = todos.Quantity * itemrate;
                      this.SaveDummyarray[i].Returnqty = result;
                    }
                  });
                } else {
                  this.SaveDummyarray.push({
                    "Item": this.Lensgriddata[i].Item,
                    "type": this.Lensgriddata[i].type,
                    "model": this.Lensgriddata[i].model,
                    "color": this.Lensgriddata[i].color,
                    "ClosingQty": this.Lensgriddata[i].ClosingQty,
                    "itemqty": this.Lensgriddata[i].itemqty,
                    "itemrate": this.Lensgriddata[i].itemrate,
                    "itemvalue": this.Lensgriddata[i].itemvalue,
                    "Returnqty": this.Lensgriddata[i].Returnqty,
                    "ItemID": this.Lensgriddata[i].ItemID,
                    "UOM": this.Lensgriddata[i].UOM,
                    "STID": this.Lensgriddata[i].STID,
                  });
                }
              } else {
                this.SaveDummyarray.push({
                  "Item": this.Lensgriddata[i].Item,
                  "type": this.Lensgriddata[i].type,
                  "model": this.Lensgriddata[i].model,
                  "color": this.Lensgriddata[i].color,
                  "ClosingQty": this.Lensgriddata[i].ClosingQty,
                  "itemqty": this.Lensgriddata[i].itemqty,
                  "itemrate": this.Lensgriddata[i].itemrate,
                  "itemvalue": this.Lensgriddata[i].itemvalue,
                  "Returnqty": this.Lensgriddata[i].Returnqty,
                  "ItemID": this.Lensgriddata[i].ItemID,
                  "UOM": this.Lensgriddata[i].UOM,
                  "STID": this.Lensgriddata[i].STID,
                });
              }

            }
          });
        } else {
          this.Lensgriddata.map((todo, i) => {
            if (todo.Item == data.Item) {
              var itemrate = this.Lensgriddata[i].itemrate;
              this.Lensgriddata[i].itemvalue = result * itemrate;
              this.Lensgriddata[i].Returnqty = result;
              if (this.SaveDummyarray.length != 0) {
                const finddata = this.SaveDummyarray.find(item => item.Item == data.Item);
                if (finddata != undefined) {
                  this.SaveDummyarray.map((tosdo, i) => {
                    if (tosdo.Item == data.Item) {
                      this.SaveDummyarray[i].itemvalue = result * itemrate;
                      this.SaveDummyarray[i].Returnqty = result;
                    }
                  });
                } else {
                  this.SaveDummyarray.push({
                    "Item": this.Lensgriddata[i].Item,
                    "type": this.Lensgriddata[i].type,
                    "model": this.Lensgriddata[i].model,
                    "color": this.Lensgriddata[i].color,
                    "ClosingQty": this.Lensgriddata[i].ClosingQty,
                    "itemqty": this.Lensgriddata[i].itemqty,
                    "itemrate": this.Lensgriddata[i].itemrate,
                    "itemvalue": this.Lensgriddata[i].itemvalue,
                    "Returnqty": this.Lensgriddata[i].Returnqty,
                    "ItemID": this.Lensgriddata[i].ItemID,
                    "UOM": this.Lensgriddata[i].UOM,
                    "STID": this.Lensgriddata[i].STID,
                  });
                }

              } else {
                this.SaveDummyarray.push({
                  "Item": this.Lensgriddata[i].Item,
                  "type": this.Lensgriddata[i].type,
                  "model": this.Lensgriddata[i].model,
                  "color": this.Lensgriddata[i].color,
                  "ClosingQty": this.Lensgriddata[i].ClosingQty,
                  "itemqty": this.Lensgriddata[i].itemqty,
                  "itemrate": this.Lensgriddata[i].itemrate,
                  "itemvalue": this.Lensgriddata[i].itemvalue,
                  "Returnqty": this.Lensgriddata[i].Returnqty,
                  "ItemID": this.Lensgriddata[i].ItemID,
                  "UOM": this.Lensgriddata[i].UOM,
                  "STID": this.Lensgriddata[i].STID,
                });
              }

            }
          });



        }
      }
    });
  }
  DeleteRecord(index) {
    debugger;
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
        if (index !== -1) {
          this.Lensgriddata.map((todo, i) => {
            if (i == index) {
              this.Lensgriddata.splice(index, 1);
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
  M_OPDAte;
  minDate;
  Datecomparision;
  compareDates(d1, d2) {
    debugger;
    const date1 = new Date(d1);
    const date2 = new Date(d2);

    if (date1.getTime() > date2.getTime()) {
      return this.Datecomparision = "Greater";
    } else if (date1.getFullYear() < date2.getFullYear()) {
      return this.Datecomparision = "Lesser";
    } else if (date1.getDate() === date2.getDate()) {
      return this.Datecomparision = "Equal";
    }
  }


  Calculatedate(event) {
    debugger;
    if (this.M_OPDAte != null && this.GRNDate != null) {
      var resultdate = new Date(this.M_OPDAte);
      var targetdate = new Date(this.GRNDate);

      var orgresuldate = this.Datepipe.transform(resultdate, "dd-MMM-yyyy");
      var orgtargetdate = this.Datepipe.transform(targetdate, "dd-MMM-yyyy");
      var comparison = this.compareDates(orgtargetdate, orgresuldate);
      var resultant = this.Datecomparision;
      if (resultant == "Lesser" || resultant == "Equal") {
        // this.minDate = resultdate;
        var sectargetdate = this.Datepipe.transform(resultdate, "dd-MMM-yyyy");
        this.commonService.getListOfData('Meterialreturn/Checkfinancialyear/' + sectargetdate + '/' + localStorage.getItem("CompanyID")).subscribe(data => {
          debugger;
          if (data == true) {

          } else {
            Swal.fire({
              type: 'warning',
              title: 'warning',
              text: 'Stock Not Available',
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
      } else {
        Swal.fire({
          type: 'warning',
          title: 'warning',
          text: 'Issue date should greater than GRN date',
          position: 'top-end',
          showConfirmButton: false,
          timer: 1500,
          customClass: {
            popup: 'alert-warp',
            container: 'alert-container'
          },
        });
        event.target.value = null;
        this.minDate = null;
      }
    } else {
      Swal.fire({
        type: 'warning',
        title: 'warning',
        text: 'Select Item',
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
  HistoryGriddata;
  Itemname;
  Itemtype;
  viewHistory(datas) {
    debugger;

    this.commonService.getListOfData('Meterialreturn/GetHistoryDetails/' + datas.ItemID + '/' + localStorage.getItem("CompanyID")).subscribe(data => {
      if (data.length != 0) {
        this.HistoryGriddata = data;
        this.Itemname = datas.Item;
        this.Itemtype = datas.type;
        this.Itemblock = 'block';
      } else {
        Swal.fire({
          type: 'warning',
          title: 'warning',
          text: 'No Data',
          position: 'top-end',
          showConfirmButton: false,
          timer: 1500,
          customClass: {
            popup: 'alert-warp',
            container: 'alert-container'
          },
        });
        this.HistoryGriddata = null;
      }
    });
  }
  Itemblock;
  ItemblockClosessss() {
    this.Itemblock = 'none';
  }
  ///////////////////////
}
