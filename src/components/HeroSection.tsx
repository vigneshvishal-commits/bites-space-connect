
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const HeroSection = () => {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-white/50 to-green-400/10" />
      
      {/* Enhanced animated background elements */}
      <motion.div
        className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-r from-blue-500/10 to-green-500/10 rounded-full"
        animate={{ 
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360],
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{ 
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div
        className="absolute top-1/3 right-20 w-24 h-24 bg-gradient-to-r from-blue-600/15 to-green-600/15 rounded-full"
        animate={{ 
          y: [0, -30, 0],
          x: [0, 20, 0],
          scale: [1, 1.1, 1]
        }}
        transition={{ 
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div
        className="absolute bottom-20 left-1/4 w-16 h-16 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-full"
        animate={{ 
          rotate: [0, -180, -360],
          scale: [1, 1.3, 1]
        }}
        transition={{ 
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <motion.div
        className="absolute top-20 right-1/3 w-20 h-20 bg-green-400/15 rounded-full"
        animate={{ 
          y: [0, 25, 0],
          x: [0, -15, 0],
          rotate: [0, 90, 180, 270, 360]
        }}
        transition={{ 
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <motion.div
        className="absolute bottom-1/3 right-10 w-14 h-14 bg-blue-400/20 rounded-full"
        animate={{ 
          scale: [1, 1.4, 1],
          opacity: [0.2, 0.5, 0.2],
          rotate: [360, 0]
        }}
        transition={{ 
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <div className="container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1
              className="text-5xl lg:text-7xl font-bold text-gray-800 leading-tight"
              style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              Feeling <span className="text-blue-600">hungry?</span> <br />
              Hustle in <span className="text-green-600">Queues?</span>
            </motion.h1>
            
            <motion.p
              className="text-xl text-gray-600 leading-relaxed max-w-lg"
              style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Explore foods and order now! Bites Space brings convenience to your fingertips, connecting you with your favorite stalls and making order management seamless. <span className="text-green-600 font-semibold">Eat smart, skip the wait.</span>
            </motion.p>
            
            <motion.button
              className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 via-blue-700 to-green-600 text-white rounded-full font-semibold text-lg overflow-hidden shadow-xl transition-all duration-300 flex items-center space-x-2"
              style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              whileHover={{ 
                scale: 1.05, 
                y: -2,
                boxShadow: "0 20px 40px rgba(37, 99, 235, 0.3)"
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() => console.log('Order Now clicked!')}
            >
              {/* Background animation on hover */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-green-600 via-blue-700 to-green-500"
                initial={{ x: '-100%' }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
              
              <span className="relative z-10">Order Now</span>
              <ArrowRight className="relative z-10 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              
              {/* Enhanced pulse effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-400 to-green-400 rounded-full opacity-30"
                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0, 0.3] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.button>
          </motion.div>
          
          {/* Hero Image - Multi-cuisine Food with Organic Shape */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="relative z-10">
              {/* Organic blob background */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-blue-400/20 via-green-400/15 to-blue-500/20 rounded-[50px] transform rotate-6"
                style={{
                  clipPath: "polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)"
                }}
                animate={{ 
                  rotate: [6, -3, 6],
                  scale: [1, 1.02, 1]
                }}
                transition={{ 
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              
              {/* Floating image container */}
              <motion.div
                className="relative overflow-hidden rounded-[40px] shadow-2xl"
                style={{
                  clipPath: "polygon(20% 0%, 90% 5%, 95% 85%, 75% 100%, 5% 95%, 0% 15%)"
                }}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Multi-cuisine food platter with variety of dishes"
                  className="w-full h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />
              </motion.div>
            </div>
            
            {/* Enhanced Floating Elements */}
            <motion.div
              className="absolute -top-4 -left-4 w-20 h-20 bg-gradient-to-r from-green-500/30 to-blue-500/30 rounded-full blur-sm"
              animate={{ 
                y: [0, -20, 0],
                rotate: [0, 180, 360],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            <motion.div
              className="absolute -bottom-6 -right-6 w-16 h-16 bg-gradient-to-r from-blue-500/30 to-green-700/30 rounded-full blur-sm"
              animate={{ 
                y: [0, 20, 0],
                rotate: [360, 180, 0],
                scale: [1, 1.2, 1]
              }}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
