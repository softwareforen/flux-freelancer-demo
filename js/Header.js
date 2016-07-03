var TeamChooser = React.createClass({
	
	componentDidMount: function(){
		renderTable(this.state.chosenTeam);
	},
	
	getInitialState: function(){
		let initial = {chosenTeam: {teamName: "Team 1", teamId:0},
				teams: [
						{teamName: "Team 1", teamId:0},
						{teamName: "Team 2", teamId:1}
						]
		}; 
		return initial; 	
	},	

	handleChange: function(changeEvent){
		console.log("change Team");
		let chosenTeam = {};
		this.state.teams.forEach(function(team){
			if(team.teamId == changeEvent.target.value){
			chosenTeam = team;
				return;
			}
		});
      	this.state.chosenTeam = chosenTeam;
		 
		document.getElementById('teamChooser').dispatchEvent(new CustomEvent(
			'teamchanged',{
				detail: chosenTeam,
				bubbles: true,
				cancelable: false
		}));
		renderHeader();
		
		
	},
	render: function(){
		let teams = this.state.teams;
		let chosenTeam =  this.state.chosenTeam;
		
		return (
			<div>
				<select id="teamChooser" defaultValue={chosenTeam.teamId} onChange={this.handleChange}>
				{
					teams.map(function(team, index){
					return (
						<option value={team.teamId} >{team.teamName}</option>
						);
					})
				}
				</select>
				<TeamHeading teamName={chosenTeam.teamName} />
			</div>	
		);
	}

});

var TeamHeading = React.createClass({

	render: function(){
		return (<h2>Freelancer Stats of {this.props.teamName}</h2>)
	}
})

function renderHeader(){
	ReactDOM.render(
		<TeamChooser />,
		document.getElementsByTagName('header')[0]
	);
	
}



//Table
class Table extends React.Component{
	
	constructor(){
		super();
		
	}
	componentDidMount(){
		document.getElementById('teamChooser').addEventListener('teamchanged',this.createTable, false);
		console.log(document.getElementById('teamChooser'));
	}

	createTable(teamChangeEvent){
		let freelancer = {};
		console.log(teamChangeEvent);
		list.forEach(function(curr){
			if(curr.teamId == teamChangeEvent.detail.teamId){
				freelancer = curr.freelancer;
			}
		})
		ReactDOM.render(<Table freelancer={freelancer}/>, document.getElementById('freelancerOverview'));
	}

	render(){
		let freelancer = this.props.freelancer;
		return (
				<div className="table-wrapper" onChange={this.handleChange}>
					<table className="table table-striped">
						<tbody>
						<tr><th>Name</th><th>Projekt</th><th>Start</th><th>Ende</th></tr>
						{
							freelancer.map(function(freelancer, index){
								return (<tr><td>{freelancer.name}</td><td>{freelancer.project}</td><td>{freelancer.startDate}</td><td>{freelancer.startDate}</td></tr>);
							})
						}
						</tbody>
					</table>
				</div>
				);
	}
}


var renderTable =  function(team){
	let freelancer = {};
	list.forEach(function(curr){
		if(curr.teamId == team.teamId){
			freelancer = curr.freelancer;
		}
	})
	ReactDOM.render(<Table freelancer={freelancer}/>, document.getElementById('freelancerOverview'));
}

renderHeader();
