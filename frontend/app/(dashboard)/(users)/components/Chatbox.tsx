'use client';
import React, { useState, useRef, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
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

export function Chatbox({ setActiveTab }: ChatboxProps = {}) {
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
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

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

  const generateBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();

    // Crisis detection
    if (detectCrisis(userMessage)) {
      return "I'm really concerned about what you're sharing. Your safety is the most important thing right now. Please reach out to a crisis counselor immediately:\n\n🆘 **Crisis Hotline: 988** (24/7)\n📱 **Text HOME to 741741** for Crisis Text Line\n🏥 **Call 911** if you're in immediate danger\n\n💜 You don't have to face this alone. There are trained professionals ready to help you right now. Would you like me to help you book an urgent appointment with a campus counselor?";
    }

    if (
      lowerMessage.includes("anxious") ||
      lowerMessage.includes("anxiety") ||
      lowerMessage.includes("panic")
    ) {
      return "I understand you're feeling anxious. Here are some immediate techniques that might help:\n\n🌬️ **4-7-8 Breathing**: Inhale for 4, hold for 7, exhale for 8\n🖐️ **5-4-3-2-1 Grounding**: 5 things you see, 4 you hear, 3 you touch, 2 you smell, 1 you taste\n💪 **Progressive Muscle Relaxation**: Tense and release each muscle group\n\nIf anxiety is frequent or severe, I'd recommend talking to a professional. Would you like me to help you book an appointment with a counselor who specializes in anxiety?";
    }

    if (
      lowerMessage.includes("sleep") ||
      lowerMessage.includes("insomnia") ||
      lowerMessage.includes("tired")
    ) {
      return "Sleep difficulties can really impact your mental health. Here are some evidence-based strategies:\n\n🌙 **Sleep Hygiene**: Consistent bedtime, cool dark room, no screens 1 hour before bed\n☕ **Limit Caffeine**: No caffeine after 2 PM\n🧘 **Relaxation**: Try meditation, gentle stretching, or reading\n\nIf sleep problems persist for more than 2 weeks, it's worth discussing with a healthcare provider. Our campus has sleep specialists available. Would you like information about booking an appointment?";
    }

    if (
      lowerMessage.includes("overwhelmed") ||
      lowerMessage.includes("stress") ||
      lowerMessage.includes("pressure")
    ) {
      return "Feeling overwhelmed is completely valid, especially with academic and life pressures. Let's work through this:\n\n📝 **Brain Dump**: Write down everything that's overwhelming you\n🎯 **Prioritize**: Sort by urgent vs. important using the Eisenhower Matrix\n⏰ **Break It Down**: Turn big tasks into smaller, manageable steps\n🤝 **Ask for Help**: Reach out to professors, friends, or family\n\nSometimes talking to a counselor can help you develop personalized coping strategies. Would you like me to connect you with someone who can help?";
    }

    if (
      lowerMessage.includes("sad") ||
      lowerMessage.includes("depressed") ||
      lowerMessage.includes("down") ||
      lowerMessage.includes("empty")
    ) {
      return "I hear that you're going through a difficult time. Your feelings are completely valid, and reaching out shows real strength. Here are some gentle strategies that might help:\n\n🚶 **Gentle Movement**: Even a 5-minute walk can help\n🌞 **Light Exposure**: Spend time by a window or outside\n👥 **Connection**: Reach out to someone you trust\n💝 **Self-Compassion**: Treat yourself as you would a good friend\n\nIf these feelings persist or interfere with daily life, professional support can be really helpful. Depression is very treatable. Would you like information about counseling services?";
    }

    if (
      lowerMessage.includes("lonely") ||
      lowerMessage.includes("isolated") ||
      lowerMessage.includes("alone")
    ) {
      return "Loneliness can be really painful, and you're not alone in feeling this way. Here are some ways to connect:\n\n💬 **Join Our Forum**: Connect with peers who understand what you're going through\n🎯 **Campus Activities**: Look for clubs or groups that match your interests\n📞 **Reach Out**: Even a brief text to someone can help\n🤝 **Volunteer**: Helping others often helps us feel more connected\n\nOur peer support forum is moderated by trained student volunteers. Would you like me to help you get started there, or would you prefer to talk to a professional counselor?";
    }

    if (
      lowerMessage.includes("exam") ||
      lowerMessage.includes("test") ||
      lowerMessage.includes("study") ||
      lowerMessage.includes("academic")
    ) {
      return "Academic stress is one of the most common challenges students face. Here are some strategies that can help:\n\n📅 **Study Schedule**: Break study time into manageable chunks with breaks\n🧠 **Active Learning**: Use techniques like flashcards, practice tests, or study groups\n😴 **Rest & Nutrition**: Your brain needs sleep and proper fuel to function\n🎯 **Focus on Process**: Control the preparation, not just the outcome\n\nIf academic stress is significantly impacting your mental health, our counselors are experienced in helping students develop effective coping strategies. Would you like to explore that option?";
    }

    if (
      lowerMessage.includes("good") ||
      lowerMessage.includes("well") ||
      lowerMessage.includes("happy") ||
      lowerMessage.includes("better")
    ) {
      return "I'm so glad to hear you're doing well! 🌟 It's wonderful when we can recognize and celebrate the good moments. Here are ways to maintain and build on this positive state:\n\n🙏 **Gratitude Practice**: Write down 3 things you're grateful for\n📱 **Share the Joy**: Tell someone about your positive experience\n💾 **Document It**: Keep a record of what's working well for you\n🔄 **Reflect**: What contributed to feeling this way?\n\nBuilding resilience during good times helps us weather future challenges. Keep up the great work on your mental health journey!";
    }

    return "Thank you for sharing that with me. I'm here to listen and support you through whatever you're experiencing. Remember that seeking help is a sign of strength, not weakness.\n\n💜 **Always Available**: I'm here 24/7 for immediate support\n🏥 **Professional Help**: Our counselors are trained to help with deeper challenges\n👥 **Peer Support**: Connect with others who understand your experiences\n📚 **Resources**: Access videos, exercises, and educational materials\n\nCan you tell me a bit more about what you're experiencing? Sometimes talking through our thoughts and feelings can help us process them better.";
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

    // Simulate bot typing delay
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: generateBotResponse(content),
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
      setIsTyping(false);
    }, 1500);
  };

  const handleSuggestionClick = (suggestion: string) => {
    sendMessage(suggestion);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-2xl text-purple-600">
          AI-Guided First-Aid Support
        </h1>
        <p className="text-muted-foreground">
          Get instant coping strategies, emotional support, and
          professional referrals 24/7
        </p>
      </div>

      {/* Crisis Support Banner */}
      <Card className="border-red-200 bg-red-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-700">
            <AlertTriangle className="h-5 w-5" />
            Need Immediate Help?
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button className="bg-red-600 hover:bg-red-700 h-auto p-4 flex flex-col">
              <Phone className="h-6 w-6 mb-2" />
              <span className="font-medium">
                Crisis Hotline
              </span>
              <span className="text-sm">
                988 - Available 24/7
              </span>
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700 h-auto p-4 flex flex-col">
              <MessageCircle className="h-6 w-6 mb-2" />
              <span className="font-medium">
                Crisis Text Line
              </span>
              <span className="text-sm">
                Text HOME to 741741
              </span>
            </Button>
            {setActiveTab && (
              <Button
                variant="outline"
                className="border-red-300 text-red-700 hover:bg-red-100 h-auto p-4 flex flex-col"
                onClick={() => setActiveTab("booking")}
              >
                <Calendar className="h-6 w-6 mb-2" />
                <span className="font-medium">
                  Emergency Appointment
                </span>
                <span className="text-sm">
                  Book urgent counselor session
                </span>
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      <Card className="h-[600px] flex flex-col">
        <CardHeader className="bg-purple-50 border-b">
          <CardTitle className="flex items-center gap-2">
            <Bot className="h-5 w-5 text-purple-600" />
            AI Companion
            <Badge variant="secondary" className="ml-auto">
              Online
            </Badge>
          </CardTitle>
        </CardHeader>

        <CardContent className="flex-1 flex flex-col p-0">
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
                    <p>{message.content}</p>
                    {message.suggestions && (
                      <div className="mt-3 space-y-2">
                        <p className="text-sm opacity-75">
                          Quick responses:
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {message.suggestions.map(
                            (suggestion, index) => (
                              <Button
                                key={index}
                                size="sm"
                                variant="outline"
                                className="text-xs h-6 bg-white/20 border-white/30 hover:bg-white/30"
                                onClick={() =>
                                  handleSuggestionClick(
                                    suggestion,
                                  )
                                }
                              >
                                {suggestion}
                              </Button>
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
              <Input
                value={inputMessage}
                onChange={(e) =>
                  setInputMessage(e.target.value)
                }
                placeholder="Share what's on your mind..."
                onKeyPress={(e) =>
                  e.key === "Enter" && sendMessage(inputMessage)
                }
                className="flex-1"
              />
              <Button
                onClick={() => sendMessage(inputMessage)}
                className="bg-purple-600 hover:bg-purple-700"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-2 text-center">
              This AI companion provides general support. For
              crisis situations, please contact emergency
              services or a mental health professional.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Quick Start Suggestions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-yellow-500" />
            Not sure what to talk about?
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              "I'm feeling stressed about exams",
              "I'm having trouble making friends",
              "I feel lonely and isolated",
              "I'm worried about my future",
              "I'm having relationship problems",
              "I can't seem to stay motivated",
            ].map((suggestion, index) => (
              <Button
                key={index}
                variant="outline"
                className="text-left justify-start h-auto p-3"
                onClick={() => sendMessage(suggestion)}
              >
                <MessageCircle className="h-4 w-4 mr-2 text-purple-600" />
                {suggestion}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Professional Support Options */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-green-600" />
            Need Professional Support?
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {setActiveTab && (
              <Button
                variant="outline"
                className="h-auto p-4 flex flex-col items-center space-y-2"
                onClick={() => setActiveTab("booking")}
              >
                <Calendar className="h-6 w-6 text-purple-600" />
                <span className="font-medium">
                  Book Counselor Appointment
                </span>
                <span className="text-xs text-muted-foreground">
                  Confidential sessions with licensed
                  professionals
                </span>
              </Button>
            )}
            {setActiveTab && (
              <Button
                variant="outline"
                className="h-auto p-4 flex flex-col items-center space-y-2"
                onClick={() => setActiveTab("forum")}
              >
                <User className="h-6 w-6 text-blue-600" />
                <span className="font-medium">
                  Join Peer Support
                </span>
                <span className="text-xs text-muted-foreground">
                  Connect with trained student volunteers
                </span>
              </Button>
            )}
            {setActiveTab && (
              <Button
                variant="outline"
                className="h-auto p-4 flex flex-col items-center space-y-2"
                onClick={() => setActiveTab("resources")}
              >
                <Heart className="h-6 w-6 text-green-600" />
                <span className="font-medium">
                  Browse Resources
                </span>
                <span className="text-xs text-muted-foreground">
                  Find helplines, apps, and support services
                </span>
              </Button>
            )}
            {setActiveTab && (
              <Button
                variant="outline"
                className="h-auto p-4 flex flex-col items-center space-y-2"
                onClick={() => setActiveTab("videos")}
              >
                <Lightbulb className="h-6 w-6 text-orange-600" />
                <span className="font-medium">
                  Watch Guided Videos
                </span>
                <span className="text-xs text-muted-foreground">
                  Learn coping techniques and wellness
                  strategies
                </span>
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}