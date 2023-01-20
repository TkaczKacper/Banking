import { totalPages } from "../../container/Results"
import './pagination.css'


const Pagination = () => {
     const url = window.location.href;
     let pageNumber = '1';
     try {
          const stringParams = url.split('?')[1];
          const pair = stringParams.split('=');
          if (pair[0] === 'page') {
               pageNumber = pair[1];
          }
     } catch { }
     return (
          <div className="pagination">
               {Number(pageNumber) > 1 &&
                    <form>
                         <input hidden name="page" value={Number(pageNumber) - 1} readOnly />
                         <button>&lt;prev</button>
                    </form>
               }
               {Number(pageNumber) < totalPages &&
                    <form>
                         <input hidden name="page" value={Number(pageNumber) + 1} readOnly />
                         <button>next&gt;</button>
                    </form>
               }
          </div>
     )
}

export default Pagination