

using System;
using System.Collections.Generic;
using System.Text;
using WYNK.Data.Model.ViewModel;

namespace WYNK.Data.Repository
{
    public interface IOneLineMasterRepository : IRepositoryBase<OneLineMasterViewModel>

    {
        dynamic InsertSlamp(OneLineMasterViewModel OneLineMaster,int userroleID);
        dynamic UdateSlamp(OneLineMasterViewModel OneLineMaster, int OLMID,int userroleID);
        dynamic DeleteSlamp(OneLineMasterViewModel OneLineMaster, int OLMID);

        OneLineMasterViewModel GetDetails(string MasterName);
    }

}


