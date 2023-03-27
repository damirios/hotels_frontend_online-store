import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 

import { Content } from './components/Content';
import { Footer } from './components/UI/Footer';
import { Header } from './components/Header';
import { useTypedSelector } from './hooks/useTypedSelector';

function App() {
	const isDropDownOpen = useTypedSelector(state => state.dropDown.isOpen);
	
	return (
		<div className={`App ${isDropDownOpen ? 'lock' : ''}`}>
			<Router>
				<Header />
				<Routes>
					<Route path='/' element={<Content />} />
					{/* <Route path='/products/:productID' element={<ProductFullPage />} /> */}
				</Routes>
				<Footer />
			</Router>
		</div>
	);
}

export default App;
