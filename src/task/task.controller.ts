import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Post,
    Put,
    UseGuards,
} from '@nestjs/common';
import { CreateTaskDto, AssignTaskDto, CreateTeamDto, UpdateTaskDto } from './task.dto';
import { TaskService } from './task.service';
import { AuthGuard } from './task.guard';
import { JwtService } from '@nestjs/jwt';


@Controller('task')
@UseGuards(new AuthGuard(new JwtService()))
export class TaskController {
    constructor(private taskService: TaskService) { }
    @Get('assignee/:userId')
    getAssignedTask(@Param('userId', ParseIntPipe) userId: number) {
        return this.taskService.getAssignedTask(userId);
    }

    @Post()
    createUser(@Body() createTaskDetails: CreateTaskDto) {
        return this.taskService.createTask(createTaskDetails);
    }

    @Put(':taskId')
    async updateTaskById(
        @Param('taskId', ParseIntPipe) taskId: number,
        @Body() updateTaskDetails: UpdateTaskDto,
    ) {
        await this.taskService.updateTask(taskId, updateTaskDetails);
    }

    @Post('assign')
    assignTask(
        @Body() assignTaskDetails: AssignTaskDto,
    ) {
        return this.taskService.assignTask(assignTaskDetails.taskId, assignTaskDetails.userId);
    }

    @Post('team')
    createTeam(
        @Body() createTeamDetails: CreateTeamDto,
    ) {
        return this.taskService.createTeam(createTeamDetails);
    }

    @Delete('team/:id')
    async deleteTeamById(
        @Param('id', ParseIntPipe) id: number,
    ) {
        await this.taskService.deleteTeam(id);
    }



}