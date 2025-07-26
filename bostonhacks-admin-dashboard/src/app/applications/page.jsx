'use client';
import { useCallback, useEffect, useState, useMemo } from "react";
import { DataGrid } from '@mui/x-data-grid';
import { Dialog, DialogTitle, DialogContent, List, ListItem, ListItemText, Button } from '@mui/material';

import ApplicationDetails from './components/applicationDetails'; // Import the modal component

//dummy data import 
import { dummyApps, dummyUsers } from "../../data/dummyData";
import App from "next/app";

export default function ApplicationPage() {
    const [applicants, setApplicants] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedApplicant, setSelectedApplicant] = useState(null);
    const [statusCounts, setStatusCounts] = useState({
        applied: 0,
        rejected: 0,
        accepted: 0,
        waitlisted: 0,
        pending: 0
    });

    // useEffect(() => {
    //     fetch(`/api/applicant`)
    //         .then(res => res.json())
    //         .then(data => {
    //             setApplicants(data);
    //             const counts = {
    //                 applied: data.length,
    //                 rejected: data.filter(app => app.status === 'Rejected').length,
    //                 accepted: data.filter(app => app.status === 'Accepted').length,
    //                 waitlisted: data.filter(app => app.status === 'Waitlisted').length,
    //                 pending: data.filter(app => app.status === 'Pending').length
    //             };
    //             setStatusCounts(counts);
    //         });
    // }, []);

    useEffect(() => {
        const data = dummyUsers;
        setApplicants(data);

        const counts = {
            applied: data.length,
            rejected: data.filter(app => app.status === 'Rejected').length,
            accepted: data.filter(app => app.status === 'Accepted').length,
            waitlisted: data.filter(app => app.status === 'Waitlisted').length,
            pending: data.filter(app => app.status === 'Pending').length
        };
        setStatusCounts(counts);
    }, []);

    const handleOpenModal = (applicant) => {
        setSelectedApplicant(applicant);
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    // Define the columns for DataGrid
    const columns = [
        {
            field: 'firstName',
            headerName: 'First name',
            flex: 1, // use flex 1,2,3,4... for the width of the column
            //valueGetter: (params) => `${params.row.firstName || ''} ${params.row.lastName || ''}`,
        },
        {
            field: 'lastName',
            headerName: 'Last Name',
            flex: 1, // use flex 1,2,3,4... for the width of the column
        },
        { field: 'email', headerName: 'Email', flex: 1 },
        { field: 'schoolLabel', headerName: 'School', flex: 1 },
        { field: 'github', headerName: 'GitHub', flex: 1 },
        {
            field: 'actions',
            headerName: 'Actions',
            sortable: false,
            flex: 2,
            renderCell: (params) => (
                <>
                    <Button
                        variant="contained"
                        color="primary"
                        style={{ backgroundColor: '#1976D2', color: 'white', marginRight: 8 }}
                        onClick={() => handleOpenModal(params.row)}
                    >
                        View
                    </Button>
                    <Button
                        variant="contained"
                        style={{ backgroundColor: '#4CAF50', color: 'white', marginRight: 8 }}
                    >
                        Accept
                    </Button>
                    <Button
                        variant="contained"
                        style={{ backgroundColor: '#F44336', color: 'white' }}
                    >
                        Reject
                    </Button>
                </>
            ),
        },
    ];

    // Convert applicants to rows for the DataGrid
    const rows = applicants.map((applicant) => ({
        id: applicant.id,
        firstName: applicant.firstName,
        lastName: applicant.lastName,
        email: applicant.email,
        schoolLabel: applicant.schoolLabel,
        github: applicant.github,
    }));

    // Try adding a double/single click event listener to the DataGrid (part of API) that takes you to the specific page of the applicant (use the id field and call /api/applicant/[id] to get the specific applicant data)
    // by possibly rerouting to /applicants/[id] or /applicants/[id]/view
    const pageStyles = {
        // backgroundColor: '#1E1E1E', // Dark background for the entire page
        // color: 'white', // White text color
        // height: '100vh', // Full viewport height
        padding: '2rem', // Padding around the content
    };

    const cardStyles = {
        backgroundColor: '#252526', // Slightly lighter shade for cards
        borderRadius: '8px', // Rounded corners for the cards
        margin: '1rem', // Margin around cards
        padding: '1rem', // Padding inside cards
        boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)', // Subtle shadow for depth
        color: 'white', // White text color
    };

    return (
        <main style={pageStyles}>
            <h2 className="text-4xl font-bold text-center mb-8">
                BostonHacks Admin Portal
            </h2>
            {selectedApplicant == null ? (
                <table className="min-w-full bg-gray-300 text-white border border-gray-700 divide-y divide-gray-700">
                    <thead>
                        {/* TODO: talk to derek/declan about what info should be displayed here for api endpoint */}
                        <tr className="bg-gray-900 text-white border-b border-gray-700 divide-x divide-gray-700">
                            <th className="px-4 py-2 text-2xl">First Name</th>
                            <th className="px-4 py-2 text-2xl">Last Name</th>
                            <th className="px-4 py-2 text-2xl">Email</th>
                            <th className="px-4 py-2 text-2xl">School</th>
                            <th className="px-4 py-2 text-2xl">Status</th>
                            <th className="px-4 py-2 text-2xl">Application</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                        {rows.map((row) => (
                            <tr key={row.id} className="divide-x divide-gray-700 text-gray-900">
                                <td className="px-4 py-2">{row.firstName}</td>
                                <td className="px-4 py-2">{row.lastName}</td>
                                <td className="px-4 py-2">{row.email}</td>
                                <td className="px-4 py-2">{row.schoolLabel}</td>
                                <td className="px-4 py-2">{row.status}</td>
                                {/* alternatively, could get rid of this row and maybe just add a button?? */}
                                <td className="px-4 py-2 text-center">
                                    <Button variant="contained" className="bg-blue-500 hover:bg-blue-600" onClick={() => setSelectedApplicant(row.id)}>
                                        View
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <div class="flex h-full">
                    <div class="w-1/5 border-r border-gray-300 overflow-y-auto">
                        <table class="min-w-full table-auto">
                            <thead class="sticky top-0 bg-gray-200">
                                <tr>
                                    <th class="px-4 py-2 text-left text-sm font-medium text-gray-700">Name</th>
                                </tr>
                            </thead>
                            <tbody class="bg-white">
                                {rows.map((row) => (
                                    <tr key={row.id} class="hover:bg-gray-100 cursor-pointer" onClick={() => setSelectedApplicant(row.id)}>
                                        <td class="px-4 py-2">{row.firstName} {row.lastName}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div class="flex-1 p-6 overflow-y-auto">
                        <h2 class="text-2xl font-semibold mb-4">Application Details</h2>
                        <ApplicationDetails userId={selectedApplicant} />
                    </div>
                </div>
            )}
        </main>
    );
}
