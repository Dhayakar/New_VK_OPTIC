using System;
using System.Collections.Generic;
using System.Text;
using WYNK.Data.Model.ViewModel;

namespace WYNK.Data.Repository
{
    public interface IOpticalStockLedgerRepository : IRepositoryBase<OpticalStockLedgerDataView>
    {
        dynamic GetStockLedger(OpticalStockLedgerDataView stockledger, DateTime From, DateTime To, int CompanyID, string Time);
    }
}
