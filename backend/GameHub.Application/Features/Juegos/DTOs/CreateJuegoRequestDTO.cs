namespace GameHub.Application.Features.Juegos.DTOs;

public class CreateJuegoRequestDto {
    public string Titulo { get; set; } = string.Empty;
    public string Descripcion { get; set; } = string.Empty;
    public DateTime? FechaLanzamiento { get; set; }
    public string Desarrollador { get; set; } = string.Empty;
    public string Distribuidor { get; set; } = string.Empty;
    public string Plataforma { get; set; } = string.Empty;
    public string? PortadaUrl { get; set; }
}
