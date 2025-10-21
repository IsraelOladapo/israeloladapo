"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import { Eye, EyeOff, Loader2, Trash2 } from "lucide-react";

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

export default function EditPostPage() {
  const router = useRouter();
  const { id } = useParams();
  const [post, setPost] = useState<Post>();

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [inputTag, setInputTag] = useState("");
  const [content, setContent] = useState("");
  const [coverUrl, setCoverUrl] = useState<string | null>(null);
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [featured, setFeatured] = useState(false);
  const [preview, setPreview] = useState(false);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  // Fetch post data
  useEffect(() => {
    const fetchPost = async () => {
      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .eq("id", id)
        .single();

      if (error) console.error(error);
      else if (data) {
        setPost(data);
        setTitle(data.title);
        setSlug(data.slug);
        setExcerpt(data.excerpt);
        setTags(data.tags || []);
        setContent(data.content);
        setCoverUrl(data.cover_url);
        setFeatured(data.featured);
      }
      setLoading(false);
    };
    fetchPost();
  }, [id]);

  // Auto slugify
  useEffect(() => {
    if (!post) return;
    const slugified = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
    setSlug(slugified);
  }, [title]);

  // Upload cover image to Supabase
  const uploadCover = async (file: File) => {
    const fileName = `${Date.now()}-${file.name}`;
    const { error } = await supabase.storage
      .from("post-covers")
      .upload(fileName, file, { upsert: true });

    if (error) {
      console.error("Upload failed:", error);
      return null;
    }

    const { data } = supabase.storage
      .from("post-covers")
      .getPublicUrl(fileName);
    return data.publicUrl;
  };

  // Add tag
  const addTag = () => {
    if (inputTag && !tags.includes(inputTag)) {
      setTags([...tags, inputTag]);
      setInputTag("");
    }
  };

  // Delete tag
  const removeTag = (t: string) => setTags(tags.filter((tag) => tag !== t));

  // Update post
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setUpdating(true);

    let uploadedCoverUrl = coverUrl;
    if (coverFile) uploadedCoverUrl = await uploadCover(coverFile);

    const { error } = await supabase
      .from("posts")
      .update({
        title,
        slug,
        excerpt,
        tags,
        content,
        cover_url: uploadedCoverUrl,
        featured,
      })
      .eq("id", id);

    setUpdating(false);

    if (error) alert(error.message);
    else {
      alert("Post updated successfully!");
      router.push("/dashboard");
    }
  };

  // Delete post
  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this post?")) return;
    const { error } = await supabase.from("posts").delete().eq("id", id);
    if (error) alert(error.message);
    else {
      alert("Post deleted successfully.");
      router.push("/dashboard");
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="animate-spin" />
      </div>
    );

  return (
    <section className="min-h-screen py-10">
      <div className="max-w-5xl mx-auto bg-surface border border-border rounded-2xl p-8 shadow-md">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Edit Post</h1>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setPreview(!preview)}
              className="flex items-center gap-2 text-sm border border-border rounded-lg px-3 py-2 hover:bg-surface"
            >
              {preview ? <EyeOff size={16} /> : <Eye size={16} />}
              {preview ? "Hide Preview" : "Show Preview"}
            </button>
            <button
              onClick={handleDelete}
              className="flex items-center gap-2 text-sm border border-red-600 text-red-600 rounded-lg px-3 py-2 hover:bg-red-600 hover:text-white transition"
            >
              <Trash2 size={16} /> Delete
            </button>
          </div>
        </div>

        <form onSubmit={handleUpdate} className="space-y-6">
          {/* Title & Slug */}
          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm mb-1 font-medium">Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-3 border border-border rounded-lg bg-background"
              />
            </div>
            <div>
              <label className="block text-sm mb-1 font-medium">Slug</label>
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                className="w-full p-3 border border-border rounded-lg bg-background"
              />
            </div>
          </div>

          {/* Excerpt */}
          <div>
            <label className="block text-sm mb-1 font-medium">Excerpt</label>
            <textarea
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              rows={2}
              className="w-full p-3 border border-border rounded-lg bg-background"
            />
          </div>

          {/* Cover Image */}
          <div>
            <label className="block text-sm mb-1 font-medium">
              Cover Image
            </label>
            {coverUrl && (
              <div className="mb-3">
                <img
                  src={coverUrl}
                  alt="cover"
                  className="rounded-lg max-h-48 object-cover"
                />
              </div>
            )}
            <div className="flex items-center gap-4">
              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  e.target.files?.[0] && setCoverFile(e.target.files[0])
                }
              />
              {coverFile && (
                <p className="text-sm text-text-muted">{coverFile.name}</p>
              )}
            </div>
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm mb-1 font-medium">Tags</label>
            <div className="flex flex-wrap gap-2 mb-3">
              {tags.map((tag, i) => (
                <span
                  key={i}
                  onClick={() => removeTag(tag)}
                  className="cursor-pointer bg-primary/10 text-primary px-3 py-1 rounded-full text-sm hover:bg-primary/20 transition"
                >
                  #{tag}
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={inputTag}
                onChange={(e) => setInputTag(e.target.value)}
                placeholder="Add tag"
                className="flex-1 p-3 border border-border rounded-lg bg-background"
              />
              <button
                type="button"
                onClick={addTag}
                className="bg-primary text-white px-4 rounded-lg hover:bg-primary-hover"
              >
                Add
              </button>
            </div>
          </div>

          {/* Featured Toggle */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={featured}
              onChange={(e) => setFeatured(e.target.checked)}
            />
            <label className="text-sm font-medium">Feature this post</label>
          </div>

          {/* Markdown Content */}
          <div>
            <label className="block text-sm mb-1 font-medium">Content</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={10}
              className="w-full p-3 border border-border rounded-lg bg-background font-mono"
            />
          </div>

          {/* Live Preview */}
          {preview && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 border-t border-border pt-6"
            >
              <h3 className="text-lg font-semibold mb-3">Live Preview</h3>
              <div className="prose prose-neutral dark:prose-invert max-w-none">
                <ReactMarkdown>{content}</ReactMarkdown>
              </div>
            </motion.div>
          )}

          {/* Update Button */}
          <button
            disabled={updating}
            className="w-full mt-6 bg-primary text-white py-3 rounded-lg hover:bg-primary-hover flex justify-center items-center gap-2"
          >
            {updating ? <Loader2 className="animate-spin" /> : "Update Post"}
          </button>
        </form>
      </div>
    </section>
  );
}
