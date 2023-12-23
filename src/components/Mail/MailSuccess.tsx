import React, { Dispatch, SetStateAction, memo } from 'react'
import { Button } from '../../ui/Button/Button'

type MailSuccessProps = {
  setModelChanger: Dispatch<SetStateAction<boolean>>
}

export const MailSuccess = memo((props: MailSuccessProps) => {
  const { setModelChanger } = props
  return (
    <div className="mail__row_result">
      <div className="mail__items_result">
        <div className="mail__item_result">
          <span>Письмо отправлено!</span>
        </div>
        <div className="mail__item_result">
          <Button className="mail__button" onClick={() => setModelChanger(false)} type={'submit'}>
            Написать ещё
          </Button>
        </div>
      </div>
    </div>
  )
})
