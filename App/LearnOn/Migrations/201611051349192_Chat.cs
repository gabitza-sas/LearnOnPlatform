namespace LearnOn.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Chat : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.ChatMessages",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Text = c.String(),
                        Time = c.DateTime(nullable: false),
                        Course_CourseId = c.Int(),
                        User_Id = c.String(maxLength: 128),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Courses", t => t.Course_CourseId)
                .ForeignKey("dbo.ApplicationUsers", t => t.User_Id)
                .Index(t => t.Course_CourseId)
                .Index(t => t.User_Id);
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.ChatMessages", "Users_Id", "dbo.ApplicationUsers");
            DropForeignKey("dbo.ChatMessages", "Course_CourseId", "dbo.Courses");
            DropIndex("dbo.ChatMessages", new[] { "User_Id" });
            DropIndex("dbo.ChatMessages", new[] { "Course_CourseId" });
            DropColumn("dbo.Notes", "Time");
            DropTable("dbo.ChatMessages");
        }
    }
}
