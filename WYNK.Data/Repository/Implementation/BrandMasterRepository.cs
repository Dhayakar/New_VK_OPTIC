using Microsoft.EntityFrameworkCore;
using SMSand_EMAILService.cs;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using WYNK.Data.Common;
using WYNK.Data.Model;
using WYNK.Data.Model.ViewModel;
using WYNK.Helpers;

namespace WYNK.Data.Repository.Implementation
{
    class BrandMasterRepository : RepositoryBase<BrandView>, IBrandMasterRepository
    {
        private readonly WYNKContext _Wynkcontext;
        private readonly CMPSContext _Cmpscontext;
        

        public BrandMasterRepository(WYNKContext context, CMPSContext Cmpscontext) : base(context, Cmpscontext)
        {
            _Wynkcontext = context;
            _Cmpscontext = Cmpscontext;

        }



        public dynamic Insertbrand(BrandView Addbrand)

        {
            var brand = new Brand();

            brand.Description = Addbrand.Brand.Description;
            brand.BrandType = Addbrand.Brand.BrandType;
            brand.CreatedUTC = DateTime.UtcNow;
            brand.CreatedBy = Addbrand.Brand.CreatedBy;
            brand.IsActive = true;
            brand.cmpID = Addbrand.Brand.cmpID;
            WYNKContext.Brand.AddRange(brand);

            try
            {
                if (WYNKContext.SaveChanges() > 0)
                    return new
                    {
                        Success = true,

                    };
            }
            catch (Exception ex)
            {
                Console.Write(ex);
            }
            return new
            {
                Success = false,

            };
        }

        public dynamic Fullbrandlist(int cmpid)
        {
            var getData = new BrandView();

            var Trantype = WYNKContext.Brand.ToList();


            getData.Brandfull = (from details in Trantype.Where(x => x.cmpID == cmpid && x.IsDeleted == false)
                                 select new Brandfull
                                 {
                                     ID = details.ID,
                                     Description = details.Description,
                                     BrandType = details.BrandType,
                                     IsActive = details.IsActive,
                                     IsActivename = details.IsActive == true ? "Active" : "InActive",
                                 }).ToList();

            return getData;
        }

        public dynamic updatebrand(BrandView Upbrand, int ID)
        {

            var brand = new Brand();

            brand = WYNKContext.Brand.Where(x => x.ID == ID).FirstOrDefault();

            brand.Description = Upbrand.Brand.Description;
            brand.BrandType = Upbrand.Brand.BrandType;
            brand.IsActive = Upbrand.Brand.IsActive;
            brand.UpdatedUTC = DateTime.UtcNow;
            brand.UpdatedBy = Upbrand.Brand.UpdatedBy;
            WYNKContext.Brand.UpdateRange(brand);


            try
            {
                if (WYNKContext.SaveChanges() > 0)
                    return new
                    {
                        Success = true,
                    };
            }
            catch (Exception ex)
            {
                Console.Write(ex);
            }
            return new
            {
                Success = false,

            };

        }

        public dynamic Deletebrand(int ID)
        {
            var stoMas = WYNKContext.Brand.Where(x => x.ID == ID).ToList();

            if (stoMas != null)
            {
                stoMas.All(x => { x.IsDeleted = true; return true; });
                WYNKContext.Brand.UpdateRange(stoMas);

            }

            try
            {
                if (WYNKContext.SaveChanges() >= 0)
                    return new
                    {
                        Success = true,
                        Message = CommonRepository.saved
                    };
            }
            catch (Exception ex)
            {
                Console.Write(ex);
            }
            return new
            {
                Success = false,
                Message = CommonRepository.Missing
            };

        }










        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    }
}
