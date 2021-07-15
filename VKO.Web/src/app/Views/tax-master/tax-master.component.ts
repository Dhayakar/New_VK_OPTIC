import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CommonService } from '../../shared/common.service';
import { TaxMasterViewM } from '../../Models/ViewModels/tax-master-view-m.model';
import Swal from 'sweetalert2';
import { MatTableDataSource, MatSort, MatDialog } from '@angular/material';
import html2canvas from 'html2canvas';

import * as XLSX from 'xlsx';
import { SearchComponent } from '../search/search.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tax-master',
  templateUrl: './tax-master.component.html',
  styleUrls: ['./tax-master.component.less']
})
export class TaxMasterComponent implements OnInit {


  @ViewChild('TaxMasterForm') Form: NgForm
  TaxID;
  TaxDescription;
  GST;
  IGST;
  SGST;
  CGST;
  IsActive;
  TaxGroup;
  CESSDescription;
  CESS;
  AdditionalCESSDescription;
  AdditionalCESS;

  withinstate: boolean = false;
  Interstate: boolean = false;
  Disableonsearch: boolean;
  displayedColumns: string[] = ['checked', 'TaxDescription', 'GSTPercentage', 'SGSTPercentage', 'CGSTPercentage', 'IGSTPercentage', 'TaxGroupId', 'IsActive'];
  dataSource = new MatTableDataSource();

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    //if (charCode > 31 && (charCode < 48 || charCode > 57)) {
    if ((charCode > 47 && charCode < 58)) {
      return true;
    }
    return false;
  }
  //  return true;
  //}
  hidedotval(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode == 46) {
      return false;
    }
  }

  showgst() {
    this.withinstate = true;
    this.Interstate = false;
  }
  showIgst() {
    this.withinstate = false;
    this.Interstate = true;
  }


  ChangeCESSValue() {
    if (this.CESS > 100) {
      this.CESS = '';
    }
  }

  ChangeAdditionalCESSValue() {
    if (this.AdditionalCESS > 100) {
      this.AdditionalCESS = '';
    }
  }

  ChangeValue() {

    if (this.GST > 100) {
      this.GST = '';
    }

    this.CGST = this.GST / 2;
    this.SGST = this.GST / 2;

  }

  Restrictnum() {
    if (this.IGST > 100) {
      this.IGST = '';
    }

  }

  constructor(public commonService: CommonService<TaxMasterViewM>, public dialog: MatDialog, private router: Router) { }
  @ViewChild(MatSort) sort: MatSort;

  hideIsActive: boolean = false;
  //isHiddensu: boolean = false;
  DoctorID;
  Country1;
  Country2;
  Country3;
  hiddenbyCountry = true;
  hiddenbyCountry1 = false;
  accessdata;
  //istransact;
  disableSearch = true;
  disableSubmit = true;
  disableUpdate = true;
  ngOnInit() {


    //////////////////////////////////////////////////////////////////////////////////
    var Pathname = "Inventorylazy/TAXmaster";
    var n = Pathname;
    var sstring = n.includes("/");
    var Objdata = JSON.parse(localStorage.getItem("AllCollectionData"));
    if (sstring == false) {
      if (Objdata.find(el => el.Parentmoduledescription === Pathname)) {

        //////////////////////////////////////////////////////////////////////////////
        this.commonService.getListOfData('Common/GetAccessdetails/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem("userroleID") + '/' + Pathname).subscribe(data => {
          this.commonService.data = data;
          debugger;
          this.accessdata = data.GetAvccessDetails;
          if (this.accessdata.find(x => x.Add == true)) {
            this.disableSubmit = false;
          } else {
            this.disableSubmit = true;
          }
          if (this.accessdata.find(x => x.Edit == true)) {
            this.disableSearch = false;
            this.disableUpdate = false;
          } else {
            this.disableSearch = true;
            this.disableUpdate = true;
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


        this.commonService.getListOfData('Common/GetCurrencyvalues/' + localStorage.getItem('CompanyID')).subscribe(data => {
          debugger;
          this.Country1 = data;
          this.Country2 = this.Country1[0].Text;
          this.Country3 = this.Country1[0].Value;
          if (this.Country2 == "INR") {
            this.hiddenbyCountry = true;
            this.hiddenbyCountry1 = false;
          }
          else {
            this.hiddenbyCountry = false;
            this.hiddenbyCountry1 = true;
          }
        });
        this.DoctorID = localStorage.getItem('userroleID');
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
        this.commonService.getListOfData('Common/Getlogdetails/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem("Doctorname") + '/' + "TAXmaster").subscribe(data => {
          this.router.navigate(['dash']);
        });
      }
    }
    else if (sstring == true) {
      if (Objdata.find(el => el.Parentmoduledescription === Pathname)) {

        //////////////////////////////////////////////////////////////////////////////
        this.commonService.getListOfData('Common/GetAccessdetailsstring/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem("userroleID") + '/' + Pathname).subscribe(data => {
          this.commonService.data = data;
          debugger;
          this.accessdata = data.GetAvccessDetails;
          if (this.accessdata.find(x => x.Add == true)) {
            this.disableSubmit = false;
          } else {
            this.disableSubmit = true;
          }
          if (this.accessdata.find(x => x.Edit == true)) {
            this.disableSearch = false;
            this.disableUpdate = false;
          } else {
            this.disableSearch = true;
            this.disableUpdate = true;
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


        this.commonService.getListOfData('Common/GetCurrencyvalues/' + localStorage.getItem('CompanyID')).subscribe(data => {
          debugger;
          this.Country1 = data;
          this.Country2 = this.Country1[0].Text;
          this.Country3 = this.Country1[0].Value;
          if (this.Country2 == "INR") {
            this.hiddenbyCountry = true;
            this.hiddenbyCountry1 = false;
          }
          else {
            this.hiddenbyCountry = false;
            this.hiddenbyCountry1 = true;
          }
        });
        this.DoctorID = localStorage.getItem('userroleID');
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
        this.commonService.getListOfData('Common/Getlogdetailsstring/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem("Doctorname") + '/' + Pathname).subscribe(data => {
          this.router.navigate(['dash']);
        });
      }
    }
    /////////////////////////////////////////////////////////////////////////////////////






  }

  onSubmit(form: NgForm) {

    debugger;

    if (this.TaxGroup == 'withinState') {
      if (this.TaxDescription != null) {
        this.commonService.data = new TaxMasterViewM();
        this.commonService.data.taxMaster.TaxDescription = this.TaxDescription;
        this.commonService.data.taxMaster.GSTPercentage = this.GST;
        this.commonService.data.taxMaster.CGSTPercentage = this.CGST;
        this.commonService.data.taxMaster.SGSTPercentage = this.SGST;
        this.commonService.data.taxMaster.IGSTPercentage = this.IGST;
        this.commonService.data.taxMaster.CESSDescription = this.CESSDescription;
        this.commonService.data.taxMaster.CESSPercentage = this.CESS;
        this.commonService.data.taxMaster.AdditionalCESSDescription = this.AdditionalCESSDescription;
        this.commonService.data.taxMaster.AdditionalCESSPercentage = this.AdditionalCESS;
        this.commonService.data.taxMaster.CreatedBy = parseInt(this.DoctorID);

        this.commonService.data.taxMaster.TaxGroupId = 1;


        this.commonService.postData('TaxMaster/insertTaxMaster/' + localStorage.getItem("CompanyID"), this.commonService.data).subscribe(data => {
          debugger;
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
              text: 'Some Data Missing',
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
          this.withinstate = false;
          this.Interstate = false;

        });
      }

      else {
        Swal.fire({
          type: 'warning',
          title: 'warning',
          text: 'Please fill the required fields',
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

    if (this.TaxGroup == 'interstate') {
      if (this.TaxDescription != null) {
        this.commonService.data = new TaxMasterViewM();
        this.commonService.data.taxMaster.TaxDescription = this.TaxDescription;
        this.commonService.data.taxMaster.GSTPercentage = this.GST;
        this.commonService.data.taxMaster.CGSTPercentage = this.CGST;
        this.commonService.data.taxMaster.SGSTPercentage = this.SGST;
        this.commonService.data.taxMaster.IGSTPercentage = this.IGST;
        this.commonService.data.taxMaster.CESSDescription = this.CESSDescription;
        this.commonService.data.taxMaster.CESSPercentage = this.CESS;
        this.commonService.data.taxMaster.AdditionalCESSDescription = this.AdditionalCESSDescription;
        this.commonService.data.taxMaster.AdditionalCESSPercentage = this.AdditionalCESS;
        this.commonService.data.taxMaster.CreatedBy = parseInt(this.DoctorID);
        this.commonService.data.taxMaster.TaxGroupId = 2;
        this.commonService.postData('TaxMaster/insertTaxMaster/' + localStorage.getItem("CompanyID"), this.commonService.data).subscribe(data => {
          debugger;
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
              text: 'Some Data Missing',
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
          this.withinstate = false;
          this.Interstate = false;
        });
      }
      else {
        Swal.fire({
          type: 'warning',
          title: 'warning',
          text: 'Please fill the required fields',
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

    // }
    // }
  }

  getTaxTable() {

    debugger;
    localStorage.setItem('helpname', 'TaxMaster');

    const dialogRef = this.dialog.open(SearchComponent, {
      height: '60%',
      width: '95%',
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result.success) {
        debugger;
        let item = result.data;

        debugger;

        if (item.istransact == true) {
          this.TaxID = item.ID,
            this.TaxDescription = item.TaxDescription,
            this.GST = item.GSTPercentage,
            this.SGST = item.SGSTPercentage,
            this.CGST = item.CGSTPercentage,
            this.IGST = item.IGSTPercentage,
            this.CESSDescription = item.CESSDescription,
            this.CESS = item.CESSPercentage,
            this.AdditionalCESSDescription = item.AdditionalCESSDescription,
            this.AdditionalCESS = item.AdditionalCESSPercentage,

            //this.istransact = item.istransact,

            this.IsActive = item.IsActive.toString();
          this.TaxGroup = item.TaxGroupId.toString();
          if (this.TaxGroup == 'withinState') {
            this.withinstate = true;
            this.Interstate = false;
          }
          if (this.TaxGroup == 'interstate') {
            this.withinstate = false;
            this.Interstate = true;
          }
          //this.TaxTable = 'none';
          //this.Backdrop = 'none';

          this.hideIsActive = true;

        }
        else {
          Swal.fire({
            type: 'warning',
            title: 'warning',
            text: 'Tax Description already used for billing',
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            customClass: {
              popup: 'alert-warp',
              container: 'alert-container'
            },
          });

        }


      }

    });





  }

  selectvalues(element) {

    debugger;
    //this.TaxID = element.ID,
    //  this.TaxDescription = element.TaxDescription,
    //  this.GST = element.GSTPercentage,
    //  this.SGST = element.SGSTPercentage,
    //  this.CGST = element.CGSTPercentage,
    //  this.IGST = element.IGSTPercentage,
    //  this.CESSDescription = element.CESSDescription,
    //  this.CESS = element.CESSPercentage,
    //  this.AdditionalCESSDescription = element.AdditionalCESSDescription,
    //  this.AdditionalCESS = element.AdditionalCESSPercentage,


    //  this.IsActive = element.IsActive.toString();
    //this.TaxGroup = element.TaxGroupId.toString();

    //if (this.TaxGroup == 'withinState') {
    //  this.withinstate = true;
    //  this.Interstate = false;
    //}

    //if (this.TaxGroup == 'interstate') {
    //  this.withinstate = false;
    //  this.Interstate = true;
    //}


    //this.TaxTable = 'none';
    //this.Backdrop = 'none';

    //this.hideIsActive = true;


  }

  onUpdate(form: NgForm, TaxID) {
    debugger;
    //if ((this.TaxDescription != "" && this.GST != "") || this.IGST != "") {

    if (this.TaxGroup == 'withinState') {
      if (this.TaxDescription != "") {
        if (this.TaxGroup == 'withinState') {
          this.IGST = null;
        }

        if (this.TaxGroup == 'interstate') {
          this.GST = null;
          this.CGST = null;
          this.CGST = null;
        }

        //if (form.valid) {
        this.commonService.data = new TaxMasterViewM();
        this.commonService.data.taxMaster.TaxDescription = this.TaxDescription;
        this.commonService.data.taxMaster.GSTPercentage = this.GST;
        this.commonService.data.taxMaster.CGSTPercentage = this.CGST;
        this.commonService.data.taxMaster.SGSTPercentage = this.CGST;
        this.commonService.data.taxMaster.IGSTPercentage = this.IGST;

        this.commonService.data.taxMaster.CESSDescription = this.CESSDescription;
        this.commonService.data.taxMaster.CESSPercentage = this.CESS;
        this.commonService.data.taxMaster.AdditionalCESSDescription = this.AdditionalCESSDescription;
        this.commonService.data.taxMaster.AdditionalCESSPercentage = this.AdditionalCESS;
        this.commonService.data.taxMaster.UpdatedBy = parseInt(this.DoctorID);

        this.commonService.data.taxMaster.TaxGroupId = 1;
        this.commonService.data.taxMaster.IsActive = this.IsActive;
        this.commonService.postData("TaxMaster/updateTaxMaster/" + this.TaxID + '/' + localStorage.getItem("CompanyID"), this.commonService.data)
          .subscribe(data => {
            if (data.Success == true) {
              debugger;

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
              //this.appComponent.modalCommonReset();
              Swal.fire({


                type: 'warning',
                title: 'warning',
                text: 'Some Data Is Missing',
                position: 'top-end',
                showConfirmButton: false,
                timer: 1500,
                customClass: {
                  popup: 'alert-warp',
                  container: 'alert-container'
                },

              });
            }

            this.hideIsActive = false;
            this.Form.onReset();
            this.withinstate = false;
            this.Interstate = false;
          });

      }

    }



    if (this.TaxGroup == 'interstate') {
      if (this.TaxDescription != "") {
        if (this.TaxGroup == 'withinState') {
          this.IGST = null;
        }

        if (this.TaxGroup == 'interstate') {
          this.GST = null;
          this.CGST = null;
          this.CGST = null;
        }

        //if (form.valid) {
        this.commonService.data = new TaxMasterViewM();
        this.commonService.data.taxMaster.TaxDescription = this.TaxDescription;
        this.commonService.data.taxMaster.GSTPercentage = this.GST;
        this.commonService.data.taxMaster.CGSTPercentage = this.CGST;
        this.commonService.data.taxMaster.SGSTPercentage = this.CGST;
        this.commonService.data.taxMaster.IGSTPercentage = this.IGST;

        this.commonService.data.taxMaster.CESSDescription = this.CESSDescription;
        this.commonService.data.taxMaster.CESSPercentage = this.CESS;
        this.commonService.data.taxMaster.AdditionalCESSDescription = this.AdditionalCESSDescription;
        this.commonService.data.taxMaster.AdditionalCESSPercentage = this.AdditionalCESS;
        this.commonService.data.taxMaster.UpdatedBy = parseInt(this.DoctorID);
        this.commonService.data.taxMaster.IsActive = this.IsActive;
        this.commonService.data.taxMaster.TaxGroupId = 2;
        this.commonService.postData("TaxMaster/updateTaxMaster/" + this.TaxID + '/' + localStorage.getItem("CompanyID"), this.commonService.data)
          .subscribe(data => {
            if (data.Success == true) {
              debugger;
              //this.appComponent.modalCommonReset();
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
              //this.appComponent.modalCommonReset();
              Swal.fire({
                type: 'warning',
                title: 'warning',
                text: 'Some Data Is Missing',
                position: 'top-end',
                showConfirmButton: false,
                timer: 1500,
                customClass: {
                  popup: 'alert-warp',
                  container: 'alert-container'
                },
              });
            }

            this.hideIsActive = false;
            this.Form.onReset();
            this.withinstate = false;
            this.Interstate = false;
          });

      }

    }



  }

  backdrop;
  cancelblock;
  Cancel() {
    if (this.TaxDescription != null || this.GST != null || this.IGST != null || this.SGST != null || this.CGST != null) {
      this.backdrop = 'block';
      this.cancelblock = 'block';
    }
    else {
      this.withinstate = false;
      this.Interstate = false;
      this.Form.onReset();
    }

    //this.isHiddensu = false;
    //this.isHiddenup = true;

  }
  modalClose() {
    this.backdrop = 'none';
    this.cancelblock = 'none';
  }
  CancelNo() {
    this.backdrop = 'none';
    this.cancelblock = 'none';
  }
  CancelYes() {
    this.backdrop = 'none';
    this.cancelblock = 'none';
    this.Form.onReset();
    this.hideIsActive = false;

    this.withinstate = false;
    this.Interstate = false;
  }


  TaxTable;
  Backdrop;
  closeEnd() {
    this.TaxTable = 'none';
    this.Backdrop = 'none';
  }

  @ViewChild('Taxtable') Taxtable: ElementRef;
  @ViewChild('table') table: ElementRef;

  getPdf() {
    debugger;
    var data = document.getElementById('Taxtable');
    html2canvas(data).then(canvas => {
      var imgWidth = 215;
      var pageHeight = 55;
      //var imgHeight = canvas.height * imgWidth / canvas.width;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      var heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL('image/PDF')
      //let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF  
      var position = 5;
      //pdf.addImage(contentDataURL, 'PDF', -2, position, imgWidth, imgHeight)
      //pdf.save('CancelledPODetails.pdf'); // Generated PDF   
    });

  }

  getExcel() {
    debugger;
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.table.nativeElement);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    XLSX.writeFile(wb, 'TaxDetails.xlsx');
  }

  accesspopup;

  Getformaccess() {
    debugger;
    var Pathname = "Inventorylazy/TAXmaster";
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

}
