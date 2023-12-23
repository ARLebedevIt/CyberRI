import React, { ComponentType, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getAuthFetching, getIsAuthSelector } from "../selectors/authSelectors";
import { useNavigate } from "react-router-dom";

const withAuthRedirect = <WCP extends JSX.IntrinsicAttributes>(
  Component: ComponentType<WCP>
) => {
  const WrappedComponent = (props: WCP) => {
    const isAuth = useSelector(getIsAuthSelector);
    const navigate = useNavigate();
    const isFetch = useSelector(getAuthFetching);

    const redirect = () => {
      if (isFetch === false && isAuth === false) {
        navigate("/login");
      }
    };

    useEffect(() => {
      redirect()
    }, [isAuth, isFetch])

    return <Component {...props} />;
  };
  return WrappedComponent;
};

export default withAuthRedirect;
