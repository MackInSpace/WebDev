import { Component } from 'react';
import HeartLogo from '../assets/heart.svg';

class Heart extends Component {
  render() {
    return (
        <div className='heart'>
          <img className='heart-img' src={HeartLogo} alt='heart'/>
          <p className='heart-message'>{this.props.msg}</p>
        </div>
    );
  }
};

export default Heart;