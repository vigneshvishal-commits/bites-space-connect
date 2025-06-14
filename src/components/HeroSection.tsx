
import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowRight } from 'lucide-react';

const HeroSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  // Floating ball animation variants
  const ballVariants = {
    animate: (i: number) => ({
      y: [0, -20, 0],
      x: [0, 10, -10, 0],
      scale: [1, 1.1, 0.9, 1],
      transition: {
        duration: 4 + i * 0.5,
        repeat: Infinity,
        delay: i * 0.8,
        ease: "easeInOut"
      }
    })
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center pt-20 relative overflow-hidden" ref={ref}>
      {/* Animated Background Balls */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-4 h-4 rounded-full ${
              i % 3 === 0 ? 'bg-blue-300/30' : 
              i % 3 === 1 ? 'bg-green-300/30' : 'bg-orange-300/30'
            }`}
            style={{
              left: `${10 + i * 12}%`,
              top: `${15 + (i % 3) * 25}%`,
            }}
            variants={ballVariants}
            animate="animate"
            custom={i}
          />
        ))}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={`ball-${i}`}
            className={`absolute w-3 h-3 rounded-full ${
              i % 2 === 0 ? 'bg-purple-300/25' : 'bg-pink-300/25'
            }`}
            style={{
              right: `${5 + i * 15}%`,
              top: `${20 + (i % 2) * 30}%`,
            }}
            variants={ballVariants}
            animate="animate"
            custom={i + 8}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center relative z-10">
        <motion.div
          className="space-y-8"
          initial={{ opacity: 0, x: -50 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.h1
            className="text-5xl lg:text-7xl font-bold leading-tight"
            style={{ fontFamily: 'Playfair Display, serif' }}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Welcome to{' '}
            <span className="text-blue-600">Bites</span>{' '}
            <span className="text-green-600">Space</span>
          </motion.h1>
          
          <motion.p
            className="text-xl lg:text-2xl text-gray-600 leading-relaxed"
            style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Your ultimate cafeteria destination at Cognizant. Discover amazing flavors, connect with colleagues, and make every meal memorable.
          </motion.p>
          
          <motion.div
            className="flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <motion.button
              className="bg-blue-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-blue-700 transition-all duration-300 flex items-center justify-center group shadow-lg hover:shadow-xl"
              style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              Explore Menu
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </motion.button>
            
            <motion.button
              className="border-2 border-green-600 text-green-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-green-600 hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl"
              style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              Learn More
            </motion.button>
          </motion.div>
        </motion.div>
        
        <motion.div
          className="relative"
          initial={{ opacity: 0, x: 50 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="relative">
            <motion.img
              src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              alt="Employees dining together in cafeteria"
              className="rounded-3xl shadow-2xl w-full object-cover h-[600px]"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 to-green-600/20 rounded-3xl" />
            
            <motion.div
              className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-6 shadow-xl border border-blue-200"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 1, duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
            >
              <p className="text-2xl font-bold text-gray-800" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>8+</p>
              <p className="text-gray-600" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>Food Stalls</p>
            </motion.div>
            
            <motion.div
              className="absolute -top-6 -right-6 bg-white rounded-2xl p-6 shadow-xl border border-green-200"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 1.2, duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
            >
              <p className="text-2xl font-bold text-gray-800" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>4.8★</p>
              <p className="text-gray-600" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>Rating</p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
