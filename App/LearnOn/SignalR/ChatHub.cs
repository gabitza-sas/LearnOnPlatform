﻿using Microsoft.AspNet.SignalR;
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
        public Task JoinCourse(int courseId)
        {
            groups.TryAdd(this.Context.ConnectionId, courseId.ToString());
            return this.Groups.Add(this.Context.ConnectionId, courseId.ToString());
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
                    Text = message,
                    Time = DateTime.Now,
                };

                db.ChatMessages.Add(chatMsg);
                
                this.Clients.Group(courseId).receiveMessage(Mapper.Map<ChatMessageViewModel>(chatMsg));
                await db.SaveChangesAsync();
            }
        }
        public override Task OnDisconnected(bool stopCalled)
        {
            string value;
            groups.TryRemove(this.Context.ConnectionId, out value);
            return base.OnDisconnected(stopCalled);
        }
    }
}