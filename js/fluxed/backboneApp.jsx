
let FreelancerDispatcher = new Flux.Dispatcher();

//###############################      STORES    ################################################################

//Items
//{teamId:0, freelancer:[]}
let FreelancerItem = Backbone.Model.extend();

var Store = Backbone.Collection.extend({
    model: FreelancerItem,
    url: "/free",
    initialize: function(){
        this.dispatchToken = FreelancerDispatcher.register(this.dispatchCallback);
        console.log("init store");
        this.add(list[0].freelancer);
        
    },
    dispatchCallback: function(payload){
        if(payload.action === "add"){
			    //FreelancerStore.freelancerList.push(payload.item)
				console.log(storeInstance.add(payload.item));	
                console.log(storeInstance);
			}
    },

});

let storeInstance = new Store();
console.log(storeInstance.toJSON());
//##############################     Views     ######################################################################

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

//Table
class Table extends React.Component{
	
	constructor(){
		super();
		
	}
	componentDidMount(){
	}

	render(){
		let freelancer = this.props.freelancer;
		return (
				<div className="table-wrapper">
					<table className="table table-striped">
						<tbody>
						<tr><th>Name</th><th>Projekt</th><th>Start</th><th>Ende</th><th>Actions</th></tr>
						{
							freelancer.map(function(freelancer, index){
								return (<tr><td>{freelancer.name}</td><td>{freelancer.project}</td><td>{freelancer.startDate}</td><td>{freelancer.startDate}</td><td><FreelancerAddComponent /></td></tr>);
							})
						}
						</tbody>
					</table>
				</div>
				);
	}
}



ReactDOM.render(<Table freelancer={storeInstance.toJSON()} />, document.getElementById('content'));


