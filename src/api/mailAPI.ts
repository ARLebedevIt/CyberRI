import axios from 'axios'

type MailResnonseType = {
  config: {
    params: {
      mailAddress: string
      name: string
      subject: string
      text: string
    }
  }
  status: number
}

export const mailAPI = {
  sendMail: (subject: string, name: string, mailAddress: string, text: string) => {
    const options = {
      method: 'GET',
      url: 'https://cyber-ri-backend.vercel.app/mail',
      params: { subject: subject, name: name, mailAddress: mailAddress, text: text }
    }
    return axios.request<MailResnonseType>(options)
  }
}
