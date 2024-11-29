import React from 'react';

// Données de démonstration (à remplacer par des données dynamiques)
const mockParticipants = [
  { id: 1, name: 'Jean Dupont', event: 'Tournoi de Football', email: 'jean.dupont@email.com' },
  { id: 2, name: 'Marie Lefebvre', event: 'Marathon Urbain', email: 'marie.lefebvre@email.com' },
  { id: 3, name: 'Pierre Martin', event: 'Compétition de Cyclisme', email: 'pierre.martin@email.com' }
];

const Participants = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Participants</h2>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">ID</th>
            <th className="border p-2">Nom</th>
            <th className="border p-2">Événement</th>
            <th className="border p-2">Email</th>
          </tr>
        </thead>
        <tbody>
          {mockParticipants.map(participant => (
            <tr key={participant.id} className="hover:bg-gray-50">
              <td className="border p-2">{participant.id}</td>
              <td className="border p-2">{participant.name}</td>
              <td className="border p-2">{participant.event}</td>
              <td className="border p-2">{participant.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Participants;

