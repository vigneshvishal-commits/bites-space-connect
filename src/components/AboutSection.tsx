
import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Coffee, Smartphone, Clock, Users, QrCode } from 'lucide-react';
import FeatureCard from './FeatureCard';

const AboutSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const features = [
    {
      icon: Coffee,
      title: "Browse Menus",
      description: "Quick and simple food ordering from multiple campus outlets."
    },
    {
      icon: Smartphone,
      title: "Order & Pay Easy Ordering",
      description: "Streamlined process for placing and paying for orders."
    },
    {
      icon: Clock,
      title: "Fast Service",
      description: "Skip the lines with our efficient order processing system."
    },
    {
      icon: Users,
      title: "Mobile Friendly",
      description: "Order from anywhere on campus using your phone."
    },
    {
      icon: QrCode,
      title: "Pickup via QR",
      description: "Secure and quick order validation and pickup using QR codes or OTP."
    }
  ];

  return (
    <section id="about" className="py-20 bg-gradient-to-br from-blue-50 to-blue-100" ref={ref}>
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Text Content */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
              Redefining <span className="text-blue-600">Cafeteria</span> Convenience
            </h2>
            
            <p className="text-lg text-gray-600 leading-relaxed" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
              Bites Space is not just a digital menu—it's your smart food partner. Designed for modern offices, our platform connects you to your favorite cafeteria stalls, streamlines orders, and eliminates the hassle of queues.
            </p>
            
            <p className="text-lg text-gray-600 leading-relaxed" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
              As an initiative for modern organizations, much like Cognizant's commitment to innovation and employee well-being, Bites Space is built to enhance the daily cafeteria experience. We centralize menu browse, order placement, and secure payments, reducing wait times and providing a seamless, efficient food management ecosystem for everyone.
            </p>
          </motion.div>
          
          {/* Office Cafeteria Image */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="relative z-10">
              <motion.img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Office employees eating together in cafeteria"
                className="w-full h-[400px] object-cover rounded-3xl shadow-2xl"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              />
            </div>
            
            {/* Floating elements with blue theme */}
            <motion.div
              className="absolute -top-4 -right-4 w-16 h-16 bg-blue-500 rounded-full opacity-20"
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
              className="absolute -bottom-4 -left-4 w-12 h-12 bg-blue-700 rounded-full opacity-25"
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
        </div>
        
        {/* Features Section */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <h3 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
            Why choose us?
          </h3>
          <h4 className="text-2xl font-semibold text-blue-600 mb-8" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
            How It Works – Fast. Simple. Delicious.
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
