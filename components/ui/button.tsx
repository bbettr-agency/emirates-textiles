import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "ghost" | "whatsapp" | "quiet";
type Size = "md" | "lg";

const base =
  "group inline-flex items-center justify-center gap-2 font-semibold rounded-btn transition-[transform,background-color,border-color,box-shadow,color] duration-200 ease-emirates focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-50 disabled:pointer-events-none active:translate-y-0";

const variants: Record<Variant, string> = {
  // Solid brand navy — the unambiguous primary CTA (white on navy passes AA easily)
  primary:
    "bg-navy text-white border border-navy shadow-cta hover:bg-navy-deep hover:-translate-y-0.5",
  ghost:
    "bg-transparent text-ink border border-hair-strong hover:border-navy hover:text-navy-ink hover:-translate-y-0.5",
  whatsapp:
    "bg-whatsapp text-[#04310f] border border-whatsapp hover:-translate-y-0.5 hover:shadow-lift",
  quiet:
    "bg-linen text-ink border border-hair hover:border-hair-strong",
};

const sizes: Record<Size, string> = {
  md: "text-sm px-5 py-2.5 min-h-[44px]",
  lg: "text-[0.95rem] px-6 py-3 min-h-[48px]",
};

interface CommonProps {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  className?: string;
  dataCta?: string;
}

type AnchorProps = CommonProps & {
  href: string;
  external?: boolean;
} & Omit<ComponentPropsWithoutRef<"a">, "className" | "href" | "children">;

type ButtonEl = CommonProps &
  Omit<ComponentPropsWithoutRef<"button">, "className" | "children">;

export function Button({
  variant = "primary",
  size = "md",
  children,
  className,
  dataCta,
  ...rest
}: AnchorProps | ButtonEl) {
  const classes = cn(base, variants[variant], sizes[size], className);

  if ("href" in rest && rest.href !== undefined) {
    const { href, external, ...anchorRest } = rest as AnchorProps;
    const isExternal =
      external ||
      href.startsWith("http") ||
      href.startsWith("tel:") ||
      href.startsWith("mailto:");
    if (isExternal) {
      return (
        <a
          href={href}
          className={classes}
          data-cta={dataCta}
          {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          {...anchorRest}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} data-cta={dataCta} {...anchorRest}>
        {children}
      </Link>
    );
  }

  const buttonRest = rest as ButtonEl;
  return (
    <button className={classes} data-cta={dataCta} {...buttonRest}>
      {children}
    </button>
  );
}
