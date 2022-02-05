import React           from 'react'
import {Route, withRouter}         from 'react-router'
import {ComponentLazy} from '../../../../helpers/Helpers'
import {Switch}        from 'react-router-dom'

const UserView = React.lazy( () => import('../../../components/user/User') )
const ArticlesView = React.lazy( () => import('../../../components/articles/index') )

const Roots = () => {
  return (
    <Switch>
      <Route path={ '/application/main/users' }>
        <ComponentLazy component={ UserView }/>
      </Route>
      <Route path={ '/application/main/articles' }>
        <ComponentLazy component={ ArticlesView }/>
      </Route>
    </Switch>
  )
}

export default withRouter(Roots)