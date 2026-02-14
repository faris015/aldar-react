import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import './App.css';
import DemoLayout from './components/layout/DemoLayout';
import TicketsPage from './pages/TicketsPage';
import TicketDetailPage from './pages/TicketDetailPage';
import WorkflowTasksPage from './pages/WorkflowTasksPage';
import ReviewScreenPage from './pages/ReviewScreenPage';
import { TicketStoreProvider } from './context/TicketStore';

function App() {
  const [role, setRole] = useState('Developer');

  return (
    <TicketStoreProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DemoLayout role={role} onRoleChange={setRole} />}>
            <Route index element={<Navigate to="/tickets" replace />} />

            <Route path="tickets" element={<TicketsPage />} />
            <Route path="tickets/:ticketId" element={<TicketDetailPage />} />

            <Route path="workflow" element={<WorkflowTasksPage />} />
            <Route path="workflow/review/:ticketId" element={<ReviewScreenPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TicketStoreProvider>
  );
}

export default App;
