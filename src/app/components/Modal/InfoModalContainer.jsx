import { connect } from 'react-redux';
import InfoModalWrapper from './InfoModalWrapper';
import { isEmbedded } from '../../../shared/ducks/ui/ui';

const mapStateToProps = (state) => ({
  hide: isEmbedded(state)
});

export default connect(mapStateToProps, null)(InfoModalWrapper);
