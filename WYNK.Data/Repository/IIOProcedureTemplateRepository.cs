using System;
using System.Collections.Generic;
using System.Text;
using WYNK.Data.Model.ViewModel;

namespace WYNK.Data.Repository
{
    public interface IIOProcedureTemplateRepository : IRepositoryBase<IOProcedureTemplateViewModel>
    {

        dynamic Submit(IOProcedureTemplateViewModel submit, int userID, int icdspecialitycode, string SurgeryDescription);

        dynamic Update(IOProcedureTemplateViewModel submit, int userID, int icdspecialitycode, string SurgeryDescription);
        dynamic DeleteIOTemplateTRan(int userID, int ID);
        dynamic GetSurgeryDescriptions(int IcdSpecCode);
    }
}
