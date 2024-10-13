import {TasksStateType} from "../App";

// let todolistID1 = v1()
// let todolistID2 = v1()
//
// let [todolists, setTodolists] = useState<TodolistType[]>([
//     {id: todolistID1, title: 'What to learn', filter: 'all'},
//     {id: todolistID2, title: 'What to buy', filter: 'all'},
// ])
//
// let [tasks, setTasks] = useState<TasksStateType>({
//     [todolistID1]: [
//         {id: v1(), title: 'HTML&CSS', isDone: true},
//         {id: v1(), title: 'JS', isDone: true},
//         {id: v1(), title: 'ReactJS', isDone: false},
//     ],
//     [todolistID2]: [
//         {id: v1(), title: 'Rest API', isDone: true},
//         {id: v1(), title: 'GraphQL', isDone: false},
//     ],
// })


export type DeleteTaskACType = ReturnType<typeof deleteTaskAC>
export type AddTaskACType = ReturnType<typeof addTaskAC>
export type ChangeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>
export type ChangeTitleTaskACType = ReturnType<typeof changeTitleTaskAC>
export type AddTodolistInTasksReducerACType = ReturnType<typeof addTodolistInTasksReducerAC>

export type ActionTypes = DeleteTaskACType
    | AddTaskACType
    | ChangeTaskStatusACType
    | ChangeTitleTaskACType
    | AddTodolistInTasksReducerACType

export const tasksReducer = (state: TasksStateType, action: ActionTypes) => {
    switch (action.type) {
        case "DELETE-TASK": {
            return {
                ...state,
                [action.payload.todoID]: state[action.payload.todoID]
                    .filter(t => t.id !== action.payload.taskID)
            }
        }
        case "ADD-TASK": {
            const newTask = {id: '4', title: action.payload.title, isDone: false}
            return {
                ...state,
                [action.payload.todolistId]: [newTask, ...state[action.payload.todolistId]]
            }
        }
        case "CHANGE-STATUS-TASK": {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId]
                    .map(t => t.id === action.payload.taskId ? {...t, isDone: action.payload.isDone} : t)
            }
        }
        case "CHANGE-TITLE-TASK": {
            return {
                ...state, [action.payload.todolistId]: state[action.payload.todolistId]
                    .map(t => t.id === action.payload.taskId ? {...t, title: action.payload.title} : t)
            }
        }
        case "ADD-TODO-IN-TASKS-REDUCER":{
            return {...state, [action.payload.todolistID]: []}
        }
        default:
            return state
    }
}

// type FirstACType = ReturnType<typeof firstAC>
// const firstAC = () => {
//     return {
//         type: ''
//     } as const
// }
//
// type SecondACType = ReturnType<typeof secondAC>
// const secondAC = () => {
//     return {
//         type: ''
//     } as const
// }

export const deleteTaskAC = (todoID: string, taskID: string) => {
    return {
        type: 'DELETE-TASK',
        payload: {
            todoID,
            taskID
        }

    } as const
}

export const addTaskAC = (payload: { title: string, todolistId: string }) => {
    return {
        type: 'ADD-TASK',
        payload
    } as const
}

export const changeTaskStatusAC = (payload: {
    taskId: string,
    isDone: boolean,
    todolistId: string
}) => {
    return {
        type: 'CHANGE-STATUS-TASK',
        payload
    } as const
}

export const changeTitleTaskAC = (payload: {
    taskId: string,
    title: string,
    todolistId: string
}) => {
    return {
        type: 'CHANGE-TITLE-TASK',
        payload
    } as const
}

export const addTodolistInTasksReducerAC = (todolistID: string) => {
    return {
        type: 'ADD-TODO-IN-TASKS-REDUCER',
        payload: {
            todolistID
        }
    } as const
}