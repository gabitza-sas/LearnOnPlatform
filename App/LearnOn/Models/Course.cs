using LearnOn.Controllers.Odata;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using TypeLite;

namespace LearnOn.Models
{
    [TsClass]
    public class Course: IODataEntity
    {
        public string CourseName { get; set; }
        public int CourseId { get; set; }

        public string CourseVideo { get; set; }

        public int Id => this.CourseId;
    }
}