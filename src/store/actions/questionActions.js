import axios from 'axios';
import settings from '../../settings';
import {CREATE_QUESTION_SUCCESS, 
        CREATE_QUESTION_ERROR, 
        GET_QUESTIONS_SUCCESS, 
        GET_QUESTIONS_ERROR,
        GET_QUESTION_ERROR,
        GET_QUESTION_SUCCESS, 
        QUESTION_SHOW_LOADING } from '../types/questionTypes';

export const createQuestion = (question) => {    
    return (dispatch, getState) => {
        dispatch({ type: QUESTION_SHOW_LOADING });
        axios.post(settings.QUESTIONBANKAPI.url + 'api/v1/questions', {
            headers: {
                'Content-Type': 'application/form'                
            },
            mode: 'cors',
            question: question.question,
            module_id: question.module_id,
            question_type: question.question_type,
            creator_id: question.creator_id,
            options: question.options
        }
        ).then( function(response) {
            dispatch({ type: CREATE_QUESTION_SUCCESS, response });
        }).catch(error => {			
            dispatch({ type: CREATE_QUESTION_ERROR, error });
        });        
    }
}

export const getQuestions = (params) => {
    return (dispatch, getState) => {
        dispatch({ type: QUESTION_SHOW_LOADING });
        var full_uri = settings.QUESTIONBANKAPI.url + 'api/v1/questions'; 
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
            dispatch({ type: GET_QUESTIONS_SUCCESS, response: response.data });
		}).catch(error => {			
            dispatch({ type: GET_QUESTIONS_ERROR, error });
        });         
    }
}

export const getQuestion = (params) => {
    return (dispatch, getState) => {
        dispatch({ type: QUESTION_SHOW_LOADING });
        axios.get(settings.QUESTIONBANKAPI.url + 'api/v1/questions?id=' + params.id, {
            headers: {
                'Content-Type': 'application/json'
            },
            mode: 'cors'    
        }).then( response => {            
            dispatch({ type: GET_QUESTION_SUCCESS, question: response.data.question });            
        }).catch(error => {			
            dispatch({ type: GET_QUESTION_ERROR, error });
        });
    }
}