export type DiscourseMessageAPIType = {
  message: string
  photo: string
  userId: number
  userName: string
}

let ws: WebSocket | null

let subscribers = [] as SubscriberType[]

export type SubscriberType = (message: DiscourseMessageAPIType[]) => void

const closeHandler = () => {
  setTimeout(createChanel, 3000)
}

const messageHandler = (e: MessageEvent) => {
  const newMessages = JSON.parse(e.data)
  subscribers.forEach((s) => s(newMessages))
}

const cleanUp = () => {
  ws?.removeEventListener('close', closeHandler)
  ws?.removeEventListener('message', messageHandler)
}

const createChanel = () => {
  cleanUp()
  ws?.close()
  ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
  ws.addEventListener('close', closeHandler)
  ws.addEventListener('message', messageHandler)
}

export const discourseAPI = {
  start() {
    createChanel()
  },
  subscribe(callback: SubscriberType) {
    subscribers.push(callback)
  },
  stop() {
    ws?.close()
    cleanUp()
    subscribers = []
  },
  unsubscribe(callback: SubscriberType) {
    subscribers = subscribers.filter((s) => s !== callback)
  },
  sendMessage(message: string) {
    ws?.send(message)
  }
}
