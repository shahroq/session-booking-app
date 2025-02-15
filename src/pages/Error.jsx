import { useRouteError } from "react-router";

export default function Error() {
  const error = useRouteError();
  console.log(error); // { status: 404, message: "Not Found" }
  const title = error?.status === 404 ? "404" : "Error";
  const message =
    error?.status === 404
      ? "Sorry, we cannot find that page."
      : "Something is wrong.";

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-sm text-center">
          <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary-600 dark:text-primary-500">
            {title}
          </h1>
          <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white">
            {message}
          </p>
          <p className="mt-10">
            <a
              href="/"
              className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-4 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
            >
              Back to Homepage
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
