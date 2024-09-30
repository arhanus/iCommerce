"use client"

import { useSearchState } from "@/lib/store"
import { CiSearch } from "react-icons/ci"

const SearchButton = () => {
    const {setOpen} = useSearchState()

  return (
    <button
            className="hover:bg-zinc-100 hover:text-red-600 duration-300 p-1 sm:p-2 rounded-full"
            onClick={setOpen}
          >
            <CiSearch size={24} />
    </button>
  )
}

export default SearchButton