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

    public class CancelPORegController : Controller
    {
        private IRepositoryWrapper _repoWrapper;
        public CancelPORegController(IRepositoryWrapper repoWrapper)
        {
            _repoWrapper = repoWrapper;
        }

        [HttpGet("getC_PO_Reg/{FromDate}/{Todate}/{TID}/{CompanyID}")]
        public CancelPORegViewModel getC_PO_Reg(DateTime FromDate, DateTime Todate, int TID, int CompanyID)
        {
            return _repoWrapper.CancelPORegViewModel.getC_PO_Reg(FromDate, Todate, TID, CompanyID);
        }


    }

}