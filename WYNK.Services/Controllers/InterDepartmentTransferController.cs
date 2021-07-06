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
    public class InterDepartmentTransferController : Controller
    {
        private IRepositoryWrapper _repoWrapper;
        public InterDepartmentTransferController(IRepositoryWrapper repoWrapper)
        {
            _repoWrapper = repoWrapper;
        }

        [HttpGet("GetStoreDetails/{ID}")]
        public dynamic GetStoreDetails(int ID)
        {
            return _repoWrapper.InterDepartmentTransfer.GetStoreDetails(ID);
        }

        [HttpGet("GetdrugDetails/{ID}")]
        public dynamic GetdrugDetails(int ID)
        {
            return _repoWrapper.InterDepartmentTransfer.GetdrugDetails(ID);
        }

        [HttpGet("GetDrugvalues/{storeID}/{CmpId}")]
        public IEnumerable<Dropdown> GetDrugvalues(int storeID,int Cmpid)
        {
            return _repoWrapper.InterDepartmentTransfer.GetDrugvalues(storeID,Cmpid);
        }


        //[HttpGet("CheckMedPresQuantity1/{Quantity}/{DrugID}/{StoreID}")]
        //public dynamic CheckMedPresQuantity1(int Quantity, int DrugID,int StoreID)
        //{

        //    return _repoWrapper.InterDepartmentTransfer.CheckMedPresQuantity1(Quantity, DrugID, StoreID);
        //}

        [HttpPost("AddstockDetails")]
        public dynamic AddstockDetails([FromBody] SubmitTransferdetails AddTransfer)
        {
            AddTransfer.RunningNoStock = _repoWrapper.Common.GenerateRunningCtrlNoo(AddTransfer.TransactionId, AddTransfer.Cmpid, "GetRunningNo");
            if(AddTransfer.RunningNoStock == "Running Number Does'nt Exist")
            {
                return new
                {
                    Success = false,
                    Message = "Running Number Does'nt Exist"
            };
            }
            return _repoWrapper.InterDepartmentTransfer.AddstockDetails(AddTransfer);
        }


        [HttpGet("InterDepartmentTransferDetails/{transactionCode}")]
        public dynamic InterDepartmentTransferDetails(int transactionCode)
        {
            return _repoWrapper.InterDepartmentTransfer.InterDepartmentTransferDetails(transactionCode);
        }


        [HttpGet("StockTransferDetails/{StockTransferNo}/{CmpId}")]
        public dynamic StockTransferDetails(string StockTransferNo, int CmpId)
        {
            return _repoWrapper.InterDepartmentTransfer.StockTransferDetails(StockTransferNo, CmpId);
        }

    }
}
