using Microsoft.AspNet.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace LearnOn.SignalR
{
    public class ChatHub : Hub
    {
        public void SendMessage(string message)
        {
            // Call the broadcastMessage method to update clients.
            Clients.All.receiveMessage(message);
        }
    }
}