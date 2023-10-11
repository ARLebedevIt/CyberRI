import React, { ComponentType, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getIsAuthSelector } from "../selectors/authSelectors";
import { useNavigate } from "react-router-dom";
import useSkipFirstRender from "../../hooks/useSkipFirstRender";

const withAuthRedirect = <WCP extends JSX.IntrinsicAttributes>(Component: ComponentType<WCP>) => {
  const WrappedComponent = (props: WCP) => {
    const isAuth = useSelector(getIsAuthSelector)
    const navigate = useNavigate()
    useSkipFirstRender(() => navigate('/login'), isAuth)

    useEffect(() => {      
      if (!isAuth) navigate('/login')
    }, [isAuth])
    return (
      <Component {...props} />
    )
  }
  return WrappedComponent
}

export default withAuthRedirect