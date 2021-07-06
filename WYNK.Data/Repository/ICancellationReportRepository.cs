using System;
using System.Collections.Generic;
using System.Text;
using WYNK.Data.Model.ViewModel;


namespace WYNK.Data.Repository
{
    public interface ICancellationReportRepository : IRepositoryBase<CancellationViewM>
    {

        //dynamic getpatientcancelledDet(DateTime FromDate, DateTime Todate, int CompanyID);
        //dynamic getDoctorcancelledDet(DateTime FromDate, DateTime Todate, int CompanyID);
        //dynamic getpatientDoctorcancelledDet(DateTime FromDate, DateTime Todate, int CompanyID);

        dynamic Todaysearch(DateTime FromDate, DateTime Todate, int CompanyID,int arrvalue);






    }
}
