export default [
  { name: "Bench Master", description: "Bronze is unlocked by increasing your Bench 1 rep max to 80kg", type: "bronze", image: "/bench_bronze.png", unlockedBy: ["8wYI7wFBtKM3BsvqhPSv7j3N5W23"], requirment: 80, exercises: [{name: "Barbell Bench Press"}]},
  { name: "Bench Master", description: "Silver is unlocked by increasing your Bench 1 rep max to 100kg", type: "silver", image: "/bench_silver.png", unlockedBy: ["8wYI7wFBtKM3BsvqhPSv7j3N5W23"], requirment: 100, exercises: [{name: "Barbell Bench Press"}]},
  { name: "Bench Master", description: "Gold is unlocked by increasing your Bench 1 rep max to 150kg", type: "gold", image: "/bench_gold.png", unlockedBy: [], requirment: 150, exercises: [{name: "Barbell Bench Press"}]},
  
  { name: "Plate Collector", description: "Bronze is unlocked by reaching 200 000 kgs lifted", type: "bronze", image: "/plate_bronze.png", unlockedBy: ["8wYI7wFBtKM3BsvqhPSv7j3N5W23"], requirment: 200000, exercises: {}, field: "volume"},
  { name: "Plate Collector", description: "Silver is unlocked by reaching 500 000 kgs lifted", type: "silver", image: "/plate_silver.png", unlockedBy: ["8wYI7wFBtKM3BsvqhPSv7j3N5W23"], requirment: 500000, exercises: {}, field: "volume"},
  { name: "Plate Collector", description: "Gold is unlocked by reaching 2 000 000 kgs lifted", type: "gold", image: "/plate_gold.png", unlockedBy: [], requirment: 1000000, exercises: {}, field: "volume"},
  
  { name: "Deadlift Master", description: "Bronze is is unlocked by increasing your deadlift 1 rep max to 115kgs", type: "bronze", image: "/deadlift_bronze.png", unlockedBy: ["8wYI7wFBtKM3BsvqhPSv7j3N5W23"], requirment: 115, exercises: [{name: "Barbell Deadlift"}]},
  { name: "Deadlift Master", description: "Silver is is unlocked by increasing your deadlift 1 rep max to 150kgs", type: "silver", image: "/deadlift_silver.png", unlockedBy: ["8wYI7wFBtKM3BsvqhPSv7j3N5W23"], requirment: 150, exercises: [{name: "Barbell Deadlift"}]},
  { name: "Deadlift Master", description: "Gold is is unlocked by increasing your deadlift 1 rep max to 200kgs", type: "gold", image: "/deadlift_gold.png", unlockedBy: [], requirment: 200, exercises: [{name: "Barbell Deadlift"}]},

  { name: "Squat Master", description: "Gold is is unlocked by increasing your squat 1 rep max to 100kgs", type: "bronze", image: "/squat_bronze.png", unlockedBy: ["8wYI7wFBtKM3BsvqhPSv7j3N5W23"], requirment: 100, exercises: [{name: "Barbell Squat"}]},
  { name: "Squat Master", description: "Gold is is unlocked by increasing your squat 1 rep max to 130kgs", type: "silver", image: "/squat_silver.png", unlockedBy: ["8wYI7wFBtKM3BsvqhPSv7j3N5W23"], requirment: 130, exercises: [{name: "Barbell Squat"}]},
  { name: "Squat Master", description: "Gold is is unlocked by increasing your squat 1 rep max to 160kgs", type: "gold", image: "/squat_gold.png", unlockedBy: [], requirment: 160, exercises: [{name: "Barbell Squat"}]},
];
