export type DeliveryType = 'Spoedlevering' | 'Nachtlevering'
export type Methode = 'nachtophaling' | 'voor11' | 'na11'
export type Dag = 'maandag' | 'dinsdag' | 'woensdag' | 'donderdag' | 'vrijdag'
export type Product = 'titan' | 'tempbridge' | 'geprint'

export interface DeliverySlot {
  idx: number
  type: DeliveryType
  label: string
  time: string
}

export const COLS: DeliverySlot[] = [
  { idx: 0,  type: 'Spoedlevering', label: 'Maandag',              time: '17u00' },
  { idx: 1,  type: 'Nachtlevering', label: 'Maandag',              time: 'nacht' },
  { idx: 2,  type: 'Spoedlevering', label: 'Dinsdag',              time: '12u00' },
  { idx: 3,  type: 'Spoedlevering', label: 'Dinsdag',              time: '17u00' },
  { idx: 4,  type: 'Nachtlevering', label: 'Dinsdag',              time: 'nacht' },
  { idx: 5,  type: 'Spoedlevering', label: 'Woensdag',             time: '12u00' },
  { idx: 6,  type: 'Spoedlevering', label: 'Woensdag',             time: '17u00' },
  { idx: 7,  type: 'Nachtlevering', label: 'Woensdag',             time: 'nacht' },
  { idx: 8,  type: 'Spoedlevering', label: 'Donderdag',            time: '12u00' },
  { idx: 9,  type: 'Spoedlevering', label: 'Donderdag',            time: '17u00' },
  { idx: 10, type: 'Nachtlevering', label: 'Donderdag',            time: 'nacht' },
  { idx: 11, type: 'Spoedlevering', label: 'Vrijdag',              time: '12u00' },
  { idx: 12, type: 'Spoedlevering', label: 'Vrijdag',              time: '17u00' },
  { idx: 13, type: 'Nachtlevering', label: 'Vrijdag',              time: 'nacht' },
  { idx: 14, type: 'Spoedlevering', label: 'Maandag (volg. week)', time: '12u00' },
  { idx: 15, type: 'Spoedlevering', label: 'Maandag (volg. week)', time: '17u00' },
  { idx: 16, type: 'Nachtlevering', label: 'Maandag (volg. week)', time: 'nacht' },
  { idx: 17, type: 'Spoedlevering', label: 'Dinsdag (volg. week)', time: '12u00' },
  { idx: 18, type: 'Spoedlevering', label: 'Dinsdag (volg. week)', time: '17u00' },
  { idx: 19, type: 'Nachtlevering', label: 'Dinsdag (volg. week)', time: 'nacht' },
]

// Availability matrix: DATA[methode][dag][product] = boolean[20]
// null = not available for this method/product combination
export const DATA: Record<Methode, Record<Dag, Record<Product, boolean[] | null>>> = {
  nachtophaling: {
    maandag: {
      titan:      [false,false,false,true,true,false,false,true,false,false,false,false,false,false,false,false,false,false,false,false],
      tempbridge: [false,false,false,false,false,false,true,true,false,false,false,false,false,false,false,false,false,false,false,false],
      geprint: null,
    },
    dinsdag: {
      titan:      [false,false,false,false,false,false,true,true,false,false,true,false,false,false,false,false,false,false,false,false],
      tempbridge: [false,false,false,false,false,false,false,false,false,true,true,false,false,false,false,false,false,false,false,false],
      geprint: null,
    },
    woensdag: {
      titan:      [false,false,false,false,false,false,false,false,false,true,true,false,false,true,false,false,false,false,false,false],
      tempbridge: [false,false,false,false,false,false,false,false,false,false,false,false,true,true,false,false,false,false,false,false],
      geprint: null,
    },
    donderdag: {
      titan:      [false,false,false,false,false,false,false,false,false,false,false,false,true,true,false,false,true,false,false,false],
      tempbridge: [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,true,true,false,false,false],
      geprint: null,
    },
    vrijdag: {
      titan:      [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,true,true,false,false,true],
      tempbridge: [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,true,true],
      geprint: null,
    },
  },
  voor11: {
    maandag: {
      geprint:    [true,true,false,false,true,false,false,true,false,false,false,false,false,false,false,false,false,false,false,false],
      titan:      [false,false,true,true,true,false,false,true,false,false,false,false,false,false,false,false,false,false,false,false],
      tempbridge: [false,false,false,true,true,false,false,true,false,false,false,false,false,false,false,false,false,false,false,false],
    },
    dinsdag: {
      geprint:    [false,false,false,true,true,false,false,true,false,false,true,false,false,false,false,false,false,false,false,false],
      titan:      [false,false,false,false,false,true,true,true,false,false,true,false,false,false,false,false,false,false,false,false],
      tempbridge: [false,false,false,false,false,false,true,true,false,false,true,false,false,false,false,false,false,false,false,false],
    },
    woensdag: {
      geprint:    [false,false,false,false,false,false,true,true,false,false,true,false,false,true,false,false,false,false,false,false],
      titan:      [false,false,false,false,false,false,false,false,true,true,true,false,false,true,false,false,false,false,false,false],
      tempbridge: [false,false,false,false,false,false,false,false,false,true,true,false,false,true,false,false,false,false,false,false],
    },
    donderdag: {
      geprint:    [false,false,false,false,false,false,false,false,false,true,true,false,false,true,false,false,true,false,false,false],
      titan:      [false,false,false,false,false,false,false,false,false,false,false,true,true,true,false,false,true,false,false,false],
      tempbridge: [false,false,false,false,false,false,false,false,false,false,false,false,true,true,false,false,true,false,false,false],
    },
    vrijdag: {
      geprint:    [false,false,false,false,false,false,false,false,false,false,false,false,true,true,false,false,true,false,false,true],
      titan:      [false,false,false,false,false,false,false,false,false,false,false,false,false,false,true,true,true,false,false,true],
      tempbridge: [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,true,true,false,false,true],
    },
  },
  na11: {
    maandag: {
      geprint:    [false,false,true,true,true,false,false,true,false,false,false,false,false,false,false,false,false,false,false,false],
      titan:      [false,false,false,true,true,false,false,true,false,false,false,false,false,false,false,false,false,false,false,false],
      tempbridge: [false,false,false,false,false,false,true,true,false,false,false,false,false,false,false,false,false,false,false,false],
    },
    dinsdag: {
      geprint:    [false,false,false,false,false,true,true,true,false,false,true,false,false,false,false,false,false,false,false,false],
      titan:      [false,false,false,false,false,false,true,true,false,false,true,false,false,false,false,false,false,false,false,false],
      tempbridge: [false,false,false,false,false,false,false,false,false,true,true,false,false,false,false,false,false,false,false,false],
    },
    woensdag: {
      geprint:    [false,false,false,false,false,false,false,false,true,true,true,false,false,true,false,false,false,false,false,false],
      titan:      [false,false,false,false,false,false,false,false,false,true,true,false,false,true,false,false,false,false,false,false],
      tempbridge: [false,false,false,false,false,false,false,false,false,false,false,false,true,true,false,false,false,false,false,false],
    },
    donderdag: {
      geprint:    [false,false,false,false,false,false,false,false,false,false,false,true,true,true,false,false,true,false,false,false],
      titan:      [false,false,false,false,false,false,false,false,false,false,false,false,true,true,false,false,true,false,false,false],
      tempbridge: [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,true,true,false,false,false],
    },
    vrijdag: {
      geprint:    [false,false,false,false,false,false,false,false,false,false,false,false,false,false,true,true,true,false,false,true],
      titan:      [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,true,true,false,false,true],
      tempbridge: [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,true,true],
    },
  },
}
