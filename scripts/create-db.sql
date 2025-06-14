CREATE DATABASE "tatame-control-db"

-- Ativa extensão para UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Endereços
CREATE TABLE address (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    street VARCHAR(255) NOT NULL,
    neighborhood VARCHAR(255) NOT NULL,
    cep VARCHAR(20) NOT NULL,
    city VARCHAR(100),
    state VARCHAR(50),
    number VARCHAR(20),
    complement VARCHAR(100)
);

-- Informações Médicas
CREATE TABLE medical_info (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

    pre_existing_condition TEXT,
    serious_injury TEXT,
    medical_restriction TEXT,
    heart_condition TEXT,
    respiratory_issues TEXT,
    fainting_episodes TEXT,
    recent_injury TEXT,
    joint_problems TEXT,
    prosthetics TEXT,
    allergies TEXT,
    continuous_medication TEXT,
    emergency_medication TEXT,
    seizure_history TEXT,
    major_surgery TEXT,
    physical_limitation TEXT,

    emergency_contact_name VARCHAR(255) NOT NULL,
    emergency_contact_number VARCHAR(30) NOT NULL,
    fitness_declaration BOOLEAN NOT NULL
);

-- Alunos
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
    address_id UUID REFERENCES address(id) ON DELETE SET NULL,
    medical_info_id UUID REFERENCES medical_info(id) ON DELETE SET NULL
);

-- Modalidades Esportivas
CREATE TABLE sport (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(50) NOT NULL,
    sensei VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    day_of_week VARCHAR(50) NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    active BOOLEAN NOT NULL DEFAULT TRUE
);

-- Aulas Experimentais
CREATE TABLE experimental_class (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    sport_id UUID NOT NULL REFERENCES sport(id) ON DELETE CASCADE,
    student_id UUID NOT NULL REFERENCES student(id) ON DELETE CASCADE
);

-- Matrículas
CREATE TABLE registration (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID NOT NULL REFERENCES student(id) ON DELETE CASCADE,
    sport_id UUID NOT NULL REFERENCES sport(id) ON DELETE CASCADE,
    status VARCHAR(50) NOT NULL,
    CONSTRAINT unique_student_sport UNIQUE (student_id, sport_id)
);

-- Pagamentos
CREATE TABLE payment (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    value DECIMAL(10, 2) NOT NULL,
    date DATE NOT NULL,
    reference_month INTEGER NOT NULL
);

-- Relacionamento entre pagamento e matrícula
CREATE TABLE registration_payment (
    registration_id UUID NOT NULL REFERENCES registration(id) ON DELETE CASCADE,
    payment_id UUID NOT NULL REFERENCES payment(id) ON DELETE CASCADE,
    CONSTRAINT unique_registration_payment UNIQUE (registration_id, payment_id)
);

-- Mensagens
CREATE TABLE message (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    template TEXT NOT NULL
);

-- Chaves secretas ou tokens
CREATE TABLE security (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    value TEXT NOT NULL
);

-- Configurações gerais do sistema
CREATE TABLE configuration (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    value TEXT NOT NULL
);
