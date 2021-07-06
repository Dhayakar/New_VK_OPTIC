using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using WYNK.Data.Model;
using WYNK.Data.Model.ViewModel;

namespace WYNK.Data.Repository.Implementation
{
    class PurchaseOrderDetRepository : RepositoryBase<PurchaseOrdDetView>, IPurchaseorderDetRepository
    {
        private readonly WYNKContext _Wynkcontext;
        private readonly CMPSContext _Cmpscontext;
        

        public PurchaseOrderDetRepository(WYNKContext context, CMPSContext Cmpscontext) : base(context, Cmpscontext)
        {
            _Wynkcontext = context;
            _Cmpscontext = Cmpscontext;

        }

        public dynamic getPODet(DateTime FromDate, DateTime Todate)
        {
            var getPoDet = new PurchaseOrdDetView();

            var M_Drug = WYNKContext.DrugMaster.ToList();
            var M_PO = WYNKContext.PurchaseOrder.ToList();
            var M_Vendor = CMPSContext.VendorMaster.ToList();
            var M_POT = WYNKContext.PurchaseOrderTrans.Where(x => x.ItemQty != x.PORecdQty).ToList();
            // var M_POT1 = WYNKContext.PurchaseOrderTrans.ToList();



            var Fdate = Convert.ToDateTime(FromDate).ToString("yyyy-MM-dd");
            var Tdate = Convert.ToDateTime(Todate).ToString("yyyy-MM-dd");

            //&& x.POStatus == "Open"
            //getPoDet.getPODet = (from PO in M_PO.Where(x => Convert.ToDateTime(x.CreatedUTC).Date >= Convert.ToDateTime(Fdate) && Convert.ToDateTime(x.CreatedUTC).Date <= Convert.ToDateTime(Tdate)
            //                    && x.POStatus == "Open" && x.IsCancelled == false && x.IsDeleted == false
            //                     )
            //                     join POT in M_POT
            //                      on PO.POID equals POT.POID
            //                     join Drug in M_Drug
            //                     on POT.ItemID equals Drug.ID
            //                     join Vndr in M_Vendor
            //                     on PO.VendorID equals Vndr.ID

            //                     select new getPODet
            //                     { //Select(x=> x.PONumber).FirstOrDefault()
            //                       //Po_No = M_PO.Where(x=>x.POID == POT.POID).Select(x=> x.PONumber).FirstOrDefault(),
            //                         Po_No = PO.PONumber,
            //                         Po_Date = PO.PODate,
            //                         drugName = Drug.Brand,
            //                         drugQuantity = POT.ItemQty,
            //                         drugRcvdQuantity = POT.PORecdQty,
            //                         UOM = Drug.UOM,
            //                         itemRate = POT.ItemRate,
            //                         itemValue = POT.ItemValue,
            //                         discountPercentage = POT.DiscountPercentage,
            //                         discountAmount = POT.DiscountAmount,
            //                         GSTPercentage = POT.GSTPercentage,
            //                         GSTAmount = POT.GSTTaxValue,
            //                         VendorName = Vndr.Name,
            //                         Quatation_No = PO.QuotationNumber

            //                     }).ToList();

            //getPoDet.getP_Det = (from res in getPoDet.getPODet.GroupBy(x => x.Po_No)

            //                     select new getP_Det
            //                     {
            //                         P_Po_No = res.Key,
            //                         P_Po_Date = res.Select(x => x.Po_Date).FirstOrDefault(),
            //                         V_Name = res.Select(x => x.VendorName).FirstOrDefault(),
            //                         // Q_No = res.Select(x=> x.Quatation_No).FirstOrDefault()

            //                     }


            //                     ).ToList();













            return getPoDet;
        }






        public dynamic getP_D_Det(string P_Po_No, DateTime P_Po_Date)
        {
            var getP_Det = new PurchaseOrdDetView();

            var M_Drug1 = WYNKContext.DrugMaster.ToList();
            var M_PO1 = WYNKContext.PurchaseOrder.ToList();

            var M_POT1 = WYNKContext.PurchaseOrderTrans.Where(x => x.ItemQty != x.PORecdQty).ToList();

            //getP_Det.getPODet1 = (from PO in M_PO1.Where(u => u.PONumber == P_Po_No && u.PODate == P_Po_Date)
            //                      join POT in M_POT1
            //                      on PO.POID equals POT.POID
            //                      join Drg in M_Drug1
            //                      on POT.ItemID equals Drg.ID


            //                      select new getPODet1
            //                      {
            //                          Po_No1 = PO.PONumber,
            //                          Po_Date1 = PO.PODate,
            //                          drugName1 = Drg.Brand,
            //                          drugQuantity1 = POT.ItemQty,
            //                          drugRcvdQuantity1 = POT.PORecdQty,
            //                          PendingQuantity1 = POT.ItemQty - POT.PORecdQty,
            //                          UOM1 = Drg.UOM,
            //                          itemRate1 = POT.ItemRate,
            //                          //itemValue1 = POT.ItemValue,
            //                          discountPercentage1 = POT.DiscountPercentage,
            //                          //discountAmount1 = POT.DiscountAmount,
            //                          GSTPercentage1 = POT.GSTPercentage,
            //                          GSTAmount1 = POT.GSTTaxValue,

            //                          ItemValue2 = (POT.ItemQty - POT.PORecdQty) * POT.ItemRate,

            //                          discountAmount2 = (((POT.ItemQty - POT.PORecdQty) * POT.ItemRate) * POT.DiscountPercentage / 100),

            //                          GSTAmount2 = (((POT.ItemQty - POT.PORecdQty) * POT.ItemRate) * POT.GSTPercentage / 100)

            //                      }).ToList();


            return getP_Det;
        }

    }
}
