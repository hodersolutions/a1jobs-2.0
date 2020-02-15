export const NotificationsTimeOut = 2000;

export const jobTypes = [
    {
        id: 0,
        name:'Select job type...',
        view: ''
    },
    {
        id: 1, 
        name:'Freelance',
        view:'Freelance'
    },
    {
        id: 2, 
        name:'Parttime',
        view:'Parttime'
    },
    {
        id: 3,
        name:'Fulltime',
        view:'Fulltime'
    }
]

export const gender = [
    {
        id: 0, 
        name:'Select gender...',
        view:''
    },
    {
        id: 1,
        name:'Female',
        view:'Female'
    },
    {
        id: 2,
        name:'Male',
        view:'Male'
    },
    {
        id: 3,
        name:'Not relevant',
        view:'Not relevant'
    }
]

export const department = [
    {
        id: 0,
        name:'Select department...',
        view:''
    },
    {
        id: 1,
        name:'Academics',
        view:'Academics'
    },
    {
        id: 2,
        name:'Admin',
        view:'Admin'
    }
]

export const teachingmedium = [
    {
        id: 0,
        name:'Select teaching medium...',
        view:''
    },
    {
        id: 1,
        name:'English',
        view:'English'
    },
    {
        id: 2,
        name:'Telugu',
        view:'Telugu'
    },
    {
        id: 3,
        name:'Hindi',
        view:'Hindi'
    }
]

export const segment = [
    {
        id: 0,
        name:'Select segment...',
        view:''
    },
    {
        id: 1,
        name:'Pre-Primary',
        view:'Pre-Primary'
    },
    {
        id: 2,
        name:'Primary',
        view:'Primary'
    },
    {
        id: 3,
        name:'Secondary',
        view:'Secondary'
    },
    {
        id: 4,
        name:'Sr.Secondary',
        view:'Sr.Secondary'
    }
]

export const circulum = [
    {
        id: 0,
        name:'Select circulum...',
        view:''
    },
    {
        id: 1,
        name:'CBSE',
        view:'CBSE'
    },
    {
        id: 2,
        name:'ICSE',
        view:'ICSE'
    },
    {
        id: 3,
        name:'SSC',
        view:'SSC'
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
    salary: '', 
    requisitiondetails: '',
    telephone: '',
    minexperience: '',
    maxexperience: '',
    responsibilities: '',    
    benefits: '',
    eduexpdetails: '',
    vacancy: '',
    gender: 0,
    submitter: 0,    
    deadline: new Date().toLocaleDateString('en-IN'),
    qualification: 0
}

export const resetProfile = {
    userid: null,
    firstname: '',
    middlename: '',
    lastname: '',
    fathername: '',
    gender: 0,    
    nationality: '',
    ctc: '',
    ectc: '',
    qualification: 0,
    stateLocation: 0,
    district: 0,
    town: 0,
    totalexperience: '',
    circulum: 0,
    currentorganization: '',
    department: 0,
    teachingsubject: 0,
    teachingmedium: 0,
    segment: 0,
    address:'',
    dob: new Date().toLocaleDateString('en-IN'),
    pan: '',
    designation: ''
}

export const resetSearch = {
    searchToken: '', 
    jobtype: 0, 
    stateLocation: 0,
    district: 0,
    town: 0,
    subject: 0    
}
