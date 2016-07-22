
let FreelancerDispatcher = new Flux.Dispatcher();

//###########################################################################################################

var FreelancerStore = {
	
	freelancerList = list,
	
	dispatchCallBack: function(payload){
		if(payload.action === "add"){
			
				FreelancerStore.freelancerList.push(payload.item)
				console.log(FreelancerStore.freelancerList);	
			}
	}
};
FreelancerStore.dispatchToken = FreelancerDispatcher.register(FreelancerStore.dispatchCallBack);


//###########################################################################################################

let FreelancerAddComponent = React.createClass({
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


ReactDOM.render(<FreelancerAddComponent />, document.getElementById('content'));


