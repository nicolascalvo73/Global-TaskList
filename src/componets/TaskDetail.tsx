'use client'
import { Task } from '@/interfaces/task'
import {
	Button,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Text,
} from '@chakra-ui/react'
import { useState } from 'react'

interface TaskDetail {
	task: Task
	onConfirm: () => void
	onClose: () => void
	isOpen: boolean
}

const TaskDetail: React.FC<TaskDetail> = ({ onClose, isOpen, task }) => {
	const [edit, setEdit] = useState(false)
	return (
		<>
			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>{task.title}</ModalHeader>
					<ModalCloseButton onClick={onClose} />
					<ModalBody>
						<Text>{}</Text>
					</ModalBody>

					<ModalFooter>
						<Button
							colorScheme="blue"
							mr={3}
							onClick={() => {
								// onConfirm()
								onClose()
							}}>
							{/* {functionTitle} */}
						</Button>
						<Button variant="ghost" onClick={() => onClose()}>
							Cancelar
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	)
}

export default TaskDetail
