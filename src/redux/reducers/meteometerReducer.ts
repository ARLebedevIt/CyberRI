import { CommonThunkType, ResultCodesOther } from '../../types/types';
import { InferActionTypes } from '../../types/types';
import { meteometerAPI } from '../../api/meteometerAPI';

let initialState = {
  country: null as string | null,
  city: 'Нижний Новгород',
  feelsLike: null as string | null,
  tempMin: null as string | null,
  tempMax: null as string | null,
  humidity: null as number | null,
  sunrise: null as string | null,
  sunset: null as string | null,
  description: null as string | null,
  temp: null as string | null,
  error: null as string | null,
  units: 'metric',
}

export type InitialStateTypeMeteometr = typeof initialState

type ActionTypesWeather = InferActionTypes<typeof actionsMeteometer>

type ThunkType = CommonThunkType<ActionTypesWeather>

const meteometerReducer = (state = initialState, action: ActionTypesWeather): InitialStateTypeMeteometr => {
  switch (action.type) {
    case 'CRI/METEOMETER/SET_WEATHER':
      return {
        ...state,
        ...action.payload,
      }
    case 'CRI/METEOMETER/SET_WEATHER_ERROR':
      return {
        ...state,
        error: action.error
      }
    default:
      return state;
  }
}

const actionsMeteometer = {
  setWeather: (temp: string, feelsLike: string, tempMin: string, tempMax: string,
    humidity: number, country: string,
    sunrise: string, sunset: string, city: string, description: string, units: string, error: null) =>
  ({
    type: "CRI/METEOMETER/SET_WEATHER", payload: {
      temp, feelsLike, tempMin, tempMax, humidity, country, sunrise, sunset, city, description,
      units, error
    }
  } as const),
  setWeatherError: (error: string) => ({ type: "CRI/METEOMETER/SET_WEATHER_ERROR", error } as const)
}

export const getWeather = (city: string, units: string, disable?: (param: boolean) => void): ThunkType => async (dispatch) => {
  disable?.(true)
  let timeoutId = setTimeout(() => {
    dispatch(actionsMeteometer.setWeatherError('Проблема на стороне сервера, пожалуйста, попробуйте позже. КиберНИИ.'))
  }, 20000)
  let response = await meteometerAPI.getMeteometerData(city, units).catch(err => err)
  if (response) clearTimeout(timeoutId)
  if (response.status == ResultCodesOther.NotFound || city == null || city.length < 1) {
    dispatch(actionsMeteometer.setWeatherError(`Что-то пошло не так... Проверьте корректность введенных данных.`));
  } else if (response.status == ResultCodesOther.NetworkError) {
    dispatch(actionsMeteometer.setWeatherError('К сожалению, система перегружена, попробуйте позднее.'))
  }
  disable?.(false)
  const { weather, main: { temp, feels_like, temp_min, temp_max, humidity },
    sys: { country, sunrise, sunset }, name } = response
  const { description } = weather[0]
  const sunriseToUnix = new Date(sunrise * 1000)
  const sunsetToUnix = new Date(sunset * 1000)
  dispatch(actionsMeteometer.setWeather(temp.toFixed(), feels_like.toFixed(), temp_min.toFixed(),
    temp_max.toFixed(), humidity, country, sunriseToUnix.toLocaleString(), sunsetToUnix.toLocaleString(),
    name, description, units, null))
}

export default meteometerReducer