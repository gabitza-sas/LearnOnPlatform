using LearnOn.Controllers.Odata;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using TypeLite;

namespace LearnOn.Models
{
    public class ChatMessage : IODataEntity
    {
        public int Id { get; set; }

        public ApplicationUser User { get; set; }

        public Course Course { get; set; }

        public string Text { get; set; }

        public DateTime Time { get; set; }
    }
}