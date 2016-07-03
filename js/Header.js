var TeamChooser = React.createClass({
	
	
	getInitialState: function(){
		return {chosenTeam: {teamName: "Team 1", teamId:0},
				teams: [
						{teamName: "Team 1", teamId:0},
						{teamName: "Team 2", teamId:1}
						]
		}; 	
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
		renderHeader(); 
	},
	render: function(){
		let teams = this.state.teams;
		let chosenTeam =  this.state.chosenTeam;
		
		return (
			<div>
				<select defaultValue={chosenTeam.teamId} onChange={this.handleChange}>
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

renderHeader();
