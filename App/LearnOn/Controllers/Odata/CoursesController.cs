using LearnOn.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.OData;
using System.Data.Entity;
using System.Web.Http;

namespace LearnOn.Controllers.Odata
{
    public class CoursesController : BaseODataController<Course>
    {
        protected override DbSet<Course> Entities
        {
            get
            {
                return this.Db.Courses;
            }
        }

        public override SingleResult<Course> Get([FromODataUri] int key)
        {
            var result = this.Entities.Where(_ => _.CourseId == key);
            return SingleResult.Create(result);
        }
    }
}