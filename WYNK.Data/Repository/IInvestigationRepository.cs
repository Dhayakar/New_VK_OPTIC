using System;
using System.Collections.Generic;
using System.Text;
using WYNK.Data.Common;
using WYNK.Data.Model.ViewModel;
using Microsoft.AspNetCore.Http;

namespace WYNK.Data.Repository
{
    public interface IInvestigationRepository : IRepositoryBase<InvestigationImage>
    {

        dynamic UpdateInvestigation(InvestigationImage Investigation, string UIN, int ipid);
        dynamic UpdateInv(InvestigationImage Investigation, string UIN, int IID);//UpdateInv
        bool uploadImag(IFormFile file, string desc, string uin, string id);
        dynamic Getimage(string uin);//Getimage
        InvestigationImage GetInvpresDetails(string ID);//GetPatDetails
        InvestigationImage GetInvpastDetails(int cmpid, string UIN);
        InvestigationImage GetPatDetails(string UIN, int cmpid, string GMT);
        InvestigationImage GetInvpresTranDetails(string ID, int NO);
        InvestigationImage GetUINDetails(int cid);//Getinvestigationvalues
    }
}
