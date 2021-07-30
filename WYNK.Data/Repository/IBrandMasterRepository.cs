using System;
using System.Collections.Generic;
using System.Text;
using WYNK.Data.Model.ViewModel;

namespace WYNK.Data.Repository
{
    public interface IBrandMasterRepository : IRepositoryBase<BrandView>
    {

        dynamic Insertbrand(BrandView Addbrand, int cmpid);
        dynamic Fullbrandlist(int cmpid);
        dynamic updatebrand(BrandView Upbrand, int cmpid, int ID);
        dynamic Deletebrand(int ID);
    }
}
