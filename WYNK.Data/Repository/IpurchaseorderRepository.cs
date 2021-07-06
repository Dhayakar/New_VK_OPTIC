using System;
using System.Collections.Generic;
using System.Text;
using WYNK.Data.Model.ViewModel;

namespace WYNK.Data.Repository
{
    public interface IpurchaseorderRepository : IRepositoryBase<purchaseorderview>
    {


        dynamic GetvenderDetails(int ID);
        dynamic Getcompantdetails(int cmpid);
        dynamic GetdrugDetails(int ID);
        dynamic Insertpurchaseorder(purchaseorderview Addpurchase, int cmpid, int TransactionId, string Time);
        dynamic Getpurchaseprint(string RandomUniqueID, int cmpid, string Time, string name, string PONumbers);
        dynamic purchasehis(int cmpid, int TransactionId, string Time);
        dynamic GetlocationDetails(int id);

    }
}

