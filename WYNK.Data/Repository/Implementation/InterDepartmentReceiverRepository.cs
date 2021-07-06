using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using WYNK.Data.Common;
using WYNK.Data.Model;
using WYNK.Data.Model.ViewModel;
using WYNK.Data.Repository.Operation;
using WYNK.Helpers;

namespace WYNK.Data.Repository.Implementation
{
    class InterDepartmentReceiverRepository : RepositoryBase<InterDepartmentReceiver>, IInterDeparmentReceiverRepository
    {
        private readonly WYNKContext _Wynkcontext;
        private readonly CMPSContext _Cmpscontext;

        public InterDepartmentReceiverRepository(WYNKContext context, CMPSContext Cmpscontext) : base(context, Cmpscontext)
        {
            _Wynkcontext = context;
            _Cmpscontext = Cmpscontext;

        }
        public dynamic GetstoreDropdownvalues(int cmpid)
        {
            var storemasters = CMPSContext.Storemasters.Where(x=>x.CmpID == cmpid).ToList();
            return (from e in WYNKContext.StockMaster.Where(x => x.CMPID == cmpid && x.ReceiverStoreID != null).GroupBy(z => z.ReceiverStoreID)
                       select new Dropdown
                       {
                           Value = e.Select(x => x.ReceiverStoreID).FirstOrDefault().ToString(),
                           Text = storemasters.Where(x => x.StoreID == e.Select(y => y.ReceiverStoreID).FirstOrDefault()).Select(x => x.Storename).FirstOrDefault(),
                       }).ToList();
        }
        public dynamic GetStoreDetails(int ID,int IssueCode,int cmpid)
        {
            var StoreDetail = new InterDepartmentReceiver();
            var storeMaster = CMPSContext.Storemasters.Where(x=>x.CmpID == cmpid).ToList();
            StoreDetail.StoreName = storeMaster.Where(u => u.StoreID == ID).Select(x => x.Storename).FirstOrDefault();
            StoreDetail.ReceivedDetail = (from Stock in WYNKContext.StockMaster.Where(x => x.TransactionID == IssueCode && x.ReceiverStoreID == ID && x.CMPID == cmpid && x.ContraSmid == null)
                                          select new ReceivedDetails
                                          {
                                           Date = Stock.DocumentDate,
                                           StockTransferNo=Stock.DocumentNumber,
                                           SentFromStore= storeMaster.Where(u => u.StoreID == Stock.StoreID).Select(x => x.Storename).FirstOrDefault(), 
                                           StoreKeeper = storeMaster.Where(u => u.StoreID == Stock.StoreID).Select(x => x.StoreKeeper).FirstOrDefault(),
                                          }).ToList();
            return StoreDetail;
        }
        public dynamic GetRecDetails(int ID, int RecCode, int cmpid)
        {
            var StoreDetail = new InterDepartmentReceiver();
            var storeMaster = CMPSContext.Storemasters.Where(x => x.CmpID == cmpid).ToList();
            StoreDetail.StoreName = storeMaster.Where(u => u.StoreID == ID).Select(x => x.Storename).FirstOrDefault();
            StoreDetail.ReceivedDetail = (from Stock in WYNKContext.StockMaster.Where(x => x.TransactionID == RecCode && x.CMPID == cmpid && x.StoreID == ID)
                                          select new ReceivedDetails
                                          {
                                              Date = Stock.DocumentDate,
                                              StockTransferNo = Stock.DocumentNumber,
                                              ReceivedStore = storeMaster.Where(u => u.StoreID == Stock.StoreID).Select(x => x.Storename).FirstOrDefault(),
                                              Receivedby = Stock.ISSrecdby,
                                          }).ToList();
            return StoreDetail;
        }
        public dynamic GetStockTransferDetails(string StockTransferNo, int cmpid)
        {
            var StockDetails = new InterDepartmentStockDetails();
            var StockMaster = WYNKContext.StockMaster.Where(x => x.DocumentNumber == StockTransferNo && x.CMPID == cmpid).FirstOrDefault();
            var DrugMaster = WYNKContext.DrugMaster.Where(x=>x.Cmpid == cmpid).ToList();
            var DrugGroup = WYNKContext.DrugGroup.ToList();
            var StockTran = WYNKContext.StockTran.ToList();
            StockDetails.SenderstoreId = StockMaster.StoreID;
            StockDetails.Senderdatetime = StockMaster.CreatedUTC;
            StockDetails.SenderUserId = StockMaster.CreatedBy;
            StockDetails.SentSmid = StockMaster.SMID;
            StockDetails.ItemDetails = (from ST in StockTran.Where(x => x.SMID == StockMaster.RandomUniqueID)
                                        select new StockTransferItemDetail
                                        {
                                            ItemId = ST.ItemID,
                                            DrugName = DrugMaster.Where(x => x.ID == ST.ItemID).Select(x => x.Brand).FirstOrDefault(),
                                            GenericName = DrugGroup.Where(dg => dg.ID == DrugMaster.Where(y => y.ID == ST.ItemID).Select(y => y.GenericName).FirstOrDefault()).Select(dg =>dg.Description).FirstOrDefault(),
                                            UOM =  DrugMaster.Where(y => y.ID == ST.ItemID).Select(y => y.UOM).FirstOrDefault(),
                                            TotalQuantity = Convert.ToInt32(ST.ItemQty),
                                            SMID = ST.SMID,
                                            STID = ST.RandomUniqueID,
                                            IsSerial = TrackingType(ST.ItemID),
                                            ItemReceivedBatchDetails = TrackingType(ST.ItemID) == false ? GetReceivedBatchDetails(ST.SMID, ST.RandomUniqueID, ST.ItemID) : null,
                                            ItemReceivedSerialDetails = TrackingType(ST.ItemID) == true ? GetReceivedSerialDetails(ST.SMID, ST.STID, ST.ItemID, cmpid, StockMaster.StoreID, StockMaster.ReceiverStoreID) : null,
                                            ItemReceivedOtherDetails = TrackingType(ST.ItemID) == null ? GetReceivedOtherDetails(Convert.ToInt32(ST.ItemQty)):null,
                                        }).ToList();

            StockDetails.fullItemsReceivedDetails = new List<fullItemsReceivedDetail>();
            foreach (var item in StockDetails.ItemDetails.ToList())
            {

               if(item.ItemReceivedBatchDetails != null) 
                {
                    foreach (var IB in item.ItemReceivedBatchDetails.ToList())
                    {
                        StockDetails.fullItemsReceivedDetails.Add(new fullItemsReceivedDetail()
                        {
                            ItemId = item.ItemId,
                            DrugName = item.DrugName,
                            GenericName = item.GenericName,
                            UOM = item.UOM,
                            SMID = item.SMID,
                            STID = item.STID,
                            IsSerial = item.IsSerial,
                            BatchSerial = IB.ItemBatchNo,
                            ItemBatchID = IB.ItemBatchID,
                            SentQuantity = IB.SentQuantity,
                            RecQuantity = IB.SentQuantity,
                            Difference=0,
                            BatchExpiry = IB.BatchExpiry,
                            Reasons = IB.Reasons,
                        });
                    }
                }

                if (item.ItemReceivedSerialDetails !=null)
                {
                    foreach (var IS in item.ItemReceivedSerialDetails.ToList())
                    {
                        StockDetails.fullItemsReceivedDetails.Add(new fullItemsReceivedDetail()
                        {
                            ItemId = item.ItemId,
                            DrugName = item.DrugName,
                            GenericName = item.GenericName,
                            SMID = item.SMID,
                            STID = item.STID,
                            IsSerial = item.IsSerial,
                            BatchSerial = IS.SerialNo,
                            BatchExpiry = IS.ExpiryDate,
                            SentQuantity = 1,
                            RecQuantity = 1,
                            Difference = 0,
                            Reasons = IS.Reasons,
                        });
                    }
                }


                if (item.ItemReceivedOtherDetails != null)
                {
                    foreach (var IO in item.ItemReceivedOtherDetails.ToList())
                    {
                        StockDetails.fullItemsReceivedDetails.Add(new fullItemsReceivedDetail()
                        {
                            ItemId = item.ItemId,
                            DrugName = item.DrugName,
                            GenericName = item.GenericName,
                            SMID = item.SMID,
                            STID = item.STID,
                            IsSerial = item.IsSerial,
                            SentQuantity = Convert.ToInt32(IO.SentQty),
                            RecQuantity = IO.SentQty,
                            Difference = 0,
                            Reasons = "",
                        });
                    }
                }
            }
            return StockDetails;
        }
        public dynamic GetRecStockTransferDetails(string StockTransferNo, int cmpid, string GMT)
        {
            var StockDetails = new ViewRecStockDetails();
            TimeSpan ts = TimeSpan.Parse(GMT);
            var StockMaster = WYNKContext.StockMaster.Where(x => x.DocumentNumber == StockTransferNo && x.CMPID == cmpid).FirstOrDefault();
            var DrugMaster = WYNKContext.DrugMaster.Where(x => x.Cmpid == cmpid).ToList();
            var DrugGroup = WYNKContext.DrugGroup.ToList();
            var StockTran = WYNKContext.StockTran.ToList();
            StockDetails.Recdatetime = StockMaster.DocumentDate + ts;
            StockDetails.RecName = StockMaster.ISSrecdby;
            StockDetails.RunningNoStock = StockMaster.DocumentNumber;
            StockDetails.CompanyDetails = CMPSContext.Company.Where(x => x.CmpID == cmpid).FirstOrDefault();

            StockDetails.ItemDetails = (from ST in StockTran.Where(x => x.SMID == StockMaster.RandomUniqueID)
                                        select new StockTransferItemDetail
                                        {
                                            ItemId = ST.ItemID,
                                            DrugName = DrugMaster.Where(x => x.ID == ST.ItemID).Select(x => x.Brand).FirstOrDefault(),
                                            GenericName = DrugGroup.Where(dg => dg.ID == DrugMaster.Where(y => y.ID == ST.ItemID).Select(y => y.GenericName).FirstOrDefault()).Select(dg => dg.Description).FirstOrDefault(),
                                            TotalQuantity = Convert.ToInt32(ST.ItemQty),
                                            SMID = ST.SMID,
                                            STID = ST.RandomUniqueID,
                                            IsSerial = TrackingType(ST.ItemID),
                                            ItemReceivedBatchDetails = TrackingType(ST.ItemID) == false ? GetReceivedBatchDetails(ST.SMID, ST.RandomUniqueID, ST.ItemID) : null,
                                            ItemReceivedSerialDetails = TrackingType(ST.ItemID) == true ? GetReceivedSerialDetails(ST.SMID, ST.STID, ST.ItemID, cmpid, StockMaster.StoreID, StockMaster.ReceiverStoreID) : null,
                                            ItemReceivedOtherDetails = TrackingType(ST.ItemID) == null ? GetReceivedOtherDetails(Convert.ToInt32(ST.ItemQty)) : null,
                                        }).ToList();

            StockDetails.fullItemsReceivedDetails = new List<fullItemsReceivedDetail>();

            foreach (var item in StockDetails.ItemDetails.ToList())
            {

                if (item.ItemReceivedBatchDetails != null)
                {
                    foreach (var IB in item.ItemReceivedBatchDetails.ToList())
                    {
                        StockDetails.fullItemsReceivedDetails.Add(new fullItemsReceivedDetail()
                        {
                            ItemId = item.ItemId,
                            DrugName = item.DrugName,
                            GenericName = item.GenericName,
                            SMID = item.SMID,
                            STID = item.STID,
                            IsSerial = item.IsSerial,
                            BatchSerial = IB.ItemBatchNo,
                            ItemBatchID = IB.ItemBatchID,
                            SentQuantity = IB.SentQuantity,
                            RecQuantity = IB.SentQuantity,
                            Difference = 0,
                            BatchExpiry = IB.BatchExpiry,
                            Reasons = IB.Reasons,
                        });
                    }
                }

                if (item.ItemReceivedSerialDetails != null)
                {
                    foreach (var IS in item.ItemReceivedSerialDetails.ToList())
                    {
                        StockDetails.fullItemsReceivedDetails.Add(new fullItemsReceivedDetail()
                        {
                            ItemId = item.ItemId,
                            DrugName = item.DrugName,
                            GenericName = item.GenericName,
                            SMID = item.SMID,
                            STID = item.STID,
                            IsSerial = item.IsSerial,
                            BatchSerial = IS.SerialNo,
                            BatchExpiry = IS.ExpiryDate,
                            SentQuantity = 1,
                            RecQuantity = 1,
                            Difference = 0,
                            Reasons = IS.Reasons,
                        });
                    }
                }


                if (item.ItemReceivedOtherDetails != null)
                {
                    foreach (var IO in item.ItemReceivedOtherDetails.ToList())
                    {
                        StockDetails.fullItemsReceivedDetails.Add(new fullItemsReceivedDetail()
                        {
                            ItemId = item.ItemId,
                            DrugName = item.DrugName,
                            GenericName = item.GenericName,
                            SMID = item.SMID,
                            STID = item.STID,
                            IsSerial = item.IsSerial,
                            SentQuantity = Convert.ToInt32(IO.SentQty),
                            RecQuantity = IO.SentQty,
                            Difference = 0,
                            Reasons = "",
                        });
                    }
                }
            }

            return StockDetails;
        }
        private ICollection<ReceivedBatchDetail> GetReceivedBatchDetails(string stockMasterId, string sTID, int itemID)
        {
            var ItemBatchtrans = WYNKContext.ItemBatchTrans.ToList();
            var res = (from re in ItemBatchtrans.Where(x => x.SMID == stockMasterId && x.STID == sTID && x.ItemID == itemID)
                       select new ReceivedBatchDetail
                       {
                           ItemBatchID = re.ItemBatchID,
                           ItemBatchNo = re.ItemBatchNumber,
                           SentQuantity = Convert.ToInt32(re.ItemBatchTransactedQty),
                           BatchExpiry = re.ItemBatchExpiry,
                       }).ToList();
            return res;
        }
        private ICollection<ReceivedSerialDetail> GetReceivedSerialDetails(string stockMasterId, long sTID, int itemID,int cmpId, int supplierStoreId, int? ReceiverStoreID)
        {
            var StockRec = WYNKContext.StockMaster.Where(x => x.RandomUniqueID == stockMasterId && x.CMPID == cmpId && x.StoreID == supplierStoreId && x.ReceiverStoreID == ReceiverStoreID).FirstOrDefault();
            var ItemSerial = WYNKContext.ItemSerial.Where(x=>x.cmpID == cmpId).ToList();
            var res = (from IT in ItemSerial.Where(x => x.GRNNo == StockRec.DocumentNumber && x.StoreID == supplierStoreId && x.ItemID == itemID)
                       select new ReceivedSerialDetail
                       {
                           SerialNo = IT.SerialNo,
                           ExpiryDate = IT.ExpiryDate,
                       }).ToList();
            return res;
        }
        private List<ReceivedOtherDetail> GetReceivedOtherDetails(int qty)
        {
            var ReceivedOtherDetail = new List<ReceivedOtherDetail>();
            var res = new ReceivedOtherDetail
                       {
                        SentQty = qty,
                        Difference = 0,
                        Recqty = 0,
                        Reasons = " ",
                       };
            ReceivedOtherDetail.Add(res);
            return ReceivedOtherDetail;
        }
        public dynamic AddReceivedStockDetails(InterDepartmentStockDetails AddStock)
        {
            using (var dbContextTransaction = WYNKContext.Database.BeginTransaction())
            {

                try
                {
                    var SenderstoreId = AddStock.SenderstoreId;
                    var SenderUserId = AddStock.SenderUserId;
                    var Senderdatetime = AddStock.Senderdatetime;

                    var TransactionID = AddStock.TransactionID;
                    var Cmpid = AddStock.cmpid;
                    var createdby = AddStock.CreatedBy;
                    var CurrentMonth = DateTime.Now.Month;
                    var DrugMaster = WYNKContext.DrugMaster.Where(x => x.Cmpid == AddStock.cmpid).ToList();
                    if (AddStock.fullItemsReceivedDetails.Count >= 1)
                    {
                        var Fyear = Convert.ToString(WYNKContext.FinancialYear.Where(x => x.FYFrom <= Convert.ToDateTime(DateTime.Now.ToString("yyyy-MM-dd")) && x.FYTo >= Convert.ToDateTime(DateTime.Now.ToString("yyyy-MM-dd")) && x.CMPID == AddStock.cmpid && x.IsActive == true).Select(x => x.ID).FirstOrDefault());

                        var stockmas = AddBilling.AddstockMaster1(AddStock.RunningNoStock, Convert.ToDateTime(AddStock.Recdatetime), AddStock.storeId, null, 0, TransactionID, CMPSContext.TransactionType.Where(x => x.TransactionID == AddStock.TransactionID).Select(x => x.Rec_Issue_type).FirstOrDefault(), AddStock.cmpid, createdby, Fyear);
                        stockmas.ISSrecdby = AddStock.RecName;
                        WYNKContext.StockMaster.Add(stockmas);
                        WYNKContext.SaveChanges();

                        foreach (var item in AddStock.fullItemsReceivedDetails.ToList())
                        {
                            var Uom = CMPSContext.uommaster.Where(u => u.Description == DrugMaster.Where(x => x.ID == item.ItemId).Select(x => x.UOM).FirstOrDefault()).Select(x => x.id).FirstOrDefault();
                            if (item.IsSerial == false)
                            {
                             
                                if (item.Difference != 0 && item.Difference != null)
                                {
                                    var itembatchDiff = new itembatchdiff();
                                    itembatchDiff.Cmpid = Cmpid;
                                    itembatchDiff.Smid = stockmas.RandomUniqueID;
                                    itembatchDiff.Itemid = item.ItemId;
                                    itembatchDiff.ItembatchId = item.ItemBatchID;
                                    itembatchDiff.itembatchno = item.BatchSerial;
                                    itembatchDiff.Diffquantity = Convert.ToInt32(item.Difference);
                                    itembatchDiff.reasons = item.Reasons;
                                    itembatchDiff.issuestoreid = Convert.ToInt32(SenderstoreId);
                                    itembatchDiff.issueuserid = Convert.ToInt32(SenderUserId);
                                    itembatchDiff.issuedateandtime = Convert.ToDateTime(Senderdatetime);
                                    itembatchDiff.recstoreid = AddStock.storeId;
                                    itembatchDiff.recuserid = AddStock.CreatedBy;
                                    itembatchDiff.recdateandtime = DateTime.Now;
                                    WYNKContext.itembatchdiff.Add(itembatchDiff);
                                    WYNKContext.SaveChanges();
                                }

                                    if (item.RecQuantity > 0)
                                    {
                                        var ItemBatch = WYNKContext.ItemBatch.Where(ib => ib.ItemID == item.ItemId && ib.ItemBatchNumber == item.BatchSerial && ib.StoreID == AddStock.storeId && ib.ItemBatchExpiry == item.BatchExpiry).FirstOrDefault();
                                        if (ItemBatch != null)
                                        {
                                            /*If already coming batch exist means  */

                                            ItemBatch.ItemBatchQty = ItemBatch.ItemBatchQty + Convert.ToDecimal(item.RecQuantity);
                                            ItemBatch.ItemBatchBalnceQty = ItemBatch.ItemBatchBalnceQty + Convert.ToDecimal(item.RecQuantity);
                                            ItemBatch.UpdatedBy = createdby;
                                            ItemBatch.UpdatedUTC = DateTime.UtcNow;
                                            WYNKContext.ItemBatch.UpdateRange(ItemBatch);
                                            WYNKContext.SaveChanges();
                                            var ItemBalance = WYNKContext.ItemBalance.Where(x => x.ItemID == item.ItemId && x.FYear == Convert.ToInt32(Fyear) && x.StoreID == AddStock.storeId && x.CmpID == AddStock.cmpid).FirstOrDefault();
                                            if (ItemBalance != null)
                                            {
                                                switch (CurrentMonth)
                                                {
                                                    case 1:
                                                        ItemBalance.Rec01 = ItemBalance.Rec01 + Convert.ToDecimal(item.RecQuantity);
                                                        ItemBalance.ClosingBalance = ItemBalance.ClosingBalance + Convert.ToDecimal(item.RecQuantity);
                                                        WYNKContext.ItemBalance.UpdateRange(ItemBalance);
                                                        break;
                                                    case 2:
                                                        ItemBalance.Rec02 = ItemBalance.Iss02 + Convert.ToDecimal(item.RecQuantity);
                                                        ItemBalance.ClosingBalance = ItemBalance.ClosingBalance + Convert.ToDecimal(item.RecQuantity);
                                                        WYNKContext.ItemBalance.UpdateRange(ItemBalance);
                                                        break;
                                                    case 3:
                                                        ItemBalance.Rec03 = ItemBalance.Iss03 + Convert.ToDecimal(item.RecQuantity);
                                                        ItemBalance.ClosingBalance = ItemBalance.ClosingBalance + Convert.ToDecimal(item.RecQuantity);
                                                        WYNKContext.ItemBalance.UpdateRange(ItemBalance);
                                                        break;
                                                    case 4:
                                                        ItemBalance.Rec04 = ItemBalance.Rec04 + Convert.ToDecimal(item.RecQuantity);
                                                        ItemBalance.ClosingBalance = ItemBalance.ClosingBalance + Convert.ToDecimal(item.RecQuantity);
                                                        WYNKContext.ItemBalance.UpdateRange(ItemBalance);
                                                        break;
                                                    case 5:
                                                        ItemBalance.Rec05 = ItemBalance.Rec05 + Convert.ToDecimal(item.RecQuantity);
                                                        ItemBalance.ClosingBalance = ItemBalance.ClosingBalance + Convert.ToDecimal(item.RecQuantity);
                                                        WYNKContext.ItemBalance.UpdateRange(ItemBalance);
                                                        break;
                                                    case 6:
                                                        ItemBalance.Rec06 = ItemBalance.Rec06 + Convert.ToDecimal(item.RecQuantity);
                                                        ItemBalance.ClosingBalance = ItemBalance.ClosingBalance + Convert.ToDecimal(item.RecQuantity);
                                                        WYNKContext.ItemBalance.UpdateRange(ItemBalance);
                                                        break;
                                                    case 7:
                                                        ItemBalance.Rec07 = ItemBalance.Rec07 + Convert.ToDecimal(item.RecQuantity);
                                                        ItemBalance.ClosingBalance = ItemBalance.ClosingBalance + Convert.ToDecimal(item.RecQuantity);
                                                        WYNKContext.ItemBalance.UpdateRange(ItemBalance);
                                                        break;
                                                    case 8:
                                                        ItemBalance.Rec08 = ItemBalance.Rec08 + Convert.ToDecimal(item.RecQuantity);
                                                        ItemBalance.ClosingBalance = ItemBalance.ClosingBalance + Convert.ToDecimal(item.RecQuantity);
                                                        WYNKContext.ItemBalance.UpdateRange(ItemBalance);
                                                        break;
                                                    case 9:
                                                        ItemBalance.Rec09 = ItemBalance.Rec09 + Convert.ToDecimal(item.RecQuantity);
                                                        ItemBalance.ClosingBalance = ItemBalance.ClosingBalance + Convert.ToDecimal(item.RecQuantity);
                                                        WYNKContext.ItemBalance.UpdateRange(ItemBalance);
                                                        break;
                                                    case 10:
                                                        ItemBalance.Rec10 = ItemBalance.Rec10 + Convert.ToDecimal(item.RecQuantity);
                                                        ItemBalance.ClosingBalance = ItemBalance.ClosingBalance + Convert.ToDecimal(item.RecQuantity);
                                                        WYNKContext.ItemBalance.UpdateRange(ItemBalance);
                                                        break;
                                                    case 11:
                                                        ItemBalance.Rec11 = ItemBalance.Rec11 + Convert.ToDecimal(item.RecQuantity);
                                                        ItemBalance.ClosingBalance = ItemBalance.ClosingBalance + Convert.ToDecimal(item.RecQuantity);
                                                        WYNKContext.ItemBalance.UpdateRange(ItemBalance);
                                                        break;
                                                    case 12:
                                                        ItemBalance.Rec12 = ItemBalance.Rec12 + Convert.ToDecimal(item.RecQuantity);
                                                        ItemBalance.ClosingBalance = ItemBalance.ClosingBalance + Convert.ToDecimal(item.RecQuantity);
                                                        WYNKContext.ItemBalance.UpdateRange(ItemBalance);
                                                        break;
                                                }
                                            }
                                            else
                                            {
                                                var ItemBala = new ItemBalance();
                                                switch (CurrentMonth)
                                                {

                                                    case 1:
                                                        ItemBala.Rec01 = Convert.ToDecimal(item.RecQuantity);
                                                        break;
                                                    case 2:
                                                        ItemBala.Rec02 = Convert.ToDecimal(item.RecQuantity);
                                                        break;
                                                    case 3:
                                                        ItemBala.Rec03 = Convert.ToDecimal(item.RecQuantity);
                                                        break;
                                                    case 4:
                                                        ItemBala.Rec04 = Convert.ToDecimal(item.RecQuantity);
                                                        break;
                                                    case 5:
                                                        ItemBala.Rec05 = Convert.ToDecimal(item.RecQuantity);
                                                        break;
                                                    case 6:
                                                        ItemBala.Rec06 = Convert.ToDecimal(item.RecQuantity);
                                                        break;
                                                    case 7:
                                                        ItemBala.Rec07 = Convert.ToDecimal(item.RecQuantity);
                                                        break;
                                                    case 8:
                                                        ItemBala.Rec08 = Convert.ToDecimal(item.RecQuantity);
                                                        break;
                                                    case 9:
                                                        ItemBala.Rec09 = Convert.ToDecimal(item.RecQuantity);
                                                        break;
                                                    case 10:
                                                        ItemBala.Rec10 = Convert.ToDecimal(item.RecQuantity);
                                                        break;
                                                    case 11:
                                                        ItemBala.Rec11 = Convert.ToDecimal(item.RecQuantity);
                                                        break;
                                                    case 12:
                                                        ItemBala.Rec12 = Convert.ToDecimal(item.RecQuantity);
                                                        break;
                                                }
                                                ItemBala.Iss01 = 0;
                                                ItemBala.Iss02 = 0;
                                                ItemBala.Iss03 = 0;
                                                ItemBala.Iss04 = 0;
                                                ItemBala.Iss05 = 0;
                                                ItemBala.Iss06 = 0;
                                                ItemBala.Iss07 = 0;
                                                ItemBala.Iss08 = 0;
                                                ItemBala.Iss09 = 0;
                                                ItemBala.Iss10 = 0;
                                                ItemBala.Iss11 = 0;
                                                ItemBala.Iss12 = 0;
                                                ItemBala.UOMID = Uom;
                                                ItemBala.FYear = Convert.ToInt32(Fyear);
                                                ItemBala.OpeningBalance = 0;
                                                ItemBala.StoreID = AddStock.storeId;
                                                ItemBala.ClosingBalance = Convert.ToDecimal(item.RecQuantity);
                                                ItemBala.CreatedBy = createdby;
                                                ItemBala.CreatedUTC = DateTime.UtcNow;
                                                ItemBala.CmpID = Cmpid;
                                                WYNKContext.ItemBalance.Add(ItemBala);
                                            }

                                            WYNKContext.SaveChanges();
                                            var StockTrans = WYNKContext.StockTran.Where(x => x.SMID == stockmas.RandomUniqueID && x.ItemID == item.ItemId).FirstOrDefault();
                                            if (StockTrans == null)
                                            {
                                                var stockTran = new StockTran();
                                                stockTran.RandomUniqueID = PasswordEncodeandDecode.GetRandomnumber();
                                                stockTran.SMID = stockmas.RandomUniqueID;
                                                stockTran.ItemID = item.ItemId;
                                                stockTran.ItemQty = Convert.ToDecimal(item.RecQuantity);
                                                stockTran.CreatedUTC = DateTime.UtcNow;
                                                stockTran.CreatedBy = createdby;

                                                stockTran.ContraSMID = item.SMID;
                                                stockTran.ContraSTID = item.STID;
                                                stockTran.ContraQty = WYNKContext.StockTran.Where(x => x.SMID == item.SMID && x.RandomUniqueID == item.STID && x.ItemID == item.ItemId).Select(x=>x.ItemQty).FirstOrDefault();

                                                WYNKContext.StockTran.Add(stockTran);
                                                WYNKContext.SaveChanges();

                                                var itemBatchTrans = new ItemBatchTrans();
                                                itemBatchTrans.RandomUniqueID = PasswordEncodeandDecode.GetRandomnumber();
                                                itemBatchTrans.ItemBatchID = ItemBatch.RandomUniqueID;
                                                itemBatchTrans.TC = TransactionID;
                                                itemBatchTrans.SMID = stockmas.RandomUniqueID;
                                                itemBatchTrans.STID = stockTran.RandomUniqueID;
                                                itemBatchTrans.ItemID = item.ItemId;
                                                itemBatchTrans.ItemBatchNumber = ItemBatch.ItemBatchNumber;
                                                itemBatchTrans.ItemBatchTransactedQty = Convert.ToDecimal(item.RecQuantity);
                                                itemBatchTrans.ItemBatchExpiry = Convert.ToDateTime(item.BatchExpiry);
                                                itemBatchTrans.UOMID = Uom;
                                                itemBatchTrans.ContraItemBatchID = item.ItemBatchID;
                                                itemBatchTrans.CreatedUTC = DateTime.UtcNow;
                                                itemBatchTrans.CreatedBy = createdby;
                                                itemBatchTrans.cmpID = Cmpid;
                                                WYNKContext.ItemBatchTrans.Add(itemBatchTrans);
                                                WYNKContext.SaveChanges();
                                            }
                                            else
                                            {
                                                StockTrans.ItemQty = StockTrans.ItemQty != null ? StockTrans.ItemQty + Convert.ToDecimal(item.RecQuantity) : Convert.ToDecimal(item.RecQuantity);
                                                StockTrans.ContraSMID = item.SMID;
                                                StockTrans.ContraSTID = item.STID;
                                                WYNKContext.StockTran.UpdateRange(StockTrans);
                                                WYNKContext.SaveChanges();


                                                var itemBatchTrans = new ItemBatchTrans();
                                                itemBatchTrans.RandomUniqueID = PasswordEncodeandDecode.GetRandomnumber();
                                                itemBatchTrans.ItemBatchID = ItemBatch.RandomUniqueID;
                                                itemBatchTrans.TC = TransactionID;
                                                itemBatchTrans.SMID = stockmas.RandomUniqueID;
                                                itemBatchTrans.STID = StockTrans.RandomUniqueID;
                                                itemBatchTrans.ItemID = item.ItemId;
                                                itemBatchTrans.ItemBatchNumber = ItemBatch.ItemBatchNumber;
                                                itemBatchTrans.ItemBatchTransactedQty = Convert.ToDecimal(item.RecQuantity);
                                                itemBatchTrans.ItemBatchExpiry = Convert.ToDateTime(item.BatchExpiry);
                                                itemBatchTrans.UOMID = Uom;
                                                itemBatchTrans.ContraItemBatchID = item.ItemBatchID;
                                                itemBatchTrans.CreatedUTC = DateTime.UtcNow;
                                                itemBatchTrans.CreatedBy = createdby;
                                                itemBatchTrans.cmpID = Cmpid;
                                                WYNKContext.ItemBatchTrans.Add(itemBatchTrans);
                                                WYNKContext.SaveChanges();
                                            }
                                        }
                                        else
                                        {
                                            /*If  batch does not exist means insert batch  */

                                            var itemBatch = new ItemBatch();
                                            itemBatch.RandomUniqueID = PasswordEncodeandDecode.GetRandomnumber();
                                            itemBatch.ItemID = item.ItemId;
                                            itemBatch.ItemBatchNumber = item.BatchSerial;
                                            itemBatch.ItemBatchQty = Convert.ToDecimal(item.RecQuantity);
                                            itemBatch.ItemBatchBalnceQty = Convert.ToDecimal(item.RecQuantity);
                                            itemBatch.ItemBatchExpiry = Convert.ToDateTime(item.BatchExpiry);
                                            itemBatch.StoreID = AddStock.storeId;
                                            itemBatch.CreatedUTC = DateTime.UtcNow;
                                            itemBatch.CreatedBy = createdby;
                                            itemBatch.cmpID = Cmpid;
                                            WYNKContext.ItemBatch.Add(itemBatch);
                                            WYNKContext.SaveChanges();


                                            var ItemBalance = WYNKContext.ItemBalance.Where(x => x.ItemID == item.ItemId && x.FYear == Convert.ToInt32(Fyear) && x.StoreID == AddStock.storeId && x.CmpID == AddStock.cmpid).FirstOrDefault();
                                            if (ItemBalance != null)
                                            {

                                                switch (CurrentMonth)
                                                {
                                                    case 1:
                                                        ItemBalance.Rec01 = ItemBalance.Rec01 + Convert.ToDecimal(item.RecQuantity);
                                                        ItemBalance.ClosingBalance = ItemBalance.ClosingBalance + Convert.ToDecimal(item.RecQuantity);
                                                        WYNKContext.ItemBalance.UpdateRange(ItemBalance);
                                                        break;
                                                    case 2:
                                                        ItemBalance.Rec02 = ItemBalance.Iss02 + Convert.ToDecimal(item.RecQuantity);
                                                        ItemBalance.ClosingBalance = ItemBalance.ClosingBalance + Convert.ToDecimal(item.RecQuantity);
                                                        WYNKContext.ItemBalance.UpdateRange(ItemBalance);
                                                        break;
                                                    case 3:
                                                        ItemBalance.Rec03 = ItemBalance.Iss03 + Convert.ToDecimal(item.RecQuantity);
                                                        ItemBalance.ClosingBalance = ItemBalance.ClosingBalance + Convert.ToDecimal(item.RecQuantity);
                                                        WYNKContext.ItemBalance.UpdateRange(ItemBalance);
                                                        break;
                                                    case 4:
                                                        ItemBalance.Rec04 = ItemBalance.Rec04 + Convert.ToDecimal(item.RecQuantity);
                                                        ItemBalance.ClosingBalance = ItemBalance.ClosingBalance + Convert.ToDecimal(item.RecQuantity);
                                                        WYNKContext.ItemBalance.UpdateRange(ItemBalance);
                                                        break;
                                                    case 5:
                                                        ItemBalance.Rec05 = ItemBalance.Rec05 + Convert.ToDecimal(item.RecQuantity);
                                                        ItemBalance.ClosingBalance = ItemBalance.ClosingBalance + Convert.ToDecimal(item.RecQuantity);
                                                        WYNKContext.ItemBalance.UpdateRange(ItemBalance);
                                                        break;
                                                    case 6:
                                                        ItemBalance.Rec06 = ItemBalance.Rec06 + Convert.ToDecimal(item.RecQuantity);
                                                        ItemBalance.ClosingBalance = ItemBalance.ClosingBalance + Convert.ToDecimal(item.RecQuantity);
                                                        WYNKContext.ItemBalance.UpdateRange(ItemBalance);
                                                        break;
                                                    case 7:
                                                        ItemBalance.Rec07 = ItemBalance.Rec07 + Convert.ToDecimal(item.RecQuantity);
                                                        ItemBalance.ClosingBalance = ItemBalance.ClosingBalance + Convert.ToDecimal(item.RecQuantity);
                                                        WYNKContext.ItemBalance.UpdateRange(ItemBalance);
                                                        break;
                                                    case 8:
                                                        ItemBalance.Rec08 = ItemBalance.Rec08 + Convert.ToDecimal(item.RecQuantity);
                                                        ItemBalance.ClosingBalance = ItemBalance.ClosingBalance + Convert.ToDecimal(item.RecQuantity);
                                                        WYNKContext.ItemBalance.UpdateRange(ItemBalance);
                                                        break;
                                                    case 9:
                                                        ItemBalance.Rec09 = ItemBalance.Rec09 + Convert.ToDecimal(item.RecQuantity);
                                                        ItemBalance.ClosingBalance = ItemBalance.ClosingBalance + Convert.ToDecimal(item.RecQuantity);
                                                        WYNKContext.ItemBalance.UpdateRange(ItemBalance);
                                                        break;
                                                    case 10:
                                                        ItemBalance.Rec10 = ItemBalance.Rec10 + Convert.ToDecimal(item.RecQuantity);
                                                        ItemBalance.ClosingBalance = ItemBalance.ClosingBalance + Convert.ToDecimal(item.RecQuantity);
                                                        WYNKContext.ItemBalance.UpdateRange(ItemBalance);
                                                        break;
                                                    case 11:
                                                        ItemBalance.Rec11 = ItemBalance.Rec11 + Convert.ToDecimal(item.RecQuantity);
                                                        ItemBalance.ClosingBalance = ItemBalance.ClosingBalance + Convert.ToDecimal(item.RecQuantity);
                                                        WYNKContext.ItemBalance.UpdateRange(ItemBalance);
                                                        break;
                                                    case 12:
                                                        ItemBalance.Rec12 = ItemBalance.Rec12 + Convert.ToDecimal(item.RecQuantity);
                                                        ItemBalance.ClosingBalance = ItemBalance.ClosingBalance + Convert.ToDecimal(item.RecQuantity);
                                                        WYNKContext.ItemBalance.UpdateRange(ItemBalance);
                                                        break;
                                                }
                                            }
                                            else
                                            {
                                                var ItemBala = new ItemBalance();
                                                switch (CurrentMonth)
                                                {

                                                    case 1:
                                                        ItemBala.Rec01 = Convert.ToDecimal(item.RecQuantity);
                                                        break;
                                                    case 2:
                                                        ItemBala.Rec02 = Convert.ToDecimal(item.RecQuantity);
                                                        break;
                                                    case 3:
                                                        ItemBala.Rec03 = Convert.ToDecimal(item.RecQuantity);
                                                        break;
                                                    case 4:
                                                        ItemBala.Rec04 = Convert.ToDecimal(item.RecQuantity);
                                                        break;
                                                    case 5:
                                                        ItemBala.Rec05 = Convert.ToDecimal(item.RecQuantity);
                                                        break;
                                                    case 6:
                                                        ItemBala.Rec06 = Convert.ToDecimal(item.RecQuantity);
                                                        break;
                                                    case 7:
                                                        ItemBala.Rec07 = Convert.ToDecimal(item.RecQuantity);
                                                        break;
                                                    case 8:
                                                        ItemBala.Rec08 = Convert.ToDecimal(item.RecQuantity);
                                                        break;
                                                    case 9:
                                                        ItemBala.Rec09 = Convert.ToDecimal(item.RecQuantity);
                                                        break;
                                                    case 10:
                                                        ItemBala.Rec10 = Convert.ToDecimal(item.RecQuantity);
                                                        break;
                                                    case 11:
                                                        ItemBala.Rec11 = Convert.ToDecimal(item.RecQuantity);
                                                        break;
                                                    case 12:
                                                        ItemBala.Rec12 = Convert.ToDecimal(item.RecQuantity);
                                                        break;
                                                }
                                                ItemBala.Iss01 = 0;
                                                ItemBala.Iss02 = 0;
                                                ItemBala.Iss03 = 0;
                                                ItemBala.Iss04 = 0;
                                                ItemBala.Iss05 = 0;
                                                ItemBala.Iss06 = 0;
                                                ItemBala.Iss07 = 0;
                                                ItemBala.Iss08 = 0;
                                                ItemBala.Iss09 = 0;
                                                ItemBala.Iss10 = 0;
                                                ItemBala.Iss11 = 0;
                                                ItemBala.Iss12 = 0;
                                                ItemBala.UOMID = Uom;
                                                ItemBala.FYear = Convert.ToInt32(Fyear);
                                                ItemBala.OpeningBalance = 0;
                                                ItemBala.ItemID = item.ItemId;
                                                ItemBala.StoreID = AddStock.storeId;
                                                ItemBala.ClosingBalance = Convert.ToDecimal(item.RecQuantity);
                                                ItemBala.CreatedBy = createdby;
                                                ItemBala.CreatedUTC = DateTime.UtcNow;
                                                ItemBala.CmpID = Cmpid;
                                                WYNKContext.ItemBalance.Add(ItemBala);
                                            }
                                             WYNKContext.SaveChanges();

                                            var StockTrans = WYNKContext.StockTran.Where(x => x.SMID == stockmas.RandomUniqueID && x.ItemID == item.ItemId).FirstOrDefault();
                                            if (StockTrans == null)
                                            {
                                                var stockTran = new StockTran();
                                                stockTran.RandomUniqueID = PasswordEncodeandDecode.GetRandomnumber();
                                                stockTran.SMID = stockmas.RandomUniqueID;
                                                stockTran.ItemID = item.ItemId;
                                                stockTran.ItemQty = Convert.ToDecimal(item.RecQuantity);
                                                stockTran.ContraSMID = item.SMID;
                                                stockTran.ContraSTID = item.STID;
                                                stockTran.ContraQty = WYNKContext.StockTran.Where(x => x.SMID == item.SMID && x.RandomUniqueID == item.STID && x.ItemID == item.ItemId).Select(x => x.ItemQty).FirstOrDefault();
                                                stockTran.CreatedUTC = DateTime.UtcNow;
                                                stockTran.CreatedBy = createdby;
                                                WYNKContext.StockTran.Add(stockTran);
                                                WYNKContext.SaveChanges();

                                                var itemBatchTrans = new ItemBatchTrans();
                                                itemBatchTrans.RandomUniqueID = PasswordEncodeandDecode.GetRandomnumber();
                                                itemBatchTrans.ItemBatchID = itemBatch.RandomUniqueID;
                                                itemBatchTrans.TC = TransactionID;
                                                itemBatchTrans.SMID = stockmas.RandomUniqueID;
                                                itemBatchTrans.STID = stockTran.RandomUniqueID;
                                                itemBatchTrans.ItemID = item.ItemId;
                                                itemBatchTrans.ItemBatchNumber = itemBatch.ItemBatchNumber;
                                                itemBatchTrans.ItemBatchTransactedQty = Convert.ToDecimal(item.RecQuantity);
                                                itemBatchTrans.ItemBatchExpiry = Convert.ToDateTime(item.BatchExpiry);
                                                itemBatchTrans.UOMID = Uom;
                                                itemBatchTrans.ContraItemBatchID = item.ItemBatchID;
                                                itemBatchTrans.CreatedUTC = DateTime.UtcNow;
                                                itemBatchTrans.CreatedBy = createdby;
                                                itemBatchTrans.cmpID = Cmpid;
                                                WYNKContext.ItemBatchTrans.Add(itemBatchTrans);
                                                WYNKContext.SaveChanges();
                                            }
                                            else
                                            {
                                                StockTrans.ItemQty = StockTrans.ItemQty != null ? StockTrans.ItemQty + Convert.ToDecimal(item.RecQuantity) : Convert.ToDecimal(item.RecQuantity);
                                                WYNKContext.StockTran.UpdateRange(StockTrans);
                                                WYNKContext.SaveChanges();


                                                var itemBatchTrans = new ItemBatchTrans();
                                                itemBatchTrans.RandomUniqueID = PasswordEncodeandDecode.GetRandomnumber();
                                                itemBatchTrans.ItemBatchID = itemBatch.RandomUniqueID;
                                                itemBatchTrans.TC = TransactionID;
                                                itemBatchTrans.SMID = stockmas.RandomUniqueID;
                                                itemBatchTrans.STID = StockTrans.RandomUniqueID;
                                                itemBatchTrans.ItemID = item.ItemId;
                                                itemBatchTrans.ItemBatchNumber = itemBatch.ItemBatchNumber;
                                                itemBatchTrans.ItemBatchTransactedQty = Convert.ToDecimal(item.RecQuantity);
                                                itemBatchTrans.ItemBatchExpiry =Convert.ToDateTime(item.BatchExpiry);
                                                itemBatchTrans.UOMID = Uom;
                                                itemBatchTrans.ContraItemBatchID = item.ItemBatchID;
                                                itemBatchTrans.CreatedUTC = DateTime.UtcNow;
                                                itemBatchTrans.CreatedBy = createdby;
                                                itemBatchTrans.cmpID = Cmpid;
                                                WYNKContext.ItemBatchTrans.Add(itemBatchTrans);
                                                WYNKContext.SaveChanges();
                                            }
                                        }
                                    }
                          
                            }
                            else if (item.IsSerial == true)
                            {
                                    if (item.Difference != 0 && item.Difference != null)
                                    {
                                        var itembatchDiff = new itembatchdiff();
                                        itembatchDiff.Cmpid = Cmpid;
                                        itembatchDiff.Smid = stockmas.RandomUniqueID;
                                        itembatchDiff.Itemid = item.ItemId;
                                        itembatchDiff.serialno = item.BatchSerial;
                                        itembatchDiff.Diffquantity = Convert.ToInt32(item.Difference);
                                        itembatchDiff.reasons = item.Reasons;
                                        itembatchDiff.issuestoreid = Convert.ToInt32(SenderstoreId);
                                        itembatchDiff.issueuserid = Convert.ToInt32(SenderUserId);
                                        itembatchDiff.issuedateandtime = Convert.ToDateTime(Senderdatetime);
                                        itembatchDiff.recstoreid = AddStock.storeId;
                                        itembatchDiff.recuserid = AddStock.CreatedBy;
                                        itembatchDiff.recdateandtime = DateTime.Now;
                                        WYNKContext.itembatchdiff.Add(itembatchDiff);
                                        WYNKContext.SaveChanges();
                                     }
                                    if (item.Difference == 0 || item.Difference == null)
                                    {
                                        var ItemSerial = new ItemSerial();
                                        ItemSerial.ItemID = item.ItemId;
                                        ItemSerial.SerialNo = item.BatchSerial;
                                        ItemSerial.GRNNo = AddStock.RunningNoStock;
                                        ItemSerial.TC = TransactionID;
                                        ItemSerial.IsCancelled = false;
                                        ItemSerial.ExpiryDate = item.BatchExpiry;
                                        ItemSerial.StoreID = AddStock.storeId;
                                        ItemSerial.CreatedBy = createdby;
                                        ItemSerial.cmpID = Cmpid;
                                        ItemSerial.CreatedUTC = DateTime.UtcNow;
                                        WYNKContext.ItemSerial.Add(ItemSerial);
                                        WYNKContext.SaveChanges();

                                        var ItemBalance = WYNKContext.ItemBalance.Where(x => x.ItemID == item.ItemId && x.FYear == Convert.ToInt32(Fyear) && x.StoreID == AddStock.storeId && x.CmpID == AddStock.cmpid).FirstOrDefault();
                                        if (ItemBalance != null)
                                        {
                                            switch (CurrentMonth)
                                            {
                                                case 1:
                                                    ItemBalance.Rec01 = ItemBalance.Rec01 + 1;
                                                    ItemBalance.ClosingBalance = ItemBalance.ClosingBalance + 1;
                                                    WYNKContext.ItemBalance.UpdateRange(ItemBalance);
                                                    break;
                                                case 2:
                                                    ItemBalance.Rec02 = ItemBalance.Iss02 + 1;
                                                    ItemBalance.ClosingBalance = ItemBalance.ClosingBalance + 1;
                                                    WYNKContext.ItemBalance.UpdateRange(ItemBalance);
                                                    break;
                                                case 3:
                                                    ItemBalance.Rec03 = ItemBalance.Iss03 + 1;
                                                    ItemBalance.ClosingBalance = ItemBalance.ClosingBalance + 1;
                                                    WYNKContext.ItemBalance.UpdateRange(ItemBalance);
                                                    break;
                                                case 4:
                                                    ItemBalance.Rec04 = ItemBalance.Rec04 + 1;
                                                    ItemBalance.ClosingBalance = ItemBalance.ClosingBalance + 1;
                                                    WYNKContext.ItemBalance.UpdateRange(ItemBalance);
                                                    break;
                                                case 5:
                                                    ItemBalance.Rec05 = ItemBalance.Rec05 + 1;
                                                    ItemBalance.ClosingBalance = ItemBalance.ClosingBalance + 1;
                                                    WYNKContext.ItemBalance.UpdateRange(ItemBalance);
                                                    break;
                                                case 6:
                                                    ItemBalance.Rec06 = ItemBalance.Rec06 + 1;
                                                    ItemBalance.ClosingBalance = ItemBalance.ClosingBalance + 1;
                                                    WYNKContext.ItemBalance.UpdateRange(ItemBalance);
                                                    break;
                                                case 7:
                                                    ItemBalance.Rec07 = ItemBalance.Rec07 + 1;
                                                    ItemBalance.ClosingBalance = ItemBalance.ClosingBalance + 1;
                                                    WYNKContext.ItemBalance.UpdateRange(ItemBalance);
                                                    break;
                                                case 8:
                                                    ItemBalance.Rec08 = ItemBalance.Rec08 + 1;
                                                    ItemBalance.ClosingBalance = ItemBalance.ClosingBalance + 1;
                                                    WYNKContext.ItemBalance.UpdateRange(ItemBalance);
                                                    break;
                                                case 9:
                                                    ItemBalance.Rec09 = ItemBalance.Rec09 + 1;
                                                    ItemBalance.ClosingBalance = ItemBalance.ClosingBalance + 1;
                                                    WYNKContext.ItemBalance.UpdateRange(ItemBalance);
                                                    break;
                                                case 10:
                                                    ItemBalance.Rec10 = ItemBalance.Rec10 + 1;
                                                    ItemBalance.ClosingBalance = ItemBalance.ClosingBalance + 1;
                                                    WYNKContext.ItemBalance.UpdateRange(ItemBalance);
                                                    break;
                                                case 11:
                                                    ItemBalance.Rec11 = ItemBalance.Rec11 + 1;
                                                    ItemBalance.ClosingBalance = ItemBalance.ClosingBalance + 1;
                                                    WYNKContext.ItemBalance.UpdateRange(ItemBalance);
                                                    break;
                                                case 12:
                                                    ItemBalance.Rec12 = ItemBalance.Rec12 + 1;
                                                    ItemBalance.ClosingBalance = ItemBalance.ClosingBalance + 1;
                                                    WYNKContext.ItemBalance.UpdateRange(ItemBalance);
                                                    break;
                                            }
                                        }
                                        else
                                        {
                                            var ItemBala = new ItemBalance();
                                            switch (CurrentMonth)
                                            {

                                                case 1:
                                                    ItemBala.Rec01 = 1;
                                                    break;
                                                case 2:
                                                    ItemBala.Rec02 = 1;
                                                    break;
                                                case 3:
                                                    ItemBala.Rec03 = 1;
                                                    break;
                                                case 4:
                                                    ItemBala.Rec04 = 1;
                                                    break;
                                                case 5:
                                                    ItemBala.Rec05 = 1;
                                                    break;
                                                case 6:
                                                    ItemBala.Rec06 = 1;
                                                    break;
                                                case 7:
                                                    ItemBala.Rec07 = 1;
                                                    break;
                                                case 8:
                                                    ItemBala.Rec08 = 1;
                                                    break;
                                                case 9:
                                                    ItemBala.Rec09 = 1;
                                                    break;
                                                case 10:
                                                    ItemBala.Rec10 = 1;
                                                    break;
                                                case 11:
                                                    ItemBala.Rec11 = 1;
                                                    break;
                                                case 12:
                                                    ItemBala.Rec12 = 1;
                                                    break;
                                            }
                                            ItemBala.Iss01 = 0;
                                            ItemBala.Iss02 = 0;
                                            ItemBala.Iss03 = 0;
                                            ItemBala.Iss04 = 0;
                                            ItemBala.Iss05 = 0;
                                            ItemBala.Iss06 = 0;
                                            ItemBala.Iss07 = 0;
                                            ItemBala.Iss08 = 0;
                                            ItemBala.Iss09 = 0;
                                            ItemBala.Iss10 = 0;
                                            ItemBala.Iss11 = 0;
                                            ItemBala.Iss12 = 0;
                                            ItemBala.UOMID = Uom;
                                            ItemBala.FYear = Convert.ToInt32(Fyear);
                                            ItemBala.OpeningBalance = 0;
                                            ItemBala.ItemID = item.ItemId;
                                            ItemBala.StoreID = AddStock.storeId;
                                            ItemBala.ClosingBalance = 1;
                                            ItemBala.CreatedBy = createdby;
                                            ItemBala.CreatedUTC = DateTime.UtcNow;
                                            ItemBala.CmpID = Cmpid;
                                            WYNKContext.ItemBalance.Add(ItemBala);
                                        }
                                        WYNKContext.SaveChanges();
                                        var StockTrans = WYNKContext.StockTran.Where(x => x.SMID == stockmas.RandomUniqueID && x.ItemID == item.ItemId).FirstOrDefault();
                                        if (StockTrans == null)
                                        {
                                            var stockTran = new StockTran();
                                            stockTran.RandomUniqueID = PasswordEncodeandDecode.GetRandomnumber();
                                            stockTran.SMID = stockmas.RandomUniqueID;
                                            stockTran.ItemID = item.ItemId;
                                            stockTran.ItemQty = 1;
                                            stockTran.ContraSMID = item.SMID;
                                            stockTran.ContraSTID = item.STID;
                                            stockTran.ContraQty = WYNKContext.StockTran.Where(x => x.SMID == item.SMID && x.RandomUniqueID == item.STID && x.ItemID == item.ItemId).Select(x => x.ItemQty).FirstOrDefault();
                                            stockTran.CreatedUTC = DateTime.UtcNow;
                                            stockTran.CreatedBy = createdby;
                                            WYNKContext.StockTran.Add(stockTran);
                                            WYNKContext.SaveChanges();
                                        }
                                        else
                                        {
                                            StockTrans.ItemQty = StockTrans.ItemQty != null ? StockTrans.ItemQty + 1 : 1;
                                            WYNKContext.StockTran.UpdateRange(StockTrans);
                                            WYNKContext.SaveChanges();
                                        }
                                    }
                            }
                            else
                            {
                                    if (item.Difference != 0 && item.Difference != null)
                                    {
                                        var itembatchDiff = new itembatchdiff();
                                        itembatchDiff.Cmpid = Cmpid;
                                        itembatchDiff.Smid = stockmas.RandomUniqueID;
                                        itembatchDiff.Itemid = item.ItemId;
                                        itembatchDiff.Diffquantity = Convert.ToInt32(item.Difference);
                                        itembatchDiff.reasons = item.Reasons;
                                        itembatchDiff.issuestoreid = Convert.ToInt32(SenderstoreId);
                                        itembatchDiff.issueuserid = Convert.ToInt32(SenderUserId);
                                        itembatchDiff.issuedateandtime = Convert.ToDateTime(Senderdatetime);
                                        itembatchDiff.recstoreid = AddStock.storeId;
                                        itembatchDiff.recuserid = AddStock.CreatedBy;
                                        itembatchDiff.recdateandtime = DateTime.Now;
                                        WYNKContext.itembatchdiff.Add(itembatchDiff);
                                        WYNKContext.SaveChanges();
                                    }
                                    if (item.RecQuantity > 0)
                                    {
                                        var ItemBalance = WYNKContext.ItemBalance.Where(x => x.ItemID == item.ItemId && x.FYear == Convert.ToInt32(Fyear) && x.StoreID == AddStock.storeId && x.CmpID == AddStock.cmpid).FirstOrDefault();
                                        if (ItemBalance != null)
                                        {
                                            switch (CurrentMonth)
                                            {
                                                case 1:
                                                    ItemBalance.Rec01 = ItemBalance.Rec01 + Convert.ToDecimal(item.RecQuantity);
                                                    ItemBalance.ClosingBalance = ItemBalance.ClosingBalance + Convert.ToDecimal(item.RecQuantity);
                                                    WYNKContext.ItemBalance.UpdateRange(ItemBalance);
                                                    break;
                                                case 2:
                                                    ItemBalance.Rec02 = ItemBalance.Iss02 + Convert.ToDecimal(item.RecQuantity);
                                                    ItemBalance.ClosingBalance = ItemBalance.ClosingBalance + Convert.ToDecimal(item.RecQuantity);
                                                    WYNKContext.ItemBalance.UpdateRange(ItemBalance);
                                                    break;
                                                case 3:
                                                    ItemBalance.Rec03 = ItemBalance.Iss03 + Convert.ToDecimal(item.RecQuantity);
                                                    ItemBalance.ClosingBalance = ItemBalance.ClosingBalance + Convert.ToDecimal(item.RecQuantity);
                                                    WYNKContext.ItemBalance.UpdateRange(ItemBalance);
                                                    break;
                                                case 4:
                                                    ItemBalance.Rec04 = ItemBalance.Rec04 + Convert.ToDecimal(item.RecQuantity);
                                                    ItemBalance.ClosingBalance = ItemBalance.ClosingBalance + Convert.ToDecimal(item.RecQuantity);
                                                    WYNKContext.ItemBalance.UpdateRange(ItemBalance);
                                                    break;
                                                case 5:
                                                    ItemBalance.Rec05 = ItemBalance.Rec05 + Convert.ToDecimal(item.RecQuantity);
                                                    ItemBalance.ClosingBalance = ItemBalance.ClosingBalance + Convert.ToDecimal(item.RecQuantity);
                                                    WYNKContext.ItemBalance.UpdateRange(ItemBalance);
                                                    break;
                                                case 6:
                                                    ItemBalance.Rec06 = ItemBalance.Rec06 + Convert.ToDecimal(item.RecQuantity);
                                                    ItemBalance.ClosingBalance = ItemBalance.ClosingBalance + Convert.ToDecimal(item.RecQuantity);
                                                    WYNKContext.ItemBalance.UpdateRange(ItemBalance);
                                                    break;
                                                case 7:
                                                    ItemBalance.Rec07 = ItemBalance.Rec07 + Convert.ToDecimal(item.RecQuantity);
                                                    ItemBalance.ClosingBalance = ItemBalance.ClosingBalance + Convert.ToDecimal(item.RecQuantity);
                                                    WYNKContext.ItemBalance.UpdateRange(ItemBalance);
                                                    break;
                                                case 8:
                                                    ItemBalance.Rec08 = ItemBalance.Rec08 + Convert.ToDecimal(item.RecQuantity);
                                                    ItemBalance.ClosingBalance = ItemBalance.ClosingBalance + Convert.ToDecimal(item.RecQuantity);
                                                    WYNKContext.ItemBalance.UpdateRange(ItemBalance);
                                                    break;
                                                case 9:
                                                    ItemBalance.Rec09 = ItemBalance.Rec09 + Convert.ToDecimal(item.RecQuantity);
                                                    ItemBalance.ClosingBalance = ItemBalance.ClosingBalance + Convert.ToDecimal(item.RecQuantity);
                                                    WYNKContext.ItemBalance.UpdateRange(ItemBalance);
                                                    break;
                                                case 10:
                                                    ItemBalance.Rec10 = ItemBalance.Rec10 + Convert.ToDecimal(item.RecQuantity);
                                                    ItemBalance.ClosingBalance = ItemBalance.ClosingBalance + Convert.ToDecimal(item.RecQuantity);
                                                    WYNKContext.ItemBalance.UpdateRange(ItemBalance);
                                                    break;
                                                case 11:
                                                    ItemBalance.Rec11 = ItemBalance.Rec11 + Convert.ToDecimal(item.RecQuantity);
                                                    ItemBalance.ClosingBalance = ItemBalance.ClosingBalance + Convert.ToDecimal(item.RecQuantity);
                                                    WYNKContext.ItemBalance.UpdateRange(ItemBalance);
                                                    break;
                                                case 12:
                                                    ItemBalance.Rec12 = ItemBalance.Rec12 + Convert.ToDecimal(item.RecQuantity);
                                                    ItemBalance.ClosingBalance = ItemBalance.ClosingBalance + Convert.ToDecimal(item.RecQuantity);
                                                    WYNKContext.ItemBalance.UpdateRange(ItemBalance);
                                                    break;
                                            }
                                        }
                                        else
                                        {
                                            var ItemBala = new ItemBalance();
                                            switch (CurrentMonth)
                                            {

                                                case 1:
                                                    ItemBala.Rec01 = Convert.ToDecimal(item.RecQuantity);
                                                    break;
                                                case 2:
                                                    ItemBala.Rec02 = Convert.ToDecimal(item.RecQuantity);
                                                    break;
                                                case 3:
                                                    ItemBala.Rec03 = Convert.ToDecimal(item.RecQuantity);
                                                    break;
                                                case 4:
                                                    ItemBala.Rec04 = Convert.ToDecimal(item.RecQuantity);
                                                    break;
                                                case 5:
                                                    ItemBala.Rec05 = Convert.ToDecimal(item.RecQuantity);
                                                    break;
                                                case 6:
                                                    ItemBala.Rec06 = Convert.ToDecimal(item.RecQuantity);
                                                    break;
                                                case 7:
                                                    ItemBala.Rec07 = Convert.ToDecimal(item.RecQuantity);
                                                    break;
                                                case 8:
                                                    ItemBala.Rec08 = Convert.ToDecimal(item.RecQuantity);
                                                    break;
                                                case 9:
                                                    ItemBala.Rec09 = Convert.ToDecimal(item.RecQuantity);
                                                    break;
                                                case 10:
                                                    ItemBala.Rec10 = Convert.ToDecimal(item.RecQuantity);
                                                    break;
                                                case 11:
                                                    ItemBala.Rec11 = Convert.ToDecimal(item.RecQuantity);
                                                    break;
                                                case 12:
                                                    ItemBala.Rec12 = Convert.ToDecimal(item.RecQuantity);
                                                    break;
                                            }
                                            ItemBala.Iss01 = 0;
                                            ItemBala.Iss02 = 0;
                                            ItemBala.Iss03 = 0;
                                            ItemBala.Iss04 = 0;
                                            ItemBala.Iss05 = 0;
                                            ItemBala.Iss06 = 0;
                                            ItemBala.Iss07 = 0;
                                            ItemBala.Iss08 = 0;
                                            ItemBala.Iss09 = 0;
                                            ItemBala.Iss10 = 0;
                                            ItemBala.Iss11 = 0;
                                            ItemBala.Iss12 = 0;
                                            ItemBala.UOMID = Uom;
                                            ItemBala.FYear = Convert.ToInt32(Fyear);
                                            ItemBala.OpeningBalance = 0;
                                            ItemBala.StoreID = AddStock.storeId;
                                            ItemBala.ItemID = item.ItemId;
                                            ItemBala.ClosingBalance = Convert.ToDecimal(item.RecQuantity);
                                            ItemBala.CreatedBy = createdby;
                                            ItemBala.CreatedUTC = DateTime.UtcNow;
                                            ItemBala.CmpID = Cmpid;
                                            WYNKContext.ItemBalance.Add(ItemBala);
                                            WYNKContext.SaveChanges();
                                        }

                                        var StockTrans = WYNKContext.StockTran.Where(x => x.SMID == stockmas.RandomUniqueID && x.ItemID == item.ItemId).FirstOrDefault();
                                        if (StockTrans == null)
                                        {
                                            var stockTran = new StockTran();
                                            stockTran.RandomUniqueID = PasswordEncodeandDecode.GetRandomnumber();
                                            stockTran.SMID = stockmas.RandomUniqueID;
                                            stockTran.ItemID = item.ItemId;
                                            stockTran.ItemQty = Convert.ToDecimal(item.RecQuantity);
                                            stockTran.ContraSMID = item.SMID;
                                            stockTran.ContraSTID = item.STID;
                                            stockTran.ContraQty = WYNKContext.StockTran.Where(x => x.SMID == item.SMID && x.RandomUniqueID == item.STID && x.ItemID == item.ItemId).Select(x => x.ItemQty).FirstOrDefault();
                                            stockTran.CreatedUTC = DateTime.UtcNow;
                                            stockTran.CreatedBy = createdby;
                                            WYNKContext.StockTran.Add(stockTran);
                                            WYNKContext.SaveChanges();
                                        }
                                        else
                                        {
                                            StockTrans.ItemQty = StockTrans.ItemQty != null ? StockTrans.ItemQty + Convert.ToDecimal(item.RecQuantity) : Convert.ToDecimal(item.RecQuantity);
                                            WYNKContext.StockTran.UpdateRange(StockTrans);
                                             WYNKContext.SaveChanges();
                                         }
                                    }
                            }
                        }

                        var SentStockMaster = WYNKContext.StockMaster.Where(x => x.SMID == AddStock.SentSmid && x.CMPID == AddStock.cmpid).FirstOrDefault();
                        SentStockMaster.ContraSmid = stockmas.SMID;
                        WYNKContext.UpdateRange(SentStockMaster);

                        WYNKContext.SaveChanges();

                        var commonRepos = new CommonRepository(_Wynkcontext, _Cmpscontext);
                        var RunningNumber = commonRepos.GenerateRunningCtrlNoo(AddStock.TransactionID, AddStock.cmpid, "GetRunningNo");
                        if (RunningNumber == AddStock.RunningNoStock)
                        {
                            commonRepos.GenerateRunningCtrlNoo(AddStock.TransactionID, AddStock.cmpid, "UpdateRunningNo");
                        }
                        else
                        {
                            var GetRunningNumber = commonRepos.GenerateRunningCtrlNoo(AddStock.TransactionID, AddStock.cmpid, "GetRunningNo");

                            var stockMaster = WYNKContext.StockMaster.Where(x => x.DocumentNumber == AddStock.RunningNoStock).FirstOrDefault();
                            stockMaster.DocumentNumber = GetRunningNumber;
                            WYNKContext.StockMaster.UpdateRange(stockMaster);
                        }
                        WYNKContext.SaveChanges();
                        dbContextTransaction.Commit();
                        return new
                        {
                            Success = true,
                            Message = "Save SuccessFully",
                            StockReceiptsNo = AddStock.RunningNoStock,
                            CompanyDetails = CMPSContext.Company.Where(x => x.CmpID == AddStock.cmpid).FirstOrDefault(),
                        };
                    }
                }
                catch (Exception ex)
                {
                    dbContextTransaction.Rollback();
                    if (ex.InnerException != null)
                    {
                        ErrorLog oErrorLog = new ErrorLog();
                        oErrorLog.WriteErrorLog("Error", ex.InnerException.Message.ToString());
                        string msg = ex.InnerException.Message;
                        return new { Success = false, Message = msg, grn = AddStock.RunningNoStock };
                    }
                    else
                    {
                        ErrorLog oErrorLog = new ErrorLog();
                        oErrorLog.WriteErrorLog("Error", ex.Message.ToString());
                        return new { Success = false };
                    }
                }
                return new { Success = false };
            }
        }
        public dynamic GetInterDepartmentTransferNo(int InterDepRecNo)
        {
            return (from e in CMPSContext.TransactionType.Where(x => x.TransactionID == InterDepRecNo)
                    select new 
                    {
                        TransValue = e.ContraTransactionid,
                    }).FirstOrDefault();
        }
        private bool? TrackingType(int itemID)
        {
            var DrugMaster = WYNKContext.DrugMaster.ToList();
            var DrugTrackerId = DrugMaster.Where(x => x.ID == itemID).Select(x => x.DrugTracker).FirstOrDefault();
            var res = Enum.GetName(typeof(TrackingType), DrugTrackerId);
            if (res == "SerialNumberBased")
            {
                return true;
            }
            else if (res == "BatchNumberBased")
            {
                return false;
            }
            else
            {
                return null;
            }
        }
    }
}
