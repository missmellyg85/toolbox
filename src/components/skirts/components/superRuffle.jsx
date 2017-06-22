import React from 'react'
import mathjs from 'mathjs'

export default class superRuffle extends React.Component {
	constructor(props) {
		super(props)
		this.MARGIN_OF_ERROR = 2
		this.state = { skirt: { length:'',waist:'',fabric:'' } }

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
					<label>Total Fabric (inches)</label>
					<input type="number" name="fabric" value={this.state.skirt.fabric} onChange={this.handleChange}/>
				</div>
				<div>
					<input type="submit" value="Calculate"/>
				</div>
			</form>
		)
	}

	renderResults() {
		if(this.state.results) {
			return (
				<table>
					<thead>
						<tr>
							<th>Length of top half</th>
							<th>Length of ruffle</th>
							<th>Total skirt length</th>
						</tr>
					</thead>
					<tbody>
						{this.state.results.map(result => {
							return (
								<tr>
									<td>{result.x}</td>
									<td>{result.y}</td>
									<td>{result.length}</td>
								</tr>
							)
						})}
					</tbody>
				</table>
			)
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
// x(   (2pi(x + (w/(2pi)))) / 54) + (3y)(   (2pi(x + y + (w/(2pi)))) / 54) = f
		// simplified: ( (pi*y)/9)*( (w/(2pi))+x+y ) +( ((pi*x)/27)((w/(2pi))+x )) = f
		this.setState({results: this.calculateY()})
	}

	// calculateX(){
	// 	let l = this.state.skirt.length
	// 	let w = this.state.skirt.waist
	// 	let f = this.state.skirt.fabric
	// 	let results = []
	//
	// 	for(let i = l; i > 0; i = (i - 1)) {
	// 		let x = - ((- mathjs.sqrt((432 * mathjs.pi * f) + mathjs.square(w) - (12 * mathjs.pi * w * mathjs.square(i)) ) + w + (6 * mathjs.pi * i)) / (4 * mathjs.pi))
	// 		results.push({x: x, y: i})
	// 	}
	// 	return results
	// }

	calculateY(){
		// ( (pi*y)/9)*( (w/(2pi))+x+y ) +( ((pi*x)/27)((w/(2pi))+x )) = f // for plugging into Wolfram alpha

		let l = this.state.skirt.length
		let w = this.state.skirt.waist
		let f = this.state.skirt.fabric
		let results = []

		let x = l
		let y = 0
		let diff = 0
		while(x && (x > y)) {
			y = ((mathjs.sqrt(3) * mathjs.sqrt((432 * mathjs.pi * f) + (3 * mathjs.square(w)) + (4 * mathjs.pi * w * x) - (4 * mathjs.square(mathjs.pi) + mathjs.square(x))) - (3 * w) - (6 * mathjs.pi * x)) / (12 * mathjs.pi))
			y = mathjs.round(y,1)

			diff = l - (x + y)
			if(mathjs.abs(diff) < 2 ) {
				let arr = {
					x: x,
					y: y,
					length: (mathjs.round(x, 1) + y)
				}
				results.push(arr)
			}

			x = x - 0.5
		}

		return results
	}
}