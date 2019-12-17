import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import LoginView from "./modules/user/LoginView";
import RegisterView from "./modules/user/RegisterView";
import MeView from "./modules/user/MeView";

const useRoutes = (props: IUseRoute): IUseRoute => {
    return {
        ...props
    };
};

export const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route { ...useRoutes({path: "/login", component: LoginView }) } exact={true} />
            <Route { ...useRoutes({path: "/register", component: RegisterView }) } exact={true} />
            <Route { ...useRoutes({path: "/me", component: MeView }) } exact={true} />
            <Redirect path={"*"} to={"/login"}/>
        </Switch>
    </BrowserRouter>
);