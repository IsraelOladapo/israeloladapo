"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import { Eye, EyeOff, Loader2 } from "lucide-react";

export default function NewPostPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [inputTag, setInputTag] = useState("");
  const [content, setContent] = useState("");
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [coverUrl, setCoverUrl] = useState<string | null>(null);
  const [featured, setFeatured] = useState(false);
  const [preview, setPreview] = useState(false);
  const [loading, setLoading] = useState(false);

  // Auto-generate slug
  useEffect(() => {
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
      .upload(fileName, file);

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

  // Save post
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !excerpt || !content) return alert("Please fill all fields.");

    setLoading(true);

    let uploadedCoverUrl = coverUrl;
    if (coverFile) uploadedCoverUrl = await uploadCover(coverFile);

    const { error } = await supabase.from("posts").insert([
      {
        title,
        slug,
        excerpt,
        tags,
        content,
        cover_url: uploadedCoverUrl,
        featured,
        views: 0,
        likes: 0,
      },
    ]);

    setLoading(false);

    if (error) alert(error.message);
    else {
      alert("Post created successfully!");
      router.push("/dashboard");
    }
  };

  return (
    <section className="min-h-screen py-10">
      <div className="max-w-5xl mx-auto bg-surface border border-border rounded-2xl p-8 shadow-md">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Create New Post</h1>
          <button
            onClick={() => setPreview(!preview)}
            className="flex items-center gap-2 text-sm border border-border rounded-lg px-3 py-2 hover:bg-surface"
          >
            {preview ? <EyeOff size={16} /> : <Eye size={16} />}
            {preview ? "Hide Preview" : "Show Preview"}
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
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

          {/* Cover Upload */}
          <div>
            <label className="block text-sm mb-1 font-medium">
              Cover Image
            </label>
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
                  className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm"
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
                className="bg-primary text-white px-4 rounded-lg hover:bg-primary-hover cursor-pointer"
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

          {/* Markdown Editor */}
          <div>
            <label className="block text-sm mb-1 font-medium">Content</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={10}
              className="w-full p-3 border border-border rounded-lg bg-background font-mono"
            />
          </div>

          {/* Preview */}
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

          {/* Submit */}
          <button
            disabled={loading}
            className="w-full mt-6 bg-primary text-white py-3 rounded-lg hover:bg-primary-hover flex justify-center items-center gap-2 cursor-pointer"
          >
            {loading ? <Loader2 className="animate-spin" /> : "Publish Post"}
          </button>
        </form>
      </div>
    </section>
  );
}
