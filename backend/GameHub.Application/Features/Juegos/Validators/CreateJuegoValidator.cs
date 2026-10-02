using FluentValidation;
using GameHub.Application.Features.Juegos.DTOs;

namespace GameHub.Application.Features.Habitos.Validators;

public class CreateJuegoValidator : AbstractValidator<CreateJuegoRequestDto> {
    public CreateJuegoValidator() {
        RuleFor(x => x.Titulo)
            .NotEmpty().WithMessage("El título del juego no puede estar vacío.")
            .MaximumLength(100).WithMessage("El título es demasiado largo.");
    }
}
