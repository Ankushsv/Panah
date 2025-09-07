'use client';
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { 
  ClipboardList, 
  Brain, 
  Heart, 
  AlertTriangle,
  CheckCircle,
  Info,
  Calendar,
  TrendingUp,
  MessageCircle
} from 'lucide-react';

interface AssessmentQuestion {
  id: string;
  text: string;
  options: { value: number; label: string }[];
}

interface Assessment {
  id: string;
  name: string;
  description: string;
  questions: AssessmentQuestion[];
  icon: React.ElementType;
  color: string;
}

export function MentalHealthEvaluation() {
  const [selectedAssessment, setSelectedAssessment] = useState<string | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [completed, setCompleted] = useState(false);
  const [results, setResults] = useState<any>(null);

  const assessments: Assessment[] = [
    {
      id: 'phq9',
      name: 'PHQ-9',
      description: 'Patient Health Questionnaire - Depression Screening',
      icon: Brain,
      color: 'bg-blue-500',
      questions: [
        {
          id: 'phq9_1',
          text: 'Little interest or pleasure in doing things',
          options: [
            { value: 0, label: 'Not at all' },
            { value: 1, label: 'Several days' },
            { value: 2, label: 'More than half the days' },
            { value: 3, label: 'Nearly every day' }
          ]
        },
        {
          id: 'phq9_2',
          text: 'Feeling down, depressed, or hopeless',
          options: [
            { value: 0, label: 'Not at all' },
            { value: 1, label: 'Several days' },
            { value: 2, label: 'More than half the days' },
            { value: 3, label: 'Nearly every day' }
          ]
        },
        {
          id: 'phq9_3',
          text: 'Trouble falling or staying asleep, or sleeping too much',
          options: [
            { value: 0, label: 'Not at all' },
            { value: 1, label: 'Several days' },
            { value: 2, label: 'More than half the days' },
            { value: 3, label: 'Nearly every day' }
          ]
        },
        {
          id: 'phq9_4',
          text: 'Feeling tired or having little energy',
          options: [
            { value: 0, label: 'Not at all' },
            { value: 1, label: 'Several days' },
            { value: 2, label: 'More than half the days' },
            { value: 3, label: 'Nearly every day' }
          ]
        },
        {
          id: 'phq9_5',
          text: 'Poor appetite or overeating',
          options: [
            { value: 0, label: 'Not at all' },
            { value: 1, label: 'Several days' },
            { value: 2, label: 'More than half the days' },
            { value: 3, label: 'Nearly every day' }
          ]
        }
      ]
    },
    {
      id: 'gad7',
      name: 'GAD-7',
      description: 'Generalized Anxiety Disorder Assessment',
      icon: Heart,
      color: 'bg-red-500',
      questions: [
        {
          id: 'gad7_1',
          text: 'Feeling nervous, anxious, or on edge',
          options: [
            { value: 0, label: 'Not at all' },
            { value: 1, label: 'Several days' },
            { value: 2, label: 'More than half the days' },
            { value: 3, label: 'Nearly every day' }
          ]
        },
        {
          id: 'gad7_2',
          text: 'Not being able to stop or control worrying',
          options: [
            { value: 0, label: 'Not at all' },
            { value: 1, label: 'Several days' },
            { value: 2, label: 'More than half the days' },
            { value: 3, label: 'Nearly every day' }
          ]
        },
        {
          id: 'gad7_3',
          text: 'Worrying too much about different things',
          options: [
            { value: 0, label: 'Not at all' },
            { value: 1, label: 'Several days' },
            { value: 2, label: 'More than half the days' },
            { value: 3, label: 'Nearly every day' }
          ]
        },
        {
          id: 'gad7_4',
          text: 'Trouble relaxing',
          options: [
            { value: 0, label: 'Not at all' },
            { value: 1, label: 'Several days' },
            { value: 2, label: 'More than half the days' },
            { value: 3, label: 'Nearly every day' }
          ]
        },
        {
          id: 'gad7_5',
          text: 'Being so restless that it is hard to sit still',
          options: [
            { value: 0, label: 'Not at all' },
            { value: 1, label: 'Several days' },
            { value: 2, label: 'More than half the days' },
            { value: 3, label: 'Nearly every day' }
          ]
        }
      ]
    },
    {
      id: 'ghq',
      name: 'GHQ-12',
      description: 'General Health Questionnaire - Overall Wellbeing',
      icon: CheckCircle,
      color: 'bg-green-500',
      questions: [
        {
          id: 'ghq_1',
          text: 'Been able to concentrate on whatever you\'re doing?',
          options: [
            { value: 0, label: 'Better than usual' },
            { value: 0, label: 'Same as usual' },
            { value: 1, label: 'Less than usual' },
            { value: 1, label: 'Much less than usual' }
          ]
        },
        {
          id: 'ghq_2',
          text: 'Lost much sleep over worry?',
          options: [
            { value: 0, label: 'Not at all' },
            { value: 0, label: 'No more than usual' },
            { value: 1, label: 'Rather more than usual' },
            { value: 1, label: 'Much more than usual' }
          ]
        },
        {
          id: 'ghq_3',
          text: 'Felt that you are playing a useful part in things?',
          options: [
            { value: 0, label: 'More so than usual' },
            { value: 0, label: 'Same as usual' },
            { value: 1, label: 'Less useful than usual' },
            { value: 1, label: 'Much less useful' }
          ]
        },
        {
          id: 'ghq_4',
          text: 'Felt capable of making decisions about things?',
          options: [
            { value: 0, label: 'More so than usual' },
            { value: 0, label: 'Same as usual' },
            { value: 1, label: 'Less so than usual' },
            { value: 1, label: 'Much less capable' }
          ]
        },
        {
          id: 'ghq_5',
          text: 'Felt constantly under strain?',
          options: [
            { value: 0, label: 'Not at all' },
            { value: 0, label: 'No more than usual' },
            { value: 1, label: 'Rather more than usual' },
            { value: 1, label: 'Much more than usual' }
          ]
        }
      ]
    }
  ];

  const currentAssessment = assessments.find(a => a.id === selectedAssessment);

  const handleAnswerChange = (questionId: string, value: number) => {
    setAnswers({ ...answers, [questionId]: value });
  };

  const handleNext = () => {
    if (!currentAssessment) return;
    
    if (currentQuestion < currentAssessment.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      completeAssessment();
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const completeAssessment = () => {
    if (!currentAssessment) return;

    const totalScore = Object.values(answers).reduce((sum, score) => sum + score, 0);
    let severity = '';
    let recommendations: string[] = [];

    if (selectedAssessment === 'phq9') {
      if (totalScore <= 4) {
        severity = 'Minimal depression';
        recommendations = [
          'Continue practicing self-care',
          'Maintain regular exercise and sleep schedule',
          'Stay connected with friends and family'
        ];
      } else if (totalScore <= 9) {
        severity = 'Mild depression';
        recommendations = [
          'Consider lifestyle changes like regular exercise',
          'Practice mindfulness and stress management',
          'Reach out to friends, family, or counseling services'
        ];
      } else if (totalScore <= 14) {
        severity = 'Moderate depression';
        recommendations = [
          'Consider speaking with a mental health professional',
          'Practice self-care strategies consistently',
          'Consider joining support groups'
        ];
      } else {
        severity = 'Severe depression';
        recommendations = [
          'Strongly recommend speaking with a mental health professional',
          'Consider crisis support if having thoughts of self-harm',
          'Reach out to trusted friends, family, or emergency services'
        ];
      }
    } else if (selectedAssessment === 'gad7') {
      if (totalScore <= 4) {
        severity = 'Minimal anxiety';
        recommendations = [
          'Continue current coping strategies',
          'Practice relaxation techniques',
          'Maintain healthy lifestyle habits'
        ];
      } else if (totalScore <= 9) {
        severity = 'Mild anxiety';
        recommendations = [
          'Try anxiety management techniques',
          'Practice deep breathing and mindfulness',
          'Consider talking to someone you trust'
        ];
      } else if (totalScore <= 14) {
        severity = 'Moderate anxiety';
        recommendations = [
          'Consider professional support',
          'Learn and practice anxiety management skills',
          'Reduce caffeine and practice good sleep hygiene'
        ];
      } else {
        severity = 'Severe anxiety';
        recommendations = [
          'Seek professional mental health support',
          'Practice immediate anxiety relief techniques',
          'Consider reaching out to crisis support if needed'
        ];
      }
    } else if (selectedAssessment === 'ghq') {
      if (totalScore <= 2) {
        severity = 'Good psychological wellbeing';
        recommendations = [
          'Continue maintaining your current lifestyle',
          'Keep practicing self-care strategies',
          'Stay connected with your support network'
        ];
      } else if (totalScore <= 5) {
        severity = 'Some psychological distress';
        recommendations = [
          'Focus on stress management techniques',
          'Ensure adequate rest and relaxation',
          'Consider talking to friends or family about your concerns'
        ];
      } else {
        severity = 'Significant psychological distress';
        recommendations = [
          'Consider seeking professional mental health support',
          'Practice self-care and stress reduction techniques',
          'Reach out to trusted individuals in your support network'
        ];
      }
    }

    setResults({
      score: totalScore,
      maxScore: currentAssessment.questions.length * 3,
      severity,
      recommendations
    });
    setCompleted(true);
  };

  const resetAssessment = () => {
    setSelectedAssessment(null);
    setCurrentQuestion(0);
    setAnswers({});
    setCompleted(false);
    setResults(null);
  };

  if (!selectedAssessment) {
    return (
      <div className="max-w-5xl mx-auto space-y-4 sm:space-y-6">
        <div className="text-center space-y-2 px-4">
          <h1 className="text-xl sm:text-2xl text-purple-600">Mental Health Evaluation</h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            Take standardized assessments to better understand your mental health and get personalized recommendations
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
          {assessments.map((assessment) => {
            const Icon = assessment.icon;
            return (
              <Card key={assessment.id} className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setSelectedAssessment(assessment.id)}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${assessment.color}`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    {assessment.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{assessment.description}</p>
                  <div className="space-y-2 text-sm">
                    <p className="flex items-center gap-2">
                      <ClipboardList className="h-4 w-4" />
                      {assessment.questions.length} questions
                    </p>
                    <p className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      ~5 minutes
                    </p>
                  </div>
                  <Button className="w-full mt-4">Start Assessment</Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Info className="h-5 w-5 text-blue-500" />
              Important Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-muted-foreground">
              These assessments are screening tools and not a substitute for professional diagnosis. 
              Results should be discussed with a qualified mental health professional.
            </p>
            <div className="flex items-start gap-2 p-3 bg-yellow-50 rounded-lg">
              <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
              <div>
                <p className="text-sm">
                  If you are experiencing thoughts of self-harm or suicide, please seek immediate help by:
                </p>
                <ul className="text-sm mt-2 space-y-1 text-muted-foreground">
                  <li>• Calling emergency services (911)</li>
                  <li>• Contacting the National Suicide Prevention Lifeline: 988</li>
                  <li>• Reaching out to a trusted friend, family member, or counselor</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (completed && results) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              Assessment Complete: {currentAssessment?.name}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center space-y-4">
              <div className="space-y-2">
                <h3 className="text-xl">Your Results</h3>
                <div className="flex items-center justify-center space-x-4">
                  <div className="text-3xl">
                    {results.score}/{results.maxScore}
                  </div>
                  <Badge variant="outline" className="text-lg px-4 py-2">
                    {results.severity}
                  </Badge>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-purple-600" />
                Personalized Recommendations
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {results.recommendations.map((rec: string, index: number) => (
                  <div key={index} className="flex items-start gap-3 p-4 bg-purple-50 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-purple-600 mt-0.5" />
                    <p className="text-sm">{rec}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-4">
              <Button onClick={resetAssessment} variant="outline">
                Take Another Assessment
              </Button>
              <Button className="bg-purple-600 hover:bg-purple-700">
                Save Results
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Next Steps</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              Based on your results, here are some resources that might help:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button variant="outline" className="h-auto p-4 flex flex-col items-start">
                <MessageCircle className="h-5 w-5 text-purple-600 mb-2" />
                <span>Talk to AI Companion</span>
                <span className="text-xs text-muted-foreground">Get immediate support and coping strategies</span>
              </Button>
              <Button variant="outline" className="h-auto p-4 flex flex-col items-start">
                <Heart className="h-5 w-5 text-red-600 mb-2" />
                <span>Join Support Forum</span>
                <span className="text-xs text-muted-foreground">Connect with others who understand</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!currentAssessment) return null;

  const currentQ = currentAssessment.questions[currentQuestion];
  const progress = ((currentQuestion + 1) / currentAssessment.questions.length) * 100;

  return (
    <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6">
      <div className="text-center space-y-2 px-4">
        <h1 className="text-xl sm:text-2xl text-purple-600">{currentAssessment.name}</h1>
        <p className="text-sm sm:text-base text-muted-foreground">{currentAssessment.description}</p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-base sm:text-lg">
              Question {currentQuestion + 1} of {currentAssessment.questions.length}
            </CardTitle>
            <span className="text-xs sm:text-sm text-muted-foreground">
              {Math.round(progress)}% Complete
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg">
              Over the last 2 weeks, how often have you been bothered by:
            </h3>
            <p className="text-xl">{currentQ.text}</p>
          </div>

          <RadioGroup
            value={answers[currentQ.id]?.toString()}
            onValueChange={(value: string) => handleAnswerChange(currentQ.id, parseInt(value))}
          >
            {currentQ.options.map((option, index) => (
              <div key={index} className="flex items-center space-x-2 p-3 rounded-lg hover:bg-gray-50">
                <RadioGroupItem value={option.value.toString()} id={`option-${index}`} />
                <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                  {option.label}
                </Label>
              </div>
            ))}
          </RadioGroup>

          <div className="flex justify-between pt-4">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
            >
              Previous
            </Button>
            <Button
              onClick={handleNext}
              disabled={answers[currentQ.id] === undefined}
              className="bg-purple-600 hover:bg-purple-700"
            >
              {currentQuestion === currentAssessment.questions.length - 1 ? 'Complete Assessment' : 'Next'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}