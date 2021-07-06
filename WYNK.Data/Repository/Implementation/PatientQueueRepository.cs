using System;
using System.Collections.Generic;
using System.Linq;
using WYNK.Data.Model;
using WYNK.Data.Model.ViewModel;
namespace WYNK.Data.Repository.Implementation
{
    public class PatientQueueRepository : RepositoryBase<PatientQueueViewModel>, IPatientQueueRepository
    {
        private readonly WYNKContext _Wynkcontext;
        private readonly CMPSContext _Cmpscontext;
        

        public PatientQueueRepository(WYNKContext context, CMPSContext Cmpscontext) : base(context, Cmpscontext)
        {
            _Wynkcontext = context;
            _Cmpscontext = Cmpscontext;

        }


        public PatientQueueViewModel GetQueueDate(int CompanyID)
        {
            var Queuedata = new PatientQueueViewModel();
            var todaydate = DateTime.UtcNow.Date;
            var Registrationfulldata = (from r in WYNKContext.Registration.Where(x => x.CMPID == CompanyID && x.DateofRegistration.Date == todaydate)
                                        join rt in WYNKContext.RegistrationTran on r.UIN equals rt.UIN
                                        select new
                                        {
                                            UIN = r.UIN,
                                            RegtranID = rt.RegistrationTranID,
                                            Patientvisittype = rt.PatientVisitType,
                                            createdby = r.CreatedBy,
                                        }).ToList();

            var patientassignlist = WYNKContext.PatientAssign.Where(x => x.AssignedDate.Date == todaydate).Select(x => x.RegistrationTranID).ToList();
            var fileterdlist = Registrationfulldata.Where(p => !patientassignlist.Contains(p.RegtranID)).ToList();
            var Norfilteredlist = Registrationfulldata.Where(p => patientassignlist.Contains(p.RegtranID)).ToList();
            var ocularrelateddata = WYNKContext.OcularComplaints.Where(x => x.CreatedUTC.Date == todaydate).Select(x => x.RegistrationTranID).ToList();
            var historydata = WYNKContext.PatientHistory.Where(x => x.CreatedUTC.Date == todaydate).Select(x => x.UIN).ToList();
            var Optobucket = Norfilteredlist.Where(z => !ocularrelateddata.Contains(z.RegtranID)).ToList();
            var Optobucket2 = Norfilteredlist.Where(z => !historydata.Contains(z.UIN)).ToList();
            if (Optobucket.Count() != 0 || Optobucket2.Count() != 0)

            {
                Queuedata.TotalAwaitingforoptometristCOuntdata = Norfilteredlist.Count();
            }
            Queuedata.TotalNewCOuntdata = fileterdlist.Count();
            return Queuedata;
        }

        public PatientQueueViewModel GetNewQueueDate(int CompanyID)
        {
            var Queuedata = new PatientQueueViewModel();
            var todaydate = DateTime.UtcNow.Date;
            var Registrationfulldata = (from r in WYNKContext.Registration.Where(x => x.CMPID == CompanyID && x.DateofRegistration.Date == todaydate)
                                        join rt in WYNKContext.RegistrationTran on r.UIN equals rt.UIN
                                        select new
                                        {
                                            RegtranID = rt.RegistrationTranID,
                                            createdby = r.CreatedBy,
                                        }).ToList();
            var patientassignlist = WYNKContext.PatientAssign.Where(x => x.AssignedDate.Date == todaydate).Select(x => x.RegistrationTranID).ToList();
            var fileterdlist = Registrationfulldata.Where(p => !patientassignlist.Contains(p.RegtranID)).ToList();

            var regdata = (from c in fileterdlist
                           select new RegistrationdatawithMedicalstaff
                           {
                               DoctorID = c.createdby,
                               Docnames = getdocname(c.createdby),
                               TotalCount = fileterdlist.Where(x => x.createdby == c.createdby).Count(),
                           }).ToList();



            Queuedata.RegistrationdatawithMedicalstaff = (from c in regdata
                                                          group c by new { c.Docnames } into h
                                                          select new RegistrationdatawithMedicalstaff
                                                          {
                                                              DoctorID = h.FirstOrDefault().DoctorID,
                                                              Docnames = h.FirstOrDefault().Docnames,
                                                              TotalCount = h.FirstOrDefault().TotalCount,
                                                              Assignedto = "Registration",
                                                          }).ToList();


            Queuedata.OptometristHeaderdetails = new List<OptometristHeaderdetails>();

            return Queuedata;
        }
        public PatientQueueViewModel GetoptoquedataQueueDate(int CompanyID)
        {
            var Queuedata = new PatientQueueViewModel();
            var todaydate = DateTime.UtcNow.Date;
            var Registrationfulldata = (from r in WYNKContext.Registration.Where(x => x.CMPID == CompanyID && x.DateofRegistration.Date == todaydate)
                                        join rt in WYNKContext.RegistrationTran on r.UIN equals rt.UIN
                                        select new
                                        {
                                            UIN = r.UIN,
                                            RegtranID = rt.RegistrationTranID,
                                            createdby = r.CreatedBy,
                                        }).ToList();
            var orgregdata = Registrationfulldata.Select(x => x.RegtranID).ToList();
            var orgUINregdata = Registrationfulldata.Select(x => x.RegtranID).ToList();
            var patientassignlist = WYNKContext.PatientAssign.Where(x => x.AssignedDate.Date == todaydate).ToList();
            var fileterdlist = patientassignlist.Where(p => orgregdata.Contains(p.RegistrationTranID)).ToList();
            var oculardaat = WYNKContext.OcularComplaints.Select(x => x.RegistrationTranID).ToList();
            var systemic = WYNKContext.PatientHistory.Select(x => x.RegistrationTranID).ToList();

            var firstbucket = fileterdlist.Where(m => !oculardaat.Contains(m.RegistrationTranID)).ToList();
            var secondbucket = fileterdlist.Where(m => !systemic.Contains(m.RegistrationTranID)).ToList();

            if(firstbucket.Count() != 0 && secondbucket.Count() != 0)
            {
                var regdata = (from c in fileterdlist
                               select new RegistrationdatawithMedicalstaff
                               {
                                   DoctorID = c.DoctorID,
                                   TotalCount = fileterdlist.Where(x => x.CreatedBy == c.CreatedBy).Count(),
                                   Docnames = CMPSContext.DoctorMaster.Where(x => x.DoctorID == c.DoctorID).Select(x => x.LastName).FirstOrDefault(),
                               }).ToList();
                Queuedata.RegistrationdatawithMedicalstaff = (from c in regdata
                                                              group c by new { c.Docnames } into h
                                                              select new RegistrationdatawithMedicalstaff
                                                              {
                                                                  DoctorID = h.FirstOrDefault().DoctorID,
                                                                  Docnames = h.FirstOrDefault().Docnames,
                                                                  TotalCount = h.FirstOrDefault().TotalCount,
                                                                  Assignedto = "Optometrist",
                                                              }).ToList();
            }

            return Queuedata;
        }
        public PatientQueueViewModel Getdoctorwisedeatils(int CompanyID, string Phase, int doctorid)
        {
            var Queuedata = new PatientQueueViewModel();
            var todaydate = DateTime.UtcNow.Date;

            var utctimes = CMPSContext.Setup.Where(x => x.CMPID == CompanyID).Select(x => x.UTCTime).FirstOrDefault();
            TimeSpan utctime = TimeSpan.Parse(utctimes);

            if (Phase == "Registration")
            {
                var Registrationfulldata = (from r in WYNKContext.Registration.Where(x => x.CMPID == CompanyID && x.DateofRegistration.Date == todaydate)
                                            join rt in WYNKContext.RegistrationTran on r.UIN equals rt.UIN
                                            select new
                                            {
                                                UIN = r.UIN,
                                                RegtranID = rt.RegistrationTranID,
                                                Patientvisittype = rt.PatientVisitType,
                                                createdby = r.CreatedBy,
                                                Patientfisername = r.Name,
                                                patientmiddleame = r.MiddleName,
                                                patientlastname = r.LastName,
                                                DateofRegistration = r.DateofRegistration + utctime,
                                                waitingtime = Gettimedifference(r.DateofRegistration + utctime, CompanyID),
                                                }).ToList();
                var patientassignlist = WYNKContext.PatientAssign.Where(x => x.AssignedDate.Date == todaydate).Select(x => x.RegistrationTranID).ToList();
                var fileterdlist = Registrationfulldata.Where(p => !patientassignlist.Contains(p.RegtranID) && p.createdby == doctorid).ToList();

                var regdata = (from c in fileterdlist
                               select new Patientdatabasedondoctor
                               {
                               UIN = c.UIN,
                               PatientName = c.Patientfisername + " "+ c.patientlastname,
                               RegisteredDate = c.DateofRegistration.ToString("dd-MMM-y hh:mm:ss"),
                               waitngtime = c.waitingtime,
                               }).ToList();
                Queuedata.Patientdatabasedondoctor = regdata;

                Queuedata.Patientdatabasedonoptiometrist = new List<Patientdatabasedonoptiometrist>();

                var data = new Patientdatabasedonoptiometrist();
                data.UIN = "UIN";
                data.PatientName = "Patient Name";
                data.Waitingtime = "Waiting to Allocate";
                data.AssignedDateandTime = "Registered Date and Time";
                Queuedata.Patientdatabasedonoptiometrist.Add(data);
            }
            else
            {
                var Registrationfulldata = (from r in WYNKContext.Registration.Where(x => x.CMPID == CompanyID && x.DateofRegistration.Date == todaydate)
                                            join rt in WYNKContext.RegistrationTran on r.UIN equals rt.UIN
                                            select new
                                            {
                                                UIN = r.UIN,
                                                RegtranID = rt.RegistrationTranID,
                                                Patientvisittype = rt.PatientVisitType,
                                                createdby = r.CreatedBy,
                                                Patientfisername = r.Name,
                                                patientmiddleame = r.MiddleName,
                                                patientlastname = r.LastName,
                                                DateofRegistration = r.DateofRegistration + utctime,
                                                waitingtime = Gettimedifference(r.DateofRegistration + utctime, CompanyID),
                                            }).ToList();

                var orgregdata = Registrationfulldata.Select(x => x.RegtranID).ToList();
                var orgUINregdata = Registrationfulldata.Select(x => x.RegtranID).ToList();
                var patientassignlist = WYNKContext.PatientAssign.Where(x => x.AssignedDate.Date == todaydate).ToList();
                var fileterdlist = patientassignlist.Where(p => orgregdata.Contains(p.RegistrationTranID) && p.DoctorID == doctorid).ToList();
                var oculardaat = WYNKContext.OcularComplaints.Select(x => x.RegistrationTranID).ToList();
                var systemic = WYNKContext.PatientHistory.Select(x => x.RegistrationTranID).ToList();
                var firstbucket = fileterdlist.Where(m => !oculardaat.Contains(m.RegistrationTranID)).ToList();
                var secondbucket = fileterdlist.Where(m => !systemic.Contains(m.RegistrationTranID)).ToList();
             


                if (firstbucket.Count() != 0 && secondbucket.Count() != 0)
                {
                    var regdata = (from c in fileterdlist
                                   select new Patientdatabasedondoctor
                                   {
                                       UIN = Registrationfulldata.Where(x =>x.RegtranID == c.RegistrationTranID).Select(x =>x.UIN).FirstOrDefault(),
                                       PatientName = Registrationfulldata.Where(x => x.RegtranID == c.RegistrationTranID).Select(x => x.Patientfisername).FirstOrDefault() + " " + Registrationfulldata.Where(x => x.RegtranID == c.RegistrationTranID).Select(x => x.patientlastname).FirstOrDefault(),
                                       RegisteredDate = (c.AssignedDate + utctime).ToString("dd-MMM-y hh:mm:ss"),
                                       waitngtime = Gettimedifference(c.AssignedDate + utctime,CompanyID),
                                   }).ToList();

                    Queuedata.Patientdatabasedondoctor = regdata;

                    Queuedata.Patientdatabasedonoptiometrist = new List<Patientdatabasedonoptiometrist>();

                    var data = new Patientdatabasedonoptiometrist();
                    data.UIN = "UIN";
                    data.PatientName = "Patient Name";
                    data.Waitingtime = "Awaiting Time";
                    data.AssignedDateandTime = "Assigned Date and Time";
                    Queuedata.Patientdatabasedonoptiometrist.Add(data);
                }


                }



            return Queuedata;
        }


        public dynamic getdocname(int docid)
        {
            var id = "";

            var Referencetag = CMPSContext.Users.Where(x => x.Userid == docid).Select(x => x.ReferenceTag).FirstOrDefault();
            var Emailid = CMPSContext.Users.Where(x => x.Userid == docid).Select(x => x.Username).FirstOrDefault();
            if (Referencetag == "A")
            {
                id = Emailid;
            }
            else if (Referencetag == "D" || Referencetag == "V" || Referencetag == "O")
            {
                id = CMPSContext.DoctorMaster.Where(x => x.EmailID == Emailid).Select(x => x.LastName).FirstOrDefault();
            }
            else if (Referencetag == "E" || Referencetag == "R")
            {
                var EMpid = CMPSContext.EmployeeCommunication.Where(x => x.EmailID == Emailid).Select(x => x.EmpID).FirstOrDefault();
                id = CMPSContext.Employee.Where(x => x.EmployeeID == EMpid).Select(x => x.LastName).FirstOrDefault();
            }
            return id;
        }

        public dynamic Gettimedifference(DateTime Regdate, int CMPID)
        {
            var id = "";
            var utctimes = CMPSContext.Setup.Where(x => x.CMPID == CMPID).Select(x => x.UTCTime).FirstOrDefault();
            TimeSpan utctime = TimeSpan.Parse(utctimes);
            var todaydate = DateTime.UtcNow.Add(utctime);
            var regdate = Regdate;
            TimeSpan span = todaydate.Subtract(regdate);
            var hours = span.Hours;
            var Minutes = span.Minutes;
            var Seconds = span.Seconds;
            id = $"{hours}:{Minutes}:{Seconds}";
            return id;
        }


        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    }
}


