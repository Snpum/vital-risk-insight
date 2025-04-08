
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Check, AlertCircle, Info, HeartPulse, Activity } from 'lucide-react';
import HealthHeader from '@/components/HealthHeader';

type ModelType = 'xgboost' | 'randomForest' | 'decisionTree' | 'svm' | 'naiveBayes';
type PredictionResults = Record<string, Record<ModelType, number>>;

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [predictionResults, setPredictionResults] = useState<PredictionResults | null>(null);
  const [selectedCondition, setSelectedCondition] = useState('diabetes');
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    if (!location.state?.formData) {
      // If no form data, redirect back to form
      navigate('/');
      return;
    }
    
    const formData = location.state.formData;
    
    // Simulate machine learning predictions
    // In a real app, this would be an API call to a backend
    setTimeout(() => {
      const simulatedResults: PredictionResults = {
        diabetes: {
          xgboost: calculateRisk('diabetes', 'xgboost', formData),
          randomForest: calculateRisk('diabetes', 'randomForest', formData),
          decisionTree: calculateRisk('diabetes', 'decisionTree', formData),
          svm: calculateRisk('diabetes', 'svm', formData),
          naiveBayes: calculateRisk('diabetes', 'naiveBayes', formData)
        },
        hypertension: {
          xgboost: calculateRisk('hypertension', 'xgboost', formData),
          randomForest: calculateRisk('hypertension', 'randomForest', formData),
          decisionTree: calculateRisk('hypertension', 'decisionTree', formData),
          svm: calculateRisk('hypertension', 'svm', formData),
          naiveBayes: calculateRisk('hypertension', 'naiveBayes', formData)
        },
        heartDisease: {
          xgboost: calculateRisk('heartDisease', 'xgboost', formData),
          randomForest: calculateRisk('heartDisease', 'randomForest', formData),
          decisionTree: calculateRisk('heartDisease', 'decisionTree', formData),
          svm: calculateRisk('heartDisease', 'svm', formData),
          naiveBayes: calculateRisk('heartDisease', 'naiveBayes', formData)
        }
      };
      
      setPredictionResults(simulatedResults);
      setIsLoading(false);
    }, 1500);
  }, [location.state, navigate]);
  
  // Helper function to simulate ML model risk predictions based on input factors
  const calculateRisk = (condition: string, model: string, data: any): number => {
    // This is a simple simulation of ML predictions based on known risk factors
    let baseRisk = 0;
    const randomFactor = Math.random() * 0.2 - 0.1; // +/- 10% random variation
    
    // Factor: Age
    if (data.age > 50) baseRisk += 0.15;
    else if (data.age > 40) baseRisk += 0.1;
    else if (data.age > 30) baseRisk += 0.05;
    
    // Factor: BMI
    if (data.bmi > 30) baseRisk += 0.2;  // Obese
    else if (data.bmi > 25) baseRisk += 0.1;  // Overweight
    
    // Factor: Blood pressure
    if (data.bloodPressureSystolic > 140 || data.bloodPressureDiastolic > 90) baseRisk += 0.2;
    else if (data.bloodPressureSystolic > 130 || data.bloodPressureDiastolic > 85) baseRisk += 0.1;
    
    // Factor: Cholesterol
    if (data.cholesterolLevel > 240) baseRisk += 0.15;
    else if (data.cholesterolLevel > 200) baseRisk += 0.1;
    
    // Factor: Glucose
    if (data.glucoseLevel > 126) baseRisk += 0.2;
    else if (data.glucoseLevel > 100) baseRisk += 0.1;
    
    // Factor: Smoking
    if (data.smokingStatus === 'regular') baseRisk += 0.2;
    else if (data.smokingStatus === 'occasional') baseRisk += 0.1;
    else if (data.smokingStatus === 'former') baseRisk += 0.05;
    
    // Factor: Alcohol
    if (data.alcoholConsumption === 'heavy') baseRisk += 0.15;
    else if (data.alcoholConsumption === 'moderate') baseRisk += 0.05;
    
    // Factor: Physical activity
    if (data.physicalActivity === 'sedentary') baseRisk += 0.15;
    else if (data.physicalActivity === 'light') baseRisk += 0.05;
    else if (data.physicalActivity === 'vigorous') baseRisk -= 0.05;
    
    // Factor: Family history
    if (data.familyHistory === condition || data.familyHistory === 'multiple') baseRisk += 0.25;
    
    // Different models have different biases in this simulation
    let modelFactor = 1.0;
    switch (model) {
      case 'xgboost': modelFactor = 1.0; break;
      case 'randomForest': modelFactor = 0.95; break;
      case 'decisionTree': modelFactor = 1.1; break;
      case 'svm': modelFactor = 0.9; break;
      case 'naiveBayes': modelFactor = 1.05; break;
    }
    
    // Condition-specific adjustments
    if (condition === 'diabetes' && data.glucoseLevel > 110) baseRisk += 0.15;
    if (condition === 'hypertension' && (data.bloodPressureSystolic > 130 || data.bloodPressureDiastolic > 85)) baseRisk += 0.15;
    if (condition === 'heartDisease' && (data.cholesterolLevel > 220 || data.smokingStatus === 'regular')) baseRisk += 0.15;
    
    // Calculate final risk score
    let risk = (baseRisk * modelFactor) + randomFactor;
    risk = Math.max(0.05, Math.min(0.95, risk)); // Clamp between 5% and 95%
    
    return parseFloat((risk * 100).toFixed(1)); // Return as percentage with 1 decimal
  };
  
  // Prepare chart data
  const getChartData = (condition: string) => {
    if (!predictionResults) return [];
    
    return [
      { name: 'XGBoost', value: predictionResults[condition].xgboost },
      { name: 'Random Forest', value: predictionResults[condition].randomForest },
      { name: 'Decision Tree', value: predictionResults[condition].decisionTree },
      { name: 'SVM', value: predictionResults[condition].svm },
      { name: 'Naive Bayes', value: predictionResults[condition].naiveBayes },
    ];
  };
  
  // Get average risk across all models
  const getAverageRisk = (condition: string) => {
    if (!predictionResults) return 0;
    
    const values = Object.values(predictionResults[condition]);
    const sum = values.reduce((acc, val) => acc + val, 0);
    return (sum / values.length).toFixed(1);
  };
  
  // Determine risk level text and color
  const getRiskLevel = (riskPercentage: number) => {
    if (riskPercentage < 20) return { level: 'Low Risk', color: 'text-green-600', bg: 'bg-green-100' };
    if (riskPercentage < 50) return { level: 'Moderate Risk', color: 'text-yellow-600', bg: 'bg-yellow-100' };
    return { level: 'High Risk', color: 'text-red-600', bg: 'bg-red-100' };
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <HealthHeader />
      <main className="container mx-auto py-6 px-4 md:px-6">
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Health Risk Assessment Results</h1>
          <p className="text-gray-600 md:max-w-2xl mx-auto">
            Review your predicted risk factors based on multiple machine learning models
          </p>
        </div>
        
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-4"></div>
            <p className="text-gray-600">Analyzing your health data...</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card className={`border-l-4 ${
                parseFloat(getAverageRisk('diabetes')) < 30 ? 'border-l-green-500' : 
                parseFloat(getAverageRisk('diabetes')) < 60 ? 'border-l-yellow-500' : 
                'border-l-red-500'}`}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-purple-700 flex items-center gap-2">
                    <Activity className="h-5 w-5" />
                    Diabetes Risk
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className={`text-2xl font-bold ${getRiskLevel(parseFloat(getAverageRisk('diabetes'))).color}`}>
                        {getAverageRisk('diabetes')}%
                      </p>
                      <p className="text-sm text-gray-600">Average risk across models</p>
                    </div>
                    <div className={`px-3 py-1 rounded-full ${getRiskLevel(parseFloat(getAverageRisk('diabetes'))).bg} ${getRiskLevel(parseFloat(getAverageRisk('diabetes'))).color}`}>
                      {getRiskLevel(parseFloat(getAverageRisk('diabetes'))).level}
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className={`border-l-4 ${
                parseFloat(getAverageRisk('hypertension')) < 30 ? 'border-l-green-500' : 
                parseFloat(getAverageRisk('hypertension')) < 60 ? 'border-l-yellow-500' : 
                'border-l-red-500'}`}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-orange-700 flex items-center gap-2">
                    <Info className="h-5 w-5" />
                    Hypertension Risk
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className={`text-2xl font-bold ${getRiskLevel(parseFloat(getAverageRisk('hypertension'))).color}`}>
                        {getAverageRisk('hypertension')}%
                      </p>
                      <p className="text-sm text-gray-600">Average risk across models</p>
                    </div>
                    <div className={`px-3 py-1 rounded-full ${getRiskLevel(parseFloat(getAverageRisk('hypertension'))).bg} ${getRiskLevel(parseFloat(getAverageRisk('hypertension'))).color}`}>
                      {getRiskLevel(parseFloat(getAverageRisk('hypertension'))).level}
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className={`border-l-4 ${
                parseFloat(getAverageRisk('heartDisease')) < 30 ? 'border-l-green-500' : 
                parseFloat(getAverageRisk('heartDisease')) < 60 ? 'border-l-yellow-500' : 
                'border-l-red-500'}`}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-blue-700 flex items-center gap-2">
                    <HeartPulse className="h-5 w-5" />
                    Heart Disease Risk
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className={`text-2xl font-bold ${getRiskLevel(parseFloat(getAverageRisk('heartDisease'))).color}`}>
                        {getAverageRisk('heartDisease')}%
                      </p>
                      <p className="text-sm text-gray-600">Average risk across models</p>
                    </div>
                    <div className={`px-3 py-1 rounded-full ${getRiskLevel(parseFloat(getAverageRisk('heartDisease'))).bg} ${getRiskLevel(parseFloat(getAverageRisk('heartDisease'))).color}`}>
                      {getRiskLevel(parseFloat(getAverageRisk('heartDisease'))).level}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="max-w-4xl mx-auto mb-8">
              <Tabs defaultValue="diabetes" onValueChange={setSelectedCondition}>
                <TabsList className="grid w-full grid-cols-3 mb-6">
                  <TabsTrigger value="diabetes">Diabetes</TabsTrigger>
                  <TabsTrigger value="hypertension">Hypertension</TabsTrigger>
                  <TabsTrigger value="heartDisease">Heart Disease</TabsTrigger>
                </TabsList>
                
                <TabsContent value="diabetes" className="p-6 bg-white border rounded-lg">
                  <h3 className="text-xl font-semibold mb-4">Diabetes Risk Prediction</h3>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={getChartData('diabetes')}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis domain={[0, 100]} label={{ value: 'Risk (%)', angle: -90, position: 'insideLeft' }} />
                        <Tooltip formatter={(value) => [`${value}%`, 'Risk']} />
                        <Bar 
                          dataKey="value" 
                          fill="#8b5cf6" 
                          barSize={60}
                          radius={[4, 4, 0, 0]}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </TabsContent>
                
                <TabsContent value="hypertension" className="p-6 bg-white border rounded-lg">
                  <h3 className="text-xl font-semibold mb-4">Hypertension Risk Prediction</h3>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={getChartData('hypertension')}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis domain={[0, 100]} label={{ value: 'Risk (%)', angle: -90, position: 'insideLeft' }} />
                        <Tooltip formatter={(value) => [`${value}%`, 'Risk']} />
                        <Bar 
                          dataKey="value" 
                          fill="#f97316" 
                          barSize={60}
                          radius={[4, 4, 0, 0]}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </TabsContent>
                
                <TabsContent value="heartDisease" className="p-6 bg-white border rounded-lg">
                  <h3 className="text-xl font-semibold mb-4">Heart Disease Risk Prediction</h3>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={getChartData('heartDisease')}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis domain={[0, 100]} label={{ value: 'Risk (%)', angle: -90, position: 'insideLeft' }} />
                        <Tooltip formatter={(value) => [`${value}%`, 'Risk']} />
                        <Bar 
                          dataKey="value" 
                          fill="#0ea5e9" 
                          barSize={60}
                          radius={[4, 4, 0, 0]}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
            
            <div className="max-w-4xl mx-auto">
              <Card>
                <CardHeader>
                  <CardTitle>Important Notes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="prose prose-sm max-w-none text-gray-600">
                    <p className="mb-2">
                      <strong>This is a health risk prediction tool, not a medical diagnosis.</strong> The results show estimates based on the data you provided and should be used as a guide only.
                    </p>
                    <p className="mb-2">
                      Different machine learning models may give different predictions, which is normal. The average risk provides a balanced estimate across all models.
                    </p>
                    <p>
                      For proper medical advice and diagnosis, please consult with a healthcare professional who can provide personalized guidance based on your complete health profile.
                    </p>
                  </div>
                </CardContent>
              </Card>
              
              <div className="mt-8 text-center">
                <Button onClick={() => navigate('/')} variant="outline" className="mr-2">
                  Return to Form
                </Button>
                <Button onClick={() => window.print()} variant="default" className="bg-blue-600 hover:bg-blue-700">
                  Print Results
                </Button>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default Results;
