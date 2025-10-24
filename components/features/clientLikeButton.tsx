'use client';
import { useState, useEffect } from 'react';
import { Like } from './likeButton';
import { checkLikeStatus } from '@/app/actions/checlikestatus';
import { Heart } from 'lucide-react';

export function LikeButton({ postId }: { postId: string }) {
  const [isLiked, setIsLiked] = useState(false);
  
  // Check initial like status on component load
  useEffect(() => {
    async function checkInitialLike() {
      // You need a function to check if current user already liked this post
      const initialStatus = await checkLikeStatus(postId);
      setIsLiked(initialStatus);
    }
    checkInitialLike();
  }, [postId]);
  
  const handleLike = async () => {
    const result = await Like(postId);
    if (result?.error) {
      alert(result.error);
    } else if (result?.liked !== undefined) {
      setIsLiked(result.liked);
    }
  };

  return (
   <button onClick={handleLike} className="p-2 hover:scale-110 transition-transform">
  {isLiked ? (
    <Heart size={32} fill="red" color="red" /> // Filled red heart
  ) : (
    <Heart size={32} color="gray" /> // Outline heart
  )}
</button>
  );
}