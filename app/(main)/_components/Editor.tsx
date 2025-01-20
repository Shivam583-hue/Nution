"use client"

import { api } from '@/convex/_generated/api'
import { Id } from '@/convex/_generated/dataModel'
import { useMutation } from 'convex/react'
import React from 'react'
import { Block } from "@blocknote/core";
import { BlockNoteView } from "@blocknote/mantine";
import { useCreateBlockNote } from '@blocknote/react'
import "@blocknote/core/style.css"
import "@blocknote/core/fonts/inter.css";
import { useTheme } from 'next-themes'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'

type EditorProps = {
  onChange: (value: string) => void
  params: {
    documentId: Id<"documents">
  }
  initialContent?: string
  editable?: boolean
}

const Editor = ({ initialContent, params }: EditorProps) => {
  const { resolvedTheme } = useTheme()

  const [blocks, setBlocks] = React.useState<Block[]>([]);

  const [value, setValue] = React.useState<string>(initialContent ? initialContent : "");
  console.log(value)

  const editor = useCreateBlockNote({
    initialContent: initialContent ? JSON.parse(initialContent) : undefined,
  });

  const update = useMutation(api.documents.update)
  const onSubmit = () => {
    setValue(JSON.stringify(blocks, null, 2))
    const prmoise = update({
      id: params.documentId,
      content: JSON.stringify(blocks, null, 2)
    })
    toast.promise(prmoise, {
      loading: "Saving...",
      success: "Saved!",
      error: "Error!"
    })
  }

  return (
    <div>
      <BlockNoteView editor={editor} theme={resolvedTheme == "dark" ? "dark" : "light"} onChange={() => {
        setBlocks(editor.document);
      }} />
      <div className='w-full flex justify-center items-center '>
        <Button className='mt-4' onClick={onSubmit}>
          Save
        </Button>
      </div>
    </div>
  )
}

export default Editor
