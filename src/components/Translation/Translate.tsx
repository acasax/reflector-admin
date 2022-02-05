import React, {
  ComponentType,
  ElementType
} from 'react'
import { StyledComponent } from 'styled-components'

export type TTranslateProps = {
  use:  string
  as?: ElementType | ComponentType | StyledComponent<any, any>
}

export const Translate = ({ use, as: Element = 'span' }: TTranslateProps) => {


  return (
    <Element>
      {use}
    </Element>
  )

}

export default Translate
