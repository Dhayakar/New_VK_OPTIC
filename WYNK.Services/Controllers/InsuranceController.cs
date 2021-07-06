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
    public class InsuranceController : Controller
    {
        private IRepositoryWrapper _repoWrapper;
        public InsuranceController(IRepositoryWrapper repoWrapper)
        {
            _repoWrapper = repoWrapper;
        }
        
        [HttpGet("GetPinCodeDetails/{id}")]
        public InsuranceViewModel GetPinCodeDetails(int id)

        {
            return _repoWrapper.Insurance.GetPinCodeDetails(id);
        }
        [HttpGet("GetlocationDetails/{id}")]
        public InsuranceViewModel GetlocationDetails(int id)

        {
            return _repoWrapper.Insurance.GetlocationDetails(id);
        }
        [HttpPost("InsertInsurance")]
        public dynamic InsertInsurance([FromBody]InsuranceViewModel AddInsurance)
        {
            return _repoWrapper.Insurance.InsertInsurance(AddInsurance);
        }
        [HttpPost("UpdateInsurance/{ID}")]
        public dynamic UpdateInsurance([FromBody] InsuranceViewModel InsuranceUpdate, int ID)
        {
            return _repoWrapper.Insurance.UpdateInsurance(InsuranceUpdate,ID);
        }

      

    }
}