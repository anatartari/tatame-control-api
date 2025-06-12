-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Tabela Address
CREATE TABLE address (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    street VARCHAR(255) not null,
    neighborhood VARCHAR(255) not null,
    cep VARCHAR(20) not null,
    city VARCHAR(100),
    state VARCHAR(50),
    number VARCHAR(20),
    complement VARCHAR(100)
);

CREATE TABLE medical_info (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    pre_existing_condition VARCHAR(10) NOT NULL,
    pre_existing_condition_details TEXT,
    serious_injury VARCHAR(10) NOT NULL,
    serious_injury_details TEXT,
    medical_restriction VARCHAR(10) NOT NULL,
    medical_restriction_details TEXT,
    heart_condition VARCHAR(10) NOT NULL,
    heart_condition_details TEXT,
    respiratory_issues VARCHAR(10) NOT NULL,
    respiratory_issues_details TEXT,
    fainting_episodes VARCHAR(10) NOT NULL,
    fainting_episodes_details TEXT,
    recent_injury VARCHAR(10) NOT NULL,
    recent_injury_details TEXT,
    joint_problems VARCHAR(10) NOT NULL,
    joint_problems_details TEXT,
    prosthetics VARCHAR(10) NOT NULL,
    prosthetics_details TEXT,
    allergies VARCHAR(10) NOT NULL,
    allergies_details TEXT,
    continuous_medication VARCHAR(10) NOT NULL,
    continuous_medication_details TEXT,
    emergency_medication VARCHAR(10) NOT NULL,
    emergency_medication_details TEXT,
    seizure_history VARCHAR(10) NOT NULL,
    seizure_history_details TEXT,
    major_surgery VARCHAR(10) NOT NULL,
    major_surgery_details TEXT,
    physical_limitation VARCHAR(10) NOT NULL,
    physical_limitation_details TEXT,
    emergency_name_contact VARCHAR(255) NOT NULL,
    emergency_number_contact VARCHAR(30) NOT NULL,
    fitness_declaration BOOLEAN NOT NULL
);

-- Tabela Student
CREATE TABLE student (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20) NOT NULL,
    gender VARCHAR(50),
    birthday DATE NOT NULL,
    allow_social_media BOOLEAN DEFAULT FALSE,
    instagram VARCHAR(255),
    practiced_martial_arts BOOLEAN,
    graduated_in_style VARCHAR(255),
    address_id UUID REFERENCES address (id) ON DELETE SET NULL,
    medical_info_id UUID REFERENCES medical_info (id) ON DELETE SET NULL
);

-- Tabela Sport
CREATE TABLE sport (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(50) NOT NULL,
    sensei VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    day_of_week VARCHAR(50) NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL
);

-- Tabela Experimental Class
CREATE TABLE experimental_class (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    sport_id UUID REFERENCES sport (id) ON DELETE CASCADE NOT NULL,
    student_id UUID REFERENCES student (id) ON DELETE CASCADE NOT NULL
);

-- Tabela Registration
CREATE TABLE registration (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID REFERENCES student (id) ON DELETE CASCADE NOT NULL,
    sport_id UUID REFERENCES sport (id) ON DELETE CASCADE NOT NULL,
    status VARCHAR(50) NOT NULL,
    CONSTRAINT unique_student_sport UNIQUE (student_id, sport_id)
);

-- Tabela Payment
CREATE TABLE payment (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    value DECIMAL(10, 2) NOT NULL,
    date DATE NOT NULL,
    reference_month INTEGER NOT NULL
);

-- Tabela Registration Payment (Relacionamento entre registration e payment)
CREATE TABLE registration_payment (
    registration_id UUID REFERENCES registration (id) ON DELETE CASCADE NOT NULL,
    payment_id UUID REFERENCES payment (id) ON DELETE CASCADE NOT NULL,
    CONSTRAINT unique_registration_payment UNIQUE (registration_id, payment_id)
);

-- Tabela Message
CREATE TABLE message (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    template TEXT NOT NULL
);

-- Tabela Security
CREATE TABLE security (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    value TEXT NOT NULL
);

-- Tabela Configuration
CREATE TABLE configuration (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    value TEXT NOT NULL
);