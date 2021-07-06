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
    public class FinalBillingController : Controller
    {
        private IRepositoryWrapper _repoWrapper;
        public FinalBillingController(IRepositoryWrapper repoWrapper)
        {
            _repoWrapper = repoWrapper;
        }

        [HttpGet("getbilling/{res}/{uin}/{cmpid1}")]
        public FinalBillingMaster getbilling(string res, string uin,int cmpid1)
        {
            return _repoWrapper.FinalBilling.getbilling(res, uin,cmpid1);
        }

        [HttpGet("getpayment/{res}/{uin}/{cmpid1}")]
        public FinalBillingMaster getpayment(string res, string uin, int cmpid1)
        {
            return _repoWrapper.FinalBilling.getpayment(res, uin, cmpid1);
        }

        [HttpGet("getRePrint/{uin}/{cmpid1}/{INVNO}")]
        public FinalBillingMaster getRePrint( string uin, int cmpid1, string INVNO)
        {
            return _repoWrapper.FinalBilling.getRePrint(uin, cmpid1, INVNO);
        }

        [HttpPost("Insertpayment/{cmpid}/{UIN}/{TransactionTypeid}/{userroleID}")]
        public dynamic InsertSurgeryMas([FromBody]FinalBillingMaster payment, int cmpid,string UIN, int TransactionTypeid,int userroleID)
        
        
        
        {
            string generatenumber = _repoWrapper.Common.GenerateRunningCtrlNoo(TransactionTypeid, cmpid, "GetRunningNo");
            if (generatenumber == "Running Number Does'nt Exist")
            {
                return new
                {
                    Success = false,
                    Message = "Running Number Does'nt Exist"
                };
            }
            payment.payment.InVoiceNumber = generatenumber;

            return _repoWrapper.FinalBilling.Insertpayment(payment, cmpid, UIN, TransactionTypeid, userroleID);
        }


        [HttpGet("GetIPBillingDetails/{PAID}")]
        public FinalBillingMaster GetIPBillingDetails(int PAID)
        {
            return _repoWrapper.FinalBilling.GetIPBillingDetails(PAID);
        }

        [HttpGet("GetIPTaxBillingDetails/{TaxID}")]
        public FinalBillingMaster GetIPTaxBillingDetails( int TaxID)
        {
            return _repoWrapper.FinalBilling.GetIPTaxBillingDetails( TaxID);
        }

        [HttpPost("InsertAdditem/{cmpid}/{UIN}/{userroleID}")]
        public dynamic InsertAdditem([FromBody] FinalBillingMaster Additem, int cmpid, string UIN, int userroleID)
        {
 
            return _repoWrapper.FinalBilling.InsertAdditem(Additem, cmpid, UIN, userroleID);
        }

    }

}



