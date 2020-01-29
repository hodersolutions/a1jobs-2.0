import settings from '../settings';

class BaseAPI {
	constructor() {
		this.url = settings.A1JOBSAPI.url			
	}
}

export default BaseAPI