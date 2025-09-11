'use client';

import DashboardLayout from '@/components/DashboardLayout';
import ProtectedRoute from '@/components/ProtectedRoute';
import { Settings, Database, Shield, Info } from 'lucide-react';

export default function SettingsPage() {
  return (
    <ProtectedRoute>
      <DashboardLayout>
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
            <p className="text-gray-600">Manage your admin panel preferences</p>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* API Configuration */}
            <div className="bg-white shadow rounded-lg p-6">
              <div className="flex items-center mb-4">
                <Database className="h-6 w-6 text-indigo-600 mr-3" />
                <h3 className="text-lg font-medium text-gray-900">API Configuration</h3>
              </div>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700">API Base URL</label>
                  <input
                    type="text"
                    value={process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api'}
                    disabled
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-500 sm:text-sm"
                  />
                </div>
                <p className="text-sm text-gray-500">
                  Configure this in your environment variables
                </p>
              </div>
            </div>

            {/* Security Settings */}
            <div className="bg-white shadow rounded-lg p-6">
              <div className="flex items-center mb-4">
                <Shield className="h-6 w-6 text-green-600 mr-3" />
                <h3 className="text-lg font-medium text-gray-900">Security</h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">JWT Authentication</span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Enabled
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">Token Expiry</span>
                  <span className="text-sm text-gray-500">1 hour</span>
                </div>
              </div>
            </div>

            {/* System Information */}
            <div className="bg-white shadow rounded-lg p-6">
              <div className="flex items-center mb-4">
                <Info className="h-6 w-6 text-blue-600 mr-3" />
                <h3 className="text-lg font-medium text-gray-900">System Info</h3>
              </div>
              <div className="space-y-2 text-sm text-gray-600">
                <div>Admin Panel Version: 1.0.0</div>
                <div>Next.js Version: 15.5.2</div>
                <div>Database: MySQL (via Prisma)</div>
                <div>Authentication: JWT</div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white shadow rounded-lg p-6">
              <div className="flex items-center mb-4">
                <Settings className="h-6 w-6 text-purple-600 mr-3" />
                <h3 className="text-lg font-medium text-gray-900">Quick Actions</h3>
              </div>
              <div className="space-y-3">
                <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors">
                  Export Product Data
                </button>
                <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors">
                  Backup Database
                </button>
                <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors">
                  Clear Cache
                </button>
              </div>
            </div>
          </div>

          {/* Environment Variables Note */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex">
              <Info className="h-5 w-5 text-yellow-400 mr-3" />
              <div>
                <h3 className="text-sm font-medium text-yellow-800">Environment Configuration</h3>
                <p className="text-sm text-yellow-700 mt-1">
                  Make sure to set the following environment variables in your <code className="bg-yellow-100 px-1 py-0.5 rounded">.env.local</code> file:
                </p>
                <div className="mt-2 space-y-1">
                  <code className="block text-xs bg-yellow-100 px-2 py-1 rounded">NEXT_PUBLIC_API_URL=http://localhost:4000/api</code>
                  <code className="block text-xs bg-yellow-100 px-2 py-1 rounded">JWT_SECRET=your-secret-key</code>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}
