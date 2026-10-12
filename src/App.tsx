import { Route, Routes } from 'react-router-dom';

import { RequireAuth } from '@/components/admin/RequireAuth';
import { RootShell } from '@/layouts/RootShell';
import Home from '@/pages/public/Home';
import About from '@/pages/public/About';
import Skills from '@/pages/public/Skills';
import Projects from '@/pages/public/Projects';
import Articles from '@/pages/public/Articles';
import Contact from '@/pages/public/Contact';
import NotFound from '@/pages/public/NotFound';

import AdminDashboard from '@/pages/admin/AdminDashboard';
import AdminProjects from '@/pages/admin/AdminProjects';
import AdminArticles from '@/pages/admin/AdminArticles';
import AdminExperience from '@/pages/admin/AdminExperience';
import AdminSettings from '@/pages/admin/AdminSettings';

function App() {
  return (
    <Routes>
      {/* Public routes — share one persistent shell (cursor, boot gate, terminal, taskbar) */}
      <Route element={<RootShell />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/skills" element={<Skills />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/articles" element={<Articles />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Route>

      {/* Admin routes */}
      <Route
        path="/admin"
        element={
          <RequireAuth>
            <AdminDashboard />
          </RequireAuth>
        }
      />
      <Route
        path="/admin/projects"
        element={
          <RequireAuth>
            <AdminProjects />
          </RequireAuth>
        }
      />
      <Route
        path="/admin/articles"
        element={
          <RequireAuth>
            <AdminArticles />
          </RequireAuth>
        }
      />
      <Route
        path="/admin/experience"
        element={
          <RequireAuth>
            <AdminExperience />
          </RequireAuth>
        }
      />
      <Route
        path="/admin/settings"
        element={
          <RequireAuth>
            <AdminSettings />
          </RequireAuth>
        }
      />
    </Routes>
  );
}

export default App;
