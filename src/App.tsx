import { HashRouter as Router, Routes, Route } from 'react-router-dom'; 

import { Content } from './components/Content';
import { Footer } from './components/UI/Footer';
import { Header } from './components/Header';
import { ProductFullPage } from './components/ProductFullPage';

import './style/css/style.css';
import { Cart } from './components/Cart';
import { AdminPage } from './components/AdminPage/AdminPage';
import { AdminPageChangeInfo } from './components/AdminPage/AdminPageChangeInfo';
import { AdminPageCreate } from './components/AdminPage/AdminPageCreate';
import { NotFoundPage } from './components/UI/NotFoundPage';

function App() {
	return (
		<div className="App">
			<Router>
				<Header />
				<Routes>
					<Route path='/' element={<Content />} />
					<Route path='/cart' element={<Cart />} />
					<Route path='/products/:id' element={<ProductFullPage />} />
					<Route path='/admin-page' element={<AdminPage />} />
					<Route path='/admin-page/edit-product/:id' element={<AdminPageChangeInfo />} />
					<Route path='/admin-page-create' element={<AdminPageCreate />} />
					<Route path='/*' element={<NotFoundPage/>} />
				</Routes>
				<Footer />
			</Router>
		</div>
	);
}

export default App;
