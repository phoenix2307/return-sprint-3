import {ChangeEvent} from "react";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from "@mui/material/Button";
import Checkbox from '@mui/material/Checkbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Box from "@mui/material/Box";
import {filterButtonsContainerSx, getListItemSx} from "./Todolist.styles";
import {FilterValuesType, TaskType} from "./app/App";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "./app/store";
import {TasksStateType, TodolistType} from "./app/App_defrag";
import {changeTodolistFilterAC, changeTodolistTitleAC, removeTodolistAC} from "./model/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./model/tasks-reducer";


type PropsType = {
    todoList: TodolistType
}

export const Todolist_defrag = (props: PropsType) => {
    const {todoList} = props

    //=================================================================================

    let tasks = useSelector<RootState, TasksStateType>(state => state.tasks)
    const dispatch = useDispatch()

    let allTodolistTasks: TaskType[] = tasks[todoList.id]
    let tasksForTodolist = allTodolistTasks

    if (todoList.filter === 'active') {
        tasksForTodolist = allTodolistTasks.filter(task => !task.isDone)
    }

    if (todoList.filter === 'completed') {
        tasksForTodolist = allTodolistTasks.filter(task => task.isDone)
    }

    //==========================================================================

    const changeFilterTasksHandler = (filter: FilterValuesType) => {
        dispatch(changeTodolistFilterAC({id: todoList.id, filter}))
    }

    const removeTodolistHandler = () => {
        dispatch(removeTodolistAC(todoList.id))
    }

    const addTaskCallback = (title: string) => {
        dispatch(addTaskAC({title, todolistId: todoList.id}))
    }

    const updateTodolistHandler = (title: string) => {
        dispatch(changeTodolistTitleAC({id: todoList.id, title}))
    }

    return (
        <div>
            <div className={"todolist-title-container"}>
                <h3><EditableSpan value={todoList.title} onChange={updateTodolistHandler}/></h3>
                <IconButton onClick={removeTodolistHandler}>
                    <DeleteIcon/>
                </IconButton>
            </div>
            <AddItemForm addItem={addTaskCallback}/>
            {
                tasksForTodolist.length === 0
                    ? <p>Тасок нет</p>
                    : <List>
                        {tasksForTodolist.map((task) => {

                            const removeTaskHandler = () => {
                                dispatch(removeTaskAC({taskId: task.id, todolistId: todoList.id}))
                            }
                            const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                                const newStatusValue = e.currentTarget.checked
                                dispatch(changeTaskStatusAC({
                                    taskId: task.id,
                                    isDone: newStatusValue,
                                    todolistId: todoList.id
                                }))
                            }
                            const changeTaskTitleHandler = (title: string) => {
                                dispatch(changeTaskTitleAC({taskId: task.id, title, todolistId: todoList.id}))
                            }

                            return (
                                <ListItem key={task.id} sx={getListItemSx(task.isDone)}>
                                    <div>
                                        <Checkbox checked={task.isDone} onChange={changeTaskStatusHandler}/>
                                        <EditableSpan value={task.title} onChange={changeTaskTitleHandler}/>
                                    </div>
                                    <IconButton onClick={removeTaskHandler}>
                                        <DeleteIcon/>
                                    </IconButton>
                                </ListItem>
                            )
                        })}
                    </List>
            }
            <Box sx={filterButtonsContainerSx}>
                <Button
                    variant={todoList.filter === 'all' ? 'outlined' : 'text'}
                    color={'inherit'}
                    onClick={() => changeFilterTasksHandler('all')}>
                    All
                </Button>
                <Button
                    variant={todoList.filter === 'active' ? 'outlined' : 'text'}
                    color={'primary'}
                    onClick={() => changeFilterTasksHandler('active')}>
                    Active
                </Button>
                <Button
                    variant={todoList.filter === 'completed' ? 'outlined' : 'text'}
                    color={'secondary'}
                    onClick={() => changeFilterTasksHandler('completed')}>
                    Completed
                </Button>
            </Box>
        </div>
    )
}
