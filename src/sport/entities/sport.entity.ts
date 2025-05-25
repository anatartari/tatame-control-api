import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Sport {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 50, nullable: false })
    name: string;

    @Column({ length: 255, nullable: false })
    sensei: string;

    @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
    price: number;

    @Column({ length: 50, nullable: false })
    day_of_week: string;

    @Column({ type: 'time', nullable: false })
    start_time: string;

    @Column({ type: 'time', nullable: false })
    end_time: string;
}
