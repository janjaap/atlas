import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash.get';
import InfoModal from './InfoModal';
import { createCookie, getCookie } from '../../utils/cookie';
import getContents from '../../../shared/services/google-sheet/google-sheet';

const COOKIE_NAME = 'showInfoModal';

const InfoModalWrapper = ({ hide }) => {
  const [open, toggle] = React.useState(false);
  const [{ title, body }, setContent] = React.useState({
    body: '',
    title: ''
  });

  React.useEffect(() => {
    if (!hide && !getCookie(COOKIE_NAME)) {
      (async () => {
        const item = 'item0';
        const type = 'melding';
        try {
          const contents = await getContents(type);
          const entry = contents.entries.find((result) => result.id === item);
          setContent({
            title: get(entry, 'titel.value', ''),
            body: get(entry, 'content.html', '')
          });
        } catch (e) {
          // eslint-disable-next-line no-console
          console.warn(e);
        }
      })();
    }
  }, []);

  React.useEffect(() => {
    toggle(!!(body.length && title.length));
  }, [body, title]);


  return (
    <InfoModal
      id="infoModal"
      {...{ open, title, body }}
      closeModalAction={() => createCookie(COOKIE_NAME, '1')}
    />
  );
};

InfoModalWrapper.propTypes = {
  hide: PropTypes.bool.isRequired
};

export default InfoModalWrapper;
