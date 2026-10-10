using FluentValidation;
using GameHub.Application.Features.Juegos.DTOs;

namespace GameHub.Application.Features.Juegos.Validators;

public class UpdateJuegoRequestDtoValidator : AbstractValidator<UpdateJuegoRequestDto>
{
    public UpdateJuegoRequestDtoValidator()
    {
        // Al menos un campo debe venir en la petición
        RuleFor(x => x)
            .Must(TieneAlgunCampo)
            .WithMessage("Debes enviar al menos un campo para actualizar.");

        RuleFor(x => x.Titulo)
            .NotEmpty().WithMessage("El título del juego no puede estar vacío.")
            .MaximumLength(100).WithMessage("El título es demasiado largo.")
            .When(x => x.Titulo is not null);

        RuleFor(x => x.Descripcion)
            .MaximumLength(2000)
            .When(x => x.Descripcion is not null);

        RuleFor(x => x.Desarrollador)
            .NotEmpty().MaximumLength(100)
            .When(x => x.Desarrollador is not null);

        RuleFor(x => x.Distribuidor)
            .NotEmpty().MaximumLength(100)
            .When(x => x.Distribuidor is not null);

        RuleFor(x => x.Plataforma)
            .NotEmpty().MaximumLength(50)
            .When(x => x.Plataforma is not null);

        RuleFor(x => x.PortadaUrl)
            .Must(url => Uri.TryCreate(url, UriKind.Absolute, out _))
            .When(x => x.PortadaUrl is not null)
            .WithMessage("La portada debe ser una URL válida.");
    }

    private static bool TieneAlgunCampo(UpdateJuegoRequestDto x) =>
        x.Titulo is not null
        || x.Descripcion is not null
        || x.FechaLanzamiento is not null
        || x.Desarrollador is not null
        || x.Distribuidor is not null
        || x.Plataforma is not null
        || x.PortadaUrl is not null;
}