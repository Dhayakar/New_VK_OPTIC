using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using WYNK.Data.Model;
using WYNK.Data.Model.ViewModel;
using System.Security.Cryptography;
using WYNK.Helpers;
using System.Globalization;

namespace WYNK.Data.Repository.Implementation
{
    class UserRepository : RepositoryBase<User>, IUserRepository
    {
        private readonly WYNKContext _Wynkcontext;
        private readonly CMPSContext _Cmpscontext;
       

        public UserRepository(WYNKContext context, CMPSContext Cmpscontext) : base(context, Cmpscontext)
        {
            _Wynkcontext = context;
            _Cmpscontext = Cmpscontext;

        }


        public dynamic GetWorkflodata(string res1)
        {
            var AccessWorkflodata = new ModuleMaster();

            AccessWorkflodata.Parentmoduledescription = CMPSContext.ModuleMaster.Where(x => x.ModuleDescription == res1 && x.Parentmoduledescription != null)
                .Select(x => x.Parentmoduledescription).FirstOrDefault();

            return AccessWorkflodata;

        }


        public dynamic GetModuletransactiondetails(string ModuleDescription, int CompanyID)
        {
            var AccessPrivilegesDetailss = new Rolevsaccesscontrol();

            var moduledesc = CMPSContext.ModuleMaster.Where(x => x.Parentmoduledescription == ModuleDescription).Select(x => x.ModuleDescription).FirstOrDefault();
            AccessPrivilegesDetailss.transactionid = CMPSContext.NumberControl.Where(x => x.Description == moduledesc).Select(x => x.TransactionID).FirstOrDefault();
            AccessPrivilegesDetailss.RecPayContra = CMPSContext.TransactionType.Where(x => x.TransactionID == AccessPrivilegesDetailss.transactionid).Select(x => x.RecPayContra).FirstOrDefault();

            return AccessPrivilegesDetailss;

        }

        public dynamic GetModuletransactiondetailsstring(string ModuleDescription, string suffix, int CompanyID)
        {
            var AccessPrivilegesDetailss = new Rolevsaccesscontrol();

            var dd = ModuleDescription + '/' + suffix;

            var moduledesc = CMPSContext.ModuleMaster.Where(x => x.Parentmoduledescription == dd).Select(x => x.ModuleDescription).FirstOrDefault();
            AccessPrivilegesDetailss.transactionid = CMPSContext.NumberControl.Where(x => x.Description == moduledesc).Select(x => x.TransactionID).FirstOrDefault();
            AccessPrivilegesDetailss.RecPayContra = CMPSContext.TransactionType.Where(x => x.TransactionID == AccessPrivilegesDetailss.transactionid).Select(x => x.RecPayContra).FirstOrDefault();

            return AccessPrivilegesDetailss;

        }

        public dynamic Getconsulttranid(string ModuleDescription, int CompanyID)
        {
            var AccessPrivilegesDetailss = new Rolevsaccesscontrol();


            AccessPrivilegesDetailss.transactionid = CMPSContext.NumberControl.Where(x => x.Description == ModuleDescription && x.CmpID == CompanyID).Select(x => x.TransactionID).FirstOrDefault();

            return AccessPrivilegesDetailss;

        }



        public dynamic GetRoledetails(string roletext, int CompanyID)
        {
            var user = new Users();
            var AccessPrivilegesDetailss = new Rolevsaccesscontrol();

            if (roletext == "Doctor")
            {
                var roleIID = CMPSContext.Role.Where(x => x.RoleDescription == "Doctor").Select(x => x.RoleID).FirstOrDefault();

                var res = (from cm in CMPSContext.Users.Where(x => x.ReferenceID == roleIID)
                           join qw in CMPSContext.DoctorMaster on cm.Username equals qw.EmailID
                           select qw.DoctorID).ToList();

                AccessPrivilegesDetailss.AccessNames = (from Dm in CMPSContext.DoctorMaster.Where(x => x.CMPID == Convert.ToInt32(CompanyID)
                                                        && x.IsActive == true && x.RoleID == roleIID && x.RegistrationNumber !=null)
                                                      //  where !res.Contains(Dm.DoctorID)
                                                        select new AccessNames
                                                        {
                                                            Roleids = Dm.DoctorID,
                                                            Roledescriptions = Dm.Firstname+Dm.MiddleName+Dm.LastName,
                                                        }).ToList();

            }
            else if (roletext == "Employee")
            {
                var roleIID = CMPSContext.Role.Where(x => x.RoleDescription == "Employee").Select(x => x.RoleID).FirstOrDefault();
                var res = (from cm in CMPSContext.Users.Where(x => x.ReferenceID == roleIID)
                           join qw in CMPSContext.EmployeeCommunication on cm.Username equals qw.EmailID
                           select qw.EmpID).ToList();

                AccessPrivilegesDetailss.AccessNames = (from ee in CMPSContext.EmployeeCommunication
                                                        join Dm in CMPSContext.Employee.Where(x => x.CMPID == Convert.ToInt32(CompanyID)
                                                        && x.IsActive == true) on ee.EmpID equals Dm.EmployeeID
                                                       // where !res.Contains(Dm.EmployeeID)
                                                        select new AccessNames
                                                        {
                                                            Roleids = Dm.EmployeeID,
                                                            Roledescriptions = Dm.FirstName + Dm.MiddleName + Dm.LastName,
                                                        }).ToList();
                //AccessPrivilegesDetailss.AccessNames = (from ee in CMPSContext.EmployeeCommunication
                //                                        join Dm in CMPSContext.Employee.Where(x => x.CMPID == Convert.ToInt32(CompanyID)
                //                                        && x.IsActive == true) on ee.EmpID equals Dm.EmployeeID
                //                                        select new AccessNames
                //                                        {
                //                                            Roleids = Dm.EmployeeID,
                //                                            Roledescriptions = Dm.FirstName,
                //                                        }).ToList();

            }
            //else if (roletext == "Nurse")
            //{
            //    AccessPrivilegesDetailss.AccessNames = (from us in CMPSContext.Users.Where(x => x.ReferenceTag == "N"
            //                                        && x.CMPID == Convert.ToInt32(CompanyID) && x.Isactive == true)
            //                                            select new AccessNames
            //                                            {
            //                                                Roleids = us.Userid,
            //                                                Roledescriptions = us.Username,
            //                                            }).ToList();
            //}
            //else if (roletext == "Chief Nurse")
            //{
            //    AccessPrivilegesDetailss.AccessNames = (from us in CMPSContext.Users.Where(x => x.ReferenceTag == "CN"
            //                                        && x.CMPID == Convert.ToInt32(CompanyID) && x.Isactive == true)
            //                                            select new AccessNames
            //                                            {
            //                                                Roleids = us.Userid,
            //                                                Roledescriptions = us.Username,
            //                                            }).ToList();
            //}
            //else if (roletext == "Reception")
            //{
            //    AccessPrivilegesDetailss.AccessNames = (from us in CMPSContext.Users.Where(x => x.ReferenceTag == "R"
            //                                                       && x.CMPID == Convert.ToInt32(CompanyID) && x.Isactive == true)
            //                                            select new AccessNames
            //                                            {
            //                                                Roleids = us.Userid,
            //                                                Roledescriptions = us.Username,
            //                                            }).ToList();
            //}
            else if (roletext == "Optometrist")
            {
                var roleIID = CMPSContext.Role.Where(x => x.RoleDescription == "Optometrist").Select(x => x.RoleID).FirstOrDefault();

                var res = (from cm in CMPSContext.Users.Where(x => x.ReferenceID == roleIID)
                           join qw in CMPSContext.DoctorMaster on cm.Username equals qw.EmailID
                           select qw.DoctorID).ToList();

                AccessPrivilegesDetailss.AccessNames = (from Dm in CMPSContext.DoctorMaster.Where(x => x.CMPID == Convert.ToInt32(CompanyID)
                                                        && x.IsActive == true && x.RoleID == roleIID)
                                                       // where !res.Contains(Dm.DoctorID)

                                                        select new AccessNames
                                                        {
                                                            Roleids = Dm.DoctorID,
                                                            Roledescriptions = Dm.Firstname + Dm.MiddleName + Dm.LastName,
                                                        }).ToList();
            }
            else if (roletext == "Vision")
            {
                var roleIID = CMPSContext.Role.Where(x => x.RoleDescription == "Vision").Select(x => x.RoleID).FirstOrDefault();

                var res = (from cm in CMPSContext.Users.Where(x => x.ReferenceID == roleIID)
                           join qw in CMPSContext.DoctorMaster on cm.Username equals qw.EmailID
                           select qw.DoctorID).ToList();

                AccessPrivilegesDetailss.AccessNames = (from Dm in CMPSContext.DoctorMaster.Where(x => x.CMPID == Convert.ToInt32(CompanyID)
                                                        && x.IsActive == true && x.RoleID == roleIID)
                                                       // where !res.Contains(Dm.DoctorID)

                                                        select new AccessNames
                                                        {
                                                            Roleids = Dm.DoctorID,
                                                            Roledescriptions = Dm.Firstname + Dm.MiddleName + Dm.LastName,
                                                        }).ToList();
            }
            var doctorslist = CMPSContext.Users.Where(x => x.ReferenceTag == "D").ToList();



            return AccessPrivilegesDetailss;
        }


        public dynamic Postinternaluserdetails(User AddEmp)
        {

            var users = new User_Master();

            using (var dbContextTransaction = CMPSContext.Database.BeginTransaction())
            {

                try
                {
                    if (AddEmp.Inetrnaluserdetails.Baserole == "Doctor")
                    {
                        var emaildid = CMPSContext.DoctorMaster.Where(x => x.DoctorID == Convert.ToInt32(AddEmp.Inetrnaluserdetails.Userrole)
                       && x.CMPID == Convert.ToInt32(AddEmp.Inetrnaluserdetails.companyid)).Select(x => x.EmailID).FirstOrDefault();


                        if (emaildid != null)
                        {
                            var user = new Users();
                            user.Usertype = "D";
                            user.CMPID = Convert.ToInt32(AddEmp.Inetrnaluserdetails.companyid);
                            user.ReferenceID = CMPSContext.Role.Where(x => x.RoleDescription == "Doctor").Select(x => x.RoleID).FirstOrDefault();
                            user.ReferenceTag = "D";
                            user.Username = emaildid;
                            user.Password = PasswordEncodeandDecode.EncodePasswordToBase64(AddEmp.Inetrnaluserdetails.Confirmpassword);

                            if (AddEmp.Inetrnaluserdetails.AccessRole == "A")
                            {
                                user.Useraccess = "A";
                            }
                            else
                            {
                                user.Useraccess = "D";
                            }


                            user.Emailid = emaildid;
                            user.Isactive = true;
                            user.Createdutc = DateTime.Now.Date;
                            user.Createdby = Convert.ToInt32(AddEmp.Inetrnaluserdetails.Userid);
                            CMPSContext.Users.Add(user);
                            CMPSContext.SaveChanges();
                            var uservsrole = new User_Role();
                            var useriss = CMPSContext.Users.Select(x => x.Userid).LastOrDefault();
                            uservsrole.UserID = useriss;
                            uservsrole.CMPID = Convert.ToInt32(AddEmp.Inetrnaluserdetails.companyid);
                            uservsrole.UserName = emaildid;
                            uservsrole.RoleID = CMPSContext.Role.Where(x => x.RoleDescription == "Doctor").Select(x => x.RoleID).FirstOrDefault(); ;
                            uservsrole.RoleDescription = AddEmp.Inetrnaluserdetails.Baserole;
                            uservsrole.IsDeleted = false;
                            uservsrole.CreatedUTC = DateTime.Now.Date;
                            uservsrole.CreatedBy = Convert.ToInt32(AddEmp.Inetrnaluserdetails.Userid);
                            CMPSContext.UserVsRole.Add(uservsrole);
                            CMPSContext.SaveChanges();
                            dbContextTransaction.Commit();
                        }
                        else
                        {
                            AddEmp.Check = "No Mail ID";
                        }



                    }
                    else if (AddEmp.Inetrnaluserdetails.Baserole == "Nurse")
                    {

                    }
                    else if (AddEmp.Inetrnaluserdetails.Baserole == "Vision")
                    {
                        var emaildid = CMPSContext.DoctorMaster.Where(x => x.DoctorID == Convert.ToInt32(AddEmp.Inetrnaluserdetails.Userrole)
                      && x.CMPID == Convert.ToInt32(AddEmp.Inetrnaluserdetails.companyid)).Select(x => x.EmailID).FirstOrDefault();


                        if (emaildid != null)
                        {
                            var user = new Users();
                            user.Usertype = "V";
                            user.CMPID = Convert.ToInt32(AddEmp.Inetrnaluserdetails.companyid);
                            user.ReferenceID = CMPSContext.Role.Where(x => x.RoleDescription == "Vision").Select(x => x.RoleID).FirstOrDefault();
                            user.ReferenceTag = "V";
                            user.Username = emaildid;
                            user.Password = PasswordEncodeandDecode.EncodePasswordToBase64(AddEmp.Inetrnaluserdetails.Confirmpassword);

                            if (AddEmp.Inetrnaluserdetails.AccessRole == "A")
                            {
                                user.Useraccess = "A";
                            }
                            else
                            {
                                user.Useraccess = "V";
                            }


                            user.Emailid = emaildid;
                            user.Isactive = true;
                            user.Createdutc = DateTime.Now.Date;
                            user.Createdby = Convert.ToInt32(AddEmp.Inetrnaluserdetails.Userid);
                            CMPSContext.Users.Add(user);
                            CMPSContext.SaveChanges();
                            var uservsrole = new User_Role();
                            var useriss = CMPSContext.Users.Select(x => x.Userid).LastOrDefault();
                            uservsrole.UserID = useriss;
                            uservsrole.CMPID = Convert.ToInt32(AddEmp.Inetrnaluserdetails.companyid);
                            uservsrole.UserName = emaildid;
                            uservsrole.RoleID = CMPSContext.Role.Where(x => x.RoleDescription == "Vision").Select(x => x.RoleID).FirstOrDefault(); ;
                            uservsrole.RoleDescription = AddEmp.Inetrnaluserdetails.Baserole;
                            uservsrole.IsDeleted = false;
                            uservsrole.CreatedUTC = DateTime.Now.Date;
                            uservsrole.CreatedBy = Convert.ToInt32(AddEmp.Inetrnaluserdetails.Userid);
                            CMPSContext.UserVsRole.Add(uservsrole);
                            CMPSContext.SaveChanges();
                            dbContextTransaction.Commit();

                        }
                    }
                    else if (AddEmp.Inetrnaluserdetails.Baserole == "Reception")
                    {
                        var eployeeid = CMPSContext.Employee.Where(x => x.EmployeeID == Convert.ToInt32(AddEmp.Inetrnaluserdetails.Userrole)
         && x.CMPID == Convert.ToInt32(AddEmp.Inetrnaluserdetails.companyid)).Select(x => x.EmployeeID).FirstOrDefault();
                        var emaildid = CMPSContext.EmployeeCommunication.Where(x => x.EmpID == eployeeid).Select(x => x.EmailID).FirstOrDefault();
                        if (emaildid != null)
                        {

                            var user = new Users();
                            user.Usertype = "R";
                            user.CMPID = Convert.ToInt32(AddEmp.Inetrnaluserdetails.companyid);
                            user.ReferenceID = CMPSContext.Role.Where(x => x.RoleDescription == "Reception").Select(x => x.RoleID).FirstOrDefault();
                            user.ReferenceTag = "R";
                            user.Username = emaildid;
                            user.Password = PasswordEncodeandDecode.EncodePasswordToBase64(AddEmp.Inetrnaluserdetails.Confirmpassword);
                            if (AddEmp.Inetrnaluserdetails.AccessRole == "A")
                            {
                                user.Useraccess = "A";
                            }
                            else
                            {
                                user.Useraccess = "R";
                            }

                            user.Emailid = emaildid;
                            user.Isactive = true;
                            user.Createdutc = DateTime.Now.Date;
                            user.Createdby = Convert.ToInt32(AddEmp.Inetrnaluserdetails.Userid);
                            CMPSContext.Users.Add(user);
                            CMPSContext.SaveChanges();
                            var uservsrole = new User_Role();
                            var useriss = CMPSContext.Users.Select(x => x.Userid).LastOrDefault();
                            uservsrole.UserID = useriss;
                            uservsrole.CMPID = Convert.ToInt32(AddEmp.Inetrnaluserdetails.companyid);
                            uservsrole.RoleID = CMPSContext.Role.Where(x => x.RoleDescription == "Reception").Select(x => x.RoleID).FirstOrDefault(); ;
                            uservsrole.UserName = emaildid;
                            uservsrole.RoleDescription = AddEmp.Inetrnaluserdetails.Baserole;
                            uservsrole.IsDeleted = false;
                            uservsrole.CreatedUTC = DateTime.Now.Date;
                            uservsrole.CreatedBy = Convert.ToInt32(AddEmp.Inetrnaluserdetails.Userid);
                            CMPSContext.UserVsRole.Add(uservsrole);
                            CMPSContext.SaveChanges();
                            dbContextTransaction.Commit();
                        }
                        else
                        {
                            AddEmp.Check = "No Mail ID";
                        }

                    }
                    else if (AddEmp.Inetrnaluserdetails.Baserole == "Optometrist")
                    {
                        var emaildid = CMPSContext.DoctorMaster.Where(x => x.DoctorID == Convert.ToInt32(AddEmp.Inetrnaluserdetails.Userrole)
                     && x.CMPID == Convert.ToInt32(AddEmp.Inetrnaluserdetails.companyid)).Select(x => x.EmailID).FirstOrDefault();


                        if (emaildid != null)
                        {

                            var user = new Users();
                            user.Usertype = "O";
                            user.CMPID = Convert.ToInt32(AddEmp.Inetrnaluserdetails.companyid);
                            user.ReferenceID = CMPSContext.Role.Where(x => x.RoleDescription == "Optometrist").Select(x => x.RoleID).FirstOrDefault();
                            user.ReferenceTag = "O";
                            user.Username = emaildid;
                            user.Password = PasswordEncodeandDecode.EncodePasswordToBase64(AddEmp.Inetrnaluserdetails.Confirmpassword);
                            if (AddEmp.Inetrnaluserdetails.AccessRole == "A")
                            {
                                user.Useraccess = "A";
                            }
                            else
                            {
                                user.Useraccess = "O";
                            }

                            user.Emailid = emaildid;
                            user.Isactive = true;
                            user.Createdutc = DateTime.Now.Date;
                            user.Createdby = Convert.ToInt32(AddEmp.Inetrnaluserdetails.Userid);
                            CMPSContext.Users.Add(user);
                            CMPSContext.SaveChanges();

                            var uservsrole = new User_Role();
                            var useriss = CMPSContext.Users.Select(x => x.Userid).LastOrDefault();
                            uservsrole.UserID = useriss;
                            uservsrole.CMPID = Convert.ToInt32(AddEmp.Inetrnaluserdetails.companyid);
                            uservsrole.UserName = emaildid;
                            uservsrole.RoleID = CMPSContext.Role.Where(x => x.RoleDescription == "Optometrist").Select(x => x.RoleID).FirstOrDefault(); ;
                            uservsrole.RoleDescription = AddEmp.Inetrnaluserdetails.Baserole;
                            uservsrole.IsDeleted = false;
                            uservsrole.CreatedUTC = DateTime.Now.Date;
                            uservsrole.CreatedBy = Convert.ToInt32(AddEmp.Inetrnaluserdetails.Userid);
                            CMPSContext.UserVsRole.Add(uservsrole);
                            CMPSContext.SaveChanges();
                            dbContextTransaction.Commit();
                        }
                        else
                        {
                            AddEmp.Check = "No Mail ID";
                        }


                    }
                    else if (AddEmp.Inetrnaluserdetails.Baserole == "Employee")
                    {
                        var eployeeid = CMPSContext.Employee.Where(x => x.EmployeeID == Convert.ToInt32(AddEmp.Inetrnaluserdetails.Userrole)
          && x.CMPID == Convert.ToInt32(AddEmp.Inetrnaluserdetails.companyid)).Select(x => x.EmployeeID).FirstOrDefault();

                        var emaildid = CMPSContext.EmployeeCommunication.Where(x => x.EmpID == eployeeid).Select(x => x.EmailID).FirstOrDefault();


                        if (emaildid != null)
                        {
                            var user = new Users();
                            user.Usertype = "E";
                            user.CMPID = Convert.ToInt32(AddEmp.Inetrnaluserdetails.companyid);
                            user.ReferenceID = CMPSContext.Role.Where(x => x.RoleDescription == "Doctor").Select(x => x.RoleID).FirstOrDefault();
                            user.ReferenceTag = "E";
                            user.Username = emaildid;
                            user.Password = PasswordEncodeandDecode.EncodePasswordToBase64(AddEmp.Inetrnaluserdetails.Confirmpassword);
                            if (AddEmp.Inetrnaluserdetails.AccessRole == "A")
                            {
                                user.Useraccess = "A";
                            }
                            else
                            {
                                user.Useraccess = "E";
                            }

                            user.Emailid = emaildid;
                            user.Isactive = true;
                            user.Createdutc = DateTime.Now.Date;
                            user.Createdby = Convert.ToInt32(AddEmp.Inetrnaluserdetails.Userid);
                            CMPSContext.Users.Add(user);
                            CMPSContext.SaveChanges();

                            var uservsrole = new User_Role();
                            var useriss = CMPSContext.Users.Select(x => x.Userid).LastOrDefault();
                            uservsrole.UserID = useriss;
                            uservsrole.CMPID = Convert.ToInt32(AddEmp.Inetrnaluserdetails.companyid);
                            uservsrole.RoleID = CMPSContext.Role.Where(x => x.RoleDescription == "Employee").Select(x => x.RoleID).FirstOrDefault(); ;
                            uservsrole.UserName = emaildid;
                            uservsrole.RoleDescription = AddEmp.Inetrnaluserdetails.Baserole;
                            uservsrole.IsDeleted = false;
                            uservsrole.CreatedUTC = DateTime.Now.Date;
                            uservsrole.CreatedBy = Convert.ToInt32(AddEmp.Inetrnaluserdetails.Userid);
                            CMPSContext.UserVsRole.Add(uservsrole);
                            CMPSContext.SaveChanges();
                            dbContextTransaction.Commit();
                        }
                        else
                        {
                            AddEmp.Check = "No Mail ID";
                        }


                    }

                    if (CMPSContext.SaveChanges() >= 0)
                        return new
                        {
                            Success = true,
                            Message = "Saved successfully",
                            Check = AddEmp.Check,
                        };
                }
                catch (Exception ex)
                {
                    dbContextTransaction.Rollback();
                    Console.Write(ex);
                }
                return new
                {
                    Success = false,
                    Message = "some data are missing"
                };

            }



        }

        public dynamic updateUserDet(User User, int ID, Boolean IsActive, int DoctorID)
        {

            try
            {

                var users = new Users();

                users = CMPSContext.Users.Where(x => x.Userid == ID).FirstOrDefault();

                users.Isactive = IsActive;
                users.Updatedby = DoctorID;
                users.Updatedutc = DateTime.UtcNow;


                CMPSContext.Users.UpdateRange(users);

                try
                {
                    if (CMPSContext.SaveChanges() > 0)
                        return new
                        {
                            Success = true,
                            Message = "update successfully"
                        };
                }
                catch (Exception ex)
                {
                    Console.Write(ex);
                }
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




        public dynamic PostExternaluserdetails(User AddEmp)
        {

            var users = new User_Master();

            using (var dbContextTransaction = CMPSContext.Database.BeginTransaction())
            {

                try
                {
                    if (AddEmp.Inetrnaluserdetails.Baserole == "Doctor")
                    {

                        dbContextTransaction.Commit();

                    }
                    else if (AddEmp.Inetrnaluserdetails.Baserole == "Nurse")
                    {

                    }
                    else if (AddEmp.Inetrnaluserdetails.Baserole == "Chief Nurse")
                    {

                    }
                    else if (AddEmp.Inetrnaluserdetails.Baserole == "Reception")
                    {
           
                        dbContextTransaction.Commit();
                    }
                    else if (AddEmp.Inetrnaluserdetails.Baserole == "Optometrist")
                    {
                  
                        dbContextTransaction.Commit();
                    }
                    else if (AddEmp.Inetrnaluserdetails.Baserole == "Employee")
                    {
                      
                        dbContextTransaction.Commit();
                    }

                    if (CMPSContext.SaveChanges() >= 0)
                        return new
                        {
                            Success = true,
                            Message = "Saved successfully",
                        };
                }
                catch (Exception ex)
                {
                    dbContextTransaction.Rollback();
                    Console.Write(ex);
                }
                return new
                {
                    Success = false,
                    Message = "some data are missing"
                };
            }
        }


                ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
            }



}







