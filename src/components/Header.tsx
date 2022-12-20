import DodopizzaLogo from '../assets/img/dodopizzalogo.png'
import { selectCart } from '../redux/cart/selectors'
import { Search } from './'
import React from 'react'
import { useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'

export const Header: React.FC = () => {
	const { items, totalPrice } = useSelector(selectCart)
	const location = useLocation()
	const isMounted = React.useRef(false)

	const totalCount = items.reduce(
		(sum: number, item: any) => sum + item.count,
		0
	)

	React.useEffect(() => {
		if (isMounted.current) {
			const json = JSON.stringify(items)
			localStorage.setItem('cart', json)
		}
		isMounted.current = true
	}, [items])

	return (
		<div className='header'>
			<div className='container'>
				<Link to='/'>
					<img width={300} src={DodopizzaLogo}></img>
				</Link>
				<div className='about__delivery'>
					<h3>Доставка пиццы Бишкек</h3>
					<div className='delivery__rating'>
						<h5>34 мин, 4.78</h5>
						<img
							width={20}
							src='http://s1.iconbird.com/ico/2013/12/505/w450h4001385925286Star.png'
						></img>
					</div>
				</div>
				{location.pathname !== '/cart' && <Search />}
				<div className='dodo__coins'>
					<Link to='/'></Link>
				</div>
				<div className='header__cart'>
					{location.pathname !== '/cart' && (
						<Link to='/' className='button button--cart'>
							<span>Корзина</span>
							<div className='button__delimiter'></div>
							<span>{totalCount}</span>
						</Link>
					)}
				</div>
			</div>
		</div>
	)
}
