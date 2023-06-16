using Levva.Newbies.Intensivo.Domain.Enums;

namespace Levva.Newbies.Intensivo.Domain.Models
{
  public class Transacao
  {
    public Guid Id { get; set; }
    public string Descricao { get; set; }
    public decimal Valor { get; set; }
    public DateTime Data { get; set; }
    public int Tipo { get; set; }
    public Guid CategoriaId { get; set; }
    public virtual Categoria Categoria { get; set; }
    public Guid UsuarioId { get; set; }
    public virtual Usuario Usuario { get; set; }
  }
}
