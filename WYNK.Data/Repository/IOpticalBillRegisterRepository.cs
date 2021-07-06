using System;
using System.Collections.Generic;
using System.Text;
using WYNK.Data.Model.ViewModel;

namespace WYNK.Data.Repository
{
    public interface IOpticalBillRegisterRepository : IRepositoryBase<OpticalBillRegisterViewModel>
    {
        OpticalBillRegisterViewModel getOpticalBillDet(DateTime Fromdate, DateTime Todate, int CMPID);

    }
}
