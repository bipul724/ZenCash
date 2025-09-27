import React from 'react';

const StatsSection = () => {
  const statsData = [
    { value: '50K+', label: 'Active Users' },
    { value: '$2B+', label: 'Transactions Tracked' },
    { value: '99.9%', label: 'Uptime' },
    { value: '4.9/5', label: 'User Rating' }
  ];

  return (
    <section className="py-20 bg-gray-900 relative overflow-hidden">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-transparent to-purple-900/20"></div>
      
      {/* Animated background particles */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
        <div className="absolute top-3/4 right-1/3 w-1 h-1 bg-purple-400 rounded-full animate-ping"></div>
        <div className="absolute bottom-1/4 left-1/2 w-3 h-3 bg-cyan-400 rounded-full animate-pulse delay-700"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {statsData.map((stat, index) => (
            <div 
              key={index} 
              className="group relative"
            >
              {/* Glowing background effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 rounded-2xl blur-md opacity-30 group-hover:opacity-60 transition-all duration-500 animate-pulse"></div>
              
              {/* Main card */}
              <div className="relative bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 text-center transform transition-all duration-300 hover:scale-105 hover:bg-white/15 shadow-2xl">
                {/* Inner glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400/10 via-transparent to-purple-400/10 rounded-2xl"></div>
                
                {/* Content */}
                <div className="relative z-10">
                  <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-blue-200 to-cyan-200 bg-clip-text text-transparent mb-3 transition-all duration-300 group-hover:scale-110">
                    {stat.value}
                  </div>
                  <div className="text-gray-200 text-sm md:text-base font-medium tracking-wide">
                    {stat.label}
                  </div>
                </div>
                
                {/* Hover accent line */}
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 group-hover:w-3/4 transition-all duration-500"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;