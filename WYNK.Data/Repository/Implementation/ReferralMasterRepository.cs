using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using WYNK.Data.Model;
using WYNK.Data.Model.ViewModel;

namespace WYNK.Data.Repository.Implementation
{
    class ReferralMasterRepository : RepositoryBase<Referral_Master>, IReferralMasterRepository
    {
        private readonly WYNKContext _Wynkcontext;
        private readonly CMPSContext _Cmpscontext;
        

        public ReferralMasterRepository(WYNKContext context, CMPSContext Cmpscontext) : base(context, Cmpscontext)
        {
            _Wynkcontext = context;
            _Cmpscontext = Cmpscontext;

        }

        public dynamic UpdateRefMaster(Referral_Master ReferralMaster)
        {

            var RefsMasetr = new ReferralMasterS();

           // RefsMasetr.REFERRAL_CODE = GenerateRunningCtrlNo("REFERRAL_CODE");
            RefsMasetr.REFERRAL_NAME = ReferralMaster.ReferralMaster.REFERRAL_NAME;
            RefsMasetr.REFERRAL_ADDRESS1 = ReferralMaster.ReferralMaster.REFERRAL_ADDRESS1;
            RefsMasetr.REFERRAL_ADDRESS2 = ReferralMaster.ReferralMaster.REFERRAL_ADDRESS2;
            RefsMasetr.REFERRAL_ADDRESS3 = ReferralMaster.ReferralMaster.REFERRAL_ADDRESS3;
            RefsMasetr.PHONE_NO = ReferralMaster.ReferralMaster.PHONE_NO;
            RefsMasetr.EMAIL_ID = ReferralMaster.ReferralMaster.EMAIL_ID;
            RefsMasetr.CONTACT_PERSON = ReferralMaster.ReferralMaster.CONTACT_PERSON;

            //Context.Referral_Master.Add(RefsMasetr);


            try
            {
                if (WYNKContext.SaveChanges() > 0)
                    return new
                    {
                        Success = true,
                        Message = "Speciality saved successfully"
                    };
            }
            catch (Exception ex)
            {
                Console.Write(ex);
            }
            return new
            {
                Success = false,
                Message = "Some data are Missing"
            };
        }

        //private string GenerateRunningCtrlNo(string rnControlCode)
        //{
        //    var rn = Context.Running_Number_Control.FirstOrDefault(x => x.RnControl_Code == rnControlCode && x.IsActive == true);
        //    if (rn != null)
        //    {

        //        rn.Control_Value += 1;

        //        string number = "00000000";
        //        Context.Entry(rn).State = EntityState.Modified;
        //        if (rn.Control_Value <= 9)
        //        {

        //            number = "00000";

        //        }
        //        else if (rn.Control_Value >= 10 && rn.Control_Value <= 99)
        //        {

        //            number = "0000";
        //        }
        //        else if (rn.Control_Value >= 100 && rn.Control_Value <= 999)
        //        {

        //            number = "000";
        //        }
        //        else if (rn.Control_Value >= 1000 && rn.Control_Value <= 9999)
        //        {

        //            number = "00";
        //        }
        //        return $"{rn.Control_String_Value}{number}{rn.Control_Value}";
        //    }
        //    else
        //        return "";
        //}


    }
}













