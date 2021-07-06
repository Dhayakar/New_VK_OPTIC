using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Web;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
//using ExcelDataReader;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WYNK.Data.Model;


namespace WYNK.Services.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ExcelExampleController : ControllerBase
    {
        private CMPSContext _Cmpscontext;
        private readonly IHttpContextAccessor _httpContext;
        public ExcelExampleController(CMPSContext context, IHttpContextAccessor httpContext)
        {
            _Cmpscontext = context;
            _httpContext = httpContext;
        }
     

        [Route("UploadExcel")]
        [HttpPost]
      //  [Microsoft.AspNetCore.Mvc.HttpPost]
        public string ExcelUpload()
    {
        string message = "";
        HttpResponseMessage result = null;
             //  var httpRequest = HttpContext.Current.Request;
            // HttpContext.Current.Request;
                //IExcelDataReader reader = null;
                Stream stream = null;
               // reader = ExcelReaderFactory.CreateOpenXmlReader(stream);
                //DataSet excelRecords = reader.AsDataSet();
                //reader.Close();

               // var finalRecords = excelRecords.Tables[0];
                //for (int i = 0; i < finalRecords.Rows.Count; i++)
                //{
                //    Users objUser = new Users();
                //    objUser.Username = finalRecords.Rows[i][0].ToString();
                //    objUser.Emailid = finalRecords.Rows[i][1].ToString();
                //    objUser.Reasons = finalRecords.Rows[i][3].ToString();
                //    objUser.Password = finalRecords.Rows[i][4].ToString();
                //    objUser.Createdby = Convert.ToInt32( finalRecords.Rows[i][5].ToString());

                //    _Cmpscontext.Users.Add(objUser);

               // }

                //int output = _Cmpscontext.SaveChanges();
                //if (output > 0)
                //{
                //    message = "Excel file has been successfully uploaded";
                //}
                //else
                //{
                //    message = "Excel file uploaded has fiald";
                //}
            //if (httpRequest.Files.Count > 0)
            //{
            //    //Stream stream = httpRequest.Files[0].InputStream;

            //    //IExcelDataReader reader = null;

            //    //if (httpRequest.Files[0].FileName.EndsWith(".xls"))
            //    //{
            //    //    reader = ExcelReaderFactory.CreateBinaryReader(stream);
            //    //}
            //    //else if (httpRequest.Files[0].FileName.EndsWith(".xlsx"))
            //    //{
            //    //    reader = ExcelReaderFactory.CreateOpenXmlReader(stream);
            //    //}
            //    //else
            //    //{
            //    //    message = "This file format is not supported";
            //    //}

            //    IExcelDataReader reader = null;
            //    Stream stream = httpRequest.Files[0].InputStream;
            //    reader = ExcelReaderFactory.CreateOpenXmlReader(stream);
            //    DataSet excelRecords = reader.AsDataSet();
            //    reader.Close();

            //    var finalRecords = excelRecords.Tables[0];
            //    for (int i = 0; i < finalRecords.Rows.Count; i++)
            //    {
            //        Users objUser = new Users();
            //        objUser.Username = finalRecords.Rows[i][0].ToString();
            //        objUser.Emailid = finalRecords.Rows[i][1].ToString();
            //        objUser.Reasons = finalRecords.Rows[i][3].ToString();
            //        objUser.Password = finalRecords.Rows[i][4].ToString();
            //        objUser.Createdby = Convert.ToInt32( finalRecords.Rows[i][5].ToString());

            //        _Cmpscontext.Users.Add(objUser);

            //    }

            //    int output = _Cmpscontext.SaveChanges();
            //    if (output > 0)
            //    {
            //        message = "Excel file has been successfully uploaded";
            //    }
            //    else
            //    {
            //        message = "Excel file uploaded has fiald";
            //    }

            //}

            //else
            //{
            //    result = null;
            //}
     
        return message;
    }

    [Route("UserDetails")]
    [HttpGet]
    public List<Users> BindUser()
    {
        List<Users> lstUser = new List<Users>();
             lstUser = _Cmpscontext.Users.ToList();
        //using (AngularDBEntities objEntity = new AngularDBEntities())
        //{
        //    lstUser = objEntity.UserDetails.ToList();
        //}
            return lstUser;
    }


        public void MyMethod(Microsoft.AspNetCore.Http.HttpContext context)
        {
            var host = $"{context.Request.Scheme}://{context.Request.Host}";

            // Other code
        }
    }  
}  