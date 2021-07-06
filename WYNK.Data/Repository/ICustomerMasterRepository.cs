using System;
using System.Collections.Generic;
using System.Text;
using WYNK.Data.Model.ViewModel;
using Microsoft.AspNetCore.Http;


namespace WYNK.Data.Repository
{
    public interface ICustomerMasterRepository : IRepositoryBase<CustomerMasterViewModel>
    {
        dynamic SubmitCustomer(CustomerMasterViewModel CustomerDetails);
        dynamic UpdateCustomerMaster(CustomerMasterViewModel CustomerDetails,int ID);
        dynamic DeleteCustomerMaster(int ID, int CMPID, int USERID);
    }
}
