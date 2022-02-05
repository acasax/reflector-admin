import React, {PropsWithChildren} from 'react'

interface IPaper  extends PropsWithChildren<any> {
  header ?: string
  classNames ?: string
}

const Paper  = ({header,children,classNames} : IPaper)  => {

  return (
    <div className={`paper${classNames ? ` ${classNames}` : ''}`}>
      {
        header ? (
          <div className={'paper-header'}>
            <span className={'paper-header-name'}>{header}</span>
          </div>
        ) : <></>
      }
      <div className={'paper-body'}>
        {children}
      </div>

    </div>
  )
}

export default Paper
