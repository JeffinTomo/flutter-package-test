import { RouterProvider, AppRoutes } from './router';

/**
 * Main App Component
 * Uses WebF-compatible routing system that works in both WebF and browser environments
 */
function App() {
  return (
    <RouterProvider>
      <AppRoutes />
    </RouterProvider>
  );
}

export default App;
