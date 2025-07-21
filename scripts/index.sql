-- Índices para performance
CREATE INDEX idx_student_email ON student(email);
CREATE INDEX idx_student_phone ON student(phone);
CREATE INDEX idx_student_name ON student(name);
CREATE INDEX idx_registration_student_id ON registration(student_id);
CREATE INDEX idx_registration_sport_id ON registration(sport_id);
CREATE INDEX idx_registration_status ON registration(status);
CREATE INDEX idx_registration_created_at ON registration(created_at);
CREATE INDEX idx_payment_date ON payment(date);
CREATE INDEX idx_payment_reference_month ON payment(reference_month);
CREATE INDEX idx_sport_active ON sport(active);
CREATE INDEX idx_sport_name ON sport(name);