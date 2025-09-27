"use client";
import React, { useState } from 'react';
import { Check, Sparkles, Zap, Crown } from 'lucide-react';

const PricingPage = () => {
  const [billingPeriod, setBillingPeriod] = useState('monthly');
  const [hoveredCard, setHoveredCard] = useState(null);

  const plans = [
  {
    name: 'Lite',
    icon: <Zap className="w-6 h-6" />,
    price: billingPeriod === 'monthly' ? 9 : 7,
    originalPrice: billingPeriod === 'monthly' ? null : 9,
    description: 'Track your personal finances with ease',
    features: [
      'Unlimited accounts',
      'Expense & income tracking',
      'Basic financial reports',
      'Multi-device sync'
    ],
    buttonText: 'Get Started',
    popular: false,
    gradient: 'from-gray-900 to-gray-800'
  },
  {
    name: 'Pro',
    icon: <Sparkles className="w-6 h-6" />,
    price: billingPeriod === 'monthly' ? 19 : 15,
    originalPrice: billingPeriod === 'monthly' ? null : 19,
    description: 'For freelancers & small businesses',
    features: [
      'Advanced analytics & insights',
      'Multi-currency support',
      'Export to Excel / PDF',
      'Priority email support',
      'Recurring transactions & reminders'
    ],
    buttonText: 'Start Free Trial',
    popular: true,
    gradient: 'from-emerald-600 to-emerald-500'
  },
  {
    name: 'Business',
    icon: <Crown className="w-6 h-6" />,
    price: 'Custom',
    description: 'For startups & enterprises',
    features: [
      'Dedicated financial advisor support',
      'Team collaboration & roles',
      'Custom dashboards',
      'Tax & compliance reports',
      'Concierge onboarding'
    ],
    buttonText: 'Contact Sales',
    popular: false,
    gradient: 'from-purple-900 to-purple-800'
  }
];




  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 via-transparent to-purple-500/10"></div>
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-emerald-300 via-green-400 to-teal-500 bg-clip-text text-transparent">
  Take control of your money, effortlessly.
</h1>

          
         
          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4 mb-16">
            <span className={`${billingPeriod === 'monthly' ? 'text-white' : 'text-gray-400'} transition-colors`}>
              Monthly
            </span>
            <button
              onClick={() => setBillingPeriod(billingPeriod === 'monthly' ? 'annually' : 'monthly')}
              className="relative w-14 h-7 bg-gray-700 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <div className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform duration-300 ${billingPeriod === 'annually' ? 'translate-x-7' : 'translate-x-0'}`}></div>
            </button>
            <span className={`${billingPeriod === 'annually' ? 'text-white' : 'text-gray-400'} transition-colors`}>
              Annually
            </span>
            {billingPeriod === 'annually' && (
              <span className="bg-emerald-600 text-white text-xs px-2 py-1 rounded-full ml-2 animate-pulse">
                Save 20%
              </span>
            )}
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
              className={`relative group ${plan.popular ? 'md:-mt-4 md:mb-4' : ''}`}
            >
              {/* Glow effect */}
              <div className={`absolute -inset-0.5 bg-gradient-to-r ${plan.gradient} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm`}></div>
              
              {/* Card */}
              <div className={`relative bg-gray-900/90 backdrop-blur-xl rounded-2xl p-8 border transition-all duration-500 ${
                plan.popular 
                  ? 'border-emerald-500/50 shadow-2xl shadow-emerald-500/20' 
                  : 'border-gray-800 hover:border-gray-700'
              } ${hoveredCard === index ? 'transform scale-105' : ''}`}>
                
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-emerald-500 to-emerald-400 text-black text-xs font-bold px-4 py-2 rounded-full">
                      MOST POPULAR
                    </div>
                  </div>
                )}

                {/* Header */}
                <div className="flex items-center gap-3 mb-6">
                  <div className={`p-2 rounded-lg bg-gradient-to-r ${plan.gradient}`}>
                    {plan.icon}
                  </div>
                  <h3 className="text-2xl font-bold">{plan.name}</h3>
                </div>

                {/* Price */}
                <div className="mb-6">
                  {typeof plan.price === 'number' ? (
                    <div className="flex items-baseline gap-2">
                      <span className="text-5xl font-bold">${plan.price}</span>
                      {plan.originalPrice && (
                        <span className="text-gray-500 line-through text-lg">${plan.originalPrice}</span>
                      )}
                      <span className="text-gray-400 text-sm">/USER/MONTH</span>
                    </div>
                  ) : (
                    <div className="text-5xl font-bold">{plan.price}</div>
                  )}
                </div>

                {/* Description */}
                <p className="text-gray-400 mb-8">{plan.description}</p>

                {/* Features */}
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Button */}
                <button className={`w-full py-4 px-6 rounded-xl font-semibold transition-all duration-300 ${
                  plan.popular
                    ? 'bg-gradient-to-r from-emerald-500 to-emerald-400 text-black hover:from-emerald-400 hover:to-emerald-300 shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40'
                    : 'bg-gray-800 text-white hover:bg-gray-700 border border-gray-700 hover:border-gray-600'
                } transform hover:scale-105`}>
                  {plan.buttonText}
                </button>
              </div>
            </div>
          ))}
        </div>

       
        {/* Floating particles */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white/20 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PricingPage;