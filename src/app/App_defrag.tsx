import './App.css';
import {Todolist} from "../Todolist";
import React, {useState} from "react";
import {AddItemForm} from "../AddItemForm";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Container from "@mui/material/Container";
import Grid from '@mui/material/Grid2';
import Paper from '@mui/material/Paper';
import {MenuButton} from "../MenuButton";
import {createTheme, ThemeProvider} from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import CssBaseline from "@mui/material/CssBaseline";
import {
	addTodolistAC,
	changeTodolistFilterAC,
	changeTodolistTitleAC,
	removeTodolistAC
} from "../model/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "../model/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "./store";
import {Todolist_defrag} from "../Todolist_defrag";

export type TaskType = {
	id: string
	title: string
	isDone: boolean
}
export type FilterValuesType = 'all' | 'active' | 'completed'
export type TodolistType = {
	id: string
	title: string
	filter: FilterValuesType
}
export type TasksStateType = {
	[key: string]: TaskType[]
}
type ThemeMode = 'dark' | 'light'

function App_defrag() {

	// let tasks = useSelector<RootState, TasksStateType>(state => state.tasks)
	let todolists = useSelector<RootState, TodolistType[]>(state => state.todolists)

	const dispatch = useDispatch()

	//========================================================================
	const [themeMode, setThemeMode] = useState<ThemeMode>('dark')
	const theme = createTheme({
		palette: {
			mode: themeMode === 'light' ? 'light' : 'dark',
			primary: {
				main: '#087EA4',
			},
		},
	});
	//=========================================================================

/*	const removeTask = (taskId: string, todolistId: string) => {
		dispatch(removeTaskAC({taskId,todolistId}))
	}

	const addTask = (title: string, todolistId: string) => {
		dispatch(addTaskAC({title, todolistId}))
	}

	const changeTaskStatus = (taskId: string, taskStatus: boolean, todolistId: string) => {
		dispatch(changeTaskStatusAC({taskId, isDone: taskStatus, todolistId}))
	}

	const updateTask = (todolistId: string, taskId: string, title: string) => {
		dispatch(changeTaskTitleAC({taskId, title, todolistId }))
	}

	const changeFilter = (filter: FilterValuesType, todolistId: string) => {
		dispatch(changeTodolistFilterAC({id: todolistId, filter}))
	}

	const removeTodolist = (todolistId: string) => {
		dispatch( removeTodolistAC(todolistId))
	}


	const updateTodolist = (todolistId: string, title: string) => {
		dispatch(changeTodolistTitleAC({id: todolistId, title}))
	}*/

	//===========================================================================

	const addTodolist = (title: string) => {
		dispatch(addTodolistAC(title))
	}

	const changeModeHandler = () => {
		setThemeMode(themeMode === "light" ? "dark" : 'light')
	}

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline/>
			<AppBar position="static" sx={{mb: '30px'}}>
				<Toolbar sx={{display: 'flex', justifyContent: 'space-between'}}>
					<IconButton color="inherit">
						<MenuIcon/>
					</IconButton>
					<div>
						<MenuButton>Login</MenuButton>
						<MenuButton>Logout</MenuButton>
						<MenuButton background={theme.palette.primary.dark}>Faq</MenuButton>
						<Switch color={'default'} onChange={changeModeHandler}/>
					</div>
				</Toolbar>
			</AppBar>
			<Container fixed>
				<Grid container sx={{mb: '30px'}}>
					<AddItemForm addItem={addTodolist}/>
				</Grid>

				<Grid container spacing={4}>
					{todolists.map((tl) => {

						return (
							<Grid key={tl.id}>
								<Paper sx={{p: '0 20px 20px 20px'}}>
									<Todolist_defrag todoList={tl}/>
								</Paper>
							</Grid>
						)
					})}
				</Grid>
			</Container>
		</ThemeProvider>
	);
}

export default App_defrag;
