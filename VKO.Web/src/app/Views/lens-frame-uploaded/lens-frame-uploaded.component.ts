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
import { ExcelModel, Lensarray } from '../../Models/ViewModels/ExcelViewModel';
declare var $: any;
declare var jQuery: any;
import * as _ from 'lodash';

@Component({
  selector: 'app-lens-frame-uploaded',
  templateUrl: './lens-frame-uploaded.component.html',
  styleUrls: ['./lens-frame-uploaded.component.less']
})
export class LensFrameUploadedComponent implements OnInit {

  displayedColumnssq = ['Type', 'Brand', 'lensoption', 'Model', 'Index', 'Color', 'Size', 'Description', 'Price', 'UOM', 'TaxDescription', 'GST', 'Status'];
  dataSourcesq = new MatTableDataSource();

  displayedColumnssqq = ['Type', 'Brand', 'lensoption', 'FrameShape', 'FrameType', 'FrameWidth', 'FrameStyle', 'Model', 'Color', 'Size', 'Description', 'Price', 'UOM', 'TaxDescription', 'GST', 'Status'];
  dataSourcesqq = new MatTableDataSource();

  constructor(public commonService: CommonService<ExcelModel>, private router: Router) { }
  isNextButton = true;
  isNextupdate = true;
  isNextDelete = true;
  backdrop;
  accesspopup;
  docotorid;
  accessdata;
  CompanyID;
  ngOnInit() {
    var Pathname = "Opticalslazy/LensFrameUploaded";
    var n = Pathname;
    var sstring = n.includes("/");
    this.commonService.data = new ExcelModel();
    this.docotorid = localStorage.getItem('userroleID');
    this.CompanyID = localStorage.getItem("CompanyID");
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

  Convertexcellensmaster() {
    let element = document.getElementById('LensmasterTemplate-table');
    var cloneTable = element.cloneNode(true);
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(cloneTable);
    var wscols = [
      { wch: 50 },
      { wch: 12 },
      { wch: 30 },
      { wch: 10 }
    ];
    ws['!cols'] = wscols;
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Lens Upload Format');
    XLSX.writeFile(wb, "Lens Upload Format.xlsx");
  }

  Convertexcelframemaster() {
    let element = document.getElementById('FramemasterTemplate-table');
    var cloneTable = element.cloneNode(true);
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(cloneTable);
    var wscols = [
      { wch: 50 },
      { wch: 12 },
      { wch: 30 },
      { wch: 10 }
    ];
    ws['!cols'] = wscols;
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Frame Upload Format');
    XLSX.writeFile(wb, "Frame Upload Format.xlsx");
  }


  orginaltable = true;
  bindingtable = false;
  TotoalItems = 0;
  Uploadeditems = 0;
  UnUplodeditems = 0;
  @ViewChild('inputFilelens') inputFilelens: ElementRef;
  isExcelFile: boolean;

  onChangelens(evt) {
    debugger;
    let data;
    let target: DataTransfer = <DataTransfer>(evt.target);
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
        this.inputFilelens.nativeElement.value = '';
      };
      reader.readAsBinaryString(target.files[0]);
    }
    else {
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
  Lensarray = [];
  lensdata(data) {
    debugger;
    const str = "LENS";
    const str1 = data[0].Type.replace(/\s+/g, '');
    const result = str.toLowerCase() === str1.toLowerCase();

    if (this.Lensarray.length > 0) {
      const str1 = data[0].Type.replace(/\s+/g, '');
      const res = this.Lensarray.some(x => x.Type.toLowerCase() === str1.toLowerCase());

      if (res == false) {

        Swal.fire({
          type: 'warning',
          title: 'warning',
          text: 'Choose same type',
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
    }

      let result3 = data.filter(o1 => !this.Lensarray.some(o2 => o1.Brand.replace(/\s+/g, '').toLowerCase() === o2.Brand.replace(/\s+/g, '').toLowerCase()
      && o1.Color.replace(/\s+/g, '').toLowerCase() === o2.Colour.replace(/\s+/g, '').toLowerCase() && o1.Size === o2.Size
      && o1.Price === o2.Prize));

    if (result == true) {
      if (result3.length > 0) {
        for (var i = 0; i < result3.length; i++) {
          var la = new Lensarray();
          la.Type = result3[i].Type,
          la.Brand = result3[i].Brand,
          la.LensOption = result3[i].LensOption;
          la.Model = result3[i].Model;
          la.Index = result3[i].Index;
          la.Colour = result3[i].Color;
          la.Size = result3[i].Size;
          la.Description = result3[i].Description;
          la.Prize = result3[i].Price;
          la.UOM = "Pieces";
          la.Status = "Open"
          la.TaxDescription = result3[i].TaxDescription;
          la.CessDescription = result3[i].Add1Tax1Desc1;
          la.AddtionalDescription = result3[i].Add1Tax2Desc2;
          la.GSTPercentage = result3[i].Tax;
          la.CESSPercentage = result3[i].Add1Tax1;
          la.ADDCESSPercentage = result3[i].Add1Tax2;
          this.Lensarray.push(la);
          this.commonService.data.Lensarray = this.Lensarray;
          this.dataSourcesq.data = this.commonService.data.Lensarray;
          this.dataSourcesq._updateChangeSubscription();
          this.TotoalItems = this.TotoalItems + 1;
        }
      }
      this.orginaltable = true;
      this.bindingtable = false;
    }
    else {

      if (this.Lensarray.length > 0) {
        const str1 = data[0].Type.replace(/\s+/g, '');
        const res = this.Lensarray.some(x => x.Type.toLowerCase() === str1.toLowerCase());

        if (res == false) {

          Swal.fire({
            type: 'warning',
            title: 'warning',
            text: 'Choose same type',
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
      }

      let result3 = data.filter(o1 => !this.Lensarray.some(o2 => o1.Brand.replace(/\s+/g, '').toLowerCase() === o2.Brand.replace(/\s+/g, '').toLowerCase()
        && o1.Color.replace(/\s+/g, '').toLowerCase() === o2.Colour.replace(/\s+/g, '').toLowerCase() && o1.Size === o2.Size
        && o1.Price === o2.Prize));
      if (result3.length > 0) {
        for (var i = 0; i < result3.length; i++) {
          var la = new Lensarray();
          la.Type = result3[i].Type;
          la.Brand = result3[i].Brand;
          la.LensOption = result3[i].FrameOption;
          la.FrameShape = result3[i].FrameShape;
          la.FrameStyle = result3[i].FrameStyle;
          la.FrameType = result3[i].FrameType;
          la.FrameWidth = result3[i].FrameWidth;
          la.Model = result3[i].Model;
          la.Colour = result3[i].Color;
          la.Size = result3[i].Size;
          la.Description = result3[i].Description;
          la.Prize = result3[i].Price;
          la.UOM = "Pieces";
          la.Status = "Open"
          la.TaxDescription = data[i].TaxDescription;
          la.CessDescription = data[i].Add1Tax1Desc1;
          la.AddtionalDescription = data[i].Add1Tax2Desc2;
          la.GSTPercentage = data[i].Tax;
          la.CESSPercentage = data[i].Add1Tax1;
          la.ADDCESSPercentage = data[i].Add1Tax2;
          this.Lensarray.push(la);
          this.commonService.data.Lensarray = this.Lensarray
          this.dataSourcesqq.data = this.commonService.data.Lensarray;
          this.dataSourcesqq._updateChangeSubscription();
          this.TotoalItems = this.TotoalItems + 1;
        }
      }
      this.orginaltable = false;
      this.bindingtable = true;
    }
  
  }


  onSubmit() {
    debugger
    this.commonService.data.Lensarray = this.Lensarray;
    console.log(this.commonService.data);
    this.commonService.postData('LensMaster/InsertUploadedExceldata/' + this.CompanyID + '/' + this.docotorid, this.commonService.data)
        .subscribe(data => {
          if (data.Success == true) {
            debugger
            this.Lensarray = data.lensframemaster;
            this.commonService.data.Lensarray = this.Lensarray;
            const str = "LENS";
            const str1 = this.Lensarray[0].Type.replace(/\s+/g, '');
            const result = str.toLowerCase() === str1.toLowerCase();
            if (result == true) {
              this.dataSourcesq.data = this.commonService.data.Lensarray;
              this.dataSourcesq._updateChangeSubscription();
            }
            else {
              this.dataSourcesqq.data = this.commonService.data.Lensarray;
              this.dataSourcesqq._updateChangeSubscription();
            }
            this.Uploadeditems = data.Uploaded;
            this.UnUplodeditems = data.Duplicate + data.Error;
            if (this.Uploadeditems != 0) {
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

          }
          else if (data.Success == false && data.Message == "No Files To Upload") {
            Swal.fire({
              type: 'warning',
              title: 'No Files To Upload',
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

  modalcloseAccessOk() {
    this.backdrop = 'none';
    this.accesspopup = 'none';
  }
  Getformaccess() {
    debugger;
    var Pathname = "Opticalslazy/LensMaster";
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
    this.inputFilelens.nativeElement.value = '';
    this.Lensarray = [];
    this.commonService.data.Lensarray = [];
    this.dataSourcesq.data = [];
    this.dataSourcesq._updateChangeSubscription();
    this.orginaltable = true;
    this.bindingtable = false;
    
  }
  CancelClk() {
    debugger;
    if (this.Lensarray.length > 0) {
      this.backdrop = 'block';
      this.cancelblock = 'block';
    }

  }

  getColor(Status) {
    switch (Status) {
      case "Uploaded":
        return "green";
      case "Duplicate":
        return "blue";
      case "Error":
        return "red";
    }
  }

  fileClicked(e) {
    debugger;
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
}
