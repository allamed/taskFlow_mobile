import {Avatar} from "@rneui/themed";
import userIcon from "../../assets/usericon.png";
import React, {useEffect, useState} from "react";
import {urlBase} from "../../utils/axios";
import {stringAvatar, stringToColor} from "../../utils/utilsFunctions";

const UserAvatar = ({ id, nom }) => {
    const [url, setUrl] = useState("");
    useEffect(() => {
        getUserImage(id);
    }, []);

    const getUserImage = (id) => {
        fetch(`${urlBase}/image/info/${id}`)
            .then((response) => {
                if (response.ok) return response.blob();
                return;
            })
            .then((blob) => {
                if (blob) {
                    const urlx = URL.createObjectURL(blob);

                    setUrl(urlx);
                    console.log("url :" ,urlx);
                }
            })
            .catch((error) => {
                return null;
            });
    };
    return url ? (
        <Avatar
            rounded
            source={url}
            size={40}

        />
    ) : ( <Avatar
        rounded
        title={nom.charAt(0).toUpperCase()}
        size={40}
        containerStyle={{ backgroundColor: stringToColor(nom) }}
    />);
}
export default UserAvatar;