import React from 'react';

import './Login.css';

import MR_DOWN_PIC from '../images/mr_down.png';

const LogIn = () => (
  <div className='Login'>
    <div className='Login__Left__Container'>
      <h1>Meetdown</h1>
      <h2>Because Time Matters</h2>
      <img className='Login__image' src={MR_DOWN_PIC} alt='mr down' />
    </div>

    <div className='Login__Right__Container'>
      <div className='Login__Right__Intro'>
        <h3 className='Login__Right__Title'>
          With Great Power Comes Great Responsibility
        </h3>
      </div>
      <button className='Login__Right__Button'>LOGIN</button>
    </div>
  </div>
);

export default LogIn;
