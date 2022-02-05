import React from 'react'

interface ICollapsedList extends React.PropsWithChildren<any>{
  active ?: boolean
}

const CollapseList = ({active,children} : ICollapsedList) => {

  let collapseClass = 'collapse-container'
  if (active) {
    collapseClass += ' active'
  }

  return (
    <div className={collapseClass}>
      <div className={'collapse-wrapper'}>
        {children}
      </div>
    </div>
  )
}

export default CollapseList
