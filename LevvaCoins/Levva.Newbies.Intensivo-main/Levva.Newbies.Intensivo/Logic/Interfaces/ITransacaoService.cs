using Levva.Newbies.Intensivo.Domain.Models;
using Levva.Newbies.Intensivo.Logic.Dtos;

namespace Levva.Newbies.Intensivo.Logic.Interfaces
{
    public interface ITransacaoService
    {
        TransacaoDto Create(Guid userId, NovaTransacaoDto transacao);
        TransacaoDto Get(Guid id);   
        List<TransacaoDto> GetAll();
        void Update(TransacaoDto transacao);
        void Delete(Guid id);
        List<TransacaoDto> Search(string Search);

    }
}
