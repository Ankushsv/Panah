// This is the layout component for the application
import React from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/footer';

const Layout = ({ children }) => {
  return (
    <div>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
            {[  <h1>Hello World</h1>]}
            {[
            { icon: Users, title: "Peer Support", desc: "Connect with fellow students who understand your journey." },
            { icon: Headphones, title: "24/7 Counseling", desc: "Access professional help whenever you need it." },
            { icon: BarChart, title: "Personalized Insights", desc: "Track your mental health and get tailored recommendations." }  
            ].map((item, idx) => (
              <Card key={idx} className="shadow-lg rounded-2xl">
                <CardContent className="p-8 text-center">
                  <item.icon className="w-12 h-12 text-indigo-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
               