import { cookies } from "next/headers";
import Image from "next/image";
import AddToCartButton from "@/components/AddToCartButton";
import { redirect } from "next/navigation";

const getProduct = async (slug) => {
  try {
    const response = await fetch(
      `http://localhost:5254/api/Product/get-product/${slug}`,
      { cache: "no-store" }
    );
    if (!response.ok) {
      redirect("/not-found")
    }
    return await response.json();
  } catch (error) {
    console.error("Ürünleri getirirken bir hata oluştu:", error);
    throw error;
  }
};

const ProductPage = async ({ params }) => {
  const { slug } = params;
  const product = await getProduct(slug);

  const cookieStore = cookies();
  const cartItems = JSON.parse(cookieStore.get("cartItems")?.value || "[]");

  return (
    <div className="w-full mx-auto mt-6">
      <div className="grid md:grid-cols-2 gap-8 bg-white rounded-md p-4 sm:p-8 shadow-md">
        <div className="relative aspect-square my-auto">
          <Image
            src="/product.jpg"
            alt=""
            fill
            className="rounded-md object-cover"
          />
        </div>
          <div className="p-6 overflow-hidden my-auto">
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <h5 className="text-zinc-500 mb-5">Satıcı: {product.createdBy}</h5>
            <p className="text-2xl font-bold mb-4 ">{product.price}₺</p>
            <div className="overflow-y-scroll pb-4 max-h-48">
              <p className="mb-6 text-gray-600 break-words pr-2">
                {product.description}
              </p>
            </div>
            <div className="relative bottom-0">
            <AddToCartButton product={product} initialCartItems={cartItems}/>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
