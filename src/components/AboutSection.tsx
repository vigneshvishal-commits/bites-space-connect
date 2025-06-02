
import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Smartphone, Zap, Clock, Users, QrCode } from 'lucide-react';
import FeatureCard from './FeatureCard';

const AboutSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const features = [
    {
      icon: Smartphone,
      title: "Browse Menus",
      description: "Quick and simple food ordering from multiple campus outlets.",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    {
      icon: Zap,
      title: "Order & Pay Easy",
      description: "Streamlined process for placing and paying for orders.",
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    {
      icon: Clock,
      title: "Fast Service",
      description: "Skip the lines with our efficient order processing system.",
      image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    {
      icon: Users,
      title: "Mobile Friendly",
      description: "Order from anywhere on campus using your phone.",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    {
      icon: QrCode,
      title: "Pickup via QR",
      description: "Secure and quick order validation and pickup using QR codes or OTP.",
      image: "https://images.unsplash.com/photo-1434626881859-194d67b2b86f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    }
  ];

  return (
    <section id="about" className="py-20 bg-gradient-to-br from-blue-50 via-white to-green-50 relative overflow-hidden" ref={ref}>
      {/* Enhanced Background Animations */}
      <motion.div
        className="absolute top-20 left-20 w-24 h-24 bg-gradient-to-r from-blue-500/10 to-green-500/10 rounded-full"
        animate={{ 
          scale: [1, 1.3, 1],
          rotate: [0, 180, 360],
          opacity: [0.2, 0.5, 0.2]
        }}
        transition={{ 
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div
        className="absolute bottom-32 right-16 w-32 h-32 bg-gradient-to-r from-green-400/15 to-blue-400/15 rounded-full"
        animate={{ 
          y: [0, -25, 0],
          x: [0, 15, 0],
          scale: [1, 1.2, 1]
        }}
        transition={{ 
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <motion.div
        className="absolute top-1/3 right-32 w-16 h-16 bg-blue-500/20 rounded-full"
        animate={{ 
          rotate: [0, 360],
          scale: [1, 1.4, 1]
        }}
        transition={{ 
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <motion.div
        className="absolute top-1/4 left-10 w-20 h-20 bg-green-400/15 rounded-full"
        animate={{ 
          y: [0, 30, 0],
          x: [0, -20, 0],
          rotate: [0, 180, 360]
        }}
        transition={{ 
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <motion.div
        className="absolute bottom-1/4 left-1/3 w-14 h-14 bg-blue-600/20 rounded-full"
        animate={{ 
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.6, 0.3],
          rotate: [360, 0]
        }}
        transition={{ 
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Office Cafeteria Image with Organic Shape */}
          <motion.div
            className="relative order-2 lg:order-1"
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <div className="relative z-10">
              {/* Organic blob background */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-bl from-green-400/20 via-blue-400/15 to-green-500/20 rounded-[40px] transform -rotate-3"
                style={{
                  clipPath: "polygon(25% 5%, 75% 0%, 95% 35%, 100% 75%, 80% 95%, 20% 100%, 0% 65%, 5% 25%)"
                }}
                animate={{ 
                  rotate: [-3, 2, -3],
                  scale: [1, 1.01, 1]
                }}
                transition={{ 
                  duration: 9,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              
              {/* Floating image container */}
              <motion.div
                className="relative overflow-hidden rounded-[35px] shadow-2xl"
                style={{
                  clipPath: "polygon(15% 5%, 85% 0%, 100% 80%, 80% 100%, 0% 95%, 5% 20%)"
                }}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Office employees working with laptops and food in a modern cafeteria setting"
                  className="w-full h-[400px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />
              </motion.div>
            </div>
            
            {/* Enhanced floating elements */}
            <motion.div
              className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-r from-blue-500/30 to-green-500/30 rounded-full blur-sm"
              animate={{ 
                y: [0, -15, 0],
                rotate: [0, 180, 360]
              }}
              transition={{ 
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            <motion.div
              className="absolute -bottom-4 -left-4 w-12 h-12 bg-gradient-to-r from-green-500/30 to-blue-700/30 rounded-full blur-sm"
              animate={{ 
                y: [0, 15, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </motion.div>

          {/* Text Content */}
          <motion.div
            className="space-y-6 order-1 lg:order-2"
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-6" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
              Your office <span className="text-blue-600">cafeteria,</span> <span className="text-green-600">revolutionized.</span>
            </h2>
            
            <p className="text-lg text-gray-600 leading-relaxed" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
              Bites Space is designed as your <span className="text-green-600 font-semibold">smart food partner</span> for modern offices. Inspired by organizational commitments to efficiency and well-being, our platform centralizes menus, streamlines order placement, and ensures secure payments.
            </p>
            
            <p className="text-lg text-gray-600 leading-relaxed" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
              Enhance your daily cafeteria experience: <span className="text-blue-600 font-semibold">browse, order, pay, and pickup with ease</span>
            </p>
          </motion.div>
        </div>
        
        {/* Features Section */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <h3 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
            Why choose <span className="text-green-600">us</span>?
          </h3>
          <h4 className="text-2xl font-semibold text-blue-600 mb-8" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
            How It Works – <span className="text-green-600">Fast</span>. Simple. Delicious.
          </h4>
        </motion.div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.7 + index * 0.1 }}
            >
              <FeatureCard {...feature} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
