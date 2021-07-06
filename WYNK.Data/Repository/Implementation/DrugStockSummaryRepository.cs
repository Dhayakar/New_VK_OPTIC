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
    class DrugStockSummaryRepository : RepositoryBase<DrugStockSummaryDataView>, IDrugStockSummaryRepository
    {
        private readonly WYNKContext _Wynkcontext;
        private readonly CMPSContext _Cmpscontext;
       

        public DrugStockSummaryRepository(WYNKContext context, CMPSContext Cmpscontext) : base(context, Cmpscontext)
        {
            _Wynkcontext = context;
            _Cmpscontext = Cmpscontext;

        }

        public DrugStockSummaryDataView GetStockSummary(DateTime From, DateTime To, int CompanyID, int storeid)
        {
            var Financial = WYNKContext.FinancialYear.ToList();
            var ItemBal = WYNKContext.ItemBalance.ToList();
            var DrugMaster = WYNKContext.DrugMaster.ToList();
            var DrugGroup = WYNKContext.DrugGroup.ToList();
            var Store = CMPSContext.Storemasters.ToList();
            var cmp = CMPSContext.Company.ToList();

            var ID = Financial.Where(x =>  x.FYTo >= To.Date && x.CMPID == CompanyID && x.IsActive == true).Select(x => x.ID).FirstOrDefault();

            var MF = From.Month;
            var MT = To.Month;
            var SuumarSearch = new DrugStockSummaryDataView();

            int cmpid = CMPSContext.Company.Where(c => c.CmpID == CompanyID).Select(c => c.ParentID).FirstOrDefault();
            if (cmpid == 0)
            {
                cmpid = CompanyID;
            }

            if (MT == 1)
            {

                SuumarSearch.Summary = new List<Summaryy>();
                SuumarSearch.Summary = (from FY in Financial.Where(x => x.FYTo >= To.Date && x.CMPID == CompanyID)
                                        join IB in ItemBal.Where(x => x.FYear == ID && x.StoreID ==storeid) on FY.ID equals IB.FYear
                                        join DM in DrugMaster on IB.ItemID equals DM.ID
                                        join DG in DrugGroup on DM.GenericName equals DG.ID
                                        join ST in Store on IB.StoreID equals ST.StoreID
                                        join cm in cmp.Where(x => x.CmpID == CompanyID) on IB.CmpID equals cm.CmpID

                                        select new Summaryy
                                        {
                                            CmpName = cm.CompanyName + "-" + cm.Address1,
                                            Store = ST.Storename,
                                            Brand = DM.Brand,
                                            GenericName = DG.Description,
                                            DrugGroup = DM.DrugGroup,
                                            DrugCtgy = DM.DrugCategory,
                                            UOM = DM.UOM,
                                            OpeningBalance = IB.OpeningBalance,
                                            Receipt = IB.Rec01,
                                            Issue = IB.Iss01,
                                            ClosingBalance = IB.OpeningBalance + IB.Rec01 - IB.Iss01,
                                            DrugID = DM.ID,

                                        }).ToList();
            }

            else if (MT == 2)
            {

                SuumarSearch.Summary = new List<Summaryy>();
                SuumarSearch.Summary = (from FY in Financial.Where(x => x.FYTo >= To.Date && x.CMPID == CompanyID)
                                        join IB in ItemBal.Where(x => x.FYear == ID && x.StoreID == storeid) on FY.ID equals IB.FYear
                                        join DM in DrugMaster on IB.ItemID equals DM.ID
                                        join DG in DrugGroup on DM.GenericName equals DG.ID
                                        join ST in Store on IB.StoreID equals ST.StoreID


                                        join cm in cmp.Where(x => x.CmpID == CompanyID) on IB.CmpID equals cm.CmpID

                                        select new Summaryy
                                        {
                                            CmpName = cm.CompanyName + "-" + cm.Address1,
                                            Store = ST.Storename,
                                            Brand = DM.Brand,
                                            GenericName = DG.Description,
                                            DrugGroup = DM.DrugGroup,
                                            UOM = DM.UOM,
                                            OpeningBalance = IB.OpeningBalance,
                                            Receipt = IB.Rec01 + IB.Rec02,
                                            Issue = IB.Iss01 + IB.Iss02,
                                            ClosingBalance = IB.OpeningBalance + IB.Rec01 + IB.Rec02 - (IB.Iss01 + IB.Iss02),
                                            DrugCtgy = DM.DrugCategory,
                                            DrugID = DM.ID,
                                        }).ToList();
            }

            else if (MT == 3)
            {

                SuumarSearch.Summary = new List<Summaryy>();
                SuumarSearch.Summary = (from FY in Financial.Where(x => x.FYTo >= To.Date && x.CMPID == CompanyID)
                                        join IB in ItemBal.Where(x => x.FYear == ID && x.StoreID == storeid) on FY.ID equals IB.FYear
                                        join DM in DrugMaster on IB.ItemID equals DM.ID
                                        join DG in DrugGroup on DM.GenericName equals DG.ID
                                        join ST in Store on IB.StoreID equals ST.StoreID


                                        join cm in cmp.Where(x => x.CmpID == CompanyID) on IB.CmpID equals cm.CmpID

                                        select new Summaryy
                                        {
                                            CmpName = cm.CompanyName + "-" + cm.Address1,
                                            Store = ST.Storename,
                                            Brand = DM.Brand,
                                            GenericName = DG.Description,
                                            DrugGroup = DM.DrugGroup,
                                            UOM = DM.UOM,
                                            OpeningBalance = IB.OpeningBalance,
                                            Receipt = IB.Rec01 + IB.Rec02 + IB.Rec03,
                                            Issue = IB.Iss01 + IB.Iss02 + IB.Iss03,
                                            ClosingBalance = IB.OpeningBalance + IB.Rec01 + IB.Rec02 + IB.Rec03 -(IB.Iss01 + IB.Iss02 + IB.Iss03),
                                            DrugCtgy = DM.DrugCategory,
                                            DrugID = DM.ID,
                                        }).ToList();
            }
            else if (MT == 4)
            {

                SuumarSearch.Summary = new List<Summaryy>();
                SuumarSearch.Summary = (from FY in Financial.Where(x => x.FYTo >= To.Date && x.CMPID == CompanyID)
                                        join IB in ItemBal.Where(x => x.FYear == ID && x.StoreID == storeid) on FY.ID equals IB.FYear
                                        join DM in DrugMaster on IB.ItemID equals DM.ID
                                        join DG in DrugGroup on DM.GenericName equals DG.ID
                                        join ST in Store on IB.StoreID equals ST.StoreID


                                        join cm in cmp.Where(x => x.CmpID == CompanyID) on IB.CmpID equals cm.CmpID

                                        select new Summaryy
                                        {
                                            CmpName = cm.CompanyName + "-" + cm.Address1,
                                            Store = ST.Storename,
                                            Brand = DM.Brand,
                                            GenericName = DG.Description,
                                            DrugGroup = DM.DrugGroup,
                                            UOM = DM.UOM,
                                            OpeningBalance = IB.OpeningBalance,
                                            Receipt = IB.Rec01 + IB.Rec02 + IB.Rec03 + IB.Rec04,
                                            Issue = IB.Iss01 + IB.Iss02 + IB.Iss03 + IB.Iss04,
                                            ClosingBalance = IB.OpeningBalance + IB.Rec01 + IB.Rec02 + IB.Rec03 + IB.Rec04 - (IB.Iss01 + IB.Iss02 + IB.Iss03 + IB.Iss04),
                                            DrugCtgy = DM.DrugCategory,
                                            DrugID = DM.ID,
                                        }).ToList();
            }

            else if (MT == 5)
            {

                SuumarSearch.Summary = new List<Summaryy>();
                SuumarSearch.Summary = (from FY in Financial.Where(x => x.FYTo >= To.Date && x.CMPID == CompanyID)
                                        join IB in ItemBal.Where(x => x.FYear == ID && x.StoreID == storeid) on FY.ID equals IB.FYear
                                        join DM in DrugMaster on IB.ItemID equals DM.ID
                                        join DG in DrugGroup on DM.GenericName equals DG.ID
                                        join ST in Store on IB.StoreID equals ST.StoreID


                                        join cm in cmp.Where(x => x.CmpID == CompanyID) on IB.CmpID equals cm.CmpID

                                        select new Summaryy
                                        {
                                            CmpName = cm.CompanyName + "-" + cm.Address1,
                                            Store = ST.Storename,
                                            Brand = DM.Brand,
                                            GenericName = DG.Description,
                                            DrugGroup = DM.DrugGroup,
                                            UOM = DM.UOM,
                                            OpeningBalance = IB.OpeningBalance,
                                            Receipt = IB.Rec01 + IB.Rec02 + IB.Rec03 + IB.Rec04 + IB.Rec05,
                                            Issue = IB.Iss01 + IB.Iss02 + IB.Iss03 + IB.Iss04 + IB.Iss05,
                                            ClosingBalance = IB.OpeningBalance + IB.Rec01 + IB.Rec02 + IB.Rec03 + IB.Rec04 + IB.Rec05 - 
                                            (IB.Iss01 + IB.Iss02 + IB.Iss03 + IB.Iss04 + IB.Iss05),
                                            DrugCtgy = DM.DrugCategory,
                                            DrugID = DM.ID,
                                        }).ToList();
            }

            else if (MT == 6)
            {

                SuumarSearch.Summary = new List<Summaryy>();
                SuumarSearch.Summary = (from FY in Financial.Where(x => x.FYTo >= To.Date && x.CMPID == CompanyID)
                                        join IB in ItemBal.Where(x => x.FYear == ID && x.StoreID == storeid) on FY.ID equals IB.FYear
                                        join DM in DrugMaster on IB.ItemID equals DM.ID
                                        join DG in DrugGroup on DM.GenericName equals DG.ID
                                        join ST in Store on IB.StoreID equals ST.StoreID


                                        join cm in cmp.Where(x => x.CmpID == CompanyID) on IB.CmpID equals cm.CmpID

                                        select new Summaryy
                                        {
                                            CmpName = cm.CompanyName + "-" + cm.Address1,
                                            Store = ST.Storename,
                                            Brand = DM.Brand,
                                            GenericName = DG.Description,
                                            DrugGroup = DM.DrugGroup,
                                            UOM = DM.UOM,
                                            OpeningBalance = IB.OpeningBalance,
                                            Receipt = IB.Rec01 + IB.Rec02 + IB.Rec03 + IB.Rec04 + IB.Rec05 + IB.Rec06,
                                            Issue = IB.Iss01 + IB.Iss02 + IB.Iss03 + IB.Iss04 + IB.Iss05 + IB.Iss06,
                                            ClosingBalance = IB.OpeningBalance + IB.Rec01 + IB.Rec02 + IB.Rec03 + IB.Rec04 + IB.Rec05 + IB.Rec06 -
                                            (IB.Iss01 + IB.Iss02 + IB.Iss03 + IB.Iss04 + IB.Iss05 + IB.Iss06),
                                            DrugCtgy = DM.DrugCategory,
                                            DrugID = DM.ID,
                                        }).ToList();
            }

            else if (MT == 7)
            {

                SuumarSearch.Summary = new List<Summaryy>();
                SuumarSearch.Summary = (from FY in Financial.Where(x => x.FYTo >= To.Date && x.CMPID == CompanyID)
                                        join IB in ItemBal.Where(x => x.FYear == ID && x.StoreID == storeid) on FY.ID equals IB.FYear
                                        join DM in DrugMaster on IB.ItemID equals DM.ID
                                        join DG in DrugGroup on DM.GenericName equals DG.ID
                                        join ST in Store on IB.StoreID equals ST.StoreID


                                        join cm in cmp.Where(x => x.CmpID == CompanyID) on IB.CmpID equals cm.CmpID

                                        select new Summaryy
                                        {
                                            CmpName = cm.CompanyName + "-" + cm.Address1,
                                            Store = ST.Storename,
                                            Brand = DM.Brand,
                                            GenericName = DG.Description,
                                            DrugGroup = DM.DrugGroup,
                                            UOM = DM.UOM,
                                            OpeningBalance = IB.OpeningBalance,
                                            Receipt = IB.Rec01 + IB.Rec02 + IB.Rec03 + IB.Rec04 + IB.Rec05 + IB.Rec06 + IB.Rec07,
                                            Issue = IB.Iss01 + IB.Iss02 + IB.Iss03 + IB.Iss04 + IB.Iss05 + IB.Iss06 + IB.Iss07,
                                            ClosingBalance = IB.OpeningBalance + IB.Rec01 + IB.Rec02 + IB.Rec03 + IB.Rec04 + IB.Rec05 + IB.Rec06 + IB.Rec07 -
                                            (IB.Iss01 + IB.Iss02 + IB.Iss03 + IB.Iss04 + IB.Iss05 + IB.Iss06 + IB.Iss07),
                                            DrugCtgy = DM.DrugCategory,
                                            DrugID = DM.ID,
                                        }).ToList();
            }

            else if (MT == 8)
            {

                SuumarSearch.Summary = new List<Summaryy>();
                SuumarSearch.Summary = (from FY in Financial.Where(x => x.FYTo >= To.Date && x.CMPID == CompanyID)
                                        join IB in ItemBal.Where(x => x.FYear == ID && x.StoreID == storeid) on FY.ID equals IB.FYear
                                        join DM in DrugMaster on IB.ItemID equals DM.ID
                                        join DG in DrugGroup on DM.GenericName equals DG.ID
                                        join ST in Store on IB.StoreID equals ST.StoreID


                                        join cm in cmp.Where(x => x.CmpID == CompanyID) on IB.CmpID equals cm.CmpID

                                        select new Summaryy
                                        {
                                            CmpName = cm.CompanyName + "-" + cm.Address1,
                                            Store = ST.Storename,
                                            Brand = DM.Brand,
                                            GenericName = DG.Description,
                                            DrugGroup = DM.DrugGroup,
                                            UOM = DM.UOM,
                                            OpeningBalance = IB.OpeningBalance,
                                            Receipt = IB.Rec01 + IB.Rec02 + IB.Rec03 + IB.Rec04 + IB.Rec05 + IB.Rec06 + IB.Rec07 + IB.Rec08,
                                            Issue = IB.Iss01 + IB.Iss02 + IB.Iss03 + IB.Iss04 + IB.Iss05 + IB.Iss06 + IB.Iss07 + IB.Iss08,
                                            ClosingBalance = IB.OpeningBalance + IB.Rec01 + IB.Rec02 + IB.Rec03 + IB.Rec04 + IB.Rec05 + IB.Rec06 + IB.Rec07 + IB.Rec08 -
                                            (IB.Iss01 + IB.Iss02 + IB.Iss03 + IB.Iss04 + IB.Iss05 + IB.Iss06 + IB.Iss07 + IB.Iss08),
                                            DrugCtgy = DM.DrugCategory,
                                            DrugID = DM.ID,
                                        }).ToList();
            }

            else if (MT == 9)
            {

                SuumarSearch.Summary = new List<Summaryy>();
                SuumarSearch.Summary = (from FY in Financial.Where(x => x.FYTo >= To.Date && x.CMPID == CompanyID)
                                        join IB in ItemBal.Where(x => x.FYear == ID && x.StoreID == storeid) on FY.ID equals IB.FYear
                                        join DM in DrugMaster on IB.ItemID equals DM.ID
                                        join DG in DrugGroup on DM.GenericName equals DG.ID
                                        join ST in Store on IB.StoreID equals ST.StoreID


                                        join cm in cmp.Where(x => x.CmpID == CompanyID) on IB.CmpID equals cm.CmpID

                                        select new Summaryy
                                        {
                                            CmpName = cm.CompanyName + "-" + cm.Address1,
                                            Store = ST.Storename,
                                            Brand = DM.Brand,
                                            GenericName = DG.Description,
                                            DrugGroup = DM.DrugGroup,
                                            UOM = DM.UOM,
                                            OpeningBalance = IB.OpeningBalance,
                                            Receipt = IB.Rec01 + IB.Rec02 + IB.Rec03 + IB.Rec04 + IB.Rec05 + IB.Rec06 + IB.Rec07 + IB.Rec08 + IB.Rec09,
                                            Issue = IB.Iss01 + IB.Iss02 + IB.Iss03 + IB.Iss04 + IB.Iss05 + IB.Iss06 + IB.Iss07 + IB.Iss08 + IB.Iss09,
                                            ClosingBalance = IB.OpeningBalance + IB.Rec01 + IB.Rec02 + IB.Rec03 + IB.Rec04 + IB.Rec05 + IB.Rec06 + IB.Rec07 + IB.Rec08 + IB.Rec09 -
                                            (IB.Iss01 + IB.Iss02 + IB.Iss03 + IB.Iss04 + IB.Iss05 + IB.Iss06 + IB.Iss07 + IB.Iss08 + IB.Iss09),
                                            DrugCtgy = DM.DrugCategory,
                                            DrugID = DM.ID,
                                        }).ToList();
            }
            else if (MT == 10)
            {

                SuumarSearch.Summary = new List<Summaryy>();
                SuumarSearch.Summary = (from FY in Financial.Where(x => x.FYTo >= To.Date && x.CMPID == CompanyID)
                                        join IB in ItemBal.Where(x => x.FYear == ID && x.StoreID == storeid) on FY.ID equals IB.FYear
                                        join DM in DrugMaster on IB.ItemID equals DM.ID
                                        join DG in DrugGroup on DM.GenericName equals DG.ID
                                        join ST in Store on IB.StoreID equals ST.StoreID


                                        join cm in cmp.Where(x => x.CmpID == CompanyID) on IB.CmpID equals cm.CmpID

                                        select new Summaryy
                                        {
                                            CmpName = cm.CompanyName + "-" + cm.Address1,
                                            Store = ST.Storename,
                                            Brand = DM.Brand,
                                            GenericName = DG.Description,
                                            DrugGroup = DM.DrugGroup,
                                            UOM = DM.UOM,
                                            OpeningBalance = IB.OpeningBalance,
                                            Receipt = IB.Rec01 + IB.Rec02 + IB.Rec03 + IB.Rec04 + IB.Rec05 + IB.Rec06 + IB.Rec07 + IB.Rec08 + IB.Rec09 + IB.Rec10,
                                            Issue = IB.Iss01 + IB.Iss02 + IB.Iss03 + IB.Iss04 + IB.Iss05 + IB.Iss06 + IB.Iss07 + IB.Iss08 + IB.Iss09 + IB.Iss10,
                                            ClosingBalance = IB.OpeningBalance + IB.Rec01 + IB.Rec02 + IB.Rec03 + IB.Rec04 + IB.Rec05 + IB.Rec06 + IB.Rec07 + IB.Rec08 + IB.Rec09 + IB.Rec10 -
                                            (IB.Iss01 + IB.Iss02 + IB.Iss03 + IB.Iss04 + IB.Iss05 + IB.Iss06 + IB.Iss07 + IB.Iss08 + IB.Iss09 + IB.Iss10),
                                            DrugCtgy = DM.DrugCategory,
                                            DrugID = DM.ID,
                                        }).ToList();
            }


            else if (MT == 11)
            {

                SuumarSearch.Summary = new List<Summaryy>();
                SuumarSearch.Summary = (from FY in Financial.Where(x => x.FYTo >= To.Date && x.CMPID == CompanyID)
                                        join IB in ItemBal.Where(x => x.FYear == ID && x.StoreID == storeid) on FY.ID equals IB.FYear
                                        join DM in DrugMaster on IB.ItemID equals DM.ID
                                        join DG in DrugGroup on DM.GenericName equals DG.ID
                                        join ST in Store on IB.StoreID equals ST.StoreID


                                        join cm in cmp.Where(x => x.CmpID == CompanyID) on IB.CmpID equals cm.CmpID

                                        select new Summaryy
                                        {
                                            CmpName = cm.CompanyName + "-" + cm.Address1,
                                            Store = ST.Storename,
                                            Brand = DM.Brand,
                                            GenericName = DG.Description,
                                            DrugGroup = DM.DrugGroup,
                                            UOM = DM.UOM,
                                            OpeningBalance = IB.OpeningBalance,
                                            Receipt = IB.Rec01 + IB.Rec02 + IB.Rec03 + IB.Rec04 + IB.Rec05 + IB.Rec06 + IB.Rec07 + IB.Rec08 + IB.Rec09 + IB.Rec10 + IB.Rec11,
                                            Issue = IB.Iss01 + IB.Iss02 + IB.Iss03 + IB.Iss04 + IB.Iss05 + IB.Iss06 + IB.Iss07 + IB.Iss08 + IB.Iss09 + IB.Iss10 + IB.Iss11,
                                            ClosingBalance = IB.OpeningBalance + IB.Rec01 + IB.Rec02 + IB.Rec03 + IB.Rec04 + IB.Rec05 + IB.Rec06 + IB.Rec07 + IB.Rec08 + IB.Rec09 + IB.Rec10 + IB.Rec11 -
                                            (IB.Iss01 + IB.Iss02 + IB.Iss03 + IB.Iss04 + IB.Iss05 + IB.Iss06 + IB.Iss07 + IB.Iss08 + IB.Iss09 + IB.Iss10 + IB.Iss11),
                                            DrugCtgy = DM.DrugCategory,
                                            DrugID = DM.ID,
                                        }).ToList();
            }
            else if (MT == 12)
            {

                SuumarSearch.Summary = new List<Summaryy>();
                SuumarSearch.Summary = (from FY in Financial.Where(x => x.FYTo >= To.Date && x.CMPID == CompanyID)
                                        join IB in ItemBal.Where(x => x.FYear == ID && x.StoreID == storeid) on FY.ID equals IB.FYear
                                        join DM in DrugMaster on IB.ItemID equals DM.ID
                                        join DG in DrugGroup on DM.GenericName equals DG.ID
                                        join ST in Store on IB.StoreID equals ST.StoreID


                                        join cm in cmp.Where(x => x.CmpID == CompanyID) on IB.CmpID equals cm.CmpID

                                        select new Summaryy
                                        {
                                            CmpName = cm.CompanyName + "-" + cm.Address1,
                                            Store = ST.Storename,
                                            Brand = DM.Brand,
                                            GenericName = DG.Description,
                                            DrugGroup = DM.DrugGroup,
                                            UOM = DM.UOM,
                                            OpeningBalance = IB.OpeningBalance,
                                            Receipt = IB.Rec01 + IB.Rec02 + IB.Rec03 + IB.Rec04 + IB.Rec05 + IB.Rec06 + IB.Rec07 + IB.Rec08 + IB.Rec09 + IB.Rec10 + IB.Rec11 + IB.Rec12,
                                            Issue = IB.Iss01 + IB.Iss02 + IB.Iss03 + IB.Iss04 + IB.Iss05 + IB.Iss06 + IB.Iss07 + IB.Iss08 + IB.Iss09 + IB.Iss10 + IB.Iss11 + IB.Iss12,
                                            ClosingBalance = IB.OpeningBalance + IB.Rec01 + IB.Rec02 + IB.Rec03 + IB.Rec04 + IB.Rec05 + IB.Rec06 + IB.Rec07 + IB.Rec08 + IB.Rec09 + IB.Rec10 + IB.Rec11 + IB.Rec12 -
                                            (IB.Iss01 + IB.Iss02 + IB.Iss03 + IB.Iss04 + IB.Iss05 + IB.Iss06 + IB.Iss07 + IB.Iss08 + IB.Iss09 + IB.Iss10 + IB.Iss11 + IB.Iss12),
                                            DrugCtgy = DM.DrugCategory,
                                            DrugID = DM.ID,
                                        }).ToList();


            }

            return SuumarSearch;


        }





        public DrugStockSummaryDataView GetSelectedStockSummary(DateTime From, DateTime To, int CompanyID, int BRID, int storeid)
        {
            var Financial = WYNKContext.FinancialYear.ToList();
            var ItemBal = WYNKContext.ItemBalance.ToList();
            var DrugMaster = WYNKContext.DrugMaster.ToList();
            var DrugGroup = WYNKContext.DrugGroup.ToList();
            var Store = CMPSContext.Storemasters.ToList();
            var cmp = CMPSContext.Company.ToList();
            var ID = Financial.Where(x => x.FYTo >= To.Date && x.CMPID == CompanyID && x.IsActive == true).Select(x => x.ID).FirstOrDefault();

            var MF = From.Month;
            var MT = To.Month;
            var SuumarSearch = new DrugStockSummaryDataView();

            if (MT == 1)
            {

                SuumarSearch.Summary = new List<Summaryy>();
                SuumarSearch.Summary = (from FY in Financial.Where(x => x.FYTo >= To.Date && x.CMPID == CompanyID)
                                        join IB in ItemBal.Where(x => x.FYear == ID && x.StoreID == storeid) on FY.ID equals IB.FYear
                                        join DM in DrugMaster.Where(x =>x.ID == BRID) on IB.ItemID equals DM.ID
                                        join DG in DrugGroup on DM.GenericName equals DG.ID
                                        join ST in Store on IB.StoreID equals ST.StoreID


                                        join cm in cmp.Where(x => x.CmpID == CompanyID) on IB.CmpID equals cm.CmpID

                                        select new Summaryy
                                        {
                                            CmpName = cm.CompanyName + "-" + cm.Address1,
                                            Store = ST.Storename,
                                            Brand = DM.Brand,
                                            GenericName = DG.Description,
                                            DrugGroup = DM.DrugGroup,
                                            UOM = DM.UOM,
                                            OpeningBalance = IB.OpeningBalance,
                                            Receipt = IB.Rec01,
                                            Issue = IB.Iss01,
                                            ClosingBalance = IB.OpeningBalance + IB.Rec01 - IB.Iss01,
                                            DrugCtgy = DM.DrugCategory,
                                            DrugID = DM.ID,
                                        }).ToList();
            }

            else if (MT == 2)
            {

                SuumarSearch.Summary = new List<Summaryy>();
                SuumarSearch.Summary = (from FY in Financial.Where(x => x.FYTo >= To.Date && x.CMPID == CompanyID)
                                        join IB in ItemBal.Where(x => x.FYear == ID && x.StoreID == storeid) on FY.ID equals IB.FYear
                                        join DM in DrugMaster.Where(x => x.ID == BRID) on IB.ItemID equals DM.ID
                                        join DG in DrugGroup on DM.GenericName equals DG.ID
                                        join ST in Store on IB.StoreID equals ST.StoreID


                                        join cm in cmp.Where(x => x.CmpID == CompanyID) on IB.CmpID equals cm.CmpID

                                        select new Summaryy
                                        {
                                            CmpName = cm.CompanyName + "-" + cm.Address1,
                                            Store = ST.Storename,
                                            Brand = DM.Brand,
                                            GenericName = DG.Description,
                                            DrugGroup = DM.DrugGroup,
                                            UOM = DM.UOM,
                                            OpeningBalance = IB.OpeningBalance,
                                            Receipt = IB.Rec01 + IB.Rec02,
                                            Issue = IB.Iss01 + IB.Iss02,
                                            ClosingBalance = IB.OpeningBalance + IB.Rec01 + IB.Rec02 - (IB.Iss01 + IB.Iss02),
                                            DrugCtgy = DM.DrugCategory,
                                            DrugID = DM.ID,
                                        }).ToList();
            }

            else if (MT == 3)
            {

                SuumarSearch.Summary = new List<Summaryy>();
                SuumarSearch.Summary = (from FY in Financial.Where(x => x.FYTo >= To.Date && x.CMPID == CompanyID)
                                        join IB in ItemBal.Where(x => x.FYear == ID && x.StoreID == storeid) on FY.ID equals IB.FYear
                                        join DM in DrugMaster.Where(x => x.ID == BRID) on IB.ItemID equals DM.ID
                                        join DG in DrugGroup on DM.GenericName equals DG.ID
                                        join ST in Store on IB.StoreID equals ST.StoreID


                                        join cm in cmp.Where(x => x.CmpID == CompanyID) on IB.CmpID equals cm.CmpID

                                        select new Summaryy
                                        {
                                            CmpName = cm.CompanyName + "-" + cm.Address1,
                                            Store = ST.Storename,
                                            Brand = DM.Brand,
                                            GenericName = DG.Description,
                                            DrugGroup = DM.DrugGroup,
                                            UOM = DM.UOM,
                                            OpeningBalance = IB.OpeningBalance,
                                            Receipt = IB.Rec01 + IB.Rec02 + IB.Rec03,
                                            Issue = IB.Iss01 + IB.Iss02 + IB.Iss03,
                                            ClosingBalance = IB.OpeningBalance + IB.Rec01 + IB.Rec02 + IB.Rec03 - (IB.Iss01 + IB.Iss02 + IB.Iss03),
                                            DrugCtgy = DM.DrugCategory,
                                            DrugID = DM.ID,
                                        }).ToList();
            }
            else if (MT == 4)
            {

                SuumarSearch.Summary = new List<Summaryy>();
                SuumarSearch.Summary = (from FY in Financial.Where(x => x.FYTo >= To.Date && x.CMPID == CompanyID)
                                        join IB in ItemBal.Where(x => x.FYear == ID && x.StoreID == storeid) on FY.ID equals IB.FYear
                                        join DM in DrugMaster.Where(x => x.ID == BRID) on IB.ItemID equals DM.ID
                                        join DG in DrugGroup on DM.GenericName equals DG.ID
                                        join ST in Store on IB.StoreID equals ST.StoreID


                                        join cm in cmp.Where(x => x.CmpID == CompanyID) on IB.CmpID equals cm.CmpID

                                        select new Summaryy
                                        {
                                            CmpName = cm.CompanyName + "-" + cm.Address1,
                                            Store = ST.Storename,
                                            Brand = DM.Brand,
                                            GenericName = DG.Description,
                                            DrugGroup = DM.DrugGroup,
                                            UOM = DM.UOM,
                                            OpeningBalance = IB.OpeningBalance,
                                            Receipt = IB.Rec01 + IB.Rec02 + IB.Rec03 + IB.Rec04,
                                            Issue = IB.Iss01 + IB.Iss02 + IB.Iss03 + IB.Iss04,
                                            ClosingBalance = IB.OpeningBalance + IB.Rec01 + IB.Rec02 + IB.Rec03 + IB.Rec04 - (IB.Iss01 + IB.Iss02 + IB.Iss03 + IB.Iss04),
                                            DrugCtgy = DM.DrugCategory,
                                            DrugID = DM.ID,
                                        }).ToList();
            }

            else if (MT == 5)
            {

                SuumarSearch.Summary = new List<Summaryy>();
                SuumarSearch.Summary = (from FY in Financial.Where(x => x.FYTo >= To.Date && x.CMPID == CompanyID)
                                        join IB in ItemBal.Where(x => x.FYear == ID && x.StoreID == storeid) on FY.ID equals IB.FYear
                                        join DM in DrugMaster.Where(x => x.ID == BRID) on IB.ItemID equals DM.ID
                                        join DG in DrugGroup on DM.GenericName equals DG.ID
                                        join ST in Store on IB.StoreID equals ST.StoreID


                                        join cm in cmp.Where(x => x.CmpID == CompanyID) on IB.CmpID equals cm.CmpID

                                        select new Summaryy
                                        {
                                            CmpName = cm.CompanyName + "-" + cm.Address1,
                                            Store = ST.Storename,
                                            Brand = DM.Brand,
                                            GenericName = DG.Description,
                                            DrugGroup = DM.DrugGroup,
                                            UOM = DM.UOM,
                                            OpeningBalance = IB.OpeningBalance,
                                            Receipt = IB.Rec01 + IB.Rec02 + IB.Rec03 + IB.Rec04 + IB.Rec05,
                                            Issue = IB.Iss01 + IB.Iss02 + IB.Iss03 + IB.Iss04 + IB.Iss05,
                                            ClosingBalance = IB.OpeningBalance + IB.Rec01 + IB.Rec02 + IB.Rec03 + IB.Rec04 + IB.Rec05 -
                                            (IB.Iss01 + IB.Iss02 + IB.Iss03 + IB.Iss04 + IB.Iss05),
                                            DrugCtgy = DM.DrugCategory,
                                            DrugID = DM.ID,
                                        }).ToList();
            }

            else if (MT == 6)
            {

                SuumarSearch.Summary = new List<Summaryy>();
                SuumarSearch.Summary = (from FY in Financial.Where(x => x.FYTo >= To.Date && x.CMPID == CompanyID)
                                        join IB in ItemBal.Where(x => x.FYear == ID && x.StoreID == storeid) on FY.ID equals IB.FYear
                                        join DM in DrugMaster.Where(x => x.ID == BRID) on IB.ItemID equals DM.ID
                                        join DG in DrugGroup on DM.GenericName equals DG.ID
                                        join ST in Store on IB.StoreID equals ST.StoreID


                                        join cm in cmp.Where(x => x.CmpID == CompanyID) on IB.CmpID equals cm.CmpID

                                        select new Summaryy
                                        {
                                            CmpName = cm.CompanyName + "-" + cm.Address1,
                                            Store = ST.Storename,
                                            Brand = DM.Brand,
                                            GenericName = DG.Description,
                                            DrugGroup = DM.DrugGroup,
                                            UOM = DM.UOM,
                                            OpeningBalance = IB.OpeningBalance,
                                            Receipt = IB.Rec01 + IB.Rec02 + IB.Rec03 + IB.Rec04 + IB.Rec05 + IB.Rec06,
                                            Issue = IB.Iss01 + IB.Iss02 + IB.Iss03 + IB.Iss04 + IB.Iss05 + IB.Iss06,
                                            ClosingBalance = IB.OpeningBalance + IB.Rec01 + IB.Rec02 + IB.Rec03 + IB.Rec04 + IB.Rec05 + IB.Rec06 -
                                            (IB.Iss01 + IB.Iss02 + IB.Iss03 + IB.Iss04 + IB.Iss05 + IB.Iss06),
                                            DrugCtgy = DM.DrugCategory,
                                            DrugID = DM.ID,
                                        }).ToList();
            }

            else if (MT == 7)
            {

                SuumarSearch.Summary = new List<Summaryy>();
                SuumarSearch.Summary = (from FY in Financial.Where(x => x.FYTo >= To.Date && x.CMPID == CompanyID)
                                        join IB in ItemBal.Where(x => x.FYear == ID && x.StoreID == storeid) on FY.ID equals IB.FYear
                                        join DM in DrugMaster.Where(x => x.ID == BRID) on IB.ItemID equals DM.ID
                                        join DG in DrugGroup on DM.GenericName equals DG.ID
                                        join ST in Store on IB.StoreID equals ST.StoreID


                                        join cm in cmp.Where(x => x.CmpID == CompanyID) on IB.CmpID equals cm.CmpID

                                        select new Summaryy
                                        {
                                            CmpName = cm.CompanyName + "-" + cm.Address1,
                                            Store = ST.Storename,
                                            Brand = DM.Brand,
                                            GenericName = DG.Description,
                                            DrugGroup = DM.DrugGroup,
                                            UOM = DM.UOM,
                                            OpeningBalance = IB.OpeningBalance,
                                            Receipt = IB.Rec01 + IB.Rec02 + IB.Rec03 + IB.Rec04 + IB.Rec05 + IB.Rec06 + IB.Rec07,
                                            Issue = IB.Iss01 + IB.Iss02 + IB.Iss03 + IB.Iss04 + IB.Iss05 + IB.Iss06 + IB.Iss07,
                                            ClosingBalance = IB.OpeningBalance + IB.Rec01 + IB.Rec02 + IB.Rec03 + IB.Rec04 + IB.Rec05 + IB.Rec06 + IB.Rec07 -
                                            (IB.Iss01 + IB.Iss02 + IB.Iss03 + IB.Iss04 + IB.Iss05 + IB.Iss06 + IB.Iss07),
                                            DrugCtgy = DM.DrugCategory,
                                            DrugID = DM.ID,
                                        }).ToList();
            }

            else if (MT == 8)
            {

                SuumarSearch.Summary = new List<Summaryy>();
                SuumarSearch.Summary = (from FY in Financial.Where(x => x.FYTo >= To.Date && x.CMPID == CompanyID)
                                        join IB in ItemBal.Where(x => x.FYear == ID && x.StoreID == storeid) on FY.ID equals IB.FYear
                                        join DM in DrugMaster.Where(x => x.ID == BRID) on IB.ItemID equals DM.ID
                                        join DG in DrugGroup on DM.GenericName equals DG.ID
                                        join ST in Store on IB.StoreID equals ST.StoreID


                                        join cm in cmp.Where(x => x.CmpID == CompanyID) on IB.CmpID equals cm.CmpID

                                        select new Summaryy
                                        {
                                            CmpName = cm.CompanyName + "-" + cm.Address1,
                                            Store = ST.Storename,
                                            Brand = DM.Brand,
                                            GenericName = DG.Description,
                                            DrugGroup = DM.DrugGroup,
                                            UOM = DM.UOM,
                                            OpeningBalance = IB.OpeningBalance,
                                            Receipt = IB.Rec01 + IB.Rec02 + IB.Rec03 + IB.Rec04 + IB.Rec05 + IB.Rec06 + IB.Rec07 + IB.Rec08,
                                            Issue = IB.Iss01 + IB.Iss02 + IB.Iss03 + IB.Iss04 + IB.Iss05 + IB.Iss06 + IB.Iss07 + IB.Iss08,
                                            ClosingBalance = IB.OpeningBalance + IB.Rec01 + IB.Rec02 + IB.Rec03 + IB.Rec04 + IB.Rec05 + IB.Rec06 + IB.Rec07 + IB.Rec08 -
                                            (IB.Iss01 + IB.Iss02 + IB.Iss03 + IB.Iss04 + IB.Iss05 + IB.Iss06 + IB.Iss07 + IB.Iss08),
                                            DrugCtgy = DM.DrugCategory,
                                            DrugID = DM.ID,
                                        }).ToList();
            }

            else if (MT == 9)
            {

                SuumarSearch.Summary = new List<Summaryy>();
                SuumarSearch.Summary = (from FY in Financial.Where(x => x.FYTo >= To.Date && x.CMPID == CompanyID)
                                        join IB in ItemBal.Where(x => x.FYear == ID && x.StoreID == storeid) on FY.ID equals IB.FYear
                                        join DM in DrugMaster.Where(x => x.ID == BRID) on IB.ItemID equals DM.ID
                                        join DG in DrugGroup on DM.GenericName equals DG.ID
                                        join ST in Store on IB.StoreID equals ST.StoreID


                                        join cm in cmp.Where(x => x.CmpID == CompanyID) on IB.CmpID equals cm.CmpID

                                        select new Summaryy
                                        {
                                            CmpName = cm.CompanyName + "-" + cm.Address1,
                                            Store = ST.Storename,
                                            Brand = DM.Brand,
                                            GenericName = DG.Description,
                                            DrugGroup = DM.DrugGroup,
                                            UOM = DM.UOM,
                                            OpeningBalance = IB.OpeningBalance,
                                            Receipt = IB.Rec01 + IB.Rec02 + IB.Rec03 + IB.Rec04 + IB.Rec05 + IB.Rec06 + IB.Rec07 + IB.Rec08 + IB.Rec09,
                                            Issue = IB.Iss01 + IB.Iss02 + IB.Iss03 + IB.Iss04 + IB.Iss05 + IB.Iss06 + IB.Iss07 + IB.Iss08 + IB.Iss09,
                                            ClosingBalance = IB.OpeningBalance + IB.Rec01 + IB.Rec02 + IB.Rec03 + IB.Rec04 + IB.Rec05 + IB.Rec06 + IB.Rec07 + IB.Rec08 + IB.Rec09 -
                                            (IB.Iss01 + IB.Iss02 + IB.Iss03 + IB.Iss04 + IB.Iss05 + IB.Iss06 + IB.Iss07 + IB.Iss08 + IB.Iss09),
                                            DrugCtgy = DM.DrugCategory,
                                            DrugID = DM.ID,
                                        }).ToList();
            }
            else if (MT == 10)
            {

                SuumarSearch.Summary = new List<Summaryy>();
                SuumarSearch.Summary = (from FY in Financial.Where(x => x.FYTo >= To.Date && x.CMPID == CompanyID)
                                        join IB in ItemBal.Where(x => x.FYear == ID && x.StoreID == storeid) on FY.ID equals IB.FYear
                                        join DM in DrugMaster.Where(x => x.ID == BRID) on IB.ItemID equals DM.ID
                                        join DG in DrugGroup on DM.GenericName equals DG.ID
                                        join ST in Store on IB.StoreID equals ST.StoreID


                                        join cm in cmp.Where(x => x.CmpID == CompanyID) on IB.CmpID equals cm.CmpID

                                        select new Summaryy
                                        {
                                            CmpName = cm.CompanyName + "-" + cm.Address1,
                                            Store = ST.Storename,
                                            Brand = DM.Brand,
                                            GenericName = DG.Description,
                                            DrugGroup = DM.DrugGroup,
                                            UOM = DM.UOM,
                                            OpeningBalance = IB.OpeningBalance,
                                            Receipt = IB.Rec01 + IB.Rec02 + IB.Rec03 + IB.Rec04 + IB.Rec05 + IB.Rec06 + IB.Rec07 + IB.Rec08 + IB.Rec09 + IB.Rec10,
                                            Issue = IB.Iss01 + IB.Iss02 + IB.Iss03 + IB.Iss04 + IB.Iss05 + IB.Iss06 + IB.Iss07 + IB.Iss08 + IB.Iss09 + IB.Iss10,
                                            ClosingBalance = IB.OpeningBalance + IB.Rec01 + IB.Rec02 + IB.Rec03 + IB.Rec04 + IB.Rec05 + IB.Rec06 + IB.Rec07 + IB.Rec08 + IB.Rec09 + IB.Rec10 -
                                            (IB.Iss01 + IB.Iss02 + IB.Iss03 + IB.Iss04 + IB.Iss05 + IB.Iss06 + IB.Iss07 + IB.Iss08 + IB.Iss09 + IB.Iss10),
                                            DrugCtgy = DM.DrugCategory,
                                            DrugID = DM.ID,
                                        }).ToList();
            }


            else if (MT == 11)
            {

                SuumarSearch.Summary = new List<Summaryy>();
                SuumarSearch.Summary = (from FY in Financial.Where(x => x.FYTo >= To.Date && x.CMPID == CompanyID)
                                        join IB in ItemBal.Where(x => x.FYear == ID && x.StoreID == storeid) on FY.ID equals IB.FYear
                                        join DM in DrugMaster.Where(x => x.ID == BRID) on IB.ItemID equals DM.ID
                                        join DG in DrugGroup on DM.GenericName equals DG.ID
                                        join ST in Store on IB.StoreID equals ST.StoreID


                                        join cm in cmp.Where(x => x.CmpID == CompanyID) on IB.CmpID equals cm.CmpID

                                        select new Summaryy
                                        {
                                            CmpName = cm.CompanyName + "-" + cm.Address1,
                                            Store = ST.Storename,
                                            Brand = DM.Brand,
                                            GenericName = DG.Description,
                                            DrugGroup = DM.DrugGroup,
                                            UOM = DM.UOM,
                                            OpeningBalance = IB.OpeningBalance,
                                            Receipt = IB.Rec01 + IB.Rec02 + IB.Rec03 + IB.Rec04 + IB.Rec05 + IB.Rec06 + IB.Rec07 + IB.Rec08 + IB.Rec09 + IB.Rec10 + IB.Rec11,
                                            Issue = IB.Iss01 + IB.Iss02 + IB.Iss03 + IB.Iss04 + IB.Iss05 + IB.Iss06 + IB.Iss07 + IB.Iss08 + IB.Iss09 + IB.Iss10 + IB.Iss11,
                                            ClosingBalance = IB.OpeningBalance + IB.Rec01 + IB.Rec02 + IB.Rec03 + IB.Rec04 + IB.Rec05 + IB.Rec06 + IB.Rec07 + IB.Rec08 + IB.Rec09 + IB.Rec10 + IB.Rec11 -
                                            (IB.Iss01 + IB.Iss02 + IB.Iss03 + IB.Iss04 + IB.Iss05 + IB.Iss06 + IB.Iss07 + IB.Iss08 + IB.Iss09 + IB.Iss10 + IB.Iss11),
                                            DrugCtgy = DM.DrugCategory,
                                            DrugID = DM.ID,
                                        }).ToList();
            }
            else if (MT == 12)
            {

                SuumarSearch.Summary = new List<Summaryy>();
                SuumarSearch.Summary = (from FY in Financial.Where(x => x.FYTo >= To.Date && x.CMPID == CompanyID)
                                        join IB in ItemBal.Where(x => x.FYear == ID && x.StoreID == storeid) on FY.ID equals IB.FYear
                                        join DM in DrugMaster.Where(x => x.ID == BRID) on IB.ItemID equals DM.ID
                                        join DG in DrugGroup on DM.GenericName equals DG.ID
                                        join ST in Store on IB.StoreID equals ST.StoreID


                                        join cm in cmp.Where(x => x.CmpID == CompanyID) on IB.CmpID equals cm.CmpID

                                        select new Summaryy
                                        {
                                            CmpName = cm.CompanyName + "-" + cm.Address1,
                                            Store = ST.Storename,
                                            Brand = DM.Brand,
                                            GenericName = DG.Description,
                                            DrugGroup = DM.DrugGroup,
                                            UOM = DM.UOM,
                                            OpeningBalance = IB.OpeningBalance,
                                            Receipt = IB.Rec01 + IB.Rec02 + IB.Rec03 + IB.Rec04 + IB.Rec05 + IB.Rec06 + IB.Rec07 + IB.Rec08 + IB.Rec09 + IB.Rec10 + IB.Rec11 + IB.Rec12,
                                            Issue = IB.Iss01 + IB.Iss02 + IB.Iss03 + IB.Iss04 + IB.Iss05 + IB.Iss06 + IB.Iss07 + IB.Iss08 + IB.Iss09 + IB.Iss10 + IB.Iss11 + IB.Iss12,
                                            ClosingBalance = IB.OpeningBalance + IB.Rec01 + IB.Rec02 + IB.Rec03 + IB.Rec04 + IB.Rec05 + IB.Rec06 + IB.Rec07 + IB.Rec08 + IB.Rec09 + IB.Rec10 + IB.Rec11 + IB.Rec12 -
                                            (IB.Iss01 + IB.Iss02 + IB.Iss03 + IB.Iss04 + IB.Iss05 + IB.Iss06 + IB.Iss07 + IB.Iss08 + IB.Iss09 + IB.Iss10 + IB.Iss11 + IB.Iss12),
                                            DrugCtgy = DM.DrugCategory,
                                            DrugID = DM.ID,
                                        }).ToList();


            }

            return SuumarSearch;
        }

        public DrugStockSummaryDataView GetSerialDtls(DateTime From, DateTime To, int CompanyID, int storeid, int DrugID)
        {

            var SerialDtls = new DrugStockSummaryDataView();
            var Itemser = WYNKContext.ItemSerial.ToList();
            var Financial = WYNKContext.FinancialYear.ToList();
            var ItemBal = WYNKContext.ItemBalance.ToList();
            var DrugMaster = WYNKContext.DrugMaster.ToList();
            var DrugGroup = WYNKContext.DrugGroup.ToList();
            var transaction = CMPSContext.TransactionType.ToList();

            var fmonth = From.Month;
            var tmonth = To.Month;

            var ID = Financial.Where(x => x.FYTo >= To.Date && x.CMPID == CompanyID && x.IsActive == true).Select(x => x.ID).FirstOrDefault();

            SerialDtls.DrugSerial = (from IB in ItemBal.Where(x => x.CmpID == CompanyID)
                                     join SE in Itemser.Where(x => x.CreatedUTC.Date.Month >= fmonth && x.CreatedUTC.Date.Month <= tmonth && x.ItemID == DrugID && x.StoreID == storeid)
                                     on IB.ItemID equals SE.ItemID
                                     join DM in DrugMaster.Where(x => x.ID == DrugID) on SE.ItemID equals DM.ID
                                     join DG in DrugGroup on DM.GenericName equals DG.ID
                                     join TR in transaction on SE.TC equals TR.TransactionID

                                     select new DrugSerial
                                    {
                                         Brand = DM.Brand,
                                         GenericName = DG.Description,
                                         SerialNo = Convert.ToString(SE.SerialNo),
                                         ExpiryDt = SE.ExpiryDate,
                                         grnno = SE.GRNNo,
                                         grndt = SE.CreatedUTC.Date,
                                         trans = TR.Description,
                                     }).ToList();


            return SerialDtls;


        }

        public DrugStockSummaryDataView GetBatchDtls(DateTime From, DateTime To, int CompanyID, int storeid, int DrugID)
        {

            var BatchDtls = new DrugStockSummaryDataView();
            var ItemBat = WYNKContext.ItemBatch.ToList();
            var Financial = WYNKContext.FinancialYear.ToList();
            var ItemBal = WYNKContext.ItemBalance.ToList();
            var DrugMaster = WYNKContext.DrugMaster.ToList();
            var DrugGroup = WYNKContext.DrugGroup.ToList();
            var ItemBattran = WYNKContext.ItemBatchTrans.ToList();
            var stokmas = WYNKContext.StockMaster.ToList();
            var transaction = CMPSContext.TransactionType.ToList();

            var fmonth = From.Month;
            var tmonth = To.Month;

            var ID = Financial.Where(x => x.FYTo >= To.Date && x.CMPID == CompanyID && x.IsActive == true).Select(x => x.ID).FirstOrDefault();

            BatchDtls.DrugBatch = (from IB in ItemBal.Where(x => x.CmpID == CompanyID)
                                     join IBT in ItemBat.Where(x => x.CreatedUTC.Date.Month >= fmonth && x.CreatedUTC.Date.Month <= tmonth && x.ItemID == DrugID && x.StoreID == storeid)
                                     on IB.ItemID equals IBT.ItemID
                                     join DM in DrugMaster.Where(x => x.ID == DrugID) on IBT.ItemID equals DM.ID
                                     join DG in DrugGroup on DM.GenericName equals DG.ID

                                     join ITBT in ItemBattran on IBT.RandomUniqueID equals ITBT.ItemBatchID
                                     join SM in stokmas on ITBT.SMID equals SM.RandomUniqueID
                                     join TR in transaction on SM.TransactionID equals TR.TransactionID
                                     //join ITBTT in ItemBattran on IBT.ItemBatchQty equals ITBTT.ItemBatchTransactedQty
                                     select new DrugBatch
                                     {
                                         Brand = DM.Brand,
                                         GenericName = DG.Description,
                                         BatchNo = IBT.ItemBatchNumber,
                                         BatchQty = IBT.ItemBatchQty,
                                         ExpiryDt = IBT.ItemBatchExpiry,
                                         grnno = SM.DocumentNumber,
                                         grndt = SM.DocumentDate.Date,
                                         trans = TR.Description,

                                   }).ToList();


            return BatchDtls;


        }

        public DrugStockSummaryDataView GetISerialDtls(DateTime From, DateTime To, int CompanyID, int storeid, int DrugID)
        {

            var SerialDtls = new DrugStockSummaryDataView();
            var Itemser = WYNKContext.ItemSerial.ToList();
            var Financial = WYNKContext.FinancialYear.ToList();
            var ItemBal = WYNKContext.ItemBalance.ToList();
            var DrugMaster = WYNKContext.DrugMaster.ToList();
            var transaction = CMPSContext.TransactionType.ToList();
            var DrugGroup = WYNKContext.DrugGroup.ToList();

            var fmonth = From.Month;
            var tmonth = To.Month;

            var ID = Financial.Where(x => x.FYTo >= To.Date && x.CMPID == CompanyID && x.IsActive == true).Select(x => x.ID).FirstOrDefault();

            SerialDtls.DrugSerial = (from IB in ItemBal.Where(x => x.CmpID == CompanyID)
                                     join SE in Itemser.Where(x => x.CreatedUTC.Date.Month >= fmonth && x.CreatedUTC.Date.Month <= tmonth && x.ItemID == DrugID && x.StoreID == storeid && x.IssueNo != null)
                                     on IB.ItemID equals SE.ItemID
                                     join DM in DrugMaster.Where(x => x.ID == DrugID) on SE.ItemID equals DM.ID
                                     join DG in DrugGroup on DM.GenericName equals DG.ID
                                     join TR in transaction on SE.IssueTC equals TR.TransactionID

                                     select new DrugSerial
                                     {
                                         Brand = DM.Brand,
                                         GenericName = DG.Description,
                                         SerialNo = SE.SerialNo,
                                         ExpiryDt = SE.ExpiryDate,
                                         grnno = SE.IssueNo,
                                         grndt = SE.IssueDate,
                                         trans = TR.Description,
                                     }).ToList();


            return SerialDtls;


        }


        public DrugStockSummaryDataView GetIBatchDtls(DateTime From, DateTime To, int CompanyID, int storeid, int DrugID)
        {

            var BatchDtls = new DrugStockSummaryDataView();
            var ItemBat = WYNKContext.ItemBatch.ToList();
            var Financial = WYNKContext.FinancialYear.ToList();
            var ItemBal = WYNKContext.ItemBalance.ToList();
            var DrugMaster = WYNKContext.DrugMaster.ToList();
            var DrugGroup = WYNKContext.DrugGroup.ToList();
            var ItemBattran = WYNKContext.ItemBatchTrans.ToList();
            var stokmas = WYNKContext.StockMaster.ToList();
            var transaction = CMPSContext.TransactionType.ToList();
            var fmonth = From.Month;
            var tmonth = To.Month;

            var ID = Financial.Where(x => x.FYTo >= To.Date && x.CMPID == CompanyID && x.IsActive == true).Select(x => x.ID).FirstOrDefault();

            BatchDtls.DrugBatch = (from IB in ItemBal.Where(x => x.CmpID == CompanyID)
                                   join IBT in ItemBat.Where(x => x.CreatedUTC.Date.Month >= fmonth && x.CreatedUTC.Date.Month <= tmonth && x.ItemID == DrugID && x.StoreID == storeid)
                                   on IB.ItemID equals IBT.ItemID
                                   join DM in DrugMaster.Where(x => x.ID == DrugID) on IBT.ItemID equals DM.ID
                                   join DG in DrugGroup on DM.GenericName equals DG.ID
                                   
                                   join ITBT in ItemBattran.Where(x=>x.ReturnQty ==null) on IBT.RandomUniqueID equals ITBT.ItemBatchID
                                   join SM in stokmas on ITBT.SMID equals SM.RandomUniqueID
                                   join TR in transaction.Where(x=>x.Rec_Issue_type =="I") on SM.TransactionID equals TR.TransactionID
                                   select new DrugBatch
                                   {
                                       Brand = DM.Brand,
                                       GenericName = DG.Description,
                                       BatchNo = IBT.ItemBatchNumber,
                                       BatchQty = IBT.ItemBatchissueQty,
                                       ExpiryDt = IBT.ItemBatchExpiry,
                                       grnno = SM.DocumentNumber,
                                       grndt = SM.DocumentDate.Date,
                                       trans = TR.Description,

                                   }).ToList();

            //BatchDtls.DrugBatch = (from res in dbatch.GroupBy(x => x.ExpiryDt)
                                   
            //                       select new DrugBatch
            //                       {
            //                           Brand = res.Select(x=>x.Brand).FirstOrDefault(),
            //                           GenericName = res.Select(x => x.GenericName).FirstOrDefault(),
            //                           BatchNo = res.Select(x => x.BatchNo).FirstOrDefault(),
            //                           BatchQty = res.Select(x => x.BatchQty).FirstOrDefault(),
            //                           ExpiryDt = res.Select(x => x.ExpiryDt).FirstOrDefault(),
            //                           grnno = res.Select(x => x.grnno).FirstOrDefault(),
            //                           grndt = res.Select(x => x.grndt).FirstOrDefault(),
            //                           trans = res.Select(x => x.trans).FirstOrDefault(),

            //                       }).ToList();


            return BatchDtls;


        }


        public DrugStockSummaryDataView GetCSerialDtls(DateTime From, DateTime To, int CompanyID, int storeid, int DrugID)
        {

            var SerialDtls = new DrugStockSummaryDataView();
            var Itemser = WYNKContext.ItemSerial.ToList();
            var Financial = WYNKContext.FinancialYear.ToList();
            var ItemBal = WYNKContext.ItemBalance.ToList();
            var DrugMaster = WYNKContext.DrugMaster.ToList();
            var DrugGroup = WYNKContext.DrugGroup.ToList();
            var transaction = CMPSContext.TransactionType.ToList();

            var fmonth = From.Month;
            var tmonth = To.Month;

            var ID = Financial.Where(x => x.FYTo >= To.Date && x.CMPID == CompanyID && x.IsActive == true).Select(x => x.ID).FirstOrDefault();

            SerialDtls.DrugSerial = (from IB in ItemBal.Where(x => x.CmpID == CompanyID)
                                     join SE in Itemser.Where(x => x.CreatedUTC.Date.Month >= fmonth && x.CreatedUTC.Date.Month <= tmonth && x.ItemID == DrugID && x.StoreID == storeid && x.IssueNo == null)
                                     on IB.ItemID equals SE.ItemID
                                     join DM in DrugMaster.Where(x => x.ID == DrugID) on SE.ItemID equals DM.ID
                                     join DG in DrugGroup on DM.GenericName equals DG.ID
                                     join TR in transaction on SE.TC equals TR.TransactionID

                                     select new DrugSerial
                                     {
                                         Brand = DM.Brand,
                                         GenericName = DG.Description,
                                         SerialNo = SE.SerialNo,
                                         ExpiryDt = SE.ExpiryDate,
                                         grnno = SE.GRNNo,
                                         grndt = SE.CreatedUTC.Date,
                                         trans = TR.Description,
                                     }).ToList();


            return SerialDtls;


        }


        public DrugStockSummaryDataView GetCBatchDtls(DateTime From, DateTime To, int CompanyID, int storeid, int DrugID)
        {

            var BatchDtls = new DrugStockSummaryDataView();
            var ItemBat = WYNKContext.ItemBatch.ToList();
            var Financial = WYNKContext.FinancialYear.ToList();
            var ItemBal = WYNKContext.ItemBalance.ToList();
            var DrugMaster = WYNKContext.DrugMaster.ToList();
            var DrugGroup = WYNKContext.DrugGroup.ToList();
            var ItemBattran = WYNKContext.ItemBatchTrans.ToList();
            var stokmas = WYNKContext.StockMaster.ToList();
            var transaction = CMPSContext.TransactionType.ToList();

            var fmonth = From.Month;
            var tmonth = To.Month;

            var ID = Financial.Where(x => x.FYTo >= To.Date && x.CMPID == CompanyID && x.IsActive == true).Select(x => x.ID).FirstOrDefault();

            BatchDtls.DrugBatch = (from IB in ItemBal.Where(x => x.CmpID == CompanyID)
                                   join IBT in ItemBat.Where(x => x.CreatedUTC.Date.Month >= fmonth && x.CreatedUTC.Date.Month <= tmonth && x.ItemID == DrugID && x.StoreID == storeid)
                                   on IB.ItemID equals IBT.ItemID
                                   join DM in DrugMaster.Where(x => x.ID == DrugID) on IBT.ItemID equals DM.ID
                                   join DG in DrugGroup on DM.GenericName equals DG.ID

                                   join ITBT in ItemBattran on IBT.RandomUniqueID equals ITBT.ItemBatchID
                                   join SM in stokmas on ITBT.SMID equals SM.RandomUniqueID
                                   join TR in transaction on SM.TransactionID equals TR.TransactionID

                                   select new DrugBatch
                                   {
                                       Brand = DM.Brand,
                                       GenericName = DG.Description,
                                       BatchNo = IBT.ItemBatchNumber,
                                       BatchQty = IBT.ItemBatchBalnceQty,
                                       ExpiryDt = IBT.ItemBatchExpiry,
                                       grnno = SM.DocumentNumber,
                                       grndt = SM.DocumentDate.Date,
                                       trans = TR.Description,

                                   }).ToList();


            return BatchDtls;


        }

        //////////////////////////ledger//////////////////////////////////////////////////////////


        public DrugStockSummaryDataView Getdrgstockledger(DateTime From, DateTime To, int CompanyID, int drugid, int storeid)


        {
            var Financial = WYNKContext.FinancialYear.ToList();
            var dbal = WYNKContext.ItemBalance.ToList();           
            var drugmas = WYNKContext.DrugMaster.ToList();
            //var drugmas = WYNKContext.DrugMaster.ToList();
            var UOM = CMPSContext.uommaster.ToList();
            var Store = CMPSContext.Storemasters.ToList();
            var stokmas = WYNKContext.StockMaster.ToList();
            var stoktran = WYNKContext.StockTran.ToList();
            var transaction = CMPSContext.TransactionType.ToList();
            var cmp = CMPSContext.Company.ToList();

            var ID = Financial.Where(x => x.FYTo >= To.Date && x.CMPID == CompanyID && x.IsActive == true).Select(x => x.ID).FirstOrDefault();

            var MF = From.Month;
            var MT = To.Month;
            var SuumarSearch = new DrugStockSummaryDataView();

            
            SuumarSearch.Ledgers = new List<Ledgers>();

            var fyid = Financial.Where(x => x.FYTo >= To.Date && x.CMPID == CompanyID && x.IsActive == true).Select(x => x.ID).FirstOrDefault();


            var recepts = (from FY in Financial.Where(x => x.FYTo >= To.Date && x.CMPID == CompanyID)
                            join OB in dbal.Where(x => x.FYear == ID && x.StoreID == storeid && x.ItemID == drugid) on FY.ID equals OB.FYear
                            join DG in drugmas on OB.ItemID equals DG.ID
                            join ST in Store.Where(x => x.CmpID == CompanyID) on OB.StoreID equals ST.StoreID
                            join STR in stoktran on OB.ItemID equals STR.ItemID
                            join SM in stokmas.Where(x => x.CreatedUTC.Date.Month >= MF && x.CreatedUTC.Date.Month <= MT && x.TransactionType == "R" && x.CMPID == CompanyID && x.StoreID == storeid) on STR.SMID equals SM.RandomUniqueID
                            join TR in transaction on SM.TransactionID equals TR.TransactionID
                            join cm in cmp.Where(x => x.CmpID == CompanyID) on OB.CmpID equals cm.CmpID


                            select new
                            {
                                CmpName = cm.CompanyName + "-" + cm.Address1,
                                DocumentNo = SM.DocumentNumber,
                                DocumentDate = SM.DocumentDate,
                                DocumentType = TR.Description,
                                Store = ST.Storename,
                                Brand = DG.Brand,
                                UOM = DG.UOM,
                                Receipt = STR.ItemQty,
                                Issue = 0.0M,


                            }).ToList();

            var issues = (from FY in Financial.Where(x => x.FYTo >= To.Date && x.CMPID == CompanyID)
                           join OB in dbal.Where(x => x.FYear == ID && x.StoreID == storeid && x.ItemID == drugid) on FY.ID equals OB.FYear
                           join DG in drugmas on OB.ItemID equals DG.ID
                           join ST in Store.Where(x => x.CmpID == CompanyID) on OB.StoreID equals ST.StoreID
                           join STR in stoktran on OB.ItemID equals STR.ItemID
                           join SM in stokmas.Where(x => x.CreatedUTC.Date.Month >= MF && x.CreatedUTC.Date.Month <= MT && x.TransactionType == "I" && x.CMPID == CompanyID && x.StoreID == storeid) on STR.SMID equals SM.RandomUniqueID
                           join TR in transaction on SM.TransactionID equals TR.TransactionID
                           join cm in cmp.Where(x => x.CmpID == CompanyID) on OB.CmpID equals cm.CmpID

                           select new
                           {
                               CmpName = cm.CompanyName + "-" + cm.Address1,
                               DocumentNo = SM.DocumentNumber,
                               DocumentDate = SM.DocumentDate,
                               DocumentType = TR.Description,
                               Store = ST.Storename,
                               Brand = DG.Brand,
                               UOM = DG.UOM,
                               Receipt = 0.0M,
                               Issue = STR.ItemQty,

                           }).ToList();


            var reciss = recepts.Concat(issues);

            SuumarSearch.Ledgers = (from res in reciss


                                   select new Ledgers
                                   {
                                       CmpName = res.CmpName,
                                       DocumentNo = res.DocumentNo,
                                       DocumentDate = res.DocumentDate,
                                       DocumentType = res.DocumentType,
                                       Store = res.Store,
                                       Brand = res.Brand,
                                       UOM = res.UOM,
                                       Receipt = res.Receipt,
                                       Issue = res.Issue,


                                   }).ToList();


            if (MT == 1)
            {

                SuumarSearch.openstock = dbal.Where(x => x.FYear == fyid && x.ItemID == drugid).Select(x => x.OpeningBalance).FirstOrDefault();
                SuumarSearch.closestock = dbal.Where(OB => OB.FYear == fyid && OB.ItemID == drugid).Select(OB => OB.OpeningBalance + OB.Rec01 - OB.Iss01).FirstOrDefault();

            }

            else if (MT == 2)
            {

                SuumarSearch.openstock = dbal.Where(x => x.FYear == fyid && x.ItemID == drugid).Select(x => x.OpeningBalance).FirstOrDefault();
                SuumarSearch.closestock = dbal.Where(OB => OB.FYear == fyid && OB.ItemID == drugid).Select(OB => OB.OpeningBalance + OB.Rec01 + OB.Rec02 - (OB.Iss01 + OB.Iss02)).FirstOrDefault();

            }

            else if (MT == 3)
            {

                SuumarSearch.openstock = dbal.Where(x => x.FYear == fyid && x.ItemID == drugid).Select(x => x.OpeningBalance).FirstOrDefault();
                SuumarSearch.closestock = dbal.Where(OB => OB.FYear == fyid && OB.ItemID == drugid).Select(OB => OB.OpeningBalance + OB.Rec01 + OB.Rec02 + OB.Rec03 - (OB.Iss01 + OB.Iss02 + OB.Iss03)).FirstOrDefault();

            }

            else if (MT == 4)
            {

                SuumarSearch.openstock =  dbal.Where(x => x.FYear == fyid && x.ItemID == drugid).Select(x => x.OpeningBalance).FirstOrDefault();
                SuumarSearch.closestock =  dbal.Where(OB => OB.FYear == fyid && OB.ItemID == drugid).Select(OB => OB.OpeningBalance + OB.Rec01 + OB.Rec02 + OB.Rec03 + OB.Rec04 -
                (OB.Iss01 + OB.Iss02 + OB.Iss03 + OB.Iss04)).FirstOrDefault();

            }

            else if (MT == 5)
            {

                SuumarSearch.openstock =  dbal.Where(x => x.FYear == fyid && x.ItemID == drugid).Select(x => x.OpeningBalance).FirstOrDefault();
                SuumarSearch.closestock =  dbal.Where(OB => OB.FYear == fyid && OB.ItemID == drugid).Select(OB => OB.OpeningBalance + OB.Rec01 + OB.Rec02 + OB.Rec03 + OB.Rec04 + OB.Rec05 -
                (OB.Iss01 + OB.Iss02 + OB.Iss03 + OB.Iss04 + OB.Iss05)).FirstOrDefault();

            }

            else if (MT == 6)
            {

                SuumarSearch.openstock = dbal.Where(x => x.FYear == fyid && x.ItemID == drugid).Select(x => x.OpeningBalance).FirstOrDefault();
                SuumarSearch.closestock = dbal.Where(OB => OB.FYear == fyid && OB.ItemID == drugid).Select(OB => OB.OpeningBalance + OB.Rec01 + OB.Rec02 + OB.Rec03 + OB.Rec04 + OB.Rec05 + OB.Rec06 -
                                           (OB.Iss01 + OB.Iss02 + OB.Iss03 + OB.Iss04 + OB.Iss05 + OB.Iss06)).FirstOrDefault();

            }

            else if (MT == 7)
            {

                SuumarSearch.openstock = dbal.Where(x => x.FYear == fyid && x.ItemID == drugid).Select(x => x.OpeningBalance).FirstOrDefault();
                SuumarSearch.closestock = dbal.Where(OB => OB.FYear == fyid && OB.ItemID == drugid).Select(OB => OB.OpeningBalance + OB.Rec01 + OB.Rec02 + OB.Rec03 + OB.Rec04 + OB.Rec05 + OB.Rec06 + OB.Rec07 -
                                           (OB.Iss01 + OB.Iss02 + OB.Iss03 + OB.Iss04 + OB.Iss05 + OB.Iss06 + OB.Iss07)).FirstOrDefault();

            }

            else if (MT == 8)
            {

                SuumarSearch.openstock = dbal.Where(x => x.FYear == fyid && x.ItemID == drugid).Select(x => x.OpeningBalance).FirstOrDefault();
                SuumarSearch.closestock = dbal.Where(OB => OB.FYear == fyid && OB.ItemID == drugid).Select(OB => OB.OpeningBalance + OB.Rec01 + OB.Rec02 + OB.Rec03 + OB.Rec04 + OB.Rec05 + OB.Rec06 + OB.Rec07 + OB.Rec08 -
                                           (OB.Iss01 + OB.Iss02 + OB.Iss03 + OB.Iss04 + OB.Iss05 + OB.Iss06 + OB.Iss07 + OB.Iss08)).FirstOrDefault();

            }

            else if (MT == 9)
            {

                SuumarSearch.openstock = dbal.Where(x => x.FYear == fyid && x.ItemID == drugid).Select(x => x.OpeningBalance).FirstOrDefault();
                SuumarSearch.closestock = dbal.Where(OB => OB.FYear == fyid && OB.ItemID == drugid).Select(OB => OB.OpeningBalance + OB.Rec01 + OB.Rec02 + OB.Rec03 + OB.Rec04 + OB.Rec05 + OB.Rec06 + OB.Rec07 + OB.Rec08 + OB.Rec09 -
                                           (OB.Iss01 + OB.Iss02 + OB.Iss03 + OB.Iss04 + OB.Iss05 + OB.Iss06 + OB.Iss07 + OB.Iss08 + OB.Iss09)).FirstOrDefault();

            }

            else if (MT == 10)
            {

                SuumarSearch.openstock = dbal.Where(x => x.FYear == fyid && x.ItemID == drugid).Select(x => x.OpeningBalance).FirstOrDefault();
                SuumarSearch.closestock = dbal.Where(OB => OB.FYear == fyid && OB.ItemID == drugid).Select(OB => OB.OpeningBalance + OB.Rec01 + OB.Rec02 + OB.Rec03 + OB.Rec04 + OB.Rec05 + OB.Rec06 + OB.Rec07 + OB.Rec08 + OB.Rec09 + OB.Rec10 -
                                           (OB.Iss01 + OB.Iss02 + OB.Iss03 + OB.Iss04 + OB.Iss05 + OB.Iss06 + OB.Iss07 + OB.Iss08 + OB.Iss09 + OB.Iss10)).FirstOrDefault();

            }

            else if (MT == 11)
            {

                SuumarSearch.openstock = dbal.Where(x => x.FYear == fyid && x.ItemID == drugid).Select(x => x.OpeningBalance).FirstOrDefault();
                SuumarSearch.closestock = dbal.Where(OB => OB.FYear == fyid && OB.ItemID == drugid).Select(OB => OB.OpeningBalance + OB.Rec01 + OB.Rec02 + OB.Rec03 + OB.Rec04 + OB.Rec05 + OB.Rec06 + OB.Rec07 + OB.Rec08 + OB.Rec09 + OB.Rec10 + OB.Rec11 -
                                           (OB.Iss01 + OB.Iss02 + OB.Iss03 + OB.Iss04 + OB.Iss05 + OB.Iss06 + OB.Iss07 + OB.Iss08 + OB.Iss09 + OB.Iss10 + OB.Iss11)).FirstOrDefault();

            }

            else if (MT == 12)
            {

                SuumarSearch.openstock = dbal.Where(x => x.FYear == fyid && x.ItemID == drugid).Select(x => x.OpeningBalance).FirstOrDefault();
                SuumarSearch.closestock = dbal.Where(OB => OB.FYear == fyid && OB.ItemID == drugid).Select(OB => OB.OpeningBalance + OB.Rec01 + OB.Rec02 + OB.Rec03 + OB.Rec04 + OB.Rec05 + OB.Rec06 + OB.Rec07 + OB.Rec08 + OB.Rec09 + OB.Rec10 + OB.Rec11 + OB.Rec12 -
                                           (OB.Iss01 + OB.Iss02 + OB.Iss03 + OB.Iss04 + OB.Iss05 + OB.Iss06 + OB.Iss07 + OB.Iss08 + OB.Iss09 + OB.Iss10 + OB.Iss11 + OB.Iss12)).FirstOrDefault();

            }




            return SuumarSearch;
        }





    }
}
