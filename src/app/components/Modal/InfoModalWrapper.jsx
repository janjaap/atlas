import React, { Component } from 'react';
import PropTypes from 'prop-types';
import InfoModal from './InfoModal';
import { createCookie, getCookie } from '../../utils/cookie';

const COOKIE_NAME = 'showInfoModal';

class InfoModalWrapper extends Component {
  static setCookie() {
    createCookie(COOKIE_NAME, '1');
  }

  constructor(props) {
    super(props);

    const openModal = (props.hide) ? false : !getCookie(COOKIE_NAME);

    this.state = {
      openModal
    };
  }

  render() {
    const { openModal } = this.state;
    return (
      <InfoModal id="infoModal" open={openModal} closeModalAction={InfoModalWrapper.setCookie} />
    );
  }
}

InfoModalWrapper.propTypes = {
  hide: PropTypes.bool.isRequired
};

export default InfoModalWrapper;
