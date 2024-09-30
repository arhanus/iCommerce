"use client"
import { useUser } from '@clerk/nextjs'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useForm, Controller } from 'react-hook-form'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const categories = {
  Giyim: ['Kıyafet', 'Pantolon', 'Ayakkabı'],
  Kozmetik: ['Cilt Bakım', 'Parfüm', 'Makyaj'],
  'Ev Eşyaları': ['Koltuk', 'Masa', 'Dolap'],
  Elektronik: ['Telefon', 'Bilgisayar', 'Çevre Birimleri']
}

const makeUrlFriendly = (str) => {
  const trMap = {
    'ç': 'c', 'ğ': 'g', 'ı': 'i', 'ö': 'o', 'ş': 's', 'ü': 'u',
    'Ç': 'C', 'Ğ': 'G', 'İ': 'I', 'Ö': 'O', 'Ş': 'S', 'Ü': 'U'
  };

  return str
    .replace(/[çğıöşüÇĞİÖŞÜ]/g, (char) => trMap[char] || char)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export default function CreateProduct() {
  const { user } = useUser()
  const [loading, setLoading] = useState(false)
  const [subcategories, setSubcategories] = useState([])
  const router = useRouter()

  const { control, handleSubmit, watch, setValue, formState: { errors } } = useForm({
    defaultValues: {
      name: '',
      price: '',
      category: '',
      subcategory: '',
      description: '',
      createdBy: user.username
    }
  })

  const watchCategory = watch('category')

  useEffect(() => {
    if (watchCategory) {
      setSubcategories(categories[watchCategory] || [])
      setValue('subcategory', '')
    }
  }, [watchCategory, setValue])

  const onSubmit = async (data) => {
    setLoading(true)
    
    const urlFriendlyCategory = makeUrlFriendly(data.category)
    const urlFriendlySubcategory = makeUrlFriendly(data.subcategory)

    try {
      const response = await fetch('http://localhost:5254/api/Product/save-product', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          category: urlFriendlyCategory,
          subCategory: urlFriendlySubcategory, 
        }),
      })

      if (response.ok) {
        router.push('/')
      } else {
        throw new Error('Ürün kaydedilemedi')
      }
    } catch (error) {
      console.error('Ürün kaydetme hatası:', error)
      alert('Ürün kaydedilirken bir hata oluştu')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto mt-12">
      <CardHeader>
        <CardTitle>Yeni Ürün Oluştur</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Ürün Adı</label>
            <Controller
              name="name"
              control={control}
              rules={{ required: 'Ürün adı gereklidir' }}
              render={({ field }) => <Input {...field} />}
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
          </div>

          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700">Fiyat</label>
            <Controller
              name="price"
              control={control}
              rules={{ 
                required: 'Fiyat gereklidir',
                min: { value: 0, message: 'Fiyat 0 veya daha büyük olmalıdır' }
              }}
              render={({ field }) => <Input type="number" step="0.01" {...field} />}
            />
            {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>}
          </div>

          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">Kategori</label>
            <Controller
              name="category"
              control={control}
              rules={{ required: 'Kategori seçimi gereklidir' }}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Kategori seçin" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.keys(categories).map((category) => (
                      <SelectItem key={category} value={category}>{category}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>}
          </div>

          {watchCategory && (
            <div>
              <label htmlFor="subcategory" className="block text-sm font-medium text-gray-700">Alt Kategori</label>
              <Controller
                name="subcategory"
                control={control}
                rules={{ required: 'Alt kategori seçimi gereklidir' }}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Alt kategori seçin" />
                    </SelectTrigger>
                    <SelectContent>
                      {subcategories.map((subcategory) => (
                        <SelectItem key={subcategory} value={subcategory}>{subcategory}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.subcategory && <p className="text-red-500 text-sm mt-1">{errors.subcategory.message}</p>}
            </div>
          )}

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Açıklama</label>
            <Controller
              name="description"
              control={control}
              render={({ field }) => <Textarea {...field} rows={4} />}
            />
          </div>

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? 'Kaydediliyor...' : 'Ürünü Kaydet'}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}