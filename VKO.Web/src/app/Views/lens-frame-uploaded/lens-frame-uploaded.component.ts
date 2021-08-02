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

  displayedColumnssq = ['Type', 'Brand', 'Description', 'CostPrice', 'InclusiveTax', 'Price', 'UOM', 'TaxDescription', 'GST', 'IGST', 'Status'];
  dataSourcesq = new MatTableDataSource();


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

  Convertexcellensframemaster() {
    debugger;
    let element = document.getElementById('LensFramemasterTemplate-table');
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
    XLSX.utils.book_append_sheet(wb, ws, 'Lens Frame Upload Format');
    XLSX.writeFile(wb, "Lens Frame Upload Format.xlsx");
  }

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
        this.inputFilelens.nativeElement.value = '';
        this.lensdata(data);
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
    const str = "lens";
    const strcontactlens = "Contactlens";
    const strFrame = "Frame";

    let filterlens = data.filter((x) => x.Type.replace(/\s+/g, '').toLowerCase() == str.replace(/\s+/g, '').toLowerCase());
    let filterContactlens = data.filter((x) => x.Type.replace(/\s+/g, '').toLowerCase() == strcontactlens.replace(/\s+/g, '').toLowerCase());
    let filterFrame = data.filter((x) => x.Type.replace(/\s+/g, '').toLowerCase() == strFrame.replace(/\s+/g, '').toLowerCase());

    if (this.Lensarray.length > 0) {

      var Lensresult = filterlens.filter(o1 => !this.Lensarray.filter((x) => x.Type.replace(/\s+/g, '').toLowerCase() == str.replace(/\s+/g, '').toLowerCase()).some(o2 => o1.Brand.replace(/\s+/g, '').toLowerCase() === o2.Brand.replace(/\s+/g, '').toLowerCase() && o1.Type.replace(/\s+/g, '').toLowerCase() === o2.Type.replace(/\s+/g, '').toLowerCase() && o1.Sph === parseFloat(o2.Sphh) && o1.Cyl === parseFloat(o2.Cyll) && o1.Axis === parseFloat(o2.Axiss) && o1.Add === parseFloat(o2.Addd) && o1.InclusiveTax.replace(/\s+/g, '').toLowerCase() === o2.InclusiveTax.replace(/\s+/g, '').toLowerCase()));
      var Contactlensresult = filterContactlens.filter(o1 => !this.Lensarray.filter((x) => x.Type.replace(/\s+/g, '').toLowerCase() == strcontactlens.replace(/\s+/g, '').toLowerCase()).some(o2 => o1.Brand.replace(/\s+/g, '').toLowerCase() === o2.Brand.replace(/\s+/g, '').toLowerCase() && o1.Type.replace(/\s+/g, '').toLowerCase() === o2.Type.replace(/\s+/g, '').toLowerCase() && o1.Sph === parseFloat(o2.Sphh) && o1.Cyl === parseFloat(o2.Cyll) && o1.Axis === parseFloat(o2.Axiss) && parseFloat(o2.Addd) === o2.Addd && o1.InclusiveTax.replace(/\s+/g, '').toLowerCase() === o2.InclusiveTax.replace(/\s+/g, '').toLowerCase()));
      var Frameresult = filterFrame.filter(o1 => !this.Lensarray.filter((x) => x.Type.replace(/\s+/g, '').toLowerCase() == strFrame.replace(/\s+/g, '').toLowerCase()).some(o2 => o1.Brand.replace(/\s+/g, '').toLowerCase() === o2.Brand.replace(/\s+/g, '').toLowerCase() && o1.Type.replace(/\s+/g, '').toLowerCase() === o2.Type.replace(/\s+/g, '').toLowerCase() && o1.FrameShape === o2.FrameShapee && o1.FrameStyle === o2.FrameStylee && o1.FrameType === o2.FrameTypee && o1.FrameWidth === o2.FrameWidthh && o1.InclusiveTax.replace(/\s+/g, '').toLowerCase() === o2.InclusiveTax.replace(/\s+/g, '').toLowerCase()));
    }

    if (this.Lensarray.length > 0) {
      var result3 = Lensresult.concat(Contactlensresult, Frameresult);
    }
    else {
      var result3 = filterlens.concat(filterContactlens, filterFrame);
    }

    if (result3.length > 0)
    {
      for (var i = 0; i < result3.length; i++)
      {
        if (result3[i].Type.replace(/\s+/g, '').toLowerCase() == str.replace(/\s+/g, '').toLowerCase())
        {
          var la = new Lensarray();
          la.Type = result3[i].Type,
          la.Brand = result3[i].Brand,
          la.Sph = result3[i].Sph != '' ? "Sph :" + " " + result3[i].Sph : null,
          la.Cyl = result3[i].Cyl != '' ? "Cyl :" + " " + result3[i].Cyl : null,
          la.Axis = result3[i].Axis != '' ? "Axis :" + " " + result3[i].Axis : null,
          la.Add = result3[i].Add != '' ? "Add :" + " " + result3[i].Add : null,
          la.Sphh = result3[i].Sph,
          la.Cyll = result3[i].Cyl,
          la.Axiss = result3[i].Axis,
          la.Addd = result3[i].Add,
          la.Model = result3[i].Model;
          la.Index = result3[i].Index;
          la.Colour = result3[i].Color;
          la.Size = result3[i].Size;
          la.Prize = result3[i].SellingPrice;
          la.CostPrize = result3[i].CostPrice;
          la.InclusiveTax = result3[i].InclusiveTax;
          la.InclusiveTaxbool = result3[i].InclusiveTax == 'Yes'.replace(/\s+/g, '').toLowerCase() ? true : false;
          la.UOM = "Pieces";
          la.Status = "Open"
          la.TaxDescription = result3[i].TaxDescription;
          la.GSTPercentage = result3[i].GST;
          la.IGSTPercentage = result3[i].IGST;
          this.Lensarray.push(la);
          this.commonService.data.Lensarray = this.Lensarray;
          this.dataSourcesq.data = this.commonService.data.Lensarray;
          this.dataSourcesq._updateChangeSubscription();
          this.TotoalItems = this.TotoalItems + 1;

        }
        else if (result3[i].Type.replace(/\s+/g, '').toLowerCase() == strcontactlens.replace(/\s+/g, '').toLowerCase()) {

          var la = new Lensarray();
          la.Type = result3[i].Type,
          la.Brand = result3[i].Brand,
          la.Sph = result3[i].Sph != '' ? "Sph :" + " " + result3[i].Sph : null,
          la.Cyl = result3[i].Cyl != '' ? "Cyl :" + " " + result3[i].Cyl : null,
          la.Axis = result3[i].Axis != '' ? "Axis :" + " " + result3[i].Axis : null,
          la.Add = result3[i].Add != '' ? "Add :" + " " + result3[i].Add : null,
          la.Sphh = result3[i].Sph,
          la.Cyll = result3[i].Cyl,
          la.Axiss = result3[i].Axis,
          la.Addd = result3[i].Add,
          la.Model = result3[i].Model;
          la.Index = result3[i].Index;
          la.Colour = result3[i].Color;
          la.Size = result3[i].Size;
          la.Prize = result3[i].SellingPrice;
          la.CostPrize = result3[i].CostPrice;
          la.InclusiveTax = result3[i].InclusiveTax;
          la.InclusiveTaxbool = result3[i].InclusiveTax == 'Yes'.replace(/\s+/g, '').toLowerCase() ? true : false;
          la.UOM = "Pieces";
          la.Status = "Open"
          la.TaxDescription = result3[i].TaxDescription;
          la.GSTPercentage = result3[i].GST;
          la.IGSTPercentage = result3[i].IGST;
          this.Lensarray.push(la);
          this.commonService.data.Lensarray = this.Lensarray;
          this.dataSourcesq.data = this.commonService.data.Lensarray;
          this.dataSourcesq._updateChangeSubscription();
          this.TotoalItems = this.TotoalItems + 1;
        }
        else
        {
          var la = new Lensarray();
          la.Type = result3[i].Type;
          la.Brand = result3[i].Brand;
          la.FrameShape = result3[i].FrameShape != '' ? "Shape :" + " " + result3[i].FrameShape : null,
          la.FrameStyle = result3[i].FrameStyle != '' ? "Style :" + " " + result3[i].FrameStyle : null,
          la.FrameType = result3[i].FrameType != '' ? "Type :" + " " + result3[i].FrameType : null,
          la.FrameWidth = result3[i].FrameWidth != '' ? "Width :" + " " + result3[i].FrameWidth : null,
          la.FrameShapee = result3[i].FrameShape,
          la.FrameStylee = result3[i].FrameStyle,
          la.FrameTypee = result3[i].FrameType,
          la.FrameWidthh = result3[i].FrameWidth,
          la.Model = result3[i].Model;
          la.Colour = result3[i].Color;
          la.Size = result3[i].Size;
          la.Prize = result3[i].SellingPrice;
          la.CostPrize = result3[i].CostPrice;
          la.InclusiveTax = result3[i].InclusiveTax;
          la.InclusiveTaxbool = result3[i].InclusiveTax == 'Yes'.replace(/\s+/g, '').toLowerCase() ? true : false;
          la.UOM = "Pieces";
          la.Status = "Open"
          la.TaxDescription = result3[i].TaxDescription;
          la.GSTPercentage = result3[i].GST;
          la.IGSTPercentage = result3[i].IGST;
          this.Lensarray.push(la);
          this.commonService.data.Lensarray = this.Lensarray;
          this.dataSourcesq.data = this.commonService.data.Lensarray;
          this.dataSourcesq._updateChangeSubscription();
          this.TotoalItems = this.TotoalItems + 1;

        }


      }
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
          this.dataSourcesq.data = this.commonService.data.Lensarray;
          this.dataSourcesq._updateChangeSubscription();
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


  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
}
