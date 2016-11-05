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
    public abstract class BaseODataController<T> : ODataController
        where T: class, IODataEntity
    {
        protected LearnOnContext Db { get; } = new LearnOnContext();

        protected abstract DbSet<T> Entities { get; }
        
        protected override void Dispose(bool disposing)
        {
            this.Db.Dispose();
            base.Dispose(disposing);
        }

        [EnableQuery]
        public virtual IQueryable<T> Get()
        {
            return this.Entities;
        }

        [EnableQuery]
        public abstract SingleResult<T> Get([FromODataUri] int key);

        public virtual async Task<IHttpActionResult> Post(T entity)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            this.Entities.Add(entity);
            await this.Db.SaveChangesAsync();
            return Created(entity);
        }

        public virtual async Task<IHttpActionResult> Patch([FromODataUri] int key, Delta<T> entityDelta)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var entity = await this.Entities.FindAsync(key);
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
        public virtual async Task<IHttpActionResult> Put([FromODataUri] int key, T update)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
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