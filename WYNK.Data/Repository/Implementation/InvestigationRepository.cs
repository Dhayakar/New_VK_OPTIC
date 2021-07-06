using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using WYNK.Data.Common;
using WYNK.Data.Model;
using WYNK.Data.Model.ViewModel;
using WYNK.Data.Repository.Operation;
using WYNK.Helpers;


namespace WYNK.Data.Repository.Implementation
{
    class InvestigationRepository : RepositoryBase<InvestigationImage>, IInvestigationRepository
    {
        private readonly WYNKContext _Wynkcontext;
        private readonly CMPSContext _Cmpscontext;
        
        public InvestigationRepository(WYNKContext context, CMPSContext Cmpscontext) : base(context, Cmpscontext)
        {
            _Wynkcontext = context;
            _Cmpscontext = Cmpscontext;

        }




        public InvestigationImage GetPatDetails(string uin, int cmpid, string GMT)

        {
            var invv = new InvestigationImage();
            invv.Investigation = new InvestigationImages();
            invv.INV = new List<InvestigationImages>();
            invv.InvImg = new List<InvImg>();
            invv.InvDet = new List<InvDet>();
            invv.PaymentMaster = new List<Payment_Master>();
            invv.PatDetails = new List<PatDetails>();

            var doct = CMPSContext.DoctorMaster.ToList();
            var invpre = WYNKContext.InvestigationPrescription.ToList();
            var use = CMPSContext.Users.ToList();
            var cmp = CMPSContext.Company.ToList();


            //TimeSpan ts = TimeSpan.Parse(GMT);

            

            var doctor = (from IP in invpre.Where(x => x.Status == "Open" && x.isbilled == false && x.UIN == uin && x.CMPID == cmpid).OrderByDescending(x =>x.CreatedUTC)
                          join US in use on IP.CreatedBy equals US.Userid
                          join DOC in doct on US.Username equals DOC.EmailID



                          select new
                          {
                              rid = IP.RegistrationTranID,
                              ipid = IP.RandomUniqueID,
                              PrescribedDate = IP.CreatedUTC,
                              //PrescribedDate = IP.CreatedUTC.Add(ts),  
                              PrescribedBy = DOC.Firstname + " " + DOC.MiddleName + " " + DOC.LastName,
                              Remarks = IP.Remarks,
                          }

                            ).ToList();

            var admin = (from IP in invpre.Where(x => x.Status == "Open" && x.isbilled == false && x.UIN == uin && x.CMPID == cmpid).OrderByDescending(x => x.CreatedUTC)
                         join us in use on IP.CreatedBy equals us.Userid
                         join cm in cmp on us.Username equals cm.EmailID

                         select new
                         {
                             rid = IP.RegistrationTranID,
                             ipid = IP.RandomUniqueID,
                             PrescribedDate = IP.CreatedUTC,
                             //PrescribedDate = IP.CreatedUTC.Add(ts),
                             PrescribedBy = "Admin",
                             Remarks = IP.Remarks,
                         }

                            ).ToList();



            var docadm = doctor.Concat(admin);



            invv.PatientBillDetailsim = (from res in docadm.OrderByDescending(x => x.PrescribedDate)

                                         select new PatientBillDetailsim
                                         {
                                             rid = res.rid,
                                             ipid = res.ipid,
                                             PrescribedDate = res.PrescribedDate,
                                             PrescribedBy = res.PrescribedBy,
                                             Remarks = res.Remarks,
                                         }

                            ).ToList();


            return invv;


        }



        public InvestigationImage GetUINDetails(int cid)
        {

            var invv = new InvestigationImage();
            invv.Investigation = new InvestigationImages();
            invv.INV = new List<InvestigationImages>();
            invv.InvImg = new List<InvImg>();
            invv.InvDet = new List<InvDet>();
            invv.PaymentMaster = new List<Payment_Master>();
            invv.PatDetails = new List<PatDetails>();

            var reg = WYNKContext.Registration.ToList();
            var regtr = WYNKContext.RegistrationTran.ToList();




            var uininv = (from R in reg.Where(x => x.CMPID == cid)
                          join RT in regtr
                          on R.UIN equals RT.UIN


                          select new
                          {
                              UIN = R.UIN,
                              name = R.Name + " " + R.MiddleName + " " + R.LastName,
                              gender = R.Gender,
                              rid = RT.RegistrationTranID,
                              age = PasswordEncodeandDecode.ToAgeString(R.DateofBirth),
                              addr1 = R.Address1,
                              addr2 = R.Address2,
                              addr3 = R.Address3,
                              phone = R.Phone,

                          }).ToList();
            //MP.Select(x => x.UIN).FirstOrDefault(),
            invv.UinDett = (from RE in uininv.GroupBy(x => x.UIN)

                            select new UinDett
                            {
                                UIN = RE.Select(x => x.UIN).FirstOrDefault(),
                                name = RE.Select(x => x.name).FirstOrDefault(),
                                gender = RE.Select(x => x.gender).FirstOrDefault(),
                                rid = RE.Select(x => x.rid).FirstOrDefault(),
                                age = RE.Select(x => x.age).FirstOrDefault(),
                                addr1 = RE.Select(x => x.addr1).FirstOrDefault(),
                                addr2 = RE.Select(x => x.addr2).FirstOrDefault(),
                                addr3 = RE.Select(x => x.addr3).FirstOrDefault(),
                                phone = RE.Select(x => x.phone).FirstOrDefault(),

                            }).ToList();


            return invv;
        }



        public InvestigationImage GetInvpastDetails(int cmpid, string uin)

        {
            var invim = new InvestigationImage();
            invim.Investigation = new InvestigationImages();
            invim.INV = new List<InvestigationImages>();
            invim.InvImg = new List<InvImg>();
            invim.InvDet = new List<InvDet>();
            invim.PatDetails = new List<PatDetails>();

            invim.PastDetails = (from INN in WYNKContext.InvestigationImages.Where(x => x.CmpID == cmpid && x.UIN == uin).GroupBy(x => x.RegistrationTranID)

                                 select new PastDetails
                                 {
                                     uin = INN.Select(x => x.UIN).FirstOrDefault(),
                                     InvDate = INN.Select(x => x.CreatedUTC).FirstOrDefault(),
                                     ImgcapLoc = INN.Select(x => x.ImageCapturedLocation).FirstOrDefault(),
                                     ExtInt = INN.Select(x => x.ExternalInternal).FirstOrDefault(),
                                     Address1 = INN.Select(x => x.Address1).FirstOrDefault(),
                                     Address2 = INN.Select(x => x.Address2).FirstOrDefault(),
                                     ReferredBy = INN.Select(x => x.ReferredBy).FirstOrDefault(),
                                     Remarks = INN.Select(x => x.Remarks).FirstOrDefault(),

                                 }).ToList();


            return invim;


        }





        public InvestigationImage GetInvpresDetails(string ID)

        {
            var invv = new InvestigationImage();
            invv.Investigation = new InvestigationImages();
            invv.INV = new List<InvestigationImages>();
            invv.InvImg = new List<InvImg>();
            invv.InvDet = new List<InvDet>();
            invv.PaymentMaster = new List<Payment_Master>();
            invv.PatDetails = new List<PatDetails>();

            var invpre = WYNKContext.InvestigationPrescription.ToList();
            var invtr = WYNKContext.InvestigationPrescriptionTran.ToList();
            var one = CMPSContext.Services.ToList();


            invv.PatDetails = (from IP in invpre.Where(x => x.RandomUniqueID == Convert.ToString(ID))
                               join IM in invtr
                               on IP.RandomUniqueID equals IM.IPID
                               join OLM in one
                               on IM.InvestigationID equals OLM.ID

                               select new PatDetails
                               {
                                   Uin = IP.UIN,
                                   idd = IP.RandomUniqueID,
                                   DOI = IP.Dateofinvestigation,
                                   Remarks = IP.Remarks,
                                   Desc = OLM.Description,
                                   rd = IP.RegistrationTranID,
                               }

                              ).ToList();






            return invv;


        }


        public InvestigationImage GetInvpresTranDetails(string ID, int NO)

        {
            var inn = new InvestigationImage();
            inn.Investigation = new InvestigationImages();
            inn.INV = new List<InvestigationImages>();
            inn.InvImg = new List<InvImg>();
            inn.InvDet = new List<InvDet>();
            inn.PatDetails = new List<PatDetails>();
            var invpr = WYNKContext.InvestigationPrescription.ToList();
            var invtr = WYNKContext.InvestigationPrescriptionTran.ToList();
            var one = CMPSContext.Services.ToList();

            inn.InvDetails = (from IP in invpr.Where(x => x.UIN == ID && x.RandomUniqueID == Convert.ToString( NO))
                              join IPT in invtr on
                              IP.RandomUniqueID equals IPT.IPID
                              join OLM in one on
                              IPT.InvestigationID equals OLM.ID

                              select new InvDetails
                              {
                                  Desc = OLM.Description,
                                  rd = IP.RegistrationTranID,
                                  Cost = IPT.Amount,

                              }

                              ).ToList();


            return inn;


        }




        public dynamic UpdateInv(InvestigationImage Investigation, string UIN, int IID)
        {



            Investigation.InvGroup = (from IN in Investigation.INV.GroupBy(x => x.InvestigationID)
                                      select new InvGroup
                                      {
                                          id = IN.Key,
                                          Amount = IN.Select(x => x.InvestigationAmount).FirstOrDefault(),
                                          uid = IN.Select(x => x.InvestigationDescription).FirstOrDefault(),
                                          cid = IN.Select(x => x.CmpID).FirstOrDefault(),
                                          tid = IN.Select(x => x.TaxID).FirstOrDefault(),
                                          tper = IN.Select(x => x.TaxPercentage).FirstOrDefault(),
                                          tval = IN.Select(x => x.TaxValue).FirstOrDefault(),
                                          dper = IN.Select(x => x.DiscountPercentage).FirstOrDefault(),
                                          dval = IN.Select(x => x.DiscountValue).FirstOrDefault(),
                                          toval = IN.Select(x => x.TotalValue).FirstOrDefault(),
                                      }).ToList();


            var invesimgs = new InvestigationTran();
            if (Investigation.INV.Count() > 0)
            {
                foreach (var item1 in Investigation.InvGroup.ToList())

                {


                    invesimgs.InvestigationID = item1.id;
                    invesimgs.CmpID = item1.cid;
                    invesimgs.InvestigationTakenOn = DateTime.Now.Date;
                    invesimgs.InvestigationAmount = item1.Amount;
                    invesimgs.TaxID = item1.tid;
                    invesimgs.TaxPercentage = item1.tper;
                    invesimgs.TaxValue = item1.tval;
                    invesimgs.DiscountPercentage = item1.dper;
                    invesimgs.DiscountValue = item1.dval;
                    invesimgs.TotalValue = item1.toval;
                    invesimgs.IsBilled = false;
                    invesimgs.CreatedUTC = DateTime.Now;
                    invesimgs.CreatedBy = Investigation.uid;
                    WYNKContext.InvestigationTran.AddRange(invesimgs);
                    
                    WYNKContext.SaveChanges();
                }
            }



            if (Investigation.INV.Count() > 0)
            {
                foreach (var item in Investigation.INV.ToList())

                {


                    var invesimg = new InvestigationImages();
                    var invid = invesimgs.ID;

                    invesimg.CmpID = item.CmpID;
                    invesimg.UIN = Investigation.Investigation.UIN;
                    invesimg.RegistrationTranID = Investigation.Investigation.RegistrationTranID;
                    invesimg.InvestigationID = item.InvestigationID;
                    invesimg.InvestigationDescription = item.InvestigationDescription;
                    invesimg.InvestigationAmount = item.InvestigationAmount;
                    invesimg.TaxID = item.TaxID;
                    invesimg.TaxPercentage = item.TaxPercentage;
                    invesimg.TaxValue = item.TaxValue;
                    invesimg.DiscountPercentage = item.DiscountPercentage;
                    invesimg.DiscountValue = item.DiscountValue;
                    invesimg.TotalValue = item.TotalValue;
                    invesimg.ImageLocation = item.ImageLocation;
                    invesimg.Remarks = item.Remarks;
                    invesimg.InvestigationTranID = invid;
                    invesimg.IsDeleted = false;
                    invesimg.CreatedUTC = DateTime.Now;
                    invesimg.CreatedBy = Investigation.uid;
                    WYNKContext.InvestigationImages.AddRange(invesimg);
                    ErrorLog oErrorLogstran = new ErrorLog();
                    object namestr = invesimg;
                    oErrorLogstran.WriteErrorLogArray("Investigation Image upload", namestr);

                }

                var phonenumber = WYNKContext.Registration.Where(x => x.UIN == Investigation.Investigation.UIN).Select(x => x.Phone).FirstOrDefault();
                var Patientfirstname = WYNKContext.Registration.Where(x => x.UIN == Investigation.Investigation.UIN).Select(x => x.Name).FirstOrDefault();
                var Patientlastname = WYNKContext.Registration.Where(x => x.UIN == Investigation.Investigation.UIN).Select(x => x.LastName).FirstOrDefault();
                var Uploadeddatetime = DateTime.Now.ToString("dd-MMM-yyyy HH:mm");
                var fullname = Patientfirstname + ' ' + Patientlastname;
                var Uploadedby = "";
                var sumcount = Investigation.INV.Count();
                var Invdescription = Investigation.INV.Select(x =>x.InvestigationDescription).FirstOrDefault();
                var Invremarks = Investigation.INV.Select(x => x.Remarks).FirstOrDefault();
                var Createdid = CMPSContext.Users.Where(x => x.Userid == Investigation.uid).Select(x => x.Username).FirstOrDefault();
                var Createdtag = CMPSContext.Users.Where(x => x.Userid == Investigation.uid).Select(x => x.ReferenceTag).FirstOrDefault();
                var CMPID = Investigation.INV.Select(x => x.CmpID).FirstOrDefault();
                var companyname = CMPSContext.Company.Where(x => x.CmpID == CMPID).Select(x => x.CompanyName).FirstOrDefault();
                if (Createdtag == "A")
                {
                    Uploadedby = "Admin" + " - " + "(" + Createdid + ")";
                }
                else if (Createdtag == "D" || Createdtag == "O" || Createdtag == "V")
                {
                    var fname = GetConcatName(CMPSContext.DoctorMaster.Where(x => x.EmailID == Createdid).Select(x => x.Firstname).FirstOrDefault());
                    var mname = GetConcatName(CMPSContext.DoctorMaster.Where(x => x.EmailID == Createdid).Select(x => x.MiddleName).FirstOrDefault());
                    var lname = GetConcatName(CMPSContext.DoctorMaster.Where(x => x.EmailID == Createdid).Select(x => x.LastName).FirstOrDefault());
                    Uploadedby = fname + ' ' + mname + ' ' + lname;
                }
                else
                {
                    var fjoinname = CMPSContext.EmployeeCommunication.Where(x => x.EmailID == Createdid).Select(x => x.EmpID).FirstOrDefault();
                    var fname = GetConcatName(CMPSContext.Employee.Where(x => x.EmployeeID == fjoinname).Select(x => x.FirstName).FirstOrDefault());
                    var mname = GetConcatName(CMPSContext.Employee.Where(x => x.EmployeeID == fjoinname).Select(x => x.MiddleName).FirstOrDefault());
                    var lname = GetConcatName(CMPSContext.Employee.Where(x => x.EmployeeID == fjoinname).Select(x => x.LastName).FirstOrDefault());
                    Uploadedby = fname + ' ' + mname + ' ' + lname;
                }

                if(phonenumber != null)
                {

                    string usersid = "cmpsadmin";
                    string apikey = "UMrCTzVADqibrFY4PAto";
                    object mobile = phonenumber;
                    string msgtext = Investigation.Investigation.UIN + " - "+ fullname + "\n"+ Uploadeddatetime + "\n" + "Under "+ Invdescription+' '+ sumcount + " Images uploaded by "+'-'+ Uploadedby + "\n" +"Remarks - "+ Invremarks + "\n" + companyname;
                    var client = new WebClient();
                    var baseurl = "http://smshorizon.co.in/api/sendsms.php?user=" + usersid + "&apikey=" + apikey + "&number=" + mobile + "&message=" + msgtext + "&senderid=CMPSIN&type=txt";
                    var data = client.OpenRead(baseurl);
                    var reader = new StreamReader(data);
                    var response = reader.ReadToEnd();
                    string smssucces = response;
                    data.Close();
                    reader.Close();
                    object messagebox = "msg saved";
                    object text = "tt";
                }



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
                        Uin = Investigation.Investigation.UIN,

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


        public string GetConcatName(string Name)
        {
            var S = " ";
            var G = Name;
            if (G != null)
            {
                S = G;
            }

            return S;
        }

        public dynamic UpdateInvestigation(InvestigationImage Investigation, string UIN, int ipid)
        {

            var inv = new InvestigationImages();

            var ids = WYNKContext.InvestigationImages.Where(x => x.UIN == UIN && x.CreatedUTC.Date == DateTime.Now.Date).ToList();

            if (ids != null && ids.Count != 0)
            {

                ids.All(x =>
                {
                    x.ExternalInternal = Investigation.Investigation.ExternalInternal; x.ImageCapturedLocation = Investigation.Investigation.ImageCapturedLocation; x.Address1 = Investigation.Investigation.Address1;
                    x.Address2 = Investigation.Investigation.Address2;
                    //x.Remarks = Investigation.Investigation.Remarks;
                    x.ReferredBy = Investigation.Investigation.ReferredBy; return true;
                });
                WYNKContext.InvestigationImages.UpdateRange(ids);
            }

            var regid = WYNKContext.InvestigationPrescription.Where(x => x.UIN == Investigation.Investigation.UIN).Select(x => x.RegistrationTranID).LastOrDefault();

            var master = WYNKContext.InvestigationPrescription.Where(x => x.RandomUniqueID == Convert.ToString(ipid)).ToList();
            if (master != null)
            {

                master.All(x => { x.Status = "Closed"; return true; });
                WYNKContext.InvestigationPrescription.UpdateRange(master);
            }



            try
            {
                if (WYNKContext.SaveChanges() >= 0)
                    return new
                    {
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


        public bool uploadImag(IFormFile file1, string desc, string uin, string id)
        {
            var inves = new InvestigationImage();
            inves.Investigation = new InvestigationImages();
            inves.INV = new List<InvestigationImages>();
            try
            {
                var ivid = WYNKContext.InvestigationImages.Where(x => x.UIN == id && x.InvestigationDescription == uin).Select(x => x.ID).LastOrDefault();
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
                    var opbio = WYNKContext.InvestigationImages.Where(x => x.UIN == id && x.InvestigationDescription == uin && x.CreatedUTC.Date == DateTime.Now.Date && x.ImageLocation == "Test").ToList();
                    if (opbio.Count() > 0)
                    {

  


                        foreach (var item1 in opbio.ToList())
                        {                            
                            item1.ImageLocation = pathh;
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




        public dynamic Getimage(string UIN)
        {
            var inv = new InvestigationImage();
            inv.Investigation = new InvestigationImages();
            inv.INV = new List<InvestigationImages>();
            inv.InvImg = new List<InvImg>();
            var regs = WYNKContext.InvestigationImages.Where(x => x.UIN == UIN).Select(x => x.ImageLocation).ToList();
            var res = WYNKContext.InvestigationImages.Where(x => x.UIN == UIN).Select(x => x.InvestigationDescription).ToList();
            
            inv.Registration = WYNKContext.Registration.Where(x => x.UIN == UIN).FirstOrDefault();
            var groups = WYNKContext.InvestigationImages.Where(x => x.UIN == UIN).OrderByDescending(x => x.CreatedUTC).GroupBy(x => x.ImageLocation);//ImageLocation
            inv.Imagedata = (from IN in groups
                             select new Imagedata
                             {
                                 idd = IN.Key,
                                 cont = IN.Count(),
                                 Descs = IN.Select(X => X.ImageLocation).FirstOrDefault(),
                                 rmrks = IN.Select(X => X.Remarks).FirstOrDefault(),
                                 ImDescs = IN.Select(X => X.InvestigationDescription).FirstOrDefault(),
                                 dttms = IN.Select(X => X.CreatedUTC).FirstOrDefault(),
                             }).ToList();
            if (inv.Imagedata != null)
            {


                var rest = inv.Imagedata.Sum(x => x.cont);
                inv.stringArray = new string[rest];

                var list1 = new List<samplelist>();

                foreach (var item1 in inv.Imagedata.ToList())

                {

                    var ress = item1.cont;

                    var list2 = new samplelist();
                    list2.Uin = ress;
                    list1.Add(list2);

                    var cv = list1.Sum(x => x.Uin);

                    var cvv = cv - item1.cont;

                    for (var inde = 0; inde < item1.cont; inde++)
                    {
                        var ivid = WYNKContext.InvestigationImages.Where(x => x.UIN == UIN).Select(x => x.ID).ToList();
                        for (var indes = 0; indes < ivid.Count; indes++)
                        {
                            var a = ivid[indes];
                            //var dttms = item1.dttms;

                            var testStr = item1.Descs + '/' + UIN + inde + a + ".png";
                            var path = testStr;

                            var dttms = WYNKContext.InvestigationImages.Where(x => x.ImageLocation == item1.Descs && x.UIN == UIN).Select(x => x.CreatedUTC).ToList();

                            if ((File.Exists(path)))
                            {

                                string imageData = Convert.ToBase64String(File.ReadAllBytes(path));
                                string source = imageData;
                                if (inv.stringArray[inde] != null)
                                {
                                    inv.stringArray[inde + cvv] = imageData;

                                }
                                else
                                {
                                    inv.stringArray[inde] = imageData;

                                }


                                var list4 = new InvImg();
                                list4.idm = item1.idd;
                                list4.remr = item1.rmrks;
                                list4.Desccm = item1.ImDescs;
                                list4.dttm = item1.dttms;
                                list4.imgdt = "data:image/png;base64," + imageData;
                                inv.InvImg.Add(list4);
                            }
                        }
                    }
                }

                inv.InvImgres = (from IN in inv.InvImg.GroupBy(x => x.Desccm)//Desccm
                                 select new InvImgres
                                 {
                                     Desccmre = IN.Key,
                                     remarks = IN.Select(x => x.remr).ToList(),
                                     imgdtre = IN.Select(x => x.imgdt).ToList(),
                                     imgdttm = IN.Select(x => x.dttm).ToList(),

                                 }).ToList();


            }

            else
            {
            }
            return inv;
        }







    }
}







