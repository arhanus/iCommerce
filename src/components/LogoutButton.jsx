"use client"
import { CiLogout } from "react-icons/ci";
import { useClerk } from "@clerk/nextjs";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
  
  export default function LogoutButton() {
    const { signOut } = useClerk()
    return (
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <span className="hover:text-red-600 hover:bg-zinc-100 p-2 rounded-full cursor-pointer hidden xl:flex"><CiLogout size={24}/></span>
        </AlertDialogTrigger>
        <AlertDialogContent className="bg-white">
          <AlertDialogHeader>
            <AlertDialogTitle className="mb-12">Hesabınızdan çıkış yapmak istediğinize emin misiniz?</AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>İptal</AlertDialogCancel>
            <AlertDialogAction><button onClick={() => signOut({ redirectUrl: '/' })}>Çıkış yap</button></AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  }
  