"use client"

import { api } from '@/convex/_generated/api'
import { Id } from '@/convex/_generated/dataModel'
import { useMutation, useQuery } from 'convex/react'
import React from 'react'
import { Block } from "@blocknote/core";
import { BlockNoteEditor, PartialBlock } from '@blocknote/core'
import { BlockNoteView } from "@blocknote/mantine";
import { useCreateBlockNote, useBlockNoteEditor } from '@blocknote/react'
import "@blocknote/core/style.css"
import "@blocknote/core/fonts/inter.css";
import { HTMLAttributes } from "react"
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


  const editor = useCreateBlockNote({
    initialContent: initialContent ? JSON.parse(initialContent) : [],
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
