using AutoMapper;
using AutoMapper.QueryableExtensions;
using LearnOn.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using System.Web.OData;

namespace LearnOn.Controllers.Odata
{
    public interface IODataEntity
    {
        int Id { get; }
    }
    public abstract class BaseODataController<T> : BaseODataController<T, T>
        where T : class, IODataEntity
    {
        protected override IQueryable<T> MapQuery(IQueryable<T> query)
        {
            return query;
        }
        protected override T MapToEntity(T viewModel)
        {
            return viewModel;
        }
        protected override T MapFromEntity(T model)
        {
            return model;
        }
    }
    public abstract class BaseODataController<T, TViewModel> : ODataController
        where T : class, IODataEntity
        where TViewModel : class
    {
        protected LearnOnContext Db { get; } = new LearnOnContext();

        protected abstract DbSet<T> Entities { get; }

        protected override void Dispose(bool disposing)
        {
            this.Db.Dispose();
            base.Dispose(disposing);
        }
        protected virtual IQueryable<TViewModel> MapQuery(IQueryable<T> query)
        {
            return query.ProjectTo<TViewModel>();
        }
        protected virtual T MapToEntity(TViewModel viewModel)
        {
            if (viewModel == null) return null;
            return Mapper.Map<T>(viewModel);
        }
        protected virtual TViewModel MapFromEntity(T model)
        {
            if (model == null) return null;
            return Mapper.Map<TViewModel>(model);
        }

        [EnableQuery]
        public virtual IQueryable<TViewModel> Get()
        {
            return this.MapQuery(this.Entities);
        }

        [EnableQuery]
        public abstract SingleResult<TViewModel> Get([FromODataUri] int key);

        public virtual async Task<IHttpActionResult> Post(TViewModel entity)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            this.Entities.Add(this.MapToEntity(entity));
            await this.Db.SaveChangesAsync();
            return Created(entity);
        }

        public virtual async Task<IHttpActionResult> Patch([FromODataUri] int key, Delta<TViewModel> entityDelta)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var entity = this.MapFromEntity(await this.Entities.FindAsync(key));
            if (entity == null)
            {
                return NotFound();
            }
            entityDelta.Patch(entity);
            try
            {
                await this.Db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (await this.Entities.FindAsync(key) == null)
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }
            return Updated(entity);
        }
        public virtual async Task<IHttpActionResult> Put([FromODataUri] int key, TViewModel updateViewModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var update = this.MapToEntity(updateViewModel);
            if (key != update.Id)
            {
                return BadRequest();
            }
            this.Db.Entry(update).State = EntityState.Modified;
            try
            {
                await this.Db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (await this.Entities.FindAsync(key) == null)
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }
            return Updated(update);
        }

        public virtual async Task<IHttpActionResult> Delete([FromODataUri] int key)
        {
            var entity = await this.Entities.FindAsync(key);
            if (entity == null)
            {
                return NotFound();
            }
            this.Entities.Remove(entity);
            await this.Db.SaveChangesAsync();
            return StatusCode(HttpStatusCode.NoContent);
        }
    }
}