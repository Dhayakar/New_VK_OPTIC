using System;
using System.Collections.Generic;
using System.Linq;
using WYNK.Data.Model;
using WYNK.Data.Model.ViewModel;
using WYNK.Data.Repository.Operation;
using WYNK.Helpers;

namespace WYNK.Data.Repository.Implementation
{
    class ExpenseRepository : RepositoryBase<ExpenseViewModel>, IExpenseRepository
    {
        private readonly WYNKContext _Wynkcontext;
        private readonly CMPSContext _Cmpscontext;
        public ExpenseRepository(WYNKContext context, CMPSContext Cmpscontext) : base(context, Cmpscontext)
        {
            _Wynkcontext = context;
            _Cmpscontext = Cmpscontext;
        }

        public dynamic InsertExpenseMaster(string Desc, int cmpid, int userid)
        {
            var data = new ExpenseViewModel();
            try
            {
                var Exmaset = new ExpenseMaster();
                Exmaset.CMPID = cmpid;
                Exmaset.ExpenseDescription = Desc;
                Exmaset.RandomUniqueID = PasswordEncodeandDecode.GetRandomnumber();
                Exmaset.CreatedUTC = DateTime.UtcNow;
                Exmaset.CreatedBY = userid;
                Exmaset.IsActive = true;
                Exmaset.IsDeleted = false;
                WYNKContext.ExpenseMaster.AddRange(Exmaset);

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
                ErrorLog oErrorLogs = new ErrorLog();
                oErrorLogs.WriteErrorLogArray("Expense Master", ex.Message);
            }
            return new
            {
                Success = false,
                Message = "SomeThing Went Wrong"
            };
        }

        public dynamic GetExpenseMaster(int cmpid)
        {
            var data = new ExpenseViewModel();
            data.ExpenseMasterhelpdata = new List<ExpenseMasterhelpdata>();
            data.ExpenseMasterhelpdata = (from em in WYNKContext.ExpenseMaster.Where(x => x.CMPID == cmpid)
                                          select new ExpenseMasterhelpdata
                                          {
                                              ID = em.ID,
                                              Description = em.ExpenseDescription,
                                              Status = Getstatus(em.IsActive),
                                          }).ToList();
            return data.ExpenseMasterhelpdata;
        }

        public string Getstatus(bool Active)
        {
            var result = "";
            if (Active == true)
            {
                result = "Yes";
            }
            else
            {
                result = "No";
            }
                return result;
        }

    }
}
