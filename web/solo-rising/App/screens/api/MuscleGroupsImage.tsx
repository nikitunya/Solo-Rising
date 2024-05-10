import { useEffect, useMemo, useState } from "react";
import { Image } from "react-native";
import { getAllMuscleGroups, getImagePrimaryAndSecondaryMuscles, getImagePrimaryMuscles } from './muscleGroupApi' // Assuming muscleGroupApi exists

interface MuscleGroupImageProps {
  primaryMuscleGroups: string;
  secondaryMuscleGroups: string;
  imageSize?: number; // Optional image size parameter
}

function convertMuscleGroups(muscleGroups: string): string[] {
  return muscleGroups.replace(/[\[\]']/g, '').split(',').map(item => item.trim().toLowerCase());
}

export default function MuscleGroupImage(props: MuscleGroupImageProps) {
  const [image, setImage] = useState<string | null>(null);
  const { primaryMuscleGroups, secondaryMuscleGroups, imageSize = 300 } = props; // Use default if no imageSize passed

  useEffect(() => {
    const fetchData = async () => {
      const allMuscleGroups = await getAllMuscleGroups();

      let primaryGroups = convertMuscleGroups(primaryMuscleGroups);
      let secondaryGroups = convertMuscleGroups(secondaryMuscleGroups);

      primaryGroups = primaryGroups.filter(group => allMuscleGroups.includes(group));
      secondaryGroups = secondaryGroups.filter(group => allMuscleGroups.includes(group));

      let imageUrl: string;
      if (!primaryGroups.length) {
        imageUrl = await getImagePrimaryMuscles(secondaryGroups);
      } else if (!secondaryGroups.length) {
        imageUrl = await getImagePrimaryMuscles(primaryGroups);
      } else {
        imageUrl = await getImagePrimaryAndSecondaryMuscles(primaryGroups, secondaryGroups);
      }
      setImage(imageUrl);
    };
    fetchData();

    return () => {
      if (image) {
        URL.revokeObjectURL(image); // Clean up image URL
      }
    };
  }, [primaryMuscleGroups, secondaryMuscleGroups, imageSize]); // Re-fetch on changes

  const imageComponent = useMemo(() => {
    return image ? <Image source={{ uri: image }} style={{ width: imageSize, height: imageSize }} /> : null;
  }, [image, imageSize]);

  return imageComponent;
}