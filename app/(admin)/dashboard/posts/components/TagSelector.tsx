// /app/dashboard/posts/components/TagSelector.tsx
"use client";
import { useState } from "react";

interface TagSelectorProps {
  tags: string[];
  setTags: (tags: string[]) => void;
}

export default function TagSelector({ tags, setTags }: TagSelectorProps) {
  const [input, setInput] = useState("");

  const addTag = () => {
    if (input.trim() && !tags.includes(input)) {
      setTags([...tags, input.trim()]);
      setInput("");
    }
  };

  const removeTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

  return (
    <div className="space-y-2">
      <label className="font-medium text-sm text-txt">Tags</label>
      <div className="flex gap-2 flex-wrap">
        {tags.map((tag) => (
          <span
            key={tag}
            className="bg-primary/10 text-primary px-2 py-1 rounded-lg text-sm flex items-center gap-1"
          >
            {tag}
            <button
              onClick={() => removeTag(tag)}
              className="text-xs text-red-500 hover:text-red-700"
            >
              ×
            </button>
          </span>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 border border-border rounded-lg px-3 py-2 text-sm"
          placeholder="Add tag..."
        />
        <button
          type="button"
          onClick={addTag}
          className="bg-primary text-white px-3 rounded-lg hover:bg-primary-hover"
        >
          Add
        </button>
      </div>
    </div>
  );
}
