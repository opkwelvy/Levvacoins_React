using Levva.Newbies.Intensivo.Domain.Models;
using Levva.Newbies.Intensivo.Logic.Dtos;

namespace Levva.Newbies.Intensivo.Data.Interfaces
{
    public interface ICategoriaRepository
    {
        Categoria Create(Categoria categoria);
        Categoria Get(Guid id);
        List<Categoria> GetAll();
        void Update(Categoria categoria);
        void Delete(Guid id);
    }
}
