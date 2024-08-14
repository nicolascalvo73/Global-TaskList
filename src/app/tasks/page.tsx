/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import DataTable from '@/componets/DataTable'
import NavBar from '@/componets/NavBar'
import { tasks } from '@/data/mockdata'
import { Task } from '@/interfaces/task'
import { exportToExcel } from '@/utils/exportToExcel'
import { Search2Icon } from '@chakra-ui/icons'
import {
	Button,
	HStack,
	Icon,
	Input,
	InputGroup,
	InputLeftElement,
	Tooltip,
	useMediaQuery,
	useToast,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { SiMicrosoftexcel } from 'react-icons/si'

export default function Home() {
	const [tableTasks, setTableTasks] = useState<Task[]>([])
	const [backupTasks, setBackupTasks] = useState<Task[]>(tasks)
	const [detailTask, setDetailTask] = useState<Task | null>(null)
	const [perPage, setPerPage] = useState(5)
	const [selectedTasks, setSelectedTasks] = useState<Set<number>>(new Set())
	const [selectedAll, setSelectedAll] = useState(false)
	const toast = useToast()
	const [search, setsearch] = useState('')
	const [filterKeys, setFilterKeys] = useState<string[]>([])
	const [isDesktop] = useMediaQuery('(min-width: 768px)')
	const toggleFilterKey = (key: string) => {
		setFilterKeys((prevFilterKeys) => {
			if (prevFilterKeys.includes(key)) {
				return prevFilterKeys.filter((filterKey) => filterKey !== key)
			}
			const exclusiveFilters = {
				time: ['past', 'today', 'future'],
				status: ['completed', 'pending'],
				priority: ['highPriority', 'lowPriority'],
			}
			const filterCategory = Object.keys(exclusiveFilters).find((category) =>
				exclusiveFilters[category as keyof typeof exclusiveFilters].includes(key)
			)
			const filteredKeys = filterCategory
				? prevFilterKeys.filter(
						(f) => !exclusiveFilters[filterCategory as keyof typeof exclusiveFilters].includes(f)
				  )
				: prevFilterKeys
			return [...filteredKeys, key]
		})
	}

	const toggleTaskCompletion = (taskId: number, currentStatus: boolean, title: string) => {
		setBackupTasks((prevTasks) =>
			prevTasks.map((task) => (task.id === taskId ? { ...task, completed: !currentStatus } : task))
		)
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
		setBackupTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId))
		setTableTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId))
		toast({
			title: `La tarea "${title}" fue eliminada.`,
			status: 'error',
			duration: 3000,
			isClosable: true,
		})
	}
	const deleteMultipleTask = (selectedIds: Set<number>) => {
		setBackupTasks((prevTasks) => prevTasks.filter((task) => !selectedIds.has(task.id)))
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

	const updateTask = (updatedTask: Task) => {
		setTableTasks((prevTasks) => prevTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task)))
		setBackupTasks((prevTasks) => prevTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task)))
	}

	useEffect(() => {
		setTableTasks(backupTasks.slice(0, perPage))
	}, [, backupTasks, perPage])

	useEffect(() => {
		if (search.length > 3) {
			const filteredTasks = tableTasks.filter((task) => {
				const searchLower = search.toLowerCase()
				return Object.values(task).some((value) =>
					typeof value === 'object' && value !== null && 'name' in value
						? String((value as any).name)
								.toLowerCase()
								.includes(searchLower)
						: String(value).toLowerCase().includes(searchLower)
				)
			})
			setTableTasks(filteredTasks.slice(0, perPage))
		} else {
			setTableTasks(backupTasks.slice(0, perPage))
		}
	}, [search, backupTasks])

	useEffect(() => {
		const today = new Date().setHours(0, 0, 0, 0)

		const filteredTasks = backupTasks.filter((task) => {
			const dueDate = new Date(task.dueDate).setHours(0, 0, 0, 0)

			const isPast = dueDate < today
			const isToday = dueDate === today
			const isFuture = dueDate > today
			const isHighPriority = task.priority === true
			const isLowPriority = task.priority === false
			const isCompleted = task.completed === true
			const isPending = task.completed === false

			const matchesPast = filterKeys.includes('past') ? isPast : true
			const matchesToday = filterKeys.includes('today') ? isToday : true
			const matchesFuture = filterKeys.includes('future') ? isFuture : true
			const matchesHighPriority = filterKeys.includes('highPriority') ? isHighPriority : true
			const matchesLowPriority = filterKeys.includes('lowPriority') ? isLowPriority : true
			const matchesCompleted = filterKeys.includes('completed') ? isCompleted : true
			const matchesPending = filterKeys.includes('pending') ? isPending : true

			return (
				matchesPast &&
				matchesToday &&
				matchesFuture &&
				matchesHighPriority &&
				matchesLowPriority &&
				matchesCompleted &&
				matchesPending
			)
		})

		setTableTasks(filteredTasks.slice(0, perPage))
	}, [filterKeys, backupTasks])

	return (
		<>
			<NavBar />
			{/* 'Buscador' */}
			<HStack w={'80%'} m={'auto'} mt={20} justify={'space-between'}>
				<InputGroup w={'80%'}>
					<InputLeftElement pointerEvents="none">
						<Search2Icon />
					</InputLeftElement>
					<Input
						variant="flushed"
						placeholder="Busca una tarea..."
						value={search}
						onChange={(e) => {
							setsearch(e.target.value)
						}}
					/>
				</InputGroup>
				{/* 'filters' */}
				{isDesktop && (
					<HStack gap={2}>
						<Button
							p={2}
							variant={filterKeys.includes('past') ? 'solid' : 'outline'}
							onClick={() => toggleFilterKey('past')}>
							Pasadas
						</Button>
						<Button
							p={2}
							variant={filterKeys.includes('today') ? 'solid' : 'outline'}
							onClick={() => toggleFilterKey('today')}>
							Hoy
						</Button>
						<Button
							p={2}
							variant={filterKeys.includes('future') ? 'solid' : 'outline'}
							onClick={() => toggleFilterKey('future')}>
							Futuras
						</Button>
						<Button
							p={2}
							variant={filterKeys.includes('highPriority') ? 'solid' : 'outline'}
							onClick={() => toggleFilterKey('highPriority')}>
							Prioridad Alta
						</Button>
						<Button
							p={2}
							variant={filterKeys.includes('lowPriority') ? 'solid' : 'outline'}
							onClick={() => toggleFilterKey('lowPriority')}>
							Prioridad Baja
						</Button>
						<Button
							p={2}
							variant={filterKeys.includes('completed') ? 'solid' : 'outline'}
							onClick={() => toggleFilterKey('completed')}>
							Completadas
						</Button>
						<Button
							variant={filterKeys.includes('pending') ? 'solid' : 'outline'}
							onClick={() => toggleFilterKey('pending')}
							p={2}>
							Pendientes
						</Button>
					</HStack>
				)}
				<Tooltip label="Descargar tareas en Excel" hasArrow placement="bottom-end">
					<Button variant={'outline'} onClick={() => exportToExcel(tableTasks)}>
						<Icon as={SiMicrosoftexcel} />
					</Button>
				</Tooltip>
			</HStack>
			<DataTable
				onPerPageChange={handlePerPageChange}
				data={tableTasks}
				toggleCompletion={toggleTaskCompletion}
				deleteTask={deleteTask}
				deleteMultipleTask={deleteMultipleTask}
				markTasksCompletion={function (taskIds: Set<number>, completed: boolean): void {
					throw new Error('Function not implemented.')
				}}
				onTaskUpdate={updateTask}
			/>
		</>
	)
}
