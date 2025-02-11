export interface Student {
    id: number;
    name: string;
    email: string;
    phone?: string;
    gender?: string;
    birthday?: Date;
    allow_social_media: boolean;
    instagram?: string;
    address_id?: number;
    medical_info_id?: number;
}