import { Routes, RouterModule } from '@angular/router';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { MatFormFieldModule, MatInputModule } from '@angular/material';
import { LoginComponent } from './Views/login/login.component';
import { DashboardnewregisteredvaluesComponent } from './Views/dashboardnewregisteredvalues/dashboardnewregisteredvalues.component';
import { AccessprivilegesComponent } from './Views/accessprivileges/accessprivileges.component';
import { MaterialreturntovendorComponent } from './Views/materialreturntovendor/materialreturntovendor.component';
import { WhatsapptemplateComponent } from './Views/whatsapptemplate/whatsapptemplate.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  //{ path: 'whatsnew', component: WhatsnewComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dash', component: DashboardnewregisteredvaluesComponent },
  { path: 'useraccess', component: AccessprivilegesComponent },
  { path: 'Whatsapp', component: WhatsapptemplateComponent },

  {
    path: 'Opticalslazy',
    loadChildren: './Opticals.module#OpticalsLazyModule'
  },

    {
    path: 'Inventorylazy',
    loadChildren: './Inventory.module#InventoryLazyModule'
  },
  //{ path: 'Drugslazy/olm/Manufacturer', component: OnelinemasterComponent },
  //{ path: 'Drugslazy/olm/Frequency', component: OnelinemasterComponent },
  //{ path: 'Drugslazy/olm/Drug Instruction', component: OnelinemasterComponent },
  //{ path: 'Drugslazy/olm/DrugForm', component: OnelinemasterComponent },
  //{ path: 'Commonmasterslazy/olm/Engagement', component: OnelinemasterComponent },
  //{ path: 'Commonmasterslazy/olm/Title', component: OnelinemasterComponent },
  //{ path: 'ClinicalProcedureslazy/olm/Diagnosis', component: OnelinemasterComponent },
  //{ path: 'ClinicalProcedureslazy/olm/Services', component: OnelinemasterComponent },
  //{ path: 'ClinicalProcedureslazy/olm/Investigation Test', component: OnelinemasterComponent },
  //{ path: 'ClinicalProcedureslazy/olm/Speciality', component: OnelinemasterComponent },
  //{ path: 'Admissionlazy/olm/ICD Group', component: OnelinemasterComponent },
  //{ path: 'ClinicalProcedureslazy/olm/RoleTable', component: OnelinemasterComponent },
  //{ path: 'ClinicalProcedureslazy/olm/Source Of Referral', component: OnelinemasterComponent },
  //{ path: 'ClinicalProcedureslazy/olm/Status', component: OnelinemasterComponent },
  //{ path: 'ClinicalProcedureslazy/olm/Payment', component: OnelinemasterComponent },
  //{ path: 'ClinicalProcedureslazy/olm/Opinion', component: OnelinemasterComponent },
  //{ path: 'ClinicalProcedureslazy/olm/Category', component: OnelinemasterComponent },
  //{ path: 'ClinicalProcedureslazy/olm/Instrument', component: OnelinemasterComponent },
  //{ path: 'ClinicalProcedureslazy/olm/NearVision', component: OnelinemasterComponent },
  //{ path: 'ClinicalProcedureslazy/olm/VA DistanceVision', component: OnelinemasterComponent },
  //{ path: 'ClinicalProcedureslazy/olm/VisionType', component: OnelinemasterComponent },
  //{ path: 'ClinicalProcedureslazy/olm/ChartType', component: OnelinemasterComponent },
  //{ path: 'ClinicalProcedureslazy/olm/Index', component: OnelinemasterComponent },
  //{ path: 'ClinicalProcedureslazy/olm/Manufacturer', component: OnelinemasterComponent },
  //{ path: 'ClinicalProcedureslazy/olm/Frequency', component: OnelinemasterComponent },
  //{ path: 'ClinicalProcedureslazy/olm/Drug Instruction', component: OnelinemasterComponent },
  //{ path: 'ClinicalProcedureslazy/olm/Dosage', component: OnelinemasterComponent },
  //{ path: 'ClinicalProcedureslazy/olm/CoverTestDistanceVision', component: OnelinemasterComponent },
  //{ path: 'ClinicalProcedureslazy/olm/CoverTestNearVision', component: OnelinemasterComponent },
  //{ path: 'ClinicalProcedureslazy/olm/RoomStatus', component: OnelinemasterComponent },
  //{ path: 'ClinicalProcedureslazy/olm/RoomType', component: OnelinemasterComponent },
  //{ path: 'ClinicalProcedureslazy/olm/Ocular Complaints', component: OnelinemasterComponent },
  //{ path: 'ClinicalProcedureslazy/olm/Systemic Condition', component: OnelinemasterComponent },
  //{ path: 'ClinicalProcedureslazy/olm/Optical Brand', component: OnelinemasterComponent },
  //{ path: 'ClinicalProcedureslazy/olm/FDDT', component: OnelinemasterComponent },
  //{ path: 'ClinicalProcedureslazy/olm/Syringing', component: OnelinemasterComponent },
  //{ path: 'ClinicalProcedureslazy/olm/Opticalbrand', component: OnelinemasterComponent },
  //{ path: 'Admissionlazy/olm/Icd Group Speciality', component: OnelinemasterComponent },
  //{ path: 'Outpatientslazy/olm/SourceOfReferral', component: OnelinemasterComponent },
  //{ path: 'Outpatientslazy/olm/Status', component: OnelinemasterComponent },
  //{ path: 'Outpatientslazy/olm/Relation', component: OnelinemasterComponent },
  //{ path: 'Opticalslazy/olm/Index', component: OnelinemasterComponent },
  //{ path: 'Opticalslazy/olm/Type Of Visits', component: OnelinemasterComponent },
  //{ path: 'ClinicalProcedureslazy/olm/Tear meniscus height', component: OnelinemasterComponent },
  //{ path: 'ClinicalProcedureslazy/olm/Tear Breakup time', component: OnelinemasterComponent },


  //{ path: 'ClinicalProcedureslazy/SquintM/Ocular Movements', component: SquintExtnMasterComponent },
  //{ path: 'ClinicalProcedureslazy/SquintM/Cover Test on Head Tilt', component: SquintExtnMasterComponent },
  //{ path: 'ClinicalProcedureslazy/SquintM/Angle kappa', component: SquintExtnMasterComponent },
  //{ path: 'ClinicalProcedureslazy/SquintM/ACA method', component: SquintExtnMasterComponent },
  //{ path: 'ClinicalProcedureslazy/SquintM/ACA value', component: SquintExtnMasterComponent },
  //{ path: 'ClinicalProcedureslazy/SquintM/Worth Four Dot Test', component: SquintExtnMasterComponent },
  //{ path: 'ClinicalProcedureslazy/SquintM/Stereopsis method', component: SquintExtnMasterComponent },
  //{ path: 'ClinicalProcedureslazy/SquintM/Stereopsis value', component: SquintExtnMasterComponent },
  //{ path: 'ClinicalProcedureslazy/SquintM/ARC', component: SquintExtnMasterComponent },
  //{ path: 'ClinicalProcedureslazy/SquintM/Squint Types', component: SquintExtnMasterComponent },
  //{ path: 'ClinicalProcedureslazy/SquintM/Amplitude', component: SquintExtnMasterComponent },
  //{ path: 'ClinicalProcedureslazy/SquintM/Frequency', component: SquintExtnMasterComponent },
  //{ path: 'ClinicalProcedureslazy/SquintM/Type', component: SquintExtnMasterComponent },
  //{ path: 'ClinicalProcedureslazy/SquintM/Pursuit', component: SquintExtnMasterComponent },
  //{ path: 'ClinicalProcedureslazy/SquintM/Saccade', component: SquintExtnMasterComponent },
  //{ path: 'ClinicalProcedureslazy/SquintM/Abnormal Head position', component: SquintExtnMasterComponent },
  //{ path: 'ClinicalProcedureslazy/SquintM/Frequency on Convergence', component: SquintExtnMasterComponent },
  //{ path: 'ClinicalProcedureslazy/SquintM/Occulusion of One eye', component: SquintExtnMasterComponent },
  //{ path: 'ClinicalProcedureslazy/SquintM/Oscillopsia', component: SquintExtnMasterComponent },
  //{ path: 'ClinicalProcedureslazy/SquintM/Patterns of squint', component: SquintExtnMasterComponent },

  //{
  //  path: 'Patienthistory',
  //  loadChildren: './WorkflowOPD.module#WorkflowLazyModule'
  //},
  //{
  //  path: 'Refraction',
  //  loadChildren: './Refractionform.module#RefractionLazyModule'
  //},
  //{
  //  path: 'findings',
  //  loadChildren: './FindingsForm.module#FindingsModule'
  //},
  //{
  //  path: 'opd',
  //  loadChildren: './Medicalprescriptionentry.module#MedicalprescriptionModule'
  //},
  //{
  //  path: 'AppointmentLazy',
  //  loadChildren: './Appointment.module#AppointmentLazyModule'
  //},
  //{
  //  path: 'lazy',
  //  loadChildren: './lazy.module#LazyModule'
  //},
  //{
  //  path: 'Managementlazy',
  //  loadChildren: './Management.module#ManagementLazyModule'
  //},
  //{
  //  path: 'Outpatientslazy',
  //  loadChildren: './outpatientslazy.module#OutpatientsLazyModule'
  //},
  //{
  //  path: 'Commonmasterslazy',
  //  loadChildren: './Commonmasters.module#CommonmastersLazyModule'
  //},
  //{
  //  path: 'ClinicalProcedureslazy',
  //  loadChildren: './ClinicalProcedure.module#ClinicalProceduresLazyModule'
  //},
  //{
  //  path: 'Counsellinglazy',
  //  loadChildren: './Counselling.module#CounsellingLazyModule'
  //},
  //{
  //  path: 'Drugslazy',
  //  loadChildren: './Drug.module#DrugLazyModule'
  //},

  //{
  //  path: 'Admissionlazy',
  //  loadChildren: './Admission.module#AdmissionLazyModule'
  //},


  //{
  //  path: 'Administrationlazy',
  //  loadChildren: './Administration.module#AdminLazyModule'
  //},
  //{
  //  path: 'Camp',
  //  loadChildren: './Campmaster.module#CampmasterLazyModule'
  //},
]

@NgModule({
  declarations: [    
  ],
  imports: [
    RouterModule.forRoot(appRoutes, { useHash: true }),
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    BrowserModule, MatFormFieldModule, MatInputModule
  ],
  exports: [RouterModule, MatFormFieldModule, MatInputModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppRoutingModule { }
