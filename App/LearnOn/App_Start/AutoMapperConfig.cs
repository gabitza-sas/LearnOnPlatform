using AutoMapper;
using LearnOn.Controllers.Odata;
using LearnOn.Models;   
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace LearnOn.App_Start
{
    public class AutoMapperConfig
    {
        public static void Configure()
        {
            Mapper.Initialize(c =>
            {
                c.CreateMap<ChatMessage, ChatMessageViewModel>()
                    .ForMember(_ => _.UserName, cc => cc.MapFrom(_ => _.User.UserName))
                    .ForMember(_ => _.CourseName, cc => cc.MapFrom(_ => _.Course.CourseName))
                    .ForMember(_ => _.CourseId, cc => cc.MapFrom(_ => _.Course.CourseId));

                c.CreateMap<Note, NoteViewModel>()
                    .ForMember(_ => _.CourseId, cc => cc.MapFrom(_ => _.Course.CourseId));
            });
        }
    }
}