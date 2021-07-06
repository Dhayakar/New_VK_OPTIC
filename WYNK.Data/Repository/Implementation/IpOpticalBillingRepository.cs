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
    class IpOpticalBillingRepository : RepositoryBase<OpticalBilling>, IIpOpticalBillingRepository
    {
        private readonly WYNKContext _Wynkcontext;
        private readonly CMPSContext _Cmpscontext;
        
        public IpOpticalBillingRepository(WYNKContext context, CMPSContext Cmpscontext) : base(context, Cmpscontext)
        {
            _Wynkcontext = context;
            _Cmpscontext = Cmpscontext;

        }

        public OpticalBilling GetPatientDetails(int id)

        {

            var op = new OpticalBilling();
            //op.OBT = new List<OpticalTran>();
            //op.TaxDet = new List<TaxDet>();
            //op.PaymentMaster = new List<Payment_Master>();
            //op.OpticalMaster = new OpticalMaster();
            //op.OpticalTran = new OpticalTran();
            //op.PatientDetails = (from opn in WYNKContext.OpticalPrescription.Where(x => x.Status == "Open" && x.CMPID == id).GroupBy(x => x.RegistrationTranID)
            //                     select new PatientDetails
            //                     {
            //                         rid = opn.Key,
            //                         opid = opn.Select(x => x.ID).FirstOrDefault(),
            //                         uin = opn.Select(x => x.UIN).FirstOrDefault(),
            //                         PDate = opn.Select(x => x.PrescriptionDate).FirstOrDefault(),
            //                         Remarks = opn.Select(x => x.Remarks).FirstOrDefault(),

            //                     }).ToList();

            return op;

        }

        public OpticalBilling GetOpticalDetails(int id, int rid)

        {

            var op = new OpticalBilling();
            //op.OBT = new List<OpticalTran>();
            //op.TaxDet = new List<TaxDet>();
            //op.OpticalMaster = new OpticalMaster();
            //op.OpticalTran = new OpticalTran();
            //op.PaymentMaster = new List<Payment_Master>();

            //var type = CMPSContext.OneLineMaster.Where(x => x.ParentDescription == "Distance Vision" && x.ParentTag == "TY" && x.IsActive == true).Select(x => x.OLMID).FirstOrDefault();

            //op.DstVisOd = (from opn in WYNKContext.OpticalPrescription.Where(x => x.Type == type && x.CMPID == id && x.Ocular == "OD" && x.RegistrationTranID == rid)
            //               select new DstVisOd
            //               {
            //                   sphd = opn.DistSph,
            //                   cyld = opn.NearCyl,
            //                   axisd = opn.PinAxis,
            //                   addd = opn.Add,

            //               }).ToList();

            //op.DstVisOs = (from opn in WYNKContext.OpticalPrescription.Where(x => x.Type == type && x.CMPID == id && x.Ocular == "OS" && x.RegistrationTranID == rid)
            //               select new DstVisOs
            //               {
            //                   sphs = opn.DistSph,
            //                   cyls = opn.NearCyl,
            //                   axiss = opn.PinAxis,
            //                   adds = opn.Add,

            //               }).ToList();

            //var types = CMPSContext.OneLineMaster.Where(x => x.ParentDescription == "Near Vision" && x.IsActive == true).Select(x => x.OLMID).FirstOrDefault();


            //op.NearVisOd = (from opn in WYNKContext.OpticalPrescription.Where(x => x.Type == types && x.CMPID == id && x.Ocular == "OD" && x.RegistrationTranID == rid)
            //                select new NearVisOd
            //                {
            //                    sphnd = opn.DistSph,
            //                    cylnd = opn.NearCyl,
            //                    axisnd = opn.PinAxis,
            //                    addnd = opn.Add,

            //                }).ToList();

            //op.NearVisOs = (from opn in WYNKContext.OpticalPrescription.Where(x => x.Type == types && x.CMPID == id && x.Ocular == "OS" && x.RegistrationTranID == rid)
            //                select new NearVisOs
            //                {
            //                    sphns = opn.DistSph,
            //                    cylns = opn.NearCyl,
            //                    axisns = opn.PinAxis,
            //                    addns = opn.Add,

            //                }).ToList();

            //var uin = WYNKContext.RegistrationTran.Where(x => x.RegistrationTranID == rid).Select(x => x.UIN).FirstOrDefault();

            //op.Registration = WYNKContext.Registration.Where(x => x.UIN == uin).FirstOrDefault();

            //op.age = DateTime.Now.Year - op.Registration.DateofBirth.Year;

            return op;

        }

        public OpticalBilling GetLensDetails()

        {

            var ld = new OpticalBilling();
            //ld.OBT = new List<OpticalTran>();
            //ld.TaxDet = new List<TaxDet>();
            //ld.OpticalMaster = new OpticalMaster();
            //ld.OpticalTran = new OpticalTran();
            //ld.PaymentMaster = new List<Payment_Master>();

            //ld.LensDetails = (from lm in WYNKContext.Lensmaster
            //                  join le in WYNKContext.LensExtension on lm.ID
            //                  equals le.LMID
            //                  select new LensDetails
            //                  {
            //                      LensId = lm.ID,
            //                      LensType = lm.LensType,
            //                      LensOption = le.LensOption,
            //                     // Brand = le.Brand,
            //                      Amount = le.LensPrice,

            //                  }).ToList();

            return ld;

        }


        public dynamic UpdateOPBilling(OpticalBilling OpticalBilling, string UIN)
        {


            var opmas = new OpticalMaster();
            //opmas.OpticalPrescriptionID = OpticalBilling.OpticalMaster.OpticalPrescriptionID;
            //opmas.RegTranID = OpticalBilling.OpticalMaster.RegTranID;
            //opmas.DeliveryDate = DateTime.Now.Date;
            //opmas.GrossProductValue = OpticalBilling.OpticalMaster.GrossProductValue;
            //opmas.TotalDiscountValue = OpticalBilling.OpticalMaster.TotalDiscountValue;
            //opmas.TotalTaxValue = OpticalBilling.OpticalMaster.TotalTaxValue;
            //opmas.TotalCGSTTaxValue = OpticalBilling.OpticalMaster.TotalTaxValue / 2;
            //opmas.TotalSGSTTaxValue = OpticalBilling.OpticalMaster.TotalTaxValue / 2;
            //opmas.NetAmount = OpticalBilling.OpticalMaster.NetAmount;
            //opmas.CMPID = OpticalBilling.OpticalMaster.CMPID;
            //opmas.TransactionId = 2;
            //opmas.CreatedBy = OpticalBilling.OpticalMaster.CreatedBy;
            //opmas.UpdatedBy = OpticalBilling.OpticalMaster.UpdatedBy;
            opmas.CreatedUTC = DateTime.UtcNow;

            WYNKContext.OpticalMaster.Add(opmas);

            WYNKContext.SaveChanges();

            var crby = opmas.CreatedBy;
            var upby = opmas.UpdatedBy;

            //if (OpticalBilling.OBT.Count() > 0)
            //{
            //    foreach (var item in OpticalBilling.OBT.ToList())

            //    {
            //        var OpTran = new OpticalTran();
            //        var opid = opmas.ID;

            //        OpTran.OID = opid;
            //        OpTran.LensID = item.LensID;
            //        OpTran.Description = item.Description;
            //        OpTran.Quantity = item.Quantity;
            //        OpTran.UOMID = item.UOMID;
            //        OpTran.Price = item.Price;
            //        OpTran.ProductAmount = item.ProductAmount;
            //        OpTran.TaxID = item.TaxID;
            //        OpTran.DiscountAmount = item.DiscountAmount;
            //        OpTran.TaxPercentage = item.TaxPercentage;
            //        OpTran.TaxAmount = item.TaxAmount;
            //        OpTran.NetAmount = item.NetAmount;
            //        OpTran.CreatedUTC = DateTime.UtcNow;
            //        OpTran.CreatedBy = crby;
            //        OpTran.UpdatedBy = upby;

            //        WYNKContext.OpticalTran.AddRange(OpTran);
            //        WYNKContext.SaveChanges();

            //    }
            //}

            var res = (from im in WYNKContext.PatientAccount.Where(x => x.UIN == UIN && x.InvoiceNumber == null)
                       select new
                       {
                           rt = im.UIN.Count(),

                       }).ToList();

            var provalue = opmas.GrossProductValue;
            var disvalue = opmas.TotalDiscountValue;
            var taxvalue = opmas.TotalTaxValue;
            var billvalue = opmas.NetAmount;
            var cid = opmas.CMPID;

            if (res.Count() == 0)
            {

                var pa = new PatientAccount();

                pa.CMPID = cid;
                pa.UIN = UIN;
                pa.TotalProductValue = provalue;
                pa.TotalDiscountValue = disvalue;
                pa.TotalTaxValue = taxvalue;
                pa.TotalCGSTTaxValue= taxvalue/2;
                pa.TotalSGSTTaxValue = taxvalue / 2;
                pa.TotalBillValue = billvalue;
                pa.CreatedUTC = DateTime.UtcNow;
                pa.CreatedBy = crby;
                pa.UpdatedBy = upby;
                WYNKContext.Add(pa);
                WYNKContext.SaveChanges();

            }

            else
            {
                var masters = WYNKContext.PatientAccount.Where(x => x.UIN == UIN).LastOrDefault();
                if (masters != null)
                {

                    masters.TotalProductValue += provalue;
                    masters.TotalDiscountValue += disvalue;
                    masters.TotalTaxValue += taxvalue;
                    masters.TotalCGSTTaxValue += taxvalue/2;
                    masters.TotalSGSTTaxValue += taxvalue/2;
                    masters.TotalBillValue += billvalue;
                    WYNKContext.PatientAccount.UpdateRange(masters);

                }

            }



            var res1 = WYNKContext.PatientAccount.Where(x => x.UIN == UIN).Select(x => x.PAID).LastOrDefault();
            var res2 = WYNKContext.PatientAccountDetail.Where(x => x.PAID == res1 && x.ServiceDescription == "Opticalcharges").ToList();


            if (res2.Count() == 0)
            {

                var pat = new PatientAccountDetail();
                var rs1 = WYNKContext.PatientAccount.Where(x => x.UIN == UIN).Select(x => x.PAID).LastOrDefault();

                pat.PAID = rs1;
                pat.OLMID = CMPSContext.OneLineMaster.Where(x => x.ParentDescription == "Opticalcharges" && x.ParentTag == "Services").Select(x => x.OLMID).FirstOrDefault();
                pat.ServiceTypeID = CMPSContext.OneLineMaster.Where(x => x.ParentDescription == "Opticalcharges" && x.ParentTag == "Services").Select(x => x.OLMID).FirstOrDefault();
                pat.ServiceDescription = "Opticalcharges";
                pat.TotalProductValue = provalue;
                pat.TotalDiscountValue = disvalue;
                pat.TotalTaxValue = taxvalue;
                pat.TotalCGSTTaxValue = taxvalue/2;
                pat.TotalSGSTTaxValue = taxvalue/2;
                pat.TotalBillValue = billvalue;
                pat.CreatedUTC = DateTime.UtcNow;
                pat.CreatedBy = crby;
                pat.UpdatedBy = upby;
                WYNKContext.Add(pat);
                WYNKContext.SaveChanges();

            }


            else
            {

                var mast = WYNKContext.PatientAccount.Where(x => x.UIN == UIN).LastOrDefault();
                var resul = WYNKContext.PatientAccountDetail.Where(x => x.PAID == mast.PAID && x.ServiceDescription == "Opticalcharges").ToList();

                if (resul != null)
                {

                    resul.All(x => {
                        x.TotalProductValue += provalue;
                        x.TotalDiscountValue += disvalue;
                        x.TotalTaxValue += taxvalue;
                        x.TotalCGSTTaxValue += taxvalue / 2;
                        x.TotalSGSTTaxValue += taxvalue / 2;
                        x.TotalBillValue += billvalue;
                        return true;
                    });
                    WYNKContext.PatientAccountDetail.UpdateRange(resul);
                }


            }

            var serid = CMPSContext.OneLineMaster.Where(x => x.ParentDescription == "Opticalcharges" && x.ParentTag == "Services").Select(x => x.OLMID).FirstOrDefault();


            var rs2 = WYNKContext.PatientAccount.Where(x => x.UIN == UIN).Select(x => x.PAID).LastOrDefault();
            var rs3 = WYNKContext.PatientAccountDetail.Where(x => x.PAID == rs2 && x.ServiceTypeID == serid).Select(x => x.PAccDetailID).LastOrDefault();
            

            //foreach (var items in OpticalBilling.OBT.ToList())

            //{
            //    var patactdttx = new PatientAccountDetailTax();
            //    patactdttx.PAccDetailID = rs3;
            //    patactdttx.ServiceTypeID = serid;
            //    patactdttx.TaxID = items.TaxID;
            //    patactdttx.TaxPercentage = items.TaxPercentage;
            //    patactdttx.TotalProductValue = items.ProductAmount;
            //    patactdttx.TotalDiscountValue = items.DiscountAmount;
            //    patactdttx.TotalTaxValue = items.TaxAmount;
            //    patactdttx.TotalCGSTTaxValue = items.TaxAmount / 2;
            //    patactdttx.TotalSGSTTaxValue = items.TaxAmount / 2;
            //    patactdttx.TotalValue = items.NetAmount;
            //    patactdttx.CreatedUTC = DateTime.UtcNow;
            //    patactdttx.CreatedBy = crby;
            //    patactdttx.UpdatedBy = upby;
            //    WYNKContext.PatientAccountDetailTax.AddRange(patactdttx);
            //    WYNKContext.SaveChanges();

            //}



            try
            {
                if (WYNKContext.SaveChanges() >= 0)


                    return new
                    {

                        Success = true,
                        Message = CommonMessage.saved,
                    };
            }
            catch (Exception ex)
            {
                Console.Write(ex);
            }
            return new
            {
                Success = false,
                Message = CommonMessage.Missing,
            };

        }




    }
}






