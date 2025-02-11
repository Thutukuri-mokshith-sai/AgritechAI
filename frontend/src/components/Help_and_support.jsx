import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from "react";
import './Help_and_support.css';
const mockTickets = [
  { id: 1, name: "John Doe", email: "john@example.com", message: "Issue with login" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", message: "Unable to reset password" },
];

const mockFeedback = [
  { id: 1, ticketId: 1, rating: "Excellent", comments: "Very helpful, resolved the issue quickly!" },
  { id: 2, ticketId: 2, rating: "Good", comments: "Issue resolved, but the process was slow." },
];

const mockChatMessages = [
  { user: "Staff", message: "How can I assist you today?" },
  { user: "User", message: "I'm having trouble logging in." },
  { user: "Staff", message: "I can help with that! Please try resetting your password." },
];

const AdminHelpAndSupport = () => {
  const [tickets, setTickets] = useState(mockTickets);
  const [feedback, setFeedback] = useState(mockFeedback);
  const [chatMessages, setChatMessages] = useState(mockChatMessages);
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    // Fetch data for contact form submissions when the component mounts
    const fetchSubmissions = async () => {
      try {
        const response = await fetch('http://localhost:9000/api/contact/admin/dashboard');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const result = await response.json();
        setSubmissions(result.data || []); // Safeguard against empty data
      } catch (error) {
        console.error('Error fetching submissions:', error);
        alert('Failed to fetch submissions. Please try again later.');
      }
    };
    fetchSubmissions();
  }, []);

  const handleResolveTicket = (ticketId) => {
    setTickets(tickets.filter((ticket) => ticket.id !== ticketId));
    alert("Ticket resolved!");
  };

  const handleChatIntervention = () => {
    alert("Admin can intervene in the chat.");
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Admin - Help and Support</h2>

      {/* Ticket Management Section */}
      <div className="ticket-management-section mb-4">
        <h3>Manage Tickets</h3>
        <ul className="list-group">
          {tickets.length === 0 ? (
            <li className="list-group-item">No active tickets</li>
          ) : (
            tickets.map((ticket) => (
              <li
                key={ticket.id}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <div>
                  <strong>{ticket.name}</strong> - {ticket.email}
                  <p>{ticket.message}</p>
                </div>
                <button
                  className="btn btn-success"
                  onClick={() => handleResolveTicket(ticket.id)}
                >
                  Resolve
                </button>
              </li>
            ))
          )}
        </ul>
      </div>

      {/* Feedback Management Section */}
      <div className="feedback-management-section mb-4">
        <h3>Feedback from Staff</h3>
        <ul className="list-group">
          {feedback.length === 0 ? (
            <li className="list-group-item">No feedback submitted</li>
          ) : (
            feedback.map((item) => (
              <li key={item.id} className="list-group-item">
                <strong>Ticket #{item.ticketId}:</strong> {item.rating}
                <p>{item.comments}</p>
              </li>
            ))
          )}
        </ul>
      </div>

      {/* Chat Management Section */}
      <div className="chat-management-section mb-4">
        <h3>Monitor Live Chat</h3>
        <div className="chat-box mt-3 p-3 border rounded">
          <h5>Live Chat with User</h5>
          <div className="chat-messages mb-3">
            {chatMessages.map((msg, index) => (
              <p key={index}>
                <strong>{msg.user}:</strong> {msg.message}
              </p>
            ))}
          </div>
          <button
            className="btn btn-info"
            onClick={handleChatIntervention}
          >
            Intervene in Chat
          </button>
        </div>
      </div>

      {/* Contact Form Submissions Section */}
      <div>
        <h3>Contact Form Submissions</h3>
        <div className="row">
          {submissions.length === 0 ? (
            <div className="col-12">
              <div className="card">
                <div className="card-body">
                  <p className="card-text">No submissions available</p>
                </div>
              </div>
            </div>
          ) : (
            submissions.map((submission) => (
              <div key={submission.id} className="col-12 mb-3">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">Submission ID: {submission.id}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">{submission.name}</h6>
                    <p className="card-text">
                      <strong>Email: </strong>{submission.email}
                    </p>
                    <p className="card-text">
                      <strong>Message: </strong>{submission.message}
                    </p>
                    <p className="card-text">
                      <strong>Submitted At: </strong>{new Date(submission.submitted_at).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminHelpAndSupport;
