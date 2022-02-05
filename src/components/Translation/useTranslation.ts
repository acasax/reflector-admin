import React, {
  useEffect,
  useMemo,
  useState
}                      from 'react'

const map = new Map()

export const NOT_FOUND_TRANSLATION = 'NOT FOUND TRANSLATION'

let listeners = [] as any

const $translate = (key: string) => {
  const firstChar = key.charAt(0)
  const m = map.get(firstChar)
  if (!m) {
    return NOT_FOUND_TRANSLATION
  }
  const ts = m.get(key)
  return !ts ? NOT_FOUND_TRANSLATION : ts
}

export const useTranslationFunction = () => {

  const [state, setState] = useState(1)

  const newReferenceTrigger = React.useCallback(() => {
    setState(s => s + 1)
  }, [setState])

  useEffect(() => {
    listeners.push(newReferenceTrigger)
    return () => {
      listeners = listeners.filter((x: any) => x !== newReferenceTrigger)
    }
  }, [newReferenceTrigger])

  const translate = React.useCallback((key: string, capitalize?: boolean) => {
    const trans = $translate(key)
    return capitalize ? `${trans.charAt(0).toUpperCase()}${trans.slice(1)}` : trans
  }, [])

  return {
    translate
  }
}

export const useTranslation = (key?: string, defaultValue?: string) => {
  const [state, setState] = useState(process.env.REACT_APP_TEST_MODE === 'Y' ? (defaultValue ? defaultValue : key) : NOT_FOUND_TRANSLATION)

  const newTranslation = React.useCallback(() => {
    const newValue = $translate(key || '')
    key && newValue !== NOT_FOUND_TRANSLATION && setState(newValue)
  }, [key, setState])

  useEffect(() => {
    listeners.push(newTranslation)
    return () => {
      listeners = listeners.filter((f: any) => f !== newTranslation)
    }
  }, [newTranslation])

  useEffect(() => {
    newTranslation()
  }, [newTranslation])

  const data = useMemo(() => ({
    translated: state
  }), [state])

  return data

}