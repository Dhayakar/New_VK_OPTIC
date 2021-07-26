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
                                                                       Sph = LT.Sph != null ? "Sph :" + " " + LT.Sph + ";" : null,
                                                                       Cyl = LT.Cyl != null ? "Cyl :" + " " + LT.Cyl + ";" : null,
                                                                       Axis = LT.Axis != null ? "Axis :" + " " + LT.Axis + ";" : null,
                                                                       Add = LT.Add != null ? "Add :" + " " + LT.Add + ";" : null,
                                                                       Fshpae = one.Where(f => f.OLMID == LT.FrameShapeID).Select(g => g.ParentDescription).FirstOrDefault() != null ? "Shape :" + " " + one.Where(f => f.OLMID == LT.FrameShapeID).Select(g => g.ParentDescription).FirstOrDefault() + ";" : null,
                                                                       Ftype = one.Where(f => f.OLMID == LT.FrameTypeID).Select(g => g.ParentDescription).FirstOrDefault() != null ? "Type :" + " " + one.Where(f => f.OLMID == LT.FrameTypeID).Select(g => g.ParentDescription).FirstOrDefault() + ";" : null,
                                                                       Fstyle = one.Where(f => f.OLMID == LT.FrameStyleID).Select(g => g.ParentDescription).FirstOrDefault() != null ? "Style :" + " " + one.Where(f => f.OLMID == LT.FrameStyleID).Select(g => g.ParentDescription).FirstOrDefault() + ";" : null,
                                                                       Fwidth = one.Where(f => f.OLMID == LT.FrameWidthID).Select(g => g.ParentDescription).FirstOrDefault() != null ? "Width :" + " " + one.Where(f => f.OLMID == LT.FrameWidthID).Select(g => g.ParentDescription).FirstOrDefault() + ";" : null,

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
                                                                       ID = OpticalBalance.Where(s => s.LTID == Lenstrans.Where(x => x.Brand == Convert.ToInt32(ba.ID)).Select(x => x.ID).FirstOrDefault()).Where(d => d.StoreID == Convert.ToInt32(sa.ID)).Select(f => f.ID).FirstOrDefault(),
                                                                   }).ToList();
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
                                                                       Color = LT.Colour,
                                                                       Sph = LT.Sph != null ? "Sph :" + " " + LT.Sph + ";" : null,
                                                                       Cyl = LT.Cyl != null ? "Cyl :" + " " + LT.Cyl + ";" : null,
                                                                       Axis = LT.Axis != null ? "Axis :" + " " + LT.Axis + ";" : null,
                                                                       Add = LT.Add != null ? "Add :" + " " + LT.Add + ";" : null,
                                                                       Fshpae = one.Where(f => f.OLMID == LT.FrameShapeID).Select(g => g.ParentDescription).FirstOrDefault() != null ? "Shape :" + " " + one.Where(f => f.OLMID == LT.FrameShapeID).Select(g => g.ParentDescription).FirstOrDefault() + ";" : null,
                                                                       Ftype = one.Where(f => f.OLMID == LT.FrameTypeID).Select(g => g.ParentDescription).FirstOrDefault() != null ? "Type :" + " " + one.Where(f => f.OLMID == LT.FrameTypeID).Select(g => g.ParentDescription).FirstOrDefault() + ";" : null,
                                                                       Fstyle = one.Where(f => f.OLMID == LT.FrameStyleID).Select(g => g.ParentDescription).FirstOrDefault() != null ? "Style :" + " " + one.Where(f => f.OLMID == LT.FrameStyleID).Select(g => g.ParentDescription).FirstOrDefault() + ";" : null,
                                                                       Fwidth = one.Where(f => f.OLMID == LT.FrameWidthID).Select(g => g.ParentDescription).FirstOrDefault() != null ? "Width :" + " " + one.Where(f => f.OLMID == LT.FrameWidthID).Select(g => g.ParentDescription).FirstOrDefault() + ";" : null,
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
                                
                                                                   }).ToList();


                            if (Opticalstksummary.Stocksummaryarray.Count() > 0)
                            {
                                foreach (var item in Opticalstksummary.Stocksummaryarray.ToList())
                                {
                                    for (var dt = fdate.Month; dt <= tdate.Month; dt = dt++)
                                    {

                                        if (dt == 1 && Opticalstksummary.Stocksummaryarray.Count() > 0)
                                        {
                                            var osl = new OpticalStocksummaryarray();
                                            osl.CmpName = item.CmpName;
                                            osl.Type = item.Type;
                                            osl.Store = item.Store;
                                            osl.Brand = item.Brand;
                                            osl.UOM = item.UOM;
                                            osl.Color = item.Color;
                                            osl.Sph = item.Sph;
                                            osl.Axis = item.Axis;
                                            osl.Add = item.Add;
                                            osl.Fshpae = item.Fshpae;
                                            osl.Ftype = item.Ftype;
                                            osl.Fstyle = item.Fstyle;
                                            osl.Fwidth = item.Fwidth;
                                            osl.Receipt = item.REC01;
                                            osl.Issue = item.ISS01;
                                            osl.Openingstock = item.Openingstock;
                                            osl.Closingstock = item.Openingstock + item.REC01 - item.ISS01;
                                            osl.ID = item.ID;
                                            Opticalstksummary.OpticalStocksummaryarray.Add(osl);
                                        }

                                        else {
                                            var osl = new OpticalStocksummaryarray();
                                            osl.CmpName = item.CmpName;
                                            osl.Type = item.Type;
                                            osl.Store = item.Store;
                                            osl.Brand = item.Brand;
                                            osl.UOM = item.UOM;
                                            osl.Color = item.Color;
                                            osl.Sph = item.Sph;
                                            osl.Axis = item.Axis;
                                            osl.Add = item.Add;
                                            osl.Fshpae = item.Fshpae;
                                            osl.Ftype = item.Ftype;
                                            osl.Fstyle = item.Fstyle;
                                            osl.Fwidth = item.Fwidth;
                                            osl.Receipt = item.REC01;
                                            osl.Issue = item.ISS01;
                                            osl.Openingstock = item.Openingstock;
                                            osl.Closingstock = item.Openingstock + item.REC01 - item.ISS01;
                                            osl.ID = item.ID;

                                        }


                                        if (dt == 2 && Opticalstksummary.Stocksummaryarray.Count() > 0)
                                        {
                                            var osl = new OpticalStocksummaryarray();
                                            osl.CmpName = item.CmpName;
                                            osl.Type = item.Type;
                                            osl.Store = item.Store;
                                            osl.Brand = item.Brand;
                                            osl.UOM = item.UOM;
                                            osl.Color = item.Color;
                                            osl.Sph = item.Sph;
                                            osl.Axis = item.Axis;
                                            osl.Add = item.Add;
                                            osl.Fshpae = item.Fshpae;
                                            osl.Ftype = item.Ftype;
                                            osl.Fstyle = item.Fstyle;
                                            osl.Fwidth = item.Fwidth;
                                            osl.Receipt += item.REC01 + item.REC02;
                                            osl.Issue += item.ISS01 + item.ISS02;
                                            osl.Openingstock = item.Openingstock;
                                            osl.Closingstock += item.Openingstock + item.REC01 + item.REC02 - (item.ISS01 + item.ISS02);
                                            osl.ID = item.ID;
                                            Opticalstksummary.OpticalStocksummaryarray.Add(osl);
                                        }

                                        else
                                        {
                                            var osl = new OpticalStocksummaryarray();
                                            osl.CmpName = item.CmpName;
                                            osl.Type = item.Type;
                                            osl.Store = item.Store;
                                            osl.Brand = item.Brand;
                                            osl.UOM = item.UOM;
                                            osl.Color = item.Color;
                                            osl.Sph = item.Sph;
                                            osl.Axis = item.Axis;
                                            osl.Add = item.Add;
                                            osl.Fshpae = item.Fshpae;
                                            osl.Ftype = item.Ftype;
                                            osl.Fstyle = item.Fstyle;
                                            osl.Fwidth = item.Fwidth;
                                            osl.Receipt += item.REC01 + item.REC02;
                                            osl.Issue += item.ISS01 + item.ISS02;
                                            osl.Openingstock = item.Openingstock;
                                            osl.Closingstock += item.Openingstock + item.REC01 + item.REC02 - (item.ISS01 + item.ISS02);
                                            osl.ID = item.ID;

                                        }

                                        if (dt == 3 && Opticalstksummary.Stocksummaryarray.Count() > 0)
                                        {
                                            var osl = new OpticalStocksummaryarray();
                                            osl.CmpName = item.CmpName;
                                            osl.Type = item.Type;
                                            osl.Store = item.Store;
                                            osl.Brand = item.Brand;
                                            osl.UOM = item.UOM;
                                            osl.Color = item.Color;
                                            osl.Sph = item.Sph;
                                            osl.Axis = item.Axis;
                                            osl.Add = item.Add;
                                            osl.Fshpae = item.Fshpae;
                                            osl.Ftype = item.Ftype;
                                            osl.Fstyle = item.Fstyle;
                                            osl.Fwidth = item.Fwidth;
                                            osl.Receipt += item.REC01 + item.REC02 + item.REC03;
                                            osl.Issue += item.ISS01 + item.ISS02 + item.ISS03;
                                            osl.Openingstock = item.Openingstock;
                                            osl.Closingstock += item.Openingstock + item.REC01 + item.REC02 + item.REC03 - (item.ISS01 + item.ISS02 + item.ISS03);
                                            osl.ID = item.ID;
                                            Opticalstksummary.OpticalStocksummaryarray.Add(osl);
                                        }

                                        else
                                        {
                                            var osl = new OpticalStocksummaryarray();
                                            osl.CmpName = item.CmpName;
                                            osl.Type = item.Type;
                                            osl.Store = item.Store;
                                            osl.Brand = item.Brand;
                                            osl.UOM = item.UOM;
                                            osl.Color = item.Color;
                                            osl.Sph = item.Sph;
                                            osl.Axis = item.Axis;
                                            osl.Add = item.Add;
                                            osl.Fshpae = item.Fshpae;
                                            osl.Ftype = item.Ftype;
                                            osl.Fstyle = item.Fstyle;
                                            osl.Fwidth = item.Fwidth;
                                            osl.Receipt += item.REC01 + item.REC02 + item.REC03;
                                            osl.Issue += item.ISS01 + item.ISS02 + item.ISS03;
                                            osl.Openingstock = item.Openingstock;
                                            osl.Closingstock += item.Openingstock + item.REC01 + item.REC02 + item.REC03 - (item.ISS01 + item.ISS02 + item.ISS03);
                                            osl.ID = item.ID;

                                        }

                                    }


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
