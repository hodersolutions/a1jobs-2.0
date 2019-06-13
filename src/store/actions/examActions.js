import axios from 'axios';
import settings from '../../settings';
import {CREATE_EXAM_SUCCESS, 
        CREATE_EXAM_ERROR, 
        GET_EXAMS_SUCCESS, 
        GET_EXAMS_ERROR,
        GET_EXAM_ERROR,
        GET_EXAM_SUCCESS, 
        EXAM_SHOW_LOADING } from '../types/examTypes';

export const createExam = (exam) => {    
    return (dispatch, getState) => {
        dispatch({ type: EXAM_SHOW_LOADING });
        axios.post(settings.QUESTIONBANKAPI.url + 'api/v1/exams', {
                headers: {
                    'Content-Type': 'application/json',
                    'token': localStorage.getItem('token'),
                    'username': localStorage.getItem('username')
                },
                mode: 'cors',
                exam: exam.exam,
                parent_exam_id: (exam.parent_exam_id === '')? null : exam.parent_exam_id,
                is_active: true,
                description: exam.description,
                creator_id: exam.creator_id
            }
        ).then( function(response) {
            dispatch({ type: CREATE_EXAM_SUCCESS, response });
        }).catch(error => {			
            dispatch({ type: CREATE_EXAM_ERROR, error });
        });        
    }
}

export const getExams = (params) => {
    return (dispatch, getState) => {
        dispatch({ type: EXAM_SHOW_LOADING });
        var full_uri = settings.QUESTIONBANKAPI.url + 'api/v1/exams'; 
		if (params.creator_id === '')
			full_uri = full_uri + '/latest/' + params.count
		else
			full_uri = full_uri + '/creator/' + params.creator_id +'/latest/' + params.count

		axios.get(full_uri, {
				headers: {
					'Content-Type': 'application/json'
				},
				mode: 'cors'    
		}).then( response => {											            
            dispatch({ type: GET_EXAMS_SUCCESS, response: response.data });
		}).catch(error => {			
            dispatch({ type: GET_EXAMS_ERROR, error });
        });         
    }
}

export const getExam = (params) => {
    return (dispatch, getState) => {
        dispatch({ type: EXAM_SHOW_LOADING });
        axios.get(settings.QUESTIONBANKAPI.url + 'api/v1/exams?id=' + params.id, {
            headers: {
                'Content-Type': 'application/json'
            },
            mode: 'cors'    
        }).then( response => {            
            dispatch({ type: GET_EXAM_SUCCESS, exam: response.data.exam });            
        }).catch(error => {			
            dispatch({ type: GET_EXAM_ERROR, error });
        });
    }
}