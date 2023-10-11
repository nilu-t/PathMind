-- CREATE DATABASE pathmind;
-- use pathmind;

DROP TABLE notes;
DROP TABLE learning_paths;

CREATE TABLE notes(
	id INT AUTO_INCREMENT PRIMARY KEY,
    note_subject VARCHAR(255) NOT NULL,
    note_title VARCHAR(255) NOT NULL,
    note_description TEXT NOT NULL,
    code_snippet TEXT
);
CREATE TABLE learning_paths(
    id INT AUTO_INCREMENT PRIMARY KEY,
    path_name VARCHAR(255) NOT NULL,
    path_description TEXT NOT NULL
);
