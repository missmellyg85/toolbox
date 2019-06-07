import React from 'react'
import ReactDOM from "react-dom"
import patternData from './service/patternData.json'

class sewing extends React.Component {
	constructor(props) {
		super(props)
	}

	determinedImage(pattern) {
		console.log(pattern.File)
		if(pattern.File) {
			return(<img src={`src/assets/images/${pattern.File}.png`} />)
		}
	}

	renderPattern(pattern) {
		return (
			<div>
				<h2>{pattern.Title}</h2>
				<h3>by {pattern.Brand}</h3>
				{this.determinedImage(pattern)}
			</div>
		)
	}

	render() {
		const patterns = patternData

		return (
			<div>
				<h1>Pattern Inventory</h1>
				<div id="patterns">
					{patterns.map((pattern, index) => {

						return <div className="pattern" key={`pattern-${index}`}>{this.renderPattern(pattern)}</div>

					})}
				</div>
			</div>
		)
	}
}

module.exports = {React: React, ReactDOM: ReactDOM, sewing: sewing};