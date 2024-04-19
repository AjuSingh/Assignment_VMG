import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository, UpdateResult } from 'typeorm';
import { User } from 'src/entities/User';
import { Task } from 'src/entities/Task';
import { Team } from 'src/entities/Team';
import { CreateTaskDto, AssignTaskDto, CreateTeamDto, UpdateTaskDto } from './task.dto';
import { Status } from 'src/entities/Status';

@Injectable()
export class TaskService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
        @InjectRepository(Task) private taskRepository: Repository<Task>,
        @InjectRepository(Team) private teamRepository: Repository<Team>,
        @InjectRepository(Status) private statusRepository: Repository<Status>,
    ) { }

    async createTask(taskDetails: CreateTaskDto): Promise<Task> {
        const task = new Task();
        let user;
        if (taskDetails.userId) {
            user = await this.userRepository.findOneBy({ id: taskDetails.userId })
        }
        const status = await this.statusRepository.findOne({ where: { id: taskDetails.statusId } });
        task.user = user;
        task.status = status;
        task.due_date = taskDetails.due_date;
        task.description = taskDetails.description;
        return await this.taskRepository.save(task);
    }

    async updateTask(id: number, updateTaskDetails: UpdateTaskDto): Promise<UpdateResult> {
        const task = await this.taskRepository.findOne({ where: { id } });
        if (updateTaskDetails.description) task.description = updateTaskDetails.description;
        if (updateTaskDetails.due_date) task.due_date = updateTaskDetails.due_date;
        if (updateTaskDetails.statusId) {
            const status = await this.statusRepository.findOne({ where: { id: updateTaskDetails.statusId } });
            task.status = status;
        }

        if (updateTaskDetails.userId) {
            const user = await this.userRepository.findOneBy({ id: updateTaskDetails.userId });
            task.user = user;
        }
        return await this.taskRepository.update(id, task);
    }

    async assignTask(id: number, userId: number): Promise<UpdateResult> {
        const task = await this.taskRepository.findOne({ where: { id } });
        const user = await this.userRepository.findOneBy({ id: userId });
        task.user = user;
        return await this.taskRepository.update(id, { user });
    }

    async getAssignedTask(userId: number): Promise<User> {
        return await this.userRepository.findOne({
            relations: {
                tasks: true
            },
            where: { id: userId }
        })
    }

    async createTeam(teamDetails: CreateTeamDto): Promise<Team> {
        const members = await this.userRepository.find({ where: { id: In(teamDetails.members) } })
        const team = new Team();
        team.name = teamDetails.name;
        team.members = members;
        return await this.teamRepository.save(team);
    }


}