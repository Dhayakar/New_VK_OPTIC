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
    public class BMIController : Controller
    {
        private IRepositoryWrapper _repoWrapper;

        public BMIController(IRepositoryWrapper repoWrapper)
        {
            _repoWrapper = repoWrapper;
        }

        [HttpPost("UpdateData/{ID}")]
        public dynamic UpdateData([FromBody]BMIViewM BMI, int ID)
        {
            return _repoWrapper.BIM.UpdateData(BMI, ID);
        }

        [HttpPost("InsertData")]
        public dynamic InsertData([FromBody]BMIViewM BMI)
        {
            return _repoWrapper.BIM.InsertData(BMI);
        }


    }
}