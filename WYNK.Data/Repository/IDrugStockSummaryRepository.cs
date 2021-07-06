using System;
using System.Collections.Generic;
using System.Text;
using WYNK.Data.Model.ViewModel;

namespace WYNK.Data.Repository
{
    public interface IDrugStockSummaryRepository : IRepositoryBase<DrugStockSummaryDataView>
    {
        DrugStockSummaryDataView GetStockSummary(DateTime From, DateTime To, int CompanyID, int storeid);//Getdrgstockledger
        DrugStockSummaryDataView Getdrgstockledger(DateTime From, DateTime To, int CompanyID, int drugid, int storeid);
        DrugStockSummaryDataView GetSelectedStockSummary(DateTime From, DateTime To, int CompanyID, int BRID, int storeid);
        DrugStockSummaryDataView GetSerialDtls(DateTime From, DateTime To, int CompanyID, int storeid, int DrugID);
        DrugStockSummaryDataView GetBatchDtls(DateTime From, DateTime To, int CompanyID, int storeid, int DrugID);
        DrugStockSummaryDataView GetISerialDtls(DateTime From, DateTime To, int CompanyID, int storeid, int DrugID);
        DrugStockSummaryDataView GetIBatchDtls(DateTime From, DateTime To, int CompanyID, int storeid, int DrugID);
        DrugStockSummaryDataView GetCSerialDtls(DateTime From, DateTime To, int CompanyID, int storeid, int DrugID);
        DrugStockSummaryDataView GetCBatchDtls(DateTime From, DateTime To, int CompanyID, int storeid, int DrugID);
    }
}
