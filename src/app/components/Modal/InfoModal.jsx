import React from 'react';
import PropTypes from 'prop-types';
import {
  Divider,
  IconButton,
  ListItem,
  Modal,
  TopBar,
  Typography
} from '@datapunt/asc-ui/lib/index';
import { ReactComponent as Close } from '@datapunt/asc-assets/lib/Icons/Close.svg';
import withModalBehaviour, { propTypes as modalPropTypes } from './withModalBehaviour';
import './InfoModal.scss';

const InfoModal = ({ open, handleClose, title, body }) => (
  <Modal
    aria-labelledby="feedback"
    aria-describedby="feedback"
    open={open}
    onClose={handleClose}
    blurredNode={document.querySelector('#root')}
  >
    <TopBar>
      <Typography style={{ flexGrow: 1 }} element="h4">
        {title}
        <IconButton onClick={handleClose}>
          <Close />
        </IconButton>
      </Typography>
    </TopBar>
    <Divider />
    <ListItem>
      <Typography
        paragraph
        element="p"
        className="infomodal__body"
        dangerouslySetInnerHTML={({ __html: body })}
      />
    </ListItem>
  </Modal>
);

InfoModal.propTypes = {
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  ...modalPropTypes
};

export default withModalBehaviour(InfoModal);
