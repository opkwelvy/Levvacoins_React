using Levva.Newbies.Intensivo.Domain.Models;

namespace Levva.Newbies.Intensivo.Data.Interfaces
{
    public interface ITransacaoRepository
    {
        Transacao Create(Transacao transacao);
        Transacao Get(Guid id);
        List<Transacao> GetAll();   
        void Update(Transacao transacao);
        void Delete(Guid id);
    }   
}
