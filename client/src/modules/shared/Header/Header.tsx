import React, { ReactElement, ReactComponentElement, ReactHTMLElement } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "react-apollo";
import { meQuery } from "../../../graphql/queries/me";
import { MeQuery } from "../../../types/schemaTypes";

const useStyleContainer = (): React.HTMLAttributes<HTMLElement> => {
    
    return {
        style: {
            height: 50,
            width: '100%',
            backgroundColor: "#fafafa",
            display: "flex",
            justifyContent: 'space-around',
            padding: 10
        }
    };
};
export default () => {
    const { data, loading } = useQuery<MeQuery, any>(meQuery, { 
        onCompleted: data => {
            console.log("Success, data");
        }
    });  
    if(!data || loading) {
        return <div></div>
    }
    return (
        <div { ...useStyleContainer() }>
            <h2>
                <Link to={"/"}>Stripe Example</Link>
            </h2>
            <div>
                <div>

                </div>
                {
                    !data.me ? (
                        // Logged Out
                        <>
                            <div>
                                <Link to={"/register"}>register</Link>
                            </div>
                            <div>
                                <Link to={"/login"}>login</Link> 
                            </div>
                        </>
                    ) : (
                        // Logged In
                        <>
                            <div>
                                <Link to={"/logout"}>logout</Link>
                            </div>
                            <div>
                                <Link to={"/account"}>account</Link>
                            </div>
                        </>
                    )
                }
                
            </div>
        </div>
    )
};