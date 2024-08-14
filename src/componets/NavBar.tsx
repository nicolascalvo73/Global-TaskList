'use client'
import { MoonIcon, SunIcon } from '@chakra-ui/icons'
import { Button, Heading, HStack, Icon, useColorMode, useMediaQuery } from '@chakra-ui/react'
import { FaGithubAlt, FaWhatsapp } from 'react-icons/fa'
import { TfiWorld } from 'react-icons/tfi'

const NavBar = () => {
	const { colorMode, toggleColorMode } = useColorMode()
	const [isDesktop] = useMediaQuery('(min-width: 768px)')

	return (
		<HStack
			zIndex={15}
			position={'fixed'}
			top={0}
			justify={'space-between'}
			px={isDesktop ? 12 : 6}
			py={2}
			w={'100%'}
			bg={colorMode === 'light' ? 'gray.400' : 'gray.800'}>
			<Heading as={'h3'}>{isDesktop ? 'Challenge-Task-List' : 'Task-List'}</Heading>
			<HStack>
				<Button
					onClick={() =>
						window.open(
							'https://wa.me/3516283916?text=Hola%20Nico,%20estuve%20viendo%20tu%20challenge%20para%20Global',
							'_blank'
						)
					}>
					<Icon as={FaWhatsapp} boxSize={6} />
				</Button>
				{isDesktop && (
					<>
						<Button onClick={() => window.open('https://nicocalvo.vercel.app/', '_blank')}>
							<Icon as={TfiWorld} boxSize={6} />
						</Button>
						<Button
							onClick={() => window.open('https://github.com/nicolascalvo73/Global-TaskList', '_blank')}>
							<Icon as={FaGithubAlt} boxSize={6} />
						</Button>
					</>
				)}
				<Button onClick={toggleColorMode}>{colorMode === 'light' ? <MoonIcon /> : <SunIcon />}</Button>
			</HStack>
		</HStack>
	)
}

export default NavBar
