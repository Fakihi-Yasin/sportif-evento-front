import React from 'react';

// Données de démonstration (à remplacer par des données dynamiques)
const mockEvents = [
  { id: 1, name: 'Tournoi de Football', date: '2024-06-15', location: 'Stade Municipal' },
  { id: 2, name: 'Marathon Urbain', date: '2024-07-20', location: 'Centre-ville' },
  { id: 3, name: 'Compétition de Cyclisme', date: '2024-08-10', location: 'Parc Régional' }
];

const mockParticipants = [
  { id: 1, name: 'Jean Dupont', event: 'Tournoi de Football', email: 'jean.dupont@email.com' },
  { id: 2, name: 'Marie Lefebvre', event: 'Marathon Urbain', email: 'marie.lefebvre@email.com' },
  { id: 3, name: 'Pierre Martin', event: 'Compétition de Cyclisme', email: 'pierre.martin@email.com' }
];

const DashboardStats = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Tableau de Bord</h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white shadow rounded p-4">
          <h3 className="font-semibold mb-2">Nombre total d'événements</h3>
          <p className="text-3xl">{mockEvents.length}</p>
        </div>
        <div className="bg-white shadow rounded p-4">
          <h3 className="font-semibold mb-2">Nombre total de participants</h3>
          <p className="text-3xl">{mockParticipants.length}</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardStats;
