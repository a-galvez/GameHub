using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using GameHub.Application.Interfaces;
using GameHub.Infrastructure.Data;
using GameHub.Infrastructure.Repositories;

namespace GameHub.Infrastructure;

public static class DependencyInjection {
    public static IServiceCollection AddInfrastructure(this IServiceCollection services, string connectionString) {
        
        services.AddDbContext<GameHubDbContext>(options =>
            options.UseNpgsql(connectionString));

        services.AddScoped<IJuegoRepository, JuegoRepository>();

        return services;
    }
}
