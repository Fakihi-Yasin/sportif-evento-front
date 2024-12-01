import React, { useState, useEffect } from 'react';
import { getAllParticipants } from "../services/eventService";
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { Download, Loader2, Search, X, Users } from 'lucide-react';

const Participants = () => {
  const [participants, setParticipants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchParticipants = async () => {
      try {
        const data = await getAllParticipants();
        if (!Array.isArray(data)) {
          throw new Error('Received data is not an array');
        }
        setParticipants(data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching participants:', err);
        setError(err.message || 'Failed to fetch participants');
        setLoading(false);
      }
    };

    fetchParticipants();
  }, []);

  const filteredParticipants = participants.filter(participant => 
    participant.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    participant.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (participant.event?.name || participant.eventName || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text('Participants List', 14, 15);

    const tableColumn = ["Username", "Event Name", "Email", "Phone Number"];
    const tableRows = filteredParticipants.map(participant => [
      participant.username,
      participant.event?.name || participant.eventName || 'N/A',
      participant.email,
      participant.phoneNumber
    ]);

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 25,
      styles: { fontSize: 10, cellPadding: 3, overflow: 'linebreak' },
      headStyles: {
        fillColor: [76, 29, 149],
        textColor: 255,
        fontSize: 11,
        fontStyle: 'bold'
      },
      alternateRowStyles: {
        fillColor: [250, 245, 255]
      }
    });

    doc.save('participants-list.pdf');
  };

  if (loading) {
    return (
      <div className="min-h-[600px] flex justify-center items-center bg-white rounded-xl shadow-sm">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-10 w-10 animate-spin text-black-600" />
          <span className="text-lg font-medium text-violet-600">Loading participants...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[600px] flex items-center justify-center bg-white rounded-xl shadow-sm">
        <div className="max-w-md w-full mx-4 p-8 bg-red-50 border-l-4 border-red-500 rounded-lg">
          <h2 className="text-red-700 font-bold text-lg mb-2">Error Loading Participants</h2>
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-700 to-blue-800  mt-4 rounded-xl shadow-lg p-6 text-white">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Users className="h-8 w-8" />
            <div>
              <h2 className="text-2xl font-bold ">Participants</h2>
              <p className="text-violet-100">
                {searchTerm 
                  ? `Found ${filteredParticipants.length} matching participants`
                  : `Total participants: ${participants.length}`
                }
              </p>
            </div>
          </div>
          {participants.length > 0 && (
            <button
              onClick={downloadPDF}
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg transition-all duration-200 font-medium backdrop-blur-sm"
            >
              <Download className="h-5 w-5" />
              Export PDF
            </button>
          )}
        </div>

        {/* Search Input */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-violet-300" />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search participants by name, email, or event..."
            className="block w-full pl-11 pr-10 py-3 bg-white/10 border border-violet-400/20 rounded-xl text-white placeholder-violet-300 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-200 backdrop-blur-sm"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-violet-300 hover:text-white transition-colors duration-200"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-violet-100">
        {filteredParticipants.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16">
            <Users className="h-16 w-16 text-violet-200 mb-4" />
            {searchTerm ? (
              <>
                <h3 className="text-lg font-medium text-gray-900 mb-1">No matching participants</h3>
                <p className="text-gray-500">Try adjusting your search terms</p>
              </>
            ) : (
              <>
                <h3 className="text-lg font-medium text-gray-900 mb-1">No participants yet</h3>
                <p className="text-gray-500">Participants will appear here once they register</p>
              </>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-violet-50">
                  <th className="px-6 py-4 text-left text-xs font-semibold text-black-600 uppercase tracking-wider">Username</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-black-600 uppercase tracking-wider">Event Name</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-black-600 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-black-600 uppercase tracking-wider">Phone Number</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-violet-100">
                {filteredParticipants.map((participant) => (
                  <tr 
                    key={participant._id || Math.random()} 
                    className="hover:bg-black-50/50 transition-colors duration-150"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black-900">
                      {participant.username}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {participant.event?.name || participant.eventName || 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {participant.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {participant.phoneNumber}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Participants;