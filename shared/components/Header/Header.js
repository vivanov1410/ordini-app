import React from 'react'
import { Link } from 'react-router'
import classNames from 'classnames'

const Header = (props, context) => {
  const navItemClass = classNames('nav-item', {
    active: context.router.isActive('/recipes', true),
  })

  return (
    <nav className="navbar navbar-light bg-faded">
      <Link to="/" className="navbar-brand">Ordini</Link>
      <ul className="nav navbar-nav">
        <li className={navItemClass}>
          <Link to="/recipes" className="nav-link">Recipes <span className="sr-only">(current)</span></Link>
        </li>
      </ul>
    </nav>
  )
}

Header.contextTypes = {
  router: React.PropTypes.object,
}

export default Header
