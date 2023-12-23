import React, { FC } from 'react'
import './Assistant.scss'

type PropsType = {
  text: string
}

const AssistantNotes: FC<PropsType> = (props) => {
  return (
      <span>{props.text}</span>
  )
}
export default AssistantNotes
