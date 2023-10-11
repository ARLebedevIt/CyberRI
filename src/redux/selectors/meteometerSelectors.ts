import { AppStateType } from './../reduxStore';

export const getCountrySelector = (state: AppStateType) => state.meteometer.country

export const getCitySelector = (state: AppStateType) => state.meteometer.city
 
export const getFeelsLikeSelector = (state: AppStateType) => state.meteometer.feelsLike
 
export const getTempMinSelector = (state: AppStateType) => state.meteometer.tempMin
 
export const getTempMaxSelector = (state: AppStateType) => state.meteometer.tempMax
 
export const getDescriptionSelector = (state: AppStateType) => state.meteometer.description ?? ''
 
export const getTempSelector = (state: AppStateType) => state.meteometer.temp
 
export const getErrorWeatherSelector = (state: AppStateType) => state.meteometer.error
 
export const getUnitsSelector = (state: AppStateType) => state.meteometer.units
 
export const getHumiditySelector = (state: AppStateType) => state.meteometer.humidity
 
export const getSunsetSelector = (state: AppStateType) => state.meteometer.sunset
 
export const getSunriseSelector = (state: AppStateType) => state.meteometer.sunrise