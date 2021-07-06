using System;
using System.Collections.Generic;
using System.Text;
using WYNK.Data.Common;
using WYNK.Data.Model.ViewModel;
using Microsoft.AspNetCore.Http;

namespace WYNK.Data.Repository
{
    public interface IGrnWoPoRepository : IRepositoryBase<GrnWoPo>
    {

        dynamic GetdrugDetails(int ID);
        dynamic UpdateGrnWoPo(GrnWoPo GrnWoPo, int cmpid, int TransactionId, string Time);
        dynamic GrnWoPoprint(string RandomUniqueID, int cmpid, string Time);
        dynamic GrnWoPohis(int cmpid, int TransactionId, string Time);
        dynamic GrnWoPobatchhistory(string RandomUniqueID, int TransactionId);
        dynamic GrnWoPoserialhistory(string Pgrnno, int TransactionId);
    }
}
