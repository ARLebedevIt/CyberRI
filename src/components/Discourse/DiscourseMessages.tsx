import './Discourse.scss'
import { FC} from 'react';
import DiscourseMessage from './DiscourseMessage';
import React from 'react';
import { DiscourseMessageType } from '../../redux/reducers/discourseReducer';

interface DiscourseMessagesProps {
  messages: DiscourseMessageType[]
}

const DiscourseMessages = React.memo(({messages}: DiscourseMessagesProps) => {
  return (
    <div className='discourse__messages' >
      {messages.map((m) => <DiscourseMessage key={m.id} message={m} />)}
    </div>
  )
})

export default DiscourseMessages