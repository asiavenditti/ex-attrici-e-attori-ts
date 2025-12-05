
// Milestone 1
type Person = {
  readonly id: number,
  readonly name: string,
  birth_year: number,
  death_year?: number,
  biography: string,
  image: string
}


// Milestone 2

type Nationality =
  | 'American'
  | 'British'
  | 'Australian'
  | 'Israeli-American'
  | 'South African'
  | 'French'
  | 'Indian'
  | 'Israeli'
  | 'Spanish'
  | 'South Korean'
  | 'Chinese'




type Actress = Person & {

  most_famous_movies: [string, string, string],
  awards: string
  nationality: Nationality

}

// Milestone 3

function isActress(actress: unknown): actress is Actress {
  if (
    typeof actress === 'object' &&
    actress !== null &&
    'id' in actress &&
    typeof 'actress.id' === 'number' &&
    'name' in actress &&
    typeof 'actress.name' === 'string' &&
    'birth_year' in actress &&
    typeof 'actress.birth_year' === 'number' &&
    'death_year' in actress &&
    typeof 'actress.death_year' === 'number' &&
    'biography' in actress &&
    typeof 'actress.biography' === 'string' &&
    'most_famous_movies' in actress &&
    actress.most_famous_movies instanceof Array &&
    actress.most_famous_movies.length === 3 &&
    actress.most_famous_movies.every(a => typeof a === 'string') &&
    'awards' in actress &&
    typeof 'actress.awards' === 'string' &&
    'nacionality' in actress &&
    typeof 'actress.nacionality' === 'string'
  ) {
    return true
  } else {
    return false
  }
}



async function getActress(id: number): Promise<Actress | null> {

  try {
    const response = await fetch(`http://localhost:3333/actresses/${id}`)
    const actress: unknown = await response.json()
    if (!isActress(actress)) {
      throw new Error('Formato non valido')
    }
    return actress
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Errore nel recupero dell'attrice con id ${id}, ${error}`)
    } else {
      console.error('Errore sconosciuto', error)
    }
    return null
  }
}

