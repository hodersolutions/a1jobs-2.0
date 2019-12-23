import React, { Component } from 'react';

export default class Contact extends Component {
  render() {
    return (
        <div>
            <div className="site-section" id="next-section">
                <div className="container">
                    <div className="row">
                    <div className="col-lg-6 mb-5 mb-lg-0">
                        <form action="#" className="">                
                            <div className="row form-group">
                                <div className="col-md-6 mb-3 mb-md-0">
                                    <label className="text-black" htmlFor="fname">First Name</label>
                                    <input type="text" id="fname" className="form-control" />
                                </div>
                                <div className="col-md-6">
                                    <label className="text-black" htmlFor="lname">Last Name</label>
                                    <input type="text" id="lname" className="form-control" />
                                </div>
                            </div>
                    
                            <div className="row form-group">
                                <div className="col-md-12">
                                    <label className="text-black" htmlFor="email">Email</label>
                                    <input type="email" id="email" className="form-control" />
                                </div>
                            </div>
                    
                            <div className="row form-group">                    
                                <div className="col-md-12">
                                    <label className="text-black" htmlFor="subject">Subject</label>
                                    <input type="subject" id="subject" className="form-control" />
                                </div>
                            </div>
                    
                            <div className="row form-group">
                                <div className="col-md-12">
                                    <label className="text-black" htmlFor="message">Message</label>
                                    <textarea name="message" id="message" cols="30" rows="7" className="form-control"
                                        placeholder="Write your notes or questions here..."></textarea>
                                </div>
                            </div>
                    
                            <div className="row form-group">
                                <div className="col-md-12">
                                    <input type="submit" value="Send Message" className="btn btn-primary btn-md text-white" />
                                </div>
                            </div>                
                        </form>
                    </div>
                    <div className="col-lg-5 ml-auto">
                        <div className="p-4 mb-3 bg-white">
                        <p className="mb-0 font-weight-bold">Address</p>
                        <p className="mb-4">203 Fake St. Mountain View, San Francisco, California, USA</p>
                
                        <p className="mb-0 font-weight-bold">Phone</p>
                        <p className="mb-4">+91-9999999999</p>
                
                        <p className="mb-0 font-weight-bold">Email Address</p>
                        <p className="mb-0">youremail@domain.com</p>
                
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    )
  }
}
