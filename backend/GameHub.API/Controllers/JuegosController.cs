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
    private readonly IValidator<CreateJuegoRequestDto> _createValidator;

    private readonly IValidator<UpdateJuegoRequestDto> _updateValidator;

    public JuegosController(IJuegoRepository repository, IValidator<CreateJuegoRequestDto> createValidator, IValidator<UpdateJuegoRequestDto> updateValidator) {
        _repository = repository;
        _createValidator = createValidator;
        _updateValidator = updateValidator;
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
        var validationResult = await _createValidator.ValidateAsync(request);
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

    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetJuego(int id)
    {
        var juegoEncontrado = await _repository.GetByIdAsync(id);
        if (juegoEncontrado is null)
            return NotFound();
        
        var response = new JuegoResponseDto {
            Id = juegoEncontrado.Id,
            Titulo = juegoEncontrado.Titulo,
            Descripcion = juegoEncontrado.Descripcion,
            FechaLanzamiento = juegoEncontrado.FechaLanzamiento,
            Desarrollador = juegoEncontrado.Desarrollador,
            Distribuidor = juegoEncontrado.Distribuidor,
            Plataforma = juegoEncontrado.Plataforma,
            PortadaUrl = juegoEncontrado.PortadaUrl
        };

        return Ok(response);
    }

    [HttpPut("{id:int}")]
    public async Task<IActionResult> ActualizarJuego(int id, [FromBody] UpdateJuegoRequestDto request)
    {
        var validationResult = await _updateValidator.ValidateAsync(request);
        if (!validationResult.IsValid)
            return BadRequest(validationResult.Errors);

        var juego = await _repository.GetByIdAsync(id);
        if (juego is null)
            return NotFound();

        if (request.Titulo is not null) juego.Titulo = request.Titulo;
        if (request.Descripcion is not null) juego.Descripcion = request.Descripcion;
        if (request.FechaLanzamiento is not null) juego.FechaLanzamiento = request.FechaLanzamiento.Value;
        if (request.Desarrollador is not null) juego.Desarrollador = request.Desarrollador;
        if (request.Distribuidor is not null) juego.Distribuidor = request.Distribuidor;
        if (request.Plataforma is not null) juego.Plataforma = request.Plataforma;
        if (request.PortadaUrl is not null) juego.PortadaUrl = request.PortadaUrl;

        await _repository.UpdateAsync(juego);
        return NoContent();
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> EliminarJuego(int id) {
        var juegoEliminado = await _repository.DeleteAsync(id);
        if (!juegoEliminado)
            return NotFound();

        return NoContent();
    }
    
}