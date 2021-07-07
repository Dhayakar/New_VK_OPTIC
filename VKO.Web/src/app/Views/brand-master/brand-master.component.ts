import { Component, OnInit, ElementRef, ViewChild, Inject } from '@angular/core';
import { AppComponent } from '../../app.component';
import { DatePipe } from '@angular/common';
import { CommonService } from '../../shared/common.service';
import { NgForm, FormGroup, FormBuilder } from '@angular/forms';
import * as _moment from 'moment';
import * as _rollupMoment from 'moment';
const moment = _rollupMoment || _moment;
import { Refraction } from 'src/app/Models/Refractionmaster.model';
import { FormControl } from '@angular/forms';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import * as _l from 'lodash';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';
import { MatSort, MatTableDataSource, MatPaginator, MatDialogConfig, MatCheckbox } from '@angular/material'
import { BrandViewmodel } from '../../Models/ViewModels/BrandViewmodel';
import { Brand } from '../../Models/Brand.model';


@Component({
  selector: 'app-brand-master',
  templateUrl: './brand-master.component.html',
  styleUrls: ['./brand-master.component.less']
})
export class BrandMasterComponent implements OnInit {

  docotorid;
  hiddenUpdate = false;
  hiddenSubmit = true;
  isInvalid = false;
  tablebrand = false;
  Activeis = false;

  M_SelectedType;
  M_Description;
  IsActive;

  displayedColumnssq = ['Action', 'Description', 'LensType', 'IsActive'];
  dataSourcesq = new MatTableDataSource();

  @ViewChild('BrandMaster') Form: NgForm

  constructor(public commonService: CommonService<BrandViewmodel>,
    public datepipe: DatePipe, public el: ElementRef,
    public appComponent: AppComponent,
    private formBuilder: FormBuilder,
    private router: Router,) {
  }


  disSubmit: boolean = true;
  disupdate: boolean = true;
  disdelete: boolean = true;

  cmpid;
  ngOnInit() {

    var Pathname = "Opticalslazy/Brandmaster";
    var Objdata = JSON.parse(localStorage.getItem("AllCollectionData"));
    var n = Pathname;
    var sstring = n.includes("/");
    if (sstring == false) {

      if (Objdata.find(el => el.Parentmoduledescription === Pathname)) {

        this.commonService.getListOfData('Common/GetAccessdetails/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem("userroleID") + '/' + Pathname).subscribe(data => {
          this.commonService.data = data;
          debugger;
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

          if (this.accessdata.find(x => x.Delete == true)) {
            this.disdelete = false;
          } else {
            this.disdelete = true;
          }
        });

        this.docotorid = localStorage.getItem('userroleID');
        this.cmpid = localStorage.getItem("CompanyID");
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
          this.commonService.data = data;
          debugger;
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

          if (this.accessdata.find(x => x.Delete == true)) {
            this.disdelete = false;
          } else {
            this.disdelete = true;
          }
        });
        this.docotorid = localStorage.getItem('userroleID');
        this.cmpid = localStorage.getItem("CompanyID");
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





  onSubmit(form: NgForm) {

    debugger;

    if (form.valid) {
      this.isInvalid = false;

      this.commonService.data.Brand = new Brand();
      this.commonService.data.Brand.Description = this.M_Description;
      this.commonService.data.Brand.BrandType = this.M_SelectedType;
      this.commonService.data.Brand.CreatedBy = this.docotorid;
      this.commonService.data.Brand.cmpID = this.cmpid;

      this.commonService.postData('BrandMaster/Insertbrand', this.commonService.data)

        .subscribe(data => {
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

            this.hiddenUpdate = false;
            this.hiddenSubmit = true;
            this.Form.onReset();
          }

          else {

          }

        });
    }
  }


  cancelblock;
  backdrop;
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
    this.hiddenSubmit = true;
    this.hiddenUpdate = false;
    this.tablebrand = false;
    this.hiddenDeleted = false;
    this.Activeis = false;
    this.Form.onReset();
    this.backdrop = 'none';
    this.cancelblock = 'none';
  }


  CancelClk() {
    debugger;

    if (this.M_Description != null || this.M_SelectedType != null) {

      this.backdrop = 'block';
      this.cancelblock = 'block';
    }
    else {
      this.Form.onReset();

    }
  }



  ClickBrand() {
    debugger;
    this.commonService.getListOfData('BrandMaster/Fullbrandlist/' + this.cmpid + '/').subscribe(data => {
      debugger;
      this.dataSourcesq.data = data.Brandfull;
      this.tablebrand = true;
    });

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourcesq.filter = filterValue.trim().toLowerCase();
  }

  ID;
  selecttype(item) {
    debugger;
    this.M_SelectedType = item.BrandType;
    this.M_Description = item.Description;
    this.IsActive = item.IsActive.toString();
    this.ID = item.ID;
    this.Activeis = true;
    this.tablebrand = false;
    this.hiddenSubmit = false;
    this.hiddenUpdate = true;
    this.hiddenDeleted = true;
  }


  onupdate(form: NgForm) {
    debugger;

    if (form.valid) {
      this.isInvalid = false;

      this.commonService.data.Brand = new Brand();

      this.commonService.data.Brand.Description = this.M_Description;
      this.commonService.data.Brand.BrandType = this.M_SelectedType;
      this.commonService.data.Brand.UpdatedBy = this.docotorid;
      this.commonService.data.Brand.IsActive = this.IsActive;

      this.commonService.postData("BrandMaster/updatebrand/" + this.ID, this.commonService.data)
        .subscribe(data => {

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
            this.hiddenUpdate = false;
            this.hiddenDeleted = false;
            this.hiddenSubmit = true;
            this.Activeis = false;
            this.Form.onReset();
          }
          else {

          }

        });
    }
  }



  accesspopup;
  accessdata;
  modalcloseAccessOk() {
    this.backdrop = 'none';
    this.accesspopup = 'none';
  }

  Getformaccess() {
    debugger;
    var Pathname = "Opticalslazy/Brandmaster";
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

  hiddenDeleted = false;
  onDeleteBrand() {

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
        this.commonService.postData("BrandMaster/Deletebrand/" + this.ID, this.commonService.data).subscribe(result => { });
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
        this.hiddenUpdate = false;
        this.hiddenDeleted = false;
        this.hiddenSubmit = true;
        this.Activeis = false;
        this.Form.onReset();
      }
      else {
        Swal.fire({
          type: 'warning',
          title: 'warning',
          text: 'Brand not deleted',
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



  ////////////////////////////////////////////////////////////////////////////////////
}
