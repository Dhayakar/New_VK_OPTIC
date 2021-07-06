using System;
using System.Collections.Generic;
using System.Text;

namespace WYNK.Data.Model.ViewModel
{
    public class OpticalStockSummaryDataView
    {

        public ICollection<BrandArrays> BrandArrays { get; set; }
        public ICollection<StoreArrays> StoreArrays { get; set; }
        public ICollection<Companycommu> Companycommu { get; set; }
        public ICollection<Stocksummaryarray> Stocksummaryarray { get; set; }
        public ICollection<OpticalStocksummaryarray> OpticalStocksummaryarray { get; set; }
    }

    public class Companycommu
    {
        public string Companyname { get; set; }
        public string Address { get; set; }
        public string Phoneno { get; set; }
        public string Web { get; set; }
        public string Location { get; set; }
    }
    public class StoreArrays
    {
        public string StoreID { get; set; }
        public string StoreName { get; set; }
    }
    public class BrandArrays
    {
        public string BrandID { get; set; }
        public string BrandName { get; set; }

    }
    public class Stocksummaryarray
    {
        public string CmpName { get; set; }
        public string Type { get; set; }
        public string Store { get; set; }
        public string Brand { get; set; }
        public string UOM { get; set; }
        public string Model { get; set; }
        public string Color { get; set; }
        public decimal Recept { get; set; }
        public decimal Issue { get; set; }
        public decimal Openingstock { get; set; }
        public decimal Closingstock { get; set; }
        public int ID { get; set; }
    }
    public class OpticalStocksummaryarray
    {
        public string CmpName { get; set; }
        public string Type { get; set; }
        public string Store { get; set; }
        public string Brand { get; set; }
        public string UOM { get; set; }
        public string Model { get; set; }
        public string Color { get; set; }
        public decimal Receipt { get; set; }
        public decimal Issue { get; set; }
        public decimal Openingstock { get; set; }
        public decimal Closingstock { get; set; }
        public int ID { get; set; }
    }

}
