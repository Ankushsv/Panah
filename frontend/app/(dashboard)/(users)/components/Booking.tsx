'use client';
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { Calendar } from './ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { useAuth } from '@/components/AuthProvider';
import { 
  Calendar as CalendarIcon,
  Clock,
  Phone,
  Video,
  User,
  Shield,
  CheckCircle,
  MapPin,
  MessageSquare,
  HeadphonesIcon,
  UserCheck,
  Heart,
  AlertCircle
} from 'lucide-react';
import { format } from 'date-fns';

interface CounselorProfile {
  id: string;
  name: string;
  title: string;
  specialties: string[];
  availability: string[];
  rating: number;
  experience: string;
  languages: string[];
  location: string;
  consultationType: ('in-person' | 'video' | 'phone')[];
  avatar: string;
}

interface TimeSlot {
  time: string;
  available: boolean;
}

interface Booking {
  id: string;
  counselorId: string;
  date: Date;
  time: string;
  type: 'in-person' | 'video' | 'phone';
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  notes?: string;
}

export function Booking() {
  const { user } = useAuth();
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedCounselor, setSelectedCounselor] = useState<string>('');
  const [selectedType, setSelectedType] = useState<'in-person' | 'video' | 'phone'>('video');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [bookingNotes, setBookingNotes] = useState('');
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [bookingStep, setBookingStep] = useState(1);
  const [emergencyBooking, setEmergencyBooking] = useState(false);

  const counselors: CounselorProfile[] = [
    {
      id: '1',
      name: 'Dr. Sarah Chen',
      title: 'Licensed Clinical Psychologist',
      specialties: ['Anxiety', 'Depression', 'Academic Stress', 'Trauma'],
      availability: ['Monday', 'Tuesday', 'Wednesday', 'Friday'],
      rating: 4.9,
      experience: '8 years',
      languages: ['English', 'Mandarin', 'Spanish'],
      location: 'Campus Health Center - Room 201',
      consultationType: ['in-person', 'video', 'phone'],
      avatar: 'SC'
    },
    {
      id: '2',
      name: 'Dr. Michael Rodriguez',
      title: 'Licensed Professional Counselor',
      specialties: ['Relationship Issues', 'ADHD', 'Life Transitions', 'Self-Esteem'],
      availability: ['Tuesday', 'Wednesday', 'Thursday', 'Saturday'],
      rating: 4.8,
      experience: '6 years',
      languages: ['English', 'Spanish'],
      location: 'Campus Health Center - Room 203',
      consultationType: ['in-person', 'video', 'phone'],
      avatar: 'MR'
    },
    {
      id: '3',
      name: 'Dr. Emily Johnson',
      title: 'Psychiatric Nurse Practitioner',
      specialties: ['Medication Management', 'Bipolar Disorder', 'Eating Disorders'],
      availability: ['Monday', 'Wednesday', 'Thursday', 'Friday'],
      rating: 4.7,
      experience: '10 years',
      languages: ['English', 'French'],
      location: 'Campus Health Center - Room 205',
      consultationType: ['in-person', 'video'],
      avatar: 'EJ'
    },
    {
      id: '4',
      name: 'Dr. James Kim',
      title: 'Crisis Intervention Specialist',
      specialties: ['Crisis Intervention', 'Suicide Prevention', 'Emergency Support'],
      availability: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      rating: 4.9,
      experience: '12 years',
      languages: ['English', 'Korean'],
      location: 'Campus Health Center - Crisis Suite',
      consultationType: ['in-person', 'video', 'phone'],
      avatar: 'JK'
    }
  ];

  const timeSlots: TimeSlot[] = [
    { time: '9:00 AM', available: true },
    { time: '10:00 AM', available: false },
    { time: '11:00 AM', available: true },
    { time: '1:00 PM', available: true },
    { time: '2:00 PM', available: true },
    { time: '3:00 PM', available: false },
    { time: '4:00 PM', available: true },
    { time: '5:00 PM', available: true }
  ];

  const emergencyContacts = [
    {
      name: 'Crisis Hotline',
      number: '988',
      description: 'National Suicide Prevention Lifeline',
      available: '24/7'
    },
    {
      name: 'Campus Emergency',
      number: '911',
      description: 'Immediate emergency services',
      available: '24/7'
    },
    {
      name: 'Campus Crisis Line',
      number: '(555) 123-HELP',
      description: 'Campus mental health crisis support',
      available: '24/7'
    }
  ];

  const handleBookingSubmit = () => {
    // Here you would typically submit to your backend
    console.log('Booking submitted:', {
      counselorId: selectedCounselor,
      date: selectedDate,
      time: selectedTime,
      type: selectedType,
      notes: bookingNotes,
      emergencyBooking
    });
    
    // Show confirmation
    setBookingStep(4);
  };

  const resetBooking = () => {
    setSelectedDate(undefined);
    setSelectedCounselor('');
    setSelectedType('video');
    setSelectedTime('');
    setBookingNotes('');
    setShowBookingForm(false);
    setBookingStep(1);
    setEmergencyBooking(false);
  };

  const getConsultationIcon = (type: string) => {
    switch (type) {
      case 'video': return Video;
      case 'phone': return Phone;
      case 'in-person': return User;
      default: return User;
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-2xl text-purple-600">Confidential Booking System</h1>
        <p className="text-muted-foreground">
          Schedule secure, confidential appointments with licensed mental health professionals
        </p>
      </div>

      {/* Emergency Support Banner */}
      <Card className="border-red-200 bg-red-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-700">
            <AlertCircle className="h-5 w-5" />
            Need Immediate Help?
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {emergencyContacts.map((contact, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg border border-red-200">
                <div>
                  <h4 className="font-medium">{contact.name}</h4>
                  <p className="text-sm text-muted-foreground">{contact.description}</p>
                  <p className="text-xs text-red-600">{contact.available}</p>
                </div>
                <Button size="sm" className="bg-red-600 hover:bg-red-700">
                  <Phone className="h-4 w-4 mr-1" />
                  {contact.number}
                </Button>
              </div>
            ))}
          </div>
          <div className="mt-4 flex gap-4">
            <Button 
              variant="outline" 
              className="border-red-300 text-red-700 hover:bg-red-100"
              onClick={() => {
                setEmergencyBooking(true);
                setShowBookingForm(true);
              }}
            >
              <Calendar className="h-4 w-4 mr-2" />
              Schedule Emergency Appointment
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Counselor Profiles */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserCheck className="h-5 w-5 text-purple-600" />
                Available Counselors
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {counselors.map((counselor) => (
                  <Card 
                    key={counselor.id} 
                    className={`cursor-pointer transition-all hover:shadow-md ${
                      selectedCounselor === counselor.id ? 'ring-2 ring-purple-500 bg-purple-50' : ''
                    }`}
                    onClick={() => setSelectedCounselor(counselor.id)}
                  >
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            <div className="bg-purple-100 rounded-full p-2">
                              <span className="text-purple-700 font-medium">{counselor.avatar}</span>
                            </div>
                            <div>
                              <h3 className="font-medium">{counselor.name}</h3>
                              <p className="text-sm text-muted-foreground">{counselor.title}</p>
                              <div className="flex items-center gap-1 mt-1">
                                <Heart className="h-3 w-3 text-yellow-500 fill-current" />
                                <span className="text-xs">{counselor.rating}/5.0</span>
                                <span className="text-xs text-muted-foreground">• {counselor.experience}</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div>
                            <p className="text-xs font-medium text-muted-foreground mb-1">Specialties:</p>
                            <div className="flex flex-wrap gap-1">
                              {counselor.specialties.slice(0, 3).map((specialty, index) => (
                                <Badge key={index} variant="secondary" className="text-xs">
                                  {specialty}
                                </Badge>
                              ))}
                              {counselor.specialties.length > 3 && (
                                <Badge variant="secondary" className="text-xs">
                                  +{counselor.specialties.length - 3}
                                </Badge>
                              )}
                            </div>
                          </div>

                          <div>
                            <p className="text-xs font-medium text-muted-foreground mb-1">Languages:</p>
                            <p className="text-xs">{counselor.languages.join(', ')}</p>
                          </div>

                          <div>
                            <p className="text-xs font-medium text-muted-foreground mb-1">Consultation Types:</p>
                            <div className="flex gap-1">
                              {counselor.consultationType.map((type, index) => {
                                const Icon = getConsultationIcon(type);
                                return (
                                  <div key={index} className="flex items-center gap-1 bg-gray-100 rounded px-2 py-1">
                                    <Icon className="h-3 w-3" />
                                    <span className="text-xs capitalize">{type.replace('-', ' ')}</span>
                                  </div>
                                );
                              })}
                            </div>
                          </div>

                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <MapPin className="h-3 w-3" />
                            <span>{counselor.location}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Booking Form */}
        <div className="space-y-6">
          {!showBookingForm ? (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-purple-600" />
                  Book Appointment
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Select a counselor to begin booking your confidential appointment.
                  </p>
                  <Button 
                    className="w-full" 
                    disabled={!selectedCounselor}
                    onClick={() => setShowBookingForm(true)}
                  >
                    <Calendar className="h-4 w-4 mr-2" />
                    Start Booking Process
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>
                  {bookingStep === 4 ? 'Booking Confirmed' : `Step ${bookingStep} of 3`}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {bookingStep === 1 && (
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Select Date</label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline" className="w-full justify-start">
                            <CalendarIcon className="h-4 w-4 mr-2" />
                            {selectedDate ? format(selectedDate, 'PPP') : 'Pick a date'}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={selectedDate}
                            onSelect={setSelectedDate}
                            disabled={(date: Date) => date < new Date()}
                          />
                        </PopoverContent>
                      </Popover>
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">Consultation Type</label>
                      <Select value={selectedType} onValueChange={(value: any) => setSelectedType(value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {counselors.find(c => c.id === selectedCounselor)?.consultationType.map((type) => (
                            <SelectItem key={type} value={type}>
                              <div className="flex items-center gap-2">
                                {React.createElement(getConsultationIcon(type), { className: "h-4 w-4" })}
                                <span className="capitalize">{type.replace('-', ' ')}</span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <Button 
                      className="w-full" 
                      disabled={!selectedDate}
                      onClick={() => setBookingStep(2)}
                    >
                      Next: Select Time
                    </Button>
                  </div>
                )}

                {bookingStep === 2 && (
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Available Times</label>
                      <div className="grid grid-cols-2 gap-2">
                        {timeSlots.map((slot) => (
                          <Button
                            key={slot.time}
                            variant={selectedTime === slot.time ? "default" : "outline"}
                            disabled={!slot.available}
                            onClick={() => setSelectedTime(slot.time)}
                            className="text-sm"
                          >
                            <Clock className="h-3 w-3 mr-1" />
                            {slot.time}
                          </Button>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button variant="outline" onClick={() => setBookingStep(1)}>
                        Back
                      </Button>
                      <Button 
                        className="flex-1" 
                        disabled={!selectedTime}
                        onClick={() => setBookingStep(3)}
                      >
                        Next: Additional Info
                      </Button>
                    </div>
                  </div>
                )}

                {bookingStep === 3 && (
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        Additional Information (Optional)
                      </label>
                      <Textarea
                        placeholder="Share anything you'd like your counselor to know about your concerns or goals for the session..."
                        value={bookingNotes}
                        onChange={(e) => setBookingNotes(e.target.value)}
                        rows={4}
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        This information is confidential and will only be shared with your selected counselor.
                      </p>
                    </div>

                    <div className="bg-blue-50 p-3 rounded-lg">
                      <h4 className="font-medium text-sm mb-2">Booking Summary:</h4>
                      <div className="space-y-1 text-sm">
                        <p><span className="font-medium">Counselor:</span> {counselors.find(c => c.id === selectedCounselor)?.name}</p>
                        <p><span className="font-medium">Date:</span> {selectedDate ? format(selectedDate, 'PPP') : ''}</p>
                        <p><span className="font-medium">Time:</span> {selectedTime}</p>
                        <p><span className="font-medium">Type:</span> {selectedType.replace('-', ' ')}</p>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button variant="outline" onClick={() => setBookingStep(2)}>
                        Back
                      </Button>
                      <Button 
                        className="flex-1" 
                        onClick={handleBookingSubmit}
                      >
                        Confirm Booking
                      </Button>
                    </div>
                  </div>
                )}

                {bookingStep === 4 && (
                  <div className="space-y-4 text-center">
                    <div className="bg-green-50 p-6 rounded-lg">
                      <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
                      <h3 className="font-medium text-green-800 mb-2">Appointment Confirmed!</h3>
                      <p className="text-sm text-green-700">
                        Your confidential appointment has been booked. You'll receive a confirmation email with further details.
                      </p>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg text-left">
                      <h4 className="font-medium mb-2">What's Next:</h4>
                      <ul className="text-sm space-y-1 text-muted-foreground">
                        <li>• Check your email for appointment details</li>
                        <li>• You'll receive a reminder 24 hours before</li>
                        <li>• Prepare any questions you'd like to discuss</li>
                        <li>• All communications are confidential</li>
                      </ul>
                    </div>

                    <Button onClick={resetBooking} className="w-full">
                      Book Another Appointment
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Privacy Notice */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-sm">
                <Shield className="h-4 w-4 text-green-600" />
                Privacy & Confidentiality
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-xs text-muted-foreground">
                <p>• All appointments are completely confidential</p>
                <p>• HIPAA compliant and secure booking system</p>
                <p>• Your information is never shared without consent</p>
                <p>• You can cancel or reschedule anytime</p>
                <p>• Crisis intervention available 24/7</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}