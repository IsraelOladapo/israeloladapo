// "use client";
// import { useState } from "react";
// import { Loader2, ImageIcon, RefreshCcw } from "lucide-react";
// import toast from "react-hot-toast";

// export default function CoverGenerator({
//   title,
//   coverUrl,
//   setCoverUrl,
// }: {
//   title: string;
//   coverUrl: string;
//   setCoverUrl: (value: string) => void;
// }) {
//   const [loading, setLoading] = useState(false);

//   const handleGenerate = async () => {
//     if (!title) {
//       toast.error("Please provide a title for AI prompt.");
//       return;
//     }
//     setLoading(true);
//     try {
//       const prompt = `Create a modern, tech-oriented blog cover image for a post titled "${title}". Make it vibrant, abstract, and professional.`;
//       const res = await fetch("/api/generate-cover", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ prompt }),
//       });
//       const data = await res.json();
//       if (data.url) setCoverUrl(data.url);
//       else toast.error("Failed to generate cover.");
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to generate cover.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="space-y-2">
//       <label className="block text-sm font-medium text-txt">Cover Image</label>
//       {coverUrl && (
//         <img
//           src={coverUrl}
//           alt="Cover Preview"
//           className="w-full h-48 object-cover rounded-lg border border-border"
//         />
//       )}
//       <div className="flex gap-2">
//         <button
//           type="button"
//           onClick={handleGenerate}
//           disabled={loading}
//           className={`flex items-center gap-2 px-4 py-2 rounded-lg text-white transition ${
//             loading
//               ? "bg-primary/70 cursor-wait"
//               : "bg-primary hover:bg-primary-hover"
//           }`}
//         >
//           {loading ? (
//             <Loader2 className="w-4 h-4 animate-spin" />
//           ) : (
//             <ImageIcon className="w-4 h-4" />
//           )}
//           {loading ? "Generating..." : "Generate Cover"}
//         </button>
//         {coverUrl && (
//           <button
//             type="button"
//             onClick={() => setCoverUrl("")}
//             className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary hover:bg-secondary-hover text-white"
//           >
//             <RefreshCcw className="w-4 h-4" /> Reset
//           </button>
//         )}
//       </div>
//     </div>
//   );
// }
