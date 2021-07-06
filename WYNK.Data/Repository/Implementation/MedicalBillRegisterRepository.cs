using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using WYNK.Data.Model;
using WYNK.Data.Model.ViewModel;


namespace WYNK.Data.Repository.Implementation
{
    class MedicalBillRegisterRepository : RepositoryBase<BillingPharmacy>, IMedicalBillRegisterRepository
    {

        private readonly WYNKContext _Wynkcontext;
        private readonly CMPSContext _Cmpscontext;
        

        public MedicalBillRegisterRepository(WYNKContext context, CMPSContext Cmpscontext) : base(context, Cmpscontext)
        {
            _Wynkcontext = context;
            _Cmpscontext = Cmpscontext;

        }

        public dynamic getMedBillDet(DateTime FromDate, DateTime Todate, int CompanyID)
        {
            try
            {
                var getMedBillReg = new MedicalBillRegisterDetails();

                var regs = WYNKContext.Registration.ToList();
                var drug = WYNKContext.DrugMaster.ToList();
                var mbill = WYNKContext.MedicalBillMaster.ToList();
                var mtran = WYNKContext.MedicalBillTran.ToList();
                var Tax = CMPSContext.TaxMaster.ToList();

                var fdate = Convert.ToDateTime(FromDate).ToString("yyyy-MM-dd");
                var tdate = Convert.ToDateTime(Todate).ToString("yyyy-MM-dd");

                getMedBillReg.getRegisterDetail = (from REG in regs
                                                   join MB in mbill
                                                   .Where(x => Convert.ToDateTime(x.CreatedUTC).Date >= Convert.ToDateTime(fdate) && Convert.ToDateTime(x.CreatedUTC).Date <= Convert.ToDateTime(tdate) && x.CMPID == CompanyID)
                                                   on REG.UIN equals MB.UIN
                                                   join MedTan in mtran on MB.ID equals MedTan.MedicalBillID
                                                   orderby MB.CreatedUTC

                                                   select new getRegDet
                                                   {
                                                       BillNo = MB.BillNo,
                                                       BillDate = MB.CreatedUTC.ToString("dd-MM-yyyy"),
                                                       PatientName = REG.Name,
                                                       Drug = drug.Where(x => x.ID == MedTan.DrugID).Select(x => x.Brand).FirstOrDefault(),
                                                       UOM = drug.Where(x => x.ID == MedTan.DrugID).Select(x => x.UOM).FirstOrDefault(),
                                                       Quantity = Convert.ToDecimal(MedTan.Quantity),
                                                       Amount = Convert.ToDecimal(MedTan.ItemValue),
                                                       DiscountPerc = Convert.ToDecimal(MedTan.DiscountPercentage),
                                                       DiscountAmount = Convert.ToDecimal(MedTan.DiscountAmount),
                                                       TaxDescription = Tax.Where(t => t.ID == drug.Where(x => x.ID == MedTan.DrugID).Select(x => x.TaxID).FirstOrDefault()).Select(t => t.TaxDescription).FirstOrDefault(),
                                                       CessDescription = Tax.Where(t => t.ID == drug.Where(x => x.ID == MedTan.DrugID).Select(x => x.TaxID).FirstOrDefault()).Select(t => t.CESSDescription).FirstOrDefault(),
                                                       AddCessDescription = Tax.Where(t => t.ID == drug.Where(x => x.ID == MedTan.DrugID).Select(x => x.TaxID).FirstOrDefault()).Select(t => t.AdditionalCESSDescription).FirstOrDefault(),
                                                       TaxPerc = MedTan.GSTPercentage,
                                                       CessPerc = MedTan.CESSPercentage,
                                                       AddCessPerc = MedTan.AdditionalCESSPercentage,
                                                       TaxValue = MedTan.GSTTaxValue,
                                                       CessValue = MedTan.CESSValue,
                                                       AddCessValue = MedTan.AdditionalCESSValue,
                                                       GrossAmount = Convert.ToDecimal(MedTan.ItemValue) - (MedTan.DiscountAmount!= null ? Convert.ToDecimal(MedTan.DiscountAmount) : 0),
                                                       NetAmount= MB.TotalBillValue,
                                                   }).ToList();


                          var MedTaxSummary =    (from opim in mbill.Where(x => Convert.ToDateTime(x.CreatedUTC).Date >= Convert.ToDateTime(fdate)
                                                  && Convert.ToDateTime(x.CreatedUTC).Date <= Convert.ToDateTime(tdate) && x.CMPID == CompanyID)
                                                  join opT in mtran on opim.ID equals opT.MedicalBillID
                                                  group opT by opT.TaxID into g

                                                       select new 
                                                       {
                                                           TaxID = g.Key,
                                                           TaxDescription = Tax.Where(x => x.ID == g.Select(s => s.TaxID).FirstOrDefault()).Select(x => x.TaxDescription).FirstOrDefault(),
                                                           TotalProductValue = g.Select(x => (x.ItemValue + x.GSTTaxValue + x.CESSValue + x.AdditionalCESSValue) - (x.DiscountAmount)).Sum(),
                                                           GSTTaxValue = g.Select(x => x.GSTTaxValue).Sum(),
                                                           CESSAmount = g.Select(x => x.CESSValue).Sum(),
                                                           AddCESSAmount = g.Select(x => x.AdditionalCESSValue).Sum(),
                                                           TaxPayable = g.Select(x => x.GSTTaxValue + x.CESSValue + x.AdditionalCESSValue).Sum(),
                                                           TaxableTurnover = g.Select(x => (x.ItemValue) - (x.DiscountAmount)).Sum(),
                                                       }).ToList();



                return new { Success = true, RegisterDetail = getMedBillReg.getRegisterDetail , MedTaxSummary = MedTaxSummary }; 
            }
            catch (Exception ex)
            {

                return new { Success = false, Message = "Something Went Wrong" };
            }
        }







    }

















}
