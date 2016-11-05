namespace LearnOn.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddedNotes : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Notes",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Text = c.String(),
                        Time = c.DateTime(nullable: false),
                        ApplicationUsers_Id = c.String(maxLength: 128),
                        Course_CourseId = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.ApplicationUsers", t => t.ApplicationUsers_Id)
                .ForeignKey("dbo.Courses", t => t.Course_CourseId)
                .Index(t => t.ApplicationUsers_Id)
                .Index(t => t.Course_CourseId);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Notes", "Course_CourseId", "dbo.Courses");
            DropForeignKey("dbo.Notes", "ApplicationUsers_Id", "dbo.ApplicationUsers");
            DropIndex("dbo.Notes", new[] { "Course_CourseId" });
            DropIndex("dbo.Notes", new[] { "ApplicationUsers_Id" });
            DropTable("dbo.Notes");
        }
    }
}
