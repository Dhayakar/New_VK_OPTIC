using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using System.Threading;
using WYNK.Data.Repository;
using WYNK.Data.Common;
using WYNK.Data.Model.ViewModel;

namespace WYNK.Services.Controllers
{
    [Route("[controller]")]
    public class IOProcedureTemplateController : Controller
    {
        private IRepositoryWrapper _repoWrapper;
        public IOProcedureTemplateController(IRepositoryWrapper repoWrapper)
        {
            _repoWrapper = repoWrapper;
        }
        
        [HttpPost("Submit/{userID}/{icdspecialitycode}/{SurgeryDescription}")]
        public dynamic Submit([FromBody] IOProcedureTemplateViewModel submit,int userID, int icdspecialitycode, string SurgeryDescription)
        {
          return _repoWrapper.IOProcedureTemplate.Submit(submit, userID, icdspecialitycode, SurgeryDescription);
        }


        [HttpPost("Update/{userID}/{icdspecialitycode}/{SurgeryDescription}")]
        public dynamic Update([FromBody] IOProcedureTemplateViewModel submit, int userID, int icdspecialitycode, string SurgeryDescription )
        {
            return _repoWrapper.IOProcedureTemplate.Update(submit, userID, icdspecialitycode, SurgeryDescription);
        }

        [HttpGet("DeleteIOTemplateTRan/{userID}/{ID}")]
        public dynamic DeleteIOTemplateTRan(int userID, int ID)
        {
            return _repoWrapper.IOProcedureTemplate.DeleteIOTemplateTRan(userID, ID);
        }

        [HttpGet("GetSurgeryDescriptions/{IcdSpecCode}")]
        public dynamic GetSurgeryDescriptions(int IcdSpecCode)
        {
            return _repoWrapper.IOProcedureTemplate.GetSurgeryDescriptions(IcdSpecCode);
        }

    }
}
