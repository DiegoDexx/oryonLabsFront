import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { FaStore, FaBuilding, FaIdBadge } from "react-icons/fa";
import SuccessModal from "./successModal";
import ProjectRequirementsFields from "./ProjectRequirementsFields";


const steps = ["Datos", "Categoría", "Requisitos"];
const CATEGORIES = [
  {
    key: "tienda_online",
    title: "Tienda Online",
    desc: "Catálogo, pagos, envíos y usuarios.",
    Icon: <FaStore />,
  },
  {
    key: "web_corporativa",
    title: "Web Corporativa",
    desc: "Sitio institucional, SEO y contacto.",
    Icon: <FaBuilding />,
  },
  {
    key: "portafolio",
    title: "Portafolio",
    desc: "Muestra de proyectos y habilidades.",
    Icon: <FaIdBadge />,
  },  {
    key: "otros",
    title: "Otros",
    desc: "Proyectos que no encajan en las categorías anteriores.",
    Icon: <FaIdBadge />,
  }
];

const ProjectRequestForm = () => {
  const [currentStep, setCurrentStep] = useState(0);

  // STEP 0
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientPhone, setClientPhone] = useState("");

  // STEP 1
  const [selectedCategory, setSelectedCategory] = useState("");

  // STEP 2
  const [fieldsByCategory, setFieldsByCategory] = useState({});
  const [formValues, setFormValues] = useState({});
  const [projectName, setProjectName] = useState("");
  const [loadingFields, setLoadingFields] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitOk, setSubmitOk] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Cargar campos dinámicos cuando cambia la categoría
  useEffect(() => {
  if (!selectedCategory) return;
  if (fieldsByCategory[selectedCategory]) return;

  setLoadingFields(true);
  console.log("Cargando fields para", selectedCategory);
  console.log("URL llamada:", `https://oryonlabsdb-production.up.railway.app/api/project-fields/category/${selectedCategory}`);

  axios.get(`https://oryonlabsdb-production.up.railway.app/api/project-fields/category/${selectedCategory}`)
    .then(res => {
      const arr = res.data.data || [];
      console.log("Campos cargados para", selectedCategory, ":", arr);
      setFieldsByCategory(prev => ({ ...prev, [selectedCategory]: arr }));

      const init = {};
      arr.forEach(f => {
        init[f.field_name] = f.type === "boolean" ? false : "";
      });
      setFormValues(prev => ({ ...init, ...prev }));
    })
    .catch(err => console.error("Error cargando fields:", err))
    .finally(() => setLoadingFields(false));
}, [selectedCategory]);


  const categoryFields = useMemo(
    () => fieldsByCategory[selectedCategory] || [],
    [fieldsByCategory, selectedCategory]
  );

  // Validaciones por paso
  const validateStep0 = () => {
    const e = {};
    if (!clientName.trim()) e.clientName = "El nombre es obligatorio.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const validateStep1 = () => {
    const e = {};
    if (!selectedCategory) e.category = "Selecciona una categoría.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const validateStep2 = () => {
    const e = {};
    categoryFields.forEach((f) => {
      if (f.required) {
        const v = formValues[f.field_name];
        const empty =
          (f.type === "boolean" && typeof v !== "boolean") ||
          (f.type !== "boolean" && (v === null || v === undefined || v === ""));
        if (empty) e[f.field_name] = "Campo obligatorio.";
      }
    });
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const nextStep = () => {
    if (currentStep === 0 && !validateStep0()) return;
    if (currentStep === 1 && !validateStep1()) return;
    if (currentStep < steps.length - 1) setCurrentStep((s) => s + 1);
  };

  const prevStep = () => {
    if (currentStep > 0) setCurrentStep((s) => s - 1);
  };

  const onChangeValue = (field, value) => {
    setFormValues((prev) => ({ ...prev, [field]: value }));
  };


const handleSubmit = async (e) => {
  e.preventDefault();
  if (!validateStep2()) return;

  try {
    setSubmitting(true);
    setSubmitOk(false);

    // 1️⃣ Crear el cliente primero
    const clientResponse = await axios.post("https://oryonlabsdb-production.up.railway.app/api/clients", {
      name: clientName,
      email: clientEmail,
      phone: clientPhone,
    });
    const clientId = clientResponse.data.id;

    // 2️⃣ Preparar payload del proyecto usando el clientId recién creado
    const requirements = categoryFields.map((f) => ({
      field_id: f.id,
      field_name: f.field_name,

      value: formValues[f.field_name],
    }));

    const payload = {
      name: projectName,   // 👈 corregido
      client_id: clientId,
      category: selectedCategory,
      requirements,
    };


    // 3️⃣ Crear el proyecto
    await axios.post("https://oryonlabsdb-production.up.railway.app/api/projects", payload);
    setSubmitOk(true);

    // Reset suave
    setCurrentStep(0);
    setClientName("");
    setClientEmail("");
    setClientPhone("");
    setProjectName("");
    setSelectedCategory("");
    setFieldsByCategory({});
    setFormValues({});
    setErrors({});
    setShowSuccessModal(true);

  } catch (err) {
    console.error("Error al enviar el proyecto:", err);
    setSubmitOk(false);
  } finally {
    setSubmitting(false);
  }
}
 
  return (
    <div className="multistep-wrapper col-lg-11" id="multistep-form">
      <form id="msform" onSubmit={handleSubmit} className="col-lg-11">
        {/* Progressbar */}
        <ul id="progressbar">
          {steps.map((label, idx) => (
            <li key={label} className={idx <= currentStep ? "active" : ""}>
              {label}
            </li>
          ))}
        </ul>

        {/* STEP 0 */}
        {currentStep === 0 && (
          <fieldset>
            <h2 className="fs-title">Datos del cliente</h2>
            <h3 className="fs-subtitle">Empecemos con tu información básica</h3>

            <input
              type="text"
              placeholder="Nombre del cliente"
              required
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
            />

            {errors.clientName && <div className="error-msg">{errors.clientName}</div>}
             
             <input
              type="email"
              placeholder="Correo electrónico"
              required
              value={clientEmail}
              onChange={(e) => setClientEmail(e.target.value)}
            />
           
            {errors.clientEmail && <div className="error-msg">{errors.clientEmail}</div>}

            <input
              type="text"
              placeholder="Número de teléfono"
              required
              pattern="^[0-9]{7,15}$"
              value={clientPhone}
              onChange={(e) => setClientPhone(e.target.value)}
            />
            {errors.clientPhone && <div className="error-msg">{errors.clientPhone}</div>}

            <input type="button" value="Siguiente" className="action-button" onClick={() => {
              const emailValid = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(clientEmail);
              const phoneValid = /^[0-9]{7,15}$/.test(clientPhone);
              if (!emailValid || !phoneValid) {
                setErrors({
                  ...errors,
                  clientEmail: !emailValid ? "Correo inválido." : undefined,
                  clientPhone: !phoneValid ? "Teléfono inválido (solo números, 7-15 dígitos)." : undefined,
                });
                return;
              }
              nextStep();
            }} />


          </fieldset>
        )}

        {/* STEP 1 */}
        {currentStep === 1 && (
          <fieldset>
            <h2 className="fs-title">Selecciona la categoría</h2>
            <h3 className="fs-subtitle">Elige el tipo de proyecto que necesitas</h3>
            {/* el usuario deberá indicar y pasar el nombre del proyecto */}
            <input
              type="text"
              placeholder="Nombre del proyecto"
              required
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
            />
            <div className="category-cards">
              {CATEGORIES.map(({ key, title, desc, Icon }) => (
                <button
                  key={key}
                  type="button"
                  className={`category-card${selectedCategory === key ? " selected-category" : ""}`}
                  onClick={() => setSelectedCategory(key)}
                >
                  <div className="card-icon">{Icon}</div>
                  <h4>{title}</h4>
                  <p>{desc}</p>
                </button>
              ))}
            </div>

            {errors.category && <div className="error-msg centered">{errors.category}</div>}

            <div className="step-actions">
              <input type="button" value="Anterior" className="action-button-previous" onClick={prevStep} />
              <input type="button" value="Siguiente" className="action-button" onClick={nextStep} disabled={!selectedCategory || !projectName} />
            </div>
          </fieldset>
        )}

        {/* STEP 2 */}
               {currentStep === 2 && (
          <>
            <ProjectRequirementsFields
              selectedCategory={selectedCategory}
              loadingFields={loadingFields}
              categoryFields={categoryFields}
              formValues={formValues}
              onChangeValue={onChangeValue}
              errors={errors}
              prevStep={prevStep}
              submitting={submitting}
              submitOk={submitOk}
            />
          </>
        )}
      </form>
           {showSuccessModal && (
              <SuccessModal
                show={showSuccessModal}
                onClose={() => setShowSuccessModal(false)}
                message="¡Solicitud enviada correctamente! , pronto contactaremos contigo."
              />
            )}
    </div>
  );
};


export default ProjectRequestForm;
