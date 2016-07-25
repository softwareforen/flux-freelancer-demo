
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
        this.add(list);
	
	},
    dispatchCallback: function(payload){
        if(payload.action === "add"){
			    //FreelancerStore.freelancerList.push(payload.item)
				console.log(storeInstance.add(payload.item));	
                console.log(storeInstance);
			}
		if(payload.action === "delete"){
			console.log("delete")
			let itemToRemove = storeInstance.findWhere(payload.freelancer);
			storeInstance.remove(itemToRemove);
			console.log(storeInstance.toJSON());
			ReactDOM.render(<Table freelancer={storeInstance} />, document.getElementById('content'));
		}
    },

});

let storeInstance = new Store();
console.log(storeInstance.toJSON());
//##############################     Views     ######################################################################

let FreelancerAddComponent = React.createClass({
	handleDelete: function(clickEvent){
	
		let freelancer = this.props.freelancer;

		FreelancerDispatcher.dispatch({action:"delete", item:"Hello", freelancer:freelancer});
		
	},
	render: function(){
		
		return (
			<div>
				<a href="#" data={this.props.freelancer} onClick={this.handleDelete}>Delete</a>
            </div>	
		);
	}

});

//Table
let TableRowWrapper = React.createClass({
	render: function(){
		let freelancer = this.props.freelancer;
		return (
			<tr id={freelancer.id}><td>{freelancer.name}</td><td>{freelancer.project}</td><td>{freelancer.startDate}</td><td>{freelancer.startDate}</td><td><FreelancerAddComponent freelancer={freelancer} onClick={this.handleDelete}/></td></tr>
		);
	}
});

let Table = React.createClass({
	
	getInitialState: function(){
		return {freelancer: storeInstance};
	},

	componentDidMount: function(){
	},
	

	render: function(){
		let freelancer = this.state.freelancer.toJSON();
		return (
				<div className="table-wrapper">
					<table className="table table-striped">
						<tbody>
						<tr><th>Name</th><th>Projekt</th><th>Start</th><th>Ende</th><th>Actions</th></tr>
						{
							freelancer.map(function(freelancer, index){
								return <TableRowWrapper key={freelancer.id} freelancer={freelancer} />;
							})
						}
						</tbody>
					</table>
				</div>
				);
	}
});


let table = ReactDOM.render(<Table freelancer={storeInstance} />, document.getElementById('content'));



