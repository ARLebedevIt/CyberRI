import React, { Dispatch, FC, SetStateAction, useState } from "react";
import './Space.scss'
import { getSpaceItem } from "../../redux/reducers/spaceReducer";
import { useDispatch, useSelector } from "react-redux";
import { getImageSpaceSelector, getTitleSpaceSelector } from "../../redux/selectors/spaceSelectors";
import { AppLink } from "../../ui/AppLink/AppLink";
import { Page } from "../../ui/Page/Page";
import { Button } from "../../ui/Button/Button";

const Space: FC = () => {
  const [disable, setDisable] = useState<boolean>(false)
  const dispatch: any = useDispatch()
  const setSpaceItem = (setDisable: Dispatch<SetStateAction<boolean>>) => {
    dispatch(getSpaceItem(setDisable))
  }
  const img = useSelector(getImageSpaceSelector)
  const title = useSelector(getTitleSpaceSelector)
  return (
    <Page className='space__wrapper'>
      <div className='space__content'>
        <div className='space__items'>
          <AppLink returnType to="/lab/projects">{'<'}</AppLink>
          <div className='space__title'>
            <span>Мироздание</span>
          </div>
          {img ? <div className='space__img'>
              <img src={img} alt="Здесь могла быть ваша картинка" />
            </div> : 
            <span className='space__text'>
              Мироздание - разработка,
                позволяющая получить изображение из космоса на основании случайной генерации данных из базы NASA
            </span>
          }
            <span className={`space__text ${title.length > 1 || '_hideTitle'}`}>
              {title}
            </span>
            <Button className='space__button' disabled={disable} onClick={() => setSpaceItem(setDisable)}>∞</Button>
        </div>
      </div>
    </Page>
  )
}

export default Space