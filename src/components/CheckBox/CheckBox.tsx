import React, {
  HTMLAttributes,
  PropsWithoutRef
}                        from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faSquare}        from '@fortawesome/free-regular-svg-icons'

import {faCheckSquare} from '@fortawesome/free-solid-svg-icons'
import HelperText      from '../basic/HelperText'

export interface ICheckBoxProps extends PropsWithoutRef<HTMLAttributes<HTMLInputElement>> {
  'component-direction'?: 'row' | 'column' | 'column-reverse' | 'row-reverse';
  label?: string;
  value?:  boolean | string;
  disabled?: boolean;
  helperText?: string;
  error?: boolean | string;
  classNames?: string;
  labelColor?: 'primary'|'danger'|'grey';
  labelSize?: 0|1|2|3|4|5;
  labelClass?: string;
}

const CheckBox = (props: ICheckBoxProps) => {
  const {'component-direction': direction, value, label, classNames, onChange, disabled,helperText,error,labelColor,labelSize,labelClass} = props

  const onClickHandler = (e: React.MouseEvent<HTMLElement>) => {
    if (disabled) {
      return
    }
    if (onChange) {
      const event = {
        persist: () => {},
        target: {
          value: !value as any
        }
      } as any
      onChange(event)
    }
  }

  return (
    <div className={`check-box-root flex-direction-${direction}${error ? ' error' : ''}${classNames ? ` ${classNames}` : ''}${disabled ? ' disabled' : ''}`}>
      <div className={`check-box-data${disabled ? ' disabled' : ''}${error ? ' error' : ''}`} onClick={onClickHandler}>
        <FontAwesomeIcon icon={faCheckSquare}
                                 className={`check-box-icon ${value ? 'visible' : 'invisible'}`}/>
        <FontAwesomeIcon icon={faSquare}
                                 className={`check-box-icon ${value ? 'invisible' : 'visible'}`}/>
      </div>
      <div className={`check-box-label${labelColor ? ` ${labelColor}` : ''}${labelSize ? ` font-smaller-${labelSize}` : ''}${labelClass ? ` ${labelClass}` : ''}`}>
        {label}
      </div>
      {helperText ? <HelperText
          error={error}
          text={helperText}
      /> : null}
    </div>
  )
}

CheckBox.defaultProps = {
  'component-direction': 'row',
  labelColor: 'primary',
  labelSize: 3
}

export default CheckBox
