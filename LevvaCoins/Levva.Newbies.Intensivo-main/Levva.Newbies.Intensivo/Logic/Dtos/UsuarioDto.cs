namespace Levva.Newbies.Intensivo.Logic.Dtos;

public class UsuarioDto
{
    public Guid Id { get; set; }
    
    public string Nome { get; set; }
    public string Email { get; set; }   
    public string Senha { get; set; }
    public virtual List<TransacaoDto>?  Transacoes { get; set; }
}
