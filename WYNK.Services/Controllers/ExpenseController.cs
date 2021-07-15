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
            return _repoWrapper.Expense.InsertExpenseMaster(Desc,cmpid,userid);
        }
        [HttpGet("GetExpenseMaster/{cmpid}")]
        public dynamic GetExpenseMaster(int cmpid)
        {
            return _repoWrapper.Expense.GetExpenseMaster(cmpid);
        }

    }
}