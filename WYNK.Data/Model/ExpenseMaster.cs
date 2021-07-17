using System;
using System.ComponentModel.DataAnnotations;

namespace WYNK.Data.Model
{
  public  class ExpenseMaster
    {
        [Key]
        public int ID { get; set; }
        public int CMPID { get; set; }
        public string ExpenseDescription { get; set; }
        public string RandomUniqueID { get; set; }
        public DateTime CreatedUTC { get; set; }
        public DateTime? UpdatedUTC { get; set; }
        public int CreatedBY { get; set; }
        public int? UpdatedBY { get; set; }
        public bool IsActive { get; set; }
        public bool IsDeleted { get; set; }
    }
}
