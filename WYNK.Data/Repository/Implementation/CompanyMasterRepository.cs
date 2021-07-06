using Microsoft.EntityFrameworkCore;
using SMSand_EMAILService.cs;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using WYNK.Data.Common;
using WYNK.Data.Model;
using WYNK.Data.Model.ViewModel;
using WYNK.Helpers;

namespace WYNK.Data.Repository.Implementation
{
    class CompanyMasterRepository : RepositoryBase<CompanyMasterView>, ICompanyMasterRepository
    {
        private readonly WYNKContext _Wynkcontext;
        private readonly CMPSContext _Cmpscontext;
        

        public CompanyMasterRepository(WYNKContext context, CMPSContext Cmpscontext) : base(context, Cmpscontext)
        {
            _Wynkcontext = context;
            _Cmpscontext = Cmpscontext;

        }

        //Where(x => x.RegistrationNumber == AddDoctor.doctorMaster.RegistrationNumber).FirstOrDefault());

        public dynamic insertdata(CompanyMasterView companyMaster)
        {
            var M_CompanyMaster = new Companymas();
            
            var Gstno = CMPSContext.Company.Where(x => x.GSTNo == companyMaster.companyMaster.GSTNo).Select(x => x.GSTNo).FirstOrDefault();
            var CMPGRoup = CMPSContext.Company.Where(x => x.CompanyName == companyMaster.companygroup).Select(x => x.CmpID).FirstOrDefault();


            if (companyMaster.companygroup != null)
            {
                M_CompanyMaster.CompanyName = companyMaster.companyMaster.CompanyName;
                M_CompanyMaster.Address1 = companyMaster.companyMaster.Address1;
                M_CompanyMaster.Address2 = companyMaster.companyMaster.Address2;
                M_CompanyMaster.Address3 = companyMaster.companyMaster.Address3;
                M_CompanyMaster.LocationName = companyMaster.companyMaster.LocationName;
                M_CompanyMaster.LocationID = companyMaster.companyMaster.LocationID;
                M_CompanyMaster.GSTNo = companyMaster.companyMaster.GSTNo;
                M_CompanyMaster.ContactPerson = companyMaster.companyMaster.ContactPerson;
                M_CompanyMaster.ParentID = CMPGRoup;
                M_CompanyMaster.Phone1 = companyMaster.companyMaster.Phone1;
                M_CompanyMaster.Phone2 = companyMaster.companyMaster.Phone2;
                M_CompanyMaster.EmailID = companyMaster.companyMaster.EmailID;
                M_CompanyMaster.URLPATH = PasswordEncodeandDecode.GetRandomnumber();
                //EmailService.EmailSend(M_CompanyMaster.EmailID, M_CompanyMaster.CompanyName, M_CompanyMaster.CompanyName,"Your Username : "+ M_CompanyMaster.EmailID +", and password : "+ M_CompanyMaster.CompanyName);

                M_CompanyMaster.Website = companyMaster.companyMaster.Website;
                M_CompanyMaster.CreatedUTC = DateTime.UtcNow;
                CMPSContext.Company.AddRange(M_CompanyMaster);
                CMPSContext.SaveChanges();
                int CID = CMPSContext.Company.OrderByDescending(x => x.CmpID).Select(x => x.CmpID).FirstOrDefault();

                var User = new Users();

                User.CMPID = CID;
                User.Usertype = "A";
                User.Username = M_CompanyMaster.EmailID;
                User.Password = PasswordEncodeandDecode.EncodePasswordToBase64(M_CompanyMaster.CompanyName);

                var referrenceid = CMPSContext.Role.Where(x => x.RoleDescription == "Admin").Select(x => x.RoleID).FirstOrDefault();

                User.ReferenceID = referrenceid;
                User.ReferenceTag = "A";
                User.Isactive = true;
                User.Createdutc = DateTime.UtcNow;
                User.Createdby = User.CMPID;
                User.Useraccess = "A";
                CMPSContext.Users.AddRange(User);
                CMPSContext.SaveChanges();
                int UID = CMPSContext.Users.OrderByDescending(x => x.Userid).Select(x => x.Userid).FirstOrDefault();

                var uservsroles = new User_Role();
                uservsroles.UserID = UID;
                uservsroles.CMPID = User.CMPID;
                uservsroles.RoleID = CMPSContext.Role.Where(x => x.RoleDescription == "Admin").Select(x => x.RoleID).FirstOrDefault();
                uservsroles.UserName = User.Username;
                uservsroles.RoleDescription = CMPSContext.Role.Where(x => x.RoleID == uservsroles.RoleID).Select(x => x.RoleDescription).FirstOrDefault();
                uservsroles.IsDeleted = false;
                uservsroles.CreatedBy = uservsroles.CMPID;
                uservsroles.CreatedUTC = DateTime.UtcNow;
                CMPSContext.UserVsRole.Add(uservsroles);
                CMPSContext.SaveChanges();
                var Numbercontroldetails = companyMaster.getNumbercontrolModules;

                if (Numbercontroldetails.Count != 0)
                {
                    foreach (var item in Numbercontroldetails)
                    {

                        var desc = CMPSContext.TransactionType.Where(x => x.Description == item.Desc).Select(x => x.TransactionID).FirstOrDefault();
                        var nm = new Number_Control();
                        nm.TransactionID = desc;
                        nm.DepartmentID = 0;
                        nm.CmpID = uservsroles.CMPID;
                        nm.Prefix = item.Prefix;
                        nm.RunningNumber = item.RunningNumber;
                        nm.Suffix = null;
                        nm.Autonumber = true;
                        nm.EffectiveFrom = DateTime.UtcNow;
                        nm.IsActive = true;
                        nm.IsDeleted = false;
                        nm.CreatedUTC = DateTime.UtcNow;
                        nm.CreatedBy = uservsroles.CMPID;
                        nm.Description = item.Desc;
                        CMPSContext.NumberControl.Add(nm);
                        CMPSContext.SaveChanges();

                    }
                }


                EmailService.EmailSend(M_CompanyMaster.EmailID, M_CompanyMaster.CompanyName, M_CompanyMaster.CompanyName, "Your Username : " + M_CompanyMaster.EmailID + ", and password : " + M_CompanyMaster.CompanyName);
            }
            else
            {
                M_CompanyMaster.CompanyName = companyMaster.companyMaster.CompanyName;
                M_CompanyMaster.Address1 = companyMaster.companyMaster.Address1;
                M_CompanyMaster.Address2 = companyMaster.companyMaster.Address2;
                M_CompanyMaster.Address3 = companyMaster.companyMaster.Address3;
                M_CompanyMaster.LocationName = companyMaster.companyMaster.LocationName;
                M_CompanyMaster.LocationID = companyMaster.companyMaster.LocationID;
                M_CompanyMaster.GSTNo = companyMaster.companyMaster.GSTNo;
                M_CompanyMaster.ContactPerson = companyMaster.companyMaster.ContactPerson;
                M_CompanyMaster.ParentID = companyMaster.companyMaster.ParentID;
                M_CompanyMaster.Phone1 = companyMaster.companyMaster.Phone1;
                M_CompanyMaster.Phone2 = companyMaster.companyMaster.Phone2;
                M_CompanyMaster.EmailID = companyMaster.companyMaster.EmailID;
                M_CompanyMaster.Website = companyMaster.companyMaster.Website;
                M_CompanyMaster.CreatedUTC = DateTime.UtcNow;
                CMPSContext.Company.AddRange(M_CompanyMaster);
                CMPSContext.SaveChanges();
                int CID = CMPSContext.Company.OrderByDescending(x => x.CmpID).Select(x => x.CmpID).FirstOrDefault();

                var User = new Users();

                User.CMPID = CID;
                User.Usertype = "A";
                User.Username = M_CompanyMaster.EmailID;
                User.Password = PasswordEncodeandDecode.EncodePasswordToBase64(M_CompanyMaster.CompanyName);
                var RoleID = CMPSContext.Role.Where(x => x.RoleDescription == "Admin").Select(x => x.RoleID).FirstOrDefault();
                User.ReferenceID = RoleID;
                User.ReferenceTag = "A";
                User.Isactive = true;
                User.Createdutc = DateTime.UtcNow;
                User.Createdby = User.CMPID;
                User.Useraccess = "A";
                CMPSContext.Users.AddRange(User);
                CMPSContext.SaveChanges();
                int UID = CMPSContext.Users.OrderByDescending(x => x.Userid).Select(x => x.Userid).FirstOrDefault();

                var uservsroles = new User_Role();
                uservsroles.UserID = UID;
                uservsroles.CMPID = User.CMPID;
                uservsroles.RoleID = CMPSContext.Role.Where(x => x.RoleDescription == "Admin").Select(x => x.RoleID).FirstOrDefault();
                uservsroles.UserName = User.Username;
                uservsroles.RoleDescription = CMPSContext.Role.Where(x => x.RoleID == uservsroles.RoleID).Select(x => x.RoleDescription).FirstOrDefault();
                uservsroles.IsDeleted = false;
                uservsroles.CreatedBy = uservsroles.CMPID;
                uservsroles.CreatedUTC = DateTime.UtcNow;
                CMPSContext.UserVsRole.Add(uservsroles);
                CMPSContext.SaveChanges();

                var Numbercontroldetails = companyMaster.getNumbercontrolModules;

                if (Numbercontroldetails.Count != 0)
                {
                    foreach (var item in Numbercontroldetails)
                    {

                        var desc = CMPSContext.TransactionType.Where(x => x.Description == item.Desc).Select(x => x.TransactionID).FirstOrDefault();
                        var nm = new Number_Control();
                        nm.TransactionID = desc;
                        nm.DepartmentID = 0;
                        nm.CmpID = uservsroles.CMPID;
                        nm.Prefix = item.Prefix;
                        nm.RunningNumber = item.RunningNumber;
                        nm.Suffix = null;
                        nm.Autonumber = true;
                        nm.EffectiveFrom = DateTime.UtcNow;
                        nm.IsActive = true;
                        nm.IsDeleted = false;
                        nm.CreatedUTC = DateTime.UtcNow;
                        nm.CreatedBy = uservsroles.CMPID;
                        nm.Description = item.Desc;
                        CMPSContext.NumberControl.Add(nm);
                        CMPSContext.SaveChanges();

                    }
                }



                string[] Squintarray = { "ocularmovement", "vfindings", "anglekappa", "acamethod", "acavalue",
                                  "wfdt", "Stereopsis method", "Stereopsis value", "ARC", "PBCTMK",
                                  "Amplitude", "Frequency", "Type", "Pursuit", "Saccade", 
  "Abnormal Head position","Frequency on Convergence", "Occulusion of One eye", "Oscillopsia","Patterns of squint"

                };
              
                    for (var i = 0; i < Squintarray.Length; i++)
                    {
                        var SquintExM = new Squint_ExtnMaster();
                        SquintExM.ParentDescription = Squintarray[i];
                        SquintExM.ParentID = 0;
                        SquintExM.ParentTag = "0";
                        SquintExM.CreatedBy = UID;
                        SquintExM.CreatedUTC = DateTime.UtcNow;
                        SquintExM.IsActive = true;
                        SquintExM.IsDeleted = false;
                        SquintExM.CmpID = CID;
                        WYNKContext.SquintExtnMaster.Add(SquintExM);
                        WYNKContext.SaveChanges();
                    }
                EmailService.EmailSend(M_CompanyMaster.EmailID, M_CompanyMaster.CompanyName, M_CompanyMaster.CompanyName, "Your Username : " + M_CompanyMaster.EmailID + ", and password : " + M_CompanyMaster.CompanyName);
            }



            try
            {
                if (CMPSContext.SaveChanges() >= 0)
                    return new
                    {
                        Success = true,
                        Message = CommonRepository.saved

                    };
            }
            catch (Exception ex)
            {
                Console.Write(ex);
            }
            return new
            {
                Success = false,
                Message = CommonRepository.Missing

            };


        }


        public CompanyMasterView GetlocationDetails(int id)
        {

            var locDetails = new CompanyMasterView();

            var v = CMPSContext.LocationMaster.Where(x => x.ID == id).Select(x => x.ParentDescription).FirstOrDefault();
            var stateid = CMPSContext.LocationMaster.Where(x => x.ParentDescription == v).Select(x => x.ParentID).FirstOrDefault();
            //locDetails.ParentDescriptionstate = CMPSContext.LocationMaster.Where(x => x.ID == stateid).Select(x => x.ParentDescription).FirstOrDefault();


            //var countryid = CMPSContext.LocationMaster.Where(x => x.ParentDescription == locDetails.ParentDescriptionstate).Select(x => x.ParentID).FirstOrDefault();
            //locDetails.ParentDescriptioncountry = CMPSContext.LocationMaster.Where(x => x.ID == countryid).Select(x => x.ParentDescription).FirstOrDefault();
            var ParentDescriptionstate = CMPSContext.LocationMaster.Where(x => x.ID == stateid).Select(x => x.ParentDescription).FirstOrDefault();
            var countryid = CMPSContext.LocationMaster.Where(x => x.ParentDescription == ParentDescriptionstate).Select(x => x.ParentID).FirstOrDefault();
            var ParentDescriptioncountry = CMPSContext.LocationMaster.Where(x => x.ID == countryid).Select(x => x.ParentDescription).FirstOrDefault();


            return locDetails;

        }

        public CompanyMasterView getCompanyName()
        {
            var getData = new CompanyMasterView();

            getData.getCompName = (from details in CMPSContext.Company.Where(x => x.IsDeleted == false)

                                   select new getCompName
                                   {
                                       companyName = details.CompanyName,
                                       CmpID = details.CmpID,
                                       ParentID = details.ParentID,
                                       Location = details.Address1,
                                   }).ToList();


            //  bool M_Del = false;

            getData.getCompDetails = (from Det in CMPSContext.Company.Where(x => x.IsDeleted == false)


                                      select new getCompDetails
                                      {
                                          CmpID = Det.CmpID,
                                          CompanyName = Det.CompanyName,
                                          Address1 = Det.Address1,
                                          Address2 = Det.Address2,
                                          Address3 = Det.Address3,
                                          LocationName = Det.LocationName,
                                          LocationID = Det.LocationID,
                                          ContactPerson = Det.ContactPerson,
                                          GSTNo = Det.GSTNo,
                                          ParentID = Det.ParentID,
                                          Phone1 = Det.Phone1,
                                          Phone2 = Det.Phone2,
                                          EmailID = Det.EmailID,
                                          Website = Det.Website,
                                          CompanyGroup = getData.getCompName.Where(x => x.CmpID == Det.ParentID).Select(x => x.companyName).FirstOrDefault()
                                          //CompanyGroup = getData.getCompDetails.Where(X=> X.CmpID == X.ParentID).Select(x=> x.CompanyName).FirstOrDefault()
                                          // CompanyGroup = CMPSContext.Company.Where(x => x.ParentID == Det.CmpID ).Select(x => x.CompanyName).FirstOrDefault()


                                      }).ToList();



            return getData;
        }


        public dynamic UpdateCompanyDet(CompanyMasterView companyMaster, int ID)
        {
            var M_CompanyMaster = new Companymas();

            M_CompanyMaster = CMPSContext.Company.Where(x => x.CmpID == ID).FirstOrDefault();
            var emailid = CMPSContext.Company.Where(x => x.CmpID == ID).Select(x => x.EmailID).FirstOrDefault();


            M_CompanyMaster.CompanyName = companyMaster.companyMaster.CompanyName;
            M_CompanyMaster.Address1 = companyMaster.companyMaster.Address1;
            M_CompanyMaster.Address2 = companyMaster.companyMaster.Address2;
            M_CompanyMaster.Address3 = companyMaster.companyMaster.Address3;
            M_CompanyMaster.LocationName = companyMaster.companyMaster.LocationName;
            M_CompanyMaster.LocationID = companyMaster.companyMaster.LocationID;
            M_CompanyMaster.GSTNo = companyMaster.companyMaster.GSTNo;
            M_CompanyMaster.ContactPerson = companyMaster.companyMaster.ContactPerson;
            if (companyMaster.companyMaster.ParentID != 0)
            {
                M_CompanyMaster.ParentID = companyMaster.companyMaster.ParentID;
            }

            M_CompanyMaster.Phone1 = companyMaster.companyMaster.Phone1;
            M_CompanyMaster.Phone2 = companyMaster.companyMaster.Phone2;
            M_CompanyMaster.EmailID = companyMaster.companyMaster.EmailID;
            M_CompanyMaster.Website = companyMaster.companyMaster.Website;
            M_CompanyMaster.UpdatedUTC = DateTime.UtcNow;
            CMPSContext.Company.UpdateRange(M_CompanyMaster);


            if (companyMaster.companyMaster.EmailID != emailid)
            {
                var users = new Users();
                users = CMPSContext.Users.Where(x => x.Username == emailid).FirstOrDefault();
                users.Emailid = companyMaster.companyMaster.EmailID;
                users.Username = companyMaster.companyMaster.EmailID;
                users.Password = PasswordEncodeandDecode.EncodePasswordToBase64(companyMaster.companyMaster.CompanyName);
                users.Updatedutc = DateTime.UtcNow;
                CMPSContext.Users.UpdateRange(users);

            }
            CMPSContext.SaveChanges();



            try
            {
                if (CMPSContext.SaveChanges() >= 0)
                    return new
                    {
                        Success = true,
                        Message = "Updated successfully",

                    };
            }
            catch (Exception ex)
            {
                Console.Write(ex);
                Log(ex.Message);
            }
            return new
            {
                Success = false,
                Message = "Some data are Missing"
            };
        }

        public static void Log(string logInfo)
        {
            File.AppendAllText("CompanyLogger.txt", logInfo);

        }
        public dynamic DeleteCompanyDet(int ID)
        {
            var M_Company = CMPSContext.Company.Where(x => x.ParentID == ID && x.IsDeleted == false).ToList();
            var ids = CMPSContext.Company.Where(x => x.CmpID == ID).ToList();


            if (M_Company.Count == 0)

            {
                ids.All(x => { x.IsDeleted = true; return true; });
                CMPSContext.Company.UpdateRange(ids);


            }

            else
            {

                return new
                {
                    Success = false,
                    Message = "Already this is parent company"
                };


            }



            try
            {
                if (CMPSContext.SaveChanges() >= 0)
                    return new
                    {
                        Success = true,
                        Message = "Delete successfully"
                    };
            }
            catch (Exception ex)
            {
                Console.Write(ex);
            }
            return new
            {
                Success = false,
                Message = "Some data are Missing"
            };
        }

        public CompanyMasterView SelectCompany()
        {
            var getData = new CompanyMasterView();

            getData.company = CMPSContext.Company.Select(x => x.CompanyName).FirstOrDefault();

            return getData;

        }

        public CompanyMasterView SelectModules()
        {
            var getData = new CompanyMasterView();
            // getData.MMT = new ModuleMasterTemplate();
            getData.getCompModuless = new List<getCompModuless>();
            getData.MMT = (from mm in CMPSContext.ModuleMasterTemplate
                           select new getCompModules
                           {
                               ModuleD = mm.ModuleID,
                               ModuleName = mm.ModuleDescription,
                           }).ToList();




            return getData;

        }
        public CompanyMasterView SelecNumberControldata()
        {
            var getData = new CompanyMasterView();
            getData.getNumbercontrolModules = new List<getNumbercontrolModules>();

            var Numbercountdata = CMPSContext.NumberControl.ToList();

            if (Numbercountdata.Count() > 1)
            {

                getData.getNumbercontrolModules = (from mm in CMPSContext.NumberControl.Where(x => x.IsActive == true && x.CmpID == 1062)
                                                   select new getNumbercontrolModules
                                                   {
                                                       Desc = mm.Description,
                                                       Prefix = mm.Description.Substring(0, 2),
                                                       Suffix = "Clinic",
                                                       RunningNumber = 0,
                                                   }).ToList();

            }

            return getData;

        }

        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    }
}
