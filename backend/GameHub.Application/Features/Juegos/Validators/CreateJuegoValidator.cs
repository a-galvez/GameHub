using FluentValidation;
using GameHub.Application.Features.Juegos.DTOs;

namespace GameHub.Application.Features.Habitos.Validators;

public class CreateJuegoValidator : AbstractValidator<CreateJuegoRequestDto> {
    public CreateJuegoValidator() {
        RuleFor(x => x.Titulo)
            .NotEmpty().WithMessage("El título del juego no puede estar vacío.")
            .MaximumLength(100).WithMessage("El título es demasiado largo.");

        RuleFor(x => x.Descripcion)
            .MaximumLength(2000);

        RuleFor(x => x.Desarrollador)
            .NotEmpty().MaximumLength(100);

        RuleFor(x => x.Distribuidor)
            .NotEmpty().MaximumLength(100);

        RuleFor(x => x.Plataforma)
            .NotEmpty().MaximumLength(50);

        RuleFor(x => x.PortadaUrl)
            .Must(url => Uri.TryCreate(url, UriKind.Absolute, out _))
            .When(x => !string.IsNullOrWhiteSpace(x.PortadaUrl))
            .WithMessage("La portada debe ser una URL válida.");
    }
}
