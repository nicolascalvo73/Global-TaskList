import { writeFile, utils } from 'xlsx'
import { Task } from '@/interfaces/task'

export const exportToExcel = (data: Task[]) => {
	const transformedData = data.map((task) => ({
		...task,
		executor: task.executor ? task.executor.name : '',
	}))

	const wb = utils.book_new()
	const ws = utils.json_to_sheet(transformedData)

	utils.book_append_sheet(wb, ws, 'Tasks')
	writeFile(wb, 'tasks.xlsx')
}
