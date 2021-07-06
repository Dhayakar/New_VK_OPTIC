using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using WYNK.Data.Model;
using WYNK.Data.Model.ViewModel;
using WYNK.Helpers;

namespace WYNK.Data.Repository.Implementation
{
    class OpticalStockLedgerRepository : RepositoryBase<OpticalStockLedgerDataView>, IOpticalStockLedgerRepository
    {
        private readonly WYNKContext _Wynkcontext;
        private readonly CMPSContext _Cmpscontext;


        public OpticalStockLedgerRepository(WYNKContext context, CMPSContext Cmpscontext) : base(context, Cmpscontext)
        {
            _Wynkcontext = context;
            _Cmpscontext = Cmpscontext;

        }

        public dynamic GetStockLedger(OpticalStockLedgerDataView stockledger, DateTime From, DateTime To, int CompanyID, string Time)
        {
            var FinancialYear = WYNKContext.FinancialYear.ToList();
            var OpticalBalance = WYNKContext.OpticalBalance.ToList();
            var Lensmaster = WYNKContext.Lensmaster.ToList();
            var Lenstrans = WYNKContext.Lenstrans.ToList();
            var Brand = WYNKContext.Brand.ToList();
            var uommaster = CMPSContext.uommaster.ToList();
            var Storemasters = CMPSContext.Storemasters.ToList();
            var OpticalStockMaster = WYNKContext.OpticalStockMaster.ToList();
            var OpticalStockTran = WYNKContext.OpticalStockTran.ToList();
            var TransactionType = CMPSContext.TransactionType.ToList();
            var Company = CMPSContext.Company.ToList();
            TimeSpan ts = TimeSpan.Parse(Time);



            var Opticalstkledger = new OpticalStockLedgerDataView();
            Opticalstkledger.StoreArray = new List<StoreArray>();
            Opticalstkledger.BrandArray = new List<BrandArray>();
            Opticalstkledger.Opticalstockledger = new List<Opticalstockledger>();
            Opticalstkledger.OpticalstockledgerI = new List<OpticalstockledgerI>();
            Opticalstkledger.Receipt = new List<Receipt>();
            Opticalstkledger.Issue = new List<Issue>();
            Opticalstkledger.Companycomm = new List<Companycomm>();

            var StoreArray = (from s in stockledger.StoreArray

                              select new
                              {
                                  ID = s.StoreID,
                                  Name = s.StoreName,

                              }).ToList();

            var BrandArray = (from b in stockledger.BrandArray

                              select new
                              {
                                  ID = b.BrandID,
                                  Name = b.BrandName,

                              }).ToList();



            var concatarray = StoreArray.Count() >= BrandArray.Count() ? StoreArray.ToList() : BrandArray.ToList();

            if (concatarray.Count() == StoreArray.Count())
            {

                if (concatarray.Count() > 0)
                {

                    foreach (var ba in BrandArray.ToList())
                    {
                        foreach (var sa in StoreArray.ToList())
                        {


                            Opticalstkledger.Receipt = (from OB in OpticalBalance.Where(x => x.StoreID == Convert.ToInt32(sa.ID) && Convert.ToDateTime(x.CreatedUTC.Add(ts).ToString("yyyy/MM")) >= Convert.ToDateTime((From).ToString("yyyy/MM")) && Convert.ToDateTime(x.CreatedUTC.Add(ts).ToString("yyyy/MM")) <= Convert.ToDateTime((To).ToString("yyyy/MM")) && x.CmpID == CompanyID)
                                                        join LT in Lenstrans on OB.LTID equals LT.ID
                                                        join BR in Brand.Where(x => x.ID == Convert.ToInt32(ba.ID)) on LT.Brand equals BR.ID
                                                        join UM in uommaster on LT.UOMID equals UM.id
                                                        join LM in Lensmaster on LT.LMID equals LM.RandomUniqueID
                                                        join ST in Storemasters.Where(x => x.CmpID == CompanyID) on OB.StoreID equals ST.StoreID
                                                        join STR in OpticalStockTran on OB.LTID equals STR.LMIDID
                                                        join SM in OpticalStockMaster.Where(x => Convert.ToDateTime(x.CreatedUTC.Add(ts).ToString("yyyy/MM")) >= Convert.ToDateTime((From).ToString("yyyy/MM")) && Convert.ToDateTime(x.CreatedUTC.Add(ts).ToString("yyyy/MM")) <= Convert.ToDateTime((To).ToString("yyyy/MM")) && x.TransactionType == "R" && x.CMPID == CompanyID && x.StoreID == Convert.ToInt32(sa.ID)) on STR.RandomUniqueID equals SM.RandomUniqueID
                                                        join TR in TransactionType on SM.TransactionID equals TR.TransactionID
                                                        join cm in Company.Where(x => x.CmpID == CompanyID) on OB.CmpID equals cm.CmpID
                                                        select new Receipt
                                                        {

                                                            CmpName = cm.CompanyName + "-" + cm.Address1,
                                                            DocumentNo = SM.DocumentNumber,
                                                            DocumentDate = SM.DocumentDate != null ? SM.DocumentDate.Value.Add(ts) : (DateTime?)null,
                                                            DocumentType = TR.Description,
                                                            Type = LM.LensType,
                                                            TypeID = LM.ID,
                                                            Store = ST.Storename,
                                                            StoreID = ST.StoreID,
                                                            Brand = BR.Description,
                                                            BrandID = BR.ID,
                                                            UOM = UM.Description,
                                                            Model = LT.Model,
                                                            Color = LT.Colour,
                                                            Recept = STR.ItemQty,
                                                            Issue = 0.0M,
                                                            Openingstock = OB.OpeningBalance,
                                                            Closingstock = OB.ClosingBalance,
                                                            ID = OpticalBalance.Where(s => s.LTID == Lenstrans.Where(x => x.Brand == Convert.ToInt32(ba.ID)).Select(x => x.ID).FirstOrDefault()).Where(d => d.StoreID == Convert.ToInt32(sa.ID)).Select(f => f.ID).FirstOrDefault(),
                                                        }).OrderByDescending(x => x.ID).ToList();

                            if (Opticalstkledger.Receipt.Count() > 0)
                            {
                                foreach (var itm in Opticalstkledger.Receipt.ToList())
                                {
                                    var osl = new Opticalstockledger();
                                    osl.CmpName = itm.CmpName;
                                    osl.DocumentNo = itm.DocumentNo;
                                    osl.DocumentDate = itm.DocumentDate;
                                    osl.DocumentType = itm.DocumentType;
                                    osl.Type = itm.Type;
                                    osl.TypeID = itm.TypeID;
                                    osl.Store = itm.Store;
                                    osl.StoreID = itm.StoreID;
                                    osl.Brand = itm.Brand;
                                    osl.BrandID = itm.BrandID;
                                    osl.UOM = itm.UOM;
                                    osl.Model = itm.Model;
                                    osl.Color = itm.Color;
                                    osl.Receipt = itm.Recept;
                                    osl.Issue = itm.Issue;
                                    osl.Openingstock = itm.Openingstock;
                                    osl.Closingstock = itm.Closingstock;
                                    osl.ID = itm.ID;
                                    Opticalstkledger.Opticalstockledger.Add(osl);
                                }
                            }
                        }

                    }

                    foreach (var ba in BrandArray.ToList())
                    {
                        foreach (var sa in StoreArray.ToList())
                        {

                            Opticalstkledger.Issue = (from OB in OpticalBalance.Where(x => x.StoreID == Convert.ToInt32(sa.ID) && Convert.ToDateTime(x.CreatedUTC.Add(ts).ToString("yyyy/MM")) >= Convert.ToDateTime((From).ToString("yyyy/MM")) && Convert.ToDateTime(x.CreatedUTC.Add(ts).ToString("yyyy/MM")) <= Convert.ToDateTime((To).ToString("yyyy/MM")) && x.CmpID == CompanyID)
                                                      join LT in Lenstrans on OB.LTID equals LT.ID
                                                      join BR in Brand.Where(x => x.ID == Convert.ToInt32(ba.ID)) on LT.Brand equals BR.ID
                                                      join UM in uommaster on LT.UOMID equals UM.id
                                                      join LM in Lensmaster on LT.LMID equals LM.RandomUniqueID
                                                      join ST in Storemasters.Where(x => x.CmpID == CompanyID) on OB.StoreID equals ST.StoreID
                                                      join STR in OpticalStockTran on OB.LTID equals STR.LMIDID
                                                      join SM in OpticalStockMaster.Where(x => Convert.ToDateTime(x.CreatedUTC.Add(ts).ToString("yyyy/MM")) >= Convert.ToDateTime((From).ToString("yyyy/MM")) && Convert.ToDateTime(x.CreatedUTC.Add(ts).ToString("yyyy/MM")) <= Convert.ToDateTime((To).ToString("yyyy/MM")) && x.TransactionType == "I" && x.CMPID == CompanyID && x.StoreID == Convert.ToInt32(sa.ID)) on STR.RandomUniqueID equals SM.RandomUniqueID
                                                      join TR in TransactionType on SM.TransactionID equals TR.TransactionID
                                                      join cm in Company.Where(x => x.CmpID == CompanyID) on OB.CmpID equals cm.CmpID
                                                      select new Issue
                                                      {

                                                          CmpName = cm.CompanyName + "-" + cm.Address1,
                                                          DocumentNo = SM.DocumentNumber,
                                                          DocumentDate = SM.DocumentDate != null ? SM.DocumentDate.Value.Add(ts) : (DateTime?)null,
                                                          DocumentType = TR.Description,
                                                          Type = LM.LensType,
                                                          TypeID = LM.ID,
                                                          Store = ST.Storename,
                                                          StoreID = ST.StoreID,
                                                          Brand = BR.Description,
                                                          BrandID = BR.ID,
                                                          UOM = UM.Description,
                                                          Model = LT.Model,
                                                          Color = LT.Colour,
                                                          Receipt = 0.0M,
                                                          Isue = STR.ItemQty,
                                                          Openingstock = 0.0M,
                                                          Closingstock = 0.0M,
                                                          ID = OpticalBalance.Where(s => s.LTID == Lenstrans.Where(x => x.Brand == Convert.ToInt32(ba.ID)).Select(x => x.ID).FirstOrDefault()).Where(d => d.StoreID == Convert.ToInt32(sa.ID)).Select(f => f.ID).FirstOrDefault(),
                                                      }).OrderByDescending(x => x.ID).ToList();

                            if (Opticalstkledger.Issue.Count() > 0)
                            {
                                foreach (var itm in Opticalstkledger.Issue.ToList())
                                {
                                    var osl = new OpticalstockledgerI();
                                    osl.CmpName = itm.CmpName;
                                    osl.DocumentNo = itm.DocumentNo;
                                    osl.DocumentDate = itm.DocumentDate;
                                    osl.DocumentType = itm.DocumentType;
                                    osl.Type = itm.Type;
                                    osl.TypeID = itm.TypeID;
                                    osl.Store = itm.Store;
                                    osl.StoreID = itm.StoreID;
                                    osl.Brand = itm.Brand;
                                    osl.BrandID = itm.BrandID;
                                    osl.UOM = itm.UOM;
                                    osl.Model = itm.Model;
                                    osl.Color = itm.Color;
                                    osl.Receipt = itm.Receipt;
                                    osl.Issue = itm.Isue;
                                    osl.Openingstock = itm.Openingstock;
                                    osl.Closingstock = itm.Closingstock;
                                    osl.ID = itm.ID;

                                    Opticalstkledger.OpticalstockledgerI.Add(osl);
                                }
                            }
                        }

                    }

                }
            }
            else
            {

                if (concatarray.Count() > 0)
                {

                    foreach (var sa in StoreArray.ToList())
                    {
                        foreach (var ba in BrandArray.ToList())
                        {


                            Opticalstkledger.Issue = (from OB in OpticalBalance.Where(x => x.StoreID == Convert.ToInt32(sa.ID) && Convert.ToDateTime(x.CreatedUTC.Add(ts).ToString("yyyy/MM")) >= Convert.ToDateTime((From).ToString("yyyy/MM")) && Convert.ToDateTime(x.CreatedUTC.Add(ts).ToString("yyyy/MM")) <= Convert.ToDateTime((To).ToString("yyyy/MM")) && x.CmpID == CompanyID)
                                                      join LT in Lenstrans on OB.LTID equals LT.ID
                                                      join BR in Brand.Where(x => x.ID == Convert.ToInt32(ba.ID)) on LT.Brand equals BR.ID
                                                      join UM in uommaster on LT.UOMID equals UM.id
                                                      join LM in Lensmaster on LT.LMID equals LM.RandomUniqueID
                                                      join ST in Storemasters.Where(x => x.CmpID == CompanyID) on OB.StoreID equals ST.StoreID
                                                      join STR in OpticalStockTran on OB.LTID equals STR.LMIDID
                                                      join SM in OpticalStockMaster.Where(x => Convert.ToDateTime(x.CreatedUTC.Add(ts).ToString("yyyy/MM")) >= Convert.ToDateTime((From).ToString("yyyy/MM")) && Convert.ToDateTime(x.CreatedUTC.Add(ts).ToString("yyyy/MM")) <= Convert.ToDateTime((To).ToString("yyyy/MM")) && x.TransactionType == "I" && x.CMPID == CompanyID && x.StoreID == Convert.ToInt32(sa.ID)) on STR.RandomUniqueID equals SM.RandomUniqueID
                                                      join TR in TransactionType on SM.TransactionID equals TR.TransactionID
                                                      join cm in Company.Where(x => x.CmpID == CompanyID) on OB.CmpID equals cm.CmpID
                                                      select new Issue
                                                      {

                                                          CmpName = cm.CompanyName + "-" + cm.Address1,
                                                          DocumentNo = SM.DocumentNumber,
                                                          DocumentDate = SM.DocumentDate != null ? SM.DocumentDate.Value.Add(ts) : (DateTime?)null,
                                                          DocumentType = TR.Description,
                                                          Type = LM.LensType,
                                                          TypeID = LM.ID,
                                                          Store = ST.Storename,
                                                          StoreID = ST.StoreID,
                                                          Brand = BR.Description,
                                                          BrandID = BR.ID,
                                                          UOM = UM.Description,
                                                          Model = LT.Model,
                                                          Color = LT.Colour,
                                                          Receipt = 0.0M,
                                                          Isue = STR.ItemQty,
                                                          Openingstock = 0.0M,
                                                          Closingstock = 0.0M,

                                                          ID = OpticalBalance.Where(s => s.LTID == Lenstrans.Where(x => x.Brand == Convert.ToInt32(ba.ID)).Select(x => x.ID).FirstOrDefault()).Where(d => d.StoreID == Convert.ToInt32(sa.ID)).Select(f => f.ID).FirstOrDefault(),
                                                      }).OrderByDescending(x => x.ID).ToList();

                            if (Opticalstkledger.Issue.Count() > 0)
                            {
                                foreach (var itm in Opticalstkledger.Issue.ToList())
                                {
                                    var osl = new OpticalstockledgerI();
                                    osl.CmpName = itm.CmpName;
                                    osl.DocumentNo = itm.DocumentNo;
                                    osl.DocumentDate = itm.DocumentDate;
                                    osl.DocumentType = itm.DocumentType;
                                    osl.Type = itm.Type;
                                    osl.TypeID = itm.TypeID;
                                    osl.Store = itm.Store;
                                    osl.StoreID = itm.StoreID;
                                    osl.Brand = itm.Brand;
                                    osl.BrandID = itm.BrandID;
                                    osl.UOM = itm.UOM;
                                    osl.Model = itm.Model;
                                    osl.Color = itm.Color;
                                    osl.Receipt = itm.Receipt;
                                    osl.Issue = itm.Isue;
                                    osl.Openingstock = itm.Openingstock;
                                    osl.Closingstock = itm.Closingstock;
                                    osl.ID = itm.ID;
                                    Opticalstkledger.OpticalstockledgerI.Add(osl);
                                }
                            }

                        }

                    }

                    foreach (var sa in StoreArray.ToList())
                    {
                        foreach (var ba in BrandArray.ToList())
                        {


                            Opticalstkledger.Receipt = (from OB in OpticalBalance.Where(x => x.StoreID == Convert.ToInt32(sa.ID) && Convert.ToDateTime(x.CreatedUTC.Add(ts).ToString("yyyy/MM")) >= Convert.ToDateTime((From).ToString("yyyy/MM")) && Convert.ToDateTime(x.CreatedUTC.Add(ts).ToString("yyyy/MM")) <= Convert.ToDateTime((To).ToString("yyyy/MM")) && x.CmpID == CompanyID)
                                                        join LT in Lenstrans on OB.LTID equals LT.ID
                                                        join BR in Brand.Where(x => x.ID == Convert.ToInt32(ba.ID)) on LT.Brand equals BR.ID
                                                        join UM in uommaster on LT.UOMID equals UM.id
                                                        join LM in Lensmaster on LT.LMID equals LM.RandomUniqueID
                                                        join ST in Storemasters.Where(x => x.CmpID == CompanyID) on OB.StoreID equals ST.StoreID
                                                        join STR in OpticalStockTran on OB.LTID equals STR.LMIDID
                                                        join SM in OpticalStockMaster.Where(x => Convert.ToDateTime(x.CreatedUTC.Add(ts).ToString("yyyy/MM")) >= Convert.ToDateTime((From).ToString("yyyy/MM")) && Convert.ToDateTime(x.CreatedUTC.Add(ts).ToString("yyyy/MM")) <= Convert.ToDateTime((To).ToString("yyyy/MM")) && x.TransactionType == "R" && x.CMPID == CompanyID && x.StoreID == Convert.ToInt32(sa.ID)) on STR.RandomUniqueID equals SM.RandomUniqueID
                                                        join TR in TransactionType on SM.TransactionID equals TR.TransactionID
                                                        join cm in Company.Where(x => x.CmpID == CompanyID) on OB.CmpID equals cm.CmpID
                                                        select new Receipt
                                                        {

                                                            CmpName = cm.CompanyName + "-" + cm.Address1,
                                                            DocumentNo = SM.DocumentNumber,
                                                            DocumentDate = SM.DocumentDate != null ? SM.DocumentDate.Value.Add(ts) : (DateTime?)null,
                                                            DocumentType = TR.Description,
                                                            Type = LM.LensType,
                                                            TypeID = LM.ID,
                                                            Store = ST.Storename,
                                                            StoreID = ST.StoreID,
                                                            Brand = BR.Description,
                                                            BrandID = BR.ID,
                                                            UOM = UM.Description,
                                                            Model = LT.Model,
                                                            Color = LT.Colour,
                                                            Recept = STR.ItemQty,
                                                            Issue = 0.0M,
                                                            Openingstock = OB.OpeningBalance,
                                                            Closingstock = OB.ClosingBalance,
                                                            ID = OpticalBalance.Where(s => s.LTID == Lenstrans.Where(x => x.Brand == Convert.ToInt32(ba.ID)).Select(x => x.ID).FirstOrDefault()).Where(d => d.StoreID == Convert.ToInt32(sa.ID)).Select(f => f.ID).FirstOrDefault(),
                                                        }).OrderByDescending(x => x.ID).ToList();

                            if (Opticalstkledger.Receipt.Count() > 0)
                            {
                                foreach (var itm in Opticalstkledger.Receipt.ToList())
                                {
                                    var osl = new Opticalstockledger();
                                    osl.CmpName = itm.CmpName;
                                    osl.DocumentNo = itm.DocumentNo;
                                    osl.DocumentDate = itm.DocumentDate;
                                    osl.DocumentType = itm.DocumentType;
                                    osl.Type = itm.Type;
                                    osl.TypeID = itm.TypeID;
                                    osl.Store = itm.Store;
                                    osl.StoreID = itm.StoreID;
                                    osl.Brand = itm.Brand;
                                    osl.BrandID = itm.BrandID;
                                    osl.UOM = itm.UOM;
                                    osl.Model = itm.Model;
                                    osl.Color = itm.Color;
                                    osl.Receipt = itm.Recept;
                                    osl.Issue = itm.Issue;
                                    osl.Openingstock = itm.Openingstock;
                                    osl.Closingstock = itm.Closingstock;
                                    osl.ID = itm.ID;
                                    Opticalstkledger.Opticalstockledger.Add(osl);
                                }
                            }

                        }

                    }
                }

            }

            Opticalstkledger.Companycomm = (from c in Company.Where(u => u.CmpID == CompanyID)

                                            select new Companycomm
                                            {
                                                Companyname = c.CompanyName,
                                                Address = c.Address1 + "" + c.Address2 + "" + c.Address3,
                                                Phoneno = c.Phone1,
                                                Web = c.Website,
                                                Location = c.LocationName,
                                            }).ToList();


            return Opticalstkledger;
        }

    }


}