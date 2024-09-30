import { Button } from "@/components/ui/button"

const notFound = () => {
  return (
    <div className="flex flex-col items-center mt-32 gap-8"><h1>Aradığınız Sayfaya Ulaşılamıyor</h1><Button><a  href="/">Ana Sayfaya Dön</a></Button></div>
  )
}

export default notFound