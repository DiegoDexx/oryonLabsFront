import React from "react";

const ProjectRequirementsFields = ({
  selectedCategory,
  loadingFields,
  categoryFields,
  formValues,
  onChangeValue,
  errors,
  prevStep,
  submitting

}) => {
  return (
    <fieldset>
      <h2 className="fs-title">Requisitos del proyecto</h2>
      <h3 className="fs-subtitle">
        Completa los campos para tu {selectedCategory.replaceAll("_", " ")}
      </h3>

      {loadingFields ? (
        <p>Cargando campos…</p>
      ) : categoryFields.length === 0 ? (
        <p>No hay campos configurados para esta categoría.</p>
      ) : (
        <>
          <div className="fields-grid">
            {categoryFields.map((f) => (
              <div className="form-group" key={f.field_name}>
                <label htmlFor={f.field_name} style={{display: 'flex', alignItems: 'center', gap: '6px'}}>
                  {f.label}
                  {f.required && <span className="req">*</span>}
                  {f.field_name === 'cms' && (
                    <span className="help-icon" tabIndex={0} style={{cursor: 'pointer', position: 'relative'}}>
                      <span style={{fontSize: '1.1em', color: '#008ECC'}} onClick={() => {
                        const tooltip = document.querySelector('.help-tooltip');
                        tooltip.style.display = tooltip.style.display === 'none' ? 'block' : 'none';
                      }}>?</span>
                      <span className="help-tooltip" style={{
                        position: 'absolute',
                        left: '110%',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        background: '#fff',
                        color: '#222',
                        border: '1px solid #ddd',
                        borderRadius: '6px',
                        padding: '8px 12px',
                        fontSize: '0.95em',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                        whiteSpace: 'pre-line',
                        zIndex: 10,
                        display: 'none'
                      }}>Un CMS (Sistema de Gestión de Contenidos) es una plataforma como WordPress, Shopify, Joomla, etc. 
                      Permite administrar y editar el contenido de tu web fácilmente, sin conocimientos técnicos avanzados.</span>
                    </span>
                  )}
                </label>

                {f.type === "text" && (
                  <input
                    id={f.field_name}
                    type="text"
                    required
                    value={formValues[f.field_name] ?? ""}
                    onChange={(e) => onChangeValue(f.field_name, e.target.value)}
                  />
                )}
                {f.type === "number" && (
                  <input
                    id={f.field_name}
                    type="number"
                    required
                    value={formValues[f.field_name] ?? ""}
                    onChange={(e) => onChangeValue(f.field_name, e.target.value)}
                  />
                )}
                {f.type === "boolean" && (
                  <div className="radio-wrap">
                    <label>
                      <input
                        type="radio"
                        name={f.field_name}
                        value="true"
                        required
                        checked={formValues[f.field_name] === true}
                        onChange={() => onChangeValue(f.field_name, true)}
                      />
                      Sí
                    </label>
                    <label>
                      <input
                        type="radio"
                        name={f.field_name}
                        value="false"
                        required
                        checked={formValues[f.field_name] === false}
                        onChange={() => onChangeValue(f.field_name, false)}
                      />
                      No
                    </label>
                  </div>
                )}
                {f.type === "textarea" && (
                  <textarea
                    id={f.field_name}
                    rows={4}
                    required
                    value={formValues[f.field_name] ?? ""}
                    onChange={(e) => onChangeValue(f.field_name, e.target.value)}
                  />
                )}
                {f.type === "select" && (
                  <select
                    id={f.field_name}
                    required
                    value={formValues[f.field_name] ?? ""}
                    onChange={(e) => onChangeValue(f.field_name, e.target.value)}
                  >
                    <option value="">Seleccione…</option>
                    {Array.isArray(f.options) &&
                      f.options.map((opt, idx) => (
                        <option key={idx} value={opt}>
                          {opt}
                        </option>
                      ))}
                  </select>
                )}
                <small className="advice">Todos los campos son obligatorios</small>
                {errors[f.field_name] && <div className="error-msg">{errors[f.field_name]}</div>}

              </div>
            ))}
          </div>
          <div className="step-actions">
            <input type="button" value="Anterior" className="action-button-previous" onClick={prevStep} />
            <input type="submit" value={submitting ? "Enviando…" : "Enviar"} className="action-button" disabled={submitting} />
          </div>
        </>
      )}


    </fieldset>
  );
};

export default ProjectRequirementsFields;
