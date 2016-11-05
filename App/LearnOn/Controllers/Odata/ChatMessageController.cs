using LearnOn.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.Entity;
using System.Web.Http;
using System.Web.OData;
using TypeLite;

namespace LearnOn.Controllers.Odata
{
    public class ChatMessageController : BaseODataController<ChatMessage, ChatMessageViewModel>
    {
        protected override DbSet<ChatMessage> Entities => this.Db.ChatMessages;

        public override SingleResult<ChatMessageViewModel> Get([FromODataUri] int key)
        {
            return SingleResult.Create(this.MapQuery(this.Entities.Where(_ => _.Id == key)));
        }
    }

    [TsClass]
    public class ChatMessageViewModel
    {
        public int Id { get; set; }
        public string CourseName { get; set; }
        public string UserName { get; set; }
        public string Text { get; set; }
        public DateTime Time { get; set; }
    }
}