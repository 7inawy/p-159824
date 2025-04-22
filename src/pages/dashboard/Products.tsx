
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Package, 
  Search, 
  Plus,
  Filter,
  Grid3X3,
  List
} from "lucide-react";

const Products: React.FC = () => {
  // Sample products data - in a real app, this would come from API/database
  const products = [
    { 
      id: "PRD1001", 
      name: "قميص قطني", 
      image: "https://placehold.co/100?text=👕",
      price: "١٢٠ ريال", 
      category: "ملابس", 
      stock: 25, 
      status: "published" 
    },
    { 
      id: "PRD1002", 
      name: "بنطلون جينز", 
      image: "https://placehold.co/100?text=👖",
      price: "١٥٠ ريال", 
      category: "ملابس", 
      stock: 18, 
      status: "published" 
    },
    { 
      id: "PRD1003", 
      name: "حذاء رياضي", 
      image: "https://placehold.co/100?text=👟",
      price: "٢٥٠ ريال", 
      category: "أحذية", 
      stock: 10, 
      status: "published" 
    },
    { 
      id: "PRD1004", 
      name: "ساعة يد", 
      image: "https://placehold.co/100?text=⌚",
      price: "٣٥٠ ريال", 
      category: "إكسسوارات", 
      stock: 7, 
      status: "published" 
    },
    { 
      id: "PRD1005", 
      name: "حقيبة جلدية", 
      image: "https://placehold.co/100?text=👜",
      price: "٢٠٠ ريال", 
      category: "حقائب", 
      stock: 12, 
      status: "published" 
    },
    { 
      id: "PRD1006", 
      name: "نظارة شمسية", 
      image: "https://placehold.co/100?text=🕶️",
      price: "١٨٠ ريال", 
      category: "إكسسوارات", 
      stock: 15, 
      status: "draft" 
    }
  ];

  // State for view mode (grid or list)
  const [viewMode, setViewMode] = React.useState<"grid" | "list">("grid");

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center">
          <Package className="w-6 h-6 text-[#F97415] mr-2" />
          <h1 className="text-2xl font-bold">المنتجات</h1>
        </div>
        <Button className="bg-[#F97415] hover:bg-[#F97415]/90">
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

      {/* Products Grid/List */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((product) => (
            <Card key={product.id} className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer">
              <div className="aspect-square bg-gray-100 flex items-center justify-center">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="object-cover w-full h-full"
                />
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold">{product.name}</h3>
                <div className="mt-2 flex justify-between items-center">
                  <span className="text-[#F97415] font-bold">{product.price}</span>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    product.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {product.status === 'published' ? 'منشور' : 'مسودة'}
                  </span>
                </div>
                <div className="mt-2 text-sm text-gray-500">
                  <span>المخزون: {product.stock}</span> · <span>{product.category}</span>
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
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50 transition-colors cursor-pointer border-b">
                  <td className="py-3">
                    <div className="flex items-center">
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-10 h-10 mr-3 rounded-md object-cover"
                      />
                      <div>
                        <p className="font-medium">{product.name}</p>
                        <p className="text-xs text-gray-500">#{product.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 text-[#F97415] font-semibold">{product.price}</td>
                  <td className="py-3">{product.category}</td>
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
      )}
    </div>
  );
};

export default Products;
