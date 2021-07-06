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
    public class InterDepartmentReceiveController : Controller
    {
        private IRepositoryWrapper _repoWrapper;
        public InterDepartmentReceiveController(IRepositoryWrapper repoWrapper)
        {
            _repoWrapper = repoWrapper;
        }

        [HttpGet("GetStoreDetails/{ID}/{IssueCode}/{cmpid}")]
        public dynamic GetStoreDetails(int ID,int IssueCode, int cmpid)
        {
            return _repoWrapper.InterDeparmentReceiver.GetStoreDetails(ID, IssueCode, cmpid);
        }



        [HttpGet("GetStockTransferDetails/{StockTransferNo}/{cmpid}")]
        public dynamic GetStockTransferDetails(string StockTransferNo, int cmpid)
        {
            return _repoWrapper.InterDeparmentReceiver.GetStockTransferDetails(StockTransferNo, cmpid);
        }


        [HttpGet("GetstoreDropdownvalues/{cmpid}")]
        public IEnumerable<Dropdown> GetstoreDropdownvalues(int cmpid)
        {
            return _repoWrapper.InterDeparmentReceiver.GetstoreDropdownvalues(cmpid);
        }

        [HttpGet("GetInterDepartmentTransferNo/{InterDepRecNo}")]
        public dynamic GetInterDepartmentTransferNo(int InterDepRecNo)
        {
            return _repoWrapper.InterDeparmentReceiver.GetInterDepartmentTransferNo(InterDepRecNo);
        }


        [HttpPost("AddReceivedStockDetails")]
        public dynamic AddReceivedStockDetails([FromBody] InterDepartmentStockDetails AddStock)
        {
            AddStock.RunningNoStock = _repoWrapper.Common.GenerateRunningCtrlNoo(AddStock.TransactionID, AddStock.cmpid, "GetRunningNo");

            if (AddStock.RunningNoStock == "Running Number Does'nt Exist")
            {
                return new
                {
                    Success = false,
                    Message = "Running Number Does'nt Exist"
                };
            }

            return _repoWrapper.InterDeparmentReceiver.AddReceivedStockDetails(AddStock);
        }

        [HttpGet("GetRecDetails/{ID}/{RecCode}/{cmpid}")]
        public dynamic GetRecDetails(int ID, int RecCode, int cmpid)
        {
            return _repoWrapper.InterDeparmentReceiver.GetRecDetails(ID, RecCode, cmpid);
        }

        [HttpGet("GetRecStockTransferDetails/{StockTransferNo}/{cmpid}/{GMT}")]
        public dynamic GetRecStockTransferDetails(string StockTransferNo, int cmpid,string GMT)
        {
            return _repoWrapper.InterDeparmentReceiver.GetRecStockTransferDetails(StockTransferNo, cmpid, GMT);
        }
    }
}
