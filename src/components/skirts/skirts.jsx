import React from 'react'
import ReactDOM from "react-dom"

import SuperRuffle from './components/superRuffle.jsx'

class skirts extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		return (
			<SuperRuffle/>
		)
	}
}

module.exports = {React: React, ReactDOM: ReactDOM, skirts: skirts};