import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 

import { Content } from './components/Content';
import { Footer } from './components/UI/Footer';
import { Header } from './components/Header';
import { useTypedSelector } from './hooks/useTypedSelector';
import { ProductFullPage } from './components/ProductFullPage';

import './style/css/style.css';
import { Cart } from './components/Cart';
import { AdminPage } from './components/AdminPage/AdminPage';
import { AdminPageChangeInfo } from './components/AdminPage/AdminPageChangeInfo';
import { AdminPageCreate } from './components/AdminPage/AdminPageCreate';

function App() {
	const isDropDownOpen = useTypedSelector(state => state.dropDown.isOpen);
	
	return (
		<div className={`App ${isDropDownOpen ? 'lock' : ''}`}>
			<Router>
				<Header />
				<Routes>
					<Route path='/' element={<Content />} />
					<Route path='/cart' element={<Cart />} />
					<Route path='/products/:id' element={<ProductFullPage />} />
					<Route path='/admin-page' element={<AdminPage />} />
					<Route path='/admin-page/edit-product/:id' element={<AdminPageChangeInfo />} />
					<Route path='/admin-page-create' element={<AdminPageCreate />} />
				</Routes>
				<Footer />
			</Router>
		</div>
	);
}

export default App;
