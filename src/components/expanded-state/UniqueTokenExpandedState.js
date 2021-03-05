import React, { Fragment, useCallback, useMemo } from 'react';
import Link from '../Link';
import { ButtonPressAnimation } from '../animations';
import ShowcaseHeart from '../icons/svg/ShowcaseHeart';
import { Centered, Column, ColumnWithDividers } from '../layout';
import {
  SendActionButton,
  SheetActionButton,
  SheetActionButtonRow,
  SheetDivider,
  SlackSheet,
} from '../sheet';
import { Text } from '../text';
import { ShowcaseToast, ToastPositionContainer } from '../toasts';
import { UniqueTokenAttributes } from '../unique-token';
import ExpandedStateSection from './ExpandedStateSection';
import {
  UniqueTokenExpandedStateHeader,
  UniqueTokenExpandedStateImage,
} from './unique-token';
import isNativeStackAvailable from '@rainbow-me/helpers/isNativeStackAvailable';
import {
  useDimensions,
  useExpandedStateNavigation,
  useShowcaseTokens,
} from '@rainbow-me/hooks';
import Routes from '@rainbow-me/routes';
import { magicMemo } from '@rainbow-me/utils';
import WithdrawArrowIcon from "../icons/svg/WithdrawArrowIcon";
import WithdrawIcon from "../icons/svg/WithdrawIcon";

const UniqueTokenExpandedState = ({ asset }) => {
  const {
    asset_contract: {
      description: familyDescription,
      external_link: familyLink,
      name: familyName,
    },
    description,
    isSendable,
    traits,
    uniqueId,
  } = asset;

  const {
    addShowcaseToken,
    removeShowcaseToken,
    showcaseTokens,
  } = useShowcaseTokens();

  const isShowcaseAsset = useMemo(() => showcaseTokens.includes(uniqueId), [
    showcaseTokens,
    uniqueId,
  ]);

  const handlePressShowcase = useCallback(() => {
    if (isShowcaseAsset) {
      removeShowcaseToken(uniqueId);
    } else {
      addShowcaseToken(uniqueId);
    }
  }, [addShowcaseToken, isShowcaseAsset, removeShowcaseToken, uniqueId]);

  const { height: screenHeight } = useDimensions();
  const { colors, isDarkMode } = useTheme();

  const navigate = useExpandedStateNavigation();
  const handlePressSend = useCallback(
    () =>
      navigate(Routes.SEND_FLOW, params =>
        isNativeStackAvailable
          ? {
              params,
              screen: Routes.SEND_SHEET,
            }
          : { ...params }
      ),
    [navigate]
  );

  return (
    <Fragment>
      <SlackSheet
        bottomInset={42}
        {...(ios
          ? { height: '100%' }
          : { additionalTopPadding: true, contentHeight: screenHeight - 80 })}
        scrollEnabled
      >
        <UniqueTokenExpandedStateHeader asset={asset} />
        <UniqueTokenExpandedStateImage asset={asset} />
        <SheetActionButtonRow>
          <ButtonPressAnimation onPress={handlePressShowcase}>
            <Column align="center">
              <ShowcaseHeart selected={isShowcaseAsset} />
              <Text color={colors.heartPink} weight={900}>
                Showcase
              </Text>
            </Column>
          </ButtonPressAnimation>
          {isSendable && (
            <ButtonPressAnimation onPress={handlePressSend}>
              <Column align="center">
                <WithdrawIcon />
                <Text color={colors.coinburp} weight={900}>
                  Withdraw
                </Text>
              </Column>
            </ButtonPressAnimation>
          )}
        </SheetActionButtonRow>
        <SheetDivider />
        <ColumnWithDividers dividerRenderer={SheetDivider}>
          {!!description && (
            <ExpandedStateSection title="Bio">
              {description}
            </ExpandedStateSection>
          )}
          {!!traits.length && (
            <ExpandedStateSection paddingBottom={14} title="Attributes">
              <UniqueTokenAttributes {...asset} />
            </ExpandedStateSection>
          )}
          {!!familyDescription && (
            <ExpandedStateSection title={`About ${familyName}`}>
              <Column>
                <Text
                  color={colors.blueGrey}
                  lineHeight={24}
                  size={16}
                  weight="bold"
                >
                  {familyDescription}
                </Text>
                {familyLink && <Link url={familyLink} />}
              </Column>
            </ExpandedStateSection>
          )}
        </ColumnWithDividers>
      </SlackSheet>
      <ToastPositionContainer>
        <ShowcaseToast isShowcaseAsset={isShowcaseAsset} />
      </ToastPositionContainer>
    </Fragment>
  );
};

export default magicMemo(UniqueTokenExpandedState, 'asset');
