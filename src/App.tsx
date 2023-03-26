import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 

import { Content } from './components/Content';
import { Footer } from './components/UI/Footer';
import { Header } from './components/Header';

function App() {
	return (
		<div className="App">
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
