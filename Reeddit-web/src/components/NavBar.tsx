import React from 'react';
import { Box, Button, Flex, Link } from '@chakra-ui/core';
import NextLink from 'next/link';
import { useLogoutMutation, useMeQuery } from '../generated/graphql';
import { isServer } from '../utils/isServer';

interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = ({}) => {
	const [
		{ fetching: logoutFetching },
		logout,
	] = useLogoutMutation();
	const [{ data, fetching }] = useMeQuery({
		pause: isServer(),
	});

	let body = null;

	//data loading
	if (fetching) {
		//user not logged in
	} else if (!data?.me) {
		body = (
			<>
				<NextLink href='/login'>
					<Link color={'white'} mr={2}>
						Login
					</Link>
				</NextLink>
				<NextLink href={'/register'}>
					<Link color={'white'}>Register</Link>
				</NextLink>
			</>
		);
		//user is logged in
	} else {
		body = (
			<Flex>
				<Box mr={4} color={'white'}>
					{data.me.username}
				</Box>
				<Button
					onClick={() => {
						logout();
					}}
					isLoading={logoutFetching}
					variant='link'>
					logout
				</Button>
			</Flex>
		);
	}
	return (
		<Flex bg='black' p={4}>
			<Box ml={'auto'}>{body}</Box>
		</Flex>
	);
};
