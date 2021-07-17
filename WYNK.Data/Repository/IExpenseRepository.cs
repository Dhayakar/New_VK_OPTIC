using System;
using System.Collections.Generic;
using System.Text;
using WYNK.Data.Model.ViewModel;


namespace WYNK.Data.Repository
{
    public interface IExpenseRepository : IRepositoryBase<ExpenseViewModel>
    {
        dynamic InsertExpenseMaster(string Desc, int cmpid, int userid);
        dynamic GetExpenseMaster(int cmpid);
        dynamic GetactiveExpenseMaster(int cmpid);
        dynamic UpdateExpenseMaster(string Desc, int cmpid, int userid, int id, string status);
        dynamic DeleteExpenseMaster(int Desc, int cmpid, int userid);
        dynamic Submitexpensetrandata(ExpenseViewModel ExpenseDetails);
        dynamic GetdatabasedonDate(int cmpid, string date);
    }
}
