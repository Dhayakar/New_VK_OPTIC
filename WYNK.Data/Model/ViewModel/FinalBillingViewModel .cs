using System;
using System.Collections.Generic;
using System.Text;

namespace WYNK.Data.Model.ViewModel
{

    public class FinalBillingMaster
    {
        public ICollection<Rprint> Reprint { get; set; }
        public ICollection<ReprintB> ReprintBilling { get; set; }
        public ICollection<ReprintB1> ReprintBilling1 { get; set; }
        public ICollection<paymentRP> paymentReprint { get; set; }
        public ICollection<paymentAdvRP> paymentReprintADV { get; set; }
        public decimal AdvRePrint { get; set; }
        public decimal? InsuranceRePrint { get; set; }

        public ICollection<paymentR> paymentReturn { get; set; }
        public ICollection<billing> billingdetail { get; set; }
        public ICollection<billing1> billingdetail1 { get; set; }
        public ICollection<billing2> billingdetail2 { get; set; }
        public ICollection<Finalpaymenttran> paymenttran1 { get; set; }
        public ICollection<Finalpaymenttran2> paymenttran2 { get; set; }
        public decimal Adv { get; set; }
        public ICollection<invtranID> invtran { get; set; }
        public Payment_Master payment { get; set; }
        public string Companyname { get; set; }
        public GETPatientInsuranceBilgTran GETPatientInsuranceBilgTran { get; set; }
        public ICollection<BillDetailsIP1> BillDetailsIP1 { get; set; }

        public ICollection<AdditemD> AdditemD { get; set; }
        public ICollection<FBillDetailstax> FBillDetailstax { get; set; }
    }
    public class FBillDetailstax
    {



        //////////////////////tax//////////////////////////
        ///
        public int TaxID { get; set; }
        public string TaxDescription { get; set; }
        public string CESSDescription { get; set; }
        public string AdditionalCESSDescription { get; set; }
        public Int16? GST { get; set; }
        public decimal? CESS { get; set; }
        public decimal? AdditionalCESS { get; set; }
        public decimal? CGSTPercentage { get; set; }
        public decimal? SGSTPercentage { get; set; }
        public decimal? IGSTPercentage { get; set; }


    }
    public class AdditemD
    {
        public string ServicesDescription { get; set; }
        public string Description { get; set; }
        public decimal Amount { get; set; }


        public Decimal Discount { get; set; }
        public Decimal DiscountAmount { get; set; }
        public Decimal? GrossAmount { get; set; }
        public Decimal? GSTAmount { get; set; }
        public Decimal? CESSAmount { get; set; }
        public Decimal? AdditionalCESSAmount { get; set; }
        public Decimal? TotalCost { get; set; }
        public int TaxID { get; set; }


        //////////////////////tax//////////////////////////
        public string TaxDescription { get; set; }
        public string CESSDescription { get; set; }
        public string AdditionalCESSDescription { get; set; }
        public Int16? GST { get; set; }
        public decimal? CESS { get; set; }
        public decimal? AdditionalCESS { get; set; }
        public decimal? CGSTPercentage { get; set; }
        public decimal? SGSTPercentage { get; set; }
        public decimal? IGSTPercentage { get; set; }

    }
    public  class GETPatientInsuranceBilgTran
    {
        public int PAINSID { get; set; }
        public decimal AmountAvailed { get; set; }
    }


    public class BillDetailsIP1
    {
        public string Investigation { get; set; }
        public DateTime Date { get; set; }
        public string Name { get; set; }
        public Decimal? Amount { get; set; }
        public int? id { get; set; }
        public string INVPRESNO { get; set; }

    }


    public class paymentAdvRP
    {
        public decimal AdvAmount { get; set; }

    }
    public class Rprint
    {
        public string UIN { get; set; }
        public int CMPID { get; set; }
        public DateTime DateofRegistration { get; set; }
        public string Name { get; set; }
        public string MiddleName { get; set; }
        public string LastName { get; set; }
        
        public string Age { get; set; }
        public DateTime? DateofBirth { get; set; }
        public string Gender { get; set; }
        public string Address1 { get; set; }
        public string Phone { get; set; }
        public string InvoiceNumber { get; set; }
        public DateTime? InvoiceDate { get; set; }

  
    }
    public class ReprintB
    {
        public string Description { get; set; }
        public int OLMID { get; set; }
        public decimal? TotalProductValue { get; set; }
        public decimal? TotalDiscountP { get; set; }
        public decimal? TotalDiscountValue { get; set; }
        public decimal? TotalTaxValue { get; set; }
        public decimal? TotalCGSTTaxValue { get; set; }
        public decimal? TotalSGSTTaxValue { get; set; }
        public decimal? TotalIGSTTaxValue { get; set; }
        public decimal? TotalBillValue { get; set; }
        public decimal? CESSPercentage { get; set; }
        public decimal? AdditionalCESSPercentage { get; set; }
    }
    public class ReprintB1
    {
        public string Description { get; set; }
        public int OLMID { get; set; }
        public decimal? TotalProductValue { get; set; }
        public decimal? TotalDiscountValue { get; set; }
        public decimal? TotalDiscountProduct { get; set; }   
        public decimal? TotalTaxValue { get; set; }
        public decimal? TotalCGSTTaxValue { get; set; }
        public decimal? TotalSGSTTaxValue { get; set; }
        public decimal? TotalIGSTTaxValue { get; set; }
        public decimal? TotalBillValue { get; set; }
        public decimal? CESSPercentage { get; set; }
        public decimal? AdditionalCESSPercentage { get; set; }

        public string CompanyName { get; set; }
        public string CAddress1 { get; set; }
        public string CAddress2 { get; set; }
        public string CAddress3 { get; set; }
        public string CPhone1 { get; set; }
        public string CWebsite { get; set; }
    }
    public class paymentRP
    {
        public string PaymentMode { get; set; }
        public string InstrumentNumber { get; set; }
        public DateTime? Instrumentdate { get; set; }
        public string BankName { get; set; }
        public string BankBranch { get; set; }
        public DateTime? Expirydate { get; set; }
        public decimal Amount { get; set; }

    }
    public class paymentR
    {
        public string PaymentMode { get; set; }
        public string InstrumentNumber { get; set; }
        public DateTime? Instrumentdate { get; set; }
        public string BankName { get; set; }
        public string BankBranch { get; set; }
        public DateTime? Expirydate { get; set; }
        public decimal Amount { get; set; }

    }


    public class invtranID
    {
        public string PaymentFor { get; set;}
        public int PaymentAgainstID { get; set;}
    }

        public class Finalpaymenttran
    {
        public string PaymentFor { get; set; }
        public int PaymentAgainstID   { get; set; }
        public string PaymentMode     { get; set; }
        public string InstrumentNumber{ get; set; }
        public DateTime? Instrumentdate{ get; set; }
        public string BankName        { get; set; }
        public string BankBranch      { get; set; }
        public DateTime? Expirydate    { get; set; }
        public decimal Amount { get; set; }
        public decimal AdvAmount { get; set; }
        public string UIN { get; set; }
        public int PaymentReferenceID { get; set; }

    }
    public class Finalpaymenttran2
    {
        public string PaymentFor { get; set; }
        public int PaymentAgainstID { get; set; }
        public string PaymentMode { get; set; }
        public string InstrumentNumber { get; set; }
        public DateTime? Instrumentdate { get; set; }
        public string BankName { get; set; }
        public string BankBranch { get; set; }
        public DateTime? Expirydate { get; set; }
        public decimal Amount { get; set; }
        public decimal AdvAmount { get; set; }
        public string UIN { get; set; }
        public int PaymentReferenceID { get; set; }
    }
    public class billing
    {
        public string Description { get; set; }
        public int OLMID { get; set; }
        public decimal? TotalProductValue { get; set; }
        public decimal? TotalDiscountP { get; set; }
        public decimal? TotalDiscountValue { get; set; }
        public decimal? TotalTaxValue { get; set; }
        public decimal? TotalCGSTTaxValue { get; set; }
        public decimal? TotalSGSTTaxValue { get; set; }
        public decimal? TotalIGSTTaxValue { get; set; }
        public decimal? TotalBillValue { get; set; }
        public decimal? CESSPercentage { get; set; }
        public decimal? AdditionalCESSPercentage { get; set; }
    }
    public class billing1
    {
        public string Description { get; set; }
        public int OLMID { get; set; }
        public decimal? TotalProductValue { get; set; }
        public decimal? TotalDiscountValue { get; set; }
        public decimal? TotalDiscountProduct { get; set; }
        public decimal? TotalTaxValue { get; set; }
        public decimal? TotalCGSTTaxValue { get; set; }
        public decimal? TotalSGSTTaxValue { get; set; }
        public decimal? TotalIGSTTaxValue { get; set; }
        public decimal? TotalBillValue { get; set; }
        public decimal? CESSPercentage { get; set; }
        public decimal? AdditionalCESSPercentage { get; set; }
    }

    public class billing2
    {
        public string OLMID { get; set; }
        public string Description { get; set; }
        public string lensDescription { get; set; }
        public int PAID { get; set; }
        public decimal? TotalProductValue { get; set; }
        public decimal? TotalDiscountValue { get; set; }
        public decimal? TotalDiscountProduct { get; set; }
        public decimal? TotalTaxValue { get; set; }
        public decimal? TotalCGSTTaxValue { get; set; }
        public decimal? TotalSGSTTaxValue { get; set; }
        public decimal? TotalIGSTTaxValue { get; set; }
        public decimal? TotalBillValue { get; set; }
        public decimal? CESSPercentage { get; set; }
        public decimal? AdditionalCESSPercentage { get; set; }
    }
}
