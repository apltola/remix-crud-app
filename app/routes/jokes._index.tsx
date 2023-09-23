import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { db } from '~/utils/db.server';

export const loader = async () => {
  const count = await db.joke.count();
  const random = Math.floor(Math.random() * count);
  const [randomJoke] = await db.joke.findMany({
    skip: random,
    take: 1,
  });
  return json({ randomJoke });
};

export default function JokesIndexRoute() {
  const { randomJoke } = useLoaderData<typeof loader>();

  return (
    <div>
      <p>{randomJoke.content}</p>
      {/* <Link to={randomJoke.id}>"{randomJoke.name}" Pemalink</Link> */}
    </div>
  );
}
