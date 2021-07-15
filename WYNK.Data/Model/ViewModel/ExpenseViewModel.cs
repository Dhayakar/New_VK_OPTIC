using System;
using System.Collections.Generic;
using System.Text;

namespace WYNK.Data.Model.ViewModel
{
  public class ExpenseViewModel
    {
        public ExpenseTran Exptran { get; set; }
        public ExpenseMaster ExpMaster { get; set; }
        public ICollection<ExpenseMasterhelpdata> ExpenseMasterhelpdata { get; set; }
    }

    public class ExpenseMasterhelpdata
    {
     public int ID { get; set; }
        public string Description { get; set; }
        public string Status { get; set; }
    }
}
