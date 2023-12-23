import React, { Dispatch, FC, SetStateAction, useState } from 'react'
import './Assistant.scss'

type PropsType = {
  setOpenComands: Dispatch<SetStateAction<boolean>>
  openComands: boolean
}

const AssistantComands: FC<PropsType> = React.memo((props) => {
  return (
    <div className={`assistant__description_comands ${props.openComands || '_hiddenComands'}`}>
      <span>Команды</span>
      <a onClick={() => props.setOpenComands(false)} className="comands__closeButton"></a>
      <ol start={1}>
        <li>
          <span>
            "Открой сайт (название сайта*)" - откроет сайт в новой вкладке. *первый и второй доменный уровень. Н-р. Google.com
          </span>
          {'\n'}
        </li>
        <li>
          <span>"Установи (название цвета*) цвет" - добавит новых красок в интерфейс Подручного. *только цвета Радуги.</span>
        </li>
      </ol>
      <span>Режимы</span>
      <ol start={1}>
        <li>
          <span>"Режим заметок" - позволяет хранить в памяти Подручного одну заметку</span>
        </li>
      </ol>
      <span>Ожидаются доработки... Следите за новостями. КиберНИИ.</span>
    </div>
  )
})

export default AssistantComands
