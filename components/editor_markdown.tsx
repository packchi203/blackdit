import React, { useMemo } from 'react'
import dynamic from 'next/dynamic'
import { appApi } from '@/api-client'
const SimpleMdeReact = dynamic(
  () => import('react-simplemde-editor').then((mod) => mod.default),
  { ssr: false }
)

type EditorMarkdownProps = {
  value: string
  onChange: any
  Option?: any
}

export function EditorMarkdown({value, onChange, Option }: EditorMarkdownProps) {
  const customRendererOptions: any = useMemo(() => {
    return {
      ...Option,
      uploadImage: true,
      imageUploadFunction: uploadImage,
      // previewRender(text) {
      //   return ReactDOMServer.renderToString(
      //       <MarkdownPreview source={text} />
      //   )
      // },
      spellChecker: false,
      toolbar: [
        'bold',
        'italic',
        'heading-bigger',
        // '|',
        // 'quote',
        // 'code',
        // 'horizontal-rule',
        '|',
        'unordered-list',
        'ordered-list',
        'table',
        '|',
        'upload-image',
        'link',
        {
          name: 'youtubeEmbed',
          action: youtubeEmbed,
          className: 'fa fa-youtube-play', // Look for a suitable icon
          title: 'Youtube embed',
        },
        // {
        //   name: 'codepenEmbed',
        //   action: codepenEmbed,
        //   className: 'fa fa-codepen', // Look for a suitable icon
        //   title: 'Codepen embed',
        // },
        // '|',
        // 'side-by-side',
        // 'fullscreen',
        // '|',
        // 'guide',
      ],
      placeholder: 'Nhập Nội Dung... ',
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Option?.autosave&&1000])

  function uploadImage(file: File, onSuccess: any) {
    if (!file) {
      return
    }
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = (e) => {
      appApi.uploadImage(e.target?.result).then((res) => {
        onSuccess(res)
      })
    }
  }

  function YouTubeGetID(url: any): string {
    var ID = ''
    url = url
      .replace(/(>|<)/gi, '')
      .split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/)
    if (url[2] !== undefined) {
      ID = url[2].split(/[^0-9a-z_\-]/i)
      ID = ID[0]
    } else {
      ID = url
    }
    return ID
  }

  function youtubeEmbed(editor: any) {
    var cm = editor.codemirror
    let url = prompt('Nhập đường dẫn Youtube:', '')
    var output = ''
    if (url == null || url == '') {
      output = ''
    } else {
      output = `<iframe  style="width: 100%;" height="400" src="https://www.youtube.com/embed/${YouTubeGetID(
        url
      )}"></iframe>`
    }
    cm.replaceSelection(output)
  }

  function codepenEmbed(editor: any) {
    var cm = editor.codemirror
    let url: any = prompt('Nhập đường dẫn Codepen của bạn:')
    var output = ''
    if (url == null || url == '') {
      output = ''
    } else {
      url = url.replace(/(>|<)/gi, '').split(/(codepen\.io\/|\/pen\/)/)
      output = `<iframe height="300" style="width: 100%;" src="https://codepen.io/${url[2]}/embed/${url[4]}?default-tab=html%2Cresult&theme-id=dark"></iframe>`
    }
    cm.replaceSelection(output)
  }
  return     <SimpleMdeReact
  id='editor-value'
  value={value}
  className='text-[18px]'
  onChange={onChange}
  options={customRendererOptions}
/>
}
