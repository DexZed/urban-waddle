import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import { prefillBookForm, updateBookForm } from "../features/bookSlice";
import type { ApiSingleBookResponse, BookForm } from "../interfaces/globalInterfaces";
import { useUpdateBookMutation, useGetSingleBookQuery } from "../services/bookApiSlice";
import { showSuccessAlert, showErrorAlert } from "../utilities/utils";
import AppError from "./AppError";

export default function EditBook() {
  const navigate = useNavigate();
  const selector = useAppSelector((state) => state.bookUi.form);
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const [updateBook, { error }] = useUpdateBookMutation();
  const { data: response } = useGetSingleBookQuery(id!, {
    skip: !id,
  }) as unknown as {
    data: ApiSingleBookResponse;
  };

  useEffect(() => {
    if (response?.data) {
      dispatch(prefillBookForm(response.data));
    }
  }, [dispatch, response]);

  function handleInputChange( event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
     const { name, type, value } = event.target;

  let parsedValue: string | number | boolean = value;

  if (type === "checkbox" && event.target instanceof HTMLInputElement) {
    parsedValue = event.target.checked;
  } else if (type === "number") {
    parsedValue = Number(value);
  } else if (name === "genre") {
    const upper = value.toUpperCase().replace(/\s/g, "_");
    parsedValue = upper;
  }

  dispatch(
    updateBookForm({
      field: name as keyof BookForm,
      value: parsedValue,
    })
  );
  }
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      await updateBook(selector).unwrap();
      showSuccessAlert("Success", "Book updated successfully!");
      navigate("/");
    } catch (err) {
      showErrorAlert("Error", "Failed to update the book.");
      console.error("Error occurred in creation:", err);
    }
  }

  return (
    <>
      {error ? (
        <>
          <AppError></AppError>
        </>
      ) : (
        <>
          <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col lg:flex-row-reverse">
              <div className="text-center lg:text-left">
                <h1 className="text-5xl font-bold m-5">Edit Book</h1>
                <blockquote className="text-lg italic text-gray-500">
                  Abandon all hope ye who enter here
                </blockquote>
                <figcaption className="mt-3 text-right text-sm text-gray-500">
                  — Dante Alighier, <cite className="italic">Inferno</cite>
                </figcaption>
              </div>
              <form
                onSubmit={handleSubmit}
                className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl"
              >
                <div className="card-body">
                  <fieldset className="fieldset">
                    <label className="label">Title</label>
                    <input
                      value={selector.title || ""}
                      onChange={handleInputChange}
                      name="title"
                      type="text"
                      className="input"
                      placeholder="Beyond Good and Evil"
                    />

                    <label className="label">Author</label>
                    <input
                      value={selector.author || ""}
                      onChange={handleInputChange}
                      name="author"
                      type="text"
                      className="input"
                      placeholder="Friedrich Nietzsche"
                    />

                    <label className="label">Genre</label>
                    
                    <select 
                    className="select"
                      name="genre"
                      value={selector.genre}
                      onChange={handleInputChange}
                    >
                      <option value="FICTION">Fiction</option>
                      <option value="NON_FICTION">Non-fiction</option>
                      <option value="SCIENCE">Science</option>
                      <option value="HISTORY">History</option>
                      <option value="BIOGRAPHY">Biography</option>
                      <option value="FANTASY">Fantasy</option>
                    </select>
                    <label className="label">ISBN</label>
                    <input
                      value={selector.isbn || ""}
                      onChange={handleInputChange}
                      name="isbn"
                      type="text"
                      className="input"
                      placeholder="9780306000000"
                      pattern="[0-9]{13}"
                      title="ISBN must be 13 digits"
                      maxLength={13}
                      minLength={10}
                    />

                    <label className="label">Description</label>
                    <input
                      value={selector.description ?? ""}
                      onChange={handleInputChange}
                      name="description"
                      type="text"
                      className="input"
                      placeholder=" A philosophical novel that explores the nature of truth and morality"
                    />

                    <label className="label">Copies</label>
                    <input
                      value={selector.copies || ""}
                      onChange={handleInputChange}
                      name="copies"
                      type="number"
                      className="input"
                      placeholder="10"
                      min="1"
                    />
                    <label className="label">Available</label>
                    <input
                      onChange={handleInputChange}
                      name="available"
                      type="checkbox"
                      checked={selector.available || false}
                      className="checkbox checkbox-xl"
                    />
                    <button className="btn btn-neutral mt-4" type="submit">
                      Edit
                    </button>
                  </fieldset>
                </div>
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
}
