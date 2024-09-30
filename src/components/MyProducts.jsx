"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { useUser } from '@clerk/nextjs'
import { useForm, Controller } from 'react-hook-form'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"

const categories = {
  giyim: ['kıyafet', 'pantolon', 'ayakkabı'],   
  kozmetik: ['cilt-bakım', 'parfüm', 'makyaj'],
  'ev-esyalari': ['koltuk', 'masa', 'dolap'],
  elektronik: ['telefon', 'bilgisayar', 'çevre-birimleri']
}

const formatCategoryName = (name) => {
  return name
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/ğ/g, 'g')
    .replace(/ü/g, 'u')
    .replace(/ş/g, 's')
    .replace(/ı/g, 'i')
    .replace(/ö/g, 'o')
    .replace(/ç/g, 'c')
}

export default function MyProducts() {
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(true)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const router = useRouter()
  const { user } = useUser()
  const { control, handleSubmit, watch, setValue, reset } = useForm()
  const { toast } = useToast()

  const selectedCategory = watch('category')

  useEffect(() => {
    if (user) {
      fetchProducts()
    }
  }, [user])

  useEffect(() => {
    const filtered = products.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setFilteredProducts(filtered)
  }, [searchTerm, products])

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:5254/api/Product/get-products')
      if (!response.ok) {
        throw new Error('Failed to fetch products')
      }
      const data = await response.json()
      const userProducts = data.filter(product => product.createdBy === user.username)
      setProducts(userProducts)
      setFilteredProducts(userProducts)
    } catch (error) {
      console.error('Error fetching products:', error)
      toast({
        title: "Error",
        description: "Failed to load products. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        const response = await fetch(`http://localhost:5254/api/Product/delete-product/${id}`, {
          method: 'DELETE',
        })
        if (!response.ok) {
          throw new Error('Failed to delete product')
        }
        setProducts(products.filter(product => product.id !== id))
        toast({
          title: "Success",
          description: "Product deleted successfully.",
        })
      } catch (error) {
        console.error('Error deleting product:', error)
        toast({
          title: "Error",
          description: "Failed to delete product. Please try again.",
          variant: "destructive",
        })
      }
    }
  }

  const handleEdit = (product) => {
    const formattedProduct = {
      ...product,
      category: Object.keys(categories).find(key => formatCategoryName(key) === product.category) || product.category,
      subcategory: product.subcategory
    }
    reset(formattedProduct)
    setIsEditModalOpen(true)
  }

  const onSubmit = async (data) => {
    setLoading(true)

    const formattedData = {
      ...data,
      category: formatCategoryName(data.category),
      subcategory: data.subcategory ? formatCategoryName(data.subcategory) : undefined
    }

    try {
      const response = await fetch(`http://localhost:5254/api/Product/update-product/${data.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formattedData),
      })

      if (!response.ok) {
        throw new Error('Failed to update product')
      }

      setProducts(products.map(p => p.id === data.id ? formattedData : p))
      setIsEditModalOpen(false)
      toast({
        title: "Success",
        description: "Product updated successfully.",
      })
    } catch (error) {
      console.error('Error updating product:', error)
      toast({
        title: "Error",
        description: "Failed to update product. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (e) => {
    setSearchTerm(e.target.value)
  }

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>
  }

  return (
    <Card className="w-full max-w-7xl mx-auto mt-12">
      <CardHeader>
        <CardTitle className="text-2xl md:text-3xl lg:text-4xl mb-4">Ürünlerim</CardTitle>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
          <Input
            type="text"
            placeholder="Ara..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-full sm:w-64 md:w-80"
          />
          <Button onClick={() => router.push('/add-product')}>Ürün Oluştur</Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto ">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-24">Resim</TableHead>
                <TableHead>İsim</TableHead>
                <TableHead className="hidden md:table-cell">Kategori</TableHead>
                <TableHead>Fiyat</TableHead>
                <TableHead>Seçenekler</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    <Image
                      src={"/product.jpg"}
                      alt={product.name}
                      width={50}
                      height={50}
                      className="object-cover rounded"
                    />
                  </TableCell>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell className="hidden md:table-cell">{product.category}</TableCell>
                  <TableCell>${product.price.toFixed(2)}</TableCell>
                  <TableCell>
                    <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                      <Button variant="outline" className="w-full sm:w-auto" onClick={() => handleEdit(product)}>
                        Düzenle
                      </Button>
                      <Button variant="destructive" className="w-full sm:w-auto" onClick={() => handleDelete(product.id)}>
                        Kaldır
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>

      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="bg-white">
          <DialogHeader>
            <DialogTitle>Düzenle</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Ürün İsmi</label>
              <Controller
                name="name"
                control={control}
                rules={{ required: 'Bir ürün ismi girmelisin.' }}
                render={({ field }) => <Input {...field} />}
              />
            </div>
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">Açıklama</label>
              <Controller
                name="description"
                control={control}
                render={({ field }) => <Textarea {...field} rows={3} />}
              />
            </div>
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700">Kategori</label>
              <Controller
                name="category"
                control={control}
                rules={{ required: 'Bir kategori seçmelisin.' }}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Bir kategori seç..." />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.keys(categories).map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
            {selectedCategory && (
              <div>
                <label htmlFor="subcategory" className="block text-sm font-medium text-gray-700">Alt Kategori</label>
                <Controller
                  name="subcategory"
                  control={control}
                  rules={{ required: 'Bir alt kategori seçmelisin' }}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Bir alt kategori seç..." />
                      </SelectTrigger>
                      <SelectContent>
                        {categories[selectedCategory].map((subcategory) => (
                          <SelectItem key={subcategory} value={subcategory}>
                            {subcategory}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
            )}
            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-700">Fiyat</label>
              <Controller
                name="price"
                control={control}
                rules={{ required: 'Price is required', min: 0 }}
                render={({ field }) => <Input type="number" step="0.01" {...field} />}
              />
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsEditModalOpen(false)}>
                İptal
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? 'Kaydediliyor...' : 'Değişiklikleri Kaydet'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </Card>
  )
}