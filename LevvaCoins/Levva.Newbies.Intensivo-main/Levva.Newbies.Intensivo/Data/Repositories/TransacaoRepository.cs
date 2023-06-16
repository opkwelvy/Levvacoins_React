using Levva.Newbies.Intensivo.Data.Interfaces;
using Levva.Newbies.Intensivo.Domain.Models;
using Microsoft.EntityFrameworkCore;

namespace Levva.Newbies.Intensivo.Data.Repositories
{
    public class TransacaoRepository : ITransacaoRepository
    {
        private readonly Context _context;
        public TransacaoRepository(Context context)
        {
            _context = context;
        }
        public Transacao Create(Transacao transacao)
        {
            _context.Transacao.Add(transacao);
            transacao.Data = DateTime.Now;
            _context.SaveChanges();
            return transacao;
        }

        public void Delete(Guid id)
        {
            var transacao = _context.Transacao.Find(id);
            _context.Transacao.Remove(transacao);
            _context.SaveChanges();

        }

        public Transacao Get(Guid id)
        {
            return _context.Transacao.Find(id);
        }

        public List<Transacao> GetAll()
        {
            return _context.Transacao.Include(x => x.Categoria).ToList();
        }

        public void Update(Transacao transacao)
        {
            _context.Transacao.Update(transacao);
            _context.SaveChanges();

        }
    }
}
