CREATE DATABASE "tatame-control-db";


-- Tabela Address
CREATE TABLE address (
    id SERIAL PRIMARY KEY,
    street VARCHAR(255) not null,
    neighborhood VARCHAR(255) not null,
    cep VARCHAR(20) not null,
    city VARCHAR(100),
    state VARCHAR(50)
);

-- Tabela medical_info
CREATE TABLE medical_info (
    id SERIAL PRIMARY KEY,
    smoker BOOLEAN not null,
    last_blood_pressure_check VARCHAR(50) not null,
    last_blood_pressure_measurement VARCHAR(50) not null,
    has_family_history_of_diabetes BOOLEAN not null,
    known_heart_condition BOOLEAN not null,
    had_high_cholesterol_recently BOOLEAN not null,
    overweight_amount DECIMAL(5,2) not null,
    orthopedic_issue_location TEXT not null,
    prescribed_medication TEXT not null,
    uses_supplements TEXT not null,
    last_physical_exam_date DATE not null,
    does_regular_exercise BOOLEAN not null,
    might_be_pregnant BOOLEAN not null,
    fitness_declaration BOOLEAN not null
);

-- Tabela Student
CREATE TABLE student (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20) NOT NULL,
    gender VARCHAR(50),
    birthday DATE NOT NULL,
    allow_social_media BOOLEAN DEFAULT FALSE,
    instagram VARCHAR(255),
    practiced_martial_arts BOOLEAN,
    graduated_in_style VARCHAR(255),
    address_id INT REFERENCES address(id) ON DELETE SET NULL,
    medical_info_id INT REFERENCES medical_info(id) ON DELETE SET NULL
);

-- Tabela Sport
CREATE TABLE sport (
    id SERIAL PRIMARY KEY,
    frequency VARCHAR(50) NOT NULL,
    name VARCHAR(50) NOT NULL,
    time TIME NOT NULL,
    sensei VARCHAR(255) NOT NULL,
    price DECIMAL(10,2) NOT NULL
);

-- Tabela Experimental Class
CREATE TABLE experimental_class (
    id SERIAL PRIMARY KEY,
    sport_id INT REFERENCES sport(id) ON DELETE CASCADE NOT NULL,
    student_id INT REFERENCES student(id) ON DELETE CASCADE NOT NULL
);

-- Tabela Registration
CREATE TABLE registration (
    id SERIAL PRIMARY KEY,
    student_id INT REFERENCES student(id) ON DELETE CASCADE NOT NULL,
    sport_id INT REFERENCES sport(id) ON DELETE CASCADE NOT NULL,
    status VARCHAR(50) NOT NULL,
	CONSTRAINT unique_student_sport UNIQUE (student_id, sport_id)
);

-- Tabela Payment
CREATE TABLE payment (
    id SERIAL PRIMARY KEY,
    value DECIMAL(10,2) NOT NULL,
    date DATE NOT NULL
);

-- Tabela Registration Payment (Relacionamento entre registration e payment)
CREATE TABLE registration_payment (
    id SERIAL PRIMARY KEY,
    registration_id INT REFERENCES registration(id) ON DELETE CASCADE NOT NULL,
    payment_id INT REFERENCES payment(id) ON DELETE CASCADE NOT NULL,
	CONSTRAINT unique_registration_payment UNIQUE (registration_id, payment_id)

);

-- Tabela Message
CREATE TABLE message (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    template TEXT NOT NULL
);

-- Tabela Security
CREATE TABLE security (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    value TEXT NOT NULL
);

-- Tabela Configuration
CREATE TABLE configuration (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    value TEXT NOT NULL
);
