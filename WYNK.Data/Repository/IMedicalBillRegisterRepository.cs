using System;
using System.Collections.Generic;
using System.Text;
using WYNK.Data.Model.ViewModel;



namespace WYNK.Data.Repository
{
    public interface IMedicalBillRegisterRepository : IRepositoryBase<BillingPharmacy>
    {
        dynamic getMedBillDet(DateTime FromDate, DateTime Todate, int CompanyID);

    }
}
