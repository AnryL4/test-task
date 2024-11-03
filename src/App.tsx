import {
	Box,
	Container,
	CssBaseline,
	Divider,
	Paper,
	Stack,
} from '@mui/material';
import { Fragment, useState } from 'react';
import { generateUniqID } from './utils/GenerateUniqId';

interface Item {
	title: string;
	tags: string[];
	progress: string;
	id: string;
}

const variables = ['To do', 'In Progress', 'Done'];

function App() {
	const [items, setItems] = useState<Item[]>([
		{ title: 'задача', tags: [], progress: 'To do', id: 'sdf34' },
		{ title: '234dfg', tags: [], progress: 'To do', id: 'dfg4523' },
		{ title: '567ghj', tags: [], progress: 'To do', id: 'khgj3fdhv' },
		{ title: 'sdff', tags: [], progress: 'In Progress', id: 'ft7j' },
		{ title: 'dsfdggh', tags: [], progress: 'In Progress', id: '567mk6gh' },
		{ title: 'fgh', tags: [], progress: 'Done', id: '7j6he463' },
		{ title: 'vbcn4', tags: [], progress: 'To do', id: 'fgnh32223' },
		{ title: 'rhd45', tags: [], progress: 'In Progress', id: 'ghj456hgf' },
		{ title: '234sf', tags: [], progress: 'Done', id: 'bzx345' },
	]);

	const [startItem, setStartItem] = useState<Item | null>(null);

	const onDragCardStartHandler = (item: Item) => {
		setStartItem(item);
	};

	const onDragCardEndHandler = (e: React.DragEvent<HTMLDivElement>) => {
		e.currentTarget.style.background = '#FFBE7B';
		setStartItem(null);
	};

	const onDragCardLeaveHandler = (e: React.DragEvent<HTMLDivElement>) => {
		e.currentTarget.style.background = '#FFBE7B';
	};

	const onDragCardOverHandler = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		e.currentTarget.style.background = '#fff';
	};

	const onDropCardHandler = (
		e: React.DragEvent<HTMLDivElement>,
		item: Item
	) => {
		e.preventDefault();
		e.stopPropagation();

		if (startItem) {
			const newData = [...items];
			const indexStartItem = items.indexOf(startItem);
			const indexItem = items.indexOf(item);

			if (startItem.progress === item.progress) {
				[newData[indexStartItem], newData[indexItem]] = [
					newData[indexItem],
					newData[indexStartItem],
				];
			} else {
				newData[indexStartItem].progress = item.progress;
			}
			setItems(newData);
			e.currentTarget.style.background = '#FFBE7B';
			setStartItem(null);

			if (e.currentTarget.parentElement?.parentElement) {
				e.currentTarget.parentElement.parentElement.style.background =
					'none';
				e.currentTarget.parentElement.parentElement.style.boxShadow =
					'none';
			}
		}
	};

	const onDragOverArea = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		e.currentTarget.style.background = '#dddddd';
		e.currentTarget.style.boxShadow =
			'0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)';
	};

	const onDragEndArea = (e: React.DragEvent<HTMLDivElement>) => {
		e.currentTarget.style.background = 'none';
		e.currentTarget.style.boxShadow = 'none';
	};

	const onDragLeaveArea = (e: React.DragEvent<HTMLDivElement>) => {
		e.currentTarget.style.background = 'none';
		e.currentTarget.style.boxShadow = 'none';
	};

	const onDropArea = (e: React.DragEvent<HTMLDivElement>, area: string) => {
		e.preventDefault();
		e.stopPropagation();
		e.currentTarget.style.background = 'none';
		e.currentTarget.style.boxShadow = 'none';

		if (startItem) {
			const newData = [...items];
			const indexStartItem = items.indexOf(startItem);
			newData[indexStartItem].progress = area;
			setItems(newData);
			setStartItem(null);
		}
	};

	const onDragEmptyBox = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		e.currentTarget.style.opacity = '1';
		e.currentTarget.style.height = '56px';
		e.currentTarget.style.background = '#fff';
	};

	const onDragLeaveEmptyBox = (e: React.DragEvent<HTMLDivElement>) => {
		e.currentTarget.style.opacity = '0';
		e.currentTarget.style.height = '10px';
		e.currentTarget.style.background = 'white';
	};

	const onDragEndEmptyBox = (e: React.DragEvent<HTMLDivElement>) => {
		e.currentTarget.style.opacity = '0';
		e.currentTarget.style.height = '10px';
		e.currentTarget.style.background = 'white';
	};

	const onDropEmptyBox = (e: React.DragEvent<HTMLDivElement>, item: Item) => {
		e.preventDefault();
		e.stopPropagation();
		if (startItem) {
			if (startItem === item) {
				e.currentTarget.style.opacity = '0';
				e.currentTarget.style.height = '10px';
				e.currentTarget.style.background = 'white';
				return;
			}
			const newData = [...items];

			const indexStartItem = newData.indexOf(startItem);
			newData.splice(indexStartItem, 1);

			const indexItem = newData.indexOf(item);
			newData.splice(indexItem, 1, item, {
				...startItem,
				progress: item.progress,
			});

			setItems(newData);
			e.currentTarget.style.background = '#FFBE7B';
			setStartItem(null);
		}
		e.currentTarget.style.opacity = '0';
		e.currentTarget.style.height = '10px';
		e.currentTarget.style.background = 'white';
		if (e.currentTarget.parentElement?.parentElement) {
			e.currentTarget.parentElement.parentElement.style.background =
				'none';
			e.currentTarget.parentElement.parentElement.style.boxShadow =
				'none';
		}
	};

	// const uniqueId = generateUniqID();
	// console.log(uniqueId);

	return (
		<main style={{ background: '#F9F3ED', minHeight: '100vh' }}>
			<CssBaseline />
			<Container
				maxWidth={false}
				sx={{
					maxWidth: 1280,
					p: '30px',
					background: '#FCEDDA',
					minHeight: '100vh',
				}}
			>
				<Stack
					direction='row'
					sx={{ width: '100%' }}
					divider={<Divider orientation='vertical' flexItem />}
					spacing={2}
				>
					{variables.map(value => {
						return (
							<Box width='100%' key={value}>
								<Paper
									sx={{
										padding: 2,
										background: '#EE4E34',
										textAlign: 'center',
										fontSize: '20px',
										fontWeight: '700',
										color: '#FCEDDA',
									}}
								>
									{value}
								</Paper>
							</Box>
						);
					})}
				</Stack>
				<Stack
					direction='row'
					sx={{ width: '100%', mt: 2 }}
					divider={<Divider orientation='vertical' flexItem />}
					spacing={2}
				>
					{variables.map(box => {
						return (
							<Box width='100%' key={box}>
								<Box
									sx={{
										padding: 2,
										height: '100%',
										borderRadius: '5px',
									}}
									onDragOver={e => {
										e.preventDefault();
										onDragOverArea(e);
									}}
									onDragEnd={e => onDragEndArea(e)}
									onDragLeave={e => onDragLeaveArea(e)}
									onDrop={e => {
										e.preventDefault();
										e.stopPropagation();
										onDropArea(e, box);
									}}
								>
									<Stack spacing={1}>
										{items
											.filter(item => {
												return item.progress === box;
											})
											.map(item => (
												<Fragment key={item.id}>
													<Paper
														key={item.id}
														sx={{
															padding: 2,
															cursor: 'pointer',
															background:
																'#FFBE7B',
															fontSize: '18px',
															fontWeight: '500',
														}}
														draggable
														onDragStart={() =>
															onDragCardStartHandler(
																item
															)
														}
														onDragEnd={e =>
															onDragCardEndHandler(
																e
															)
														}
														onDragLeave={e =>
															onDragCardLeaveHandler(
																e
															)
														}
														onDragOver={e =>
															onDragCardOverHandler(
																e
															)
														}
														onDrop={e =>
															onDropCardHandler(
																e,
																item
															)
														}
													>
														{item.title}
													</Paper>
													<Box
														sx={{
															height: '10px',
															borderRadius: '5px',
														}}
														onDragOver={e =>
															onDragEmptyBox(e)
														}
														onDragLeave={e =>
															onDragLeaveEmptyBox(
																e
															)
														}
														onDragEnd={e =>
															onDragEndEmptyBox(e)
														}
														onDrop={e =>
															onDropEmptyBox(
																e,
																item
															)
														}
													/>
												</Fragment>
											))}
									</Stack>
								</Box>
							</Box>
						);
					})}
				</Stack>
			</Container>
		</main>
	);
}

export default App;
