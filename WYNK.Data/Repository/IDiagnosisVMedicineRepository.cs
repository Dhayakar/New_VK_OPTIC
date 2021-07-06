using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Text;
using WYNK.Data.Common;
using WYNK.Data.Model.ViewModel;

namespace WYNK.Data.Repository
{
    public interface IDiagnosisVSMedicineRepository : IRepositoryBase<diagnosisvsmedicine>
    {

        diagnosisvsmedicine Getdruggvalues(int cmpid);//GetsubSelectedmeddetials
        diagnosisvsmedicine GetSelectedmeddetials(int id, int cmpid);
        diagnosisvsmedicine GetsubSelectedmeddetials(string id, int cmpid);
        dynamic Insertdiagmeddata(diagnosisvsmedicine DiagnosisVSMedicine);

    }
}
