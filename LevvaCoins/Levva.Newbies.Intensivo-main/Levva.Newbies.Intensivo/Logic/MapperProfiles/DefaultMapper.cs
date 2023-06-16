using AutoMapper;
using Levva.Newbies.Intensivo.Domain.Models;
using Levva.Newbies.Intensivo.Logic.Dtos;

namespace Levva.Newbies.Intensivo.Logic.MapperProfiles
{
    public class DefaultMapper :Profile
    {
        public DefaultMapper()
        {
            CreateMap<UsuarioDto, Usuario> ().ReverseMap();
            CreateMap<NovoUsuarioDto, Usuario>().ReverseMap();
            CreateMap<TransacaoDto, Transacao> ().ReverseMap();
            CreateMap<NovaTransacaoDto, Transacao>().ReverseMap();
            CreateMap<CategoriaDto, Categoria> ().ReverseMap();
        }
    }
}
