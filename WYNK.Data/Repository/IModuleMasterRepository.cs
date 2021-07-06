using System;
using System.Collections.Generic;
using System.Text;
using WYNK.Data.Model.ViewModel;

namespace WYNK.Data.Repository
{
    public interface IModuleMasterRepository : IRepositoryBase<ModuleMasterViewM>
    {

        dynamic insertdata(ModuleMasterViewM moduleMaster);
        dynamic updatedata(ModuleMasterViewM moduleMaster, int ID);
        ModuleMasterViewM getParentModuleName(string CMPID,string Type);
        dynamic Getavilablemodules();
    }
}
