using System;
using System.Collections.Generic;
using System.Text;

namespace WYNK.Data.Model.ViewModel
{
  public  class DrugStockSummaryDataView
    {


        public ICollection<Summaryy> Summary { get; set; }//Ledgers
        public ICollection<DrugSerial> DrugSerial { get; set; }
        public ICollection<DrugBatch> DrugBatch { get; set; }
        public ICollection<Ledgers> Ledgers { get; set; }
        public decimal openstock { get; set; }
        public decimal closestock { get; set; }
    }

    public class Ledgers
    {
        public string CmpName { get; set; }
        public DateTime? DocumentDate { get; set; }
        public string DocumentNo { get; set; }//CmpName
        public string DocumentType { get; set; }
        public string Store { get; set; }
        public string Brand { get; set; }
        public string UOM { get; set; }
        public decimal OpeningBalance { get; set; }
        public decimal? Receipt { get; set; }
        public decimal Issue { get; set; }
        public decimal Balance { get; set; }
        public decimal ClosingBalance { get; set; }//Receipt


    }
    public class Summaryy
    {
        public string CmpName { get; set; }
        public string Store { get; set; }
        public string Brand { get; set; }
        public string UOM { get; set; } 
        public string GenericName { get; set; }
        public string DrugGroup { get; set; }
        public decimal OpeningBalance { get; set; }
        public decimal Receipt { get; set; }
        public decimal Issue { get; set; }
        public decimal ClosingBalance { get; set; }
        public int? DrugCtgy { get; set; }
        public int DrugID { get; set; }
    }

    public class DrugSerial
    {

        public string Brand { get; set; }
        public string GenericName { get; set; }
        public string grnno { get; set; }
        public string SerialNo { get; set; }
        public DateTime? ExpiryDt { get; set; }
        public DateTime? grndt { get; set; }
        public string trans { get; set; }

    }

    public class DrugBatch
    {

        public string Brand { get; set; }
        public string GenericName { get; set; }
        public string BatchNo { get; set; }
        public decimal? BatchQty { get; set; }
        public DateTime? ExpiryDt { get; set; }
        public string grnno { get; set; }
        public DateTime grndt { get; set; }
        public string trans { get; set; }

    }
}
