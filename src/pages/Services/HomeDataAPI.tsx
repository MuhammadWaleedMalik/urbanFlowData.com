import React, { useState } from 'react';
import './HomeDataAPI.css';

const HomeDataAPI = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const datasets = [
    {
      id: 1,
      title: "Travellers Information (RT)",
      description: "The operation returns messages related to the stops of all lines.",
      territory: ["root time", "Arrondissement de Bruxelles-Capt..."],
      modified: "2021",
      publisher: "STIB-MIVB",
      keywords: "GITS"
    },
    {
      id: 2,
      title: "Vehicle position (RT)",
      description: "The operation returns real-time vehicle position for all line IDs. The data are refreshed every 20 seconds.",
      territory: ["root time", "Arrondissement de Bruxelles-Capt..."],
      modified: "2021",
      publisher: "STIB-MIVB",
      keywords: "GITS"
    },
    {
      id: 3,
      title: "Stop Details",
      description: "The description for the actual stops on the network. This dataset contains the following tasks:",
      table: ["root", "API"],
      modified: "2021",
      publisher: "STIB-MIVB",
      keywords: "GITS"
    },
    {
      id: 4,
      title: "Waiting time (RT)",
      description: "The operation returns the waiting times for the next two vehicles of each line passing through all stop IDs.",
      territory: ["root time", "Arrondissement de Bruxelles-Capt..."],
      modified: "2021",
      publisher: "STIB-MIVB",
      keywords: "GITS"
    },
    {
      id: 5,
      title: "Stops by Line",
      description: "The operation returns a list of the consecutive stops for a specific line that the vehicle passes by during its journey. This information is provided in both directions (return journey) and at a specific time. This dataset includes the following information:",
      territory: ["root", "Arrondissement de Bruxelles-Capt..."],
      modified: "2021",
      publisher: "STIB-MIVB",
      keywords: "GITS"
    },
    {
      id: 6,
      title: "Shopefiles",
      description: "Shopefiles information containing the back information about the spatial structure of the STIB.",
      modified: "2021",
      publisher: "STIB-MIVB",
      keywords: "GITS"
    }
  ];

  const filteredDatasets = datasets.filter(dataset => 
    dataset.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dataset.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="home-data-api">
      <header className="header">
        <h1>Home Data API</h1>
        <div className="subheader">
          <span className="dataset-count">9 datasets</span>
          <span className="sort-text">Sort datasets</span>
          <span className="sort-order">Recently modified first</span>
        </div>
      </header>

      <div className="controls">
        <div className="sort-options">
          <button className="sort-btn active">Modified</button>
          <button className="sort-btn">Popular</button>
          <button className="sort-btn">A-Z</button>
        </div>

        <div className="filters">
          <div className="search-box">
            <input 
              type="text" 
              placeholder="Find a dataset..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="view-options">
            <span className="view-label">View</span>
            <button className="view-btn">Analyze</button>
            <button className="view-btn">Map</button>
            <button className="view-btn">Custom view</button>
          </div>

          <div className="filter-section">
            <h3>Modified</h3>
            <div className="filter-item">
              <span>2021</span>
            </div>
          </div>

          <div className="filter-section">
            <h3>Publisher</h3>
            <div className="filter-item">
              <span>STIB-MIVB</span>
            </div>
          </div>

          <div className="filter-section">
            <h3>Keywords</h3>
            <div className="filter-item">
              <span>GITS</span>
            </div>
          </div>
        </div>
      </div>

      <div className="datasets-list">
        {filteredDatasets.map(dataset => (
          <div key={dataset.id} className="dataset-card">
            <h2>{dataset.title}</h2>
            <p>{dataset.description}</p>
            
            {dataset.territory && (
              <div className="territory">
                <strong>Territory</strong>
                {dataset.territory.map((item, index) => (
                  <a key={index} href="#">{item}</a>
                ))}
              </div>
            )}
            
            {dataset.table && (
              <div className="table">
                <strong>Table</strong>
                {dataset.table.map((item, index) => (
                  <a key={index} href="#">{item}</a>
                ))}
              </div>
            )}
            
            <div className="metadata">
              <span>Modified: {dataset.modified}</span>
              <span>Publisher: {dataset.publisher}</span>
              <span>Keywords: {dataset.keywords}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeDataAPI;