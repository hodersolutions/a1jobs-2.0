import React, { Component } from 'react';

class HomeCards extends Component {
  render() {
    return (
        <div className='container'>
          <div className='row'>
            <div className='col-lg-5'>
              <div className='card' >
                <img className='card-img-top' src='...' alt='Card image cap'/>
                <div className='card-body'>
                  <p className='card-text'>Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                </div>
              </div>
            </div>
            <div className='col-lg-5'>
              <div className='card'>
                <img className='card-img-top' src='...' alt='Card image cap'/>
                <div className='card-body'>
                  <p className='card-text'>Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                </div>
              </div>
            </div>
          </div>          
        </div>
    )
  }
}

export default HomeCards;