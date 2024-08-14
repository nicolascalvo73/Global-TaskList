'use client'
import { ChakraProvider } from '@chakra-ui/react'
import { FC } from 'react'
import theme from './theme'

const Layout: FC<{ children: React.ReactNode }> = ({ children }) => {
	return (
		<html lang="en">
			<head>
				<title>Challenge Task List - Nico</title>
				<meta
					name="description"
					content="Gestiona y organiza tus tareas de manera eficiente con la Task List. Edita y realiza un seguimiento de tus tareas con facilidad. Hecho con 💚."
				/>
				<meta property="og:title" content="Challenge Task List - Nico" />
				<meta
					name="og:description"
					content="Gestiona y organiza tus tareas de manera eficiente con la Task List. Edita y realiza un seguimiento de tus tareas con facilidad. Hecho con 💚."
				/>
				<meta property="og:image" content="https://challenge-task-list.vercel.app/" />
				<meta
					property="og:url"
					content="https://challenge-task-list.vercel.app/_next/image?url=%2Fimg%2Flogo-17144295441.jpg&w=256&q=75"
				/>
				<meta property="og:type" content="website" />
				<meta name="twitter:card" content="summary_large_image" />
				<meta name="twitter:title" content="Challenge Task List - Nico" />
				<meta
					name="twitter:description"
					content="Gestiona y organiza tus tareas de manera eficiente con la Task List. Edita y realiza un seguimiento de tus tareas con facilidad. Hecho con 💚."
				/>
				<meta
					name="twitter:image"
					content="https://challenge-task-list.vercel.app/_next/image?url=%2Fimg%2Flogo-17144295441.jpg&w=256&q=75"
				/>
				<meta name="twitter:site" content="@tu_twitter_handle" />
			</head>

			<body>
				<ChakraProvider theme={theme}>{children}</ChakraProvider>
			</body>
		</html>
	)
}

export default Layout
