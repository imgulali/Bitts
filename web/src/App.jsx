import React, { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { Container } from "react-bootstrap";
import ProtectedRoutes from "./components/ProtectedRoutes";

const Dashboard = lazy(() => import("./pages/Dashboard"));
const Login = lazy(() => import("./pages/Login"));
const SignUp = lazy(() => import("./pages/SignUp"));
const UpdateProfile = lazy(()=> import("./pages/UpdateProfile"));
const NotFound = lazy(() => import("./pages/404"));

const LoadingFallback = () => <h2 className="text-center mb-4">Loading...</h2>;

function App() {
  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh", minWidth: "100%" }}
    >
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="*" element={<NotFound />} />
            <Route element={<ProtectedRoutes />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/update-profile" element={<UpdateProfile />} />
            </Route>
          </Routes>
        </Suspense>
      </div>
    </Container>
  );
}

export default App;
