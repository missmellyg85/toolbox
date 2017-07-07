import React from 'react'
import mathjs from 'mathjs'

export default class threeTier extends React.Component {
	constructor(props) {
		super(props)
		this.state = {skirt: {length: '', waist: ''}}

		this.handleChange = this.handleChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
		this.runTest()
	}

	render() {
		return (
			<div>
				<h2>Three Tier Fabric Calculator</h2>
				<p>This algorithm helps decide how much fabric you need given the particular measurements of a skirt</p>
				<p>Assumptions made:</p>
				<ul>
					<li>Fabric is 54" wide</li>
					<li>Waist is either real waist for zipper, or width at hips for sash. Expect extra fabric needed for sash waist.</li>
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
					<input type="submit" value="Calculate"/>
				</div>
			</form>
		)
	}

	renderResult(result) {
		return (
			<div>
				<div>
					Waist: {result.waist}<br/>
					Length: {result.length}<br/>
					Yardage using largest tier: {result.yardageUsingLargestTier}<br/>
					Yardage using actual tier: {result.yardageUsingActualTier}
				</div>
				<table>
					<thead>
						<tr>
							<td></td>
							<td>Tier Length (in)</td>
							<td>Skirt Length at Tier Bottom (in)</td>
							<td>Tier Circumference (in)</td>
							<td>Slices</td>
						</tr>
					</thead>
					<tbody>
						{this.renderTierRow("Waistband", result.waistband)}
						{this.renderTierRow("Tier 1", result.tier1)}
						{this.renderTierRow("Tier 2", result.tier2)}
						{this.renderTierRow("Tier 3", result.tier3)}
					</tbody>
				</table>
				<hr/>
			</div>
		)
	}

	renderTierRow(text, tier){
		return (
			<tr>
				<td>{text}</td>
				<td>{tier.length}</td>
				<td>{tier.totalLength}</td>
				<td>{tier.circumference || "N/A"}</td>
				<td>{tier.slices}</td>
			</tr>
		)
	}

	renderResults() {
	    // this.setState({results:this.runTest()}) //for testing
		if(this.state.results) {
			return (
				<div>
					{this.state.results.map((result, i) => {
						return ( <div key={i}>{this.renderResult(result)}</div>)
					})}
				</div>
			)
		}
	}

	// ====== Event Handlers ====== //

	handleChange(event) {
		const target = event.target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		const name = target.name;

		this.state.skirt[name] = parseFloat(value)

		this.setState({skirt: this.state.skirt});
	}

	handleSubmit(event) {
		event.preventDefault();
		this.setState({results: [this.calculateThePieces(this.state.skirt.waist, this.state.skirt.length)]})
	}

	// ====== Calculation Methods ===== //

	calculateThePieces(waist, length) {
		let waistLength = this.calculateWaistLength(waist)
		let tierRollup = this.calculateTierLengths(length)
		tierRollup = this.calculateTierCircumferences(tierRollup, waistLength)
		tierRollup = this.calculateSlices(tierRollup)
		tierRollup = this.roundFabricToMostReasonableYardage(tierRollup)
		// console.log("Collapse", tierRollup)
		tierRollup['waist'] = waist
		tierRollup['length'] = length
		return tierRollup
	}

	calculateWaistLength(waistCircumference) {
		return this.roundUpToNearestTenth(waistCircumference / (2 * Math.PI))
	}

	calculateTierLengths(skirtLength) {
		let third = Math.floor(skirtLength / 3)
		let tierSplits = {
			waistband: {length: 8, totalLength: 2.5},
			tier1: {length: third, totalLength:'' },
			tier2: {length: third, totalLength:'' },
			tier3: {length: third, totalLength:'' }
		}

		let remainder = skirtLength % 3
		if (remainder == 2) {
			tierSplits['tier1']['length'] = tierSplits['tier1']['length'] + 1
			tierSplits['tier3']['length'] = tierSplits['tier3']['length'] + 3
		} else if (remainder == 1) {
			tierSplits['tier1']['length'] = tierSplits['tier1']['length'] + 1
		}

		tierSplits['tier1']['totalLength'] = tierSplits['waistband']['totalLength'] + tierSplits['tier1']['length']
		tierSplits['tier2']['totalLength'] = tierSplits['tier1']['totalLength'] + tierSplits['tier2']['length']
		tierSplits['tier3']['totalLength'] = tierSplits['tier2']['totalLength'] + tierSplits['tier3']['length']

		return tierSplits
	}

	calculateTierCircumferences(tierRollup, waistLength) {
		let tierCircumferenceSplits = Object.assign({}, tierRollup)
		for (let key of Object.keys(tierRollup)) {
			if(key != 'waistband'){
				let tierLength = parseFloat(tierRollup[key]['totalLength'])
				tierCircumferenceSplits[key]["circumference"] = this.roundUpToNearestTenth((parseFloat(waistLength) + tierLength) * 2 * Math.PI)
			}
		}
		return tierCircumferenceSplits
	}

	calculateSlices(tierRollup) {
		const sliceWidth = 54
		let slicesPerTier = Object.assign({}, tierRollup)
		for (let key of Object.keys(tierRollup)) {
			if(key == 'waistband'){
				slicesPerTier[key]["slices"] = 1
			} else {
				let tierCircumference = tierRollup[key]["circumference"]
				slicesPerTier[key]["slices"] = this.roundUpToNearestTenth(tierCircumference / sliceWidth)
			}

		}
		return slicesPerTier
	}

	roundFabricToMostReasonableYardage(tierRollup) {

		let largestTier
		for (let key of Object.keys(tierRollup)) {
			let tierLength = tierRollup[key]["length"]
			if((largestTier && (tierLength > largestTier)) || (largestTier === undefined)) {
				largestTier = tierLength
			}
		}

		let inchesOfFabricUsingLargestTier = 0
		for (let key of Object.keys(tierRollup)) {
			let tierLength = largestTier
			let slices = tierRollup[key]["slices"]
			inchesOfFabricUsingLargestTier = inchesOfFabricUsingLargestTier + (tierLength * slices)
		}

		let inchesOfFabricUsingActualTiers = 0
		for (let key of Object.keys(tierRollup)) {
			let tierLength = tierRollup[key]["length"]
			let slices = tierRollup[key]["slices"]
			inchesOfFabricUsingActualTiers = inchesOfFabricUsingActualTiers + (tierLength * slices)
		}
		let fabricRollup = Object.assign({}, tierRollup)
		fabricRollup['yardageUsingLargestTier'] = this.roundToNearestTenth(inchesOfFabricUsingLargestTier/36)
		fabricRollup['yardageUsingActualTier'] = this.roundToNearestTenth(inchesOfFabricUsingActualTiers/36)

		return fabricRollup
	}

	//======= Helper Methods =======/

	runTest() {
		const sizes = [
			{
				'length': 40,
				'waist': 30
			},
			{
				'length': 30,
				'waist': 40
			},
			{
				'length': 35,
				'waist': 35
			},
			{
				'length': 36,
				'waist': 50
			},
			{
				'length': 30,
				'waist': 50
			},
			{
				'length': 40,
				'waist': 50
			},
			{
				'length': 45,
				'waist': 30
			},
			{
				'length': 45,
				'waist': 50
			}
		]
		let results = []
		for(let i = 0; i < sizes.length; i++) {
			let l = sizes[i].length
			let w = sizes[i].waist
			results.push(this.calculateThePieces(w, l))
		}
		return results
	}

	roundUpToNearestTenth(number) {
		return Math.max(Math.round(number * 10) / 10);
	}

	roundToNearestTenth(val) {
		return mathjs.round(val, 1)
	}
}