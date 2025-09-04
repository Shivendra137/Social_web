import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ChevronUp, MessageCircle, Share2, Calendar, AlertCircle, CheckCircle2, Clock } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useLanguage } from "./LanguageContext";
import { motion } from "motion/react";
import { CommentDialog } from "./CommentDialog";
import { ShareDialog } from "./ShareDialog";
import { useState } from "react";

interface Post {
  id: string;
  username: string;
  title: string;
  content: string;
  images?: string[];
  upvotes: number;
  comments: number;
  isUpvoted: boolean;
  status?: "pending" | "working" | "solved";
  createdAt: string;
  lastUpdated: string;
}

interface PostCardProps {
  post: Post;
  onUpvote: (postId: string) => void;
  onComment: (postId: string) => void;
  onShare: (postId: string) => void;
}

export function PostCard({ post, onUpvote, onComment, onShare }: PostCardProps) {
  const { t } = useLanguage();
  const [showCommentDialog, setShowCommentDialog] = useState(false);
  const [showShareDialog, setShowShareDialog] = useState(false);

  const getStatusIcon = (status?: string) => {
    switch (status) {
      case "pending":
        return <AlertCircle className="w-4 h-4" />;
      case "working":
        return <Clock className="w-4 h-4" />;
      case "solved":
        return <CheckCircle2 className="w-4 h-4" />;
      default:
        return <AlertCircle className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status?: string) => {
    switch (status) {
      case "pending":
        return "bg-gradient-to-r from-orange-500 to-yellow-500 text-white";
      case "working":
        return "bg-gradient-to-r from-blue-500 to-cyan-500 text-white";
      case "solved":
        return "bg-gradient-to-r from-green-500 to-emerald-500 text-white";
      default:
        return "bg-gradient-to-r from-orange-500 to-yellow-500 text-white";
    }
  };

  const getStatusText = (status?: string) => {
    switch (status) {
      case "pending":
        return t('home.status.pending');
      case "working":
        return t('home.status.working');
      case "solved":
        return t('home.status.solved');
      default:
        return t('home.status.pending');
    }
  };

  return (
    <>
      <motion.div
        whileHover={{ y: -2 }}
        transition={{ duration: 0.2 }}
      >
        <Card className="w-full bg-white/90 backdrop-blur-sm border-2 border-orange-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:border-orange-300">
          <CardHeader className="pb-3 bg-gradient-to-r from-orange-50 via-white to-green-50 rounded-t-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <motion.div 
                  className="w-12 h-12 bg-gradient-to-r from-orange-400 to-green-400 rounded-full flex items-center justify-center shadow-md"
                  whileHover={{ scale: 1.1 }}
                >
                  <span className="text-sm font-bold text-white">
                    {post.username.slice(-4)}
                  </span>
                </motion.div>
                <div>
                  <p className="font-semibold text-blue-900">{post.username}</p>
                  <div className="flex items-center gap-2 text-xs text-blue-600">
                    <Calendar className="w-3 h-3" />
                    <span>{post.createdAt}</span>
                  </div>
                </div>
              </div>
              
              {post.status && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <Badge className={`${getStatusColor(post.status)} shadow-md flex items-center gap-1`}>
                    {getStatusIcon(post.status)}
                    <span className="font-medium">{getStatusText(post.status)}</span>
                  </Badge>
                </motion.div>
              )}
            </div>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-bold text-blue-900 text-lg mb-2">{post.title}</h3>
              <p className="text-gray-700 leading-relaxed">{post.content}</p>
            </div>
            
            {post.images && post.images.length > 0 && (
              <motion.div 
                className="grid grid-cols-1 gap-3"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
              >
                {post.images.map((image, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.02 }}
                    className="overflow-hidden rounded-xl border-2 border-orange-200 shadow-md"
                  >
                    <ImageWithFallback
                      src={image}
                      alt={`Post image ${index + 1}`}
                      className="w-full h-64 object-cover"
                    />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </CardContent>
          
          <CardFooter className="pt-4 border-t-2 border-orange-100 bg-gradient-to-r from-orange-50/50 via-white/50 to-green-50/50">
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-6">
                <motion.button
                  onClick={() => onUpvote(post.id)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 ${
                    post.isUpvoted 
                      ? 'bg-gradient-to-r from-orange-500 to-green-500 text-white shadow-md' 
                      : 'text-blue-800 hover:bg-gradient-to-r hover:from-orange-100 hover:to-green-100 border border-orange-200 hover:border-orange-300'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ChevronUp className={`w-4 h-4 ${post.isUpvoted ? 'fill-current' : ''}`} />
                  <span className="font-medium">{post.upvotes}</span>
                  <span className="text-sm hidden sm:inline">{t('home.upvote')}</span>
                </motion.button>
                
                <motion.button
                  onClick={() => setShowCommentDialog(true)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-blue-800 hover:bg-gradient-to-r hover:from-orange-100 hover:to-green-100 border border-orange-200 hover:border-orange-300 transition-all duration-200"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <MessageCircle className="w-4 h-4" />
                  <span className="font-medium">{post.comments}</span>
                  <span className="text-sm hidden sm:inline">{t('home.comment')}</span>
                </motion.button>
                
                <motion.button
                  onClick={() => setShowShareDialog(true)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-blue-800 hover:bg-gradient-to-r hover:from-orange-100 hover:to-green-100 border border-orange-200 hover:border-orange-300 transition-all duration-200"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Share2 className="w-4 h-4" />
                  <span className="text-sm">{t('home.share')}</span>
                </motion.button>
              </div>
              
              {post.lastUpdated !== post.createdAt && (
                <div className="text-xs text-gray-500 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>{t('myReports.lastUpdated')}: {post.lastUpdated}</span>
                </div>
              )}
            </div>
          </CardFooter>
        </Card>
      </motion.div>

      <CommentDialog
        isOpen={showCommentDialog}
        onClose={() => setShowCommentDialog(false)}
        postId={post.id}
        postTitle={post.title}
      />

      <ShareDialog
        isOpen={showShareDialog}
        onClose={() => setShowShareDialog(false)}
        postId={post.id}
        postTitle={post.title}
      />
    </>
  );
}