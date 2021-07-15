import { MatTableDataSource } from '@angular/material';
import { CommonService } from 'src/app/shared/common.service';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import {  NgForm } from '@angular/forms';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import html2canvas from 'html2canvas';
import Swal from 'sweetalert2'
import { Medical_Prescription } from 'src/app/Models/ViewModels/MedicalPrescription.model';
import * as pdfMake from 'pdfmake/build/pdfmake';
import { DatePipe, CurrencyPipe } from '@angular/common';
import * as XLSX from 'xlsx';
import { Router } from '@angular/router';
declare var jQuery: any;

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
  selector: 'app-medicaprescriptionvsmedicalbilling',
  templateUrl: './medicaprescriptionvsmedicalbilling.component.html',
  styleUrls: ['./medicaprescriptionvsmedicalbilling.component.less'],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },

  ],
})
export class MedicaprescriptionvsmedicalbillingComponent implements OnInit {

  M_ToDate;
  M_FromDate;
  modalmed;
  backdrop;
  Medicalprestable: boolean =false;
  M_FromDat;
  M_ToDat;
  count;
  countt;
  counttt;
  Getcmpid;
  bill: boolean;
  press: boolean;
  date = new Date();
  isNextButton = true;
  isNextupdate = true;
  isNextDelete = true;
  isNextPrint = true;
  accesspopup1;
  accessdata;
  minToDate = new Date();
  Country;

ExportMedPres:boolean =false;

  displayedColumns = ['Sno', 'PrescriptionNo', 'Date', 'PrescribedBy', 'MedPresAmount', 'BillNo', 'BillDate','BillAmount'];
  dataSource = new MatTableDataSource();

  constructor(public commonService: CommonService<Medical_Prescription>, public datepipe: DatePipe, private router: Router, private cp: CurrencyPipe) { }

  ngOnInit() {
    var Pathname = "Inventorylazy/Precriptonvsbilling";
    var n = Pathname;
    var sstring = n.includes("/");
    var Objdata = JSON.parse(localStorage.getItem("AllCollectionData"));
    if (sstring == false) {
      if (Objdata.find(el => el.Parentmoduledescription === Pathname)) {
        this.commonService.getListOfData('Common/GetCurrencyvalues/' + localStorage.getItem('CompanyID')).subscribe(data => {
          this.Country = data[0].Text;
        });
        this.commonService.getListOfData('Common/GetAccessdetails/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem("userroleID") + '/' + Pathname).subscribe(data => {
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
          if (this.accessdata.find(x => x.Print == true)) {
            this.isNextPrint = false;
          } else {
            this.isNextPrint = true;
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
        this.commonService.getListOfData('Common/Getlogdetails/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem("Doctorname") + '/' + "Drug Expiry List").subscribe(data => {
          this.router.navigate(['dash']);
        });
      }
    }
    else {
      if (Objdata.find(el => el.Parentmoduledescription === Pathname)) {
        this.commonService.getListOfData('Common/GetCurrencyvalues/' + localStorage.getItem('CompanyID')).subscribe(data => {
          this.Country = data[0].Text;
        });
        this.commonService.getListOfData('Common/GetAccessdetails/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem("userroleID") + '/' + Pathname).subscribe(data => {
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
          if (this.accessdata.find(x => x.Print == true)) {
            this.isNextPrint = false;
          } else {
            this.isNextPrint = true;
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
        this.commonService.getListOfData('Common/Getlogdetails/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem("Doctorname") + '/' + "Drug Expiry List").subscribe(data => {
          this.router.navigate(['dash']);
        });
      }
    }
  }

  Getformaccess() {
    var Pathname = "Inventorylazy/Precriptonvsbilling";
    var n = Pathname;
    var sstring = n.includes("/");
    if (sstring == false) {
      this.commonService.getListOfData('Common/GetAccessdetails/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem("userroleID") + '/' + Pathname).subscribe(data => {
        this.accessdata = data.GetAvccessDetails;
        this.accesspopup1 = 'block';
      });
    }
    else if (sstring == true) {
      this.commonService.getListOfData('Common/GetAccessdetailsstring/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem("userroleID") + '/' + Pathname).subscribe(data => {
        this.accessdata = data.GetAvccessDetails;
        this.accesspopup1 = 'block';
      });
    }
  }


  modalcloseAccessOk() {
    this.accesspopup1 = 'none';
  }

  CheckToDate() {
    this.minToDate = this.M_FromDate;
  }

  Submit() {
    debugger;
    if (this.M_FromDate == null || this.M_ToDate == null) {
      this.Medicalprestable = false;
      Swal.fire({
        type: 'warning',
        title: 'Select Dates',
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          popup: 'alert-warp',
          container: 'alert-container',
        },
      });
    }
      this.Getcmpid = localStorage.getItem('CompanyID');
      this.M_FromDat = this.M_FromDate.toISOString();
      this.M_ToDat = this.M_ToDate.toISOString();
      this.commonService.getListOfData('Med/getDetails/' + this.M_FromDat + '/' + this.M_ToDat + '/' + this.Getcmpid + '/' +localStorage.getItem("GMTTIME")).subscribe(data => {
        debugger;
        if (data.res.length > 0) {
          this.dataSource.data = data.res;
          this.Medicalprestable = true;
          this.ExportMedPres = true;
        }
        else if (data.res.length == 0)
        {
          this.dataSource.data = [];
          this.ExportMedPres = false;
          this.Medicalprestable = false;
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
        }
        else
        {
          this.ExportMedPres = false;
          this.Medicalprestable = false;
          Swal.fire({
            type: 'warning',
            title: 'Invalid Input, Please contact Administrator',
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

  Cancel() {
    this.M_ToDate = null
    this.M_FromDate = null 
    this.dataSource.data = [];
    this.Medicalprestable = false;
    this.ExportMedPres = false;
  }
  CurrentDate = new Date();
  ConvertPDF() {
    debugger
    var companyname = localStorage.getItem("Companyname");
    var Stringfydfata = JSON.stringify(this.dataSource.data);
    var objdata = JSON.parse(Stringfydfata);

    var PrescriptionNo = jQuery.map(objdata, function (n, i) { return n.PrescriptionNo; });
    var Date = objdata.map((todo, i) => {
      var testdata = objdata[i].Date;
      return this.datepipe.transform(testdata, "dd-MMM-yyyy");
    });
    var PrescribedBy = jQuery.map(objdata, function (n, i) { return n.PrescribedBy; });
    var MedPresAmount = objdata.map((todo, i) => {
      var testdata = objdata[i].MedPresAmount;
      return this.cp.transform(testdata, this.Country, true, '1.0-0');
    });
    var BillNo = jQuery.map(objdata, function (n, i) { return n.BillNo; });
    var BillDate = objdata.map((todo, i) => {
      var testdata = objdata[i].BillDate;
      return this.datepipe.transform(testdata, "dd-MMM-yyyy");
    });
    var BillAmount = objdata.map((todo, i) => {
      var testdata = objdata[i].BillAmount;
      return this.cp.transform(testdata, this.Country, true, '1.0-0');
    });
    var FromDate = this.datepipe.transform(this.M_FromDate, "dd-MMM-yyyy");
    var ToDate = this.datepipe.transform(this.M_ToDate, "dd-MMM-yyyy");

    var RepDate = this.datepipe.transform(this.CurrentDate, "dd-MMM-yyyy hh:mm");

    var documentDefinition = {
      info: {
        title: 'Medical Prescription vs Medical Billing',
      },

      pageSize: {
        width: 1350,
        height: 1300
      },
      pageOrientation: 'landscape',
      content: [
        { text: companyname + '                                 Medical Prescription vs Medical Billing', fontSize: 14, background: 'white', color: 'black' },
        { text: `Period: ${FromDate} to ${ToDate}                                                                                               Report Date & Time : ${RepDate}       `, fontSize: 14, background: 'white', color: 'black' },
        {
          style: 'tableExample',
          color: '#444',
          table: {
            headerRows: 1,
            widths: [150, 100, 100, 100, 100, 100, 100],
            body: [
              [{ text: 'Prescription No', style: 'tableHeader', alignment: 'center' },
                { text: 'Date', style: 'tableHeader', alignment: 'center' },
                { text: 'Prescribed By', style: 'tableHeader', alignment: 'center' },
                { text: 'Med Pres Amount', style: 'tableHeader', alignment: 'center' },
                { text: 'BillNo', style: 'tableHeader', alignment: 'center' },
                { text: 'BillDate', style: 'tableHeader', alignment: 'center' },
                { text: 'BillAmount', style: 'tableHeader', alignment: 'center' }],

              [PrescriptionNo, Date, PrescribedBy, MedPresAmount, BillNo, BillDate, BillAmount],

            ],

          },

        }
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 0, 0, 10]
        },
        subheader: {
          fontSize: 16,
          bold: true,
          margin: [0, 10, 0, 5]
        },
        tableExample: {
          margin: [0, 5, 0, 15]
        },
        tableOpacityExample: {
          margin: [0, 5, 0, 15],
          fillColor: 'blue',
          fillOpacity: 0.3
        },
        tableHeader: {
          bold: true,
          fontSize: 13,
          color: 'black'
        }
      },
    };
    pdfMake.createPdf(documentDefinition).download('Medicine Expiry List.pdf');
  }

  ConvertEXCEL() {
    debugger
    let element = document.getElementById('table');
    var cloneTable = element.cloneNode(true);
    jQuery(cloneTable).find('.remove-this').remove();
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(cloneTable);
    var wscols = [
      { wch: 10 },
      { wch: 12 },
      { wch: 30 },
      { wch: 10 }
    ];
    ws['!cols'] = wscols;
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'MedPres vs MedBill');
    XLSX.writeFile(wb, "MedPres vs MedBill.xlsx");
  }

}

