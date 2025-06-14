
import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const HeroSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  // Floating ball animation variants
  const ballVariants = {
    animate: (i: number) => ({
      y: [0, -30, 10, -20, 0],
      x: [0, 15, -10, 5, 0],
      scale: [1, 1.2, 0.8, 1.1, 1],
      rotate: [0, 45, -30, 60, 0],
      transition: {
        duration: 6 + i * 0.7,
        repeat: Infinity,
        delay: i * 0.5,
        ease: "easeInOut"
      }
    })
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center pt-20 relative overflow-hidden" ref={ref}>
      {/* Enhanced Animated Background Balls - More scattered throughout */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Top area balls */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={`top-${i}`}
            className={`absolute rounded-full ${
              i % 5 === 0 ? 'w-4 h-4 bg-blue-400/30' : 
              i % 5 === 1 ? 'w-6 h-6 bg-green-400/25' :
              i % 5 === 2 ? 'w-3 h-3 bg-orange-300/35' : 
              i % 5 === 3 ? 'w-5 h-5 bg-purple-400/20' : 'w-2 h-2 bg-pink-400/40'
            }`}
            style={{
              left: `${2 + i * 6}%`,
              top: `${3 + (i % 6) * 12}%`,
            }}
            variants={ballVariants}
            animate="animate"
            custom={i}
          />
        ))}
        
        {/* Middle area balls */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={`middle-${i}`}
            className={`absolute rounded-full ${
              i % 4 === 0 ? 'w-7 h-7 bg-rose-300/25' : 
              i % 4 === 1 ? 'w-3 h-3 bg-indigo-300/30' : 
              i % 4 === 2 ? 'w-5 h-5 bg-yellow-300/35' : 'w-4 h-4 bg-teal-300/25'
            }`}
            style={{
              right: `${5 + i * 8}%`,
              top: `${35 + (i % 4) * 18}%`,
            }}
            variants={ballVariants}
            animate="animate"
            custom={i + 15}
          />
        ))}
        
        {/* Bottom area balls */}
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={`bottom-${i}`}
            className={`absolute rounded-full ${
              i % 3 === 0 ? 'w-6 h-6 bg-cyan-300/30' : 
              i % 3 === 1 ? 'w-4 h-4 bg-emerald-300/25' : 'w-3 h-3 bg-violet-300/35'
            }`}
            style={{
              left: `${8 + i * 10}%`,
              bottom: `${3 + (i % 3) * 12}%`,
            }}
            variants={ballVariants}
            animate="animate"
            custom={i + 27}
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
            <span className="text-green-600">Hungry?</span>{' '}
            <span className="text-gray-800">Hustle in</span>{' '}
            <span className="text-blue-600">Queues?</span>
          </motion.h1>
          
          <motion.p
            className="text-xl lg:text-2xl text-gray-600 leading-relaxed"
            style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Redefining Cafeteria Convenience. Bites Space is not just a digital menu—it's your smart food partner. Designed for modern offices, our platform connects you to your favorite cafeteria stalls, streamlines orders, and eliminates the hassle of queues.
          </motion.p>
        </motion.div>
        
        <motion.div
          className="relative"
          initial={{ opacity: 0, x: 50 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="relative">
            {/* Modern splashy polygon-shaped container for biryani/chicken masala platter */}
            <motion.div
              className="relative"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div className="relative overflow-hidden" style={{
                clipPath: 'polygon(8% 2%, 18% 0%, 28% 3%, 38% 1%, 48% 4%, 58% 0%, 68% 2%, 78% 5%, 88% 1%, 95% 7%, 98% 17%, 100% 27%, 96% 37%, 99% 47%, 97% 57%, 94% 67%, 91% 77%, 87% 87%, 81% 94%, 71% 98%, 61% 100%, 51% 97%, 41% 99%, 31% 96%, 21% 93%, 11% 89%, 5% 82%, 2% 72%, 0% 62%, 3% 52%, 1% 42%, 4% 32%, 2% 22%, 5% 12%)',
                height: '500px',
                width: '100%'
              }}>
                <img
                  src="https://images.unsplash.com/photo-1563379091339-03246963d96c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Delicious biryani and chicken masala platter with aromatic spices"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-orange-600/20 to-red-600/20" />
              </div>
            </motion.div>
            
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
