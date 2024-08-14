'use client'
import { Task } from '@/interfaces/task'
import {
	Button,
	FormControl,
	FormLabel,
	HStack,
	Input,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Select,
	Switch,
	Textarea,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { executors } from '../data/mockdata'

interface TaskDetail {
	task: Task
	onConfirm: (updatedTask: Task) => void
	onClose: () => void
	isOpen: boolean
}

const TaskDetail: React.FC<TaskDetail> = ({ onClose, isOpen, task, onConfirm }) => {
	const [edit, setEdit] = useState(false)
	const [localTask, setLocalTask] = useState<Task>(task)

	useEffect(() => {
		setLocalTask(task)
	}, [task])
	const formatDateToLocalString = (date: Date | string | undefined) => {
		if (!date) return ''
		const dateObj = new Date(date)
		if (isNaN(dateObj.getTime())) return ''
		return dateObj.toISOString().slice(0, 16)
	}

	const handleSave = () => {
		onConfirm(localTask)
		setEdit(false)
		onClose()
	}

	return (
		<>
			<Modal
				isOpen={isOpen}
				onClose={() => {
					setEdit(false)
					onClose()
				}}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader mt={8}>
						<Input
							variant="flushed"
							placeholder="Título de la Tarea"
							value={localTask.title}
							isDisabled={!edit}
							onChange={(e) => setLocalTask({ ...localTask, title: e.target.value })}
						/>
					</ModalHeader>
					<ModalCloseButton onClick={onClose} />
					<ModalBody>
						<Textarea
							mt={6}
							variant="flushed"
							placeholder="Descripción de la Tarea"
							value={localTask.description}
							isDisabled={!edit}
							onChange={(e) => setLocalTask({ ...localTask, description: e.target.value })}
						/>
						<HStack mt={6}>
							<FormControl display="flex" alignItems="center" isDisabled={!edit}>
								<FormLabel htmlFor="priority" mb="0">
									Alta Prioridad
								</FormLabel>
								<Switch
									id="priority"
									isChecked={localTask.priority}
									onChange={(e) => setLocalTask({ ...localTask, priority: e.target.checked })}
								/>
							</FormControl>
							<Input
								isDisabled={!edit}
								placeholder="Fecha de Entrega"
								size="md"
								type="datetime-local"
								value={formatDateToLocalString(localTask.dueDate)}
								onChange={(e) => setLocalTask({ ...localTask, dueDate: new Date(e.target.value) })}
							/>
						</HStack>
						<Select
							value={localTask.executor?.id.toString() || ''}
							isDisabled={!edit}
							mt={6}
							placeholder="Selecciona un responsable"
							onChange={(e) => {
								const selectedExecutorId = Number(e.target.value) // Convierte el valor a número
								const selectedExecutor =
									executors.find((executor) => executor.id === selectedExecutorId) || null
								setLocalTask({
									...localTask,
									executor: selectedExecutor,
								})
							}}>
							{executors.map((executor) => (
								<option key={executor.id} value={executor.id}>
									{executor.name}
								</option>
							))}
						</Select>
					</ModalBody>

					<ModalFooter mt={6}>
						<Button
							colorScheme="blue"
							mr={3}
							onClick={() => {
								if (edit) {
									handleSave()
								} else {
									setEdit(true)
								}
							}}>
							{edit ? 'Guardar' : 'Editar'}
						</Button>
						<Button
							variant="ghost"
							onClick={() => {
								setEdit(false)
								onClose()
							}}>
							Cancelar
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	)
}

export default TaskDetail
