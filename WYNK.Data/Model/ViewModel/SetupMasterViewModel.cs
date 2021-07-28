﻿using System;
using System.Collections.Generic;
using System.Text;

namespace WYNK.Data.Model.ViewModel
{
    public class SetupMasterViewModel
    {

        public string cmpid { get; set; }
        public string cmpname { get; set; }
        public string cmpaddress { get; set; }
        public string cmpphone { get; set; }
        public string consultinghrs { get; set; }
        public string Language { get; set; }
        public int GAPINTERVAL { get; set; }

        public string roomtime { get; set; }
        public string country { get; set; }
        public string currency { get; set; }
        public string age { get; set; }
        public string Currencycode { get; set; }
        public string Countrycode { get; set; }
        public string UTCOFFSET { get; set; }

        public string FROM { get; set; }
        public string TO { get; set; }
        public string SECTO { get; set; }
        public string SECFROM { get; set; }

        public bool cfa { get; set; }
        public bool rfa { get; set; }
        public bool nfa { get; set; }


        public ICollection<SetupMasterFulldetails> SetupMasterFulldetailsS { get; set; }
        public ICollection<Languagedetauils> Languagedetauils { get; set; }
    }
    public class Languagedetauils
    {
        public string Language { get; set; }
    }

    public class SetupMasterFulldetails
    {

        public string cmp { get; set; }

        public string cfa { get; set; }
        public string nfa { get; set; }
        public string rfa { get; set; }

        public string country { get; set; }
        public string Roomtime { get; set; }
        public string symbol { get; set; }
        public string age { get; set; }

        public string fsfrom { get; set; }
        public string fsto { get; set; }
        public string ssfrom { get; set; }
        public string ssto { get; set; }

        public string fsfromm { get; set; }
        public string fstom { get; set; }
        public string ssfromm { get; set; }
        public string sstom { get; set; }
        public int? gap { get; set; }
        public string ProductImage { get; set; }
    }



}
