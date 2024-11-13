// src/Tiptap.tsx
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { BubbleMenu, EditorProvider, useCurrentEditor, Editor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { MdFormatStrikethrough, MdOutlineFormatBold } from 'react-icons/md'
import { BiItalic, BiRedo, BiUndo } from "react-icons/bi";
import { AiOutlineEnter } from "react-icons/ai";
import { FaCode } from "react-icons/fa";
import { VscHorizontalRule } from "react-icons/vsc";
import { useEffect } from 'react'


// define your extension array
const extensions = [StarterKit]



const MenuBar = () => {
    const { editor } = useCurrentEditor()

    useEffect(() => {
        if (editor) {
            editor.commands.focus()
        }
    }, [editor])

    if (!editor) {
        return null
    }

    return (

        <BubbleMenu editor={editor} tippyOptions={{ duration: 100, }} >
            <div className='w-[400px] bg-slate-50 flex flex-wrap gap-2 p-2 rounded-lg'>
                <Button
                    variant={"ghost"}
                    size={"icon"}
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    disabled={
                        !editor.can()
                            .chain()
                            .focus()
                            .toggleBold()
                            .run()
                    }
                    className={cn("hover:bg-slate-200 size-10", editor.isActive('bold') ? "bg-slate-200 text-slate-900" : "bg-slate-50 text-slate-500")}
                >
                    <MdOutlineFormatBold className={'size-6'} />
                </Button>
                <Button
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    disabled={
                        !editor.can()
                            .chain()
                            .focus()
                            .toggleItalic()
                            .run()
                    }
                    variant={"ghost"}
                    size={"icon"}
                    className={cn("hover:bg-slate-200 size-10", editor.isActive('italic') ? "bg-slate-200 text-slate-900" : "bg-slate-50 text-slate-500")}
                >
                    <BiItalic className={'size-6'} />
                </Button>
                <Button
                    onClick={() => editor.chain().focus().toggleStrike().run()}
                    disabled={
                        !editor.can()
                            .chain()
                            .focus()
                            .toggleStrike()
                            .run()
                    }

                    variant={"ghost"}
                    size={"icon"}
                    className={cn("hover:bg-slate-200 size-10", editor.isActive('strike') ? "bg-slate-200 text-slate-900" : "bg-slate-50 text-slate-500")}
                >
                    <MdFormatStrikethrough className='size-6' />
                </Button>
                <Button
                    onClick={() => editor.chain().focus().toggleCode().run()}
                    disabled={
                        !editor.can()
                            .chain()
                            .focus()
                            .toggleCode()
                            .run()
                    }

                    variant={"ghost"}
                    size={"icon"}
                    className={cn("hover:bg-slate-200 size-10", editor.isActive('code') ? "bg-slate-200 text-slate-900" : "bg-slate-50 text-slate-500")}
                >
                    <FaCode className='size-6' />
                </Button>
                {/* <button onClick={() => editor.chain().focus().unsetAllMarks().run()}>
                    Clear marks
                </button> */}

                {/* <button
                    onClick={() => editor.chain().focus().setParagraph().run()}
                    className={editor.isActive('paragraph') ? 'is-active' : ''}
                >
                    Paragraph
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                    className={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}
                >
                    H1
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                    className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}
                >
                    H2
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                    className={editor.isActive('heading', { level: 3 }) ? 'is-active' : ''}
                >
                    H3
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
                    className={editor.isActive('heading', { level: 4 }) ? 'is-active' : ''}
                >
                    H4
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
                    className={editor.isActive('heading', { level: 5 }) ? 'is-active' : ''}
                >
                    H5
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
                    className={editor.isActive('heading', { level: 6 }) ? 'is-active' : ''}
                >
                    H6
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    className={editor.isActive('bulletList') ? 'is-active' : ''}
                >
                    Bullet list
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    className={editor.isActive('orderedList') ? 'is-active' : ''}
                >
                    Ordered list
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                    className={editor.isActive('codeBlock') ? 'is-active' : ''}
                >
                    Code block
                </button> */}

                <Button onClick={() => editor.chain().focus().setHardBreak().run()}
                    variant={"ghost"}
                    size={"icon"}
                    className={cn("hover:bg-slate-200 size-10")}>
                    <AiOutlineEnter className='size-6' />
                </Button>
                <Button onClick={() => editor.chain().focus().setHorizontalRule().run()}
                    variant={"ghost"}
                    size={"icon"}
                    className={cn("hover:bg-slate-200 size-10")}>
                    <VscHorizontalRule className='size-6' />
                </Button>
                <Button
                    onClick={() => editor.chain().focus().undo().run()}
                    disabled={
                        !editor.can()
                            .chain()
                            .focus()
                            .undo()
                            .run()
                    }
                    variant={"ghost"}
                    size={"icon"}
                    className={cn("hover:bg-slate-200 size-10")}
                >
                    <BiUndo className='size-6' />
                </Button>
                <Button
                    onClick={() => editor.chain().focus().redo().run()}
                    disabled={
                        !editor.can()
                            .chain()
                            .focus()
                            .redo()
                            .run()
                    }
                    variant={"ghost"}
                    size={"icon"}
                    className={cn("hover:bg-slate-200 size-10")}
                >
                    <BiRedo className='size-6' />
                </Button>

                {/* <button
                    onClick={() => editor.chain().focus().toggleBlockquote().run()}
                    className={editor.isActive('blockquote') ? 'is-active' : ''}
                >
                    Blockquote
                </button> */}

            </div>
        </BubbleMenu>

    )
}




const Tiptap = ({
    content,
    setContent
    , editorRef
}: {
    content: string
    setContent: React.Dispatch<React.SetStateAction<string>>
    editorRef: React.MutableRefObject<Editor | null>
}) => {

    return (
        <EditorProvider editorProps={{
            attributes: {
                class: 'p-2 rounded-lg',
            },
        }}

            onUpdate={({ editor }) => {
                setContent(editor.getHTML())
                editorRef.current = editor
                // editor.commands.setContent("")
            }}
            slotBefore={< MenuBar />} extensions={extensions} content={content}


        ></EditorProvider>
    )
}

export default Tiptap
