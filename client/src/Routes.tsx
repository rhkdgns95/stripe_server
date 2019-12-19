import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import LoginView from "./modules/user/LoginView";
import RegisterView from "./modules/user/RegisterView";
import MeView from "./modules/user/MeView";
import SubscribeUser from "./modules/account/SubscribeUser";
import Account from "./modules/account/Account";
import PaidUsers from "./modules/account/PaidUsers";
import Header from "./modules/shared/Header";

const useRoutes = (props: IUseRoute): IUseRoute => {
    return {
        ...props
    };
};

export const Routes = () => (
    <BrowserRouter>
        <>
            <Switch>
                <Route { ...useRoutes({path: "/login", component: LoginView }) }  />
                <Route path={"/"} render={() => 
                    <>
                        <Header />
                        <Route path={"/register"} component={RegisterView}/>
                        <Route path={"/me"} component={MeView} />
                        <Route path={"/subscription"} component={SubscribeUser}/>
                        <Route path={"/account"} component={Account} />
                        <Route path={"/piad-users"} component={PaidUsers} />
                        <Route path={"/"} component={() => <div>Home</div>} exact={true} />
                    </>    
                } />
                <Redirect path={"*"} to={"/login"}/>
            </Switch>
        </>
    </BrowserRouter>
);