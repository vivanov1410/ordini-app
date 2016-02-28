import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'

const App = (props) => {
  return (
    <div>
      <Header />
      <div className="container">
        {props.children}
      </div>
      <Footer />
    </div>
  )
}

App.propTypes = {
  dispatch: PropTypes.func.isRequired,
  children: PropTypes.object.isRequired,
}

export default connect()(App)
