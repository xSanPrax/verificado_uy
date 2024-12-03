"use client";

import { useContext, useState, useRef, useEffect   } from "react";
import AppContext from "@/context/app/AppContext";

const NodoManager = ({ setShowNodoManager }) => {
  const {
    crearNodoPeriferico,
    obtenerNodoPerifericoPorId,
    validarConectividadNodo,
    mensaje,
    cargando,
  } = useContext(AppContext);

  const [nodoData, setNodoData] = useState({
    name: "",
    url: "",
    verificationType: "",
  });
  const [nodoId, setNodoId] = useState("");
  const [connectivityUrl, setConnectivityUrl] = useState("");

  const [nodoInfo, setNodoInfo] = useState(null);
  const [connectivityResult, setConnectivityResult] = useState(null);

  const modalRef = useRef(null);

  const handleCreateNodo = async () => {
    const { name, url, verificationType } = nodoData;
    await crearNodoPeriferico(name, url, verificationType);
  };

  const handleGetNodoById = async () => {
    const nodo = await obtenerNodoPerifericoPorId(nodoId);
    setNodoInfo(nodo);
  };

  const handleValidateConnectivity = async () => {
    const result = await validarConectividadNodo(connectivityUrl);
    setConnectivityResult(result);
  };

  // close modal when click escape
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setShowNodoManager(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [setShowNodoManager]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-100 bg-opacity-90">

      <div className="relative w-full max-w-3xl bg-white text-gray-800 p-8 rounded-lg shadow-lg">
        <button
            onClick={() => setShowNodoManager(false)}
            className="absolute top-8 right-8 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded transition"
        >
          Cerrar
        </button>
        <h1 className="text-2xl font-bold mb-6 text-center">
          Gestión de Nodos Periféricos
        </h1>

        {mensaje && <div className="text-red-500 mb-4">{mensaje}</div>}

        {/* Crear Nodo Periférico */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Crear Nodo Periférico</h2>
          <input
              type="text"
              placeholder="Nombre del Nodo"
              className="w-full p-3 mb-3 bg-gray-50 border border-gray-300 rounded"
              value={nodoData.name}
              onChange={(e) => setNodoData({...nodoData, name: e.target.value})}
          />
          <input
              type="text"
              placeholder="URL del Nodo"
              className="w-full p-3 mb-3 bg-gray-50 border border-gray-300 rounded"
              value={nodoData.url}
              onChange={(e) => setNodoData({...nodoData, url: e.target.value})}
          />
          <input
              type="text"
              placeholder="Tipo de Verificación"
              className="w-full p-3 mb-3 bg-gray-50 border border-gray-300 rounded"
              value={nodoData.verificationType}
              onChange={(e) =>
                  setNodoData({...nodoData, verificationType: e.target.value})
              }
          />
          <button
              onClick={handleCreateNodo}
              className="w-full bg-blue-500 hover:bg-blue-400 text-white font-semibold py-2 rounded transition"
              disabled={cargando}
          >
            {cargando ? "Creando Nodo..." : "Crear Nodo"}
          </button>
        </div>

        {/* Obtener Nodo Periférico por ID */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">
            Obtener Nodo Periférico por ID
          </h2>
          <input
              type="text"
              placeholder="ID del Nodo"
              className="w-full p-3 mb-3 bg-gray-50 border border-gray-300 rounded"
              value={nodoId}
              onChange={(e) => setNodoId(e.target.value)}
          />
          <button
              onClick={handleGetNodoById}
              className="w-full bg-green-500 hover:bg-green-400 text-white font-semibold py-2 rounded transition"
              disabled={cargando}
          >
            {cargando ? "Buscando Nodo..." : "Obtener Nodo"}
          </button>
          {nodoInfo && (
              <div className="mt-4 bg-gray-50 p-4 rounded border border-gray-300">
                <h3 className="font-semibold mb-2">Información del Nodo:</h3>
                <pre className="text-sm">{JSON.stringify(nodoInfo, null, 2)}</pre>
              </div>
          )}
        </div>

        {/* Validar Conectividad de Nodo */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">
            Validar Conectividad del Nodo
          </h2>
          <input
              type="text"
              placeholder="URL del Nodo"
              className="w-full p-3 mb-3 bg-gray-50 border border-gray-300 rounded"
              value={connectivityUrl}
              onChange={(e) => setConnectivityUrl(e.target.value)}
          />
          <button
              onClick={handleValidateConnectivity}
              className="w-full bg-yellow-500 hover:bg-yellow-400 text-white font-semibold py-2 rounded transition"
              disabled={cargando}
          >
            {cargando ? "Validando..." : "Validar Conectividad"}
          </button>
          {connectivityResult !== null && (
              <div className="mt-4">
                <h3 className="font-semibold">
                  Resultado de la Conectividad:{" "}
                  <span className="font-bold">
                  {connectivityResult ? "Exitosa" : "Fallida"}
                </span>
                </h3>
              </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NodoManager;
