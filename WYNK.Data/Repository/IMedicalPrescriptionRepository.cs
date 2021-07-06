using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Text;
using WYNK.Data.Common;
using WYNK.Data.Model.ViewModel;

namespace WYNK.Data.Repository
{
    public interface IMedicalPrescriptionRepository : IRepositoryBase<Medical_Prescription>
    {

        Medical_Prescription GetPatientDetails(string UIN,int rid);//ViewTempDetailsdel
        Medical_Prescription TapperedDetails(int DoctorId, int cmpid);
        Medical_Prescription TapperedDetailsall(int drugid, int DoctorId, int cmpid);
        Medical_Prescription TapperedDetailsdelete(int drugid, int DoctorId, int cmpid);
        Medical_Prescription ViewTempDetailsdel(string drugname, int DoctorId, int cmpid);
        Medical_Prescription Getallergyinfo(int Drugid, string UIN, int cmpid);
        Medical_Prescription GetUINDetails(int cid);
        Medical_Prescription GetHistoryDetails(string UIN, int rid, string gmt);
        Medical_Prescription GetStockDetails(int quantity, int drugid, int cmpid);//GetStockNo
        Medical_Prescription GetStockNo(int drugid, int cmpid);
        Medical_Prescription GetAllMedicineDetails(string rid);

        Medical_Prescription GetMedicineDetails(string ID, DateTime presdate,int rid);//GetTapperingDetails(int medid, int docid)
        Medical_Prescription GetTapperingDetails(int medid, int docid, int cmpid);

        dynamic UpdateMedicalPrescription(Medical_Prescription MedicalPrescription, int cmpPid, int TransactionTypeid, string cmpname, string dcname);//UpdateFood
        dynamic UpdateFreq(Medical_Prescription MedicalPrescription);
        dynamic UpdateFood(Medical_Prescription MedicalPrescription);//Updatepres
        dynamic Updatepres(Medical_Prescription MedicalPrescription, string UIN);
        bool uploadImag(IFormFile file, string desc, string uin, string id);

        //IEnumerable<Dropdown> GetBrandDetails(string surgerytype);

        IEnumerable<Dropdown> GetBrandDetails(int surgerytype);

        Medical_Prescription getDrug(int cmpid);//GetEngDetails
        Medical_Prescription GetAltdtls(int drugid, int cmpid);
        dynamic Getimage(string uin);
        Medical_Prescription GetSpanishDetails();
        Medical_Prescription GetEngDetails();
        bool uploadImag(IFormFile file, string uin);
        dynamic SaveTemplate(Medical_Prescription MedicalPrescription);//SaveTappering
        dynamic SaveTappering(Medical_Prescription MedicalPrescription, int medid, int docid);
        dynamic OverrideTemplate(Medical_Prescription MedicalPrescription);

        //dynamic Getnumbercontrol(int CMPID, int TID);
    }
}
