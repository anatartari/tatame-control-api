CREATE DATABASE "tatame-control-db";

-- Tabela Address
CREATE TABLE address (
    id SERIAL PRIMARY KEY,
    street VARCHAR(255),
    neighborhood VARCHAR(255),
    cep VARCHAR(20),
    city VARCHAR(100),
    state VARCHAR(50)
);

-- Tabela medical_info
CREATE TABLE medical_info (
    id SERIAL PRIMARY KEY,
    smoker BOOLEAN,
    last_blood_pressure_check VARCHAR(50),
    last_blood_pressure_measurement VARCHAR(50),
    has_family_history_of_diabetes BOOLEAN,
    known_heart_condition BOOLEAN,
    had_high_cholesterol_recently BOOLEAN,
    overweight_amount DECIMAL(5,2),
    orthopedic_issue_location TEXT,
    prescribed_medication TEXT,
    uses_supplements TEXT,
    last_physical_exam_date DATE,
    does_regular_exercise BOOLEAN,
    might_be_pregnant BOOLEAN,
    fitness_declaration BOOLEAN
);

-- Tabela Student
CREATE TABLE student (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20),
    gender VARCHAR(50),
    birthday DATE,
    allow_social_media BOOLEAN DEFAULT FALSE,
    instagram VARCHAR(255),
    address_id INT REFERENCES address(id) ON DELETE SET NULL,
    medical_info_id INT REFERENCES medical_info(id) ON DELETE SET NULL
);

-- Tabela Sport
CREATE TABLE sport (
    id SERIAL PRIMARY KEY,
    frequency VARCHAR(50),
    time TIME,
    sensei VARCHAR(255),
    price DECIMAL(10,2)
);

-- Tabela Experimental Class
CREATE TABLE experimental_class (
    id SERIAL PRIMARY KEY,
    practiced_martial_arts BOOLEAN,
    graduated_in_style VARCHAR(255),
    sport_id INT REFERENCES sport(id) ON DELETE CASCADE,
    student_id INT REFERENCES student(id) ON DELETE CASCADE
);

-- Tabela Registration
CREATE TABLE registration (
    id SERIAL PRIMARY KEY,
    student_id INT REFERENCES student(id) ON DELETE CASCADE,
    sport_id INT REFERENCES sport(id) ON DELETE CASCADE,
    status VARCHAR(50)
);

-- Tabela Payment
CREATE TABLE payment (
    id SERIAL PRIMARY KEY,
    value DECIMAL(10,2),
    date DATE
);

-- Tabela Registration Payment (Relacionamento entre registration e payment)
CREATE TABLE registration_payment (
    id SERIAL PRIMARY KEY,
    registration_id INT REFERENCES registration(id) ON DELETE CASCADE,
    payment_id INT REFERENCES payment(id) ON DELETE CASCADE
);

-- Tabela Message
CREATE TABLE message (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    template TEXT
);

-- Tabela Security
CREATE TABLE security (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    value TEXT
);

-- Tabela Configuration
CREATE TABLE configuration (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    value TEXT
);
