using Microsoft.EntityFrameworkCore;
using GameHub.Application.Interfaces;
using GameHub.Domain.Entities;
using GameHub.Infrastructure.Data;

namespace GameHub.Infrastructure.Repositories;

public class JuegoRepository : IJuegoRepository {
    private readonly GameHubDbContext _context;
    
    // El constructor recibe el contexto de EF Core
    public JuegoRepository(GameHubDbContext context) {
        _context = context;
    }

    public async Task<IEnumerable<Juego>> GetAllAsync() {
        return await _context.Juegos.ToListAsync();
    }

    public async Task<Juego> AddAsync(Juego juego) {
        await _context.Juegos.AddAsync(juego);
        
        // SaveChangesAsync envuelve la operación en una transacción SQL (COMMIT)
        await _context.SaveChangesAsync(); 
        
        return juego;
    }

    public async Task<Juego?> GetByIdAsync(int id)
    {
        return await _context.Juegos.FindAsync(id);
    }

    public async Task UpdateAsync(Juego juego)
    {
        _context.Juegos.Update(juego);
        await _context.SaveChangesAsync();
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var juegoBorrar = await _context.Juegos.FindAsync(id);
        if (juegoBorrar is null)
            return false;

        _context.Juegos.Remove(juegoBorrar);
        await _context.SaveChangesAsync();

        return true;
    }
}
