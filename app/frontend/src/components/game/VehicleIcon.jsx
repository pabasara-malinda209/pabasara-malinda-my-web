import { Car, Bus, Truck, CarTaxiFront } from "lucide-react";

const ICONS = { sports: Car, bus: Bus, truck: Truck, tuktuk: CarTaxiFront };

export const VehicleIcon = ({ id, size = 28, className = "" }) => {
  const Icon = ICONS[id] ?? Car;
  return <Icon size={size} className={className} />;
};
