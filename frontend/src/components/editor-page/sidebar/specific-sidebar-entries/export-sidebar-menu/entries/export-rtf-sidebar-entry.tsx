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
import { FiletypeRtf as IconFileRtf } from 'react-bootstrap-icons'
import { Trans } from 'react-i18next'
import { useConfiguredMarkdownIt } from '../../../../../../markdown-renderer/markdown-to-react/hooks/use-configured-markdown-it'

export const ExportRtfSidebarEntry: React.FC = () => {
  const markdownContent = useNoteMarkdownContent()
  const fileName = useNoteFilename().replace(/\.md$/, '.rtf')
  const markdownIt = useConfiguredMarkdownIt([], true, true)
  const onClick = useCallback(() => {
    const html = markdownIt.render(markdownContent)
    const rtf = `{\\rtf1\\ansi ${html}}`
    download(rtf, fileName, 'application/rtf')
  }, [markdownContent, fileName, markdownIt])

  return (
    <SidebarButton onClick={onClick} icon={IconFileRtf}>
      <Trans i18nKey={'editor.export.rtf'} />
    </SidebarButton>
  )
}
