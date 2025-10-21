"use client";

import React from "react";

interface Props extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  label: string;
  contact: string;
  icon: React.ReactElement;
  href: string;
}

export default function ContactDm({ label, contact, icon, href }: Props) {
  return (
    <a
      href={href}
      className="flex items-center gap-4 bg-surface p-6 rounded-2xl border border-border shadow-sm"
    >
      <p>{icon}</p>
      <div>
        <h4 className="font-semibold text-txt">{label}</h4>
        <p className="text-text-muted">{contact}</p>
      </div>
    </a>
  );
}
