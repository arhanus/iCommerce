import { RxHamburgerMenu } from "react-icons/rx";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import Link from "next/link";
import SideBarLogout from "./SideBarLogout"

const SideMenu = () => {
  return (
    <Sheet>
      <SheetTrigger>
        <RxHamburgerMenu
          size={29}
          className="hover:bg-zinc-100 hover:text-red-600 duration-300 p-1 ml-1 rounded-full xl:hidden"
        />
      </SheetTrigger>
      <SheetContent className="z-50 bg-zinc-200 overflow-scroll xl:hidden">
        <div className="pt-6 text-start">
          <Link
            className="w-full bg-red-600 hover:bg-red-700 duration-300 text-white block p-2 tracking-wide border-b-[1px]"
            href="/add-product"
          >
            Ürün Sat
          </Link>
          <Link
            className="w-full bg-white hover:bg-zinc-100 duration-300 block p-2 tracking-wide border-b-[1px]"
            href="/my-products"
          >
            Ürünlerim
          </Link>
          <SideBarLogout/>
          
        </div>
        <hr className="bg-zinc-300 pt-[1px] mt-4"/>
        <SheetTitle className="mt-4 tracking-wide">Giyim</SheetTitle>
        <div className="pt-4 text-start">
        <Link
            className="w-full bg-white hover:bg-zinc-100 duration-300 block p-2 tracking-wide border-b-[1px]"
            href="/category/kiyafet"
          >
            Kıyafet
          </Link>
          <Link
            className="w-full bg-white hover:bg-zinc-100 duration-300 block p-2 tracking-wide border-b-[1px]"
            href="/category/pantolon"
          >
            Pantolon
          </Link>
          <Link
            className="w-full bg-white hover:bg-zinc-100 duration-300 block p-2 tracking-wide border-b-[1px]"
            href="/category/ayakkabi"
          >
            Ayakkabı
          </Link>
        </div>
        <hr className="bg-zinc-300 pt-[1px] mt-4"/>
        <SheetTitle className="mt-4 tracking-wide">Kozmetik</SheetTitle>
        <div className="pt-4 text-start">
        <Link
            className="w-full bg-white hover:bg-zinc-100 duration-300 block p-2 tracking-wide border-b-[1px]"
            href="/category/cilt-bakim"
          >
            Cilt Bakım
          </Link>
          <Link
            className="w-full bg-white hover:bg-zinc-100 duration-300 block p-2 tracking-wide border-b-[1px]"
            href="/category/parfüm"
          >
            Parfüm
          </Link>
          <Link
            className="w-full bg-white hover:bg-zinc-100 duration-300 block p-2 tracking-wide border-b-[1px]"
            href="/category/makyaj"
          >
            Makyaj
          </Link>
          <hr className="bg-zinc-300 pt-[1px] mt-4"/>
        <SheetTitle className="mt-4 tracking-wide">Ev Eşyaları</SheetTitle>
        <div className="pt-4 text-start">
        <Link
            className="w-full bg-white hover:bg-zinc-100 duration-300 block p-2 tracking-wide border-b-[1px]"
            href="/category/koltuk"
          >
            Koltuk
          </Link>
          <Link
            className="w-full bg-white hover:bg-zinc-100 duration-300 block p-2 tracking-wide border-b-[1px]"
            href="/category/masa"
          >
            Masa
          </Link>
          <Link
            className="w-full bg-white hover:bg-zinc-100 duration-300 block p-2 tracking-wide border-b-[1px]"
            href="/category/dolap"
          >
            Dolap
          </Link>
        </div>
        <hr className="bg-zinc-300 pt-[1px] mt-4"/>
        <SheetTitle className="mt-4 tracking-wide">Elektronik</SheetTitle>
        <div className="pt-4 text-start">
        <Link
            className="w-full bg-white hover:bg-zinc-100 duration-300 block p-2 tracking-wide border-b-[1px]"
            href="/category/telefon"
          >
            Telefon
          </Link>
          <Link
            className="w-full bg-white hover:bg-zinc-100 duration-300 block p-2 tracking-wide border-b-[1px]"
            href="/category/bilgisayar"
          >
            Bilgisayar
          </Link>
          <Link
            className="w-full bg-white hover:bg-zinc-100 duration-300 block p-2 tracking-wide border-b-[1px]"
            href="/category/cevre-birimleri"
          >
            Çevre Birimleri
          </Link>
        </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default SideMenu;
