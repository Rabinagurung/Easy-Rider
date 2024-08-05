export interface Specification {
  id: string;
  icon: string;
  title: string;
  value: string;
}

export const specifications: Specification[] = [
  {
    id: '1',
    icon: 'battery-charging-outline',
    title: 'Max. power',
    value: '2500hp'
  },
  {
    id: '2',
    icon: 'gas-station-outline',
    title: 'Fuel',
    value: '10km per litre'
  },
  { id: '3', icon: 'speedometer', title: 'Max. speed', value: '230kph' },
  { id: '4', icon: 'cog-stop-outline', title: '0-60mph', value: '2.5sec' }
];
