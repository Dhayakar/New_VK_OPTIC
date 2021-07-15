import { Component, OnInit, ElementRef, ViewChild, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CommonService } from 'src/app/shared/common.service';
import { CustomerViewModel } from 'src/app/Models/ViewModels/CustomerViewModel';
import { Customer } from 'src/app/Models/Customer';
import Swal from 'sweetalert2'
import { SearchComponent } from '../search/search.component';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-customer-master',
  templateUrl: './customer-master.component.html',
  styleUrls: ['./customer-master.component.less']
})
export class CustomerMasterComponent implements OnInit {

  constructor(public commonService: CommonService<CustomerViewModel>, public el: ElementRef, public dialog: MatDialog, private router: Router) {
  }
  DisabledREV: boolean;

  M_UIN;
  M_Name;
  M_Address1;
  M_Address2;
  M_Address3;
  M_Location;
  M_GST;
  M_MobileNo;
  M_PhoneNo;
  M_ContactPerson;
  M_City;
  M_State;
  M_Country;
  M_CustomerID;

  Locationnames;
  SearchedUin: boolean = false;
  isInvalid: boolean = false;
  disableLOC = true;

  Cityname;
  isNextButton = true;
  isNextupdate = true;
  isNextDelete = true;

  ngOnInit() {
    var Pathname = "Opticalslazy/CustomerMaster";
    var n = Pathname;
    var sstring = n.includes("/");
    var Objdata = JSON.parse(localStorage.getItem("AllCollectionData"));
    if (sstring == false) {
      if (Objdata.find(el => el.Parentmoduledescription === Pathname)) {
        this.commonService.getListOfData('Common/Getlocationcityvalues').subscribe(data => { this.Cityname = data; });
        this.commonService.getListOfData('Common/GetAccessdetails/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem("userroleID") + '/' + Pathname).subscribe(data => {
          this.commonService.data = data;
          debugger;
          this.accessdata = data.GetAvccessDetails;

          if (this.accessdata.find(x => x.Add == true)) {
            this.isNextButton = false;
          } else {
            this.isNextButton = true;
          }
          if (this.accessdata.find(x => x.Edit == true)) {
            this.isNextupdate = false;
          } else {
            this.isNextupdate = true;
          }
          if (this.accessdata.find(x => x.Delete == true)) {
            this.isNextDelete = false;
          } else {
            this.isNextDelete = true;
          }
        });
      }
      else {
        Swal.fire({
          type: 'warning',
          title: 'Un-Authorized Access, Please contact Administrator',
          position: 'top-end',
          showConfirmButton: false,
          timer: 1500,
          customClass: {
            popup: 'alert-warp',
            container: 'alert-container',
          },
        });
        this.commonService.getListOfData('Common/Getlogdetails/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem("Doctorname") + '/' + "CustomerMaster").subscribe(data => {
          this.router.navigate(['dash']);
        });
      }
    }
    else if (sstring == true) {
      if (Objdata.find(el => el.Parentmoduledescription === Pathname)) {
        this.commonService.getListOfData('Common/Getlocationcityvalues').subscribe(data => { this.Cityname = data; });
        this.commonService.getListOfData('Common/GetAccessdetailsstring/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem("userroleID") + '/' + Pathname).subscribe(data => {
          this.commonService.data = data;
          debugger;
          this.accessdata = data.GetAvccessDetails;

          if (this.accessdata.find(x => x.Add == true)) {
            this.isNextButton = false;
          } else {
            this.isNextButton = true;
          }
          if (this.accessdata.find(x => x.Edit == true)) {
            this.isNextupdate = false;
          } else {
            this.isNextupdate = true;
          }
          if (this.accessdata.find(x => x.Delete == true)) {
            this.isNextDelete = false;
          } else {
            this.isNextDelete = true;
          }
        });
      }
      else {
        Swal.fire({
          type: 'warning',
          title: 'Un-Authorized Access, Please contact Administrator',
          position: 'top-end',
          showConfirmButton: false,
          timer: 1500,
          customClass: {
            popup: 'alert-warp',
            container: 'alert-container',
          },
        });
        this.commonService.getListOfData('Common/Getlogdetails/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem("Doctorname") + '/' + "CustomerMaster").subscribe(data => {
          this.router.navigate(['dash']);
        });
      }
    }

  }

  @ViewChild('CustomerMaster') Form: NgForm


  accesspopup;
  accessdata;
  Getformaccess() {
    debugger;
    var Pathname = "Opticalslazy/CustomerMaster";
    var n = Pathname;
    var sstring = n.includes("/");
    if (sstring == false) {
      this.commonService.getListOfData('Common/GetAccessdetails/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem("userroleID") + '/' + Pathname).subscribe(data => {
        this.accessdata = data.GetAvccessDetails;
        this.backdrop = 'block';
        this.accesspopup = 'block';
      });
    }
    else if (sstring == true) {
      this.commonService.getListOfData('Common/GetAccessdetailsstring/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem("userroleID") + '/' + Pathname).subscribe(data => {
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


  nameField(event): boolean {
    debugger
    const charCode = (event.which) ? event.which : event.keyCode;
    if ((charCode > 64 && charCode < 91) || (charCode > 96 && charCode < 123) || charCode == 32 || charCode == 46 || charCode == 9 || (charCode > 34 && charCode < 41) || charCode == 8) {
      return true;
    }
    return false;
  }

  SearchUIN() {
    localStorage.setItem('helpname', 'Registration');
    const dialogRef = this.dialog.open(SearchComponent, {
      height: '70%',
      width: '85%',
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      debugger
      if (result.success) {
        this.Form.onReset();
        this.M_CustomerID = null;
        let item = result.data;
        this.SearchedUin = true
        this.M_Name = item.Name;
        this.M_LName = item.LastName;
        this.M_MName = item.MiddleName;
        this.M_Address1 = item.Address1
        this.M_Address2 = item.Address2
        this.M_Address3 = item.Address3
        this.M_MobileNo = item.Phone
        this.M_UIN = item.UIN
        this.M_City = item.City
        this.CitySearch();
        this.commonService.getListOfData('Common/Getlocationvalues/' + this.M_City).subscribe(data => {
          this.Locationnames = data;
          var templocation = this.Locationnames.find(x => x.Text == item.LocationName)
          this.M_Location = templocation.Value
        });
      }
    });
  }

  CancelClk() {
    if (this.M_UIN != null || this.M_Name != null || this.M_MName != null || this.M_LName != null || this.M_Address1 != null || this.M_Address2 != null || this.M_Address3 != null || this.M_GST != null || this.M_City != null || this.M_Location != null || this.M_State != null || this.M_Country !== null || this.M_ContactPerson != null || this.M_PhoneNo != null || this.M_MobileNo != null) {
      this.backdrop = 'block';
      this.cancelblock = 'block';
    }
    else {
      this.Form.onReset();
      this.M_CustomerID = null;
      this.SearchedUin = false;
    }
  }

  backdrop;
  cancelblock;

  modalcloseOk() {
    this.backdrop = 'none';
    this.cancelblock = 'none';
  }
  modalSuccesssOk() {
    this.cancelblock = 'none';
    this.Form.onReset();
    this.M_CustomerID =null;
    this.SearchedUin = false;
  }


  CitySearch() {
    this.commonService.getListOfData('RegistrationMaster/GetlocationDetails/' + this.M_City + '/')
      .subscribe((data: any) => {
        this.M_State = data.ParentDescriptionstate;
        this.M_Country = data.ParentDescriptioncountry;
        if (this.M_State != null) {
          this.disableLOC = false;
        }
        else {
          this.disableLOC = true;
        }
      });
    this.commonService.getListOfData('Common/Getlocationvalues/' + this.M_City).subscribe(data => {
      this.Locationnames = data;
    });
  }

  M_MName;
  M_LName;
  /* Submit */
  Submit(form: NgForm) {
    if (form.valid) {
      this.isInvalid = false;
      this.commonService.data.CustomerMaster = new Customer();
      this.commonService.data.CustomerMaster.UIN = this.M_UIN;
      this.commonService.data.CustomerMaster.Name = this.M_Name;
      this.commonService.data.CustomerMaster.MiddleName = this.M_MName;
      this.commonService.data.CustomerMaster.LastName = this.M_LName;
      this.commonService.data.CustomerMaster.Address1 = this.M_Address1;
      this.commonService.data.CustomerMaster.Address2 = this.M_Address2;
      this.commonService.data.CustomerMaster.Address3 = this.M_Address3;
      this.commonService.data.CustomerMaster.Location = this.M_Location;
      this.commonService.data.CustomerMaster.GSTNo = this.M_GST;
      this.commonService.data.CustomerMaster.MobileNo = this.M_MobileNo;
      this.commonService.data.CustomerMaster.PhoneNo = this.M_PhoneNo;
      this.commonService.data.CustomerMaster.ContactPerson = this.M_ContactPerson;
      this.commonService.data.CustomerMaster.CmpID = parseInt(localStorage.getItem("CompanyID"));
      this.commonService.data.CustomerMaster.CreatedBy = parseInt(localStorage.getItem("userroleID"));

      this.commonService.postData('CustomerMaster/SubmitCustomerMaster', this.commonService.data)
        .subscribe(data => {
          debugger
          if (data.Success == true) {
            debugger
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
            this.Form.onReset();
            this.SearchedUin = false;
          }
          else if (data.Message == "Already Registered Customer") {
            Swal.fire({
              type: 'warning',
              title: 'Already Registered Customer',
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
        });
    }
    else {
      this.isInvalid = true;
      let target = this.el.nativeElement.querySelector('.required.ng-invalid')
      setTimeout(function () {
        $('html,body').animate({ scrollTop: $(target).offset().top }, 'slow');
        target.focus();
      }, 500);
    }
  }

  /* Update */
  Update(form: NgForm, ID) {
    debugger
    if (form.valid) {
      this.isInvalid = false;
      this.commonService.data.CustomerMaster = new Customer();
      this.commonService.data.CustomerMaster.UIN = this.M_UIN;
      this.commonService.data.CustomerMaster.Name = this.M_Name;
      this.commonService.data.CustomerMaster.MiddleName = this.M_MName;
      this.commonService.data.CustomerMaster.LastName = this.M_LName;
      this.commonService.data.CustomerMaster.Address1 = this.M_Address1;
      this.commonService.data.CustomerMaster.Address2 = this.M_Address2;
      this.commonService.data.CustomerMaster.Address3 = this.M_Address3;
      this.commonService.data.CustomerMaster.Location = this.M_Location;
      this.commonService.data.CustomerMaster.GSTNo = this.M_GST;
      this.commonService.data.CustomerMaster.MobileNo = this.M_MobileNo;
      this.commonService.data.CustomerMaster.PhoneNo = this.M_PhoneNo;
      this.commonService.data.CustomerMaster.ContactPerson = this.M_ContactPerson;
      this.commonService.data.CustomerMaster.UpdatedBy = parseInt(localStorage.getItem("userroleID"));

      this.commonService.postData('CustomerMaster/UpdateCustomerMaster/' + ID, this.commonService.data)
        .subscribe(data => {
          debugger
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
            this.Form.onReset();
            this.SearchedUin = false;
            this.M_CustomerID = null;
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
        });
    }
    else {
      this.isInvalid = true;
      let target = this.el.nativeElement.querySelector('.required.ng-invalid')
      setTimeout(function () {
        $('html,body').animate({ scrollTop: $(target).offset().top }, 'slow');
        target.focus();
      }, 500);
    }
  }

  /* Delete */
  Deleteclk(CustomerID) {
    Swal.fire({
      title: 'Are you sure?',
      text: "Want to Delete!",
      type: 'warning',
      showCancelButton: true,
      cancelButtonColor: '#d33',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Yes',
      reverseButtons: true,
      focusCancel: true,
    }).then((result) => {
      debugger;
      if (result.value) {
        this.commonService.getListOfData('CustomerMaster/DeleteCustomerMaster/' + CustomerID + '/' + parseInt(localStorage.getItem("CompanyID"))+ '/' + parseInt(localStorage.getItem("userroleID")))
          .subscribe(data => {
            debugger
            if (data.Success == true) {
              Swal.fire({
                type: 'success',
                title: 'Delete Successfully',
                position: 'top-end',
                showConfirmButton: false,
                timer: 1500,
                customClass: {
                  popup: 'alert-warp',
                  container: 'alert-container',
                },
              });
              this.Form.onReset();
              this.SearchedUin = false;
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
          });
      }
    })
  }

  /* Registered Customer */
  RegisteredCustomer() {
    localStorage.setItem('helpname', 'Customer Master');
    const dialogRef = this.dialog.open(SearchComponent, {
      height: '70%',
      width: '85%',
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result.success) {
        debugger
        this.Form.onReset();
        this.M_CustomerID = null;
        let item = result.data;
        this.SearchedUin = true
        this.M_Name = item.Name
        this.M_MName = item.MidleName
        this.M_LName = item.LastName
        this.M_Address1 = item.Address1
        this.M_Address2 = item.Address2
        this.M_Address3 = item.Address3
        this.M_MobileNo = item.MobileNo
        this.M_PhoneNo = item.PhoneNo
        this.M_CustomerID = item.ID
        this.M_UIN = item.UIN
        this.M_ContactPerson = item.ContactPerson
        this.M_GST = item.GSTNo
        this.M_City = item.City
        this.CitySearch();
        this.commonService.getListOfData('Common/Getlocationvalues/' + this.M_City).subscribe(data => {
          this.Locationnames = data;
          var templocation = this.Locationnames.find(x => x.Text == item.LocationName)
          this.M_Location = templocation.Value
        });
      }
    });
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
}
