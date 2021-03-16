import PropTypes from 'prop-types';
import React from 'react';
import { Row } from '../layout';
import Text from './Text';

const DollarFigure = ({ value, decimals = 2 }) => {
  const [dollars, cents = '00'] = value.split('.');
  const formattedCents = cents.substr(0, decimals);
  const { colors } = useTheme();
  return (
    <Row paddingTop={36}>
      <Text color={colors.dark} letterSpacing="zero" size={48} weight={900}>
        {`${dollars}.${formattedCents}`}
      </Text>
    </Row>
  );
};

DollarFigure.propTypes = {
  decimals: PropTypes.number,
  value: PropTypes.string,
};

export default React.memo(DollarFigure);
