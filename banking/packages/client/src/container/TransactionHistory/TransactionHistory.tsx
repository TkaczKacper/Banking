import "./transactionHistory.css";
import { AccountNavBar, Transactions } from "../../components";
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import ReactPaginate from "react-paginate";
import {
  transactionsType,
  transactionType,
} from "../../components/Transactions/Transactions";

const TransactionHistory = () => {
  const [cookie] = useCookies(["userId", "username"]);
  if (!cookie.userId) window.location.href = "/login";
  const [transactions, setTransactions] = useState<transactionsType[]>([]);
  const itemsPerPage: number = 10;

  const fetchData = async () => {
    return await fetch(
      `http://localhost:5000/account/history/${cookie.username}`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        return setTransactions(data.transactions);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const [itemOffest, setItemOffest] = useState(0);
  const endOffset = itemOffest + itemsPerPage;
  const currentTransactions = transactions.slice(itemOffest, endOffset);
  const pageCount = Math.ceil(transactions.length / itemsPerPage);

  const handlePageChange = (event: any) => {
    const newOffset = (event.selected * itemsPerPage) % transactions.length;
    setItemOffest(newOffset);
  };
  return (
    <>
      <AccountNavBar />
      <nav className="paginate">
        <ReactPaginate
          containerClassName="paginate-container"
          pageLinkClassName="paginate-page-link"
          activeLinkClassName="paginate-page-active"
          previousLinkClassName="paginate-page-previous"
          nextLinkClassName="paginate-page-next"
          disabledLinkClassName="paginate-page-disabled"
          breakLinkClassName="paginate-page-break"
          nextLabel=">"
          onPageChange={handlePageChange}
          pageRangeDisplayed={1}
          marginPagesDisplayed={1}
          pageCount={pageCount}
          previousLabel="<"
        />
      </nav>
      <Transactions transactions={currentTransactions} />
    </>
  );
};

export default TransactionHistory;
