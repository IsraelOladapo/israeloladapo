"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabaseClient";
import Link from "next/link";

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  cover_url?: string;
  tags?: string[];
}

export default function RelatedPosts({
  currentId,
  tags,
}: {
  currentId: number;
  tags: string[];
}) {
  const [related, setRelated] = useState<BlogPost[]>([]);

  useEffect(() => {
    const fetchRelated = async () => {
      if (!tags.length) return;
      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .contains("tags", [tags[0]]) // basic tag match
        .neq("id", currentId)
        .limit(3);

      if (error) console.error(error);
      else setRelated(data || []);
    };

    fetchRelated();
  }, [tags, currentId]);

  if (!related.length) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="mt-20"
    >
      <h2 className="text-2xl font-semibold mb-6 text-center">Related Posts</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {related.map((post) => (
          <motion.div
            key={post.id}
            whileHover={{ y: -5 }}
            className="bg-surface border border-border rounded-2xl overflow-hidden hover:shadow-lg transition"
          >
            {post.cover_url && (
              <img
                src={post.cover_url}
                alt={post.title}
                className="w-full h-40 object-cover"
              />
            )}
            <div className="p-4 space-y-2">
              <h3 className="font-semibold text-lg hover:text-primary transition">
                <Link href={`/blog/${post.slug}`}>{post.title}</Link>
              </h3>
              <p className="text-text-muted text-sm line-clamp-2">
                {post.excerpt}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
