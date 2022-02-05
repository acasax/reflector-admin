import React                   from 'react'
import {CONSTANT_USERS}        from '../../../constants'
import {FontAwesomeIcon}       from '@fortawesome/react-fontawesome'
import {faCheckCircle} from '@fortawesome/free-regular-svg-icons'
import {TUser}         from 'apollo-graphql/type_logic/types'
import EmptyTag        from '../../../../components/Util/EmptyTag'
import { IComponentRenderProps } from 'application/components/_common/SearchView'
import { translate } from 'translate/translate'

const SearchViewUserRender = ({model, classNames, selected} : IComponentRenderProps) => {
  const _model = model as TUser
  return (
    <div
            className={`d-flex flex-fill flex-column p-0 pb-1 border-bottom cursor-pointer  search-view-render-row ${selected ? ' search-view-selected' : ''}${classNames ? ` ${classNames}` : ''}`}
            data-action={CONSTANT_USERS.EVENTS.SELECTED_ONE}
            data-action-id={model.id}
    >
      <div className={'d-flex flex-row flex-fill justify-content-between align-items-center p-1'}>
        <div className={'d-flex flex-column font-smaller-3 mt-1'}>
          <div className={'font-smaller-7 text-center  line-height-11 color-white'}>
                        {translate.USERNAME_LABEL}
          </div>
          <div className={'text-center font-smaller-3 font-weight-600 color-white'}>{_model.userName}</div>
        </div>
        {selected ? <FontAwesomeIcon className={'opacity-4 font-bigger-10 mr-1 color-white'} icon={faCheckCircle}/> : null}
      </div>
      <div className={'d-flex flex-column align-items-center'}>
        <div className={'font-smaller-4 text-center color-white'}><EmptyTag model={_model} field={'email'} placeholder={'xxx@xxx.com'}/></div>
      </div>
    </div>
  )
}

export default SearchViewUserRender
