using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using WYNK.Data.Model;
using WYNK.Data.Model.ViewModel;
namespace WYNK.Data.Repository.Implementation
{
    class CancelPORegRepostiory : RepositoryBase<CancelPORegViewModel>, ICancePORegRepository
    {


        private readonly WYNKContext _Wynkcontext;
        private readonly CMPSContext _Cmpscontext;
        

        public CancelPORegRepostiory(WYNKContext context, CMPSContext Cmpscontext) : base(context, Cmpscontext)
        {
            _Wynkcontext = context;
            _Cmpscontext = Cmpscontext;

        }
        public dynamic getC_PO_Reg(DateTime FromDate, DateTime Todate, int TID, int CompanyID)
        {
            var getC_PoDetReg = new CancelPORegViewModel();


            var M_Drug = WYNKContext.DrugMaster.ToList();
            var M_PO = WYNKContext.PurchaseOrder.ToList();
            var M_Vendor = CMPSContext.VendorMaster.ToList();
            var M_POT = WYNKContext.PurchaseOrderTrans.ToList();
            var M_OLM = CMPSContext.OneLineMaster.ToList();

            var Fdate = Convert.ToDateTime(FromDate).ToString("yyyy-MM-dd");
            var Tdate = Convert.ToDateTime(Todate).ToString("yyyy-MM-dd");

            //getC_PoDetReg.getC_PO_Reg = (from PO in M_PO.Where(x => Convert.ToDateTime(x.CreatedUTC).Date >= Convert.ToDateTime(Fdate) && Convert.ToDateTime(x.CreatedUTC).Date <= Convert.ToDateTime(Tdate)
            //                             && x.TransactionID == TID && x.IsCancelled == true && x.CMPID == CompanyID)

            //                             join POT in M_POT
            //                             on PO.POID equals POT.POID
            //                             join drug in M_Drug
            //                             on POT.ItemID equals drug.ID
            //                             join Mvendor in M_Vendor
            //                             on PO.VendorID equals Mvendor.ID
            //                             join OLM in M_OLM
            //                             on PO.DeliveryLocationID equals OLM.OLMID

            //                             select new getC_PO_Reg
            //                             {
            //                                 PoNo = PO.PONumber,
            //                                 PoDate = PO.PODate,
            //                                 //Q_No = PO.QuotationNumber,
            //                                 // Q_Date = PO.QuotationDate,
            //                                 Parent_No = POT.ParentPONumber,
            //                                 Parent_Date = POT.ParentPODate,
            //                                 VendorName = Mvendor.Name,
            //                                 Dlvry_Name = PO.DeliveryName,
            //                                 Dlvry_Addrss = PO.DeliveryAddress1,
            //                                 Location = OLM.ParentDescription,
            //                                 Gross_Prod_val = PO.GrossProductValue,
            //                                 Tot_Dis_val = PO.TotalDiscountValue,
            //                                 Tot_Tax_val = PO.TotalTaxValue,
            //                                 // Tot_CGSTTax_val =PO.TotalCGSTTaxValue,
            //                                 // Tot_SGSTTax_val =PO.TotalSGSTTaxValue,
            //                                 Tot_Po_val = PO.TotalPOValue,
            //                                 PO_status = PO.POStatus,

            //                             }).ToList();






            return getC_PoDetReg;
        }



    }
}
