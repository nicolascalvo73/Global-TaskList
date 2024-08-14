'use client'
import { Box, VStack, Text } from '@chakra-ui/react'
import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'

const Welcome = () => {
	const [showImage, setShowImage] = useState(false)
	const [showLink, setShowLink] = useState(false)

	useEffect(() => {
		const imageTimer = setTimeout(() => {
			setShowImage(true)
		}, 1000)

		const linkTimer = setTimeout(() => {
			setShowLink(true)
		}, 2000)

		return () => {
			clearTimeout(imageTimer)
			clearTimeout(linkTimer)
		}
	}, [])

	return (
		<VStack
			bg={'gray.800'}
			zIndex={99}
			w={'100vw'}
			h={'100vh'}
			justifyContent="center"
			alignItems="center"
			spacing={4}>
			<Box opacity={showImage ? 1 : 0} transition="opacity 500ms ease-in">
				<Image src={'/img/logo-17144295441.jpg'} alt="isologo" width={200} height={200} />
			</Box>

			<Text color={showLink ? 'gray.100' : 'gray.800'} fontSize={'xl'} transition="color 1000ms ease-in">
				{`T a s k - L i s t - C h a l l e n g e`}
			</Text>
			<Link href="tasks">
				<Text color={showLink ? 'gray.100' : 'gray.800'} fontSize={'lg'} transition="color 2500ms ease-in">
					Click aquí para comenzar
				</Text>
			</Link>
		</VStack>
	)
}

export default Welcome
