using LearnOn.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.OData;

namespace LearnOn.Controllers.Odata
{
    public class BaseODataController : ODataController
    {
        protected LearnOnContext Db { get; } = new LearnOnContext();

        protected override void Dispose(bool disposing)
        {
            this.Db.Dispose();
            base.Dispose(disposing);
        }
    }
}