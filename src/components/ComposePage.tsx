import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { ArrowLeft, Upload, X, FileText, Camera, Send, Star, AlertCircle } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useLanguage } from "./LanguageContext";
import { motion } from "motion/react";

interface ComposePageProps {
  onNavigate: (page: string) => void;
  onCreatePost: (title: string, content: string, images: string[]) => void;
}

export function ComposePage({ onNavigate, onCreatePost }: ComposePageProps) {
  const { t } = useLanguage();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleImageUpload = async () => {
    try {
      // Fallback to civic-related placeholder images
      const civicImages = [
        "https://images.unsplash.com/photo-1740440902073-90e0e72c699f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicm9rZW4lMjByb2FkJTIwaW5mcmFzdHJ1Y3R1cmV8ZW58MXx8fHwxNzU2MDIwMDU0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        "https://images.unsplash.com/photo-1637681262973-a516e647e826?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYXJiYWdlJTIwY29sbGVjdGlvbiUyMHdhc3RlJTIwbWFuYWdlbWVudHxlbnwxfHx8fDE3NTYwMjAwNjB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        "https://images.unsplash.com/photo-1586227740560-8cf2732c1531?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
      ];
      const randomImage = civicImages[Math.floor(Math.random() * civicImages.length)];
      setImages(prev => [...prev, randomImage]);
    } catch (error) {
      // Fallback image
      const placeholderImage = "https://images.unsplash.com/photo-1586227740560-8cf2732c1531?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080";
      setImages(prev => [...prev, placeholderImage]);
    }
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleCompose = async () => {
    if (!title.trim() || !content.trim()) {
      alert(t('compose.titleField') + " and " + t('compose.descField') + " are required");
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      onCreatePost(title, content, images);
      
      // Reset form and navigate back
      setTitle("");
      setContent("");
      setImages([]);
      setIsSubmitting(false);
      onNavigate("home");
    }, 1500);
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-2xl mx-auto px-6 py-8">
        {/* Back Button */}
        <motion.div 
          className="mb-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Button
            variant="ghost"
            onClick={() => onNavigate("home")}
            className="flex items-center gap-2 mb-4 text-blue-800 hover:bg-gradient-to-r hover:from-orange-100 hover:to-green-100 border border-orange-200 hover:border-orange-300"
          >
            <ArrowLeft className="w-4 h-4" />
            {t('common.back')}
          </Button>
        </motion.div>

        {/* Main Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card className="bg-white/90 backdrop-blur-sm border-2 border-orange-200 shadow-xl">
            <CardHeader className="bg-gradient-to-r from-orange-100 via-white to-green-100 rounded-t-lg border-b-2 border-orange-200">
              <div className="flex items-center gap-3">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <FileText className="w-8 h-8 text-orange-600" />
                </motion.div>
                <div>
                  <CardTitle className="text-xl text-blue-900 flex items-center gap-2">
                    {t('compose.title')}
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <Star className="w-5 h-5 text-yellow-500" />
                    </motion.div>
                  </CardTitle>
                  <p className="text-blue-700 text-sm mt-1">{t('compose.subtitle')}</p>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-6 p-6">
              {/* Title Field */}
              <motion.div 
                className="space-y-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Label htmlFor="title" className="text-blue-900 font-semibold flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-orange-600" />
                  {t('compose.titleField')}
                </Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder={t('compose.titlePlaceholder')}
                  className="w-full border-2 border-orange-200 focus:border-orange-400 bg-white/80 backdrop-blur-sm"
                />
              </motion.div>

              {/* Description Field */}
              <motion.div 
                className="space-y-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Label htmlFor="content" className="text-blue-900 font-semibold flex items-center gap-2">
                  <FileText className="w-4 h-4 text-green-600" />
                  {t('compose.descField')}
                </Label>
                <Textarea
                  id="content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder={t('compose.descPlaceholder')}
                  className="w-full min-h-32 resize-y border-2 border-orange-200 focus:border-orange-400 bg-white/80 backdrop-blur-sm"
                />
              </motion.div>

              {/* Images Section */}
              <motion.div 
                className="space-y-3"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Label className="text-blue-900 font-semibold flex items-center gap-2">
                  <Camera className="w-4 h-4 text-blue-600" />
                  {t('compose.addImages')}
                </Label>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleImageUpload}
                    className="flex items-center gap-2 w-full border-2 border-orange-200 hover:border-orange-300 hover:bg-gradient-to-r hover:from-orange-100 hover:to-green-100 text-blue-800"
                  >
                    <Upload className="w-4 h-4" />
                    {t('compose.addImages')}
                  </Button>
                </motion.div>
                
                {images.length > 0 && (
                  <motion.div 
                    className="grid grid-cols-1 gap-4"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    {images.map((image, index) => (
                      <motion.div 
                        key={index} 
                        className="relative group"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1 * index }}
                        whileHover={{ scale: 1.02 }}
                      >
                        <div className="border-2 border-orange-200 rounded-xl overflow-hidden shadow-md">
                          <ImageWithFallback
                            src={image}
                            alt={`Upload ${index + 1}`}
                            className="w-full h-48 object-cover"
                          />
                        </div>
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Button
                            type="button"
                            variant="destructive"
                            size="sm"
                            onClick={() => removeImage(index)}
                            className="absolute top-2 right-2 w-8 h-8 rounded-full p-0 bg-red-500 hover:bg-red-600 shadow-lg"
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </motion.div>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </motion.div>

              {/* Action Buttons */}
              <motion.div 
                className="flex gap-3 pt-6 border-t-2 border-orange-100"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <motion.div 
                  className="flex-1"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    onClick={handleCompose}
                    className="w-full bg-gradient-to-r from-orange-500 to-green-500 hover:from-orange-600 hover:to-green-600 text-white shadow-lg disabled:opacity-50"
                    disabled={!title.trim() || !content.trim() || isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"
                        />
                        {t('compose.submitting')}
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        {t('compose.submit')}
                      </>
                    )}
                  </Button>
                </motion.div>
                
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    variant="outline"
                    onClick={() => onNavigate("home")}
                    className="border-2 border-orange-200 hover:border-orange-300 hover:bg-gradient-to-r hover:from-orange-100 hover:to-green-100 text-blue-800"
                  >
                    {t('common.cancel')}
                  </Button>
                </motion.div>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Info Card */}
        <motion.div
          className="mt-6 p-4 bg-white/70 backdrop-blur-sm rounded-xl border-2 border-orange-200 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <p className="text-sm text-blue-700">
            🇮🇳 {t('app.digitalIndia')} - सुनो अपने नागरिकों की आवाज़
          </p>
        </motion.div>
      </div>
    </div>
  );
}