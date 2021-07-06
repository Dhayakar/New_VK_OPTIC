using System;
using System.Collections.Generic;
using System.Text;
using WYNK.Data.Common;
using WYNK.Data.Model.ViewModel;

namespace WYNK.Data.Repository
{
    public interface IInterDeparmentTransferRepository : IRepositoryBase<InterDepartmentTransfer>
    {
        dynamic GetStoreDetails(int ID);
        dynamic GetdrugDetails(int ID);
        IEnumerable<Dropdown> GetDrugvalues(int storeID, int Cmpid);
       // dynamic CheckMedPresQuantity1(int Quantity, int DrugID, int StoreId);
        dynamic AddstockDetails(SubmitTransferdetails AddTransfer);
        dynamic InterDepartmentTransferDetails(int transactionCode);
        dynamic StockTransferDetails(string StockTransferNo, int CmpId);
    }
}
