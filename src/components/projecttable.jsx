import React from 'react';

const ProjectsTable = ({ projects }) => {
  if (!projects || projects.length === 0) {
    return <p>No hay proyectos disponibles.</p>;
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Nombre del Proyecto</th>
          <th>Categoría</th>
          <th>Cliente</th>
          <th>Requisitos</th>
        </tr>
      </thead>
      <tbody>
        {projects.map((project) => (
          <tr key={project.id}>
            <td>{project.name}</td>
            <td>{project.category}</td>
            <td>{project.client ? project.client.name : 'Sin cliente'}</td>
            <td>
              {project.requirements && project.requirements.length > 0 ? (
                <ul>
                  {project.requirements.map((req) => (
                    <li key={req.id}>
                      <strong>{req.field?.label || req.field_id}:</strong> {req.field_value}
                    </li>
                  ))}
                </ul>
              ) : (
                'Sin requisitos'
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProjectsTable;
