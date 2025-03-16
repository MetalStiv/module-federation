import { useEffect, useState } from "react";
import { getUserId } from "../helpers/login";

export const useUserId = () => {
    const [userId, setUserId] = useState('');

    useEffect(() => {
        async function fillUserId(){
            setUserId(await getUserId());
        }
        fillUserId();
    }, [])

    return userId;
}