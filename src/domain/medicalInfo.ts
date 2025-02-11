export interface MedicalInfo {
    id: number;
    smoker: boolean;
    last_blood_pressure_check: string;
    last_blood_pressure_measurement: string;
    has_family_history_of_diabetes: boolean;
    known_heart_condition: boolean;
    had_high_cholesterol_recently: boolean;
    overweight_amount: number;
    orthopedic_issue_location: string;
    prescribed_medication: string;
    uses_supplements: string;
    last_physical_exam_date: Date;
    does_regular_exercise: boolean;
    might_be_pregnant: boolean;
    fitness_declaration: boolean;
}