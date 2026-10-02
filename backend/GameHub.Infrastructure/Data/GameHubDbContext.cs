using Microsoft.EntityFrameworkCore;
using GameHub.Domain.Entities;

namespace GameHub.Infrastructure.Data;

public class GameHubDbContext : DbContext {
    public GameHubDbContext(DbContextOptions<GameHubDbContext> options) : base(options) { }
    
    public DbSet<Juego> Juegos { get; set; }
    public DbSet<Genero> Generos { get; set; }
    public DbSet<Resenia> Resenias { get; set; }
}
