import React, { FC } from 'react';
import './Assistant.scss'

type PropsType = {
  text: string
}

const AssistantNotes: FC<PropsType> = (props) => {
  return (
    <div>
        <span>{props.text}</span>
    </div>
  )
}
export default AssistantNotes;