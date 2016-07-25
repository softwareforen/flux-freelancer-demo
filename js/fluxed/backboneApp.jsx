
let FreelancerDispatcher = new Flux.Dispatcher();
var userInputFreelancer = {
			name: '',
			project: '',
			startDate: '',
			endDate: ''
		};

//###############################      STORES    ################################################################

//Items
//{teamId:0, freelancer:[]}
let FreelancerItem = Backbone.Model.extend({
	attributes: [
		'name',
		'project',
		'role',
		'startDate',
		'endDate'
	]
	}
);

var Store = Backbone.Collection.extend({
    model: FreelancerItem,
    url: "/free",
    initialize: function(){
        this.dispatchToken = FreelancerDispatcher.register(this.dispatchCallback);
        console.log("init store");
        this.add(list);
	},
    dispatchCallback: function(payload){
       if(payload.action === "delete"){
			let itemToRemove = storeInstance.findWhere(payload.item);
			console.log(payload.item);
			storeInstance.remove(itemToRemove);
		}else if(payload.action === "add"){
			storeInstance.create(payload.item);
			let input;
			$('[type = text]').val('');
		}
		ReactDOM.render(<Table freelancer={storeInstance} />, document.getElementById('content'));
    },

});

//##############################     Views     ######################################################################

let FreelancerActionComponent = React.createClass({
	handleDelete: function(clickEvent){
	
		let freelancer = this.props.freelancer;
		FreelancerDispatcher.dispatch({action:"delete", item:freelancer});
		
	},

	handleAdd: function(){
		let freelancer = this.props.freelancer;
		console.log(freelancer);
		FreelancerDispatcher.dispatch({action:"add", item:freelancer});
		
	},

	getAction: function(){
		
		if(this.props.action === "add"){
			return this.handleAdd;
			
		}else if(this.props.action === "delete"){
			return this.handleDelete;
		}
	},
	render: function(){
		
		return (
			<div>
				<a href="#" data={this.props.freelancer} onClick={this.getAction()}>{this.props.action}</a>
            </div>	
		);
	}

});

//Table
let TableRowWrapper = React.createClass({
	render: function(){
		let freelancer = this.props.freelancer;
		return (
			<tr id={freelancer.id}><td>{freelancer.name}</td><td>{freelancer.project}</td><td>{freelancer.role}</td><td>{freelancer.startDate}</td><td>{freelancer.endDate}</td><td><FreelancerActionComponent freelancer={freelancer} action="delete" /></td></tr>
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
						<tr><th>Name</th><th>Projekt</th><th>Rolle</th><th>Start</th><th>Ende</th><th>Actions</th></tr>
						{
							freelancer.map(function(freelancer, index){
								return <TableRowWrapper key={freelancer.id} freelancer={freelancer} />;
							})
						}
						<TableInput />
						</tbody>
					</table>
				</div>
				);
	}
});
let TableInput = React.createClass({

	getInitialState: function(){
		return {freelancer: userInputFreelancer};
	},

	updateFreelancerDto : function(change){
		let propName = change.target.getAttribute('data');
		let propVal = change.target.value;
		let freelancer = this.state.freelancer;
		freelancer[propName] = propVal; 
		this.setState({freelancer: freelancer});
		
		 
	},
	
	componentWillReceiveProps: function(){
		this.replaceState({freelancer: userInputFreelancer});
	},
	
	render: function() {
		
		return (
			<tr>
				<td><input type="text" data="name" id="freelancerName"  defaultValue={this.state.freelancer.name} onChange={this.updateFreelancerDto} /> </td>
				<td><input type="text" data="project" id="freelancerProject"  defaultValue={this.state.freelancer.project} onChange={this.updateFreelancerDto} /> </td>
				<td><input type="text" data="project" id="freelancerProject"  defaultValue={this.state.freelancer.role} onChange={this.updateFreelancerDto} /> </td>
				<td><input type="text" data="startDate" id="freelancerStartDate"  defaultValue={this.state.freelancer.startDate} onChange={this.updateFreelancerDto} /> </td>
				<td><input type="text" data="endDate" id="freelancerEndDate"  defaultValue={this.state.freelancer.endDate} onChange={this.updateFreelancerDto} /> </td>
				<td><FreelancerActionComponent freelancer={this.state.freelancer} action="add" /></td>
			</tr>
		);
	}
});


let storeInstance = new Store();
console.log(storeInstance.toJSON());
let table = ReactDOM.render(<Table freelancer={storeInstance} />, document.getElementById('content'));



