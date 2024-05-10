import { useEffect, useMemo, useState } from "react";
import { Image } from "react-native";
import { getAllMuscleGroups, getImagePrimaryAndSecondaryMuscles, getImagePrimaryMuscles } from './muscleGroupApi'

interface MuscleGroupImageProps {
  primaryMuscleGroups: string;
  secondaryMuscleGroups: string;
}

function convertMuscleGroups(muscleGroups: string): string[] {
  return muscleGroups.replace(/[\[\]']/g, '').split(',').map(item => item.trim().toLowerCase());
}

export default function MuscleGroupImage(props: MuscleGroupImageProps) {
  const [image, setImage] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const allMuscleGroups = await getAllMuscleGroups();

      let primaryMuscleGroups: string[] = convertMuscleGroups(props.primaryMuscleGroups);
      let secondaryMuscleGroups: string[] = convertMuscleGroups(props.secondaryMuscleGroups);

      primaryMuscleGroups = primaryMuscleGroups.filter(group => allMuscleGroups.includes(group));
      secondaryMuscleGroups = secondaryMuscleGroups.filter(group => allMuscleGroups.includes(group));
      
      let imageUrl: string;
      if (!primaryMuscleGroups.length) {
        imageUrl = await getImagePrimaryMuscles(secondaryMuscleGroups);
      } else if (!secondaryMuscleGroups.length) {
        imageUrl = await getImagePrimaryMuscles(primaryMuscleGroups);
      } else {
        imageUrl = await getImagePrimaryAndSecondaryMuscles(primaryMuscleGroups, secondaryMuscleGroups);
      }
      setImage(imageUrl);
    }
    fetchData();
    
    return () => {
      if (image) {
        URL.revokeObjectURL(image);
      }
    };
  }, [])


  const imageComponent = useMemo(() => {
    return image ? <Image source={{ uri: image }} style={{ width: 300, height: 300 }} /> : null;
  }, [image]);

  return imageComponent;
}
