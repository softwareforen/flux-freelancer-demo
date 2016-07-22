


FreelancerAddComponent = react.createClass({
	
	componentDidMount: function(){
        
    },
	
	getInitialState: function(){
		
		return {}; 	
	},	

	handleClick: function(changeEvent){
		console.log("Add Freelancer");
		FreelancerDispatcher.dispatch({action:"add", item:"Hello"});
		
	},
	render: function(){
		
		return (
			<div>
				<a href="#"  onClick={this.handleClick}>Add</a>
            </div>	
		);
	}

});

module.export = FreelancerAddComponent;

