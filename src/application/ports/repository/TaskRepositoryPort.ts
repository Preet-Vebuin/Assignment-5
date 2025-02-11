import { TaskType } from "../../../domain/models/Task"
export type TaskRepositoryPort = {
    // create : return type 
    create(data : TaskType) : Promise<TaskType>
    getAll() : Promise<TaskType[]>
    update(id : number ,data : Partial<TaskType>) : Promise<TaskType>
    delete(id : number) : Promise<boolean>
    findById(id : number) : Promise<TaskType>

}