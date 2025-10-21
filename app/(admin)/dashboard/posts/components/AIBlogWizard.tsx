// "use client";

// import { useState } from "react";
// import ExcerptField from "./ExcerptField";
// import CoverGenerator from "./CoverGenerator";
// import TagSelector from "./TagSelector";
// import { Loader2, Check } from "lucide-react";
// import toast from "react-hot-toast";
// import { supabase } from "@/lib/supabaseClient";

// export default function AIBlogWizard() {
//   const [title, setTitle] = useState("");
//   const [content, setContent] = useState("");
//   const [excerpt, setExcerpt] = useState("");
//   const [coverUrl, setCoverUrl] = useState("");
//   const [tags, setTags] = useState<string[]>([]);
//   const [submitting, setSubmitting] = useState(false);

//   const handleSubmit = async () => {
//     if (!title || !content)
//       return toast.error("Title and content are required.");
//     setSubmitting(true);

//     const slug = title.toLowerCase().replace(/\s+/g, "-");

//     const { data, error } = await supabase.from("posts").insert([
//       {
//         title,
//         content,
//         excerpt,
//         cover_url: coverUrl,
//         tags,
//         slug,
//         created_at: new Date().toISOString(),
//         featured: false,
//         views: 0,
//         likes: 0,
//       },
//     ]);

//     if (error) {
//       console.error(error);
//       toast.error("Failed to publish post.");
//     } else {
//       toast.success("Post published successfully!");
//       // Reset fields
//       setTitle("");
//       setContent("");
//       setExcerpt("");
//       setCoverUrl("");
//       setTags([]);
//     }
//     setSubmitting(false);
//   };

//   return (
//     <div className="space-y-6 bg-background text-txt p-6 rounded-xl shadow-md max-w-4xl mx-auto">
//       <div className="space-y-2">
//         <label className="font-semibold">Title</label>
//         <input
//           type="text"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           className="w-full p-2 border border-border rounded-lg bg-surface focus:ring-1 focus:ring-primary outline-none"
//         />
//         <label className="font-semibold mt-2">Content</label>
//         <textarea
//           rows={8}
//           value={content}
//           onChange={(e) => setContent(e.target.value)}
//           className="w-full p-2 border border-border rounded-lg bg-surface focus:ring-1 focus:ring-primary outline-none resize-none"
//         />
//       </div>

//       <ExcerptField
//         content={content}
//         excerpt={excerpt}
//         setExcerpt={setExcerpt}
//       />
//       <CoverGenerator
//         title={title}
//         coverUrl={coverUrl}
//         setCoverUrl={setCoverUrl}
//       />
//       <TagSelector tags={tags} setTags={setTags} />

//       <div className="flex justify-end">
//         <button
//           onClick={handleSubmit}
//           disabled={submitting}
//           className={`px-6 py-2 rounded-lg text-white flex items-center gap-2 ${
//             submitting
//               ? "bg-primary/70 cursor-wait"
//               : "bg-primary hover:bg-primary-hover"
//           }`}
//         >
//           {submitting ? (
//             <Loader2 className="w-4 h-4 animate-spin" />
//           ) : (
//             <Check className="w-4 h-4" />
//           )}
//           {submitting ? "Publishing..." : "Publish Post"}
//         </button>
//       </div>
//     </div>
//   );
// }
