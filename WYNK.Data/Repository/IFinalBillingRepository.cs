using System;
using System.Collections.Generic;
using System.Text;
using WYNK.Data.Model.ViewModel;

namespace WYNK.Data.Repository
{
    public interface IFinalBillingRepository : IRepositoryBase<FinalBillingMaster>

    {
        
        FinalBillingMaster getRePrint(string uin, int cmpid1, string INVNO);
        FinalBillingMaster getpayment(string res, string uin, int cmpid1);
        FinalBillingMaster GetIPBillingDetails(int PAID);
        FinalBillingMaster GetIPTaxBillingDetails(int TaxID);
        
        FinalBillingMaster getbilling(string res, string uin, int cmpid1);
        dynamic Insertpayment(FinalBillingMaster payment,int cmpid, string UIN,int TransactionTypeid,int userroleID);

        dynamic InsertAdditem(FinalBillingMaster Additem, int cmpid, string UIN, int userroleID);
    }

}


