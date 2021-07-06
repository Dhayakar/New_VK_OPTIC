using System;
using System.Collections.Generic;
using System.Text;
using WYNK.Data.Common;
using WYNK.Data.Model.ViewModel;

namespace WYNK.Data.Repository
{
    public interface IInterDeparmentReceiverRepository : IRepositoryBase<InterDepartmentReceiver>
    {
        dynamic GetStoreDetails(int ID,int IssueCode, int cmpid);
        dynamic GetRecDetails(int ID,int RecCode, int cmpid);
        dynamic GetStockTransferDetails(string StockTransferNo, int cmpid);
        dynamic GetRecStockTransferDetails(string StockTransferNo, int cmpid, string GMT);
        dynamic GetstoreDropdownvalues(int cmpid);
        dynamic GetInterDepartmentTransferNo(int InterDepRecNo);
        dynamic AddReceivedStockDetails(InterDepartmentStockDetails AddStock);
    }
}
