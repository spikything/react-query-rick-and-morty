import { ICharacter } from "../interfaces";

export default function Character({character}: {character:ICharacter}) {
    return (
        <div className="card" data-testid="card">
            <img src={character.image} />
            <div className="text-container">
                <h4>{character.name}</h4>
                <p className="status">
                    { (character.status === 'Alive' ? '😊' : character.status === 'Dead' ? '💀' : '❔') + ' ' + character.status }
                </p>
                <p className="status">
                    { (character.species === 'Human' ? '🧑' : character.species === 'Alien' ? '👽' : '❔') + ' ' + character.species }
                </p>
                <p className="status">
                    { (character.gender === 'Male' ? '👦' : character.gender === 'Female' ? '👧' : '❔') + ' ' + character.gender }
                </p>
                <p className="title">
                    <strong>From:</strong> {character.origin.name}
                </p>
                <p className="title">
                    <strong>last seen:</strong> {character.location.name}
                </p>
            </div>
        </div>
    )
}