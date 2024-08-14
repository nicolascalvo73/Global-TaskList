'use client'
import DataTable from '@/componets/DataTable'
import NavBar from '@/componets/NavBar'
import { tasks } from '@/data/mockdata'
import { Task } from '@/interfaces/task'
import { useDisclosure, useToast } from '@chakra-ui/react'
import { useEffect, useState } from 'react'

export default function Home() {
	const [tableTasks, setTableTasks] = useState<Task[]>([])
	const [backupTasks, setBackupTasks] = useState<Task[]>([])
	const [perPage, setPerPage] = useState(50)
	const [selectedTasks, setSelectedTasks] = useState<Set<number>>(new Set())
	const [selectedAll, setSelectedAll] = useState(false)
	const toast = useToast()

	const toggleTaskCompletion = (taskId: number, currentStatus: boolean, title: string) => {
		setTableTasks((prevTasks) =>
			prevTasks.map((task) => (task.id === taskId ? { ...task, completed: !currentStatus } : task))
		)
		toast({
			title: currentStatus
				? `La tarea "${title}" cambió a estado pendiente.`
				: `La tarea "${title}" cambió a estado completado!`,
			status: currentStatus ? 'error' : 'success',
			duration: 3000,
			isClosable: true,
		})
	}

	const deleteTask = (taskId: number, title: string) => {
		setTableTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId))
		toast({
			title: `La tarea "${title}" fue eliminada.`,
			status: 'error',
			duration: 3000,
			isClosable: true,
		})
	}
	const deleteMultipleTask = (selectedIds: Set<number>) => {
		setTableTasks((prevTasks) => prevTasks.filter((task) => !selectedIds.has(task.id)))
		toast({
			title: `Las tareas seleccionadas fueron eliminadas.`,
			status: 'error',
			duration: 3000,
			isClosable: true,
		})
	}

	const handlePerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		const newPerPage = parseInt(event.target.value, 10)
		setPerPage(newPerPage)
	}

	useEffect(() => {
		setBackupTasks(tasks)
		setTimeout(() => {
			setPerPage(5)
		}, 1000)
	}, [])

	useEffect(() => {
		setTableTasks(backupTasks.slice(0, perPage))
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [perPage])

	return (
		<>
			<NavBar />
			<DataTable
				onPerPageChange={handlePerPageChange}
				data={tableTasks}
				toggleCompletion={toggleTaskCompletion}
				deleteTask={deleteTask}
				deleteMultipleTask={deleteMultipleTask}
				markTasksCompletion={function (taskIds: Set<number>, completed: boolean): void {
					throw new Error('Function not implemented.')
				}}
			/>
		</>
	)
}
