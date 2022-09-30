export interface Duck {
    name: string;
    numberOfLegs: number;
    makeSound: (sound: string) => void;
}

const duck1: Duck = {
    name: 'duck1',
    numberOfLegs: 2,
    makeSound: (sound: any) => console.log(sound)
}

const duck2: Duck = {
    name: 'duck2',
    numberOfLegs: 2,
    makeSound: (sound: any) => console.log(sound)
}

duck1.makeSound('Quack');

export const ducks = [duck1, duck2];