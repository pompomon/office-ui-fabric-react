import { Avatar, Card, Flex, Text } from '@fluentui/react';
import * as React from 'react';

const SimpleCard = () => (
  <Card>
    <Card.Header fitted>
      <Flex gap="gap.small">
        <Flex.Item>
          <Avatar image="public/images/avatar/small/matt.jpg" label="Copy bandwidth" name="Evie yundt" status="unknown" />
        </Flex.Item>
        <Flex.Item>
          <Flex column>
            <Text content="Title goes here" weight="bold" />
            <Text content="Secondary line" size="small" />
          </Flex>
        </Flex.Item>
      </Flex>
    </Card.Header>
  </Card>
);
export default SimpleCard;
