"use client";

import { useContext } from "react";
import AuthContext from '@/context/auth/auth_context'; 
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const Register = () => {
  const { internalRegister, externalLogin, cargando, mensaje } = useContext(AuthContext);

  const initialValues = {
    nombre: "",
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    nombre: Yup.string()
      .min(3, "El nombre debe tener al menos 3 caracteres")
      .required("El nombre es obligatorio"),
    email: Yup.string()
      .email("Email inválido")
      .required("El email es obligatorio"),
    password: Yup.string()
      .min(6, "La contraseña debe tener al menos 6 caracteres")
      .required("La contraseña es obligatoria"),
  });

  const onSubmit = async (values, { resetForm }) => {
    await internalRegister(values.nombre, values.email, values.password);
    resetForm();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200 text-center mb-6">Registrarse</h2>
        {mensaje && (
          <div className="mb-4 text-sm text-red-600 dark:text-red-400 text-center">
            {mensaje}
          </div>
        )}
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ isValid, dirty }) => (
            <Form className="space-y-6">
              <div>
                <label htmlFor="nombre" className="block text-sm font-medium text-gray-600 dark:text-gray-300">Nombre</label>
                <Field
                  type="text"
                  name="nombre"
                  id="nombre"
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-gray-100"
                  placeholder="Tu Nombre Completo"
                />
                <ErrorMessage name="nombre" component="div" className="text-red-500 text-sm mt-1" />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-600 dark:text-gray-300">Email</label>
                <Field
                  type="email"
                  name="email"
                  id="email"
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-gray-100"
                  placeholder="ejemplo@correo.com"
                />
                <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-600 dark:text-gray-300">Contraseña</label>
                <Field
                  type="password"
                  name="password"
                  id="password"
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-gray-100"
                  placeholder="••••••••"
                />
                <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
              </div>
              <button
                type="submit"
                disabled={cargando || !(isValid && dirty)}
                className={`w-full py-2 px-4 bg-green-600 text-white font-semibold rounded-md shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition duration-200 ${
                  cargando ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {cargando ? "Registrando..." : "Registrar"}
              </button>
            </Form>
          )}
        </Formik>
        <div className="mt-6">
          <button
            onClick={externalLogin}
            disabled={cargando}
            className={`w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-200 ${
              cargando ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {cargando ? "Redirigiendo..." : "Registro con usuario gubuy"}
          </button>
        </div>
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            ¿Ya tienes una cuenta?{" "}
            <a href="/login" className="text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-500 font-medium">
              Inicia Sesión
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
