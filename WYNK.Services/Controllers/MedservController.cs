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
    public class MedservController : Controller
    {
        private IRepositoryWrapper _repoWrapper;
        public MedservController(IRepositoryWrapper repoWrapper)
        {
            _repoWrapper = repoWrapper;
        }
        [HttpGet("getDetails/{FromDate}/{Todate}/{companyid}")]
        public Medservviewmodel getDetails(DateTime FromDate, DateTime Todate, int companyid)
        {
            return _repoWrapper.medserv.getDetails(FromDate, Todate, companyid);
        }
        [HttpGet("getDetailsIn/{FromDate}/{Todate}/{service}")]
        public Medservviewmodel getDetailsIn(DateTime FromDate, DateTime Todate,string service)
        {
            return _repoWrapper.medserv.getDetailsIn(FromDate, Todate,service);
        }

    }
}
