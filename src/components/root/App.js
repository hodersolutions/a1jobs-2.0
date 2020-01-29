import React, { Component } from 'react';
import Header from '../layout/header/Header';
import Footer from '../layout/footer/Footer';
import Routes from '../routes/Routes';
import Notifications from 'react-notify-toast';

class App extends Component {
  render() {
    const options = {
			zIndex: 200, top: '50px'
		}
    return (
        <div className='App'>
          <Header />
          <Routes />
          <Footer />
          <Notifications options={{ options }}/>
        </div>
    );
  }
}

export default App;
