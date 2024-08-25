USE pathmind;

DROP TABLE IF EXISTS notes;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS community_notes;

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

-- CREATE TABLE community_notes (
--     id INT AUTO_INCREMENT PRIMARY KEY,
--     note_id INT NOT NULL,
--     shared_by_email VARCHAR(255) NOT NULL,
--     shared_with_email VARCHAR(255) NOT NULL,
--     share_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--     FOREIGN KEY (note_id) REFERENCES notes(id),
--     FOREIGN KEY (shared_by_email) REFERENCES users(email),
--     FOREIGN KEY (shared_with_email) REFERENCES users(email)
-- );