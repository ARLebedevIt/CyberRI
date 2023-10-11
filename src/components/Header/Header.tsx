import React, { FC, memo } from 'react';
import { Link } from 'react-router-dom';
import './Header.scss'
import loginImg from '../../assets/images/icon.png'
import { useDispatch, useSelector } from 'react-redux';
import { getAuthLogout } from '../../redux/reducers/authReducer';
import { getIsAuthSelector, getLoginSelector } from '../../redux/selectors/authSelectors';

const Header: FC = memo(() => {
  const isAuth = useSelector(getIsAuthSelector)
  const login = useSelector(getLoginSelector)
  const dispatch: any = useDispatch()
  const handleClick = () => {
    dispatch(getAuthLogout())
  }
  return (
    <header className='header__content'>
      <div className='header__items'>
        <div className='header__item'>
          <div className='header__img'>
            <Link to={'./lab'}><img src={loginImg} alt="Здесь могла быть ваша картинка" /></Link>
          </div>
        </div>
        <div className='header__item'>
          <div className='header__login'>
            {isAuth ?
              <div className='header__login_withAuth'>
                <Link className='header__login_name'
                  to={'./profile'}>
                    {login}
                </Link> 
                - 
                <a onClick={handleClick}>Logout</a>
              </div>
              : <Link className='header__login_link' to={'./login'}>Login</Link>}</div>
        </div>
      </div>
    </header>
  )
})

export default Header;