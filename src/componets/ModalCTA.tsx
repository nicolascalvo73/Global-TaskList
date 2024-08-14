import {
	Button,
	ModalBody,
	Modal,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	useDisclosure,
	Text,
} from '@chakra-ui/react'

interface ModalCTAProps {
	title: string
	message: string
	functionTitle: string
	onConfirm: () => void
	onClose: () => void
	isOpen: boolean
}

const ModalCTA: React.FC<ModalCTAProps> = ({ onClose, isOpen, title, message, functionTitle, onConfirm }) => {
	return (
		<>
			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>{title}</ModalHeader>
					<ModalCloseButton onClick={onClose} />
					<ModalBody>
						<Text>{message}</Text>
					</ModalBody>

					<ModalFooter>
						<Button
							colorScheme="blue"
							mr={3}
							onClick={() => {
								onConfirm()
								onClose()
							}}>
							{functionTitle}
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

export default ModalCTA
