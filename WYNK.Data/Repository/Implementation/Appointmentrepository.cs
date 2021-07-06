using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Razorpay.Api;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Text;
using WYNK.Data.Model;
using WYNK.Data.Model.ViewModel;
using WYNK.Data.Repository.Operation;
using WYNK.Helpers;

namespace WYNK.Data.Repository.Implementation
{
    class Appointmentrepository : RepositoryBase<AppointmentView>, IAppointmentRepository
    {
        private readonly WYNKContext _Wynkcontext;
        private readonly CMPSContext _Cmpscontext;


        public Appointmentrepository(WYNKContext context, CMPSContext Cmpscontext) : base(context, Cmpscontext)
        {
            _Wynkcontext = context;
            _Cmpscontext = Cmpscontext;

        }

        public dynamic InsertData(AppointmentView Appo)
        {
            var data = new AppointmentView();
            var companyname = CMPSContext.Company.Where(x => x.CmpID == Convert.ToInt32(Appo.cmpid)).Select(x => x.CompanyName).FirstOrDefault();
            var APpointemnt = new Appointment();
            var APpointemnttran = new Appointmenttran();

            try
            {
                APpointemnt.RandomUniqueID = PasswordEncodeandDecode.GetRandomnumber();
                APpointemnt.UIN = null;
                APpointemnt.PatientName = Appo.fname + ' ' + Appo.mname + ' ' + Appo.lanme;
                APpointemnt.Dateofbirth = Appo.dateofbirth;
                APpointemnt.Gender = Appo.gender;
                APpointemnt.CMPID = Convert.ToInt32(Appo.cmpid);
                APpointemnt.Address1 = Appo.address1;
                APpointemnt.Address2 = Appo.address2;
                APpointemnt.Locationname = Appo.location;
                APpointemnt.PatientImage = null;
                var Phonee = Appo.phonenumber;
                APpointemnt.Phone = Phonee;
                APpointemnt.AppointmentdoctorID = Convert.ToInt32(Appo.doctorid);
                APpointemnt.AppointmentReasons = Appo.appointmentresons;
                APpointemnt.CreatedUTC = DateTime.UtcNow;
                APpointemnt.CreatedBy = Appo.Cretedby;
                WYNKContext.Appointment.Add(APpointemnt);
                WYNKContext.SaveChanges();

                //var idss = WYNKContext.AppointmentTrans.OrderByDescending(x => x.AppointmentTranID).Select(x => x.AppointmentTranID).FirstOrDefault();
                //if (idss != 0)
                //{

                //    APpointemnttran.AppointmentTranID = idss + 1;
                //}
                //else
                //{
                //    APpointemnttran.AppointmentTranID = 1;
                //}
                APpointemnttran.AppointmentMasterID = APpointemnt.RandomUniqueID;
                //APpointemnt.RandomUniqueID = APpointemnt.RandomUniqueID;
                APpointemnttran.CMPID = Convert.ToInt32(Appo.cmpid);
                APpointemnttran.Doctorid = Convert.ToInt32(Appo.doctorid);
                APpointemnttran.Contraid = null;

                if (Appo.Appointmentrequesteddate != null)
                {
                    var currentload = Appo.HH + ':' + Appo.MM;
                    var time = Convert.ToDateTime(currentload).TimeOfDay;
                    var date = Appo.Appointmentrequesteddate.Date.AddDays(1);
                    APpointemnttran.AppointmentDateandTime = date + time;
                }
                else
                {
                    APpointemnttran.AppointmentDateandTime = null;
                }


                APpointemnttran.Appointmentconfirmationsenttodoctor = null;
                APpointemnttran.Cancelledby = null;
                APpointemnttran.iscancelleddateandtime = null;
                APpointemnttran.AppointmentTime = null;
                APpointemnttran.iscancelledreason = null;
                APpointemnttran.Isstatus = "Open";
                APpointemnttran.CreatedUTC = DateTime.UtcNow;
                //APpointemnttran.UpdatedUTC = null;
                APpointemnttran.CreatedBy = Appo.Cretedby;
                APpointemnttran.AppointmentBookedby = Appo.bookedby;
                var Hour = Appo.HH;
                var Minute = Appo.MM;

                if (Hour != null && Minute != null)
                {
                    APpointemnttran.AppointmentTime = Hour + ":" + Minute;
                }
                else
                {
                    APpointemnttran.AppointmentTime = null;
                }


                //APpointemnttran.AppointmentTime = Hour + ":" + Minute;
                //APpointemnttran.UpdatedBy = null;
                WYNKContext.AppointmentTrans.Add(APpointemnttran);
                WYNKContext.SaveChanges();


                if (WYNKContext.SaveChanges() >= 0)
                {
                    ErrorLog oErrorLog = new ErrorLog();
                    oErrorLog.WriteErrorLog("Information :", "Appointment - Saved Successfully");
                    return new
                    {
                        Success = true,
                        //appointmentid = WYNKContext.Appointment.OrderByDescending(x => x.CreatedUTC).Select(x => x.ID).FirstOrDefault(),
                        phone = WYNKContext.Appointment.OrderByDescending(x => x.CreatedUTC).Select(x => x.ID).FirstOrDefault(),
                    };
                }

            }
            catch (Exception ex)
            {
                Console.Write(ex);
                ErrorLog oErrorLogs = new ErrorLog();
                oErrorLogs.WriteErrorLog(companyname + " -> Appointment - ", ex.InnerException.Message);
            }
            return new
            {
                Success = false,
            };
        }

        public dynamic getDoctorlistofDays(int CmpID, string Dcotorvalue, string reqdate)
        {
            var datas = new AppointmentView();
            var Day = Convert.ToDateTime(reqdate).DayOfWeek.ToString();
            var doctororningdata = CMPSContext.DoctorExtension.OrderByDescending(x => x.CreatedUTC).Where(x => x.DoctorID == Convert.ToInt32(Dcotorvalue) && x.CMPID == CmpID && x.Day == Day).Select(x => x.MaxFSPatients).FirstOrDefault();
            var doctoreveningdata = CMPSContext.DoctorExtension.OrderByDescending(x => x.CreatedUTC).Where(x => x.DoctorID == Convert.ToInt32(Dcotorvalue) && x.CMPID == CmpID && x.Day == Day).Select(x => x.MaxSSPatient).FirstOrDefault();




            return datas;
        }

        public dynamic getlistofdays(int CmpID, string date, string HH, string MM, int userid)
        {
            var data = new AppointmentView();
            var companyname = CMPSContext.Company.Where(x => x.CmpID == CmpID).Select(x => x.CompanyName).FirstOrDefault();
            if (userid != 0)
            {
                var currentload = HH + ':' + MM;
                TimeSpan time = Convert.ToDateTime(currentload).TimeOfDay;
                TimeSpan t2 = time.Add(new TimeSpan(00, 29, 00));
                var dates = Convert.ToDateTime(date).Date;
                var day = dates.DayOfWeek;
                var Day = day.ToString();
                var orgdate = dates + time;
                var APplist = WYNKContext.AppointmentTrans.Where(x => Convert.ToDateTime(x.AppointmentDateandTime).Date >= orgdate.Date
                && Convert.ToDateTime(x.AppointmentDateandTime).Date <= orgdate.Date && x.CMPID == CmpID && x.Doctorid == userid).Select(x => Convert.ToDateTime(x.AppointmentTime).TimeOfDay).ToList();

                var timelistcount = APplist.Where(x => x >= time && x <= t2).ToList();

                if (timelistcount.Count() != 0)
                {
                    data.Message = "Patients exists at same time";
                }
                else
                {
                    data.Message = "No Patients";
                }

            }
            else
            {
                data.Message = "Doctor Not available";
                ErrorLog oErrorLogs = new ErrorLog();
                oErrorLogs.WriteErrorLog(companyname + " -> Appointment - ", data.Message);
            }

            //var companyname = CMPSContext.Company.Where(x => x.CmpID == CmpID).Select(x => x.CompanyName).FirstOrDefault();
            //if (userid != 0)
            //{
            //    var currentload = HH + ':' + MM;
            //    TimeSpan time = Convert.ToDateTime(currentload).TimeOfDay;
            //    var dates = Convert.ToDateTime(date).Date;
            //    var day = dates.DayOfWeek;
            //    var Day = day.ToString();
            //    var orgdate = dates + time;
            //    var subdatetime = orgdate.AddMinutes(-29);
            //    var addfdatetime = orgdate.AddMinutes(29);
            //    var firsttime = "12:59";
            //    var firsttme = Convert.ToDateTime(firsttime).TimeOfDay;

            //    var doctororningdatas = CMPSContext.DoctorExtension.OrderByDescending(x => x.CreatedUTC).Where(x => x.DoctorID == userid && x.CMPID == CmpID && x.Day == Day && x.IsDeleted == false).Select(x => x.MaxFSPatients).FirstOrDefault();
            //    var doctoreveningdatas = CMPSContext.DoctorExtension.OrderByDescending(x => x.CreatedUTC).Where(x => x.DoctorID == userid && x.CMPID == CmpID && x.Day == Day && x.IsDeleted == false).Select(x => x.MaxSSPatient).FirstOrDefault();

            //    if (doctororningdatas != null || doctoreveningdatas != null)
            //    {
            //        if (time < firsttme)
            //        {
            //            var doctororningdata = CMPSContext.DoctorExtension.OrderByDescending(x => x.CreatedUTC).Where(x => x.DoctorID == userid && x.CMPID == CmpID && x.Day == Day && x.IsDeleted == false).Select(x => x.MaxFSPatients).FirstOrDefault();
            //            var appointmentdatatotalcount = WYNKContext.AppointmentTrans.Where(x => Convert.ToDateTime(x.AppointmentDateandTime).Date == orgdate.Date && x.Doctorid == userid && x.CMPID == CmpID && x.Isstatus == "Open").ToList();
            //            if (appointmentdatatotalcount.Count < doctororningdata)
            //            {
            //                var timeappointment = CMPSContext.DoctorExtension.OrderByDescending(x => x.CreatedUTC).Where(x => x.CMPID == CmpID && x.IsDeleted == false && x.DoctorID == userid && x.Day == Convert.ToString(day)).ToList();

            //                if (timeappointment.Count == 0)
            //                {
            //                    data.DoctorConsultingMessage = "Dcotor Timings not available";

            //                    ErrorLog oErrorLogs = new ErrorLog();
            //                    oErrorLogs.WriteErrorLog(companyname + " -> Appointment - ",  data.DoctorConsultingMessage);
            //                }

            //                foreach (var item in timeappointment)
            //                {
            //                    var ttime = time;
            //                    if (ttime >= item.FSFromTime && time <= item.FSToTime)
            //                    {
            //                        data.DoctorMessage = "Doctor is Available now";
            //                        data.appointmentrans = WYNKContext.AppointmentTrans.Where(x => x.AppointmentDateandTime >= orgdate && x.AppointmentDateandTime <= addfdatetime && x.Doctorid == userid && x.CMPID == CmpID && x.Isstatus == "Open").ToList();
            //                        data.appointmentranssubtract = WYNKContext.AppointmentTrans.Where(x => x.AppointmentDateandTime >= subdatetime && x.AppointmentDateandTime <= orgdate && x.Doctorid == userid && x.CMPID == CmpID && x.Isstatus == "Open").ToList();
            //                        break;
            //                    }
            //                    else if (ttime >= item.SSFromTime && time <= item.SSToTime)
            //                    {
            //                        data.appointmentrans = WYNKContext.AppointmentTrans.Where(x => x.AppointmentDateandTime >= orgdate && x.AppointmentDateandTime <= addfdatetime && x.Doctorid == userid && x.CMPID == CmpID && x.Isstatus == "Open").ToList();
            //                        data.appointmentranssubtract = WYNKContext.AppointmentTrans.Where(x => x.AppointmentDateandTime >= subdatetime && x.AppointmentDateandTime <= orgdate && x.Doctorid == userid && x.CMPID == CmpID && x.Isstatus == "Open").ToList();
            //                        data.DoctorMessage = "Doctor is Available now";
            //                        break;
            //                    }
            //                    else
            //                    {
            //                        data.DoctorMessage = "Sorry Doctor not Available now";

            //                        ErrorLog oErrorLogs = new ErrorLog();
            //                        oErrorLogs.WriteErrorLog(companyname + " -> Appointment - ", data.DoctorMessage);
            //                    }
            //                }
            //            }
            //            else
            //            {
            //                data.DoctorlimitConsultingMessage = "Limit Increased";
            //                ErrorLog oErrorLogs = new ErrorLog();
            //                oErrorLogs.WriteErrorLog(companyname + " -> Appointment - ", data.DoctorlimitConsultingMessage);
            //            }

            //        }
            //        else
            //        {
            //            var doctoreveningdata = CMPSContext.DoctorExtension.OrderByDescending(x => x.CreatedUTC).Where(x => x.DoctorID == userid && x.IsDeleted == false && x.CMPID == CmpID && x.Day == Day).Select(x => x.MaxSSPatient).FirstOrDefault();
            //            var appointmentdatatotalcount = WYNKContext.AppointmentTrans.Where(x => Convert.ToDateTime(x.AppointmentDateandTime).Date == orgdate.Date && x.Doctorid == userid && x.CMPID == CmpID && x.Isstatus == "Open").ToList();

            //            if (appointmentdatatotalcount.Count < doctoreveningdata)
            //            {
            //                var timeappointment = CMPSContext.DoctorExtension.OrderByDescending(x => x.CreatedUTC).Where(x => x.CMPID == CmpID && x.IsDeleted == false && x.DoctorID == userid && x.Day == Convert.ToString(day)).ToList();

            //                if (timeappointment.Count == 0)
            //                {
            //                    data.DoctorConsultingMessage = "Dcotor Timings not available";
            //                    ErrorLog oErrorLogs = new ErrorLog();
            //                    oErrorLogs.WriteErrorLog(companyname + " -> Appointment - ", data.DoctorlimitConsultingMessage);
            //                }

            //                foreach (var item in timeappointment)
            //                {
            //                    var ttime = time;
            //                    if (ttime >= item.FSFromTime && time <= item.FSToTime)
            //                    {
            //                        data.DoctorMessage = "Doctor is Available now";
            //                        data.appointmentrans = WYNKContext.AppointmentTrans.Where(x => x.AppointmentDateandTime >= orgdate && x.AppointmentDateandTime <= addfdatetime && x.Doctorid == userid && x.CMPID == CmpID && x.Isstatus == "Open").ToList();
            //                        data.appointmentranssubtract = WYNKContext.AppointmentTrans.Where(x => x.AppointmentDateandTime >= subdatetime && x.AppointmentDateandTime <= orgdate && x.Doctorid == userid && x.CMPID == CmpID && x.Isstatus == "Open").ToList();
            //                        break;
            //                    }
            //                    else if (ttime >= item.SSFromTime && time <= item.SSToTime)
            //                    {
            //                        data.appointmentrans = WYNKContext.AppointmentTrans.Where(x => x.AppointmentDateandTime >= orgdate && x.AppointmentDateandTime <= addfdatetime && x.Doctorid == userid && x.CMPID == CmpID && x.Isstatus == "Open").ToList();
            //                        data.appointmentranssubtract = WYNKContext.AppointmentTrans.Where(x => x.AppointmentDateandTime >= subdatetime && x.AppointmentDateandTime <= orgdate && x.Doctorid == userid && x.CMPID == CmpID && x.Isstatus == "Open").ToList();
            //                        data.DoctorMessage = "Doctor is Available now";
            //                        break;
            //                    }
            //                    else
            //                    {
            //                        data.DoctorMessage = "Sorry Doctor not Available now";
            //                    }
            //                }

            //            }
            //            else
            //            {
            //                data.DoctorlimitConsultingMessage = "Limit Increased";
            //                ErrorLog oErrorLogs = new ErrorLog();
            //                oErrorLogs.WriteErrorLog(companyname + " -> Appointment - ", data.DoctorlimitConsultingMessage);
            //            }
            //        }
            //    }
            //    else
            //    {
            //        var timeappointment = CMPSContext.DoctorExtension.OrderByDescending(x => x.CreatedUTC).Where(x => x.CMPID == CmpID && x.IsDeleted == false && x.DoctorID == userid && x.Day == Convert.ToString(day)).ToList();
            //        if (timeappointment.Count == 0)
            //        {
            //            data.DoctorConsultingMessage = "Dcotor Timings not available";
            //            data.appointmentrans = WYNKContext.AppointmentTrans.Where(x => x.AppointmentDateandTime >= orgdate && x.AppointmentDateandTime <= addfdatetime && x.Doctorid == userid && x.CMPID == CmpID && x.Isstatus == "Open").ToList();
            //            data.appointmentranssubtract = WYNKContext.AppointmentTrans.Where(x => x.AppointmentDateandTime >= subdatetime && x.AppointmentDateandTime <= orgdate && x.Doctorid == userid && x.CMPID == CmpID && x.Isstatus == "Open").ToList();

            //        }
            //        else
            //        {
            //            foreach (var item in timeappointment)
            //            {
            //                var ttime = time;
            //                if (ttime >= item.FSFromTime && time <= item.FSToTime)
            //                {
            //                    data.DoctorMessage = "Doctor is Available now";
            //                    data.appointmentrans = WYNKContext.AppointmentTrans.Where(x => x.AppointmentDateandTime >= orgdate && x.AppointmentDateandTime <= addfdatetime && x.Doctorid == userid && x.CMPID == CmpID && x.Isstatus == "Open").ToList();
            //                    data.appointmentranssubtract = WYNKContext.AppointmentTrans.Where(x => x.AppointmentDateandTime >= subdatetime && x.AppointmentDateandTime <= orgdate && x.Doctorid == userid && x.CMPID == CmpID && x.Isstatus == "Open").ToList();
            //                    break;
            //                }
            //                else if (ttime >= item.SSFromTime && time <= item.SSToTime)
            //                {
            //                    data.appointmentrans = WYNKContext.AppointmentTrans.Where(x => x.AppointmentDateandTime >= orgdate && x.AppointmentDateandTime <= addfdatetime && x.Doctorid == userid && x.CMPID == CmpID && x.Isstatus == "Open").ToList();
            //                    data.appointmentranssubtract = WYNKContext.AppointmentTrans.Where(x => x.AppointmentDateandTime >= subdatetime && x.AppointmentDateandTime <= orgdate && x.Doctorid == userid && x.CMPID == CmpID && x.Isstatus == "Open").ToList();
            //                    data.DoctorMessage = "Doctor is Available now";
            //                    break;
            //                }
            //                else
            //                {
            //                    data.DoctorMessage = "Sorry Doctor not Available now";
            //                }
            //            }
            //        }



            //    }
            //}
            //else
            //{
            //    data.Message = "Doctor Not available";
            //    ErrorLog oErrorLogs = new ErrorLog();
            //    oErrorLogs.WriteErrorLog(companyname + " -> Appointment - ", data.Message);
            //}



            return data;
        }


        public dynamic getlistofpatients(string Phonenumber)
        {
            var apdat = new AppointmentView();
            var patientsdata = WYNKContext.Appointment.Where(x => x.Phone == Phonenumber).FirstOrDefault();
            if (patientsdata != null)
            {
                apdat.NumberMessage = "Exists";
            }

            return apdat;
        }


        public dynamic uploadImag(IFormFile file, string CompanyID)
        {
            try
            {

                var currentDir = Directory.GetCurrentDirectory();
                if (!Directory.Exists(currentDir + "/Appointment/"))
                    Directory.CreateDirectory(currentDir + "/Appointment/");
                var fileName = $"{CompanyID}{Path.GetExtension(file.FileName)}";
                var path = $"{currentDir}/Appointment/{fileName}";

                if ((File.Exists(path)))
                    File.Delete(path);

                using (var stream = new FileStream(path, FileMode.Create))
                {
                    file.CopyTo(stream);
                    var id = WYNKContext.Appointment.Where(x => x.Phone == CompanyID).Select(x => x.ID).FirstOrDefault();
                    var pat = WYNKContext.Appointment.Where(x => x.ID == id).FirstOrDefault();
                    pat.PatientImage = path;
                    WYNKContext.Entry(pat).State = EntityState.Modified;
                    return WYNKContext.SaveChanges() > 0;
                }
            }
            catch (Exception)
            {
                return false;
            }
        }



        public dynamic uploadfileformats(IFormFile file, string phonenumber, string firstname, string lastname, string CMPID)
        {

            try
            {
                if (lastname == "Medicalprescription")
                {
                    var Companyid = Convert.ToInt32(CMPID);
                    var datetime = DateTime.UtcNow.Date.ToString("dd-MMM-yyyy");
                    var currentDir = Directory.GetCurrentDirectory();
                    if (!Directory.Exists(currentDir + "/Dashboard/" + Companyid + "/MedicalPrescription/" + phonenumber + '/'))
                        Directory.CreateDirectory(currentDir + "/Dashboard/" + Companyid + "/MedicalPrescription/" + phonenumber + '/');
                    var patientfilenames = file.FileName;
                    var fileName = $"{Path.GetExtension(file.FileName)}";
                    var path = $"{currentDir}/Dashboard/{Companyid}/MedicalPrescription/{phonenumber}/{patientfilenames}";
                    if (File.Exists(path))
                    {
                        File.Delete(path);
                        using (var stream = new FileStream(path, FileMode.Create))
                        {
                            file.CopyTo(stream);
                        }
                    }
                    else
                    {
                        using (var stream = new FileStream(path, FileMode.Create))
                        {
                            file.CopyTo(stream);
                        }
                    }


                }
                else if (lastname == "casesheet")
                {
                    var Companyid = Convert.ToInt32(CMPID);
                    var datetime = DateTime.UtcNow.Date.ToString("dd-MMM-yyyy");
                    var currentDir = Directory.GetCurrentDirectory();
                    if (!Directory.Exists(currentDir + "/Dashboard/" + Companyid + "/casesheet/" + phonenumber + '/'))
                        Directory.CreateDirectory(currentDir + "/Dashboard/" + Companyid + "/casesheet/" + phonenumber + '/');
                    var patientfilenames = file.FileName;
                    var fileName = $"{Path.GetExtension(file.FileName)}";
                    var path = $"{currentDir}/Dashboard/{Companyid}/casesheet/{phonenumber}/{patientfilenames}";
                    if (File.Exists(path))
                    {
                        File.Delete(path);
                        using (var stream = new FileStream(path, FileMode.Create))
                        {
                            file.CopyTo(stream);
                        }
                    }
                    else
                    {
                        using (var stream = new FileStream(path, FileMode.Create))
                        {
                            file.CopyTo(stream);
                        }
                    }


                }
                else if (lastname == "opticalprescription")
                {
                    var Companyid = Convert.ToInt32(CMPID);
                    var datetime = DateTime.UtcNow.Date.ToString("dd-MMM-yyyy");
                    var currentDir = Directory.GetCurrentDirectory();
                    if (!Directory.Exists(currentDir + "/Dashboard/" + Companyid + "/OpticalPrescription/" + phonenumber + '/'))
                        Directory.CreateDirectory(currentDir + "/Dashboard/" + Companyid + "/OpticalPrescription/" + phonenumber + '/');
                    var patientfilenames = file.FileName;
                    var fileName = $"{Path.GetExtension(file.FileName)}";
                    var path = $"{currentDir}/Dashboard/{Companyid}/OpticalPrescription/{phonenumber}/{patientfilenames}";
                    if (File.Exists(path))
                    {
                        File.Delete(path);
                        using (var stream = new FileStream(path, FileMode.Create))
                        {
                            file.CopyTo(stream);
                        }
                    }
                    else
                    {
                        using (var stream = new FileStream(path, FileMode.Create))
                        {
                            file.CopyTo(stream);
                        }
                    }


                }

                else if (lastname == "Others")
                {
                    var Companyid = Convert.ToInt32(CMPID);
                    var datetime = DateTime.UtcNow.Date.ToString("dd-MMM-yyyy");
                    var currentDir = Directory.GetCurrentDirectory();
                    if (!Directory.Exists(currentDir + "/Dashboard/" + Companyid + "/Others/" + phonenumber + '/'))
                        Directory.CreateDirectory(currentDir + "/Dashboard/" + Companyid + "/Others/" + phonenumber + '/');
                    var patientfilenames = file.FileName;
                    var fileName = $"{Path.GetExtension(file.FileName)}";
                    var path = $"{currentDir}/Dashboard/{Companyid}/Others/{phonenumber}/{patientfilenames}";
                    if (File.Exists(path))
                    {
                        File.Delete(path);
                        using (var stream = new FileStream(path, FileMode.Create))
                        {
                            file.CopyTo(stream);
                        }
                    }
                    else
                    {
                        using (var stream = new FileStream(path, FileMode.Create))
                        {
                            file.CopyTo(stream);
                        }
                    }


                }
                return new
                {
                    Message = true,

                };

            }
            catch (Exception ex)
            {
                return new
                {
                    Message = false,
                };
            }
        }


        public dynamic uploadProfilefile(IFormFile file, string Userid, string CMPID)
        {
            try
            {
                var Companyid = Convert.ToInt32(CMPID);
                var datetime = DateTime.UtcNow.Date.ToString("dd-MMM-yyyy");
                var currentDir = Directory.GetCurrentDirectory();
                if (!Directory.Exists(currentDir + "/USERProfile/" + Companyid + '/'))
                    Directory.CreateDirectory(currentDir + "/USERProfile/" + Companyid + '/');
                var patientfilenames = file.FileName;
                var fileName = $"{Userid}{Path.GetExtension(file.FileName)}";
                var path = $"{currentDir}/USERProfile/{Companyid}/{fileName}";
                if (File.Exists(path))
                {
                    File.Delete(path);
                    using (var stream = new FileStream(path, FileMode.Create))
                    {
                        file.CopyTo(stream);
                    }
                }
                else
                {

                    using (var stream = new FileStream(path, FileMode.Create))
                    {
                        file.CopyTo(stream);
                    }

                }

                return new
                {
                    Message = true,

                };

            }
            catch (Exception ex)
            {
                return new
                {
                    Message = false,
                };
            }
        }


        public dynamic GetdoctorImage(int CmpID, string Userdoctorid)
        {
            var reg = new RegistrationMasterViewModel();
            reg.NewSummaryImages = new List<NewSummaryImages>();
            reg.NewSummaryPDF = new List<NewSummaryPDF>();
            var currentDir = Directory.GetCurrentDirectory();

            var path = $"{currentDir}/USERProfile/{CmpID}/";

            string fullpathpng = path + Userdoctorid + ".png";
            string fullpathjpg = path + Userdoctorid + ".jpg";
            string fullpathjpeg = path + Userdoctorid + ".jpeg";
            if ((File.Exists(fullpathpng)))
            {
                string imageData = Convert.ToBase64String(File.ReadAllBytes(fullpathpng));
                var Imagedesc = "data:image/png;base64," + imageData;
                reg.ProductImage = Imagedesc;

            }
            else if ((File.Exists(fullpathjpg)))
            {
                string imageData = Convert.ToBase64String(File.ReadAllBytes(fullpathjpg));
                var Imagedesc = "data:image/png;base64," + imageData;
                reg.ProductImage = Imagedesc;

            }
            else if ((File.Exists(fullpathjpeg)))
            {
                string imageData = Convert.ToBase64String(File.ReadAllBytes(fullpathjpeg));
                var Imagedesc = "data:image/png;base64," + imageData;
                reg.ProductImage = Imagedesc;

            }

            return reg;
        }


        //var osfn = regs + ".png";
        //var osfi = "/PatientImages/";
        //var currentDir = Directory.GetCurrentDirectory();
        //string path = currentDir + osfi + osfn;
        //        if ((File.Exists(path)))
        //        {
        //            string imageData = Convert.ToBase64String(File.ReadAllBytes(path));
        //string source = imageData;
        //string base64 = source.Substring(source.IndexOf(',') + 1);
        //byte[] data = Convert.FromBase64String(base64);
        //reg.ProductImage = imageData;
        //        }

        public static String[] GetFilesFrom(String searchFolder, String[] filters, bool isRecursive)
        {
            List<String> filesFound = new List<String>();
            var searchOption = isRecursive ? SearchOption.AllDirectories : SearchOption.TopDirectoryOnly;
            foreach (var filter in filters)
            {
                filesFound.AddRange(Directory.GetFiles(searchFolder, String.Format("*.{0}", filter), searchOption));

            }
            return filesFound.ToArray();
        }

        public dynamic Insertpatientappointmentassign(RegistrationMasterViewModel PatientAssign, int userID)
        {
            var App = new Appointment();
            var Apptran = new Appointment();
            using (var dbContextTransaction = WYNKContext.Database.BeginTransaction())
            {
                try
                {
                    foreach (var item in PatientAssign.PatientAssignStatus)
                    {
                        var Fulapp = WYNKContext.Appointment.Where(x => x.RandomUniqueID == Convert.ToString(item.RegistrationTranID)).FirstOrDefault();
                        var Fulapptran = WYNKContext.AppointmentTrans.Where(x => x.AppointmentMasterID == Convert.ToString(item.RegistrationTranID) && x.Isstatus == item.StatusID).FirstOrDefault();
                        Fulapp.AppointmentdoctorID = PatientAssign.PatientAssignStatus.Select(x => x.DoctorID).FirstOrDefault();
                        WYNKContext.Entry(Fulapp).State = EntityState.Modified;
                        WYNKContext.SaveChanges();
                        Fulapptran.Doctorid = PatientAssign.PatientAssignStatus.Select(x => x.DoctorID).FirstOrDefault();
                        WYNKContext.Entry(Fulapptran).State = EntityState.Modified;
                        WYNKContext.SaveChanges();
                    }
                    if (WYNKContext.SaveChanges() >= 0)
                    {
                        dbContextTransaction.Commit();
                        return new
                        {
                            Success = true,

                        };
                    }

                }
                catch (Exception e)
                {
                    Console.Write(e);
                    dbContextTransaction.Rollback();
                }
                return new
                {
                    Success = false,
                };
            }
        }

        public dynamic GetAppointmentDetails(int CmpID, int Userid)
        {
            var RR = new RegistrationMasterViewModel();

            if (Userid == 1230)
            {
                var Appointment = WYNKContext.Appointment.Where(x => x.CMPID == CmpID).ToList();
                var Testdata = (from a in Appointment.OrderByDescending(x => x.CreatedUTC)
                                join at in WYNKContext.AppointmentTrans.OrderByDescending(x => x.CreatedUTC).Where(x => x.Isstatus == "Open") on a.RandomUniqueID equals at.AppointmentMasterID

                                select new
                                {
                                    APPID = a.RandomUniqueID,
                                    Name = a.PatientName,
                                    Age = PasswordEncodeandDecode.ToAgeString(Convert.ToDateTime(a.Dateofbirth)),
                                    Gender = a.Gender,
                                    Address = a.Address1 + "  " + a.Address2,
                                    Phone = a.Phone,
                                    Appointmentdate = at.AppointmentDateandTime,
                                    Appointmenttime = at.AppointmentTime,
                                    Appointmentcreateddatedate = at.CreatedUTC,
                                    APpointmentreasons = a.AppointmentReasons,
                                    Appoinytstatus = at.Isstatus,
                                    Cancelleddatetime = at.iscancelleddateandtime,
                                    docid = getdocname(at.Doctorid),
                                    bookedby = at.AppointmentBookedby,
                                }).ToList();

                RR.APpointmentdwtailscalender = (from c in Testdata
                                                 group c by new { c.Appointmentdate, c.Name } into i
                                                 select new APpointmentdwtailscalender
                                                 {
                                                     text = i.Select(x => x.Name).FirstOrDefault() + " - " + i.Select(x => x.APpointmentreasons).FirstOrDefault() + " (" + "Dr. " + i.Select(x => x.docid).FirstOrDefault() + " )",
                                                     startDate = i.Select(x => x.Appointmentdate).FirstOrDefault(),
                                                     endDate = ((DateTime)i.Select(x => x.Appointmentdate).FirstOrDefault()).AddMinutes(30),
                                                 }).ToList();

            }
            else
            {
                var Appointment = WYNKContext.Appointment.Where(x => x.CMPID == CmpID && x.AppointmentdoctorID == Userid).ToList();
                var Testdata = (from a in Appointment.OrderByDescending(x => x.CreatedUTC)
                                join at in WYNKContext.AppointmentTrans.OrderByDescending(x => x.CreatedUTC).Where(x => x.Isstatus == "Open" && x.Doctorid == Userid) on a.RandomUniqueID equals at.AppointmentMasterID

                                select new
                                {
                                    APPID = a.RandomUniqueID,
                                    Name = a.PatientName,
                                    Age = PasswordEncodeandDecode.ToAgeString(Convert.ToDateTime(a.Dateofbirth)),
                                    Gender = a.Gender,
                                    Address = a.Address1 + "  " + a.Address2,
                                    Phone = a.Phone,
                                    Appointmentdate = at.AppointmentDateandTime,
                                    Appointmenttime = at.AppointmentTime,
                                    Appointmentcreateddatedate = at.CreatedUTC,
                                    APpointmentreasons = a.AppointmentReasons,
                                    Appoinytstatus = at.Isstatus,
                                    Cancelleddatetime = at.iscancelleddateandtime,
                                    docid = getdocname(at.Doctorid),
                                    bookedby = at.AppointmentBookedby,
                                }).ToList();

                RR.APpointmentdwtailscalender = (from c in Testdata
                                                 group c by new { c.Appointmentdate, c.Name } into i
                                                 select new APpointmentdwtailscalender
                                                 {
                                                     text = i.Select(x => x.Name).FirstOrDefault() + " - " + i.Select(x => x.APpointmentreasons).FirstOrDefault() + " (" + "Dr. " + i.Select(x => x.docid).FirstOrDefault() + " )",
                                                     startDate = i.Select(x => x.Appointmentdate).FirstOrDefault(),
                                                     endDate = ((DateTime)i.Select(x => x.Appointmentdate).FirstOrDefault()).AddMinutes(30),
                                                 }).ToList();

            }




            return RR;
        }


        public dynamic getdocname(int? id)
        {
            var doctorname = "0";

            if (id != 0 && id != null)
            {
                var fname = CMPSContext.DoctorMaster.Where(x => x.DoctorID == id).Select(x => x.Firstname).FirstOrDefault();
                var mname = CMPSContext.DoctorMaster.Where(x => x.DoctorID == id).Select(x => x.MiddleName).FirstOrDefault();
                var lname = CMPSContext.DoctorMaster.Where(x => x.DoctorID == id).Select(x => x.LastName).FirstOrDefault();
                doctorname = fname + mname + lname;
            }
            else
            {
                doctorname = " ";
            }


            return doctorname;
        }

        public dynamic Insertpatientappointmentassignreschedulespatients(RegistrationMasterViewModel InsertPatientAssignappreshdules, int userID)
        {
            var Appdat = new Appointment();

            foreach (var item in InsertPatientAssignappreshdules.PatientAssignStatus)
            {

                var Fulapp = WYNKContext.Appointment.Where(x => x.RandomUniqueID == item.RegistrationTranID).FirstOrDefault();
                Fulapp.AppointmentdoctorID = Convert.ToInt32(InsertPatientAssignappreshdules.Eyedoctor);
                WYNKContext.Entry(Fulapp).State = EntityState.Modified;
                WYNKContext.SaveChanges();
                var Fulapptran = WYNKContext.AppointmentTrans.Where(x => x.AppointmentMasterID == item.RegistrationTranID).ToList();
                foreach (var subitem in Fulapptran)
                {
                    var apptran = WYNKContext.AppointmentTrans.Where(x => x.AppointmentTranID == subitem.AppointmentTranID).FirstOrDefault();
                    apptran.Isstatus = "Re-Assigned";
                    WYNKContext.Entry(apptran).State = EntityState.Modified;
                    WYNKContext.SaveChanges();
                }
            }

            foreach (var ssitem in InsertPatientAssignappreshdules.PatientAssignStatus)
            {

                var time = Convert.ToDateTime(InsertPatientAssignappreshdules.appointmenttime).TimeOfDay;
                var apdatetime = Convert.ToDateTime(InsertPatientAssignappreshdules.appointmentdate).Date + time;

                var appointmenttran = new Appointmenttran();
                // appointmenttran.AppointmentTranID = WYNKContext.AppointmentTrans.OrderByDescending(x => x.AppointmentTranID).Select(x => x.AppointmentTranID).FirstOrDefault() + 1;
                appointmenttran.AppointmentMasterID = Convert.ToString(ssitem.RegistrationTranID);
                appointmenttran.CMPID = InsertPatientAssignappreshdules.Cmpid;
                appointmenttran.Doctorid = Convert.ToInt32(InsertPatientAssignappreshdules.Eyedoctor);
                appointmenttran.AppointmentTime = InsertPatientAssignappreshdules.appointmenttime;
                appointmenttran.AppointmentDateandTime = apdatetime;
                appointmenttran.Isstatus = "Open";
                appointmenttran.CreatedUTC = DateTime.UtcNow;
                appointmenttran.CreatedBy = userID;
                WYNKContext.AppointmentTrans.Add(appointmenttran);
                WYNKContext.SaveChanges();
            }
            try
            {
                return new
                {
                    Success = true,
                };
            }
            catch (Exception ex)
            {
                Console.Write(ex);
            }
            return new
            {
                Success = true,
            };
        }


        public dynamic GetAppointmentDetailsforreschedules(int CmpID, string Dcotorvalue)
        {
            var RR = new RegistrationMasterViewModel();
            var Appointment = WYNKContext.Appointment.Where(x => x.CMPID == CmpID).ToList();
            var Testdata = (from a in Appointment.OrderByDescending(x => x.CreatedUTC)
                            join at in WYNKContext.AppointmentTrans.OrderByDescending(x => x.CreatedUTC).Where(x => x.CMPID == CmpID && x.Doctorid == Convert.ToInt32(Dcotorvalue) && (x.Isstatus == "Re-scheduled" || x.Isstatus == "Open")) on a.RandomUniqueID equals at.AppointmentMasterID
                            //  group a by new {a.Phone} into i
                            select new
                            {
                                APPID = a.RandomUniqueID,
                                appointmnentranid = at.AppointmentTranID,
                                lname = a.LastName,
                                Name = a.PatientName,
                                Age = PasswordEncodeandDecode.ToAgeString(Convert.ToDateTime(a.Dateofbirth)),
                                Gender = a.Gender,
                                Address = a.Address1 + "  " + a.Address2,
                                Phone = a.Phone,
                                Appointmentdate = at.AppointmentDateandTime,
                                Appointmentcreateddatedate = at.CreatedUTC,
                                APpointmentreasons = a.AppointmentReasons,
                                Appoinytstatus = at.Isstatus,
                                Cancelleddatetime = at.iscancelleddateandtime,
                                docid = getdocname(at.Doctorid),
                                Doctoruserid = at.Doctorid,
                                bookedby = at.AppointmentBookedby,
                                Appointmenttime = at.AppointmentTime,
                            }).ToList();


            RR.APpointmentdwtailss = (from c in Testdata
                                      group c by new { c.APPID } into i
                                      select new APpointmentdwtails
                                      {
                                          APPID = i.Select(x => x.APPID).FirstOrDefault(),
                                          LName=i.Select(x =>x.lname).FirstOrDefault(),
                                          appointmnentranid = i.Select(x => x.appointmnentranid).FirstOrDefault(),
                                          Name = i.Select(x => x.Name).FirstOrDefault(),
                                          Age = i.Select(x => x.Age).FirstOrDefault(),
                                          Gender = i.Select(x => x.Gender).FirstOrDefault(),
                                          Address = i.Select(x => x.Address).FirstOrDefault(),
                                          Phone = i.Select(x => x.Phone).FirstOrDefault(),
                                          Apptime = i.Select(x => x.Appointmenttime).FirstOrDefault(),
                                          Appointmentdate = i.Select(x => x.Appointmentdate).FirstOrDefault(),
                                          Appointmentcreateddatedate = i.Select(x => x.Appointmentcreateddatedate).FirstOrDefault(),
                                          APpointmentreasons = i.Select(x => x.APpointmentreasons).FirstOrDefault(),
                                          Appoinytstatus = i.Select(x => x.Appoinytstatus).FirstOrDefault(),
                                          Cancelleddatetime = i.Select(x => x.Cancelleddatetime).FirstOrDefault(),
                                          Doctorid = i.Select(x => x.docid).FirstOrDefault(),
                                          Appointmentbookedby = i.Select(x => x.bookedby).FirstOrDefault(),
                                          Doctoruserid = i.Select(x => x.Doctoruserid).FirstOrDefault(),
                                      }).ToList();

            return RR;
        }


        public dynamic Cancelappointment(RegistrationMasterViewModel InsertPatientAssignappreshdules, int userID)
        {

            var apptranid = InsertPatientAssignappreshdules.Appointmentmemberd;
            var cmpid = userID;
            foreach (var item in InsertPatientAssignappreshdules.APpointmentdwtailss)
            {

                var apptrandetails = WYNKContext.AppointmentTrans.Where(x => x.CMPID == cmpid && x.AppointmentTranID == Convert.ToInt32(apptranid)).FirstOrDefault();
                apptrandetails.Isstatus = "Cancelled";
                apptrandetails.Cancelledby = "Doctor";
                apptrandetails.iscancelleddateandtime = DateTime.UtcNow;
                apptrandetails.iscancelledreason = InsertPatientAssignappreshdules.AppointmentCancellationReasons;
                apptrandetails.UpdatedUTC = DateTime.UtcNow;
                WYNKContext.UpdateRange(apptrandetails);
                WYNKContext.SaveChanges();
            }

            try
            {
                if (WYNKContext.SaveChanges() >= 0)
                {
                    return new
                    {
                        Success = true,
                    };
                }
            }
            catch (Exception Ex)
            {
                Console.Write(Ex);
            }
            return new
            {
                Success = false
            };
        }



        public dynamic Getpaymentid(string CmpID, string Phonenumber, string Userdoctorid, int comapnyid, string phone)
        {
            var RR = new RegistrationMasterViewModel();
            var Currencycode = CMPSContext.Setup.Where(x => x.CMPID == comapnyid).Select(x => x.Country).FirstOrDefault();
            var currency = CMPSContext.Country.Where(x => x.ID == Convert.ToInt32(Currencycode)).Select(x => x.CountryCode.Trim()).FirstOrDefault();
            var companyname = CMPSContext.Company.Where(x => x.CmpID == comapnyid).Select(x => x.CompanyName).FirstOrDefault();
            var Mesagestatus = "";
            var payid = "";
            var Paymentstatus = "";

            try
            {

                RazorpayClient client = new RazorpayClient("rzp_test_Ik1hwWvpC4t8PD", "dPxKVrNxpL1hA3AV8Ya5kBQm");
                Dictionary<string, object> options = new Dictionary<string, object>();
                Dictionary<string, string> customer = new Dictionary<string, string>();
                customer.Add("name", CmpID);
                customer.Add("email", Phonenumber);
                customer.Add("contact", phone);
                options.Add("customer", customer);
                options.Add("type", "link");
                options.Add("amount", Convert.ToInt32(Userdoctorid + "00"));
                options.Add("currency", currency);
                options.Add("description", companyname);
                Invoice ObjInvoice = new Invoice().Create(options);
                var InvoiceId = Convert.ToString(ObjInvoice["order_id"]);
                //var paymentdet = client.Order.Fetch(InvoiceId);
                for (; ; )
                {
                    var paymentdet = client.Order.Fetch(InvoiceId);
                    var paymentstatus = Convert.ToString(paymentdet["status"]);

                    if (paymentstatus == "paid")
                    {

                        break;

                    }
                    else
                    {
                        continue;
                    }
                }
                return new
                {
                    payid = InvoiceId,
                    Paymentstatus = "paid",
                    success = true,
                };
            }
            catch (Exception ex)
            {
                Mesagestatus = ex.Message;

                Paymentstatus = "failed";

            }
            return new
            {
                Paymentstatus = "failed",
                success = false,

            };
        }

        public dynamic validatepaymentid(string Paymentid)
        {
            var RR = new RegistrationMasterViewModel();
            var Mesagestatus = "";
            try
            {
                RazorpayClient client = new RazorpayClient("rzp_test_Ik1hwWvpC4t8PD", "dPxKVrNxpL1hA3AV8Ya5kBQm");
                Dictionary<string, object> options = new Dictionary<string, object>();
                Dictionary<string, string> customer = new Dictionary<string, string>();
                Payment payment = client.Payment.Fetch(Paymentid);

                return new
                {
                    success = true,
                };
            }
            catch (Exception ex)
            {
                if (ex.InnerException.Message != null)
                {
                    Mesagestatus = ex.InnerException.Message;
                }
                else
                {
                    Mesagestatus = ex.Message;
                }

            }
            return new
            {
                success = false,

            };
        }
        public dynamic Getdoctorappointments(int CmpID, string Userdoctorid, string date)
        {
            var listdata = new AppointmentView();
            var orgdate = Convert.ToDateTime(date);
            var day = orgdate.ToString("dddd");
            var de = CMPSContext.DoctorExtension.Where(x => x.CMPID == CmpID && x.DoctorID == Convert.ToInt32(Userdoctorid) && x.Day == day && x.IsDeleted == false).FirstOrDefault();
            if (de != null)
            {
                listdata.firstfromTime = de.FSFromTime;
                listdata.firsttoTime = de.FSToTime;
                listdata.secondfromTime = de.SSFromTime;
                listdata.sectoTime = de.SSToTime;
            }
            else
            {
                var setupdata = CMPSContext.Setup.Where(x => x.CMPID == CmpID).FirstOrDefault();
                listdata.firstfromTime = setupdata.FSFromTime;
                listdata.firsttoTime = setupdata.FSToTime;
                listdata.secondfromTime = setupdata.SSFromTime;
                listdata.sectoTime = setupdata.SSToTime;
            }
            var appointmentdata = WYNKContext.AppointmentTrans.Where(x => x.CMPID == CmpID && x.Doctorid == Convert.ToInt32(Userdoctorid) && Convert.ToDateTime(x.AppointmentDateandTime).Date == orgdate.Date).ToList();
            listdata.APpointmentpatientdetails = (from ap in appointmentdata
                                                  select new APpointmentpatientdetails
                                                  {
                                                      Date = Convert.ToDateTime(ap.AppointmentDateandTime).ToString("dd-MMM-yyyy"),
                                                      Time = ap.AppointmentTime,
                                                  }).OrderBy(x => x.Time).ToList();
            return listdata;
        }


        public dynamic Bookappointmentforpatients(int CmpID, int Userdoctorid, string date, string panme,
            string phone, string email, string time, string gender, int age, string Lname, decimal fees)
        {
            var cmpname = CMPSContext.Company.Where(x => x.CmpID == CmpID).Select(x => x.CompanyName).FirstOrDefault();
            var UIN = "";
            var invoiceorderid = "";
            var paymentfailedstatus = "";;
            try
            {
                RazorpayClient client = new RazorpayClient("rzp_test_Ik1hwWvpC4t8PD", "dPxKVrNxpL1hA3AV8Ya5kBQm");
                Dictionary<string, object> options = new Dictionary<string, object>();
                Dictionary<string, string> customer = new Dictionary<string, string>();
                customer.Add("name", panme);
                customer.Add("email", email);
                customer.Add("contact", phone);
                options.Add("customer", customer);
                options.Add("type", "link");
                options.Add("amount", fees + "00");
                options.Add("currency", "INR");
                options.Add("description", cmpname);
                Invoice ObjInvoice = new Invoice().Create(options);
                var InvoiceId = Convert.ToString(ObjInvoice["order_id"]);


                for (; ; )
                {
                    var paymentdet = client.Order.Fetch(InvoiceId);                                       
                    var ppayments = paymentdet.Payments();
            
                    if (ppayments.Count != 0)
                    {                        
                        var paymentstatusss = ppayments[0];
                        var paymentstatus = paymentstatusss["status"];                        
                        if (paymentstatus == "captured")
                        {
                            var runnimnumber = CMPSContext.NumberControl.Where(x => x.CmpID == CmpID && x.Description == "APPOINTMENT").FirstOrDefault();
                            var runnimnumbervocher = runnimnumber.RunningNumber;
                            var listdata = new AppointmentView();
                            var app = new Appointment();
                            app.RandomUniqueID = PasswordEncodeandDecode.GetRandomnumber();
                            app.CMPID = CmpID;
                            app.PatientName = panme;
                            app.LastName = Lname;
                            app.ConsulationFees = fees;
                            if (runnimnumbervocher == 0)
                            {
                                var rn = 1;
                                app.UIN = runnimnumber.Prefix + rn + runnimnumber.Suffix;
                            }
                            else
                            {
                                var rn = runnimnumbervocher + 1;
                                app.UIN = runnimnumber.Prefix + rn + runnimnumber.Suffix;
                            }
                            app.Gender = gender;
                            app.Dateofbirth = DateTime.UtcNow.AddYears(-age);
                            app.Phone = phone;
                            app.AppointmentdoctorID = Userdoctorid;
                            app.AppointmentReasons = "NULL";
                            app.IsVisited = false;
                            app.CreatedUTC = DateTime.UtcNow;
                            app.CreatedBy = 1;
                            WYNKContext.Appointment.AddRange(app);
                            WYNKContext.SaveChanges();
                            UIN = app.UIN;
                            invoiceorderid = InvoiceId;
                            var apptran = new Appointmenttran();
                            apptran.AppointmentMasterID = app.RandomUniqueID;
                            apptran.CMPID = CmpID;
                            apptran.Doctorid = Userdoctorid;
                            apptran.AppointmentTime = DateTime.ParseExact(time, "HH:mm", null).AddMinutes(1).ToString("HH:mm");
                            apptran.AppointmentDateandTime = Convert.ToDateTime(date);
                            apptran.Isstatus = "Open";
                            apptran.CreatedUTC = DateTime.UtcNow;
                            apptran.CreatedBy = 1;
                            WYNKContext.AppointmentTrans.AddRange(apptran);
                            WYNKContext.SaveChanges();

                            var number = CMPSContext.NumberControl.Where(x => x.CmpID == CmpID && x.Description == "APPOINTMENT").FirstOrDefault();
                            number.RunningNumber = runnimnumber.RunningNumber + 1;
                            CMPSContext.Entry(number).State = EntityState.Modified;
                            CMPSContext.SaveChanges();

                            break;

                        }
                        else if (paymentstatus == "failed")
                        {
                            paymentfailedstatus = "Transaction Failed";
                            break;
                        }
                        else
                        {
                            continue;
                        }
                    }
                    else
                    {
                        continue;
                    }
                    
                  
                }
                return new
                {
                    payid = UIN,
                    Paymentstatus = "paid",
                    failedpayment = paymentfailedstatus,
                    success = true,
                    companyname = CMPSContext.Company.Where(x => x.CmpID == CmpID).Select(x => x.CompanyName).FirstOrDefault(),
                    companyad1 = CMPSContext.Company.Where(x => x.CmpID == CmpID).Select(x => x.Address1).FirstOrDefault(),
                    companyad2 = CMPSContext.Company.Where(x => x.CmpID == CmpID).Select(x => x.Address2).FirstOrDefault(),
                    companyad3 = CMPSContext.Company.Where(x => x.CmpID == CmpID).Select(x => x.Address3).FirstOrDefault(),
                    companyphone = CMPSContext.Company.Where(x => x.CmpID == CmpID).Select(x => x.Phone1).FirstOrDefault(),
                    pname = panme,
                    page = age,
                    pgenderr = gender,
                    pphone = phone,
                    feess = 200,
                    Paymentid = invoiceorderid,
                };
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);

            }
            return new
            {
                Paymentstatus = "failed",
                success = false,

            };
        }


        public dynamic BookappointmentforpatientsInsideappointment(int CmpID, int Userdoctorid, string date, string panme, string phone,
            string Address, string time, string gender, int age, string apptreason, string lname, decimal fees)
        {
            var UIN = "";
            using (var dbContextTransaction = WYNKContext.Database.BeginTransaction())
            {
                try
                {
                    var runnimnumber = CMPSContext.NumberControl.Where(x => x.CmpID == CmpID && x.Description == "APPOINTMENT").FirstOrDefault();
                    var runnimnumbervocher = runnimnumber.RunningNumber;
                    var listdata = new AppointmentView();
                    var app = new Appointment();
                    app.RandomUniqueID = PasswordEncodeandDecode.GetRandomnumber();
                    app.CMPID = CmpID;
                    app.PatientName = panme;
                    app.LastName = lname;
                    app.ConsulationFees = fees;
                    if (runnimnumbervocher == 0)
                    {
                        var rn = 1;
                        app.UIN = runnimnumber.Prefix + rn + runnimnumber.Suffix;
                    }
                    else
                    {
                        var rn = runnimnumbervocher + 1;
                        app.UIN = runnimnumber.Prefix + rn + runnimnumber.Suffix;
                    }
                    app.Gender = gender;
                    app.Dateofbirth = DateTime.UtcNow.AddYears(-age);
                    app.Phone = phone;
                    app.Address1 = Address;
                    app.AppointmentdoctorID = Userdoctorid;
                    app.AppointmentReasons = "NULL";
                    app.IsVisited = false;
                    app.CreatedUTC = DateTime.UtcNow;
                    app.AppointmentReasons = apptreason;
                    app.CreatedBy = 1;
                    WYNKContext.Appointment.AddRange(app);
                    WYNKContext.SaveChanges();
                    UIN = app.UIN;
                    var apptran = new Appointmenttran();
                    apptran.AppointmentMasterID = app.RandomUniqueID;
                    apptran.CMPID = CmpID;
                    apptran.Doctorid = Userdoctorid;
                    apptran.AppointmentTime = DateTime.ParseExact(time, "HH:mm", null).AddMinutes(1).ToString("HH:mm");
                    apptran.AppointmentDateandTime = Convert.ToDateTime(date);
                    apptran.Isstatus = "Open";
                    apptran.CreatedUTC = DateTime.UtcNow;
                    apptran.CreatedBy = 1;
                    WYNKContext.AppointmentTrans.AddRange(apptran);
                    WYNKContext.SaveChanges();

                    var number = CMPSContext.NumberControl.Where(x => x.CmpID == CmpID && x.Description == "APPOINTMENT").FirstOrDefault();
                    number.RunningNumber = runnimnumber.RunningNumber + 1;
                    CMPSContext.Entry(number).State = EntityState.Modified;
                    CMPSContext.SaveChanges();
                    dbContextTransaction.Commit();
                    return new
                    {
                        payid = UIN,
                        success = true,
                    };
                }
                catch (Exception ex)
                {
                    dbContextTransaction.Rollback();                    
                    ErrorLog oErrorLog = new ErrorLog();
                    oErrorLog.WriteErrorLog("Appointment Error :", ex.InnerException.Message.ToString());                    
                    Console.Write(ex);
                    string msg = ex.InnerException.Message;
                }
                return new
                {
                    success = false,
                    
            };

            }
        }
        ////////////////////////////////////////////////////////////
    }
}
