import { useEffect, useMemo, useState } from "react";
import { Image } from "react-native";
import {
  getAllMuscleGroups,
  getBaseImage,
  getImagePrimaryAndSecondaryMuscles,
  getImagePrimaryMuscles,
} from "./muscleGroupApi"; // Assuming muscleGroupApi exists

interface MuscleGroupImageProps {
  primaryMuscleGroups: string;
  secondaryMuscleGroups: string;
  imageSize?: number; // Optional image size parameter
}

const muscleGroupMappings = {
  "lower back": "back_lower",
  calves: "calfs",
  abs: "abs",
  adductors: "adductors",
  biceps: "biceps",
  chest: "chest",
  forearms: "forearms",
  glutes: "gluteus",
  hamstrings: "hamstring",
  lats: "latissimus",
  "middle back": "back_upper",
  neck: "neck",
  quads: "quadriceps",
  shoulders: "shoulders",
  traps: "shoulders_back",
  triceps: "triceps",
  "upper Back": "back_upper",
};

function convertMuscleGroups(muscleGroups: string): string[] {
  return muscleGroups
    .replace(/[\[\]']/g, "")
    .split(",")
    .map((item) => {
      const trimmedItem = item.trim().toLowerCase();
      return muscleGroupMappings[trimmedItem] || trimmedItem; // Use mapping if available, otherwise use original name
    });
}

export default function MuscleGroupImage(props: MuscleGroupImageProps) {
  const [image, setImage] = useState<string | null>(null);
  const { primaryMuscleGroups, secondaryMuscleGroups, imageSize = 300 } = props; // Use default if no imageSize passed

  useEffect(() => {
    const fetchData = async () => {
      const allMuscleGroups = await getAllMuscleGroups();
      let primaryGroups = convertMuscleGroups(primaryMuscleGroups);
      let secondaryGroups = []
      if (secondaryMuscleGroups) {
        secondaryGroups = convertMuscleGroups(secondaryMuscleGroups);
      }
      primaryGroups = primaryGroups.filter((group) => {
        const isIncluded = allMuscleGroups.includes(group);
        return isIncluded;
      });
      secondaryGroups = secondaryGroups.filter((group) => {
        const isIncluded = allMuscleGroups.includes(group);
        return isIncluded;
      });

      let imageUrl: string;
      if (!primaryGroups.length && !secondaryGroups.length) {
        imageUrl = await getBaseImage();
      } else if (!primaryGroups.length && secondaryGroups.length) {
        imageUrl = await getImagePrimaryMuscles(secondaryGroups);
      } else if (!secondaryGroups.length && primaryGroups.length) {
        imageUrl = await getImagePrimaryMuscles(primaryGroups);
      } else {
        imageUrl = await getImagePrimaryAndSecondaryMuscles(
          primaryGroups,
          secondaryGroups
        );
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
    return image ? (
      <Image
        source={{ uri: image }}
        style={{ width: imageSize, height: imageSize }}
      />
    ) : null;
  }, [image, imageSize]);

  return imageComponent;
}
