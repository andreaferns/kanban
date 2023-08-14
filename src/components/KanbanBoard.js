import React, { useState, useEffect } from 'react';
import Card from './Card'; // Correct the import path for Card component
import Navbar from './NavBar'; // Correct the import path for NavBar component

const KanbanBoard = () => {
  const [tickets, setTickets] = useState([]);
  const [groupingOption, setGroupingOption] = useState('Status');
  const [sortingOption, setSortingOption] = useState('Priority');
  const [groupedAndSortedTickets, setGroupedAndSortedTickets] = useState({});
  const priorityLevels = [4, 3, 2, 1, 0];
  const statusLevels = ['Todo', 'In Progress', 'Backlog'];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://apimocha.com/quicksell/data');
        const data = await response.json();
        setTickets(data.tickets);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    let updatedGroupedAndSortedTickets = {};
  
    if (groupingOption === 'Status') {
      // Group users by status
      updatedGroupedAndSortedTickets = tickets.reduce((groups, ticket) => {
        const status = ticket.status;
        const user = ticket.assignedUser;
  
        if (!groups[status]) groups[status] = {};
        if (!groups[status][user]) groups[status][user] = [];
  
        groups[status][user].push(ticket);
        return groups;
      }, {});
    } else if (groupingOption === 'Priority') {
      // Group users by priority
      updatedGroupedAndSortedTickets = tickets.reduce((groups, ticket) => {
        const user = ticket.assignedUser;
        const priority = ticket.priority;
  
        if (!groups[user]) groups[user] = {};
        if (!groups[user][priority]) groups[user][priority] = [];
  
        groups[user][priority].push(ticket);
        return groups;
      }, {});
    }
  
    // Apply sorting to each group
    for (const userKey in updatedGroupedAndSortedTickets) {
      for (const groupKey in updatedGroupedAndSortedTickets[userKey]) {
        if (sortingOption === 'Priority') {
          updatedGroupedAndSortedTickets[userKey][groupKey].sort(
            (a, b) => b.priority - a.priority
          );
        } else if (sortingOption === 'Title') {
          updatedGroupedAndSortedTickets[userKey][groupKey].sort(
            (a, b) => a.title.localeCompare(b.title)
          );
        }
      }
    }
  
    // Set the groupedAndSortedTickets state
    setGroupedAndSortedTickets(updatedGroupedAndSortedTickets);
  }, [groupingOption, sortingOption, tickets]);
  

  return (
    <div>
    <Navbar
      onGroupingChange={(e) => setGroupingOption(e.target.value)}
      onSortingChange={(e) => setSortingOption(e.target.value)}
    />

<div className="kanban-board">
      <div className="priority-grid">
        {Object.keys(groupedAndSortedTickets).map((userKey, userIndex) => (
          <div key={userIndex} className="user-row">
            {priorityLevels.map((priorityLevel) => (
              <div key={priorityLevel} className="grid-cell">
                <h4 className="priority-title">Priority {priorityLevel}</h4>
                {groupedAndSortedTickets[userKey][priorityLevel]?.map(ticket => (
                  <Card
                    key={ticket.id}
                    id={ticket.id}
                    title={ticket.title}
                    tag={ticket.tag}
                  />
                ))}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  </div>
  
  );
};

export default KanbanBoard;
