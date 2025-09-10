'use-client;'
import React from 'react';
import Link from 'next/link';
import { Heart, Brain, Shield, Headphones, Users, BarChart3, PenTool, MessageCircle, Mail, Phone, MapPin } from 'lucide-react';

const PanahLandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-purple-50 to-pink-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-purple-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <Link href="/">
                <span className="text-[30px] font-bold  text-purple-700">PANAH</span>
              </Link>
            </div>
            
            <nav className="hidden md:flex space-x-8">
              <a href="#features" className="text-gray-600 hover:text-purple-600 transition-colors">Features</a>
              <a href="#how-it-works" className="text-gray-600 hover:text-purple-600 transition-colors">How It Works</a>
              <a href="#about" className="text-gray-600 hover:text-purple-600 transition-colors">About</a>
              <a href="#contact" className="text-gray-600 hover:text-purple-600 transition-colors">Contact</a>
            </nav>
            
            <div className="flex items-center space-x-4">
              <Link href="/signin">
                <button className="text-gray-600 hover:text-purple-600 transition-colors">Sign In</button>
              </Link>
              <Link href="/signin">
                <button className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-6 py-2 rounded-full hover:from-purple-600 hover:to-purple-700 transition-all transform hover:scale-105">
                  Get Started
                </button>
              </Link>
              <Link href="/admin">
                <button className="text-gray-600 hover:text-purple-600 transition-colors">For Institutions</button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-200/30 via-transparent to-pink-200/30"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600 mb-8 leading-tight">
            Your Mental Wellbeing Matters
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12 leading-relaxed">
            A safe, stigma-free, and personalized mental health platform for students in higher education.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <button className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:from-purple-600 hover:to-purple-700 transition-all transform hover:scale-105 shadow-lg">
              Start Your Journey
            </button>
            <button className="border-2 border-purple-400 text-purple-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-purple-50 transition-all">
              For Institutions
            </button>
          </div>
          <div className="text-sm text-gray-500">
            Trusted by over <span className="font-semibold text-purple-600">5+</span> institutions and endorsed by mental health experts.
          </div>
        </div>
      </section>

      {/* Problems Section */}
      <section className="py-20 bg-white/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600 mb-8">
            Because Student Life is Tough
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-16">
            We are building a safe digital space where students can find support, without fear or judgment.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/80 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Brain className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Academic Stress</h3>
              <p className="text-gray-600">Exams, deadlines, endless expectations.</p>
            </div>
            
            <div className="bg-white/80 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Emotional Struggles</h3>
              <p className="text-gray-600">Anxiety, depression, loneliness.</p>
            </div>
            
            <div className="bg-white/80 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Stigma & Silence</h3>
              <p className="text-gray-600">Fear of judgment stops many from seeking help.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600 mb-16">
            What We Offer
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white/80 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-2">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <Brain className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">AI First-Aid Support</h3>
              <p className="text-gray-600 text-sm">Instant coping strategies, 24/7.</p>
            </div>
            
            <div className="bg-white/80 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-2">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Confidential Counselling</h3>
              <p className="text-gray-600 text-sm">Book sessions securely.</p>
            </div>
            
            <div className="bg-white/80 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-2">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <Headphones className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Wellness Hub</h3>
              <p className="text-gray-600 text-sm">Relaxation audios, guides, regional content.</p>
            </div>
            
            <div className="bg-white/80 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-2">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Peer Support</h3>
              <p className="text-gray-600 text-sm">Moderated, stigma-free student community.</p>
            </div>
            
            <div className="bg-white/80 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-2">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <BarChart3 className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Smart Insights</h3>
              <p className="text-gray-600 text-sm">Data-driven wellbeing dashboard for institutions.</p>
            </div>
            
            <div className="bg-white/80 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-2">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <PenTool className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Daily Journaling</h3>
              <p className="text-gray-600 text-sm">Reflect on your day with guided prompts.</p>
            </div>
            
            <div className="bg-white/80 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-2">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <MessageCircle className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Choose Your AI Companion</h3>
              <p className="text-gray-600 text-sm">Select from different AI personalities for support.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 bg-white/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-12 text-center">
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">
                1
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Check-in</h3>
              <p className="text-gray-600">Daily mood & mental wellness check.</p>
            </div>
            
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">
                2
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Explore Resources</h3>
              <p className="text-gray-600">Coping tools, peer support, counsellors.</p>
            </div>
            
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">
                3
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Grow Stronger</h3>
              <p className="text-gray-600">Track progress, build resilience, stay connected.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-br from-purple-100 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600 mb-16">
            Made for Students, Backed by Experts
          </h2>
          
          <div className="grid md:grid-cols-3 gap-12">
            <div>
              <div className="text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600 mb-4">
                90%
              </div>
              <p className="text-gray-600">of students felt more comfortable seeking help</p>
            </div>
            
            <div>
              <div className="text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600 mb-4">
                5+
              </div>
              <p className="text-gray-600">institutions already trust our platform</p>
            </div>
            
            <div>
              <div className="text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600 mb-4">
                Endorsed
              </div>
              <p className="text-gray-600">by psychologists & student welfare departments</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-500 to-blue-600 text-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl lg:text-5xl font-bold mb-8">
            A healthier mind today, a brighter future tomorrow.
          </h2>
          <button className="bg-white text-purple-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg">
            Get Started – It's Free & Confidential
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-purple-600 to-blue-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                  <Heart className="w-5 h-5 text-purple-600" />
                </div>
                <span className="text-xl font-semibold">Panah</span>
              </div>
              <p className="text-purple-100">
                Your safe space for mental wellness and personal growth.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-purple-100">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Resources</h3>
              <ul className="space-y-2 text-purple-100">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Community</a></li>
                <li><a href="#" className="hover:text-white transition-colors">FAQs</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
              <div className="space-y-2 text-purple-100">
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4" />
                  <span>support@panah.com</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4" />
                  <span>Mental Health Center</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-purple-400 mt-12 pt-8 text-center text-purple-100">
            <p>© 2024 Panah. All rights reserved. Made with ❤️ for student wellness.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PanahLandingPage;