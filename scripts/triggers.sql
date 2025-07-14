
-- Função para atualizar updated_at automaticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers para atualizar updated_at automaticamente
CREATE TRIGGER update_address_updated_at BEFORE UPDATE ON address FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_medical_info_updated_at BEFORE UPDATE ON medical_info FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_student_updated_at BEFORE UPDATE ON student FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_sport_updated_at BEFORE UPDATE ON sport FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_experimental_class_updated_at BEFORE UPDATE ON experimental_class FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_registration_updated_at BEFORE UPDATE ON registration FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_payment_updated_at BEFORE UPDATE ON payment FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_message_updated_at BEFORE UPDATE ON message FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_security_updated_at BEFORE UPDATE ON security FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_configuration_updated_at BEFORE UPDATE ON configuration FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
