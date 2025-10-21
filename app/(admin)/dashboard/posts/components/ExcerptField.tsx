// // /app/dashboard/posts/components/ExcerptField.tsx
// "use client";

// import { useState } from "react";
// import { Loader2, Sparkles } from "lucide-react";
// import toast from "react-hot-toast";
// import { generateExcerptAI } from "./ai"; // ✅ ensure this function exists

// interface ExcerptFieldProps {
//   content: string;
//   excerpt: string;
//   setExcerpt: React.Dispatch<React.SetStateAction<string>>;
// }

// export default function ExcerptField({
//   content,
//   excerpt,
//   setExcerpt,
// }: ExcerptFieldProps) {
//   const [loading, setLoading] = useState(false);

//   const typeWriterEffect = (text: string) => {
//     let i = 0;
//     setExcerpt("");
//     const interval = setInterval(() => {
//       setExcerpt((prev) => prev + text.charAt(i));
//       i++;
//       if (i >= text.length) clearInterval(interval);
//     }, 25);
//   };

//   const handleGenerate = async () => {
//     if (!content || content.trim().length < 20) {
//       toast.error("Please write some content first.");
//       return;
//     }
//     setLoading(true);
//     try {
//       const aiExcerpt = await generateExcerptAI(content);
//       typeWriterEffect(aiExcerpt);
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to generate excerpt.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="space-y-2">
//       <label className="block text-sm font-medium text-txt">Excerpt</label>
//       <div className="flex gap-2 items-start">
//         <textarea
//           value={excerpt}
//           onChange={(e) => setExcerpt(e.target.value)}
//           placeholder="Short summary or teaser..."
//           className="flex-1 p-2 border border-border rounded-lg bg-surface focus:ring-1 focus:ring-primary outline-none resize-none"
//           rows={3}
//         />
//         <button
//           type="button"
//           onClick={handleGenerate}
//           disabled={loading}
//           className={`p-2 rounded-lg text-white flex items-center justify-center transition duration-300 ${
//             loading
//               ? "bg-primary/70 cursor-wait"
//               : "bg-primary hover:bg-primary-hover"
//           }`}
//         >
//           {loading ? (
//             <Loader2 className="w-5 h-5 animate-spin" />
//           ) : (
//             <Sparkles className="w-5 h-5" />
//           )}
//         </button>
//       </div>
//     </div>
//   );
// }

// // "use client";
// // import { useState } from "react";
// // import { Loader2, Sparkles } from "lucide-react";
// // import toast from "react-hot-toast";
// // import { generateExcerptAI } from "./ai";

// // export default function ExcerptField({
// //   content,
// //   excerpt,
// //   setExcerpt,
// // }: {
// //   content: string;
// //   excerpt: string;
// //   setExcerpt: (value: string) => void;
// // }) {
// //   const [loading, setLoading] = useState(false);

// //   const typeWriterEffect = (text: string) => {
// //     let i = 0;
// //     setExcerpt("");
// //     const interval = setInterval(() => {
// //       setExcerpt((prev) => prev + text.charAt(i));
// //       i++;
// //       if (i >= text.length) clearInterval(interval);
// //     }, 25);
// //   };

// //   const handleGenerate = async () => {
// //     if (!content || content.trim().length < 20) {
// //       toast.error("Please write some content first.");
// //       return;
// //     }
// //     setLoading(true);
// //     try {
// //       const aiExcerpt = await generateExcerptAI(content);
// //       typeWriterEffect(aiExcerpt);
// //     } catch (err) {
// //       console.error(err);
// //       toast.error("Failed to generate excerpt.");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <div className="space-y-2">
// //       <label className="block text-sm font-medium text-txt">Excerpt</label>
// //       <div className="flex gap-2 items-start">
// //         <textarea
// //           value={excerpt}
// //           onChange={(e) => setExcerpt(e.target.value)}
// //           placeholder="Short summary or teaser..."
// //           className="flex-1 p-2 border border-border rounded-lg bg-surface focus:ring-1 focus:ring-primary outline-none resize-none"
// //           rows={3}
// //         />
// //         <button
// //           type="button"
// //           onClick={handleGenerate}
// //           disabled={loading}
// //           className={`p-2 rounded-lg text-white flex items-center justify-center transition duration-300 ${
// //             loading
// //               ? "bg-primary/70 cursor-wait"
// //               : "bg-primary hover:bg-primary-hover"
// //           }`}
// //         >
// //           {loading ? (
// //             <Loader2 className="w-5 h-5 animate-spin" />
// //           ) : (
// //             <Sparkles className="w-5 h-5" />
// //           )}
// //         </button>
// //       </div>
// //     </div>
// //   );
// // }

// // // // /app/dashboard/posts/components/ExcerptField.tsx
// // // "use client";
// // // import { useState } from "react";
// // // import { generateExcerpt } from "@/app/dashboard/posts/components/ai";

// // // export default function ExcerptField({
// // //   value,
// // //   setValue,
// // // }: {
// // //   value: string;
// // //   setValue: (v: string) => void;
// // // }) {
// // //   const [loading, setLoading] = useState(false);

// // //   const handleGenerate = async () => {
// // //     setLoading(true);
// // //     try {
// // //       const result = await generateExcerpt(value);
// // //       setValue(result);
// // //     } catch {
// // //       alert("Excerpt generation failed");
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   return (
// // //     <div className="space-y-2">
// // //       <label className="font-medium text-sm text-txt">Excerpt</label>
// // //       <textarea
// // //         className="w-full border border-border rounded-lg px-3 py-2 text-sm"
// // //         rows={3}
// // //         value={value}
// // //         onChange={(e) => setValue(e.target.value)}
// // //         placeholder="Short summary of your post..."
// // //       />
// // //       <button
// // //         type="button"
// // //         disabled={loading}
// // //         onClick={handleGenerate}
// // //         className="text-xs bg-primary text-white px-3 py-1 rounded hover:bg-primary-hover"
// // //       >
// // //         {loading ? "Generating..." : "AI Generate"}
// // //       </button>
// // //     </div>
// // //   );
// // // }
