import { Component, OnInit, ElementRef, ViewChild, Inject } from '@angular/core';
import { AppComponent } from '../../app.component';
import { DatePipe } from '@angular/common';
import { CommonService } from '../../shared/common.service';
import { NgForm, FormGroup, FormBuilder } from '@angular/forms';
import { StoreMasters } from '../../Models/ViewModels/StoreMastersweb.model';
import Swal from 'sweetalert2';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef, DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material';
import { SearchComponent } from '../search/search.component';
import { Router } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-storemaster',
  templateUrl: './storemaster.component.html',
  styleUrls: ['./storemaster.component.less']
})
export class StoremasterComponent implements OnInit {

  doctorname;
  docotorid;

  @ViewChild('StoreMasterForm') Form: NgForm
  @ViewChild('DeptStoreMasterForm') deptForm: NgForm


  constructor(public commonService: CommonService<StoreMasters>, public datepipe: DatePipe, public el: ElementRef, public appComponent: AppComponent, private formBuilder: FormBuilder, public dialog: MatDialog, private router: Router,) {

  }
  hideactivetable: boolean = false;
  CanceldeptClk(deptForm: NgForm) {
    this.deptForm.reset();
    this.hideactive = false;
    this.hideactivetable = false;
    this.hidesubmit = true;
    this.hideupdate = false;
  }

  accessdata;
  disSubmit: boolean = true;
  disupdate: boolean = true;
  disdelete: boolean = true;

  ngOnInit() {

    var Pathname = "Inventorylazy/Storemaster";
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
        this.IsActive = "true";
        localStorage.getItem("CompanyID");
        this.doctorname = localStorage.getItem('Doctorname');
        this.docotorid = localStorage.getItem('userroleID');
        this.commonService.getListOfData('Common/Getstorecatgtypes/' + localStorage.getItem("CompanyID")).subscribe(data => {
          this.getcatgtypes = data;
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
        this.IsActive = "true";
        localStorage.getItem("CompanyID");
        this.doctorname = localStorage.getItem('Doctorname');
        this.docotorid = localStorage.getItem('userroleID');
        this.commonService.getListOfData('Common/Getstorecatgtypes/' + localStorage.getItem("CompanyID")).subscribe(data => {
          this.getcatgtypes = data;

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



  M_Store;
  M_Location;
  M_Keeper;
  M_Address1;
  M_Address2;
  M_StoreID;
  IsActive;
  isInvalid = false;
  hiddenStoreID = true;
  hiddenUpdate = false;
  hiddenDelete = false;
  hiddenSubmit = true;

  Activeis = false;

  backdrop;
  cancelblock;
  Deleteblock;


  nameField(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if ((charCode > 64 && charCode < 91) || (charCode > 96 && charCode < 123) || charCode == 32 || charCode == 46 || charCode == 9 || (charCode > 34 && charCode < 41) || charCode == 8) {
      return true;
    }
    return false;
  }


  M_CatCode;
  onSubmitStoremas(form: NgForm) {

    debugger;

    if (form.valid) {
      this.isInvalid = false;

      this.commonService.data = new StoreMasters();
      this.commonService.data.Storemaster.Storename = this.M_Store;
      this.commonService.data.Storemaster.StoreLocation = this.M_Location;
      this.commonService.data.Storemaster.StoreKeeper = this.M_Keeper;
      this.commonService.data.Storemaster.Address1 = this.M_Address1;
      this.commonService.data.Storemaster.Address2 = this.M_Address2;
      this.commonService.data.Storemaster.CatgType = this.M_CatCode;
      this.commonService.data.Storemaster.CmpID = parseInt(localStorage.getItem("CompanyID"));

      this.commonService.data.Storemaster.CreatedBy = this.docotorid;

      this.commonService.postData('Storemaster/InsertStoreMas', this.commonService.data)

        .subscribe(data => {
          if (data.Success == true) {
            Swal.fire({
              type: 'success',
              title: 'Data Saved successfully',
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
              title: 'Invalid Input,Please Contact Administrator',
              position: 'top-end',
              showConfirmButton: false,
              timer: 1500,
              customClass: {
                popup: 'alert-warp',
                container: 'alert-container',
              },
            });
          }



          this.Form.onReset();


        });
    }
  }


  Updateclk(form: NgForm, M_StoreID) {
    debugger;


    if (form.valid) {
      this.isInvalid = false;
      this.commonService.data = new StoreMasters();

      this.commonService.data.Storemaster.Storename = this.M_Store;
      this.commonService.data.Storemaster.StoreLocation = this.M_Location;
      this.commonService.data.Storemaster.StoreKeeper = this.M_Keeper;
      this.commonService.data.Storemaster.Address1 = this.M_Address1;
      this.commonService.data.Storemaster.Address2 = this.M_Address2;
      this.commonService.data.Storemaster.CatgType = this.M_CatCode;
      this.commonService.data.Storemaster.IsActive = this.IsActive;
      this.commonService.data.Storemaster.UpdatedBy = this.docotorid;
      this.commonService.postData("Storemaster/UpdateStoreMas/" + M_StoreID, this.commonService.data)

        .subscribe(data => {
          if (data.Success == true) {

            Swal.fire({
              type: 'success',
              title: 'Data Saved successfully',
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
              title: 'Invalid Input,Please Contact Administrator',
              position: 'top-end',
              showConfirmButton: false,
              timer: 1500,
              customClass: {
                popup: 'alert-warp',
                container: 'alert-container',
              },
            });
          }
          this.Form.onReset();
          this.hiddenDelete = false;
          this.hiddenSubmit = true;
          this.hiddenUpdate = false;
          this.Activeis = false;
        });
    }
  }


  Clickstore() {
    debugger;
    localStorage.setItem('helpname', 'Store');
    const dialogRef = this.dialog.open(SearchComponent, {
      height: '70%',
      width: '85%',
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result.success) {
        debugger;
        let item = result.data;
        this.M_StoreID = item.StoreID;
        this.M_Store = item.Storename;
        this.M_Location = item.StoreLocation;
        this.M_Keeper = item.StoreKeeper;
        this.M_Address1 = item.Address1;
        this.M_Address2 = item.Address2;

        if (item.Catgtype != null) {
          let tempEngage = this.getcatgtypes.find(x => x.Value == item.Catgtype)
          this.M_CatCode = tempEngage.Value;
        }

        this.IsActive = item.IsActive == "Yes" ? "true" : "false";

      }
      this.hiddenDelete = true;
      this.hiddenSubmit = false;
      this.hiddenUpdate = true;
      this.Activeis = true;

      if (!result.success) {
        this.hiddenDelete = false;
        this.hiddenSubmit = true;
        this.hiddenUpdate = false;
        this.Activeis = false;
        this.Form.onReset();
      }
    });
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
    this.hiddenDelete = false;
    this.hiddenSubmit = true;
    this.hiddenUpdate = false;
    this.Form.onReset();
    this.Activeis = false;
    this.backdrop = 'none';
    this.cancelblock = 'none';
  }




  Deleteclk(form: NgForm, M_StoreID) {
    this.commonService.data = new StoreMasters();
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
        this.commonService.postData("Storemaster/DeleteStoreMas/" + M_StoreID, this.commonService.data).subscribe(result => { })
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
          text: 'Store has not been deleted',
          position: 'top-end',
          showConfirmButton: false,
          timer: 1500,
          customClass: {
            popup: 'alert-warp',
            container: 'alert-container',
          },
        });
      }
      this.Form.onReset();
      this.hiddenDelete = false;
      this.hiddenSubmit = true;
      this.hiddenUpdate = false;
      this.Activeis = false;
      this.Deleteblock = 'none';
    })
  }




  CancelClk() {
    debugger;
    if (this.M_Store != null || this.M_Location != null || this.M_Keeper != null || this.M_Address1 != null || this.M_Address2) {
      this.backdrop = 'block';
      this.cancelblock = 'block';
    }
  }

  accesspopup;
  modalcloseAccessOk() {
    this.backdrop = 'none';
    this.accesspopup = 'none';
  }
  Getformaccess() {
    debugger;
    var Pathname = "Inventorylazy/Storemaster";
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

  getcatgtypes;
  Departmentaccesspopup;
  Addcat() {
    this.Departmentaccesspopup = 'block';
    this.hidesubmit = true;
    this.hideupdate = false;
  }
  modalclosedeptAccessOk() {
    this.Departmentaccesspopup = 'none';
  }

  M_DeptKeeper;
  fulldata;
  hideactive: boolean = false;
  Clickdeptstore() {
    this.commonService.getListOfData('Common/Getstorecatgalltypes/' + localStorage.getItem("CompanyID")).subscribe(data => {
      this.fulldata = data;
      this.hideactivetable = true;
    });
  }
  hidesubmit: boolean = true;
  hideupdate: boolean = false;
  selectdescdata(data) {
    debugger;
    this.M_DeptKeeper = data.Text;

    if (data.status == true) {
      this.IsActive = "true";
    } else {
      this.IsActive = "false";
    }
    localStorage.setItem("SPECIOLMID", data.Value);
    this.hideupdate = true;
    this.hidesubmit = false;
    this.hideactive = true;
    this.hideactivetable = false;
  }

  onupdatedept(deptForm: NgForm) {
    if (deptForm.valid) {
      if (this.M_DeptKeeper != null && this.M_DeptKeeper != undefined && this.M_DeptKeeper != " ") {
        this.commonService.getListOfData('Storemaster/updatenelineStoreMas/' + this.M_DeptKeeper + '/' + this.IsActive + '/' + localStorage.getItem("SPECIOLMID") + '/' + this.docotorid).subscribe(data => {
          debugger;
          if (data.Success == true) {
            Swal.fire({
              type: 'success',
              title: 'success',
              text: 'Data Updated Successfully',
              position: 'top-end',
              showConfirmButton: false,
              timer: 1500,
              customClass: {
                popup: 'alert-warp',
                container: 'alert-container'
              },
            });
            deptForm.reset();
            this.hideactive = false;
            this.hidesubmit = true;
            this.hideupdate = false;
            this.commonService.getListOfData('Common/Getstorecatgtypes/' + localStorage.getItem("CompanyID")).subscribe(data => {
              this.getcatgtypes = data;
            });
          }
          else if (data.Success == false) {
            if (data.Message == "Department Already Exists") {
              Swal.fire({
                type: 'warning',
                title: 'warning',
                text: 'Department Already Exists',
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
      }
    }

  }

  onSubmitdept(deptForm: NgForm) {
    if (deptForm.valid) {
      if (this.M_DeptKeeper != null && this.M_DeptKeeper != undefined && this.M_DeptKeeper != " ") {
        this.commonService.getListOfData('Storemaster/saveonelineStoreMas/' + this.M_DeptKeeper + '/' + this.docotorid).subscribe(data => {
          debugger;
          if (data.Success == true) {
            Swal.fire({
              type: 'success',
              title: 'success',
              text: 'Data Saved Successfully',
              position: 'top-end',
              showConfirmButton: false,
              timer: 1500,
              customClass: {
                popup: 'alert-warp',
                container: 'alert-container'
              },
            });
            deptForm.reset();
            this.hideactive = false;
            this.commonService.getListOfData('Common/Getstorecatgtypes/' + localStorage.getItem("CompanyID")).subscribe(data => {
              this.getcatgtypes = data;
            });
          }

          else if (data.Success == false) {
            if (data.Message == "Department Already Exists") {
              Swal.fire({
                type: 'warning',
                title: 'warning',
                text: 'Department Already Exists',
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
      }
    }
  }





}
