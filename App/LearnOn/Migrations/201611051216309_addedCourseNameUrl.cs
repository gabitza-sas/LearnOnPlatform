namespace LearnOn.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class addedCourseNameUrl : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Courses", "CourseName", c => c.String());
            AddColumn("dbo.Courses", "CourseVideo", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.Courses", "CourseVideo");
            DropColumn("dbo.Courses", "CourseName");
        }
    }
}
