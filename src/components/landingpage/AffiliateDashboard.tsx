import { useState, useEffect } from 'react';
import { DollarSign, Users, TrendingUp, Award, Copy, Share2, ExternalLink } from 'lucide-react';

interface AffiliateData {
  id: string;
  name: string;
  email: string;
  image: string;
  detail: string;
  earning: number;
  totalReferrals: number;
  activeReferrals: number;
  conversionRate: number;
  affiliateCode: string;
  joinedDate: string;
  rank: string;
  monthlyEarnings: { month: string; amount: number }[];
}

export default function AffiliateDashboard() {
  const [affiliateData, setAffiliateData] = useState<AffiliateData | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Simulate API call - Replace with actual API endpoint
    const fetchAffiliateData = async () => {
      try {
        // Mock data - Replace with: const response = await fetch('/api/affiliate/me');
        const mockData: AffiliateData = {
          id: '1',
          name: 'John Doe',
          email: 'john@example.com',
          image: 'https://ui-avatars.com/api/?name=John+Doe&size=200&background=6366f1&color=fff',
          detail: 'Top performing affiliate partner with expertise in digital marketing and SaaS promotion.',
          earning: 12450.50,
          totalReferrals: 156,
          activeReferrals: 89,
          conversionRate: 24.5,
          affiliateCode: 'AFF-JD2024',
          joinedDate: '2024-01-15',
          rank: 'Gold Partner',
          monthlyEarnings: [
            { month: 'Jan', amount: 1200 },
            { month: 'Feb', amount: 1800 },
            { month: 'Mar', amount: 2100 },
            { month: 'Apr', amount: 2450 },
            { month: 'May', amount: 2900 },
            { month: 'Jun', amount: 2000 }
          ]
        };
        
        setTimeout(() => {
          setAffiliateData(mockData);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching affiliate data:', error);
        setLoading(false);
      }
    };

    fetchAffiliateData();
  }, []);

  const copyAffiliateCode = () => {
    if (affiliateData) {
      navigator.clipboard.writeText(affiliateData.affiliateCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-600"></div>
      </div>
    );
  }

  if (!affiliateData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800">No affiliate data found</h2>
          <p className="text-gray-600 mt-2">Please contact support</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 mb-8 border border-white/20">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
              <img
                src={affiliateData.image}
                alt={affiliateData.name}
                className="relative w-32 h-32 rounded-full object-cover border-4 border-white shadow-xl"
              />
              <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                {affiliateData.rank}
              </div>
            </div>
            
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
                {affiliateData.name}
              </h1>
              <p className="text-gray-600 mb-3">{affiliateData.email}</p>
              <p className="text-gray-700 max-w-2xl">{affiliateData.detail}</p>
              <p className="text-sm text-gray-500 mt-2">Member since {new Date(affiliateData.joinedDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>
            </div>

            <div className="bg-gradient-to-br from-indigo-600 to-purple-600 text-white px-6 py-4 rounded-2xl shadow-xl">
              <p className="text-sm opacity-90 mb-1">Total Earnings</p>
              <p className="text-3xl font-bold">${affiliateData.earning.toLocaleString()}</p>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl p-6 border border-white/20 hover:scale-105 transition-transform duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-3 rounded-xl">
                <Users className="text-white" size={24} />
              </div>
              <TrendingUp className="text-green-500" size={20} />
            </div>
            <p className="text-gray-600 text-sm mb-1">Total Referrals</p>
            <p className="text-3xl font-bold text-gray-800">{affiliateData.totalReferrals}</p>
          </div>

          <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl p-6 border border-white/20 hover:scale-105 transition-transform duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-gradient-to-br from-green-500 to-green-600 p-3 rounded-xl">
                <DollarSign className="text-white" size={24} />
              </div>
              <TrendingUp className="text-green-500" size={20} />
            </div>
            <p className="text-gray-600 text-sm mb-1">Active Referrals</p>
            <p className="text-3xl font-bold text-gray-800">{affiliateData.activeReferrals}</p>
          </div>

          <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl p-6 border border-white/20 hover:scale-105 transition-transform duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-3 rounded-xl">
                <TrendingUp className="text-white" size={24} />
              </div>
              <TrendingUp className="text-green-500" size={20} />
            </div>
            <p className="text-gray-600 text-sm mb-1">Conversion Rate</p>
            <p className="text-3xl font-bold text-gray-800">{affiliateData.conversionRate}%</p>
          </div>

          <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl p-6 border border-white/20 hover:scale-105 transition-transform duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-3 rounded-xl">
                <Award className="text-white" size={24} />
              </div>
            </div>
            <p className="text-gray-600 text-sm mb-1">Rank Status</p>
            <p className="text-2xl font-bold text-gray-800">{affiliateData.rank}</p>
          </div>
        </div>

        {/* Affiliate Code & Earnings Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Affiliate Code Card */}
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl p-8 border border-white/20">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <Share2 className="text-indigo-600" />
              Your Affiliate Code
            </h2>
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6 mb-4">
              <p className="text-sm text-gray-600 mb-2">Share this code with your network</p>
              <div className="flex items-center gap-3">
                <code className="flex-1 bg-white px-4 py-3 rounded-lg text-xl font-mono font-bold text-indigo-600 border-2 border-indigo-200">
                  {affiliateData.affiliateCode}
                </code>
                <button
                  onClick={copyAffiliateCode}
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-3 rounded-lg hover:scale-110 transition-transform duration-200 shadow-lg"
                >
                  {copied ? <span className="text-sm">✓</span> : <Copy size={20} />}
                </button>
              </div>
            </div>
            <div className="flex gap-3">
              <button className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 rounded-xl font-semibold hover:scale-105 transition-transform duration-200 shadow-lg flex items-center justify-center gap-2">
                <Share2 size={18} />
                Share Link
              </button>
              <button className="flex-1 bg-gradient-to-r from-purple-500 to-purple-600 text-white py-3 rounded-xl font-semibold hover:scale-105 transition-transform duration-200 shadow-lg flex items-center justify-center gap-2">
                <ExternalLink size={18} />
                View Portal
              </button>
            </div>
          </div>

          {/* Monthly Earnings Chart */}
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl p-8 border border-white/20">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <TrendingUp className="text-green-600" />
              Monthly Earnings
            </h2>
            <div className="space-y-4">
              {affiliateData.monthlyEarnings.map((item, index) => {
                const maxAmount = Math.max(...affiliateData.monthlyEarnings.map(e => e.amount));
                const percentage = (item.amount / maxAmount) * 100;
                
                return (
                  <div key={index} className="group">
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-semibold text-gray-700">{item.month}</span>
                      <span className="text-sm font-bold text-indigo-600">${item.amount.toLocaleString()}</span>
                    </div>
                    <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full transition-all duration-500 group-hover:scale-105"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Performance Insights */}
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl p-8 border border-white/20">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Performance Insights</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border-2 border-green-200">
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-green-500 p-2 rounded-lg">
                  <TrendingUp className="text-white" size={20} />
                </div>
                <h3 className="font-bold text-gray-800">Top Performer</h3>
              </div>
              <p className="text-sm text-gray-600">You're in the top 10% of affiliates this month!</p>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border-2 border-blue-200">
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-blue-500 p-2 rounded-lg">
                  <Users className="text-white" size={20} />
                </div>
                <h3 className="font-bold text-gray-800">Growing Network</h3>
              </div>
              <p className="text-sm text-gray-600">+23 new referrals this month. Keep it up!</p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border-2 border-purple-200">
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-purple-500 p-2 rounded-lg">
                  <Award className="text-white" size={20} />
                </div>
                <h3 className="font-bold text-gray-800">Next Milestone</h3>
              </div>
              <p className="text-sm text-gray-600">44 more referrals to reach Platinum status!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
