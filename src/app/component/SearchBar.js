"use client";

export default function SearchBar({ value, onChange, placeholder = "Search..." }) {
  return (
    <div className="w-full max-w-md">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2"
        style={{
          borderColor: "#213C51",
        }}
      />
    </div>
  );
}
