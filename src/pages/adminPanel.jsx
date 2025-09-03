import React, { useState, useEffect } from 'react';
import { useGet } from '../hooks/useFetch';
import { useSelector } from 'react-redux';
import ProjectsTable from '../components/projecttable';
import ClientsTable from '../components/ClientsTable';
import { useNavigate } from 'react-router-dom';

const AdminPanel = () => {
  const [projects, setProjects] = useState([]);
  const [clients, setClients] = useState([]);
  const [selectedOption, setSelectedOption] = useState('projects'); // pestañas
  const token = useSelector((state) => state.auth.token);
  const navigate = useNavigate();
  const projectsUrl = 'https://oryonlabsdb-production.up.railway.app/api/admin/projects/full';
  const clientsUrl = 'https://oryonlabsdb-production.up.railway.app/api/clients';

  // SI NO ESTA AUTENTICADO REDIRIGIR A LOGIN
 useEffect(() => {
  if (!token) {
    console.log('No token found, redirecting to login',  token);
    navigate('/login');
  }else{
    console.log('Token found, fetching data', token);
    navigate('/adminpanel');
  }
}, [token, navigate]);

  // Obtener proyectos completos
  const { data: rawProjects = [], loading: projectsLoading, error: projectsError } = useGet(projectsUrl, token);

  // Obtener clientes
  const { data: rawClients = [], loading: clientsLoading, error: clientsError } = useGet(clientsUrl, token);

  useEffect(() => {
    if (Array.isArray(rawProjects)) {
      setProjects(rawProjects);
    }
  }, [rawProjects]);

  useEffect(() => {
    if (Array.isArray(rawClients)) {
      setClients(rawClients);
    }
  }, [rawClients]);

  return (
    <div className="admin-panel container col-lg-11">
      <h1>Panel de Administración</h1>

      {/* Menú de selección */}
      <div className="selection-buttons mb-4">
        <button
          className={`btn ${selectedOption === 'projects' ? 'btn-primary' : 'btn-outline-primary'} me-2`}
          onClick={() => setSelectedOption('projects')}
        >
          Gestión de Proyectos
        </button>
        <button
          className={`btn ${selectedOption === 'clients' ? 'btn-primary' : 'btn-outline-primary'}`}
          onClick={() => setSelectedOption('clients')}
        >
          Gestión de Clientes
        </button>
      </div>

      {/* Vista de proyectos */}
      {selectedOption === 'projects' && (
        <>
          {projectsLoading && <p>Cargando proyectos...</p>}
          {projectsError && <p className="error-message">{projectsError.message}</p>}

          <ProjectsTable projects={projects} />
        </>
      )}

      {/* Vista de clientes */}
      {selectedOption === 'clients' && (
        <>
          {clientsLoading && <p>Cargando clientes...</p>}
          {clientsError && <p className="error-message">{clientsError.message}</p>}

          <clientsTable clients={clients} />
        </>
      )}
    </div>
  );
};

export default AdminPanel;
