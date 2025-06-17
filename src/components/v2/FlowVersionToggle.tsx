
import React from 'react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Sparkles, Settings } from 'lucide-react';

interface FlowVersionToggleProps {
  useV2: boolean;
  onToggle: (useV2: boolean) => void;
}

export const FlowVersionToggle: React.FC<FlowVersionToggleProps> = ({ useV2, onToggle }) => {
  return (
    <Card className="mb-6 border-2 border-dashed border-gray-300">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${useV2 ? 'bg-purple-100' : 'bg-gray-100'}`}>
              {useV2 ? <Sparkles className="w-4 h-4 text-purple-600" /> : <Settings className="w-4 h-4 text-gray-600" />}
            </div>
            <div>
              <div className="font-medium">
                {useV2 ? 'UX Optimized Version' : 'Original Version'}
              </div>
              <div className="text-sm text-gray-600">
                {useV2 ? 'Simplified flow with improved user experience' : 'Current production implementation'}
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <Label htmlFor="version-toggle" className="text-sm font-medium">
              V2 UX Flow
            </Label>
            <Switch
              id="version-toggle"
              checked={useV2}
              onCheckedChange={onToggle}
            />
          </div>
        </div>
        
        {useV2 && (
          <div className="mt-3 p-3 bg-purple-50 rounded-lg border border-purple-200">
            <div className="text-sm text-purple-800">
              <strong>UX Improvements:</strong>
              <ul className="mt-1 list-disc list-inside space-y-1">
                <li>Simplified 2-step decision process</li>
                <li>Clear trust-building elements</li>
                <li>Better information hierarchy</li>
                <li>Improved user mental models</li>
                <li>Reduced cognitive load</li>
              </ul>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
