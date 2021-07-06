using System;
using System.Collections.Generic;
using System.Text;
using WYNK.Data.Common;
using WYNK.Data.Model.ViewModel;
using Microsoft.AspNetCore.Http;

namespace WYNK.Data.Repository
{
    public interface IGrnRepository : IRepositoryBase<Grn>
    {

        Grn GetPoDetails(int id);
        Grn GetItemDetails(string ID, int storeID, int CmpID);
        Grn GetGrnDetails(int id, int tid,string Getloctime);
        Grn GetGrnItemDetails(string ID, int cmpPid);

        Grn GetGrnSerialDetails(string gnno);

        dynamic CheckRNC(int cmpid, int tranid);

        dynamic UpdateGRN(Grn GRN, int SID, int cmpPid, int TransactionTypeid);

    }
}
