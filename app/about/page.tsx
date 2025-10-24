import Link from 'next/link';
import { MessageCircle } from 'lucide-react';

export default function About() {
  return (
    <div className="min-h-screen  py-12 px-4 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            About Me
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Welcome to my personal space. Let me share a bit about myself and my journey.
          </p>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Text Content */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Hello! I'm rasool
              </h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                I'm a passionate developer who loves creating beautiful and functional web applications. 
                This blog is my space to share thoughts, experiences, and knowledge with the world.
              </p>
              <p className="text-gray-600 mb-6 leading-relaxed">
                When I'm not coding, you can find me exploring new technologies, contributing to open source, 
                or enjoying a good book with a cup of coffee.
              </p>
              
              {/* Skills/Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                  Next.js
                </span>
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                  React
                </span>
                <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
                  TypeScript
                </span>
                <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
                  Tailwind CSS
                </span>
              </div>
            </div>

            {/* Contact Card */}
            <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl p-6 text-white">
              <h3 className="text-2xl font-bold mb-4">Let's Connect!</h3>
              <p className="mb-6 opacity-90">
                Feel free to reach out if you want to collaborate, ask questions, or just say hello!
              </p>
              
              {/* Telegram Button */}
              <Link 
                href="https://t.me/rslid" 
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 bg-white text-blue-600 hover:bg-gray-100 font-semibold py-3 px-6 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl w-full"
              >
                <MessageCircle className="w-5 h-5" />
                Message me on Telegram
              </Link>

              {/* Additional contact info */}
              <div className="mt-6 pt-6 border-t border-white/20">
                <p className="text-sm opacity-80">
                  You can also find me on other platforms or email me at:
                </p>
                <p className="font-medium mt-2">
                  rslhshmy@gmail.com
                </p>
              </div>
            </div>
          </div>
        </div>

      
      </div>
    </div>
  );
}