
import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const AboutSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  // Floating ball animation variants
  const ballVariants = {
    animate: (i: number) => ({
      y: [0, -25, 15, -15, 0],
      x: [0, 10, -15, 8, 0],
      scale: [1, 1.1, 0.9, 1.2, 1],
      rotate: [0, 30, -45, 60, 0],
      transition: {
        duration: 7 + i * 0.8,
        repeat: Infinity,
        delay: i * 0.6,
        ease: "easeInOut"
      }
    })
  };

  return (
    <section id="about" className="py-20 bg-white relative overflow-hidden" ref={ref}>
      {/* Animated Background Balls */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Left side balls */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`left-${i}`}
            className={`absolute rounded-full ${
              i % 4 === 0 ? 'w-5 h-5 bg-blue-400/25' : 
              i % 4 === 1 ? 'w-3 h-3 bg-green-400/30' :
              i % 4 === 2 ? 'w-4 h-4 bg-purple-300/20' : 'w-6 h-6 bg-orange-400/25'
            }`}
            style={{
              left: `${3 + i * 5}%`,
              top: `${10 + (i % 4) * 20}%`,
            }}
            variants={ballVariants}
            animate="animate"
            custom={i}
          />
        ))}
        
        {/* Right side balls */}
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={`right-${i}`}
            className={`absolute rounded-full ${
              i % 3 === 0 ? 'w-4 h-4 bg-pink-300/30' : 
              i % 3 === 1 ? 'w-5 h-5 bg-teal-300/25' : 'w-3 h-3 bg-indigo-400/35'
            }`}
            style={{
              right: `${2 + i * 7}%`,
              top: `${5 + (i % 5) * 15}%`,
            }}
            variants={ballVariants}
            animate="animate"
            custom={i + 8}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="order-2 lg:order-1"
          >
            <div className="relative">
              {/* Modern splashy polygon shape for employees cafeteria dining image */}
              <div className="relative overflow-hidden" style={{
                clipPath: 'polygon(6% 1%, 16% 3%, 26% 0%, 36% 4%, 46% 1%, 56% 5%, 66% 2%, 76% 6%, 86% 3%, 94% 9%, 97% 19%, 99% 29%, 96% 39%, 98% 49%, 95% 59%, 92% 69%, 88% 79%, 83% 88%, 76% 95%, 66% 99%, 56% 97%, 46% 100%, 36% 96%, 26% 98%, 16% 94%, 8% 89%, 4% 81%, 1% 71%, 3% 61%, 0% 51%, 2% 41%, 5% 31%, 3% 21%, 7% 11%)',
                height: '500px'
              }}>
                <img
                  src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Employees enjoying meals together in modern cafeteria dining area"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-green-600/10" />
              </div>
            </div>
          </motion.div>
          
          <motion.div
            className="space-y-8 order-1 lg:order-2"
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.h2
              className="text-4xl lg:text-5xl font-bold text-gray-800"
              style={{ fontFamily: 'Playfair Display, serif' }}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              About <span className="text-blue-600">Bites</span> <span className="text-green-600">Space</span>
            </motion.h2>
            
            <motion.div
              className="space-y-6 text-lg text-gray-600 leading-relaxed"
              style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <p>
                Bites Space is more than just a cafeteria – it's the heart of our Cognizant community. 
                We bring together diverse culinary experiences that cater to every taste and preference.
              </p>
              
              <p>
                From healthy options to comfort food, our carefully curated selection of food stalls 
                ensures that every meal is an opportunity to discover something new and delicious.
              </p>
              
              <p>
                Join us in creating memorable moments, fostering connections, and enjoying exceptional 
                food in a vibrant and welcoming environment.
              </p>
            </motion.div>
            
            <motion.div
              className="grid grid-cols-2 gap-8"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.7, duration: 0.8 }}
            >
              <div className="text-center p-6 bg-blue-50 rounded-2xl border border-blue-200">
                <p className="text-3xl font-bold text-blue-600" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>8+</p>
                <p className="text-gray-600" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>Food Stalls</p>
              </div>
              
              <div className="text-center p-6 bg-green-50 rounded-2xl border border-green-200">
                <p className="text-3xl font-bold text-green-600" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>100+</p>
                <p className="text-gray-600" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>Menu Items</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
