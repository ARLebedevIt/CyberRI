import React, { FC, useEffect } from 'react'
import './Meteometer.scss'
import weatherMClouds from '../../assets/images/weatherMClouds.jpg'
import weatherClouds from '../../assets/images/weatherClouds.jpg'
import weatherPClouds from '../../assets/images/weatherPClouds.jpg'
import weatherClear from '../../assets/images/weatherClear.jpg'
import weatherRain from '../../assets/images/weatherRain.jpg'
import weatherSnow from '../../assets/images/weatherSnow.jpg'
import weatherMist from '../../assets/images/weatherMist.jpg'
import weatherWindy from '../../assets/images/weatherWindy.jpg'
import { useDispatch, useSelector } from 'react-redux'
import {
  getCitySelector,
  getCountrySelector,
  getDescriptionSelector,
  getFeelsLikeSelector,
  getHumiditySelector,
  getSunriseSelector,
  getSunsetSelector,
  getTempSelector,
  getTempMaxSelector,
  getTempMinSelector,
  getUnitsSelector
} from '../../redux/selectors/meteometerSelectors'
import { getWeather } from '../../redux/reducers/meteometerReducer'

type MeteometerType = {
  setDisable?: React.Dispatch<React.SetStateAction<boolean>>
}

const mapToWetherConditions: Record<string, string> = {
  'облачно с прояснениями': weatherPClouds,
  'небольшая облачность': weatherClouds,
  'переменная облачность': weatherPClouds,
  пасмурно: weatherMClouds,
  ясно: weatherClear,
  дождь: weatherRain,
  'небольшой проливной дождь': weatherRain,
  снегопад: weatherSnow,
  снег: weatherSnow,
  туман: weatherMist,
  ветренно: weatherWindy,
  'небошой снегопад': weatherSnow,
  'небольшой снег': weatherSnow,
  мгла: weatherMist,
  'небольшой дождь': weatherRain
}

const metrics: Record<string, string> = {
  metric: '℃',
  imperial: '℉'
}

const Meteometer: FC<MeteometerType> = React.memo(({ setDisable }) => {
  const dispatch: any = useDispatch()
  const country = useSelector(getCountrySelector)
  const city = useSelector(getCitySelector)
  const feelsLike = useSelector(getFeelsLikeSelector)
  const tempMin = useSelector(getTempMinSelector)
  const tempMax = useSelector(getTempMaxSelector)
  const humidity = useSelector(getHumiditySelector)
  const sunrise = useSelector(getSunriseSelector)
  const sunset = useSelector(getSunsetSelector)
  const description = useSelector(getDescriptionSelector)
  const currentWeatherImage = mapToWetherConditions[description]
  const temp = useSelector(getTempSelector)
  const units = useSelector(getUnitsSelector)

  useEffect(() => {
    dispatch(getWeather(city, units, setDisable))
  }, [])

  const weatherRows = [
    {
      name: `Ощущается как ${feelsLike}${metrics[units]}`
    },
    {
      name: `Минимальная температура ${tempMin}${metrics[units]}`
    },
    {
      name: `Максимальная температура ${tempMax}${metrics[units]}`
    },
    {
      name: `Влажность ${humidity}%`
    },
    {
      name: `Рассвет ${sunrise} по МСК`
    },
    {
      name: `Закат ${sunset} по МСК`
    }
  ]

  return (
    <>
      <div className="meteometer__item">
        <div className="meteometer__location">
          <span className="meteometer__city_title">{city}</span>
          <span className="meteometer__country_title">{country}</span>
        </div>
      </div>
      <div className="meteometer__item">
        <div className="meteometer__temp">
          <span className="meteometer__units">
            {temp}
            {metrics[units]}
          </span>
          <div className="meteometer__temp_row">
            <div className="meteometer__temp_extra">
              {weatherRows.map((item) => {
                return <span key={item.name}>{item.name}</span>
              })}
            </div>
            <div className="meteometer__extra_img">
              <img src={currentWeatherImage ?? ''} alt="Здесь могла быть ваша картинка" />
            </div>
          </div>
        </div>
      </div>
    </>
  )
})

export default Meteometer
