
using System;
using System.Collections.Generic;
using System.Text;
using WYNK.Data.Model.ViewModel;

namespace WYNK.Data.Repository
{
    public interface IPatientQueueRepository : IRepositoryBase<PatientQueueViewModel>
    {
        //dynamic Search(DateTime Date, int CompanyID);

        //dynamic GetStockDetails2(string DrugName, DateTime Date);
        PatientQueueViewModel GetQueueDate(int CompanyID);
        PatientQueueViewModel GetNewQueueDate(int CompanyID);
        PatientQueueViewModel GetoptoquedataQueueDate(int CompanyID);
        PatientQueueViewModel Getdoctorwisedeatils(int CompanyID, string Phase, int doctorid);
        //dynamic GetStockDetails3(string DrugName, DateTime Date);
        //dynamic GetStockDetails4(string DrugName, DateTime Date);

    }
}


