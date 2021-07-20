using System;
using System.ComponentModel.DataAnnotations;

namespace WYNK.Data.Model
{
   public class ExpenseTracking
    {
        [Key]
        public int ID { get; set; }
        public int CMPID { get; set; }
        public int ExpenseID { get; set; }
        public decimal NewValue { get; set; }
        public decimal OldValue { get; set; }
        public DateTime ModifiedDate { get; set; }
        public string username { get; set; }
        public string RandomUniqueID { get; set; }
        public DateTime CreatedUTC { get; set; }
        public DateTime? UpdatedUTC { get; set; }
        public int CreatedBY { get; set; }
        public int? UpdatedBY { get; set; }
    }
}
