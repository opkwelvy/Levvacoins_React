using Levva.Newbies.Intensivo.Data.Interfaces;
using Levva.Newbies.Intensivo.Domain.Models;

namespace Levva.Newbies.Intensivo.Data.Repositories
{
    public class CategoriaRepository : ICategoriaRepository
    {
        private readonly Context _context;
        public CategoriaRepository(Context context)
        {
            _context = context;
        }
        public Categoria Create(Categoria categoria)
        {
            _context.Categoria.Add(categoria);
            _context.SaveChanges();
            return categoria;

        }

        public void Delete(Guid id)
        {
            var categoria = _context.Categoria.Find(id);
            _context.Categoria.Remove(categoria);
            _context.SaveChanges();

        }

        public Categoria Get(Guid id)
        {
            return _context.Categoria.Find(id);
        }

        public List<Categoria> GetAll()
        {
            return _context.Categoria.ToList();   
        }

        public void Update(Categoria categoria)
        {
            _context.Categoria.Update(categoria);
            _context.SaveChanges();

        }
    }
}
