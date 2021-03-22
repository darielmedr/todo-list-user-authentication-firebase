import Task from "./task";

export class UserTasks {
    constructor (
        public userId: string,
        public todo: Array<Task> = new Array<Task>(),
        public inProgress: Array<Task> = new Array<Task>(),
        public done: Array<Task> = new Array<Task>(),

    ) {}
}