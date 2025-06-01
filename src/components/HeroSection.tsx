
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const HeroSection = () => {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-blue-400/10" />
      
      {/* Additional animated background elements */}
      <motion.div
        className="absolute top-10 left-10 w-32 h-32 bg-blue-500/10 rounded-full"
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
        className="absolute top-1/3 right-20 w-24 h-24 bg-blue-600/15 rounded-full"
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
        className="absolute bottom-20 left-1/4 w-16 h-16 bg-green-500/20 rounded-full"
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
              <span className="text-blue-600">Hungry?</span>{' '}
              <span className="text-blue-800">Tired</span> in queues?
            </motion.h1>
            
            <motion.p
              className="text-xl text-gray-600 leading-relaxed max-w-lg"
              style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Redefining Cafeteria Convenience. Bites Space is not just a digital menu—it's your smart food partner. Designed for modern offices, our platform connects you to your favorite cafeteria stalls, streamlines orders, and eliminates the hassle of queues.
            </motion.p>
            
            <motion.button
              className="group relative px-8 py-4 bg-blue-600 text-white rounded-full font-semibold text-lg overflow-hidden shadow-xl transition-all duration-300 flex items-center space-x-2"
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
                className="absolute inset-0 bg-gradient-to-r from-blue-700 to-blue-500"
                initial={{ x: '-100%' }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
              
              <span className="relative z-10">Order Now</span>
              <ArrowRight className="relative z-10 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              
              {/* Pulse effect */}
              <motion.div
                className="absolute inset-0 bg-blue-400 rounded-full opacity-30"
                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0, 0.3] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.button>
          </motion.div>
          
          {/* Hero Image - Platter of Food */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="relative z-10">
              <motion.img
                src="https://images.unsplash.com/photo-1493770348161-369560ae357d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Delicious platter of food with variety of dishes"
                className="w-full h-[500px] object-cover rounded-3xl shadow-2xl"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              />
            </div>
            
            {/* Enhanced Floating Elements */}
            <motion.div
              className="absolute -top-4 -left-4 w-20 h-20 bg-blue-500 rounded-full opacity-20"
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
              className="absolute -bottom-4 -right-4 w-16 h-16 bg-blue-700 rounded-full opacity-20"
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
            
            <motion.div
              className="absolute top-1/2 -left-8 w-12 h-12 bg-green-500 rounded-full opacity-25"
              animate={{ 
                x: [0, 15, 0],
                rotate: [0, 360, 0]
              }}
              transition={{ 
                duration: 5,
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
