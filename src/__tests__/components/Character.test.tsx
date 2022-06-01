import { cleanup, render, screen } from '@testing-library/react';
import Character from '../../components/Character';
import { ICharacter } from '../../interfaces';

class Char implements ICharacter {
    constructor(public id:number, 
                public name:string, 
                public status:string, 
                public species:string, 
                public image:string, 
                public origin:any, 
                public location:any) 
    {}
}

const char = new Char(1, 'bob', 'Alive', 'Human', 'someimage', { name:'origin' }, { name:'location' });

afterEach(cleanup);

it('renders correctly', () => {
    render(<Character character={char} />);

    expect(screen.getByText(char.name)).toBeInTheDocument();
    expect(screen.getByText(new RegExp(char.status, 'i'))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(char.species, 'i'))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(char.origin.name, 'i'))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(char.location.name, 'i'))).toBeInTheDocument();

    const image = document.querySelector("img") as HTMLImageElement;
    expect(image.src).toContain(char.image);
});