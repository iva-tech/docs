/*
 * SPDX-FileCopyrightText: 2025 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import { useNoteMarkdownContent } from '../../../../../../hooks/common/use-note-markdown-content'
import { useNoteFilename } from '../../../../../../hooks/common/use-note-filename'
import { download } from '../../../../../common/download/download'
import { SidebarButton } from '../../../sidebar-button/sidebar-button'
import React, { useCallback } from 'react'
import { FiletypeDocx as IconFileDocx } from 'react-bootstrap-icons'
import { Trans } from 'react-i18next'
import htmlDocx from 'html-docx-js/dist/html-docx'
import { useConfiguredMarkdownIt } from '../../../../../../markdown-renderer/markdown-to-react/hooks/use-configured-markdown-it'

export const ExportDocSidebarEntry: React.FC = () => {
  const markdownContent = useNoteMarkdownContent()
  const fileName = useNoteFilename().replace(/\.md$/, '.doc')
  const markdownIt = useConfiguredMarkdownIt([], true, true)
  const onClick = useCallback(() => {
    const html = markdownIt.render(markdownContent)
    const blob = htmlDocx.asBlob(html)
    download(blob, fileName, 'application/msword')
  }, [markdownContent, fileName, markdownIt])

  return (
    <SidebarButton onClick={onClick} icon={IconFileDocx}>
      <Trans i18nKey={'editor.export.doc'} />
    </SidebarButton>
  )
}
