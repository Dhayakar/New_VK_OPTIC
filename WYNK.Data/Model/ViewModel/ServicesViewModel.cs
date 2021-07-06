using System.Collections.Generic;

namespace WYNK.Data.Model.ViewModel
{
    public class ServicesViewModel
    {
        public int cmpid { get; set; }
        public ICollection<ServicesGridData> ServicesGridData { get; set; }
        public ICollection<serviceDropdown> serviceDropdown { get; set; }
    }
    public class serviceDropdown
    {
        public string Text { get; set; }
        public string Value { get; set; }
    }
    public class ServicesGridData
    {
        public string Parentdesc { get; set; }
        public string Childdesc { get; set; }
        public string insurance { get; set; }
        public string insuranceid { get; set; }
        public string roomid { get; set; }
        public string docid { get; set; }
        public string childid { get; set; }
        public string parentid { get; set; }
        public string room { get; set; }
        public string serviceamt { get; set; }
        public string doctor { get; set; }
        public string percentage { get; set; }
        public string eligibleamt { get; set; }
        public string netamount { get; set; }

}

}
