import { Executor } from '@/interfaces/executor'
import { Task } from '@/interfaces/task'

export const executors: Executor[] = [
	{ id: 1, name: 'Jorge Luis Borges' },
	{ id: 2, name: 'Alfonsina Storni' },
	{ id: 3, name: 'Leopoldo Marechal' },
	{ id: 4, name: 'Silvina Ocampo' },
	{ id: 5, name: 'Camila Sosa Villada' },
]

export const tasks: Task[] = [
	{
		id: 1691980800000,
		title: 'Revisar manuscrito',
		description: 'Revisar el manuscrito para la nueva novela de fantasía.',
		completed: true,
		dueDate: new Date('2024-08-14'),
		executor: { id: 1, name: 'Jorge Luis Borges' },
		priority: true,
	},
	{
		id: 1691980800001,
		title: 'Planificar libro',
		description: 'Planificar el esquema del próximo libro de poesía.',
		completed: false,
		dueDate: new Date('2024-08-14'),
		executor: { id: 2, name: 'Alfonsina Storni' },
		priority: false,
	},
	{
		id: 1691980800002,
		title: 'Revisión editorial',
		description: 'Realizar la revisión editorial de la novela histórica.',
		completed: false,
		dueDate: new Date('2024-08-14'),
		executor: { id: 3, name: 'Leopoldo Marechal' },
		priority: true,
	},
	{
		id: 1691980800003,
		title: 'Escribir artículo',
		description: 'Escribir un artículo sobre literatura del siglo XXI.',
		completed: true,
		dueDate: new Date('2024-08-14'),
		executor: { id: 4, name: 'Silvina Ocampo' },
		priority: false,
	},
	{
		id: 1691980800004,
		title: 'Preparar conferencia',
		description: 'Preparar una conferencia sobre autores contemporáneos.',
		completed: false,
		dueDate: new Date('2024-08-14'),
		executor: { id: 5, name: 'Camila Sosa Villada' },
		priority: true,
	},
	{
		id: 1691582400000,
		title: 'Investigar autores',
		description: 'Investigar la vida de autores clásicos para una biografía.',
		completed: false,
		dueDate: new Date('2024-07-24'),
		executor: { id: 1, name: 'Jorge Luis Borges' },
		priority: true,
	},
	{
		id: 1691678400001,
		title: 'Escribir prólogo',
		description: 'Escribir el prólogo para una colección de cuentos.',
		completed: true,
		dueDate: new Date('2024-07-30'),
		executor: { id: 2, name: 'Alfonsina Storni' },
		priority: false,
	},
	{
		id: 1691764800002,
		title: 'Revisión crítica',
		description: 'Realizar una revisión crítica de una novela contemporánea.',
		completed: true,
		dueDate: new Date('2024-08-01'),
		executor: { id: 3, name: 'Leopoldo Marechal' },
		priority: true,
	},
	{
		id: 1691851200003,
		title: 'Organizar taller',
		description: 'Organizar un taller de escritura creativa para principiantes.',
		completed: false,
		dueDate: new Date('2024-08-05'),
		executor: { id: 4, name: 'Silvina Ocampo' },
		priority: false,
	},
	{
		id: 1691937600004,
		title: 'Revisar propuesta',
		description: 'Revisar y ajustar la propuesta de un libro de no ficción.',
		completed: false,
		dueDate: new Date('2024-08-09'),
		executor: { id: 5, name: 'Camila Sosa Villada' },
		priority: true,
	},
	{
		id: 1691582400005,
		title: 'Leer manuscrito',
		description: 'Leer y proporcionar comentarios sobre un manuscrito de ciencia ficción.',
		completed: true,
		dueDate: new Date('2024-07-24'),
		executor: { id: 1, name: 'Jorge Luis Borges' },
		priority: false,
	},
	{
		id: 1691678400006,
		title: 'Actualizar blog',
		description: 'Actualizar el blog con reseñas de libros recientes.',
		completed: false,
		dueDate: new Date('2024-07-30'),
		executor: { id: 2, name: 'Alfonsina Storni' },
		priority: true,
	},
	{
		id: 1691764800007,
		title: 'Revisión de textos',
		description: 'Revisar textos para un nuevo proyecto de antología.',
		completed: true,
		dueDate: new Date('2024-08-01'),
		executor: { id: 3, name: 'Leopoldo Marechal' },
		priority: false,
	},
	{
		id: 1691851200008,
		title: 'Preparar artículo',
		description: 'Preparar un artículo sobre la influencia de la literatura en la cultura popular.',
		completed: false,
		dueDate: new Date('2024-08-05'),
		executor: { id: 4, name: 'Silvina Ocampo' },
		priority: true,
	},
	{
		id: 1691937600009,
		title: 'Organizar firma',
		description: 'Organizar una firma de libros para el lanzamiento de una novela.',
		completed: true,
		dueDate: new Date('2024-08-09'),
		executor: { id: 5, name: 'Camila Sosa Villada' },
		priority: false,
	},
	{
		id: 1691582400010,
		title: 'Analizar tendencias',
		description: 'Analizar las tendencias actuales en literatura juvenil.',
		completed: false,
		dueDate: new Date('2024-07-24'),
		executor: { id: 1, name: 'Jorge Luis Borges' },
		priority: true,
	},
	{
		id: 1691678400011,
		title: 'Escribir reseña',
		description: 'Escribir una reseña para una novela reciente de fantasía.',
		completed: false,
		dueDate: new Date('2024-07-30'),
		executor: { id: 2, name: 'Alfonsina Storni' },
		priority: false,
	},
	{
		id: 1691764800012,
		title: 'Preparar presentación',
		description: 'Preparar una presentación sobre la historia de la literatura latinoamericana.',
		completed: false,
		dueDate: new Date('2024-08-01'),
		executor: { id: 3, name: 'Leopoldo Marechal' },
		priority: true,
	},
	{
		id: 1691851200013,
		title: 'Revisar manuscritos',
		description: 'Revisar manuscritos para una antología de cuentos cortos.',
		completed: true,
		dueDate: new Date('2024-08-05'),
		executor: { id: 4, name: 'Silvina Ocampo' },
		priority: false,
	},
	{
		id: 1691937600014,
		title: 'Planificar conferencia',
		description: 'Planificar una conferencia sobre literatura clásica.',
		completed: false,
		dueDate: new Date('2024-08-09'),
		executor: { id: 5, name: 'Camila Sosa Villada' },
		priority: true,
	},
	{
		id: 1692076800000,
		title: 'Lanzar revista',
		description: 'Lanzar el nuevo número de la revista literaria.',
		completed: false,
		dueDate: new Date('2024-08-19'),
		executor: { id: 1, name: 'Jorge Luis Borges' },
		priority: true,
	},
	{
		id: 1692163200001,
		title: 'Evaluar manuscritos',
		description: 'Evaluar los manuscritos para el próximo concurso literario.',
		completed: false,
		dueDate: new Date('2024-08-21'),
		executor: { id: 2, name: 'Alfonsina Storni' },
		priority: false,
	},
	{
		id: 1692249600002,
		title: 'Publicar artículo',
		description: 'Publicar un artículo sobre la evolución del género de ciencia ficción.',
		completed: false,
		dueDate: new Date('2024-08-23'),
		executor: { id: 3, name: 'Leopoldo Marechal' },
		priority: true,
	},
	{
		id: 1692336000003,
		title: 'Revisar críticas',
		description: 'Revisar y responder a las críticas del nuevo libro.',
		completed: true,
		dueDate: new Date('2024-08-25'),
		executor: { id: 4, name: 'Silvina Ocampo' },
		priority: false,
	},
	{
		id: 1692422400004,
		title: 'Reunión con editor',
		description: 'Reunión con el editor para discutir el próximo proyecto.',
		completed: false,
		dueDate: new Date('2024-08-27'),
		executor: { id: 5, name: 'Camila Sosa Villada' },
		priority: true,
	},
	{
		id: 1692076800005,
		title: 'Actualizar antología',
		description: 'Actualizar la antología con los cuentos seleccionados.',
		completed: false,
		dueDate: new Date('2024-08-19'),
		executor: { id: 1, name: 'Jorge Luis Borges' },
		priority: false,
	},
	{
		id: 1692163200006,
		title: 'Escribir ensayo',
		description: 'Escribir un ensayo sobre la influencia de los autores latinoamericanos.',
		completed: false,
		dueDate: new Date('2024-08-21'),
		executor: { id: 2, name: 'Alfonsina Storni' },
		priority: true,
	},
	{
		id: 1692249600007,
		title: 'Organizar evento',
		description: 'Organizar un evento literario para el lanzamiento de un libro.',
		completed: true,
		dueDate: new Date('2024-08-23'),
		executor: { id: 3, name: 'Leopoldo Marechal' },
		priority: false,
	},
	{
		id: 1692336000008,
		title: 'Revisar propuestas',
		description: 'Revisar las propuestas para la nueva serie de novelas.',
		completed: true,
		dueDate: new Date('2024-08-25'),
		executor: { id: 4, name: 'Silvina Ocampo' },
		priority: true,
	},
	{
		id: 1692422400009,
		title: 'Publicar reseña',
		description: 'Publicar una reseña sobre la última novela de misterio.',
		completed: false,
		dueDate: new Date('2024-08-27'),
		executor: { id: 5, name: 'Camila Sosa Villada' },
		priority: false,
	},
	{
		id: 1692076800010,
		title: 'Preparar informe',
		description: 'Preparar el informe final sobre el proyecto de literatura contemporánea.',
		completed: false,
		dueDate: new Date('2024-08-19'),
		executor: { id: 1, name: 'Jorge Luis Borges' },
		priority: true,
	},
	{
		id: 1692163200011,
		title: 'Revisión editorial',
		description: 'Revisar y ajustar la propuesta de un libro de no ficción.',
		completed: false,
		dueDate: new Date('2024-08-21'),
		executor: { id: 2, name: 'Alfonsina Storni' },
		priority: false,
	},
	{
		id: 1692249600012,
		title: 'Escribir artículo',
		description: 'Escribir un artículo sobre la influencia de la literatura en la cultura popular.',
		completed: true,
		dueDate: new Date('2024-08-23'),
		executor: { id: 3, name: 'Leopoldo Marechal' },
		priority: true,
	},
]
