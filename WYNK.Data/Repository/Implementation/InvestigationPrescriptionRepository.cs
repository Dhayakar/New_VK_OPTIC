using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using RestSharp;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using WYNK.Data.Common;
using WYNK.Data.Model;
using WYNK.Data.Model.ViewModel;
using WYNK.Data.Repository.Operation;
using WYNK.Helpers;

namespace WYNK.Data.Repository.Implementation
{
    class InvestigationPrescriptionRepository : RepositoryBase<InvestigationPrescriptionk>, IInvestigationPrescriptionRepository
    {
        private readonly WYNKContext _Wynkcontext;
        private readonly CMPSContext _Cmpscontext;
        
        public InvestigationPrescriptionRepository(WYNKContext context, CMPSContext Cmpscontext) : base(context, Cmpscontext)
        {
            _Wynkcontext = context;
            _Cmpscontext = Cmpscontext;

        }
        public InvestigationPrescriptionk Getdescvalues(int id)

        {
            var invv = new InvestigationPrescriptionk();



            //var doct = CMPSContext.DoctorMaster.ToList();
           // var invpre = WYNKContext.InvestigationPrescription.ToList();
            //var invtr = WYNKContext.InvestigationPrescriptionTran.ToList();
            //var one = CMPSContext.OneLineMaster.ToList();
            //var use = CMPSContext.Users.ToList();
           // var docmas = CMPSContext.DoctorMaster.ToList();
           // var invim = WYNKContext.InvestigationImages.ToList();


            var speciality = WYNKContext.SpecialityVSTest.AsNoTracking().ToList();
            var icdspeciality = WYNKContext.ICDSpecialityCode.AsNoTracking().ToList();
            var oneline = CMPSContext.OneLineMaster.AsNoTracking().ToList();

            invv.invdtt = (from sp in speciality.Where(X => X.IsDeleted == false && X.IsActive == true && X.SpecialityID == id)
                           join olm in oneline on sp.InvestigationID equals olm.OLMID
                           join spc in icdspeciality on sp.SpecialityID equals spc.ID
                           select new invdtt
                           {
                               speid = sp.SpecialityID,
                               spename = spc.SpecialityDescription,
                               invid = sp.InvestigationID,
                               invName = olm.ParentDescription,
                           }).ToList();


           




            return invv;


        }

        public dynamic InsertInvPrescription(InvestigationPrescriptionk InvPrescription,int CMPID, int TransactionTypeid)

        {
            using (var dbContextTransaction = WYNKContext.Database.BeginTransaction())
            {

                try
                {
                    var InvP = new InvestigationPrescription();
                    var RegistrationTranID = WYNKContext.RegistrationTran.Where(x => x.UIN == InvPrescription.InvPrescription.UIN).Select(x => x.RegistrationTranID).LastOrDefault();
                   
                    InvP.RegistrationTranID = RegistrationTranID;
                    InvP.RandomUniqueID = PasswordEncodeandDecode.GetRandomnumber();
                    InvP.UIN = InvPrescription.InvPrescription.UIN;
                    InvP.INVPRESNO = InvPrescription.InvPrescription.INVPRESNO;
                    InvP.Fyear = Convert.ToString(WYNKContext.FinancialYear.Where(x => x.ID == WYNKContext.FinancialYear.Where(b => Convert.ToDateTime(b.FYFrom) <= DateTime.Now && Convert.ToDateTime(b.FYTo) >= DateTime.Now && x.CMPID == CMPID && x.IsActive == true).Select(f => f.ID).FirstOrDefault()).Select(c => c.FYAccYear).FirstOrDefault());
                    InvP.isbilled = false;
                    InvP.PrescribedBy = InvPrescription.InvPrescription.PrescribedBy;
                    InvP.Dateofinvestigation = InvPrescription.InvPrescription.Dateofinvestigation;
                    InvP.Remarks = InvPrescription.InvPrescription.Remarks;
                    InvP.CMPID = InvPrescription.InvPrescription.CMPID;
                    InvP.Status = "Open";
                    InvP.IsDeleted = false;
                    InvP.CreatedUTC = DateTime.Now;
                    InvP.CreatedBy = InvPrescription.InvPrescription.CreatedBy;
                    WYNKContext.InvestigationPrescription.AddRange(InvP);
                    
                   // string cmpname = CMPSContext.Company.Where(x => x.CmpID == CMPID).Select(x => x.CompanyName).FirstOrDefault();
                    string username = CMPSContext.DoctorMaster.Where(s => s.EmailID == CMPSContext.Users.Where(x => x.Userid == InvPrescription.InvPrescription.CreatedBy).Select(x => x.Username).FirstOrDefault()).Select(c => c.Firstname + "" + c.MiddleName + "" + c.LastName).FirstOrDefault();
                    string userid = Convert.ToString(InvPrescription.InvPrescription.CreatedBy);
                    ErrorLog oErrorLogs = new ErrorLog();
                    oErrorLogs.WriteErrorLogTitle(InvPrescription.Companyname, "Investigation Prescription", "User name :", username, "User ID :", userid, "Mode : Update");
                    object names = InvP;
                    oErrorLogs.WriteErrorLogArray("InvestigationPrescription", names);


                    WYNKContext.SaveChanges();

                    var IPID = InvP.RandomUniqueID;

                    if (InvPrescription.InvPsT.Count() > 0)
                    {
                        foreach (var item in InvPrescription.InvPsT.ToList())
                        {
                            var InvPT = new InvestigationPrescriptionTran();
                            InvPT.IPID = IPID;
                            InvPT.SpecialityID = item.SpecialityID;
                            InvPT.InvestigationID = item.InvestigationID;
                            InvPT.Amount = item.Amount;
                            InvPT.CreatedUTC = DateTime.UtcNow;
                            InvPT.CreatedBy = InvPrescription.InvPrescription.CreatedBy;
                            WYNKContext.InvestigationPrescriptionTran.AddRange(InvPT);
                            ErrorLog oErrorLogstranEX = new ErrorLog();
                            object namestrEX = InvPT;
                            oErrorLogs.WriteErrorLogArray("InvestigationPrescriptionTran", namestrEX);
                            WYNKContext.SaveChanges();
                        }
                    }
                    ///////////////////////////GenerateRunningCtrlNoo1(update)//////////////////////////////////
                    var commonRepos = new CommonRepository(_Wynkcontext, _Cmpscontext);
                    var RunningNumber = commonRepos.GenerateRunningCtrlNoo(TransactionTypeid, InvPrescription.InvPrescription.CMPID, "GetRunningNo");
                    if (RunningNumber == InvPrescription.InvPrescription.INVPRESNO)
                    {
                        commonRepos.GenerateRunningCtrlNoo(TransactionTypeid, InvPrescription.InvPrescription.CMPID, "UpdateRunningNo");
                    }
                    else
                    {
                        var GetRunningNumber = commonRepos.GenerateRunningCtrlNoo(TransactionTypeid, InvPrescription.InvPrescription.CMPID, "UpdateRunningNo");
                        ///////////////////////////InvestigationPrescription//////////////////////////////////
                        InvP = WYNKContext.InvestigationPrescription.Where(x => x.INVPRESNO == InvPrescription.InvPrescription.INVPRESNO).FirstOrDefault();
                        InvP.INVPRESNO = GetRunningNumber;
                        WYNKContext.Entry(InvP).State = EntityState.Modified;
                        WYNKContext.SaveChanges();
                    }
                    if (WYNKContext.SaveChanges() >= 0)
                    {
                        ErrorLog oErrorLog = new ErrorLog();
                        oErrorLog.WriteErrorLog("Information :", "Saved Successfully");
                    }
                    dbContextTransaction.Commit();
                    if (WYNKContext.SaveChanges() >= 0)
                        return new
                        {
                            Success = true,
                            
                            DRID = CMPSContext.DoctorMaster.Where(x => x.DoctorID == InvPrescription.InvPrescription.PrescribedBy).Select(x => x.Firstname +" "+x.MiddleName+" "+ x.LastName),
                            DRREGID = CMPSContext.DoctorMaster.Where(x => x.DoctorID == InvPrescription.InvPrescription.PrescribedBy).Select(x => x.RegistrationNumber),
                            PAddress = CMPSContext.Company.Where(x => x.CmpID == InvPrescription.InvPrescription.CMPID).Select(x => x.Address1).FirstOrDefault(),
                            PAddress2 = CMPSContext.Company.Where(x => x.CmpID == InvPrescription.InvPrescription.CMPID).Select(x => x.Address2).FirstOrDefault() != null ?
                            CMPSContext.Company.Where(x => x.CmpID == InvPrescription.InvPrescription.CMPID).Select(x => x.Address2).FirstOrDefault(): string.Empty,
                            Pphone = CMPSContext.Company.Where(x => x.CmpID == InvPrescription.InvPrescription.CMPID).Select(x => x.Phone1).FirstOrDefault(),
                            Pweb = CMPSContext.Company.Where(x => x.CmpID == InvPrescription.InvPrescription.CMPID).Select(x => x.Website).FirstOrDefault() != null ?
                            CMPSContext.Company.Where(x => x.CmpID == InvPrescription.InvPrescription.CMPID).Select(x => x.Website).FirstOrDefault(): string.Empty,
                            PCompnayname = CMPSContext.Company.Where(x => x.CmpID == InvPrescription.InvPrescription.CMPID).Select(x => x.CompanyName).FirstOrDefault() != null ?
                                           CMPSContext.Company.Where(x => x.CmpID == InvPrescription.InvPrescription.CMPID).Select(x => x.CompanyName).FirstOrDefault() : string.Empty,
                };


                }


                catch (Exception ex)
                {
                    ErrorLog oErrorLog = new ErrorLog();
                    oErrorLog.WriteErrorLog("Error :", ex.InnerException.Message.ToString());
                    dbContextTransaction.Rollback();
                    Console.Write(ex);
                    string msg = ex.InnerException.Message;
                    return new { Success = false, Message = msg, grn = InvPrescription.InvPrescription.INVPRESNO };
                }
            }
            return new
            {
                Success = false,
               
            };
        }



        public bool uploadImag(IFormFile file1, string desc, string uin, string id)
        {
            var medpres = new InvestigationPrescriptionk();
            medpres.UploadInvestigationPrescription = new List<UploadInvestigationPrescription>();
            try
            {
                var ivid = WYNKContext.UploadInvestigationPrescription.Where(x => x.UIN == id).Select(x => x.ID).LastOrDefault();
                var currentDir = Directory.GetCurrentDirectory();
                var dt = Convert.ToDateTime(DateTime.Now.Date).ToString("dd-MM-yyyy");
                var res = Directory.CreateDirectory(currentDir + '/' + uin + '/' + dt);
                var descs = desc + ivid;
                var fileName1 = $"{descs}{Path.GetExtension(file1.FileName)}";
                var path1 = $"{currentDir}/{uin}/{dt}/{fileName1}";
                var pathh = $"{currentDir}/{uin}/{dt}";
                using (var stream1 = new FileStream(path1, FileMode.Create))
                {
                    file1.CopyTo(stream1);
                    var opbio = WYNKContext.UploadInvestigationPrescription.Where(x => x.UIN == id && x.CreatedUTC.Date == DateTime.Now.Date && x.Path == null).ToList();
                    if (opbio.Count() > 0)
                    {




                        foreach (var item1 in opbio.ToList())
                        {
                            item1.Path = pathh;
                            WYNKContext.Entry(item1).State = EntityState.Modified;
                            WYNKContext.SaveChanges();
                        }

                    }

                    return WYNKContext.SaveChanges() > 0;
                }

            }



            catch (Exception)
            {
                return false;
            }
        }


        public dynamic Updatepres(InvestigationPrescriptionk InvPrescription, string UIN)
        {







            var rid = WYNKContext.RegistrationTran.Where(x => x.UIN == UIN).OrderByDescending(x => x.CreatedUTC).Select(x => x.RegistrationTranID).FirstOrDefault();

            if (InvPrescription.UploadInvestigationPrescription.Count() > 0)
            {
                foreach (var item1 in InvPrescription.UploadInvestigationPrescription.ToList())

                {
                    var presupload = new UploadInvestigationPrescription();

                    presupload.CmpID = item1.CmpID;
                    presupload.UIN = UIN;
                    presupload.RegistrationTranID = rid;
                    presupload.Remarks = item1.Remarks;
                    presupload.CreatedUTC = DateTime.Now;
                    presupload.CreatedBy = item1.CreatedBy;
                    WYNKContext.UploadInvestigationPrescription.AddRange(presupload);

                }
                WYNKContext.SaveChanges();
            }








            try
            {
                if (WYNKContext.SaveChanges() >= 0)
                {
                    ErrorLog oErrorLog = new ErrorLog();
                    oErrorLog.WriteErrorLog("Information :", "Saved Successfully");
                }
                return new
                {
                    Uin = UIN,

                    Success = true,
                    Message = CommonMessage.saved,
                };
            }
            catch (Exception ex)
            {
                Console.Write(ex);
            }
            return new
            {
                Success = false,
                Message = CommonMessage.Missing,
            };

        }


    }

}