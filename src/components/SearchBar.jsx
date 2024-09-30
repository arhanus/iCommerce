"use client"

import { RxCross1 } from "react-icons/rx";
import { useSearchState } from '@/lib/store';
import { useEffect, useRef, useState } from 'react';
import Link from "next/link";

const SearchBar = () => {
    const { open, setOpen } = useSearchState();
    const containerRef = useRef(null);
    const resultsRef = useRef(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (containerRef.current) {
            if (open) {
                containerRef.current.style.maxHeight = '1000px'; // Yeterince büyük bir değer
                fetchProducts();
            } else {
                containerRef.current.style.maxHeight = '0px';
            }
        }
    }, [open]);

    useEffect(() => {
        if (open && containerRef.current && resultsRef.current) {
            const inputHeight = 58; // Input ve çarpı butonunun yaklaşık yüksekliği
            const resultsHeight = resultsRef.current.scrollHeight;
            containerRef.current.style.maxHeight = `${inputHeight + resultsHeight}px`;
        }
    }, [filteredProducts, open]);

    const fetchProducts = async () => {
        if (products.length > 0) return;
        setIsLoading(true);
        try {
            const response = await fetch('http://localhost:5254/api/Product/get-products');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setProducts(data);
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (searchTerm === '') {
            setFilteredProducts([]);
            return;
        }
        const filtered = products.filter(product =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredProducts(filtered);
    }, [searchTerm, products]);

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    return (
        <div
            ref={containerRef}
            className={`w-full bg-white border-b-[1px] fixed mt-[58px] sm:mt-[66px] z-20 overflow-hidden transition-all duration-300 ease-in-out`}
            style={{ maxHeight: '0px' }}
        >
            <div className="lg:w-2/3 w-full mx-auto px-6 lg:px-0 py-4 bg-white">
                <div className="flex flex-col">
                    <div className="flex justify-between items-center mb-4">
                        <input 
                            type="text" 
                            className="outline-none w-full" 
                            placeholder="Ara" 
                            value={searchTerm}
                            onChange={handleSearch}
                        />
                        <button 
                            onClick={() => setOpen(false)} 
                            className="hover:bg-zinc-100 duration-150 rounded-full p-1 ml-2"
                        >
                            <RxCross1 size={20} />
                        </button>
                    </div>
                    <div ref={resultsRef} className="overflow-y-auto max-h-64">
                        {isLoading ? (
                            <p>Yükleniyor...</p>
                        ) : (
                            searchTerm && (
                                <ul>
                                    {filteredProducts.length > 0 ? (
                                        filteredProducts.map(product => (
                                            <li key={product.id} className="py-2 border-b last:border-b-0">
                                                <Link prefetch={false} href={`/${product.id}`} className="block hover:bg-gray-100 px-2 py-1 rounded">
                                                    {product.name}
                                                </Link>
                                            </li>
                                        ))
                                    ) : (
                                        <li className="py-2">Sonuç bulunamadı</li>
                                    )}
                                </ul>
                            )
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchBar;