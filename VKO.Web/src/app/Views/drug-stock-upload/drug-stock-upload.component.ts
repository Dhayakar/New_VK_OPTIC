import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import * as XLSX from 'xlsx';
import { ExcelModel, DrugStockExcelimport } from '../../Models/ViewModels/ExcelViewModel';
import { CommonService } from '../../shared/common.service';
import Swal from 'sweetalert2';
import { MatTableDataSource, DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material';
import { Router } from '@angular/router';
import { MomentDateAdapter } from '@angular/material-moment-adapter';

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
  selector: 'app-drug-stock-upload',
  templateUrl: './drug-stock-upload.component.html',
  styleUrls: ['./drug-stock-upload.component.less'],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },

  ],
})




export class DrugStockUploadComponent implements OnInit {

  constructor(public commonService: CommonService<ExcelModel>, private router: Router) { }

  isNextButton = true;
  isNextupdate = true;
  isNextDelete = true;

  date = new Date();

  numberOnly() {

  }
  ngOnInit() {
    debugger

    var Pathname = "Drugslazy/DrugStockUpload";
    var n = Pathname;
    var sstring = n.includes("/");
    this.commonService.data = new ExcelModel();

    var Objdata = JSON.parse(localStorage.getItem("AllCollectionData"));

    if (sstring == false) {
      if (Objdata.find(el => el.Parentmoduledescription === Pathname)) {

        this.commonService.getListOfData('Common/GetAccessdetails/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem("userroleID") + '/' + Pathname).subscribe(data => {
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
        setTimeout(() => {
          let res1 = Objdata.find(x => x.Parentmoduledescription == Pathname);
          this.Tc = res1.TransactionID;
          if (this.Tc == null || this.Tc == undefined) {
            this.isNextButton = true;
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
          if (this.Tc != null || this.Tc != undefined) {
            this.commonService.getListOfData('Common/GettingRunningNo/' + localStorage.getItem('CompanyID') + '/' + this.Tc).subscribe(data => {
              debugger
              if (data.RunningNo == "Running Number Does'nt Exist") {
                this.isNextButton = true;
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
        this.commonService.getListOfData('Common/GetstoreDropdownvalues/' + parseInt(localStorage.getItem("CompanyID"))).subscribe(data => { this.Stores = data; });
        this.commonService.getListOfData('Common/Getsuppliervalues/' + parseInt(localStorage.getItem("CompanyID"))).subscribe(data => { console.log(data); this.Vendors = data; });
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

        this.commonService.getListOfData('Common/Getlogdetails/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem("Doctorname") + '/' + "DrugStockUpload").subscribe(data => {
          this.router.navigate(['dash']);
        });


      }
    }
    else if (sstring == true) {
      if (Objdata.find(el => el.Parentmoduledescription === Pathname)) {

        this.commonService.getListOfData('Common/GetAccessdetailsstring/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem("userroleID") + '/' + Pathname).subscribe(data => {
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
        setTimeout(() => {
          let res1 = Objdata.find(x => x.Parentmoduledescription == Pathname);
          this.Tc = res1.TransactionID;
          if (this.Tc == null || this.Tc == undefined) {
            this.isNextButton = true;
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
          if (this.Tc != null || this.Tc != undefined) {
            this.commonService.getListOfData('Common/GettingRunningNo/' + localStorage.getItem('CompanyID') + '/' + this.Tc).subscribe(data => {
              debugger
              if (data.RunningNo == "Running Number Does'nt Exist") {
                this.isNextButton = true;
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
        this.commonService.getListOfData('Common/GetstoreDropdownvalues/' + parseInt(localStorage.getItem("CompanyID")) + '/' + "Stock Department").subscribe(data => { this.Stores = data; });
        this.commonService.getListOfData('Common/Getsuppliervalues/' + parseInt(localStorage.getItem("CompanyID"))).subscribe(data => { console.log(data); this.Vendors = data; });
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
        this.commonService.getListOfData('Common/Getlogdetails/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem("Doctorname") + '/' + "DrugStockUpload").subscribe(data => {
          this.router.navigate(['dash']);
        });


      }
    }


  }

  Vendors;
  M_Vendor;

  backdrop;
  accesspopup;
  accessdata;
  Getformaccess() {
    debugger;

    var Pathname = "Drugslazy/DrugStockUpload";
    var n = Pathname;
    var sstring = n.includes("/");
    if (sstring == false) {
      this.commonService.getListOfData('Common/GetAccessdetails/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem("userroleID") + '/' + "DrugStockUpload").subscribe(data => {
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

  displayedColumns: string[] = ['SNO', 'Brand', 'Generic', 'BatchSerial', 'Date', 'Quantity', 'Status', 'Remarks','Action'];
  dataSource = new MatTableDataSource();

  @ViewChild('uploaded') uploaded: ElementRef;

  M_date;
  Stores;
  Tc;
  Dataaa = [];
  arrayBuffer: any;
  file: File;
  //DrugStockExcelimport: Array<DrugStockExcelimport> = [];
  M_Store;

  DisableSubmit: boolean = false;

  incomingfile(event) {
    var fileElement = document.getElementById("Uploadfile");
    var fileExtension = "";
    if ((<HTMLInputElement>fileElement).value.lastIndexOf(".") > 0) {
      fileExtension = (<HTMLInputElement>fileElement).value.substring((<HTMLInputElement>fileElement).value.lastIndexOf(".") + 1, (<HTMLInputElement>fileElement).value.length);
    }
    if (fileExtension.toLowerCase() == "xlsx") {
      this.file = event.target.files[0];

      let fileReader = new FileReader();
      fileReader.onload = (e) => {
        this.arrayBuffer = fileReader.result;
        var data = new Uint8Array(this.arrayBuffer);
        var arr = new Array();
        for (var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
        var bstr = arr.join("");
        var workbook = XLSX.read(bstr, { type: "binary", cellDates: true });
        var first_sheet_name = workbook.SheetNames[0];
        var worksheet = workbook.Sheets[first_sheet_name];
        var XL_row_object = XLSX.utils.sheet_to_json(worksheet);
        this.Dataaa = XL_row_object;
        debugger
        this.loopvalues(this.Dataaa);
      }
      fileReader.readAsArrayBuffer(this.file);

    }
    else {
      Swal.fire
        ({
          type: 'warning',
          title: 'Invalid file format',
          position: 'top-end',
          showConfirmButton: false,
          timer: 1500,
          customClass: {
            popup: 'alert-warp',
            container: 'alert-container',
          },
        });
      (<HTMLInputElement>document.getElementById("Uploadfile")).value = null;
      this.file = null;
    }
  }


  data: any = [{
    DrugID: 'number',
    Brand: 'varchar',
    BatchSerial: 'varchar',
    Date: 'varchar',
    Quantity: 'number'
  }];

  GetExcelFormat() {
    this.commonService.getListOfData('ExcelUploadAPI/GettingDrugIdsDesc/' + parseInt(localStorage.getItem("CompanyID")))
      .subscribe(data => {
        debugger;
        if (data.Success == true) {
          debugger
          if (data.res.length > 0) {
            const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data.res);
            const wb: XLSX.WorkBook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, "Excel Upload Format");
            XLSX.writeFile(wb, "Excel Upload Format.xlsx");
          } else {
            const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.data);
            const wb: XLSX.WorkBook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, "Excel Upload Format");
            XLSX.writeFile(wb, "Excel Upload Format.xlsx");
          }
        }
      });
  }


  Upload() {
    let fileReader = new FileReader();
    fileReader.onload = (e) => {
      this.arrayBuffer = fileReader.result;
      var data = new Uint8Array(this.arrayBuffer);
      var arr = new Array();
      for (var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
      var bstr = arr.join("");
      var workbook = XLSX.read(bstr, { type: "binary", cellDates: true });
      var first_sheet_name = workbook.SheetNames[0];
      var worksheet = workbook.Sheets[first_sheet_name];
      var XL_row_object = XLSX.utils.sheet_to_json(worksheet);
      this.Dataaa = XL_row_object;
      debugger
      this.loopvalues(this.Dataaa);
    }
    fileReader.readAsArrayBuffer(this.file);
  }





  loopvalues(Dataaa) {
    debugger;
    try {
      this.commonService.data.DrugStockExcelimports = [];

      for (var i = 0; i < Dataaa.length; i++) {
        var Newlist = new DrugStockExcelimport();
        Newlist.DrugID = Dataaa[i].DrugID;
        Newlist.Brand = '';
        Newlist.Generic = '';
        Newlist.Remarks = '';
        Newlist.BatchSerial = Dataaa[i].BatchSerial;
        Newlist.Date = Dataaa[i].Date;
        Newlist.Quantity = Dataaa[i].Quantity;
        Newlist.Status = 'Valid';
        this.commonService.data.DrugStockExcelimports.push(Newlist);
      }


      this.commonService.postData('ExcelUploadAPI/GetStatusDrugStock/' + parseInt(localStorage.getItem("CompanyID")), this.commonService.data)
        .subscribe(data => {
          debugger;
          if (data.Success == true) {
            this.commonService.data.DrugStockExcelimports = data.DrugDatas;
            this.dataSource.data = this.commonService.data.DrugStockExcelimports;
          }
          else {
            Swal.fire({
              type: 'warning',
              title: 'No Data Found',
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

        });
    }
    catch (Error) {
      this.commonService.getListOfData('Common/ErrorList/' + Error.message + '/' + "Drug Stock Upload" + '/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem('userroleID') + '/')
        .subscribe(data => { });
    }
  }





  onSubmit() {
    debugger
    try {
      if (this.commonService.data.DrugStockExcelimports != undefined) {
        if (this.commonService.data.DrugStockExcelimports.length > 0) {
          if (this.commonService.data.DrugStockExcelimports.some(drug => drug.Status === "Invalid")) {
            Swal.fire({
              type: 'warning',
              title: 'Remove Invalid Data',
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
          if (this.M_Store == null || this.M_Store == undefined || this.M_Store == "") {
            Swal.fire({
              type: 'warning',
              title: 'Select the Store',
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

          if (this.M_Vendor == null || this.M_Vendor == undefined || this.M_Vendor == "") {
            Swal.fire({
              type: 'warning',
              title: 'Select the Vendor',
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

          if (this.M_date == null || this.M_date == undefined || this.M_date == "") {
            Swal.fire({
              type: 'warning',
              title: 'Select the Date',
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

        } else {
          Swal.fire({
            type: 'warning',
            title: 'No Data to upload',
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
      else {
        Swal.fire({
          type: 'warning',
          title: 'No Data to upload',
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
      this.commonService.data.StoreId = parseInt(this.M_Store);
      this.commonService.data.VendorID = parseInt(this.M_Vendor);

      this.commonService.postData('ExcelUploadAPI/SubmitDrugStock/' + parseInt(localStorage.getItem("CompanyID")) + '/' + parseInt(localStorage.getItem("userroleID")) + '/' + this.Tc + '/' + this.M_date.toISOString(), this.commonService.data)
        .subscribe(data => {
          debugger;
          if (data.Success == true) {
            debugger
            Swal.fire({
              type: 'success',
              title: 'Data Uploaded Successfully !',
              position: 'top-end',
              showConfirmButton: false,
              timer: 1500,
              customClass: {
                popup: 'alert-warp',
                container: 'alert-container',
              },
            });
            this.dataSource.data = data.DrugData;
            this.DisableSubmit = true;
          }
          else if (data.Message == "Running Number Does'nt Exist") {
            Swal.fire({
              type: 'warning',
              title: data.Message,
              position: 'top-end',
              showConfirmButton: false,
              timer: 1500,
              customClass: {
                popup: 'alert-warp',
                container: 'alert-container',
              },
            });
          }
          else if (data.Message.includes('Violation of PRIMARY KEY')) {
            Swal.fire({
              type: 'warning',
              title: `Running Number ${(data.grn)} already exists`,
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
              title: 'Data Uploaded Failed !',
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
    catch (Error) {
      this.commonService.getListOfData('Common/ErrorList/' + Error.message + '/' + "Drug Stock Upload" + '/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem('userroleID') + '/')
        .subscribe(data => { });
    }
  }



  oncancel() {
    this.DisableSubmit = false;
    this.commonService.data.DrugStockExcelimports = [];
    this.dataSource.data = [];
    this.M_Store = "";
    this.M_Vendor = "";
    this.M_date = "";
    this.uploaded.nativeElement.value = null;
  }

  remove(id) {
    this.dataSource.data.splice(id, 1);
    this.dataSource._updateChangeSubscription();
  }

  VendorChange()
  {
    if (this.commonService.data.DrugStockExcelimports.length > 0) {
      if (this.commonService.data.DrugStockExcelimports.some(drug => drug.Status === "Invalid")) {
        Swal.fire({
          type: 'warning',
          title: 'Remove Invalid Data',
          position: 'top-end',
          showConfirmButton: false,
          timer: 1500,
          customClass: {
            popup: 'alert-warp',
            container: 'alert-container',
          },
        });
        this.M_Vendor = null;
        return;
      }
      this.commonService.postData('ExcelUploadAPI/VendorDrugCheck/' + parseInt(localStorage.getItem("CompanyID")) + '/' + this.M_Vendor, this.commonService.data)
        .subscribe(data => {
          debugger;
          if (data.Success == true) {
            this.commonService.data.DrugStockExcelimports = data.res;
            this.dataSource.data = this.commonService.data.DrugStockExcelimports;
          }
          else {
            this.commonService.data.DrugStockExcelimports = [];
            this.dataSource.data = [];
            Swal.fire({
              type: 'warning',
              title: 'Invalid Input Data,Contact Administrator',
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


  //////////////////////////////////////////////////////////////////////////////////////////////////////
}
