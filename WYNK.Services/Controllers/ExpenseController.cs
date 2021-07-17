using Microsoft.AspNetCore.Mvc;
using System;
using WYNK.Data.Model.ViewModel;
using WYNK.Data.Repository;


namespace WYNK.Services.Controllers
{
    [Route("[controller]")]
    public class ExpenseController : Controller
    {
        private IRepositoryWrapper _repoWrapper;

        public ExpenseController(IRepositoryWrapper repoWrapper)
        {
            _repoWrapper = repoWrapper;
        }

        [HttpGet("InsertExpenseMaster/{Desc}/{cmpid}/{userid}")]
        public dynamic InsertExpenseMaster(string Desc, int cmpid, int userid)
        {
            return _repoWrapper.Expense.InsertExpenseMaster(Desc, cmpid, userid);
        }


        [HttpGet("DeleteExpenseMaster/{Desc}/{cmpid}/{userid}")]
        public dynamic DeleteExpenseMaster(int Desc, int cmpid, int userid)
        {
            return _repoWrapper.Expense.DeleteExpenseMaster(Desc, cmpid, userid);
        }

        [HttpGet("GetactiveExpenseMaster/{cmpid}")]
        public dynamic GetactiveExpenseMaster(int cmpid)
        {
            return _repoWrapper.Expense.GetactiveExpenseMaster(cmpid);
        }
        [HttpGet("GetExpenseMaster/{cmpid}")]
        public dynamic GetExpenseMaster(int cmpid)
        {
            return _repoWrapper.Expense.GetExpenseMaster(cmpid);
        }

        [HttpGet("UpdateExpenseMaster/{Desc}/{cmpid}/{userid}/{id}/{status}")]
        public dynamic UpdateExpenseMaster(string Desc, int cmpid, int userid, int id, string status)
        {
            return _repoWrapper.Expense.UpdateExpenseMaster(Desc, cmpid, userid, id, status);
        }

        [HttpGet("GetdatabasedonDate/{cmpid}/{date}")]
        public dynamic GetdatabasedonDate(int cmpid, string date)
        {
            return _repoWrapper.Expense.GetdatabasedonDate(cmpid, date);
        }


        

        [HttpPost("Submitexpensetrandata")]
        public dynamic Submitexpensetrandata([FromBody] ExpenseViewModel ExpenseDetails)
        {

            var cmpid = ExpenseDetails.Cmpid;
            var transactionid = ExpenseDetails.TransactionID;
            String gnr = _repoWrapper.Common.GenerateRunningCtrlNoo(transactionid, cmpid, "UpdateRunningNo");

            if (gnr == "Running Number Does'nt Exist")
            {
                return new
                {
                    Success = false,
                    Message = "Running Number Does'nt Exist"
                };
            }
            ExpenseDetails.PaymentNumber = gnr;

            return _repoWrapper.Expense.Submitexpensetrandata(ExpenseDetails);
        }

        


    }
}