import { Button } from "./ui/button";
import { Home, User, FileText, Shield, LogOut, Languages, Star, MapPin, Info } from "lucide-react";
import { useLanguage } from "./LanguageContext";
import { motion } from "motion/react";
import newLogo from "figma:asset/9940763ec6e94539b7990ea60669055c752ce3f7.png";

interface Municipality {
  id: string;
  name: string;
  state: string;
  district: string;
  population: string;
  area: string;
}

interface NavigationProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  userType?: "citizen" | "municipal";
  userInfo?: { username: string; name: string };
  selectedMunicipality?: Municipality | null;
  onLogout?: () => void;
}

export function Navigation({ currentPage, onNavigate, userType = "citizen", userInfo, selectedMunicipality, onLogout }: NavigationProps) {
  const { language, setLanguage, t } = useLanguage();

  return (
    <motion.nav 
      className="border-b-2 border-orange-200 bg-gradient-to-r from-orange-100 via-white to-green-100 backdrop-blur-md shadow-lg"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <motion.div 
              className="flex items-center gap-3"
              whileHover={{ scale: 1.05 }}
            >
              <div className="relative">
                <motion.div
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <img 
                    src={newLogo} 
                    alt="Prathmikta Logo" 
                    className="w-14 h-14 drop-shadow-lg object-contain" 
                  />
                </motion.div>
                <motion.div
                  className="absolute -top-2 -right-2"
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Star className="w-5 h-5 text-yellow-500" />
                </motion.div>
              </div>
              <div>
                <div className="text-xl font-bold bg-gradient-to-r from-orange-600 via-blue-600 to-green-600 bg-clip-text text-transparent">
                  {t('app.title')}
                </div>
                <div className="text-xs text-blue-600 -mt-1">
                  {t('common.government')}
                </div>
              </div>
            </motion.div>
            
            <div className="hidden md:flex items-center space-x-2">
              {userType === "citizen" ? (
                <>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      variant={currentPage === "home" ? "default" : "ghost"}
                      onClick={() => onNavigate("home")}
                      className={`flex items-center gap-2 font-medium ${
                        currentPage === "home" 
                          ? "bg-gradient-to-r from-orange-500 to-green-500 text-white shadow-lg" 
                          : "text-blue-800 hover:bg-gradient-to-r hover:from-orange-100 hover:to-green-100"
                      }`}
                    >
                      <Home className="w-4 h-4" />
                      {t('nav.home')}
                    </Button>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      variant={currentPage === "posts" ? "default" : "ghost"}
                      onClick={() => onNavigate("posts")}
                      className={`flex items-center gap-2 font-medium ${
                        currentPage === "posts" 
                          ? "bg-gradient-to-r from-orange-500 to-green-500 text-white shadow-lg" 
                          : "text-blue-800 hover:bg-gradient-to-r hover:from-orange-100 hover:to-green-100"
                      }`}
                    >
                      <FileText className="w-4 h-4" />
                      {t('nav.myReports')}
                    </Button>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      variant={currentPage === "municipality-info" ? "default" : "ghost"}
                      onClick={() => onNavigate("municipality-info")}
                      className={`flex items-center gap-2 font-medium ${
                        currentPage === "municipality-info" 
                          ? "bg-gradient-to-r from-orange-500 to-green-500 text-white shadow-lg" 
                          : "text-blue-800 hover:bg-gradient-to-r hover:from-orange-100 hover:to-green-100"
                      }`}
                    >
                      <Info className="w-4 h-4" />
                      {t('nav.municipalityInfo')}
                    </Button>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      variant={currentPage === "profile" ? "default" : "ghost"}
                      onClick={() => onNavigate("profile")}
                      className={`flex items-center gap-2 font-medium ${
                        currentPage === "profile" 
                          ? "bg-gradient-to-r from-orange-500 to-green-500 text-white shadow-lg" 
                          : "text-blue-800 hover:bg-gradient-to-r hover:from-orange-100 hover:to-green-100"
                      }`}
                    >
                      <User className="w-4 h-4" />
                      {t('nav.profile')}
                    </Button>
                  </motion.div>
                </>
              ) : (
                <>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      variant={currentPage === "municipal" ? "default" : "ghost"}
                      onClick={() => onNavigate("municipal")}
                      className={`flex items-center gap-2 font-medium ${
                        currentPage === "municipal" 
                          ? "bg-gradient-to-r from-orange-500 to-green-500 text-white shadow-lg" 
                          : "text-blue-800 hover:bg-gradient-to-r hover:from-orange-100 hover:to-green-100"
                      }`}
                    >
                      <Shield className="w-4 h-4" />
                      {t('nav.dashboard')}
                    </Button>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      variant={currentPage === "home" ? "default" : "ghost"}
                      onClick={() => onNavigate("home")}
                      className={`flex items-center gap-2 font-medium ${
                        currentPage === "home" 
                          ? "bg-gradient-to-r from-orange-500 to-green-500 text-white shadow-lg" 
                          : "text-blue-800 hover:bg-gradient-to-r hover:from-orange-100 hover:to-green-100"
                      }`}
                    >
                      <Home className="w-4 h-4" />
                      {t('nav.home')}
                    </Button>
                  </motion.div>
                </>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Municipality Location Display for Citizens */}
            {userType === "citizen" && selectedMunicipality && (
              <div className="hidden md:flex items-center gap-2 bg-white/70 backdrop-blur-sm px-3 py-2 rounded-lg border border-orange-200">
                <MapPin className="w-4 h-4 text-orange-600" />
                <div>
                  <div className="text-sm font-medium text-blue-900">{selectedMunicipality.name}</div>
                  <div className="text-xs text-blue-600">{selectedMunicipality.state}</div>
                </div>
              </div>
            )}

            {/* Language Switcher */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="ghost"
                onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
                className="flex items-center gap-2 text-blue-800 hover:bg-gradient-to-r hover:from-orange-100 hover:to-green-100 border border-orange-200 hover:border-orange-300"
              >
                <Languages className="w-4 h-4" />
                <span className="font-medium">{t('lang.switch')}</span>
              </Button>
            </motion.div>

            {userInfo && (
              <div className="hidden md:flex items-center gap-3 bg-white/70 backdrop-blur-sm px-3 py-2 rounded-lg border border-orange-200">
                <motion.div 
                  className="w-8 h-8 bg-gradient-to-r from-orange-400 to-green-400 rounded-full flex items-center justify-center shadow-md"
                  whileHover={{ scale: 1.1 }}
                >
                  {userType === "municipal" ? (
                    <Shield className="w-4 h-4 text-white" />
                  ) : (
                    <User className="w-4 h-4 text-white" />
                  )}
                </motion.div>
                <div>
                  <div className="text-sm font-medium text-blue-900">
                    {userType === "municipal" ? userInfo.name : "नागरिक"}
                  </div>
                  <div className="text-xs text-blue-600">
                    {userType === "municipal" ? "अधिकारी" : "Nagrik"}
                  </div>
                </div>
              </div>
            )}
            
            {onLogout && (
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="ghost"
                  onClick={onLogout}
                  className="flex items-center gap-2 text-red-600 hover:bg-red-50 border border-red-200 hover:border-red-300"
                >
                  <LogOut className="w-4 h-4" />
                  {t('nav.logout')}
                </Button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </motion.nav>
  );
}