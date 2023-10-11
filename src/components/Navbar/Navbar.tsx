import { NavLink } from "react-router-dom";
import React, { FC, memo, useMemo, useState } from "react";
import "./Navbar.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  getIsAuthSelector,
  getLoginSelector,
} from "../../redux/selectors/authSelectors";
import { getAuthLogout } from "../../redux/reducers/authReducer";
import withAuthRedirect from "../../redux/hoc/withAuthRedirect";
import { routesNavbar } from "./NavbarRoutes";

const Navbar: FC = memo(() => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const isAuth = useSelector(getIsAuthSelector);
  const login = useSelector(getLoginSelector);
  const dispatch: any = useDispatch();

  const handleClick = () => dispatch(getAuthLogout());

  const routes = useMemo(() => {
    return routesNavbar.map(item => {
      return (
        <li className={isAuth || !item.onlyAuth ? "nav__list": "nav__hiddenLink"} key={item.name}>
        <NavLink
          onClick={() => setMenuOpen(false)}
          className={({isActive}: { isActive: boolean}) => isActive ? "activeLink" : ''}
          to={item.route}>
          {item.name}
        </NavLink>
      </li>
      )
    })
  }, [isAuth])

  return (
    <div className="nav_wrapper">
      <div className="nav__burger_button">
        <input id="toggle" type="checkbox"></input>
        <label
          onClick={() => (menuOpen ? setMenuOpen(false) : setMenuOpen(true))}
          htmlFor="toggle"
          className="burger"
        >
          <div className="top_bun"></div>
          <div className="middle_bun"></div>
          <div className="bottom_bun"></div>
        </label>
      </div>
      <nav className={`nav__content ${menuOpen && "_burger"}`}>
        <ul className="nav__list">
          {routes}
          <li>
            <div className="nav__login_row">
              {isAuth ? (
                <div className="nav__login">
                  <NavLink
                    onClick={() => setMenuOpen(false)}
                    className="nav__list"
                    to={"./profile"}
                  >
                    {login}
                  </NavLink>
                  -
                  <a
                    onClick={() => {
                      handleClick();
                      setMenuOpen(false);
                    }}>
                    Logout
                  </a>
                </div>
              ) : (
                <NavLink
                  onClick={() => setMenuOpen(false)}
                  className={(navLink) =>
                    navLink.isActive ? "activeLink" : "nav__list"
                  }
                  to={"./login"}>
                  Login
                </NavLink>
              )}
            </div>
          </li>
        </ul>
      </nav>
    </div>
  );
});

const NavbarWrapper = withAuthRedirect(Navbar);

export default NavbarWrapper;
