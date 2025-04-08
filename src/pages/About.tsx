
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import HealthHeader from '@/components/HealthHeader';
import { BookOpen, Activity, HeartPulse, Info, BarChart3, ShieldCheck } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <HealthHeader />
      <main className="container mx-auto py-6 px-4 md:px-6">
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">About VitalRisk Insight</h1>
          <p className="text-gray-600 md:max-w-2xl mx-auto">
            Understanding how our health predictor works and the science behind it
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-blue-600" />
                About Our Health Risk Predictor
              </CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <p>
                VitalRisk Insight is a powerful health risk assessment tool that uses multiple machine learning models 
                to predict your likelihood of developing diabetes, hypertension, and heart disease based on your health 
                profile. By analyzing various health metrics, our system provides personalized risk assessments that 
                can help you take proactive steps toward better health.
              </p>
              <p>
                Unlike traditional risk calculators that use a single algorithm, VitalRisk Insight leverages five 
                advanced machine learning models to provide a more comprehensive and accurate risk assessment:
              </p>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <BarChart3 className="h-5 w-5 text-purple-600" />
                  Our Machine Learning Models
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold">XGBoost</h3>
                  <p className="text-sm text-gray-600">
                    A gradient boosting algorithm that produces a prediction model as an ensemble of weak prediction models, 
                    typically decision trees.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold">Random Forest</h3>
                  <p className="text-sm text-gray-600">
                    An ensemble learning method that constructs multiple decision trees during training and outputs the 
                    average prediction of the individual trees.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold">Decision Tree</h3>
                  <p className="text-sm text-gray-600">
                    A flowchart-like structure where each internal node represents a test on an attribute, each branch 
                    represents the outcome of the test, and each leaf node represents a decision.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold">Support Vector Machine (SVM)</h3>
                  <p className="text-sm text-gray-600">
                    A supervised learning model that analyzes data for classification and regression analysis, particularly 
                    effective in high-dimensional spaces.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold">Naive Bayes</h3>
                  <p className="text-sm text-gray-600">
                    A family of probabilistic algorithms based on applying Bayes' theorem with strong independence assumptions 
                    between features.
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <ShieldCheck className="h-5 w-5 text-green-600" />
                  Health Conditions We Predict
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="flex items-center gap-2 font-semibold">
                    <Activity className="h-4 w-4 text-purple-600" />
                    Diabetes
                  </h3>
                  <p className="text-sm text-gray-600">
                    A chronic condition that affects how your body turns food into energy. Our models analyze factors like 
                    glucose levels, BMI, age, family history, and lifestyle to assess your diabetes risk.
                  </p>
                </div>
                <div>
                  <h3 className="flex items-center gap-2 font-semibold">
                    <Info className="h-4 w-4 text-orange-600" />
                    Hypertension
                  </h3>
                  <p className="text-sm text-gray-600">
                    High blood pressure that can lead to serious health problems. We evaluate factors including blood pressure 
                    readings, sodium intake, stress levels, weight, and family history.
                  </p>
                </div>
                <div>
                  <h3 className="flex items-center gap-2 font-semibold">
                    <HeartPulse className="h-4 w-4 text-blue-600" />
                    Heart Disease
                  </h3>
                  <p className="text-sm text-gray-600">
                    A range of conditions that affect your heart. Our models consider cholesterol levels, blood pressure, 
                    smoking history, physical activity, and other cardiovascular health indicators.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Info className="h-5 w-5 text-blue-600" />
                How To Use The Results
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                The risk assessments provided by VitalRisk Insight are designed to be informative, not diagnostic. Here's how to interpret and use your results:
              </p>
              <ul className="space-y-2 list-disc pl-5">
                <li>
                  <strong>Compare different models:</strong> Each machine learning algorithm approaches prediction differently. 
                  By showing results from multiple models, you can get a more balanced view of your risk factors.
                </li>
                <li>
                  <strong>Focus on trends:</strong> Pay attention to consistent high or low risks across models, which may 
                  indicate stronger evidence for that assessment.
                </li>
                <li>
                  <strong>Consult healthcare professionals:</strong> Always discuss your results with a doctor or healthcare 
                  provider before making health decisions.
                </li>
                <li>
                  <strong>Repeat assessments:</strong> As your health metrics change, return to VitalRisk Insight to track 
                  how your risk profiles evolve over time.
                </li>
              </ul>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-blue-600" />
                Data Privacy
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                VitalRisk Insight takes your privacy seriously. All health information you provide is processed locally in your 
                browser and is not stored on our servers. Your data is used solely for generating your personalized risk 
                assessment and is not shared with third parties.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default About;
