
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
//using NodaTime.TimeZones;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using WYNK.Data.Model;
using WYNK.Data.Model.ViewModel;
using WYNK.Helpers;

namespace WYNK.Data.Repository.Implementation
{
    public class SetupRepository : RepositoryBase<SetupMasterViewModel>, ISetupMasterrepository
    {
        private readonly WYNKContext _Wynkcontext;
        private readonly CMPSContext _Cmpscontext;


        public SetupRepository(WYNKContext context, CMPSContext Cmpscontext) : base(context, Cmpscontext)
        {
            _Wynkcontext = context;
            _Cmpscontext = Cmpscontext;

        }



        public dynamic InsertSetupdata(SetupMasterViewModel con)
        {
            var data = new SetupMasterViewModel();
            var Countrysetup = new SetupmasterClass();

            var cmpid = CMPSContext.Setup.Where(x => x.CMPID == Convert.ToInt32(con.cmpid)).FirstOrDefault();
            try
            {
                if (cmpid == null)
                {
                    Countrysetup.CMPID = Convert.ToInt32(con.cmpid);
                    Countrysetup.RoomCutOffTime = con.roomtime;
                    Countrysetup.Country = con.country;
                    Countrysetup.Symbol = con.currency.Trim();
                    Countrysetup.CreatedUTC = DateTime.UtcNow;
                    Countrysetup.CreatedBy = 32252;
                    Countrysetup.UTCTime = con.roomtime;
                    Countrysetup.IsNotification = Convert.ToBoolean(con.nfa);      
                    CMPSContext.Setup.Add(Countrysetup);
                    CMPSContext.SaveChanges();
                }

                if (CMPSContext.SaveChanges() >= 0)

                    return new
                    {
                        Success = true,
                        Message = CommonMessage.saved,

                    };
            }
            catch (Exception e)
            {
                Console.Write(e);
            }
            return new
            {
                Success = false,
                Message = CommonMessage.Missing
            };

        }


        public dynamic Getcountrycurrency(string countryvalue)
        {
            var data = new SetupMasterViewModel();


            data.Currencycode = CMPSContext.Country.Where(x => x.ID == Convert.ToInt32(countryvalue)).Select(x => x.Currency).FirstOrDefault();

            var countryname = CMPSContext.Country.Where(x => x.ID == Convert.ToInt32(countryvalue)).Select(x => x.CountryCode).FirstOrDefault();

            data.Countrycode = countryname.Substring(0, 2).ToLower();

            return data;
        }

        public dynamic uploadImag(IFormFile file, string CompanyID)
        {

            var sss = Char.IsLetter(CompanyID, 2);
            if (sss == true)
            {
                var ccmpid = CMPSContext.Company.Where(x => x.CompanyName == CompanyID).Select(x => x.CmpID).FirstOrDefault();

                try
                {
                    var currentDir = Directory.GetCurrentDirectory();
                    if (!Directory.Exists(currentDir + "/CompanyLogo/"))
                        Directory.CreateDirectory(currentDir + "/CompanyLogo/");
                    var fileName = $"{ccmpid}{Path.GetExtension(file.FileName)}";
                    var path = $"{currentDir}/CompanyLogo/{fileName}";

                    if ((File.Exists(path)))
                        File.Delete(path);

                    using (var stream = new FileStream(path, FileMode.Create))
                    {
                        file.CopyTo(stream);
                        var id = CMPSContext.Setup.Where(x => x.CMPID == ccmpid).Select(x => x.SetupID).FirstOrDefault();
                        var pat = CMPSContext.Setup.Where(x => x.SetupID == id).FirstOrDefault();
                        pat.LogoPath = path;
                        CMPSContext.Entry(pat).State = EntityState.Modified;
                        return CMPSContext.SaveChanges() > 0;
                    }
                }
                catch (Exception)
                {
                    return false;
                }
            }
            else
            {
                try
                {
                    var currentDir = Directory.GetCurrentDirectory();
                    if (!Directory.Exists(currentDir + "/CompanyLogo/"))
                        Directory.CreateDirectory(currentDir + "/CompanyLogo/");
                    var fileName = $"{CompanyID}{Path.GetExtension(file.FileName)}";
                    var path = $"{currentDir}/CompanyLogo/{fileName}";

                    if ((File.Exists(path)))
                        File.Delete(path);

                    using (var stream = new FileStream(path, FileMode.Create))
                    {
                        file.CopyTo(stream);
                        var id = CMPSContext.Setup.Where(x => x.CMPID == Convert.ToInt32(CompanyID)).Select(x => x.SetupID).FirstOrDefault();
                        var pat = CMPSContext.Setup.Where(x => x.SetupID == id).FirstOrDefault();
                        pat.LogoPath = path;
                        CMPSContext.Entry(pat).State = EntityState.Modified;
                        return CMPSContext.SaveChanges() > 0;
                    }
                }
                catch (Exception)
                {
                    return false;
                }
            }



        }



        public dynamic getsetupdata(string Cmpid)
        {
            var data = new SetupMasterViewModel();
            var cmpdetails = CMPSContext.Company.AsNoTracking().ToList();
            var cmpid = cmpdetails.Where(x => x.CmpID == Convert.ToInt32(Cmpid)).Select(x => x.CmpID).ToList();
            var parenmtdet = CMPSContext.Company.Where(x => x.ParentID == Convert.ToInt32(Cmpid)).Select(x => x.CmpID).ToList();
            var jointdetails = parenmtdet.Concat(cmpid);
            data.SetupMasterFulldetailsS = new List<SetupMasterFulldetails>();
            var SetupMasterFulldetailsSss = (from cc in CMPSContext.Setup.Where(x => jointdetails.Contains(x.CMPID))
                                             select new
                                             {
                                                 cmp = cc.CMPID,
                                                 country = cc.Country,
                                                 roomtime = cc.UTCTime,
                                                 symbol = cc.Symbol,
                                                 nfa = cc.IsNotification,
                                             }).ToList();
            foreach (var item in SetupMasterFulldetailsSss)
            {
                var datas = new SetupMasterFulldetails();
                datas.cmp = CMPSContext.Company.Where(x => x.CmpID == item.cmp).Select(x => x.CompanyName).FirstOrDefault();
                datas.country = CMPSContext.Country.Where(x => x.ID == Convert.ToInt32(item.country)).Select(x => x.CountryName).FirstOrDefault();
                datas.nfa = Convert.ToString(item.nfa).ToLower();
                datas.Roomtime = item.roomtime;
                datas.symbol = item.symbol;    
                var regs = CMPSContext.Setup.Where(x => x.CMPID == item.cmp).Select(x => x.LogoPath).FirstOrDefault();
                if (regs != null)
                {
                    var osfn = item.cmp + ".png";
                    var osfi = "/CompanyLogo/";
                    var currentDir = Directory.GetCurrentDirectory();
                    string path = currentDir + osfi + osfn;
                    if ((File.Exists(path)))
                    {
                        string imageData = Convert.ToBase64String(File.ReadAllBytes(path));
                        string source = imageData;
                        string base64 = source.Substring(source.IndexOf(',') + 1);
                        byte[] datasss = Convert.FromBase64String(base64);
                        datas.ProductImage = imageData;
                    }
                    else
                    {

                    }


                }
                data.SetupMasterFulldetailsS.Add(datas);
            }


            return data;
        }



        public dynamic UpdateSetupdata(SetupMasterViewModel con)
        {
            var data = new SetupMasterViewModel();
            var Countrysetup = new SetupmasterClass();
            var ccmpid = con.cmpid;
            var cmpid = CMPSContext.Setup.Where(x => x.CMPID == Convert.ToInt32(ccmpid)).FirstOrDefault();
            try
            {
                cmpid.UTCTime = con.roomtime;
                cmpid.Country = con.country;
                cmpid.Symbol = con.currency.Trim();
                cmpid.UpdatedUTC = DateTime.UtcNow;
                cmpid.UpdatedBy = 32252;
                cmpid.IsNotification = Convert.ToBoolean(con.nfa);
                CMPSContext.Entry(cmpid).State = EntityState.Modified;
                CMPSContext.SaveChanges();

                if (CMPSContext.SaveChanges() >= 0)

                    return new
                    {
                        Success = true,
                        Message = CommonMessage.saved,

                    };
            }
            catch (Exception e)
            {
                Console.Write(e);
            }
            return new
            {
                Success = false,
                Message = CommonMessage.Missing
            };

        }


        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    }
}



