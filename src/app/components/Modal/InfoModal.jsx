import React from 'react';
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

const InfoModal = ({ open, handleClose }) => (
  <Modal
    aria-labelledby="feedback"
    aria-describedby="feedback"
    open={open}
    onClose={handleClose}
    blurredNode={document.querySelector('#root')}
  >
    <TopBar>
      <Typography style={{ flexGrow: 1 }} element="h4">
        Kaart kan niet worden geladen
        <IconButton onClick={handleClose}>
          <Close />
        </IconButton>
      </Typography>
    </TopBar>
    <Divider />
    <ListItem>
      <Typography paragraph element="p">
        Er is momenteel een storing met de kaart. Hierdoor kunnen bepaalde vlakken van de kaart
        niet worden geladen. In het dataportaal verschijnt daardoor een rode
        foutmelding.<br /><br />
        We werken hard aan een oplossing. Als je wilt, kun je onze voortgang volgen.
      </Typography>
    </ListItem>
  </Modal>
);

InfoModal.propTypes = modalPropTypes;

export default withModalBehaviour(InfoModal);
