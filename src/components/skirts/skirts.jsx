import React from 'react'
import ReactDOM from "react-dom"

import SuperRuffle from './components/superRuffle.jsx'
import ThreeTier from './components/threeTier.jsx'

class skirts extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		return (
			<div>
				<SuperRuffle/>
				<ThreeTier/>
			</div>
		)
	}
}

module.exports = {React: React, ReactDOM: ReactDOM, skirts: skirts};