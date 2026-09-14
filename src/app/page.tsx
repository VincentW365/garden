import GardenExperience from "@/components/GardenExperience";
import { gardenConfig } from "../../garden.config";

export default function Page() {
  return <GardenExperience config={gardenConfig} />;
}
