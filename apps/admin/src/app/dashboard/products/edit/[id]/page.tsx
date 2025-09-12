'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Image from 'next/image';
import DashboardLayout from '@/components/DashboardLayout';
import ProtectedRoute from '@/components/ProtectedRoute';
import { apiClient } from '@/lib/api';
import { Category } from '@/types';
import { getImageUrl } from '@/lib/imageUtils';
import { ArrowLeft, Save, Plus, X, Trash2 } from 'lucide-react';

export default function EditProductPage() {
  const [formData, setFormData] = useState({
    name: '',
    category: '' as Category | '',
    description: '',
    price: '',
    stock: '',
    images: [] as string[],
  });
  const [specifications, setSpecifications] = useState<string[]>(['', '', '', '']); // Start with 4 empty specs
  const [newImageUrl, setNewImageUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState('');
  
  const router = useRouter();
  const params = useParams();
  const productId = params.id as string;

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsLoading(true);
    try {
      const { uploadMultipleImages } = await import('@/lib/upload');
      const imageUrls = await uploadMultipleImages(Array.from(files));
      
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, ...imageUrls.filter(url => !prev.images.includes(url))]
      }));
      e.target.value = '';
    } catch (err) {
      setError('Failed to upload selected file(s).');
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch existing product data
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setIsFetching(true);
        setError('');
        
        const product = await apiClient.getProduct(productId);
        
        setFormData({
          name: product.name,
          category: product.category,
          description: product.description,
          price: product.price.toString(),
          stock: (product.stock ?? 0).toString(), // Fix: Handle optional stock field
          images: product.images || [],
        });

        // Parse existing description into specifications
        if (product.description) {
          const existingSpecs = product.description.split(',').map(spec => spec.trim());
          // Ensure we have at least 4 columns, pad with empty strings if needed
          const paddedSpecs = [...existingSpecs, '', '', '', ''].slice(0, Math.max(4, existingSpecs.length));
          setSpecifications(paddedSpecs);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch product');
      } finally {
        setIsFetching(false);
      }
    };

    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSpecificationChange = (index: number, value: string) => {
    const newSpecs = [...specifications];
    newSpecs[index] = value;
    setSpecifications(newSpecs);
  };

  const addSpecificationColumn = () => {
    setSpecifications([...specifications, '']);
  };

  const removeSpecificationColumn = (index: number) => {
    if (specifications.length > 1) {
      const newSpecs = specifications.filter((_, i) => i !== index);
      setSpecifications(newSpecs);
    }
  };

  const addImage = () => {
    const trimmed = newImageUrl.trim();
    if (!trimmed || formData.images.includes(trimmed)) return;
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, trimmed]
    }));
    setNewImageUrl('');
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.category || !formData.price) {
      setError('Please fill in all required fields');
      return;
    }

    // Check if at least one specification is filled
    const filledSpecs = specifications.filter(spec => spec.trim() !== '');
    if (filledSpecs.length === 0) {
      setError('Please add at least one product specification');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // Combine specifications into description (comma-separated)
      const description = filledSpecs.join(', ');

      const productData = {
        name: formData.name,
        category: formData.category as Category,
        description: description,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock) || 0,
        images: formData.images,
      };

      await apiClient.updateProduct(productId, productData);
      router.push('/dashboard/products');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update product');
    } finally {
      setIsLoading(false);
    }
  };

  if (isFetching) {
    return (
      <ProtectedRoute>
        <DashboardLayout>
          <div className="flex justify-center items-center py-12">
            <div className="text-lg text-gray-600">Loading product...</div>
          </div>
        </DashboardLayout>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <DashboardLayout>
        <div className="space-y-6">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => router.back()}
              className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Edit Product</h1>
              <p className="text-gray-600">Update product information</p>
            </div>
          </div>

          <div className="bg-white shadow rounded-lg">
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
                  {error}
                </div>
              )}

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Product Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="Enter product name"
                  />
                </div>

                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                    Category *
                  </label>
                  <select
                    id="category"
                    name="category"
                    required
                    value={formData.category}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  >
                    <option value="">Select a category</option>
                    <option value="Laptops">Laptops</option>
                    <option value="Desktops">Desktops</option>
                    <option value="Accessories">Accessories</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                    Price *
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 sm:text-sm">Rs.</span>
                    </div>
                    <input
                      type="number"
                      id="price"
                      name="price"
                      required
                      min="0"
                      step="0.01"
                      value={formData.price}
                      onChange={handleInputChange}
                      className="pl-12 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      placeholder="0.00"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="stock" className="block text-sm font-medium text-gray-700">
                    Stock Quantity
                  </label>
                  <input
                    type="number"
                    id="stock"
                    name="stock"
                    min="0"
                    value={formData.stock}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="0"
                  />
                </div>

                {/* New Specifications Section */}
                <div className="sm:col-span-2">
                  <div className="flex items-center justify-between mb-3">
                    <label className="block text-sm font-medium text-gray-700">
                      Product Specifications *
                    </label>
                    <button
                      type="button"
                      onClick={addSpecificationColumn}
                      className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    >
                      <Plus className="h-4 w-4 mr-1" />
                      Add Spec
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    {specifications.map((spec, index) => (
                      <div key={index} className="relative group">
                        <input
                          type="text"
                          value={spec}
                          onChange={(e) => handleSpecificationChange(index, e.target.value)}
                          placeholder={`Specification ${index + 1}`}
                          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                        {specifications.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeSpecificationColumn(index)}
                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                            title="Remove specification"
                          >
                            <Trash2 className="h-3 w-3" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                  <p className="mt-2 text-sm text-gray-500">
                    Each specification will be displayed on a separate line. Add as many as you need!
                  </p>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Product Images
                  </label>
                  <div className="space-y-3">
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        value={newImageUrl}
                        onChange={(e) => setNewImageUrl(e.target.value)}
                        placeholder="Enter image URL or data URL"
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                      <button
                        type="button"
                        onClick={addImage}
                        className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="flex items-center gap-3">
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleFileUpload}
                        className="block w-full text-sm text-gray-700 file:mr-3 file:py-2 file:px-3 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                      />
                    </div>
                    
                    {formData.images.length > 0 && (
                      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
                        {formData.images.map((image, index) => (
                          <div key={index} className="relative group">
                            {/^(https?:\/\/|\/)/i.test(image) ? (
                              <Image
                                src={getImageUrl(image)}
                                alt={`Product image ${index + 1}`}
                                width={96}
                                height={96}
                                className="w-full h-24 object-cover rounded-lg border border-gray-200"
                                unoptimized
                                onError={() => {
                                  // Next/Image doesn't allow changing src directly here; fallback handled by native img branch
                                }}
                              />
                            ) : (
                              <img
                                src={getImageUrl(image)}
                                alt={`Product image ${index + 1}`}
                                width={96}
                                height={96}
                                className="w-full h-24 object-cover rounded-lg border border-gray-200"
                                onError={(e) => {
                                  const target = e.currentTarget;
                                  target.src = '/placeholder-image.svg';
                                }}
                              />
                            )}
                            <button
                              type="button"
                              onClick={() => removeImage(index)}
                              className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => router.back()}
                  className="px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Save className="h-4 w-4 mr-2" />
                  {isLoading ? 'Updating...' : 'Update Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}
