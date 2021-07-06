using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using WYNK.Data.Model;
using WYNK.Data.Model.ViewModel;
using WYNK.Helpers;

namespace WYNK.Data.Repository.Implementation
{
    public class ProfRepository : RepositoryBase<ProfessionalView>, IProfRepository
    {
        private readonly WYNKContext _Wynkcontext;
        private readonly CMPSContext _Cmpscontext;
        

        public ProfRepository(WYNKContext context, CMPSContext Cmpscontext) : base(context, Cmpscontext)
        {
            _Wynkcontext = context;
            _Cmpscontext = Cmpscontext;

        }

        public dynamic deleteProfes(int? ID)
        {
            var pcmntl = new ProTax();
            //var Dpart2 = PAYROLLContext.ProfessionalTax.Where(x => x.ID == ID).ToList();
            //if (Dpart2 != null)

            //{
            //    Dpart2.All(x => { x.IsDeleted = true; x.IsActive = false; return true; });
            //    pcmntl.UpdatedUTC = DateTime.UtcNow;
            //    PAYROLLContext.ProfessionalTax.UpdateRange(Dpart2);

            //}
            //try
            //{
            //    if (PAYROLLContext.SaveChanges() >= 0)
            //        return new
            //        {
            //            Success = true,
            //            Message = "Delete Successfully"
            //        };
            //}
            //catch (Exception ex)
            //{
            //    Console.Write(ex);
            //}
            return new
            {
                Success = false,
                Message = "Some data are Missing"
            };
        }

        public ProfessionalView GetDetails()

        {
            var configuredetail = new ProfessionalView();
            var LocationMaster = CMPSContext.LocationMaster.ToList();

            //configuredetail.ProfesDetails = (from get in PAYROLLContext.ProfessionalTax.Where(x => x.IsDeleted == false)
            //                                 select new ProfesDetails
            //                                 {
            //                                     ID = get.ID,
            //                                     WithEffectFrom = get.WithEffectFrom,
            //                                     StateID = LocationMaster.Where(x => x.ID == get.StateID).Select(x => x.ParentDescription).FirstOrDefault(),
            //                                     StateID1 = get.StateID,
            //                                     Frequency1 = get.Frequency.ToString(),
            //                                     IsActive = get.IsActive,

            //                                     Frequency = Enum.GetName(typeof(Frequency), get.Frequency),

            //                                 }).ToList();


            return configuredetail;


        }

        public ProfessionalView getData()

        {
            var arr = new ProfessionalView();
            //var M_PTax = PAYROLLContext.ProfessionalTax.ToList();
            //var M_PTaxTran = PAYROLLContext.ProfessionalTaxTran.ToList();
            //var LocationMaster = CMPSContext.LocationMaster.ToList();

            //arr.getDetails = (from pTax in M_PTax.Where(x => x.IsDeleted == false)
            //                  join pTaxTran in M_PTaxTran
            //                  on pTax.ID equals pTaxTran.PTID

            //                  select new getDetails
            //                  {
            //                      ID1 = pTax.ID,
            //                      WithEffectFrom1 = pTax.WithEffectFrom,
            //                      From1 = pTaxTran.From,
            //                      To1 = pTaxTran.To,
            //                      PTAmount1 = pTaxTran.PTAmount,
            //                      StateID1 = LocationMaster.Where(x => x.ID == pTax.StateID).Select(x => x.ParentDescription).FirstOrDefault(),
            //                      StateID11 = pTax.StateID,
            //                      Frequency1 = pTax.Frequency.ToString(),
            //                      Frequency11 = Enum.GetName(typeof(Frequency), pTax.Frequency),


            //                  }).ToList();

            return arr;

        }

        public dynamic Gettrans(int ID)
        {

            var detailss = new ProfessionalView();
            var nd = new ProTax();

            //detailss.details = (from get in PAYROLLContext.ProfessionalTaxTran.Where(x => x.PTID == ID)

            //                    select new details
            //                    {
            //                        ID = get.ID,
            //                        PTID = get.PTID,
            //                        From = get.From,
            //                        To = get.To,
            //                        PTAmount = get.PTAmount,
            //                        IDs = nd.ID,
                                    
            //                    }).ToList();


            return detailss;
        }

        public dynamic InsertPros(ProfessionalView pos)
        {
            //using (var dbContextTransaction = PAYROLLContext.Database.BeginTransaction())
            //{
            //    try
            //     {
            //    var pcmnt = new ProTax();
            //    pcmnt.Frequency = pos.ProTax.Frequency;
            //    pcmnt.StateID = pos.ProTax.StateID;
            //    pcmnt.WithEffectFrom = pos.ProTax.WithEffectFrom.AddDays(1);
            //    pcmnt.IsActive = CommonRepository.Active;
            //    pcmnt.CreatedUTC = DateTime.UtcNow;
            //    pcmnt.CMPID = pos.ProTax.CMPID;
            //    pcmnt.CreatedBy = pos.ProTax.CreatedBy;
            //    PAYROLLContext.ProfessionalTax.Add(pcmnt);
            //    PAYROLLContext.SaveChanges();

            //    if (pos.ProfesDetails.Count() > 0)
            //    {
            //        foreach (var item in pos.ProfesDetails.ToList())

            //        {
            //            var ptran = new ProTaxTran();
            //            ptran.PTID = pcmnt.ID;
            //            ptran.From = item.From;
            //            ptran.To = item.To;
            //            ptran.PTAmount = item.PTAmount;
            //            ptran.CreatedBy = pcmnt.CreatedBy;
            //            ptran.CreatedUTC = DateTime.UtcNow;
            //            PAYROLLContext.ProfessionalTaxTran.Add(ptran);
            //            PAYROLLContext.SaveChanges();
                        
            //        }
            //    }
            //    PAYROLLContext.SaveChanges();
            //    dbContextTransaction.Commit();


            //    try
            //    {
            //        if (PAYROLLContext.SaveChanges() >= 0)
            //            return new
            //            {
            //                Success = true,
            //                Message = "Saved successfully"
            //            };
            //    }
            //    catch (Exception ex)
            //    {
            //        Console.Write(ex);
            //    }
            //     }

            //    catch (Exception ex)
            //    {
            //        dbContextTransaction.Rollback();
            //        Console.Write(ex);
            //    }
            //}

                return new
                {
                    Success = false,
                    Message = "Some data are Missing"

                };
            }

            public dynamic UpdatePart(ProfessionalView De1, int ID, int? pfID)
            {
            //using (var dbContextTransaction = PAYROLLContext.Database.BeginTransaction())
            //{
            //    try
            //    {
            //        var pcmnt = new ProTax();
            //        var rmv = PAYROLLContext.ProfessionalTaxTran.ToList();
            //        PAYROLLContext.ProfessionalTaxTran.RemoveRange(PAYROLLContext.ProfessionalTaxTran.Where(x => x.PTID == ID));
            //        PAYROLLContext.SaveChanges();


            //        pcmnt = PAYROLLContext.ProfessionalTax.Where(x => x.ID == ID).FirstOrDefault();
            //        pcmnt.IsActive = De1.ProTax.IsActive;
            //        pcmnt.CMPID = De1.ProTax.CMPID;
            //        pcmnt.UpdatedBy = De1.ProTax.UpdatedBy;
            //        pcmnt.UpdatedUTC = DateTime.UtcNow;
            //        PAYROLLContext.ProfessionalTax.UpdateRange(pcmnt);
            //        PAYROLLContext.SaveChanges();

            //        if (De1.ProfesDetails.Count() > 0)
            //        {
            //            foreach (var item in De1.ProfesDetails.ToList())

            //            {
            //                var ptran = new ProTaxTran();
            //                ptran.PTID = pcmnt.ID;
            //                ptran.From = item.From;
            //                ptran.To = item.To;
            //                ptran.PTAmount = item.PTAmount;
            //                ptran.CreatedBy = pcmnt.CreatedBy;
            //                ptran.CreatedUTC = DateTime.UtcNow;
            //                PAYROLLContext.ProfessionalTaxTran.Add(ptran);
            //                PAYROLLContext.SaveChanges();

            //            }
            //        }

            //        PAYROLLContext.SaveChanges();
            //        dbContextTransaction.Commit();
            //        try
            //        {
            //            if (PAYROLLContext.SaveChanges() >= 0)
            //                return new
            //                {
            //                    Success = true,
            //                    Message = "Updated Successfully"
            //                };

            //        }
            //        catch (Exception ex)
            //        {
            //            Console.Write(ex);
            //        }
            //    }
            //    catch (Exception ex)
            //    {
            //        dbContextTransaction.Rollback();
            //        Console.Write(ex);
            //    }
            //    return new
            //    {
            //        Succes = false,
            //        Message = "Some data are Missing"
            //    };

            //}

            return new
            {
                Succes = false,
                Message = "Some data are Missing"
            };
        }


    }


    }

 



      