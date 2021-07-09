import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import Swal from 'sweetalert2'
import { VendorMasters } from '../../Models/ViewModels/VendorMasterWebModel';
import { CommonService } from '../../shared/common.service';
import { AppComponent } from '../../app.component';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef, DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material';
import { SearchComponent } from '../search/search.component';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { Router } from '@angular/router';

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
  selector: 'app-vendor-master',
  templateUrl: './vendor-master.component.html',
  styleUrls: ['./vendor-master.component.less'],
  providers: [

    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },

  ],
})
export class VendorMasterComponent implements OnInit {

  disableSearch: boolean = false;
  DLDateMAX = new Date();
  DLDateMAX1 = new Date();
 

  date = new FormControl(new Date());
  serializedDate = new FormControl((new Date()).toISOString());

  DisabledREV: boolean;



  @ViewChild('VendorMasterForm') Form: NgForm
  M_VendorID;
  M_VendorCode;
  M_Name;
  M_Address1;
  M_Address2;
  M_Address3;
  M_location;
  M_DLNO;
  M_DLNO1;
  M_DLNODate;
  M_DLNODate1;
  M_LandMark;
  M_FSSAINO;
  M_GSTNo;
  M_Mobile;
  M_Phone;
  M_ContactPerson;
  M_Creditdays;
  M_Creditlimit;
  M_Leadtime;
  M_IsActive;
  M_VendorCategory;
  isInvalid = false;
  hiddenUpdate = false;
  hiddenSubmit = true;
  hiddenDelete = false;
  hiddenVendorID = true;
  hiddenisActive = false;
  Deleteblock;
  backdrop;
  cancelblock;
  Disableonsearch = true;
  DisableUpdate = true;
  DisableonSubmit = true;
  DisableDelete = true;

  constructor(public commonService: CommonService<VendorMasters>,
    public el: ElementRef,

    private router: Router,
    public appComponent: AppComponent,
    public dialog: MatDialog, ) { }
  accessdata;
  cmpid;
  docotorid;
  ngOnInit() {
    this.cmpid = localStorage.getItem("CompanyID");
    this.docotorid = localStorage.getItem('userroleID');
    //////////////////////////////////////////////////////////////////////////////////
 
    var Pathname = "Inventorylazy/Vendormaster";
    var n = Pathname;
    var sstring = n.includes("/");
    var Objdata = JSON.parse(localStorage.getItem("AllCollectionData"));

    if (sstring == false) {
      if (Objdata.find(el => el.Parentmoduledescription === Pathname)) {


        this.commonService.getListOfData('Common/GetAccessdetails/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem("userroleID") + '/' + Pathname).subscribe(data => {
          this.commonService.data = data;
          debugger;
          this.accessdata = data.GetAvccessDetails;
          if (this.accessdata.find(x => x.Add == true)) {
            this.DisableonSubmit = false;

          } else {
            this.DisableonSubmit = true;

          }
          if (this.accessdata.find(x => x.Edit == true)) {
            this.DisableUpdate = false;
            this.Disableonsearch = false;

          } else {
            this.DisableUpdate = true;
            this.Disableonsearch = true;

          }
          //if (this.accessdata.find(x => x.Print == true)) {

          //} else {

          //}
          if (this.accessdata.find(x => x.Delete == true)) {
            this.DisableDelete = false;
          } else {
            this.DisableDelete = true;
          }
        });

        //////////////////////////////////////////////////////////////////////////////



        this.M_IsActive = "true";
        localStorage.getItem("CompanyID");
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
            this.DisableonSubmit = false;

          } else {
            this.DisableonSubmit = true;

          }
          if (this.accessdata.find(x => x.Edit == true)) {
            this.DisableUpdate = false;
            this.Disableonsearch = false;

          } else {
            this.DisableUpdate = true;
            this.Disableonsearch = true;

          }
          //if (this.accessdata.find(x => x.Print == true)) {

          //} else {

          //}
          if (this.accessdata.find(x => x.Delete == true)) {
            this.DisableDelete = false;
          } else {
            this.DisableDelete = true;
          }
        });

        //////////////////////////////////////////////////////////////////////////////
        this.M_IsActive = "true";
        localStorage.getItem("CompanyID");
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
        this.commonService.getListOfData('Common/Getlogdetails/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem("Doctorname") + '/' + Pathname).subscribe(data => {
          this.router.navigate(['dash']);
        });
      }
    }
/////////////////////////////////////////////////////////////////////////////////////



  }
  Cityname;
  Cityy;
  State;
  Country;
  disableLOC;
  Locationname;
  getAllDropdowns() {
    this.commonService.getListOfData('Common/Getlocationcityvalues').subscribe(data => { this.Cityname = data; });
  }


  Citysumbit()
  {
    debugger;
    this.commonService.getListOfData('VendorMaster/GetlocationDetails/' + this.Cityy + '/')
      .subscribe((data: any) => {
        debugger;

        this.State = data.ParentDescriptionstate;
        this.Country = data.ParentDescriptioncountry;
        if (this.State != null) {
          this.disableLOC = false;
        }
        else {
          this.disableLOC = true;
        }
      });

      this.commonService.getListOfData('Common/Getlocationvalues/' + this.Cityy).subscribe(data => {
        debugger;
        this.Locationname = data;
      });

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
  onSubmit(form: NgForm) {
    debugger;
    try {
      if (form.valid) {
        this.isInvalid = false;
        this.commonService.data = new VendorMasters();
        this.commonService.data.VendorMasters.VendorCode = this.M_VendorCode;
        this.commonService.data.VendorMasters.VendorCategory = this.M_VendorCategory;
        this.commonService.data.VendorMasters.Name = this.M_Name;
        this.commonService.data.VendorMasters.Address1 = this.M_Address1;
        this.commonService.data.VendorMasters.Address2 = this.M_Address2;
        this.commonService.data.VendorMasters.Address3 = this.M_Address3;
        this.commonService.data.VendorMasters.Location = this.M_location;
        this.commonService.data.VendorMasters.DLNo = this.M_DLNO;
        this.commonService.data.VendorMasters.DLNo1 = this.M_DLNO1;
        this.commonService.data.VendorMasters.DLNoDate = this.M_DLNODate;
        this.commonService.data.VendorMasters.DLNoDate1 = this.M_DLNODate1;
        this.commonService.data.VendorMasters.Landmark = this.M_LandMark;
        this.commonService.data.VendorMasters.FSSAINo = this.M_FSSAINO;
        this.commonService.data.VendorMasters.GSTNo = this.M_GSTNo;
        this.commonService.data.VendorMasters.MobileNo = this.M_Mobile;
        this.commonService.data.VendorMasters.PhoneNo = this.M_Phone;
        this.commonService.data.VendorMasters.ContactPerson = this.M_ContactPerson;
        this.commonService.data.VendorMasters.Creditdays = this.M_Creditdays;
        this.commonService.data.VendorMasters.Creditlimit = this.M_Creditlimit;
        this.commonService.data.VendorMasters.Leadtime = this.M_Leadtime;
        this.commonService.data.VendorMasters.CmpID = parseInt(localStorage.getItem("CompanyID"));
        this.commonService.data.VendorMasters.CreatedBy = parseInt(localStorage.getItem("userDoctorID"));
        this.commonService.postData('VendorMaster/InsertVendorMas', this.commonService.data)
          .subscribe(data => {
            if (data.Success == true) {
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
            this.Form.onReset();


          });
      }
    }
    catch (Error) {
      alert(Error.message);

      this.commonService.getListOfData('Common/ErrorList/' + Error.message + '/' + "Vendor Master Submit " + '/' + this.cmpid + '/' + this.docotorid + '/')
        .subscribe(data => {
          debugger;

        });
    }
    }

  Updateclk(form: NgForm, M_VendorID)
  {
    debugger;
    try {
      if (form.valid) {
        this.isInvalid = false;
        this.commonService.data = new VendorMasters();
        this.commonService.data.VendorMasters.VendorCode = this.M_VendorCode;
        this.commonService.data.VendorMasters.VendorCategory = this.M_VendorCategory;
        this.commonService.data.VendorMasters.Name = this.M_Name;
        this.commonService.data.VendorMasters.Address1 = this.M_Address1;
        this.commonService.data.VendorMasters.Address2 = this.M_Address2;
        this.commonService.data.VendorMasters.Address3 = this.M_Address3;
        this.commonService.data.VendorMasters.Location = this.M_location;
        this.commonService.data.VendorMasters.DLNo = this.M_DLNO;
        this.commonService.data.VendorMasters.DLNo1 = this.M_DLNO1;
        this.commonService.data.VendorMasters.DLNoDate = this.M_DLNODate;
        this.commonService.data.VendorMasters.DLNoDate1 = this.M_DLNODate1;
        this.commonService.data.VendorMasters.Landmark = this.M_LandMark;
        this.commonService.data.VendorMasters.FSSAINo = this.M_FSSAINO;
        this.commonService.data.VendorMasters.GSTNo = this.M_GSTNo;
        this.commonService.data.VendorMasters.MobileNo = this.M_Mobile;
        this.commonService.data.VendorMasters.PhoneNo = this.M_Phone;
        this.commonService.data.VendorMasters.ContactPerson = this.M_ContactPerson;
        this.commonService.data.VendorMasters.Creditdays = this.M_Creditdays;
        this.commonService.data.VendorMasters.Creditlimit = this.M_Creditlimit;
        this.commonService.data.VendorMasters.Leadtime = this.M_Leadtime;
        this.commonService.data.VendorMasters.IsActive = this.M_IsActive;
        this.commonService.data.VendorMasters.UpdatedBy = parseInt(localStorage.getItem("userDoctorID"));
        this.commonService.postData("VendorMaster/UpdateVendorMas/" + M_VendorID, this.commonService.data)

          .subscribe(data => {
            if (data.Success == true) {
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
            this.Form.onReset();
            this.hiddenDelete = false;
            this.hiddenSubmit = true;
            this.hiddenUpdate = false;
            this.hiddenisActive = false;
          });
      }
    }
    catch (Error) {
      alert(Error.message);

      this.commonService.getListOfData('Common/ErrorList/' + Error.message + '/' + "Vendor Master Update " + '/' + this.cmpid + '/' + this.docotorid + '/')
        .subscribe(data => {
          debugger;

        });
    }
  }


  


  Clicksch() {
    localStorage.setItem('helpname', 'Vendor');
    const dialogRef = this.dialog.open(SearchComponent, {
      height: '70%',
      width: '85%',
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result.success) {
        debugger;
        let item = result.data;
        this.M_VendorID = item.ID
        this.M_VendorCode = item.VendorCode
        if (item.VendorCategory == "Drug")
        {
          this.M_VendorCategory = "1";
        }
        else if (item.VendorCategory == "Optical") {
          this.M_VendorCategory = "2";
        }
        else if (item.VendorCategory == "Both") {
          this.M_VendorCategory ="3";
        }
        this.M_Name = item.Name
        this.M_Address1 = item.Address1
        this.M_Address2 = item.Address2
        this.M_Address3 = item.Address3
        this.Cityy = item.City

        this.commonService.getListOfData('VendorMaster/GetlocationDetails/' + this.Cityy + '/')
          .subscribe((data: any) => {
            debugger;

            this.State = data.ParentDescriptionstate;
            this.Country = data.ParentDescriptioncountry;
            if (this.State != null) {
              this.disableLOC = false;
            }
            else {
              this.disableLOC = true;
            }
          });

        this.commonService.getListOfData('Common/Getlocationvalues/' + this.Cityy).subscribe(data => {
          debugger;
          this.Locationname = data;
       

        if (item.LocationID != null) {
          let LocationID = this.Locationname.find(x => x.Text == item.LocationID)
          this.M_location = LocationID.Value
        }
        else {
          this.M_location = '';
        }
        });
        this.M_DLNO = item.DLNo
        this.M_DLNO1 = item.DLNo1
        this.M_DLNODate = item.DLNoDate
        this.M_DLNODate1 = item.DLNoDate1
        this.M_LandMark = item.Landmark
        this.M_FSSAINO = item.FSSAINo
        this.M_GSTNo = item.GSTNo
        this.M_Mobile = item.MobileNo
        this.M_Phone = item.PhoneNo
        this.M_ContactPerson = item.ContactPerson
        this.M_Creditdays = item.CreditDays
        this.M_Creditlimit = item.Creditlimit
        this.M_Leadtime = item.Leadtime
        this.M_IsActive = item.IsActive.toString();


        if (item.IsActive == "Yes") {
          this.M_IsActive = "true";
        }
        else  {
          this.M_IsActive = "false";
        }






      }
      this.hiddenDelete = true;
      this.hiddenSubmit = false;
      this.hiddenUpdate = true;
      this.hiddenisActive = true;

      if (!result.success) {
        this.hiddenDelete = false;
        this.hiddenSubmit = true;
        this.hiddenUpdate = false;
        this.hiddenisActive = false;
      }
    });
  }

  //<----*Cancel Popup*---->


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
    this.hiddenDelete = false;
    this.hiddenSubmit = true;
    this.hiddenUpdate = false;
    this.hiddenisActive = false;
    this.Form.onReset();
    this.backdrop = 'none';
    this.cancelblock = 'none';
  }
  //<----*Delete Popup*---->

  Deleteclk(form: NgForm, M_VendorID) {
    this.commonService.data = new VendorMasters();
    debugger;

    try {
      if (form.valid) {
        Swal.fire({
          title: 'Are you sure?',
          text: "Want to delete Vendor",
          type: 'warning',
          showCancelButton: true,
          cancelButtonColor: '#3085d6',
          cancelButtonText: 'Yes',
          allowOutsideClick: false,
          confirmButtonColor: '#d33',
          confirmButtonText: 'No'
        }).then((result) => {

          debugger;
          if (result.value) {
            Swal.fire(
              'Cancelled',
              'Vendor has not been deleted'
            )
          }

          else {
            this.commonService.postData("VendorMaster/DeleteVendorMas/" + M_VendorID, this.commonService.data).subscribe(result => { })
            Swal.fire(
              'Deleted!',
              'Vendor has been deleted.',
              'success'
            )

          }
          this.Form.onReset();
          this.hiddenDelete = false;
          this.hiddenSubmit = true;
          this.hiddenUpdate = false;
          this.hiddenisActive = false;
          this.Deleteblock = 'none';
        })
      }
    }
    catch (Error) {
      alert(Error.message);

      this.commonService.getListOfData('Common/ErrorList/' + Error.message + '/' + "Vendor Master Delete " + '/' + this.cmpid + '/' + this.docotorid + '/')
        .subscribe(data => {
          debugger;

        });
    }
  }
  modalDeleteNo() {
    this.backdrop = 'none';
    this.Deleteblock = 'none';
  }
  modalDeleteClose() {
    debugger;
    this.backdrop = 'none';
    this.Deleteblock = 'none';
  }




  CancelClk() {
    debugger;
    if (this.M_VendorID != null || this.M_VendorCode != null || this.M_Name != null || this.M_Address1 != null
      || this.M_Address2 != null || this.M_Address3 != null ||
      this.M_location != null || this.M_DLNO != null ||
      this.M_DLNO1 != null || this.M_DLNODate != null ||
      this.M_DLNODate1 != null || this.M_LandMark != null ||
      this.M_FSSAINO != null || this.M_GSTNo != null || this.M_Mobile != null ||
      this.M_Phone != null || this.M_ContactPerson != null || this.M_Creditdays != null ||
      this.M_Creditlimit != null || this.M_Leadtime != null || this.M_IsActive != null) {
      this.backdrop = 'block';
      this.cancelblock = 'block';
    }
    else {
      this.Form.onReset();
    }
  }
  accesspopup;

  Getformaccess() {
    debugger;
    var Pathname = "Inventorylazy/Vendormaster";
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
  ///////////////////////////////////////////////////////////////////////////////////
}
