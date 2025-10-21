import '@fontsource/mulish';
import '@fontsource/mulish/500.css';
import '@fontsource/mulish/700.css';
import '@fontsource/mulish/800.css';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import { Suspense } from 'react';
import routes from './routes.jsx';
import Layout from 'components/AppLayout/AppLayout';
import { AppLoader } from 'components/UI';

const App = () => {
  const AppRouter = createBrowserRouter([
    {
      element: (
        <Suspense fallback={<AppLoader visible={true} />}>
          <Layout>
            <Outlet />
          </Layout>
        </Suspense>
      ),
      children: [...routes],
    },
  ]);

  return (
    <RouterProvider
      router={AppRouter}
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    />
  );
};

export default App;
