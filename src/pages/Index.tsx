
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { HeartPulse, Activity, Info } from 'lucide-react';
import HealthForm from '@/components/HealthForm';
import HealthHeader from '@/components/HealthHeader';

const Index = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-gray-50">
      <HealthHeader />
      <main className="container mx-auto py-6 px-4 md:px-6">
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Health Risk Predictor</h1>
          <p className="text-gray-600 md:max-w-2xl mx-auto">
            Assess your risk for diabetes, hypertension, and heart disease using advanced machine learning models.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-blue-50 border-blue-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-blue-700 flex items-center gap-2">
                <HeartPulse className="h-5 w-5" />
                Heart Disease
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Predict your risk of developing cardiovascular conditions
              </p>
            </CardContent>
          </Card>

          <Card className="bg-purple-50 border-purple-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-purple-700 flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Diabetes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Assess your likelihood of developing diabetes based on health factors
              </p>
            </CardContent>
          </Card>

          <Card className="bg-orange-50 border-orange-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-orange-700 flex items-center gap-2">
                <Info className="h-5 w-5" />
                Hypertension
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Evaluate your risk of high blood pressure conditions
              </p>
            </CardContent>
          </Card>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <HealthForm />
        </div>
      </main>
    </div>
  );
};

export default Index;
