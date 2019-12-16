export interface Vehicle {
  vehicleType: 'Motorcycle' | 'Car';
  vehicleModel: string;
  plateNo: string;
  email: string;
  parked: boolean;
}

export type VehicleViewModel = Vehicle & {
  id: string;
};
