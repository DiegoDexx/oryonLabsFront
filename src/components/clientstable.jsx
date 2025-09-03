import React from 'react';

const clientsTable = ({ clients }) => {
  if (!clients || clients.length === 0) {
    return <p>No hay clientes disponibles.</p>;
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Email</th>
          <th>Teléfono</th>
          <th>Proyectos</th>
        </tr>
      </thead>
      <tbody>
        {clients.map((client) => (
          <tr key={client.id}>
            <td>{client.name}</td>
            <td>{client.email}</td>
            <td>{client.phone || 'N/A'}</td>
            <td>
              {client.projects && client.projects.length > 0 ? (
                <ul>
                  {client.projects.map((project) => (
                    <li key={project.id}>{project.name}</li>
                  ))}
                </ul>
              ) : (
                'Sin proyectos'
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default clientsTable;
