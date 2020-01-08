var districts = {};
districts.loaded = false;
var d = {};
d.districtIDs = new Array();
d.districtNames = new Array();
export function getDistricts(ids, names) {
	if (districts.loaded === true) {
		return districts;
	}
	districts.loaded = true;
	fetch("http://localhost:5100/api/v1/districts/all")
		.then((response) => {
			let promise = await response.json();
			promise.then(result => {
				if (result.status === "success") {
					for (var i = 0; i < result.object.length; i++) {
						d.districtIDs.push(result.object[i].id);
						ids.push(result.object[i].id);
						d.districtNames.push(result.object[i].district);
						names.push(result.object[i].district);
					}
					return d;
				}
			});
		});
	return d;
}