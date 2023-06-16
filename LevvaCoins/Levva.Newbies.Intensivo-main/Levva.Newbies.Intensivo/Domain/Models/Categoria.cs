namespace Levva.Newbies.Intensivo.Domain.Models
{
  public class Categoria
  {
    public Guid Id { get; set; }
    public string Descricao { get; set; }
    public virtual List<Transacao> Transacoes { get; set; }
  }
}
