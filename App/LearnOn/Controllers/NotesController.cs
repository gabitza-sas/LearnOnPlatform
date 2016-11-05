using LearnOn.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace LearnOn.Controllers
{
    public class NotesController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        
        public ActionResult AddNote()
        {
            //var user = User.Identity.Name;
            using (var context = new LearnOnContext())
            {
                var user = context.Users.Where(e => e.UserName == User.Identity.Name).FirstOrDefault();

                var courseId = 1;

                var course = context.Courses.Where(e => e.CourseId == 1).FirstOrDefault();

                var note = new Note()
                {
                    ApplicationUsers = user,
                    Course = course,
                    Text = "blabla mama are mere",
                    TimeSeconds = 2
                };


                context.Notes.Add(note);
                context.SaveChanges();

            }
            return null;
        }
    }
}