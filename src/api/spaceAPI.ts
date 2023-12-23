import axios from 'axios'

type ImageFromSpaceType = {
  date: string
  title: string
  url: string
}

export const spaceAPI = {
  getItem: () => {
    const options = {
      method: 'GET',
      url: 'https://cyber-ri-backend.vercel.app/space'
    }
    return axios.request<ImageFromSpaceType[]>(options)
  }
}
