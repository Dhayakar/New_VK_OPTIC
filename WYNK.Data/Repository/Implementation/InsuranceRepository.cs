using Microsoft.EntityFrameworkCore;
using SMSand_EMAILService.cs;
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
    class InsuranceRepository : RepositoryBase<InsuranceViewModel>, IInsuranceRepository
    {

        private readonly WYNKContext _Wynkcontext;
        private readonly CMPSContext _Cmpscontext;
       

        public InsuranceRepository(WYNKContext context, CMPSContext Cmpscontext) : base(context, Cmpscontext)
        {
            _Wynkcontext = context;
            _Cmpscontext = Cmpscontext;

        }

        public InsuranceViewModel GetPinCodeDetails(int location)
        {

            var PinCode = new InsuranceViewModel();
            PinCode.ParentDescriptionPinCode = CMPSContext.LocationMaster.Where(x => x.ID == location).Select(x => x.Pincode).FirstOrDefault();


            return PinCode;

        }


        public InsuranceViewModel GetlocationDetails(int id)
        {
            var locDetails = new InsuranceViewModel();
            var v = CMPSContext.LocationMaster.Where(x => x.ID == id).Select(x => x.ParentDescription).FirstOrDefault();
            var stateid = CMPSContext.LocationMaster.Where(x => x.ParentDescription == v).Select(x => x.ParentID).FirstOrDefault();
            locDetails.ParentDescriptionstate = CMPSContext.LocationMaster.Where(x => x.ID == stateid).Select(x => x.ParentDescription).FirstOrDefault();
            var countryid = CMPSContext.LocationMaster.Where(x => x.ParentDescription == locDetails.ParentDescriptionstate).Select(x => x.ParentID).FirstOrDefault();
            locDetails.ParentDescriptioncountry = CMPSContext.LocationMaster.Where(x => x.ID == countryid).Select(x => x.ParentDescription).FirstOrDefault();
            return locDetails;
        }
        public dynamic InsertInsurance(InsuranceViewModel AddInsurance)
        {
            using (var dbContextTransaction = WYNKContext.Database.BeginTransaction())
            {
                try
                {
                    var Ins = new Insurance();
                    Ins.Name = AddInsurance.Insurance.Name;
                    Ins.Address1 = AddInsurance.Insurance.Address1;
                    Ins.Address2 = AddInsurance.Insurance.Address2;
                    Ins.Address3 = AddInsurance.Insurance.Address3;
                    Ins.LocationId = AddInsurance.Insurance.LocationId;
                    Ins.Pincode = AddInsurance.Insurance.Pincode;
                    Ins.InsuranceCategory = AddInsurance.Insurance.InsuranceCategory;
                    Ins.CreatedUTC = DateTime.UtcNow;
                    Ins.CreatedBy = AddInsurance.Insurance.CreatedBy;
                    Ins.CMPID = AddInsurance.Insurance.CMPID;
                    WYNKContext.Insurance.Add(Ins);
                    WYNKContext.SaveChanges();

                    var IID = Ins.ID;
                    if (AddInsurance.Insurance.InsuranceCategory== 0 )
                    {
                        var InsVSmid = new InsuranceVsMiddlemen();
                        InsVSmid.IID = IID;
                        InsVSmid.IsActive = false;
                        InsVSmid.CreatedBy = AddInsurance.Insurance.CreatedBy;
                        InsVSmid.CreatedUTC = DateTime.UtcNow;
                        WYNKContext.InsuranceVsMiddlemen.AddRange(InsVSmid);
                        WYNKContext.SaveChanges();
                    }
                    dbContextTransaction.Commit();
                    return new
                    {
                        Success = true,
                        Message = "Saved successfully",
                    };

                }
                catch (Exception ex)
                {
                    dbContextTransaction.Rollback();
                    Console.Write(ex);
                }
                return new
                {
                    Success = false,
                    Message = "Some data are Missing"
                };
            }
        }


        public dynamic UpdateInsurance(InsuranceViewModel InsuranceUpdate, int ID)
        {
            using (var dbContextTransaction = WYNKContext.Database.BeginTransaction())
            {
                try
                {
                    var Ins = new Insurance();
                    Ins = WYNKContext.Insurance.Where(x => x.ID == ID).FirstOrDefault();
                    Ins.Name = InsuranceUpdate.Insurance.Name;
                    Ins.Address1 = InsuranceUpdate.Insurance.Address1;
                    Ins.Address2 = InsuranceUpdate.Insurance.Address2;
                    Ins.Address3 = InsuranceUpdate.Insurance.Address3;
                    Ins.LocationId = InsuranceUpdate.Insurance.LocationId;
                    Ins.Pincode = InsuranceUpdate.Insurance.Pincode;
                    Ins.InsuranceCategory = InsuranceUpdate.Insurance.InsuranceCategory;
                    Ins.UpdatedUTC = DateTime.UtcNow;
                    Ins.UpdatedBy = InsuranceUpdate.Insurance.CreatedBy;
                    Ins.IsActive = InsuranceUpdate.Insurance.IsActive;
                    //WYNKContext.Insurance.Add(Ins);
                    WYNKContext.Entry(Ins).State = EntityState.Modified;
                    WYNKContext.SaveChanges();


                    var InsVSmid = new InsuranceVsMiddlemen();
                    if (InsuranceUpdate.Insurance.InsuranceCategory == 0)
                    {
                        InsVSmid = WYNKContext.InsuranceVsMiddlemen.Where(x => x.IID == ID).FirstOrDefault();
                        InsVSmid.IsActive = InsuranceUpdate.Insurance.IsActive;
                        InsVSmid.UpdatedBy = InsuranceUpdate.Insurance.CreatedBy;
                        InsVSmid.UpdatedUTC = DateTime.UtcNow;
                        WYNKContext.Entry(InsVSmid).State = EntityState.Modified;
                        WYNKContext.SaveChanges();
                    }
                    dbContextTransaction.Commit();
                    return new
                    {
                        Success = true,
                        Message = "Saved successfully",
                    };

                }
                catch (Exception ex)
                {
                    dbContextTransaction.Rollback();
                    Console.Write(ex);
                }
                return new
                {
                    Success = false,
                    Message = "Some data are Missing"
                };
            }
        }
            //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        }
}
