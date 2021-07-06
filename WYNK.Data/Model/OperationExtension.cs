﻿using System;
using System.Collections.Generic;
using System.Text;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace WYNK.Data.Model
{
    public class OperationExtension
    {
        [Key]


        public int ID { get; set; }
        public int OTID { get; set; }
        public string ICDCODE { get; set; }
        public string SpecialityDescription { get; set; }
        public bool IsDeleted { get; set; }
        public DateTime CreatedUTC { get; set; }
        public DateTime? UpdatedUTC { get; set; }
        public int CreatedBy { get; set; }
        public int? UpdatedBy { get; set; }



    }
}