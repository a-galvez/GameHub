namespace GameHub.Domain.Entities;

public class Resenia
{
    public int Id { get; set; }
    public string NombreReseniador { get; set; } = string.Empty;
    public int Calificacion { get; set; }
    public string Comentario { get; set; } = string.Empty;
    public DateTime FechaCreacion { get; set; } = DateTime.UtcNow;

}