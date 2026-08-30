"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";

interface Option { label: string; value: string; }
interface Props {
  label: string; value: string; onChange: (v: string) => void;
  options: (string | Option)[]; placeholder?: string;
}

export default function CustomSelect({ label, value, onChange, options, placeholder = "Selecione" }: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const normalized: Option[] = options.map(o => typeof o === "string" ? { label: o, value: o } : o);
  const selected = normalized.find(o => o.value === value);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div style={{ position: "relative", width: "100%", maxWidth: "100%", minWidth: 0 }} ref={ref}>
      <label className="form-label">{label}</label>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        style={{
          width: "100%",
          maxWidth: "100%",
          minWidth: 0,
          height: 42,
          padding: "0 12px",
          borderRadius: 10,
          background: "var(--bg-card)",
          border: `1px solid ${open ? "rgba(19,19,21,0.3)" : "rgba(19,19,21,0.12)"}`,
          color: selected ? "var(--text-primary)" : "var(--text-tertiary)",
          fontSize: 14,
          fontFamily: "'Inter Tight', sans-serif",
          display: "grid",
          gridTemplateColumns: "1fr auto",
          alignItems: "center",
          gap: 8,
          cursor: "pointer",
          outline: "none",
          transition: "border-color 0.15s",
          boxShadow: open ? "0 0 0 3px rgba(19,19,21,0.06)" : "none",
          boxSizing: "border-box",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            textAlign: "left",
            width: "100%",
            minWidth: 0,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {selected ? selected.label : placeholder}
        </div>
        <ChevronDown size={14} style={{ transform: open ? "rotate(180deg)" : "none", transition: "transform 0.2s", flexShrink: 0 }} />
      </button>

      {open && (
        <div
          style={{
            position: "absolute",
            top: "calc(100% + 4px)",
            left: 0,
            right: 0,
            width: "100%",
            maxWidth: "100%",
            minWidth: 0,
            zIndex: 50,
            background: "#fff",
            border: "1px solid rgba(19,19,21,0.1)",
            borderRadius: 12,
            boxShadow: "0 8px 30px rgba(19,19,21,0.12)",
            padding: 6,
            display: "flex",
            flexDirection: "column",
            gap: 2,
            boxSizing: "border-box",
            maxHeight: 280,
            overflowY: "auto",
          }}
        >
          {normalized.map(opt => (
            <div
              key={opt.value}
              onClick={() => { onChange(opt.value); setOpen(false); }}
              style={{
                padding: "8px 10px",
                borderRadius: 8,
                fontSize: 13,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 8,
                background: opt.value === value ? "var(--bg-card)" : "transparent",
                color: "var(--text-primary)",
                fontWeight: opt.value === value ? 500 : 400,
                transition: "background 0.1s",
                boxSizing: "border-box",
                minWidth: 0,
              }}
              onMouseEnter={e => { if (opt.value !== value) (e.currentTarget as HTMLDivElement).style.background = "#f8f8f8"; }}
              onMouseLeave={e => { if (opt.value !== value) (e.currentTarget as HTMLDivElement).style.background = "transparent"; }}
            >
              <span
                style={{
                  flex: 1,
                  minWidth: 0,
                  whiteSpace: "normal",
                  wordBreak: "break-word",
                  lineHeight: 1.35,
                  textAlign: "left",
                }}
              >
                {opt.label}
              </span>
              {opt.value === value && <Check size={13} style={{ flexShrink: 0, marginLeft: 4 }} />}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
