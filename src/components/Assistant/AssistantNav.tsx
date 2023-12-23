import React, { Dispatch, FC, SetStateAction, useState } from 'react'
import './Assistant.scss'
import microphone from '../../assets/images/microphone.png'
import SpeechRecognition from 'react-speech-recognition'
import { AppLink } from '../../ui/AppLink/AppLink'
import { Button } from '../../ui/Button/Button'

type PropsType = {
  note: string
  resetTranscript: () => void
  setNoteVisible: Dispatch<SetStateAction<boolean>>
  listening: boolean
  noteVisible: boolean
  submitNote: (val: string) => void
  transcript: string
  openComands: boolean
}

const AssistantNav: FC<PropsType> = React.memo((props) => {
  const [continuous, setContinuous] = useState<boolean>(false)
  const [noteMode, setNoteMode] = useState<boolean>(false)

  return (
    <div className={`assistant__nav ${props.openComands && 'assistant__blur'}`}>
      <img
        onClick={() => {
          props.listening ? SpeechRecognition.stopListening() : SpeechRecognition.startListening({ continuous: continuous })
          props.resetTranscript()
        }}
        className={`assitant__nav_mic ${props.listening && '_activeMic'}`}
        src={microphone}
        alt="Здесь могла быть ваша картинка"
      />
      <Button onClick={props.resetTranscript}>Очистить текст</Button>
      <button
        disabled={props.listening ? true : false}
        className={`assitant__nav_notes ${continuous && '_activeNotes'}`}
        onClick={() => {
          setContinuous((value) => !value)
          setNoteMode((value) => !value)
          props.resetTranscript()
        }}
      >
        Режим заметок
      </button>
      <Button
        onClick={() => {
          props.submitNote(props.transcript)
          SpeechRecognition.stopListening()
          props.setNoteVisible(true)
        }}
        disabled={!noteMode}
      >
        Сохранить заметку
      </Button>
      <Button onClick={() => props.setNoteVisible((value) => !value)} disabled={props.listening && true}>
        {props.noteVisible ? 'Описание' : 'Заметка'}
      </Button>
      <AppLink returnType to="/lab/projects">
        {'<'}
      </AppLink>
    </div>
  )
})

export default AssistantNav
