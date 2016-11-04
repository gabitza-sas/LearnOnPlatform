using LearnOn.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.OData;

namespace LearnOn.Controllers.Odata
{
    public class CoursesController : BaseODataController
    {
        [EnableQuery]
        public IQueryable<Course> Get()
        {
            return this.Db.Courses;
        }

    }
}