
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Package, 
  Search, 
  Plus,
  Filter,
  Grid3X3,
  List,
  Loader2
} from "lucide-react";
import AddProductModal from "@/components/dashboard/products/AddProductModal";
import { useProducts } from "@/hooks/useProducts";

const Products: React.FC = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const { 
    products, 
    isLoading, 
    error, 
    fetchProducts 
  } = useProducts();

  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (product.category && product.category.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center">
          <Package className="w-6 h-6 text-[#F97415] mr-2" />
          <h1 className="text-2xl font-bold">المنتجات</h1>
        </div>
        <Button 
          className="bg-[#F97415] hover:bg-[#F97415]/90"
          onClick={() => setIsAddModalOpen(true)}
        >
          <Plus className="w-4 h-4 mr-2" />
          إضافة منتج
        </Button>
      </div>

      {/* Search and Filter Bar */}
      <Card className="border shadow-sm">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute right-3 top-3 text-gray-400 w-5 h-5" />
              <Input 
                placeholder="بحث عن منتج..." 
                className="pl-3 pr-10"
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="flex-1 md:flex-none">
                <Filter className="w-4 h-4 mr-2" />
                <span>تصفية</span>
              </Button>
              <div className="flex border rounded-md overflow-hidden">
                <Button 
                  variant={viewMode === "grid" ? "default" : "ghost"} 
                  size="icon"
                  className={viewMode === "grid" ? "bg-[#F97415] text-white" : ""}
                  onClick={() => setViewMode("grid")}
                >
                  <Grid3X3 className="w-4 h-4" />
                </Button>
                <Button 
                  variant={viewMode === "list" ? "default" : "ghost"} 
                  size="icon"
                  className={viewMode === "list" ? "bg-[#F97415] text-white" : ""}
                  onClick={() => setViewMode("list")}
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Loading state */}
      {isLoading && (
        <div className="flex justify-center items-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-[#F97415]" />
          <span className="mr-2 text-lg">جاري تحميل المنتجات...</span>
        </div>
      )}

      {/* Error state */}
      {error && !isLoading && (
        <div className="bg-red-50 p-4 rounded-md text-red-800 text-center">
          <p>{error}</p>
          <Button 
            variant="outline" 
            className="mt-2" 
            onClick={fetchProducts}
          >
            إعادة المحاولة
          </Button>
        </div>
      )}

      {/* Empty state */}
      {!isLoading && !error && products.length === 0 && (
        <div className="text-center py-12">
          <Package className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <h3 className="text-lg font-medium">لا يوجد منتجات</h3>
          <p className="text-gray-500 mb-4">قم بإضافة منتجات لعرضها هنا</p>
          <Button 
            className="bg-[#F97415] hover:bg-[#F97415]/90"
            onClick={() => setIsAddModalOpen(true)}
          >
            <Plus className="w-4 h-4 mr-2" />
            إضافة منتج جديد
          </Button>
        </div>
      )}

      {/* Products Grid/List */}
      {!isLoading && !error && filteredProducts.length > 0 && (
        viewMode === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredProducts.map((product) => (
              <Card key={product.id} className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer">
                <div className="aspect-square bg-gray-100 flex items-center justify-center">
                  {product.image_url ? (
                    <img 
                      src={product.image_url} 
                      alt={product.name} 
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <Package className="h-16 w-16 text-gray-300" />
                  )}
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold">{product.name}</h3>
                  <div className="mt-2 flex justify-between items-center">
                    <span className="text-[#F97415] font-bold">{product.price} ريال</span>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      product.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {product.status === 'published' ? 'منشور' : 'مسودة'}
                    </span>
                  </div>
                  <div className="mt-2 text-sm text-gray-500">
                    <span>المخزون: {product.stock}</span> · <span>{product.category || 'بدون تصنيف'}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="py-2 text-right text-sm font-semibold">المنتج</th>
                  <th className="py-2 text-right text-sm font-semibold">السعر</th>
                  <th className="py-2 text-right text-sm font-semibold">الفئة</th>
                  <th className="py-2 text-right text-sm font-semibold">المخزون</th>
                  <th className="py-2 text-right text-sm font-semibold">الحالة</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50 transition-colors cursor-pointer border-b">
                    <td className="py-3">
                      <div className="flex items-center">
                        <div className="w-10 h-10 mr-3 rounded-md bg-gray-100 flex items-center justify-center overflow-hidden">
                          {product.image_url ? (
                            <img 
                              src={product.image_url} 
                              alt={product.name} 
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <Package className="h-5 w-5 text-gray-300" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium">{product.name}</p>
                          <p className="text-xs text-gray-500">#{product.id.substring(0, 8)}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 text-[#F97415] font-semibold">{product.price} ريال</td>
                    <td className="py-3">{product.category || 'بدون تصنيف'}</td>
                    <td className="py-3">{product.stock}</td>
                    <td className="py-3">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        product.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {product.status === 'published' ? 'منشور' : 'مسودة'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
      )}

      {/* Add Product Modal */}
      <AddProductModal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)}
        onProductAdded={fetchProducts}
      />
    </div>
  );
};

export default Products;
