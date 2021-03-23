import analytics from '@segment/analytics-react-native';
import React, { Fragment, useEffect } from 'react';
import styled from 'styled-components';
import { useTheme } from '../../context/ThemeContext';
import { ButtonPressAnimation } from '../animations';
import { BackButton } from '../header';
import { Icon } from '../icons';
import { Column, ColumnWithMargins, Row } from '../layout';
import { SheetActionButton } from '../sheet';
import { GradientText, Text } from '../text';
import { padding } from '@rainbow-me/styles';
import { deviceUtils } from '@rainbow-me/utils';

const Footer = styled(ColumnWithMargins).attrs({
  margin: 19,
})`
  width: 100%;
`;

const Masthead = styled(Column).attrs({
  align: 'center',
  justify: 'start',
})`
  flex: 1;
  padding-top: 8px;
`;

const MastheadDescription = styled(Text).attrs({
  align: 'center',
  size: 16,
  weight: 'bold',
})`
  ${padding(12, 42, 30)};
`;

export default function BackupSheetSection({
  descriptionText,
  onPrimaryAction,
  onSecondaryAction,
  primaryButtonTestId,
  primaryLabel,
  secondaryButtonTestId,
  secondaryLabel,
  titleText,
  type,
}) {
  const { colors } = useTheme();
  useEffect(() => {
    analytics.track('BackupSheet shown', {
      category: 'backup',
      label: type,
    });
  }, [type]);

  const maxButtonWidth = deviceUtils.dimensions.width - 30;

  return (
    <Fragment>
      <Masthead>
        <Row align="start" width="100%">
          <BackButton />
        </Row>
        <Icon
          color={colors.gold}
          height={68}
          marginBottom={32}
          name="warning"
          width={70}
        />
        <Text align="center" color={colors.dark} size={24} weight={900}>
          {titleText}
        </Text>
        <MastheadDescription>{descriptionText}</MastheadDescription>
      </Masthead>
      <Footer align="center">
        <ButtonPressAnimation
          onPress={onPrimaryAction}
          scaleTo={0.9}
          testID={primaryButtonTestId}
        >
          <Row align="center">
            <Icon marginRight={12} name="pinkCloud" />
            <GradientText
              angle={360}
              colors={['#fa71cd', '#c471f5']}
              size={20}
              steps={[0, 0.9]}
              weight={900}
            >
              {primaryLabel}
            </GradientText>
          </Row>
        </ButtonPressAnimation>
        <SheetActionButton
          androidWidth={maxButtonWidth}
          color={colors.white}
          label={secondaryLabel}
          onPress={onSecondaryAction}
          size={20}
          testID={secondaryButtonTestId}
          textColor={colors.coinburp}
          weight={900}
        />
      </Footer>
    </Fragment>
  );
}
