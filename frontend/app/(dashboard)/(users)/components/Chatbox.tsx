'use client';
import React, { useState, useRef, useEffect } from "react";
import {
  Send,
  Bot,
  User,
  Heart,
  Lightbulb,
  MessageCircle,
  Phone,
  Calendar,
  AlertTriangle,
  Shield,
} from "lucide-react";

interface Message {
  id: string;
  content: string;
  sender: "user" | "bot";
  timestamp: Date;
  suggestions?: string[];
}

interface ChatboxProps {
  setActiveTab?: (tab: string) => void;
}

export default function Chatbox({ setActiveTab }: ChatboxProps = {}) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content:
        "Hello! I'm your AI mental health companion. I'm here to provide support, coping strategies, and a listening ear. How are you feeling today?",
      sender: "bot",
      timestamp: new Date(),
      suggestions: [
        "I'm feeling anxious",
        "I'm having trouble sleeping",
        "I feel overwhelmed",
        "I'm doing well today",
      ],
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<"online" | "offline" | "connecting">("connecting");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Test backend connection on component mount
  useEffect(() => {
    testConnection();
  }, []);

  const testConnection = async () => {
    try {
      const response = await fetch('http://localhost:5050/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: "test connection" }),
      });
      
      if (response.ok) {
        setConnectionStatus("online");
      } else {
        setConnectionStatus("offline");
      }
    } catch (error) {
      console.error('Backend connection failed:', error);
      setConnectionStatus("offline");
    }
  };

  const callBackendAPI = async (userMessage: string): Promise<string> => {
    try {
      const response = await fetch('http://localhost:5050/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userMessage }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data.bot_response || "I'm sorry, I couldn't process your message right now. Please try again.";
    } catch (error) {
      console.error('Error calling backend:', error);
      setConnectionStatus("offline");
      return "I'm having trouble connecting to my backend service. Please check if the FastAPI server is running on port 5050, or try again later.";
    }
  };

  const detectCrisis = (message: string): boolean => {
    const crisisKeywords = [
      "suicide",
      "suicidal",
      "kill myself",
      "end my life",
      "want to die",
      "better off dead",
      "harm myself",
      "hurt myself",
      "self harm",
      "cut myself",
      "overdose",
      "pills",
      "hopeless",
      "no way out",
      "can't go on",
      "pointless",
      "worthless",
      "end it all",
    ];

    return crisisKeywords.some((keyword) =>
      message.toLowerCase().includes(keyword),
    );
  };

  const sendMessage = async (content: string) => {
    if (!content.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsTyping(true);

    try {
      // Check for crisis keywords for immediate response
      if (detectCrisis(content)) {
        const crisisResponse = "I'm really concerned about what you're sharing. Your safety is the most important thing right now. Please reach out to a crisis counselor immediately:\n\n🆘 **Crisis Hotline: 988** (24/7)\n📱 **Text HOME to 741741** for Crisis Text Line\n🏥 **Call 911** if you're in immediate danger\n\n💜 You don't have to face this alone. There are trained professionals ready to help you right now. Would you like me to help you book an urgent appointment with a campus counselor?";
        
        const botResponse: Message = {
          id: (Date.now() + 1).toString(),
          content: crisisResponse,
          sender: "bot",
          timestamp: new Date(),
          suggestions: [
            "Help me find emergency resources",
            "I want to talk to someone now",
            "Tell me more about crisis support",
          ],
        };

        setTimeout(() => {
          setMessages((prev) => [...prev, botResponse]);
          setIsTyping(false);
        }, 1000);
        return;
      }

      // Call your FastAPI backend
      const botResponseContent = await callBackendAPI(content);
      setConnectionStatus("online");

      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: botResponseContent,
        sender: "bot",
        timestamp: new Date(),
        suggestions: [
          "Tell me more",
          "That helps, thank you",
          "I need different strategies",
          "Can we talk about something else?",
        ],
      };

      setMessages((prev) => [...prev, botResponse]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: "I apologize, but I'm having technical difficulties right now. Please make sure the FastAPI server is running on http://localhost:5050, or try again in a moment.",
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorResponse]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    sendMessage(suggestion);
  };

  const getConnectionBadge = () => {
    const baseClasses = "ml-auto px-2 py-1 text-xs rounded-full font-medium";
    switch (connectionStatus) {
      case "online":
        return <span className={`${baseClasses} bg-green-100 text-green-800`}>Online</span>;
      case "offline":
        return <span className={`${baseClasses} bg-red-100 text-red-800`}>Offline</span>;
      case "connecting":
        return <span className={`${baseClasses} bg-gray-100 text-gray-800`}>Connecting...</span>;
      default:
        return <span className={`${baseClasses} bg-gray-100 text-gray-800`}>Unknown</span>;
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 p-4">
      <div className="text-center space-y-2">
        <h1 className="text-2xl text-purple-600">
          AI-Guided First-Aid Support
        </h1>
        <p className="text-gray-600">
          Get instant coping strategies, emotional support, and
          professional referrals 24/7
        </p>
      </div>

      {/* Crisis Support Banner */}
      <div className="border border-red-200 bg-red-50 rounded-lg">
        <div className="p-4 border-b border-red-200">
          <div className="flex items-center gap-2 text-red-700 font-medium">
            <AlertTriangle className="h-5 w-5" />
            Need Immediate Help?
          </div>
        </div>
        <div className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="bg-red-600 hover:bg-red-700 text-white h-auto p-4 flex flex-col rounded-lg transition-colors">
              <Phone className="h-6 w-6 mb-2" />
              <span className="font-medium">
                Crisis Hotline
              </span>
              <span className="text-sm">
                988 - Available 24/7
              </span>
            </button>
            <button className="bg-blue-600 hover:bg-blue-700 text-white h-auto p-4 flex flex-col rounded-lg transition-colors">
              <MessageCircle className="h-6 w-6 mb-2" />
              <span className="font-medium">
                Crisis Text Line
              </span>
              <span className="text-sm">
                Text HOME to 741741
              </span>
            </button>
            {setActiveTab && (
              <button
                className="border border-red-300 text-red-700 hover:bg-red-100 h-auto p-4 flex flex-col rounded-lg transition-colors"
                onClick={() => setActiveTab("booking")}
              >
                <Calendar className="h-6 w-6 mb-2" />
                <span className="font-medium">
                  Emergency Appointment
                </span>
                <span className="text-sm">
                  Book urgent counselor session
                </span>
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="h-[600px] flex flex-col border rounded-lg shadow-sm bg-white">
        <div className="bg-purple-50 border-b p-4">
          <div className="flex items-center gap-2 font-medium">
            <Bot className="h-5 w-5 text-purple-600" />
            AI Companion
            {getConnectionBadge()}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto flex flex-col">
          {/* Backend Status Warning */}
          {connectionStatus === "offline" && (
            <div className="bg-yellow-50 border-b border-yellow-200 p-3">
              <div className="flex items-center gap-2 text-yellow-800 text-sm">
                <AlertTriangle className="h-4 w-4" />
                Backend connection failed. Make sure FastAPI server is running on http://localhost:5050
                <button 
                  onClick={testConnection}
                  className="ml-auto text-xs h-6 px-2 border border-yellow-300 rounded hover:bg-yellow-100 transition-colors"
                >
                  Retry
                </button>
              </div>
            </div>
          )}

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`flex items-start space-x-2 max-w-[80%] ${message.sender === "user" ? "flex-row-reverse space-x-reverse" : ""}`}
                >
                  <div
                    className={`p-2 rounded-full ${message.sender === "user" ? "bg-purple-100" : "bg-gray-100"}`}
                  >
                    {message.sender === "user" ? (
                      <User className="h-4 w-4 text-purple-600" />
                    ) : (
                      <Heart className="h-4 w-4 text-pink-600" />
                    )}
                  </div>
                  <div
                    className={`p-3 rounded-lg ${
                      message.sender === "user"
                        ? "bg-purple-600 text-white"
                        : "bg-gray-100 text-gray-900"
                    }`}
                  >
                    <p className="whitespace-pre-line">{message.content}</p>
                    {message.suggestions && (
                      <div className="mt-3 space-y-2">
                        <p className="text-sm opacity-75">
                          Quick responses:
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {message.suggestions.map(
                            (suggestion, index) => (
                              <button
                                key={index}
                                className="text-xs h-6 px-2 border border-white/30 rounded hover:bg-white/30 bg-white/20 transition-colors"
                                onClick={() =>
                                  handleSuggestionClick(
                                    suggestion,
                                  )
                                }
                              >
                                {suggestion}
                              </button>
                            ),
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="flex items-start space-x-2">
                  <div className="p-2 rounded-full bg-gray-100">
                    <Heart className="h-4 w-4 text-pink-600" />
                  </div>
                  <div className="p-3 rounded-lg bg-gray-100">
                    <div className="flex space-x-1">
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0ms" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "150ms" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "300ms" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 border-t bg-gray-50">
            <div className="flex space-x-2">
              <input
                value={inputMessage}
                onChange={(e) =>
                  setInputMessage(e.target.value)
                }
                placeholder="Share what's on your mind..."
                onKeyPress={(e) =>
                  e.key === "Enter" && sendMessage(inputMessage)
                }
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                disabled={isTyping}
              />
              <button
                onClick={() => sendMessage(inputMessage)}
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isTyping || !inputMessage.trim()}
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2 text-center">
              This AI companion provides general support. For
              crisis situations, please contact emergency
              services or a mental health professional.
            </p>
          </div>
        </div>
      </div>

      {/* Quick Start Suggestions */}
      <div className="border rounded-lg shadow-sm bg-white">
        <div className="p-4 border-b">
          <div className="flex items-center gap-2 font-medium">
            <Lightbulb className="h-5 w-5 text-yellow-500" />
            Not sure what to talk about?
          </div>
        </div>
        <div className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              "I'm feeling stressed about exams",
              "I'm having trouble making friends",
              "I feel lonely and isolated",
              "I'm worried about my future",
              "I'm having relationship problems",
              "I can't seem to stay motivated",
            ].map((suggestion, index) => (
              <button
                key={index}
                className="border border-gray-300 hover:bg-gray-50 text-left justify-start h-auto p-3 rounded-lg transition-colors flex items-center"
                onClick={() => sendMessage(suggestion)}
              >
                <MessageCircle className="h-4 w-4 mr-2 text-purple-600" />
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Professional Support Options */}
      <div className="border rounded-lg shadow-sm bg-white">
        <div className="p-4 border-b">
          <div className="flex items-center gap-2 font-medium">
            <Shield className="h-5 w-5 text-green-600" />
            Need Professional Support?
          </div>
        </div>
        <div className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {setActiveTab && (
              <button
                className="border border-gray-300 hover:bg-gray-50 h-auto p-4 flex flex-col items-center space-y-2 rounded-lg transition-colors"
                onClick={() => setActiveTab("booking")}
              >
                <Calendar className="h-6 w-6 text-purple-600" />
                <span className="font-medium">
                  Book Counselor Appointment
                </span>
                <span className="text-xs text-gray-500">
                  Confidential sessions with licensed
                  professionals
                </span>
              </button>
            )}
            {setActiveTab && (
              <button
                className="border border-gray-300 hover:bg-gray-50 h-auto p-4 flex flex-col items-center space-y-2 rounded-lg transition-colors"
                onClick={() => setActiveTab("forum")}
              >
                <User className="h-6 w-6 text-blue-600" />
                <span className="font-medium">
                  Join Peer Support
                </span>
                <span className="text-xs text-gray-500">
                  Connect with trained student volunteers
                </span>
              </button>
            )}
            {setActiveTab && (
              <button
                className="border border-gray-300 hover:bg-gray-50 h-auto p-4 flex flex-col items-center space-y-2 rounded-lg transition-colors"
                onClick={() => setActiveTab("resources")}
              >
                <Heart className="h-6 w-6 text-green-600" />
                <span className="font-medium">
                  Browse Resources
                </span>
                <span className="text-xs text-gray-500">
                  Find helplines, apps, and support services
                </span>
              </button>
            )}
            {setActiveTab && (
              <button
                className="border border-gray-300 hover:bg-gray-50 h-auto p-4 flex flex-col items-center space-y-2 rounded-lg transition-colors"
                onClick={() => setActiveTab("videos")}
              >
                <Lightbulb className="h-6 w-6 text-orange-600" />
                <span className="font-medium">
                  Watch Guided Videos
                </span>
                <span className="text-xs text-gray-500">
                  Learn coping techniques and wellness
                  strategies
                </span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}