import { Footer } from './components/Footer'
import MainLayout from './layouts/MainLayout'
import Home from './pages/Home'
import './scss/app.scss'
import React, { Suspense } from 'react'
import Loadable from 'react-loadable'
import { Routes, Route } from 'react-router-dom'

const Cart = Loadable({
	loader: () => import('./pages/Cart'),
	loading: () => <div>Идёт загрузка корзины...</div>,
})

const FullPizza = React.lazy(() => import('./pages/FullPizza'))
const NotFound = React.lazy(() => import('./pages/NotFound'))

function App() {
	return (
		<Routes>
			<Route path='/' element={<MainLayout />}>
				<Route path='' element={<Home />} />
				<Route
					path='cart'
					element={
						<Suspense fallback={<div>Идёт загрузка корзины...</div>}>
							<Cart />
						</Suspense>
					}
				/>
				<Route
					path='pizza/:id'
					element={
						<Suspense fallback={<div>Идёт загрузка...</div>}>
							<FullPizza />
						</Suspense>
					}
				/>
				<Route
					path='*'
					element={
						<Suspense fallback={<div>Идёт загрузка...</div>}>
							<NotFound />
						</Suspense>
					}
				/>
			</Route>
			<Route>{/* <Footer /> */}</Route>
		</Routes>
	)
}

export default App
