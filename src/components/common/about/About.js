import React, { Component } from 'react';
import Banner from '../Banner';

class About extends Component {
  render() {
    return (
      <div>
          <Banner banner="About Us" />
          <div className="container">
            <div className="col-md mx-auto content-about">            
            <div className="row-about row-about-height">
                <div>
                • We deliver quality training to make every student passionate
                about programming.
                </div>
            </div>
            <div className="row-about row-about-height">
                <div>
                • Our training methodologies are designed to keep every student
                ready with tomorrow-about’s dynamic challenges in technology.
                </div>
            </div>
            <div className="row-about row-about-height">
                <div>
                • We help you feel the difference between normal programming and
                conceptual programming.
                </div>
            </div>
            <div className="row-about row-about-height">
                <div>
                • To follow our passion, we need right skills at right time and
                our professional expert trainers help you to{" "}
                <code>
                    <b>LEARN WHAT YOU LOVE</b>
                </code>{" "}
                and{" "}
                <code>
                    <b>LOVE WHAT YOU LEARN</b>
                </code>
                .
                </div>
            </div>
            <div className="row-about row-about-height">
                <div>
                • We simulate real world IT software development situations which
                helps you to face them with an ease during your on-job role.
                </div>
            </div>
            <div className="row-about row-about-height">
                <div>
                • Passion is about create something, come join us to feel the
                passionate programming.
                </div>
            </div>
            </div>
        </div>
      </div>
    )
  }
}

export default About;