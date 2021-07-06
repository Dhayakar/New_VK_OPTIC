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
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;


namespace WYNK.Services.Controllers
{
    [Route("[controller]")]
    public class IndentController : ControllerBase
    {
        private IRepositoryWrapper _repoWrapper;

        public IndentController(IRepositoryWrapper repoWrapper)
        {
            _repoWrapper = repoWrapper;
        }


        [HttpPost("Insertindent")]
        public dynamic Insertindent([FromBody] IndentViewModel Indentdata)
        {
            return _repoWrapper.Indentrepo.Insertindent(Indentdata);
        }

        [HttpPost("updateindent")]
        public dynamic updateindent([FromBody] IndentViewModel Indentdata)
        {
            return _repoWrapper.Indentrepo.updateindent(Indentdata);
        }

        

        [HttpGet("GetdrugDetails/{id}")]
        public dynamic GetdrugDetails(int id)
        {
            return _repoWrapper.Indentrepo.GetdrugDetails(id);
        }


        

    }
}