using System;
using System.Collections.Generic;
using System.Text;
using WYNK.Data.Model.ViewModel;

namespace WYNK.Data.Repository
{
    public interface IInsuranceRepository : IRepositoryBase<InsuranceViewModel>
    {
        InsuranceViewModel GetlocationDetails(int id);
        InsuranceViewModel GetPinCodeDetails(int id);
        dynamic InsertInsurance(InsuranceViewModel AddInsurance);
        dynamic UpdateInsurance(InsuranceViewModel InsuranceUpdate, int ID);
        
    }
}
