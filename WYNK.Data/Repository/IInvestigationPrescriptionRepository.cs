using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Text;
using WYNK.Data.Model.ViewModel;

namespace WYNK.Data.Repository
{
    public interface IInvestigationPrescriptionRepository : IRepositoryBase<InvestigationPrescriptionk>

    {
        dynamic InsertInvPrescription(InvestigationPrescriptionk InvestigationPrescription,int CMPID, int TransactionTypeid);

        InvestigationPrescriptionk Getdescvalues(int id);
        dynamic Updatepres(InvestigationPrescriptionk InvestigationPrescription, string UIN);
        bool uploadImag(IFormFile file, string desc, string uin, string id);


        //dynamic InsertIntraoperative(SurgeryViewModel Intraoperative); 
        //dynamic InsertPreoperative(SurgeryViewModel Preoperative);
        //dynamic UpdateSurgeryMas(SurgeryViewModel UpdateSurgeryMaster, int M_AdmId, int M_surId);


    }

}


