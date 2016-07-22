FreelancerDispatcher = require("./FreelancerDispatcher");

FreelancerStore = {list};

FreelancerStore.dispatchCallBack = function(payload){
    if(payload.action === "add"){
        this.list.put(paylod.item)
        console.log(this.list);
    }
}

FreelancerStore.dispatchToken = FreelancerDispatcher.registerCallback(FreelancerStore.dispatchCallBack);

module.exports = FreelancerStore;