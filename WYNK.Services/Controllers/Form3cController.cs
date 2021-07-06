﻿using System;
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
    public class Form3cController : Controller
    {
        private IRepositoryWrapper _repoWrapper;
        public Form3cController(IRepositoryWrapper repoWrapper)
        {
            _repoWrapper = repoWrapper;
        }

        [HttpPost("getConsultationSummary/{FromDate}/{Todate}/{companyid}/{GMT}")]
        public dynamic getConsultationSummary([FromBody] Form3cViewModel Form3cViewModel, DateTime FromDate, DateTime Todate, int companyid, string GMT)
        {
            return _repoWrapper.form3c.getConsultationSummary(Form3cViewModel,FromDate, Todate, companyid, GMT);
        }

    }
}