import { Component, OnInit, ElementRef, ViewChild, EventEmitter, Output } from '@angular/core';
import { CommonService } from 'src/app/shared/common.service';
import Swal from 'sweetalert2';
import { NgForm, FormGroup, FormBuilder } from '@angular/forms';
import { empty } from 'rxjs';
import { LocationMasterViewModel } from '../../Models/ViewModels/LocationMasterViewModel';
import * as XLSX from 'xlsx';

import html2canvas from 'html2canvas';
import { AppComponent } from '../../app.component';
import { DatePipe } from '@angular/common';
import * as _moment from 'moment';
import * as _rollupMoment from 'moment';
const moment = _rollupMoment || _moment;
import { FormControl } from '@angular/forms';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { optimizeGroupPlayer } from '@angular/animations/browser/src/render/shared';
import * as _l from 'lodash';
import { Router } from '@angular/router';
import { LocationMaster } from '../../Models/LocationMaster';
import { MatTableDataSource, MatSort, MatDialogRef } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { PeriodicElement } from '../investigation-register/investigation-register.component';
declare var $: any;




@Component({
  selector: 'app-locationmaster',
  templateUrl: './locationmaster.component.html',
  styleUrls: ['./locationmaster.component.less']
})
export class LocationmasterComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;

  country;
  docotorid;
  CID;
  tablelocation = false;


  displayedColumnssq = ['SNo', 'Country', 'State', 'City', 'Location', 'Pincode', 'checked'];
  dataSourcesq = new MatTableDataSource();


  constructor(public commonService: CommonService<LocationMasterViewModel>,
    public datepipe: DatePipe, public el: ElementRef,
    public appComponent: AppComponent,
    private formBuilder: FormBuilder,
    private router: Router,) {
  }





  accessdata;
  disSubmit: boolean = true;
  disupdate: boolean = true;


  ngOnInit() {

    this.commonService.data = new LocationMasterViewModel();
    var Pathname = "Commonmasterslazy/Locationmaster";
    var Objdata = JSON.parse(localStorage.getItem("AllCollectionData"));

    var n = Pathname;
    var sstring = n.includes("/");

    if (sstring == false) {
      if (Objdata.find(el => el.Parentmoduledescription === Pathname)) {
        this.commonService.getListOfData('Common/GetAccessdetails/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem("userroleID") + '/' + Pathname).subscribe(data => {
          this.accessdata = data.GetAvccessDetails;
          if (this.accessdata.find(x => x.Add == true)) {
            this.disSubmit = false;
          } else {
            this.disSubmit = true;
          }
          if (this.accessdata.find(x => x.Edit == true)) {
            this.disupdate = false;
          } else {
            this.disupdate = true;
          }

        });
        this.getAllDropdowns();
        this.docotorid = localStorage.getItem('userroleID');
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
          if (this.accessdata.find(x => x.Edit == true)) {
            this.disupdate = false;
          } else {
            this.disupdate = true;
          }

        });

        this.getAllDropdowns();
        this.docotorid = localStorage.getItem('userroleID');
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


  accesspopup;
  modalcloseAccessOk() {
    this.backdrop = 'none';
    this.accesspopup = 'none';
  }
  Getformaccess() {
    debugger;
    var Pathname = "Commonmasterslazy/Locationmaster";
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



  getAllDropdowns() {
    debugger;
    this.commonService.getListOfData('Location/Getcountry').subscribe(data => {
      this.country = data.Country;
      this.CID = data.CID;
    });


  }


  modalpreview;
  backdrop;

  c_pop() {
    this.modalpreview = 'block';
    this.backdrop = 'block';

  }

  modalSuccesspreview() {
    debugger;
    this.modalpreview = 'none';
    this.backdrop = 'none';
    this.M_Country = "";
  }

  C_country;
  M_Country;

  submitcountry() {
    debugger;

    if (this.M_Country == undefined) {

      Swal.fire({
        type: 'warning',
        title: 'warning',
        text: 'Enter the Country name',
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

    if (this.M_Country == "") {

      Swal.fire({
        type: 'warning',
        title: 'warning',
        text: 'Enter the Country name',
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

    this.commonService.data.LocMaster = new LocationMaster();

    this.commonService.data.LocMaster.ParentDescription = this.M_Country;
    this.commonService.data.LocMaster.ParentID = this.CID;
    this.commonService.data.LocMaster.CreatedBy = this.docotorid;

    console.log(this.commonService.data);

    this.commonService.postData('Location/InsertCountry', this.commonService.data)
      .subscribe(data => {
        if (data.Success == true) {
          debugger;
          this.commonService.getListOfData('Location/Getcountry').subscribe(data => {
            debugger;
            this.country = data.Country;
            this.CID = data.CID;
          });
          Swal.fire({
            type: 'success',
            title: 'success',
            text: "Saved Successfully",
            position: 'top-end',
            showConfirmButton: false,
            timer: 1500,
            customClass: {
              popup: 'alert-warp',
              container: 'alert-container',
            },
          });

          this.M_Country = "";
          this.hiddenUpdate = false;
          this.hiddenSubmit = true;

        }

        else if (data.Success == false && data.Message == "Country name already Exists") {
          debugger
          Swal.fire({
            type: 'warning',
            title: 'warning',
            text: 'Country name already exists',
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

      });

  }

  statee;
  statedisable = true;
  countrychoose() {
    debugger;

    this.statedisable = false;
    this.tablelocation = true;
    this.commonService.getListOfData('Location/GetState/' + this.C_country.ID).subscribe(data => {
      this.statee = data.State;
    });

    this.commonService.getListOfData('Location/Getfulllocation/' + this.C_country.ID).subscribe(data => {
      debugger;
      this.commonService.data.loactiondetails = [];
      this.commonService.data.loactiondetails = data;
      this.selection.selected.length = 0
      this.dataSourcesq.data = this.commonService.data.loactiondetails;
      this.dataSourcesq.sort = this.sort;
    });



  }

  modalpreviewstate;
  M_State;
  c_state() {

    debugger;
    if (this.C_country == undefined) {
      debugger;

      Swal.fire({
        type: 'warning',
        title: 'warning',
        text: 'Choose country',
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          popup: 'alert-warp',
          container: 'alert-container',
        },
      });


    }
    else if (this.C_country == "") {
      debugger;
      Swal.fire({
        type: 'warning',
        title: 'warning',
        text: 'Choose country',
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
      this.modalpreviewstate = 'block';
      this.backdrop = 'block';
    }

  }

  modalSuccesspreviewstate() {
    debugger;
    this.modalpreviewstate = 'none';
    this.backdrop = 'none';
    this.M_State = "";

  }


  submitstate() {
    debugger;


    if (this.M_State == undefined) {

      Swal.fire({
        type: 'warning',
        title: 'warning',
        text: 'Enter the state name',
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


    if (this.M_State == "") {

      Swal.fire({
        type: 'warning',
        title: 'warning',
        text: 'Enter the state name',
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

    this.commonService.data.LocMaster = new LocationMaster();


    this.commonService.data.LocMaster.ParentDescription = this.M_State;
    this.commonService.data.LocMaster.ParentID = this.C_country.ID;
    this.commonService.data.LocMaster.CreatedBy = this.docotorid;

    console.log(this.commonService.data);

    this.commonService.postData('Location/InsertState', this.commonService.data)
      .subscribe(data => {
        if (data.Success == true) {
          debugger;
          this.commonService.getListOfData('Location/GetState/' + this.C_country.ID).subscribe(data => {
            debugger;
            this.statee = data.State;
          });

          this.commonService.getListOfData('Location/Getfulllocation/' + this.C_country.ID).subscribe(data => {
            debugger;
            this.commonService.data.loactiondetails = [];
            this.commonService.data.loactiondetails = data;
            this.selection.selected.length = 0
            this.dataSourcesq.data = this.commonService.data.loactiondetails;
            this.dataSourcesq.sort = this.sort;
          });

          Swal.fire({
            type: 'success',
            title: 'success',
            text: "Saved Successfully",
            position: 'top-end',
            showConfirmButton: false,
            timer: 1500,
            customClass: {
              popup: 'alert-warp',
              container: 'alert-container',
            },
          });

          this.M_State = "";
          this.hiddenUpdate = false;
          this.hiddenSubmit = true;
        }

        else if (data.Success == false && data.Message == "State name already Exists") {
          debugger
          Swal.fire({
            type: 'warning',
            title: 'warning',
            text: 'State name already exists',
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

      });

  }


  cancelcoun() {
    this.modalSuccesspreview();
  }

  cancelstate() {
    this.modalSuccesspreviewstate();
  }

  cancelcity() {
    this.modalSuccesspreviewcity();
  }

  cancellocation() {
    this.modalSuccesspreviewlocation();
  }


  C_state;
  M_city;
  modalpreviewcity;

  c_district() {

    debugger;
    if (this.C_country == undefined) {
      debugger;
      Swal.fire({
        type: 'warning',
        title: 'warning',
        text: 'Choose country',
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          popup: 'alert-warp',
          container: 'alert-container',
        },
      });
    }
    else if (this.C_state == undefined) {
      debugger;
      Swal.fire({
        type: 'warning',
        title: 'warning',
        text: 'Choose state',
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          popup: 'alert-warp',
          container: 'alert-container',
        },
      });


    }
    else if (this.C_country == "") {
      debugger;
      Swal.fire({
        type: 'warning',
        title: 'warning',
        text: 'Choose country',
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          popup: 'alert-warp',
          container: 'alert-container',
        },
      });
    }
    else if (this.C_state == "") {
      debugger;
      Swal.fire({
        type: 'warning',
        title: 'warning',
        text: 'Choose state',
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
      this.modalpreviewcity = 'block';
      this.backdrop = 'block';
    }

  }

  modalSuccesspreviewcity() {
    debugger;
    this.modalpreviewcity = 'none';
    this.backdrop = 'none';
    this.M_city = "";

  }
  Districts;
  citydisable = true;
  choosestate() {
    debugger;

    this.citydisable = false;
    this.commonService.getListOfData('Location/GetCity/' + this.C_state.ID).subscribe(data => {
      debugger;
      this.Districts = data.City;
    });


  }

  submitcity() {
    debugger;


    if (this.M_city == undefined) {

      Swal.fire({
        type: 'warning',
        title: 'warning',
        text: 'Enter the city name',
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

    if (this.M_city == "") {
      Swal.fire({
        type: 'warning',
        title: 'warning',
        text: 'Enter the city name',
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


    this.commonService.data.LocMaster = new LocationMaster();


    this.commonService.data.LocMaster.ParentDescription = this.M_city;
    this.commonService.data.LocMaster.ParentID = this.C_state.ID;
    this.commonService.data.LocMaster.CreatedBy = this.docotorid;

    console.log(this.commonService.data);

    this.commonService.postData('Location/InsertCity', this.commonService.data)
      .subscribe(data => {
        if (data.Success == true) {
          debugger;
          this.commonService.getListOfData('Location/GetCity/' + this.C_state.ID).subscribe(data => {
            debugger;
            this.Districts = data.City;
          });

          this.commonService.getListOfData('Location/Getfulllocation/' + this.C_country.ID).subscribe(data => {
            debugger;
            this.commonService.data.loactiondetails = [];
            this.commonService.data.loactiondetails = data;
            this.selection.selected.length = 0
            this.dataSourcesq.data = this.commonService.data.loactiondetails;
            this.dataSourcesq.sort = this.sort;
          });

          Swal.fire({
            type: 'success',
            title: 'success',
            text: "Saved Successfully",
            position: 'top-end',
            showConfirmButton: false,
            timer: 1500,
            customClass: {
              popup: 'alert-warp',
              container: 'alert-container',
            },
          });

          this.M_city = "";
          this.hiddenUpdate = false;
          this.hiddenSubmit = true;
        }

        else if (data.Success == false && data.Message == "City name already exists") {
          debugger
          Swal.fire({
            type: 'warning',
            title: 'warning',
            text: 'City name already exists',
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

      });

  }

  A_Loc;
  A_PIN;
  C_district;
  modalpreviewlocation;
  c_Loc() {

    debugger;
    if (this.C_country == undefined) {
      debugger;
      Swal.fire({
        type: 'warning',
        title: 'warning',
        text: 'Choose country',
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          popup: 'alert-warp',
          container: 'alert-container',
        },
      });

    }
    else if (this.C_state == undefined) {
      debugger;
      Swal.fire({
        type: 'warning',
        title: 'warning',
        text: 'Choose state',
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          popup: 'alert-warp',
          container: 'alert-container',
        },
      });
    }
    else if (this.C_district == undefined) {
      debugger;
      Swal.fire({
        type: 'warning',
        title: 'warning',
        text: 'Choose city',
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          popup: 'alert-warp',
          container: 'alert-container',
        },
      });
    }
    else if (this.C_country == "") {
      debugger;
      Swal.fire({
        type: 'warning',
        title: 'warning',
        text: 'Choose country',
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          popup: 'alert-warp',
          container: 'alert-container',
        },
      });
    }
    else if (this.C_state == "") {
      debugger;
      Swal.fire({
        type: 'warning',
        title: 'warning',
        text: 'Choose state',
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          popup: 'alert-warp',
          container: 'alert-container',
        },
      });
    }
    else if (this.C_district == "") {
      debugger;
      Swal.fire({
        type: 'warning',
        title: 'warning',
        text: 'Choose city',
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
      this.modalpreviewlocation = 'block';
      this.backdrop = 'block';
    }

  }

  modalSuccesspreviewlocation() {
    debugger;
    this.modalpreviewlocation = 'none';
    this.backdrop = 'none';
    this.A_Loc = "";
    this.A_PIN = "";
  }

  locationdisable = true;
  locations;
  choosedistrict() {
    debugger;
    this.locationdisable = false;
    this.commonService.getListOfData('Location/Getlocation/' + this.C_district.ID).subscribe(data => {
      debugger;
      this.locations = data.location;
    });

  }

  submitlocation() {
    debugger;

    if (this.A_Loc == undefined) {
      Swal.fire({
        type: 'warning',
        title: 'warning',
        text: 'Enter the location name',
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

    if (this.A_Loc == "") {
      Swal.fire({
        type: 'warning',
        title: 'warning',
        text: 'Enter the location name',
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

    this.commonService.data.LocMaster = new LocationMaster();


    this.commonService.data.LocMaster.ParentDescription = this.A_Loc;
    this.commonService.data.LocMaster.Pincode = this.A_PIN;
    this.commonService.data.LocMaster.ParentID = this.C_district.ID;
    this.commonService.data.LocMaster.CreatedBy = this.docotorid;

    console.log(this.commonService.data);

    this.commonService.postData('Location/Insertlocation', this.commonService.data)
      .subscribe(data => {
        if (data.Success == true) {
          debugger;
          this.commonService.getListOfData('Location/Getlocation/' + this.C_district.ID).subscribe(data => {
            debugger;
            this.locations = data.location;
          });

          this.commonService.getListOfData('Location/Getfulllocation/' + this.C_country.ID).subscribe(data => {
            debugger;
            this.commonService.data.loactiondetails = [];
            this.commonService.data.loactiondetails = data;
            this.selection.selected.length = 0
            this.dataSourcesq.data = this.commonService.data.loactiondetails;
            this.dataSourcesq.sort = this.sort;
          });

          Swal.fire({
            type: 'success',
            title: 'success',
            text: "Saved Successfully",
            position: 'top-end',
            showConfirmButton: false,
            timer: 1500,
            customClass: {
              popup: 'alert-warp',
              container: 'alert-container',
            },
          });

          this.A_Loc = "";
          this.A_PIN = "";
          this.hiddenUpdate = false;
          this.hiddenSubmit = true;
        }

        else if (data.Success == false && data.Message == "Location name already exists") {
          debugger
          Swal.fire({
            type: 'warning',
            title: 'warning',
            text: 'Location name already exists',
            position: 'top-end',
            showConfirmButton: false,
            timer: 1500,
            customClass: {
              popup: 'alert-warp',
              container: 'alert-container',
            },
          });
        }
        else if (data.Success == false && data.Message == "Location name and pincode already exists") {
          debugger
          Swal.fire({
            type: 'warning',
            title: 'warning',
            text: 'Location name and pincode already exists',
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

      });

  }

  C_location;
  cancelblock;

  Cancelcountry() {
    debugger;

    if (this.C_country != null || this.C_state != null || this.C_district != null || this.C_location != null) {

      this.backdrop = 'block';
      this.cancelblock = 'block';
    }
    else {
      this.C_country = undefined;
      this.C_state = undefined;
      this.C_district = undefined;
      this.C_location = undefined;

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
    this.backdrop = 'none';
    this.cancelblock = 'none';
    this.C_country = undefined;
    this.C_state = undefined;
    this.C_district = undefined;
    this.C_location = undefined;
    this.M_Country = undefined;
    this.M_State = undefined;
    this.M_city = undefined;
    this.A_Loc = undefined;
    this.A_PIN = undefined;
    this.statedisable = true;
    this.citydisable = true;
    this.locationdisable = true;
    this.hiddenUpdate = false;
    this.hiddenSubmit = true;
    this.tablelocation = false;
  }

  click: boolean = false;
  selection = new SelectionModel<PeriodicElement>(true, []);
  selecttype(j, element) {
    debugger;

    if (this.click = !this.click) {

      for (var i = 0; i < this.commonService.data.loactiondetails.length; i++) {
        if (this.commonService.data.loactiondetails[i] == element) {

          if (element.Countryname != null) {
            let c = this.country.find(x => x.ParentDescription == element.Countryname)
            this.C_country = c;
            this.M_Country = c.ParentDescription;
          }
          else {
            this.C_country = '';
            this.M_Country = '';
          }

          if (element.Statename != null) {
            let s = this.statee.find(x => x.ParentDescriptionstate == element.Statename)
            this.C_state = s;
            this.M_State = s.ParentDescriptionstate;
          }
          else {
            this.C_state = '';
            this.M_State = '';
          }

          if (element.Cityname != null) {
            this.citydisable = false;
            this.commonService.getListOfData('Location/GetCity/' + this.C_state.ID).subscribe(data => {
              debugger;
              this.Districts = data.City;
              let ci = this.Districts.find(x => x.ParentDescriptioncity == element.Cityname)
              this.C_district = ci;
              this.M_city = ci.ParentDescriptioncity;

              if (element.Loactionname != null) {
                this.locationdisable = false;
                this.commonService.getListOfData('Location/Getlocation/' + this.C_district.ID).subscribe(data => {
                  debugger;
                  this.locations = data.location;
                  let Lnn = this.locations.find(x => x.ParentDescriptionlocation == element.Loactionname)
                  this.C_location = Lnn;
                  this.A_Loc = Lnn.ParentDescriptionlocation;
                  this.A_PIN = Lnn.Pincode;
                });
              }
              else {
                this.C_location = '';
                this.A_Loc = '';
              }

            });
          }
          else {
            this.C_district = '';
            this.M_city = '';
          }
          this.hiddenUpdate = true;
          this.hiddenSubmit = false;
          this.selection.toggle(element);
          this.myStyles(element);
        }
        else {
          this.commonService.data.loactiondetails[i].disab = true;
        }
      }

    }

    else {
      this.C_state = undefined;
      this.C_district = undefined;
      this.C_location = undefined;
      this.statedisable = false;
      this.citydisable = true;
      this.locationdisable = true;
      this.hiddenUpdate = false;
      this.hiddenSubmit = true;
      for (var i = 0; i < this.commonService.data.loactiondetails.length; i++) {
        this.commonService.data.loactiondetails[i].disab = false;
      }
      this.selection.toggle(element);
      this.myStyles(element);
    }
  }

  myStyles(element) {
    if (this.selection.selected.length > 0) {
      if (this.click == true) {
        return {
          'border': element.disab == false ? '2px solid black' : ' ',
        };
      }
    } else {
      if (this.click == false) {
        return {
          'border': element.disab == false ? '' : ' ',
        };
      }
    }
  }

  hiddenUpdate = false;
  hiddenSubmit = true;

  updatelocation() {
    debugger;

    if (this.A_Loc == undefined) {
      Swal.fire({
        type: 'warning',
        title: 'warning',
        text: 'Enter the location name',
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

    if (this.A_Loc == "") {
      Swal.fire({
        type: 'warning',
        title: 'warning',
        text: 'Enter the location name',
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

    this.commonService.data.LocMaster = new LocationMaster();

    if (this.C_location != undefined) {

      this.commonService.data.LocMaster.ParentDescription = this.A_Loc;
      this.commonService.data.LocMaster.Pincode = this.A_PIN;
      this.commonService.data.LocMaster.ParentID = this.C_district.ID;
      this.commonService.data.LocMaster.UpdatedBy = this.docotorid;

      this.commonService.postData("Location/Updatelocation/" + this.C_location.ID, this.commonService.data)
        .subscribe(data => {
          if (data.Success == true) {


            this.commonService.getListOfData('Location/Getlocation/' + this.C_district.ID).subscribe(data => {
              debugger;
              this.locations = data.location;
            });

            this.commonService.getListOfData('Location/Getfulllocation/' + this.C_country.ID).subscribe(data => {
              debugger;
              this.commonService.data.loactiondetails = [];
              this.commonService.data.loactiondetails = data;
              this.selection.selected.length = 0
              this.dataSourcesq.data = this.commonService.data.loactiondetails;
              this.dataSourcesq.sort = this.sort;
            });

            Swal.fire({
              type: 'success',
              title: 'success',
              text: "Saved Successfully",
              position: 'top-end',
              showConfirmButton: false,
              timer: 1500,
              customClass: {
                popup: 'alert-warp',
                container: 'alert-container',
              },
            });

            this.A_Loc = "";
            this.A_PIN = "";
            this.hiddenUpdate = false;
            this.hiddenSubmit = true;

          }
          else if (data.Success == false && data.Message == "Location name already exists") {
            debugger
            Swal.fire({
              type: 'warning',
              title: 'warning',
              text: 'Location name already exists',
              position: 'top-end',
              showConfirmButton: false,
              timer: 1500,
              customClass: {
                popup: 'alert-warp',
                container: 'alert-container',
              },
            });
          }
          else if (data.Success == false && data.Message == "Location name and pincode already exists") {
            debugger
            Swal.fire({
              type: 'warning',
              title: 'warning',
              text: 'Location name and pincode already exists',
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
        });
    }

    else {
      this.commonService.data.LocMaster.ParentDescription = this.A_Loc;
      this.commonService.data.LocMaster.Pincode = this.A_PIN;
      this.commonService.data.LocMaster.ParentID = this.C_district.ID;
      this.commonService.data.LocMaster.CreatedBy = this.docotorid;

      this.commonService.postData('Location/Insertlocation', this.commonService.data)
        .subscribe(data => {
          if (data.Success == true) {
            debugger;
            this.commonService.getListOfData('Location/Getlocation/' + this.C_district.ID).subscribe(data => {
              debugger;
              this.locations = data.location;
            });

            this.commonService.getListOfData('Location/Getfulllocation/' + this.C_country.ID).subscribe(data => {
              debugger;
              this.commonService.data.loactiondetails = [];
              this.commonService.data.loactiondetails = data;
              this.selection.selected.length = 0
              this.dataSourcesq.data = this.commonService.data.loactiondetails;
              this.dataSourcesq.sort = this.sort;
            });

            Swal.fire({
              type: 'success',
              title: 'success',
              text: "Saved Successfully",
              position: 'top-end',
              showConfirmButton: false,
              timer: 1500,
              customClass: {
                popup: 'alert-warp',
                container: 'alert-container',
              },
            });

            this.A_Loc = "";
            this.A_PIN = "";
            this.hiddenUpdate = false;
            this.hiddenSubmit = true;
          }

          else if (data.Success == false && data.Message == "Location name already exists") {
            debugger
            Swal.fire({
              type: 'warning',
              title: 'warning',
              text: 'Location name already exists',
              position: 'top-end',
              showConfirmButton: false,
              timer: 1500,
              customClass: {
                popup: 'alert-warp',
                container: 'alert-container',
              },
            });
          }

          else if (data.Success == false && data.Message == "Location name and pincode already exists") {
            debugger
            Swal.fire({
              type: 'warning',
              title: 'warning',
              text: 'Location name and pincode already exists',
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

        });
    }


  }

  updatecity() {
    debugger;

    if (this.M_city == undefined) {

      Swal.fire({
        type: 'warning',
        title: 'warning',
        text: 'Enter the city name',
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

    if (this.M_city == "") {
      Swal.fire({
        type: 'warning',
        title: 'warning',
        text: 'Enter the city name',
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

    this.commonService.data.LocMaster = new LocationMaster();


    this.commonService.data.LocMaster.ParentDescription = this.M_city;
    this.commonService.data.LocMaster.ParentID = this.C_state.ID;
    this.commonService.data.LocMaster.UpdatedBy = this.docotorid;

    this.commonService.postData("Location/Updatecity/" + this.C_district.ID, this.commonService.data)

      .subscribe(data => {
        if (data.Success == true) {

          this.commonService.getListOfData('Location/GetCity/' + this.C_state.ID).subscribe(data => {
            debugger;
            this.Districts = data.City;
          });

          this.commonService.getListOfData('Location/Getfulllocation/' + this.C_country.ID).subscribe(data => {
            debugger;
            this.commonService.data.loactiondetails = [];
            this.commonService.data.loactiondetails = data;
            this.selection.selected.length = 0
            this.dataSourcesq.data = this.commonService.data.loactiondetails;
            this.dataSourcesq.sort = this.sort;
          });


          Swal.fire({
            type: 'success',
            title: 'success',
            text: "Saved Successfully",
            position: 'top-end',
            showConfirmButton: false,
            timer: 1500,
            customClass: {
              popup: 'alert-warp',
              container: 'alert-container',
            },
          });


          this.M_city = "";
          this.C_location = undefined;
          this.C_district = undefined;
          this.locationdisable = true;
          this.hiddenUpdate = false;
          this.hiddenSubmit = true;

        }
        else if (data.Success == false && data.Message == "City name already exists") {
          debugger
          Swal.fire({
            type: 'warning',
            title: 'warning',
            text: 'City name already exists',
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
      });

  }

  updatestate() {
    debugger;

    if (this.M_State == undefined) {

      Swal.fire({
        type: 'warning',
        title: 'warning',
        text: 'Enter the State name',
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


    if (this.M_State == "") {

      Swal.fire({
        type: 'warning',
        title: 'warning',
        text: 'Enter the State name',
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

    this.commonService.data.LocMaster = new LocationMaster();


    this.commonService.data.LocMaster.ParentDescription = this.M_State;
    this.commonService.data.LocMaster.ParentID = this.C_country.ID;
    this.commonService.data.LocMaster.UpdatedBy = this.docotorid;


    this.commonService.postData("Location/UpdateState/" + this.C_state.ID, this.commonService.data)

      .subscribe(data => {
        if (data.Success == true) {

          this.commonService.getListOfData('Location/GetState/' + this.C_country.ID).subscribe(data => {
            debugger;
            this.statee = data.State;
          });

          this.commonService.getListOfData('Location/Getfulllocation/' + this.C_country.ID).subscribe(data => {
            debugger;

            this.commonService.data.loactiondetails = [];
            this.commonService.data.loactiondetails = data;
            this.selection.selected.length = 0
            this.dataSourcesq.data = this.commonService.data.loactiondetails;
            this.dataSourcesq.sort = this.sort;
          });


          Swal.fire({
            type: 'success',
            title: 'success',
            text: "Saved Successfully",
            position: 'top-end',
            showConfirmButton: false,
            timer: 1500,
            customClass: {
              popup: 'alert-warp',
              container: 'alert-container',
            },
          });

          this.M_State = "";
          this.C_location = undefined;
          this.C_district = undefined;
          this.C_state = undefined;
          this.locationdisable = true;
          this.citydisable = true;
          this.hiddenUpdate = false;
          this.hiddenSubmit = true;

        }
        else if (data.Success == false && data.Message == "State name already Exists") {
          debugger
          Swal.fire({
            type: 'warning',
            title: 'warning',
            text: 'State name already exists',
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

      });



  }

  updatecountry() {
    debugger;

    if (this.M_Country == undefined) {

      Swal.fire({
        type: 'warning',
        title: 'warning',
        text: 'Enter the Country name',
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

    if (this.M_Country == "") {
      Swal.fire({
        type: 'warning',
        title: 'warning',
        text: 'Enter the Country name',
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

    this.commonService.data.LocMaster = new LocationMaster();

    this.commonService.data.LocMaster.ParentDescription = this.M_Country;
    this.commonService.data.LocMaster.UpdatedBy = this.docotorid;



    this.commonService.postData("Location/UpdateCountry/" + this.C_country.ID, this.commonService.data)
      .subscribe(data => {
        if (data.Success == true) {

          this.commonService.getListOfData('Location/Getcountry').subscribe(data => {
            debugger;
            this.country = data.Country;
            this.CID = data.CID;
          });

          Swal.fire({
            type: 'success',
            title: 'success',
            text: "Saved Successfully",
            position: 'top-end',
            showConfirmButton: false,
            timer: 1500,
            customClass: {
              popup: 'alert-warp',
              container: 'alert-container',
            },
          });

          this.M_Country = "";
          this.C_location = undefined;
          this.C_district = undefined;
          this.C_state = undefined;
          this.C_country = undefined;
          this.locationdisable = true;
          this.citydisable = true;
          this.statedisable = true;
          this.hiddenUpdate = false;
          this.hiddenSubmit = true;
          this.tablelocation = false;

        }
        else if (data.Success == false && data.Message == "Country name already Exists") {
          debugger
          Swal.fire({
            position: 'center',
            type: 'warning',
            title: 'Country name already Exists',
            showConfirmButton: false,
            timer: 2000
          });

          Swal.fire({
            type: 'warning',
            title: 'warning',
            text: 'State name already exists',
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

      });



  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourcesq.filter = filterValue.trim().toLowerCase();
  }



  removelocation(id, element) {
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

      debugger;
      if (result.value) {
        if (id !== -1) {
          this.dataSourcesq.data.splice(id, 1);
          this.dataSourcesq._updateChangeSubscription();
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
          this.commonService.postData("Location/DeleteLocation/" + element.LoactionID, this.commonService.data).subscribe(result => {
            this.commonService.getListOfData('Location/Getfulllocation/' + this.C_country.ID).subscribe(data => {
              debugger;
              this.commonService.data.loactiondetails = [];
              this.commonService.data.loactiondetails = data;
              this.selection.selected.length = 0
              this.dataSourcesq.data = this.commonService.data.loactiondetails;
              this.dataSourcesq.sort = this.sort;
            });
          })
        }

      }

      else {
        Swal.fire({
          type: 'warning',
          title: 'warning',
          text: 'Location has not been deleted',
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

  RestrictNegativeValues(e): boolean {
    if (!(e.keyCode >= 48 && e.keyCode <= 57)) {
      return false;
    }
  }












  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
}


