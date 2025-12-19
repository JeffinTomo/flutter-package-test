import { Routes, Route } from './webf-router';
import HomePage from '../pages/home';
import PointsRecordsPage from '../pages/points-records';
import NetworkManagePage from '../pages/network-manage';

/**
 * App Routes Configuration
 * Uses WebF-compatible router that works in both WebF and browser environments
 */
export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/points-records" element={<PointsRecordsPage />} />
      <Route path="/network-manage" element={<NetworkManagePage />} />
    </Routes>
  );
}

// Re-export router utilities for convenience
export { RouterProvider, WebFRouter, WebFRouterLink, useLocation, useParams, isWebFEnvironment } from './webf-router';

