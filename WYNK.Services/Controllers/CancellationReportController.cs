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
    public class CancellationReportController : Controller
    {
        private IRepositoryWrapper _repoWrapper;

        public CancellationReportController(IRepositoryWrapper repoWrapper)
        {
            _repoWrapper = repoWrapper;
        }

        //[HttpGet("getpatientcancelledDet/{FromDate}/{Todate}/{CompanyID}")]
        //public CancellationViewM getpatientcancelledDet(DateTime FromDate, DateTime Todate, int CompanyID)
        //{
        //    return _repoWrapper.CancellationViewM.getpatientcancelledDet(FromDate, Todate, CompanyID);
        //}
        // [HttpGet("getDoctorcancelledDet/{FromDate}/{Todate}/{CompanyID}")]
        //public CancellationViewM getDoctorcancelledDet(DateTime FromDate, DateTime Todate, int CompanyID)
        //{
        //    return _repoWrapper.CancellationViewM.getDoctorcancelledDet(FromDate, Todate, CompanyID);
        //}
        //  [HttpGet("getpatientDoctorcancelledDet/{FromDate}/{Todate}/{CompanyID}")]
        //public CancellationViewM getpatientDoctorcancelledDet(DateTime FromDate, DateTime Todate, int CompanyID)
        //{
        //    return _repoWrapper.CancellationViewM.getpatientDoctorcancelledDet(FromDate, Todate, CompanyID);
        //}

        [HttpGet("Todaysearch/{FromDate}/{Todate}/{CompanyID}/{arrvalue}")]
        public dynamic Todaysearch(DateTime FromDate, DateTime Todate, int CompanyID,int arrvalue)
        {
            return _repoWrapper.CancellationViewM.Todaysearch(FromDate, Todate, CompanyID, arrvalue);
        }



    }
}