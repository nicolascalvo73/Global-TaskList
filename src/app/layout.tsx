'use client'
import { ChakraProvider } from '@chakra-ui/react'
import { FC } from 'react'
import theme from './theme'
import { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Challenge Nico Calvo',
	description: 'Challenge Task List - Global Think Tecnologies',
	openGraph: {
		title: 'Mi Aplicación',
		description: 'Descripción de mi aplicación',
		images: ['/img/logo-17144295441.jpg'],
		url: 'https://www.miaplicacion.com',
	},
}

const Layout: FC<{ children: React.ReactNode }> = ({ children }) => {
	return (
		<html lang="en">
			<body>
				<ChakraProvider theme={theme}>{children}</ChakraProvider>
			</body>
		</html>
	)
}

export default Layout
