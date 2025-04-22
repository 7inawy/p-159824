
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Search, Filter, Plus, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useCustomers } from "@/hooks/useCustomers";
import AddCustomerModal from "@/components/dashboard/customers/AddCustomerModal";
import { formatDate } from "@/lib/utils";

const Customers: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  
  const { 
    customers, 
    isLoading, 
    error, 
    fetchCustomers 
  } = useCustomers();

  const filteredCustomers = customers.filter(customer => 
    (customer.name && customer.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (customer.phone && customer.phone.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center">
          <Users className="w-6 h-6 text-[#F97415] mr-2" />
          <h1 className="text-2xl font-bold">العملاء</h1>
        </div>
        <Button 
          className="bg-[#F97415] hover:bg-[#F97415]/90"
          onClick={() => setIsAddModalOpen(true)}
        >
          <Plus className="w-4 h-4 mr-2" />
          إضافة عميل
        </Button>
      </div>

      {/* Search and Filter Bar */}
      <Card className="border shadow-sm">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute right-3 top-3 text-gray-400 w-5 h-5" />
              <Input 
                placeholder="بحث عن عميل..." 
                className="pl-3 pr-10"
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                <span>تصفية</span>
              </Button>
              <Button variant="outline">
                تصدير العملاء
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Loading state */}
      {isLoading && (
        <div className="flex justify-center items-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-[#F97415]" />
          <span className="mr-2 text-lg">جاري تحميل العملاء...</span>
        </div>
      )}

      {/* Error state */}
      {error && !isLoading && (
        <div className="bg-red-50 p-4 rounded-md text-red-800 text-center">
          <p>{error}</p>
          <Button 
            variant="outline" 
            className="mt-2" 
            onClick={fetchCustomers}
          >
            إعادة المحاولة
          </Button>
        </div>
      )}

      {/* Empty state */}
      {!isLoading && !error && customers.length === 0 && (
        <div className="text-center py-12">
          <Users className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <h3 className="text-lg font-medium">لا يوجد عملاء</h3>
          <p className="text-gray-500 mb-4">قم بإضافة عميل جديد لعرضه هنا</p>
          <Button 
            className="bg-[#F97415] hover:bg-[#F97415]/90"
            onClick={() => setIsAddModalOpen(true)}
          >
            <Plus className="w-4 h-4 mr-2" />
            إضافة عميل جديد
          </Button>
        </div>
      )}

      {/* Customers Table */}
      {!isLoading && !error && filteredCustomers.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="py-2 text-right text-sm font-semibold">العميل</th>
                <th className="py-2 text-right text-sm font-semibold">البريد الإلكتروني</th>
                <th className="py-2 text-right text-sm font-semibold">رقم الهاتف</th>
                <th className="py-2 text-right text-sm font-semibold">عدد الطلبات</th>
                <th className="py-2 text-right text-sm font-semibold">إجمالي المشتريات</th>
                <th className="py-2 text-right text-sm font-semibold">آخر طلب</th>
              </tr>
            </thead>
            <tbody>
              {filteredCustomers.map((customer) => (
                <tr key={customer.id} className="hover:bg-gray-50 transition-colors cursor-pointer border-b">
                  <td className="py-3 text-sm font-medium">{customer.name || customer.email}</td>
                  <td className="py-3 text-sm">{customer.email}</td>
                  <td className="py-3 text-sm">{customer.phone || "-"}</td>
                  <td className="py-3 text-sm">{customer.order_count}</td>
                  <td className="py-3 text-sm font-semibold">{customer.total_spent} ريال</td>
                  <td className="py-3 text-sm">{customer.last_order ? formatDate(customer.last_order) : "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Add Customer Modal */}
      <AddCustomerModal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)}
        onCustomerAdded={fetchCustomers}
      />
    </div>
  );
};

export default Customers;
