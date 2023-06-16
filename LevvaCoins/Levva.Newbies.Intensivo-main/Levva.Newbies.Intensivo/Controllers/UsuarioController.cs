using Levva.Newbies.Intensivo.Logic.Dtos;
using Levva.Newbies.Intensivo.Logic.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Levva.Newbies.Intensivo.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class UsuarioController : ControllerBase
  {
    private readonly IUsuarioService _service;
    public UsuarioController(IUsuarioService service)
    {
      _service = service;
    }
    [HttpPost("Create")]
    [AllowAnonymous]
    public IActionResult Create(NovoUsuarioDto usuario)
    {
      _service.Create(usuario);
      return Created("", usuario);
    }
    [HttpGet]
    public ActionResult<UsuarioDto> Get(Guid id)
    {
      return _service.Get(id);
    }
    [HttpGet("list")]
    public ActionResult<List<UsuarioDto>> GetAll(Guid id)
    {
      return _service.GetAll();
    }
    [HttpPut]
    public IActionResult Update(UsuarioDto usuario)
    {
      var userId = User.Identity.Name;
      usuario.Id = new Guid(userId);
      _service.Update(usuario);
      return Ok();
    }
    [HttpDelete]
    public IActionResult Delete(Guid id)
    {
      _service.Delete(id);
      return Ok();
    }
    [HttpPost]
    [AllowAnonymous]
    public ActionResult<LoginDto> Login(LoginDto loginDto)
    {
      var login = _service.Login(loginDto);
      if (login == null)
        return BadRequest("Usuário ou senha inválidos");
      return Ok(login);
    }
  }
}
