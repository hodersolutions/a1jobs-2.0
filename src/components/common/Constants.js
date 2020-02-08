export const resetDistrict =  {
    id: 0,
    name: 'Select district...',
    towns: [],
    institutions: []
}

export const resetState = {
    id: 0, 
    state: 'Select state...', 
    districts: []
}

export const resetTown = {
    id: 0, 
    town: 'Select town...'
}

export const resetSubject = {
    id: 0, 
    subject: 'Select subject...'
}

export const resetQualification = {
    id: 0, 
    qualification: 'Select qualification...'
}

export const jobTypes = [
    {
        id: 0, name:'Select job type...'
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

export const department = [
    {
        id: 0, name:''
    },
    {
        id: 1, name:'Academics'
    },
    {
        id: 2, name:'Admin'
    }
]

export const teachingmedium = [
    {
        id: 0, name:''
    },
    {
        id: 1, name:'English'
    },
    {
        id: 2, name:'Telugu'
    },
    {
        id: 3, name:'Hindi'
    }
]

export const segment = [
    {
        id: 0, name:''
    },
    {
        id: 1, name:'Pre-Primary'
    },
    {
        id: 2, name:'Primary'
    },
    {
        id: 3, name:'Secondary'
    },
    {
        id: 4, name:'Sr.Secondary'
    }
]

export const circulum = [
    {
        id: 0, name:''
    },
    {
        id: 1, name:'CBSE'
    },
    {
        id: 2, name:'ICSE'
    },
    {
        id: 3, name:'SSC'
    }
]

export const resetJob = {
    title: '', 
    jobtype: 0, 
    stateLocation: 0,
    district: 0,
    town: 0,
    institution: '',
    subject: 0,
    salary: 0, 
    requisitiondetails: '',
    telephone: 0,
    minexperience: 0,
    maxexperience: 0,
    responsibilities: '',
    experience: 0,
    benefits: '',
    eduexpdetails: '',
    vacancy: 0,
    gender: 0,
    submitter: 0,
    deadline: new Date(),
    qualification: 0
}

export const resetSearch = {
    searchToken: '', 
    jobtype: 0, 
    stateLocation: 0,
    district: 0,
    town: 0,
    subject: 0    
}