import { CodeHighlightNode, CodeNode } from '@lexical/code';
import type { FeatureProviderServer } from '@payloadcms/richtext-lexical';

export const CodeBlockFeature = (): FeatureProviderServer<any, any, any> => {
  return {
    key: 'codeblock',
    feature: () => ({
      ClientFeature: '@/fields/features/CodeBlock/CodeBlockFeature.client#CodeBlockFeatureClient',
      nodes: [
        { node: CodeNode, type: CodeNode.getType() },
        { node: CodeHighlightNode, type: CodeHighlightNode.getType() },
      ],
      props: null,
    }),
    serverFeatureProps: undefined,
  };
};
