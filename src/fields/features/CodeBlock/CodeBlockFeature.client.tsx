'use client'

import { 
  $createCodeNode, 
  $isCodeNode,
  CodeNode, 
  CodeHighlightNode,
  registerCodeHighlighting,
  getDefaultCodeLanguage,
  getCodeLanguages,
  CODE_LANGUAGE_FRIENDLY_NAME_MAP
} from '@lexical/code';
import { 
  $getSelection, 
  $isRangeSelection,
  $createParagraphNode,
  COMMAND_PRIORITY_LOW
} from 'lexical';
import { slashMenuBasicGroupWithItems } from '@payloadcms/richtext-lexical/client';
import { INSERT_PARAGRAPH_COMMAND } from 'lexical';
import { useLexicalComposerContext } from "@payloadcms/richtext-lexical/lexical/react/LexicalComposerContext";
import { useEffect } from "react";

const CodeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <polyline points="16 18 22 12 16 6"></polyline>
    <polyline points="8 6 2 12 8 18"></polyline>
  </svg>
);

export const CodeBlockFeatureClient = (props) => ({
  clientFeatureProps: props,
  feature: () => {
    return {
      nodes: [CodeNode, CodeHighlightNode],
      
      plugins: [
        {
          Component: () => {
            const [editor] = useLexicalComposerContext();
            
            useEffect(() => {
              return registerCodeHighlighting(editor);
            }, [editor]);
            
            return null;
          },
          position: 'normal',
        }
      ],
      
      slashMenu: {
        groups: [
          slashMenuBasicGroupWithItems([
            {
              Icon: CodeIcon,
              key: 'codeblock',
              keywords: ['code', 'codeblock', 'snippet', 'programming', 'javascript', 'python'],
              label: 'Code Block',
              onSelect: ({ editor }) => {
                editor.update(() => {
                  const selection = $getSelection();
                  
                  if ($isRangeSelection(selection)) {
                    const defaultCodeLanguage = 'html';
                    const codeNode = $createCodeNode(defaultCodeLanguage);
                    selection.insertNodes([codeNode]);
                    codeNode.selectStart();
                  }
                });
              },
            },
          ]),
        ],
      },

      props: {
        availableLanguages: getCodeLanguages(),
        languageMap: CODE_LANGUAGE_FRIENDLY_NAME_MAP,
      },
    };
  },
});