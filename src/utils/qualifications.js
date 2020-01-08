let qualifications = new Object();
qualifications.qualificationIDs = [];
qualifications.qualificationNames = [];
qualifications.loaded = false
export function getQualifications() {
	if (qualifications.loaded == true) {
		return qualifications;
	}
	qualifications.loaded = true;
	fetch("http://localhost:5000/api/v1/qualifications/all")
		.then((response) => {
			let promise = response.json();
			promise.then(result => {
				if (result.status === "success") {
					for (var i = 0; i < result.object.length; i++) {
						qualifications.qualificationIDs.push(result.object[i].id);
						qualifications.qualificationNames.push(result.object[i].qualification);
					}
				}
			});
		});
	return qualifications;
}