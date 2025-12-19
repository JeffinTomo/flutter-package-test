import { Routes, Route } from './webf-router';
import HomePage from '../pages/home';
import PointsRecordsPage from '../pages/points-records';

/**
 * App Routes Configuration
 * Uses WebF-compatible router that works in both WebF and browser environments
 */
export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/points-records" element={<PointsRecordsPage />} />
    </Routes>
  );
}

// Re-export router utilities for convenience
export { RouterProvider, WebFRouter, WebFRouterLink, useLocation, useParams, isWebFEnvironment } from './webf-router';

