using LearnOn.Controllers.Odata;
using LearnOn.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.OData;
using System.Data.Entity;
using System.Web.Http;

namespace LearnOn.Controllers.Odata
{
    public class NotesController : BaseODataController<Note>
    {
        /*
        protected override DbSet<Note> Entities
        {
            get
            {
                throw new NotImplementedException();
            }
        }

        [EnableQuery]
        public IQueryable<Note> Get()
        {
            return this.Db.Notes;
        }

        public override SingleResult<Note> Get([FromODataUri] int key)
        {
            throw new NotImplementedException();
        }*/
        protected override DbSet<Note> Entities
        {
            get
            {
                throw new NotImplementedException();
            }
        }

        public override SingleResult<Note> Get([FromODataUri] int key)
        {
            throw new NotImplementedException();
        }
    }
}