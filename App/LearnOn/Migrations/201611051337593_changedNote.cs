namespace LearnOn.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class changedNote : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Notes", "TimeSeconds", c => c.Int(nullable: false));
            DropColumn("dbo.Courses", "CourseName");
            DropColumn("dbo.Courses", "CourseVideo");
            DropColumn("dbo.Notes", "Time");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Notes", "Time", c => c.DateTime(nullable: false));
            AddColumn("dbo.Courses", "CourseVideo", c => c.String());
            AddColumn("dbo.Courses", "CourseName", c => c.String());
            DropColumn("dbo.Notes", "TimeSeconds");
        }
    }
}
