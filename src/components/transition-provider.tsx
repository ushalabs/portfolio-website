"use client";

import { createContext, useContext, useEffect, useRef, useState, useTransition, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";

type FinishCallback = () => void;

interface TransitionContextValue {
  registerFinish: (cb: FinishCallback) => void;
}

const TransitionContext = createContext<TransitionContextValue | null>(null);

export function ViewTransitions({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const currentPathname = useRef(pathname);
  const finishRef = useRef<FinishCallback | null>(null);
  const [, setTick] = useState(0);

  // When pathname changes (new route has mounted), invoke pending view transition resolve callback
  useEffect(() => {
    currentPathname.current = pathname;
    if (finishRef.current) {
      const cb = finishRef.current;
      finishRef.current = null;
      cb();
    }
  }, [pathname]);

  const registerFinish = (cb: FinishCallback) => {
    finishRef.current = cb;
  };

  return (
    <TransitionContext.Provider value={{ registerFinish }}>
      {children}
    </TransitionContext.Provider>
  );
}

export function useTransitionRouter() {
  const router = useRouter();
  const context = useContext(TransitionContext);
  const [, startTransition] = useTransition();

  const trigger = (action: () => void) => {
    if (
      typeof document === "undefined" ||
      !("startViewTransition" in document) ||
      matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      action();
      return;
    }

    try {
      let resolved = false;
      const transition = (document as unknown as {
        startViewTransition: (cb: () => Promise<void>) => {
          updateCallbackDone?: Promise<unknown>;
          ready?: Promise<unknown>;
          finished?: Promise<unknown>;
        };
      }).startViewTransition(() => {
        return new Promise<void>((resolve) => {
          const finish = () => {
            if (!resolved) {
              resolved = true;
              resolve();
            }
          };

          // Safety timeout (1200ms) so Chrome never hits the 4000ms DOM update timeout:
          const timer = setTimeout(finish, 1200);

          if (context) {
            context.registerFinish(() => {
              clearTimeout(timer);
              finish();
            });
          } else {
            requestAnimationFrame(() => {
              clearTimeout(timer);
              finish();
            });
          }

          startTransition(() => {
            action();
          });
        });
      });

      transition.updateCallbackDone?.catch(() => {});
      transition.ready?.catch(() => {});
      transition.finished?.catch(() => {});
    } catch {
      action();
    }
  };

  return {
    ...router,
    push(href: string, options?: { scroll?: boolean }) {
      trigger(() => router.push(href, options));
    },
    replace(href: string, options?: { scroll?: boolean }) {
      trigger(() => router.replace(href, options));
    },
  };
}
