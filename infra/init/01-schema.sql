CREATE TABLE generos (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL UNIQUE,
    descripcion TEXT
);

CREATE TABLE juegos (
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(150) NOT NULL,
    descripcion TEXT,
    fechaLanzamiento DATE,
    desarrollador VARCHAR(100),
    distribuidor VARCHAR(100),
    plataforma VARCHAR(50),
    genero_id INT NOT NULL,
    portadaUrl TEXT,

    --CONSTRAINT fk_games_genre
        --FOREIGN KEY (genero_id)
        --REFERENCES genero(id)
        --ON DELETE RESTRICT
);

CREATE TABLE reviews (
    id SERIAL PRIMARY KEY,
    juego_id INT NOT NULL,
    nombreReseniador VARCHAR(100) NOT NULL,
    rating INT NOT NULL,
    comentario TEXT,
    fechaCreacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    --CONSTRAINT fk_reviews_game
        --FOREIGN KEY (juego_id)
        --REFERENCES juegos(id)
        --ON DELETE CASCADE,

    --CONSTRAINT chk_review_rating
        --CHECK (rating BETWEEN 1 AND 5)
);