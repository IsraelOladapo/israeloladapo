"use client";

import { useEffect, useState, useRef } from "react";
import { supabase } from "@/lib/supabaseClient";
import { usePathname } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeHighlight from "rehype-highlight";
import { motion, useScroll, useSpring } from "framer-motion";
import { Clock, Eye, Heart, Share2 } from "lucide-react";
import RelatedPosts from "./RelatedPosts";

interface Post {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover_url?: string;
  tags: string[];
  created_at: string;
  views?: number;
  likes: number;
}

export default function BlogPostPage() {
  const pathname = usePathname();
  const slug = pathname.split("/").pop();
  const [post, setPost] = useState<Post | null>(null);
  const [liked, setLiked] = useState(false);
  const [processing, setProcessing] = useState(false);
  const hasIncrementedRef = useRef(false);

  // Scroll progress bar
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  // 🧩 Fetch post
  const fetchPost = async () => {
    if (!slug) return;
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .eq("slug", slug)
      .single<Post>();

    if (error) console.error(error);
    else {
      setPost(data);
      // Move incrementViewOnce here, after successful fetch
      incrementViewOnce(slug);
    }
    console.log("mounted");
  };

  // 🧠 Increment views once per user
  // const incrementViewOnce = async (slug: string) => {
  //   const viewedPosts = JSON.parse(localStorage.getItem("viewedPosts") || "[]");

  //   if (!viewedPosts.includes(slug)) {
  //     const { error } = await supabase.rpc("increment_post_views", {
  //       post_slug: slug,
  //     });
  //     if (error) console.error("Error incrementing view:", error);
  //     localStorage.setItem(
  //       "viewedPosts",
  //       JSON.stringify([...viewedPosts, slug])
  //     );
  //   }
  // };

  // ...

  const incrementViewOnce = async (slug: string) => {
    if (hasIncrementedRef.current) return; // per-mount guard
    const viewedPosts = JSON.parse(localStorage.getItem("viewedPosts") || "[]");

    if (viewedPosts.includes(slug)) {
      hasIncrementedRef.current = true;
      return;
    }

    // Optimistically mark as viewed BEFORE the async call to avoid race in StrictMode
    localStorage.setItem("viewedPosts", JSON.stringify([...viewedPosts, slug]));
    hasIncrementedRef.current = true;

    const { error } = await supabase.rpc("increment_post_views", {
      post_slug: slug,
    });

    if (error) {
      // Rollback if you want to be strict
      const rollback = JSON.parse(
        localStorage.getItem("viewedPosts") || "[]"
      ).filter((s: string) => s !== slug);
      localStorage.setItem("viewedPosts", JSON.stringify(rollback));
      hasIncrementedRef.current = false;
      console.error("Error incrementing view:", error);
    } else {
      setPost((prev) =>
        prev ? { ...prev, views: (prev.views || 0) + 1 } : prev
      );
    }
  };

  // 💗 Handle Like Toggle

  // 🧩 Setup realtime sync
  const handleLike = async () => {
    if (!post || !slug || processing) return; // prevent concurrent clicks

    setProcessing(true);
    const likedPosts = JSON.parse(localStorage.getItem("likedPosts") || "[]");
    const hasLiked = likedPosts.includes(slug);
    const increment = !hasLiked;

    try {
      // Optimistic UI update
      setLiked(increment);
      setPost((prev) =>
        prev ? { ...prev, likes: prev.likes + (increment ? 1 : -1) } : prev
      );

      // 🔁 Supabase call (atomic toggle)
      const { error } = await supabase.rpc("toggle_post_likes", {
        post_slug: slug,
        increment,
      });

      if (error) throw error;

      // ✅ Update localStorage only after success
      const updated = increment
        ? [...likedPosts, slug]
        : likedPosts.filter((p: string) => p !== slug);
      localStorage.setItem("likedPosts", JSON.stringify(updated));
    } catch (err) {
      console.error("Error toggling like:", err);

      // Rollback UI to consistent state
      setLiked(hasLiked);
      setPost((prev) =>
        prev ? { ...prev, likes: prev.likes + (hasLiked ? 1 : -1) } : prev
      );
    } finally {
      // Release the lock
      setProcessing(false);
    }
  };

  useEffect(() => {
    if (!slug) return;

    const channel = supabase
      .channel("realtime:posts")
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "posts",
          filter: `slug=eq.${slug}`,
        },
        (payload) => {
          const { views, likes } = payload.new;
          setPost((prev) => (prev ? { ...prev, views, likes } : prev));
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [slug]);

  // ⚡ Initial load
  useEffect(() => {
    if (!slug) return;
    fetchPost();
    // incrementViewOnce(slug);

    // Restore like state from localStorage
    const likedPosts = JSON.parse(localStorage.getItem("likedPosts") || "[]");
    setLiked(likedPosts.includes(slug));
  }, [slug]);

  // 🧾 Loading state
  if (!post)
    return (
      <div className="min-h-screen flex items-center justify-center text-text-muted">
        Loading post...
      </div>
    );

  // ✅ UI
  return (
    <article className="relative bg-background text-txt min-h-screen flex flex-col justify-center items-center">
      {/* Scroll Progress */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-primary to-secondary origin-left z-50"
        style={{ scaleX }}
      />

      {/* Main Content */}
      <div className="max-w-4xl mx-auto md:mx-35 px-6 py-16">
        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-xl font-bold mt-10 mb-3 bg-gradient-to-r from-primary to-txt bg-clip-text text-transparent"
        >
          {post.title}
        </motion.h1>

        {/* Markdown Content */}
        <div className="prose prose-neutral dark:prose-invert max-w-none leading-relaxed mb-3">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[
              rehypeSlug,
              rehypeHighlight,
              [rehypeAutolinkHeadings, { behavior: "wrap" }],
            ]}
          >
            {post.content}
          </ReactMarkdown>
        </div>

        {/* Tags */}
        {post.tags?.length > 0 && (
          <div className="mb-4 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-sm bg-surface border border-border rounded-full text-text-muted hover:text-primary"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
        {/* Cover Image */}
        {post.cover_url && (
          <div className="w-full h-full relative overflow-hidden rounded-2xl mb-3">
            <motion.img
              src={post.cover_url}
              alt={post.title}
              className="w-full h-full object-cover"
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1 }}
            />
            {/* <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" /> */}
          </div>
        )}

        {/* Meta Info */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-text-muted mb-10">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />{" "}
            {new Date(post.created_at).toLocaleDateString()}
          </div>
          <div className="flex items-center gap-1">
            <Eye className="w-4 h-4 text-text-muted" /> {post.views ?? 0}
          </div>
          <button
            onClick={handleLike}
            className={`flex items-center gap-1 transition ${
              liked ? "text-red-500" : "text-text-muted hover:text-red-500"
            }`}
          >
            <Heart
              className={`w-4 h-4 ${
                liked ? "fill-red-500" : "fill-none"
              } transition`}
            />
            {post.likes ?? 0}
          </button>
          <button
            onClick={() =>
              navigator.share?.({
                title: post.title,
                url: window.location.href,
              })
            }
            className="flex items-center gap-1 text-text-muted hover:text-primary transition"
          >
            <Share2 className="w-4 h-4" /> Share
          </button>
        </div>
      </div>

      {/* Related Posts */}
      <RelatedPosts currentId={post.id} tags={post.tags} />
    </article>
  );
}
