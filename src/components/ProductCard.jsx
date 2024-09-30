import Image from "next/image"
import Link from "next/link"

const ProductCard = ({product}) => {
  const {name, price, imagePath, id} = product
  return (
    <Link prefetch={false} className="flex flex-col gap-2 hover:scale-95 duration-150 bg-white rounded-lg pb-2 border-[1px]" href={`/product/${id}`}>
      <div className="w-full h-80 relative">
        <Image alt="" src="/product.jpg" fill className="object-cover rounded-t-lg"/>
      </div>
      <div className="relative left-2">
        <h1 className="text-lg font-semibold">
          {name}
        </h1>
        <span>
          {price}₺
        </span>
      </div>
    </Link>
  )
}

export default ProductCard