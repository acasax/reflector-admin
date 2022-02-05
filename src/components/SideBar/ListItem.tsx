import React, {useState} from 'react'
import {NavLink}         from 'react-router-dom'
import {IconProp}        from '@fortawesome/fontawesome-svg-core'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {
  faCaretDown,
  faCaretLeft
}                        from '@fortawesome/free-solid-svg-icons'
import CollapseList      from './CollapseList'

interface IListItemProps extends React.PropsWithChildren<any>{
  label : string,
  path : string,
  active ?: boolean,
  icon ?: IconProp,
  collapse ?: boolean
}

const ListItem = ({label,path,icon,active,collapse,children} : IListItemProps) => {

  const [state,setState] : [
    boolean,
    (r : boolean) => void
  ] = useState(false as boolean)

  const onClick = () => {
    setState(!state)
  }

  return  (
    <li className={'list-item'}>
      <NavLink
            activeClassName={active  && !collapse ? 'active' : ''}
            to={path}
            className={'list-item-link'}
            onClick={onClick}
      >
        {icon ?
          <FontAwesomeIcon icon={icon} className={'list-item-icon'}/>
          : null
        }
        <div className={'list-item-text'}>
          {label}
          {
            collapse ?
              !state ?
                <FontAwesomeIcon icon={faCaretLeft} className={'list-item-caret active'}/>
                : <FontAwesomeIcon icon={faCaretDown} className={'list-item-caret active'}/>
              : null
          }
        </div>
      </NavLink>
      {
        collapse ? (
          <CollapseList active={state}>
            {
              children
            }
          </CollapseList>
        )
          : <></>
      }

    </li>
  )

}

export default ListItem
