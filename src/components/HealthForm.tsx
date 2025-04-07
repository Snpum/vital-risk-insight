
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { toast } from 'sonner';

const HealthForm = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    age: 30,
    gender: 'male',
    bmi: 25,
    bloodPressureSystolic: 120,
    bloodPressureDiastolic: 80,
    cholesterolLevel: 200,
    glucoseLevel: 100,
    smokingStatus: 'no',
    alcoholConsumption: 'moderate',
    physicalActivity: 'moderate',
    familyHistory: 'no'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSliderChange = (name: string, value: number[]) => {
    setFormData({
      ...formData,
      [name]: value[0]
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Quick validation to ensure all fields have values
    for (const key in formData) {
      if (formData[key as keyof typeof formData] === '') {
        toast.error('Please fill in all fields');
        return;
      }
    }
    
    // Pass form data through navigation state
    navigate('/results', { state: { formData } });
  };

  return (
    <Card className="shadow-lg border-gray-200">
      <CardHeader>
        <CardTitle className="text-center text-xl">Health Assessment Form</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="age">Age</Label>
              <Input 
                id="age" 
                name="age" 
                type="number" 
                value={formData.age}
                onChange={handleInputChange}
                min="18"
                max="100"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="gender">Gender</Label>
              <Select 
                value={formData.gender} 
                onValueChange={(value) => handleSelectChange('gender', value)}
              >
                <SelectTrigger id="gender">
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label>BMI: {formData.bmi}</Label>
              <Slider 
                value={[formData.bmi]} 
                min={15} 
                max={45} 
                step={0.1}
                onValueChange={(value) => handleSliderChange('bmi', value)} 
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>Underweight</span>
                <span>Normal</span>
                <span>Overweight</span>
                <span>Obese</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="bloodPressureSystolic">Blood Pressure (Systolic)</Label>
              <Input 
                id="bloodPressureSystolic" 
                name="bloodPressureSystolic" 
                type="number" 
                value={formData.bloodPressureSystolic}
                onChange={handleInputChange}
                min="80"
                max="200"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="bloodPressureDiastolic">Blood Pressure (Diastolic)</Label>
              <Input 
                id="bloodPressureDiastolic" 
                name="bloodPressureDiastolic" 
                type="number" 
                value={formData.bloodPressureDiastolic}
                onChange={handleInputChange}
                min="40"
                max="130"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="cholesterolLevel">Cholesterol Level (mg/dL)</Label>
              <Input 
                id="cholesterolLevel" 
                name="cholesterolLevel" 
                type="number" 
                value={formData.cholesterolLevel}
                onChange={handleInputChange}
                min="100"
                max="500"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="glucoseLevel">Glucose Level (mg/dL)</Label>
              <Input 
                id="glucoseLevel" 
                name="glucoseLevel" 
                type="number" 
                value={formData.glucoseLevel}
                onChange={handleInputChange}
                min="70"
                max="300"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="smokingStatus">Smoking Status</Label>
              <Select 
                value={formData.smokingStatus} 
                onValueChange={(value) => handleSelectChange('smokingStatus', value)}
              >
                <SelectTrigger id="smokingStatus">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="no">Non-smoker</SelectItem>
                  <SelectItem value="former">Former smoker</SelectItem>
                  <SelectItem value="occasional">Occasional smoker</SelectItem>
                  <SelectItem value="regular">Regular smoker</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="alcoholConsumption">Alcohol Consumption</Label>
              <Select 
                value={formData.alcoholConsumption} 
                onValueChange={(value) => handleSelectChange('alcoholConsumption', value)}
              >
                <SelectTrigger id="alcoholConsumption">
                  <SelectValue placeholder="Select level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">None</SelectItem>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="moderate">Moderate</SelectItem>
                  <SelectItem value="heavy">Heavy</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="physicalActivity">Physical Activity</Label>
              <Select 
                value={formData.physicalActivity} 
                onValueChange={(value) => handleSelectChange('physicalActivity', value)}
              >
                <SelectTrigger id="physicalActivity">
                  <SelectValue placeholder="Select level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sedentary">Sedentary</SelectItem>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="moderate">Moderate</SelectItem>
                  <SelectItem value="vigorous">Vigorous</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="familyHistory">Family History of Conditions</Label>
              <Select 
                value={formData.familyHistory} 
                onValueChange={(value) => handleSelectChange('familyHistory', value)}
              >
                <SelectTrigger id="familyHistory">
                  <SelectValue placeholder="Select option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="no">None</SelectItem>
                  <SelectItem value="diabetes">Diabetes</SelectItem>
                  <SelectItem value="hypertension">Hypertension</SelectItem>
                  <SelectItem value="heart">Heart Disease</SelectItem>
                  <SelectItem value="multiple">Multiple Conditions</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <CardFooter className="px-0 pt-6 flex justify-center">
            <Button type="submit" className="w-full md:w-auto px-8 bg-blue-600 hover:bg-blue-700">
              Predict Health Risks
            </Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
};

export default HealthForm;
