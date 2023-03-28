import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 

import { Content } from './components/Content';
import { Footer } from './components/UI/Footer';
import { Header } from './components/Header';
import { useTypedSelector } from './hooks/useTypedSelector';
import { ProductFullPage } from './components/ProductFullPage';

import './style/css/style.css';
import { Cart } from './components/Cart';

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
				</Routes>
				<Footer />
			</Router>
		</div>
	);
}

export default App;
