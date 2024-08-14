import { Executor } from './executor'

export interface Task {
	id: number
	title: string
	description: string
	completed: boolean
	dueDate: Date
	executor: Executor | null
	priority: boolean
}
