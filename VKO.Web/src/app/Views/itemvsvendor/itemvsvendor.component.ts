import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../shared/common.service';
import { AppComponent } from '../../app.component';
import { VendorMasters, VendorDetail, ItemDetail, unVendorDetail, UNItemDetail } from 'src/app/Models/ViewModels/VendorMasterWebModel';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';

export interface Item {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-itemvsvendor',
  templateUrl: './itemvsvendor.component.html',
  styleUrls: ['./itemvsvendor.component.less']
})
export class ItemvsvendorComponent implements OnInit {

  Itemvalues;
  Vendorcodes;
  Vendorhide: boolean = false;
  Itemhide: boolean = false;
  Itemhidetable: boolean = false;
  hidevendormap: boolean = false;
  hideitemmap: boolean = false;
  Vendorhidetable: boolean = false;
  Vendordata;
  Itemdata;
  VendorwiseNGmodel;
  ItemwiseNGModel;
  code;
  nonvendor;
  nonItem;
  constructor(public appComponent: AppComponent,
    public commonService: CommonService<VendorMasters>,
    private router: Router,
  ) { }
  selectwise;
  disSubmit: boolean = true;
  disprint: boolean = true;
  Pathname = "Inventorylazy/ItemvsVendor";
  ngOnInit() {
    
    var Objdata = JSON.parse(localStorage.getItem("AllCollectionData"));
    if (Objdata.find(el => el.Parentmoduledescription === this.Pathname)) {
      this.commonService.getListOfData('Common/GetAccessdetailsstring/' + localStorage.getItem("CompanyID") +
        '/' + localStorage.getItem("userroleID") + '/' + this.Pathname).subscribe(data => {
          this.commonService.data = data;
          debugger;
          this.accessdata = data.GetAvccessDetails;

          if (this.accessdata.find(x => x.Add == true)) {
            this.disSubmit = false;
          } else {
            this.disSubmit = true;
          }
          if (this.accessdata.find(x => x.Print == true)) {
            this.disprint = false;
          } else {
            this.disprint = true;
          }
        });

      this.selectwise = 1;
      this.VendorDetails = [];
      this.UNItemDetails = [];
      this.UNVendorDetails = [];
      this.ItemDetails = [];
      this.hidevendormap = true;
      this.hideitemmap = false;
      this.getAllDropdowns();
      this.Vendorhide = true;
      this.Itemhide = false;
      this.Vendorhidetable = false;
      this.Itemhidetable = true;
      this.commonService.getListOfData('VendorMaster/Getvendordetials/' + localStorage.getItem("CompanyID"))
        .subscribe(data => {
          debugger;
          this.Vendordata = data.Vendordetials;
        });
      this.commonService.getListOfData('VendorMaster/GetItemdetials/' + localStorage.getItem("CompanyID"))
        .subscribe(data => {
          debugger;
          this.Itemdata = data.itemdetials;
        });
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
          container: 'alert-container',
        },
      });
      this.commonService.getListOfData('Common/Getlogdetailsstring/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem("Doctorname") + '/' + this.Pathname).subscribe(data => {
        this.router.navigate(['dash']);
      });
    }
  }

  getAllDropdowns() {

    this.commonService.getListOfData('Common/GetVendornames/' + localStorage.getItem("CompanyID")).subscribe(data => { this.Vendorcodes = data; });
    this.commonService.getListOfData('Common/GetBrandValues/' + localStorage.getItem("CompanyID")).subscribe(data => { this.Itemvalues = data; });
  }
  Refreshall() {
    this.ngOnInit();
  }
  accesspopup;
  accessdata;
  backdrop;
  Getformaccess() {
    debugger;
    this.commonService.getListOfData('Common/GetAccessdetailsstring/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem("userroleID") + '/' + this.Pathname).subscribe(data => {
      debugger;
      this.accessdata = data.GetAvccessDetails;
      this.backdrop = 'block';
      this.accesspopup = 'block';
    });
  }
  modalcloseAccessOk() {
    this.backdrop = 'none';
    this.accesspopup = 'none';
  }
  selecwise() {
    debugger;
    if (this.selectwise == 1) {
      this.Vendorhide = true;
      this.Vendorhidetable = false;
      this.Itemhidetable = true;
      this.Itemhide = false;
      this.hidevendormap = true;
      this.hideitemmap = false;

    } else {
      this.Itemhide = true;
      this.Vendorhidetable = true;
      this.Itemhidetable = false;
      this.hidevendormap = false;
      this.hideitemmap = true;
      this.Vendorhide = false;
    }
  }
  Itemvendormapping;
  Vendorwise() {
    debugger;
    this.hidevendormap = true;
    this.hideitemmap = false;
    this.commonService.data = new VendorMasters();

    this.commonService.data.VendorMasters.VendorCode = this.VendorwiseNGmodel.Value;
    this.code = this.commonService.data.VendorMasters.VendorCode;
    localStorage.setItem('Code', this.code);
    
    this.commonService.getListOfData('VendorMaster/GetSelectedvendordetials/' + this.code + '/' + localStorage.getItem("CompanyID"))
      .subscribe(data => {
        debugger;

        if (data.otemvendormappingdetails == null) {
          if (data.Vendordetials.length != 0) {
            this.Itemhidetable = false;
            this.Vendorhidetable = true;
            this.Vendordata = data.Vendordetials;
            this.nonvendor = data.NONVendordetials;
          }
          else if (data.NONVendordetials.length != 0) {
            this.Itemhidetable = false;
            this.Vendorhidetable = true;
            this.Vendordata = data.Vendordetials;
            this.nonvendor = data.NONVendordetials;
            Swal.fire({
              type: 'warning',
              title: 'warning',
              text: 'No Data',
              position: 'top-end',
              showConfirmButton: false,
              timer: 1500,
              customClass: {
                popup: 'alert-warp',
                container: 'alert-container',
              },
            });

          }
        } else if (data.otemvendormappingdetails != null) {
          this.Itemhidetable = false;
          this.Vendorhidetable = true;
          this.ItemwiseNGModel = localStorage.getItem("Code");
          this.Vendordata = data.otemvendormappingdetails;
        }


        else {
        
          Swal.fire({
            type: 'warning',
            title: 'warning',
            text: 'No Data',
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
  Itemwise() {

    debugger;
    this.hidevendormap = false;
    this.hideitemmap = true;
    this.commonService.data = new VendorMasters();
    this.commonService.data.Drugmaster.drugMaster.VendorCode = this.ItemwiseNGModel.Values;
    this.code = this.ItemwiseNGModel.Values;
    localStorage.setItem('ItemCode', this.code);
    this.commonService.getListOfData('VendorMaster/GetSelectedItemdetials/' + this.code + '/' + localStorage.getItem("CompanyID"))
      .subscribe(data => {
        debugger;
        if (data.itemdetials.length != 0) {
            this.Itemhidetable = true;
            this.Vendorhidetable = false;
            this.Itemdata = data.itemdetials;
            this.nonItem = data.NONItemdetials;
          }
        else if (data.NONItemdetials.length != 0) {
            this.Itemhidetable = true;
            this.Vendorhidetable = false;
            this.Itemdata = data.itemdetials;
          this.nonItem = data.NONItemdetials;
          Swal.fire({
            type: 'warning',
            title: 'warning',
            text: 'No Data',
            position: 'top-end',
            showConfirmButton: false,
            timer: 1500,
            customClass: {
              popup: 'alert-warp',
              container: 'alert-container',
            },
          });
          }
        //if (data.itemdetials.length != 0) {
        //  this.Itemhidetable = true;
        //  this.Vendorhidetable = false;
        //  this.Itemdata = data.itemdetials;
        //  this.nonItem = data.NONItemdetials;
        //}

        else {
          Swal.fire({
            type: 'warning',
            title: 'warning',
            text: 'No Data',
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

  VendorDetails: Array<VendorDetail> = [];


  SelectVendorValue(Itemvendor) {
    debugger;
    this.hidevendormap = true;
    this.hideitemmap = false;
    var vendorselect = new VendorDetail();
    vendorselect.Description = Itemvendor.Itemdescription;
    let matchNotFound = true;
    if (this.VendorDetails && this.VendorDetails.length > 0) {
      this.VendorDetails.forEach((x: any) => {
        if (x.Description === vendorselect.Description) {
          let removeIndex = this.VendorDetails.map(function (item) { return item.Description; })
            .indexOf(vendorselect.Description);
          this.VendorDetails.splice(removeIndex, 1);
          matchNotFound = false;
        }
      });
      if (matchNotFound) {
        this.VendorDetails.push(vendorselect);
      }
    } else if (this.VendorDetails.length === 0) {
      this.VendorDetails.push(vendorselect);
    }
  }




  UNVendorDetails: Array<unVendorDetail> = [];


  SelectVendorSValue(Itemvendor) {
    debugger;

    this.hidevendormap = true;
    this.hideitemmap = false;
    var vendorselects = new unVendorDetail();
      vendorselects.Description = Itemvendor.Itemdescription;
      this.UNVendorDetails.push(vendorselects);

  }

  ItemDetails: Array<ItemDetail> = [];
  UNItemDetails: Array<UNItemDetail> = [];

  SelectItemValue(Vendoritem) {
    debugger;   
    this.hidevendormap = false;
    this.hideitemmap = true;
    var Itemselect = new ItemDetail();
    Itemselect.Description = Vendoritem.Itemdescription;
    let matchNotFound = true;
    if (this.ItemDetails && this.ItemDetails.length > 0) {
      this.ItemDetails.forEach((x: any) => {
        if (x.Description === Itemselect.Description) {
          let removeIndex = this.ItemDetails.map(function (item) { return item.Description; })
            .indexOf(Itemselect.Description);
          this.ItemDetails.splice(removeIndex, 1);
          matchNotFound = false;
        }
      });
      if (matchNotFound) {
        this.ItemDetails.push(Itemselect);
      }
    } else if (this.ItemDetails.length === 0) {
      this.ItemDetails.push(Itemselect);
    }
  }


  SelectItemSValue(Itemvalues) {
    debugger;
    this.hidevendormap = false;
    this.hideitemmap = true;
    var itemrselects = new UNItemDetail();
    itemrselects.Description = Itemvalues.Itemdescription;
    this.UNItemDetails.push(itemrselects);
  }


  onsubmitItemvsvendor() {
    debugger;
    if (this.VendorDetails.length != 0 || this.UNVendorDetails.length != 0) {


      this.commonService.data = new VendorMasters();
      this.commonService.data.Code = localStorage.getItem('Code');
      this.commonService.data.VendorDetails = this.VendorDetails;
      this.commonService.data.CompanyID = localStorage.getItem('CompanyID');
      this.commonService.data.UserID = localStorage.getItem('userDoctorID');
      if (this.UNVendorDetails.length != 0) {
        this.commonService.data.unvendordetails = this.UNVendorDetails;

      }

      console.log(this.commonService.data);
      this.commonService.postData('VendorMaster/Insertvendordata', this.commonService.data)
        .subscribe(data => {
          if (data.Success == true) {
            Swal.fire({
              type: 'success',
              title: 'success',
              text: 'Saved successfully',
              position: 'top-end',
              showConfirmButton: false,
              timer: 1500,
              customClass: {
                popup: 'alert-warp',
                container: 'alert-container',
              },
            });
            //this.ngOnInit();
            this.router.navigateByUrl('/dash', { skipLocationChange: true }).then(() => {
              this.router.navigate(['Inventorylazy/ItemvsVendor']);
            });
          }
          else {
            Swal.fire({
              type: 'warning',
              title: 'warning',
              text: 'Invalid data',
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
          container: 'alert-container',
        },
      });
    }



  }

  onsubmitvendorvsitem() {
    debugger;

    if (this.ItemDetails.length != 0 || this.UNItemDetails.length != 0) {

      this.commonService.data.Code = localStorage.getItem('ItemCode');
      this.commonService.data.ItemDetails = this.ItemDetails;
      this.commonService.data.CompanyID = localStorage.getItem('CompanyID');
      this.commonService.data.UserID = localStorage.getItem('userDoctorID');
      if (this.UNItemDetails.length != 0) {
        this.commonService.data.UNItemDetails = this.UNItemDetails;
      }
      console.log(this.commonService.data);
      this.commonService.postData('VendorMaster/InsertItemdata', this.commonService.data)
        .subscribe(data => {
          if (data.Success == true) {
            Swal.fire({
              type: 'success',
              title: 'success',
              text: 'Saved successfully',
              position: 'top-end',
              showConfirmButton: false,
              timer: 1500,
              customClass: {
                popup: 'alert-warp',
                container: 'alert-container',
              },
            });
            //  this.ngOnInit();
            this.router.navigateByUrl('/dash', { skipLocationChange: true }).then(() => {
              this.router.navigate(['Inventorylazy/ItemvsVendor']);
            });
          }
          else {
            Swal.fire({
              type: 'warning',
              title: 'warning',
              text: 'Invalid data',
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
    } else {
      Swal.fire({
        type: 'warning',
        title: 'warning',
        text: 'Select Vendor',
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

  oncancelItemvsvendor() {

    this.router.navigateByUrl('/dash', { skipLocationChange: true }).then(() => {
      this.router.navigate(['Inventorylazy/ItemvsVendor']);
    });
  }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
}
