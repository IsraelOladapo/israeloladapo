// app/dashboard/components/PostsSection.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";
import { Edit, Trash2, PlusCircle, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

type Post = {
  id: number;
  title: string;
  slug: string;
  excerpt?: string;
  tags?: string[];
  cover_url?: string;
  created_at: string;
  views?: number;
  likes?: number;
  featured?: boolean;
};

export default function PostsSection() {
  const [posts, setPosts] = useState<Post[] | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) {
      console.error(error);
      toast.error("Failed to load posts");
      setPosts([]);
    } else {
      setPosts(data as Post[]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this post? This cannot be undone.")) return;
    const { error } = await supabase.from("posts").delete().eq("id", id);
    if (error) {
      console.error(error);
      toast.error("Delete failed");
    } else {
      toast.success("Deleted");
      fetchPosts();
    }
  };

  return (
    <section>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Posts</h1>
        <div className="flex items-center gap-2">
          <Link
            href="/dashboard/posts/new"
            className="inline-flex items-center gap-2 bg-[var(--color-primary)] text-white px-4 py-1 rounded-lg hover:bg-[var(--color-primary-hover)]"
          >
            <PlusCircle size={16} />
            New Post
          </Link>

          <div
            // href="/dashboard/posts/ai-wizard"
            className="inline-flex items-center gap-2 bg-[var(--color-secondary)] text-white px-4 py-1 rounded-lg hover:bg-[var(--color-secondary-hover)]"
          >
            AI Wizard
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="animate-spin" />
        </div>
      ) : posts && posts.length === 0 ? (
        <div className="text-center py-20 text-text-muted">
          No posts yet — create one!
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 gap-4">
          {posts!.map((p) => (
            <article
              key={p.id}
              className="bg-surface border border-border rounded-xl p-4 flex flex-col gap-4"
            >
              {p.cover_url && (
                <img
                  src={p.cover_url}
                  alt={p.title}
                  className="w-36 h-24 object-cover rounded-md"
                />
              )}

              <div className="">
                <div className="flex flex-col">
                  <div>
                    <h3 className="text-lg font-semibold">{p.title}</h3>
                    <p className="text-sm text-text-muted line-clamp-2">
                      {p.excerpt}
                    </p>
                  </div>
                  <div className="text-[12px] text-text-muted pt-1">
                    {new Date(p.created_at).toLocaleDateString()}
                  </div>
                </div>

                <div className="mt-3 flex items-center gap-2">
                  <Link
                    href={`/dashboard/posts/${p.id}/edit`}
                    className="text-primary hover:underline inline-flex items-center gap-2"
                  >
                    <Edit size={14} /> Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(p.id)}
                    className="text-red-600 inline-flex items-center gap-2 cursor-pointer"
                  >
                    <Trash2 size={14} /> Delete
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
