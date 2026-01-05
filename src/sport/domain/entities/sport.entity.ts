import { Column, Entity, OneToMany } from "typeorm";
import { BaseEntity } from "../../../global/entities/base.entity";
import { Registration } from "../../../registration/domain/entities/registration.entity";

@Entity()
export class Sport extends BaseEntity {
    @Column({ length: 50, nullable: false })
    name: string;

    @Column({ length: 255, nullable: false })
    sensei: string;

    @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
    price: number;

    @Column({ name: "dayOfWeek", length: 50, nullable: false })
    dayOfWeek: string;

    @Column({ name: "startTime", type: 'time', nullable: false })
    startTime: string;

    @Column({ name: "endTime", type: 'time', nullable: false })
    endTime: string;

    @Column({ name: "active", type: 'boolean', nullable: false, default: true })
    active: boolean;

    @OneToMany(() => Registration, registration => registration.sport)
    registrations: Registration[];
}

