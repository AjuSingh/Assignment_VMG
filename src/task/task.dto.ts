export class CreateTaskDto {
    description: string;
    due_date: Date;
    statusId: number;
    userId?: number;
}

export class CreateTeamDto {
    name: string;
    members: number[]
}

export class AssignTaskDto {
    taskId: number;
    userId: number;
}

export class UpdateTaskDto {
    description?: string;
    due_date?: Date;
    statusId?: number;
    userId?: number;
}