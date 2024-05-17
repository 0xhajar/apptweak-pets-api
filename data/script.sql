-- Create the pet owners table
CREATE TABLE owners (
    owner_id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    age INTEGER NOT NULL,
    phone_number TEXT NOT NULL,
    address TEXT NOT NULL,
    register_date DATE NOT NULL
);

-- Create the pets table
CREATE TABLE pets (
    pet_id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    age INTEGER NOT NULL,
    species TEXT NOT NULL,
    register_date DATE NOT NULL,
    owner_id INTEGER NOT NULL,
    foreign key (owner_id) references owners(owner_id)
);

-- Insert into the owners table
INSERT INTO owners (name, age, phone_number, address, register_date) VALUES ('John Doe', 35, '123-456-7890', '123 Elm Street', '2023-01-01');
INSERT INTO owners (name, age, phone_number, address, register_date) VALUES ('Jane Smith', 28, '987-654-3210', '456 Oak Avenue', '2023-02-01');
INSERT INTO owners (name, age, phone_number, address, register_date) VALUES ('Alice Johnson', 42, '555-555-5555', '789 Pine Road', '2023-03-01');

-- Insert into the pets table
INSERT INTO pets (name, age, species, register_date, owner_id) VALUES ('Buddy', 3, 'Dog', '2023-01-05', 1);
INSERT INTO pets (name, age, species, register_date, owner_id) VALUES ('Whiskers', 2, 'Cat', '2023-01-10', 1);
INSERT INTO pets (name, age, species, register_date, owner_id) VALUES ('Rover', 4, 'Dog', '2023-02-05', 2);
INSERT INTO pets (name, age, species, register_date, owner_id) VALUES ('Mittens', 1, 'Cat', '2023-02-10', 2);
INSERT INTO pets (name, age, species, register_date, owner_id) VALUES ('Goldie', 1, 'Fish', '2023-03-15', 3);
INSERT INTO pets (name, age, species, register_date, owner_id) VALUES ('Fluffy', 5, 'Rabbit', '2023-03-20', 3);