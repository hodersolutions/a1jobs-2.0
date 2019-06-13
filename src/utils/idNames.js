//Generic function to fetch all the id names, but values wont be stored here
function getIdNames(value){
	var idNames = new Object();
	idNames.IDs = []
	idNames.Names = []
	fetch("https://localhost:5100/api/v1/" + values +"/all")
	.then((response) => 
      {
      let promise = response.json();
      promise.then(
      	result => {
        	if(result.status === "success"){
          		for(var i=0; i<result.object.length; i++){
          			idNames.IDs.push(result.object[i].id);
          			idNames.Names.push(result.object[i].subject);
      			}
        	}
      	}
      )
    });
    return subjects;
}