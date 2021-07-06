using System;
using System.Collections.Generic;
using System.Text;
using WYNK.Data.Model.ViewModel;

namespace WYNK.Data.Repository
{
    public interface IGstTaxSummaryRepository : IRepositoryBase<GstTaxSummaryViewM>
    {

        GstTaxSummaryViewM getTaxSummary(DateTime Date, int CompanyID);
    }
}
