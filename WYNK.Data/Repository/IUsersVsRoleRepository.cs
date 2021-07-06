using System;
using System.Collections.Generic;
using System.Text;
using WYNK.Data.Model.ViewModel;

namespace WYNK.Data.Repository
{
    public interface IUsersVsRoleRepository : IRepositoryBase<UserVsRoleViewModel>
    {
        UserVsRoleViewModel GetUsersDetails(int CmpID,int RoleID);

        dynamic InsertUserVsRole(UserVsRoleViewModel UserVsRoleInsert, int RoleID, int userroleID,int CmpID,string Dtag);

        //InsuranceVsMiddlemanViewModel GetInsuranceDetails();
        //dynamic InsertInsuranceVsMiddleman(InsuranceVsMiddlemanViewModel AddInsuranceVsMiddleman, int MMID,int userroleID);
        //dynamic UpdateInsuranceVsMiddleman(InsuranceVsMiddlemanViewModel InsuranceVsMiddlemanUpdate, int MMID,int userroleID);
        // dynamic DeleteInsuranceVsMiddleman(InsuranceVsMiddlemanViewModel InsuranceVsMiddlemanDelete, int MMID);

    }
}

