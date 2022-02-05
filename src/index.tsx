import React              from 'react'
import ReactDOM           from 'react-dom'
import * as serviceWorker from './serviceWorker'

import { noop }       from 'lodash'

global.NOOP = noop

const Appx = () => {

  const Element = React.useMemo(() => {
    return React.lazy(() => import('./App'))
  }, [])

  return (
    <React.Suspense fallback={null}>
      <Element/>
    </React.Suspense>
  )
}

ReactDOM.render(<Appx/>,
  document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
