'use client'
import { MoonIcon, SunIcon } from '@chakra-ui/icons'
import { Button, Heading, HStack, useColorMode, useMediaQuery } from '@chakra-ui/react'

const NavBar = () => {
	const { colorMode, toggleColorMode } = useColorMode()
	const [isDesktop] = useMediaQuery('(min-width: 768px)')

	return (
		<HStack
			justify={'space-between'}
			px={isDesktop ? 12 : 6}
			py={2}
			w={'100%'}
			bg={colorMode === 'light' ? 'gray.400' : 'gray.800'}>
			<Heading as={'h3'}>Global Task List</Heading>
			<Button onClick={toggleColorMode}>{colorMode === 'light' ? <MoonIcon /> : <SunIcon />}</Button>
		</HStack>
	)
}

export default NavBar
