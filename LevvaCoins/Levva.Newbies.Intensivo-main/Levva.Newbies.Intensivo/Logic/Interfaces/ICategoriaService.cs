using Levva.Newbies.Intensivo.Domain.Models;
using Levva.Newbies.Intensivo.Logic.Dtos;

namespace Levva.Newbies.Intensivo.Logic.Interfaces
{
    public interface ICategoriaService
    {
        Categoria Create(CategoriaDto categoria);
        CategoriaDto Get(Guid id);
        List<CategoriaDto> GetAll();    
        void Update(CategoriaDto categoria);    
        void Delete(Guid id);
    }
}
