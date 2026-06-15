
import React from 'react';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import CodeBlock from '@theme/CodeBlock';

interface FrameworkTabsProps {
  react: string;
  vue: string;
  angular: string;
  html?: string;
}

export default function FrameworkTabs({
  react,
  vue,
  angular,
  html,
}: FrameworkTabsProps) {
  return (
    <Tabs defaultValue="react">
      <TabItem value="react" label="React">
        <CodeBlock language="tsx">{react}</CodeBlock>
      </TabItem>

      <TabItem value="vue" label="Vue">
        <CodeBlock language="vue">{vue}</CodeBlock>
      </TabItem>

      <TabItem value="angular" label="Angular">
        <CodeBlock language="ts">{angular}</CodeBlock>
      </TabItem>

      {html && (
        <TabItem value="html" label="Vanilla">
          <CodeBlock language="html">{html}</CodeBlock>
        </TabItem>
      )}
    </Tabs>
  );
}