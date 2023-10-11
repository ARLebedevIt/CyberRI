import React, { useMemo, useState } from 'react';
import { useSpeechRecognition } from 'react-speech-recognition';
import './Assistant.scss'
import { useDispatch, useSelector } from 'react-redux';
import { getNote } from '../../redux/reducers/assistantReducer';
import { getNoteSelector } from '../../redux/selectors/assistantSelectors';
import AssistantNav from './AssistantNav';
import AssistantComands from './AssistantComands';
import { Page } from '../../ui/Page/Page';

const mapColorSchema: Record<string, string> = {
  синий: '_blueBG',
  жёлтый: '_yellowBG',
  оранжевый: '_orangeBG',
  красный: '',
  зелёный: '_greenBG',
  фиолетовый: '_purpleBG',
  голубой: '_cyanBG',
}

const AssistantContainer = React.memo(() => {
  const [openComands, setOpenComands] = useState<boolean>(false)
  const [colorSchema, setColorSchema] = useState<string>('')
  const [noteVisible, setNoteVisible] = useState<boolean>(false)
  const dispatch: any = useDispatch()
  const submitNote = (note: string) => note == '' ? dispatch(getNote('Пустая заметка')) : dispatch(getNote(note))
  const note = useSelector(getNoteSelector)
  const commands = useMemo(() => [
    {
      command: 'Открой сайт *',
      callback: (site: string) => window.open('http://' + site)
    },
    {
      command: 'Установи * цвет',
      callback: (color: string) => setColorSchema(mapColorSchema[color])
    },
  ], [])
  const {
    transcript, listening, resetTranscript,
    browserSupportsSpeechRecognition, isMicrophoneAvailable } = useSpeechRecognition({ commands });
    
  if (!browserSupportsSpeechRecognition) {
    return <span className='assistant__error'>К сожалению, Ваше устройство не поддерживает данный проект. КиберНИИ.</span>
  }
  if (!isMicrophoneAvailable) {
    return <span className='assistant__error'>К сожалению, Вы не предоставили доступ к Микрофону.
      Хотим заверить, что у нас нет доступа к записям разговора между Вами и 'Подручным', будьте спокойны. КиберНИИ.
    </span>
  }
  return (
    <>
      <Page className={`assistant__content ${colorSchema}`}>
        <AssistantComands setOpenComands={setOpenComands} openComands={openComands} />
        <div className={`assistant__title ${openComands ? 'assistant__blur' : null}`}>
          <span>Подручный на данный момент <span id='assistant__status'>
            {listening ? 'слушает Вас' : 'не слушает Вас'}</span></span>
        </div>
        <div className={`assistant__items ${openComands ? 'assistant__blur' : null}`}>
          <div className={`assistant__item`}>
            {listening ? <span className='assistant__transcript'>{transcript}</span> :
              noteVisible ? <span className='assistant__transcript'>{note}</span> :
                <div className='assistant__description'>
                  <span className='assistant__description_text'>
                    Подручный - умный робот-помощник, который внимательно выслушает Вас и не оставит равнодушным.
                    К сожалению, он очень молчалив, но зато умеет выполнять <a
                      onClick={() => setOpenComands(true)}>команды</a>.
                  </span>
                </div>}
          </div>
        </div>
          <AssistantNav openComands={openComands} transcript={transcript} submitNote={submitNote} listening={listening}
            setNoteVisible={setNoteVisible} resetTranscript={resetTranscript} noteVisible={noteVisible} note={note} />
      </Page>
    </>
  );
});

export default AssistantContainer