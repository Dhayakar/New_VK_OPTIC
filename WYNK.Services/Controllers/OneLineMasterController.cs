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
    public class OneLineMasterController : Controller
    {
        private IRepositoryWrapper _repoWrapper;
        public OneLineMasterController(IRepositoryWrapper repoWrapper)
        {
            _repoWrapper = repoWrapper;
        }

        [HttpPost("InsertSlamp/{userroleID}")]
        public dynamic InsertSlamp([FromBody] OneLineMasterViewModel OneLineMaster,int userroleID)
        {
            return _repoWrapper.OneLineMaster.InsertSlamp(OneLineMaster, userroleID);
        }
        [HttpPost("UdateSlamp/{OLMID}/{userroleID}")]
        public dynamic UdateSlamp([FromBody] OneLineMasterViewModel OneLineMaster, int OLMID,int userroleID)
        {
            return _repoWrapper.OneLineMaster.UdateSlamp(OneLineMaster, OLMID, userroleID);
        }
        [HttpPost("DeleteSlamp/{OLMID}")]
        public dynamic DeleteSlamp([FromBody] OneLineMasterViewModel OneLineMaster, int OLMID)
        {
            return _repoWrapper.OneLineMaster.DeleteSlamp(OneLineMaster, OLMID);
        }
        [HttpGet("GetDetails/{MasterName}")]
        public OneLineMasterViewModel GetDetails(string MasterName)
        {
            return _repoWrapper.OneLineMaster.GetDetails(MasterName);
        }

    }

}



