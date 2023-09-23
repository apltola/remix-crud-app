import { redirect, type ActionArgs } from '@remix-run/node';
import { useActionData } from '@remix-run/react';
import { db } from '~/utils/db.server';
import { badRequest } from '~/utils/request.server';

function validateJoke(name: string, content: string) {
  return {
    content: content.length < 10 ? 'That joke is too short!' : null,
    name: name.length < 2 ? "That joke's name is too short!" : null,
  };
}

export const action = async ({ request }: ActionArgs) => {
  const form = await request.formData();
  const content = form.get('content');
  const name = form.get('name');

  if (typeof content !== 'string' || typeof name !== 'string') {
    return badRequest({
      fieldErrors: null,
      fields: null,
      formError: 'Invalid form!',
    });
  }

  const fieldErrors = validateJoke(name, content);
  const fields = { content, name };
  if (Object.values(fieldErrors).some(Boolean)) {
    return badRequest({
      fieldErrors,
      fields,
      formError: null,
    });
  }

  const joke = await db.joke.create({ data: fields });
  return redirect(`/jokes/${joke.id}`);
};

export default function NewJokeRoute() {
  const { fields, fieldErrors }: any = useActionData<typeof action>() || {};

  return (
    <div>
      <p>Add a new joke</p>
      <form method="post">
        <div>
          <label>
            Name:{' '}
            <input
              type="text"
              name="name"
              defaultValue={fields?.name}
              aria-invalid={Boolean(fieldErrors?.name)}
            />
          </label>
          {fieldErrors?.name ? (
            <p className="form-validation-error" id="name-error" role="alert">
              {fieldErrors.name}
            </p>
          ) : null}
        </div>
        <div>
          <label>
            Content:{' '}
            <input
              type="text"
              name="content"
              defaultValue={fields?.content}
              aria-invalid={Boolean(fieldErrors?.content)}
            />
          </label>
          {fieldErrors?.content ? (
            <p
              className="form-validation-error"
              id="content-error"
              role="alert"
            >
              {fieldErrors.content}
            </p>
          ) : null}
        </div>
        <div>
          <button type="submit" className="button">
            Add
          </button>
        </div>
      </form>
    </div>
  );
}
