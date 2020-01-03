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

const Routes = () => (
	<div className='style'>
		<Switch>
			<Route exact path='/' component={Home} />
			<Route exact path='/contact' component={Contact} />
			<Route exact path='/signin' component={SignIn} />
			<Route exact path='/searchjobs' component={SearchJobsMain} />
			<Route exact path='/forgot' component={ForgotPassword} />
			<Route exact path='/signup' component={SignUp} />			
			{/* <Route exact path='/showjob/:id' component={ requireAuth(JobView) } /> */}
			{/* <Route exact path='/createjob' component={ requireAuth(JobCreate) } /> */}
			<Route exact path='/showjob/:id' component={ JobView } />
			<Route exact path='/createjob' component={ JobCreate } />
			<Route exact path='/signout' component={requireAuth(SignOut)} />		
			<Route path='*' component={ NotFound } />
		</Switch>
	</div>
);

export default Routes;
