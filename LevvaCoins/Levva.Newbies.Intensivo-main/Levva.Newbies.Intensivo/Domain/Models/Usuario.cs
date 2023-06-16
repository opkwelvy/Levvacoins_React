﻿namespace Levva.Newbies.Intensivo.Domain.Models
{
  public class Usuario
  {
    public Guid Id { get; set; }
    public string Nome { get; set; }
    public string Email { get; set; }
    public string Senha { get; set; }
    public virtual List<Transacao> Transacoes { get; set; }
  }
}
