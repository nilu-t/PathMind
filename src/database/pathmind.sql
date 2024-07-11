USE pathmind;

DROP TABLE IF EXISTS notes;
DROP TABLE IF EXISTS learning_paths;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    UNIQUE KEY email (email)
);

CREATE TABLE notes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_email VARCHAR(255) NOT NULL,
    note_subject VARCHAR(255) NOT NULL,
    note_title VARCHAR(255) NOT NULL,
    note_description TEXT NOT NULL,
    code_snippet TEXT,
    FOREIGN KEY (user_email) REFERENCES users(email)
);
