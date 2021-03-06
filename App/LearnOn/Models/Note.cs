﻿using LearnOn.Controllers.Odata;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;
using TypeLite;

namespace LearnOn.Models
{
    public class Note : IODataEntity
    {
        public int Id { get; set; }

        public ApplicationUser ApplicationUsers { get; set; }

        public Course Course { get; set; }
        public string Text { get; set; }

        public int TimeSeconds { get; set; }
    }
}