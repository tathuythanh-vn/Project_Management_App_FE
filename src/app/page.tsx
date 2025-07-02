import { ArrowRight, CheckCircle, Users, Calendar, BarChart3, Zap, Shield, Globe } from 'lucide-react';
import Link from "next/link";

export default function Page() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
            {/* Navigation */}
            <nav className="relative z-10 px-6 py-4">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-lg">P</span>
                        </div>
                        <span className="text-white text-xl font-bold">Plex</span>
                    </div>
                    <div className="hidden md:flex items-center space-x-8">
                        <a href="#features" className="text-gray-300 hover:text-white transition-colors">Features</a>
                        <a href="#pricing" className="text-gray-300 hover:text-white transition-colors">Pricing</a>
                        <a href="#about" className="text-gray-300 hover:text-white transition-colors">About</a>
                        <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all transform hover:scale-105">
                            Get Started
                        </button>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <div className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-800/20 to-pink-800/20"></div>
                <div className="relative max-w-7xl mx-auto px-6 py-20 text-center">
                    <div className="mb-8">
                        <span className="inline-flex items-center px-4 py-2 rounded-full bg-purple-500/20 text-purple-300 text-sm font-medium mb-8">
                            <Zap className="w-4 h-4 mr-2" />
                            Streamline Your Workflow
                        </span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                        Project Management
                        <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                            Reimagined
                        </span>
                    </h1>

                    <p className="text-xl text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed">
                        Transform your team's productivity with Plex. Intuitive project tracking, seamless collaboration,
                        and powerful analytics in one elegant platform.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <Link href={'/login'} className="group bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition-all transform hover:scale-105 shadow-2xl hover:shadow-purple-500/25">
                            Start Free Trial
                            <ArrowRight className="inline-block ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <button className="border-2 border-white/20 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-white/10 transition-all backdrop-blur-sm">
                            Watch Demo
                        </button>
                    </div>
                </div>

                {/* Floating Cards Animation */}
                <div className="absolute top-20 left-10 w-64 h-40 bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-6 animate-pulse">
                    <div className="flex items-center mb-4">
                        <div className="w-3 h-3 bg-green-400 rounded-full mr-2"></div>
                        <span className="text-white text-sm">Project Alpha</span>
                    </div>
                    <div className="space-y-2">
                        <div className="w-full bg-gray-600 rounded h-2"></div>
                        <div className="w-3/4 bg-gray-600 rounded h-2"></div>
                        <div className="w-1/2 bg-gray-600 rounded h-2"></div>
                    </div>
                </div>

                <div className="absolute top-40 right-10 w-56 h-32 bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-4 animate-bounce" style={{animationDuration: '3s'}}>
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-white text-sm">Team Velocity</span>
                        <BarChart3 className="w-4 h-4 text-purple-400" />
                    </div>
                    <div className="flex items-end space-x-1 h-12">
                        <div className="w-2 bg-purple-500 rounded-t" style={{height: '60%'}}></div>
                        <div className="w-2 bg-pink-500 rounded-t" style={{height: '80%'}}></div>
                        <div className="w-2 bg-purple-500 rounded-t" style={{height: '100%'}}></div>
                        <div className="w-2 bg-pink-500 rounded-t" style={{height: '40%'}}></div>
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div id="features" className="py-20 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-white mb-4">Powerful Features</h2>
                        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                            Everything you need to manage projects efficiently and keep your team aligned
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            {
                                icon: <Users className="w-8 h-8" />,
                                title: "Team Collaboration",
                                description: "Real-time collaboration tools that keep everyone on the same page with instant updates and notifications."
                            },
                            {
                                icon: <Calendar className="w-8 h-8" />,
                                title: "Smart Scheduling",
                                description: "AI-powered scheduling that automatically optimizes timelines and identifies potential bottlenecks."
                            },
                            {
                                icon: <BarChart3 className="w-8 h-8" />,
                                title: "Advanced Analytics",
                                description: "Comprehensive reporting and analytics to track progress, performance, and predict project outcomes."
                            },
                            {
                                icon: <CheckCircle className="w-8 h-8" />,
                                title: "Task Management",
                                description: "Intuitive task organization with custom workflows, dependencies, and automated progress tracking."
                            },
                            {
                                icon: <Shield className="w-8 h-8" />,
                                title: "Enterprise Security",
                                description: "Bank-level security with end-to-end encryption, SSO integration, and compliance standards."
                            },
                            {
                                icon: <Globe className="w-8 h-8" />,
                                title: "Global Access",
                                description: "Cloud-based platform accessible from anywhere with offline sync and mobile optimization."
                            }
                        ].map((feature, index) => (
                            <div key={index} className="group bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 hover:bg-white/10 transition-all duration-300 hover:transform hover:scale-105">
                                <div className="text-purple-400 mb-4 group-hover:text-pink-400 transition-colors">
                                    {feature.icon}
                                </div>
                                <h3 className="text-white text-xl font-semibold mb-3">{feature.title}</h3>
                                <p className="text-gray-400 leading-relaxed">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="py-20 px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 backdrop-blur-lg rounded-3xl p-12 border border-white/10">
                        <h2 className="text-4xl font-bold text-white mb-6">
                            Ready to Transform Your Projects?
                        </h2>
                        <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
                            Join thousands of teams who have revolutionized their workflow with Plex.
                            Start your free trial today and experience the difference.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition-all transform hover:scale-105 shadow-2xl">
                                Start Free Trial
                            </button>
                            <button className="border-2 border-white/20 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-white/10 transition-all">
                                Contact Sales
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="border-t border-white/10 py-12 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className="flex items-center space-x-2 mb-4 md:mb-0">
                            <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-lg">P</span>
                            </div>
                            <span className="text-white text-xl font-bold">Plex</span>
                        </div>
                        <div className="flex space-x-8 text-gray-400">
                            <a href="#" className="hover:text-white transition-colors">Privacy</a>
                            <a href="#" className="hover:text-white transition-colors">Terms</a>
                            <a href="#" className="hover:text-white transition-colors">Support</a>
                        </div>
                    </div>
                    <div className="mt-8 pt-8 border-t border-white/10 text-center text-gray-400">
                        <p>&copy; 2025 Plex Project Management. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}