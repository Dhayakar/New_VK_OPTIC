using System;
using System.Collections.Generic;
using System.Text;

namespace WYNK.Data.Model.ViewModel
{
   public class PatientQueueViewModel
    {
        public ICollection<RegistrationdatawithMedicalstaff> RegistrationdatawithMedicalstaff { get; set; }
        public ICollection<Patientassigndata> Patientassigndatas { get; set; }
        public ICollection<OptometristHeaderdetails> OptometristHeaderdetails { get; set; }
        public ICollection<Patientdatabasedonoptiometrist> Patientdatabasedonoptiometrist { get; set; }
        public ICollection<Patientdatabasedondoctor> Patientdatabasedondoctor { get; set; }
        public int TotalNewCOuntdata { get; set; }
        public int TotalAwaitingforoptometristCOuntdata { get; set; }
    }

    public class OptometristHeaderdetails
    {
        public string Staff { get; set; }
        public string Count { get; set; }
    }

    public class Patientassigndata
    {
        public int Doctorid { get; set; }

    }
    public class RegistrationdatawithMedicalstaff
    {
        public int TotalCount { get; set; }
        public String Docnames { get; set; }
        public int DoctorID { get; set; }
        public String Assignedto { get; set; }
        public DateTime? Assigneddateandtime { get; set; }
    }
    public class Patientdatabasedondoctor
    {
        public string UIN { get; set; }
        public String PatientName { get; set; }
        public String RegisteredDate { get; set; }
        public string waitngtime { get; set; }
    }
    public class Patientdatabasedonoptiometrist
    {
        public string UIN { get; set; }
        public String PatientName { get; set; }
        public String AssignedDateandTime { get; set; }
        public string Waitingtime { get; set; }
    }
}
