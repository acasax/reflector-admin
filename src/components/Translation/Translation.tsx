/* eslint-disable @typescript-eslint/type-annotation-spacing */
import React, {useEffect} from 'react'
import {useTranslation}   from './useTranslation'

interface ITranslationProps {
  translationKey: string
}

const TranslationDiv = (props: ITranslationProps) => {
  const {translationKey, ...rest} = props
  const {translated} = useTranslation(translationKey)
  return <div {...rest}>{translated}</div>
}

export default TranslationDiv

