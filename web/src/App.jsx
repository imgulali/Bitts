import React, { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { Container } from "react-bootstrap";

const Dashboard = lazy(() => import("./pages/Dashboard"));
const Login = lazy(() => import("./pages/Login"));
const SignUp = lazy(() => import("./pages/SignUp"));
const UpdateProfile = lazy(()=> import("./pages/UpdateProfile"));
const NotFound = lazy(() => import("./pages/404"));

const LoadingFallback = () => <div>Loading...</div>;

function App() {
  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh", minWidth: "100%" }}
    >
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/update-profile" element={<UpdateProfile />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </div>
    </Container>
  );
}

export default App;