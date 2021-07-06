using System;
using System.Collections.Generic;
using System.Text;
using WYNK.Data.Model.ViewModel;

namespace WYNK.Data.Repository
{
    public interface IAdvancePaymentRepository : IRepositoryBase<AdvancePayment>
    {

        dynamic getADVRePrint(string UIN,int cmpid);
        dynamic getADVRePrintEdit(string ReceiptNumber);
        dynamic getADVRePrintF(string ReceiptNumber,int cmpid);
        
        dynamic AddAdvance(AdvancePayment AddBill, int CompanyID, int TransactionTypeid);
       
    }
}
