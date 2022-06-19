import { Route, Redirect } from 'react-router-dom';

export default function ProtectedRoute({ component: Component, ...props }) {
  return (
    <Route>
      {
        () => (props.loggedIn === true || localStorage.getItem('jwt')) ? <Component {...props} /> : <Redirect to='/' />
      }
    </Route>
  )
}
