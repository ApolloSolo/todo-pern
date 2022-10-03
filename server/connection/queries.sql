CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    username VARCHAR(28) NOT NULL UNIQUE,
    email VARCHAR(28) NOT NULL UNIQUE,
    passhash VARCHAR NOT NULL
);

CREATE TABLE todos(
    id SERIAL PRIMARY KEY,
    username VARCHAR(28) NOT NULL,
    task TEXT,
    start_date DATE NOT NULL DEFAULT CURRENT_DATE,
    due_date DATE NOT NULL DEFAULT CURRENT_DATE,
    CONSTRAINT FK_user_todo FOREIGN KEY(username)
        REFERENCES users(username)
);

INSER INTO users (username, email, passhash) VALUES($1, $2);