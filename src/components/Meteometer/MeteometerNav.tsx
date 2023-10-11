import React, {
  Dispatch,
  SetStateAction,
  useState,
} from "react";
import "./Meteometer.scss";
import { useSelector } from "react-redux";
import Input from "../../ui/Input/Input";
import { Button } from "../../ui/Button/Button";
import { getCitySelector, getUnitsSelector } from "../../redux/selectors/meteometerSelectors";

type MeteometerNavType = {
  disable: boolean
  setDisable: React.Dispatch<React.SetStateAction<boolean>>
  setWeather: (value: string, units: string, setDisable: Dispatch<SetStateAction<boolean>> ) => void
}

const MeteometerNav = React.memo(({setDisable, disable, setWeather}: MeteometerNavType) => {
  const deviceWidth = window.innerWidth
  const units = useSelector(getUnitsSelector)
  const city = useSelector(getCitySelector)
  const [location, setLocation] = useState<string>(""); 
  return (
        <div className="meteometer__nav">
          <Input<string>
            autoFocus={deviceWidth > 1200 && true}
            onKeyDown={(e) =>
              e.key === "Enter" &&
              setWeather(location, units, setDisable)
            }
            onChange={setLocation}
            placeholder="Введите город"
            type="text"
            value={location}
          />
          <Button
            disabled={disable}
            onClick={() => setWeather(location, units, setDisable)}>
            Поиск
          </Button>
          <Button
            disabled={disable}
            onClick={() => {
              setWeather(
                !location ? city : location,
                units === "metric" ? "imperial" : "metric",
                setDisable
              );
            }}>
            {units == "metric" ? "℉" : "℃"}
          </Button>
        </div>
  );
});

export default MeteometerNav;
