-- CREATE DATABASE pathmind;
-- use pathmind;

CREATE TABLE notes(
	id INT AUTO_INCREMENT PRIMARY KEY,
    note_subject VARCHAR(255) NOT NULL,
    note_description TEXT NOT NULL
);
CREATE TABLE learning_paths(
    id INT AUTO_INCREMENT PRIMARY KEY,
    path_name VARCHAR(255) NOT NULL,
    path_description TEXT NOT NULL
);
