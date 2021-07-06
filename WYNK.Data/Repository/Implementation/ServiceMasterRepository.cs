using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using WYNK.Data.Model;
using WYNK.Data.Model.ViewModel;

namespace WYNK.Data.Repository.Implementation
{
    class ServiceMasterRepository : RepositoryBase<ServicesViewModel>, IServiceMasterRepository
    {
        private readonly WYNKContext _Wynkcontext;
        private readonly CMPSContext _Cmpscontext;

        public ServiceMasterRepository(WYNKContext context, CMPSContext Cmpscontext) : base(context, Cmpscontext)
        {
            _Wynkcontext = context;
            _Cmpscontext = Cmpscontext;
        }
    
        public dynamic Saveservicemasterdata(ServicesViewModel BMI)
        {
            var Data = new ServicesViewModel();
            var Servicesdata = BMI.ServicesGridData;
            try
            {                                
                foreach (var item in Servicesdata)
                {
                    var ser = new ServiceMaster();
                    ser.parentDescription = item.parentid;
                    var fd = WYNKContext.ServiceMaster.Where(x => x.parentDescription == item.parentid && x.ChildDescription == item.childid).FirstOrDefault();
                    if (fd != null)
                    {
                        fd.ChildDescription = item.childid;
                        fd.DoctorID = Convert.ToInt32(item.docid);
                        fd.InsuranceID = Convert.ToInt32(item.insuranceid);
                        fd.RoomID = Convert.ToInt32(item.roomid);
                        fd.DiscountPercentage = Convert.ToInt32(item.percentage);
                        fd.AmountEligible = Convert.ToDecimal(item.eligibleamt);
                        fd.ServiceCharge = Convert.ToDecimal(item.serviceamt);
                        fd.TotalAmount = Convert.ToDecimal(item.netamount);
                        fd.Icdcode = 0;
                        fd.CreatedUTC = DateTime.UtcNow;
                        fd.CreatedBy = 1;
                        WYNKContext.Entry(fd).State = EntityState.Modified;                        
                    }
                    else
                    {
                        ser.ChildDescription = item.childid;
                        ser.DoctorID = Convert.ToInt32(item.docid);
                        ser.InsuranceID = Convert.ToInt32(item.insuranceid);
                        ser.RoomID = Convert.ToInt32(item.roomid);
                        ser.DiscountPercentage = Convert.ToInt32(item.percentage);
                        ser.AmountEligible = Convert.ToDecimal(item.eligibleamt);
                        ser.ServiceCharge = Convert.ToDecimal(item.serviceamt);
                        ser.TotalAmount = Convert.ToDecimal(item.netamount);
                        ser.Icdcode = 0;
                        ser.CreatedUTC = DateTime.UtcNow;
                        ser.CreatedBy = 1;
                        WYNKContext.ServiceMaster.AddRange(ser);
                    }


                }
                WYNKContext.SaveChanges();


                if(WYNKContext.SaveChanges() >= 0)
                {
                    return new
                    {
                        Success = true,
                        Message = "Saved"
                    };
                }
            }

            catch (Exception ex)
            {
                Console.Write(ex);
            }
            return new
            {
                Success = false,
                Message = "Something Went Wrong"
            };
                
        }


        public dynamic Deleteservicemasterdata(string Pid, string childid, string docid)
        {
            try
            {
                var pdata = WYNKContext.ServiceMaster.Where(x => x.parentDescription == Pid && x.ChildDescription == childid && x.DoctorID == Convert.ToInt32(docid)).FirstOrDefault();
                WYNKContext.ServiceMaster.RemoveRange(pdata);
                WYNKContext.SaveChanges();
                if(WYNKContext.SaveChanges() >= 0)
                {
                    return new
                    {
                        Success = true,                        
                    };
                }
            }
            catch (Exception ex)
            {
                Console.Write(ex);
            }
            return new
            {
                Success = false,
                Message = "Something Went Wrong"
            };   
        }

    }
}
