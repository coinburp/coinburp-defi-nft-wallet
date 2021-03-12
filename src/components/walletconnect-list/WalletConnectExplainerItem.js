import React from 'react';
import { View } from 'react-native';
import { Column, FlexItem, Row } from '../layout';
import { Emoji, Text, TruncatedText } from '../text';
import { padding, fonts } from '@rainbow-me/styles';

import { Icon } from '../icons';
export default function WalletConnectExplainerItem({
  children,
  content,
  emoji,
  title,
  isWithdraw
}) {
  const { colors } = useTheme();
  return (
    <Column align="center" css={padding(0, 18, 0, 0)}>
      <Emoji size="bmedium">{emoji}</Emoji>
      <Column align="center" flex={1} paddingLeft={8}>
        <FlexItem
          grow={isWithdraw ? 0 : 1}
        >
          <View style={{ marginLeft: 10, marginBottom: 30}}>
            { isWithdraw ? <Icon name="withdrawIcon" /> : <Icon name="connectWave" /> }
          </View>
          <TruncatedText
            color={colors.white}
            lineHeight="normal"
            size="bmedium"
            weight="semibold"
            style={{
              fontWeight: '900',
            }}
            weight='900'
          >
            {title}
          </TruncatedText>
        </FlexItem>
        <FlexItem
          marginTop={10}
        >
          <Text
            color={colors.alpha(colors.white, 1)}
            lineHeight="loose"
            size="smedium"
            numberOfLines={5}
            style={{
              maxWidth: '50%',
              minWidth:150,
              flex: 0.5,
              textAlign: 'center',
              flexWrap: 'wrap',
              fontWeight: 'bold',
            }}
            weight='bold'
          >
            {content}
          </Text>
        </FlexItem>
        {children && <FlexItem marginTop={-30}>{children}</FlexItem>}
      </Column>
    </Column>
  );
}
