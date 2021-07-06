using System;
using System.Collections.Generic;
using System.Text;
using WYNK.Data.Model.ViewModel;

namespace WYNK.Data.Repository
{

    public interface IForm3cRepository : IRepositoryBase<Form3cViewModel>
    {
        dynamic getConsultationSummary(Form3cViewModel Form3cViewModel, DateTime FromDate, DateTime Todate, int companyid, string GMT);

    }
}
