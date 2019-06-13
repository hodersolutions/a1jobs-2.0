let qualifications = new Object();
qualifications.qualificationIDs = [];
qualifications.qualificationNames = [];
qualifications.loaded = false
module.exports = {
  //fetch Qualifications values
  getQualifications : function (){
  	if(qualifications.loaded == true){
  		return qualifications;
  	}
    qualifications.loaded = true;
  	fetch("http://localhost:5100/api/v1/qualifications/all")
  	.then((response) => 
        {
        let promise = response.json();
        promise.then(
        	result => {
          	if(result.status === "success"){
            		for(var i=0; i<result.object.length; i++){
            			qualifications.qualificationIDs.push(result.object[i].id);
            			qualifications.qualificationNames.push(result.object[i].qualification);
        			}
          	}
        	}
        )
      });
    ////console.log(qualifications);
    return qualifications;
  }
}