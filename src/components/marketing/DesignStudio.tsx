
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import LogoGenerator from './design-studio/LogoGenerator';
import FlyerCreator from './design-studio/FlyerCreator';
import BrandKit from './design-studio/BrandKit';

const DesignStudio = () => {
  const [activeDesignTab, setActiveDesignTab] = useState('logo');

  return (
    <div className="space-y-6">
      <Tabs value={activeDesignTab} onValueChange={setActiveDesignTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="logo">AI Logo Generator</TabsTrigger>
          <TabsTrigger value="flyer">Flyer Creator</TabsTrigger>
          <TabsTrigger value="brand">Brand Kit</TabsTrigger>
        </TabsList>

        <TabsContent value="logo" className="space-y-6">
          <LogoGenerator />
        </TabsContent>

        <TabsContent value="flyer" className="space-y-6">
          <FlyerCreator />
        </TabsContent>

        <TabsContent value="brand" className="space-y-6">
          <BrandKit />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DesignStudio;
