using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using WYNK.Data.Model.ViewModel;

namespace WYNK.Data.Repository
{
    public interface ICampDashboardRepository : IRepositoryBase<CampDashboardViewModel>
    {
         dynamic GetPeriodSearch(DateTime FromDate, int Cmpid);
         dynamic GetCampSearch(CampDashboardViewModel campDashboardView, int Cmpid);
         dynamic GetDoctorBreakup(CampDashboardViewModel campDashboardView, int Cmpid);
         dynamic GetPatientBreakup(CampDashboardViewModel campDashboardView, int Cmpid);
    }
}
