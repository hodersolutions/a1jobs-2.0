import React from 'react';
import { Route, Switch } from 'react-router-dom';

import requireAuth from '../auth/JWTAuthentication';
import Home from '../home/Home';
import NotFound from '../common/notfound/NotFound';
import Contact from '../common/contact/Contact';
import SignIn from '../auth/SignIn';
import SignUp from '../auth/SignUp';
import SearchJobsMain from '../search/SearchJobsMain';
import JobView from '../job/JobView';
import JobCreate from '../job/JobCreate';
import SignOut from '../auth/SignOut';
import ForgotPassword from '../auth/ForgotPassword';
import JobPostings from '../job/JobPostings';
import JobsApplied from '../job/JobsApplied';
import ViewApplicants from '../user/ViewApplicants';
import EditProfile from '../user/EditProfile';
import ViewProfile from '../user/ViewProfile';
import SearchProfiles from '../search/SearchProfiles';
import ViewAnyProfile from '../user/ViewAnyProfile';

const Routes = () => (
	<div className='nav-content'>
		<Switch>
			<Route exact path='/' component={Home} />
			<Route exact path='/contact' component={Contact} />
			<Route exact path='/signin' component={SignIn} />
			<Route exact path='/jobs' component={SearchJobsMain} />
			<Route exact path='/profiles' component={SearchProfiles} />
			<Route exact path='/forgot' component={ForgotPassword} />
			<Route exact path='/signup' component={SignUp} />						
			<Route exact path='/job/:id' component={ JobView } />
			<Route exact path='/job' component={ JobCreate } />
			<Route exact path='/signout' component={requireAuth(SignOut)} />
			<Route exact path='/profile/user/:id' component={ ViewProfile } />				 */}
			<Route exact path='/edituser' component={ EditProfile } />
			<Route exact path='/jobs/myposts' component={ JobPostings } />
			<Route exact path='/jobs/appliedjobs' component={ JobsApplied } />
			<Route exact path='/jobs/appliedusers/:id' component={ ViewApplicants } />
			<Route exact path='/profile/:id' component={ ViewAnyProfile } />
			<Route path='*' component={ NotFound } />
		</Switch>
	</div>
);

export default Routes;
