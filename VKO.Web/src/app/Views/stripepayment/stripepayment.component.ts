import { Component, OnInit, ViewChild, Inject } from '@angular/core';
declare var Stripe: any;

import * as RecordRTC from 'recordrtc';
import { Consentdata } from '../../Models/ViewModels/MessagingTemplateViewmodel';
import { Router } from '@angular/router';
import { CommonService } from '../../shared/common.service';
import { MatTableDataSource, MAT_DATE_FORMATS, MAT_DATE_LOCALE, DateAdapter, MAT_DIALOG_DATA, MatDialogRef, MatDialog, MatSort, MatPaginator } from '@angular/material';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DomSanitizer } from '@angular/platform-browser';
import Swal from 'sweetalert2';

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
  selector: 'app-stripepayment',
  templateUrl: './stripepayment.component.html',
  styleUrls: ['./stripepayment.component.less'],
  providers: [

    //{ provide: DEFAULT_CURRENCY_CODE, useValue: 'USD' }
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },

  ],
})
export class StripepaymentComponent implements OnInit {

  constructor(public commonService: CommonService<Consentdata>, public dialog: MatDialog, private _sanitizer: DomSanitizer,
    private router: Router,) { }
  Pathname = "Administrationlazy/Consentviewer";
  disSubmit: boolean = true;
  disprint: boolean = true;
  ngOnInit() {
    var Objdata = JSON.parse(localStorage.getItem("AllCollectionData"));
    if (Objdata.find(el => el.Parentmoduledescription === this.Pathname)) {
      this.commonService.getListOfData('Common/GetAccessdetailsstring/' + localStorage.getItem("CompanyID") +
        '/' + localStorage.getItem("userroleID") + '/' + this.Pathname).subscribe(data => {
          this.commonService.data = data;
          debugger;
          this.accessdata = data.GetAvccessDetails;

          if (this.accessdata.find(x => x.Add == true)) {
            this.disSubmit = false;
          } else {
            this.disSubmit = true;
          }
              });
      this.Appointementsdatsource.paginator = this.paginator;
      this.Appointementsdatsource.sort = this.sort;
    }
    else {

      Swal.fire({
        text: "Un-Authorized Access, Please contact Administrator",
        type: 'warning',
      });
      this.commonService.getListOfData('Common/Getlogdetailsstring/' +
        localStorage.getItem("CompanyID") + '/' + localStorage.getItem("Doctorname") + '/' + this.Pathname).subscribe(data => {
        this.router.navigate(['dash']);
      });


    }

  }

  accesspopup;
  accessdata;
  Getformaccess() {
    debugger;
    this.commonService.getListOfData('Common/GetAccessdetailsstring/' + localStorage.getItem("CompanyID")
      + '/' + localStorage.getItem("userroleID") + '/' + this.Pathname).subscribe(data => {
      debugger;
      this.accessdata = data.GetAvccessDetails;
      this.backdrop = 'block';
      this.accesspopup = 'block';
    });
  }
  modalcloseAccessOk() {
    this.backdrop = 'none';
    this.accesspopup = 'none';
  }

  M_DatePicker1;
  M_DatePicker2;
  Patientdata;
  M_Consentobtained;
  minDate = new Date();

  @ViewChild('APpointPaginator', { static: true } as any) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true } as any) sort: MatSort;
  Appointementsdatsource = new MatTableDataSource();
  APoointmentdisplayedColumns: string[] = ['sno', 'uin', 'name', 'createddate', 'listen', 'view'];
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.Appointementsdatsource.filter = filterValue.trim().toLowerCase();

    if (this.Appointementsdatsource.paginator) {
      this.Appointementsdatsource.paginator.firstPage();
    }
  }
  Searchdata() {
    debugger;

    let fromdate = this.M_DatePicker1.toISOString();
    let Todate = this.M_DatePicker2.toISOString();

    this.commonService.data = new Consentdata();
    this.commonService.data.Fromdate = fromdate;
    this.commonService.data.Todate = Todate;
    this.commonService.data.Consentobtainedby = this.M_Consentobtained;
    this.commonService.data.cmpid = localStorage.getItem("CompanyID");
    this.commonService.postData('RegistrationMaster/GetpatientVoiceconsentdata/', this.commonService.data)
      .subscribe(data => {
        debugger;
        this.Patientdata = data.Totalvoiceconsentdata;
        this.Appointementsdatsource.data = this.Patientdata;

      });
  }
  backdrop;
  voiceclip;
  Voiceaudioclip;
  Viewvoice(element) {
    debugger;
    this.backdrop = 'block';
    this.voiceclip = 'block';

    this.commonService.getListOfData('RegistrationMaster/Getpatientvoice/' + element.UIN).subscribe(res => {
      debugger;
      console.log(res);      
      var dats = res.ProductImage;
      localStorage.setItem("audiopath", dats);
      
    });
    //this.Voiceaudioclip = "assets/PatientVoiceConsent/" + element.UIN;
  }
  pathss;
  transform() {
    this.pathss = localStorage.getItem('audiopath');
    return this._sanitizer.bypassSecurityTrustResourceUrl('data:audio/wav;base64,' + this.pathss);
  }
  voiceclipClose() {
    this.backdrop = 'none';
    this.voiceclip = 'none';
  }
  Voicevideoclip;
  VideoClip;

  Viewvideo(element) {
    debugger;
    //this.backdrop = 'block';
    //this.VideoClip = 'block';
    //this.Voicevideoclip = element.UIN;
    
    //localStorage.setItem("VideoUIN", element.UIN);

    this.commonService.getListOfData('RegistrationMaster/Getpatientvideo/' + element.UIN).subscribe(res => {
      debugger;
      console.log(res);
      var dats = res.ProductImage;
      //localStorage.setItem("videopath", dats);
      const dialogRef = this.dialog.open(StripeDialogbox, {
        data: {
          dataKey: res.ProductImage
        },
        height: '60%',
        width: '40%',
        position: { top: '50px', right: '420px', },

        disableClose: true
      });
    });
  
  }

  VideoClipclipClose() {
    this.backdrop = 'none';
    this.VideoClip = 'none';
  }
  Cancelall() {
    this.router.navigateByUrl('/dash', { skipLocationChange: true }).then(() => {
      this.router.navigate(['Consentviewer']);
    });
  }

}



@Component({
  selector: 'StripeDialogbox',
  templateUrl: 'StripeDialogbox.html',
  
})


export class StripeDialogbox implements OnInit {


  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: any, public commonService: CommonService<Consentdata>,
    public dialogRef: MatDialogRef<StripeDialogbox>, private _sanitizer: DomSanitizer
  ) { }
  Voicevideoclip;
  ngOnInit() {
    debugger;
    console.log(this.data)
    //this.commonService.getListOfData('RegistrationMaster/Getpatientvideo/' + this.data.dataKey).subscribe(res => {
    //  debugger;
    //  console.log(res);
    //  var dats = res.ProductImage;
    //  localStorage.setItem("videopath", dats);
      
    //});
    //this.Voicevideoclip = "E:/Wynk_EMR/WYNK.Services/PatientVoiceConsent" + localStorage.getItem("VideoUIN");
  }

  pathss;
  transformvideo() {
    debugger;
    this.pathss = this.data.dataKey;
      return this._sanitizer.bypassSecurityTrustResourceUrl('data:video/webm;base64,' + this.pathss);
  }

  Loadvideo() {
    this.ngOnInit();
  }

  VideoClipclipClose() {
    
    this.dialogRef.close({ success: false });
  }


  ////////////////////////
}

