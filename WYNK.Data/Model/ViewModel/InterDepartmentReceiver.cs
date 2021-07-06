using System;
using System.Collections.Generic;
using System.Text;

namespace WYNK.Data.Model.ViewModel
{
    public class InterDepartmentReceiver
    {
        public string StoreName { get; set; }
        public ICollection<ReceivedDetails> ReceivedDetail { get; set; }
    }

    public class ReceivedDetails
    {
        public DateTime Date { get; set; }
        public string StockTransferNo { get; set; }
        public string SentFromStore { get; set; }
        public string StoreKeeper { get; set; }
        public string ReceivedStore { get; set; }
        public string Receivedby { get; set; }
    }

    public class InterDepartmentStockDetails
    {
        public string RecName { get; set; }
        public int CreatedBy { get; set; }
        public int TransactionID { get; set; }
        public int storeId { get; set; }
        public long? SentSmid { get; set; }
        public int? SenderstoreId { get; set; }
        public int? SenderUserId { get; set; }
        public DateTime? Senderdatetime { get; set; }
        public DateTime? Recdatetime { get; set; }
        public int cmpid { get; set; }
        public string RunningNoStock { get; set; }
        public ICollection<StockTransferItemDetail> ItemDetails { get; set; }
        public List<fullItemsReceivedDetail> fullItemsReceivedDetails { get; set; }
    }

    public class fullItemsReceivedDetail 
    {
        public int ItemId { get; set; }
        public string DrugName { get; set; }
        public string GenericName { get; set; }
        public string UOM { get; set; }
        public string SMID { get; set; }
        public string STID { get; set; }
        public bool? IsSerial { get; set; }
        public string BatchSerial { get; set; }
        public string ItemBatchID { get; set; }
        public int SentQuantity { get; set; }
        public int? RecQuantity { get; set; }
        public int? Difference { get; set; }
        public DateTime? BatchExpiry { get; set; }
        public string Reasons { get; set; }
    }

    public class StockTransferItemDetail
    {
        public int ItemId { get; set; }
        public string DrugName { get; set; }
        public string GenericName { get; set; }
        public string UOM { get; set; }
        public int TotalQuantity { get; set; }
        public string SMID { get; set; }
        public string STID { get; set; }
        public bool? IsSerial { get; set; }
        public ICollection<ReceivedBatchDetail> ItemReceivedBatchDetails { get; set; }
        public ICollection<ReceivedSerialDetail> ItemReceivedSerialDetails { get; set; }
        public List<ReceivedOtherDetail> ItemReceivedOtherDetails { get; set; }

    //    public ReceivedOtherDetail ItemReceivedOtherDetails { get; set; }
    }


    public class ReceivedBatchDetail
    {
        public string ItemBatchID { get; set; }
        public string ItemBatchNo { get; set; }
        public int SentQuantity { get; set; }
      //  public int? RecQuantity { get; set; }
        public int? Difference { get; set; }
        public DateTime BatchExpiry { get; set; }
        public string Reasons { get; set; }
    }

    public class ReceivedSerialDetail
    {
        public string SerialNo { get; set; }
        public DateTime? ExpiryDate { get; set; }
        public string Reasons { get; set; }
        public int? Difference { get; set; }

    }



    public class ReceivedOtherDetail
    {
        public string Reasons { get; set; }
        public int? Difference { get; set; }
        public int? SentQty { get; set; }
        public int? Recqty { get; set; }

    }

    public class ViewRecStockDetails
    {
        public DateTime? Recdatetime { get; set; }
        public string RecName { get; set; }
        public string RunningNoStock { get; set; }
        public object CompanyDetails { get; set; }
        public ICollection<StockTransferItemDetail> ItemDetails { get; set; }
        public List<fullItemsReceivedDetail> fullItemsReceivedDetails { get; set; }

    }

}
