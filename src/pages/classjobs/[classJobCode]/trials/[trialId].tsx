import ProtectedRoute from "@/components/ProtectedRoute";

export default function TrialID() {
  return (
    <ProtectedRoute>
      <div>
        <p>Trial ID</p>
      </div>
    </ProtectedRoute>
  );
}
