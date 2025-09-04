import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { useLanguage } from "./LanguageContext";
import { 
  User, 
  Shield, 
  Heart, 
  Award, 
  Calendar, 
  TrendingUp,
  MessageCircle,
  ThumbsUp,
  FileText,
  Settings
} from "lucide-react";
import { motion } from "motion/react";

interface ProfilePageProps {
  onNavigate: (page: string) => void;
}

export function ProfilePage({ onNavigate }: ProfilePageProps) {
  const { t } = useLanguage();

  // Anonymous usage statistics
  const userStats = {
    reportsSubmitted: 12,
    upvotesReceived: 48,
    commentsReceived: 23,
    issuesResolved: 8,
    memberSince: "January 2024",
    contributionScore: 285,
    badgesEarned: 4
  };

  const badges = [
    {
      id: 1,
      name: "सक्रिय नागरिक",
      nameEn: "Active Citizen",
      description: "5+ समस्याएं रिपोर्ट कीं",
      descriptionEn: "Reported 5+ issues",
      icon: Award,
      color: "from-yellow-400 to-yellow-500"
    },
    {
      id: 2, 
      name: "समुदायिक योगदानकर्ता",
      nameEn: "Community Contributor", 
      description: "उच्च अपवोट्स प्राप्त",
      descriptionEn: "Received high upvotes",
      icon: ThumbsUp,
      color: "from-blue-400 to-blue-500"
    },
    {
      id: 3,
      name: "समस्या समाधानकर्ता",
      nameEn: "Problem Solver",
      description: "समस्याओं का तेज़ समाधान",
      descriptionEn: "Quick problem resolution", 
      icon: Shield,
      color: "from-green-400 to-green-500"
    },
    {
      id: 4,
      name: "भरोसेमंद रिपोर्टर",
      nameEn: "Trusted Reporter",
      description: "गुणवत्तापूर्ण रिपोर्ट्स",
      descriptionEn: "Quality reports",
      icon: Heart,
      color: "from-red-400 to-red-500"
    }
  ];

  const StatCard = ({ icon: Icon, title, value, subtitle, className = "" }: any) => (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className={`p-4 rounded-lg shadow-md bg-gradient-to-br ${className}`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-white/90 text-sm">{title}</p>
          <p className="text-white text-2xl font-bold">{value}</p>
          {subtitle && <p className="text-white/70 text-xs">{subtitle}</p>}
        </div>
        <Icon className="w-8 h-8 text-white/80" />
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-gradient-to-r from-orange-500 to-green-500 rounded-full">
              <User className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-600 via-blue-800 to-green-600 bg-clip-text text-transparent">
                नागरिक प्रोफाइल
              </h1>
              <p className="text-muted-foreground">
                Anonymous citizen profile with contribution statistics
              </p>
            </div>
          </div>
        </motion.div>

        {/* Statistics Dashboard */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
        >
          <StatCard
            icon={FileText}
            title="रिपोर्ट सबमिट की गई"
            value={userStats.reportsSubmitted}
            subtitle="कुल समस्याएं"
            className="from-blue-500 to-blue-600"
          />
          <StatCard
            icon={ThumbsUp}
            title="अपवोट्स प्राप्त"
            value={userStats.upvotesReceived}
            subtitle="समुदाय का समर्थन"
            className="from-green-500 to-green-600"
          />
          <StatCard
            icon={MessageCircle}
            title="कमेंट्स प्राप्त"
            value={userStats.commentsReceived}
            subtitle="चर्चा में भागीदारी"
            className="from-purple-500 to-purple-600"
          />
          <StatCard
            icon={Award}
            title="समस्याएं हल हुईं"
            value={userStats.issuesResolved}
            subtitle="सफल रिपोर्ट्स"
            className="from-orange-500 to-orange-600"
          />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contribution Score */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-1"
          >
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-orange-800">
                  <TrendingUp className="w-5 h-5" />
                  योगदान स्कोर
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="mb-4">
                  <div className="text-4xl font-bold bg-gradient-to-r from-orange-500 to-green-500 bg-clip-text text-transparent">
                    {userStats.contributionScore}
                  </div>
                  <p className="text-muted-foreground">कुल योगदान अंक</p>
                </div>
                
                <Separator className="my-4" />
                
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span>सदस्य बने:</span>
                    <span className="font-medium">{userStats.memberSince}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>बैज अर्जित:</span>
                    <span className="font-medium">{userStats.badgesEarned}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>स्टेटस:</span>
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      सक्रिय नागरिक
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Earned Badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-2"
          >
            <Card>
              <CardHeader>
                <CardTitle className="text-orange-800">अर्जित बैज</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {badges.map((badge, index) => (
                    <motion.div
                      key={badge.id}
                      whileHover={{ scale: 1.02 }}
                      className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`p-3 rounded-full bg-gradient-to-r ${badge.color}`}>
                          <badge.icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">{badge.name}</h3>
                          <p className="text-sm text-muted-foreground">{badge.nameEn}</p>
                          <p className="text-xs text-muted-foreground mt-1">{badge.description}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Privacy Notice */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8"
        >
          <Card className="bg-gradient-to-r from-orange-50 to-green-50 border-orange-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-orange-800">
                <Shield className="w-5 h-5" />
                गोपनीयता सुरक्षा
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <p>🛡️ आपकी व्यक्तिगत जानकारी पूर्णत: सुरक्षित और गुप्त है</p>
                <p>🔒 यह प्रोफाइल केवल आपके योगदान की गुमनाम जानकारी दिखाता है</p>
                <p>👤 आपकी वास्तविक पहचान कभी भी सार्वजनिक नहीं की जाती</p>
                <p>📊 सभी आंकड़े केवल सामुदायिक योगदान मापने के लिए हैं</p>
                <p>🇮🇳 डिजिटल इंडिया की नीति के अनुसार पूर्ण गोपनीयता बनाए रखी जाती है</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}