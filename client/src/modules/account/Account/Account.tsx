import React from "react";
import { gql } from "apollo-boost";
import { useQuery } from "react-apollo";
import { Redirect } from "react-router-dom";
import { MeQuery } from "../../../types/schemaTypes";
import SubscribeUser from "../SubscribeUser";
import { meQuery } from "../../../graphql/queries/me";
import ChangeCreditCard from "../ChangeCreditCard";

export default () => {
    const { data, loading } = useQuery<MeQuery, any>(meQuery, { 
        onCompleted: data => {
            console.log("Success, data");
        }
    });  

    return (
        <>
            {/* { !data || !data.me && <Link to={"/login"}>please Login </Link>} */}
            { (!data || !data.me) && !loading && <Redirect to={"/login"} /> }
            { data?.me?.type === "free-trial" && <SubscribeUser /> }
            { data?.me?.type === "paid" && <><div>Your current last 4 digit: {data?.me?.ccLast4}</div><ChangeCreditCard /></> }
            {/* { data?.me?.type === "paid" && <Redirect to={"/paid-users"}/>} */}
        </>
    );
};