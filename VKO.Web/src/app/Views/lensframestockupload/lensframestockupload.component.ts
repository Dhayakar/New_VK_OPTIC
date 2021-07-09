import { Component, OnInit, ElementRef, ChangeDetectorRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { CommonService } from 'src/app/shared/common.service';
import { DatePipe } from '@angular/common';
import { AppComponent } from 'src/app/app.component';
import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';
import { string, DataSource } from '@amcharts/amcharts4/core';
import { pushAll } from '@amcharts/amcharts4/.internal/core/utils/Array';
import { text } from '@angular/core/src/render3';
import { Router } from '@angular/router';
import * as XLSX from 'xlsx';
import { MatSort, MatTableDataSource, MatPaginator, MatDialogConfig, MatInput, MatSelect, MatDialog } from '@angular/material'
declare var $: any;
declare var jQuery: any;
import * as _ from 'lodash';
import { ExcelModel, Lensframestock,  } from '../../Models/ViewModels/ExcelViewModel';
import { MatOption } from '@angular/material/core';

@Component({
  selector: 'app-lensframestockupload',
  templateUrl: './lensframestockupload.component.html',
  styleUrls: ['./lensframestockupload.component.less']
})
export class LensframestockuploadComponent implements OnInit {
  @ViewChild('Lensframestockupload') Form: NgForm
  displayedColumnssq = ['Type', 'Brand', 'Quantity', 'Status'];
  dataSourcesq = new MatTableDataSource();

BranchDrop;
  constructor(public commonService: CommonService<ExcelModel>, private router: Router) { }
  isNextButton = true;
  isNextupdate = true;
  isNextDelete = true;

  backdrop;
  accesspopup;
  docotorid;
  accessdata;
  CompanyID;
  TransactionId;
  GetBranchdata;
  StoreName;
  Vendors;
  M_Vendor;
  storename;
  ngOnInit() {
    debugger;
    this.commonService.data = new ExcelModel();
    var Pathname = "Opticalslazy/Lensframestockupload";
    var Objdata = JSON.parse(localStorage.getItem("AllCollectionData"));
    var n = Pathname;
    var sstring = n.includes("/");
    let res = Objdata.find(x => x.Parentmoduledescription == Pathname);
    this.TransactionId = res.TransactionID;
    this.docotorid = localStorage.getItem('userroleID');
    this.CompanyID = localStorage.getItem("CompanyID");
    this.commonService.getListOfData('Common/GetBranchAll/' + parseInt(localStorage.getItem("CompanyID"))).subscribe((data: any) => {this.GetBranchdata = data});
    var Objdata = JSON.parse(localStorage.getItem("AllCollectionData"));
    if (this.TransactionId == null) {
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
        this.commonService.getListOfData('Common/Getlogdetails/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem("Doctorname") + '/' + "DrugUpload").subscribe(data => {
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
        this.commonService.getListOfData('Common/Getlogdetails/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem("Doctorname") + '/' + "DrugUpload").subscribe(data => {
          this.router.navigate(['dash']);
        });
      }
    }
  }

  isInvalid = false;
  data: any = [
    {
    Type: 'varchar',
    Brand: 'varchar',
    Quantity: 'number'
    },
    {
      Type: 'Lens',
      Brand: 'Trivex',
      Quantity: '10'
    },
    {
      Type: 'Frame',
      Brand: 'Gucci',
      Quantity: '10'
    },
  ];

  Convertexcellensmaster() {
    debugger
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.data);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Lens&Frame Stock Upload Format");
    XLSX.writeFile(wb, "Lens&Frame Stock Upload Format.xlsx");
  }


  TotoalItems = 0;
  Uploadeditems = 0;
  UnUplodeditems = 0;

  @ViewChild('inputFilelens') inputFilelens: ElementRef;
  isExcelFile: boolean;

  onChangelens(evt) {
    debugger;
    let data;
    const target: DataTransfer = <DataTransfer>(evt.target);
    this.isExcelFile = !!target.files[0].name.match(/(.xls|.xlsx)/);
    if (target.files.length > 1) {
      this.inputFilelens.nativeElement.value = '';
    }
    if (this.isExcelFile) {
      const reader: FileReader = new FileReader();
      reader.onload = (e: any) => {
        debugger;
        const bstr: string = e.target.result;
        const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });
        const wsname: string = wb.SheetNames[0];
        const ws: XLSX.WorkSheet = wb.Sheets[wsname];
        debugger;
        data = XLSX.utils.sheet_to_json(ws);
        this.lensdata(data);
      };
      reader.readAsBinaryString(target.files[0]);
    } else {
      this.inputFilelens.nativeElement.value = '';
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
    }
  }

  Lensframestock = [];
  lensdata(data) {
    debugger;

    let result3 = data.filter(o1 => !this.Lensframestock.some(o2 => o1.Type.replace(/\s+/g, '').toLowerCase() === o2.Type.replace(/\s+/g, '').toLowerCase() && o1.Brand.replace(/\s+/g, '').toLowerCase() === o2.Brand.replace(/\s+/g, '').toLowerCase() && o1.Quantity === o2.Quantity));

    if (result3.length > 0) {
      for (var i = 0; i < data.length; i++) {
        var la = new Lensframestock();
          la.Type = data[i].Type,
          la.Brand = data[i].Brand,
          la.Quantity = data[i].Quantity,
          la.Status = "Open",
          this.Lensframestock.push(la);
        this.commonService.data.Lensframestock = _.orderBy(this.Lensframestock, ['Brand'], ['desc']);
        this.dataSourcesq.data = this.commonService.data.Lensframestock;
        this.dataSourcesq._updateChangeSubscription();
        this.TotoalItems = this.TotoalItems + 1;
      }
    }
  }

  myStyles(element) {
    return {
      'border': 0 > element.Quantity ? '2px solid red' : ' ',
    };
  }

  modalcloseAccessOk() {
    this.backdrop = 'none';
    this.accesspopup = 'none';
  }
  Getformaccess() {
    debugger;
    var Pathname = "Opticalslazy/Lensframestockupload";
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
  cancelblock;
  modalSuccessClosessss() {
    debugger;
    this.backdrop = 'none';
    this.cancelblock = 'none';
  }
  modalcloseOk() {
    this.backdrop = 'none';
    this.cancelblock = 'none';
  }
  modalSuccesssOk() {
    this.backdrop = 'none';
    this.cancelblock = 'none';
    this.Uploadeditems = 0;
    this.UnUplodeditems = 0;
    this.TotoalItems = 0;
    this.Lensframestock = [];
    this.commonService.data.Lensframestock = [];
    this.dataSourcesq.data = [];
    this.dataSourcesq._updateChangeSubscription();
    this.Form.onReset();
  }
  CancelClk() {
    debugger;
    if (this.Lensframestock.length > 0) {
      this.backdrop = 'block';
      this.cancelblock = 'block';
    }

  }



  selectdBranch(event) {
    debugger;
    let result = event.value.Value;
    this.commonService.getListOfData('Common/GetbranchstoreDropdownvalues/' + result).subscribe(data => { this.StoreName = data });
  }

  selectdBrand(event) {
    debugger;
    let res = event.value.Value;
    this.commonService.getListOfData('Common/Getsuppliervalues/' + res).subscribe(data => { this.Vendors = data; });
  }


  Submit(form: NgForm) {
    debugger;

    if (this.Lensframestock.length == 0) {
      Swal.fire({
        type: 'warning',
        title: 'warning',
        text: "Choose File",
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          popup: 'alert-warp',
          container: 'alert-container',
        },
      });
      return false;
    }

    if (this.Lensframestock.some(x => 0 > x.Quantity)) {
      Swal.fire({
        type: 'warning',
        title: 'warning',
        text: "Check Quantity",
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          popup: 'alert-warp',
          container: 'alert-container',
        },
      });
      return false;
    }


    if (form.valid) {
      this.isInvalid = false;
      this.commonService.data.Lensframestock = this.Lensframestock;
      console.log(this.commonService.data);

      this.commonService.postData('LensMaster/InsertstockUploadedExceldata/' + this.CompanyID + '/' + this.docotorid + '/' + this.storename + '/' + this.M_Vendor + '/' + this.TransactionId, this.commonService.data)
        .subscribe(data => {
          debugger;
          if (data.Success == true) {

            this.Lensframestock = data.lensframestock;
            this.commonService.data.Lensframestock = _.orderBy(this.Lensframestock, ['Brand'], ['desc']);
            this.dataSourcesq.data = this.commonService.data.Lensframestock;
            this.dataSourcesq._updateChangeSubscription();
            this.Uploadeditems = data.Uploaded;
            this.UnUplodeditems = data.Error;
            if (this.Uploadeditems != 0) {
              Swal.fire({
                type: 'success',
                title: 'Stock Uploaded Successfully !',
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
                title: 'Stock Uploaded Failed !',
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
          else if (data.Success == false) {
            if (data.Message == "Running Number Does'nt Exist") {
              Swal.fire({
                type: 'warning',
                title: 'warning',
                text: 'Number control needs to be created for Optical Grn',
                position: 'top-end',
                showConfirmButton: false,
                timer: 1500,
                customClass: {
                  popup: 'alert-warp',
                  container: 'alert-container',
                },
              });
            }
            else if (data.Message == "Financial year doesn't exists") {
              Swal.fire({
                type: 'warning',
                title: 'warning',
                text: 'Financial year doesnt exists',
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
                title: 'warning',
                text: `${(data.grn)} already exists`,
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

          }
        });


    }
  }

  getColor(Status) {
    switch (Status) {
      case "Uploaded":
        return "green";
      case "None of the brand":
        return "red";
    }
  }



//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
}
