'use client'
import { Task } from '@/interfaces/task'
import { ArrowDownIcon, ArrowUpIcon } from '@chakra-ui/icons'
import {
	Checkbox,
	HStack,
	Icon,
	Select,
	Table,
	TableCaption,
	TableContainer,
	Tbody,
	Td,
	Text,
	Tfoot,
	Th,
	Thead,
	Tooltip,
	Tr,
	useColorMode,
	useMediaQuery,
} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import {
	MdCheckCircleOutline,
	MdImageSearch,
	MdOutlineCancel,
	MdOutlineDeleteForever,
	MdOutlineEdit,
} from 'react-icons/md'
import ModalCTA from './ModalCTA'
import TaskDetail from './TaskDetail'

interface DataTableProps {
	data: Task[]
	toggleCompletion: (taskId: number, currentStatus: boolean, title: string) => void
	deleteTask: (taskId: number, title: string) => void
	deleteMultipleTask: (selectedIds: Set<number>) => void
	onPerPageChange: (event: React.ChangeEvent<HTMLSelectElement>) => void
	markTasksCompletion: (taskIds: Set<number>, completed: boolean) => void
	onTaskUpdate: (updatedTask: Task) => void
}

const DataTable: React.FC<DataTableProps> = ({
	data,
	toggleCompletion,
	deleteTask,
	deleteMultipleTask,
	onPerPageChange,
	onTaskUpdate,
}) => {
	const [isDesktop] = useMediaQuery('(min-width: 768px)')
	const [deleteModal, setDeleteModal] = useState({
		isOpen: false,
		taskId: 0,
		taskTitle: '',
	})
	const [deleteMultiModal, setDeleteMultiModal] = useState(false)
	const [detailTask, setDetailTask] = useState({
		task: {} as Task,
		isOpen: false,
	})
	const [selectedTasks, setSelectedTasks] = useState<Set<number>>(new Set())
	const [sortConfig, setSortConfig] = useState<{
		key: keyof Task | 'executor.name'
		direction: 'ascending' | 'descending'
	} | null>(null)
	const { colorMode } = useColorMode()
	const handleCheckboxChange = (taskId: number) => {
		setSelectedTasks((prev) => {
			const newSet = new Set(prev)
			if (newSet.has(taskId)) {
				newSet.delete(taskId)
			} else {
				newSet.add(taskId)
			}
			return newSet
		})
	}

	const handleSort = (key: keyof Task | 'executor.name') => {
		setSortConfig((prevConfig) => {
			const direction =
				prevConfig && prevConfig.key === key && prevConfig.direction === 'ascending'
					? 'descending'
					: 'ascending'
			return { key, direction }
		})
	}
	const markTasksCompletion = (completed: boolean) => {
		selectedTasks.forEach((taskId) => {
			const task = data.find((task) => task.id === taskId)
			if (task) {
				const updatedTask = { ...task, completed: completed }
				onTaskUpdate(updatedTask)
			}
		})
		setSelectedTasks(new Set())
	}

	const deleteOneTask = (taskId: number, title: string) => {
		setDeleteModal({
			isOpen: true,
			taskId: taskId,
			taskTitle: title,
		})
	}
	const deleteMultiTask = () => {
		setDeleteMultiModal(false)
		deleteMultipleTask(selectedTasks)
		setSelectedTasks(new Set())
	}
	const deleteSlectedTasks = () => {
		selectedTasks.forEach((taskId) => {
			deleteTask(taskId, data.find((task) => task.id === taskId)?.title || '')
		})
		setSelectedTasks(new Set())
	}
	const taskDetail = (task: Task) => {
		setDetailTask({
			task: task,
			isOpen: true,
		})
	}
	const sortedData = React.useMemo(() => {
		if (!sortConfig) return data

		const { key, direction } = sortConfig
		return [...data].sort((a, b) => {
			let aValue: any, bValue: any

			if (key === 'executor.name') {
				aValue = a.executor?.name
				bValue = b.executor?.name
			} else {
				aValue = a[key]
				bValue = b[key]
			}

			if (aValue < bValue) return direction === 'ascending' ? -1 : 1
			if (aValue > bValue) return direction === 'ascending' ? 1 : -1
			return 0
		})
	}, [data, sortConfig])
	const isAllSelected = selectedTasks.size === data.length
	const areMultipleSelected = selectedTasks.size > 1
	return (
		<>
			<TaskDetail
				onClose={() => setDetailTask({ isOpen: false, task: {} as Task })}
				isOpen={detailTask.isOpen}
				task={detailTask.task}
				onConfirm={(updatedTask) => {
					onTaskUpdate(updatedTask)
				}}
			/>

			<ModalCTA
				onClose={() => setDeleteModal({ isOpen: false, taskId: 0, taskTitle: '' })}
				isOpen={deleteModal.isOpen}
				title={'¿Deseas borrar esta tarea?'}
				message={'Vas a eliminar la tarea ' + deleteModal.taskTitle}
				functionTitle={'Eliminar'}
				onConfirm={() => deleteTask(deleteModal.taskId, deleteModal.taskTitle)}
			/>
			<ModalCTA
				onClose={() => setDeleteMultiModal(false)}
				isOpen={deleteMultiModal}
				title={'¿Deseas borrar las tareas seleccionadas?'}
				message={`Vas a eliminar ${selectedTasks.size} tareas.`}
				functionTitle={'Eliminar'}
				onConfirm={deleteMultiTask}
			/>
			<HStack w={'80%'} mx={'auto'} my={4} justify={'flex-end'}>
				{isDesktop && (
					<>
						<HStack justify={'space-between'}>
							<Tooltip
								label="Marcar seleccionadas como Pendientes"
								hasArrow
								placement="bottom-start"
								aria-disabled={areMultipleSelected}>
								<Text
									cursor={!areMultipleSelected ? 'not-allowed' : 'pointer'}
									color={areMultipleSelected ? 'gray.500' : 'red.400'}
									onClick={() => markTasksCompletion(true)}>
									<Icon
										as={MdOutlineCancel}
										boxSize={6}
										color={!areMultipleSelected ? 'gray.500' : 'red.400'}
										opacity={!areMultipleSelected ? 0.4 : 1}
									/>
								</Text>
							</Tooltip>

							<Tooltip
								label="Marcar seleccionadas como Completadas"
								hasArrow
								placement="bottom-start"
								aria-disabled={!areMultipleSelected}>
								<Text
									cursor={!areMultipleSelected ? 'not-allowed' : 'pointer'}
									color={!areMultipleSelected ? 'gray.500' : 'green.400'}
									onClick={() => markTasksCompletion(false)}>
									<Icon
										as={MdCheckCircleOutline}
										boxSize={6}
										color={!areMultipleSelected ? 'gray.500' : 'green.400'}
										opacity={!areMultipleSelected ? 0.4 : 1}
									/>
								</Text>
							</Tooltip>
							<Tooltip
								label="Eliminar Tareas seleccionadas"
								hasArrow
								placement="bottom-start"
								aria-disabled={!areMultipleSelected}>
								<Text
									onClick={() => {
										setDeleteMultiModal(true)
									}}
									cursor={!areMultipleSelected ? 'not-allowed' : 'pointer'}
									color={!areMultipleSelected ? 'gray.500' : 'red.400'}>
									<Icon
										as={MdOutlineDeleteForever}
										boxSize={6}
										color={!areMultipleSelected ? 'gray.500' : 'red.400'}
										opacity={!areMultipleSelected ? 0.4 : 1}
									/>
								</Text>
							</Tooltip>
						</HStack>
					</>
				)}
				<Text fontWeight={'bold'} isTruncated>
					Cantidad de Tareas
				</Text>
				<Select maxW={'5rem'} onChange={onPerPageChange}>
					<option value="5">5</option>
					<option value="10">10</option>
					<option value="15">15</option>
					<option value="25">25</option>
					<option value="50">50</option>
				</Select>
			</HStack>
			<TableContainer w={'80%'} mx={'auto'}>
				<Table variant="striped">
					<TableCaption>Lista de Tareas a completar</TableCaption>
					<Thead>
						<Tr alignItems={'center'} bg={colorMode === 'light' ? 'gray.400' : 'gray.600'}>
							{isDesktop && <Th></Th>}
							<Th onClick={() => handleSort('title')} cursor="pointer">
								Título
								{sortConfig?.key === 'title' &&
									(sortConfig.direction === 'ascending' ? <ArrowUpIcon /> : <ArrowDownIcon />)}
							</Th>
							{isDesktop && (
								<>
									<Th onClick={() => handleSort('description')} cursor="pointer">
										Descripción
										{sortConfig?.key === 'description' &&
											(sortConfig.direction === 'ascending' ? <ArrowUpIcon /> : <ArrowDownIcon />)}
									</Th>
									<Th onClick={() => handleSort('executor.name')} cursor="pointer">
										Responsable
										{sortConfig?.key === 'executor.name' &&
											(sortConfig.direction === 'ascending' ? <ArrowUpIcon /> : <ArrowDownIcon />)}
									</Th>
									<Th onClick={() => handleSort('dueDate')} cursor="pointer">
										Entrega
										{sortConfig?.key === 'dueDate' &&
											(sortConfig.direction === 'ascending' ? <ArrowUpIcon /> : <ArrowDownIcon />)}
									</Th>
									<Th onClick={() => handleSort('priority')} cursor="pointer">
										Prioridad
										{sortConfig?.key === 'priority' &&
											(sortConfig.direction === 'ascending' ? <ArrowUpIcon /> : <ArrowDownIcon />)}
									</Th>
									<Th onClick={() => handleSort('completed')} cursor="pointer">
										Estado
										{sortConfig?.key === 'completed' &&
											(sortConfig.direction === 'ascending' ? <ArrowUpIcon /> : <ArrowDownIcon />)}
									</Th>
								</>
							)}
							<Th textAlign={'center'}>Acciones</Th>
						</Tr>
					</Thead>
					<Tbody>
						{sortedData.map((task) => (
							<Tr
								key={task.id}
								fontWeight={task.completed === true ? 'bold' : ''}
								color={
									colorMode === 'light'
										? task.completed
											? 'gray.400'
											: ''
										: task.completed
										? 'gray.600'
										: ''
								}>
								{isDesktop && (
									<Td>
										<Checkbox
											isChecked={selectedTasks.has(task.id)}
											onChange={() => handleCheckboxChange(task.id)}
										/>
									</Td>
								)}

								<Td maxW={'10rem'} isTruncated cursor={task.completed ? 'not-allowed' : 'default'}>
									{task.title}
								</Td>
								{isDesktop && (
									<>
										<Td maxW={'10rem'} isTruncated cursor={task.completed ? 'not-allowed' : 'default'}>
											{task.description}
										</Td>
										<Td isTruncated cursor={task.completed ? 'not-allowed' : 'default'}>
											{task.executor?.name}
										</Td>
										<Td cursor={task.completed ? 'not-allowed' : 'default'}>
											{new Date(task.dueDate).toLocaleDateString('es-ES')}
										</Td>
										<Td cursor={task.completed ? 'not-allowed' : 'default'}>
											{task.priority === true ? 'Alta' : 'Baja'}
										</Td>
										<Td cursor={task.completed ? 'not-allowed' : 'default'}>
											{task.completed === true ? 'Completada' : 'Pendiente'}
										</Td>
									</>
								)}

								<Td>
									<HStack justify={'space-between'} gap={2}>
										{task.completed === true ? (
											<Tooltip
												label="Marcar como Pendiente"
												hasArrow
												placement="bottom-start"
												aria-disabled={areMultipleSelected}>
												<Text
													cursor={areMultipleSelected ? 'not-allowed' : 'pointer'}
													color={areMultipleSelected ? 'gray.500' : 'red.400'}
													onClick={() => {
														if (!areMultipleSelected) {
															toggleCompletion(task.id, task.completed, task.title)
														}
													}}>
													<Icon
														as={MdCheckCircleOutline}
														boxSize={6}
														color={areMultipleSelected ? 'gray.500' : 'green.400'}
														opacity={areMultipleSelected ? 0.4 : 1}
													/>
												</Text>
											</Tooltip>
										) : (
											<Tooltip
												label="Marcar como Completada"
												hasArrow
												placement="bottom-start"
												aria-disabled={areMultipleSelected}>
												<Text
													cursor={areMultipleSelected ? 'not-allowed' : 'pointer'}
													color={areMultipleSelected ? 'gray.500' : 'green.400'}
													onClick={() => {
														if (!areMultipleSelected) {
															toggleCompletion(task.id, task.completed, task.title)
														}
													}}>
													<Icon
														as={MdOutlineCancel}
														boxSize={6}
														color={areMultipleSelected ? 'gray.500' : 'red.400'}
														opacity={areMultipleSelected ? 0.4 : 1}
													/>
												</Text>
											</Tooltip>
										)}
										<Tooltip
											label="Ver/Editar Tarea"
											hasArrow
											placement="bottom-start"
											aria-disabled={areMultipleSelected}>
											<Text
												onClick={() => taskDetail(task)}
												cursor={areMultipleSelected ? 'not-allowed' : 'pointer'}
												color={areMultipleSelected ? 'gray.500' : 'inherit'}>
												<Icon
													as={MdImageSearch}
													boxSize={6}
													color={areMultipleSelected ? 'gray.500' : 'blue.400'}
													opacity={areMultipleSelected ? 0.4 : 1}
												/>
											</Text>
										</Tooltip>
										<Tooltip
											label="Eliminar Tarea"
											hasArrow
											placement="bottom-start"
											aria-disabled={areMultipleSelected}>
											<Text
												onClick={() => {
													if (!areMultipleSelected) {
														deleteOneTask(task.id, task.title)
													}
												}}
												cursor={areMultipleSelected ? 'not-allowed' : 'pointer'}
												color={areMultipleSelected ? 'gray.500' : 'red.400'}>
												<Icon
													as={MdOutlineDeleteForever}
													boxSize={6}
													color={areMultipleSelected ? 'gray.500' : 'red.400'}
													opacity={areMultipleSelected ? 0.4 : 1}
												/>
											</Text>
										</Tooltip>
									</HStack>
								</Td>
							</Tr>
						))}
					</Tbody>
					<Tfoot>
						<Tr>
							<Td colSpan={8}>{/* Puedes agregar aquí un pie de página si es necesario */}</Td>
						</Tr>
					</Tfoot>
				</Table>
			</TableContainer>
		</>
	)
}

export default DataTable
