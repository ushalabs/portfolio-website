"use client";

import NextLink from "next/link";
import { useRouter } from "next/navigation";
import { useTransitionRouter } from "next-view-transitions";
import type { ComponentProps } from "react";

function useAnimatedRouter() {
  const standard = useRouter();
  const animated = useTransitionRouter();
  function choose(href: string) {
    const target = new URL(href, location.href);
    return target.pathname !== location.pathname && "startViewTransition" in document && !matchMedia("(prefers-reduced-motion: reduce)").matches ? animated : standard;
  }
  return {
    push(href: string, options?: { scroll?: boolean }) { choose(href).push(href, options); },
    replace(href: string, options?: { scroll?: boolean }) { choose(href).replace(href, options); },
  };
}

export { useAnimatedRouter };

export default function TransitionLink(props: ComponentProps<typeof NextLink>) {
  const router = useAnimatedRouter();
  return <NextLink {...props} onClick={event => {
    props.onClick?.(event);
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || (props.target && props.target !== "_self") || props.download) return;
    const target = new URL(event.currentTarget.href);
    if (target.origin !== location.origin || target.pathname === location.pathname) return;
    event.preventDefault();
    const href = target.pathname + target.search + target.hash;
    if (props.replace) router.replace(href, { scroll: props.scroll });
    else router.push(href, { scroll: props.scroll });
  }} />;
}
