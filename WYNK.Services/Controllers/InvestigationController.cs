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
using System.Net;
using System.Web;
using System.IO;

namespace WYNK.Services.Controllers
{
    [Route("[controller]")]
    public class InvestigationController : Controller
    {
        private IRepositoryWrapper _repoWrapper;
        public InvestigationController(IRepositoryWrapper repoWrapper)
        {
            _repoWrapper = repoWrapper;
        }



        [HttpPost("uploadImag/{id}/{desc}/{uin}")]
        public bool uploadImag(string id, string desc, string uin)
        {
            var file1 = Request.Form.Files[0];
            return _repoWrapper.Investigation.uploadImag(file1, uin, desc, id);
        }


        [HttpGet("Getimage/{UIN}")]
        public dynamic Getimage(string UIN)
        {
            return _repoWrapper.Investigation.Getimage(UIN);
        }

        [HttpGet("GetInvpresDetails/{ID}")]
        public InvestigationImage GetInvpresDetails(string ID)
        {
            return _repoWrapper.Investigation.GetInvpresDetails(ID);
        }

        [HttpGet("GetInvpastDetails/{cmpid}/{UIN}")]
        public InvestigationImage GetInvpastDetails(int cmpid, string UIN)
        {
            return _repoWrapper.Investigation.GetInvpastDetails(cmpid, UIN);
        }

        [HttpGet("GetInvpresTranDetails/{ID}/{NO}")]
        public InvestigationImage GetInvpresTranDetails(string ID, int NO)
        {
            return _repoWrapper.Investigation.GetInvpresTranDetails(ID, NO);
        }

        [HttpGet("GetPatDetails/{UIN}/{cmpid}/{GMT}")]
        public InvestigationImage GetPatDetails(string UIN, int cmpid, string GMT)
        {
            return _repoWrapper.Investigation.GetPatDetails(UIN, cmpid, GMT);
        }

        [HttpGet("GetUINDetails/{cid}")]
        public InvestigationImage GetUINDetails(int cid)
        {
            return _repoWrapper.Investigation.GetUINDetails(cid);
        }


        [HttpPost("UpdateInvestigation/{UIN}/{ipid}")]
        public dynamic UpdateInvestigation([FromBody] InvestigationImage Investigation, string UIN, int ipid)
        {
            return _repoWrapper.Investigation.UpdateInvestigation(Investigation, UIN, ipid);
        }


        [HttpPost("UpdateInv/{UIN}/{IID}")]
        public dynamic UpdateInv([FromBody] InvestigationImage Investigation, string UIN, int IID)
        {
            return _repoWrapper.Investigation.UpdateInv(Investigation, UIN, IID);
        }

    }
}
