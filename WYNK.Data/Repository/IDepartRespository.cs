using System;
using System.Collections.Generic;
using System.Text;
using WYNK.Data.Model.ViewModel;

namespace WYNK.Data.Repository
{
   public interface IDepartRepository : IRepositoryBase<DepartView>
    {
        dynamic InsertPart(DepartView De);
        DepartView GetDepartDetail();
        dynamic UpdatePart(DepartView De1, int ID);
        dynamic deletepart(int? ID);

    }
}
