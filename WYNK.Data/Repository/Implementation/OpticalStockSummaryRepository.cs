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
            var one = CMPSContext.OneLineMaster.ToList();
            TimeSpan ts = TimeSpan.Parse(Time);

            var Opticalstksummary = new OpticalStockSummaryDataView();

            Opticalstksummary.Companycommu = new List<Companycommu>();
            Opticalstksummary.StoreArrays = new List<StoreArrays>();
            Opticalstksummary.BrandArrays = new List<BrandArrays>();
            List<Stocksummaryarray> Stocksummaryarray = new List<Stocksummaryarray>();
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

            string format = "MM-yyyy";
            DateTime SFdate = DateTime.ParseExact(fdate.ToString("MM-yyyy"), format, CultureInfo.InvariantCulture);
            DateTime STdate = DateTime.ParseExact(tdate.ToString("MM-yyyy"), format, CultureInfo.InvariantCulture);
            var FinancialYearId = WYNKContext.FinancialYear.Where(x => x.FYFrom <= fdate && x.FYTo >= tdate && x.CMPID == CompanyID && x.IsActive == true).Select(x => x.ID).FirstOrDefault();
            var Fmonth = WYNKContext.FinancialYear.Where(x => x.FYFrom <= fdate && x.FYTo >= tdate && x.CMPID == CompanyID && x.IsActive == true).Select(x => x.FYFrom).FirstOrDefault();
            DateTime STFdate = DateTime.ParseExact(Fmonth.ToString("MM-yyyy"), format, CultureInfo.InvariantCulture);


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

                            Stocksummaryarray.AddRange((from OB in OpticalBalance.Where(x => x.StoreID == Convert.ToInt32(sa.ID) && x.CmpID == CompanyID && x.FYID == FinancialYearId)
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
                                                            Sph = LT.Sph != null ? "Sph :" + " " + LT.Sph : null,
                                                            Cyl = LT.Cyl != null ? "Cyl :" + " " + LT.Cyl : null,
                                                            Axis = LT.Axis != null ? "Axis :" + " " + LT.Axis : null,
                                                            Add = LT.Add != null ? "Add :" + " " + LT.Add : null,
                                                            Fshpae = one.Where(f => f.OLMID == LT.FrameShapeID).Select(g => g.ParentDescription).FirstOrDefault() != null ? "Shape :" + " " + one.Where(f => f.OLMID == LT.FrameShapeID).Select(g => g.ParentDescription).FirstOrDefault() : null,
                                                            Ftype = one.Where(f => f.OLMID == LT.FrameTypeID).Select(g => g.ParentDescription).FirstOrDefault() != null ? "Type :" + " " + one.Where(f => f.OLMID == LT.FrameTypeID).Select(g => g.ParentDescription).FirstOrDefault() : null,
                                                            Fstyle = one.Where(f => f.OLMID == LT.FrameStyleID).Select(g => g.ParentDescription).FirstOrDefault() != null ? "Style :" + " " + one.Where(f => f.OLMID == LT.FrameStyleID).Select(g => g.ParentDescription).FirstOrDefault() : null,
                                                            Fwidth = one.Where(f => f.OLMID == LT.FrameWidthID).Select(g => g.ParentDescription).FirstOrDefault() != null ? "Width :" + " " + one.Where(f => f.OLMID == LT.FrameWidthID).Select(g => g.ParentDescription).FirstOrDefault() : null,
                                                            Color = LT.Colour,
                                                            REC01 = OpticalBalance.Where(s => s.LTID == Lenstrans.Where(x => x.Brand == Convert.ToInt32(ba.ID)).Select(x => x.ID).FirstOrDefault()).Where(d => d.StoreID == Convert.ToInt32(sa.ID)).Select(f => f.REC01).FirstOrDefault(),
                                                            REC02 = OpticalBalance.Where(s => s.LTID == Lenstrans.Where(x => x.Brand == Convert.ToInt32(ba.ID)).Select(x => x.ID).FirstOrDefault()).Where(d => d.StoreID == Convert.ToInt32(sa.ID)).Select(f => f.REC02).FirstOrDefault(),
                                                            REC03 = OpticalBalance.Where(s => s.LTID == Lenstrans.Where(x => x.Brand == Convert.ToInt32(ba.ID)).Select(x => x.ID).FirstOrDefault()).Where(d => d.StoreID == Convert.ToInt32(sa.ID)).Select(f => f.REC03).FirstOrDefault(),
                                                            REC04 = OpticalBalance.Where(s => s.LTID == Lenstrans.Where(x => x.Brand == Convert.ToInt32(ba.ID)).Select(x => x.ID).FirstOrDefault()).Where(d => d.StoreID == Convert.ToInt32(sa.ID)).Select(f => f.REC04).FirstOrDefault(),
                                                            REC05 = OpticalBalance.Where(s => s.LTID == Lenstrans.Where(x => x.Brand == Convert.ToInt32(ba.ID)).Select(x => x.ID).FirstOrDefault()).Where(d => d.StoreID == Convert.ToInt32(sa.ID)).Select(f => f.REC05).FirstOrDefault(),
                                                            REC06 = OpticalBalance.Where(s => s.LTID == Lenstrans.Where(x => x.Brand == Convert.ToInt32(ba.ID)).Select(x => x.ID).FirstOrDefault()).Where(d => d.StoreID == Convert.ToInt32(sa.ID)).Select(f => f.REC06).FirstOrDefault(),
                                                            REC07 = OpticalBalance.Where(s => s.LTID == Lenstrans.Where(x => x.Brand == Convert.ToInt32(ba.ID)).Select(x => x.ID).FirstOrDefault()).Where(d => d.StoreID == Convert.ToInt32(sa.ID)).Select(f => f.REC07).FirstOrDefault(),
                                                            REC08 = OpticalBalance.Where(s => s.LTID == Lenstrans.Where(x => x.Brand == Convert.ToInt32(ba.ID)).Select(x => x.ID).FirstOrDefault()).Where(d => d.StoreID == Convert.ToInt32(sa.ID)).Select(f => f.REC08).FirstOrDefault(),
                                                            REC09 = OpticalBalance.Where(s => s.LTID == Lenstrans.Where(x => x.Brand == Convert.ToInt32(ba.ID)).Select(x => x.ID).FirstOrDefault()).Where(d => d.StoreID == Convert.ToInt32(sa.ID)).Select(f => f.REC09).FirstOrDefault(),
                                                            REC10 = OpticalBalance.Where(s => s.LTID == Lenstrans.Where(x => x.Brand == Convert.ToInt32(ba.ID)).Select(x => x.ID).FirstOrDefault()).Where(d => d.StoreID == Convert.ToInt32(sa.ID)).Select(f => f.REC10).FirstOrDefault(),
                                                            REC11 = OpticalBalance.Where(s => s.LTID == Lenstrans.Where(x => x.Brand == Convert.ToInt32(ba.ID)).Select(x => x.ID).FirstOrDefault()).Where(d => d.StoreID == Convert.ToInt32(sa.ID)).Select(f => f.REC11).FirstOrDefault(),
                                                            REC12 = OpticalBalance.Where(s => s.LTID == Lenstrans.Where(x => x.Brand == Convert.ToInt32(ba.ID)).Select(x => x.ID).FirstOrDefault()).Where(d => d.StoreID == Convert.ToInt32(sa.ID)).Select(f => f.REC12).FirstOrDefault(),
                                                            ISS01 = OpticalBalance.Where(s => s.LTID == Lenstrans.Where(x => x.Brand == Convert.ToInt32(ba.ID)).Select(x => x.ID).FirstOrDefault()).Where(d => d.StoreID == Convert.ToInt32(sa.ID)).Select(f => f.ISS01).FirstOrDefault(),
                                                            ISS02 = OpticalBalance.Where(s => s.LTID == Lenstrans.Where(x => x.Brand == Convert.ToInt32(ba.ID)).Select(x => x.ID).FirstOrDefault()).Where(d => d.StoreID == Convert.ToInt32(sa.ID)).Select(f => f.ISS02).FirstOrDefault(),
                                                            ISS03 = OpticalBalance.Where(s => s.LTID == Lenstrans.Where(x => x.Brand == Convert.ToInt32(ba.ID)).Select(x => x.ID).FirstOrDefault()).Where(d => d.StoreID == Convert.ToInt32(sa.ID)).Select(f => f.ISS03).FirstOrDefault(),
                                                            ISS04 = OpticalBalance.Where(s => s.LTID == Lenstrans.Where(x => x.Brand == Convert.ToInt32(ba.ID)).Select(x => x.ID).FirstOrDefault()).Where(d => d.StoreID == Convert.ToInt32(sa.ID)).Select(f => f.ISS04).FirstOrDefault(),
                                                            ISS05 = OpticalBalance.Where(s => s.LTID == Lenstrans.Where(x => x.Brand == Convert.ToInt32(ba.ID)).Select(x => x.ID).FirstOrDefault()).Where(d => d.StoreID == Convert.ToInt32(sa.ID)).Select(f => f.ISS05).FirstOrDefault(),
                                                            ISS06 = OpticalBalance.Where(s => s.LTID == Lenstrans.Where(x => x.Brand == Convert.ToInt32(ba.ID)).Select(x => x.ID).FirstOrDefault()).Where(d => d.StoreID == Convert.ToInt32(sa.ID)).Select(f => f.ISS06).FirstOrDefault(),
                                                            ISS07 = OpticalBalance.Where(s => s.LTID == Lenstrans.Where(x => x.Brand == Convert.ToInt32(ba.ID)).Select(x => x.ID).FirstOrDefault()).Where(d => d.StoreID == Convert.ToInt32(sa.ID)).Select(f => f.ISS07).FirstOrDefault(),
                                                            ISS08 = OpticalBalance.Where(s => s.LTID == Lenstrans.Where(x => x.Brand == Convert.ToInt32(ba.ID)).Select(x => x.ID).FirstOrDefault()).Where(d => d.StoreID == Convert.ToInt32(sa.ID)).Select(f => f.ISS08).FirstOrDefault(),
                                                            ISS09 = OpticalBalance.Where(s => s.LTID == Lenstrans.Where(x => x.Brand == Convert.ToInt32(ba.ID)).Select(x => x.ID).FirstOrDefault()).Where(d => d.StoreID == Convert.ToInt32(sa.ID)).Select(f => f.ISS09).FirstOrDefault(),
                                                            ISS10 = OpticalBalance.Where(s => s.LTID == Lenstrans.Where(x => x.Brand == Convert.ToInt32(ba.ID)).Select(x => x.ID).FirstOrDefault()).Where(d => d.StoreID == Convert.ToInt32(sa.ID)).Select(f => f.ISS10).FirstOrDefault(),
                                                            ISS11 = OpticalBalance.Where(s => s.LTID == Lenstrans.Where(x => x.Brand == Convert.ToInt32(ba.ID)).Select(x => x.ID).FirstOrDefault()).Where(d => d.StoreID == Convert.ToInt32(sa.ID)).Select(f => f.ISS11).FirstOrDefault(),
                                                            ISS12 = OpticalBalance.Where(s => s.LTID == Lenstrans.Where(x => x.Brand == Convert.ToInt32(ba.ID)).Select(x => x.ID).FirstOrDefault()).Where(d => d.StoreID == Convert.ToInt32(sa.ID)).Select(f => f.ISS12).FirstOrDefault(),
                                                            Openingstock = OB.OpeningBalance,
                                                            ID = OpticalBalance.Where(s => s.LTID == Lenstrans.Where(x => x.Brand == Convert.ToInt32(ba.ID)).Select(x => x.ID).FirstOrDefault()).Where(d => d.StoreID == Convert.ToInt32(sa.ID)).Select(f => f.ID).FirstOrDefault(),
                                                            LTID = OB.LTID,
                                                            StoreID = OB.StoreID,
                                                        }).ToList());




                        }
                    }
   
                }

                if (Stocksummaryarray.Count() > 0)
                {
                    foreach (var item in Stocksummaryarray.ToList())
                    {
                        var osl = new OpticalStocksummaryarray();

                        for (var dt = STFdate; dt <= STdate;)
                        {
                            var itm = Opticalstksummary.OpticalStocksummaryarray.Where(x => x.LTID == item.LTID && x.StoreID == item.StoreID && x.CmpID == item.CmpID).FirstOrDefault();
                            var tdatemonth = SFdate.AddMonths(-1);
                            if (itm == null)
                            {

                                int a = 0;
                                int b = dt.Month;
                                string c = a.ToString() + b.ToString();
                                string newNumber = (b.ToString().Length == 1) ? c : dt.ToString();
                                string issue = "ISS" + newNumber;
                                string receipt = "REC" + newNumber;
                                int Iss = Stocksummaryarray.Where(w => w.LTID == item.LTID && w.StoreID == item.StoreID && w.CmpID == item.CmpID).Select(x => (int)x.GetType().GetProperty(issue).GetValue(x)).FirstOrDefault();
                                int Rec = Stocksummaryarray.Where(w => w.LTID == item.LTID && w.StoreID == item.StoreID && w.CmpID == item.CmpID).Select(x => (int)x.GetType().GetProperty(receipt).GetValue(x)).FirstOrDefault();

                                osl.CmpName = item.CmpName;
                                osl.CmpID = item.CmpID;
                                osl.Type = item.Type;
                                osl.Store = item.Store;
                                osl.Brand = item.Brand;
                                osl.UOM = item.UOM;
                                osl.Color = item.Color;
                                osl.Sph = item.Sph;
                                osl.Cyl = item.Cyl;
                                osl.Axis = item.Axis;
                                osl.Add = item.Add;
                                osl.Fshpae = item.Fshpae;
                                osl.Ftype = item.Ftype;
                                osl.Fstyle = item.Fstyle;
                                osl.Fwidth = item.Fwidth;
                                osl.ID = item.ID;
                                osl.LTID = item.LTID;
                                osl.StoreID = item.StoreID;
                                osl.Receipt += Rec;
                                osl.Issue += Iss;
                                osl.Closingstock += item.Openingstock + (Rec - Iss);
                                osl.Openingstock += dt <= tdatemonth ? item.Openingstock + (Rec - Iss) : 0;
                                STFdate = STFdate.AddMonths(1);
                                dt = STFdate;
                            }

                        }
                        Opticalstksummary.OpticalStocksummaryarray.Add(osl);
                        STFdate = DateTime.ParseExact(Fmonth.ToString("MM-yyyy"), format, CultureInfo.InvariantCulture);
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
                            Stocksummaryarray.AddRange((from OB in OpticalBalance.Where(x => x.StoreID == Convert.ToInt32(sa.ID) && x.CmpID == CompanyID && x.FYID == FinancialYearId)
                                                        join LT in Lenstrans on OB.LTID equals LT.ID
                                                        join BR in Brand.Where(x => x.ID == Convert.ToInt32(ba.ID)) on LT.Brand equals BR.ID
                                                        join UM in uommaster on LT.UOMID equals UM.id
                                                        join LM in Lensmaster on LT.LMID equals LM.RandomUniqueID
                                                        join ST in Storemasters.Where(x => x.CmpID == CompanyID) on OB.StoreID equals ST.StoreID
                                                        join cm in Company.Where(x => x.CmpID == CompanyID) on OB.CmpID equals cm.CmpID

                                                        select new Stocksummaryarray
                                                        {

                                                            CmpName = cm.CompanyName + "-" + cm.Address1,
                                                            CmpID = cm.CmpID,
                                                            Type = LM.LensType,
                                                            Store = ST.Storename,
                                                            Brand = BR.Description,
                                                            UOM = UM.Description,
                                                            Sph = LT.Sph != null ? "Sph :" + " " + LT.Sph : null,
                                                            Cyl = LT.Cyl != null ? "Cyl :" + " " + LT.Cyl : null,
                                                            Axis = LT.Axis != null ? "Axis :" + " " + LT.Axis : null,
                                                            Add = LT.Add != null ? "Add :" + " " + LT.Add : null,
                                                            Fshpae = one.Where(f => f.OLMID == LT.FrameShapeID).Select(g => g.ParentDescription).FirstOrDefault() != null ? "Shape :" + " " + one.Where(f => f.OLMID == LT.FrameShapeID).Select(g => g.ParentDescription).FirstOrDefault() : null,
                                                            Ftype = one.Where(f => f.OLMID == LT.FrameTypeID).Select(g => g.ParentDescription).FirstOrDefault() != null ? "Type :" + " " + one.Where(f => f.OLMID == LT.FrameTypeID).Select(g => g.ParentDescription).FirstOrDefault() : null,
                                                            Fstyle = one.Where(f => f.OLMID == LT.FrameStyleID).Select(g => g.ParentDescription).FirstOrDefault() != null ? "Style :" + " " + one.Where(f => f.OLMID == LT.FrameStyleID).Select(g => g.ParentDescription).FirstOrDefault() : null,
                                                            Fwidth = one.Where(f => f.OLMID == LT.FrameWidthID).Select(g => g.ParentDescription).FirstOrDefault() != null ? "Width :" + " " + one.Where(f => f.OLMID == LT.FrameWidthID).Select(g => g.ParentDescription).FirstOrDefault() : null,
                                                            Color = LT.Colour,
                                                            REC01 = OpticalBalance.Where(s => s.LTID == Lenstrans.Where(x => x.Brand == Convert.ToInt32(ba.ID)).Select(x => x.ID).FirstOrDefault()).Where(d => d.StoreID == Convert.ToInt32(sa.ID)).Select(f => f.REC01).FirstOrDefault(),
                                                            REC02 = OpticalBalance.Where(s => s.LTID == Lenstrans.Where(x => x.Brand == Convert.ToInt32(ba.ID)).Select(x => x.ID).FirstOrDefault()).Where(d => d.StoreID == Convert.ToInt32(sa.ID)).Select(f => f.REC02).FirstOrDefault(),
                                                            REC03 = OpticalBalance.Where(s => s.LTID == Lenstrans.Where(x => x.Brand == Convert.ToInt32(ba.ID)).Select(x => x.ID).FirstOrDefault()).Where(d => d.StoreID == Convert.ToInt32(sa.ID)).Select(f => f.REC03).FirstOrDefault(),
                                                            REC04 = OpticalBalance.Where(s => s.LTID == Lenstrans.Where(x => x.Brand == Convert.ToInt32(ba.ID)).Select(x => x.ID).FirstOrDefault()).Where(d => d.StoreID == Convert.ToInt32(sa.ID)).Select(f => f.REC04).FirstOrDefault(),
                                                            REC05 = OpticalBalance.Where(s => s.LTID == Lenstrans.Where(x => x.Brand == Convert.ToInt32(ba.ID)).Select(x => x.ID).FirstOrDefault()).Where(d => d.StoreID == Convert.ToInt32(sa.ID)).Select(f => f.REC05).FirstOrDefault(),
                                                            REC06 = OpticalBalance.Where(s => s.LTID == Lenstrans.Where(x => x.Brand == Convert.ToInt32(ba.ID)).Select(x => x.ID).FirstOrDefault()).Where(d => d.StoreID == Convert.ToInt32(sa.ID)).Select(f => f.REC06).FirstOrDefault(),
                                                            REC07 = OpticalBalance.Where(s => s.LTID == Lenstrans.Where(x => x.Brand == Convert.ToInt32(ba.ID)).Select(x => x.ID).FirstOrDefault()).Where(d => d.StoreID == Convert.ToInt32(sa.ID)).Select(f => f.REC07).FirstOrDefault(),
                                                            REC08 = OpticalBalance.Where(s => s.LTID == Lenstrans.Where(x => x.Brand == Convert.ToInt32(ba.ID)).Select(x => x.ID).FirstOrDefault()).Where(d => d.StoreID == Convert.ToInt32(sa.ID)).Select(f => f.REC08).FirstOrDefault(),
                                                            REC09 = OpticalBalance.Where(s => s.LTID == Lenstrans.Where(x => x.Brand == Convert.ToInt32(ba.ID)).Select(x => x.ID).FirstOrDefault()).Where(d => d.StoreID == Convert.ToInt32(sa.ID)).Select(f => f.REC09).FirstOrDefault(),
                                                            REC10 = OpticalBalance.Where(s => s.LTID == Lenstrans.Where(x => x.Brand == Convert.ToInt32(ba.ID)).Select(x => x.ID).FirstOrDefault()).Where(d => d.StoreID == Convert.ToInt32(sa.ID)).Select(f => f.REC10).FirstOrDefault(),
                                                            REC11 = OpticalBalance.Where(s => s.LTID == Lenstrans.Where(x => x.Brand == Convert.ToInt32(ba.ID)).Select(x => x.ID).FirstOrDefault()).Where(d => d.StoreID == Convert.ToInt32(sa.ID)).Select(f => f.REC11).FirstOrDefault(),
                                                            REC12 = OpticalBalance.Where(s => s.LTID == Lenstrans.Where(x => x.Brand == Convert.ToInt32(ba.ID)).Select(x => x.ID).FirstOrDefault()).Where(d => d.StoreID == Convert.ToInt32(sa.ID)).Select(f => f.REC12).FirstOrDefault(),
                                                            ISS01 = OpticalBalance.Where(s => s.LTID == Lenstrans.Where(x => x.Brand == Convert.ToInt32(ba.ID)).Select(x => x.ID).FirstOrDefault()).Where(d => d.StoreID == Convert.ToInt32(sa.ID)).Select(f => f.ISS01).FirstOrDefault(),
                                                            ISS02 = OpticalBalance.Where(s => s.LTID == Lenstrans.Where(x => x.Brand == Convert.ToInt32(ba.ID)).Select(x => x.ID).FirstOrDefault()).Where(d => d.StoreID == Convert.ToInt32(sa.ID)).Select(f => f.ISS02).FirstOrDefault(),
                                                            ISS03 = OpticalBalance.Where(s => s.LTID == Lenstrans.Where(x => x.Brand == Convert.ToInt32(ba.ID)).Select(x => x.ID).FirstOrDefault()).Where(d => d.StoreID == Convert.ToInt32(sa.ID)).Select(f => f.ISS03).FirstOrDefault(),
                                                            ISS04 = OpticalBalance.Where(s => s.LTID == Lenstrans.Where(x => x.Brand == Convert.ToInt32(ba.ID)).Select(x => x.ID).FirstOrDefault()).Where(d => d.StoreID == Convert.ToInt32(sa.ID)).Select(f => f.ISS04).FirstOrDefault(),
                                                            ISS05 = OpticalBalance.Where(s => s.LTID == Lenstrans.Where(x => x.Brand == Convert.ToInt32(ba.ID)).Select(x => x.ID).FirstOrDefault()).Where(d => d.StoreID == Convert.ToInt32(sa.ID)).Select(f => f.ISS05).FirstOrDefault(),
                                                            ISS06 = OpticalBalance.Where(s => s.LTID == Lenstrans.Where(x => x.Brand == Convert.ToInt32(ba.ID)).Select(x => x.ID).FirstOrDefault()).Where(d => d.StoreID == Convert.ToInt32(sa.ID)).Select(f => f.ISS06).FirstOrDefault(),
                                                            ISS07 = OpticalBalance.Where(s => s.LTID == Lenstrans.Where(x => x.Brand == Convert.ToInt32(ba.ID)).Select(x => x.ID).FirstOrDefault()).Where(d => d.StoreID == Convert.ToInt32(sa.ID)).Select(f => f.ISS07).FirstOrDefault(),
                                                            ISS08 = OpticalBalance.Where(s => s.LTID == Lenstrans.Where(x => x.Brand == Convert.ToInt32(ba.ID)).Select(x => x.ID).FirstOrDefault()).Where(d => d.StoreID == Convert.ToInt32(sa.ID)).Select(f => f.ISS08).FirstOrDefault(),
                                                            ISS09 = OpticalBalance.Where(s => s.LTID == Lenstrans.Where(x => x.Brand == Convert.ToInt32(ba.ID)).Select(x => x.ID).FirstOrDefault()).Where(d => d.StoreID == Convert.ToInt32(sa.ID)).Select(f => f.ISS09).FirstOrDefault(),
                                                            ISS10 = OpticalBalance.Where(s => s.LTID == Lenstrans.Where(x => x.Brand == Convert.ToInt32(ba.ID)).Select(x => x.ID).FirstOrDefault()).Where(d => d.StoreID == Convert.ToInt32(sa.ID)).Select(f => f.ISS10).FirstOrDefault(),
                                                            ISS11 = OpticalBalance.Where(s => s.LTID == Lenstrans.Where(x => x.Brand == Convert.ToInt32(ba.ID)).Select(x => x.ID).FirstOrDefault()).Where(d => d.StoreID == Convert.ToInt32(sa.ID)).Select(f => f.ISS11).FirstOrDefault(),
                                                            ISS12 = OpticalBalance.Where(s => s.LTID == Lenstrans.Where(x => x.Brand == Convert.ToInt32(ba.ID)).Select(x => x.ID).FirstOrDefault()).Where(d => d.StoreID == Convert.ToInt32(sa.ID)).Select(f => f.ISS12).FirstOrDefault(),
                                                            Openingstock = OB.OpeningBalance,
                                                            ID = OpticalBalance.Where(s => s.LTID == Lenstrans.Where(x => x.Brand == Convert.ToInt32(ba.ID)).Select(x => x.ID).FirstOrDefault()).Where(d => d.StoreID == Convert.ToInt32(sa.ID)).Select(f => f.ID).FirstOrDefault(),
                                                            LTID = OB.LTID,
                                                            StoreID = OB.StoreID,
                                                        }).ToList());
                        }
                    }

                }

                if (Stocksummaryarray.Count() > 0)
                {
                    foreach (var item in Stocksummaryarray.ToList())
                    {
                        var osl = new OpticalStocksummaryarray();

                        for (var dt = STFdate; dt <= STdate;)
                        {
                            var itm = Opticalstksummary.OpticalStocksummaryarray.Where(x => x.LTID == item.LTID && x.StoreID == item.StoreID && x.CmpID == item.CmpID).FirstOrDefault();
                            var tdatemonth = SFdate.AddMonths(-1);
                            if (itm == null)
                            {

                                int a = 0;
                                int b = dt.Month;
                                string c = a.ToString() + b.ToString();
                                string newNumber = (b.ToString().Length == 1) ? c : dt.ToString();
                                string issue = "ISS" + newNumber;
                                string receipt = "REC" + newNumber;
                                int Iss = Stocksummaryarray.Where(w => w.LTID == item.LTID && w.StoreID == item.StoreID && w.CmpID == item.CmpID).Select(x => (int)x.GetType().GetProperty(issue).GetValue(x)).FirstOrDefault();
                                int Rec = Stocksummaryarray.Where(w => w.LTID == item.LTID && w.StoreID == item.StoreID && w.CmpID == item.CmpID).Select(x => (int)x.GetType().GetProperty(receipt).GetValue(x)).FirstOrDefault();

                                osl.CmpName = item.CmpName;
                                osl.CmpID = item.CmpID;
                                osl.Type = item.Type;
                                osl.Store = item.Store;
                                osl.Brand = item.Brand;
                                osl.UOM = item.UOM;
                                osl.Color = item.Color;
                                osl.Sph = item.Sph;
                                osl.Cyl = item.Cyl;
                                osl.Axis = item.Axis;
                                osl.Add = item.Add;
                                osl.Fshpae = item.Fshpae;
                                osl.Ftype = item.Ftype;
                                osl.Fstyle = item.Fstyle;
                                osl.Fwidth = item.Fwidth;
                                osl.ID = item.ID;
                                osl.LTID = item.LTID;
                                osl.StoreID = item.StoreID;
                                osl.Receipt += Rec;
                                osl.Issue += Iss;
                                osl.Closingstock += item.Openingstock + (Rec - Iss);
                                osl.Openingstock += dt <= tdatemonth ? item.Openingstock + (Rec - Iss) : 0; 
                                STFdate = STFdate.AddMonths(1);
                                dt = STFdate;
                            }
                          
                        }
                        Opticalstksummary.OpticalStocksummaryarray.Add(osl);
                        STFdate = DateTime.ParseExact(Fmonth.ToString("MM-yyyy"), format, CultureInfo.InvariantCulture);
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
