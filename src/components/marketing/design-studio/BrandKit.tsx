
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Palette, Settings } from 'lucide-react';

const BrandKit = () => {
  const [brandKit, setBrandKit] = useState({
    primaryColor: '#3B82F6',
    secondaryColor: '#10B981',
    font: 'Inter',
    logo: null
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Palette className="text-green-600" size={20} />
          Brand Kit
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="font-semibold">Brand Colors</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div 
                  className="w-12 h-12 rounded-lg border"
                  style={{ backgroundColor: brandKit.primaryColor }}
                ></div>
                <div>
                  <p className="font-medium">Primary Color</p>
                  <p className="text-sm text-gray-600">{brandKit.primaryColor}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div 
                  className="w-12 h-12 rounded-lg border"
                  style={{ backgroundColor: brandKit.secondaryColor }}
                ></div>
                <div>
                  <p className="font-medium">Secondary Color</p>
                  <p className="text-sm text-gray-600">{brandKit.secondaryColor}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold">Typography</h3>
            <div className="p-4 border rounded-lg">
              <p className="font-medium" style={{ fontFamily: brandKit.font }}>
                {brandKit.font}
              </p>
              <p className="text-sm text-gray-600">Primary font family</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-semibold">Saved Assets</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="border rounded-lg p-4 text-center">
              <div className="text-4xl mb-2">🏢</div>
              <p className="text-sm">Logo v1</p>
            </div>
            <div className="border rounded-lg p-4 text-center">
              <div className="text-4xl mb-2">📄</div>
              <p className="text-sm">Flyer Template</p>
            </div>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center text-gray-500">
              <div className="text-4xl mb-2">+</div>
              <p className="text-sm">Add Asset</p>
            </div>
          </div>
        </div>

        <Button className="w-full" variant="outline">
          <Settings className="mr-2 h-4 w-4" />
          Customize Brand Settings
        </Button>
      </CardContent>
    </Card>
  );
};

export default BrandKit;
