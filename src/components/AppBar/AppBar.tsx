import React                 from 'react'
import {FontAwesomeIcon}                  from '@fortawesome/react-fontawesome'
import {IconProp}                         from '@fortawesome/fontawesome-svg-core'
import {ID_APPLICATION_UP_BAR}            from '../../application/layout/main'

export interface IAppBarProps extends React.PropsWithChildren<any> {
  label: string,
  icon: IconProp,
  fixed?: boolean,
  menuAction?: () => void
  pageName?: string
}

const AppBar = ({label, fixed, icon, menuAction, children, pageName}: IAppBarProps) => {
  
  return (
    <div className={`appbar-root ${fixed ? `${' fixed'}` : ''}`} id={ID_APPLICATION_UP_BAR}>
      <div className={'toolbar-root'}>
        <div className={'toolbar-app-name'}>
          <div onClick={menuAction} className={'appbar-menu-icon'}>
            <FontAwesomeIcon icon={icon}/>
          </div>
          <div className={'appbar-label'}>{label}</div>
        </div>
        <div className={'appbar-label'}>{pageName}</div>
        <div className={'children d-flex flex-row'}>
          {children}
        </div>
      </div>
    </div>

  )
}

export default AppBar

