using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using WYNK.Data.Common;
using WYNK.Data.Model;
using WYNK.Data.Model.ViewModel;
using WYNK.Helpers;

namespace WYNK.Data.Repository.Implementation
{
    class OpticalBillingRepository : RepositoryBase<OpticalBilling>, IOpticalBillingRepository
    {
        private readonly WYNKContext _Wynkcontext;
        private readonly CMPSContext _Cmpscontext;


        public OpticalBillingRepository(WYNKContext context, CMPSContext Cmpscontext) : base(context, Cmpscontext)
        {
            _Wynkcontext = context;
            _Cmpscontext = Cmpscontext;

        }



        public dynamic Getorders(int val, string Time)
        {
            var GetGrn = new OpticalBilling();

            var cusmas = WYNKContext.CustomerMaster.ToList();
            var cusorder = WYNKContext.CustomerOrder.ToList();
            var Locations = CMPSContext.LocationMaster.ToList();

            GetGrn.GetOpticaldetails = new List<GetOpticaldetails>();
            TimeSpan ts = TimeSpan.Parse(Time);

            GetGrn.GetOpticaldetails = (from CO in cusorder.Where(x => x.CmpID == val && x.IsCancelled == false && x.OrderStatus == "Open").OrderByDescending(x => x.CreatedUTC)
                                        join CM in cusmas on CO.CusID equals CM.ID

                                        select new GetOpticaldetails
                                        {
                                            RandomUniqueID = CO.RandomUniqueID,
                                            OrderNumber = CO.OrderNo,
                                            OrderDate = CO.OrderDate.Add(ts),
                                            UIN = CM.UIN != null ? CM.UIN : string.Empty,
                                            CustomerName = CM.Name != null ? CM.Name : string.Empty,
                                            CustomermiddleName = CM.MiddleName != null ? CM.MiddleName : string.Empty,
                                            CustomerlastName = CM.LastName != null ? CM.LastName : string.Empty,
                                            Address1 = CM.Address1 != null ? CM.Address1 : string.Empty,
                                            Address2 = CM.Address2 != null ? CM.Address2 : string.Empty,
                                            Location = CM.Location != null ? Locations.Where(X => X.ID == CM.Location).Select(x => x.ParentDescription).FirstOrDefault() : string.Empty,
                                            city = CM.Location != null ? Locations.Where(x => x.ID == Locations.Where(y => y.ID == CM.Location).Select(y => y.ParentID).FirstOrDefault()).Select(x => x.ParentDescription).FirstOrDefault() : string.Empty,
                                            State = CM.Location != null ? Locations.Where(v => v.ID == Locations.Where(x => x.ID == Locations.Where(y => y.ID == CM.Location).Select(y => y.ParentID).FirstOrDefault()).Select(x => x.ParentID).FirstOrDefault()).Select(x => x.ParentDescription).FirstOrDefault() : string.Empty,
                                            country = CM.Location != null ? Locations.Where(v => v.ID == Locations.Where(x => x.ID == Locations.Where(h => h.ID == Locations.Where(y => y.ID == CM.Location).Select(y => y.ParentID).FirstOrDefault()).Select(l => l.ParentID).FirstOrDefault()).Select(x => x.ParentID).FirstOrDefault()).Select(x => x.ParentDescription).FirstOrDefault() : string.Empty,
                                            Mobileno = CM.MobileNo != null ? CM.MobileNo : string.Empty,

                                        }

                 ).ToList();

            return GetGrn;
        }
        public dynamic GetGrntrnsdetails(string RandomUniqueID, int SID, int CmpID)
        {
            var optrns = new OpticalBilling();

            var Opticaltrns = WYNKContext.CustomerOrderTran.ToList();
            var uom = CMPSContext.uommaster.ToList();
            var taxMaster = CMPSContext.TaxMaster.ToList();
            var lens = WYNKContext.Lensmaster.ToList();
            var lenstrns = WYNKContext.Lenstrans.ToList();
            var brand = WYNKContext.Brand.ToList();


            var opticalbal = Convert.ToInt32(WYNKContext.OpticalBalance.Where(x => x.StoreID == SID && x.CmpID == CmpID).Select(x => x.StoreID).FirstOrDefault());

            if (opticalbal == 0)
            {
                return new
                {
                    Success = false,
                    Message = "None of the Store"
                };

            }


            else
            {

                optrns.GetOpticaldetailsfull = new List<GetOpticaldetailsfull>();
                optrns.GetOpticaldetailsfullcheck = new List<GetOpticaldetailsfullcheck>();

                var billno = WYNKContext.CustomerOrder.Where(x => x.RandomUniqueID == RandomUniqueID).Select(x => x.OrderNo).FirstOrDefault();
                var tcid = WYNKContext.CustomerOrder.Where(x => x.RandomUniqueID == RandomUniqueID).Select(x => x.TCID).FirstOrDefault();

                optrns.GetOpticaldetailsfull = (from Optrs in Opticaltrns.Where(x => x.COID == RandomUniqueID && x.OrderedQty != x.ReceivedQty)

                                                select new GetOpticaldetailsfull
                                                {
                                                    COTID = Optrs.ID,
                                                    COID = Optrs.COID,
                                                    LTID = Optrs.LTID,
                                                    LTname = lenstrns.Where(X => X.ID == Optrs.LTID).Select(x => x.LensOption).FirstOrDefault(),
                                                    UOMID = Optrs.UOMID,
                                                    UOMname = uom.Where(X => X.id == Optrs.UOMID).Select(x => x.Description).FirstOrDefault(),
                                                    Type = lens.Where(x => x.RandomUniqueID == lenstrns.Where(s => s.ID == Optrs.LTID).Select(a => a.LMID).FirstOrDefault()).Select(f => f.LensType).FirstOrDefault(),
                                                    Brand = brand.Where(x => x.ID == lenstrns.Where(s => s.ID == Optrs.LTID).Select(a => a.Brand).FirstOrDefault()).Select(f => f.Description).FirstOrDefault(),
                                                    Index = lenstrns.Where(X => X.ID == Optrs.LTID).Select(x => x.Index).FirstOrDefault(),
                                                    Color = lenstrns.Where(X => X.ID == Optrs.LTID).Select(x => x.Colour).FirstOrDefault(),
                                                    Model = lenstrns.Where(X => X.ID == Optrs.LTID).Select(x => x.Model).FirstOrDefault(),
                                                    OrderedQty = Optrs.OrderedQty,
                                                    Price = Optrs.ItemRate,
                                                    Value = Optrs.OrderedQty * Optrs.ItemRate,
                                                    DiscountAmount = Optrs.DiscountAmount,
                                                    DiscountPercentage = Optrs.DiscountPercentage,
                                                    GSTTaxValue = Optrs.GSTTaxValue,
                                                    GSTPercentage = Optrs.GSTPercentage,
                                                    CESSPercentage = Optrs.CESSPercentage,
                                                    CESSAmount = Optrs.CESSAmount,
                                                    AdditionalCESSPercentage = Optrs.AdditionalCESSPercentage,
                                                    AddCESSPerAmt = Optrs.AddCESSPerAmt,
                                                    Totalamount = ((Optrs.OrderedQty * Optrs.ItemRate) - Optrs.DiscountAmount) + (Optrs.GSTTaxValue != null ? Optrs.GSTTaxValue : 0) + (Optrs.CESSAmount != null ? Optrs.CESSAmount : 0) + (Optrs.AddCESSPerAmt != null ? Optrs.AddCESSPerAmt : 0),
                                                    GrossValue = ((Optrs.OrderedQty * Optrs.ItemRate) - Optrs.DiscountAmount),
                                                    TaxDescription = taxMaster.Where(v => v.ID == lenstrns.Where(y => y.ID == Optrs.LTID).Select(x => x.TaxID).FirstOrDefault()).Select(x => x.TaxDescription).FirstOrDefault(),
                                                    CessDescription = taxMaster.Where(v => v.ID == lenstrns.Where(y => y.ID == Optrs.LTID).Select(x => x.TaxID).FirstOrDefault()).Select(x => x.CESSDescription).FirstOrDefault(),
                                                    AddcessDescription = taxMaster.Where(v => v.ID == lenstrns.Where(y => y.ID == Optrs.LTID).Select(x => x.TaxID).FirstOrDefault()).Select(x => x.AdditionalCESSDescription).FirstOrDefault(),
                                                    TaxID = lenstrns.Where(X => X.ID == Optrs.LTID).Select(x => x.TaxID).FirstOrDefault(),
                                                }).ToList();



                var Date = DateTime.Now;
                var CurrentMonth = Date.Month;
                var FinancialYearId = WYNKContext.FinancialYear.Where(x => Convert.ToDateTime(x.FYFrom) <= Date && Convert.ToDateTime(x.FYTo) >= Date && x.CMPID == CmpID && x.IsActive == true).Select(x => x.ID).FirstOrDefault();



                if (optrns.GetOpticaldetailsfull.Count() > 0)
                {
                    foreach (var itm in optrns.GetOpticaldetailsfull.ToList())
                    {
                        var balance = new GetOpticaldetailsfullcheck();

                        var ItemBalance = WYNKContext.OpticalBalance.Where(x => x.FYID == FinancialYearId && x.LTID == itm.LTID && x.StoreID == SID && x.CmpID == CmpID).Select(x => x.ClosingBalance).FirstOrDefault();

                        if (ItemBalance >= itm.OrderedQty)
                        {
                            balance.Stockcheck = "On Stock";
                        }
                        else
                        {
                            balance.Stockcheck = "Out of Stock";
                        }

                        balance.COID = itm.COID;
                        balance.COTID = itm.COTID;
                        balance.LTID = itm.LTID;
                        balance.LTname = itm.LTname;
                        balance.UOMID = itm.UOMID;
                        balance.UOMname = itm.UOMname;
                        balance.Type = itm.Type;
                        balance.Brand = itm.Brand;
                        balance.Index = itm.Index;
                        balance.Color = itm.Color;
                        balance.Model = itm.Model;
                        balance.OrderedQty = itm.OrderedQty;
                        balance.Price = itm.Price;
                        balance.Value = itm.Value;
                        balance.DiscountAmount = itm.DiscountAmount;
                        balance.DiscountPercentage = itm.DiscountPercentage;
                        balance.GSTTaxValue = itm.GSTTaxValue;
                        balance.GSTPercentage = itm.GSTPercentage;
                        balance.CESSAmount = itm.CESSAmount;
                        balance.CESSPercentage = itm.CESSPercentage;
                        balance.AddCESSPerAmt = itm.AddCESSPerAmt;
                        balance.AdditionalCESSPercentage = itm.AdditionalCESSPercentage;
                        balance.GrossValue = itm.GrossValue;
                        balance.Totalamount = itm.Totalamount;
                        balance.TaxDescription = itm.TaxDescription;
                        balance.CessDescription = itm.CessDescription;
                        balance.AddcessDescription = itm.AddcessDescription;
                        balance.TaxID = itm.TaxID;

                        optrns.GetOpticaldetailsfullcheck.Add(balance);

                    }

                }

                var invtrans = WYNKContext.OpticalInvoiceTran.Where(x => x.COID == RandomUniqueID).Select(x => x.ID).ToList();

                if (invtrans.Count == 0)
                {

                    optrns.advance = WYNKContext.PaymentMaster.Where(x => x.UIN == billno && x.TransactionID == tcid).Sum(x => x.Amount);
                }

            }

            return optrns;
        }
        public dynamic GetGrntrnsdetailsstore(int SID, int CmpID)
        {
            var store = new OpticalBilling();

            var storeID = Convert.ToInt32(WYNKContext.OpticalBalance.Where(x => x.StoreID == SID && x.CmpID == CmpID).Select(x => x.StoreID).FirstOrDefault());

            if (storeID == 0)
            {
                return new
                {
                    Success = false,
                    Message = "None of the Store"
                };

            }
            else
            {

                return new
                {
                    Success = true,
                };
            }

        }
        public dynamic stockavailable(int ID, int SID, int CmpID)
        {
            var optrns = new OpticalBilling();

            var opticalbal = WYNKContext.OpticalBalance.ToList();
            var store = CMPSContext.Storemasters.ToList();
            var lens = WYNKContext.Lensmaster.ToList();
            var lenstrns = WYNKContext.Lenstrans.ToList();
            var brand = WYNKContext.Brand.ToList();
            var uom = CMPSContext.uommaster.ToList();

            var Date = DateTime.Now;
            var CurrentMonth = Date.Month;
            var FinancialYearId = WYNKContext.FinancialYear.Where(x => Convert.ToDateTime(x.FYFrom) <= Date && Convert.ToDateTime(x.FYTo) >= Date && x.CMPID == CmpID && x.IsActive == true).Select(x => x.ID).FirstOrDefault();

            optrns.Availablestock = new List<Availablestock>();


            optrns.Availablestock = (from Optrs in opticalbal.Where(x => x.FYID == FinancialYearId && x.LTID == ID && x.StoreID == SID && x.CmpID == CmpID)

                                     select new Availablestock
                                     {

                                         Closingbalance = Optrs.ClosingBalance,
                                         Storename = store.Where(X => X.StoreID == Optrs.StoreID).Select(x => x.Storename).FirstOrDefault(),
                                         Type = lens.Where(x => x.RandomUniqueID == lenstrns.Where(s => s.ID == Optrs.LTID).Select(a => a.LMID).FirstOrDefault()).Select(f => f.LensType).FirstOrDefault(),
                                         Description = lenstrns.Where(X => X.ID == Optrs.LTID).Select(x => x.LensOption).FirstOrDefault(),
                                         Brand = brand.Where(x => x.ID == lenstrns.Where(s => s.ID == Optrs.LTID).Select(a => a.Brand).FirstOrDefault()).Select(f => f.Description).FirstOrDefault(),
                                         uom = uom.Where(X => X.id == Optrs.UOMID).Select(x => x.Description).FirstOrDefault(),
                                     }).ToList();




            return optrns;
        }
        public dynamic Beforesubmitcheckstock(OpticalBilling GetOpticaldetailsfullcheck, int SID, int CmpID)
        {

            var stock = new OpticalBilling();
            stock.GetOpticaldetailsfullbefore = new List<GetOpticaldetailsfullbefore>();

            var Date = DateTime.Now;
            var CurrentMonth = Date.Month;
            var FinancialYearId = WYNKContext.FinancialYear.Where(x => Convert.ToDateTime(x.FYFrom) <= Date && Convert.ToDateTime(x.FYTo) >= Date && x.CMPID == CmpID && x.IsActive == true).Select(x => x.ID).FirstOrDefault();

            if (GetOpticaldetailsfullcheck.GetOpticaldetailsfullcheck.Count() > 0)
            {
                foreach (var itm in GetOpticaldetailsfullcheck.GetOpticaldetailsfullcheck.ToList())
                {
                    var balance = new GetOpticaldetailsfullbefore();

                    var ItemBalance = WYNKContext.OpticalBalance.Where(x => x.FYID == FinancialYearId && x.LTID == itm.LTID && x.StoreID == SID && x.CmpID == CmpID).Select(x => x.ClosingBalance).FirstOrDefault();

                    if (ItemBalance >= itm.OrderedQty)
                    {
                        balance.Stockcheck = "On Stock";
                    }
                    else
                    {
                        balance.Stockcheck = "Out of Stock";
                    }

                    balance.COID = itm.COID;
                    balance.COTID = itm.COTID;
                    balance.LTID = itm.LTID;
                    balance.LTname = itm.LTname;
                    balance.UOMID = itm.UOMID;
                    balance.UOMname = itm.UOMname;
                    balance.Type = itm.Type;
                    balance.Brand = itm.Brand;
                    balance.Index = itm.Index;
                    balance.Color = itm.Color;
                    balance.Model = itm.Model;
                    balance.OrderedQty = itm.OrderedQty;
                    balance.Price = itm.Price;
                    balance.Value = itm.Value;
                    balance.DiscountAmount = itm.DiscountAmount;
                    balance.DiscountPercentage = itm.DiscountPercentage;
                    balance.GSTTaxValue = itm.GSTTaxValue;
                    balance.GSTPercentage = itm.GSTPercentage;
                    balance.CESSAmount = itm.CESSAmount;
                    balance.CESSPercentage = itm.CESSPercentage;
                    balance.AddCESSPerAmt = itm.AddCESSPerAmt;
                    balance.AdditionalCESSPercentage = itm.AdditionalCESSPercentage;
                    balance.GrossValue = itm.GrossValue;
                    balance.Totalamount = itm.Totalamount;
                    balance.TaxDescription = itm.TaxDescription;
                    balance.CessDescription = itm.CessDescription;
                    balance.AddcessDescription = itm.AddcessDescription;

                    stock.GetOpticaldetailsfullbefore.Add(balance);

                }

            }


            return stock;


        }
        public dynamic InsertOptBilling(OpticalBilling OpticalBilling, int CmpID, int TID, int SID)
        {

            using (var dbContextTransaction = WYNKContext.Database.BeginTransaction())
            {
                try
                {
                    var ibm = new OpticalInvoiceMaster();
                    var osm = new OpticalStockMaster();
                    var transcation = CMPSContext.TransactionType.ToList();
                    var lensmas = WYNKContext.Lensmaster.ToList();
                    var lenstrns = WYNKContext.Lenstrans.ToList();

                    ibm.CMPID = CmpID;
                    ibm.TransactionId = TID;
                    ibm.RandomUniqueID = PasswordEncodeandDecode.GetRandomnumber();
                    string RandomUniqueID = ibm.RandomUniqueID;
                    ibm.InvoiceNumber = OpticalBilling.OpticalInvoiceMaster.InvoiceNumber;
                    var Datee = DateTime.Now;
                    ibm.Fyear = Convert.ToString(WYNKContext.FinancialYear.Where(x => x.ID == WYNKContext.FinancialYear.Where(b => Convert.ToDateTime(b.FYFrom) <= Datee && Convert.ToDateTime(b.FYTo) >= Datee && b.CMPID == CmpID && b.IsActive == true).Select(f => f.ID).FirstOrDefault()).Select(c => c.FYAccYear).FirstOrDefault());
                    ibm.InvoiceDate = DateTime.UtcNow;
                    ibm.GrossProductValue = OpticalBilling.OpticalInvoiceMaster.GrossProductValue;
                    ibm.TotalDiscountValue = OpticalBilling.OpticalInvoiceMaster.TotalDiscountValue;
                    ibm.TotalTaxValue = OpticalBilling.OpticalInvoiceMaster.TotalTaxValue;
                    ibm.TotalCGSTTaxValue = (OpticalBilling.OpticalInvoiceMaster.TotalTaxValue) / 2;
                    ibm.TotalSGSTTaxValue = (OpticalBilling.OpticalInvoiceMaster.TotalTaxValue) / 2;
                    ibm.NetAmount = OpticalBilling.OpticalInvoiceMaster.NetAmount;
                    ibm.CESSAmount = OpticalBilling.OpticalInvoiceMaster.CESSAmount;
                    ibm.AdditionalCESSAmount = OpticalBilling.OpticalInvoiceMaster.AdditionalCESSAmount;
                    ibm.CreatedUTC = DateTime.UtcNow;
                    ibm.CreatedBy = OpticalBilling.OpticalInvoiceMaster.CreatedBy;
                    WYNKContext.OpticalInvoiceMaster.Add(ibm);
                    WYNKContext.SaveChanges();

                    if (OpticalBilling.GetOpticaldetailsfullcheck.Count() > 0)
                    {
                        foreach (var item in OpticalBilling.GetOpticaldetailsfullcheck.ToList())
                        {

                            var ibt = new OpticalInvoiceTran();

                            ibt.OID = RandomUniqueID;
                            ibt.COID = item.COID;
                            ibt.COTID = item.COTID;
                            ibt.LensID = item.LTID;
                            ibt.Quantity = Convert.ToInt32(item.OrderedQty);
                            ibt.Description = "null";
                            ibt.UOMID = item.UOMID;
                            ibt.Amount = item.Price;
                            ibt.itemValue = item.Value;
                            ibt.DiscountPercentage = item.DiscountPercentage;
                            ibt.DiscountAmount = item.DiscountAmount;
                            ibt.GSTPercentage = item.GSTPercentage;
                            ibt.GSTTaxValue = item.GSTTaxValue;
                            ibt.CGSTPercentage = item.GSTPercentage / 2;
                            ibt.CGSTTaxValue = item.GSTTaxValue / 2;
                            ibt.SGSTPercentage = item.GSTPercentage / 2;
                            ibt.SGSTTaxValue = item.GSTTaxValue / 2;
                            ibt.CESSPercentage = item.CESSPercentage;
                            ibt.CESSAmount = item.CESSAmount;
                            ibt.AdditionalCESSPercentage = item.AdditionalCESSPercentage;
                            ibt.AdditionalCESSAmount = item.AddCESSPerAmt;
                            ibt.CreatedUTC = DateTime.UtcNow;
                            ibt.CreatedBy = ibm.CreatedBy;
                            ibt.TaxID = item.TaxID;
                            WYNKContext.OpticalInvoiceTran.AddRange(ibt);

                        }
                    }

                    osm.RandomUniqueID = RandomUniqueID;
                    osm.TransactionID = TID;
                    osm.CMPID = CmpID;
                    osm.Fyear = Convert.ToString(WYNKContext.FinancialYear.Where(x => x.ID == WYNKContext.FinancialYear.Where(b => Convert.ToDateTime(b.FYFrom) <= Datee && Convert.ToDateTime(b.FYTo) >= Datee && b.CMPID == CmpID && b.IsActive == true).Select(f => f.ID).FirstOrDefault()).Select(c => c.FYAccYear).FirstOrDefault());
                    osm.DocumentNumber = ibm.InvoiceNumber;
                    osm.DocumentDate = ibm.InvoiceDate;
                    osm.OpticalOrderID = "0";
                    osm.StoreID = SID;
                    osm.TransactionType = transcation.Where(X => X.TransactionID == TID).Select(x => x.Rec_Issue_type).FirstOrDefault();
                    osm.VendorID = 0;
                    osm.DepartmentID = 0;
                    osm.GrossProductValue = ibm.GrossProductValue;
                    osm.TotalDiscountValue = ibm.TotalDiscountValue;
                    osm.TotalTaxValue = ibm.TotalTaxValue;
                    osm.TotalCGSTTaxValue = ibm.TotalTaxValue / 2;
                    osm.TotalSGSTTaxValue = ibm.TotalTaxValue / 2;
                    osm.TotalPOValue = ibm.NetAmount;
                    osm.CESSAmount = ibm.CESSAmount;
                    osm.AdditionalCESSAmount = ibm.AdditionalCESSAmount;
                    osm.IsCancelled = false;
                    osm.IsDeleted = false;
                    osm.CreatedUTC = DateTime.UtcNow;
                    osm.CreatedBy = ibm.CreatedBy;
                    WYNKContext.OpticalStockMaster.AddRange(osm);


                    if (OpticalBilling.GetOpticaldetailsfullcheck.Count() > 0)
                    {


                        foreach (var item in OpticalBilling.GetOpticaldetailsfullcheck.ToList())
                        {
                            var ost = new OpticalStockTran();

                            ost.RandomUniqueID = RandomUniqueID;
                            ost.LMIDID = item.LTID;
                            ost.ItemQty = item.OrderedQty;
                            ost.UOMID = item.UOMID;
                            ost.ItemRate = item.Price;
                            ost.ItemValue = item.Value;
                            ost.POID = 0;
                            ost.DiscountPercentage = item.DiscountPercentage;
                            ost.DiscountAmount = item.DiscountAmount;
                            ost.GSTPercentage = item.GSTPercentage;
                            ost.GSTTaxValue = item.GSTTaxValue;
                            ost.CGSTPercentage = item.GSTPercentage / 2;
                            ost.CGSTTaxValue = item.GSTTaxValue / 2;
                            ost.SGSTPercentage = item.GSTPercentage / 2;
                            ost.SGSTTaxValue = item.GSTTaxValue / 2;
                            ost.CESSPercentage = item.CESSPercentage;
                            ost.CESSAmount = item.CESSAmount;
                            ost.AdditionalCESSPercentage = item.AdditionalCESSPercentage;
                            ost.AddCESSAmount = item.AddCESSPerAmt;
                            ost.IsDeleted = false;
                            ost.CreatedUTC = DateTime.UtcNow;
                            ost.CreatedBy = osm.CreatedBy;
                            WYNKContext.OpticalStockTran.AddRange(ost);
                        }
                    }


                    if (OpticalBilling.PaymentMaster.Count > 0)
                    {
                        foreach (var item in OpticalBilling.PaymentMaster.ToList())
                        {
                            var payment = new Payment_Master();

                            payment.UIN = ibm.InvoiceNumber;
                            payment.PaymentType = "O";
                            payment.PaymentMode = item.PaymentMode;
                            payment.InstrumentNumber = item.InstrumentNumber;
                            if (item.Instrumentdate != null)
                            {
                                payment.Instrumentdate = Convert.ToDateTime(item.Instrumentdate);
                            }
                            else
                            {
                                payment.Instrumentdate = null;
                            }
                            payment.BankBranch = item.BankBranch;
                            payment.BankName = item.BankName;

                            if (item.Expirydate != null)
                            {
                                payment.Expirydate = Convert.ToDateTime(item.Expirydate);
                            }
                            else
                            {
                                payment.Expirydate = null;
                            }

                            payment.Amount = Convert.ToDecimal(item.Amount);
                            payment.IsBilled = true;
                            payment.PaymentReferenceID = ibm.ID;
                            var date = DateTime.Now;
                            payment.Fyear = Convert.ToString(WYNKContext.FinancialYear.Where(x => x.ID == WYNKContext.FinancialYear.Where(b => Convert.ToDateTime(b.FYFrom) <= date && Convert.ToDateTime(b.FYTo) >= date && b.CMPID == CmpID && b.IsActive == true).Select(f => f.ID).FirstOrDefault()).Select(c => c.FYAccYear).FirstOrDefault());
                            payment.ReceiptNumber = OpticalBilling.ReceiptRunningNo;
                            payment.ReceiptDate = DateTime.UtcNow;
                            payment.TransactionID = TID;
                            payment.CmpID = CmpID;
                            payment.CreatedBy = ibm.CreatedBy;
                            payment.CreatedUTC = DateTime.UtcNow;
                            WYNKContext.PaymentMaster.Add(payment);
                        }

                    }


                    if (OpticalBilling.GetOpticaldetailsfullcheck.Count() > 0)
                    {
                        foreach (var item in OpticalBilling.GetOpticaldetailsfullcheck.ToList())
                        {
                            var opid = WYNKContext.CustomerOrderTran.Where(x => x.COID == item.COID && x.LTID == item.LTID).ToList();
                            if (opid != null)
                            {
                                opid.All(x =>
                                {
                                    x.ReceivedQty = Convert.ToInt32(item.OrderedQty);
                                    return true;
                                });
                                WYNKContext.CustomerOrderTran.UpdateRange(opid);
                                WYNKContext.SaveChanges();
                            }

                            var match = false;
                            var id = WYNKContext.CustomerOrderTran.Where(x => x.COID == item.COID).Select(x => x.OrderedQty).ToList();
                            var ids = WYNKContext.CustomerOrderTran.Where(x => x.COID == item.COID).Select(x => x.ReceivedQty).ToList();
                            if (id.SequenceEqual(ids))
                            {
                                match = true;
                            }
                            else
                            {
                                match = false;
                            }

                            if (match == true)
                            {
                                var opm = WYNKContext.CustomerOrder.Where(x => x.RandomUniqueID == item.COID).ToList();
                                if (opm != null)
                                {
                                    opm.All(x =>
                                    {
                                        x.OrderStatus = "Closed";
                                        return true;
                                    });
                                    WYNKContext.CustomerOrder.UpdateRange(opm);
                                }
                            }
                            else
                            {

                            }

                        }
                    }

                    var Date = DateTime.Now;
                    var CurrentMonth = Date.Month;
                    var FinancialYearId = WYNKContext.FinancialYear.Where(x => Convert.ToDateTime(x.FYFrom) <= Date && Convert.ToDateTime(x.FYTo) >= Date && x.CMPID == CmpID && x.IsActive == true).Select(x => x.ID).FirstOrDefault();

                    if (FinancialYearId == 0)
                    {
                        dbContextTransaction.Rollback();
                        return new
                        {
                            Success = false,
                            Message = "Financial year doesn't exists"
                        };
                    }

                    else
                    {
                        if (OpticalBilling.GetOpticaldetailsfullcheck.Count() > 0)
                        {
                            foreach (var item in OpticalBilling.GetOpticaldetailsfullcheck.ToList())
                            {
                                var ItemBalance = WYNKContext.OpticalBalance.Where(x => x.FYID == FinancialYearId && x.LTID == item.LTID && x.StoreID == SID && x.CmpID == CmpID).FirstOrDefault();
                                if (ItemBalance != null)
                                {
                                    switch (CurrentMonth)
                                    {
                                        case 1:
                                            ItemBalance.ISS01 = ItemBalance.ISS01 + Convert.ToInt32(item.OrderedQty);
                                            break;
                                        case 2:
                                            ItemBalance.ISS02 = ItemBalance.ISS02 + Convert.ToInt32(item.OrderedQty);

                                            break;
                                        case 3:
                                            ItemBalance.ISS03 = ItemBalance.ISS03 + Convert.ToInt32(item.OrderedQty);

                                            break;
                                        case 4:
                                            ItemBalance.ISS04 = ItemBalance.ISS04 + Convert.ToInt32(item.OrderedQty);

                                            break;
                                        case 5:
                                            ItemBalance.ISS05 = ItemBalance.ISS05 + Convert.ToInt32(item.OrderedQty);

                                            break;
                                        case 6:
                                            ItemBalance.ISS06 = ItemBalance.ISS06 + Convert.ToInt32(item.OrderedQty);

                                            break;
                                        case 7:
                                            ItemBalance.ISS07 = ItemBalance.ISS07 + Convert.ToInt32(item.OrderedQty);

                                            break;
                                        case 8:
                                            ItemBalance.ISS08 = ItemBalance.ISS08 + Convert.ToInt32(item.OrderedQty);

                                            break;
                                        case 9:
                                            ItemBalance.ISS09 = ItemBalance.ISS09 + Convert.ToInt32(item.OrderedQty);

                                            break;
                                        case 10:
                                            ItemBalance.ISS10 = ItemBalance.ISS10 + Convert.ToInt32(item.OrderedQty);
                                            break;
                                        case 11:
                                            ItemBalance.ISS11 = ItemBalance.ISS11 + Convert.ToInt32(item.OrderedQty);
                                            break;
                                        case 12:
                                            ItemBalance.ISS12 = ItemBalance.ISS12 + Convert.ToInt32(item.OrderedQty);
                                            break;
                                    }

                                    ItemBalance.ClosingBalance = ItemBalance.ClosingBalance - Convert.ToInt32(item.OrderedQty);
                                    WYNKContext.OpticalBalance.UpdateRange(ItemBalance);
                                }

                            }
                        }
                    }


                    if (OpticalBilling.GetOpticaldetailsfullcheck.Count() > 0)
                    {
                        foreach (var item in OpticalBilling.GetOpticaldetailsfullcheck.ToList())

                        {
                            var taxidd = CMPSContext.TaxMaster.Where(x => x.ID == item.TaxID).ToList();
                            var taxgrp = CMPSContext.TaxMaster.Where(x => x.ID == item.TaxID).Select(x => x.TaxGroupId).FirstOrDefault();
                            if (taxidd != null && taxidd.Count != 0)
                            {
                                taxidd.All(x => { x.istransact = false; return true; });
                                CMPSContext.TaxMaster.UpdateRange(taxidd);
                                CMPSContext.SaveChanges();
                            }

                            var now = DateTime.UtcNow;
                            var first = new DateTime(now.Year, now.Month, 1);
                            var last = first.AddMonths(1).AddDays(-1);

                            var taid = (from TS in WYNKContext.TaxSummary.Where(x => x.TransactionDate == last && x.CMPID == CmpID && x.BillingType == "B" && x.TaxID == item.TaxID)
                                        select new
                                        {
                                            ret = TS.TaxID,

                                        }).ToList();
                            if (taid.Count == 0)
                            {
                                var tax = new Tax_Summary();
                                tax.TaxID = item.TaxID;
                                tax.CMPID = CmpID;
                                tax.BillingType = "B";
                                tax.TransactionDate = last;
                                tax.TaxGroupID = taxgrp;
                                tax.GrossAmount = ibm.GrossProductValue;
                                tax.TaxDescription = item.TaxDescription;
                                tax.CESSDescription = item.CessDescription;
                                tax.AddlCESSDescription = item.AddcessDescription;
                                tax.TaxPercentage = CMPSContext.TaxMaster.Where(x => x.ID == item.TaxID).Select(x => x.GSTPercentage).FirstOrDefault();
                                tax.TaxValue = getvalue(item.GSTTaxValue);
                                tax.Tax1Percentage = Convert.ToInt16((CMPSContext.TaxMaster.Where(x => x.ID == item.TaxID).Select(x => x.GSTPercentage).FirstOrDefault()) / 2);
                                tax.Tax1Value = getvalue(item.GSTTaxValue / 2);
                                tax.Tax2Percentage = Convert.ToInt16((CMPSContext.TaxMaster.Where(x => x.ID == item.TaxID).Select(x => x.GSTPercentage).FirstOrDefault()) / 2);
                                tax.Tax2Value = getvalue(item.GSTTaxValue / 2);
                                tax.CESSPercentage = item.CESSPercentage;
                                tax.CESSValue = getvalue(item.CESSAmount);
                                tax.AddlCESSPercentage = item.AdditionalCESSPercentage;
                                tax.AddlCESSValue = getvalue(item.AddCESSPerAmt);
                                tax.CreatedUTC = DateTime.UtcNow;
                                tax.CreatedBy = ibm.CreatedBy;
                                WYNKContext.TaxSummary.AddRange(tax);
                                WYNKContext.SaveChanges();
                            }
                            else
                            {

                                var masters = WYNKContext.TaxSummary.Where(x => x.TransactionDate == last && x.CMPID == CmpID && x.BillingType == "B" && x.TaxID == item.TaxID).LastOrDefault();
                                masters.GrossAmount += ibm.GrossProductValue;
                                masters.TaxValue += item.GSTTaxValue;
                                masters.Tax1Value += item.GSTTaxValue / 2;
                                masters.Tax2Value += item.GSTTaxValue / 2;
                                masters.CESSValue += item.CESSAmount;
                                masters.AddlCESSValue += item.AddCESSPerAmt;
                                masters.UpdatedUTC = DateTime.UtcNow;
                                masters.UpdatedBy = ibm.CreatedBy;
                                WYNKContext.TaxSummary.UpdateRange(masters);

                            }

                        }



                    }



                    WYNKContext.SaveChanges();
                    dbContextTransaction.Commit();

                    var commonRepos = new CommonRepository(_Wynkcontext, _Cmpscontext);
                    var RunningNumber = commonRepos.GenerateRunningCtrlNoo(TID, CmpID, "GetRunningNo");

                    if (RunningNumber == OpticalBilling.OpticalInvoiceMaster.InvoiceNumber)
                    {
                        commonRepos.GenerateRunningCtrlNoo(TID, CmpID, "UpdateRunningNo");
                    }
                    else
                    {
                        var GetRunningNumber = commonRepos.GenerateRunningCtrlNoo(TID, CmpID, "UpdateRunningNo");

                        var ib = WYNKContext.OpticalInvoiceMaster.Where(x => x.InvoiceNumber == OpticalBilling.OpticalInvoiceMaster.InvoiceNumber).FirstOrDefault();
                        ib.InvoiceNumber = GetRunningNumber;
                        WYNKContext.OpticalInvoiceMaster.UpdateRange(ib);
                        WYNKContext.SaveChanges();
                    }

                    var RecContraID = commonRepos.GettingReceiptTcID(TID, CmpID);
                    var ReceiptRunningNumber = commonRepos.GenerateRunningCtrlNoo(Convert.ToInt32(RecContraID), CmpID, "GetRunningNo");
                    if (ReceiptRunningNumber == OpticalBilling.ReceiptRunningNo)
                    {
                        commonRepos.GenerateRunningCtrlNoo(Convert.ToInt32(RecContraID), CmpID, "UpdateRunningNo");
                    }
                    else
                    {
                        var payments = WYNKContext.PaymentMaster.Where(x => x.ReceiptNumber == OpticalBilling.ReceiptRunningNo && x.TransactionID == TID).ToList();
                        payments.All(x => { x.ReceiptNumber = ReceiptRunningNumber; return true; });
                        WYNKContext.PaymentMaster.UpdateRange(payments);
                    }

                    return new
                    {

                        Success = true,
                        OpticalID = ibm.RandomUniqueID,
                    };
                }
                catch (Exception ex)
                {
                    dbContextTransaction.Rollback();
                    Console.Write(ex);
                    string msg = ex.InnerException.Message;
                    return new { Success = false, Message = msg, Bill = OpticalBilling.OpticalInvoiceMaster.InvoiceNumber };
                }
            }


        }

        public decimal? getvalue(decimal? data)
        {
            var a = 0;
            var b = data;
            if (b != null)
            {
                return b;
            }
            return a;
        }
        public dynamic Opticalbillingprint(string OpticalID, int CMPID, int TID, string Time)
        {
            var cusmas = WYNKContext.CustomerMaster.ToList();
            var cusorder = WYNKContext.CustomerOrder.ToList();
            var Locations = CMPSContext.LocationMaster.ToList();
            var opms = WYNKContext.OpticalInvoiceMaster.ToList();
            var opt = WYNKContext.OpticalInvoiceTran.ToList();
            var company = CMPSContext.Company.ToList();
            var uom = CMPSContext.uommaster.ToList();
            var taxMaster = CMPSContext.TaxMaster.ToList();
            var lens = WYNKContext.Lensmaster.ToList();
            var lenstrns = WYNKContext.Lenstrans.ToList();
            var brand = WYNKContext.Brand.ToList();
            var pay = WYNKContext.PaymentMaster.ToList();

            var GetGrn = new OpticalBilling();
            TimeSpan ts = TimeSpan.Parse(Time);

            GetGrn.UIN = cusmas.Where(q => q.ID == cusorder.Where(x => x.RandomUniqueID == opt.Where(y => y.OID == OpticalID).Select(y => y.COID).FirstOrDefault()).Select(x => x.CusID).FirstOrDefault()).Select(s => s.UIN != null ? s.UIN : string.Empty).FirstOrDefault();
            GetGrn.CustomerName = cusmas.Where(q => q.ID == cusorder.Where(x => x.RandomUniqueID == opt.Where(y => y.OID == OpticalID).Select(y => y.COID).FirstOrDefault()).Select(x => x.CusID).FirstOrDefault()).Select(s => s.Name + "" + s.MiddleName + "" + s.LastName).FirstOrDefault();
            GetGrn.InvoiceNumber = opms.Where(x => x.RandomUniqueID == OpticalID).Select(x => x.InvoiceNumber).FirstOrDefault();
            GetGrn.InvoiceDate = opms.Where(x => x.RandomUniqueID == OpticalID).Select(x => x.InvoiceDate).FirstOrDefault().Value.Add(ts);

            GetGrn.Compnayname = company.Where(x => x.CmpID == CMPID).Select(x => x.CompanyName).FirstOrDefault();
            GetGrn.companyAddress = company.Where(x => x.CmpID == CMPID).Select(x => x.Address1 != null ? x.Address1 : string.Empty).FirstOrDefault();
            GetGrn.companyAddress1 = company.Where(x => x.CmpID == CMPID).Select(x => x.Address2 != null ? x.Address2 : string.Empty).FirstOrDefault();
            GetGrn.companyAddress2 = company.Where(x => x.CmpID == CMPID).Select(x => x.Address3 != null ? x.Address3 : string.Empty).FirstOrDefault();
            GetGrn.phone = company.Where(x => x.CmpID == CMPID).Select(x => x.Phone1).FirstOrDefault();
            GetGrn.web = company.Where(x => x.CmpID == CMPID).Select(x => x.Website).FirstOrDefault();

            GetGrn.opticalbillingtran = (from Optrs in opt.Where(x => x.OID == OpticalID)

                                         select new opticalbillingtran
                                         {

                                             LTname = lenstrns.Where(X => X.ID == Optrs.LensID).Select(x => x.LensOption).FirstOrDefault(),
                                             UOMname = uom.Where(X => X.id == Optrs.UOMID).Select(x => x.Description).FirstOrDefault(),
                                             Type = lens.Where(x => x.RandomUniqueID == lenstrns.Where(s => s.ID == Optrs.LensID).Select(a => a.LMID).FirstOrDefault()).Select(f => f.LensType).FirstOrDefault(),
                                             Brand = brand.Where(x => x.ID == lenstrns.Where(s => s.ID == Optrs.LensID).Select(a => a.Brand).FirstOrDefault()).Select(f => f.Description).FirstOrDefault(),
                                             Index = lenstrns.Where(X => X.ID == Optrs.LensID).Select(x => x.Index).FirstOrDefault(),
                                             Color = lenstrns.Where(X => X.ID == Optrs.LensID).Select(x => x.Colour).FirstOrDefault(),
                                             Model = lenstrns.Where(X => X.ID == Optrs.LensID).Select(x => x.Model).FirstOrDefault(),
                                             OrderedQty = Optrs.Quantity,
                                             Price = Optrs.Amount,
                                             Value = Optrs.itemValue,
                                             DiscountAmount = Optrs.DiscountAmount,
                                             DiscountPercentage = Optrs.DiscountPercentage,
                                             GSTTaxValue = Optrs.GSTTaxValue,
                                             GSTPercentage = Optrs.GSTPercentage,
                                             CESSPercentage = Optrs.CESSPercentage,
                                             CESSAmount = Optrs.CESSAmount,
                                             AdditionalCESSPercentage = Optrs.AdditionalCESSPercentage,
                                             AddCESSPerAmt = Optrs.AdditionalCESSAmount,
                                             Totalamount = ((Optrs.Quantity * Optrs.Amount) - Optrs.DiscountAmount) + (Optrs.GSTTaxValue != null ? Optrs.GSTTaxValue : 0) + (Optrs.CESSAmount != null ? Optrs.CESSAmount : 0) + (Optrs.AdditionalCESSAmount != null ? Optrs.AdditionalCESSAmount : 0),
                                             GrossValue = ((Optrs.Quantity * Optrs.Amount) - Optrs.DiscountAmount),
                                             TaxDescription = taxMaster.Where(v => v.ID == lens.Where(x => x.RandomUniqueID == lenstrns.Where(y => y.ID == Optrs.LensID).Select(y => y.LMID).FirstOrDefault()).Select(x => x.TaxID).FirstOrDefault()).Select(x => x.TaxDescription).FirstOrDefault(),
                                             CessDescription = taxMaster.Where(v => v.ID == lens.Where(x => x.RandomUniqueID == lenstrns.Where(y => y.ID == Optrs.LensID).Select(y => y.LMID).FirstOrDefault()).Select(x => x.TaxID).FirstOrDefault()).Select(x => x.CESSDescription).FirstOrDefault(),
                                             AddcessDescription = taxMaster.Where(v => v.ID == lens.Where(x => x.RandomUniqueID == lenstrns.Where(y => y.ID == Optrs.LensID).Select(y => y.LMID).FirstOrDefault()).Select(x => x.TaxID).FirstOrDefault()).Select(x => x.AdditionalCESSDescription).FirstOrDefault(),
                                         }).ToList();


            GetGrn.printpaymnetbilling = (from om in opms.Where(x => x.RandomUniqueID == OpticalID && x.CMPID == CMPID)
                                          join pm in pay.Where(x => x.TransactionID == TID)
                                          on om.ID equals pm.PaymentReferenceID

                                          select new printpaymnetbilling
                                          {

                                              PaymentMode = pm.PaymentMode,
                                              InstrumentNumber = pm.InstrumentNumber,
                                              Instrumentdate = pm.Instrumentdate,
                                              Expirydate = pm.Expirydate,
                                              BankName = pm.BankName,
                                              BankBranch = pm.BankBranch,
                                              Amount = pm.Amount,
                                              Receiptnumber = pm.ReceiptNumber,
                                              Receiptdate = pm.ReceiptDate.Value.Add(ts),

                                          }).ToList();


            foreach (var item in GetGrn.printpaymnetbilling.ToList())
            {
                var e = item.Amount;

                if (GetGrn.TotalAmountprinting == 0)
                {
                    GetGrn.TotalAmountprinting = e;
                }
                else
                {
                    GetGrn.TotalAmountprinting = GetGrn.TotalAmountprinting + e;

                }

            }



            try
            {

                return new
                {
                    pUIN = GetGrn.UIN,
                    pCustomerName = GetGrn.CustomerName,
                    pOrderNumber = GetGrn.InvoiceNumber,
                    pOrderDate = GetGrn.InvoiceDate,
                    pcompanyAddress = GetGrn.companyAddress,
                    pcompanyAddress1 = GetGrn.companyAddress1,
                    pcompanyAddress2 = GetGrn.companyAddress2,
                    pphone = GetGrn.phone,
                    pweb = GetGrn.web,
                    pCompnayname = GetGrn.Compnayname,
                    totalamt = GetGrn.TotalAmountprinting,
                    optransdetails = GetGrn.opticalbillingtran.ToList(),
                    paymnetbilling = GetGrn.printpaymnetbilling.ToList(),

                };
            }
            catch (Exception ex)
            {
                Console.Write(ex);
            }
            return new
            {
                Success = false,
            };

        }









    }

}






