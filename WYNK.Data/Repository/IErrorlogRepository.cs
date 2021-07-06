using System;
using System.Collections.Generic;
using System.Text;
using WYNK.Data.Model.ViewModel;


namespace WYNK.Data.Repository
{
    public interface IErrorlogRepository : IRepositoryBase<ErrorLogviewmodel>
    {
        dynamic Geterrorlogfile(DateTime FromDate, DateTime Todate, string Time);
        dynamic gettotallines();
        dynamic gettotalreleases();
        dynamic gettotalreleasesbasedondate(string textname);
    }
}
