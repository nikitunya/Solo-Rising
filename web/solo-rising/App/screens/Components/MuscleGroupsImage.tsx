import {useEffect, useState} from "react";
import axios from "axios";
import { Image } from "react-native";

interface MuscleGroupImageProps {
    muscleGroups: Array<string>
}

export default function MuscleGroupImage(props: MuscleGroupImageProps) {
    const [image, setImage] = useState("");

    const fetchImage = async() => {
        axios.get(`https://muscle-group-image-generator.p.rapidapi.com/getImage?muscleGroups=${props.muscleGroups.join(",")}`, {
            headers: {
                'X-RapidAPI-Key': 'e26bdbf131msha5c54e8eb398c29p145b98jsn32e1c9d486dd',
                'X-RapidAPI-Host': 'muscle-group-image-generator.p.rapidapi.com',
            },
            responseType: "arraybuffer"
        }).then((response) => {
            const imageFile = new Blob([response.data]);
            const imageUrl = URL.createObjectURL(imageFile);
            setImage(imageUrl)
        });
    }

    useEffect(() => {
        fetchImage()
        console.log(image)
    }, [])

    return image ? <Image source={{ uri: image }} style={{ width: 100, height: 100 }} /> : null;
    // return <img src={image} alt={`Image of ${props.muscleGroups.join(",")}`} />
}

    // return image ? <Image source={{ uri: image }} style={{ width: 100, height: 100 }} /> : null;
// }
