import React, {Component} from 'react';
import ProfileCard from './ProfileCard';

class ProfileList extends Component {
    render() {
        return (
            <div className='container'>
                {
                    this.props.list.map((profileObj, index) => {                    
                        return (                            
                            <ProfileCard profile={ profileObj } key={ index }/>                            
                        );
                    })
                }
            </div>
        );        
    }
}

export default ProfileList;