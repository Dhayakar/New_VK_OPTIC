using System;
using System.Collections.Generic;
using System.Text;
using WYNK.Data.Model.ViewModel;

namespace WYNK.Data.Repository
{
    public interface IIndentRepository : IRepositoryBase<IndentViewModel>
    {
        dynamic Insertindent(IndentViewModel Indentdata);

        dynamic updateindent(IndentViewModel Indentdata);
        
        dynamic GetdrugDetails(int id);
    }
}