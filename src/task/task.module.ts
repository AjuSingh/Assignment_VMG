import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Status } from 'src/entities/Status';
import { Task } from 'src/entities/Task';
import { Team } from 'src/entities/Team';
import { User } from 'src/entities/User';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';



@Module({
    imports: [TypeOrmModule.forFeature([User, Team, Task, Status])],
    controllers: [TaskController],
    providers: [TaskService],
})
export class TaskModule { }
