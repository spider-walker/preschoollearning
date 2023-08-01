import {
	IonPage,
	IonHeader,
	IonToolbar,
	IonTitle,
	IonContent,
	IonGrid,
	IonRow,
	IonCol,
	IonIcon,
	IonText,
} from '@ionic/react';
import { add } from 'ionicons/icons';
import React, { useEffect, useState } from 'react';
import { addTodoItem, getTodoItem } from './home-service';
import { login } from '../../service/auth';

export const Home: React.FC = () => {
	const is_admin = true;
	const [createTodo, setCreateTodo] = useState('');
	const [todos, setTodo] = useState([]);

	const goToOtherPage = (pageName: string) => {
		console.log(pageName);
	};
	const submitTodo = async (e) => {
		e.preventDefault();

		await addTodoItem({
			todo: createTodo,
			isChecked: false,
		});
	};

	useEffect(() => {
		const getTodo = async () => {
			await login();
			await getTodoItem()
				.then((todo) => {
					setTodo(todo);
				})
				.catch((err) => {
					console.log(err);
				});
		};
		getTodo();
	}, []);
	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonTitle>Pre-School App</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent>
				<p>
					<IonText color={'primary'}>with</IonText> <br />
					<a>
						<IonText color={'secondary'}> Parental Control</IonText>
					</a>
				</p>
				<hr />
				<IonGrid>
					<IonRow id="dashborad_menu">
						<IonCol col-6>
							<span className="circle-frame">
								<a
									className="ajax-link"
									onClick={() => goToOtherPage('CategoryPage')}
								>
									<IonIcon name="logo-twitch"></IonIcon>
								</a>
							</span>
							<span className="very-small-text">Category</span>
						</IonCol>
						{is_admin && (
							<IonCol col-6>
								<span className="circle-frame">
									<a
										className="ajax-link"
										onClick={() => goToOtherPage('AdminPage')}
									>
										<IonIcon name="people"></IonIcon>
									</a>
								</span>
								<span className="very-small-text">Admin</span>
							</IonCol>
						)}

						<IonCol col-6>
							<span className="circle-frame">
								<a
									className="ajax-link"
									onClick={() => goToOtherPage('SettingsPage')}
								>
									<IonIcon name="settings"></IonIcon>
								</a>
							</span>
							<span className="very-small-text">Setting</span>
						</IonCol>
						<IonCol col-6>
							<span className="circle-frame">
								<a
									className="ajax-link"
									onClick={() => goToOtherPage('HomePage')}
								>
									<IonIcon name="home"></IonIcon>
								</a>
							</span>
							<span className="very-small-text">Home</span>
						</IonCol>
					</IonRow>
				</IonGrid>
			</IonContent>
		</IonPage>
	);
};

export default Home;
