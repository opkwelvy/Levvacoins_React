using AutoMapper;
using Levva.Newbies.Intensivo.Data.Interfaces;
using Levva.Newbies.Intensivo.Domain.Models;
using Levva.Newbies.Intensivo.Logic.Dtos;
using Levva.Newbies.Intensivo.Logic.Interfaces;

namespace Levva.Newbies.Intensivo.Logic.Services
{

    public class TransacaoService : ITransacaoService
    {
        private readonly ITransacaoRepository _repository;
        private readonly IMapper _mapper;

        public TransacaoService(ITransacaoRepository repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }
        public TransacaoDto Create(Guid userId, NovaTransacaoDto transacao)
        {
            var _transacao = _mapper.Map<Transacao>(transacao);
            _transacao.Id = Guid.NewGuid();
            _transacao.UsuarioId = userId;
            return _mapper.Map<TransacaoDto>(_repository.Create(_transacao));
        }

        public void Delete(Guid id)
        {
            _repository.Delete(id);
        }

        public TransacaoDto Get(Guid id)
        {
            var transacao = _mapper.Map<TransacaoDto>(_repository.Get(id));
            return transacao;
        }

        public List<TransacaoDto> GetAll()
        {
            var transacao = _mapper.Map<List<TransacaoDto>>(_repository.GetAll());
            return transacao;
        }

        public void Update(TransacaoDto transacao)
        {
            var _transacao = _mapper.Map<Transacao>(transacao);
            _repository.Update(_transacao);
        }
        public List<TransacaoDto> Search(string Search)
        {
            var transactionList = _repository.GetAll();
            var transactionsListed = transactionList.Where(transaction =>
            {
                return transaction.Descricao.Contains(Search);
            }).ToList();
            var mappedList = _mapper.Map<List<TransacaoDto>>(transactionsListed);
            return mappedList;
        }
    }
}
