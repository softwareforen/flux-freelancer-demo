
let FreelancerDispatcher = new Flux.Dispatcher();

//###############################      STORES    ################################################################

//Items
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
			storeInstance.remove(itemToRemove);
		}else if(payload.action === "add"){
			storeInstance.create(payload.item);
			let input;
			$('[type = text]').val('');
		}else if(payload.action === "update"){
			
			let itemToUpdate = storeInstance.findWhere(payload.item);
			payload.item[payload.property] = payload.value;
			itemToUpdate.set(payload.item); 
		
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

let ChangeInput = React.createClass({

	save: function(event){
		FreelancerDispatcher.dispatch({action:"update", item:this.props.freelancer, property:this.props.property, value:$(event.target).val()});
	},

	render: function(){
		return (
			<input type="text" defaultValue={this.props.value} onBlur={this.save} />
		);
	}
});

//Table
let TableRowWrapper = React.createClass({
	
	
	changeProperty: function(doubleClickEvent){
	
		let propField = doubleClickEvent.target;
		let val = $(propField).text();
		let propName = $(propField).attr('data');
		ReactDOM.render(<ChangeInput property={propName} value={val} freelancer={this.props.freelancer} />,propField);
		
	},
	render: function(){
		let freelancer = this.props.freelancer.toJSON();
		return (
			<tr>
				<td data="name" onDoubleClick={this.changeProperty}>{freelancer.name}</td>
				<td data="project" onDoubleClick={this.changeProperty}>{freelancer.project}</td>
				<td data="role" onDoubleClick={this.changeProperty}>{freelancer.role}</td>
				<td data="startDate" onDoubleClick={this.changeProperty} >{freelancer.startDate}</td>
				<td data="endDate" onDoubleClick={this.changeProperty}>{freelancer.endDate}</td>
				<td><FreelancerActionComponent freelancer={this.props.freelancer} action="delete" /></td>
			</tr>
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
		let freelancer = this.state.freelancer;
		return (
				<div className="table-wrapper">
					<table className="table table-striped">
						<tbody>
						<tr><th>Name</th><th>Projekt</th><th>Rolle</th><th>Start</th><th>Ende</th><th>Actions</th></tr>
						{
							freelancer.map(function(freelancer, index){
								return <TableRowWrapper key={index} freelancer={freelancer} />;
							})
						}
						<TableInput freelancer={{}} />
						</tbody>
					</table>
				</div>
				);
	}
});
let TableInput = React.createClass({

	
	updateFreelancerDto : function(change){
		let propName = change.target.getAttribute('data');
		let propVal = change.target.value;
		let freelancer = this.props.freelancer;
		freelancer[propName] = propVal;
	},
	
	render: function() {
		
		return (
			<tr>
				<td><input type="text" data="name" id="freelancerName"  defaultValue={this.props.freelancer.name} onChange={this.updateFreelancerDto} /> </td>
				<td><input type="text" data="project" id="freelancerProject"  defaultValue={this.props.freelancer.project} onChange={this.updateFreelancerDto} /> </td>
				<td><input type="text" data="role" id="freelancerProject"  defaultValue={this.props.freelancer.role} onChange={this.updateFreelancerDto} /> </td>
				<td><input type="text" data="startDate" id="freelancerStartDate"  defaultValue={this.props.freelancer.startDate} onChange={this.updateFreelancerDto} /> </td>
				<td><input type="text" data="endDate" id="freelancerEndDate"  defaultValue={this.props.freelancer.endDate} onChange={this.updateFreelancerDto} /> </td>
				<td><FreelancerActionComponent freelancer={this.props.freelancer} action="add" /></td>
			</tr>
		);
	}
});


let storeInstance = new Store();

let table = ReactDOM.render(<Table freelancer={storeInstance} />, document.getElementById('content'));




