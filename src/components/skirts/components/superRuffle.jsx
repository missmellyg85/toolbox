import React from 'react'
import mathjs from 'mathjs'

export default class superRuffle extends React.Component {
	constructor(props) {
		super(props)
		this.MARGIN_OF_ERROR = 2
		// this.state = { skirt: { length:'',waist:'',fabric:'', ruffle:'' } }
		this.state = { skirt: { length:40,waist:30,fabric:6, ruffle:3 } }

		this.handleChange = this.handleChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
	}

	render() {
		return (
			<div>
				<h2>Super Ruffle Calculation</h2>
				<p>This calculation gives options for how long the top half and the ruffle half can be for a Super Ruffle
				skirt when you have a given amount of fabric.</p>
				<p>Assumptions made:</p>
				<ul>
					<li>Fabric is 54" wide</li>
					<li>Waist is either real waist for zipper, or width at hips for sash. Expect extra fabric needed for sash waist.</li>
					<li>Allowed give/take on length is: {this.MARGIN_OF_ERROR} inches</li>
				</ul>
				{this.renderSkirtInputForm()}
				{this.renderResults()}
			</div>
		)
	}

	renderSkirtInputForm() {
		return (
			<form onSubmit={this.handleSubmit}>
				<div>
					<label>Length (inches)</label>
					<input type="number" name="length" value={this.state.skirt.length} onChange={this.handleChange}/>
				</div>
				<div>
					<label>Waist Size (inches)</label>
					<input type="number" name="waist" value={this.state.skirt.waist} onChange={this.handleChange}/>
				</div>
				<div>
					<label>Total Fabric (yards)</label>
					<input type="text" name="fabric" value={this.state.skirt.fabric} onChange={this.handleChange}/>
				</div>
				<div>
					<label>Ruffle multiplier</label>
					<input type="text" name="ruffle" value={this.state.skirt.ruffle} onChange={this.handleChange}/>
				</div>
				<div>
					<input type="submit" value="Calculate"/>
				</div>
			</form>
		)
	}

	renderResults() {
		if(this.state.results && this.state.results.length > 0) {
			return (
				<div className="table-container">
					<table>
						<thead>
							<tr>
								<th>Length of top half</th>
								<th>Length of ruffle</th>
								<th>Total skirt length</th>
							</tr>
						</thead>
						<tbody>
							{this.state.results.map((result, i) => {
								return (
									<tr key={i}>
										<td>{result.topHalfLength}</td>
										<td>{result.ruffleLength}</td>
										<td>{result.totalLength}</td>
									</tr>
								)
							})}
						</tbody>
					</table>
				</div>
			)
		} else if(this.state.results && this.state.results.length == 0) {
			return (<h3>No results</h3>)
		}
	}

	handleChange(event) {
		const target = event.target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		const name = target.name;

		this.state.skirt[name] = value

		this.setState({skirt: this.state.skirt});
	}

	handleSubmit(event) {
		event.preventDefault();
		// x(   (2pi(x + (w/(2pi)))) / 54) + (ry)(   (2pi(x + y + (w/(2pi)))) / 54) = f //to easily paste into Wolfram Alpha
		this.setState({results: this.calculateY()})
	}

	calculateY(){
		// Without allowing you to choose ruffle size
		// ( (pi*y)/9)*( (w/(2pi))+x+y ) +( ((pi*x)/27)((w/(2pi))+x )) = f // for plugging into Wolfram alpha

		let totalSkirtLength = parseFloat(this.state.skirt.length)
		let waistSize = parseFloat(this.state.skirt.waist)
		let fabricAmount = parseFloat(this.state.skirt.fabric) * 36
		let fabricAmountLessWaistband = fabricAmount - 7 // assume waistbands are never > 54", so take a whole strip of 7" wide
		let ruffleFactor = parseFloat(this.state.skirt.ruffle)
			
		let results = []

		let topHalfLength = totalSkirtLength
		let ruffleLength = 0
		let diff = 0
		while(topHalfLength && (topHalfLength > ruffleLength)) {
			let theSqrt = mathjs.sqrt( ruffleFactor * ( (432 * mathjs.pi * fabricAmountLessWaistband) + ( (waistSize + (2 * mathjs.pi * topHalfLength)) * ((ruffleFactor * waistSize) + (2 * mathjs.pi * ruffleFactor * topHalfLength) - (8 * mathjs.pi * topHalfLength)) ) ) )
			let theAfterTheSqrtPartOnTop =  (ruffleFactor * (waistSize + (2 * mathjs.pi * topHalfLength) ) )

			let denom = (4 * mathjs.pi * ruffleFactor)

			ruffleLength = ((theSqrt - theAfterTheSqrtPartOnTop) / denom)
			ruffleLength = mathjs.round(ruffleLength,1)

			diff = totalSkirtLength - (topHalfLength + ruffleLength)
			if(mathjs.abs(diff) < 2 ) {
				let arr = {
					topHalfLength: topHalfLength,
					ruffleLength: ruffleLength,
					totalLength: (mathjs.round(topHalfLength, 1) + ruffleLength)
				}
				results.push(arr)
			}

			topHalfLength = topHalfLength - 0.5
		}

		return results
	}
}
