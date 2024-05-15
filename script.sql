-- Create the pet owners table
CREATE TABLE owners (
    owner_id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    age INTEGER NOT NULL,
    phone_number TEXT NOT NULL,
    address TEXT NOT NULL,
    register_date DATE NOT NULL,
    favourite_food TEXT
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