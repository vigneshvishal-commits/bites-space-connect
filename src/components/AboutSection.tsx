
import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Search, CreditCard, Zap, QrCode } from 'lucide-react';

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
      icon: CreditCard,
      title: "Order & Pay Easy Ordering",
      description: "Streamlined process for placing and paying for orders."
    },
    {
      icon: Zap,
      title: "Fast Service",
      description: "Skip the lines with our efficient order processing system."
    },
    {
      icon: QrCode,
      title: "Pickup via QR",
      description: "Secure and quick order validation and pickup using QR codes or OTP."
    }
  ];

  return (
    <section id="about" className="py-20 bg-white" ref={ref}>
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="order-2 lg:order-1"
          >
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Office cafeteria with colleagues enjoying food and laptops on table"
                className="rounded-3xl shadow-2xl w-full object-cover h-[500px]"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-green-600/10 rounded-3xl" />
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
              Redefining <span className="text-blue-600">Cafeteria</span> <span className="text-green-600">Convenience</span>
            </motion.h2>
            
            <motion.div
              className="space-y-6 text-lg text-gray-600 leading-relaxed"
              style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <p>
                Bites Space is designed as your smart food partner for modern offices. Inspired by organizational commitments to efficiency and well-being, our platform centralizes menus, streamlines order placement, and ensures secure payments.
              </p>
              
              <p>
                Enhance your daily cafeteria experience: browse, order, pay, and pickup with ease.
              </p>
            </motion.div>
          </motion.div>
        </div>

        {/* Why Choose Us Section */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7, duration: 0.8 }}
        >
          <h3 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
            Why choose us?
          </h3>
          <h4 className="text-2xl font-semibold text-gray-700 mb-12" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
            How It Works – Fast. Simple. Delicious.
          </h4>
        </motion.div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                className="bg-gray-50 rounded-2xl p-6 text-center hover:bg-blue-50 hover:border-green-500 border-2 border-transparent transition-all duration-300 hover:shadow-lg hover:-translate-y-2"
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.8 + index * 0.1, duration: 0.6 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-8 h-8 text-blue-600" />
                </div>
                <h5 className="text-xl font-bold text-gray-800 mb-3" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                  {feature.title}
                </h5>
                <p className="text-gray-600" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
