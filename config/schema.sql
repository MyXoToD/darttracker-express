CREATE DATABASE IF NOT EXISTS darttracker_express;

USE darttracker_express;

CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS sessions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  refresh_token VARCHAR(512) UNIQUE NOT NULL,
  ip_address VARCHAR(45),
  user_agent VARCHAR(255),
  expires_at DATETIME NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS games (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NULL,
  played_at DATETIME NOT NULL,
  winner_id INT NULL,
  win_type VARCHAR(12) NULL CHECK (win_type IN('First Class', 'Second Class')),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (winner_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS users_games (
  user_id INT NOT NULL,
  game_id INT NOT NULL,
  PRIMARY KEY (user_id, game_id),
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (game_id) REFERENCES games(id)
);

-- Testdata
INSERT INTO users (username, password, email) VALUES ('max', '$2b$10$YjR8PK2o7z3N.Q8VO0YrpeRgIj3GFNo6/O.TPMIzYa/iSHbLWVks6', 'max@test.de');
INSERT INTO users (username, password, email) VALUES ('john', 'test123', 'john@test.de');
INSERT INTO users (username, password, email) VALUES ('katniss', 'test123', 'katniss@test.de');
INSERT INTO users (username, password, email) VALUES ('bonnie', 'test123', 'bonnie@test.de');
INSERT INTO users (username, password, email) VALUES ('jack', 'test123', 'jack@test.de');
INSERT INTO users (username, password, email) VALUES ('moxy', 'test123', 'moxy@test.de');

INSERT INTO games (title, description, played_at, winner_id, win_type) VALUES ('First game', 'Lorem Ipsum Dolor Sit Amet', '2025-01-01 10:00:00.000', 1, 'First Class');
INSERT INTO games (title, description, played_at, winner_id, win_type) VALUES ('Second game', 'Lorem Ipsum Dolor Sit Amet', '2025-02-01 13:00:00.000', 2, 'Second Class');
INSERT INTO games (title, description, played_at) VALUES ('Third game', 'Lorem Ipsum Dolor Sit Amet', '2025-03-01 10:00:00.000');

INSERT INTO users_games (user_id, game_id) VALUES (1, 1);
INSERT INTO users_games (user_id, game_id) VALUES (2, 1);
INSERT INTO users_games (user_id, game_id) VALUES (3, 1);
INSERT INTO users_games (user_id, game_id) VALUES (4, 1);
INSERT INTO users_games (user_id, game_id) VALUES (5, 1);
INSERT INTO users_games (user_id, game_id) VALUES (1, 2);
INSERT INTO users_games (user_id, game_id) VALUES (2, 2);
INSERT INTO users_games (user_id, game_id) VALUES (3, 2);
INSERT INTO users_games (user_id, game_id) VALUES (1, 3);
INSERT INTO users_games (user_id, game_id) VALUES (2, 3);
INSERT INTO users_games (user_id, game_id) VALUES (3, 3);
INSERT INTO users_games (user_id, game_id) VALUES (4, 3);