import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { searchJobs } from '../../store/actions/searchActions';
import { getStates, getSubjects, getQualifications } from '../../store/actions/commonActions';
import { jobTypes, resetDistrict, resetState, resetTown, resetSubject } from '../common/Constants';

class SearchJobs extends Component {	
    constructor() {
        super();        
		this.state = {
            search: {
                searchToken: '',
                subject:0,
                jobtype:0,
                stateLocation:0,
                district:0,
                town:0
            },
            loading: false
		}
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
		
    handleChange = (e) => {
		e.preventDefault();
        this.setState({ search: {...this.state.search, [e.target.name]: e.target.value} });		
	}

	handleStateChange = (e) => {
		e.preventDefault();
		this.setState({ search: {...this.state.search, [e.target.name]: e.target.value, district: 0, town: 0} });
    }
    
    handleDistrictChange = (e) => {
		e.preventDefault();
		this.setState({ search: {...this.state.search, [e.target.name]: e.target.value, town: 0} });
    }

	handleSubmit = (e) => {
		e.preventDefault();		
        this.props.searchJobs(this.state.search, {mode: 'cors'});
    }
    
    componentDidMount() {
		window.scrollTo(0, 0);
		if (this.props.user !== null) {
			if (this.props.locations.length === 0)
				this.props.getStates();		
			if (this.props.subjects.length === 0)
				this.props.getSubjects();
			if (this.props.qualifications.length === 0)
				this.props.getQualifications();	
		}
	}

    render() {	
        return (
            <Fragment>
                <form method='post' className='search-jobs-form'>
                    <div className='row mb-5'>
                        <div className='col-12 col-sm-6 col-md-4 col-lg-4 mb-4 mb-lg-0'>
                            <input type='text' id='searchToken' name='searchToken' className='form-control' placeholder='Job title, keywords...' onChange={this.handleChange}/>
                        </div>
                        <div className='col-12 col-sm-6 col-md-4 col-lg-4 mb-4 mb-lg-0'>
                            <select  className='form-control' id='subject' name='subject' value={this.state.search.subject} onChange={this.handleChange}>																	
                                {
                                    this.props.subjects.map((subjectName, key) => {
                                        let options = [<option key={ key + 1 } value={ subjectName.id }>{ subjectName.subject }</option>];
                                        if(key === 0)
                                            options.unshift(<option key={ key } value={ resetSubject.id }>{ resetSubject.subject }</option>);													
                                        return options;
                                    })
                                }
                            </select>
                        </div>
                        <div className='col-12 col-sm-6 col-md-4 col-lg-4 mb-4 mb-lg-0'>
                            <select placeholder='Select state...' className='form-control' id='jobtype' name='jobtype' value={this.state.search.jobtype} onChange={this.handleChange}>
                                {
                                    jobTypes.map((jobtype, key) => { 
                                        return <option key={ key }  value={ jobtype.id }>{ jobtype.name }</option>; 
                                    })
                                }
                            </select>
                        </div>                        
                    </div>
                    <div className='row mb-5'>
                        <div className='col-12 col-sm-6 col-md-4 col-lg-4 mb-4 mb-lg-0'>
                            <select  className='form-control' id='stateLocation' name='stateLocation' value={ this.state.search.stateLocation } onChange={ this.handleStateChange }>										
                                {
                                    this.props.locations.map((stateName, key) => {
                                        let options = [<option key={ key + 1 }  value={ stateName.id }>{ stateName.state }</option>];
                                        if(key === 0)
                                            options.unshift(<option key={ key } value={ resetState.id }>{ resetState.state }</option>);
                                        return options;
                                    })
                                }
                            </select>
                        </div>
                        <div className='col-12 col-sm-6 col-md-4 col-lg-4 mb-4 mb-lg-0'>
                            <select className='form-control' id='district' name='district' value={ this.state.search.district } onChange={ this.handleDistrictChange }>										
                                {											
                                    this.state.search.stateLocation > 0 && (this.props.locations.filter((stateObj) => parseInt(this.state.search.stateLocation) === parseInt(stateObj.id))).length > 0
                                    && this.props.locations.filter((stateObj) => parseInt(this.state.search.stateLocation) === parseInt(stateObj.id))[0].districts.map((district, key) => { 												
                                        let options = [<option key={ key + 1 } value={ district.id }>{ district.name }</option>];
                                        if(key === 0)
                                            options.unshift(<option key={ key } value={ resetDistrict.id }>{ resetDistrict.name }</option>);
                                        return options;
                                    })
                                }							
                            </select>
                        </div>
                        <div className='col-12 col-sm-6 col-md-4 col-lg-4 mb-4 mb-lg-0'>
                            <select className='form-control' id='town' name='town' value={ this.state.search.town } onChange={ this.handleChange }>										
                                {
                                    this.state.search.stateLocation > 0 
                                    && this.state.search.district > 0 
                                    && this.props.locations.filter((stateObj) => parseInt(this.state.search.stateLocation) === parseInt(stateObj.id)).length > 0
                                    && this.props.locations.filter((stateObj) => parseInt(this.state.search.stateLocation) === parseInt(stateObj.id))[0]
                                    .districts.filter((districtObj) => parseInt(this.state.search.district) === parseInt(districtObj.id)).length > 0 
                                    && this.props.locations.filter((stateObj) => parseInt(this.state.search.stateLocation) === parseInt(stateObj.id))[0]
                                    .districts.filter((districtObj) => parseInt(this.state.search.district) === parseInt(districtObj.id))[0]
                                    .towns.map((town, key) => {
                                        let options = [<option key={ key + 1 } value={ town.id }>{ town.town }</option>];
                                        if(key === 0)
                                            options.unshift(<option key={ key } value={ resetTown.id }>{ resetTown.town }</option>);
                                        return options;												
                                    })
                                }
                            </select>
                        </div>                        
                    </div>
                    <div className='row mb-5'>
                        <div align="center" className='col-12 col-sm-6 col-md-12 col-lg-12 mb-4 mb-lg-0'>
                            <button type='submit' className='btn btn-primary btn-block text-white btn-search col-lg-4 col-md-4' onClick={this.handleSubmit}><span className='icon-search icon mr-2'></span>Search Job</button>
                        </div>
                    </div>
                </form>
            </Fragment>
        )				
    }
}

const mapStateToProps = (state, props) => {
	return {
        user: state.user,
        job: state.job,
        search: state.search,
        locations: state.common.states,
		subjects: state.common.subjects,
		qualifications: state.common.qualifications			
	}
};

const mapDispatchToProps = (dispatch) => {
    return {
		searchJobs: (searchParams) => dispatch(searchJobs(searchParams)),
        getStates: () => dispatch(getStates()),
		getSubjects: () => dispatch(getSubjects()),
		getQualifications: () => dispatch(getQualifications())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchJobs);
