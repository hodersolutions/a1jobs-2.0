var subjects = {};
subjects.subjectIDs = [];
subjects.subjectNames = [];
subjects.loaded = false;
module.exports = {
  
  //fetch subjects values
  getSubjects : function (){
  	if(subjects.loaded == true){
  		return subjects;
  	}
    subjects.loaded = true;
  	fetch("http://localhost:5100/api/v1/subjects/all")
  	.then((response) => 
        {
        let promise = response.json();
        promise.then(
        	result => {
          	if(result.status === "success"){
            		for(var i=0; i<result.object.length; i++){
            			subjects.subjectIDs.push(result.object[i].id);
            			subjects.subjectNames.push(result.object[i].subject);
        			}
          	}
        	}
        )
      });
      return subjects;
  }
}