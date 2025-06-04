export enum TaskStage {
    TODO = 'todo',
    INPROGRESS = 'inprogress',
    INREVIEW = 'inreview',
    COMPLETED = 'completed'
}

export enum TaskPriority {
    LOW = 'low',
    MEDIUM = 'medium',
    HIGH = 'high'
}

export interface SubTask {
    name: string;
    description: string;
    status: TaskStage;
}

export interface Task {
    name: string;
    description: string;
    status: TaskStage;
    priority: TaskPriority;
    assets: string[];
    subtasks: SubTask[];
}