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
    public class GrnWoPoController : Controller
    {
        private IRepositoryWrapper _repoWrapper;
        public GrnWoPoController(IRepositoryWrapper repoWrapper)
        {
            _repoWrapper = repoWrapper;
        }


        [HttpGet("GetdrugDetails/{ID}")]
        public dynamic GetdrugDetails(int ID)

        {
            return _repoWrapper.GrnWoPo.GetdrugDetails(ID);
        }

        [HttpPost("UpdateGrnWoPo/{cmpid}/{TransactionId}/{Time}")]
        public dynamic UpdateGrnWoPo([FromBody] GrnWoPo GrnWoPo, int cmpid, int TransactionId, string Time)
        {
            String grs = _repoWrapper.Common.GenerateRunningCtrlNoo(TransactionId, cmpid, "GetRunningNo");
            if (grs == "Running Number Does'nt Exist")
            {
                return new
                {
                    Success = false,
                    Message = "Running Number Does'nt Exist"
                };
            }
            GrnWoPo.StockMaster.DocumentNumber = grs;
            return _repoWrapper.GrnWoPo.UpdateGrnWoPo(GrnWoPo, cmpid, TransactionId, Time);
        }

        [HttpGet("GrnWoPoprint/{RandomUniqueID}/{cmpid}/{Time}")]
        public dynamic GrnWoPoprint(string RandomUniqueID, int cmpid, string Time)
        {
            return _repoWrapper.GrnWoPo.GrnWoPoprint(RandomUniqueID, cmpid, Time);
        }

        [HttpGet("GrnWoPohis/{cmpid}/{TransactionId}/{Time}")]
        public dynamic GrnWoPohis(int cmpid, int TransactionId, string Time)
        {
            return _repoWrapper.GrnWoPo.GrnWoPohis(cmpid, TransactionId, Time);
        }

        [HttpGet("GrnWoPobatchhistory/{RandomUniqueID}/{TransactionId}")]
        public dynamic GrnWoPobatchhistory(string RandomUniqueID, int TransactionId)
        {
            return _repoWrapper.GrnWoPo.GrnWoPobatchhistory(RandomUniqueID, TransactionId);
        }

        [HttpGet("GrnWoPoserialhistory/{Pgrnno}/{TransactionId}")]
        public dynamic GrnWoPoserialhistory(string Pgrnno, int TransactionId)
        {
            return _repoWrapper.GrnWoPo.GrnWoPoserialhistory(Pgrnno, TransactionId);
        }

    }
}
