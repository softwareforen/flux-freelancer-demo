
let FreelancerDispatcher = require("node_modules/flux/dost/Flux.js").Dispatcher;

//###########################################################################################################

FreelancerStore = {list};

FreelancerStore.dispatchCallBack = function(payload){
    if(payload.action === "add"){
        this.list.put(paylod.item)
        console.log(this.list);
    }
}

FreelancerStore.dispatchToken = FreelancerDispatcher.registerCallback(FreelancerStore.dispatchCallBack);

//###########################################################################################################

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


