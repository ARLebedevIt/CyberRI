import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useState,
} from "react";
import "./Meteometer.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  getErrorWeatherSelector,
} from "../../redux/selectors/meteometerSelectors";
import { getWeather } from "../../redux/reducers/meteometerReducer";
import { Page } from "../../ui/Page/Page";
import Meteometer from "./Meteometer";
import MeteometerNav from "./MeteometerNav";
import { AppLink } from "../../ui/AppLink/AppLink";

const MeteometerContainer = React.memo(() => {
  const dispatch: any = useDispatch();
  const [disable, setDisable] = useState<boolean>(false);
  const error = useSelector(getErrorWeatherSelector)
  
  const setWeather = useCallback((
    city: string,
    units: string,
    setDisable: Dispatch<SetStateAction<boolean>>
  ) => {
    dispatch(getWeather(city, units, setDisable));
  }, []);

  return (
    <Page className="meteometer__wrapper">
      <div className="meteometer__items">
        <AppLink returnType to="/lab/projects">
            {"<"}
        </AppLink>
        <Meteometer setDisable={setDisable} />
        <MeteometerNav setWeather={setWeather} disable={disable} setDisable={setDisable} />
        {error && <div className={`meteometer__error`}>{error}</div>}
      </div>
    </Page>
  );
});

export default MeteometerContainer;
