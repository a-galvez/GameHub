using FluentValidation;
using Microsoft.AspNetCore.Mvc;
using GameHub.Application.Interfaces;
using GameHub.Domain.Entities;
using GameHub.Application.Features.Juegos.DTOs;

namespace GameHub.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class JuegosController : ControllerBase {
    private readonly IJuegoRepository _repository;
    private readonly IValidator<CreateJuegoRequestDto> _validator;

    public JuegosController(IJuegoRepository repository, IValidator<CreateJuegoRequestDto> validator) {
        _repository = repository;
        _validator = validator;
    }

    [HttpGet]
    public async Task<IActionResult> GetJuegos() {
        var juegos = await _repository.GetAllAsync();
        
        // Mapeo Manual: Entidad -> DTO
        var response = juegos.Select(j => new JuegoResponseDto {
            Id = j.Id,
            Titulo = j.Titulo,
            Descripcion = j.Descripcion,
            FechaLanzamiento = j.FechaLanzamiento,
            Desarrollador = j.Desarrollador,
            Distribuidor = j.Distribuidor,
            Plataforma = j.Plataforma,
            PortadaUrl = j.PortadaUrl
        });

        return Ok(response);
    }

    [HttpPost]
    public async Task<IActionResult> CrearJuego([FromBody] CreateJuegoRequestDto request) {
        // 1. Ejecutar FluentValidation
        var validationResult = await _validator.ValidateAsync(request);
        if (!validationResult.IsValid) {
            return BadRequest(validationResult.Errors); // HTTP 400 automático con detalles
        }

        // 2. Mapeo Manual: DTO -> Entidad (Solo transferimos lo permitido)
        var nuevoJuego = new Juego {
            Titulo = request.Titulo,
            Descripcion = request.Descripcion,
            FechaLanzamiento = request.FechaLanzamiento,
            Desarrollador = request.Desarrollador,
            Distribuidor = request.Distribuidor,
            Plataforma = request.Plataforma,
            PortadaUrl = request.PortadaUrl
        };

        // 3. Persistencia
        var juegoCreado = await _repository.AddAsync(nuevoJuego);
        
        // 4. Mapeo de Retorno
        var response = new JuegoResponseDto {
            Id = juegoCreado.Id,
            Titulo = juegoCreado.Titulo,
            Descripcion = juegoCreado.Descripcion,
            FechaLanzamiento = juegoCreado.FechaLanzamiento,
            Desarrollador = juegoCreado.Desarrollador,
            Distribuidor = juegoCreado.Distribuidor,
            Plataforma = juegoCreado.Plataforma,
            PortadaUrl = juegoCreado.PortadaUrl
        };

        return CreatedAtAction(nameof(GetJuegos), new { id = response.Id }, response);
    }
}