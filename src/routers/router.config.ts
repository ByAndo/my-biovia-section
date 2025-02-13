import Home from "../pages/Home";
import Dashboard from "../pages/Dashboard";
import ExperimentPage from "../pages/ExperimentPage";
import LoginPage from "../pages/LoginPage";
import { ComponentType } from "react";

export interface RouteConfig {
    code : string;
    path: string;
    name: string;    
    component: ComponentType;
}

export const routes: RouteConfig[] = [
  { code: "home", path: "/", name: "홈", component: Home },
  { code: "dashboard", path: "/dashboard", name: "대쉬보드", component: Dashboard },
  { code: "experiment", path: "/experiment", name: "실험 페이지", component: ExperimentPage },
  { code: "login", path: "/login", name: "로그인", component: LoginPage },
];
