import React, {
  Dispatch,
  FC,
  SetStateAction,
  memo,
  useCallback,
} from "react";
import "./Dvizhenimator.scss";
import dvizhenimatorIMG from "../../assets/images/ballerina.gif";
import { useDispatch, useSelector } from "react-redux";
import {
  getImageSelector,
  getErrorImageSelector,
} from "../../redux/selectors/dvizhenimatorSelectors";
import { getPictureDV } from "../../redux/reducers/dvizhenimatorReducer";
import { AppLink } from "../../ui/AppLink/AppLink";
import DvizhenimatorNav from "./DvizhenimatorNav";
import { Page } from "../../ui/Page/Page";

const Dvizhenimator: FC= memo(() => {
  const dispatch: any = useDispatch();

  const setPic = useCallback((
    input: string,
    offset: number,
    setDisabled: Dispatch<SetStateAction<boolean>>
  ) => {
    dispatch(getPictureDV(input, offset, setDisabled));
  }, []);

  const image = useSelector(getImageSelector);
  const error = useSelector(getErrorImageSelector);
  return (
    <Page className="dvizhenimator__wrapper">
      <AppLink returnType to="/lab/projects">
        {"<"}
      </AppLink>
      <div className="dvizhenimator__items">
        <div className="dvizhenimator__text">
          <span>Движениматор 2.0</span>
          <span>
            Движениматор 2.0 - многоуровневная система, использующая передовые
            вычислительные алгоритмы для визуализации вашей мысли! Перенесите
            поток сознания на поисковую строку...
          </span>
        </div>
        <div className="dvizhenimator__item">
          <div className="dvizhenimator__img">
            <img
              src={image ?? dvizhenimatorIMG}
              alt="Здесь могла быть ваша картинка"
            />
          </div>
        </div>
        <DvizhenimatorNav setPic={setPic} />
        {error && (
          <div className={"dvizhenimator__error"}>
            <span>{error}</span>
          </div>
        )}
      </div>
    </Page>
  );
});

export default Dvizhenimator;
