/*
 * SPDX-FileCopyrightText: 2025 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import { useNoteMarkdownContent } from '../../../../../../hooks/common/use-note-markdown-content'
import { useNoteFilename } from '../../../../../../hooks/common/use-note-filename'
import { SidebarButton } from '../../../sidebar-button/sidebar-button'
import React, { useCallback } from 'react'
import { FilePdf as IconFilePdf } from 'react-bootstrap-icons'
import { Trans } from 'react-i18next'
import { useConfiguredMarkdownIt } from '../../../../../../markdown-renderer/markdown-to-react/hooks/use-configured-markdown-it'
import { jsPDF } from 'jspdf'

export const ExportPdfSidebarEntry: React.FC = () => {
  const markdownContent = useNoteMarkdownContent()
  const fileName = useNoteFilename().replace(/\.md$/, '.pdf')
  const markdownIt = useConfiguredMarkdownIt([], true, true)
  const onClick = useCallback(() => {
    const html = markdownIt.render(markdownContent)
    const doc = new jsPDF()
    doc.text(html, 10, 10)
    doc.save(fileName)
  }, [markdownContent, fileName, markdownIt])

  return (
    <SidebarButton onClick={onClick} icon={IconFilePdf}>
      <Trans i18nKey={'editor.export.pdf'} />
    </SidebarButton>
  )
}
