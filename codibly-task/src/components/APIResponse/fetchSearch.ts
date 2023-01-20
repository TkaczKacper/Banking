import { QueryFunction } from "@tanstack/react-query";
import { APIResponse } from "./APIResponseTypes";

const fetchSearch: QueryFunction<
  APIResponse,
  [
    "search",
    {
      id: string;
      page: string;
    }
  ]
> = async function fetchSearch({ queryKey }) {
  const { id, page } = queryKey[1];
  console.log("fetchenter");
  const result = await fetch(
    `https://reqres.in/api/products?per_page=5&id=${id}&page=${page}`
  );

  if (!result.ok) throw new Error(`data search not okay: ${id}`);

  return result.json();
};

export default fetchSearch;
