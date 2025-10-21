"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabaseClient";
import { Tag, Clock, Eye, Heart } from "lucide-react";
import Link from "next/link";

interface Post {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  tags: string[];
  cover_url?: string;
  created_at: string;
  featured: boolean;
  views: number;
  likes: number;
}

export default function BlogPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [filter, setFilter] = useState<string>("All");
  const [loading, setLoading] = useState(true);
  const [likedPosts, setLikedPosts] = useState<string[]>([]);
  const [processing, setProcessing] = useState(false);

  // ✅ Fetch all posts
  const fetchPosts = async () => {
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) console.error(error);
    else setPosts(data || []);
    setLoading(false);

    // Load local liked posts
    const localLiked = JSON.parse(localStorage.getItem("likedPosts") || "[]");
    setLikedPosts(localLiked);
  };

  // ✅ Handle Like (idempotent)
  const handleLike = async (slug: string) => {
    if (processing) return;
    setProcessing(true);

    const hasLiked = likedPosts.includes(slug);
    const increment = !hasLiked;

    try {
      // Optimistic UI
      setPosts((prev) =>
        prev.map((p) =>
          p.slug === slug ? { ...p, likes: p.likes + (increment ? 1 : -1) } : p
        )
      );

      const { error } = await supabase.rpc("toggle_post_likes", {
        post_slug: slug,
        increment,
      });
      if (error) throw error;

      // Update local likedPosts
      const updated = increment
        ? [...likedPosts, slug]
        : likedPosts.filter((id) => id !== slug);
      setLikedPosts(updated);
      localStorage.setItem("likedPosts", JSON.stringify(updated));
    } catch (err) {
      console.error("Error toggling like:", err);
      // Rollback
      setPosts((prev) =>
        prev.map((p) =>
          p.slug === slug ? { ...p, likes: p.likes + (hasLiked ? 1 : -1) } : p
        )
      );
    } finally {
      setProcessing(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const allTags = ["All", ...new Set(posts.flatMap((p) => p.tags || []))];
  const filteredPosts =
    filter === "All" ? posts : posts.filter((p) => p.tags.includes(filter));

  return (
    <section className="min-h-screen py-20 px-6 bg-background text-txt">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Insights & Experiments
          </h1>
          <p className="text-text-muted">
            Thoughts, learnings, and discoveries from my development journey.
          </p>
        </motion.div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {allTags.map((tag) => (
            <motion.button
              key={tag}
              whileTap={{ scale: 0.95 }}
              onClick={() => setFilter(tag)}
              className={`px-4 py-1 rounded-full border transition font-medium
                ${
                  filter === tag
                    ? "bg-primary text-white border-primary shadow-md"
                    : "bg-surface border-border text-txt hover:border-primary hover:text-primary"
                }`}
            >
              {tag}
            </motion.button>
          ))}
        </div>

        {/* Blog Grid */}
        <AnimatePresence>
          {loading ? (
            <p className="text-center text-text-muted">Loading posts...</p>
          ) : filteredPosts.length === 0 ? (
            <p className="text-center text-text-muted">No posts found.</p>
          ) : (
            <motion.div
              layout
              className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
            >
              {filteredPosts.map((post) => {
                const isLiked = likedPosts.includes(post.slug);
                return (
                  <motion.div
                    key={post.id}
                    layout
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="group bg-surface border border-border rounded-md overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative"
                  >
                    <div className="p-6 space-y-3">
                      <h2 className="text-xl font-semibold hover:text-primary transition line-clamp-2 relative">
                        <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                      </h2>
                      {post.featured && (
                        <span className="absolute top-0 left-0 bg-primary text-white text-xs px-3 py-1 rounded-full">
                          Featured
                        </span>
                      )}
                      <p className="text-text-muted line-clamp-3 text-sm">
                        {post.excerpt}{" "}
                        <Link
                          href={`/blog/${post.slug}`}
                          className="text-blue-600"
                        >
                          Show more
                        </Link>
                      </p>

                      <div className="flex items-center justify-between text-sm text-text-muted mt-3">
                        <div className="flex items-center gap-2">
                          <Tag className="w-4 h-4" />
                          {post.tags.slice(0, 2).join(", ")}
                        </div>
                      </div>
                    </div>
                    {/* Cover */}
                    {post.cover_url && (
                      <div className="h-60 overflow-hidden rounded-lg">
                        <motion.img
                          src={post.cover_url}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                      </div>
                    )}

                    <div className="flex items-center justify-between pb-2 mt-3 text-sm px-6 text-text-muted">
                      {/* Views */}
                      <div className="flex items-center gap-2">
                        <Eye className="w-4 h-4" />
                        <span>{post.views ?? 0}</span>
                      </div>
                      {/* Likes */}
                      <motion.button
                        whileTap={{ scale: 0.85 }}
                        onClick={() => handleLike(post.slug)}
                        className={`flex items-center gap-1 ${
                          isLiked
                            ? "text-red-500"
                            : "text-text-muted hover:text-red-500"
                        } transition`}
                      >
                        <Heart
                          className={`w-4 h-4 ${
                            isLiked ? "fill-red-500" : "fill-none"
                          }`}
                        />
                        <span>{post.likes ?? 0}</span>
                      </motion.button>
                      {/* Date */}
                      <div className="flex items-center text-[12px] gap-1">
                        <Clock className="w-3 h-3" />
                        <p className="mb-1">
                          {new Date(post.created_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
