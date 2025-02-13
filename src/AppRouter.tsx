import { Routes, Route } from "react-router-dom";
import { routes } from "./routers/router.config";

const AppRouter = () => {
  return (        
      <Routes>
        {routes.map(({ path, component: Component }) => (
          <Route key={path} path={path} element={<Component />} /> 
        ))}
      </Routes>        
  );
};

export default AppRouter;
