namespace GameHub.Application.Features.Juegos.DTOs;

public class UpdateJuegoRequestDto
{
    public string? Titulo { get; set; }
    public string? Descripcion { get; set; }
    public DateTime? FechaLanzamiento { get; set; }
    public string? Desarrollador { get; set; }
    public string? Distribuidor { get; set; }
    public string? Plataforma { get; set; }
    public string? PortadaUrl { get; set; }
}