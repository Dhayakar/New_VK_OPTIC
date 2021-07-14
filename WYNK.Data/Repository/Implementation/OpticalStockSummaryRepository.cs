using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using WYNK.Data.Model;
using WYNK.Data.Model.ViewModel;
using WYNK.Helpers;


namespace WYNK.Data.Repository.Implementation
{
    class OpticalStockSummaryRepository : RepositoryBase<OpticalStockSummaryDataView>, IOpticalStockSummaryRepository
    {
        private readonly WYNKContext _Wynkcontext;
        private readonly CMPSContext _Cmpscontext;


        public OpticalStockSummaryRepository(WYNKContext context, CMPSContext Cmpscontext) : base(context, Cmpscontext)
        {
            _Wynkcontext = context;
            _Cmpscontext = Cmpscontext;

        }


        public dynamic GetStockSummary(OpticalStockSummaryDataView stocksummary, string From, string To, int CompanyID, string Time)
        {
            var FinancialYear = WYNKContext.FinancialYear.ToList();
            var OpticalBalance = WYNKContext.OpticalBalance.ToList();
            var Lensmaster = WYNKContext.Lensmaster.ToList();
            var Lenstrans = WYNKContext.Lenstrans.ToList();
            var Brand = WYNKContext.Brand.ToList();
            var uommaster = CMPSContext.uommaster.ToList();
            var Storemasters = CMPSContext.Storemasters.ToList();
            var Company = CMPSContext.Company.ToList();
            TimeSpan ts = TimeSpan.Parse(Time);

            var Opticalstksummary = new OpticalStockSummaryDataView();

            Opticalstksummary.Companycommu = new List<Companycommu>();
            Opticalstksummary.StoreArrays = new List<StoreArrays>();
            Opticalstksummary.BrandArrays = new List<BrandArrays>();
            Opticalstksummary.Stocksummaryarray = new List<Stocksummaryarray>();
            Opticalstksummary.OpticalStocksummaryarray = new List<OpticalStocksummaryarray>();


            DateTime DT;
            var appdate = DateTime.TryParseExact(From.Trim(), "dd-MMM-yyyy", CultureInfo.InvariantCulture, DateTimeStyles.None, out DT);
            {
                DT.ToString("dd-MM-yyyy", CultureInfo.InvariantCulture);
            }
            var fdate = DT;

            DateTime DT1;
            var appdate1 = DateTime.TryParseExact(To.Trim(), "dd-MMM-yyyy", CultureInfo.InvariantCulture, DateTimeStyles.None, out DT1);
            {
                DT1.ToString("dd-MM-yyyy", CultureInfo.InvariantCulture);
            }
            var tdate = DT1;



            var StoreArray = (from s in stocksummary.StoreArrays

                              select new
                              {
                                  ID = s.StoreID,
                                  Name = s.StoreName,

                              }).ToList();

            var BrandArray = (from b in stocksummary.BrandArrays

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

                            Opticalstksummary.Stocksummaryarray = (from OB in OpticalBalance.Where(x => x.StoreID == Convert.ToInt32(sa.ID) && x.CreatedUTC.Date >= fdate && x.CreatedUTC.Date <= tdate && x.CmpID == CompanyID)
                                                                   join LT in Lenstrans on OB.LTID equals LT.ID
                                                                   join BR in Brand.Where(x => x.ID == Convert.ToInt32(ba.ID)) on LT.Brand equals BR.ID
                                                                   join UM in uommaster on LT.UOMID equals UM.id
                                                                   join LM in Lensmaster on LT.LMID equals LM.RandomUniqueID
                                                                   join ST in Storemasters.Where(x => x.CmpID == CompanyID) on OB.StoreID equals ST.StoreID
                                                                   join cm in Company.Where(x => x.CmpID == CompanyID) on OB.CmpID equals cm.CmpID
                                                                   select new Stocksummaryarray
                                                                   {

                                                                       CmpName = cm.CompanyName + "-" + cm.Address1,
                                                                       Type = LM.LensType,
                                                                       Store = ST.Storename,
                                                                       Brand = BR.Description,
                                                                       UOM = UM.Description,
                                                                       Model = LT.Model,
                                                                       Color = LT.Colour,
                                                                       Recept = OpticalBalance.Where(s => s.LTID == Lenstrans.Where(x => x.Brand == Convert.ToInt32(ba.ID)).Select(x => x.ID).FirstOrDefault()).Where(d => d.StoreID == Convert.ToInt32(sa.ID)).Select(f => f.REC01).FirstOrDefault() + OpticalBalance.Where(s => s.LTID == Lenstrans.Where(x => x.Brand == Convert.ToInt32(ba.ID)).Select(x => x.ID).FirstOrDefault()).Where(d => d.StoreID == Convert.ToInt32(sa.ID)).Select(f => f.REC02).FirstOrDefault() +
                                                                                OpticalBalance.Where(s => s.LTID == Lenstrans.Where(x => x.Brand == Convert.ToInt32(ba.ID)).Select(x => x.ID).FirstOrDefault()).Where(d => d.StoreID == Convert.ToInt32(sa.ID)).Select(f => f.REC03).FirstOrDefault() + OpticalBalance.Where(s => s.LTID == Lenstrans.Where(x => x.Brand == Convert.ToInt32(ba.ID)).Select(x => x.ID).FirstOrDefault()).Where(d => d.StoreID == Convert.ToInt32(sa.ID)).Select(f => f.REC04).FirstOrDefault() +
                                                                                OpticalBalance.Where(s => s.LTID == Lenstrans.Where(x => x.Brand == Convert.ToInt32(ba.ID)).Select(x => x.ID).FirstOrDefault()).Where(d => d.StoreID == Convert.ToInt32(sa.ID)).Select(f => f.REC05).FirstOrDefault() + OpticalBalance.Where(s => s.LTID == Lenstrans.Where(x => x.Brand == Convert.ToInt32(ba.ID)).Select(x => x.ID).FirstOrDefault()).Where(d => d.StoreID == Convert.ToInt32(sa.ID)).Select(f => f.REC06).FirstOrDefault() +
                                                                                OpticalBalance.Where(s => s.LTID == Lenstrans.Where(x => x.Brand == Convert.ToInt32(ba.ID)).Select(x => x.ID).FirstOrDefault()).Where(d => d.StoreID == Convert.ToInt32(sa.ID)).Select(f => f.REC07).FirstOrDefault() + OpticalBalance.Where(s => s.LTID == Lenstrans.Where(x => x.Brand == Convert.ToInt32(ba.ID)).Select(x => x.ID).FirstOrDefault()).Where(d => d.StoreID == Convert.ToInt32(sa.ID)).Select(f => f.REC08).FirstOrDefault() +
                                                                                OpticalBalance.Where(s => s.LTID == Lenstrans.Where(x => x.Brand == Convert.ToInt32(ba.ID)).Select(x => x.ID).FirstOrDefault()).Where(d => d.StoreID == Convert.ToInt32(sa.ID)).Select(f => f.REC09).FirstOrDefault() + OpticalBalance.Where(s => s.LTID == Lenstrans.Where(x => x.Brand == Convert.ToInt32(ba.ID)).Select(x => x.ID).FirstOrDefault()).Where(d => d.StoreID == Convert.ToInt32(sa.ID)).Select(f => f.REC10).FirstOrDefault() +
                                                                                OpticalBalance.Where(s => s.LTID == Lenstrans.Where(x => x.Brand == Convert.ToInt32(ba.ID)).Select(x => x.ID).FirstOrDefault()).Where(d => d.StoreID == Convert.ToInt32(sa.ID)).Select(f => f.REC11).FirstOrDefault() + OpticalBalance.Where(s => s.LTID == Lenstrans.Where(x => x.Brand == Convert.ToInt32(ba.ID)).Select(x => x.ID).FirstOrDefault()).Where(d => d.StoreID == Convert.ToInt32(sa.ID)).Select(f => f.REC12).FirstOrDefault(),

                                                                       Issue = OpticalBalance.Where(s => s.LTID == Lenstrans.Where(x => x.Brand == Convert.ToInt32(ba.ID)).Select(x => x.ID).FirstOrDefault()).Where(d => d.StoreID == Convert.ToInt32(sa.ID)).Select(f => f.ISS01).FirstOrDefault() + OpticalBalance.Where(s => s.LTID == Lenstrans.Where(x => x.Brand == Convert.ToInt32(ba.ID)).Select(x => x.ID).FirstOrDefault()).Where(d => d.StoreID == Convert.ToInt32(sa.ID)).Select(f => f.ISS02).FirstOrDefault() +
                                                                                OpticalBalance.Where(s => s.LTID == Lenstrans.Where(x => x.Brand == Convert.ToInt32(ba.ID)).Select(x => x.ID).FirstOrDefault()).Where(d => d.StoreID == Convert.ToInt32(sa.ID)).Select(f => f.ISS03).FirstOrDefault() + OpticalBalance.Where(s => s.LTID == Lenstrans.Where(x => x.Brand == Convert.ToInt32(ba.ID)).Select(x => x.ID).FirstOrDefault()).Where(d => d.StoreID == Convert.ToInt32(sa.ID)).Select(f => f.ISS04).FirstOrDefault() +
                                                                                OpticalBalance.Where(s => s.LTID == Lenstrans.Where(x => x.Brand == Convert.ToInt32(ba.ID)).Select(x => x.ID).FirstOrDefault()).Where(d => d.StoreID == Convert.ToInt32(sa.ID)).Select(f => f.ISS05).FirstOrDefault() + OpticalBalance.Where(s => s.LTID == Lenstrans.Where(x => x.Brand == Convert.ToInt32(ba.ID)).Select(x => x.ID).FirstOrDefault()).Where(d => d.StoreID == Convert.ToInt32(sa.ID)).Select(f => f.ISS06).FirstOrDefault() +
                                                                                OpticalBalance.Where(s => s.LTID == Lenstrans.Where(x => x.Brand == Convert.ToInt32(ba.ID)).Select(x => x.ID).FirstOrDefault()).Where(d => d.StoreID == Convert.ToInt32(sa.ID)).Select(f => f.ISS07).FirstOrDefault() + OpticalBalance.Where(s => s.LTID == Lenstrans.Where(x => x.Brand == Convert.ToInt32(ba.ID)).Select(x => x.ID).FirstOrDefault()).Where(d => d.StoreID == Convert.ToInt32(sa.ID)).Select(f => f.ISS08).FirstOrDefault() +
                                                                                OpticalBalance.Where(s => s.LTID == Lenstrans.Where(x => x.Brand == Convert.ToInt32(ba.ID)).Select(x => x.ID).FirstOrDefault()).Where(d => d.StoreID == Convert.ToInt32(sa.ID)).Select(f => f.ISS09).FirstOrDefault() + OpticalBalance.Where(s => s.LTID == Lenstrans.Where(x => x.Brand == Convert.ToInt32(ba.ID)).Select(x => x.ID).FirstOrDefault()).Where(d => d.StoreID == Convert.ToInt32(sa.ID)).Select(f => f.ISS10).FirstOrDefault() +
                                                                                OpticalBalance.Where(s => s.LTID == Lenstrans.Where(x => x.Brand == Convert.ToInt32(ba.ID)).Select(x => x.ID).FirstOrDefault()).Where(d => d.StoreID == Convert.ToInt32(sa.ID)).Select(f => f.ISS11).FirstOrDefault() + OpticalBalance.Where(s => s.LTID == Lenstrans.Where(x => x.Brand == Convert.ToInt32(ba.ID)).Select(x => x.ID).FirstOrDefault()).Where(d => d.StoreID == Convert.ToInt32(sa.ID)).Select(f => f.ISS12).FirstOrDefault(),
                                                                       Openingstock = OB.OpeningBalance,
                                                                       Closingstock = OB.ClosingBalance,
                                                                       ID = OpticalBalance.Where(s => s.LTID == Lenstrans.Where(x => x.Brand == Convert.ToInt32(ba.ID)).Select(x => x.ID).FirstOrDefault()).Where(d => d.StoreID == Convert.ToInt32(sa.ID)).Select(f => f.ID).FirstOrDefault(),
                                                                   }).ToList();

                            if (Opticalstksummary.Stocksummaryarray.Count() > 0)
                            {
                                foreach (var itm in Opticalstksummary.Stocksummaryarray.ToList())
                                {
                                    var osl = new OpticalStocksummaryarray();
                                    osl.CmpName = itm.CmpName;
                                    osl.Type = itm.Type;
                                    osl.Store = itm.Store;
                                    osl.Brand = itm.Brand;
                                    osl.UOM = itm.UOM;
                                    osl.Model = itm.Model;
                                    osl.Color = itm.Color;
                                    osl.Receipt = itm.Recept;
                                    osl.Issue = itm.Issue;
                                    osl.Openingstock = itm.Openingstock;
                                    osl.Closingstock = itm.Closingstock;
                                    osl.ID = itm.ID;
                                    Opticalstksummary.OpticalStocksummaryarray.Add(osl);
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
                            Opticalstksummary.Stocksummaryarray = (from OB in OpticalBalance.Where(x => x.StoreID == Convert.ToInt32(sa.ID) && x.CreatedUTC.Date >= fdate && x.CreatedUTC.Date <= tdate && x.CmpID == CompanyID)
                                                                   join LT in Lenstrans on OB.LTID equals LT.ID
                                                                   join BR in Brand.Where(x => x.ID == Convert.ToInt32(ba.ID)) on LT.Brand equals BR.ID
                                                                   join UM in uommaster on LT.UOMID equals UM.id
                                                                   join LM in Lensmaster on LT.LMID equals LM.RandomUniqueID
                                                                   join ST in Storemasters.Where(x => x.CmpID == CompanyID) on OB.StoreID equals ST.StoreID
                                                                   join cm in Company.Where(x => x.CmpID == CompanyID) on OB.CmpID equals cm.CmpID
                                                                   select new Stocksummaryarray
                                                                   {

                                                                       CmpName = cm.CompanyName + "-" + cm.Address1,
                                                                       Type = LM.LensType,
                                                                       Store = ST.Storename,
                                                                       Brand = BR.Description,
                                                                       UOM = UM.Description,
                                                                       Model = LT.Model,
                                                                       Color = LT.Colour,
                                                                       Recept = OpticalBalance.Where(s => s.LTID == Lenstrans.Where(x => x.Brand == Convert.ToInt32(ba.ID)).Select(x => x.ID).FirstOrDefault()).Where(d => d.StoreID == Convert.ToInt32(sa.ID)).Select(f => f.REC01).FirstOrDefault() + OpticalBalance.Where(s => s.LTID == Lenstrans.Where(x => x.Brand == Convert.ToInt32(ba.ID)).Select(x => x.ID).FirstOrDefault()).Where(d => d.StoreID == Convert.ToInt32(sa.ID)).Select(f => f.REC02).FirstOrDefault() +
                                                                                OpticalBalance.Where(s => s.LTID == Lenstrans.Where(x => x.Brand == Convert.ToInt32(ba.ID)).Select(x => x.ID).FirstOrDefault()).Where(d => d.StoreID == Convert.ToInt32(sa.ID)).Select(f => f.REC03).FirstOrDefault() + OpticalBalance.Where(s => s.LTID == Lenstrans.Where(x => x.Brand == Convert.ToInt32(ba.ID)).Select(x => x.ID).FirstOrDefault()).Where(d => d.StoreID == Convert.ToInt32(sa.ID)).Select(f => f.REC04).FirstOrDefault() +
                                                                                OpticalBalance.Where(s => s.LTID == Lenstrans.Where(x => x.Brand == Convert.ToInt32(ba.ID)).Select(x => x.ID).FirstOrDefault()).Where(d => d.StoreID == Convert.ToInt32(sa.ID)).Select(f => f.REC05).FirstOrDefault() + OpticalBalance.Where(s => s.LTID == Lenstrans.Where(x => x.Brand == Convert.ToInt32(ba.ID)).Select(x => x.ID).FirstOrDefault()).Where(d => d.StoreID == Convert.ToInt32(sa.ID)).Select(f => f.REC06).FirstOrDefault() +
                                                                                OpticalBalance.Where(s => s.LTID == Lenstrans.Where(x => x.Brand == Convert.ToInt32(ba.ID)).Select(x => x.ID).FirstOrDefault()).Where(d => d.StoreID == Convert.ToInt32(sa.ID)).Select(f => f.REC07).FirstOrDefault() + OpticalBalance.Where(s => s.LTID == Lenstrans.Where(x => x.Brand == Convert.ToInt32(ba.ID)).Select(x => x.ID).FirstOrDefault()).Where(d => d.StoreID == Convert.ToInt32(sa.ID)).Select(f => f.REC08).FirstOrDefault() +
                                                                                OpticalBalance.Where(s => s.LTID == Lenstrans.Where(x => x.Brand == Convert.ToInt32(ba.ID)).Select(x => x.ID).FirstOrDefault()).Where(d => d.StoreID == Convert.ToInt32(sa.ID)).Select(f => f.REC09).FirstOrDefault() + OpticalBalance.Where(s => s.LTID == Lenstrans.Where(x => x.Brand == Convert.ToInt32(ba.ID)).Select(x => x.ID).FirstOrDefault()).Where(d => d.StoreID == Convert.ToInt32(sa.ID)).Select(f => f.REC10).FirstOrDefault() +
                                                                                OpticalBalance.Where(s => s.LTID == Lenstrans.Where(x => x.Brand == Convert.ToInt32(ba.ID)).Select(x => x.ID).FirstOrDefault()).Where(d => d.StoreID == Convert.ToInt32(sa.ID)).Select(f => f.REC11).FirstOrDefault() + OpticalBalance.Where(s => s.LTID == Lenstrans.Where(x => x.Brand == Convert.ToInt32(ba.ID)).Select(x => x.ID).FirstOrDefault()).Where(d => d.StoreID == Convert.ToInt32(sa.ID)).Select(f => f.REC12).FirstOrDefault(),

                                                                       Issue = OpticalBalance.Where(s => s.LTID == Lenstrans.Where(x => x.Brand == Convert.ToInt32(ba.ID)).Select(x => x.ID).FirstOrDefault()).Where(d => d.StoreID == Convert.ToInt32(sa.ID)).Select(f => f.ISS01).FirstOrDefault() + OpticalBalance.Where(s => s.LTID == Lenstrans.Where(x => x.Brand == Convert.ToInt32(ba.ID)).Select(x => x.ID).FirstOrDefault()).Where(d => d.StoreID == Convert.ToInt32(sa.ID)).Select(f => f.ISS02).FirstOrDefault() +
                                                                                OpticalBalance.Where(s => s.LTID == Lenstrans.Where(x => x.Brand == Convert.ToInt32(ba.ID)).Select(x => x.ID).FirstOrDefault()).Where(d => d.StoreID == Convert.ToInt32(sa.ID)).Select(f => f.ISS03).FirstOrDefault() + OpticalBalance.Where(s => s.LTID == Lenstrans.Where(x => x.Brand == Convert.ToInt32(ba.ID)).Select(x => x.ID).FirstOrDefault()).Where(d => d.StoreID == Convert.ToInt32(sa.ID)).Select(f => f.ISS04).FirstOrDefault() +
                                                                                OpticalBalance.Where(s => s.LTID == Lenstrans.Where(x => x.Brand == Convert.ToInt32(ba.ID)).Select(x => x.ID).FirstOrDefault()).Where(d => d.StoreID == Convert.ToInt32(sa.ID)).Select(f => f.ISS05).FirstOrDefault() + OpticalBalance.Where(s => s.LTID == Lenstrans.Where(x => x.Brand == Convert.ToInt32(ba.ID)).Select(x => x.ID).FirstOrDefault()).Where(d => d.StoreID == Convert.ToInt32(sa.ID)).Select(f => f.ISS06).FirstOrDefault() +
                                                                                OpticalBalance.Where(s => s.LTID == Lenstrans.Where(x => x.Brand == Convert.ToInt32(ba.ID)).Select(x => x.ID).FirstOrDefault()).Where(d => d.StoreID == Convert.ToInt32(sa.ID)).Select(f => f.ISS07).FirstOrDefault() + OpticalBalance.Where(s => s.LTID == Lenstrans.Where(x => x.Brand == Convert.ToInt32(ba.ID)).Select(x => x.ID).FirstOrDefault()).Where(d => d.StoreID == Convert.ToInt32(sa.ID)).Select(f => f.ISS08).FirstOrDefault() +
                                                                                OpticalBalance.Where(s => s.LTID == Lenstrans.Where(x => x.Brand == Convert.ToInt32(ba.ID)).Select(x => x.ID).FirstOrDefault()).Where(d => d.StoreID == Convert.ToInt32(sa.ID)).Select(f => f.ISS09).FirstOrDefault() + OpticalBalance.Where(s => s.LTID == Lenstrans.Where(x => x.Brand == Convert.ToInt32(ba.ID)).Select(x => x.ID).FirstOrDefault()).Where(d => d.StoreID == Convert.ToInt32(sa.ID)).Select(f => f.ISS10).FirstOrDefault() +
                                                                                OpticalBalance.Where(s => s.LTID == Lenstrans.Where(x => x.Brand == Convert.ToInt32(ba.ID)).Select(x => x.ID).FirstOrDefault()).Where(d => d.StoreID == Convert.ToInt32(sa.ID)).Select(f => f.ISS11).FirstOrDefault() + OpticalBalance.Where(s => s.LTID == Lenstrans.Where(x => x.Brand == Convert.ToInt32(ba.ID)).Select(x => x.ID).FirstOrDefault()).Where(d => d.StoreID == Convert.ToInt32(sa.ID)).Select(f => f.ISS12).FirstOrDefault(),
                                                                       Openingstock = OB.OpeningBalance,
                                                                       Closingstock = OB.ClosingBalance,
                                                                       ID = OpticalBalance.Where(s => s.LTID == Lenstrans.Where(x => x.Brand == Convert.ToInt32(ba.ID)).Select(x => x.ID).FirstOrDefault()).Where(d => d.StoreID == Convert.ToInt32(sa.ID)).Select(f => f.ID).FirstOrDefault(),
                                                                   }).ToList();

                            if (Opticalstksummary.Stocksummaryarray.Count() > 0)
                            {
                                foreach (var itm in Opticalstksummary.Stocksummaryarray.ToList())
                                {
                                    var osl = new OpticalStocksummaryarray();
                                    osl.CmpName = itm.CmpName;
                                    osl.Type = itm.Type;
                                    osl.Store = itm.Store;
                                    osl.Brand = itm.Brand;
                                    osl.UOM = itm.UOM;
                                    osl.Model = itm.Model;
                                    osl.Color = itm.Color;
                                    osl.Receipt = itm.Recept;
                                    osl.Issue = itm.Issue;
                                    osl.Openingstock = itm.Openingstock;
                                    osl.Closingstock = itm.Closingstock;
                                    osl.ID = itm.ID;
                                    Opticalstksummary.OpticalStocksummaryarray.Add(osl);
                                }
                            }
                        }
                    }
                }
            }

            Opticalstksummary.Companycommu = (from c in Company.Where(u => u.CmpID == CompanyID)

                                              select new Companycommu
                                              {
                                                  Companyname = c.CompanyName,
                                                  Address = c.Address1 + "" + c.Address2 + "" + c.Address3,
                                                  Phoneno = c.Phone1,
                                                  Web = c.Website,
                                                  Location = c.LocationName,
                                              }).ToList();


            return Opticalstksummary;
        }






























    }
}
