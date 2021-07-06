using System;
using System.Collections.Generic;
using System.Text;
using WYNK.Data.Model.ViewModel;
using Microsoft.AspNetCore.Http;


namespace WYNK.Data.Repository
{
    public interface IDonorRepository : IRepositoryBase<DonorViewModel>
    {
          dynamic SubmitDonor(DonorViewModel DonorDetails);
        dynamic UpdateDonor(DonorViewModel DonorDetails,int ID);
        dynamic DeleteDonor(int ID, int CMPID, int USERID,string Companyname);
    }
}
