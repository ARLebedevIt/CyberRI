import axios from "axios"

type ImagesFromDvizhenimator = {
  images: {
    original: {
      url: string
    }
  }
}

type DvizhenimatorResponseType = {
  data: ImagesFromDvizhenimator[]
}

export const dvizhenimatorAPI = {
  getPicture: (input: string, offset: number) => {
    const options = {
      method: "GET",
      url: 'https://cyber-ri-backend.vercel.app/dvizhenimator',
      params: {input: input, offset: offset}
     }
    return axios.request<DvizhenimatorResponseType>(options)
  }
}