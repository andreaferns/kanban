import React from 'react';

export default function Navbar({ onGroupingChange, onSortingChange }) {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <a className="navbar-brand" href="#"></a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Display
              </a>
              <ul className="dropdown-menu">
                <li className="d-flex justify-content-between">
                  <span className="dropdown-label">Grouping:</span>
                  <span>
                    <select className="form-select form-select-sm" aria-label="Medium select example" onChange={onGroupingChange}>
                      <option value="Status">Status</option>
                      <option value="Priority">Priority</option>
                    </select>
                  </span>
                </li>
                <li className="d-flex justify-content-between">
                  <span className="dropdown-label">Ordering:</span>
                  <span>
                    <select className="form-select form-select-sm" aria-label="Small select example" onChange={onSortingChange}>
                      <option value="Priority">Priority</option>
                      <option value="0">No priority</option>
                      <option value="1">Low</option>
                      <option value="2">Medium</option>
                      <option value="3">High</option>
                      <option value="4">Urgent</option>
                    </select>
                  </span>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}
