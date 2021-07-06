using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using WYNK.Data.Common;
using WYNK.Data.Model;
using WYNK.Data.Model.ViewModel;
using WYNK.Data.Repository.Operation;
using WYNK.Helpers;

namespace WYNK.Data.Repository.Implementation
{
    class SpecialityVSTestRepository : RepositoryBase<specialityvstest>, ISpecialityVSTestRepository
    {
        private readonly WYNKContext _Wynkcontext;
        private readonly CMPSContext _Cmpscontext;
       
        public SpecialityVSTestRepository(WYNKContext context, CMPSContext Cmpscontext) : base(context, Cmpscontext)
        {
            _Wynkcontext = context;
            _Cmpscontext = Cmpscontext;

        }


        public dynamic UpdateTest(specialityvstest SpecialityVSTest)
        {



            var olm = new OneLine_Masters();

            olm.ParentDescription = SpecialityVSTest.OneLineMaster.ParentDescription;
            olm.ParentID = CMPSContext.OneLineMaster.Where(x => x.ParentDescription == "Investigation Test").Select(x => x.OLMID).FirstOrDefault();
            olm.ParentTag = "INV";
            olm.IsActive = true;
            olm.IsDeleted = false;
            olm.CreatedUTC = DateTime.UtcNow;
            olm.CreatedBy = SpecialityVSTest.OneLineMaster.CreatedBy;
            //olm.UpdatedBy = 2;
            CMPSContext.OneLineMaster.Add(olm);


            try
            {
                if (CMPSContext.SaveChanges() >= 0)
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

        public specialityvstest Getinvestigationvalues(int CmpID)
        {

            var sptest = new specialityvstest();
            sptest.SpecialityVSTest = new List<SpecialityVSTest>();
                       
            var services = CMPSContext.Services.ToList();
            var pid = CMPSContext.Services.Where(x => x.Description == "Investigation" && x.CMPID == CmpID).Select(x => x.ID).FirstOrDefault();

            //sptest.Specialitydetials = (from OLM in onelinemasterss.Where(u => u.ParentTag == "INV" && u.IsActive == true && u.IsDeleted == false).OrderBy(u=>u.ParentDescription)


            //                               select new Specialitydetials
            //                               {
            //                                   Itemdescription = OLM.ParentDescription,

            //                               }).ToList();

            sptest.Specialitydetials = (from SE in services.Where(u => u.ParentID == pid).OrderBy(u => u.Description)


                                        select new Specialitydetials
                                        {
                                            Itemdescription = SE.Description,

                                        }).ToList();


            return sptest;
        }

        public specialityvstest GetSelectedspecdetials(int ID, int CmpID)
        {

            var sptest = new specialityvstest();
            var drugmaster = new DrugMaster();
            var vendormaster = new VendorMasterViewModel();
            var ICDSpec = WYNKContext.ICDSpecialityCode.ToList();
            var spvstest = WYNKContext.SpecialityVSTest.ToList();
            var oneline = CMPSContext.OneLineMaster.ToList();
            var services = CMPSContext.Services.ToList();
            var pid = CMPSContext.Services.Where(x => x.Description == "Investigation" && x.CMPID == CmpID).Select(x => x.ID).FirstOrDefault();
            var v = WYNKContext.SpecialityVSTest.Where(x => x.SpecialityID == ID && x.IsActive == true).ToList();
            IList<Specialitydetials> Specialitydetials = new List<Specialitydetials>();


            foreach (var list in v)
            {
                var dd = new Specialitydetials();
                dd.Itemdescription = services.Where(x => x.ID == list.InvestigationID).Select(x => x.Description).FirstOrDefault();
                //dd.Itemtag = oneline.Where(x => x.OLMID == list.InvestigationID).Select(x => x.ParentTag).FirstOrDefault();
                dd.Itemselect = true;
                Specialitydetials.Add(dd);
            }

            var cpm = Specialitydetials;
            sptest.Specialitydetials = cpm;
            //sptest.NONSpecialitydetials = (from OLM in oneline.Where(x =>x.ParentTag == "INV" && x.IsActive == true && x.IsDeleted == false).OrderBy(x=>x.ParentDescription)
            //                               where cpm.All(a => a.Itemdescription != OLM.ParentDescription)
            //                                 select new NONSpecialitydetials
            //                                 {
            //                                     Itemdescription = OLM.ParentDescription,
            //                                     Itemselect = false,
            //                                 }).ToList();

            sptest.NONSpecialitydetials = (from OLM in services.Where(x => x.ParentID == pid).OrderBy(x => x.Description)
                                           where cpm.All(a => a.Itemdescription != OLM.Description)
                                           select new NONSpecialitydetials
                                           {
                                               Itemdescription = OLM.Description,
                                               Itemselect = false,
                                           }).ToList();


            return sptest;
        }

        public dynamic Insertspecialitydata(specialityvstest SpecialityVSTest)
        {
            if (SpecialityVSTest.SpecialityDetail.Count() != 0)
            {
                foreach (var item in SpecialityVSTest.SpecialityDetail.ToList())
                {
                    var specvstest = new SpecialityVSTest();
                    var pid = CMPSContext.Services.Where(x => x.Description == "Investigation" && x.CMPID == Convert.ToInt32(SpecialityVSTest.CompanyID)).Select(x => x.ID).FirstOrDefault();

                    var id = CMPSContext.Services.Where(x => x.Description == item.Description && x.ParentID == pid).Select(x => x.ID).FirstOrDefault();
                    //var id = CMPSContext.OneLineMaster.Where(x => x.ParentDescription == item.Description && x.IsActive == true && x.IsDeleted == false).Select(x => x.OLMID).FirstOrDefault();

                    var itemid = WYNKContext.SpecialityVSTest.OrderBy(x => x.CreatedUTC).Where(x => x.InvestigationID == id && x.SpecialityID == SpecialityVSTest.Code && x.IsActive == true).Select(x => x.ID).FirstOrDefault();
                    specvstest.ID = itemid;
                    specvstest.CMPID = Convert.ToInt32(SpecialityVSTest.CompanyID);
                    specvstest.InvestigationID = id;

                    var specid = WYNKContext.ICDSpecialityCode.Where(x => x.ID == SpecialityVSTest.Code).Select(x => x.ID).FirstOrDefault();

                    specvstest.SpecialityID = SpecialityVSTest.Code;
                    specvstest.IsActive = false;
                    specvstest.IsDeleted = true;
                    specvstest.CreatedUTC = DateTime.UtcNow;
                    specvstest.UpdatedUTC = DateTime.UtcNow;
                    specvstest.CreatedBy = Convert.ToInt32(SpecialityVSTest.UserID);
                    specvstest.UpdatedBy = null;

                    //WYNKContext.Entry(Itemvendormapping).State = EntityState.Modified;
                    WYNKContext.SpecialityVSTest.UpdateRange(specvstest);
                    WYNKContext.SaveChanges();
                }
            }




            if (SpecialityVSTest.SSpecialityDetail.Count() != 0)
            {
                foreach (var item in SpecialityVSTest.SSpecialityDetail.ToList())
                {
                    var Drugdetails = new Drug_Master();
                    var specvstest = new SpecialityVSTest();
                    var pid = CMPSContext.Services.Where(x => x.Description == "Investigation" && x.CMPID == Convert.ToInt32(SpecialityVSTest.CompanyID)).Select(x => x.ID).FirstOrDefault();

                    var id = CMPSContext.Services.Where(x => x.Description == item.Description && x.ParentID == pid).Select(x => x.ID).FirstOrDefault();
                    //var id = CMPSContext.OneLineMaster.Where(x => x.ParentDescription == item.Description && x.IsActive == true && x.IsDeleted == false).Select(x => x.OLMID).FirstOrDefault();
                    //Drugdetails.ID = id;
                    specvstest.CMPID = Convert.ToInt32(SpecialityVSTest.CompanyID);
                    specvstest.InvestigationID = id;
                    var specid = WYNKContext.SpecialityVSTest.Where(x => x.ID == SpecialityVSTest.Code).Select(x => x.ID).FirstOrDefault();

                    specvstest.SpecialityID = SpecialityVSTest.Code;
                    specvstest.IsActive = true;
                    specvstest.IsDeleted = false;
                    specvstest.CreatedUTC = DateTime.UtcNow;
                    specvstest.CreatedBy = Convert.ToInt32(SpecialityVSTest.UserID);
                    WYNKContext.SpecialityVSTest.Add(specvstest);
                    WYNKContext.SaveChanges();
                }
            }



            try
            {
                if (WYNKContext.SaveChanges() >= 0)
                    return new
                    {
                        Success = true,
                        Message = "Saved successfully"
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




    }
}






