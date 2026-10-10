using GameHub.Domain.Entities;

namespace GameHub.Application.Interfaces;

public interface IJuegoRepository {
    Task<IEnumerable<Juego>> GetAllAsync();
    Task<Juego> AddAsync(Juego juego);

    Task<Juego?> GetByIdAsync(int id);

    Task UpdateAsync(Juego juego);

    Task<bool> DeleteAsync(int id);
}
