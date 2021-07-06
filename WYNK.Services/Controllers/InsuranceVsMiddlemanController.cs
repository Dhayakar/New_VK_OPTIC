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
    public class InsuranceVsMiddlemanController : Controller
    {
        private IRepositoryWrapper _repoWrapper;
        public InsuranceVsMiddlemanController(IRepositoryWrapper repoWrapper)
        {
            _repoWrapper = repoWrapper;
        }
        [HttpGet("GetMiddlemanDetails/{MiddlemanName}")]
        public InsuranceVsMiddlemanViewModel GetMiddlemanDetails(int MiddlemanName)

        {
            return _repoWrapper.InsuranceVsMiddleman.GetMiddlemanDetails(MiddlemanName);
        }
        [HttpGet("GetInsuranceDetails")]
        public InsuranceVsMiddlemanViewModel GetInsuranceDetails()

        {
            return _repoWrapper.InsuranceVsMiddleman.GetInsuranceDetails();
        }
        [HttpPost("InsertInsuranceVsMiddleman/{MMID}/{userroleID}")]
        public dynamic InsertInsuranceVsMiddleman([FromBody]InsuranceVsMiddlemanViewModel AddInsuranceVsMiddleman,int MMID,int userroleID)
        {
            return _repoWrapper.InsuranceVsMiddleman.InsertInsuranceVsMiddleman(AddInsuranceVsMiddleman, MMID, userroleID);
        }
        [HttpPost("UpdateInsuranceVsMiddleman/{MMID}/{userroleID}")]
        public dynamic UpdateInsuranceVsMiddleman([FromBody] InsuranceVsMiddlemanViewModel InsuranceVsMiddlemanUpdate, int MMID,int userroleID)
        {
            return _repoWrapper.InsuranceVsMiddleman.UpdateInsuranceVsMiddleman(InsuranceVsMiddlemanUpdate,  MMID, userroleID);
        }
        //[HttpPost("DeleteInsuranceVsMiddleman/{IvsMID}")]
        //public dynamic DeleteInsuranceVsMiddleman([FromBody] InsuranceVsMiddlemanViewModel InsuranceVsMiddlemanDelete, int IvsMID)
        //{
        //    return _repoWrapper.InsuranceVsMiddleman.DeleteInsuranceVsMiddleman(InsuranceVsMiddlemanDelete, IvsMID);
        //}

        
    }
}