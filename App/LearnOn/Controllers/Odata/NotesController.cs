using LearnOn.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.OData;

namespace LearnOn.Controllers.Odata
{
    public class NotesController : BaseODataController
    {
        [EnableQuery]
        public IQueryable<Note> Get()
        {
            return this.Db.Notes;
        }
    }
}