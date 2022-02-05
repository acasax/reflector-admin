import React, {
  HTMLAttributes,
  PropsWithChildren,
  useContext,
  useMemo
} from 'react'
import { RadioGroupContext } from './RadioGroup'
import _ from 'lodash'

export interface IRadioProps extends PropsWithChildren<HTMLAttributes<HTMLInputElement>> {
  label ?: string
  value ?: string | number | string[] | number[]
  disabled ?: boolean,
  selected ?: string | number | string[] | number[]
  'component-direction' ?: 'row' | 'column' | 'column-reverse' | 'row-reverse'
  onRadioChanged ?: (value ?: string | number | string[] | number[]) => void
}

const Radio = ({children, label, 'component-direction': direction, className, disabled, value} : IRadioProps) => {
  const {onRadioChanged,selected} = useContext(RadioGroupContext)
  const rootClass = `radio-root flex-direction-${direction}${disabled ? ' disabled' : ''}${className ? ` ${className}` : ''}`

  const isSelected = useMemo(() => (value === void(0) || selected === void(0) || selected === null) ? false : 
    _.isArray(selected) ? (selected as any).indexOf(value) > -1 : (value === selected)
  , [selected,value])

  const onClickHandler = () => {
    if (disabled) {
      return
    }
    onRadioChanged && onRadioChanged(value)
  }

  const info = () => {
    return children ? <>{children}</> :
      <div className={'radio-label'}>
        {label}
      </div>
  }

  return (
    <div className={rootClass}>
      <div className={`radio-data${disabled ? ' disabled' : ''}`} onClick={onClickHandler}>
        <div className={'radio-data-outer'}>
          <div className={`radio-data-inner${!isSelected ? ' not-selected' : ''}`}>
          </div>
        </div>
      </div>
      <div className={'radio-tabs'}>
        {info()}
      </div>
    </div>
  )
}

Radio.defaultProps = {
  'component-direction': 'row'
}

export default Radio
