/*
 * SPDX-FileCopyrightText: 2022 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import type { ContentFormatter } from '../../../change-content-context/use-change-editor-content-callback'
import { FormatterToolbarButton } from '../formatter-toolbar-button'
import { changeCursorsToWholeLineIfNoToCursor } from '../formatters/utils/change-cursors-to-whole-line-if-no-to-cursor'
import { wrapSelection } from '../formatters/wrap-selection'
import React, { useCallback } from 'react'
import { CodeBracketIcon as IconCode } from '@heroicons/react/24/outline'

/**
 * Renders a button to create a code fence in the {@link Editor editor}.
 */
export const CodeFenceButton: React.FC = () => {
  const formatter: ContentFormatter = useCallback(({ currentSelection, markdownContent }) => {
    return wrapSelection(changeCursorsToWholeLineIfNoToCursor(markdownContent, currentSelection), '```\n', '\n```')
  }, [])
  return <FormatterToolbarButton i18nKey={'code'} icon={IconCode} formatter={formatter} />
}
