import { Component, OnInit, ViewChild, ElementRef, Inject } from '@angular/core';
import { CommonService } from '../../shared/common.service';
import { Search, Persondetails, Persondetailspost } from '../../Models/ViewModels/search.model';
import { RegistrationMaster } from '../../Models/ViewModels/RegistrationMasterWebViewModel ';
import { MatTableDataSource, MatSort, MatDialogRef } from '@angular/material';
import { MAT_DIALOG_DATA } from '@angular/material';
import * as _ from 'lodash';
import Swal from 'sweetalert2';
// import { debug } from 'util';
import * as XLSX from 'xlsx';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import { Router } from '@angular/router';
import { CampRegistrationViewModel } from '../../Models/ViewModels/CampRegistrationViewModel';


declare var $: any;
declare var jQuery: any;

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.less']
})
export class SearchComponent implements OnInit {


  constructor(public dialogRef: MatDialogRef<SearchComponent>, public commonService: CommonService<Search>, private router: Router,
    public commonServices: CommonService<RegistrationMaster>, public commonServiceCamp: CommonService<CampRegistrationViewModel>, @Inject(MAT_DIALOG_DATA) public data: any) { }
  UIN;
  helpname;
  M_UIN;
  M_Name;
  M_Age;
  M_phone;
  // UIN;
  Age;
  Phone;
  LensHead = false;
  FrameHead = false;
  // helpname;
  Name;
  hiddenReview = false;
  hiddenSearchBT = false;
  columns: string[];

  @ViewChild(MatSort) sort: MatSort;
  hiddenSearchBT1 = true;
  // @ViewChild('sortCol1') sortCol1: MatSort;
  @ViewChild('contentToConvert') contentToConvert: ElementRef;
  @ViewChild('table') table: ElementRef;
  backdrop;
  Excelformatprint;
  displayedColumns: string[];
  displayedColumnsA: string[];
  displayedColumnsB: string[];
  dataSource = new MatTableDataSource();

  hidepdfexcel = true;

  person1 = [];
  details1 = [];
  postperson = [];
  postdetails = [];
  postdetails1 = [];

  person = [];
  details = [];
  details2 = [];
  M_search;


  ExcelName;
  PdfName;
  sheetName;


  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit() {
    debugger;
    this.helpname = localStorage.getItem('helpname');
    this.UIN = localStorage.getItem('UIN');
    this.Name = localStorage.getItem('Name');
    this.Age = localStorage.getItem('Age');
    this.Phone = localStorage.getItem('Phone');
    this.gethelpdetails();
    this.selectedHeader();
    this.selectedRev();


    if (this.helpname == 'Registration') {
      this.hiddenSearchBT1 = false;
      this.hiddenSearchBT = false;
    }
    else if (this.helpname == 'CampRegistration') {
        this.hiddenSearchBT1 = false;
        this.hiddenSearchBT = false;
    } else if (this.helpname == 'AdvancePayment') {
      this.hiddenSearchBT1 = false;
      this.hiddenSearchBT = false;
    } else if (this.helpname == 'InvPrescription') {
      this.hiddenSearchBT1 = false;
      this.hiddenSearchBT = false;
    } else if (this.helpname == 'MEDICALPRESCRIPTIONFORM') {
      this.hiddenSearchBT1 = false;
      this.hiddenSearchBT = false;
    } else if (this.helpname == 'ModuleMaster') {
      this.hiddenSearchBT1 = false;
      this.hiddenSearchBT = false;
    } else if (this.helpname == 'TransactionType') {
      this.hiddenSearchBT1 = false;
      this.hiddenSearchBT = false;
      // this.hiddenSearchFilter1 = false;
      // this.hiddenSearchFilter2 = true;

    } else if (this.helpname == 'CompanyMaster') {
      this.hiddenSearchBT1 = false;
      this.hiddenSearchBT = false;
    } else if (this.helpname == 'DrugGroup') {
      this.hiddenSearchBT1 = false;
      this.hiddenSearchBT = false;
    } else if (this.helpname == 'Configuration') {
      this.hiddenSearchBT1 = false;
      this.hiddenSearchBT = false;
    } else if (this.helpname == 'UserActive') {
      this.hiddenSearchBT1 = false;
      this.hiddenSearchBT = false;
    } else if (this.helpname == 'SlitLamp') {
      this.hiddenSearchBT1 = false;
      this.hiddenSearchBT = false;
    } else if (this.helpname == 'Fundus') {
      this.hiddenSearchBT1 = false;
      this.hiddenSearchBT = false;
    } else if (this.helpname == 'Appointment') {
      this.hiddenSearchBT1 = false;
      this.hiddenSearchBT = false;
    }

    //
  }

  fireEventt() {
    debugger;
    this.displayedColumns = this.displayedColumnsA;
    this.backdrop = 'block';
    this.Excelformatprint = 'block';
  }

  printclose() {
    debugger;
    this.displayedColumns = this.displayedColumnsB;
    this.backdrop = 'none';
    this.Excelformatprint = 'none';
  }

  fireEvent() {
    debugger;
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.table.nativeElement);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'Emr excel file.xlsx');
  }

  modalSuccesPrintOk() {
    debugger;
    let printContents, popupWin;
    printContents = document.getElementById('section').innerHTML;
    popupWin = window.open('', '_blank', 'top=0,left=0,height=auto,width=100%');
    popupWin.document.open();
    popupWin.document.write(`
             <html>
             <head>
              <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">
            <title></title>
            <style>
            //........Customized style.......
            </style>
          </head>
      <body onload="window.print();window.close()">${printContents}</body>
        </html>`);
    popupWin.document.close();

    // this.router.navigateByUrl('/dash', { skipLocationChange: true }).then(() => {
    //  this.router.navigate(['OpticalBillRegister']);
    // });
  }


  gethelpdetails() {
    if (this.helpname == 'Store Information') {
      this.getstoredetails();
      this.displayedColumns = ['checked', 'SINName', 'SINAddress1', 'SINAddress2', 'SINAddress3', 'SINLocationId', 'Phonestore'];
      this.displayedColumnsA = ['SINName', 'SINAddress1', 'SINAddress2', 'SINAddress3', 'SINLocationId', 'Phonestore'];
      this.displayedColumnsB = ['checked', 'SINName', 'SINAddress1', 'SINAddress2', 'SINAddress3', 'SINLocationId', 'Phonestore'];
      this.dataSource = new MatTableDataSource();

    }

    if (this.helpname == 'OperationIndentSearch') {
      this.getindetsearchdetails();
      this.displayedColumns = ['checked', 'Soperation', 'Sindentraisedby', 'SIndentdate', 'Storename', 'storeaddress1', 'saddress2', 'Phonenumberrstore', 'sBarnd', 'sindentqty'];
      this.displayedColumnsA = ['Soperation', 'Sindentraisedby', 'SIndentdate', 'Storename', 'storeaddress1', 'saddress2', 'saddrwss3', 'Phonenumberrstore', 'sBarnd', 'sindentqty'];
      this.displayedColumnsB = ['checked', 'Soperation', 'Sindentraisedby', 'SIndentdate', 'Storename', 'storeaddress1', 'saddress2', 'saddrwss3', 'Phonenumberrstore', 'sBarnd', 'sindentqty'];
      this.dataSource = new MatTableDataSource();

    }


    if (this.helpname == 'AdvancePayment') {

      this.displayedColumns = ['checked', 'ADVUIN', 'ADVName', 'ADVAge', 'ADVGender',];
      this.displayedColumnsA = ['ADVUIN', 'ADVName', 'ADVAge', 'ADVGender',];
      this.displayedColumnsB = ['checked', 'ADVUIN', 'ADVName', 'ADVAge', 'ADVGender',];
      this.dataSource = new MatTableDataSource();
    }
    if (this.helpname == 'Insurance') {

      this.displayedColumns = ['checked', 'INName', 'INAddress1', 'INAddress2', 'INAddress3', 'INLocationId', 'INPincode', 'INInsuranceCategory',];
      this.displayedColumnsA = ['INName', 'INAddress1', 'INAddress2', 'INAddress3', 'INLocationId', 'INPincode', 'INInsuranceCategory',];
      this.displayedColumnsB = ['checked', 'INName', 'INAddress1', 'INAddress2', 'INAddress3', 'INLocationId', 'INPincode', 'INInsuranceCategory',];
      this.dataSource = new MatTableDataSource();
    }
    //if (this.helpname == 'BusinessRule') {
    //  // this.BusinessRule();
    //  this.displayedColumns = ['checked', 'BRTIsActive', 'BRTEffectiveDate',];
    //  this.displayedColumnsA = ['BRTIsActive', 'BRTEffectiveDate',];
    //  this.displayedColumnsB = ['checked', 'BRTIsActive', 'BRTEffectiveDate',];
    //  this.dataSource = new MatTableDataSource();
    //}
    if (this.helpname == 'Customer Master') {
      this.CustomerMasterDetails();
      this.displayedColumns = ['checked', 'UIN', 'Name', 'MIDNAME', 'LNAME', 'Address1', 'Address2', 'Address3', 'C_LocationName',  'vMobileNo', 'vPhoneNo', 'ContactPerson'];
      this.displayedColumnsA = ['UIN', 'Name', 'MIDNAME', 'LNAME', 'Address1', 'Address2', 'Address3', 'C_LocationName', 'vMobileNo', 'vPhoneNo', 'ContactPerson'];
      this.displayedColumnsB = ['checked', 'UIN', 'Name', 'MIDNAME', 'LNAME', 'Address1', 'Address2', 'Address3', 'C_LocationName',  'vMobileNo', 'vPhoneNo', 'ContactPerson'];
      this.dataSource = new MatTableDataSource();
    }

    if (this.helpname == 'Donor') {
      this.DonorDetails();
      this.displayedColumns = ['checked','DonorType', 'Name', 'MIDNAME', 'LNAME', 'Address1', 'Address2', 'Address3', 'C_LocationName', 'C_GSTNo', 'vMobileNo', 'vPhoneNo', 'ContactPerson'];
      this.displayedColumnsA = [ 'DonorType','Name', 'MIDNAME', 'LNAME', 'Address1', 'Address2', 'Address3', 'C_LocationName', 'C_GSTNo', 'vMobileNo', 'vPhoneNo', 'ContactPerson'];
      this.displayedColumnsB = ['checked', 'DonorType', 'Name', 'MIDNAME', 'LNAME', 'Address1', 'Address2', 'Address3', 'C_LocationName', 'C_GSTNo', 'vMobileNo', 'vPhoneNo', 'ContactPerson'];
      this.dataSource = new MatTableDataSource();
    }

    if (this.helpname == 'doctormaster') {
      this.displayedColumns = ['checked', 'DoctorName', 'Address1', 'Address2', 'Address3', 'RegistrationNumber', 'EngagementType', 'Phone1', 'Phone2', 'EmailID', 'Speciality'];
      this.displayedColumnsA = ['DoctorName', 'Address1', 'Address2', 'Address3', 'Designation', 'RegistrationNumber', 'EngagementType', 'Phone1', 'Phone2', 'EmailID', 'Speciality'];
      this.displayedColumnsB = ['checked', 'DoctorName', 'Address1', 'Address2', 'Address3', 'Designation', 'RegistrationNumber', 'EngagementType', 'Phone1', 'Phone2', 'EmailID', 'Speciality'];
      this.dataSource = new MatTableDataSource();
    } else if (this.helpname == 'icdmaster') {
      this.displayedColumns = ['checked', 'Code', 'description', 'speciality','roomtype', 'icdgroup'];
      this.displayedColumnsA = ['Code', 'description', 'speciality', 'roomtype','icdgroup'];
      this.displayedColumnsB = ['checked', 'Code', 'description', 'speciality','roomtype', 'icdgroup'];
      this.dataSource = new MatTableDataSource();
    } else if (this.helpname == 'Employeemaster') {
      this.EmployeeView();
      this.displayedColumns = ['checked', 'EmployeeID', 'EmployeeName', 'PresentAddress1', 'PresentLocationID', 'PresentLandmark', 'PermanentAddress1', 'PermanentLocationID', 'PermanentLandmark', 'DOJ', 'DOR', 'EmergencyContactName', 'EmergencyContactNo', 'BloodGroup', 'Status'];
      this.displayedColumnsA = ['EmployeeID', 'EmployeeName', 'PresentAddress1', 'PresentLocationID', 'PresentLandmark', 'PermanentAddress1', 'PermanentLocationID', 'PermanentLandmark', 'DOJ', 'DOR', 'EmergencyContactName', 'EmergencyContactNo', 'BloodGroup', 'Status'];
      this.displayedColumnsB = ['checked', 'EmployeeID', 'EmployeeName', 'PresentAddress1', 'PresentLocationID', 'PresentLandmark', 'PermanentAddress1', 'PermanentLocationID', 'PermanentLandmark', 'DOJ', 'DOR', 'EmergencyContactName', 'EmergencyContactNo', 'BloodGroup', 'Status'];
      this.dataSource = new MatTableDataSource();

    } else if (this.helpname == 'Drugmaster') {

      this.displayedColumns = ['checked', 'Brand', 'MedicineName', 'DrugGroup', 'Manufacturer', 'UOM', 'Rate', 'GST', 'CESS', 'ADDCESS', 'Status'];
      this.displayedColumnsA = ['Brand', 'MedicineName', 'DrugGroupID', 'Manufacturer', 'UOM', 'Rate', 'GST', 'CESS', 'ADDCESS', 'Status'];
      this.displayedColumnsB = ['checked', 'Brand', 'MedicineName', 'DrugGroup', 'Manufacturer', 'UOM', 'Rate', 'GST', 'CESS', 'ADDCESS', 'Status'];
      this.dataSource = new MatTableDataSource();

    } else if (this.helpname == 'TransactionType') {
      debugger;
      this.TransactionTypeDetails();
      this.displayedColumns = ['checked', 'TT_Description', 'TT_ContraTransaction', 'TT_RecPayTransaction', 'TT_Rec_Issue_type'];
      this.displayedColumnsA = ['TT_Description', 'TT_ContraTransaction', 'TT_RecPayTransaction', 'TT_Rec_Issue_type'];
      this.displayedColumnsB = ['checked', 'TT_Description', 'TT_ContraTransaction', 'TT_RecPayTransaction', 'TT_Rec_Issue_type'];
      this.dataSource = new MatTableDataSource();
    } else if (this.helpname == 'Registration') {
      debugger;
      this.displayedColumns = ['checked', 'UIN','oldUIN', 'DateofRegistration', 'RName', 'RBaselocation', 'DateofBirth', 'Gender', 'RAddress1', 'RAddress2', 'RAddress3', 'MaritalStatusReg', 'REmailID', 'AlternateMailIDReg', 'Phone', 'AlternatePhoneNumberReg', 'Occupation', 'SourceofReferralID'];
      this.displayedColumnsA = ['UIN', 'DateofRegistration', 'RName', 'RBaselocation', 'DateofBirth', 'Gender', 'RAddress1', 'RAddress2', 'RAddress3', 'MaritalStatusReg', 'REmailID', 'AlternateMailIDReg', 'Phone', 'AlternatePhoneNumberReg', 'Occupation', 'SourceofReferralID'];
      this.displayedColumnsB = ['checked', 'UIN', 'DateofRegistration', 'RName', 'RBaselocation', 'DateofBirth', 'Gender', 'RAddress1', 'RAddress2', 'RAddress3', 'MaritalStatusReg', 'REmailID', 'AlternateMailIDReg', 'Phone', 'AlternatePhoneNumberReg', 'Occupation', 'SourceofReferralID'];
      this.dataSource = new MatTableDataSource();
    }

    else if (this.helpname == 'CampRegistration') {
      debugger;


      this.displayedColumns = ['checked', 'RCampName', 'UIN', 'DateofRegistration', 'RName',  'DateofBirth', 'Gender', 'RAddress1', 'RAddress2', 'RAddress3', 'MaritalStatusReg', 'REmailID', 'AlternateMailIDReg', 'Phone', 'AlternatePhoneNumberReg', 'Occupation', 'SourceofReferralID'];
      this.displayedColumnsA = ['RCampName', 'UIN', 'DateofRegistration', 'RName',  'DateofBirth', 'Gender', 'RAddress1', 'RAddress2', 'RAddress3', 'MaritalStatusReg', 'REmailID', 'AlternateMailIDReg', 'Phone', 'AlternatePhoneNumberReg', 'Occupation', 'SourceofReferralID'];
      this.displayedColumnsB = ['checked', 'RCampName', 'UIN', 'DateofRegistration', 'RName',  'DateofBirth', 'Gender', 'RAddress1', 'RAddress2', 'RAddress3', 'MaritalStatusReg', 'REmailID', 'AlternateMailIDReg', 'Phone', 'AlternatePhoneNumberReg', 'Occupation', 'SourceofReferralID'];
      this.dataSource = new MatTableDataSource();
    }
    else if (this.helpname == 'AppointmentRegistration') {
      debugger;


      this.displayedColumns = ['checked', 'APPUIN', 'APPPatientName', 'APPDateofbirth', 'APPGender', 'APPPhone', 'APPAddress1'];
      this.displayedColumnsA = ['APPUIN', 'APPPatientName', 'APPDateofbirth', 'APPGender', 'APPPhone', 'APPAddress1'];
      this.displayedColumnsB = ['checked', 'APPUIN', 'APPPatientName', 'APPDateofbirth', 'APPGender', 'APPPhone', 'APPAddress1'];
      this.dataSource = new MatTableDataSource();
    }
    else if (this.helpname == 'Vendor') {
      debugger;
      // this.VendorView();
      this.displayedColumns = ['checked', 'vName', 'vAddress1', 'vAddress2', 'vAddress3', 'vLocation', 'VVendorCategory', 'DLNo', 'DLNo1', 'DLNoDate', 'DLNoDate1', 'Landmark', 'FSSAINo', 'GSTNo', 'vMobileNo', 'vPhoneNo', 'ContactPerson', 'CreditDays', 'Creditlimit', 'Leadtime', 'vIsActive'];
      this.displayedColumnsA = ['vName', 'vAddress1', 'vAddress2', 'vAddress3', 'vLocation', 'VVendorCategory', 'DLNo', 'DLNo1', 'DLNoDate', 'DLNoDate1', 'Landmark', 'FSSAINo', 'GSTNo', 'vMobileNo', 'vPhoneNo', 'ContactPerson', 'CreditDays', 'Creditlimit', 'Leadtime', 'vIsActive'];
      this.displayedColumnsB = ['checked', 'vName', 'vAddress1', 'vAddress2', 'vAddress3', 'vLocation', 'VVendorCategory', 'DLNo', 'DLNo1', 'DLNoDate', 'DLNoDate1', 'Landmark', 'FSSAINo', 'GSTNo', 'vMobileNo', 'vPhoneNo', 'ContactPerson', 'CreditDays', 'Creditlimit', 'Leadtime', 'vIsActive'];
      this.dataSource = new MatTableDataSource();
    } else if (this.helpname == 'RegistrationReview') {
      debugger;
      this.RegistrationReview();
      this.displayedColumns = ['DateofVisit', 'Status', 'Remarks',];
      this.displayedColumnsA = ['DateofVisit', 'Status', 'Remarks',];
      this.displayedColumnsB = ['DateofVisit', 'Status', 'Remarks',];
      this.dataSource = new MatTableDataSource();
    } else if (this.helpname == 'Dashboard') {
      debugger;
      this.DashboardView();
      this.displayedColumns = ['checked', 'UINs', 'DateofRegistrations', 'RNames', 'DateofBirths', 'Genders', 'RAddress1s', 'RAddress2s', 'RAddress3s', 'FatherHusbandNames', 'REmailIDs', 'Phones', 'AadharNumbers', 'Occupations', 'SourceofReferralIDs'];
      this.displayedColumnsA = ['UINs', 'DateofRegistrations', 'RNames', 'DateofBirths', 'Genders', 'RAddress1s', 'RAddress2s', 'RAddress3s', 'FatherHusbandNames', 'REmailIDs', 'Phones', 'AadharNumbers', 'Occupations', 'SourceofReferralIDs'];
      this.displayedColumnsB = ['checked', 'UINs', 'DateofRegistrations', 'RNames', 'DateofBirths', 'Genders', 'RAddress1s', 'RAddress2s', 'RAddress3s', 'FatherHusbandNames', 'REmailIDs', 'Phones', 'AadharNumbers', 'Occupations', 'SourceofReferralIDs'];
      this.dataSource = new MatTableDataSource();
    } else if (this.helpname == 'Store') {
      debugger;

      this.displayedColumns = ['checked', 'Storename', 'StoreLocation', 'sAddress1', 'sAddress2', 'StoreKeeper', 'IsActive'];
      this.displayedColumnsA = ['Storename', 'StoreLocation', 'sAddress1', 'sAddress2', 'StoreKeeper', 'IsActive'];
      this.displayedColumnsB = ['Storename', 'StoreLocation', 'sAddress1', 'sAddress2', 'StoreKeeper', 'IsActive'];
      this.dataSource = new MatTableDataSource();
    } else if (this.helpname == 'OperationTheatre') {
      debugger;

      this.displayedColumns = ['checked', 'OTDescription', 'OAddress1', 'OAddress2', 'OAddress3', 'OLocation', 'OTCharge', 'OGST', 'OSGST', 'OCGST', 'OIsActive'];
      this.displayedColumnsA = ['OTDescription', 'OAddress1', 'OAddress2', 'OAddress3', 'OLocation', 'OTCharge', 'OGST', 'OSGST', 'OCGST', 'OIsActive'];
      this.displayedColumnsB = ['OTDescription', 'OAddress1', 'OAddress2', 'OAddress3', 'OLocation', 'OTCharge', 'OGST', 'OSGST', 'OCGST', 'OIsActive'];
      this.dataSource = new MatTableDataSource();
    } else if (this.helpname == 'SurgeryMaster') {
      debugger;
      this.displayedColumns = ['checked', 'SUUIN', 'SUName', 'SUDatePicker1', 'SUGender'];
      this.displayedColumnsA = ['SUUIN', 'SUName', 'SUDatePicker1', 'SUGender'];
      this.displayedColumnsB = ['checked', 'SUUIN', 'SUName', 'SUDatePicker1', 'SUGender'];
      this.dataSource = new MatTableDataSource();
    } else if (this.helpname == 'SurgeryMaster1') {
      debugger;
      this.displayedColumns = ['checked', 'SUUIN', 'SUName', 'SUDatePicker1', 'SUGender'];
      this.displayedColumnsA = ['SUUIN', 'SUName', 'SUDatePicker1', 'SUGender'];
      this.displayedColumnsB = ['checked', 'SUUIN', 'SUName', 'SUDatePicker1', 'SUGender'];
      this.dataSource = new MatTableDataSource();
    } else if (this.helpname == 'SurgeryDischarge') {
      this.displayedColumns = ['checked', 'UIN', 'Name', 'Age', 'ocular', 'Gender'];
      this.displayedColumnsA = ['UIN', 'Name', 'Age', 'ocular', 'Gender'];
      this.displayedColumnsB = ['checked', 'UIN', 'Name', 'Age', 'ocular', 'Gender'];
      this.dataSource = new MatTableDataSource();
    } else if (this.helpname == 'DischargedPatientDetails') {
      this.displayedColumns = ['checked', 'UIN', 'Name', 'Age', 'Gender', 'SurgeryDate', 'DischargeDate'];
      this.displayedColumnsA = ['UIN', 'Name', 'Age', 'Gender', 'SurgeryDate', 'DischargeDate'];
      this.displayedColumnsB = ['checked', 'UIN', 'Name', 'Age', 'Gender', 'SurgeryDate', 'DischargeDate'];
      this.dataSource = new MatTableDataSource();
    } else if (this.helpname == 'PreviousSurgeryDetails') {
      this.PreviousSurgeryDetails();
      this.displayedColumns = ['Name', 'ocular', 'SurgeryDescription', 'Surgeon', 'SurgeryDate',];
      this.dataSource = new MatTableDataSource();
    } else if (this.helpname == 'PostOperative') {
      debugger;

      this.displayedColumns = ['checked', 'PUIN', 'PName', 'PDatePicker1', 'PGender'];
      this.displayedColumnsA = ['PUIN', 'PName', 'PDatePicker1', 'PGender'];
      this.displayedColumnsB = ['checked', 'PUIN', 'PName', 'PDatePicker1', 'PGender'];
      this.dataSource = new MatTableDataSource();
    } else if (this.helpname == 'InvPrescription') {
      debugger;

      this.displayedColumns = ['checked', 'UIN', 'RName', 'DateofBirth', 'Gender', 'RAddress1', 'Phone'];
      this.displayedColumnsA = ['UIN', 'RName', 'DateofBirth', 'Gender', 'RAddress1', 'Phone'];
      this.displayedColumnsB = ['checked', 'UIN', 'RName', 'DateofBirth', 'Gender', 'RAddress1', 'Phone'];
      this.dataSource = new MatTableDataSource();
    } else if (this.helpname == 'MEDICALPRESCRIPTIONFORM') {
      debugger;

      this.displayedColumns = ['checked', 'UIN', 'RName', 'DateofBirth', 'Gender', 'RAddress1', 'Phone'];
      this.displayedColumnsA = ['UIN', 'RName', 'DateofBirth', 'Gender', 'RAddress1', 'Phone'];
      this.displayedColumnsB = ['checked', 'UIN', 'RName', 'DateofBirth', 'Gender', 'RAddress1', 'Phone'];
      this.dataSource = new MatTableDataSource();
    } else if (this.helpname == 'BillingMaster') {
      debugger;

      this.displayedColumns = ['checked', 'UIN', 'RName', 'DateofRegistration', 'DateofBirth', 'Gender', 'RAddress1', 'Phone'];
      this.displayedColumnsA = ['UIN', 'RName', 'DateofRegistration', 'DateofBirth', 'Gender', 'RAddress1', 'Phone'];
      this.displayedColumnsB = ['checked', 'UIN', 'RName', 'DateofRegistration', 'DateofBirth', 'Gender', 'RAddress1', 'Phone'];
      this.dataSource = new MatTableDataSource();

    } else if (this.helpname == 'NumberControl') {
      debugger;
      // this.NumbercolView();
      this.displayedColumns = ['checkedN', 'Description', 'Prefix', 'Suffix', 'Autonumber', 'RunningNumber', 'EffectiveFrom', 'EffectiveTo', 'NIsActive'];
      this.displayedColumnsA = ['Description', 'Prefix', 'Suffix', 'Autonumber', 'RunningNumber', 'EffectiveFrom', 'EffectiveTo', 'NIsActive'];
      this.displayedColumnsB = ['checkedN', 'Description', 'Prefix', 'Suffix', 'Autonumber', 'RunningNumber', 'EffectiveFrom', 'EffectiveTo', 'NIsActive'];
      this.dataSource = new MatTableDataSource();

    } else if (this.helpname == 'Counselling Patients') {
      debugger;
      this.getuindetailsall();
      this.displayedColumns = ['checked', 'COUUINs', 'COUname', 'COUAgesa', 'COUGenders', 'COUSurgeryb', 'COUSurgeryd', 'COUSpecialityDecsription'];
      this.displayedColumnsA = ['COUUINs', 'COUname', 'COUAgesa', 'COUGenders', 'COUSurgeryb', 'COUSurgeryd', 'COUSpecialityDecsription'];
      this.displayedColumnsB = ['checked', 'COUUINs', 'COUname', 'COUAgesa', 'COUGenders', 'COUSurgeryb', 'COUSurgeryd', 'COUSpecialityDecsription'];
      this.dataSource = new MatTableDataSource();
    } else if (this.helpname == 'MaterialReturn') {
      debugger;
      this.GetMatrialReturn();
      this.displayedColumns = ['checked', 'ReciptNo', 'StoreName', 'VendorName', 'POID'];
      this.displayedColumnsA = ['ReciptNo', 'StoreName', 'VendorName', 'POID'];
      this.displayedColumnsB = ['checked', 'ReciptNo', 'StoreName', 'VendorName', 'POID'];
      this.dataSource = new MatTableDataSource();
    } else if (this.helpname == 'RoomMaster') {
      debugger;
      this.getRoomDet();
      this.displayedColumns = ['checked', 'R_RoomType', 'R_RoomDescription', 'R_RoomCost', 'R_NoofRooms', 'R_NoofBeds'];
      this.displayedColumnsA = ['R_RoomType', 'R_RoomDescription', 'R_RoomCost', 'R_NoofRooms', 'R_NoofBeds'];
      this.displayedColumnsB = ['checked', 'R_RoomType', 'R_RoomDescription', 'R_RoomCost', 'R_NoofRooms', 'R_NoofBeds'];
      this.dataSource = new MatTableDataSource();
    } else if (this.helpname == 'Lensmasters') {
      debugger;
      this.GetLensmatser();
      this.displayedColumns = ['checked', 'sno2', 'Brand2', 'LensType2', 'Description2', 'Model2', 'UOM2', 'HSNNo2', 'Color2', 'Size2', 'Index2', 'Price2', 'GST2', 'CESS2', 'AddCESS2'];
      this.displayedColumnsA = ['sno2', 'Brand2', 'LensType2', 'Description2', 'Model2', 'UOM2', 'HSNNo2', 'Color2', 'Size2', 'Index2', 'Price2', 'GST2', 'CESS2', 'AddCESS2'];
      this.displayedColumnsB = ['checked', 'sno2', 'Brand2', 'LensType2', 'Description2', 'Model2', 'UOM2', 'HSNNo2', 'Color2', 'Size2', 'Index2', 'Price2', 'GST2', 'CESS2', 'AddCESS2'];
      this.dataSource = new MatTableDataSource();
    } else if (this.helpname == 'TreatmentMaster') {
      debugger;
      this.GetTreatmentMaster();
      this.displayedColumns = ['checked', 'sno1', 'SID1', 'Description1', 'IsActive1'];
      this.displayedColumnsA = ['SID1', 'Description1', 'IsActive1'];
      this.displayedColumnsB = ['checked', 'sno1', 'SID1', 'Description1', 'IsActive1'];
      this.dataSource = new MatTableDataSource();
    } else if (this.helpname == 'OpticalGRN') {
      debugger;
      this.GetOpticalGrn();
      this.displayedColumns = ['checked', 'GRN_Sno', 'GRN_OrderNumber', 'GRN_OrderDate', 'GRN_REFNO', 'GRN_REFDATE', 'GRN_VENDOR', 'GRN_ADDRESS', 'GRN_Validity'];
      this.displayedColumnsA = ['GRN_OrderNumber', 'GRN_OrderDate', 'GRN_REFNO', 'GRN_REFDATE', 'GRN_VENDOR', 'GRN_ADDRESS', 'GRN_Validity'];
      this.displayedColumnsB = ['checked', 'GRN_Sno', 'GRN_OrderNumber', 'GRN_OrderDate', 'GRN_REFNO', 'GRN_REFDATE', 'GRN_VENDOR', 'GRN_ADDRESS', 'GRN_Validity'];
      this.dataSource = new MatTableDataSource();
    } else if (this.helpname == 'TaxMaster') {
      debugger;
      this.TaxMasterDetails();
      this.displayedColumns = ['checked', 'TaxDescription', 'GSTPercentage', 'SGSTPercentage', 'CGSTPercentage', 'IGSTPercentage', 'IGSTPercentage1', 'TaxGroupId'];
      this.displayedColumnsA = ['TaxDescription', 'GSTPercentage', 'SGSTPercentage', 'CGSTPercentage', 'IGSTPercentage', 'IGSTPercentage1', 'TaxGroupId'];
      this.displayedColumnsB = ['checked', 'TaxDescription', 'GSTPercentage', 'SGSTPercentage', 'CGSTPercentage', 'IGSTPercentage', 'IGSTPercentage1', 'TaxGroupId'];
      this.dataSource = new MatTableDataSource();

    } else if (this.helpname == 'Configuration') {
      debugger;
      this.ConfigureDetails();
      this.displayedColumns = ['checked', 'RRDescription', 'RRAdvDays', 'RRTimesDay', 'RREmail', 'RRPhone'];
      this.displayedColumnsA = ['RRDescription', 'RRAdvDays', 'RRTimesDay', 'RREmail', 'RRPhone'];
      this.displayedColumnsB = ['RRDescription', 'RRAdvDays', 'RRTimesDay', 'RREmail', 'RRPhone'];
      this.dataSource = new MatTableDataSource();

    } else if (this.helpname == 'UserActive') {
      debugger;
      this.UserActiveDetails();
      this.displayedColumns = ['checked', 'UA_UserName', 'UA_CompanyName', 'UA_Role', 'UA_Status'];
      this.displayedColumnsA = ['UA_UserName', 'UA_CompanyName', 'UA_Role', , 'UA_Status'];
      this.displayedColumnsB = ['UA_UserName', 'UA_CompanyName', 'UA_Role', 'UA_Status'];
      this.dataSource = new MatTableDataSource();

    } else if (this.helpname == 'SlitLamp') {
      debugger;
      this.SlitLamp();
      this.displayedColumns = ['checked', 'SlitDescription'];
      this.displayedColumnsA = ['SlitDescription'];
      this.displayedColumnsB = ['SlitDescription'];
      this.dataSource = new MatTableDataSource();
    } else if (this.helpname == 'Fundus') {
      debugger;
      this.Fundus();
      this.displayedColumns = ['checked', 'FundusDescription'];
      this.displayedColumnsA = ['FundusDescription'];
      this.displayedColumnsB = ['FundusDescription'];
      this.dataSource = new MatTableDataSource();
    } else if (this.helpname == 'PAC') {
      debugger;
      this.PACsearch();
      this.displayedColumns = ['checked', 'PAC_PatientName', 'PAC_UIN', 'PAC_Age', 'PAC_Gender'];
      this.displayedColumnsA = ['PAC_PatientName', 'PAC_UIN', 'PAC_Age', 'PAC_Gender'];
      this.displayedColumnsB = ['PAC_PatientName', 'PAC_UIN', 'PAC_Age', 'PAC_Gender'];
      this.dataSource = new MatTableDataSource();
    } else if (this.helpname == 'BMI') {
      debugger;
      this.BMIsearch();
      this.displayedColumns = ['checked', 'BMI_Category', 'BMI_FromRange', 'BMI_ToRange'];
      this.displayedColumnsA = ['BMI_Category', 'BMI_FromRange', 'BMI_ToRange'];
      this.displayedColumnsB = ['BMI_Category', 'BMI_FromRange', 'BMI_ToRange'];
      this.dataSource = new MatTableDataSource();
    } else if (this.helpname == 'RoomTransfer') {
      this.GetRoomTransferDetails();
      this.displayedColumns = ['checked', 'RT_UIN', 'RT_PatientName', 'RT_Gender', 'RT_Age', 'RT_FromRoomDate', 'RT_FromRoomTime', 'RT_Phone'];
      this.displayedColumnsA = ['RT_UIN', 'RT_PatientName', 'RT_Gender', 'RT_Age', 'RT_FromRoomDate', 'RT_FromRoomTime', 'RT_Phone'];
      this.displayedColumnsB = ['checked', 'RT_UIN', 'RT_PatientName', 'RT_Gender', 'RT_Age', 'RT_FromRoomDate', 'RT_FromRoomTime', 'RT_Phone'];
      this.dataSource = new MatTableDataSource();
    }
    else if (this.helpname == 'IOProcedureTemplate') {
      debugger;
      this.displayedColumns = ['checked', 'icdspeciality', 'SurgeryDes'];
      this.displayedColumnsA = ['icdspeciality', 'SurgeryDes'];
      this.displayedColumnsB = ['icdspeciality', 'SurgeryDes'];
      this.dataSource = new MatTableDataSource();
    }
    else if (this.helpname == 'Appointment') {
      debugger;
      // this.GetAppointmentdetails();
      this.displayedColumns = ['checked', 'AppointmentUIN', 'APpointmentPatientName', 'APpointmentDateofbirth', 'APpointmentGender', 'APpointmentAddress1', 'APpointmentAddress2', 'APpointmentPhone', 'APpointmentDoctor'];
      this.displayedColumnsA = ['AppointmentUIN', 'APpointmentPatientName', 'APpointmentDateofbirth', 'APpointmentGender', 'APpointmentAddress1', 'APpointmentAddress2', 'APpointmentPhone', 'APpointmentDoctor'];
      this.displayedColumnsB = ['checked', 'AppointmentUIN', 'APpointmentPatientName', 'APpointmentDateofbirth', 'APpointmentGender', 'APpointmentAddress1', 'APpointmentAddress2', 'APpointmentPhone', 'APpointmentDoctor'];
      this.dataSource = new MatTableDataSource();
    }
    else if (this.helpname == 'OpticalPrescription') {
      debugger;
      this.displayedColumns = ['checked', 'opUIN', 'opName', 'opAge', 'opGender', 'opPrescribedName', 'opRole', 'opPrescribedDate'];
      this.displayedColumnsA = ['opUIN', 'opName', 'opAge', 'opGender', 'opPrescribedName', 'opRole', 'opPrescribedDate'];
      this.displayedColumnsB = ['checked', 'opUIN', 'opName', 'opAge', 'opGender', 'opPrescribedName', 'opRole', 'opPrescribedDate'];
      this.dataSource = new MatTableDataSource();
    }
    else if (this.helpname == 'ModuleMaster') {
      debugger;
      this.ModuleMasterDetails();
      this.displayedColumns = ['checked', 'MMModuleDescription', 'MMModuleType', 'MMParentModule', 'MMIsActiv'];
      this.displayedColumnsA = ['MMModuleDescription', 'MMModuleType', 'MMParentModule', 'MMIsActiv'];
      this.displayedColumnsB = ['checked', 'MMModuleDescription', 'MMModuleType', 'MMParentModule', 'MMIsActiv'];
      this.dataSource = new MatTableDataSource();
    }
    else if (this.helpname == 'DrugGroup') {
      debugger;
      this.DrugGroupDetails();
      this.displayedColumns = ['checked', 'DG_Description', 'DG_DrugFormName', 'DG_RetestInterval', 'DG_RetestCriticalInterval', 'DG_SideEffects', 'DG_Precautions', 'DG_Overdose'];
      this.displayedColumnsA = ['DG_Description', 'DG_DrugFormName', 'DG_RetestInterval', 'DG_RetestCriticalInterval', 'DG_SideEffects', 'DG_Precautions', 'DG_Overdose'];
      this.displayedColumnsB = ['checked', 'DG_Description', 'DG_DrugFormName', 'DG_RetestInterval', 'DG_RetestCriticalInterval', 'DG_SideEffects', 'DG_Precautions', 'DG_Overdose'];
      this.dataSource = new MatTableDataSource();

    } else if (this.helpname == 'CompanyMaster') {
      debugger;
      this.getCompanyTable();
      this.displayedColumns = ['checked', 'C_CompanyName', 'C_Address1', 'C_Address2', 'C_Address3', 'C_LocationName', 'C_ContactPerson', 'C_CompanyGroup', 'C_Phone1', 'C_EmailID', 'C_Website'];
      this.displayedColumnsA = ['C_CompanyName', 'C_Address1', 'C_Address2', 'C_Address3', 'C_LocationName', 'C_ContactPerson', 'C_CompanyGroup', 'C_Phone1', 'C_EmailID', 'C_Website'];
      this.displayedColumnsB = ['checked', 'C_CompanyName', 'C_Address1', 'C_Address2', 'C_Address3', 'C_LocationName', 'C_ContactPerson', 'C_CompanyGroup', 'C_Phone1', 'C_EmailID', 'C_Website'];
      this.dataSource = new MatTableDataSource();
    }
  }

  ConvertEXCEL() {
    if (this.dataSource.data.length == 0) {
      return
    }
    let element = document.getElementById('excel-table');
    var cloneTable = element.cloneNode(true);
    jQuery(cloneTable).find('.remove-this').remove();

    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(cloneTable);

    var wscols = [
      { wch: 50 },
      { wch: 12 },
      { wch: 30 },
      { wch: 10 }
    ];
    ws['!cols'] = wscols;
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    if (this.helpname == "ModuleMaster") {
      XLSX.utils.book_append_sheet(wb, ws, 'Module Master');
      XLSX.writeFile(wb, "Module Master.xlsx");
    }
    else if (this.helpname == "doctormaster") {
      XLSX.utils.book_append_sheet(wb, ws, 'Doctor Master');
      XLSX.writeFile(wb, "Doctor Master.xlsx");
    }
    else if (this.helpname == "Customer Master") {
      XLSX.utils.book_append_sheet(wb, ws, 'Customer Master');
      XLSX.writeFile(wb, "Customer Master.xlsx");
    }
    else if (this.helpname == "SurgeryDischarge") {
      XLSX.utils.book_append_sheet(wb, ws, 'Surgery Discharge');
      XLSX.writeFile(wb, "Surgery Discharge.xlsx");
    }
    else if (this.helpname == "DischargedPatientDetails") {
      XLSX.utils.book_append_sheet(wb, ws, 'Discharged Patients');
      XLSX.writeFile(wb, "Discharged Patients.xlsx");
    }
    else if (this.helpname == "IOProcedureTemplate") {
      XLSX.utils.book_append_sheet(wb, ws, 'IO Procedure Template');
      XLSX.writeFile(wb, "IO Procedure Template.xlsx");
    }
    else if (this.helpname == "Drugmaster") {
      XLSX.utils.book_append_sheet(wb, ws, 'Drug Master');
      XLSX.writeFile(wb, "Drug Master.xlsx");
    }
    else if (this.helpname == "DrugGroup") {
      XLSX.utils.book_append_sheet(wb, ws, 'Generic Medicine Master');
      XLSX.writeFile(wb, "Generic Medicine Master.xlsx");
    }
    
  }


  ConvertPDF() {
    debugger;
    var Modulename = this.helpname;
    if (Modulename == "ModuleMaster") {
      var companyname = localStorage.getItem("Companyname");
      var Stringfydfata = JSON.stringify(this.dataSource.data);
      var objdata = JSON.parse(Stringfydfata);
      var ModuleDescription = jQuery.map(objdata, function (n, i) { return n.ModuleDescription; });
      var ModuleType = jQuery.map(objdata, function (n, i) { return n.ModuleType; });
      var Parentmodule = jQuery.map(objdata, function (n, i) { return n.ParentModule; });
      var Isactive = jQuery.map(objdata, function (n, i) { return n.IsActive; });
      var documentDefinition = {
        info: {
          title: 'Module Master',
        },
        pageSize: {
          width: 1250,
          height: 1300
        },
        pageOrientation: 'landscape',
        pageMargins: [10, 10, 10, 10],
        content: [
          { text: 'Organization : ' + companyname, fontSize: 18, background: 'lightgray', color: 'blue', decoration: 'underline' },
          { text: 'Module : Module Master', fontSize: 18, background: 'white', color: 'black', decoration: 'underline' },
          {
            style: 'tableExample',
            table: {
              headerRows: 1,
              widths: [300, 120, 300, 50],
              body: [
                [{ text: 'Module Description', style: 'tableHeader' },
                { text: 'Module Type', style: 'tableHeader' },
                { text: 'Parent Module', style: 'tableHeader' },
                { text: 'Is Active', style: 'tableHeader' }],
                [ModuleDescription,
                  ModuleType,
                  Parentmodule,
                  Isactive
                ]
              ]
            },
            layout: {
              hLineWidth: function (i, node) {
                return (i === 0 || i === node.table.body.length) ? 2 : 1;
              },
              vLineWidth: function (i, node) {
                return (i === 0 || i === node.table.widths.length) ? 2 : 1;
              },
              hLineColor: function (i, node) {
                return (i === 0 || i === node.table.body.length) ? 'black' : 'gray';
              },
              vLineColor: function (i, node) {
                return (i === 0 || i === node.table.widths.length) ? 'black' : 'gray';
              },
              fillColor: function (rowIndex, node, columnIndex) {
                return (rowIndex % 2 === 0) ? '#CCCCCC' : null;
              }
            }
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
      pdfMake.createPdf(documentDefinition).download('Module Master.pdf');
    }
    else if (Modulename == "doctormaster") {
      if (this.dataSource.data.length == 0) {
        return
      }
        var companyname = localStorage.getItem("Companyname");
        var Stringfydfata = JSON.stringify(this.dataSource.data);
        var objdata = JSON.parse(Stringfydfata);
        var DoctorName = jQuery.map(objdata, function (n, i) { return n.DoctorName; });
        var Address1 = jQuery.map(objdata, function (n, i) { return n.Address1; });
        var Address2 = objdata.map((n, i) => { return n.Address2 != null ? n.Address2 : " "; });
        var Address3 = jQuery.map(objdata, function (n, i) { return n.Address3 != null ? n.Address3 : " ";});
        var RegistrationNumber = jQuery.map(objdata, function (n, i) { return n.RegistrationNumber; });
        var EngagementType = jQuery.map(objdata, function (n, i) { return n.EngagementType != null ? n.EngagementType : " "; });
        var Phone1 = jQuery.map(objdata, function (n, i) { return n.Phone1; });
        var Phone2 = jQuery.map(objdata, function (n, i) { return n.Phone2 != null ? n.Phone2 : " "; });
        var EmailID = jQuery.map(objdata, function (n, i) { return n.EmailID; });
        var Speciality = jQuery.map(objdata, function (n, i) {
          var myArray = n.Speciality.toString();
          return myArray.toString();
         });
        var documentDefinition = {
            info: {
                title: 'Doctor Master',
            },
            pageSize: {
                width: 1350,
                height: 1300
            },
            pageOrientation: 'landscape',
            pageMargins: [10, 10, 10, 10],
            content: [
              { text: companyname, fontSize: 18, background: 'white', color: 'black', decoration: 'underline' },
                { text: 'Doctor Master', fontSize: 18, background: 'white', color: 'black', decoration: 'underline' },
                {
                    style: 'tableExample',
                    table: {
                        headerRows: 1,
                        widths: [150, 100, 100, 100, 100, 100, 120, 120, 170, 200],
                        body: [
                            [{ text: 'Doctor Name', style: 'tableHeader' },
                            { text: 'Address1', style: 'tableHeader' },
                            { text: 'Address2', style: 'tableHeader' },
                            { text: 'Address3', style: 'tableHeader' },
                            { text: 'Registration Number', style: 'tableHeader' },
                            { text: 'Engagement Type', style: 'tableHeader' },
                            { text: 'Phone1', style: 'tableHeader' },
                            { text: 'Phone2', style: 'tableHeader' },
                            { text: 'EmailID', style: 'tableHeader' },
                            { text: 'Speciality', style: 'tableHeader' },
                            ],
                            [DoctorName,
                                Address1,
                                Address2,
                                Address3,
                                RegistrationNumber,
                                EngagementType,
                                Phone1,
                                Phone2,
                                EmailID,
                                Speciality,
                            ]
                        ]
                    },
                    layout: {
                        hLineWidth: function (i, node) {
                            return (i === 0 || i === node.table.body.length) ? 2 : 1;
                        },
                        vLineWidth: function (i, node) {
                            return (i === 0 || i === node.table.widths.length) ? 2 : 1;
                        },
                        hLineColor: function (i, node) {
                            return (i === 0 || i === node.table.body.length) ? 'black' : 'gray';
                        },
                        vLineColor: function (i, node) {
                            return (i === 0 || i === node.table.widths.length) ? 'black' : 'gray';
                        },
                        fillColor: function (rowIndex, node, columnIndex) {
                            return (rowIndex % 2 === 0) ? '#CCCCCC' : null;
                        }
                    }
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
       pdfMake.createPdf(documentDefinition).download('Doctor Master.pdf');
    }
    else if (Modulename == "CompanyMaster") {
      var companyname = localStorage.getItem("Companyname");
      var Stringfydfata = JSON.stringify(this.dataSource.data);
      var objdata = JSON.parse(Stringfydfata);
      var cmpname = jQuery.map(objdata, function (n, i) { return n.CompanyName; });
      var Addr1 = jQuery.map(objdata, function (n, i) { return n.Address1; });
      var Addr2 = jQuery.map(objdata, function (n, i) { return n.Address2; });
      var Addr3 = jQuery.map(objdata, function (n, i) { return n.Address3; });
      var cmploca = jQuery.map(objdata, function (n, i) { return n.LocationName; });
      var cmpperson = jQuery.map(objdata, function (n, i) { return n.ContactPerson; });
      var companygroup = jQuery.map(objdata, function (n, i) { return n.CompanyGroup; });
      var phone = jQuery.map(objdata, function (n, i) { return n.Phone1; });
      var email = jQuery.map(objdata, function (n, i) { return n.EmailID; });
      var website = jQuery.map(objdata, function (n, i) { return n.Website; });

      var documentDefinition = {
        info: {
          title: 'Organization Master',
        },
        pageSize: {
          width: 1550,
          height: 1300
        },
        pageOrientation: 'landscape',
        pageMargins: [10, 10, 10, 10],
        content: [
          { text: 'Organization : ' + companyname, fontSize: 18, background: 'lightgray', color: 'blue', decoration: 'underline' },
          { text: 'Module  : Organization Master', fontSize: 18, background: 'white', color: 'black', decoration: 'underline' },
          {
            style: 'tableExample',
            table: {
              headerRows: 1,
              widths: [250, 120, 120, 100,100,100,250,100,150,180],
              body: [
                [{ text: 'Organization', style: 'tableHeader' },
                { text: 'Address1', style: 'tableHeader' },
                { text: 'Address2', style: 'tableHeader' },
                { text: 'Address3', style: 'tableHeader' },
                { text: 'Location', style: 'tableHeader' },
                { text: 'Contact Person', style: 'tableHeader' },
                { text: 'Organization Group', style: 'tableHeader' },
                { text: 'Phone', style: 'tableHeader' },
                { text: 'E-Mail', style: 'tableHeader' },
                { text: 'Website', style: 'tableHeader' }],
                [cmpname,Addr1,Addr2, Addr3, cmploca, cmpperson, companygroup, phone, email, website]
              ]
            },
            layout: {
              hLineWidth: function (i, node) {
                return (i === 0 || i === node.table.body.length) ? 2 : 1;
              },
              vLineWidth: function (i, node) {
                return (i === 0 || i === node.table.widths.length) ? 2 : 1;
              },
              hLineColor: function (i, node) {
                return (i === 0 || i === node.table.body.length) ? 'black' : 'gray';
              },
              vLineColor: function (i, node) {
                return (i === 0 || i === node.table.widths.length) ? 'black' : 'gray';
              },
              fillColor: function (rowIndex, node, columnIndex) {
                return (rowIndex % 2 === 0) ? '#CCCCCC' : null;
              }
            }
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
      pdfMake.createPdf(documentDefinition).download('Organization Master.pdf');
    }
    else if (Modulename == "Customer Master") {
      if (this.dataSource.data.length == 0) {
        return
      }
      var companyname = localStorage.getItem("Companyname");
      var Stringfydfata = JSON.stringify(this.dataSource.data);
      var objdata = JSON.parse(Stringfydfata);
      var UIN = objdata.map((n, i) => { return n.UIN != null ? n.UIN : " "; });
      var Name = jQuery.map(objdata, function (n, i) { return n.Name; });
      var MiddleName = jQuery.map(objdata, function (n, i) { return n.MidleName != null ? n.MidleName : " ";});
      var LastName = objdata.map((n, i) => { return n.LastName != null ? n.LastName : " "; });
      var Address1 = jQuery.map(objdata, function (n, i) { return n.Address1 != null ? n.Address1 : " "; });
      var Address2 = jQuery.map(objdata, function (n, i) { return n.Address2 != null ? n.Address2 : " "; });
      var Address3 = jQuery.map(objdata, function (n, i) { return n.Address3 != null ? n.Address3 : " "; });
      var Location = jQuery.map(objdata, function (n, i) { return n.LocationName != null ? n.LocationName : " "; });
      var MobileNo = jQuery.map(objdata, function (n, i) { return n.MobileNo != null ? n.MobileNo : " "; });
      var PhoneNo = jQuery.map(objdata, function (n, i) { return n.PhoneNo != null ? n.PhoneNo : " "; });
      var ContactPerson = jQuery.map(objdata, function (n, i) { return n.ContactPerson != null ? n.ContactPerson : " ";  });
      var documentDefinition = {
        info: {
          title: 'Customer Master',
        },
        pageSize: {
          width: 1350,
          height: 1300
        },
        pageOrientation: 'landscape',
        pageMargins: [10, 10, 10, 10],
        content: [
          { text: companyname, fontSize: 18, background: 'white', color: 'black', decoration: 'underline' },
          { text: 'Doctor Master', fontSize: 18, background: 'white', color: 'black', decoration: 'underline' },
          {
            style: 'tableExample',
            table: {
              headerRows: 1,
              widths: [100, 100, 100, 100, 100, 100, 100, 140, 120, 120, 120],
              body: [
                [{ text: 'UIN', style: 'tableHeader' },
                  { text: 'Name', style: 'tableHeader' },
                  { text: 'Middle Name', style: 'tableHeader' },
                  { text: 'Last Name', style: 'tableHeader' },
                  { text: 'Address1', style: 'tableHeader' },
                  { text: 'Address2', style: 'tableHeader' },
                  { text: 'Address3', style: 'tableHeader' },
                  { text: 'Location', style: 'tableHeader' },
                  { text: 'Mobile No', style: 'tableHeader' },
                  { text: ' Phone No', style: 'tableHeader' },
                  { text: 'Contact Person', style: 'tableHeader' },
                ],
                [UIN,
                  Name,
                  MiddleName,
                  LastName,
                  Address1,
                  Address2,
                  Address3,
                  Location,
                  MobileNo,
                  PhoneNo,
                  ContactPerson,
                ]
              ]
            },
            layout: {
              hLineWidth: function (i, node) {
                return (i === 0 || i === node.table.body.length) ? 2 : 1;
              },
              vLineWidth: function (i, node) {
                return (i === 0 || i === node.table.widths.length) ? 2 : 1;
              },
              hLineColor: function (i, node) {
                return (i === 0 || i === node.table.body.length) ? 'black' : 'gray';
              },
              vLineColor: function (i, node) {
                return (i === 0 || i === node.table.widths.length) ? 'black' : 'gray';
              },
              fillColor: function (rowIndex, node, columnIndex) {
                return (rowIndex % 2 === 0) ? '#CCCCCC' : null;
              }
            }
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
      pdfMake.createPdf(documentDefinition).download('Customer Master.pdf');
    }
    else if (Modulename == "SurgeryDischarge") {
      if (this.dataSource.data.length == 0) {
        return
      }
      var companyname = localStorage.getItem("Companyname");
      var Stringfydfata = JSON.stringify(this.dataSource.data);
      var objdata = JSON.parse(Stringfydfata);
      var UIN = objdata.map((n, i) => { return n.UIN != null ? n.UIN : " "; });
      var Name = jQuery.map(objdata, function (n, i) { return n.Name; });
      var Age = jQuery.map(objdata, function (n, i) { return n.Age != null ? n.Age : " "; });
      var ocular = objdata.map((n, i) => { return n.ocular != null ? n.ocular : " "; });
      var Gender = jQuery.map(objdata, function (n, i) { return n.Gender != null ? n.Gender : " "; });
      var documentDefinition = {
        info: {
          title: 'Surgery Discharge',
        },
        pageSize: {
          width: 1350,
          height: 1300
        },
        pageOrientation: 'landscape',
        pageMargins: [10, 10, 10, 10],
        content: [
          { text: companyname, fontSize: 18, background: 'white', color: 'black', decoration: 'underline' },
          { text: 'Surgery Discharge', fontSize: 18, background: 'white', color: 'black', decoration: 'underline' },
          {
            style: 'tableExample',
            table: {
              headerRows: 1,
              widths: [100, 100, 100, 100, 100],
              body: [
                [{ text: 'UIN', style: 'tableHeader' },
                { text: 'Name', style: 'tableHeader' },
                { text: 'Age', style: 'tableHeader' },
                { text: 'Ocular', style: 'tableHeader' },
                { text: 'Gender', style: 'tableHeader' },
                ],
                [UIN,
                  Name,
                  Age,
                  ocular,
                  Gender
                ]
              ]
            },
            layout: {
              hLineWidth: function (i, node) {
                return (i === 0 || i === node.table.body.length) ? 2 : 1;
              },
              vLineWidth: function (i, node) {
                return (i === 0 || i === node.table.widths.length) ? 2 : 1;
              },
              hLineColor: function (i, node) {
                return (i === 0 || i === node.table.body.length) ? 'black' : 'gray';
              },
              vLineColor: function (i, node) {
                return (i === 0 || i === node.table.widths.length) ? 'black' : 'gray';
              },
              fillColor: function (rowIndex, node, columnIndex) {
                return (rowIndex % 2 === 0) ? '#CCCCCC' : null;
              }
            }
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
      pdfMake.createPdf(documentDefinition).download('Surgery Discharge.pdf');
    }
    else if (Modulename == "DischargedPatientDetails") {
      if (this.dataSource.data.length == 0) {
        return
      }
      var companyname = localStorage.getItem("Companyname");
      var Stringfydfata = JSON.stringify(this.dataSource.data);
      var objdata = JSON.parse(Stringfydfata);
      var UIN = objdata.map((n, i) => { return n.UIN != null ? n.UIN : " "; });
      var Name = jQuery.map(objdata, function (n, i) { return n.Name; });
      var Age = jQuery.map(objdata, function (n, i) { return n.Age != null ? n.Age : " "; });
      var Gender = jQuery.map(objdata, function (n, i) { return n.Gender != null ? n.Gender : " "; });
      var SurgeryDate = objdata.map((n, i) => { return n.SurgeryDate != null ? n.SurgeryDate : " "; });
      var DischargeDate = objdata.map((n, i) => { return n.DischargeDate != null ? n.DischargeDate : " "; });
      var documentDefinition = {
        info: {
          title: 'Discharged Patients',
        },
        pageSize: {
          width: 1350,
          height: 1300
        },
        pageOrientation: 'landscape',
        pageMargins: [10, 10, 10, 10],
        content: [
          { text: companyname, fontSize: 18, background: 'white', color: 'black', decoration: 'underline' },
          { text: 'Discharged Patients', fontSize: 18, background: 'white', color: 'black', decoration: 'underline' },
          {
            style: 'tableExample',
            table: {
              headerRows: 1,
              widths: [100, 100, 100, 100, 100],
              body: [
                [{ text: 'UIN', style: 'tableHeader' },
                { text: 'Name', style: 'tableHeader' },
                { text: 'Age', style: 'tableHeader' },
                { text: 'Gender', style: 'tableHeader' },
                { text: 'SurgeryDate', style: 'tableHeader' },
                { text: 'DischargeDate', style: 'tableHeader' },
                ],
                [UIN,
                  Name,
                  Age,
                  Gender,
                  SurgeryDate,
                  DischargeDate,
                ]
              ]
            },
            layout: {
              hLineWidth: function (i, node) {
                return (i === 0 || i === node.table.body.length) ? 2 : 1;
              },
              vLineWidth: function (i, node) {
                return (i === 0 || i === node.table.widths.length) ? 2 : 1;
              },
              hLineColor: function (i, node) {
                return (i === 0 || i === node.table.body.length) ? 'black' : 'gray';
              },
              vLineColor: function (i, node) {
                return (i === 0 || i === node.table.widths.length) ? 'black' : 'gray';
              },
              fillColor: function (rowIndex, node, columnIndex) {
                return (rowIndex % 2 === 0) ? '#CCCCCC' : null;
              }
            }
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
      pdfMake.createPdf(documentDefinition).download('Discharged Patients.pdf');
    }
    else if (Modulename == "IOProcedureTemplate") {
      if (this.dataSource.data.length == 0) {
        return
      }
      var companyname = localStorage.getItem("Companyname");
      var Stringfydfata = JSON.stringify(this.dataSource.data);
      var objdata = JSON.parse(Stringfydfata);
      var IcdSpeciality = objdata.map((n, i) => { return n.icdspeciality != null ? n.icdspeciality : " "; });
      var SurgeryDescription = objdata.map((n, i) => { return n.SurgeryDescription != null ? n.SurgeryDescription : " "; });
      var documentDefinition = {
        info: {
          title: 'IO Procedure Template',
        },
        pageSize: {
          width: 1350,
          height: 1300
        },
        pageOrientation: 'landscape',
        pageMargins: [10, 10, 10, 10],
        content: [
          { text: companyname, fontSize: 18, background: 'white', color: 'black', decoration: 'underline' },
          { text: 'IO Procedure Template', fontSize: 18, background: 'white', color: 'black', decoration: 'underline' },
          {
            style: 'tableExample',
            table: {
              headerRows: 1,
              widths: [150, 150],
              body: [
                [{ text: 'Icd Speciality', style: 'tableHeader' },
                  { text: 'Surgery Description', style: 'tableHeader' },
                ],
                [IcdSpeciality,
                  SurgeryDescription,
                ]
              ]
            },
            layout: {
              hLineWidth: function (i, node) {
                return (i === 0 || i === node.table.body.length) ? 2 : 1;
              },
              vLineWidth: function (i, node) {
                return (i === 0 || i === node.table.widths.length) ? 2 : 1;
              },
              hLineColor: function (i, node) {
                return (i === 0 || i === node.table.body.length) ? 'black' : 'gray';
              },
              vLineColor: function (i, node) {
                return (i === 0 || i === node.table.widths.length) ? 'black' : 'gray';
              },
              fillColor: function (rowIndex, node, columnIndex) {
                return (rowIndex % 2 === 0) ? '#CCCCCC' : null;
              }
            }
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
      pdfMake.createPdf(documentDefinition).download('IOProcedureTemplate.pdf');
    }
    else if (Modulename == "Drugmaster") {
      if (this.dataSource.data.length == 0) {
        return
      }
      var companyname = localStorage.getItem("Companyname");
      var Stringfydfata = JSON.stringify(this.dataSource.data);
      var objdata = JSON.parse(Stringfydfata);
      var Brand = objdata.map((n, i) => { return n.Brand != null ? n.Brand : " "; });
      var Generic = objdata.map((n, i) => { return n.MedicineName != null ? n.MedicineName : " "; });
      var DrugGroup = objdata.map((n, i) => { return n.DrugGroup != null ? n.DrugGroup : " "; });
      var Manufacturer = objdata.map((n, i) => { return n.Manufacturer != null ? n.Manufacturer : " "; });
      var UOM = objdata.map((n, i) => { return n.UOM != null ? n.UOM : " "; });
      var Rate = objdata.map((n, i) => { return n.Rate != null ? n.Rate : " "; });
      var GST = objdata.map((n, i) => { return n.GST != null ? n.GST : " "; });
      var CESSPercentage = objdata.map((n, i) => { return n.CESSPercentage != null ? n.CESSPercentage : " "; });
      var AdditionalCESSPercentage = objdata.map((n, i) => { return n.AdditionalCESSPercentage != null ? n.AdditionalCESSPercentage : " "; });
      var documentDefinition = {
        info: {
          title: 'Drug Master',
        },
        pageSize: {
          width: 1350,
          height: 1300
        },
        pageOrientation: 'landscape',
        pageMargins: [10, 10, 10, 10],
        content: [
          { text: companyname, fontSize: 18, background: 'white', color: 'black', decoration: 'underline' },
          { text: 'Drug Master', fontSize: 18, background: 'white', color: 'black', decoration: 'underline' },
          {
            style: 'tableExample',
            table: {
              headerRows: 1,
              widths: [170, 170,100,170,80,100,40,40,40],
              body: [
                [{ text: 'Brand', style: 'tableHeader' },
                  { text: 'Generic', style: 'tableHeader' },
                  { text: 'Drug Group', style: 'tableHeader' },
                  { text: 'Manufacturer', style: 'tableHeader' },
                  { text: 'UOM', style: 'tableHeader' },
                  { text: 'Rate', style: 'tableHeader' },
                  { text: 'Tax %', style: 'tableHeader' },
                  { text: 'Tax 1 %', style: 'tableHeader' },
                  { text: 'Tax 2 %', style: 'tableHeader' },
                ],
                [Brand,Generic,DrugGroup, Manufacturer, UOM, Rate, GST, CESSPercentage, AdditionalCESSPercentage]
              ]
            },
            layout: {
              hLineWidth: function (i, node) {
                return (i === 0 || i === node.table.body.length) ? 2 : 1;
              },
              vLineWidth: function (i, node) {
                return (i === 0 || i === node.table.widths.length) ? 2 : 1;
              },
              hLineColor: function (i, node) {
                return (i === 0 || i === node.table.body.length) ? 'black' : 'gray';
              },
              vLineColor: function (i, node) {
                return (i === 0 || i === node.table.widths.length) ? 'black' : 'gray';
              },
              fillColor: function (rowIndex, node, columnIndex) {
                return (rowIndex % 2 === 0) ? '#CCCCCC' : null;
              }
            }
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
      pdfMake.createPdf(documentDefinition).download('Drug Master.pdf');
    }
    else if (Modulename == "DrugGroup") {
      if (this.dataSource.data.length == 0) {
        return
      }
      var companyname = localStorage.getItem("Companyname");
      var Stringfydfata = JSON.stringify(this.dataSource.data);
      var objdata = JSON.parse(Stringfydfata);
      var Description = objdata.map((n, i) => { return n.Description != null ? n.Description : " "; });
      var DrugFormName = objdata.map((n, i) => { return n.DrugFormName != null ? n.DrugFormName : " "; });
      var RetestInterval = objdata.map((n, i) => { return n.RetestInterval != null ? n.RetestInterval : " "; });
      var RetestCriticalInterval = objdata.map((n, i) => { return n.RetestCriticalInterval != null ? n.RetestCriticalInterval : " "; });
      var SideEffects = objdata.map((n, i) => { return n.SideEffects != null ? n.SideEffects : " "; });
      var Precautions = objdata.map((n, i) => { return n.Precautions != null ? n.Precautions : " "; });
      var Overdose = objdata.map((n, i) => { return n.Overdose != null ? n.Overdose : " "; });
      var documentDefinition = {
        info: {
          title: 'Generic Medicine Master',
        },
        pageSize: {
          width: 1350,
          height: 1300
        },
        pageOrientation: 'landscape',
        pageMargins: [10, 10, 10, 10],
        content: [
          { text: companyname, fontSize: 18, background: 'white', color: 'black', decoration: 'underline' },
          { text: 'Generic Medicine Master', fontSize: 18, background: 'white', color: 'black', decoration: 'underline' },
          {
            style: 'tableExample',
            table: {
              headerRows: 1,
              widths: [250, 100, 70, 70, 250, 100, 100],
              body: [
                [{ text: 'Description', style: 'tableHeader' },
                  { text: 'Drug Form', style: 'tableHeader' },
                  { text: 'Retest Interval', style: 'tableHeader' },
                  { text: 'Retest Critical Interval', style: 'tableHeader' },
                  { text: 'SideEffects', style: 'tableHeader' },
                  { text: 'Precautions', style: 'tableHeader' },
                  { text: 'Overdose', style: 'tableHeader' },
                ],
                [Description, DrugFormName, RetestInterval, RetestCriticalInterval, SideEffects, Precautions, Overdose]
              ]
            },
            layout: {
              hLineWidth: function (i, node) {
                return (i === 0 || i === node.table.body.length) ? 2 : 1;
              },
              vLineWidth: function (i, node) {
                return (i === 0 || i === node.table.widths.length) ? 2 : 1;
              },
              hLineColor: function (i, node) {
                return (i === 0 || i === node.table.body.length) ? 'black' : 'gray';
              },
              vLineColor: function (i, node) {
                return (i === 0 || i === node.table.widths.length) ? 'black' : 'gray';
              },
              fillColor: function (rowIndex, node, columnIndex) {
                return (rowIndex % 2 === 0) ? '#CCCCCC' : null;
              }
            }
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
      pdfMake.createPdf(documentDefinition).download('Generic Medicine Master.pdf');
    }
  }




  GetAppointmentdetails() {
    this.commonService.getListOfData('Help/GetAppointmentDetails/' + (localStorage.getItem('CompanyID')) + '/' + this.M_search)
      .subscribe(data => {
        debugger;
        if (data.getAPpointmentdetailsss.length == 0) {
          this.Dialogclose();
          Swal.fire({
            type: 'warning',
            title: 'oops ! we are unable to find your data please register with us.',
            timer: 2000
          });
        } else if (data.getAPpointmentdetailsss.length > 0) {
          debugger;
          this.commonService.data = data;
          this.dataSource.data = data.getAPpointmentdetailsss;
          this.dataSource.sort = this.sort;
        }
      });
  }


  //////////////////////////// Yours GetRoomTransfer
  GetRoomTransferDetails() {
    debugger;
    this.commonService.getListOfData('Help/GetRoomTransferDetails/')
      .subscribe(data => {
        debugger;
        if (data.GetRoomTransfer.length == 0) {
          this.Dialogclose();
          Swal.fire({
            type: 'warning',
            title: 'No Datas Found...!',
            timer: 2000
          });
        } else if (data.GetRoomTransfer.length > 0) {
          debugger;
          this.commonService.data = data;
          this.dataSource.data = data.GetRoomTransfer;
          this.dataSource.sort = this.sort;
        }
      });
  }


  BMIsearch() {
    this.commonService.getListOfData('Help/BMISearch/' + parseInt(localStorage.getItem('CompanyID'))).subscribe(data => {
      debugger;
      if (data.BMIDetails.length > 0) {
        this.commonService.data = data;
        this.dataSource.data = data.BMIDetails;
        this.dataSource.sort = this.sort;
      } else {
        Swal.fire({
          type: 'warning',
          title: 'No Data Found',

        });
      }

    });

  }
  PACsearch() {
    this.commonService.getListOfData('Help/PACSearch/' + parseInt(localStorage.getItem('CompanyID'))).subscribe(data => {
      debugger;
      if (data.getPACDetail.length > 0) {
        this.commonService.data = data;
        this.dataSource.data = data.getPACDetail;
        this.dataSource.sort = this.sort;
      } else {
        Swal.fire({
          type: 'warning',
          title: 'No Data Found',

        });
      }

    });

  }



  Fundus() {
    debugger;
    this.commonService.getListOfData('Help/Fundus/' + parseInt(localStorage.getItem('CompanyID'))).subscribe(data => {
      if (data.FundusDet.length > 0) {
        this.commonService.data = data;
        this.dataSource.data = data.FundusDet;
        this.dataSource.sort = this.sort;
      } else {
        Swal.fire({
          type: 'warning',
          title: 'No Data Found',

        });
      }

    });


  }
  SlitLamp() {
    debugger;
    this.commonService.getListOfData('Help/SlitLamp/' + parseInt(localStorage.getItem('CompanyID'))).subscribe(data => {
      if (data.getSlitLampDet.length > 0) {
        this.commonService.data = data;
        this.dataSource.data = data.getSlitLampDet;
        this.dataSource.sort = this.sort;
      } else {
        Swal.fire({
          type: 'warning',
          title: 'No Data Found',

        });
      }

    });

  }


  UserActiveDetails() {
    debugger;
    this.commonService.getListOfData('Help/GetUserDetail/' + parseInt(localStorage.getItem('CompanyID'))).subscribe(data => {
      debugger;
      if (data.UserDetails.length > 0) {
        debugger;

        this.commonService.data = data;
        this.dataSource.data = data.UserDetails;
        this.dataSource.sort = this.sort;
      } else {
        Swal.fire({
          type: 'warning',
          title: 'No Data Found',

        });

      }

    });


  }
  ConfigureDetails() {
    debugger;

    this.commonService.getListOfData('Help/GetConfigureDetail/').subscribe(data => {
      debugger;
      if (data.ConfigureDetail.length > 0) {
        debugger;

        //  this.commonService.data = data;
        this.dataSource.data = data.ConfigureDetail;
        this.dataSource.sort = this.sort;
      } else {
        Swal.fire({
          type: 'warning',
          title: 'No Data Found',

        });

      }

    });

  }

  TaxMasterDetails() {

    this.commonService.getListOfData('Help/getTaxData/' + parseInt(localStorage.getItem('CompanyID'))).subscribe(data => {
      if (data.getTaxDet.length > 0) {
        debugger;
        this.dataSource.data = data.getTaxDet;
        this.dataSource.sort = this.sort;
      } else {
        Swal.fire({
          type: 'warning',
          title: 'No Data Found!',
        });
      }

    });
  }

  getindetsearchdetails() {
    debugger;
    this.commonService.getListOfData('Help/searchStoreSearch')
      .subscribe(data => {
        debugger;
        if (data.Storeroom.length > 0) {
          debugger;
          this.commonService.data = data;
          this.dataSource.data = data.Storeroom;
          this.dataSource.sort = this.sort;
        } else {
          this.hidepdfexcel = false;
          this.Dialogclose();
          Swal.fire({
            type: 'warning',
            title: 'No Data Found!',
          });
        }
      });

  }

  getstoredetails() {
    this.commonService.getListOfData('Help/StoreSearch')
      .subscribe(data => {
        debugger;
        if (data.Storeroom.length > 0) {
          debugger;
          this.commonService.data = data;
          this.dataSource.data = data.Storeroom;
          this.dataSource.sort = this.sort;
        } else {
          this.hidepdfexcel = false;
          this.Dialogclose();
          Swal.fire({
            type: 'warning',
            title: 'No Data Found!',
          });
        }
      });

  }




  ///////////////////////////// Yours GRN
  GetOpticalGrn() {
    const val = localStorage.getItem('arr');
    this.commonService.getListOfData('Help/GetGrn/' + val + '/')
      .subscribe(data => {
        debugger;
        if (data.GetOpticalGrn.length == 0) {
          this.Dialogclose();
          Swal.fire({
            type: 'warning',
            title: 'No Datas Found...!',
            timer: 2000
          });
        } else if (data.GetOpticalGrn.length > 0) {
          debugger;
          this.commonService.data = data;
          this.dataSource.data = data.GetOpticalGrn;
          this.dataSource.sort = this.sort;
        }
      });
  }
  getRoomDet() {
    debugger;
    this.commonService.getListOfData('Help/RoomSearch/' + parseInt(localStorage.getItem('CompanyID')) + '/')
      .subscribe(data => {
        debugger;
        if (data.helpRoom.length > 0) {
          debugger;
          this.commonService.data = data;
          this.dataSource.data = data.helpRoom;
          this.dataSource.sort = this.sort;
        } else {
          this.hidepdfexcel = false;
          this.Dialogclose();
          Swal.fire({
            type: 'warning',
            title: 'No Data Found!',
          });
        }
      });

  }


  ///////////////////////////// Treatment Master
  GetTreatmentMaster() {
    const val = localStorage.getItem('arr');
    this.commonService.getListOfData('Help/PopupSearch1/' + val + '/')
      .subscribe(data => {
        debugger;
        if (data.GetDataArrayss.length == 0) {
          this.Dialogclose();
          Swal.fire({
            type: 'warning',
            title: 'No Datas Found...!',
            timer: 2000
          });
        } else if (data.GetDataArrayss.length > 0) {
          debugger;
          this.commonService.data = data;
          this.dataSource.data = data.GetDataArrayss;
          this.dataSource.sort = this.sort;
        }
      });
  }

  ///////////////////////////// Lensmaster
  GetLensmatser() {
    debugger;
    const vd = localStorage.getItem('arr');
    this.commonService.getListOfData('Help/PopupSearch2/' + vd + '/')
      .subscribe(data => {
        debugger;
        if (data.GetDataArraysss.length == 0) {
          this.Dialogclose();
          Swal.fire({
            type: 'warning',
            title: 'No Datas Found...!',
            timer: 2000
          });
          this.LensHead = false;
          this.FrameHead = false;
        } else if (data.GetDataArraysss.length > 0) {
          debugger;
          if (vd == 'Frame') {
            this.FrameHead = true;
            this.LensHead = false;
            this.commonService.data = data;
            this.dataSource.data = data.GetDataArraysss;
            this.dataSource.sort = this.sort;
          } else if (vd == 'Lens') {
            this.FrameHead = false;
            this.LensHead = true;
            this.commonService.data = data;
            this.dataSource.data = data.GetDataArraysss;
            this.dataSource.sort = this.sort;
          }
        }
      });
  }
  //////////////////////////////// Meterial-Return

  GetMatrialReturn() {
    this.commonService.getListOfData('Help/PopupSearch/' + parseInt(localStorage.getItem('CompanyID')) + '/')
      .subscribe(data => {
        debugger;
        if (data.helpmaterialreturn.length == 0) {
          this.Dialogclose();
          Swal.fire({
            type: 'warning',
            title: 'No Items in Store...!',
            timer: 2000,
          });
        } else if (data.helpmaterialreturn.length > 0) {
          debugger;
          this.commonService.data = data;
          this.dataSource.data = data.helpmaterialreturn;
          this.dataSource.sort = this.sort;
        }
      });
  }
  DrugGroupDetails() {
    this.commonService.getListOfData('Help/getDrugGroupDetails/' + parseInt(localStorage.getItem('CompanyID'))).subscribe(data => {
      if (data.getDrugGroupDetails.length > 0) {
        this.dataSource.data = data.getDrugGroupDetails;
        this.dataSource.sort = this.sort;
      } else {
        Swal.fire({
          type: 'warning',
          title: 'No data Found',
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


  CustomerMasterDetails() {
    debugger;
    this.commonService.getListOfData('Help/CustomerMasterDetails/' + parseInt(localStorage.getItem('CompanyID')))
      .subscribe(data => {
        if (data.CustomerDetails.length > 0) {
          this.dataSource.data = data.CustomerDetails;
          this.dataSource.sort = this.sort;
        } else {
          Swal.fire({
            type: 'warning',
            title: 'No Data Found!',
          });
        }
      });
  }
  DonorDetails() {
    debugger;
    this.commonService.getListOfData('Help/DonorDetails/' + parseInt(localStorage.getItem('CompanyID')))
      .subscribe(data => {
        if (data.DonorDetails.length > 0) {
          this.dataSource.data = data.DonorDetails;
          //this.dataSource.sort = this.sort;
        } else {
          Swal.fire({
            type: 'warning',
            title: 'No Data Found!',
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
  getCompanyTable() {
    debugger;
    this.commonService.getListOfData('Help/getCompanyName/' + localStorage.getItem('CompanyID')).subscribe(data => {
      this.dataSource.data = data.getCompDetails1;
      this.dataSource.sort = this.sort;
    });

  }



  getuindetailsall() {
    debugger;
    this.commonService.getListOfData('Counselling/getsearchdetails/' + localStorage.getItem('CompanyID')).subscribe(data => {
      debugger;
      this.dataSource.data = data.UINDETAILS;
      this.dataSource.sort = this.sort;
    });
  }

  ModuleMasterDetails() {
    // this.gethelpdetails();
    this.commonService.getListOfData('Help/getModuleMasterDetails/' + parseInt(localStorage.getItem('CompanyID'))).subscribe(data => {
      debugger;
      if (data.getModuleMasDetails.length > 0) {
        debugger;
        this.dataSource.data = data.getModuleMasDetails;
        this.dataSource.sort = this.sort;
      } else {
        Swal.fire({
          type: 'warning',
          title: 'No Data Found!',
        });

      }
    });

  }
  SearchInput() {
    debugger;
    if (this.helpname == 'CampRegistration' ||this.helpname == 'Registration' || this.helpname == 'SurgeryMaster' || this.helpname == 'InvPrescription' || this.helpname == 'AdvancePayment' || this.helpname == 'MEDICALPRESCRIPTIONFORM' || this.helpname == 'Appointment') {
      if (this.M_search == '') {
        this.hiddenSearchBT = false;
      } else {
        this.hiddenSearchBT = true;
      }
    }

  }





  viewhelpoperation() {
    debugger;
    if (this.helpname == 'OperationTheatre') {
      if (this.M_search == '' || this.M_search == undefined) {
        this.OperationTheatre();
      } else {
        this.OperationTheatre1();
      }
    }

  }


  PreviousSurgeryDetails() {
    this.commonService.getListOfData('Help/getPreviousSurgeryDetails/' + this.UIN + '/' + parseInt(localStorage.getItem('CompanyID'))).subscribe(data => {
      if (data.PreviousSurgeryDetails.length > 0) {
        this.dataSource.data = data.PreviousSurgeryDetails;
      } else {
        Swal.fire({
          position: 'center',
          type: 'warning',
          title: 'No Previous Surgery Records Found',
          showConfirmButton: false,
          timer: 4000
        });
      }
    });

  }


  SurgeryDischarge() {
    this.commonService.getListOfData('Help/getSurgeryDischargeDetails/' + parseInt(localStorage.getItem('CompanyID')) + '/' + localStorage.getItem("GMTTIME")).subscribe(data => {
      if (data.SurgeryDischarge.length > 0) {
        this.dataSource.data = data.SurgeryDischarge;
      } else {
        this.dataSource.data = [];
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
    });
  }


  DischargedPatientDetails() {
    this.commonService.getListOfData('Help/getDischargedPatientDetails/' + parseInt(localStorage.getItem('CompanyID')) + '/' + localStorage.getItem("GMTTIME")).subscribe(data => {
      if (data.SurgeryPatientDischargedDetails.length > 0) {
        this.dataSource.data = data.SurgeryPatientDischargedDetails;
      } else {
        this.dataSource.data = [];
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
    });
  }



  OperationTheatre() {
    debugger;
    this.gethelpdetails();
    // this.commonService.data = new Search();

    this.commonService.getListOfData('Help/getOperationTheatre/' + parseInt(localStorage.getItem('CompanyID'))).subscribe(data => {

      if (data.OperationTheatreDetails != null) {
        this.commonService.data = data;
        this.dataSource.data = data.OperationTheatreDetails;
      }
    });
  }
  OperationTheatre1() {
    debugger;
    this.gethelpdetails();
    this.commonService.data = new Search();
    this.commonService.data.OperationTheatre.OTDescription = this.M_search;
    this.commonService.data.OperationTheatre.OTType = this.M_search;
    this.commonService.data.OperationTheatre.OTLocation = this.M_search;

    this.commonService.getListOfData('Help/getOperationTheatre1/' + this.M_search + '/' + parseInt(localStorage.getItem('CompanyID')))
      .subscribe(data => {

        if (data.OperationTheatreDetails.length > 0) {
          this.commonService.data = data;
          this.dataSource.data = data.OperationTheatreDetails;
        } else {
          Swal.fire({
            position: 'center',
            type: 'warning',
            title: 'Data Not Found',
            showConfirmButton: false,
            timer: 4000
          });
        }


      });

  }

  TransactionTypeDetails() {
    debugger;
    this.commonService.getListOfData('Help/getTranTypeDetails/' + parseInt(localStorage.getItem('CompanyID'))).subscribe(data => {
      debugger;
      if (data.getTrantypeDetails.length > 0) {
        debugger;
        this.dataSource.data = data.getTrantypeDetails;
        this.dataSource.sort = this.sort;
      } else {
        Swal.fire({
          type: 'warning',
          title: 'No Data Found!',
        });

      }
    });
  }

  selecttype(item) {
    debugger;
    this.dialogRef.close({ success: true, data: item });
  }



  ViewSearch1() {
    debugger;
    this.viewhelp();
  }

  ViewSearch() {
    debugger;
    this.viewhelp();
  }
  viewhelp() {

    debugger;
    //if (this.helpname == 'BusinessRule') {
    //  this.BusinessRule();
    //}
    if (this.helpname == 'Registration') {
      if (this.M_search == '' || this.M_search == undefined) {
        this.RegistrationView();
      } else {
        this.RegistrationView1();
      }
    } else if (this.helpname == 'CampRegistration') {
      if (this.M_search == '' || this.M_search == undefined) {
        // this.CampRegistrationView();
      } else {
        this.CampRegistrationView();
      }
    }
    else if (this.helpname == 'AppointmentRegistration') {
      if (this.M_search == '' || this.M_search == undefined) {
         this.AppointmentRegistrationView();
      } else {
        this.AppointmentRegistrationView();
      }
    }
    else if (this.helpname == 'Insurance') {
      if (this.M_search == '' || this.M_search == undefined) {
        this.InsuranceView();
      } else {
        this.InsuranceView();
      }
    } else if (this.helpname == 'Store') {
      if (this.M_search == '' || this.M_search == undefined) {
        this.StoreView();
      } else {
        this.StoreView1();
      }
    } else if (this.helpname == 'OpticalPrescription') {
      this.OpticalprescriptionView1();
    } else if (this.helpname == 'Vendor') {
      if (this.M_search == '' || this.M_search == undefined) {
        this.VendorView();
      } else {
        this.VendorView1();
      }
    } else if (this.helpname == 'NumberControl') {
      if (this.M_search == '' || this.M_search == undefined) {
        this.NumbercolView();
      }
      // else {
      //  this.VendorView1();
      // }
    } else if (this.helpname == 'SurgeryMaster') {
      if (this.M_search == '' || this.M_search == undefined) {
        this.SurgeryView1();
      } else {
        this.SurgeryView1();
        // this.RegistrationView1();
      }
    } else if (this.helpname == 'SurgeryMaster1') {

      this.Surgery1();

    } else if (this.helpname == 'OperationTheatre') {
      if (this.M_search == '' || this.M_search == undefined) {
        this.OperationTheatre();
      } else {
        this.OperationTheatre1();
      }
    } else if (this.helpname == 'SurgeryDischarge') {
      if (this.M_search == '' || this.M_search == undefined) {
        this.SurgeryDischarge();
      } else {
        this.SurgeryDischarge();
      }
    } else if (this.helpname == 'doctormaster') {
      if (this.M_search == '' || this.M_search == undefined) {
        this.Doctorviews();
      } else {
        this.Doctorviews();
      }
    } else if (this.helpname == 'Drugmaster') {
      if (this.M_search == '' || this.M_search == undefined) {
        this.DrugView();
      } else {
        this.DrugView();
      }
    } else if (this.helpname == 'icdmaster') {
      if (this.M_search == '' || this.M_search == undefined) {
        this.IcdMasterView();
      } else {
        this.IcdMasterView();
      }
    } else if (this.helpname == 'DischargedPatientDetails') {
      if (this.M_search == '' || this.M_search == undefined) {
        this.DischargedPatientDetails();
      } else {
        this.DischargedPatientDetails();
      }
    } else if (this.helpname == 'ModuleMaster') {
      if (this.M_search == '' || this.M_search == undefined) {
        this.ModuleMasterDetails();
      } else {
        this.ModuleMasterDetails();
      }
    } else if (this.helpname == 'PostOperative') {
      this.postoperative();

    } else if (this.helpname == 'BillingMaster') {
      if (this.M_search == '' || this.M_search == undefined) {
        this.FinalBilling();
      } else {
        this.FinalBilling1();
      }
    } else if (this.helpname == 'InvPrescription') {
      if (this.M_search == '' || this.M_search == undefined) {
        this.FinalBilling();
      } else {
        this.FinalBilling1();
      }
    } else if (this.helpname == 'MEDICALPRESCRIPTIONFORM') {
      if (this.M_search == '' || this.M_search == undefined) {
        this.FinalBilling();
      } else {
        this.FinalBilling1();
      }
    } else if (this.helpname == 'IOProcedureTemplate') {
      if (this.M_search == '' || this.M_search == undefined) {
        this.IOProcedureViews();
      } else {
        this.IOProcedureViews();
      }
    } else if (this.helpname == 'Appointment') {
      if (this.M_search == '' || this.M_search == undefined) {
        this.GetAppointmentdetails();
      } else {
        this.GetAppointmentdetails();
      }
    }
  }


  IOProcedureViews() {
    debugger;
    // this.commonService.data = new Search();

    this.commonService.getListOfData('Help/getIOProcedureTempDetails/' + this.data.dataKey).subscribe(data => {
      debugger;
      if (data.Success == true) {
        debugger;
        if (data.IOData.length >= 1) {
          debugger;
          // this.commonService.data = data;
          this.dataSource.data = data.IOData;
          this.dataSource.sort = this.sort;
        } else {
          Swal.fire({
            position: 'center',
            type: 'warning',
            title: 'No Data Found',
            showConfirmButton: false,
            timer: 4000
          });
        }
      } else {
        Swal.fire({
          position: 'center',
          type: 'warning',
          title: 'Something Went Wrong',
          showConfirmButton: false,
          timer: 4000
        });
      }


    });
  }


  postoperative() {
    debugger;
    this.gethelpdetails();
    this.commonService.data = new Search();
    this.commonService.data.Postoper.UIN = this.M_search;
    this.commonService.data.Postoper.Phone = this.M_search;
    this.commonService.getListOfData('Help/getpostoperative/' + this.M_search).subscribe(data => {
      if (data.Postoper != null || data.Postoper3.length > 0) {
        debugger;
        console.log(this.commonService.data);
        this.commonService.data = data;
        const Item = new Persondetailspost();
        Item.Uin = data.Postoper.UIN;
        Item.Namepat = data.Postoper.Name;
        Item.Date = data.Postoper.DateofBirth;
        Item.Gender = data.Postoper.Gender;
        Item.Age = data.Postoper.Age;
        Item.Phone = data.Postoper.Phone;
        Item.Allergy = data.Postoper.Allergy;
        Item.DateofSurgery = data.Postoper.DateofSurgery;
        Item.ReviewDate = data.Postoper.ReviewDate;
        Item.Description = data.Postoper.Description;
        Item.Doctorname = data.Postoper.Doctorname;
        Item.OTID = data.Postoper.OTID;
        Item.Anaestheticname = data.Postoper.Anaestheticname;
        Item.Ocular = data.Postoper.Ocular;
        Item.SID = data.Postoper.SID;

        this.postperson = [];

        this.postperson = this.postperson.filter(function (item) {
          return item.SID !== Item.SID;
        });

        this.postperson.push(Item);
        this.commonService.data.Persondetailspost = this.postperson;
        this.dataSource.data = this.commonService.data.Persondetailspost;
        this.postdetails = data.Postoper3;
        this.commonService.data.Postoper3 = this.postdetails;
        localStorage.setItem('test', JSON.stringify(this.commonService.data.Postoper3));
      } else {
        Swal.fire({
          position: 'center',
          type: 'warning',
          title: 'Data Not Found',
          showConfirmButton: false,
          timer: 4000
        });
      }


    });
  }



  NumbercolView() {
    debugger;
    this.gethelpdetails();
    this.commonService.data = new Search();

    this.commonService.getListOfData('Help/GetDetailsNumCol/' + parseInt(localStorage.getItem('CompanyID'))).subscribe(data => {
      debugger;
      if (data.NumColdetail != null) {
        this.commonService.data = data;
        this.dataSource.data = data.NumColdetail;
      }
    });
  }


  Surgery1() {
    debugger;
    this.gethelpdetails();
    this.commonService.data = new Search();
    // this.commonService.data.SurgeryDT.UIN = this.M_search;
    // this.commonService.data.SurgeryDT.Name = this.M_search;
    // this.commonService.data.SurgeryDT.DatePicker1 = this.M_search;
    this.commonService.getListOfData('Help/SurgeryView1/' + this.M_search).subscribe(data => {
      if (data.SurgeryDT != null) {
        debugger;
        console.log(this.commonService.data);
        this.commonService.data = data;
        const Item = new Persondetails();
        Item.UIN = data.SurgeryDT.UIN;
        Item.Name = data.SurgeryDT.Name;
        Item.DateofBirth = data.SurgeryDT.DateofBirth;
        Item.Regtranid = data.SurgeryDT.Regtranid;
        Item.Gender = data.SurgeryDT.Gender;
        Item.Allergy = data.SurgeryDT.Allergy;

        Item.DateofSurgery = data.SurgeryDT.DateofSurgery;
        Item.Description = data.SurgeryDT.Description;
        Item.Doctorname = data.SurgeryDT.Doctorname;
        Item.OTID = data.SurgeryDT.OTID;
        Item.Anaestheticname = data.SurgeryDT.Anaestheticname;
        Item.Ocular = data.SurgeryDT.Ocular;

        this.person.push(Item);
        this.commonService.data.Persondetails = this.person;
        this.dataSource.data = this.commonService.data.Persondetails;
      } else {
        Swal.fire({
          position: 'center',
          type: 'warning',
          title: 'Data Not Found',
          showConfirmButton: false,
          timer: 4000
        });
      }
    });
  }

  SurgeryView() {
    debugger;
    this.gethelpdetails();
    this.commonService.data = new Search();
    this.commonService.getListOfData('Help/getSurgery/').subscribe(data => {
      if (data.SurgeryDT != null) {
        this.commonService.data = data;
        this.dataSource.data = data.SurgeryDT;
      }
    });
  }
  SurgeryView1() {
    debugger;
    this.gethelpdetails();
    this.commonService.data = new Search();
    // this.commonService.data.SurgeryDT.UIN = this.M_search;
    // this.commonService.data.SurgeryDT.Name = this.M_search;
    // this.commonService.data.SurgeryDT.DatePicker1 = this.M_search;

    this.commonService.getListOfData('Help/getSurgery1/' + this.M_search + '/' + parseInt(localStorage.getItem('CompanyID'))).subscribe(data => {
      if (data.SurgeryDT != null || data.SurgeryDT3.length > 0 || data.SurgeryDT4.length > 0 || data.SurgeryDT5.length > 0) {
        debugger;
        console.log(this.commonService.data);
        this.commonService.data = data;
        // var Item = new Persondetails();
        // Item.UIN = data.SurgeryDT.UIN;
        // Item.Name = data.SurgeryDT.Name;
        // Item.Age = data.SurgeryDT.Age;
        // Item.DateofBirth = data.SurgeryDT.DateofBirth;
        // Item.Regtranid = data.SurgeryDT.Regtranid;
        // Item.Gender = data.SurgeryDT.Gender;
        // Item.Allergy = data.SurgeryDT.Allergy;

        // this.person = [];

        // this.person = this.person.filter(function (item) {
        //  return item.UIN !== Item.UIN
        // });

        // this.person.push(Item);
        // this.commonService.data.Persondetails = this.person;
        this.dataSource.data = this.commonService.data.SurgeryDT;
        debugger;

        for (let i = 0; i < data.SurgeryDT3.length; i++) {

          if (data.SurgeryDT3[i].IsSurgeryCompleted == true) {
            data.SurgeryDT3[i].IsSurgeryCompleted = 'Yes';
          }

          if (data.SurgeryDT3[i].IsSurgeryCompleted == false) {
            data.SurgeryDT3[i].IsSurgeryCompleted = 'NO';
          }
        }

        this.details = data.SurgeryDT3;
        this.commonService.data.SurgeryDT3 = this.details;
        localStorage.setItem('testKey', JSON.stringify(this.commonService.data.SurgeryDT3));

        this.details1 = data.SurgeryDT4;
        this.commonService.data.SurgeryDT4 = this.details1;
        localStorage.setItem('testKey1', JSON.stringify(this.commonService.data.SurgeryDT4));

        this.details2 = data.SurgeryDT5;
        this.commonService.data.SurgeryDT5 = this.details2;
        localStorage.setItem('testKey2', JSON.stringify(this.commonService.data.SurgeryDT5));

      } else {
        Swal.fire({
          position: 'center',
          type: 'warning',
          title: 'Data Not Found',
          showConfirmButton: false,
          timer: 4000
        });
      }
    });






  }



  StoreView() {
    debugger;
    this.gethelpdetails();
    // this.commonService.data = new Search();

    this.commonService.getListOfData('Help/getStoremaster/' + parseInt(localStorage.getItem('CompanyID'))).subscribe(data => {

      if (data.Storedetail != null) {
        this.commonService.data = data;
        this.dataSource.data = data.Storedetail;
      }
    });
  }

  StoreView1() {
    debugger;
    this.gethelpdetails();
    this.commonService.data = new Search();
    // this.commonServiceV.data = new VendorMasters();
    this.commonService.data.Storemaster.Storename = this.M_search;
    this.commonService.data.Storemaster.StoreLocation = this.M_search;
    this.commonService.data.Storemaster.StoreKeeper = this.M_search;


    this.commonService.getListOfData('Help/getStoremaster1/' + this.M_search + '/' + parseInt(localStorage.getItem('CompanyID'))).subscribe((data: any) => {


      if (data.Storedetail.length > 0) {
        this.commonService.data = data;
        this.dataSource.data = data.Storedetail;
      } else {
        Swal.fire({
          position: 'center',
          type: 'warning',
          title: 'Data Not Found',
          showConfirmButton: false,
          timer: 4000
        });
      }


    });

  }



  OpticalprescriptionView1() {
    debugger;
    this.gethelpdetails();
    this.commonService.getListOfData('OpticalPrescription/GetfinalopDetails/' + this.M_search + '/' + localStorage.getItem('CompanyID'))
      .subscribe((data: any) => {
        debugger;
        if (data.opfinalprescri.length > 0) {
          this.commonService.data = data;
          this.dataSource.data = data.opfinalprescri;
        } else {
          Swal.fire({
            position: 'center',
            type: 'warning',
            title: 'Data Not Found',
            showConfirmButton: false,
            timer: 4000
          });
        }

      });

  }



  DashboardView() {
    this.commonService.data = new Search();
    this.commonService.getListOfData('Help/getDashhelpCode1/').subscribe(data => {
      debugger;
      if (data.Regdetail != null) {
        this.commonService.data = data;
        this.dataSource.data = data.Regdetail;
      }
    });
  }
  Doctorviews() {
    debugger;
    this.commonService.data = new Search();
    this.commonService.getListOfData('Help/getDoc/' + parseInt(localStorage.getItem('CompanyID'))).subscribe(data => {
      debugger;
      if (data.docdetail != null) {
        const result = _.chain(data.docdetail).groupBy('DoctorID').map(function(v, i) {
          return {
            FirstName: _.get(_.find(v, 'FirstName'), 'FirstName'),
            MiddleName: _.get(_.find(v, 'MiddleName'), 'MiddleName'),
            LastName: _.get(_.find(v, 'LastName'), 'LastName'),
            DateofBirth: _.get(_.find(v, 'DateofBirth'), 'DateofBirth'),
            Gender: _.get(_.find(v, 'Gender'), 'Gender'),
            Address1: _.get(_.find(v, 'Address1'), 'Address1'),
            Address2: _.get(_.find(v, 'Address2'), 'Address2'),
            Address3: _.get(_.find(v, 'Address3'), 'Address3'),
            CMPID: _.get(_.find(v, 'CMPID'), 'CMPID'),
            Designation: _.get(_.find(v, 'Designation'), 'Designation'),
            DoctorID: _.get(_.find(v, 'DoctorID'), 'DoctorID'),
            Title: _.get(_.find(v, 'Title'), 'Title'),
            DoctorName: _.get(_.find(v, 'DoctorName'), 'DoctorName'),
            DOCTORTAG: _.get(_.find(v, 'DOCTORTAG'), 'DOCTORTAG'),
            DoctorSpecialityID: _.map(v, 'DoctorSpecialityID'),
            EmailID: _.get(_.find(v, 'EmailID'), 'EmailID'),
            EngagementType: _.get(_.find(v, 'EngagementType'), 'EngagementType'),
            LocationID: _.get(_.find(v, 'LocationID'), 'LocationID'),
            City: _.get(_.find(v, 'City'), 'City'),
            Phone1: _.get(_.find(v, 'Phone1'), 'Phone1'),
            Phone2: _.get(_.find(v, 'Phone2'), 'Phone2'),
            RegistrationNumber: _.get(_.find(v, 'RegistrationNumber'), 'RegistrationNumber'),
            roleid: _.get(_.find(v, 'roleid'), 'roleid'),
            Status: _.get(_.find(v, function (o) { return o.Status != null; }), 'Status'),
            Speciality: _.map(v, 'Speciality')
          };
        }).value();
        debugger;
        this.commonService.data = result;
        this.dataSource.data = result;
        this.dataSource._updateChangeSubscription;
        this.dataSource.sort = this.sort;

      } else {

      }
    });

  }

  EmployeeView() {
    this.commonService.data = new Search();
    this.commonService.getListOfData('Help/getEmployeeAll/' + parseInt(localStorage.getItem('CompanyID'))).subscribe(data => {
      if (data.EmployeeDetail != null) {
        this.commonService.data = data;
        this.dataSource.data = data.EmployeeDetail;
        this.dataSource.sort = this.sort;
      } else {
      }
    });
  }


  IcdMasterView() {
    debugger;
    console.log(this.data);
    // this.commonService.data = new Search();

    this.commonService.getListOfData('Help/getCode1/' + this.data.dataKey).subscribe(data => {

      if (data.IcdDetail.length >= 1) {
        debugger;
        //   this.commonService.data = data;
        this.dataSource.data = data.IcdDetail;
        this.dataSource.sort = this.sort;
      } else {
        debugger;
        Swal.fire({
          position: 'center',
          type: 'warning',
          title: 'No Data Found',
          showConfirmButton: false,
          timer: 4000
        });
        this.dataSource.data = [];
        this.dataSource._updateChangeSubscription();
      }


    });

  }

  DrugView() {

    this.commonService.data = new Search();

    this.commonService.getListOfData('Help/getDrug/' + parseInt(localStorage.getItem("CompanyID"))).subscribe(data => {

      if (data.DrugDetail != null) {
        this.dataSource.data = data.DrugDetail;
        this.dataSource.sort = this.sort;
      }
    });
  }

  /*Delete*/
  VendorView() {
    debugger;
    this.gethelpdetails();
    this.commonService.data = new Search();
    this.commonService.getListOfData('Help/getVendor/' + parseInt(localStorage.getItem('CompanyID'))).subscribe(data => {
      if (data.Vendordetail != null) {
        this.commonService.data = data;
        this.dataSource.data = data.Vendordetail;
      }
    });
  }

  VendorView1() {
    debugger;
    this.gethelpdetails();
    this.commonService.data = new Search();
    // this.commonServiceV.data = new VendorMasters();
    this.commonService.data.VendorMasters.VendorCode = this.M_search;
    this.commonService.data.VendorMasters.Name = this.M_search;
    this.commonService.data.VendorMasters.MobileNo = this.M_search;
    this.commonService.data.VendorMasters.PhoneNo = this.M_search;
    this.commonService.getListOfData('Help/getVendor1/' + this.M_search + '/' + parseInt(localStorage.getItem('CompanyID'))).subscribe(data => {
      if (data.Vendordetail.length > 0) {
        this.commonService.data = data;
        this.dataSource.data = data.Vendordetail;
      } else {
        Swal.fire({
          position: 'center',
          type: 'warning',
          title: 'Data Not Found',
          showConfirmButton: false,
          timer: 4000
        });
      }
    });
  }

  selectDrop(Code) {


    const ans = confirm('Do you want to Delete ICD Detail: ' + Code);
    if (ans) {
      this.commonService.DeleteICD(Code).subscribe(data => {
        if (data.Success == true) {

          Swal.fire({
            position: 'center',
            type: 'success',
            title: 'Deleted Successfully',
            showConfirmButton: false,
            timer: 3000
          });
          this.IcdMasterView();
        } else {
          Swal.fire({
            position: 'center',
            type: 'success',
            title: 'Deleted Cancel',
            showConfirmButton: false,
            timer: 4000
          });
        }


      });

    }


  }
  AdvancePaymentView1() {
    this.gethelpdetails();
    this.commonService.data = new Search();
    this.commonServices.data = new RegistrationMaster();
    this.commonServices.data.RegistrationMaster.UIN = this.M_search;
    this.commonServices.data.RegistrationMaster.Phone = this.M_search;
    this.commonServices.data.RegistrationMaster.Name = this.M_search;
    this.commonServices.getListOfData('Help/getAdvpay/' + this.M_search + '/' + parseInt(localStorage.getItem('CompanyID'))).subscribe(data => {
      if (data.Advpaydetail.length > 0) {
        this.commonService.data = data;
        this.dataSource.data = data.Advpaydetail;
        // this.dataSourcee.data = data.Regdetail;
      } else {
        Swal.fire({
          position: 'center',
          type: 'warning',
          title: 'Data Not Found',
          showConfirmButton: false,
          timer: 4000
        });
      }
    });
  }

  InsuranceView() {
    debugger;
    this.commonService.data = new Search();
    this.commonService.getListOfData('Help/getInsurance/').subscribe(data => {
      debugger;
      if (data.getInsurance != null) {
        this.commonService.data = data;
        this.dataSource.data = data.getInsurance;
      }
    });
  }

  












  RegistrationView() {
    this.gethelpdetails();
    this.commonService.data = new Search();
    this.commonService.getListOfData('Help/getRegCode1/').subscribe(data => {
      debugger;
      if (data.Regdetail != null) {
        this.commonService.data = data;
        this.dataSource.data = data.Regdetail;
      } else {
        Swal.fire({
          position: 'center',
          type: 'warning',
          title: 'Data Not Found',
          showConfirmButton: false,
          timer: 4000
        });
      }
    });
  }

  RegistrationView1() {
    this.gethelpdetails();
    this.commonService.data = new Search();
    this.commonServices.data = new RegistrationMaster();
    this.commonServices.data.RegistrationMaster.UIN = this.M_search;
    this.commonServices.data.RegistrationMaster.Phone = this.M_search;
    this.commonServices.data.RegistrationMaster.Name = this.M_search;
    this.commonServices.getListOfData('Help/getRegCode/' + this.M_search + '/' + parseInt(localStorage.getItem('CompanyID'))).subscribe(data => {
      if (data.Regdetail.length > 0) {
        this.commonService.data = data;
        this.dataSource.data = data.Regdetail;
        // this.dataSourcee.data = data.Regdetail;
      } else {
        Swal.fire({
          position: 'center',
          type: 'warning',
          title: 'Data Not Found',
          showConfirmButton: false,
          timer: 4000
        });
      }
    });
  }
  CampRegistrationView()
  {
    debugger;
    this.gethelpdetails();
    this.commonService.data = new Search();
    this.commonServiceCamp.data = new CampRegistrationViewModel();
    this.commonServiceCamp.data.CampRegistration.CampUIN = this.M_search;
    this.commonServiceCamp.data.CampRegistration.Phone = this.M_search;
    this.commonServiceCamp.data.CampRegistration.Name = this.M_search;
    this.commonServices.getListOfData('Help/getCmpRegCode/' + this.M_search + '/' + parseInt(localStorage.getItem('CompanyID'))).subscribe(data => {
      if (data.Regdetail.length > 0) {
        this.commonService.data = data;
        this.dataSource.data = data.Regdetail;
        // this.dataSourcee.data = data.Regdetail;
      } else {
        Swal.fire({
          position: 'center',
          type: 'warning',
          title: 'Data Not Found',
          showConfirmButton: false,
          timer: 4000
        });
      }
    });
  }
  AppointmentRegistrationView()
  {
    debugger;
    this.gethelpdetails();
    this.commonServices.getListOfData('Help/getAppRegCode/' + this.M_search + '/' + parseInt(localStorage.getItem('CompanyID'))).subscribe(data => {
      if (data.Appdetail.length > 0) {
        this.commonService.data = data;
        this.dataSource.data = data.Appdetail;
        
      } else {
        Swal.fire({
          position: 'center',
          type: 'warning',
          title: 'Data Not Found',
          showConfirmButton: false,
          timer: 4000
        });
      }
    });

  }
  FinalBilling1() {
    this.gethelpdetails();
    this.commonService.data = new Search();
    this.commonServices.data = new RegistrationMaster();
    this.commonServices.data.RegistrationMaster.UIN = this.M_search;
    this.commonServices.data.RegistrationMaster.Phone = this.M_search;
    this.commonServices.data.RegistrationMaster.Name = this.M_search;
    this.commonServices.getListOfData('Help/getFinalbilling1/' + this.M_search + '/' + parseInt(localStorage.getItem('CompanyID'))).subscribe(data => {
      if (data.FBdetail.length > 0) {
        this.commonService.data = data;
        this.dataSource.data = data.FBdetail;
        // this.dataSourcee.data = data.Regdetail;
      } else {
        Swal.fire({
          position: 'center',
          type: 'warning',
          title: 'Data Not Found',
          showConfirmButton: false,
          timer: 4000
        });
      }
    });
  }
  FinalBilling() {
    this.gethelpdetails();
    this.commonService.data = new Search();
    this.commonServices.data = new RegistrationMaster();
    this.commonServices.data.RegistrationMaster.UIN = this.M_search;
    this.commonServices.data.RegistrationMaster.Phone = this.M_search;
    this.commonServices.data.RegistrationMaster.Name = this.M_search;
    this.commonServices.getListOfData('Help/getFinalbilling/' + this.M_search + '/' + parseInt(localStorage.getItem('CompanyID'))).subscribe(data => {
      if (data.FBdetail.length > 0) {
        this.commonService.data = data;
        this.dataSource.data = data.FBdetail;
        // this.dataSourcee.data = data.Regdetail;
      } else {
        Swal.fire({
          position: 'center',
          type: 'warning',
          title: 'Data Not Found',
          showConfirmButton: false,
          timer: 4000
        });
      }
    });
  }


  RegistrationReview() {
    debugger;
    this.commonService.data = new Search();
    // this.commonService.data = new RegistrationMaster();
    this.commonService.getListOfData('Help/getRevReg/' + this.UIN).subscribe(data => {
      debugger;
      if (data.Regdetail != null) {
        this.commonService.data = data;
        this.dataSource.data = data.Regdetail;
      }
    });
  }

  Dialogclose() {
    this.dialogRef.close({ success: false });
  }

  @ViewChild("TitleHeader") TitleHeader: ElementRef;

  selectedRev() {
    debugger;

    if (this.helpname == 'CompanyMaster') {
      $('h4').text('Company Master');
      this.ExcelName = 'Company Master.xlsx';
      this.PdfName = 'Company Master.pdf';
      this.sheetName = 'Company Master';
    }
    if (this.helpname == 'RegistrationReview') {
      $('h4').text('Review Detalis');
      this.M_UIN = this.UIN;
      this.M_Name = this.Name;
      this.M_phone = this.Phone;
      this.M_Age = this.Age;
      this.hiddenReview = true;
    }
  }

  selectedHeader() {
    if (this.helpname == 'doctormaster') {
      this.TitleHeader.nativeElement.innerHTML = "Doctor Master";
      this.ExcelName = 'Doctor Master.xlsx';
      this.PdfName = 'Doctor Master.pdf';
      this.sheetName = 'Doctor Master';
    }
    if (this.helpname == 'Customer Master') {
      this.TitleHeader.nativeElement.innerHTML = "Customer Master";
      this.ExcelName = 'Customer Master.xlsx';
      this.PdfName = 'Customer Master.pdf';
      this.sheetName = 'Customer Master';
    }
    if (this.helpname == 'Donor') {
      this.TitleHeader.nativeElement.innerHTML = "Donor";
      this.ExcelName = 'Donor.xlsx';
      this.PdfName = 'Donor.pdf';
      this.sheetName = 'Donor';
    }
    if (this.helpname == 'icdmaster') {
      this.TitleHeader.nativeElement.innerHTML = "ICD Master";
      this.ExcelName = 'ICD Master.xlsx';
      this.PdfName = 'ICD Master.pdf';
      this.sheetName = 'ICD Master';
    }

    if (this.helpname == 'Employeemaster') {
      $('h4').text('Employee Master');
      this.ExcelName = 'Employee Master.xlsx';
      this.PdfName = 'Employee Master.pdf';
      this.sheetName = 'Employee Master';
    }

    if (this.helpname == 'Drugmaster') {
      this.TitleHeader.nativeElement.innerHTML = "Drug Master";
      this.ExcelName = 'Drug Master.xlsx';
      this.PdfName = 'Drug Master.pdf';
      this.sheetName = 'Drugmaster';
    }
    if (this.helpname == 'Registration') {
      $('h4').text('Registration');
      this.ExcelName = 'Registration.xlsx';
      this.PdfName = 'Registration.pdf';
      this.sheetName = 'Registration';
    }
    if (this.helpname == 'Vendor') {
      $('h4').text('Vendor');
      this.ExcelName = 'Vendor.xlsx';
      this.PdfName = 'Vendor.pdf';
      this.sheetName = 'Vendor';
    }

    if (this.helpname == 'Store') {
      $('h4').text('Store');
      this.ExcelName = 'Store.xlsx';
      this.PdfName = 'Store.pdf';
      this.sheetName = 'Store';
    }

    if (this.helpname == 'OperationTheatre') {
      $('h4').text('OperationTheatre');
      this.ExcelName = 'OperationTheatre.xlsx';
      this.PdfName = 'OperationTheatre.pdf';
      this.sheetName = 'OperationTheatre';
    }

    if (this.helpname == 'DischargedPatientDetails') {
      this.TitleHeader.nativeElement.innerHTML = "Discharged Patient Details";
      this.ExcelName = 'DischargedPatientDetails.xlsx';
      this.PdfName = 'DischargedPatientDetails.pdf';
      this.sheetName = 'DischargedPatientDetails';
    }


    if (this.helpname == 'SurgeryDischarge') {
      this.TitleHeader.nativeElement.innerHTML = "Surgery Discharge";
      this.ExcelName = 'SurgeryDischarge.xlsx';
      this.PdfName = 'SurgeryDischarge.pdf';
      this.sheetName = 'SurgeryDischarge';
    }

    if (this.helpname == 'ModuleMaster') {
      $('h4').text('Module Master');
      this.ExcelName = 'ModuleMaster.xlsx';
      this.PdfName = 'ModuleMaster.pdf';
      this.sheetName = 'ModuleMaster';
    }

    if (this.helpname == 'PAC') {
      this.TitleHeader.nativeElement.innerHTML = "Pre-Anaesthetic Checkup";
    }

    if (this.helpname == 'PreviousSurgeryDetails') {
      this.TitleHeader.nativeElement.innerHTML = "Previous Surgery Details";
    }
    if (this.helpname == 'PostOperative') {
      $('h4').text('PostOperative');
      this.ExcelName = 'PostOperative.xlsx';
      this.PdfName = 'PostOperative.pdf';
      this.sheetName = 'PostOperative';
    }
    if (this.helpname == 'Counselling Patients') {
      $('h4').text('Counselling Patients');
      this.ExcelName = 'CounsellingPatients.xlsx';
      this.PdfName = 'CounsellingPatients.pdf';
      this.sheetName = 'CounsellingPatients';
    }
    if (this.helpname == 'NumberControl') {
      $('h4').text('NumberControl');
      this.ExcelName = 'NumberControl.xlsx';
      this.PdfName = 'NumberControl.pdf';
      this.sheetName = 'NumberControl';
    }
    if (this.helpname == 'TransactionType') {
      $('h4').text('Transaction Type');
      this.ExcelName = 'TransactionType.xlsx';
      this.PdfName = 'TransactionType.pdf';
      this.sheetName = 'TransactionType';
    }
    if (this.helpname == 'DrugGroup') {
      this.TitleHeader.nativeElement.innerHTML = "Generic Medicine Master";
      this.ExcelName = 'Generic Medicine Master.xlsx';
      this.PdfName = 'Generic Medicine Master.pdf';
      this.sheetName = 'Generic Medicine Master';
    }

    if (this.helpname == 'Lensmasters') {
      $('h4').text('Lens Masters');
      this.ExcelName = 'Lens Masters.xlsx';
      this.PdfName = 'Lens Masters.pdf';
      this.sheetName = 'Lens Masters';
    }

    if (this.helpname == 'TreatmentMaster') {
      $('h4').text('Treatment Master');
      this.ExcelName = 'TreatmentMaster.xlsx';
      this.PdfName = 'TreatmentMaster.pdf';
      this.sheetName = 'TreatmentMaster';
    }

    if (this.helpname == 'MaterialReturn') {
      $('h4').text('Material Return');
      this.ExcelName = 'MaterialReturn.xlsx';
      this.PdfName = 'MaterialReturn.pdf';
      this.sheetName = 'MaterialReturn';
    }
    if (this.helpname == 'Configuration') {
      $('h4').text('Configuration');
      this.ExcelName = 'Configuration.xlsx';
      this.PdfName = 'Configuration.pdf';
      this.sheetName = 'Configuration';
    }

    if (this.helpname == 'UserActive') {
      $('h4').text('User Active');
      this.ExcelName = 'User_Active.xlsx';
      this.PdfName = 'User_Active.pdf';
      this.sheetName = 'User_Active';
    }

    if (this.helpname == 'SlitLamp') {
      $('h4').text('SlitLamp');
      this.ExcelName = 'SlitLamp.xlsx';
      this.PdfName = 'SlitLamp.pdf';
      this.sheetName = 'SlitLamp';
    }
    if (this.helpname == 'Fundus') {
      $('h4').text('Fundus');
      this.ExcelName = 'Fundus.xlsx';
      this.PdfName = 'Fundus.pdf';
      this.sheetName = 'Fundus';
    }

    if (this.helpname == 'RoomTransfer') {
      $('h4').text('RoomTransfer');
      this.ExcelName = 'RoomTransfer.xlsx';
      this.PdfName = 'RoomTransfer.pdf';
      this.sheetName = 'RoomTransfer';
    }



    if (this.helpname == 'IOProcedureTemplate') {
      this.TitleHeader.nativeElement.innerHTML = "IO Procedure Template";
      this.ExcelName = 'IO Procedure Template.xlsx';
      this.PdfName = 'IO Procedure Template.pdf';
      this.sheetName = 'IO Procedure Template';
    }
  }








  ///////////////////////////////////
}


