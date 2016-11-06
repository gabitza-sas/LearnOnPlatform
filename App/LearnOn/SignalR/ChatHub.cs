using Microsoft.AspNet.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Threading.Tasks;
using System.Collections.Concurrent;
using LearnOn.Models;
using System.Data.Entity;
using AutoMapper;
using LearnOn.Controllers.Odata;

namespace LearnOn.SignalR
{
    public class ChatHub : Hub
    {
        static ConcurrentDictionary<string, string> groups = new ConcurrentDictionary<string, string>();
        public async Task JoinCourse(int courseId)
        {
            groups.TryAdd(this.Context.ConnectionId, courseId.ToString());
            await this.Groups.Add(this.Context.ConnectionId, courseId.ToString());
            await this.SendMessage(@"User {0} has joined the video");
        }

        public async Task SendMessage(string message)
        {
            using (var db = new LearnOnContext())
            {
                var user = await db.Users.FirstAsync(_ => _.UserName == this.Context.User.Identity.Name);
                string courseId = groups[this.Context.ConnectionId];
                var course = await db.Courses.FindAsync(int.Parse(courseId));
                var chatMsg = new ChatMessage
                {
                    User = user,
                    Course = course,
                    Text = string.Format(message, user.UserName),
                    Time = DateTime.Now,
                };

                db.ChatMessages.Add(chatMsg);
                
                this.Clients.Group(courseId).receiveMessage(Mapper.Map<ChatMessageViewModel>(chatMsg));
                await db.SaveChangesAsync();
            }
        }
        public override async Task OnDisconnected(bool stopCalled)
        {
            string value;
            groups.TryRemove(this.Context.ConnectionId, out value);
            await this.SendMessage(@"User {0} has left the video");
            await base.OnDisconnected(stopCalled);
        }
    }
}