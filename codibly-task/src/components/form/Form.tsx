import { Results } from "../../container/Results";
import "./form.css";

const Form = () => {
  return (
    <>
      <div className="filter-params">
        <form>
          <input
            id="filter"
            name="id"
            type="number"
            placeholder="Filter item id..."
          />
          <button>Filter</button>
        </form>
      </div>
      <Results />
    </>
  );
};

export { Form };
