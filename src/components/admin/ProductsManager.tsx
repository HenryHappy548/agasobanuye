import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Plus, Trash2, Edit2, Save, X, Search, Download, Loader2, Zap } from "lucide-react";

interface Product {
  id: string;
  name: string;
  price: number;
  original_price: number | null;
  affiliate_link: string;
  image_url: string;
  category: string;
  is_active: boolean;
  display_order: number;
}

interface ApiProduct {
  product_id: string;
  product_title: string;
  sale_price_usd: number;
  original_price_usd: number;
  sale_price_rwf: number;
  original_price_rwf: number;
  product_main_image_url: string;
  promotion_link: string;
  commission_rate: string;
  discount: string;
  category_name: string;
}

const CATEGORIES = [
  { value: "general", label: "General" },
  { value: "electronics", label: "Electronics" },
  { value: "accessories", label: "Accessories" },
  { value: "gaming", label: "Gaming" },
  { value: "office", label: "Office" },
];

// Format RWF currency
const formatRWF = (amount: number) => {
  return new Intl.NumberFormat('rw-RW', {
    style: 'currency',
    currency: 'RWF',
    minimumFractionDigits: 0,
  }).format(amount);
};

export const ProductsManager = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const { toast } = useToast();

  // API Search State
  const [searchKeyword, setSearchKeyword] = useState("");
  const [apiProducts, setApiProducts] = useState<ApiProduct[]>([]);
  const [searching, setSearching] = useState(false);
  const [importing, setImporting] = useState<string | null>(null);
  const [bulkImporting, setBulkImporting] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    original_price: "",
    affiliate_link: "",
    image_url: "",
    category: "general",
    display_order: "0",
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("display_order", { ascending: true });

    if (error) {
      toast({ title: "Error fetching products", variant: "destructive" });
    } else {
      setProducts(data || []);
    }
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const productData = {
      name: formData.name,
      price: parseFloat(formData.price),
      original_price: formData.original_price ? parseFloat(formData.original_price) : null,
      affiliate_link: formData.affiliate_link,
      image_url: formData.image_url,
      category: formData.category,
      display_order: parseInt(formData.display_order),
    };

    if (editingId) {
      const { error } = await supabase
        .from("products")
        .update(productData)
        .eq("id", editingId);

      if (error) {
        toast({ title: "Error updating product", variant: "destructive" });
      } else {
        toast({ title: "Product updated successfully" });
        setEditingId(null);
      }
    } else {
      const { error } = await supabase.from("products").insert(productData);

      if (error) {
        toast({ title: "Error adding product", variant: "destructive" });
      } else {
        toast({ title: "Product added successfully" });
      }
    }

    resetForm();
    fetchProducts();
  };

  const resetForm = () => {
    setFormData({
      name: "",
      price: "",
      original_price: "",
      affiliate_link: "",
      image_url: "",
      category: "general",
      display_order: "0",
    });
    setShowForm(false);
    setEditingId(null);
  };

  const handleEdit = (product: Product) => {
    setFormData({
      name: product.name,
      price: product.price.toString(),
      original_price: product.original_price?.toString() || "",
      affiliate_link: product.affiliate_link,
      image_url: product.image_url,
      category: product.category,
      display_order: product.display_order.toString(),
    });
    setEditingId(product.id);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    const { error } = await supabase.from("products").delete().eq("id", id);

    if (error) {
      toast({ title: "Error deleting product", variant: "destructive" });
    } else {
      toast({ title: "Product deleted successfully" });
      fetchProducts();
    }
  };

  const toggleActive = async (id: string, currentStatus: boolean) => {
    const { error } = await supabase
      .from("products")
      .update({ is_active: !currentStatus })
      .eq("id", id);

    if (error) {
      toast({ title: "Error updating status", variant: "destructive" });
    } else {
      fetchProducts();
    }
  };

  // API Search Functions
  const searchAliExpress = async () => {
    if (!searchKeyword.trim()) {
      toast({ title: "Please enter a search keyword", variant: "destructive" });
      return;
    }

    setSearching(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/aliexpress-api`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'search',
          keyword: searchKeyword,
          pageSize: 50,
        }),
      });

      const data = await response.json();
      
      if (data.error) {
        toast({ title: data.error, variant: "destructive" });
        return;
      }

      setApiProducts(data.products || []);
      
      if (!data.products?.length) {
        toast({ title: "No products found. Try different keywords.", variant: "destructive" });
      } else {
        toast({ title: `Found ${data.products.length} products (Rate: 1 USD = ${data.usd_to_rwf_rate} RWF)` });
      }
    } catch (error) {
      console.error('Search error:', error);
      toast({ title: "Error searching products", variant: "destructive" });
    } finally {
      setSearching(false);
    }
  };

  const importProduct = async (apiProduct: ApiProduct) => {
    setImporting(apiProduct.product_id);
    
    try {
      const imageUrl = apiProduct.product_main_image_url?.replace(/_\d+x\d+\./, '_800x800.') || apiProduct.product_main_image_url;

      const productData = {
        name: apiProduct.product_title,
        price: apiProduct.sale_price_rwf,
        original_price: apiProduct.original_price_rwf > apiProduct.sale_price_rwf ? apiProduct.original_price_rwf : null,
        affiliate_link: apiProduct.promotion_link,
        image_url: imageUrl,
        category: mapCategory(apiProduct.category_name),
        display_order: products.length * 1000,
        is_active: true,
      };

      const { error } = await supabase.from("products").insert(productData);

      if (error) {
        toast({ title: "Error importing product", variant: "destructive" });
      } else {
        toast({ title: `Imported! You earn ${apiProduct.commission_rate} commission` });
        fetchProducts();
        setApiProducts(prev => prev.filter(p => p.product_id !== apiProduct.product_id));
      }
    } catch (error) {
      console.error('Import error:', error);
      toast({ title: "Error importing product", variant: "destructive" });
    } finally {
      setImporting(null);
    }
  };

  const bulkImportProducts = async () => {
    setBulkImporting(true);
    try {
      const keywords = [
        "wireless mouse",
        "laptop stand",
        "phone accessories",
        "gaming headset",
        "keyboard",
        "webcam",
        "USB hub",
        "tablet stand",
        "earbuds",
        "power bank"
      ];

      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/aliexpress-api`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'bulk_import',
          keywords,
        }),
      });

      const data = await response.json();
      
      if (data.error) {
        toast({ title: data.error, variant: "destructive" });
      } else {
        toast({ title: `Successfully imported ${data.imported_count} products!` });
        fetchProducts();
      }
    } catch (error) {
      console.error('Bulk import error:', error);
      toast({ title: "Error bulk importing products", variant: "destructive" });
    } finally {
      setBulkImporting(false);
    }
  };

  const mapCategory = (categoryName: string): string => {
    const name = (categoryName || '').toLowerCase();
    if (name.includes('computer') || name.includes('office')) return 'office';
    if (name.includes('electronic') || name.includes('phone')) return 'electronics';
    if (name.includes('game') || name.includes('gaming')) return 'gaming';
    if (name.includes('accessor')) return 'accessories';
    return 'general';
  };

  if (loading) {
    return <div className="text-center py-8">Loading products...</div>;
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="products" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="products">My Products ({products.length})</TabsTrigger>
          <TabsTrigger value="api">AliExpress API</TabsTrigger>
        </TabsList>

        <TabsContent value="products" className="space-y-4">
          <div className="flex justify-between items-center flex-wrap gap-2">
            <h3 className="text-lg font-semibold">Products (Prices in RWF)</h3>
            <div className="flex gap-2">
              <Button onClick={bulkImportProducts} disabled={bulkImporting} variant="outline">
                {bulkImporting ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <Zap className="w-4 h-4 mr-2" />
                )}
                Auto-Import 100+ Products
              </Button>
              <Button onClick={() => setShowForm(!showForm)} variant={showForm ? "outline" : "default"}>
                {showForm ? <X className="w-4 h-4 mr-2" /> : <Plus className="w-4 h-4 mr-2" />}
                {showForm ? "Cancel" : "Add Manually"}
              </Button>
            </div>
          </div>

          {showForm && (
            <form onSubmit={handleSubmit} className="bg-muted/50 p-4 rounded-lg space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Product Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    placeholder="e.g., Wireless Mouse"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select value={formData.category} onValueChange={(v) => setFormData({ ...formData, category: v })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {CATEGORIES.map((cat) => (
                        <SelectItem key={cat.value} value={cat.value}>
                          {cat.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="price">Price (RWF) *</Label>
                  <Input
                    id="price"
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    required
                    placeholder="13500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="original_price">Original Price (RWF)</Label>
                  <Input
                    id="original_price"
                    type="number"
                    value={formData.original_price}
                    onChange={(e) => setFormData({ ...formData, original_price: e.target.value })}
                    placeholder="27000"
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="affiliate_link">Affiliate Link *</Label>
                  <Input
                    id="affiliate_link"
                    value={formData.affiliate_link}
                    onChange={(e) => setFormData({ ...formData, affiliate_link: e.target.value })}
                    required
                    placeholder="https://s.click.aliexpress.com/e/_xxxxx"
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="image_url">Image URL *</Label>
                  <Input
                    id="image_url"
                    value={formData.image_url}
                    onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                    required
                    placeholder="https://ae01.alicdn.com/kf/xxxxx.jpg"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="display_order">Display Order</Label>
                  <Input
                    id="display_order"
                    type="number"
                    value={formData.display_order}
                    onChange={(e) => setFormData({ ...formData, display_order: e.target.value })}
                    placeholder="0"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Button type="submit">
                  <Save className="w-4 h-4 mr-2" />
                  {editingId ? "Update Product" : "Add Product"}
                </Button>
                {editingId && (
                  <Button type="button" variant="outline" onClick={resetForm}>
                    Cancel Edit
                  </Button>
                )}
              </div>
            </form>
          )}

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Image</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Price (RWF)</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Active</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <img
                        src={product.image_url}
                        alt={product.name}
                        className="w-12 h-12 object-cover rounded"
                        loading="lazy"
                      />
                    </TableCell>
                    <TableCell className="font-medium max-w-[200px] truncate">{product.name}</TableCell>
                    <TableCell>
                      <div>
                        <span className="font-bold text-primary">{formatRWF(product.price)}</span>
                        {product.original_price && (
                          <span className="text-muted-foreground line-through ml-2 text-sm">
                            {formatRWF(product.original_price)}
                          </span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="capitalize">{product.category}</TableCell>
                    <TableCell>
                      <Switch
                        checked={product.is_active}
                        onCheckedChange={() => toggleActive(product.id, product.is_active)}
                      />
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={() => handleEdit(product)}>
                          <Edit2 className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="destructive" onClick={() => handleDelete(product.id)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {products.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                No products yet. Click "Auto-Import 100+ Products" to get started!
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="api" className="space-y-4">
          <div className="bg-muted/50 p-4 rounded-lg space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">Search AliExpress Products</h3>
                <p className="text-sm text-muted-foreground">
                  Search products and import them with affiliate links. You earn <span className="text-primary font-bold">7-8% commission</span> on each sale!
                </p>
              </div>
              <div className="text-right text-sm">
                <div className="text-muted-foreground">Exchange Rate:</div>
                <div className="font-bold">1 USD = 1,350 RWF</div>
              </div>
            </div>
            <div className="flex gap-2">
              <Input
                placeholder="Search keywords (e.g., wireless mouse, laptop stand)"
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && searchAliExpress()}
                className="flex-1"
              />
              <Button onClick={searchAliExpress} disabled={searching}>
                {searching ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <Search className="w-4 h-4 mr-2" />
                )}
                Search
              </Button>
            </div>
          </div>

          {apiProducts.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {apiProducts.map((product) => (
                <div key={product.product_id} className="bg-card border rounded-lg p-4 space-y-3">
                  <img
                    src={product.product_main_image_url?.replace(/_\d+x\d+\./, '_300x300.') || product.product_main_image_url}
                    alt={product.product_title}
                    className="w-full h-40 object-cover rounded"
                    loading="lazy"
                  />
                  <h4 className="font-medium text-sm line-clamp-2">{product.product_title}</h4>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-lg font-bold text-primary">
                        {formatRWF(product.sale_price_rwf)}
                      </div>
                      {product.original_price_rwf > product.sale_price_rwf && (
                        <div className="text-sm text-muted-foreground line-through">
                          {formatRWF(product.original_price_rwf)}
                        </div>
                      )}
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-muted-foreground">Commission</div>
                      <div className="text-sm font-bold text-green-500">{product.commission_rate}</div>
                    </div>
                  </div>
                  {product.discount && (
                    <div className="inline-block bg-destructive/20 text-destructive text-xs px-2 py-1 rounded">
                      {product.discount} OFF
                    </div>
                  )}
                  <Button 
                    className="w-full" 
                    size="sm"
                    onClick={() => importProduct(product)}
                    disabled={importing === product.product_id}
                  >
                    {importing === product.product_id ? (
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    ) : (
                      <Download className="w-4 h-4 mr-2" />
                    )}
                    Import Product
                  </Button>
                </div>
              ))}
            </div>
          )}

          {apiProducts.length === 0 && !searching && (
            <div className="text-center py-12 text-muted-foreground">
              <Search className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>Search for products to see results here</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};
