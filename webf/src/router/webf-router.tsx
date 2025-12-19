import React, { type PropsWithChildren, useEffect } from 'react';

/**
 * WebF Router Compatibility Layer
 * 
 * Based on: https://github.com/openwebf/webf/blob/main/use_cases/src/router.tsx
 * 
 * This module provides a unified routing API that works in both WebF environment
 * and browser environment:
 * - In WebF: uses @openwebf/react-router (native Flutter routing)
 * - In Browser: uses react-router-dom (web routing)
 */

// Import types/values from both libraries
// Note: @openwebf/react-router will only be available in WebF environment
// In browser, we'll use react-router-dom exclusively
import {
  BrowserRouter,
  Link as RRDLink,
  Route as RRDRoute,
  Routes as RRDRoutes,
  useLocation as RRDUseLocation,
  useNavigate,
  useParams as RRDUseParams,
} from 'react-router-dom';

// Detect WebF environment
const isWebF = typeof window !== 'undefined' && !!(window as any).webf;

// WebF library will be imported dynamically in production
let WebFLib: any = null;
if (isWebF) {
  try {
    // In production, this would be: import('@openwebf/react-router')
    // For now, we'll use browser routing as fallback
    console.log('WebF environment detected');
  } catch (e) {
    console.warn('Failed to load @openwebf/react-router, using browser routing');
  }
}

// Navigator bridge for browser environment
type NavigateFn = (to: string, options?: { replace?: boolean; state?: any }) => void;
let navigateImpl: NavigateFn = (to, options) => {
  // Fallback if navigate not yet registered
  if (options?.replace) {
    window.location.replace(to);
  } else {
    window.location.assign(to);
  }
};

/**
 * Internal component to register navigate function
 */
const NavigatorRegistrar: React.FC = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigateImpl = (to, options) => navigate(to, options);
  }, [navigate]);
  return null;
};

/**
 * RouterProvider Component
 * Wraps the app with appropriate router based on environment
 */
export const RouterProvider: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  if (isWebF && WebFLib) {
    // In WebF environment, no need for BrowserRouter
    return <>{children}</>;
  }
  // In browser environment, use BrowserRouter
  return (
    <BrowserRouter>
      <NavigatorRegistrar />
      {children}
    </BrowserRouter>
  );
};

/**
 * Hooks - Auto-select based on environment
 */
export const useParams: typeof RRDUseParams = isWebF && WebFLib 
  ? WebFLib.useParams 
  : RRDUseParams;

export const useLocation: typeof RRDUseLocation = isWebF && WebFLib 
  ? WebFLib.useLocation 
  : RRDUseLocation;

/**
 * Components - Auto-select based on environment
 */
export const Routes: any = isWebF && WebFLib ? WebFLib.Routes : RRDRoutes;
export const Route: any = isWebF && WebFLib ? WebFLib.Route : RRDRoute;

/**
 * WebFRouterLink Component
 * Unified link component that works in both environments
 */
type WebFRouterLinkProps = PropsWithChildren<{
  path: string;
  title?: string;
  onScreen?: () => void;
}>;

export const WebFRouterLink: React.FC<WebFRouterLinkProps> = isWebF && WebFLib
  ? WebFLib.WebFRouterLink
  : ({ path, children, onScreen }: WebFRouterLinkProps) => {
      useEffect(() => {
        onScreen?.();
      }, [onScreen]);
      return <RRDLink to={path}>{children}</RRDLink>;
    };

/**
 * WebFRouter API
 * Provides imperative navigation methods
 */
export const WebFRouter = isWebF && WebFLib
  ? WebFLib.WebFRouter
  : {
      // Push a new route onto the stack
      pushState: (state: any, path: string) => navigateImpl(path, { state }),
      
      // Replace current route
      replaceState: (state: any, path: string) => navigateImpl(path, { replace: true, state }),
      
      // Go back
      back: () => window.history.back(),
      
      // Async push
      push: async (path: string, state?: any) => {
        navigateImpl(path, { state });
        return true;
      },
      
      // Async replace
      replace: async (path: string, state?: any) => {
        navigateImpl(path, { replace: true, state });
        return true;
      },
      
      // Pop and push (replace current)
      popAndPushNamed: async (path: string, state?: any) => {
        navigateImpl(path, { replace: true, state });
        return true;
      },
      
      // Check if can pop
      canPop: () => window.history.length > 1,
      
      // Maybe pop
      maybePop: () => {
        if (window.history.length > 1) {
          window.history.back();
          return true;
        }
        return false;
      },
      
      // Restorable pop and push
      restorablePopAndPushNamed: async (path: string, state?: any) => {
        const restorationId = Date.now();
        navigateImpl(path, { state: { ...(state || {}), restorationId } });
        return restorationId;
      },
    };

/**
 * Environment detection
 */
export const isWebFEnvironment = isWebF;

/**
 * Type declarations for window.webf
 */
declare global {
  interface Window {
    webf?: any;
  }
}

