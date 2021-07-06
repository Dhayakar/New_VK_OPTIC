using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using WYNK.Data.Model;
using WYNK.Data.Model.ViewModel;
using WYNK.Data.Repository.Operation;
using WYNK.Helpers;

namespace WYNK.Data.Repository.Implementation
{
    class FinalBillingRepository : RepositoryBase<FinalBillingMaster>, IFinalBillingRepository
    {
        private readonly WYNKContext _Wynkcontext;
        private readonly CMPSContext _Cmpscontext;


        public FinalBillingRepository(WYNKContext context, CMPSContext Cmpscontext) : base(context, Cmpscontext)
        {
            _Wynkcontext = context;
            _Cmpscontext = Cmpscontext;

        }

        public FinalBillingMaster getRePrint(string uin, int cmpid1, string INVNO)
        {
            var PatientAccount = WYNKContext.PatientAccount.AsNoTracking().ToList();
            var registration = WYNKContext.Registration.AsNoTracking().ToList();
            //var regisrtattran = WYNKContext.RegistrationTran.ToList();
            //var onelinemaster = CMPSContext.OneLineMaster.ToList();
            var PatientAccountDetail = WYNKContext.PatientAccountDetail.AsNoTracking().ToList();
            var PaymentMaster = WYNKContext.PaymentMaster.AsNoTracking().ToList();
            var CompanyMaster = CMPSContext.Company.AsNoTracking().ToList();
            var helpR = new FinalBillingMaster();
            helpR.Reprint = (from REG in registration.Where(u => u.UIN == uin || u.CMPID == cmpid1)
                             join PA in PatientAccount on REG.UIN equals PA.UIN
                             where PA.CMPID == cmpid1 && PA.InvoiceNumber != null
                             select new Rprint
                             {
                                 UIN = REG.UIN,
                                 DateofRegistration = TimeZoneInfo.ConvertTimeFromUtc(REG.DateofRegistration, TimeZoneInfo.FindSystemTimeZoneById("India Standard Time")),
                                 Name = REG.Name,
                                 MiddleName = REG.MiddleName,
                                 LastName = REG.LastName,
                                 DateofBirth = REG.DateofBirth,
                                 Age = PasswordEncodeandDecode.ToAgeString(REG.DateofBirth),
                                 Gender = REG.Gender,
                                 Address1 = REG.Address1,
                                 Phone = REG.Phone,
                                 InvoiceNumber = PA.InvoiceNumber,
                                 InvoiceDate = PA.InvoiceDate,
                             }
                              ).ToList();


            helpR.ReprintBilling = (from patAct in PatientAccount.Where(O => O.InvoiceNumber == INVNO && O.CMPID == cmpid1)
                                    join patActD in PatientAccountDetail on patAct.PAID equals patActD.PAID
                                    select new ReprintB
                                    {
                                        OLMID = patActD.OLMID,
                                        TotalProductValue = patActD.TotalProductValue,
                                        TotalDiscountValue = patActD.TotalDiscountValue,
                                        TotalTaxValue = patActD.TotalTaxValue,
                                        TotalCGSTTaxValue = patActD.TotalCGSTTaxValue,
                                        TotalSGSTTaxValue = patActD.TotalSGSTTaxValue,
                                        TotalIGSTTaxValue = patActD.TotalIGSTTaxValue,
                                        TotalBillValue = patActD.TotalBillValue,
                                        CESSPercentage = patActD.CESSValue,
                                        AdditionalCESSPercentage = patActD.AdditonalCESSValue,
                                    }
                                  ).ToList();

            helpR.ReprintBilling1 = (from resG in helpR.ReprintBilling.GroupBy(x => x.OLMID)

                                     select new ReprintB1
                                     {
                                         OLMID = resG.Key,
                                         TotalProductValue = resG.Select(x => x.TotalProductValue).Sum(),
                                         Description = Convert.ToString(CMPSContext.OneLineMaster.Where(x => x.OLMID == resG.Key).Select(x => x.ParentDescription).FirstOrDefault()),
                                         TotalDiscountValue = resG.Select(x => x.TotalDiscountValue).Sum(),
                                         TotalDiscountProduct = resG.Select(x => x.TotalProductValue).Sum() - resG.Select(x => x.TotalDiscountValue).Sum(),
                                         TotalTaxValue = resG.Select(x => x.TotalTaxValue).Sum(),
                                         TotalCGSTTaxValue = resG.Select(x => x.TotalCGSTTaxValue).Sum(),
                                         TotalSGSTTaxValue = resG.Select(x => x.TotalSGSTTaxValue).Sum(),
                                         TotalIGSTTaxValue = resG.Select(x => x.TotalIGSTTaxValue).Sum(),
                                         TotalBillValue = resG.Select(x => x.TotalBillValue).Sum(),
                                         CESSPercentage = resG.Select(x => x.CESSPercentage).Sum(),
                                         AdditionalCESSPercentage = resG.Select(x => x.AdditionalCESSPercentage).Sum(),
                                         CompanyName = CompanyMaster.Where(x => x.CmpID == cmpid1).Select(x => x.CompanyName).FirstOrDefault(),
                                         CAddress1 = CompanyMaster.Where(x => x.CmpID == cmpid1).Select(x => x.Address1).FirstOrDefault(),
                                         CAddress2 = CompanyMaster.Where(x => x.CmpID == cmpid1).Select(x => x.Address2).FirstOrDefault(),
                                         CAddress3 = CompanyMaster.Where(x => x.CmpID == cmpid1).Select(x => x.Address3).FirstOrDefault(),
                                         CPhone1 = CompanyMaster.Where(x => x.CmpID == cmpid1).Select(x => x.Phone1).FirstOrDefault(),
                                         CWebsite = CompanyMaster.Where(x => x.CmpID == cmpid1).Select(x => x.Website).FirstOrDefault(),

                                     }
                           ).ToList();
            helpR.paymentReprint = (from PTY in PaymentMaster.Where(x => x.InVoiceNumber == INVNO && x.CmpID == cmpid1 && x.PaymentType == "O")

                                    select new paymentRP
                                    {
                                        PaymentMode = PTY.PaymentMode,
                                        InstrumentNumber = PTY.InstrumentNumber,
                                        Instrumentdate = PTY.Instrumentdate,
                                        BankName = PTY.BankName,
                                        BankBranch = PTY.BankBranch,
                                        Expirydate = PTY.Expirydate,
                                        Amount = PTY.Amount,
                                    }
                             ).ToList();
            helpR.paymentReprintADV = (from PTY in PaymentMaster.Where(x => x.InVoiceNumber == INVNO && x.PaymentType == "A" && x.CmpID == cmpid1)

                                       select new paymentAdvRP
                                       {
                                           AdvAmount = PTY.Amount,
                                       }
                              ).ToList();

            helpR.AdvRePrint = helpR.paymentReprintADV.Select(x => x.AdvAmount).Sum();

            helpR.InsuranceRePrint = WYNKContext.PatientVsInsurance.Where(x => x.UIN == uin && x.CmpID == cmpid1 && x.IsActive == false).Select(x => x.AmountAvailed).LastOrDefault();
            return helpR;
        }


        public FinalBillingMaster getpayment(string res, string uin, int cmpid1)
        {
            var PaymentMaster = WYNKContext.PaymentMaster.AsNoTracking().ToList();
            var help = new FinalBillingMaster();
            help.paymentReturn = (from PTY in PaymentMaster.Where(x => x.UIN == uin && x.InVoiceNumber == res && x.PaymentType == "O" && x.IsBilled == true && x.CmpID == cmpid1)

                                  select new paymentR
                                  {
                                      // AdvAmount = PTY.Amount,
                                      PaymentMode = PTY.PaymentMode,
                                      InstrumentNumber = PTY.InstrumentNumber,
                                      Instrumentdate = PTY.Instrumentdate,
                                      BankName = PTY.BankName,
                                      BankBranch = PTY.BankBranch,
                                      Expirydate = PTY.Expirydate,
                                      Amount = PTY.Amount,
                                  }
                                    ).ToList();



            return help;
        }


        public decimal? getvalue(decimal? data)
        {
            var zero = 0;
            var nuldata = data;
            if (nuldata != null)
            {
                return nuldata;
            }
            return zero;
        }



        public FinalBillingMaster getbilling(string res, string uin, int cmpid1)
        {

            var onelinemaster = CMPSContext.OneLineMaster.AsNoTracking().ToList();
            var PatientAccount = WYNKContext.PatientAccount.AsNoTracking().ToList();
            var PatientAccountDetail = WYNKContext.PatientAccountDetail.AsNoTracking().ToList();
            var PaymentMaster = WYNKContext.PaymentMaster.AsNoTracking().ToList();


            var help = new FinalBillingMaster();

            help.billingdetail1 = new List<billing1>();
            help.paymenttran1 = new List<Finalpaymenttran>();
            help.AdditemD = new List<AdditemD>();

            help.billingdetail = (from patAct in PatientAccount.Where(O => O.UIN == uin && O.InvoiceNumber == null && O.CMPID == cmpid1)
                                  join patActD in PatientAccountDetail on patAct.PAID equals patActD.PAID
                                  select new billing
                                  {
                                      OLMID = patActD.OLMID,
                                      TotalProductValue = patActD.TotalProductValue,
                                      TotalDiscountValue = patActD.TotalDiscountValue,
                                      TotalTaxValue = patActD.TotalTaxValue,
                                      TotalCGSTTaxValue = patActD.TotalCGSTTaxValue,
                                      TotalSGSTTaxValue = patActD.TotalSGSTTaxValue,
                                      TotalIGSTTaxValue = patActD.TotalIGSTTaxValue,
                                      TotalBillValue = patActD.TotalBillValue,
                                      CESSPercentage = patActD.CESSValue,
                                      AdditionalCESSPercentage = patActD.AdditonalCESSValue,
                                  }
                                  ).ToList();

            help.billingdetail1 = (from resG in help.billingdetail.GroupBy(x => x.OLMID)
                                   select new billing1
                                   {
                                       OLMID = resG.Key,
                                       TotalProductValue = resG.Select(x => x.TotalProductValue).Sum(),
                                       Description = Convert.ToString(CMPSContext.OneLineMaster.Where(x => x.OLMID == resG.Key).Select(x => x.ParentDescription).FirstOrDefault()),
                                       TotalDiscountValue = resG.Select(x => x.TotalDiscountValue).Sum(),
                                       TotalDiscountProduct = resG.Select(x => x.TotalProductValue).Sum() - resG.Select(x => x.TotalDiscountValue).Sum(),
                                       TotalTaxValue = resG.Select(x => x.TotalTaxValue).Sum(),
                                       TotalCGSTTaxValue = resG.Select(x => x.TotalCGSTTaxValue).Sum(),
                                       TotalSGSTTaxValue = resG.Select(x => x.TotalSGSTTaxValue).Sum(),
                                       TotalIGSTTaxValue = resG.Select(x => x.TotalIGSTTaxValue).Sum(),
                                       TotalBillValue = resG.Select(x => x.TotalBillValue).Sum(),
                                       CESSPercentage = resG.Select(x => x.CESSPercentage).Sum(),
                                       AdditionalCESSPercentage = resG.Select(x => x.AdditionalCESSPercentage).Sum(),
                                   }
                                   ).ToList();
            var olmid = onelinemaster.Where(x => x.ParentDescription == res).Select(x => x.OLMID).FirstOrDefault();
            help.billingdetail2 = (from Tab in PatientAccount.Where(x => x.UIN == uin && x.InvoiceNumber == null && x.CMPID == cmpid1)
                                   join PatActD in PatientAccountDetail on Tab.PAID equals PatActD.PAID
                                   where PatActD.OLMID == olmid
                                   select new billing2
                                   {
                                       OLMID = onelinemaster.Where(x => x.OLMID == PatActD.OLMID).Select(x => x.ParentDescription).FirstOrDefault(),
                                       Description = PatActD.ServiceDescription,
                                       PAID = PatActD.PAID,
                                       lensDescription = Tab.Description,
                                       TotalProductValue = getvalue(PatActD.TotalProductValue),
                                       TotalDiscountValue = getvalue(PatActD.TotalDiscountValue),
                                       TotalDiscountProduct = getvalue(PatActD.TotalProductValue - PatActD.TotalDiscountValue),
                                       TotalTaxValue = getvalue(PatActD.TotalTaxValue),
                                       TotalCGSTTaxValue = getvalue(PatActD.TotalCGSTTaxValue),
                                       TotalSGSTTaxValue = getvalue(PatActD.TotalSGSTTaxValue),
                                       TotalIGSTTaxValue = getvalue(PatActD.TotalIGSTTaxValue),
                                       TotalBillValue = getvalue(PatActD.TotalBillValue),
                                       CESSPercentage = getvalue(PatActD.CESSValue),
                                       AdditionalCESSPercentage = getvalue(PatActD.AdditonalCESSValue),
                                   }
                     ).ToList();
            help.paymenttran2 = (from PTY in PaymentMaster.Where(x => x.UIN == uin && x.InVoiceNumber == null && x.PaymentType == "A" && x.IsBilled == false && x.CmpID == cmpid1)

                                 select new Finalpaymenttran2
                                 {
                                     UIN = PTY.UIN,
                                     PaymentMode = PTY.PaymentMode,
                                     InstrumentNumber = PTY.InstrumentNumber,
                                     Instrumentdate = PTY.Instrumentdate,
                                     BankName = PTY.BankName,
                                     BankBranch = PTY.BankBranch,
                                     Expirydate = PTY.Expirydate,
                                     Amount = PTY.Amount,
                                     AdvAmount = PTY.Amount,
                                 }
                                ).ToList();


            help.Adv = help.paymenttran2.Select(x => x.AdvAmount).Sum();


            return help;


        }


        public dynamic Insertpayment(FinalBillingMaster payment, int cmpid, string UIN, int TransactionTypeid, int userroleID)
        {
            using (var dbContextTransaction = WYNKContext.Database.BeginTransaction())
            {

                var PatAcc = new PatientAccount();
                var Payment = new Payment_Master();
                var Payment1 = new Payment_Master();
                var Admission = new Admission();
                var INVupdate = new InvestigationTran();
                var OMupdate = new OpticalMaster();
                var PatincBillTran = new PatientInsuranceBilgTran();
                var PatientVsInsurance = new PatientVsInsurance();
                try
                {
                    ///////////////////////jhgj////////////////////////////////////////////////


                    //string cmpname = CMPSContext.Company.Where(x => x.CmpID == cmpid).Select(x => x.CompanyName).FirstOrDefault();
                    string username = CMPSContext.DoctorMaster.Where(s => s.EmailID == CMPSContext.Users.Where(x => x.Userid == userroleID).Select(x => x.Username).FirstOrDefault()).Select(c => c.Firstname + "" + c.MiddleName + "" + c.LastName).FirstOrDefault();
                    string userid = Convert.ToString(userroleID);
                    ErrorLog oErrorLogs = new ErrorLog();
                    oErrorLogs.WriteErrorLogTitle(payment.Companyname, "Final Billing", "User name :", username, "User ID :", userid, "Mode : Update");

                    ///////////////////////////PatientAccount//////////////////////////////////
                    var PAID = WYNKContext.PatientAccount.Where(x => x.UIN == UIN && x.InvoiceNumber == null).Select(x => x.PAID).FirstOrDefault();
                    if (PAID >= 1)
                    {
                        PatAcc = WYNKContext.PatientAccount.Where(x => x.PAID == PAID).FirstOrDefault();
                        PatAcc.InvoiceNumber = payment.payment.InVoiceNumber;
                        PatAcc.InvoiceDate = DateTime.UtcNow;
                        WYNKContext.Entry(PatAcc).State = EntityState.Modified;
                        ErrorLog oErrorLogstranEX = new ErrorLog();
                        object namestrEX = PatAcc;
                        oErrorLogs.WriteErrorLogArray("PatientAccount", namestrEX);
                    }
                    //////////////////////////PatientInsuranceBilgTran////////////////////////////////////////////////
                    if (payment.GETPatientInsuranceBilgTran.PAINSID != 0)
                    {
                        PatincBillTran.PAINSID = payment.GETPatientInsuranceBilgTran.PAINSID;
                        PatincBillTran.AmountAvailed = payment.GETPatientInsuranceBilgTran.AmountAvailed;
                        PatincBillTran.CmpID = cmpid;
                        PatincBillTran.PAID = PAID;
                        PatincBillTran.DateAvailed = DateTime.UtcNow;
                        PatincBillTran.CreatedUTC = DateTime.UtcNow;
                        PatincBillTran.CreatedBy = userroleID;
                        WYNKContext.PatientInsuranceBilgTran.Add(PatincBillTran);
                        ErrorLog oErrorLogstranEX = new ErrorLog();
                        object namestrEX = PatincBillTran;
                        oErrorLogs.WriteErrorLogArray("PatientInsuranceBilgTran", namestrEX);
                        WYNKContext.SaveChanges();
                    }
                    //////////////////////////PatientVsInsurance////////////////////////////////////////////////
                    if (payment.GETPatientInsuranceBilgTran.PAINSID != 0)
                    {
                        PatientVsInsurance = WYNKContext.PatientVsInsurance.Where(x => x.PAINSID == payment.GETPatientInsuranceBilgTran.PAINSID).FirstOrDefault();
                        PatientVsInsurance.AmountAvailed = payment.GETPatientInsuranceBilgTran.AmountAvailed;
                        PatientVsInsurance.IsTransacted = true;
                        WYNKContext.Entry(PatientVsInsurance).State = EntityState.Modified;
                        ErrorLog oErrorLogstranEX = new ErrorLog();
                        object namestrEX = PatientVsInsurance;
                        oErrorLogs.WriteErrorLogArray("PatientVsInsurance", namestrEX);
                        WYNKContext.SaveChanges();
                    }

                    ///////////////////////////PaymentMaster//////////////////////////////////
                    //var CMPID = WYNKContext.PatientAccount.Where(x => x.UIN == UIN && x.InvoiceNumber == null && x.PAID == PAID).Select(x => x.CMPID).FirstOrDefault();
                    foreach (var item in payment.paymenttran1.ToList())
                    {
                        Payment.UIN = UIN;
                        Payment.PaymentType = "O";
                        Payment.PaymentMode = item.PaymentMode;
                        Payment.InstrumentNumber = item.InstrumentNumber;
                        Payment.Instrumentdate = item.Instrumentdate;
                        Payment.BankName = item.BankName;
                        Payment.BankBranch = item.BankBranch;
                        Payment.Expirydate = item.Expirydate;
                        Payment.Amount = item.Amount;
                        Payment.CmpID = cmpid;
                        Payment.IsBilled = true;
                        Payment.InVoiceNumber = payment.payment.InVoiceNumber;
                        Payment.ReceiptNumber = payment.payment.InVoiceNumber;
                        Payment.InVoiceDate = DateTime.UtcNow;
                        Payment.ReceiptDate = DateTime.UtcNow;
                        Payment.Paid = PAID;
                        Payment.TransactionID = TransactionTypeid;
                        Payment.CreatedUTC = DateTime.UtcNow;
                        Payment.CreatedBy = userroleID;
                        var Datee = DateTime.Now;
                        Payment.Fyear = Convert.ToString(WYNKContext.FinancialYear.Where(x => x.ID == WYNKContext.FinancialYear.Where(b => Convert.ToDateTime(b.FYFrom) <= Datee && Convert.ToDateTime(b.FYTo) >= Datee && b.CMPID == cmpid && b.IsActive == true).Select(f => f.ID).FirstOrDefault()).Select(c => c.FYAccYear).FirstOrDefault());
                        WYNKContext.PaymentMaster.Add(Payment);
                        ErrorLog oErrorLogstranEX = new ErrorLog();
                        object namestrEX = Payment;
                        oErrorLogs.WriteErrorLogArray("PaymentMaster", namestrEX);
                        WYNKContext.SaveChanges();
                    }
                    ///////////////////////////InvestigationTran//////////////////////////////////
                    var InvTranID = WYNKContext.InvestigationImages.Where(x => x.UIN == UIN).Select(x => x.InvestigationTranID).ToList();
                    foreach (var item in InvTranID.ToList())
                    {
                        var ids = WYNKContext.InvestigationTran.Where(x => x.ID == item && x.IsBilled == false).Select(x => x.ID).FirstOrDefault();
                        if (ids >= 1)
                        {
                            INVupdate = WYNKContext.InvestigationTran.Where(x => x.ID == ids).FirstOrDefault();
                            INVupdate.InvoiceNumber = payment.payment.InVoiceNumber;
                            INVupdate.InvoiceDate = DateTime.UtcNow;
                            INVupdate.IsBilled = true;
                            WYNKContext.Entry(INVupdate).State = EntityState.Modified;
                            ErrorLog oErrorLogstranEX = new ErrorLog();
                            object namestrEX = INVupdate;
                            oErrorLogs.WriteErrorLogArray("InvestigationTran", namestrEX);
                        }
                    }
                    ///////////////////////////MedicalBillMaster//////////////////////////////////
                    var MedicalBillM = WYNKContext.MedicalBillMaster.Where(x => x.UIN == UIN).Select(x => x.ID).ToList();
                    foreach (var item in MedicalBillM.ToList())
                    {
                        var ids = WYNKContext.MedicalBillMaster.Where(x => x.ID == item && x.PAID != PAID).Select(x => x.ID).FirstOrDefault();
                        if (ids >= 1)
                        {
                            var MBupdate = new MedicalBill_Master();
                            MBupdate = WYNKContext.MedicalBillMaster.Where(x => x.ID == ids).FirstOrDefault();
                            MBupdate.PAID = PAID;
                            WYNKContext.Entry(MBupdate).State = EntityState.Modified;
                            ErrorLog oErrorLogstranEX = new ErrorLog();
                            object namestrEX = MBupdate;
                            oErrorLogs.WriteErrorLogArray("MedicalBillMaster", namestrEX);
                        }
                    }
                    ///////////////////////////OpticalMaster//////////////////////////////////
                    var RegTranID = WYNKContext.RegistrationTran.Where(x => x.UIN == UIN).Select(x => x.RegistrationTranID).ToList();
                    foreach (var item in RegTranID.ToList())
                    {
                        var ID = WYNKContext.OpticalMaster.Where(x => x.RegTranID == item && x.InvoiceNumber == null).Select(x => x.ID).FirstOrDefault();
                        if (ID >= 1)
                        {
                            OMupdate = WYNKContext.OpticalMaster.Where(x => x.ID == ID).FirstOrDefault();
                            OMupdate.InvoiceNumber = payment.payment.InVoiceNumber;
                            OMupdate.InvoiceDate = DateTime.UtcNow;
                            WYNKContext.Entry(OMupdate).State = EntityState.Modified;
                            ErrorLog oErrorLogstranEX = new ErrorLog();
                            object namestrEX = OMupdate;
                            oErrorLogs.WriteErrorLogArray("OpticalMaster", namestrEX);
                        }
                    }
                    ///////////////////////////PaymentMaster//////////////////////////////////
                    var ID1 = WYNKContext.PaymentMaster.Where(x => x.UIN == UIN && x.InVoiceNumber == null && x.PaymentType == "A" && x.IsBilled == false && x.CmpID == cmpid).Select(x => x.ID).ToList();
                    foreach (var item in ID1.ToList())
                    {
                        var ID = WYNKContext.PaymentMaster.Where(x => x.UIN == UIN && x.InVoiceNumber == null && x.PaymentType == "A" && x.IsBilled == false && x.CmpID == cmpid).Select(x => x.ID).FirstOrDefault();
                        if (ID >= 1)
                        {

                            Payment1 = WYNKContext.PaymentMaster.Where(x => x.ID == ID).FirstOrDefault();
                            Payment1.IsBilled = true;
                            Payment1.Paid = PAID;
                            Payment1.InVoiceNumber = payment.payment.InVoiceNumber;
                            Payment1.InVoiceDate = DateTime.UtcNow;
                            WYNKContext.Entry(Payment1).State = EntityState.Modified;
                            ErrorLog oErrorLogstranEX = new ErrorLog();
                            object namestrEX = Payment1;
                            oErrorLogs.WriteErrorLogArray("PaymentMaster", namestrEX);
                        }
                    }
                    WYNKContext.SaveChanges();



                    ///////////////////////////Admission//////////////////////////////////
                    var AdmID = WYNKContext.Admission.Where(x => x.UIN == UIN && x.InvoiceNumber == null && x.isbilled == false && x.CMPID == cmpid).Select(x => x.AdmID).ToList();
                    foreach (var item in AdmID.ToList())
                    {
                        var AID = WYNKContext.Admission.Where(x => x.UIN == UIN && x.InvoiceNumber == null && x.isbilled == false && x.CMPID == cmpid).Select(x => x.AdmID).FirstOrDefault();
                        if (AID >= 1)
                        {

                            Admission = WYNKContext.Admission.Where(x => x.AdmID == AID).FirstOrDefault();
                            Admission.isbilled = true;
                            Admission.Paid = PAID;
                            Admission.InvoiceNumber = payment.payment.InVoiceNumber;
                            Admission.InvoiceDate = DateTime.UtcNow;
                            WYNKContext.Entry(Admission).State = EntityState.Modified;
                            ErrorLog oErrorLogstranEX = new ErrorLog();
                            object namestrEX = Admission;
                            oErrorLogs.WriteErrorLogArray("Admission", namestrEX);
                        }
                    }
                    WYNKContext.SaveChanges();

                    ///////////////////////////RoomOccupiedStatus//////////////////////////////////
                    var AdmIDROOM = WYNKContext.Admission.Where(x => x.UIN == UIN && x.InvoiceNumber == null && x.isbilled == false && x.CMPID == cmpid).Select(x => x.RandomUniqueID).FirstOrDefault();
                    var Roomid = WYNKContext.RoomOccupiedStatus.Where(x => x.UIN == UIN && x.CmpID == cmpid && x.AdmID == AdmIDROOM).Select(x => x.ID).FirstOrDefault();


                    if (Roomid != 0)
                    {
                        var RoomOccupied = new RoomOccupiedstatus();
                        RoomOccupied = WYNKContext.RoomOccupiedStatus.Where(x => x.ID == Roomid).FirstOrDefault();
                        RoomOccupied.RoomOccupationToDate = DateTime.UtcNow;
                        RoomOccupied.RoomOccupationToTime = DateTime.UtcNow.ToString("HH:mm:ss");
                        WYNKContext.Entry(RoomOccupied).State = EntityState.Modified;
                        WYNKContext.SaveChanges();
                        ErrorLog oErrorLogstranEX = new ErrorLog();
                        object namestrEX = Admission;
                        oErrorLogs.WriteErrorLogArray("Admission", namestrEX);
                    }




                    ///////////////////////////GenerateRunningCtrlNoo1(update)//////////////////////////////////
                    var commonRepos = new CommonRepository(_Wynkcontext, _Cmpscontext);
                    var RunningNumber = commonRepos.GenerateRunningCtrlNoo(TransactionTypeid, cmpid, "GetRunningNo");
                    if (RunningNumber == payment.payment.InVoiceNumber)
                    {
                        commonRepos.GenerateRunningCtrlNoo(TransactionTypeid, cmpid, "UpdateRunningNo");
                    }
                    else
                    {
                        var GetRunningNumber = commonRepos.GenerateRunningCtrlNoo(TransactionTypeid, cmpid, "UpdateRunningNo");
                        ///////////////////////////PatientAccount//////////////////////////////////
                        PatAcc = WYNKContext.PatientAccount.Where(x => x.PAID == PAID).FirstOrDefault();
                        PatAcc.InvoiceNumber = GetRunningNumber;
                        WYNKContext.Entry(PatAcc).State = EntityState.Modified;
                        ///////////////////////////PatientAccount//////////////////////////////////
                        var paymentM = new Payment_Master();
                        paymentM = WYNKContext.PaymentMaster.Where(x => x.ID == Payment.ID).FirstOrDefault();
                        paymentM.InVoiceNumber = GetRunningNumber;
                        WYNKContext.Entry(paymentM).State = EntityState.Modified;
                        ///////////////////////////InvestigationTran//////////////////////////////////
                        var InvTranIDRN = WYNKContext.InvestigationImages.Where(x => x.UIN == UIN).Select(x => x.InvestigationTranID).ToList();
                        foreach (var item in InvTranIDRN.ToList())
                        {
                            var ids = WYNKContext.InvestigationTran.Where(x => x.ID == item && x.IsBilled == false).Select(x => x.ID).FirstOrDefault();
                            if (ids >= 1)
                            {
                                INVupdate = WYNKContext.InvestigationTran.Where(x => x.ID == ids).FirstOrDefault();
                                INVupdate.InvoiceNumber = GetRunningNumber;
                                WYNKContext.Entry(INVupdate).State = EntityState.Modified;
                            }
                        }
                        ///////////////////////////OpticalMaster//////////////////////////////////
                        var RegTranIDRN = WYNKContext.RegistrationTran.Where(x => x.UIN == UIN).Select(x => x.RegistrationTranID).ToList();
                        foreach (var item in RegTranIDRN.ToList())
                        {
                            var ID = WYNKContext.OpticalMaster.Where(x => x.RegTranID == item && x.InvoiceNumber == null).Select(x => x.ID).FirstOrDefault();
                            if (ID >= 1)
                            {
                                OMupdate = WYNKContext.OpticalMaster.Where(x => x.ID == ID).FirstOrDefault();
                                OMupdate.InvoiceNumber = GetRunningNumber;
                                WYNKContext.Entry(OMupdate).State = EntityState.Modified;
                            }
                        }
                        ///////////////////////////PaymentMaster//////////////////////////////////
                        var ID1RN = WYNKContext.PaymentMaster.Where(x => x.UIN == UIN && x.InVoiceNumber == null && x.PaymentType == "A" && x.IsBilled == false && x.CmpID == cmpid).Select(x => x.ID).ToList();
                        foreach (var item in ID1RN.ToList())
                        {
                            var ID = WYNKContext.PaymentMaster.Where(x => x.UIN == UIN && x.InVoiceNumber == null && x.PaymentType == "A" && x.IsBilled == false && x.CmpID == cmpid).Select(x => x.ID).FirstOrDefault();
                            if (ID >= 1)
                            {
                                Payment1 = WYNKContext.PaymentMaster.Where(x => x.ID == ID).FirstOrDefault();
                                Payment1.InVoiceNumber = GetRunningNumber;
                                WYNKContext.Entry(Payment1).State = EntityState.Modified;
                            }
                        }
                        ///////////////////////////Admission//////////////////////////////////
                        var AdmID1 = WYNKContext.Admission.Where(x => x.UIN == UIN && x.InvoiceNumber == null && x.isbilled == false && x.CMPID == cmpid).Select(x => x.AdmID).ToList();
                        foreach (var item in AdmID1.ToList())
                        {
                            var AID1 = WYNKContext.Admission.Where(x => x.UIN == UIN && x.InvoiceNumber == null && x.isbilled == false && x.CMPID == cmpid).Select(x => x.AdmID).FirstOrDefault();
                            if (AID1 >= 1)
                            {
                                Admission = WYNKContext.Admission.Where(x => x.AdmID == AID1).FirstOrDefault();
                                Admission.InvoiceNumber = GetRunningNumber;
                                WYNKContext.Entry(Admission).State = EntityState.Modified;
                            }
                        }
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
                            InVNumber = payment.payment.InVoiceNumber,
                            InDate = DateTime.UtcNow,
                        };
                }
                catch (Exception ex)
                {
                    ErrorLog oErrorLog = new ErrorLog();
                    oErrorLog.WriteErrorLog("Error :", ex.InnerException.Message.ToString());
                    dbContextTransaction.Rollback();
                    Console.Write(ex);
                }

            }
            return new
            {
                Success = false,
            };
        }





        public FinalBillingMaster GetIPBillingDetails(int PAID)

        {
            var invv = new FinalBillingMaster();

            invv.BillDetailsIP1 = new List<BillDetailsIP1>();


            // var CMPID = WYNKContext.InvestigationBillMaster.Where(x => x.PAID == PAID).Select(V => V.CMPID).FirstOrDefault();
            //var invpID = WYNKContext.InvestigationBillTran.Where(x => x.InvestigationBillID == invip).Select(V => V.InvPrescriptionID).FirstOrDefault();
            var invBillM = WYNKContext.InvestigationBillMaster.AsNoTracking().ToList();
            var invbillT = WYNKContext.InvestigationBillTran.AsNoTracking().ToList();
            var invpre = WYNKContext.InvestigationPrescription.AsNoTracking().ToList();
            var invtr = WYNKContext.InvestigationPrescriptionTran.AsNoTracking().ToList();
            var one = CMPSContext.OneLineMaster.AsNoTracking().ToList();
            var DOC = CMPSContext.DoctorMaster.AsNoTracking().ToList();
            var Users = CMPSContext.Users.AsNoTracking().ToList();

            // var utctimes = CMPSContext.Setup.Where(x => x.CMPID == CMPID).Select(x => x.UTCTime).FirstOrDefault();

            ///TimeSpan utctime = TimeSpan.Parse(utctimes);

            invv.BillDetailsIP1 = (from INB in invBillM.Where(x => x.PAID == PAID)
                                   join INT in invbillT on INB.ID equals INT.InvestigationBillID
                                   select new BillDetailsIP1
                                   {
                                       id = INT.InvestigationID,
                                       Investigation = one.Where(x => x.OLMID == INT.InvestigationID).Select(c => c.ParentDescription).FirstOrDefault(),
                                       Amount = (INT.Amount - INT.DiscountAmount) + INT.GSTTaxValue + INT.CESSAmount + INT.AdditionalCESSAmount,
                                       Date = invtr.Where(x => x.IPID == INT.InvPrescriptionID).Select(c => c.CreatedUTC).FirstOrDefault(),
                                       INVPRESNO = invpre.Where(x => x.RandomUniqueID == INT.InvPrescriptionID).Select(c => c.INVPRESNO).FirstOrDefault(),
                                       Name = DOC.Where(x => x.EmailID ==
                                       Users.Where(V => V.Userid == INT.CreatedBy).Select(G => G.Username).FirstOrDefault()).
                                    Select(B => B.Title + "." + B.Firstname + "" + B.MiddleName + "" + B.LastName).FirstOrDefault(),
                                   }
                  ).ToList();


            return invv;


        }
        public FinalBillingMaster GetIPTaxBillingDetails(int TaxID)

        {

            var Fibill = new FinalBillingMaster();

            var taxMaster = CMPSContext.TaxMaster.AsNoTracking().ToList();



            Fibill.FBillDetailstax = (from Tx in taxMaster.Where(x => x.ID == TaxID)


                                      select new FBillDetailstax
                                      {
                                          TaxID = Tx.ID,
                                          TaxDescription = Tx.TaxDescription,
                                          CESSDescription = Tx.CESSDescription,
                                          AdditionalCESSDescription = Tx.AdditionalCESSDescription,
                                          GST = Tx.GSTPercentage,
                                          CESS = Tx.CESSPercentage,
                                          AdditionalCESS = Tx.AdditionalCESSPercentage,
                                          CGSTPercentage = Tx.CESSPercentage,
                                          SGSTPercentage = Tx.SGSTPercentage,
                                          IGSTPercentage = Tx.IGSTPercentage,

                                      }).ToList();

            return Fibill;


        }

        public dynamic InsertAdditem(FinalBillingMaster Additem, int cmpid, string UIN, int userroleID)
        {
            using (var dbContextTransaction = WYNKContext.Database.BeginTransaction())
            {
                //var PatientAccount = new PatientAccount();
                var PatientAccountDetail = new PatientAccountDetail();
                try
                {

                    var UINcount = (from pa in WYNKContext.PatientAccount.Where(x => x.UIN == UIN && x.InvoiceNumber == null && x.CMPID == cmpid)
                                 select new
                                 {
                                     ret = pa.UIN.Count(),

                                 }).ToList();

                    var PAID = WYNKContext.PatientAccount.Where(x => x.UIN == UIN && x.InvoiceNumber == null && x.CMPID == cmpid).Select(x => x.PAID).LastOrDefault();
                    var ServiceTypeID = CMPSContext.OneLineMaster.Where(x => x.ParentDescription == "Investigation Test").Select(x => x.OLMID).FirstOrDefault();

                        foreach (var item in Additem.AdditemD.ToList())
                        {
                            var PatientAccount = WYNKContext.PatientAccount.Where(x => x.UIN == UIN && x.InvoiceNumber == null && x.CMPID == cmpid).LastOrDefault();
                            PatientAccount.CMPID = cmpid;
                            PatientAccount.UIN = UIN;
                            PatientAccount.TotalProductValue += item.GrossAmount;
                            PatientAccount.TotalDiscountValue += item.DiscountAmount;
                            PatientAccount.TotalTaxValue += item.GSTAmount;
                            PatientAccount.TotalCGSTTaxValue += (item.GSTAmount) / 2;
                            PatientAccount.TotalSGSTTaxValue += (item.GSTAmount) / 2;
                            PatientAccount.TotalBillValue += item.TotalCost;
                            PatientAccount.CESSValue += item.CESSAmount;
                            PatientAccount.AdditionalCESSValue += item.AdditionalCESS;
                            PatientAccount.CreatedUTC = DateTime.UtcNow;
                            PatientAccount.CreatedBy = userroleID;
                            WYNKContext.PatientAccount.UpdateRange(PatientAccount);
                            ErrorLog oErrorLogstran = new ErrorLog();
                            object namestr = PatientAccount;
                            oErrorLogstran.WriteErrorLogArray("PatientAccount Additems", namestr);
                            WYNKContext.SaveChanges();
                        }

                    foreach (var item in Additem.AdditemD.ToList())
                    {
 
                        PatientAccountDetail.PAID = PAID;
                        PatientAccountDetail.OLMID = CMPSContext.OneLineMaster.Where(x => x.ParentDescription == item.ServicesDescription).Select(x => x.OLMID).FirstOrDefault();
                        PatientAccountDetail.ServiceTypeID = CMPSContext.OneLineMaster.Where(x => x.ParentDescription == item.ServicesDescription).Select(x => x.ParentID).FirstOrDefault();
                        PatientAccountDetail.ServiceDescription = item.ServicesDescription;
                        PatientAccountDetail.TotalProductValue = item.GrossAmount;
                        PatientAccountDetail.TotalDiscountValue = item.DiscountAmount;
                        PatientAccountDetail.TotalTaxValue = item.GSTAmount;
                        PatientAccountDetail.TotalCGSTTaxValue = (item.GSTAmount) / 2;
                        PatientAccountDetail.TotalSGSTTaxValue = (item.GSTAmount) / 2;
                        PatientAccountDetail.TotalBillValue = item.TotalCost;
                        PatientAccountDetail.CESSValue = item.CESSAmount;
                        PatientAccountDetail.AdditonalCESSValue = item.AdditionalCESSAmount;
                        PatientAccountDetail.CreatedUTC = DateTime.UtcNow;
                        PatientAccountDetail.CreatedBy = userroleID;
                        WYNKContext.PatientAccountDetail.AddRange(PatientAccountDetail);
                        ErrorLog oErrorLogstran = new ErrorLog();
                        object namestr = PatientAccountDetail;
                        oErrorLogstran.WriteErrorLogArray("PatientAccountDetail additems", namestr);
                        WYNKContext.SaveChanges();
                    }


                    dbContextTransaction.Commit();
                    if (WYNKContext.SaveChanges() >= 0)
                        return new
                        {
                            Success = true,
                        };
                }
                catch (Exception ex)

                {
                    ErrorLog oErrorLog = new ErrorLog();
                    oErrorLog.WriteErrorLog("Error :", ex.InnerException.Message.ToString());
                    dbContextTransaction.Rollback();
                    Console.Write(ex);
                    string msg = ex.InnerException.Message;
                    return new
                    {
                        Success = false,
                    };
                }
                return new
                {
                    Success = false,

                };
            }
        }
    }
}