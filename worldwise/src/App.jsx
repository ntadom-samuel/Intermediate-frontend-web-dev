import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { CitiesProvider, useCities } from "./contexts/CitiesContext";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./pages/ProtectedRoute";

//Note: regularly imported components must come before dynamically imported components
import CityList from "./components/CityList";
import City from "./components/City";
import Form from "./components/Form";
import CountryList from "./components/CountryList";
import SpinnerFullPage from "./components/SpinnerFullPage";

// import Product from "./pages/Product";
// import Pricing from "./pages/Pricing";
// import Homepage from "./pages/Homepage";
// import PageNotFound from "./pages/PageNotFound";
// import Login from "./pages/Login";
// import AppLayout from "./pages/AppLayout";

//Optimization: Vid 253 -- lazy loading: this is the process of sending peices of our code to the server. In this case, we will send our code one page at a time
const Homepage = lazy(() => import("./pages/Homepage"));
const Product = lazy(() => import("./pages/Product"));
const Pricing = lazy(() => import("./pages/Pricing"));
const Login = lazy(() => import("./pages/Login"));
const AppLayout = lazy(() => import("./pages/AppLayout"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));

function App() {
  return (
    <AuthProvider>
      <CitiesProvider>
        <BrowserRouter>
          <Suspense fallback={<SpinnerFullPage />}>
            {/* The suspense API let's display SpinnerFullPage as our pages are loading. The suspense API works in comnjuction with lazy loading */}
            <Routes>
              {/* This acts like the index route, but for the Routes component */}
              <Route path="/" element={<Homepage />} />
              <Route path="product" element={<Product />} />
              <Route path="pricing" element={<Pricing />} />
              <Route path="login" element={<Login />} />
              <Route
                path="app"
                element={
                  <ProtectedRoute>
                    {" "}
                    <AppLayout />
                  </ProtectedRoute>
                }
              >
                {/* The index route is the default child route that is displayed when no child route is selected via URL: /app */}
                {/* <Route
            index
            element={<CityList cities={cities} isLoading={isLoading} />}
          /> */}
                {/* The Navigate component */}
                {/* Navigate works like a redirect */}
                <Route index element={<Navigate to="cities" />} />{" "}
                {/* Implementing nested routes: app/cities or app/countries */}
                <Route path="cities" element={<CityList />} />
                <Route path="cities/:id" element={<City />} />
                <Route path="countries" element={<CountryList />} />
                <Route path="form" element={<Form />} />
              </Route>
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </CitiesProvider>
    </AuthProvider>
  );
}

export default App;
