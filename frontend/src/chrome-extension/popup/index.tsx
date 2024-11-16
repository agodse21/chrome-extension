import "../global.css";
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion'
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FiFileText } from "react-icons/fi"
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { RxCross2 } from "react-icons/rx";
import { MdOutlinePerson, MdOutlinePersonOff } from "react-icons/md";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import Tiptap from "../tiptap-editor/text-editor";
import { generateRandomId } from "@/lib/utils";
import { Editor } from '@tiptap/react'
import relativeTime from 'dayjs/plugin/relativeTime'
import dayjs from "dayjs";
dayjs.extend(relativeTime);

type User = {
  user_name: string
  email: string
  password: string
} | null


type NOTE = {
  id: string
  content: string
  timestamp: Date
}

export const Popup = () => {
  const [notes, setNotes] = useState<NOTE[]>([]);
  const [user, setUser] = useState<User>(null)
  const [isTryingSignIn, setIsTryingSignIn] = useState<boolean>(false)

  const [content, setContent] = useState("")

  const [userInfo, setUserInfo] = useState<User>({
    email: "", password: "", user_name: ""
  })


  const editorRef = useRef<Editor | null>(null)


  const [userInfoError, setUserInfoError] = useState<User>({
    email: "", password: "", user_name: ""
  })

  useEffect(() => {
    // chrome.storage.sync.get('note', (result) => {
    //   if (result.note) {
    setNotes([]);
    setUser(null)
    //   }
    // });
  }, []);

  const handleSaveNote = () => {
    const newNote = {
      id: generateRandomId(),
      content: content,
      timestamp: new Date()
    } as NOTE
    setNotes(prev => [...prev, newNote]);
    editorRef?.current?.commands?.setContent("")
    // chrome.storage.sync.set({ note: newNote });
  };


  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    setUserInfo(prevUserInfo => ({
      ...prevUserInfo,
      [name]: value
    } as User));

  }


  const handleSignIn = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!userInfo?.user_name) {
      setUserInfoError({ email: "", password: "", user_name: "" })
      setUserInfoError((prev) => ({ ...prev, user_name: "User is required..." } as User))
    } else if (!userInfo?.email) {
      setUserInfoError({ email: "", password: "", user_name: "" })
      setUserInfoError((prev) => ({ ...prev, email: "Email is required..." } as User))
    } else if (!userInfo?.password) {
      setUserInfoError({ email: "", password: "", user_name: "" })
      setUserInfoError((prev) => ({ ...prev, password: "Password is required..." } as User))
    } else {
      setUser(userInfo)
      setUserInfoError({ email: "", password: "", user_name: "" })
      setIsTryingSignIn(false)
    }
  }


  return (
    <div className="p-5 flex flex-col gap-4">
      <div className="flex items-center gap-2 justify-between">
        <h1 className="text-2xl font-bold">NoteDash</h1>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-base border-slate-400 rounded-full">
            {notes.length} {notes.length === 1 ? 'Note' : 'Notes'}
          </Badge>
          <div className="flex items-center space-x-1">
            <Popover>
              <PopoverTrigger><Avatar className="size-[29px] border border-slate-400">
                <AvatarFallback className="bg-slate-200">
                  {user ? user.user_name[0] : 'G'}
                </AvatarFallback>
              </Avatar></PopoverTrigger>
              <PopoverContent side="bottom" className="mr-3 p-0 pt-4 flex flex-col items-center w-fit gap-3">


                {isTryingSignIn && <form onSubmit={handleSignIn} className="p-4 pt-0 flex flex-col gap-3">
                  <div className="flex flex-col gap-1">
                    <span className="text-sm font-medium">User Name</span>
                    <Input name="user_name" type="text" placeholder="Enter your user name..."
                      onChange={handleOnChange} value={userInfo?.user_name} />
                    {
                      userInfoError?.user_name !== "" && <span className="text-xs text-destructive">{userInfoError?.user_name}</span>
                    }
                  </div>

                  <div className="flex flex-col gap-1">
                    <span className="text-sm font-medium">Email</span>
                    <Input name="email" type="email" placeholder="Enter your email..." onChange={handleOnChange} value={userInfo?.email} />
                    {
                      userInfoError?.email !== "" && <span className="text-xs text-destructive">{userInfoError?.email}</span>
                    }
                  </div>

                  <div>
                    <span>Password</span>
                    <PasswordInput name="password" onChange={handleOnChange} value={userInfo?.password} placeholder="Enter your password..." />
                    {
                      userInfoError?.password !== "" && <span className="text-xs text-destructive">{userInfoError?.password}</span>
                    }
                  </div>

                  <Button type="submit" className="bg-transparent border border-slate-400 text-slate-800 bg-slate-200 w-full flex justify-center h-10 items-center gap-2 hover:bg-slate-100" variant={"ghost"} >
                    <MdOutlinePerson className="size-5 text-slate-600" />
                    Sign In</Button>
                </form>}


                {!isTryingSignIn &&
                  <><Avatar className="size-[29px] border border-slate-400">
                    <AvatarFallback className="bg-slate-200">
                      {user ? user.user_name[0] : 'G'}
                    </AvatarFallback>
                  </Avatar>
                    <div className="flex flex-col items-center px-4">
                      <span> {user ? user.user_name : 'Geust'}</span>
                      {user && <span>{user.email}</span>}
                    </div>
                    <div className="w-full">
                      <Separator />
                      <div className="w-full p-1">
                        {user ? <Button className="bg-transparent text-slate-800 w-full flex justify-start h-10 items-center gap-2" variant={"ghost"} onClick={() => {
                          setUser(null)
                        }}>
                          <MdOutlinePersonOff className="size-5 text-slate-600" />
                          Sign Out</Button> : <Button className="bg-transparent text-slate-800 w-full flex justify-start h-10 items-center gap-2 hover:bg-slate-200" variant={"ghost"} onClick={() => setIsTryingSignIn(true)}>
                          <MdOutlinePerson className="size-5 text-slate-600" />
                          Sign In</Button>}</div>
                    </div>
                  </>}
              </PopoverContent>


            </Popover>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between gap-1">
        <div className=" border border-r-slate-100 rounded-lg w-full">
          <Tiptap content={content} setContent={setContent} editorRef={editorRef} />
        </div>
        <Button className="h-[41px] rounded-lg" onClick={handleSaveNote}>Add</Button>
      </div>

      <ScrollArea className="h-[70vh] flex-grow">
        <AnimatePresence>
          {
            notes.length === 0 && <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              className="flex flex-col items-center justify-center h-full text-center border p-5 rounded-lg"
            >
              <FiFileText className="h-16 w-16 text-slate-500 mb-4" />
              <h2 className="text-xl font-semibold mb-2">No notes yet ...</h2>
              <span className="text-sm text-slate-500 mb-3">
                Every great journey begins with a single step.<br /> Or in this case, a single note! <br />What will your first brilliant note be ?
              </span>
              <span className="text-sm text-slate-700 mb-4">Note: Sign in to sync your notes across all your devices.</span>
            </motion.div>
          }

          {
            notes.length > 0 && <>{notes.map((note) => (
              <motion.div
                key={note.id}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                className="bg-secondary p-3 rounded-lg mb-2 relative group"
              >
                <div dangerouslySetInnerHTML={{ __html: note.content }} />
                <span className="text-xs text-muted-foreground">{
                  dayjs(note.timestamp.toLocaleString()).from(dayjs())
                }</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                // onClick={() => deleteNote(note.id)}
                >
                  <RxCross2 className="h-4 w-4" />
                </Button>
              </motion.div>
            ))}</>
          }
        </AnimatePresence>
      </ScrollArea>
    </div>
  );
};
