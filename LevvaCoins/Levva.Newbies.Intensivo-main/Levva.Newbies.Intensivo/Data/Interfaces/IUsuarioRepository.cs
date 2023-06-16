using Levva.Newbies.Intensivo.Domain.Models;
using Levva.Newbies.Intensivo.Logic.Dtos;

namespace Levva.Newbies.Intensivo.Data.Interfaces
{
    public interface IUsuarioRepository
    {
        Usuario Get(Guid id);
        Usuario GetByEmailAndSenha(string email, string senha);
        List<Usuario> GetAll();
        void Delete(Guid id);
        void Create(Usuario usuario);
        void Update(Usuario usuario);
    }
}
