using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using WYNK.Data.Model;
using WYNK.Data.Model.ViewModel;
using WYNK.Data.Repository.Operation;
using WYNK.Helpers;

namespace WYNK.Data.Repository.Implementation
{
    class ExpenseRepository : RepositoryBase<ExpenseViewModel>, IExpenseRepository
    {
        private readonly WYNKContext _Wynkcontext;
        private readonly CMPSContext _Cmpscontext;
        public ExpenseRepository(WYNKContext context, CMPSContext Cmpscontext) : base(context, Cmpscontext)
        {
            _Wynkcontext = context;
            _Cmpscontext = Cmpscontext;
        }

        public dynamic InsertExpenseMaster(string Desc, int cmpid, int userid)
        {
            var data = new ExpenseViewModel();
            try
            {
                var Exmaset = new ExpenseMaster();
                Exmaset.CMPID = cmpid;
                Exmaset.ExpenseDescription = Desc;
                Exmaset.RandomUniqueID = PasswordEncodeandDecode.GetRandomnumber();
                Exmaset.CreatedUTC = DateTime.UtcNow;
                Exmaset.CreatedBY = userid;
                Exmaset.IsActive = true;
                Exmaset.IsDeleted = false;
                WYNKContext.ExpenseMaster.AddRange(Exmaset);

                if (WYNKContext.SaveChanges() >= 0)
                {
                    return new
                    {
                        Success = true,
                    };
                }
            }
            catch (Exception ex)
            {
                Console.Write(ex);
                ErrorLog oErrorLogs = new ErrorLog();
                oErrorLogs.WriteErrorLogArray("Expense Master", ex.Message);
            }
            return new
            {
                Success = false,
                Message = "SomeThing Went Wrong"
            };
        }

        public dynamic UpdateExpenseMaster(string Desc, int cmpid, int userid, int id, string status)
        {
            var data = new ExpenseViewModel();
            try
            {
                var Exmaset = WYNKContext.ExpenseMaster.Where(x => x.ID == id && x.CMPID == cmpid).FirstOrDefault();
                Exmaset.UpdatedUTC = DateTime.UtcNow;
                Exmaset.UpdatedBY = userid;
                Exmaset.ExpenseDescription = Desc;
                Exmaset.IsActive = Getstatusredirect(status);
                WYNKContext.ExpenseMaster.UpdateRange(Exmaset);
                WYNKContext.SaveChanges();
                if (WYNKContext.SaveChanges() >= 0)
                {
                    return new
                    {
                        Success = true,
                    };
                }
            }
            catch (Exception ex)
            {
                Console.Write(ex);
                ErrorLog oErrorLogs = new ErrorLog();
                oErrorLogs.WriteErrorLogArray("Expense Master", ex.Message);
            }
            return new
            {
                Success = false,
                Message = "SomeThing Went Wrong"
            };
        }

        public dynamic DeleteExpenseMaster(int Desc, int cmpid, int userid)
        {
            var data = new ExpenseViewModel();
            try
            {
                var Exmaset = WYNKContext.ExpenseMaster.Where(x => x.ID == userid && x.CMPID == Desc).FirstOrDefault();
                Exmaset.UpdatedUTC = DateTime.UtcNow;
                Exmaset.UpdatedBY = cmpid;
                Exmaset.IsDeleted = true;
                Exmaset.IsActive = false;
                WYNKContext.ExpenseMaster.UpdateRange(Exmaset);
                WYNKContext.SaveChanges();
                if (WYNKContext.SaveChanges() >= 0)
                {
                    return new
                    {
                        Success = true,
                    };
                }
            }
            catch (Exception ex)
            {
                Console.Write(ex);
                ErrorLog oErrorLogs = new ErrorLog();
                oErrorLogs.WriteErrorLogArray("Expense Master", ex.Message);
            }
            return new
            {
                Success = false,
                Message = "SomeThing Went Wrong"
            };
        }

        public dynamic GetExpenseMaster(int cmpid)
        {
            var data = new ExpenseViewModel();
            data.ExpenseMasterhelpdata = new List<ExpenseMasterhelpdata>();
            data.ExpenseMasterhelpdata = (from em in WYNKContext.ExpenseMaster.Where(x => x.CMPID == cmpid && x.IsDeleted == false)
                                          select new ExpenseMasterhelpdata
                                          {
                                              ID = em.ID,
                                              Description = em.ExpenseDescription,
                                              Status = Getstatus(em.IsActive),
                                          }).ToList();
            return data.ExpenseMasterhelpdata;
        }
        public dynamic GetactiveExpenseMaster(int cmpid)
        {
            var data = new ExpenseViewModel();
            data.ExpenseMasterhelpdata = new List<ExpenseMasterhelpdata>();
            data.ExpenseMasterhelpdata = (from em in WYNKContext.ExpenseMaster.Where(x => x.CMPID == cmpid && x.IsDeleted == false && x.IsActive == true)
                                          select new ExpenseMasterhelpdata
                                          {
                                              ID = em.ID,
                                              Description = em.ExpenseDescription,
                                              Status = null,
                                              Amount = Convert.ToDecimal(0),
                                          }).ToList();
            return data.ExpenseMasterhelpdata;
        }
        public bool Getstatusredirect(string Active)
        {
            var result = true;
            if (Active == "Yes")
            {
                result = true;
            }
            else
            {
                result = false;
            }
            return result;
        }
        public string Getstatus(bool Active)
        {
            var result = "";
            if (Active == true)
            {
                result = "Yes";
            }
            else
            {
                result = "No";
            }
            return result;
        }

        public dynamic Submitexpensetrandata(ExpenseViewModel ExpenseDetails)
        {
            var data = new ExpenseViewModel();
            data.Paymentexpesne = new List<Paymentexpesne>();
            using (var dbContextTransaction = WYNKContext.Database.BeginTransaction())
            {
                try
                {
                    var expdata = ExpenseDetails.Expesneitemdata;
                    var Paymentdata = ExpenseDetails.PaymentMaster.ToList();
                    var arr = new List<string> { };

                    var randomuniqueid = PasswordEncodeandDecode.GetRandomnumber();
                    DateTime DT;

                    foreach (var item in expdata)
                    {
                        if (item.Amount != 0)
                        {
                            var exptran = new ExpenseTran();
                            var trcliddata = WYNKContext.ExpenseTran.Where(x => x.ExpenseMasterID == Convert.ToInt32(item.ID) && x.CMPID == ExpenseDetails.Cmpid).OrderByDescending(x => x.CreatedUTC).FirstOrDefault();
                            var masterdata = WYNKContext.ExpenseMaster.Where(x => x.ID == Convert.ToInt32(item.ID) && x.CMPID == ExpenseDetails.Cmpid).FirstOrDefault();
                            exptran.CMPID = ExpenseDetails.Cmpid;
                            exptran.ExpenseMasterID = masterdata.ID;
                            var appdate = DateTime.TryParseExact(ExpenseDetails.OrderDate.Trim(), "dd-MMM-yyyy", CultureInfo.InvariantCulture, DateTimeStyles.None, out DT);
                            {
                                DT.ToString("dd-MM-yyyy", CultureInfo.InvariantCulture);
                            }
                            exptran.ExpenseDate = DT;
                            exptran.Paidto = ExpenseDetails.paidto;
                            exptran.Remarks = item.Remarks;
                            exptran.CreatedUTC = DateTime.UtcNow;
                            exptran.CreatedBY = ExpenseDetails.Userid;
                            var trcliddatas = WYNKContext.ExpenseTran.Where(x => x.ExpenseMasterID == Convert.ToInt32(item.ID) && x.ExpenseDate.Date == DT && x.CMPID == ExpenseDetails.Cmpid).FirstOrDefault();
                            if (trcliddatas != null)
                            {
                           
                                trcliddatas.Amount = Convert.ToDecimal(item.Amount) + trcliddatas.Amount;
                                WYNKContext.ExpenseTran.UpdateRange(trcliddatas);
                            }
                            else
                            {
                                exptran.RandomUniqueID = randomuniqueid;
                                exptran.Amount = Convert.ToDecimal(item.Amount);
                                WYNKContext.ExpenseTran.AddRange(exptran);                                
                            }
                            var trackingdata = WYNKContext.ExpenseTracking.Where(x => x.ExpenseID == Convert.ToInt32(item.ID) && x.ModifiedDate.Date == DT  && x.CMPID ==  ExpenseDetails.Cmpid).FirstOrDefault();
                            if (trackingdata != null)
                            {
                                var exptracking = new ExpenseTracking();
                                exptracking.CMPID = ExpenseDetails.Cmpid;
                                exptracking.ExpenseID = Convert.ToInt32(item.ID);
                                exptracking.NewValue = Convert.ToDecimal(item.Amount);
                                exptracking.OldValue = trcliddata.Amount;
                                exptracking.ModifiedDate = DT;
                                exptracking.username = CMPSContext.Users.Where(x => x.Userid == ExpenseDetails.Userid).Select(x => x.Username).FirstOrDefault();
                                exptracking.CreatedUTC = DateTime.UtcNow;
                                exptracking.CreatedBY = ExpenseDetails.Userid;
                                exptracking.RandomUniqueID = randomuniqueid;
                                WYNKContext.ExpenseTracking.AddRange(exptracking);
                              
                            }
                            else
                            {
                                var exptracking = new ExpenseTracking();
                                exptracking.CMPID = ExpenseDetails.Cmpid;
                                exptracking.ExpenseID = Convert.ToInt32(item.ID);
                                exptracking.NewValue = Convert.ToDecimal(0);
                                exptracking.OldValue = Convert.ToDecimal(item.Amount);
                                exptracking.ModifiedDate = DT;
                                exptracking.username = CMPSContext.Users.Where(x => x.Userid == ExpenseDetails.Userid).Select(x => x.Username).FirstOrDefault();
                                exptracking.CreatedUTC = DateTime.UtcNow;
                                exptracking.CreatedBY = ExpenseDetails.Userid;
                                exptracking.RandomUniqueID = randomuniqueid;
                                WYNKContext.ExpenseTracking.AddRange(exptracking);
                             
                            }
                        }
                    }

                    foreach (var item in Paymentdata)
                    {
                        var payment = new ExpensePaymentMaster();
                        payment.ExpenseID = randomuniqueid;
                        payment.PaymentAdviceID = ExpenseDetails.PaymentNumber;
                        payment.PaymentType = "O";
                        payment.PaymentMode = item.PaymentMode;
                        payment.OLMID = CMPSContext.OneLineMaster.Where(x => x.ParentDescription == item.PaymentMode).Select(x => x.OLMID).FirstOrDefault();
                        payment.Amount = item.Amount;
                        payment.BankBranch = item.BankBranch;
                        payment.BankName = item.BankName;
                        payment.Fyear = Convert.ToString(WYNKContext.FinancialYear.Where(x => x.ID == WYNKContext.FinancialYear.Where(b => Convert.ToDateTime(b.FYFrom) <= DateTime.Now && Convert.ToDateTime(b.FYTo) >= DateTime.Now && x.CMPID == ExpenseDetails.Cmpid && x.IsActive == true).Select(f => f.ID).FirstOrDefault()).Select(c => c.FYAccYear).FirstOrDefault());
                        payment.InVoiceNumber = null;
                        payment.InVoiceDate = null;
                        payment.ReceiptNumber = null;
                        payment.ReceiptDate = null;
                        payment.InstrumentNumber = item.InstrumentNumber;
                        if (item.Instrumentdate != null)
                        {
                            payment.Instrumentdate = Convert.ToDateTime(item.Instrumentdate).AddDays(1);
                        }
                        else
                        {
                            payment.Instrumentdate = null;
                        }
                        if (item.Expirydate != null)
                        {
                            payment.Expirydate = Convert.ToDateTime(item.Expirydate).AddDays(1);
                        }
                        else
                        {
                            payment.Expirydate = null;
                        }
                        payment.PaymentReferenceID = null;
                        payment.TransactionID = ExpenseDetails.TransactionID;
                        payment.CmpID = ExpenseDetails.Cmpid;
                        payment.IsBilled = true;
                        payment.CreatedUTC = DateTime.UtcNow;
                        payment.CreatedBy = ExpenseDetails.Userid;
                        WYNKContext.ExpensePaymentMaster.Add(payment);
                    }

                    WYNKContext.SaveChanges();
                    dbContextTransaction.Commit();
                    if (WYNKContext.SaveChanges() >= 0)
                    {
                        return new
                        {
                            Success = true,
                        };
                    }
                }
                catch (Exception ex)
                {
                    dbContextTransaction.Rollback();
                    Console.Write(ex);
                    ErrorLog oErrorLogs = new ErrorLog();
                    oErrorLogs.WriteErrorLogArray("Expense Master", ex.Message);
                }

            }
            return new
            {
                Success = false,
            };


        }


        public dynamic GetdatabasedonDate(int cmpid, string date)
        {
            var data = new ExpenseViewModel();
            data.Expesneitemdata = new List<Expesneitemdata>();
            DateTime DT;
            var appdate = DateTime.TryParseExact(date.Trim(), "dd-MMM-yyyy", CultureInfo.InvariantCulture, DateTimeStyles.None, out DT);
            {
                DT.ToString("dd-MM-yyyy", CultureInfo.InvariantCulture);
            }
            data.ExpenseMasterUpdatehelpdata = (from et in WYNKContext.ExpenseTran.Where(x => x.ExpenseDate.Date == DT && x.CMPID == cmpid)
                                    group et by new {et.ID, et.ExpenseDate.Date,et.Amount} into i
                                    select new ExpenseMasterUpdatehelpdata
                                    {
                                         ID = i.FirstOrDefault().ExpenseMasterID,
                                         Amount = WYNKContext.ExpenseTran.Where(x => x.ExpenseDate.Date == DT && x.CMPID == cmpid && x.ExpenseMasterID == i.FirstOrDefault().ExpenseMasterID).Sum(x =>x.Amount),
                                         Description = WYNKContext.ExpenseMaster.Where(x => x.CMPID == cmpid && x.ID == i.FirstOrDefault().ExpenseMasterID).Select(x => x.ExpenseDescription).FirstOrDefault(),
                                        Remarks = i.FirstOrDefault().Remarks,
                                    }).ToList();
            data.orderedamount = data.ExpenseMasterUpdatehelpdata.Sum(x => x.Amount);
            data.paidto = WYNKContext.ExpenseTran.Where(x => x.ExpenseDate.Date == DT && x.CMPID == cmpid).OrderByDescending(x =>x.CreatedUTC).Select(x => x.Paidto).FirstOrDefault();
            return data;
        }

        public dynamic Getexpensestatement(int cmpid, string date, string tdate)
        {
            var data = new ExpenseViewModel();
            data.Expensestatementdata = new List<Expensestatementdata>();
            
            DateTime DT;
            var appdate = DateTime.TryParseExact(date.Trim(), "dd-MMM-yyyy", CultureInfo.InvariantCulture, DateTimeStyles.None, out DT);
            {
                DT.ToString("dd-MM-yyyy", CultureInfo.InvariantCulture);
            }
            DateTime TDT;
            var appTdate = DateTime.TryParseExact(tdate.Trim(), "dd-MMM-yyyy", CultureInfo.InvariantCulture, DateTimeStyles.None, out TDT);
            {
                TDT.ToString("dd-MM-yyyy", CultureInfo.InvariantCulture);
            }
            var exptran = WYNKContext.ExpenseTran.Where(x => x.ExpenseDate.Date >= DT && x.ExpenseDate.Date <= TDT && x.CMPID == cmpid).ToList();
            var expmaster = WYNKContext.ExpenseMaster.Where(x => x.CMPID == cmpid).ToList();
            data.Expensestatementdata = (from et in exptran
                                         join em in expmaster on et.ExpenseMasterID equals em.ID
                                         select new Expensestatementdata
                                         {
                                              ID = et.ExpenseMasterID,
                                              Date = et.ExpenseDate.ToString("dd-MMM-yyyy"),
                                              ExpenseDescription =em.ExpenseDescription,
                                              TotalAmount = et.Amount,
                                              Remarks = et.Remarks,
                                         }).ToList();
            data.orderedamount = data.Expensestatementdata.Sum(x => x.TotalAmount);
            data.Comapnyaddress = CMPSContext.Company.Where(x => x.CmpID == cmpid).Select(x => x.Address1).FirstOrDefault();
            data.Comapnyaddress2 = CMPSContext.Company.Where(x => x.CmpID == cmpid).Select(x => x.Address2).FirstOrDefault();
            data.ComapnyPhone = CMPSContext.Company.Where(x => x.CmpID == cmpid).Select(x => x.Phone1).FirstOrDefault();
            return data;
        }

        ////////////////////////////////////////////////////////////////////////////The End///////////////////////////////////
    }
}
