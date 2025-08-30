import { useGetBorrowSummaryQuery } from "../services/bookApiSlice";
import AppError from "./AppError";

function BorrowSummary() {
  const {
    data: summary,
    error,
    isLoading,
  } = useGetBorrowSummaryQuery(undefined, {
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });

  return (
    <>
      {error ? (
        <>
          <AppError></AppError>
        </>
      ) : isLoading ? (
        <>
          <div className="skeleton hero min-h-screen"></div>
        </>
      ) : (
        <>
          <article className="h-dvh flex justify-center items-center">
            <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100 w-full h-full">
              <table className="table">
                {/* head */}
                <thead>
                  <tr>
                    <th></th>
                    <th>Title</th>
                    <th>ISBN</th>
                    <th>Total Quantity</th>
                  </tr>
                </thead>
                <tbody>
                  {summary?.data?.map((item, idx) => {
                    return (
                      <tr key={idx} className="hover:bg-base-300">
                        <th>{idx}</th>
                        <td>{item.book.title}</td>
                        <td>{item.book.isbn}</td>
                        <td>{item.totalQuantity}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </article>
        </>
      )}
    </>
  );
}

export default BorrowSummary;
