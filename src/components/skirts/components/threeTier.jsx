import React from 'react'
import mathjs from 'mathjs'

export default class threeTier extends React.Component {
	constructor(props) {
		super(props)
		this.state = {skirt: {length: '', waist: ''}}

		this.handleChange = this.handleChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
	}

	render() {
		return (
			<div>
				<h2>Three Tier Fabric Calculator</h2>
				<p>This algorithm helps decide how much fabric you need given the particular measurements of a skirt</p>
				<p>Assumptions made:</p>
				<ul>
					<li>Fabric is 54" wide</li>
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

	renderResults() {
	}

	handleChange(event) {
		const target = event.target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		const name = target.name;

		this.state.skirt[name] = parseFloat(value)

		this.setState({skirt: this.state.skirt});
	}

	handleSubmit(event) {
		event.preventDefault();
		console.log(this.state)
		this.calculateThePieces()
	}

	// ====== maths ===== //
	calculateThePieces() {
		let waistLength = this.calculateWaistLength(this.state.skirt.waist)
		let tierLengths = this.calculateTierLengths(this.state.skirt.length)
		let tierCircumferences = this.calculateTierCircumferences(tierLengths, waistLength)
		let tierSlices = this.calculateSlices(tierCircumferences)
		// console.log("Waist", waistLength)
		// console.log("Tier Lengths", tierLengths)
		// console.log("Tier Circs", tierCircumferences)
		// console.log("Tier Slices", tierSlices)

		let collapse = this.collapseSlicesToTotal(tierSlices)
		console.log("Collapse", collapse)
	}

	calculateWaistLength(waistCircumference) {
		return this.roundUpToNearestTenth(waistCircumference / (2 * Math.PI))
	}

	calculateTierLengths(skirtLength) {
		let third = Math.floor(skirtLength / 3)
		let tierSplits = {
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

		tierSplits['tier1']['totalLength'] = tierSplits['tier1']['length']
		tierSplits['tier2']['totalLength'] = tierSplits['tier1']['totalLength'] + tierSplits['tier2']['length']
		tierSplits['tier3']['totalLength'] = tierSplits['tier2']['totalLength'] + tierSplits['tier3']['length']

		return tierSplits
	}

	calculateTierCircumferences(tierSplits, waistLength) {
		let tierCircumferenceSplits = {}
		for (let key of Object.keys(tierSplits)) {
			let tierLength = parseFloat(tierSplits[key]['totalLength'])
			tierCircumferenceSplits[key] = this.roundUpToNearestTenth((parseFloat(waistLength) + tierLength) * 2 * Math.PI)
		}
		return tierCircumferenceSplits
	}

	calculateSlices(tierCircumferenceSplits) {
		const sliceWidth = 54
		let slicesPerTier = {}
		for (let key of Object.keys(tierCircumferenceSplits)) {
			let tierCircumference = tierCircumferenceSplits[key]
			slicesPerTier[key] = this.roundUpToNearestTenth(tierCircumference / sliceWidth)

		}
		return slicesPerTier
	}

	collapseSlicesToTotal(slicesPerTier) {
		const waistbandSlice = 1.0
		let a = this.roundToNearestTenth(slicesPerTier['tier1'] - Math.floor(slicesPerTier['tier1']))
		let b = this.roundToNearestTenth(slicesPerTier['tier2'] - Math.floor(slicesPerTier['tier2']))
		let c = this.roundToNearestTenth(slicesPerTier['tier3'] - Math.floor(slicesPerTier['tier3']))

		let optionDiffs = {
			"ab": this.roundToNearestTenth(1.0 - (a + b)),
			"ac": this.roundToNearestTenth(1.0 - (a + c)),
			"bc": this.roundToNearestTenth(1.0 - (b + c)),
			"abc": this.roundToNearestTenth(1.0 - (a + b + c))
		}
		console.log(optionDiffs)

		const allowedMargin = 0.1
		let lowest
		for (let key of Object.keys(optionDiffs)) {
			let opt = optionDiffs[key]
			if(opt >= allowedMargin &&  (!lowest || (lowest && opt < lowest))) {
				lowest = key
			}
		}

		//now you know which tiers you're getting a free slice from, so calculate the total slices needed
		//
	}

	roundUpToNearestTenth(number) {
		return Math.max(Math.round(number * 10) / 10);
	}

	roundToNearestTenth(val) {
		return mathjs.round(val, 1)
	}
}