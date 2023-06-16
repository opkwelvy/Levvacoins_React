using AutoMapper;
using Levva.Newbies.Intensivo.Data.Interfaces;
using Levva.Newbies.Intensivo.Data.Repositories;
using Levva.Newbies.Intensivo.Domain.Models;
using Levva.Newbies.Intensivo.Logic.Dtos;
using Levva.Newbies.Intensivo.Logic.Interfaces;
using Microsoft.IdentityModel.Tokens;
using System.Data;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Levva.Newbies.Intensivo.Logic.Services
{
  public class UsuarioService : IUsuarioService
  {
    private readonly IUsuarioRepository _repository;
    private readonly IMapper _mapper;
    private readonly IConfiguration _configuration;
    public UsuarioService(IUsuarioRepository repository, IMapper mapper, IConfiguration configuration)
    {
      _repository = repository;
      _mapper = mapper;
      _configuration = configuration;
    }
    public Usuario Create(NovoUsuarioDto usuario)
    {
      var _usuario = _mapper.Map<Usuario>(usuario);
      _usuario.Id = Guid.NewGuid();
      _repository.Create(_usuario);
      return _usuario;

    }

    public void Delete(Guid id)
    {
      _repository.Delete(id);
    }

    public UsuarioDto Get(Guid id)
    {
      var _usuario = _mapper.Map<UsuarioDto>(_repository.Get(id));
      return _usuario;
    }

    public List<UsuarioDto> GetAll()
    {

      var usuarios = _mapper.Map<List<UsuarioDto>>(_repository.GetAll());
      return usuarios;
    }

    public void Update(UsuarioDto usuario)
    {
      var usuarioNome = _repository.Get(usuario.Id);
      usuarioNome.Nome = usuario.Nome;
      _repository.Update(usuarioNome);
    }
    public LoginDto Login(LoginDto login)
    {
      var usuario = _repository.GetByEmailAndSenha(login.Email, login.Senha);
      if (usuario == null)
        return null;

      var tokenHandler = new JwtSecurityTokenHandler();
      var key = Encoding.ASCII.GetBytes(_configuration.GetSection("Secret").Value);
      var tokenDescriptor = new SecurityTokenDescriptor
      {
        Subject = new ClaimsIdentity(new Claim[]
          {
                    new Claim(ClaimTypes.Name, usuario.Id.ToString()),
                    new Claim(ClaimTypes.Email, usuario.Email)

          }),
        Expires = DateTime.UtcNow.AddHours(1),
        SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
      };
      var token = tokenHandler.CreateToken(tokenDescriptor);

      login.Token = "Bearer " + tokenHandler.WriteToken(token);
      login.Nome = usuario.Nome;
      login.Email = usuario.Email;
      login.Senha = null;
      login.Id = usuario.Id;
      return login;
    }
  }
}
