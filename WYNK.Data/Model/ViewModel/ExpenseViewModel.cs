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
        public ICollection<Expesneitemdata> Expesneitemdata { get; set; }
        public ICollection<Payment_Master> PaymentMaster { get; set; }
        public ICollection<Paymentexpesne> Paymentexpesne { get; set; }
        public ICollection<ExpenseMasterUpdatehelpdata> ExpenseMasterUpdatehelpdata { get; set; }
        public ICollection<Expensestatementdata> Expensestatementdata { get; set; }

        public string paidto { get; set; }
        public int Cmpid { get; set; }
        public string OrderDate { get; set; }
        public int Paymenttotalamount { get; set; }
        public int Userid { get; set; }
        public string PaymentNumber { get; set; }
        public int TransactionID { get; set; }
        public decimal orderedamount { get; set; }


        public string Comapnyaddress { get; set; }
        public string Comapnyaddress2 { get; set; }
        public string ComapnyPhone { get; set; }
    }
    public class Paymentexpesne
    {
        public DateTime Date { get; set; }
        public string ID { get; set; }
    }

    public class ExpenseMasterhelpdata
    {
     public int ID { get; set; }
        public string Description { get; set; }
        public string Status { get; set; }
        public decimal Amount { get; set; }
    }

    public class Expensestatementdata
    {
        public int ID { get; set; }
        public string ExpenseDescription { get; set; }
        public string Date { get; set; }
        public string Remarks { get; set; }
        public decimal TotalAmount { get; set; }
    }

    public class ExpenseMasterUpdatehelpdata
    {
        public int ID { get; set; }
        public string Description { get; set; }
        public string Remarks { get; set; }
        public decimal Amount { get; set; }
    }

    public class Expesneitemdata
    {
        public int ID { get; set; }
        public string Expensedescription { get; set; }
        public string Remarks { get; set; }
        public int Amount { get; set; }
    }


}
