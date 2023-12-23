import axios from 'axios'
import { ResultCodesOther } from '../types/types'

type MeteometerType = {
  weather: { description: string }[]
  main: { temp: number; feels_like: number; temp_min: number; temp_max: number; humidity: number }
  sys: { country: string; sunrise: number; sunset: number }
  name: string & ResultCodesOther
  status: number
}

export const meteometerAPI = {
  getMeteometerData: (city: string, units: string) => {
    const options = {
      method: 'GET',
      url: 'https://cyber-ri-backend.vercel.app/meteometer',
      params: { city: city, units: units }
    }
    return axios.request<MeteometerType>(options).then((res) => res.data)
  }
}
