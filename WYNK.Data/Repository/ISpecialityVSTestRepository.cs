using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Text;
using WYNK.Data.Common;
using WYNK.Data.Model.ViewModel;

namespace WYNK.Data.Repository
{
    public interface ISpecialityVSTestRepository : IRepositoryBase<specialityvstest>
    {

        specialityvstest Getinvestigationvalues(int CmpID);// dynamic UpdateDiagnosis(Findings Findings);
        specialityvstest GetSelectedspecdetials(int ID, int CmpID);
        dynamic Insertspecialitydata(specialityvstest SpecialityVSTest);
        dynamic UpdateTest(specialityvstest SpecialityVSTest);

    }
}
