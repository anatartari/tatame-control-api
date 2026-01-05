export enum RegistrationStatusEnum {
    ACTIVE = 'ACTIVE',
    INACTIVE = 'INACTIVE',
    PENDING = 'PENDING',
    CANCELLED = 'CANCELLED',
    SUSPENDED = 'SUSPENDED',
    EXPERIMENTAL = 'EXPERIMENTAL'
}

export const registrationStatusLabels = {
    [RegistrationStatusEnum.ACTIVE]: 'Ativa',
    [RegistrationStatusEnum.INACTIVE]: 'Inativa',
    [RegistrationStatusEnum.PENDING]: 'Pendente',
    [RegistrationStatusEnum.CANCELLED]: 'Cancelada',
    [RegistrationStatusEnum.SUSPENDED]: 'Suspensa',
    [RegistrationStatusEnum.EXPERIMENTAL]: 'Experimental'
};

export const getRegistrationStatusLabel = (status: RegistrationStatusEnum): string => {
    return registrationStatusLabels[status] || status;
};

export const isValidRegistrationStatus = (status: string): status is RegistrationStatusEnum => {
    return Object.values(RegistrationStatusEnum).includes(status as RegistrationStatusEnum);
}; 