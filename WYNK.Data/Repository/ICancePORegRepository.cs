using System;
using System.Collections.Generic;
using System.Text;
using WYNK.Data.Model.ViewModel;

namespace WYNK.Data.Repository
{
    public interface ICancePORegRepository : IRepositoryBase<CancelPORegViewModel>
    {
        dynamic getC_PO_Reg(DateTime FromDate, DateTime Todate, int TID, int CompanyID);

    }
}
