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
using TypeLite;

namespace LearnOn.Controllers.Odata
{
    public class NotesController : BaseODataController<Note, NoteViewModel>
    {
        protected override DbSet<Note> Entities => Db.Notes;

        public override SingleResult<NoteViewModel> Get([FromODataUri] int key)
        {
            throw new NotImplementedException();
        }

        protected override Note MapToEntity(NoteViewModel viewModel)
        {
            var user = Db.Users.Where(e => e.UserName == User.Identity.Name).FirstOrDefault();

            var course = Db.Courses.Where(e => e.CourseId == viewModel.CourseId).FirstOrDefault();

            var note = new Note()
            {
                ApplicationUsers = user,
                Course = course,
                Text = viewModel.Text,
                TimeSeconds = viewModel.TimeSeconds
            };
            return note;
        }
    }

    [TsClass]
    public class NoteViewModel
    {
        public int Id { get; set; }
        public int CourseId { get; set; }

        public string CourseName { get; set; }
        public string Text { get; set; }
        public int TimeSeconds { get; set; }
    }
}