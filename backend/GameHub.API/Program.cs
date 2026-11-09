using DotNetEnv;
using GameHub.Application;
using GameHub.Infrastructure;

var builder = WebApplication.CreateBuilder(args);
Env.Load();

var connectionString = Environment.GetEnvironmentVariable("ConnectionStrings__PostgresConnection") 
                       ?? throw new InvalidOperationException("Falta la cadena de conexión a PostgreSQL.");

// Leemos los orígenes permitidos desde el archivo .env del Backend
var corsAllowedOrigins = Environment.GetEnvironmentVariable("CORS_ALLOWED_ORIGINS") 
                         ?? throw new InvalidOperationException("Falta la variable CORS_ALLOWED_ORIGINS en el archivo .env.");

// Inyección de nuestras capas de Clean Architecture (Unidad 1)
builder.Services.AddInfrastructure(connectionString);
builder.Services.AddApplication();

// =========================================================================
// 1. DEFINICIÓN DE LA POLÍTICA DE SEGURIDAD CORS DINÁMICA (.env + Wildcards)
// =========================================================================
builder.Services.AddCors(options =>
{
    options.AddPolicy("PoliticaCorsGameHub", policy =>
    {
        // Separamos por coma por si existen múltiples orígenes (ej. localhost + https://*.unah.edu.hn)
        var origenes = corsAllowedOrigins.Split(',', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries);

        policy.WithOrigins(origenes)
              .SetIsOriginAllowedToAllowWildcardSubdomains() // Habilita comodines de subdominio (ej. https://*.unah.edu.hn)
              .AllowAnyHeader()                              // Autoriza encabezados JSON y futuros Tokens JWT
              .AllowAnyMethod();                             // Autoriza verbos GET y Preflights (POST, PUT, DELETE)
    });
});

builder.Services.AddControllers();

var app = builder.Build();

// =========================================================================
// 2. ACTIVACIÓN DEL MIDDLEWARE CORS EN LA PUERTA DE ENTRADA HTTP
// Regla crítica: Siempre debe ubicarse ANTES de MapControllers()
// =========================================================================
app.UseCors("PoliticaCorsGameHub");

app.MapControllers();
app.Run();

