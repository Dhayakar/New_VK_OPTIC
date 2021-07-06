using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using System.Threading;
using WYNK.Data.Repository;
using WYNK.Data.Model;

namespace WYNK.Services.Controllers
{
    [Route("[controller]")]

    public class HomeController : Controller
    {
 private IRepositoryWrapper _repoWrapper;

        public HomeController(IRepositoryWrapper repoWrapper)
        {
            _repoWrapper = repoWrapper;
        }

        [HttpGet("dummy")]
        public string Dummy()
        {
            return "hi";
        }

        [HttpGet("test")]
        public async Task<object> Test()
        {
            Thread.Sleep(5000);
            return await _repoWrapper.Common.GetDropdown("Site_Master", "Site_Code", "Site_Name");
        }



        //[HttpPost("addPatient")]
        //public bool Post([FromBody] Patient patient)
        //{
        //    //var file = Request.Form.Files[0];
        //    _repoWrapper.Patient.Create(patient);
        //    return _repoWrapper.Patient.Save();
        //}

        //[HttpPost("updatePatient/{id}")]
        //public bool UpdatePatient(int id, [FromBody]Patient patient)
        //{
        //    _repoWrapper.Patient.Update(patient);
        //    return _repoWrapper.Patient.Save();
        //}

        //[HttpDelete("deletePatient/{id}")]
        //public bool DeletePatient(int id)
        //{
        //    var patient = _repoWrapper.Patient.FindByCondition(x => x.Id == id).FirstOrDefault();
        //    _repoWrapper.Patient.Delete(patient);
        //    return _repoWrapper.Patient.Save();
        //}


        [HttpPost("uploadFile")]
        public bool uploadFile()
        {
            var file = Request.Form.Files[0];
            return false;
        }
    }
}
