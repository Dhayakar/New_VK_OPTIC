using System;
using System.Collections.Generic;
using System.Text;
using WYNK.Data.Model.ViewModel;

namespace WYNK.Data.Repository
{
    public interface ICompanyMasterRepository : IRepositoryBase<CompanyMasterView>
    {

        dynamic insertdata(CompanyMasterView companyMaster);
        dynamic UpdateCompanyDet(CompanyMasterView companyMaster, int ID);
        dynamic DeleteCompanyDet(int ID);
        CompanyMasterView SelectCompany();
        CompanyMasterView SelectModules();
        CompanyMasterView SelecNumberControldata();


        CompanyMasterView getCompanyName();
    }
}
