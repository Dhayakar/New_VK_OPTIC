using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using System.Threading;
using WYNK.Data.Repository;
using WYNK.Data.Common;
using WYNK.Data.Model.ViewModel;

namespace WYNK.Services.Controllers
{
    [Route("[controller]")]
    public class CustomerMasterController : Controller
    {
        private IRepositoryWrapper _repoWrapper;

        public CustomerMasterController(IRepositoryWrapper repoWrapper)
        {
            _repoWrapper = repoWrapper;
        }


        [HttpPost("SubmitCustomerMaster")]
        public dynamic SubmitCustomer([FromBody] CustomerMasterViewModel CustomerDetails)
        {
            return _repoWrapper.Customermaster.SubmitCustomer(CustomerDetails);
        }

        [HttpPost("UpdateCustomerMaster/{ID}")]
        public dynamic UpdateCustomerMaster([FromBody] CustomerMasterViewModel CustomerDetails, int ID)
        {
            return _repoWrapper.Customermaster.UpdateCustomerMaster(CustomerDetails, ID);
        }

        [HttpGet("DeleteCustomerMaster/{ID}/{CMPID}/{USERID}")]
        public dynamic DeleteCustomerMaster(int ID,int CMPID,int USERID)
        {
            return _repoWrapper.Customermaster.DeleteCustomerMaster(ID,  CMPID,  USERID);
        }


    }
}



