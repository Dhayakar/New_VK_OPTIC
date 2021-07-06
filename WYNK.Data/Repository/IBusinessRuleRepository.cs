using System;
using System.Collections.Generic;
using System.Text;
using WYNK.Data.Model.ViewModel;

namespace WYNK.Data.Repository
{
    public interface IBusinessRuleRepository : IRepositoryBase<BusinessRuleViewModel>
    {

        dynamic InsertBusinessRule(BusinessRuleViewModel BusinessRule,int CmpID, int BRID);

        BusinessRuleViewModel GetBRMDescription(int Cmpid, int Descriptionid, DateTime EFDate);
        //dynamic UpdateCompanyDet(CompanyMasterView companyMaster, int ID);
        //dynamic DeleteCompanyDet(int ID);
        //CompanyMasterView SelectCompany();
        //CompanyMasterView getCompanyName();
    }
}
