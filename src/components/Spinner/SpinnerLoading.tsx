import React, {
  useEffect,
  useState
} from 'react'
import {faSpinner}          from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon}    from '@fortawesome/react-fontawesome'
import {SizeProp}           from '@fortawesome/fontawesome-svg-core'
import ConditionalRendering from '../Util/ConditionalRender'
import { useLoading } from 'application/hooks/useLoading'

interface ISpinnerProps {
  classNames ?: string,
  pulse ?: boolean,
  size ?: SizeProp
  timer ?: number
}

const SpinnerLoading = ({classNames, pulse, size} : ISpinnerProps) => {

  return (
    <div className={`spinner ${classNames ? classNames : ''}`}>
      <FontAwesomeIcon icon={faSpinner} spin size={size ? size : '4x'} pulse={pulse}/>
    </div>
  )
}

export const SpinnerLoadingCenter = ({classNames, pulse, size,} : ISpinnerProps) => {
    
  return (
    <div className='spinner-center'>
      <div className={`spinner-center-inner ${classNames ? classNames : ''}`}>
        <FontAwesomeIcon icon={faSpinner} spin size={size ? size : '4x'} pulse={pulse}/>
      </div>
    </div>
  )
}

export default SpinnerLoading

export const SpinnerLoadingTimer = ({classNames, pulse, size, timer = 500} : ISpinnerProps) => {
  const [open,setOpen] = useState(true)

  useEffect(() => {
    if (timer) {
      setTimeout(() => {
        setOpen(false)
      },timer)
    }
  },[timer,setOpen])

  return (
    <ConditionalRendering condition={open}>
      <div className='spinner-center'>
        <div className={`spinner-center-inner ${classNames ? classNames : ''}`}>
          <FontAwesomeIcon icon={faSpinner} spin size={size ? size : '4x'} pulse={pulse}/>
        </div>
      </div>
    </ConditionalRendering>
  )
}



export const Loading = ()=> {
 //const timer = 15000 
 const { loading } = useLoading()
/* 
  useEffect(() => {
    let th = 0
    if (timer) {
      th = setTimeout(() => resetLoading(), timer)
    }
    return () => {
      clearTimeout(th)
    }
  }, [timer,resetLoading]) */

  return loading ? <SpinnerLoadingCenter/> : <></>
}
