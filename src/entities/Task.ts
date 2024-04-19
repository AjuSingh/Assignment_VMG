import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './User';
import { Status } from './Status';

@Entity({ name: 'tasks' })
export class Task {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    description: string;

    @Column()
    due_date: Date;

    @ManyToOne(() => Status, (status) => status.tasks)
    status: Status;

    @ManyToOne(() => User, (user) => user.tasks, { nullable: true })
    user: User;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;
}