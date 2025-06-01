
import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import FeatureCard from './FeatureCard';
import { Search, Phone, User, Menu, CheckCircle } from 'lucide-react';

const AboutSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const features = [
    {
      icon: Search,
      title: "Browse Menus",
      description: "Quick and simple food ordering from multiple campus outlets."
    },
    {
      icon: Phone,
      title: "Order & Pay Easy Ordering",
      description: "Streamlined process for placing and paying for orders."
    },
    {
      icon: CheckCircle,
      title: "Fast Service",
      description: "Skip the lines with our efficient order processing system."
    },
    {
      icon: User,
      title: "Mobile Friendly",
      description: "Order from anywhere on campus using your phone."
    },
    {
      icon: Menu,
      title: "Pickup via QR",
      description: "Secure and quick order validation and pickup using QR codes or OTP."
    }
  ];

  return (
    <section id="about" className="py-20 bg-white" ref={ref}>
      <div className="container mx-auto px-4">
        {/* About Content */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          {/* Image */}
          <motion.div
            className="order-2 lg:order-1"
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <img
              src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              alt="Office team enjoying food"
              className="w-full h-[400px] object-cover rounded-3xl shadow-xl"
            />
          </motion.div>
          
          {/* Text Content */}
          <motion.div
            className="order-1 lg:order-2 space-y-6"
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-800">
              About <span className="text-green-500">Bites Space</span>
            </h2>
            
            <p className="text-lg text-gray-600 leading-relaxed">
              Redefining Cafeteria Convenience. Bites Space is not just a digital menu—it's your smart food partner. Designed for modern offices, our platform connects you to your favorite cafeteria stalls, streamlines orders, and eliminates the hassle of queues.
            </p>
            
            <p className="text-lg text-gray-600 leading-relaxed">
              As an initiative for modern organizations, much like Cognizant's commitment to innovation and employee well-being, Bites Space is built to enhance the daily cafeteria experience. We centralize menu Browse, order placement, and secure payments, reducing wait times and providing a seamless, efficient food management ecosystem for everyone.
            </p>
          </motion.div>
        </div>
        
        {/* Why Choose Us Section */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <h2 className="text-4xl font-bold text-gray-800 mb-8">Why Choose Us?</h2>
          <h3 className="text-2xl font-semibold text-green-500 mb-12">How It Works – Fast. Simple. Delicious.</h3>
        </motion.div>
        
        {/* Feature Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 + index * 0.1 }}
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
