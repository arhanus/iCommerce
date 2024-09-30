import Image from "next/image";
import { CiShoppingCart } from "react-icons/ci";
import Link from "next/link";
import SideMenu from "./SideMenu";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import { CiLogin } from "react-icons/ci";
import { auth } from "@clerk/nextjs/server";
import LogoutButton from "./LogoutButton";
import SearchBar from "./SearchBar";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "../components/ui/navigation-menu";
import SearchButton from "./searchButton";

const clothingCategories = [
  {
    href: "/category/kiyafet",
    title: "Kıyafet",
    description: "Erkek ve kadın kıyafetleri",
  },
  {
    href: "/category/pantolon",
    title: "Pantolon",
    description: "Erkek ve kadın pantolonları",
  },
  {
    href: "/category/ayakkabi",
    title: "Ayakkabı",
    description: "Erkek ve kadın ayakkabıları",
  },
];

const cosmeticCategories = [
  {
    href: "/category/cilt-bakim",
    title: "Cilt Bakım",
    description: "Cilt bakım ürünleri",
  },
  {
    href: "/category/parfum",
    title: "Parfüm",
    description: "Erkek ve kadın parfümleri",
  },
  {
    href: "/category/makyaj",
    title: "Makyaj",
    description: "Makyaj ürünleri",
  },
];
const homeCategories = [
  {
    href: "/category/koltuk",
    title: "Koltuk",
    description: "Koltuklar",
  },
  {
    href: "/category/masa",
    title: "Masa",
    description: "Masa ve sandalyeler",
  },
  {
    href: "/category/dolap",
    title: "Dolap",
    description: "Dolaplar",
  },
];
const electronicCategories = [
  {
    href: "/category/telefon",
    title: "Telefon",
    description: "Akıllı telefonlar",
  },
  {
    href: "/category/bilgisayar",
    title: "Bilgisayar",
    description: "Yeni nesil bilgisayarlar",
  },
  {
    href: "/category/cevre-birimleri",
    title: "Çevre Birimleri",
    description: "Monitör, klavye, fare",
  },
];
const Navbar = () => {
  const { userId } = auth();

  return (
    <>
      <div className="w-screen py-3 px-6 lg:px-0 fixed bg-white z-50">
        <div className="flex justify-between items-center lg:w-2/3 mx-auto">
          <Link href="/">
            <Image src="/logo.png" width={135} height={135} alt="logo" />
          </Link>
          <div className="items-center hidden lg:flex">
            <div className="w-fit mx-auto hidden xl:flex">
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger>Giyim</NavigationMenuTrigger>
                    <NavigationMenuContent className="flex items-center justify-between min-w-full text-sm px-10 py-4 gap-2">
                      {clothingCategories.map((categories) => (
                        <Link
                          href={categories.href}
                          key={categories.title}
                          className="flex flex-col gap-3 items-start justify-center hover:bg-zinc-200 p-4 rounded-md duration-150"
                        >
                          <NavigationMenuLink className="text-nowrap text-base">
                            {categories.title}
                          </NavigationMenuLink>
                          <p className="text-sm text-zinc-600">
                            {categories.description}
                          </p>
                        </Link>
                      ))}
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger>Kozmetik</NavigationMenuTrigger>
                    <NavigationMenuContent className="flex items-center justify-between min-w-full text-sm px-10 py-4 gap-2">
                      {cosmeticCategories.map((categories) => (
                        <Link
                          href={categories.href}
                          key={categories.title}
                          className="flex flex-col gap-2 items-start justify-center hover:bg-zinc-200 p-4 rounded-md duration-150"
                        >
                          <NavigationMenuLink className="text-nowrap text-base">
                            {categories.title}
                          </NavigationMenuLink>
                          <p className="text-sm text-zinc-600">
                            {categories.description}
                          </p>
                        </Link>
                      ))}
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger>Ev Eşyaları</NavigationMenuTrigger>
                    <NavigationMenuContent className="flex items-center justify-between min-w-full text-sm px-10 py-4 gap-2 ">
                      {homeCategories.map((categories) => (
                        <Link
                          href={categories.href}
                          key={categories.title}
                          className="flex flex-col items-start justify-center gap-3 hover:bg-zinc-200 p-4 rounded-md duration-150"
                        >
                          <NavigationMenuLink className="text-nowrap text-base">
                            {categories.title}
                          </NavigationMenuLink>
                          <p className="text-sm text-zinc-600">
                            {categories.description}
                          </p>
                        </Link>
                      ))}
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger>Elektronik</NavigationMenuTrigger>
                    <NavigationMenuContent className="flex items-center justify-between min-w-full text-sm px-10 py-4 gap-2">
                      {electronicCategories.map((categories) => (
                        <Link
                          href={categories.href}
                          key={categories.title}
                          className="flex flex-col gap-3 items-start justify-center hover:bg-zinc-200 p-4 rounded-md duration-150"
                        >
                          <NavigationMenuLink className="text-nowrap text-base">
                            {categories.title}
                          </NavigationMenuLink>
                          <p className=" text-sm text-zinc-600">
                            {categories.description}
                          </p>
                        </Link>
                      ))}
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          </div>
          <div className="flex items-center gap-1 sm:gap-3 justify-end">
            {userId && (
              <>
              <Link
                href="/my-products"
                className="hidden xl:flex text-sm underline underline-offset-2 hover:text-red-600 duration-300">
                  Ürünlerim
                </Link>
                <Link
                  href="/add-product"
                  className="hidden xl:flex text-sm underline underline-offset-2 hover:text-red-600 duration-300"
                >
                  Ürün Sat
                </Link>
              </>
            )}
            <SearchButton />

            <Link
              href="/cart"
              className="hover:bg-zinc-100 hover:text-red-600 duration-300 p-1 sm:p-2 rounded-full flex"
            >
              <CiShoppingCart size={26} />
            </Link>
            <SignedIn>
              <LogoutButton />
            </SignedIn>
            <SignedOut>
              <SignInButton
                mode="modal"
                className="text-xs sm:text-sm hover:bg-zinc-100 hover:text-red-600 duration-300 p-1 sm:p-2 rounded-full cursor-pointer"
              >
                <span className="hover:bg-zinc-100 hover:text-red-600 duration-300 rounded-full hidden xl:flex">
                  <CiLogin size={24} />
                </span>
              </SignInButton>
            </SignedOut>
            <SideMenu />
          </div>
        </div>
      </div>
      <SearchBar />
    </>
  );
};

export default Navbar;
