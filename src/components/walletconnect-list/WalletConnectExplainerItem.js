import React from 'react';
import { View } from 'react-native';
import { Icon } from '../icons';
import { Column, FlexItem } from '../layout';
import { Emoji, Text, TruncatedText } from '../text';

export default function WalletConnectExplainerItem({
  children,
  content,
  emoji,
  title,
  isWithdraw,
}) {
  const { colors } = useTheme();
  return (
    <Column align="center" width="50%">
      <Column align="center" flex={1}>
        <View style={{ marginBottom: 12 }}>
          {isWithdraw ? (
            <Icon name="withdrawIcon" />
          ) : (
            <Icon name="connectWave" />
          )}
        </View>
        <TruncatedText
          color={colors.white}
          lineHeight="normal"
          size="bmedium"
          weight={900}
        >
          {title}
        </TruncatedText>
        <Text
          color={colors.alpha(colors.white, 1)}
          lineHeight="loose"
          numberOfLines={5}
          size="smedium"
          style={{ 
            marginTop: 6, 
            maxWidth: '55%', 
            textAlign: 'center',
          }}
          weight="bold"
        >
          {content}
        </Text>
        {children && (
          <FlexItem marginTop={ios ? 28 : 0}>{children}</FlexItem>
        )}
      </Column>
    </Column>
  );
}
