using LearnOn.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.OData.Builder;
using System.Web.OData.Extensions;

namespace LearnOn.App_Start
{
    public class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            config.Routes.MapHttpRoute("API Default", "api/{controller}/{id}",
            new { id = RouteParameter.Optional });

            ODataModelBuilder builder = new ODataConventionModelBuilder();
            builder.EntitySet<Course>("Courses");
            builder.EntitySet<Note>("Notes");
            config.MapODataServiceRoute(
                routeName: "ODataRoute",
                routePrefix: "odata",
                model: builder.GetEdmModel());
          config.Count().Filter().OrderBy().Expand().Select().MaxTop(null);
        }


    }
}