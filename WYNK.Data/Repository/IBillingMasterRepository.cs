using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using WYNK.Data.Model.ViewModel;

namespace WYNK.Data.Repository
{
    public interface IBillingMasterRepository : IRepositoryBase<BillingPharmacy>
    {
          

        dynamic CurrentDateSearch(DateTime SelectedDate,int CmpID, string Status,string GMT);
        dynamic PeriodSearch(DateTime FromDate, DateTime Todate, int CmpID,string Status, string GMT);
        dynamic GetMedicalPrescriptionIddetails(string MedicalPrescriptionId, int storeID,int CMPID);
        //  dynamic AddBillingDetailsAsync(BillingPharmacy AddBill);
        dynamic GetdrugDetails(int ID,int StoreID, int CmpID);
        dynamic GetClosedDetails(string ID,int CmpID,int TC, string GMT);
        dynamic GetPartiallyClosedDetails(string MedicalPrescriptionId, int StoreID, int CMPID);
        dynamic CheckMedPresQuantity(int Quantity, int DrugID, int StoreId);
        Task<dynamic> AddBillingDetailsAsync(BillingPharmacy AddBill);
        dynamic AddOutPatientBilling(OutPatientBillingPharmacy AddOPBill, string GMT);
        dynamic PendingPayments(PendingPayments PendingPayments, int CmpID, string GMT);


        dynamic CurrentDateSearchOPR(DateTime SelectedDate, int CmpID, string Status,int ContraTc, string GMT);
        dynamic CurrentDateSearchOPRBills(DateTime SelectedDate, int CmpID, string Status,int Tc, string GMT);
        dynamic PeriodSearchOPR(DateTime FromDate, DateTime Todate, int CmpID, string Status, int ContraTc, string GMT);
        dynamic PeriodSearchOPRs(DateTime FromDate, DateTime Todate, int CmpID, string Status, int Tc, string GMT);
        dynamic PatientNameSearch(int CmpID, string Status, int ContraTc, string GMT,string Name);
        dynamic PatientNameSearchs(int CmpID, string Status, int Tc, string GMT,string Name);
        dynamic BillNoSearch(int CmpID, string Status, int ContraTc, string GMT,string BillNo);
        dynamic BillNoSearchs(int CmpID, string Status, int Tc, string GMT,string BillNo);

        dynamic ReturningBillNoDetails(string BillNo, int CmpID, int StoreID);
        dynamic ClosedReturningBillNoDetails(string BillNo, int CmpID, int StoreID, string GMT);
        dynamic AddOutPatientBillingReturns(BillingReturns BillingReturnDetails,string GMT);

        dynamic CurrentDateSearchCreditBill(DateTime SelectedDate, int CmpID, int Tc, string GMT);
        dynamic PeriodSearchCreditBill(DateTime FromDate,DateTime ToDate, int CmpID, int Tc, string GMT);
        dynamic GetCreditItemDetails(int MedicalBillID, int CmpID, int TC, string GMT);
    }
}
