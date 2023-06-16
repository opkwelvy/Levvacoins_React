using Levva.Newbies.Intensivo.Data.Interfaces;
using Levva.Newbies.Intensivo.Domain.Models;
using Levva.Newbies.Intensivo.Logic.Dtos;

namespace Levva.Newbies.Intensivo.Data.Repositories
{
  public class UsuarioRepository : IUsuarioRepository
  {
    private readonly Context _context;
    public UsuarioRepository(Context context)
    {
      _context = context;
    }

    public void Create(Usuario usuario)
    {
      _context.Usuario.Add(usuario);
      _context.SaveChanges();

    }

    public void Delete(Guid id)
    {
      var usuario = _context.Usuario.Find(id);
      _context.Usuario.Remove(usuario);
      _context.SaveChanges();

    }

    public Usuario Get(Guid id)
    {
      return _context.Usuario.Find(id);
    }
    public Usuario GetByEmailAndSenha(string email, string senha)
    {
      return _context.Usuario.FirstOrDefault(x => x.Email.Equals(email) && x.Senha.Equals(senha));
    }

    public List<Usuario> GetAll()
    {
      return _context.Usuario.ToList();
    }

    public void Update(Usuario usuario)
    {
      _context.Usuario.Update(usuario);
      _context.SaveChanges();

    }

  }
}
