using System;
using System.ComponentModel.DataAnnotations;

namespace WYNK.Data.Model
{
    public class ExpenseTran
    {
        [Key]
        public int ID { get; set; }
        public int CMPID { get; set; }
        public int ExpenseMasterID { get; set; }
        public int RandomUniqueID { get; set; }
        public DateTime ExpenseDate { get; set; }
        public string Paidto { get; set; }
        public string Remarks { get; set; }
        public decimal Amount { get; set; }
        public DateTime CreatedUTC { get; set; }
        public DateTime? UpdatedUTC { get; set; }
        public int CreatedBY { get; set; }
        public int UpdatedBY { get; set; }
    }
}
