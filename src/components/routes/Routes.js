import React from "react";
import { Route, Switch } from "react-router-dom";

import Home from "../home/Home";
import About from '../common/about/About';
import NotFound from '../common/notfound/NotFound';
import Contact from '../common/contact/Contact';
import SignIn from '../signin/SignIn';
import SearchJobs from '../search/SearchJobs';
import JobView from '../job/JobView';
import JobCreate from "../job/JobCreate";

const Routes = () => (
	<div className='style'>
		<Switch>
			<Route exact path='/' component={Home} />
			<Route exact path='/about' component={About} />
			<Route exact path='/contact' component={Contact} />
			<Route exact path='/signin' component={SignIn} />
			<Route exact path='/searchjobs' component={SearchJobs} />
			<Route exact path='/showjob/:id' component={JobView} />
			<Route exact path='/createjob' component={JobCreate} />
			{/* <Route exact path='/signup' component={SignUp} />
			<Route exact path='/forgot' component={ForgotPassword} />
			<Route exact path='/loading' component={Loading} />

			<Route exact path='/signout' component={requireAuth(SignOut)} />
			<Route exact path='/home' component={ requireAuth(UserDashboard) } />
			<Route exact path='/profile' component={ requireAuth(UserProfile) } />
			<Route exact path='/module' component={ requireAuth(CreateModule) } />
			<Route exact path='/exam' component={ requireAuth(CreateExam) } />
			<Route exact path='/question' component={ requireAuth(CreateQuestion) } />
			<Route exact path='/showquestion/:id' component={ requireAuth(ShowQuestion) } />
			<Route exact path='/showmodule/:id' component={ requireAuth(ShowModule) } /> */}

			<Route path='*' component={ NotFound } />
		</Switch>
	</div>
);

export default Routes;
