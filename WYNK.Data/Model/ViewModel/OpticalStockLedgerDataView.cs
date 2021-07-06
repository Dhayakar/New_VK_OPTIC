using System;
using System.Collections.Generic;
using System.Text;

namespace WYNK.Data.Model.ViewModel
{
    public class OpticalStockLedgerDataView
    {
        public ICollection<BrandArray> BrandArray { get; set; }
        public ICollection<StoreArray> StoreArray { get; set; }
        public ICollection<Opticalstockledger> Opticalstockledger { get; set; }
        public ICollection<OpticalstockledgerI> OpticalstockledgerI { get; set; }
        public ICollection<Receipt> Receipt { get; set; }
        public ICollection<Issue> Issue { get; set; }
        public ICollection<Companycomm> Companycomm { get; set; }
    }


    public class Companycomm
    {
        public string Companyname { get; set; }
        public string Address { get; set; }
        public string Phoneno { get; set; }
        public string Web { get; set; }
        public string Location { get; set; }
    }

    public class StoreArray
    {
        public string StoreID { get; set; }
        public string StoreName { get; set; }
    }
    public class BrandArray
    {
        public string BrandID { get; set; }
        public string BrandName { get; set; }

    }

    public class Opticalstockledger
    {
        public string CmpName { get; set; }
        public string DocumentNo { get; set; }
        public DateTime? DocumentDate { get; set; }
        public string DocumentType { get; set; }
        public string Type { get; set; }
        public int TypeID { get; set; }
        public string Store { get; set; }
        public int StoreID { get; set; }
        public string Brand { get; set; }
        public int BrandID { get; set; }
        public string UOM { get; set; }
        public string Model { get; set; }
        public string Color { get; set; }
        public decimal Receipt { get; set; }
        public decimal Issue { get; set; }
        public decimal Openingstock { get; set; }
        public decimal Closingstock { get; set; }
        public int ID { get; set; }
    }
    public class OpticalstockledgerI
    {
        public string CmpName { get; set; }
        public string DocumentNo { get; set; }
        public DateTime? DocumentDate { get; set; }
        public string DocumentType { get; set; }
        public string Type { get; set; }
        public int TypeID { get; set; }
        public string Store { get; set; }
        public int StoreID { get; set; }
        public string Brand { get; set; }
        public int BrandID { get; set; }
        public string UOM { get; set; }
        public string Model { get; set; }
        public string Color { get; set; }
        public decimal Receipt { get; set; }
        public decimal Issue { get; set; }
        public decimal Openingstock { get; set; }
        public decimal Closingstock { get; set; }
        public int ID { get; set; }

    }

    public class Receipt
    {
        public string CmpName { get; set; }
        public string DocumentNo { get; set; }
        public DateTime? DocumentDate { get; set; }
        public string DocumentType { get; set; }
        public string Type { get; set; }
        public int TypeID { get; set; }
        public string Store { get; set; }
        public int StoreID { get; set; }
        public string Brand { get; set; }
        public int BrandID { get; set; }
        public string UOM { get; set; }
        public string Model { get; set; }
        public string Color { get; set; }
        public decimal Recept { get; set; }
        public decimal Issue { get; set; }
        public decimal Openingstock { get; set; }
        public decimal Closingstock { get; set; }
        public int ID { get; set; }
    }
    public class Issue
    {
        public string CmpName { get; set; }
        public string DocumentNo { get; set; }
        public DateTime? DocumentDate { get; set; }
        public string DocumentType { get; set; }
        public string Type { get; set; }
        public int TypeID { get; set; }
        public string Store { get; set; }
        public int StoreID { get; set; }
        public string Brand { get; set; }
        public int BrandID { get; set; }
        public string UOM { get; set; }
        public string Model { get; set; }
        public string Color { get; set; }
        public decimal Receipt { get; set; }
        public decimal Isue { get; set; }
        public decimal Openingstock { get; set; }
        public decimal Closingstock { get; set; }
        public int ID { get; set; }


    }

}
