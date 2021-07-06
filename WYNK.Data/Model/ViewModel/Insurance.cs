using System;
using System.Collections.Generic;
using System.Text;

namespace WYNK.Data.Model.ViewModel
{ 
    public class InsuranceViewModel
    {
        public Insurance Insurance { get; set; }
        public string ParentDescriptioncity { get; set; }
        public string ParentDescriptionstate { get; set; }
        public string ParentDescriptioncountry { get; set; }
        public int? ParentDescriptionPinCode { get; set; }
    }
}
