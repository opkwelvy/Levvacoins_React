using Levva.Newbies.Intensivo.Domain.Enums;
using Levva.Newbies.Intensivo.Logic.Dtos;

namespace Levva.Newbies.Intensivo.Logic.Dtos
{
    public class TransacaoDto
    {
        public Guid Id { get; set; } 
        public string Descricao { get; set; }  
        public decimal Valor {get; set; }
        public DateTime Data { get; set; }
        public int Tipo { get; set; }
        public virtual CategoriaDto? Categoria { get; set; }
    }
}
