using Levva.Newbies.Intensivo.Domain.Enums;

namespace Levva.Newbies.Intensivo.Logic.Dtos
{
    public class NovaTransacaoDto
    {
        public string Descricao { get; set; }
        public decimal Valor { get; set; }
        public int Tipo { get; set; }  
        public Guid CategoriaId { get; set; }
    }
}
