export const resetDistrict =  {
    id: 0,
    name: "",
    towns: [],
    institutions: []
}

export const resetState = {
    id: 0, 
    state: "", 
    districts: []
}

export const resetTown = {
    id: 0, 
    town: ""    
}

export const resetSubject = {
    id: 0, 
    subject: ""    
}

export const jobTypes = [
    {
        id: 0, name:''
    },
    {
        id: 1, name:'Freelance'
    },
    {
        id: 2, name:'Parttime'
    },
    {
        id: 3, name:'Fulltime'
    }
]

export const gender = [
    {
        id: 0, name:''
    },
    {
        id: 1, name:'Female'
    },
    {
        id: 2, name:'Male'
    },
    {
        id: 3, name:'Not relevant'
    }
]

export const resetJob = {
    title: '', 
    jobtype: '', 
    stateLocation: 0,
    district: 0,
    town: 0,
    institution: '',  
    subject: '',
    salary: '', 
    requisitiondetails: '',
    telephone: '',
    minexperience: '',
    maxexperience: '',
    responsibilities: '',
    experience: '',
    benefits: '',
    eduexpdetails: '',
    vacancy: '',
    gender: '',
    deadline: new Date()
}