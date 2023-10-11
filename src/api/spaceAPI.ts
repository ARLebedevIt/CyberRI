import axios from "axios"

type ImageFromSpaceType = {
  date: string
  title: string
  url: string
}

type SpaceResponseType = {
  data: ImageFromSpaceType[]
  status: string
}

export const spaceAPI = {
  getItem: () => {
    const options = {
      method: "GET",
      url: 'https://cyber-ri-backend.vercel.app/space'
     }
    return axios.request<SpaceResponseType>(options)
  }
}