"use client"
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
          <span className="w-full bg-white hover:bg-zinc-100 duration-300 block p-2 tracking-wide border-b-[1px] xl:hidden">Çıkış yap</span>
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
  