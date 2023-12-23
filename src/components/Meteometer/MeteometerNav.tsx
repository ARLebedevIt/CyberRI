import React, { Dispatch, SetStateAction, useState } from 'react'
import './Meteometer.scss'
import { useSelector } from 'react-redux'
import Input from '../../ui/Input/Input'
import { Button } from '../../ui/Button/Button'
import { getCitySelector, getUnitsSelector } from '../../redux/selectors/meteometerSelectors'
import { useMediaQueries } from '../../hooks/useMediaQuery'

type MeteometerNavType = {
  disable: boolean
  setDisable: React.Dispatch<React.SetStateAction<boolean>>
  setWeather: (value: string, units: UnitsTypes, setDisable: Dispatch<SetStateAction<boolean>>) => void
}

const mapUnits: Record<UnitsTypes, UnitsTypes> = {
  metric: 'metric',
  imperial: 'imperial'
}

export type UnitsTypes = 'metric' | 'imperial'

const MeteometerNav = React.memo(({ setDisable, disable, setWeather }: MeteometerNavType) => {
  const { lg } = useMediaQueries()
  const units = useSelector(getUnitsSelector)
  const city = useSelector(getCitySelector)
  const [location, setLocation] = useState<string>('')
  return (
    <div className="meteometer__nav">
      <Input<string>
        autoFocus={lg}
        onKeyDown={(e) => e.key === 'Enter' && setWeather(location, units, setDisable)}
        onChange={setLocation}
        placeholder="Введите город"
        type="text"
        value={location}
      />
      <Button disabled={disable} onClick={() => setWeather(location, units, setDisable)}>
        Поиск
      </Button>
      <Button
        disabled={disable}
        onClick={() => {
          setWeather(!location ? city : location, mapUnits[units], setDisable)
        }}
      >
        {units == 'metric' ? '℉' : '℃'}
      </Button>
    </div>
  )
})

export default MeteometerNav
