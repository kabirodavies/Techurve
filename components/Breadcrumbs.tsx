"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";

const segmentToLabel = (segment: string) => {
  if (!segment) return "Home";
  // Add custom mappings as needed
  return segment.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase());
};

export default function Breadcrumbs() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  const crumbs = segments.map((seg, idx) => ({
    href: "/" + segments.slice(0, idx + 1).join("/"),
    label: segmentToLabel(seg),
  }));

  return (
    <nav aria-label="Breadcrumb" className="mb-6 w-full text-left">
      <ol className="flex items-center space-x-2 text-sm">
        <li>
          <Link href="/" className="font-semibold text-white hover:underline">
            Home
          </Link>
        </li>
        {crumbs.map((crumb, idx) => (
          <li key={crumb.href} className="flex items-center">
            <span className="mx-2 text-white/60">{'>'}</span>
            {idx === crumbs.length - 1 ? (
              <span className="font-semibold text-cyan-400">{crumb.label}</span>
            ) : (
              <Link href={crumb.href} className="font-semibold text-white hover:underline">
                {crumb.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
} 