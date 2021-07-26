import { Component, OnInit, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
import { CommonService } from '../../shared/common.service';
import { SetupMaster } from '../../Models/ViewModels/Setupmaster.viewmodel';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { LocalStorage } from '@ng-idle/core';
import { NgForm } from '@angular/forms';


declare var $: any;

@Component({
  selector: 'app-setupmaster',
  templateUrl: './setupmaster.component.html',
  styleUrls: ['./setupmaster.component.less']
})
export class SetupmasterComponent implements OnInit {

  constructor(public commonService: CommonService<SetupMaster>,
    private router: Router,
    private _sanitizer: DomSanitizer,
  ) { }
  VAname;
  hideupdate: boolean = false;
  hidesubmit: boolean = true;
  hiddenimageurl: boolean = true;
  hiddenimageurlss: boolean = true;
  disSubmit: boolean = true;
  disprint: boolean = true;
  accessdata;
  nfa;
  Pathname = "Administrationlazy/SetupMaster";
  cmpname;
  languagesdata;
  ngOnInit() {
    this.orgname = localStorage.getItem("Companyname");
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
          if (this.accessdata.find(x => x.Edit == true)) {
            this.disprint = false;
          } else {
            this.disprint = true;
          }
        });
      this.getAllDropdowns();
      this.hidesubmit = true;
      this.hideupdate = false;
      this.hiddenimageurl = false;
      this.hiddenimageurlss = true;
      this.commonService.getListOfData('Common/Loadallavailablelanguages/').subscribe(data => {
        this.languagesdata = data.Languagedetauils;

      });
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

  karthick(event): boolean {
    debugger;
    var currentChar = parseInt(String.fromCharCode(event.keyCode), 10);
    if (!isNaN(currentChar)) {
      var nextValue = $("#txthour").val() + currentChar; //It's a string concatenation, not an addition

      if (parseInt(nextValue, 10) < 121) return true;
    }


    return false;
  }
  karthicks(event): boolean {
    debugger;
    var currentChar = parseInt(String.fromCharCode(event.keyCode), 10);
    if (!isNaN(currentChar)) {
      var nextValue = $("#txthours").val() + currentChar; //It's a string concatenation, not an addition

      if (parseInt(nextValue, 10) < 121) return true;
    }


    return false;
  }
  Getformaccess() {
    debugger;
    this.commonService.getListOfData('Common/GetAccessdetailsstring/' +
      localStorage.getItem("CompanyID") + '/' + localStorage.getItem("userroleID") + '/' + this.Pathname).subscribe(data => {
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

  getAllDropdowns() {
    this.commonService.getListOfData('Common/Getcountryvalues').subscribe(data => { this.VAname = data; });
  }

  RestrictNegativeValues1(e): boolean {

    if (!(e.keyCode >= 48 && e.keyCode <= 57 || e.keyCode == 46)) {
      return false;
    }
  }

  Restrict(event) {
    debugger;
    if (event.target.value > 23) {
      Swal.fire({
        type: 'warning',
        title: 'Invalid Time',
      })
      event.target.value = '';
    }
  }

  RestrictNegativeValues1m(e): boolean {

    if (!(e.keyCode >= 48 && e.keyCode <= 57 || e.keyCode == 46)) {
      return false;
    }
  }

  Restrictm(event) {
    debugger;

    if (event.target.value > 59) {
      Swal.fire({
        type: 'warning',
        title: 'Invalid Time',
      })
      event.target.value = '';
    }
  }
  code;
  ccode;
  flagcode;
  countrychoose() {
    this.commonService.getListOfData('SetupMaster/Getcountrycurrency/' + this.Country_M)
      .subscribe(data => {
        this.commonService.data = data;
        debugger;
        this.flagcode = "flag-icon flag-icon-" + data.Countrycode + " flag-icon-squared";
        this.code = data.Currencycode;
        this.ccode = data.Countrycode;
      });
  }

  urlsslod = [];
  imgURL: any;
  public message: string;
  imagePath;

  previewimg(files) {
    if (files.length > 1)
      return;
    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Only images are supported.";
      return;
    }
    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    }
  }
  onSelectFile(event) {
    debugger;
    this.urls = [];
    let imgname = event.target.files[0].name;
    //this.previewimg(files);

    if (event.target.files && event.target.files[0]) {
      var filesAmount = event.target.files.length;
      for (let i = 0; i < filesAmount; i++) {
        const fileReader: FileReader = new FileReader();

        fileReader.onload = (event) => {
          debugger;
          console.log(fileReader.result);
          //this.urls = [];
          this.urls.push(fileReader.result);
        }

        fileReader.readAsDataURL(event.target.files[i]);
      }

      // let name = event.target.value;
    }



  }

  urls = [];

  removeOpticalsl(i) {

    this.urls.splice(i, 1);

  }
  img1;
  //@ViewChild('DrugImage1')
  ModalDatecheckundefined;
  backdrop;
  ErrorModalDatecheckundefined;

  ModalDatecheckundefinedClosesss() {
    this.backdrop = 'none';
    this.ModalDatecheckundefined = 'none';
    this.router.navigateByUrl('/dash', { skipLocationChange: true }).then(() => {
      this.router.navigate(["Administrationlazy/SetupMaster"]);
    });
  }

  ErrorModalDatecheckundefinedClosesss() {
    this.backdrop = 'none';
    this.ErrorModalDatecheckundefined = 'none';
  }
  // img1;
  ind;
  resu;
  blobsize;
  file: File = null;
  Language_M;
  HH;
  MM;
  TOHH;
  TOMM;
  eveningFromHH;
  eveningToMM;
  eveinisecondTOEHH;
  eveingsecondTOMM;
  Checksecondtovalidation() {
    debugger;
    var tohour = this.eveinisecondTOEHH;
    var fromhour = this.eveningFromHH;
    if (tohour < fromhour) {
      Swal.fire({
        type: 'warning',
        title: 'warning',
        text: 'To Hour should not be greater than from hour',
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          popup: 'alert-warp',
          container: 'alert-container',
        },
      });
      this.eveningFromHH = null;
      this.eveningFromHH = '';
    }
  }
  Checksecondfromvalidation() {
    debugger;
    var tohour = this.TOHH;
    var fromhour = this.eveningFromHH;
    if (fromhour < tohour) {
      Swal.fire({
        type: 'warning',
        title: 'warning',
        text: 'To Hour should not be greater than from hour',
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          popup: 'alert-warp',
          container: 'alert-container',
        },
      });
      this.eveinisecondTOEHH = null;
      this.eveinisecondTOEHH = '';
    }
  }
  Checkfromvalidation() {
    debugger;
    var tohour = this.TOHH;
    var fromhour = this.HH;

    if (this.eveningToMM == "00" && this.eveningFromHH == "00") {
      this.NodesecfromForm.reset();
      Swal.fire({
        type: 'warning',
        title: 'warning',
        text: 'Invalid Time',
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          popup: 'alert-warp',
          container: 'alert-container',
        },
      });
    } else if (tohour < fromhour) {
      Swal.fire({
        type: 'warning',
        title: 'warning',
        text: 'To Hour should not be greater than from hour',
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          popup: 'alert-warp',
          container: 'alert-container',
        },
      });
      this.TOHH = null;
      this.TOHH = '';
    }
  }
  @ViewChild('NodefromsetupMasterForm') NodefromForm: NgForm;
  @ViewChild('NodetosetupMasterForm') NodetoForm: NgForm;
  @ViewChild('NodesecfromsetupMasterForm') NodesecfromForm: NgForm;
  @ViewChild('NodesectosetupMasterForm') NodesectoForm: NgForm;
  Checkfromvalidationzeronegation(NodefromForm: NgForm) {
    debugger;
    if (this.FMM == "00" && this.FHH == "00") {
      NodefromForm.reset();
      Swal.fire({
        type: 'warning',
        title: 'warning',
        text: 'Invalid Time',
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

  //Checkfromvalidationzerosecfromnegation() {
  //  if (this.eveningToMM == "00" && this.eveningFromHH == "00") {
  //    this.NodeForm.reset();
  //    Swal.fire({
  //      type: 'warning',
  //      title: 'warning',
  //      text: 'Invalid Time',
  //      position: 'top-end',
  //      showConfirmButton: false,
  //      timer: 1500,
  //      customClass: {
  //        popup: 'alert-warp',
  //        container: 'alert-container',
  //      },
  //    });
  //  }
  //}
  //Checkfromvalidationzerosectonegation() {
  //  if (this.eveingsecondTOMM == "00" && this.eveinisecondTOEHH == "00") {
  //    this.NodeForm.reset();
  //    Swal.fire({
  //      type: 'warning',
  //      title: 'warning',
  //      text: 'Invalid Time',
  //      position: 'top-end',
  //      showConfirmButton: false,
  //      timer: 1500,
  //      customClass: {
  //        popup: 'alert-warp',
  //        container: 'alert-container',
  //      },
  //    });

  //  }
  //}
  //Checkfromvalidationzerotonegation() {
  //  if (this.TOMM == "00" && this.TOHH == "00") {
  //    this.NodeForm.reset();
  //    Swal.fire({
  //      type: 'warning',
  //      title: 'warning',
  //      text: 'Invalid Time',
  //      position: 'top-end',
  //      showConfirmButton: false,
  //      timer: 1500,
  //      customClass: {
  //        popup: 'alert-warp',
  //        container: 'alert-container',
  //      },
  //    });

  //  }
  //}
  Restrictmss(event) {
    debugger;
    if (this.TOMM == "00" && this.TOHH == "00") {
      this.NodetoForm.reset();
      Swal.fire({
        type: 'warning',
        title: 'warning',
        text: 'Invalid Time',
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          popup: 'alert-warp',
          container: 'alert-container',
        },
      });

    } else if (event.target.value > 23) {
      Swal.fire({
        type: 'warning',
        title: 'warning',
        text: 'Invalid Time',
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          popup: 'alert-warp',
          container: 'alert-container',
        },
      });
      event.target.value = '';
    }
  }

  Restrictmsss(event) {
    debugger;
    if (this.eveingsecondTOMM == "00" && this.eveinisecondTOEHH == "00") {
      this.NodesectoForm.reset();
      Swal.fire({
        type: 'warning',
        title: 'warning',
        text: 'Invalid Time',
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          popup: 'alert-warp',
          container: 'alert-container',
        },
      });

    } else if (event.target.value > 23) {
      Swal.fire({
        type: 'warning',
        title: 'warning',
        text: 'Invalid Time',
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          popup: 'alert-warp',
          container: 'alert-container',
        },
      });
      event.target.value = '';
    }
  }
  GAP_M;
  isInvalid = false;
  csa: string;
  rfa: string;

  @ViewChild('setupMasterForm') Form: NgForm;
  submit(Form: NgForm) {
    debugger;
    if (Form.valid) {
      this.isInvalid = false;
      this.commonService.data.cmpid = localStorage.getItem("CompanyID");
      this.commonService.data.age = this.APG;
      this.commonService.data.currency = this.code;
      this.commonService.data.country = this.Country_M;
      this.commonService.data.roomtime = this.HH + ':' + this.MM;
      this.commonService.data.Language = "English (India) - en-IN";
      this.commonService.data.GAPINTERVAL = this.GAP_M;
      this.commonService.data.FROM = this.FHH + ':' + this.FMM;
      this.commonService.data.TO = this.TOHH + ':' + this.TOMM;
      this.commonService.data.SECFROM = this.eveningFromHH + ':' + this.eveningToMM;
      this.commonService.data.SECTO = this.eveinisecondTOEHH + ':' + this.eveingsecondTOMM;

      this.commonService.data.cfa = this.csa;
      this.commonService.data.rfa = this.rfa;
      this.commonService.data.nfa = this.nfa;

      this.commonService.postData('SetupMaster/InsertSetupdata', this.commonService.data)
        .subscribe(data => {
          this.commonService.data = data;
          if (data.Success == true) {

            const image = this.urls;
            console.log(image);
            var bb: any;
            bb = this.base64toBlob(image);
            debugger;
            this.img1 = bb;

            if (this.img1 != null) {
              for (var i = 0, j = this.img1.length; i < j; i++) {
                var Imageblob = this.img1[i];

                this.ind = this.img1.indexOf(this.img1[i]);

                var idesc = this.resu;
                var uinn = localStorage.getItem("CompanyID") + this.ind;
                this.blobsize = new File([Imageblob], 'imageFileName.png');

                if (this.blobsize != null) {
                  debugger;
                  this.commonService.postFile('SetupMaster/uploadImag/' + localStorage.getItem("CompanyID"), this.blobsize)
                    .subscribe(res => {
                      debugger;
                      this.file = null;
                      $("#odslitimg").val('');
                    });
                }

              }
              this.blobss = [];
              this.urls = [];
            }



            this.backdrop = 'block';
            this.ModalDatecheckundefined = 'block';

          } else {
            this.backdrop = 'block';
            this.ErrorModalDatecheckundefined = 'block';

          }


        });

    } else {
      Swal.fire({
        type: 'warning',
        title: 'warning',
        text: 'Check inputs',
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
  PG;
  FMM;
  FHH;
  APG;
  blobss = [];
  Country_M;

  base64toBlob(image) {
    debugger;
    for (var i = 0, j = image.length; i < j; i++) {
      var img = document.createElement('img');
      img.src = image[i];
      var byteString = atob(image[i].replace(/^data:image\/(png|jpeg|jpg);base64,/, ''));
      var ab = new ArrayBuffer(byteString.length);
      var ia = new Uint8Array(ab);
      for (var k = 0; k < byteString.length; k++) {
        ia[k] = byteString.charCodeAt(k);
      }
      var cmd = new Blob([ab]);
      this.blobss.push(cmd);
      debugger;
      var blob = this.blobss;

    }
    return blob;
  }
  Setupblock;
  setupdata;

  Clicksetupdetails() {
    debugger;
    this.commonService.getListOfData('SetupMaster/getsetupdata/' + localStorage.getItem("CompanyID"))
      .subscribe(data => {
        this.setupdata = data.SetupMasterFulldetailsS;
        this.backdrop = 'block';
        this.Setupblock = 'block';

      });
  }
  SetupblockClosesss() {
    this.backdrop = 'none';
    this.Setupblock = 'none';
  }

  orgname;
  getdata(fadata) {
    debugger;
    this.backdrop = 'none';
    this.Setupblock = 'none';
    this.code = fadata.country;
    this.APG = fadata.age;
    this.orgname = fadata.cmp;
    this.GAP_M = fadata.gap;
    this.FHH = fadata.fsfrom;
    this.TOHH = fadata.fsto;
    this.eveningFromHH = fadata.ssfrom;
    this.eveinisecondTOEHH = fadata.ssto;
    this.rfa = fadata.rfa;
    this.csa = fadata.cfa;
    this.nfa = fadata.nfa;
    this.FMM = fadata.fsfromm;
    this.TOMM = fadata.fstom;
    this.eveningToMM = fadata.ssfromm;
    this.eveingsecondTOMM = fadata.sstom;


    localStorage.setItem('CMPNAME', fadata.cmp)

    if (fadata.country != null) {
      let tempEngage = this.VAname.find(x => x.Text == fadata.country)
      this.Country_M = tempEngage.Value
    }

    this.commonService.getListOfData('SetupMaster/Getcountrycurrency/' + this.Country_M)
      .subscribe(data => {
        this.commonService.data = data;
        debugger;
        this.flagcode = "flag-icon flag-icon-" + data.Countrycode + " flag-icon-squared";

        this.code = data.Currencycode;
        this.ccode = data.Countrycode;
      });
    var dataa = fadata.Roomtime;

    if (dataa != null) {

      this.HH = dataa.substring(0, 2);
      this.MM = dataa.substring(3, 5);
    }

    this.hidesubmit = false;
    this.hideupdate = true;
    if (fadata.ProductImage != null) {
      this.hiddenimageurl = true;
      this.hiddenimageurlss = true;
      localStorage.setItem('urls', fadata.ProductImage);
    }

    // return this._sanitizer.bypassSecurityTrustResourceUrl('data:image/png;base64,' + this.pathss);
    //this.code = fadata.country;

  }
  pathss
  transform() {
    this.pathss = localStorage.getItem('urls');
    return this._sanitizer.bypassSecurityTrustResourceUrl('data:image/png;base64,' + this.pathss);
  }

  Update(Form: NgForm) {
    debugger;
    if (Form.valid) {
      this.isInvalid = false;
      this.commonService.data.cmpid = localStorage.getItem("CompanyID");
      this.commonService.data.age = this.APG;
      this.commonService.data.currency = this.code;
      this.commonService.data.country = this.Country_M;
      this.commonService.data.roomtime = this.HH + ':' + this.MM;
      this.commonService.data.Language = "English (India) - en-IN";
      this.commonService.data.GAPINTERVAL = this.GAP_M;
      this.commonService.data.FROM = this.FHH + ':' + this.FMM;
      this.commonService.data.TO = this.TOHH + ':' + this.TOMM;
      this.commonService.data.SECFROM = this.eveningFromHH + ':' + this.eveningToMM;
      this.commonService.data.SECTO = this.eveinisecondTOEHH + ':' + this.eveingsecondTOMM;
      this.commonService.data.cfa = this.csa;
      this.commonService.data.rfa = this.rfa;
      this.commonService.data.nfa = this.nfa;
      this.commonService.postData('SetupMaster/UpdateSetupdata', this.commonService.data)
        .subscribe(data => {
          this.commonService.data = data;
          if (data.Success == true) {

            const image = this.urls;
            console.log(image);
            var bb: any;
            bb = this.base64toBlob(image);
            debugger;
            this.img1 = bb;

            if (this.img1 != null) {
              for (var i = 0, j = this.img1.length; i < j; i++) {
                var Imageblob = this.img1[i];

                this.ind = this.img1.indexOf(this.img1[i]);

                var idesc = this.resu;
                var uinn = localStorage.getItem("CompanyID") + this.ind;
                this.blobsize = new File([Imageblob], 'imageFileName.png');

                if (this.blobsize != null) {
                  debugger;
                  this.commonService.postFile('SetupMaster/uploadImag/' + localStorage.getItem("CMPNAME"), this.blobsize)
                    .subscribe(res => {
                      debugger;
                      this.file = null;
                      $("#odslitimg").val('');
                    });
                }

              }
              this.blobss = [];
              this.urls = [];
            }



            this.backdrop = 'block';
            this.ModalDatecheckundefined = 'block';

          } else {
            this.backdrop = 'block';
            this.ErrorModalDatecheckundefined = 'block';

          }

        });

    } else {
      Swal.fire({
        type: 'warning',
        title: 'warning',
        text: 'Check inputs',
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


  Cancel() {
    this.router.navigateByUrl('/dash', { skipLocationChange: true }).then(() => {
      this.router.navigate(["Administrationlazy/SetupMaster"]);
    });
  }
  //////////////////////////////////////////////////////////////////////////////////////////////////
}
