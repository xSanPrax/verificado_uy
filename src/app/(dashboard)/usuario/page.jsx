import ProtectedRoute from "@/components/ProtectedRoute";

const Dashboard = () => {
  return (
    <ProtectedRoute>
      <div>
        <h1>Dashboard</h1>
        {/* Contenido protegido */}
      </div>
    </ProtectedRoute>
  );
};

export default Dashboard;
