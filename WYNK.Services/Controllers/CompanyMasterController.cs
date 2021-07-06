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
    public class CompanyMasterController : Controller
    {

        private IRepositoryWrapper _repoWrapper;

        public CompanyMasterController(IRepositoryWrapper repoWrapper)
        {
            _repoWrapper = repoWrapper;
        }

        [HttpPost("insertdata")]
        public dynamic insertdata([FromBody]CompanyMasterView companyMaster)
        {
            return _repoWrapper.CompanyMasterView.insertdata(companyMaster);
        }


        [HttpGet("getCompanyName")]
        public CompanyMasterView getCompanyName()
        {
            return _repoWrapper.CompanyMasterView.getCompanyName();
        }


        [HttpPost("UpdateCompanyDet/{ID}")]
        public dynamic UpdateCompanyDet([FromBody] CompanyMasterView companyMaster, int ID)
        {
            return _repoWrapper.CompanyMasterView.UpdateCompanyDet(companyMaster, ID);
        }

        [HttpPost("DeleteCompanyDet/{ID}")]
        public dynamic DeleteCompanyDet(int ID)
        {
            return _repoWrapper.CompanyMasterView.DeleteCompanyDet(ID);
        }

        [HttpGet("SelectCompany")]
        public dynamic SelectCompany()
        {
            return _repoWrapper.CompanyMasterView.SelectCompany();
        }


        [HttpGet("SelectModules")]
        public dynamic SelectModules()
        {
            return _repoWrapper.CompanyMasterView.SelectModules();
        }


        [HttpGet("SelecNumberControldata")]
        public dynamic SelecNumberControldata()
        {
            return _repoWrapper.CompanyMasterView.SelecNumberControldata();
        }

    }
}