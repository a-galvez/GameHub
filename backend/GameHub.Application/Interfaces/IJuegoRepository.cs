using GameHub.Domain.Entities;

namespace GameHub.Application.Interfaces;

public interface IJuegoRepository {
    Task<IEnumerable<Juego>> GetAllAsync();
    Task<Juego> AddAsync(Juego juego);
}
