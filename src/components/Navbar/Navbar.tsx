import { NavLink } from 'react-router-dom'
import React, { FC, memo, useMemo, useState } from 'react'
import './Navbar.scss'
import { useDispatch, useSelector } from 'react-redux'
import { getIsAuthSelector, getLoginSelector } from '../../redux/selectors/authSelectors'
import { getAuthLogout } from '../../redux/reducers/authReducer'
import { routesNavbar } from './NavbarRoutes'

const Navbar: FC = memo(() => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false)
  const isAuth = useSelector(getIsAuthSelector)
  const dispatch: any = useDispatch()

  const handleClick = () => dispatch(getAuthLogout())

  const routes = useMemo(() => {
    return routesNavbar.map((item) => {
      return (
        <li className={isAuth || !item.onlyAuth ? 'nav__link' : 'nav__hiddenLink'} key={item.name}>
          <NavLink
            onClick={() => setMenuOpen(false)}
            className={({ isActive }: { isActive: boolean }) => (isActive ? 'activeLink' : '')}
            to={item.route}
          >
            {item.name}
          </NavLink>
        </li>
      )
    })
  }, [isAuth])

  return (
    <div className="nav_wrapper">
      <div className="nav__burger_button">
        <input id="toggle" type="checkbox" checked={menuOpen} readOnly></input>
        <label onClick={() => (menuOpen ? setMenuOpen(false) : setMenuOpen(true))} htmlFor="toggle" className="burger">
          <div className="top_bun"></div>
          <div className="middle_bun"></div>
          <div className="bottom_bun"></div>
        </label>
      </div>
      <nav className={`nav__content ${menuOpen && '_burger'}`}>
        <ul className="nav__list">
          {routes}
          {isAuth ? (
            <li className="nav__link authLink">
              <NavLink
                to={'/login'}
                onClick={() => {
                  handleClick()
                  setMenuOpen(false)
                }}
              >
                Logout
              </NavLink>
            </li>
          ) : (
            <li>
              <NavLink
                onClick={() => setMenuOpen(false)}
                className={(navLink) => (navLink.isActive ? 'activeLink' : 'nav__link')}
                to={'./login'}
              >
                Login
              </NavLink>
            </li>
          )}
        </ul>
      </nav>
    </div>
  )
})

const NavbarWrapper = Navbar

export default NavbarWrapper
