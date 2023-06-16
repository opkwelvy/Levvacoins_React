using Levva.Newbies.Intensivo.Domain.Models;
using Levva.Newbies.Intensivo.Logic.Dtos;
using Levva.Newbies.Intensivo.Logic.Interfaces;
using Levva.Newbies.Intensivo.Logic.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Transactions;

namespace Levva.Newbies.Intensivo.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TransacaoController : ControllerBase
    {
        private readonly ITransacaoService _service;
        private readonly ICategoriaService _categoriaService;
        public TransacaoController(ITransacaoService service, ICategoriaService categoriaService)
        {
            _service = service;
            _categoriaService = categoriaService;
        }
        [HttpPost("Create")]
        public ActionResult Create(NovaTransacaoDto transacao)
        {
            var userId = User.Identity.Name;
            var category = _categoriaService.Get(transacao.CategoriaId);
            var transaction = _service.Create(new Guid(userId),transacao);
            transaction.Categoria = category;
            return Created("", transaction); ;
            
        }
        [HttpGet("{SearchParams}")]
        public ActionResult<List<TransacaoDto>> Get(string SearchParams)
        {

            return _service.Search(SearchParams);
        }
        [HttpGet("list")]
        public ActionResult<List<TransacaoDto>> GetAll(Guid id)
        {
            return _service.GetAll();
        }
        [HttpPut]
        public IActionResult Update(TransacaoDto transacao)
        {
            _service.Update(transacao);
            return Ok();
        }
        [HttpDelete]
        public IActionResult Delete(Guid id)
        {
            _service.Delete(id);
            return Ok();
        }
    }
}
