import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import FeedbackModal from './FeedbackModal';
import {
  closeModalAction,
  reportFeedbackAction,
  reportProblemAction
} from '../../../header/ducks/actions';

const mapDispatchToProps = (dispatch) => bindActionCreators({
  closeModalAction,
  reportFeedbackAction,
  reportProblemAction
}, dispatch);

export default connect(null, mapDispatchToProps)(FeedbackModal);
