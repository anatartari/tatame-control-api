import { Registration } from "src/registration/entities/registration.entity";
import { Column, Entity, OneToMany } from "typeorm";
import { BaseEntity } from "../../global/entities/base.entity";

@Entity()
export class Sport extends BaseEntity {
    @Column({ length: 50, nullable: false })
    name: string;

    @Column({ length: 255, nullable: false })
    sensei: string;

    @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
    price: number;

    @Column({ name: "day_of_week", length: 50, nullable: false })
    dayOfWeek: string;

    @Column({ name: "start_time", type: 'time', nullable: false })
    startTime: string;

    @Column({ name: "end_time", type: 'time', nullable: false })
    endTime: string;

    @Column({ name: "active", type: 'boolean', nullable: false, default: true })
    active: boolean;

    @OneToMany(() => Registration, registration => registration.sport)
    registrations: Registration[];
}
