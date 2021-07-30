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
    public class BrandMasterController : Controller
    {
        private IRepositoryWrapper _repoWrapper;
        public BrandMasterController(IRepositoryWrapper repoWrapper)
        {
            _repoWrapper = repoWrapper;
        }


        [HttpPost("Insertbrand/{cmpid}")]
        public dynamic Insertbrand([FromBody] BrandView Addbrand, int cmpid)
        {
            return _repoWrapper.BrandMaster.Insertbrand(Addbrand, cmpid);

        }

        [HttpGet("Fullbrandlist/{cmpid}")]
        public dynamic Fullbrandlist(int cmpid)
        {
            return _repoWrapper.BrandMaster.Fullbrandlist(cmpid);
        }


        [HttpPost("updatebrand/{cmpid}/{ID}")]
        public dynamic updatebrand([FromBody] BrandView Upbrand, int cmpid, int ID)
        {
            return _repoWrapper.BrandMaster.updatebrand(Upbrand, cmpid, ID);
        }

        [HttpPost("Deletebrand/{ID}")]
        public dynamic Deletebrand(int ID)
        {
            return _repoWrapper.BrandMaster.Deletebrand(ID);
        }







    }
}