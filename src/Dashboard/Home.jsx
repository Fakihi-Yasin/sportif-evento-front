import React, { useState } from 'react';
import { LayoutDashboard, Calendar, Users, Menu } from 'lucide-react';
import Events from './Events';
import Participants from './Participants';
import DashboardStats from './DashboardStats';

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch(activeTab) {
      case 'events':
        return <Events />;
      case 'participants':
        return <Participants />;
      default:
        return <DashboardStats />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={`${
        isSidebarOpen ? 'w-64' : 'w-20'
      } bg-white shadow-md transition-all duration-300`}>
        <div className="flex items-center justify-between p-4 border-b">
          <h1 className={`font-bold text-xl transition-opacity ${isSidebarOpen ? 'opacity-100' : 'opacity-0'}`}>
            Gestion Sportive
          </h1>
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 hover:bg-gray-100 rounded"
          >
            <Menu />
          </button>
        </div>
        <nav className="p-4">
          <button 
            className={`flex items-center w-full p-2 mb-2 rounded ${activeTab === 'dashboard' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'}`}
            onClick={() => setActiveTab('dashboard')}
          >
            <LayoutDashboard className="mr-2" />
            {isSidebarOpen && <span>Tableau de Bord</span>}
          </button>
          <button 
            className={`flex items-center w-full p-2 mb-2 rounded ${activeTab === 'events' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'}`}
            onClick={() => setActiveTab('events')}
          >
            <Calendar className="mr-2" />
            {isSidebarOpen && <span>Événements</span>}
          </button>
          <button 
            className={`flex items-center w-full p-2 mb-2 rounded ${activeTab === 'participants' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'}`}
            onClick={() => setActiveTab('participants')}
          >
            <Users className="mr-2" />
            {isSidebarOpen && <span>Participants</span>}
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {renderContent()}
      </main>
    </div>
  );
};

export default Dashboard;
