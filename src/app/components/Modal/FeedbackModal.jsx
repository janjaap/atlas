import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Divider,
  IconButton,
  ListItem,
  Modal,
  TopBar,
  Typography
} from '@datapunt/asc-ui/lib/index';
import { ReactComponent as Close } from '@datapunt/asc-assets/lib/Icons/Close.svg';
import { routing } from '../../routes';
import withModalBehaviour, { propTypes as modalPropTypes } from './withModalBehaviour';

const FEEDBACK_RECIPIENT = 'terugmelding.basisinformatie@amsterdam.nl';
const FEEDBACK_SUBJECT = 'Terugmelding data.amsterdam.nl';
const FEEDBACK_BODY = (location) => `Terugmeldingen voor de pagina: ${location}\n
  Beschrijf zo volledig mogelijk van welk onjuist gegeven je een melding wilt maken:
  - Welk gegeven is kennelijk onjuist of ontbreekt?
  - Weet je wat het wel zou moeten zijn?
  - Waarop is jouw constatering gebaseerd? Omschrijf de reden en voeg indien mogelijk relevante
  documenten in de bijlage toe (bijvoorbeeld: een bouwtekening, koopakte, et cetera).
  `;

const PROBLEM_RECIPIENT = 'datapunt@amsterdam.nl';
const PROBLEM_SUBJECT = 'Probleem melden of suggestie voor data.amsterdam.nl';
const PROBLEM_BODY = (location) => `Probleem melden voor de pagina: ${location}\n
  Beschrijf zo volledig mogelijk waar je tegenaan loopt:
  - Om welk onderdeel van de pagina gaat het?
  - Wat zie je op het scherm als je een probleem ondervindt?
  - Heb je een suggestie hoe het anders zou kunnen?
  `;

const getMailtoLink = (recipient, subject, body) => `mailto:${recipient}
?subject=${window.encodeURIComponent(subject)}
&body=${window.encodeURIComponent(body)}`;

const FeedbackModalComponent = ({
  open,
  handleClose,
  reportFeedbackAction,
  reportProblemAction
}) => (
  <Modal
    aria-labelledby="feedback"
    aria-describedby="feedback"
    open={open}
    onClose={handleClose}
    blurredNode={document.querySelector('#root')}
  >
    <TopBar>
      <Typography style={{ flexGrow: 1 }} element="h4">
        Feedback
        <IconButton onClick={handleClose}>
          <Close />
        </IconButton>
      </Typography>
    </TopBar>
    <Divider />
    <ListItem>
      <Typography gutterBottom element="h5">
        Onjuiste of ontbrekende gegevens?
      </Typography>
      <Typography paragraph element="p" gutterBottom>
        Geef aan welke gegevens onjuist zijn of ontbreken. Ook als je weet wat het wel moet
        zijn. We horen het graag.
      </Typography>
      <Button
        as="a"
        color="primary"
        onClick={reportFeedbackAction}
        href={getMailtoLink(
          FEEDBACK_RECIPIENT,
          FEEDBACK_SUBJECT,
          FEEDBACK_BODY(window.location.href)
        )}
      >
        Terugmelden
      </Button>
    </ListItem>
    <Divider gutter />
    <ListItem>
      <Typography gutterBottom element="h5">
        Vraag of een klacht?
      </Typography>
      <Typography paragraph element="p" gutterBottom>
        Als iets op deze pagina niet goed werkt, onduidelijk is of vragen oproept, geef het
        aan
        ons door.
      </Typography>
      <Button
        as="a"
        color="primary"
        onClick={reportProblemAction}
        href={getMailtoLink(
          PROBLEM_RECIPIENT,
          PROBLEM_SUBJECT,
          PROBLEM_BODY(window.location.href)
        )}
      >
        Probleem melden
      </Button>
    </ListItem>
    <Divider transparent />
    <ListItem>
      <Typography element="a" href={routing.help.path}>
        Hulp nodig?
      </Typography>
    </ListItem>
  </Modal>
);

FeedbackModalComponent.propTypes = {
  reportFeedbackAction: PropTypes.func.isRequired,
  reportProblemAction: PropTypes.func.isRequired,
  ...modalPropTypes
};

export default withModalBehaviour(FeedbackModalComponent);
