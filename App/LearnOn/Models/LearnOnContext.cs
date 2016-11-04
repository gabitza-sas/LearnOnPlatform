using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace LearnOn.Models
{
    public class LearnOnContext : DbContext
    {
        public LearnOnContext()
        : base("LearnOnContext")
        {
        }
        DbSet<Course> Courses { get; set; }
    }
}