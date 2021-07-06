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
    public class DrugStockSummaryController : Controller
    {
        private IRepositoryWrapper _repoWrapper;
        public DrugStockSummaryController(IRepositoryWrapper repoWrapper)
        {
            _repoWrapper = repoWrapper;
        }

        [HttpGet("GetStockSummary/{From}/{To}/{CompanyID}/{storeid}")]
        public DrugStockSummaryDataView GetStockSummary(DateTime From, DateTime To, int CompanyID, int storeid)
        {
            return _repoWrapper.DrugStockSummary.GetStockSummary( From, To, CompanyID, storeid);
        }

        [HttpGet("GetSelectedStockSummary/{From}/{To}/{CompanyID}/{BRID}/{storeid}")]
        public DrugStockSummaryDataView GetSelectedStockSummary(DateTime From, DateTime To, int CompanyID, int BRID, int storeid)
        {
            return _repoWrapper.DrugStockSummary.GetSelectedStockSummary(From, To, CompanyID, BRID, storeid);
        }

        [HttpGet("GetSerialDtls/{From}/{To}/{CompanyID}/{storeid}/{DrugID}")]
        public DrugStockSummaryDataView GetSerialDtls(DateTime From, DateTime To, int CompanyID, int storeid, int DrugID)
        {
            return _repoWrapper.DrugStockSummary.GetSerialDtls(From, To, CompanyID, storeid, DrugID);
        }

        [HttpGet("GetBatchDtls/{From}/{To}/{CompanyID}/{storeid}/{DrugID}")]
        public DrugStockSummaryDataView GetBatchDtls(DateTime From, DateTime To, int CompanyID, int storeid, int DrugID)
        {
            return _repoWrapper.DrugStockSummary.GetBatchDtls(From, To, CompanyID, storeid, DrugID);
        }

        [HttpGet("GetISerialDtls/{From}/{To}/{CompanyID}/{storeid}/{DrugID}")]
        public DrugStockSummaryDataView GetISerialDtls(DateTime From, DateTime To, int CompanyID, int storeid, int DrugID)
        {
            return _repoWrapper.DrugStockSummary.GetISerialDtls(From, To, CompanyID, storeid, DrugID);
        }

        [HttpGet("GetIBatchDtls/{From}/{To}/{CompanyID}/{storeid}/{DrugID}")]
        public DrugStockSummaryDataView GetIBatchDtls(DateTime From, DateTime To, int CompanyID, int storeid, int DrugID)
        {
            return _repoWrapper.DrugStockSummary.GetIBatchDtls(From, To, CompanyID, storeid, DrugID);
        }

        [HttpGet("GetCSerialDtls/{From}/{To}/{CompanyID}/{storeid}/{DrugID}")]
        public DrugStockSummaryDataView GetCSerialDtls(DateTime From, DateTime To, int CompanyID, int storeid, int DrugID)
        {
            return _repoWrapper.DrugStockSummary.GetCSerialDtls(From, To, CompanyID, storeid, DrugID);

        }

        [HttpGet("GetCBatchDtls/{From}/{To}/{CompanyID}/{storeid}/{DrugID}")]
        public DrugStockSummaryDataView GetCBatchDtls(DateTime From, DateTime To, int CompanyID, int storeid, int DrugID)
        {
            return _repoWrapper.DrugStockSummary.GetCBatchDtls(From, To, CompanyID, storeid, DrugID);

        }

        //////////////////////////////////ledger//////////////////////////////////////////////////////


        [HttpGet("Getdrgstockledger/{From}/{To}/{CompanyID}/{drugid}/{storeid}")]
        public DrugStockSummaryDataView Getdrgstockledger(DateTime From, DateTime To, int CompanyID, int drugid, int storeid)
        {
            return _repoWrapper.DrugStockSummary.Getdrgstockledger(From, To, CompanyID, drugid, storeid);
        }




    }
}
